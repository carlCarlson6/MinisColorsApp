# Minis Colors App

A web application for miniature painters to find equivalent paint colors across different brands. Select any color and instantly discover the closest matching paints from Citadel, Vallejo, Army Painter, Scale75, and more.

## Features

- **Color Picker Search** — Use an intuitive color picker to select any color and find matching paints
- **Perceptual Color Matching** — Powered by CIEDE2000 Delta E for accurate color similarity
- **Multi-Brand Results** — See the closest match from each paint brand in your database
- **Visual Swatches** — Color swatches help you visually confirm matches
- **SSR Performance** — Fast server-side rendering with TanStack Start

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) — Full-stack React with SSR
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Color Science**: [culori](https://culorijs.org/) — Lab color space + CIEDE2000
- **Color Picker**: [react-colorful](https://github.com/omgovich/react-colorful)
- **CSV Parsing**: [PapaParse](https://www.papaparse.com/)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd MinisColorsApp

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Building for Production

```bash
npm run build
```

### Deploying to Vercel

The app is configured for Vercel deployment. Connect your GitHub repository to Vercel for automatic deployments.

```bash
# Or deploy manually
vercel --prod
```

## How It Works

1. **Data Loading**: On server startup, the app parses `colores.csv` and flattens each paint entry into individual records with pre-computed Lab color values.
2. **Color Matching**: When you select a color, the server converts it to Lab space and calculates the CIEDE2000 Delta E distance against all paints.
3. **Results**: The closest match per brand is returned, sorted by perceptual similarity.

## Data Source

The paint database (`colores.csv`) includes colors from:

- Citadel (New & Old ranges)
- Vallejo Game Color
- Vallejo Model Color
- INSTAR & INSTAR Vintage
- Rackham
- Reaper Master Series
- Privateer Press P3
- Coat d'arms
- The Army Painter
- Scale75

## Project Structure

```
├── app/
│   ├── routes/
│   │   ├── __root.tsx          # Root layout
│   │   └── index.tsx            # Main search page
│   ├── utils/
│   │   └── colors.ts            # CSV parser & color matching logic
│   ├── client.tsx               # Client entry
│   ├── ssr.tsx                  # SSR entry
│   └── router.tsx               # Router setup
├── plans/
│   ├── plan-2026-05-28-mvp-implementation.md       # MVP plan
│   └── plan-2026-05-29-paint-name-finder.md        # Paint name finder plan
├── colores.csv                  # Paint color database
├── app.config.ts                # TanStack Start config
├── package.json
└── README.md
```

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server

## License

MIT

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.
