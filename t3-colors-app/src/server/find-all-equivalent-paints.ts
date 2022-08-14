import { Color } from "./colors/color";
import { Paint, PaintDto } from "./colors/paint";

const toUniqueColors = (paints: Paint[]): Color[] => paints
    .map(paint => paint.color)
    .filter((color, index, self) => 
        self.findIndex(colorToFind => 
            color.equals(colorToFind)) === index);

const getAllPaintsByColor = (findByColor: FindPaintsByColor) => async (colors: Color[]): Promise<Paint[]> => {
    const colorsPaintsPromises = colors.map(color => findByColor(color));
    const colorsPaints = await Promise.all(colorsPaintsPromises);
    return colorsPaints.flatMap(colorPaints => colorPaints);
}

export type FindPaintsByName = (name: string) => Promise<Paint[]>;
export type FindPaintsByColor = (color: Color) => Promise<Paint[]>;

export const findAllEquilvalentPaints = (finders: {findByName: FindPaintsByName, findByColor: FindPaintsByColor}) => async (paintName: string): Promise<PaintDto[]> => {
    const paints = await finders.findByName(paintName);
    if(paints.length == 0) return [];

    const uniqueColors = toUniqueColors(paints);
    const allPaintsByColor = await getAllPaintsByColor(finders.findByColor)(uniqueColors);
    return allPaintsByColor.map(p => new PaintDto(p.Company, p.Name, p.color.HexadecimalCode.ToString()));
}