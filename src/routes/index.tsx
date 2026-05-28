import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { HexColorPicker } from 'react-colorful'
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { type MatchResult, findClosestMatches } from '~/utils/colors'

const getMatches = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ hex: z.string() }))
  .handler(async ({ data }) => {
    const { loadPaints } = await import('~/utils/paints')
    const paints = loadPaints()
    return findClosestMatches(data.hex, paints)
  })

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  const [color, setColor] = useState('#3b82f6')
  const [matches, setMatches] = useState<MatchResult[] | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    setLoading(true)
    try {
      const result = await getMatches({ data: { hex: color } })
      setMatches(result)
    } catch (e) {
      console.error(e)
      setMatches([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-text sm:text-5xl">
          Minis Colors
        </h1>
        <p className="mt-3 text-lg text-text-muted">
          Find the closest miniature paint match across brands using CIEDE2000 Delta&nbsp;E.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        {/* Color Picker */}
        <section className="mx-auto w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <div className="flex flex-col items-center gap-6">
            <HexColorPicker
              color={color}
              onChange={setColor}
              className="react-colorful w-full !h-56 rounded-xl shadow-inner"
            />

            <div className="flex w-full items-center gap-3">
              <span className="text-sm font-semibold uppercase tracking-wide text-text-muted">
                Hex
              </span>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="flex-1 rounded-lg border border-border bg-surface-alt px-3 py-2 font-mono text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="#3b82f6"
              />
            </div>

            <button
              onClick={handleSearch}
              disabled={loading}
              className="w-full rounded-lg bg-primary px-5 py-3 font-semibold text-white shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50"
            >
              {loading ? 'Searching…' : 'Find Matches'}
            </button>
          </div>
        </section>

        {/* Results */}
        {matches !== null && (
          <section>
            <h2 className="mb-6 text-2xl font-bold text-text">
              {matches.length > 0
                ? `Closest matches (${matches.length} brands)`
                : 'No matches found'}
            </h2>

            {matches.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {matches.map((match) => (
                  <div
                    key={match.brand + match.name}
                    className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4 shadow-sm transition hover:shadow-md"
                  >
                    <div
                      className="h-14 w-14 shrink-0 rounded-lg shadow-inner"
                      style={{ backgroundColor: match.hex }}
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                        {match.brand}
                      </p>
                      <p className="truncate text-sm font-medium text-text">
                        {match.name}
                      </p>
                      <p className="text-xs text-text-muted">
                        ΔE {match.deltaE.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-text-muted">
                Try a different color or check your input.
              </p>
            )}
          </section>
        )}
      </div>
    </div>
  )
}
