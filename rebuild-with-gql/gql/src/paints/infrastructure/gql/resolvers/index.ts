import { AllPaintsResolver } from "./all-paints-resolver";
import { PaintsByColorResolver } from "./paints-by-color-resolver";
import { PaintsExtensions } from "./paints-extensions";
import { PaintsByNameResolver } from "./paints-by-name-resolver";

export const resolvers = [
    AllPaintsResolver,
    PaintsByNameResolver,
    PaintsByColorResolver,
    PaintsExtensions
] as const;