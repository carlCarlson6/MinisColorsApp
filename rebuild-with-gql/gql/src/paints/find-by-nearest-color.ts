import { allPaints } from "./all-paints";
import { Color } from "./core/colors/color";
import { Paint } from "./core/paint";
import { byColor } from "./find-by-color";
import { PaintsCollection } from "./infrastructure/mongo/paints-mongo-model";

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


export const byNearestColor = (collection: PaintsCollection): FindByNearestColor => async (color: Color) => {
    const findByColor = byColor(collection);

    const paintModelsByColor = await findByColor(color);
    if (paintModelsByColor.length !== 0) return paintModelsByColor;

    const paints = await allPaints(collection)();
    const colors = orderColorsByDistance(filterUniqueColors(paints.map(p => p.color)))(color);
    const nearestColor = colors[0];
    if (!nearestColor) [];

    return findByColor(nearestColor);
}