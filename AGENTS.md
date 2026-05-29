# AGENTS.md — MinisColorsApp

## Local Skills Available

This repo has local OpenCode skill files. Check these before searching online docs:
- `.agents/skills/tanstack-start/SKILL.md` — TanStack Start patterns, server functions, SSR config
- `.agents/skills/tailwind/SKILL.md` — Tailwind v4 browser-runtime and compiled build guidance
- `skills-lock.json` — tracks skill versions from their upstream sources

## Data Source: `colores.csv`

This is the single source of truth. Parse it server-side at startup and cache in memory.

- **12 brand columns** + `HexCode` (header row)
- **Scientific notation hex** = invalid row. Skip any row where hex looks like `7.05E+50`, `3.84E+51`, `2.73E+53`.
- **Malformed hex** = invalid row. Example: row 64 has `849B63|` — skip.
- **Quoted newlines** exist. Row 80–81 has a quoted newline in the `INSTARVintage` column. Use a CSV parser that handles `"...\n..."` properly (e.g., `papaparse`).
- **Empty first column** is fine. Rows 100–112 have empty `NewCitadel` but valid paints in other brands. Do not skip a row just because the first brand column is empty.
- **Flatten structure**: each non-empty brand cell becomes its own record `{ brand, name, hex, lab }`. Paint names often include parenthetical stock codes like `(051)` or `(WP1101)` — preserve them.

## Architecture

- **Framework**: TanStack Start (scaffolded in `src/` — see `plans/plan-2026-05-28-mvp-implementation.md`).
- **Deployment**: Vercel preset (`nitro({ preset: 'vercel' })` in `vite.config.ts`).
- **Color matching**: CIEDE2000 Delta E via `culori`. Pre-compute Lab values at parse time. Return the single closest match per brand, sorted by Delta E.

## Data Pipeline

`colores.csv` is **not read at runtime**. Instead, it is parsed at **build time** by `scripts/generate-paints.js`, which produces `src/generated/paints.ts`. This inlined module is then bundled into the server output, eliminating filesystem dependencies in production.

- Run `npm run prebuild` (or `npm run predev`) to regenerate `src/generated/paints.ts` after any CSV change.

## Project State

MVP is implemented and builds successfully. TypeScript compiles clean, and the Vercel-compatible output is generated in `.vercel/output/`.
