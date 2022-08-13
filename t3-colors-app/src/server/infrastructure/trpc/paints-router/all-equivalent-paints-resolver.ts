import { z } from "zod";
import { findAllEquilvalentPaints } from "../../../find-all-equivalent-paints";
import { findByColorOnMongo } from "../../mongo/finders/find-paint-by-color-on-mongo";
import { findByNameOnMongo } from "../../mongo/finders/find-paints-by-name-on-mongo";
import { getPaintsCollection } from "../../mongo/mongo-db-connector";

export const allEquilvalentPaintsSchema = z.object({
    paintName: z.string().min(1)
});

export const allEquilvalentPaintsResolver = (input: {paintName: string}) => findAllEquilvalentPaints({
    findByName: findByNameOnMongo(getPaintsCollection),
    findByColor: findByColorOnMongo(getPaintsCollection),
})(input.paintName);