# Minis Colors App - Paint Name Finder Plan

**Date:** May 29, 2026
**Scope:** Post-MVP feature — Search by paint name with nearest-neighbor color recommendations
**Satus:** COMPLETED

---

## 1. Overview

Add a second mode to the home page that lets users type a paint name, get fuzzy-matched results, and view the 2 most similar colors (by CIEDE2000 Delta E) for any selected paint. All neighbor data is pre-computed at build time for instant runtime lookups.

---

## 2. Tech Stack (unchanged)

| Layer | Technology |
|---|---|
| Framework | TanStack Start (React, Vite, Nitro SSR) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Color Science | `culori` — Lab conversion + CIEDE2000 Delta E |
| Fuzzy Search | Custom lightweight Levenshtein distance scorer (~20 LOC) |

---

## 3. Data Pipeline (`scripts/generate-paints.js`)

### 3.1 Neighbor Pre-computation
For every paint in the flattened dataset, compute the 2 closest *other* paints using the existing CIEDE2000 engine.
- **Scope:** Global (all brands, including same brand).
- **Complexity:** ~7,000 paints → ~49M Delta E comparisons. Acceptable at build time; if too slow, add an `L` channel pre-filter.
- **Storage:** Embed neighbors directly into each `PaintRecord`.

### 3.2 Updated `PaintRecord` interface
```typescript
export interface PaintRecord {
  brand: string
  name: string
  hex: string
  lab: [number, number, number]
  neighbors: Array<{
    brand: string
    name: string
    hex: string
    deltaE: number
  }>
}
```

### 3.3 Output
`src/generated/paints.ts` imports the updated `PaintRecord` and exports `PAINTS` where every record carries its 2 nearest neighbors. No additional lookup tables needed.

---

## 4. Fuzzy Search Utility (`src/utils/fuzzy-search.ts`)

### 4.1 Algorithm
- Lightweight **Levenshtein distance** scorer (~20 lines, zero new dependencies).
- Lowercase query and every paint name before scoring.

### 4.2 API
```typescript
export function searchPaintsByName(
  query: string,
  paints: PaintRecord[],
  limit = 20
): PaintRecord[]
```
- Scores all paints by string distance.
- Sorts ascending and caps results to the top `limit`.
- Returns enriched records with `neighbors` already attached.

---

## 5. Server Function

### 5.1 `searchByName`
- **Type:** `createServerFn` GET
- **Input:** `{ q: string }` (min length 1)
- **Logic:**
  1. Load paints via `loadPaints()`.
  2. Run `searchPaintsByName(data.q, paints, 20)`.
  3. Return the enriched `PaintRecord[]` (with `neighbors`) directly to the client.
- **No extra runtime cost** for neighbors — they are inlined at build time.

---

## 6. UI Plan (`src/routes/index.tsx`)

### 6.1 Tab Toggle
Add a mode switch at the top of the page:
- **Match by Color** (existing picker + results grid)
- **Search by Name** (new mode)

### 6.2 Name Search Mode
- **Input:** Free-text field + "Search" button.
- **Results list:** Scrollable cards showing brand, paint name, and hex swatch.
- **Interaction:** Clicking a result opens a **detail modal / panel**.
  - Selected paint (large swatch, brand, name, hex).
  - **"2 Most Similar Colors"** section with two smaller cards (swatch, brand, name, ΔE). Data comes from the pre-computed `neighbors` field — zero additional server round-trip.

### 6.3 Design Notes
- Keep layout consistent with existing Tailwind tokens (`bg-surface-alt`, `text-text`, `border-border`, etc.).
- Modal/panel should be keyboard-dismissible and mobile-friendly.

---

## 7. Project Structure Updates

```
/
├── plans/
│   ├── plan-2026-05-28-mvp-implementation.md  # MVP plan
│   └── plan-2026-05-29-paint-name-finder.md # This file
├── src/
│   ├── routes/
│   │   ├── __root.tsx                  # Root layout (unchanged)
│   │   └── index.tsx                   # Home page + tab toggle + name search UI
│   ├── utils/
│   │   ├── colors.ts                   # PaintRecord, hexToLab, findClosestMatches
│   │   ├── fuzzy-search.ts             # NEW — Levenshtein scorer + search function
│   │   └── paints.ts                   # loadPaints() (unchanged)
│   └── generated/
│       └── paints.ts                   # UPDATED — PaintRecord now includes neighbors
├── scripts/
│   └── generate-paints.js              # UPDATED — neighbor pre-computation
├── colores.csv                         # Source data (unchanged)
└── ...config files...
```

---

## 8. Decisions Log

| Decision | Options | Choice | Rationale |
|---|---|---|---|
| Similarity metric | Name distance / Color distance | **Color distance** | Reuses existing CIEDE2000 engine, more useful for painters |
| Scope of "2 similar colors" | Same brand only / Per other brand / Global | **Global** | Most useful for cross-brand alternatives |
| Name matching | Substring / Fuzzy / Exact | **Fuzzy** | Paint names are long and easy to misspell |
| Result cap | All matches / Capped | **Capped at 20** | Keeps UI and server response bounded |
| UI access | Tab toggle / Separate route / Auto-detect | **Tab toggle** | Keeps app single-page and intuitive |
| Similar colors display | Inline / Detail panel | **Detail panel** | Clean result list, focused comparison on demand |
| Neighbor lookup key | Integer ID / String key / Embedded | **Embedded** | Simplest API, no extra lookups, minimal memory overhead for 2 items |
| Same-brand neighbors | Exclude / Allow | **Allow** | Closest is closest; users can visually filter themselves |

---

## 9. Success Criteria

- [ ] `npm run prebuild` regenerates `paints.ts` with `neighbors` on every paint.
- [ ] Switching to "Search by Name" allows fuzzy text search (e.g., `"abodon blak"` → `"Abaddon Black"`).
- [ ] Each result card opens a detail panel showing the 2 closest colors with brand, name, hex swatch, and ΔE.
- [ ] No additional server round-trip is needed to fetch the 2 similar colors.
- [ ] Existing "Match by Color" tab continues to work identically.

---

*Plan finalized after grilling on May 29, 2026.*
