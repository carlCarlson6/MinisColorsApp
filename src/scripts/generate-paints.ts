import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import Papa, { type ParseResult } from 'papaparse'
import type { LabColor, Color } from 'culori'

const __dirname = dirname(fileURLToPath(import.meta.url))
const CSV_PATH = join(__dirname, '..', '..', 'colores.csv')
const OUT_PATH = join(__dirname, '..', 'generated', 'paints.ts')

const BRANDS: string[] = [
  'NewCitadel',
  'OldCitadel',
  'VallejoGameColor',
  'VallejoModelColor',
  'INSTAR',
  'INSTARVintage',
  'Rackham',
  'ReaperMaster',
  'PrivateerPressP3',
  "CoatD'arms",
  'ArmyPainter',
  'Scale75',
]

interface CsvRow {
  HexCode?: string
  [brand: string]: string | undefined
}

function isValidHex(hex: string): boolean {
  if (!hex || hex.trim() === '') return false
  const trimmed = hex.trim()
  if (/^[0-9]+\.?[0-9]*E[+-]?[0-9]+$/i.test(trimmed)) return false
  const clean = trimmed.startsWith('#') ? trimmed.slice(1) : trimmed
  if (clean === '0') return true
  if (!/^[0-9A-Fa-f]{6}$/.test(clean)) return false
  return true
}

function normalizeHex(hex: string): string {
  const trimmed = hex.trim()
  if (trimmed === '0') return '#000000'
  if (!trimmed.startsWith('#')) return '#' + trimmed
  return trimmed.toLowerCase()
}

async function main(): Promise<void> {
  const csv = readFileSync(CSV_PATH, 'utf-8')
  const parsed: ParseResult<CsvRow> = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  })

  const { parse: culoriParse, converter, differenceCiede2000 } = await import('culori')
  const diffCiede2000 = differenceCiede2000()

  const paints: {
    brand: string
    name: string
    hex: string
    lab: [number, number, number]
    neighbors: { brand: string; name: string; hex: string; deltaE: number }[]
  }[] = []

  for (const row of parsed.data) {
    const hex = row.HexCode?.trim() ?? ''
    if (!isValidHex(hex)) continue

    const normalizedHex = normalizeHex(hex)
    const color = culoriParse(normalizedHex) as Color | undefined
    if (!color) continue
    const lab = converter('lab65')(color) as LabColor | undefined
    if (!lab) continue
    const labArr: [number, number, number] = [lab.l, lab.a, lab.b]

    for (const brand of BRANDS) {
      const name = row[brand]?.trim() ?? ''
      if (!name) continue
      paints.push({
        brand,
        name,
        hex: normalizedHex,
        lab: labArr,
        neighbors: [],
      })
    }
  }

  // Pre-compute 2 nearest neighbors for every paint
  console.log(`Computing nearest neighbors for ${paints.length} paints...`)
  for (let i = 0; i < paints.length; i++) {
    const a = paints[i]
    const aLab = { mode: 'lab65' as const, l: a.lab[0], a: a.lab[1], b: a.lab[2] }

    let best1: { brand: string; name: string; hex: string; deltaE: number } | null = null
    let best2: { brand: string; name: string; hex: string; deltaE: number } | null = null

    for (let j = 0; j < paints.length; j++) {
      if (i === j) continue
      const b = paints[j]
      const bLab = { mode: 'lab65' as const, l: b.lab[0], a: b.lab[1], b: b.lab[2] }
      const deltaE = diffCiede2000(aLab, bLab)

      if (!best1 || deltaE < best1.deltaE) {
        best2 = best1
        best1 = { brand: b.brand, name: b.name, hex: b.hex, deltaE }
      } else if (!best2 || deltaE < best2.deltaE) {
        best2 = { brand: b.brand, name: b.name, hex: b.hex, deltaE }
      }
    }

    a.neighbors = []
    if (best1) a.neighbors.push(best1)
    if (best2) a.neighbors.push(best2)
  }

  const out = `// This file is auto-generated from colores.csv. Do not edit manually.

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

export const PAINTS: PaintRecord[] = ${JSON.stringify(paints, null, 2)}
`

  writeFileSync(OUT_PATH, out)
  console.log(`Generated ${OUT_PATH} with ${paints.length} paint records.`)
}

main().catch((e: unknown) => {
  console.error(e)
  process.exit(1)
})
