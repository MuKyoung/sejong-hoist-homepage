# CLAUDE.md

Project: Sejong Hoist Homepage — Next.js web app, driven entirely through Claude Code.
The user does not edit code by hand. Optimize for correctness on the first pass
and for minimal context usage.

Stack: Next.js 16 · App Router · React 19 · TypeScript · Tailwind CSS v4 + CSS Modules · npm

## Commands

Run only when needed. Never start long-lived / watch processes.

- Build:  `npm run build`
- Lint:   `npm run lint`
- Types:  `npx tsc --noEmit`
- Dev server: assume it is already running on :3000. DO NOT start it.

## Project map

Trust this map. Do not scan the file tree to rediscover structure.

- `src/app/`        — routes, layouts, server components (App Router); also `globals.css`
- `src/components/` — UI by area: `home/`, `layout/`, `subpage/`, `demo/`, `providers/` (each with co-located `*.module.css`)
- `src/lib/`        — helpers (`utils.ts`)
- `src/data/`       — static site content (`site.ts`)
- `src/styles/`     — shared CSS Modules (`subpage.module.css`)
- `public/`         — static assets: `images/`, `videos/`, svg icons

### Domain data (single source: `src/data/site.ts`)

All page content/copy lives here — edit data, not markup, for content changes.
- `COMPANY`, `PRODUCTS` (+ `ProductSlug`, drives `/business/[slug]`)
- `PORTFOLIO: PortfolioItem[]` drives `/portfolio` + `/portfolio/[slug]`.
  Item: `slug, src, gallery[], title, client, category(제품유형 라벨), industry(업종),
  capacity(표시), capacityBucket(필터), year, location, period, scope[], description, specs[]`.
  Filter axes: `PORTFOLIO_INDUSTRIES` (업종) × `PORTFOLIO_CAPACITY_BUCKETS` (용량), AND-combined.
  Lookup via `getPortfolioBySlug(slug)`. Detail pages are static (`generateStaticParams`).
- `NOTICES` (+ `NOTICE_CATEGORIES`) drives `/support/notice`.
- Detail-page route pattern (server component, `notFound()` + `generateStaticParams` +
  `generateMetadata`): see `app/business/[slug]/page.tsx` and `app/portfolio/[slug]/page.tsx`.
- Sub-page layout primitives in `components/subpage/` (`PageHero`, `SubNav`, `ContactBand`)
  + shared classes in `styles/subpage.module.css`. Reuse before adding CSS.

Never read these (no value, large): `node_modules/`, `.next/`, `dist/`,
`coverage/`, `*.lock`, and any generated output.

## Conventions

- TypeScript strict. Avoid `any`.
- Server Components by default; add `"use client"` only when actually required.
- Reuse existing components/utilities before writing new ones.
- Copy the import / styling / naming patterns from neighboring files.
- Styling via CSS Modules (`*.module.css`) co-located with components; Tailwind v4 available.
- Site content/copy lives in `src/data/site.ts` — no external data fetching layer.

### Design system (LS ELECTRIC language — style only, no LS content)

All design tokens are CSS custom properties in `app/globals.css` `:root`. Style via
these tokens — never hardcode colors/radii/shadows. Reference: `DESIGN_LSelectric.md`.
- Color: `--primary` (#388dee, interactive only) / `--primary-deep` (hover) / `--primary-press`;
  deep navy `--navy` for dark sections + headings; neutral gray text `--ink`/`--body`/`--muted`/`--faint`
  (avoid pure black/white); surfaces `--canvas`/`--surface`/`--surface-alt`; tints `--tint`/`--tint-strong`.
- Geometry (architectural precision): `--r-sm`→`--r-xl` (4→12px), `--r-full` for **pill CTAs**.
- Elevation (subtle): `--shadow-sm` (resting cards) / `--shadow-md` (hover, primary buttons) / `--shadow-lg`.
- Type: Noto Sans KR (loaded in `app/layout.tsx`). Motion: `--motion-*` + `--ease-std`.
- Dead/unused modules (legacy `--sj-*` vars, not imported): `home/{HeroSection,BusinessSection,
  ValuesSection,PortfolioSection,ContactSection,StatsSection}.module.css` — ignore.

## How to work (keep context small)

- Be terse. No preamble, no "I'll now…", no recap of unchanged code.
- Make the smallest targeted edit. Never rewrite a whole file for a small change.
- Search narrowly: grep/glob by symbol or path. Don't read whole directories
  or files you don't need for the task.
- Don't echo large file contents back to me — summarize in 1–2 lines.
- After a meaningful change, run lint + types on the touched scope only.
  Skip the full test suite unless I ask.
- Stop and confirm before any change spanning more than ~3 files, or touching
  config / build / auth.
- Prefer editing existing files over creating new ones.
