import { createRouter } from "../context";
import { allEquilvalentPaintsResolver, allEquilvalentPaintsSchema } from "./all-equivalent-paints-resolver";

export const paintsRouter = createRouter()
    .query("allEquilvalentPaints", {
        input: allEquilvalentPaintsSchema,
        resolve: ({input}) => allEquilvalentPaintsResolver(input),
    });