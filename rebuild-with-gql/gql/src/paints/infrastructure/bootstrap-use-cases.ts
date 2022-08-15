import { allPaints } from "../all-paints";
import { byColor } from "../find-by-color";
import { byName } from "../find-by-name";
import { byNearestColor } from "../find-by-nearest-color";
import { UseCases } from "../use-cases";
import { getPaintsCollection } from "./mongo/mongo-db-connector";
import { PaintsCollection } from "./mongo/paints-mongo-model";

export const buildUseCases = async (): Promise<UseCases> => {
    const paintsCollection = await getPaintsCollection();
    return bootstrapUseCases(paintsCollection);
}

export const bootstrapUseCases = (paintsCollection: PaintsCollection): UseCases => ({
    all: allPaints(paintsCollection),
    byName: byName(paintsCollection),
    byColor: byColor(paintsCollection),
    byNearestColor: byNearestColor(paintsCollection)
})