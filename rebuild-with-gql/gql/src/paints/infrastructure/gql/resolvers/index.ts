import { AllPaintsResolver } from "./all-paints-resolver";
import { PaintsByColorResolver } from "./paints-by-color-resolver";
import { PaintsByNameResolver } from "./paints-by-name-resolver";

export const resolvers = [
    AllPaintsResolver,
    PaintsByNameResolver,
    PaintsByColorResolver
] as const;