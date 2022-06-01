import { inject, injectable } from "inversify";
import { Color } from "../../core/entities/Color";
import { Paint } from "../../core/entities/Paint";
import { PaintsRepository } from "../../core/services/repositories/PaintsRepository";
import { PaintName } from "../../core/valueObjects/PaintName";
import { InjectionTypes } from "../../infrastructure/di/InjectionTypes";

@injectable()
export class GetAllEquivalentPaints {
    constructor(
        @inject(InjectionTypes.PaintsRepository) 
        private readonly repository: PaintsRepository
    ) { }

    public async Execute(paintName: PaintName): Promise<Paint[]> {
        const paints = await this.repository.ReadByName(paintName);
        if(paints.length == 0) {
            return [];
        }
        
        const uniqueColors = this.GetUniqueColors(paints);
        return await this.GetAllPaintByColor(uniqueColors);
    }

    private GetUniqueColors(paints: Array<Paint>): Array<Color> {
        return paints
            .map(paint => paint.Color)
            .filter((color, index, self) => self.findIndex(colorToFind => color.Equals(colorToFind)) === index);
    }

    private async GetAllPaintByColor(colors: Array<Color>): Promise<Array<Paint>> {
        const equivalentPaints: Array<Paint> = []; 
        
        for (const color of colors) {
            const colorPaints = await this.repository.ReadByColor(color);
            colorPaints.forEach(paint => equivalentPaints.push(paint));
        }

        return equivalentPaints;
    }
}