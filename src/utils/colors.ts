import { parse, converter, differenceCiede2000 } from 'culori'

export interface NeighborRecord {
  brand: string
  name: string
  hex: string
  deltaE: number
}

export interface PaintRecord {
  brand: string
  name: string
  hex: string
  lab: [number, number, number]
  neighbors: NeighborRecord[]
}

export interface MatchResult {
  brand: string
  name: string
  hex: string
  deltaE: number
}

export function hexToLab(hex: string): [number, number, number] | null {
  try {
    const color = parse(hex)
    if (!color) return null
    const lab = converter('lab65')(color)
    if (!lab) return null
    return [lab.l, lab.a, lab.b]
  } catch {
    return null
  }
}

const diffCiede2000 = differenceCiede2000()

export function findClosestMatches(
  inputHex: string,
  paints: PaintRecord[]
): MatchResult[] {
  const inputColor = parse(inputHex)
  if (!inputColor) return []

  const inputLab = converter('lab65')(inputColor)
  if (!inputLab) return []

  const brandBest = new Map<string, { paint: PaintRecord; deltaE: number }>()

  for (const paint of paints) {
    const paintLab = {
      mode: 'lab65' as const,
      l: paint.lab[0],
      a: paint.lab[1],
      b: paint.lab[2],
    }
    const deltaE = diffCiede2000(inputLab, paintLab)

    const current = brandBest.get(paint.brand)
    if (!current || deltaE < current.deltaE) {
      brandBest.set(paint.brand, { paint, deltaE })
    }
  }

  const results: MatchResult[] = []
  for (const [, { paint, deltaE }] of brandBest) {
    results.push({
      brand: paint.brand,
      name: paint.name,
      hex: paint.hex,
      deltaE: Math.round(deltaE * 100) / 100,
    })
  }

  results.sort((a, b) => a.deltaE - b.deltaE)
  return results
}
