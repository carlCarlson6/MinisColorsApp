import type { PaintRecord } from '~/utils/colors'

function levenshtein(a: string, b: string): number {
  const m = a.length
  const n = b.length
  if (m === 0) return n
  if (n === 0) return m

  const prev = new Array(n + 1)
  const curr = new Array(n + 1)

  for (let j = 0; j <= n; j++) {
    prev[j] = j
  }

  for (let i = 1; i <= m; i++) {
    curr[0] = i
    const ai = a[i - 1]
    for (let j = 1; j <= n; j++) {
      const cost = ai === b[j - 1] ? 0 : 1
      curr[j] = Math.min(
        prev[j] + 1,     // deletion
        curr[j - 1] + 1, // insertion
        prev[j - 1] + cost // substitution
      )
    }
    for (let j = 0; j <= n; j++) {
      prev[j] = curr[j]
    }
  }

  return prev[n]
}

export function searchPaintsByName(
  query: string,
  paints: PaintRecord[],
  limit = 20
): PaintRecord[] {
  const q = query.toLowerCase().trim()
  if (!q) return []

  const scored = paints.map((paint) => {
    const name = paint.name.toLowerCase()
    let score: number
    if (name.includes(q)) {
      // Bonus for substring matches; shorter exact matches rank higher
      score = levenshtein(q, name) - 1000
    } else {
      score = levenshtein(q, name)
    }
    return { paint, score }
  })

  scored.sort((a, b) => a.score - b.score)
  return scored.slice(0, limit).map((s) => s.paint)
}
