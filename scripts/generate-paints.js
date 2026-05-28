import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import Papa from 'papaparse'

const __dirname = dirname(fileURLToPath(import.meta.url))
const CSV_PATH = join(__dirname, '..', 'colores.csv')
const OUT_PATH = join(__dirname, '..', 'src', 'generated', 'paints.ts')

const BRANDS = [
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

function isValidHex(hex) {
  if (!hex || hex.trim() === '') return false
  hex = hex.trim()
  if (/^[0-9]+\.?[0-9]*E[+-]?[0-9]+$/i.test(hex)) return false
  const clean = hex.startsWith('#') ? hex.slice(1) : hex
  if (clean === '0') return true
  if (!/^[0-9A-Fa-f]{6}$/.test(clean)) return false
  return true
}

function normalizeHex(hex) {
  hex = hex.trim()
  if (hex === '0') return '#000000'
  if (!hex.startsWith('#')) return '#' + hex
  return hex.toLowerCase()
}

async function main() {
  const csv = readFileSync(CSV_PATH, 'utf-8')
  const parsed = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  })

  const { parse: culoriParse, converter } = await import('culori')

  const paints = []

  for (const row of parsed.data) {
    const hex = row.HexCode?.trim() ?? ''
    if (!isValidHex(hex)) continue

    const normalizedHex = normalizeHex(hex)
    const color = culoriParse(normalizedHex)
    if (!color) continue
    const lab = converter('lab65')(color)
    if (!lab) continue
    const labArr = [lab.l, lab.a, lab.b]

    for (const brand of BRANDS) {
      const name = row[brand]?.trim() ?? ''
      if (!name) continue
      paints.push({
        brand,
        name,
        hex: normalizedHex,
        lab: labArr,
      })
    }
  }

  const out = `// This file is auto-generated from colores.csv. Do not edit manually.

export interface PaintRecord {
  brand: string
  name: string
  hex: string
  lab: [number, number, number]
}

export const PAINTS: PaintRecord[] = ${JSON.stringify(paints, null, 2)}
`

  writeFileSync(OUT_PATH, out)
  console.log(`Generated ${OUT_PATH} with ${paints.length} paint records.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
