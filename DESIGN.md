# DESIGN.md — Sejong Hoist Crane (LS ELECTRIC design language)

Canonical design reference for this project. Derived from the LS ELECTRIC Korean
homepage (www.ls-electric.com/ko/) via Figma import (html.to.design, frame
`102:401`, extracted 2026-07-05) plus the live site. **Style only** — LS ELECTRIC
content, copy, logos, photography, and icons are strictly prohibited. All content,
images, and copy are Sejong Hoist Crane's own (`public/images/sejong_*.png`).

All values below exist as CSS custom properties in `src/app/globals.css` `:root`.
Style via tokens; hardcode a hex only where this file specifies it (e.g. circle fills).

## 1. Visual theme

Corporate, precise, flat, trustworthy. White canvas carries almost everything;
depth comes from 1px hairlines (`#EEEEEE`), not shadows. Blue is structural
(solid color blocks, circles) *and* interactive (`#388DEE` buttons/links). Dark
slate `#2E373E` — never pure black — anchors headings and the footer. Section
headers are **centered**: bold 42px title over a small 15px gray subtitle.
Whitespace is generous (80px+ section tops); density is low; corners are sharp
except pill buttons and the signature circles.

## 2. Color tokens

| Token | Hex | Role (source name in Figma) |
|---|---|---|
| `--canvas` | `#FFFFFF` | Page/card background |
| `--surface` | `#F7F7F7` | Light gray block (Wild Sand), alt sections |
| `--surface-alt` | `#FAFAFA` | Subtle alternate surface |
| `--surface-2` | `#EFEFEF` | Deeper gray (admin chips etc.) |
| `--navy` | `#2E373D` | Headings (Outer Space) + dark text on light |
| `--navy-deep` | `#232A2F` | Darkest slate (footer boxes) |
| `--ink` | `#333333` | Nav/titles (Mine Shaft) |
| `--body` | `#717171` | Body copy (Dove Gray) |
| `--muted` | `#757575` | Secondary text (Boulder) |
| `--faint` | `#888888` | Tertiary/captions (Gray) |
| `--hairline` | `#EEEEEE` | Card borders, dividers (Gallery) |
| `--line` | `#DBDBDB` | Stronger dividers (Alto); `#E5E5E5` (Mercury) OK inline |
| `--brand` | `#0667B2` | Corporate blue block (Endeavour) |
| `--brand-deep` | `#003777` | Deep blue block (Regal Blue) |
| `--brand-bright` | `#0094CC` | Bright cyan-blue (Pacific) — circle 1 |
| `--brand-cobalt` | `#004BA2` | Cobalt — circle 3 |
| `--primary` | `#388DEE` | Interactive only: buttons, links, focus (Picton) |
| `--primary-deep` | `#2A6BC4` | Button hover |
| `--primary-press` | `#1F4FA0` | Button active |
| `--link` | `#296DBA` | Inline text links (underlined) |
| `--tint` / `--tint-strong` | `#E5EEF7` / `#C6D9F0` | Light blue containers |
| `--success` / `--success-tint` | `#14BC7E` / `#E7F8F2` | Status accent, sparing |
| `--footer-bg` | `#2E373E` | Footer background |
| `--footer-line` | `#515B62` | Footer dividers (Trout) |
| `--footer-link` | `#777D81` | Footer links (Rolling Stone) |
| `--footer-muted` | `#AEAEAE` | Footer emphasized util (Silver Chalice) |
| `--footer-box` | `#232A2F` | Footer select/box background |

Hero scrim: flat `rgba(0,0,0,0.3)` overlay (Figma "Black 30%"); a soft bottom
gradient may be added for slide-control legibility. Circle fills at 90% opacity:
`rgba(0,148,204,.9)`, `rgba(6,104,179,.9)`, `rgba(0,75,162,.9)`, `rgba(0,55,119,.9)`.

## 3. Typography

Korean: **Noto Sans KR** via `next/font/google` in `app/layout.tsx`. (The Figma
import shows Inter — a Latin placeholder; LS ships Noto Sans KR for Korean.)

| Style | Spec | Use |
|---|---|---|
| Hero headline | 700 / clamp(32→55px) / -0.05em / white / text-shadow `0 0 20px rgba(0,0,0,.1), 1px 1px 0 rgba(0,0,0,.3)` | KV over image |
| Hero sub | 400 / ~20px / white, same shadow | One line under headline |
| Section title | 700 / clamp(28→42px) / `--navy` / **centered** | 회사소개, 사업영역 … |
| Section subtitle | 400 / 15px / `--body` / centered, ~10px under title | One sentence |
| Card title lg | 700 / 22–24px | Mosaic news panel, strip cells, circles |
| Block label | 500 / 21–22px | Solid color quick blocks |
| Nav (GNB) | 700 / 18px / `--ink` | Header menu |
| Body | 400 / 14–16px / `--body` / lh 1.5–1.7 | Paragraphs |
| Small/util | 400 / 13px / `--muted` | Header utils, captions |
| Footer col title | 400 / 18px / white | Footer columns |
| Footer link | 400 / 14px / `--footer-link` | Footer lists |
| Copyright | 300 / 12px / `--footer-link` | Right-aligned |

## 4. Layout

- Container **1280px** max, centered; gutters clamp(20px→40px). (LS: 1920 canvas − 2×320.)
- Header `--header-h: 64px`, **always solid white**, bottom 1px `--hairline`. No transparent overlay mode.
- Section rhythm: 80px top padding; 40–50px between section header and content.
- Support strip runs narrower: max-width 1000px inside the container.
- Home mosaic row (≥1024): `256px 1fr 1fr 522px` grid, 280px tall; stacked halves 140px each. <1024: 2-col / stacked.
- Sharp corners on structural cards (`border-radius: 0` in home mosaic/strip);
  tokens `--r-sm..--r-xl` = 2/4/6/8 for inputs & soft cards; `--r-full` for pills/circles.

## 5. Depth & elevation

Flat-first. Cards = 1px `--hairline` border, **no resting shadow** (`--shadow-sm: none`).
Hover may lift with `--shadow-md: 0 0 10px rgba(0,0,0,.08)`. Floating elements only
(top button, FABs): `0 0 10px rgba(0,0,0,.25)`. Never dramatic drops.

## 6. Components

### Header
White bg, 64px, hairline bottom. Logo left. Center-right GNB: 700/18px `--ink`,
hover/active → `--primary`. Right utils: phone 13px `--muted` + compact secondary
pill CTA. Mobile: hamburger → white panel list. Header is `position: fixed`;
pages offset content by `--header-h`.

### Buttons
- **Primary**: bg `--primary`, white text, height 48 (52 hero), padding 0 32,
  `--r-full`, 600–700 weight. Hover `--primary-deep`, active `--primary-press`.
- **Secondary (LS signature pill)**: white bg, **2px solid `--primary`**, text
  `--primary`, `--r-full`, height 48. Hover: bg `--tint`. (From LS language pills.)
- Text link: `--primary` → `--primary-deep`; inline body links `--link` underlined.

### Hero (KV)
Full-width image band, `margin-top: var(--header-h)`, height
`calc(100svh - var(--header-h))` clamped 560–860px. Sejong equipment photo
slideshow (crossfade, **no video**). Flat `rgba(0,0,0,.3)` scrim. Text centered:
headline + one sub line (§3). Controls bottom-center: 8px dots (active = 28px
`--primary` pill) + `01 / 04` tabular counter.

### Overview mosaic (home §2 — "회사소개")
Centered section header, then a 4-part row: ① photo card (Sejong image bg +
`rgba(0,0,0,.35)` overlay, white 15px label + arrow →, links /about) ② stacked
solid blocks: `--brand` white-text block over white hairline-bordered block
③ stacked: `--surface` block over `--brand-deep` white-text block ④ **news
panel**: white, 1px hairline border, title 500/22 with a 1px `#2E373E` rule
under the title row, rows of `[분류]` gray prefix + 16px `--muted` title, 20px
row padding, hairline row dividers, "더보기" 13px top-right. Block anatomy:
label 500/21–22px + small arrow glyph; the whole block is a link; hover =
subtle brightness/underline — no lift, no radius.

### Business circles (home §3 — "사업영역")
Centered header, then overlapping 300px circles (`--r-full`), fills = the 90%
blue alphas in order (bright → brand → cobalt → deep), `margin-left: -30px`
overlap (first none). Inside, centered white: 700/24px title + 400/15px one-word
sub. <1024: 2×2 grid, no overlap, ~220px circles. Circle is a link.

### Support strip (home §4)
Max-width 1000, 4 equal cells 240px tall, separated by 1px `#E5E5E5` borders
(outer edges included). Cell 1: two stacked 700/22px links split by a hairline.
Cells 2–4: 700/22px title + 400/14px `--body` two-line description, content
top-left padded ~33–40px. Whole cell links; hover: title → `--primary`.

### Footer
`--footer-bg`, ~70px top padding. Left: white text wordmark (never a dark logo
image on dark bg) + util links (first item `--footer-muted` 500, rest
`--footer-link`). Middle: 4 link columns — title 400/18 white with a short
underline rule, links 400/14 `--footer-link`, 5px gaps. Bottom: company meta
lines + copyright 300/12 right-aligned. Optional boxed items: `--footer-box` bg,
1px bottom `--footer-line`.

### Sub-pages
PageHero: **centered** — eyebrow 13px `--primary` caps → title 700/42 `--navy` →
15px `--body` sub; `--surface` band, hairline bottom, offset by `--header-h`.
SubNav: white, hairline, active = 2px `--primary` underline. Cards: white,
hairline, radius ≤ 8, no resting shadow. Forms: inputs `--r-sm/md`, focus
`--primary` border + `0 0 0 3px rgba(56,141,238,.12)` ring.

## 7. Motion

Hover/focus transitions 120–200ms ease. Slideshow crossfade ~1s. Entrance
animations restrained: fade/translateY ≤ 24px, 0.6–0.8s ease-out, run once.
No parallax. Numbers may count up once on first view (Sejong stats band).

## 8. Do / Don't

**Do**
- Keep the canvas white; use `--surface` sparingly for alternating bands.
- Center every home section header (title + small gray sub).
- Use solid blue blocks (`--brand`, `--brand-deep`) as color anchors with white text.
- Reserve `--primary` #388DEE for interactive elements.
- Separate flat cells with 1px hairlines; sharp corners on structural cards.
- Use Noto Sans KR everywhere; 700 headings/nav, 400 body.

**Don't**
- **Never use LS ELECTRIC images, logos, icons, copy, or product names.**
- No pure black text/backgrounds — darkest is `#232A2F`/`#2E373D`.
- No resting card shadows; no glassmorphism; no gradients except the hero scrim.
- No rounded corners on mosaic/strip cells (pills & circles are the exceptions).
- No video backgrounds — Sejong equipment photos only.

## 9. Agent guide

Home section order: `StorySection` (image KV) → `OverviewMosaicSection` (회사소개
mosaic + news panel) → `BusinessCirclesSection` (사업영역 circles) →
`StatsHighlightSection` (실적 numbers band — flat, hairline-divided; Sejong
addition, keep) → `SupportStripSection` (support strip) → footer. Data lives in
`src/data/site.ts` (`BUSINESS_AREAS`, `NOTICES`, `PRODUCTS`, `PORTFOLIO`).
Buttons/pills/forms come from `src/styles/subpage.module.css`. When adding UI:
tokens over hex, hairlines over shadows, centered headers, sharp corners, pill CTAs.
