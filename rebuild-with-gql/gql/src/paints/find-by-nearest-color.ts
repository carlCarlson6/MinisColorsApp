import { AllPaints } from "./all-paints";
import { Color } from "./core/colors/color";
import { Paint } from "./core/paint";
import { FindByColor } from "./find-by-color";

export type FindByNearestColor = (color: Color) => Promise<Paint[]>;

const filterUniqueColors = (colors: Color[]): Color[] => colors
    .filter((color, index, self) => 
        self.findIndex(colorToFind => 
            color.equals(colorToFind)) === index);

const orderColorsByDistance = (colors: Color[]) => (refColor: Color) => colors
    .map(color => ({color, distance: refColor.distance(color)}))
    .sort((colorDistanceA, colorDistanceB) => 
        colorDistanceA.distance - colorDistanceB.distance)
    .map(colorDistance => colorDistance.color);


export const byNearestColor = ({findByColor, allPaints}: {findByColor: FindByColor, allPaints: AllPaints}): FindByNearestColor => async (color: Color) => {
    const paintModelsByColor = await findByColor(color);
    if (paintModelsByColor.length !== 0) return paintModelsByColor;

    const paints = await allPaints();
    const colors = orderColorsByDistance(filterUniqueColors(paints.map(p => p.color)))(color);
    const nearestColor = colors[0];
    if (!nearestColor) [];

    return findByColor(nearestColor);
}