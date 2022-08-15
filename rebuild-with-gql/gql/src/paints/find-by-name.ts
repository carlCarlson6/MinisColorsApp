import { allPaints } from "./all-paints";
import { Paint } from "./core/paint";
import { PaintsCollection } from "./infrastructure/mongo/paints-mongo-model";

export type FindByName = (name: string) => Promise<Paint[]>;

export const byName = (collection: PaintsCollection): FindByName => async (name: string) => {
    const paints = await allPaints(collection)();
    return paints
        .filter(paint => 
            paint.name
                .toLowerCase()    
                .includes(
                    name.trim().toLowerCase()));
}