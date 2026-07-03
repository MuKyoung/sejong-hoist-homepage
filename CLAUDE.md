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
- `src/app/admin/`  — CMS (Supabase). `login/` (public) + `(protected)/` route group
  (guarded by `middleware.ts` + layout). Server Actions in `(protected)/actions.ts`.
- `src/components/` — UI by area: `home/`, `layout/`, `subpage/`, `admin/`, `demo/`, `providers/` (co-located `*.module.css`)
- `src/lib/`        — helpers (`utils.ts`); `supabase/` clients (`client`/`server`/`middleware`), `env`, `types`
- `src/data/`       — static site content (`site.ts`)
- `src/styles/`     — shared CSS Modules (`subpage.module.css`)
- `supabase/`       — `schema.sql` (tables + RLS). Setup: `CMS_SETUP.md`
- `public/`         — static assets: `images/`, `videos/`, svg icons

### CMS / Supabase (see `CMS_SETUP.md`)

- Auth = Supabase Auth (httpOnly cookie session). `middleware.ts` guards `/admin`
  (matcher-scoped, so marketing pages stay static). Access control = **RLS** in
  `supabase/schema.sql` — never trust the client. Roles: `admin` (members/roles)
  vs `editor` (content). Helpers `is_admin()` / `is_staff()`.
- Admin pages are `dynamic = "force-dynamic"` (use cookies). Mutations via Server
  Actions under the user session. Env-guarded: builds/works without Supabase env
  (`isSupabaseConfigured`), showing a "not configured" state.
- Public inquiry form (`support/inquiry`) inserts into `inquiries` (anon INSERT-only).

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

### Design system (KCD style + LS ELECTRIC layout — style only, no external content)

Visual style follows 한국신용데이터(KCD, kcd.co.kr): friendly, rounded, airy, soft
shadows. Layout/section composition references LS ELECTRIC. All tokens are CSS custom
properties in `app/globals.css` `:root` — style via tokens, never hardcode.
- Color: `--primary` (#2d8cff KCD blue, interactive only) / `--primary-deep` / `--primary-press`;
  deep indigo-navy `--navy` for dark sections + headings; text `--ink`/`--body`/`--muted`/`--faint`;
  surfaces `--canvas`/`--surface`/`--surface-alt`; tints `--tint`/`--tint-strong`; mint `--success`.
- Geometry (rounded/friendly): `--r-sm`→`--r-xl` (8→24px), `--r-full` for **pill CTAs**.
- Elevation (soft): `--shadow-sm` (resting cards) / `--shadow-md` (hover, primary buttons) / `--shadow-lg`.
- Type: Pretendard (CDN `<link>` in `app/layout.tsx`). Motion: `--motion-*` + `--ease-std`.
- Home = LS section flow: `StorySection` (Sejong image slideshow hero, no video) →
  `QuickNavSection` (4-card overview) → `BusinessAreasSection` → `PortfolioPreviewSection`
  → `NewsSection` → `InquiryBannerSection`. `MissionStatsSection`/`TeamSection` unused but kept.
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
