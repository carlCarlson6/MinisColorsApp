/*import { FindPaintsByName } from "../../../find-all-equivalent-paints";
import { GetPaintsCollection } from "../mongo-db-connector";
import { mapToDomain } from "./map-to-domain";

export const findByNameOnMongo = (getPaintsCollection: GetPaintsCollection): FindPaintsByName => async (paintName: string) => {
    const paintsCollection = await getPaintsCollection();
    const paintModels = await paintsCollection.find({}).toArray();
    const paints = mapToDomain(paintModels).filter(paint => {
        if (!paint.Name) console.log("fuck", paint.Name);

        return paint.Name!
            .toLowerCase()
            .includes(paintName
                .trim()
                .toLowerCase());
    });
    return paints;
};*/