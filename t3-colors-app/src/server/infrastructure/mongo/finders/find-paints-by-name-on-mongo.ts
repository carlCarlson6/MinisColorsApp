import { FindPaintsByName } from "../../../find-all-equivalent-paints";
import { GetPaintsCollection } from "../mongo-db-connector";
import { mapToDomain } from "./map-to-domain";

export const findByNameOnMongo = (getPaintsCollection: GetPaintsCollection): FindPaintsByName => async (paintName: string) => {
    const paintsCollection = await getPaintsCollection();
    const paintModels = await paintsCollection.find({}).toArray();
    return mapToDomain(paintModels).filter(paint => paint.Name!.toLowerCase().includes(paintName.trim().toLowerCase()));
};