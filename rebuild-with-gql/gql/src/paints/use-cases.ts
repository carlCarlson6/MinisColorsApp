import { AllPaints } from "./all-paints"
import { FindByColor } from "./find-by-color"
import { FindByName } from "./find-by-name"
import { FindByNearestColor } from "./find-by-nearest-color"

export type UseCases = {
    all: AllPaints,
    byName: FindByName,
    byColor: FindByColor,
    byNearestColor: FindByNearestColor
}