import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { HexColorPicker } from 'react-colorful'
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { type MatchResult, type PaintRecord, findClosestMatches } from '~/utils/colors'

const getMatches = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ hex: z.string() }))
  .handler(async ({ data }) => {
    const { loadPaints } = await import('~/utils/paints')
    const paints = loadPaints()
    return findClosestMatches(data.hex, paints)
  })

const searchByName = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ q: z.string().min(1) }))
  .handler(async ({ data }) => {
    const { loadPaints } = await import('~/utils/paints')
    const { searchPaintsByName } = await import('~/utils/fuzzy-search')
    const paints = loadPaints()
    return searchPaintsByName(data.q, paints, 20)
  })

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  const [activeTab, setActiveTab] = useState<'color' | 'name'>('color')

  // Color match state
  const [color, setColor] = useState('#3b82f6')
  const [matches, setMatches] = useState<MatchResult[] | null>(null)
  const [loading, setLoading] = useState(false)

  // Name search state
  const [nameQuery, setNameQuery] = useState('')
  const [nameResults, setNameResults] = useState<PaintRecord[] | null>(null)
  const [nameLoading, setNameLoading] = useState(false)

  const handleColorSearch = async () => {
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

  const handleNameSearch = async () => {
    const q = nameQuery.trim()
    if (!q) return
    setNameLoading(true)
    try {
      const result = await searchByName({ data: { q } })
      setNameResults(result)
    } catch (e) {
      console.error(e)
      setNameResults([])
    } finally {
      setNameLoading(false)
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

      {/* Tab Toggle */}
      <div className="mx-auto mb-10 flex max-w-md justify-center rounded-xl border border-border bg-surface p-1 shadow-sm">
        <button
          onClick={() => setActiveTab('color')}
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition ${
            activeTab === 'color'
              ? 'bg-primary text-white shadow'
              : 'text-text-muted hover:text-text'
          }`}
        >
          Match by Color
        </button>
        <button
          onClick={() => setActiveTab('name')}
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition ${
            activeTab === 'name'
              ? 'bg-primary text-white shadow'
              : 'text-text-muted hover:text-text'
          }`}
        >
          Search by Name
        </button>
      </div>

      {activeTab === 'color' ? (
        <div className="mx-auto flex max-w-4xl flex-col gap-8">
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
                onClick={handleColorSearch}
                disabled={loading}
                className="w-full rounded-lg bg-primary px-5 py-3 font-semibold text-white shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50"
              >
                {loading ? 'Searching…' : 'Find Matches'}
              </button>
            </div>
          </section>

          {/* Color Results */}
          {matches !== null && (
            <section>
              <h2 className="mb-6 text-2xl font-bold text-text">
                {matches.length > 0
                  ? `Closest matches (${matches.length} brands)`
                  : 'No matches found'}
              </h2>

              {matches.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-3">
                  {matches.map((match) => (
                    <div
                      key={match.brand + match.name}
                      className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3 shadow-sm transition hover:shadow-md"
                    >
                      <div
                        className="h-12 w-12 shrink-0 rounded-lg shadow-inner"
                        style={{ backgroundColor: match.hex }}
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                          {match.brand}
                        </p>
                        <p className="truncate text-xs font-medium text-text">
                          {match.name}
                        </p>
                        <p className="text-[10px] text-text-muted">
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
      ) : (
        <div className="mx-auto max-w-4xl">
          {/* Name Search Input */}
          <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <input
                type="text"
                value={nameQuery}
                onChange={(e) => setNameQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleNameSearch()
                }}
                placeholder="Type a paint name…"
                className="flex-1 rounded-lg border border-border bg-surface-alt px-4 py-3 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <button
                onClick={handleNameSearch}
                disabled={nameLoading || !nameQuery.trim()}
                className="rounded-lg bg-primary px-6 py-3 font-semibold text-white shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50"
              >
                {nameLoading ? 'Searching…' : 'Search'}
              </button>
            </div>
          </section>

          {/* Name Results */}
          {nameResults !== null && (
            <section className="mt-8">
              <h2 className="mb-6 text-2xl font-bold text-text">
                {nameResults.length > 0
                  ? `Results (${nameResults.length})`
                  : 'No results found'}
              </h2>

              {nameResults.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-3">
                  {nameResults.map((paint) => (
                    <div
                      key={paint.brand + paint.name}
                      className="rounded-xl border border-border bg-surface p-4 shadow-sm transition hover:shadow-md"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="h-12 w-12 shrink-0 rounded-lg shadow-inner"
                          style={{ backgroundColor: paint.hex }}
                          aria-hidden="true"
                        />
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                            {paint.brand}
                          </p>
                          <p className="truncate text-xs font-medium text-text">
                            {paint.name}
                          </p>
                          <p className="text-[10px] text-text-muted">
                            {paint.hex}
                          </p>
                        </div>
                      </div>

                      {/* Inline neighbors */}
                      {paint.neighbors.length > 0 && (
                        <div className="mt-3 space-y-1.5 border-t border-border pt-2">
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                            Similar
                          </p>
                          {paint.neighbors.map((n) => (
                            <div
                              key={n.brand + n.name}
                              className="flex items-center gap-1.5"
                            >
                              <div
                                className="h-3.5 w-3.5 shrink-0 rounded-sm shadow-inner"
                                style={{ backgroundColor: n.hex }}
                                aria-hidden="true"
                              />
                              <span className="truncate text-[10px] leading-tight text-text-muted">
                                <span className="font-medium text-text">
                                  {n.name}
                                </span>{' '}
                                &middot; {n.brand} &middot; ΔE{' '}
                                {n.deltaE.toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-text-muted">
                  Try a different search term.
                </p>
              )}
            </section>
          )}
        </div>
      )}
    </div>
  )
}
