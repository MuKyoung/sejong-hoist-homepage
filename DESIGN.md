# DESIGN.md — Sejong Hoist Crane (LS ELECTRIC design language, Sejong variation)

Canonical design reference for this project. Derived from the LS ELECTRIC Korean
homepage (www.ls-electric.com/ko/) via Figma import (html.to.design, frame
`102:401`, extracted 2026-07-05) plus the live site. **Style only** — LS ELECTRIC
content, copy, logos, photography, and icons are strictly prohibited. All content,
images, and copy are Sejong Hoist Crane's own (`public/images/sejong_*.png`).

**Sejong variation (updated 2026-07-06):** section composition and the sharp LS
geometry stay; the palette is what differentiates us:
- **NO BLUE, navy only.** The entire chromatic range is a single navy ramp
  (`#3E5C80 → #16273C`) + white + neutral grays. Interactive color = navy
  `--primary #2C4A6E`. LS's blues (#388DEE/#0667B2/#0094CC…) are forbidden.
- Geometry: **sharp** structural cards (radius 0) like LS, but cells are
  **separated by 16px gaps** (LS is gap-0 connected). Pills (`--r-full`) remain
  the only full rounds besides circles; inputs keep 2–4px.
- Circles are **tangent with gaps**, never overlapped (-30px is LS's signature;
  we don't copy it). Fills = the navy ramp at 95%.
- Hero scrim is **navy-tinted** rgba(18,30,48,.38), not neutral black; active
  slide dot is **white** (navy is invisible on the dark KV).
- Home section headers carry a small uppercase **English eyebrow** in `--primary`
  (navy) above the centered title (About Us / Business …).

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

Project tokens (Sejong variation). "LS source" documents the Figma-extracted LS
value we deliberately shifted away from — never ship the LS hex where a Sejong
hex exists.

| Token | Hex (Sejong) | Role | LS source (Figma) |
|---|---|---|---|
| `--canvas` | `#FFFFFF` | Page/card background | `#FFFFFF` |
| `--surface` | `#F6F7F9` | Light cool-gray band | Wild Sand `#F7F7F7` |
| `--surface-alt` | `#FAFBFC` | Subtle alternate surface | `#FAFAFA` |
| `--surface-2` | `#EEF0F3` | Deeper gray (admin chips etc.) | `#EFEFEF` |
| `--navy` | `#233140` | Headings + dark text on light | Outer Space `#2E373D` |
| `--navy-deep` | `#1A242F` | Darkest slate | `#232A2F` |
| `--ink` | `#333333` | Nav/titles | Mine Shaft `#333333` |
| `--body` | `#717171` | Body copy | Dove Gray `#717171` |
| `--muted` | `#757575` | Secondary text | Boulder `#757575` |
| `--faint` | `#888888` | Tertiary/captions | Gray `#888888` |
| `--hairline` | `#EEEEEE` | Card borders, dividers | Gallery `#EEEEEE` |
| `--line` | `#DBDBDB` | Stronger dividers | Alto `#DBDBDB` |
| `--brand-bright` | `#3E5C80` | Navy ramp — lightest block/circle 1 | Pacific `#0094CC` |
| `--brand` | `#2C4A6E` | Navy ramp — block/circle 2 | Endeavour `#0667B2` |
| `--brand-cobalt` | `#213956` | Navy ramp — circle 3 | `#004BA2` |
| `--brand-deep` | `#16273C` | Navy ramp — deepest block/circle 4 | Regal Blue `#003777` |
| `--primary` | `#2C4A6E` | Interactive only: buttons, links, focus (= `--brand`) | Picton `#388DEE` |
| `--primary-deep` | `#213956` | Button hover | `#2A6BC4` |
| `--primary-press` | `#16273C` | Button active | `#1F4FA0` |
| `--link` | `#35567C` | Inline text links (underlined) | `#296DBA` |
| `--tint` / `--tint-strong` | `#E8EDF3` / `#D2DBE5` | Light navy-gray containers | `#E5EEF7` / `#C6D9F0` |
| `--success` / `--success-tint` | `#14BC7E` / `#E7F8F2` | Status accent, sparing | — |
| `--footer-bg` | `#222B3A` | Footer background | `#2E373E` |
| `--footer-line` | `#465364` | Footer dividers | Trout `#515B62` |
| `--footer-link` | `#8A93A3` | Footer links | Rolling Stone `#777D81` |
| `--footer-muted` | `#B3BAC6` | Footer emphasized util | Silver Chalice `#AEAEAE` |
| `--footer-box` | `#1A2230` | Footer select/box background | `#232A2F` |

Hero scrim: navy-tinted `rgba(18,30,48,0.38)` + bottom gradient to
`rgba(10,18,30,0.32)` for slide-control legibility (LS uses flat black 30%).
Circle fills at 95% opacity (navy ramp): `rgba(62,92,128,.95)`,
`rgba(44,74,110,.95)`, `rgba(33,57,86,.95)`, `rgba(22,39,60,.95)`.

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
- Home mosaic row (≥1024): `256px 1fr 1fr 522px` grid, 280px tall, **16px gaps**;
  stacked halves flex evenly. <1024: 2-col / stacked.
- Geometry: structural cards **sharp** (`--r-lg`/`--r-xl` = 0) with 16px gaps;
  tokens `--r-sm/--r-md` = 2/4 for inputs/chips; `--r-full` pills/circles only.

## 5. Depth & elevation

Flat-first. Cards = 1px `--hairline` border, **no resting shadow** (`--shadow-sm: none`).
Hover may lift with `--shadow-md: 0 0 10px rgba(0,0,0,.08)`. Floating elements only
(top button, FABs): `0 0 10px rgba(0,0,0,.25)`. Never dramatic drops.

## 6. Components

### Header
White bg, 64px, hairline bottom. Logo left. Center-right GNB: 700/18px `--ink`
(16px at 1024–1279), hover/active → `--primary` **plus a 2px `--primary` underline
bar** at the header's bottom edge (scaleX 0→1 on hover/focus/active). Items with
sub-pages open a **hover/focus dropdown** flush under the header: white panel,
hairline border, `--shadow-md`, sharp corners, 14px/500 links (hover `--primary`
+ `--surface` bg). Anchor children (`/business#hoist`, `/technology#certs`…) rely
on the global `[id] { scroll-margin-top }` rule. Right util: phone 13px `--muted`
(≥1024). **No header CTA** — the 견적 문의 CTA is the floating FAB (below).
Mobile: hamburger → white panel list (flat, no dropdowns). Header is
`position: fixed`; pages offset content by `--header-h`.

### Floating CTA (견적 문의 FAB)
Fixed bottom-right on all marketing pages (`FloatingCta` in `ConditionalLayout`;
not on /demo or /admin): `--primary` pill, 52px (48px mobile), chat icon + label,
`--shadow-float`, offsets `calc(16–20px + env(safe-area-inset-*))` for iOS/Android.

### Buttons
- **Primary**: bg `--primary`, white text, height 48 (52 hero), padding 0 32,
  `--r-full`, 600–700 weight. Hover `--primary-deep`, active `--primary-press`.
- **Secondary (LS signature pill)**: white bg, **2px solid `--primary`**, text
  `--primary`, `--r-full`, height 48. Hover: bg `--tint`. (From LS language pills.)
- Text link: `--primary` → `--primary-deep`; inline body links `--link` underlined.

### Hero (boxed KV — redesigned 2026-07 on the high-res photo set)
**Container-bounded** image box (never full-bleed left-right): the KV sits
inside `.container` with a 20px top gap under the header, height
`clamp(460px, 58vh, 640px)` (mobile `clamp(420px, 64vh, 520px)`). Inner side
padding `clamp(24px, 5vw, 64px)`. Crossfade slideshow of real site photos
(`hero-*.jpg`, 1920px).
Scrim: navy left-to-right gradient (`rgba(13,21,33,.62) → .12`) + bottom fade
for the caption bar. Content LEFT-aligned in the container (max 620px): eyebrow
(13px white/72 caps, letter-spaced) + headline 700/clamp(30→48px) white with the
LS text-shadow (switches per slide) + sub white/88 + CTAs for dark ground
(**primary = white pill + `--navy` text**, ghost = 2px white/65 outline).
Bottom caption bar (1px white/22 top rule): per-slide project label 13px
white/78 (hidden <640) + dots (white, active 26px pill, 24px hit area) +
`01 / 04` counter. `prefers-reduced-motion` disables the crossfade.
The compact-split hero is retired; the low-res constraint no longer applies.

### Overview mosaic (home §2 — "회사소개")
Centered section header, then a 3-part row (`1.4fr 1fr 1fr`, 280px, 16px gaps):
① photo card (Sejong image bg + `rgba(0,0,0,.35)` overlay, white 15px label +
arrow →, links /about) ② stacked solid blocks: `--brand` white-text block over
white hairline-bordered block ③ stacked: `--surface` block over `--brand-deep`
white-text block. Block anatomy: label 500/21–22px + small arrow glyph; the
whole block is a link; hover = subtle underline — no lift, no radius.
**News band** sits BELOW the mosaic as its own full-width panel (never beside
the blocks): 1px hairline box, header row (title 500/20 + "더보기 +" 13px)
with 1px `--navy` rule, then **3 hairline-divided columns**, each item =
`[분류]` 13px `--faint` / 15px `--body` single-line title / 13px date.
<640: columns stack with top hairlines.

### Business circles (home §3 — "사업영역")
Centered header (with eyebrow), then circles sized `clamp(200px→264px)`
(never wider than the container) laid out **tangent with `clamp(20px→28px)`
gaps — never overlapped** (overlap is LS's signature; Sejong keeps distance).
Fills = the 95% navy-ramp alphas in order (bright → brand → cobalt → deep).
Depth kit (anti-flat): soft radial highlight at 30%/24%, inset 1px white/14%
inner ring, and an **offset outer ring** (`::after`, inset -8px, 1px
`--tint-strong`; hover → `--brand-bright`). Inside, centered white: 30px line
icon (BUSINESS_AREAS `icon`) + 700/22px title + 400/13px EN sub. Hover: scale
1.04. <1024: 2×2 grid, 220px circles. Circle is a link.

### Support strip (home §4)
Max-width 1000, 4 equal cells 240px tall as **gapped square cards** (16px gap,
1px `--hairline` border, radius 0; LS's connected divider strip is not copied).
Cell 1: two stacked 700/20px links split by a hairline. Cells 2–4: 700/22px
title + 400/14px `--body` two-line description, content top-left padded ~32–36px.
Whole cell links; hover: title → `--primary`, border `--tint-strong` + `--shadow-md`.

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
hairline, sharp corners, no resting shadow. Forms: inputs `--r-sm/md`, focus
`--primary` border + `0 0 0 3px rgba(44,74,110,.15)` ring.

## 7. Motion

Hover/focus transitions 120–200ms ease. Slideshow crossfade ~1s. Entrance
animations restrained: fade/translateY ≤ 24px, 0.6–0.8s ease-out, run once.
No parallax. Numbers may count up once on first view (Sejong stats band).

## 8. Do / Don't

**Do**
- Keep the canvas white; use `--surface` sparingly for alternating bands.
- Center every home section header (title + small gray sub).
- Use solid navy blocks (`--brand`, `--brand-deep`) as color anchors with white text.
- Reserve `--primary` (navy #2C4A6E) for interactive elements.
- Separate flat cells with 1px hairlines + 16px gaps; sharp corners on structural cards.
- Use Noto Sans KR everywhere; 700 headings/nav, 400 body.

**Don't**
- **Never use LS ELECTRIC images, logos, icons, copy, or product names.**
- No pure black text/backgrounds — darkest is `#232A2F`/`#2E373D`.
- No resting card shadows; no glassmorphism; no gradients except the hero scrim.
- **No blue anywhere** — navy ramp only (`#3E5C80..#16273C`). Never reintroduce
  LS blues (#388DEE/#0667B2/#0094CC/#004BA2) or any saturated blue.
- No gap-0 connected cells, no overlapped circles — the Sejong variation
  (gaps, tangent circles) is intentional.
- No video backgrounds — Sejong site photos only (`public/images`, 1920px
  optimized set from the 2026-07 client delivery; legacy low-res `sejong_*.png`
  stays only for /demo).
- Forms: inputs never below 16px font (iOS focus-zoom). Fixed/floating elements
  must offset by `env(safe-area-inset-*)`.

## 9. Agent guide

Home section order: `StorySection` (image KV) → `OverviewMosaicSection` (회사소개
mosaic + news panel) → `BusinessCirclesSection` (사업영역 circles) →
`StatsHighlightSection` (실적 numbers band — flat, hairline-divided; Sejong
addition, keep) → `SupportStripSection` (support strip) → footer. Data lives in
`src/data/site.ts` (`BUSINESS_AREAS`, `NOTICES`, `PRODUCTS`, `PORTFOLIO`).
Buttons/pills/forms come from `src/styles/subpage.module.css`. When adding UI:
tokens over hex, hairlines over shadows, centered headers, sharp corners, pill CTAs.
