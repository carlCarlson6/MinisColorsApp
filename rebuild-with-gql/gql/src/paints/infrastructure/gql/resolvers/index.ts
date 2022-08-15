import { AllPaintsResolver } from "./all-paints-resolver";
import { PaintsByNameResolver } from "./paints-by-name-resolver";

export const resolvers = [
    AllPaintsResolver,
    PaintsByNameResolver,
] as const;