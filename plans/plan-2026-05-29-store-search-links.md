# Minis Colors App — Store Search Links Plan

**Date:** May 29, 2026
**Scope:** Add store search links (Goblin Trader + Amazon) to every main result card on both tabs.
**Status:** COMPLETED

---

## 1. Overview

On both the "Match by Color" and "Search by Name" result cards, add a compact action row with external search links for the paint name. Clicking a link opens the store search page in a new browser tab.

---

## 2. URLs

| Store | Template |
|---|---|
| **Goblin Trader** | `https://www.goblintrader.es/es/buscar?controller=search&s=<ENCODED_NAME>` |
| **Amazon** | `https://www.amazon.es/s?k=<ENCODED_NAME>` |

`<ENCODED_NAME>` = `encodeURIComponent(paintName)`.

Links always open in a **new tab** via `target="_blank" rel="noopener noreferrer"`.

---

## 3. Design Decisions

| Decision | Options | Choice | Rationale |
|---|---|---|---|
| Link placement | Inline text / Icon buttons / Bottom action row | **Bottom action row** | Dedicated, clean, consistent across both tabs |
| Cards affected | Main results only / Neighbors too | **Main results only** | Neighbor rows are intentionally compact; adding links there would create visual noise |
| Color-match card layout | Stay horizontal / Wrap bottom row / Full vertical stack | **Full vertical stack** | Gives action row full width and aligns visually with name-search cards that already have a "Similar" section |
| Link appearance | Pill buttons / Text with icons / Plain text | **Plain text links** | Zero icon-library dependency; muted color with hover state matches existing UI |

---

## 4. UI Specification

### 4.1 Reusable Helper

Create `encodeStoreUrl(paintName: string, store: 'goblin' | 'amazon'): string`.

### 4.2 Color-Match Card ("Match by Color")

Current layout: `flex items-center gap-3` horizontal row.

New layout:
```
<div class="flex flex-col ...">          /* card container */
  <div class="flex items-center gap-3">  /* top row */
    <div class="swatch" />               /* 48×48 rounded swatch */
    <div class="min-w-0">                /* text block */
      <p class="brand" />
      <p class="name" />
      <p class="deltaE" />
    </div>
  </div>
  <div class="mt-3 border-t border-border pt-2">  /* NEW action row */
    <a href="goblin-url" target="_blank" rel="noopener noreferrer">Goblin Trader</a>
    <span class="mx-2">·</span>
    <a href="amazon-url" target="_blank" rel="noopener noreferrer">Amazon</a>
  </div>
</div>
```

Styling tokens: `text-[10px] text-text-muted hover:text-primary`.

### 4.3 Name-Search Card ("Search by Name")

Current layout: vertical card with `[swatch + info]` on top, optional "Similar" section below.

Add the same action row **between** the main info block and the "Similar" section (if present). This ensures the links are always visible and tied to the primary paint.

Styling identical to color-match cards.

---

## 5. Files to Modify

| File | Change |
|---|---|
| `src/routes/index.tsx` | Convert color-match card layout; add store link row to both `matches.map` and `nameResults.map` cards |

No new files needed.

---

## 6. Build & Verification Steps

1. Run `npm run dev`.
2. Open the app.
3. **Color tab:** Pick a color → click "Find Matches". Each result card should show "Goblin Trader · Amazon" below the swatch. Click each link; verify it opens the correct store search in a new tab.
4. **Name tab:** Search for a paint (e.g., "Abaddon Black") → each result card should show the same action row. Click links; verify external new-tab behavior.
5. Run `npm run build` and confirm no TypeScript errors.

---

*Plan finalized after grilling on May 29, 2026.*
