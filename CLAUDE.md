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
- Public content is hybrid: `src/lib/cms.ts` (`getNotices`/`getPortfolioList`/…)
  reads published DB rows via a cookie-less anon client (`supabase/public.ts`),
  falling back to `site.ts` statics when unconfigured/empty. Home, notice and
  portfolio pages use it with `revalidate = 300`; admin actions revalidatePath
  the public routes. Portfolio images upload to Storage bucket
  `portfolio-images` (policies in schema.sql; next.config allows *.supabase.co).

### Domain data (single source: `src/data/site.ts`)

All page content/copy lives here — edit data, not markup, for content changes.
- `COMPANY`, `PRODUCTS` (+ `ProductSlug`, drives `/business/[slug]`)
- `BUSINESS_AREAS` (slug/icon/points; drives home circles + `/business` rows via
  `#slug` anchors). `GREETING`/`HISTORY`/`ORG_UNITS` drive `/about`, `/about/history`,
  `/about/organization` (2026-07 클라이언트 확정 실데이터).
- `CERT_DOCS` (안전인증서 5권, 전 페이지 이미지 `/images/certs/{slug}/pNN.jpg`,
  뷰어 `/technology/certs/[slug]`) + `REVIEW_DOCS` (서면심사도서 11권 표지) +
  `TECH_CAPABILITY`/`SAFETY_STEPS` drive `/technology`.
- Top nav (client categories): 회사소개 / 사업영역 / 시공사례 / 기술·인증 / 견적·문의.
  Header also hosts a hover KOR/ENG dropdown → `/` ↔ `/en`.
- i18n (phase 1): `/en` = English HOME only. Home sections + Header/Footer/
  FloatingCta take `locale?: "ko"|"en"` with co-located dicts (ko default —
  Korean pages unaffected). Locale is derived from the pathname (`/en...`).
  Subpage EN + full [lang] routing = next phase (needs client-approved copy).
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

### Design system (LS ELECTRIC language — canonical spec: `DESIGN.md`)

**Read `DESIGN.md` before any UI work.** Style is LS ELECTRIC (Figma-extracted,
style only — LS content/logos/images strictly forbidden). All tokens are CSS custom
properties in `app/globals.css` `:root` — style via tokens, never hardcode (exceptions
listed in DESIGN.md: circle alphas, #E5E5E5 strip dividers, hero scrim/text-shadow).
- Color (Sejong variation): **NO BLUE — navy ramp only** (#3e5c80→#16273c). White
  canvas; `--primary` #2c4a6e navy (interactive only, = `--brand`); blocks/circles
  from `--brand-bright/--brand/--brand-cobalt/--brand-deep`; `--navy` #233140
  headings, `--footer-*` navy-slate footer; text `--ink`/`--body`/`--muted`/`--faint`.
- Geometry: **sharp** structural cards (`--r-lg/xl` = 0) with 16px gaps (LS is gap-0);
  circles tangent, never overlapped; `--r-full` pills + circles; inputs 2–4px.
  Elevation: flat (`--shadow-sm: none`), hairline borders; `--shadow-md` hover only.
- Type: Noto Sans KR via `next/font` (`app/layout.tsx`); centered section headers
  (700/42px `--navy` + 15px `--body` sub). Header: solid white, fixed, `--header-h` 64px.
- Home = LS flow: `StorySection` (compact split hero — small 4:3 image card, NO
  full-bleed/wide photo backgrounds) → `OverviewMosaicSection` (mosaic + news band)
  → `BusinessCirclesSection` → `StatsHighlightSection` (navy dark band) →
  `PortfolioPreviewSection` (proof under the numbers) → `SupportStripSection`.
  Footer = dark slate LS form. 견적 CTA = `FloatingCta` FAB
  (bottom-right, safe-area offsets), not in the header.
- Unused-but-kept home modules: QuickNav/BusinessAreas/PortfolioPreview/News/InquiryBanner/
  MissionStats/Team + legacy `--sj-*` modules (HeroSection, BusinessSection, ValuesSection,
  PortfolioSection, ContactSection, StatsSection) — not imported; ignore.

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
