import { Color } from "./core/colors/color";
import { Paint } from "./core/paint";
import { mapToDomain } from "./infrastructure/mongo/map-to-domain";
import { PaintsCollection } from "./infrastructure/mongo/paints-mongo-model";

export type FindByColor = (color: Color) => Promise<Paint[]>;

export const byColor = (collection: PaintsCollection) => async (color: Color) => {
    const paintModelsByColor = await collection.find({HexCode: color.hexadecimal.value}).toArray();
    return mapToDomain(paintModelsByColor);
}

