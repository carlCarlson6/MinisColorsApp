import { inject, injectable } from "inversify";
import { InjectionTypes } from "../../infrastructure/di/InjectionTypes";
import { Color } from "../colorSystem/Color";
import { ColorsRepository } from "./ColorsRepository";

@injectable()
export class NearestColorFinder {
    constructor(
        @inject(InjectionTypes.ColorsRepository) 
        private readonly repository: ColorsRepository
    ) { }

    public async FindNearest(refColor: Color): Promise<Color> {
        const colors = await this.FindTopNearest(refColor, 0);
        return colors[0];
    }

    public async FindTopNearest(refColor: Color, top: number): Promise<Color[]> {
        const colors = await this.GetColorsOrderedByDistance(refColor);
        return top === colors.length 
            ? colors
            : colors.slice(0, top+1);
    }

    public async GetColorsOrderedByDistance(refColor: Color): Promise<Color[]> {
        const allColors = await this.repository.ReadAll();

        const colorDistances = allColors.map(color => {
            const distance = refColor.Distance(color);
            return { distance, color };
        });

        const orderColorsByDistance = colorDistances.sort((colorDistanceA, colorDistanceB) => colorDistanceA.distance - colorDistanceB.distance).map(colorDistance => colorDistance.color);
        return orderColorsByDistance;
    }
}