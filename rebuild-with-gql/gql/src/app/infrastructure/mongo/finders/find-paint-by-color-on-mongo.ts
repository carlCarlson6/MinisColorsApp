/*import { Color } from "../../../colors/color";
import { FindPaintsByColor } from "../../../find-all-equivalent-paints";
import { GetPaintsCollection } from "../mongo-db-connector";
import { mapToDomain } from "./map-to-domain";

export const findByColorOnMongo = (getPaintsCollection: GetPaintsCollection): FindPaintsByColor => async (color: Color) => {
    const paintsCollection = await getPaintsCollection();
    const paintModels = await paintsCollection.find({HexCode: color.HexadecimalCode.ToString()}).toArray();
    return mapToDomain(paintModels);
}*/