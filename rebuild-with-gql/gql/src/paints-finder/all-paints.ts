import { Paint } from "./core/paint";
import { mapToDomain } from "./infrastructure/mongo/map-to-domain";
import { PaintsCollection } from "./infrastructure/mongo/paints-mongo-model";

export type AllPaints = () => Promise<Paint[]>;

export const allPaints = (collection: PaintsCollection): AllPaints => async () => {
    const paintModels = await collection.find({}).toArray();
    return mapToDomain(paintModels);
};