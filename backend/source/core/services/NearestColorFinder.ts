 import { Color } from "../entities/Color";
import { IColorsRepository } from "./IColorsRepository";

export class NearestColorFinder {

    constructor(private Repository: IColorsRepository) {}

    public async FindNearest(refColor: Color): Promise<Color> {
        const colors: Array<Color> = await this.FindTopNear(refColor, 0);
        return colors[0];
    }

    public async FindTopNear(refColor: Color, top: number): Promise<Array<Color>> {
        const colors: Array<Color> = await this.GetColorsOrderedByDistance(refColor);

        if(top == colors.length)
        {
            return colors;
        } else {
            return colors.slice(0, top+1);
        }
    }

    public async GetColorsOrderedByDistance(refColor: Color): Promise<Array<Color>> {
        const allColors: Array<Color> = await this.Repository.ReadAll();

        const colorDistances: Array<{distance: number, color: Color}> = allColors.map(color => {
            const distance: number = refColor.Distance(color);
            return {distance, color};
        });

        const orderColorsByDistance = colorDistances.sort((colorDistanceA, colorDistanceB) => {return colorDistanceA.distance - colorDistanceB.distance}).map(color => color.color);
        return orderColorsByDistance;
    }

}