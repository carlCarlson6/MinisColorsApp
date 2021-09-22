import { inject, injectable } from "inversify";
import { Color } from "../../core/entities/Color";
import { Paint } from "../../core/entities/Paint";
import { PaintsRepository } from "../../core/services/PaintsRepository";
import { PaintName } from "../../core/valueObjects/PaintName";
import { InjectionTypes } from "../../infrastructure/di/InjectionTypes";

@injectable()
export class GetAllEquivalentPaints {
    private repository: PaintsRepository;

    constructor(@inject(InjectionTypes.PaintsRepository) paintsRepository: PaintsRepository) {
        this.repository = paintsRepository;
    }

    public async Execute(paintName: PaintName): Promise<Array<Paint>> {
        const paints: Array<Paint> = await this.repository.ReadByName(paintName);
        if(paints.length == 0) {
            return [];
        }
        
        const uniqueColors: Array<Color> = this.GetUniqueColors(paints);
        const equivalentPaints: Array<Paint> = await this.GetAllPaintByColor(uniqueColors);

        return equivalentPaints;
    }

    private GetUniqueColors(paints: Array<Paint>): Array<Color> {
        const uniqueColors: Array<Color> = paints.map(paint => paint.Color).filter((value, index, self) => {return self.findIndex(v => v.HexadecimalCode.Value == value.HexadecimalCode.Value) == index})
        return uniqueColors
    }

    private async GetAllPaintByColor(colors: Array<Color>): Promise<Array<Paint>> {
        let equivalentPaints: Array<Paint> = []; 
        
        for (const color of colors) {
            const colorPaints: Array<Paint> = await this.repository.ReadByColor(color);
            colorPaints.forEach(paint => equivalentPaints.push(paint));
        }

        return equivalentPaints;
    }

}
