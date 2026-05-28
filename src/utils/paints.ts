import { type PaintRecord } from '~/utils/colors'
import { PAINTS } from '~/generated/paints'

let cachedPaints: PaintRecord[] | null = null

export function loadPaints(): PaintRecord[] {
  if (cachedPaints) return cachedPaints
  cachedPaints = PAINTS
  return cachedPaints
}
