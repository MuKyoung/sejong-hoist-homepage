---
version: alpha
name: LS ELECTRIC
description: >-
  Global smart energy solutions company providing power, automation, ICT, and DC technology with a professional,
  technology-forward aesthetic.
logo:
  src: https://www.ls-electric.com/og_image.jpg
colors:
  surface: '#ffffff'
  surface-dim: '#f5f5f5'
  surface-bright: '#ffffff'
  surface-container-lowest: '#fafafa'
  surface-container-low: '#f0f0f0'
  surface-container: '#e8e8e8'
  surface-container-high: '#dbdbdb'
  surface-container-highest: '#d1d1d1'
  on-surface: '#333333'
  on-surface-variant: '#727272'
  inverse-surface: '#1a1a1a'
  inverse-on-surface: '#f5f5f5'
  outline: '#999999'
  outline-variant: '#cccccc'
  surface-tint: '#388dee'
  primary: '#388dee'
  on-primary: '#ffffff'
  primary-container: '#e5eef7'
  on-primary-container: '#005cad'
  inverse-primary: '#7db4f0'
  secondary: '#296dba'
  on-secondary: '#ffffff'
  secondary-container: '#d4e3f5'
  on-secondary-container: '#1a4d7a'
  tertiary: '#14bc7e'
  on-tertiary: '#ffffff'
  tertiary-container: '#e7f8f2'
  on-tertiary-container: '#0d8b5f'
  error: '#ed174b'
  on-error: '#ffffff'
  error-container: '#fdd9e5'
  on-error-container: '#8b0a2a'
  primary-fixed: '#e5eef7'
  primary-fixed-dim: '#c6d9f0'
  on-primary-fixed: '#001f47'
  on-primary-fixed-variant: '#004a8f'
  secondary-fixed: '#d4e3f5'
  secondary-fixed-dim: '#b3cce8'
  on-secondary-fixed: '#001a3a'
  on-secondary-fixed-variant: '#1a4d7a'
  tertiary-fixed: '#e7f8f2'
  tertiary-fixed-dim: '#b3e8d8'
  on-tertiary-fixed: '#001f18'
  on-tertiary-fixed-variant: '#0d8b5f'
  background: '#ffffff'
  on-background: '#333333'
  surface-variant: '#e8e8e8'
typography:
  display:
    fontFamily: Noto Sans KR
    fontSize: 60px
    fontWeight: '700'
    lineHeight: 68px
    letterSpacing: '-0.04em'
  headline-lg:
    fontFamily: Noto Sans KR
    fontSize: 42px
    fontWeight: '600'
    lineHeight: 50px
    letterSpacing: '-0.02em'
  headline-md:
    fontFamily: Noto Sans KR
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: '-0.01em'
  title-lg:
    fontFamily: Noto Sans KR
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  body-lg:
    fontFamily: Noto Sans KR
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Noto Sans KR
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Noto Sans KR
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Noto Sans KR
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.01em
rounded:
  sm: 2px
  DEFAULT: 4px
  md: 6px
  lg: 10px
  xl: 15px
  full: 50%
spacing:
  unit: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  container-max: 1280px
elevation:
  sm: 0 1px 2px rgba(0, 0, 0, 0.06)
  md: 0 3px 8px rgba(0, 0, 0, 0.15)
  lg: 0px 2px 5px rgba(75, 75, 75, 0.1)
layout:
  containerMaxWidth: 1280px
  gridColumns: 12
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary}'
    typography: '{typography.label-md}'
    rounded: '{rounded.full}'
    padding: 12px 32px
    height: 48px
    border: none
    boxShadow: '{elevation.md}'
  button-primary-hover:
    backgroundColor: '#2a6bc4'
    textColor: '{colors.on-primary}'
    transition: background-color 200ms ease-in-out
  button-primary-active:
    backgroundColor: '#1f4fa0'
    textColor: '{colors.on-primary}'
  button-secondary:
    backgroundColor: transparent
    textColor: '{colors.primary}'
    typography: '{typography.label-md}'
    rounded: '{rounded.full}'
    padding: 12px 32px
    height: 48px
    border: 2px solid {colors.primary}
  button-secondary-hover:
    backgroundColor: '{colors.primary-container}'
    textColor: '{colors.on-primary-container}'
    transition: background-color 200ms ease-in-out
  card:
    backgroundColor: '{colors.surface}'
    rounded: '{rounded.lg}'
    padding: '{spacing.md}'
    border: 1px solid {colors.surface-container-high}
    boxShadow: '{elevation.md}'
  card-hover:
    backgroundColor: '{colors.surface}'
    boxShadow: '{elevation.lg}'
    transition: box-shadow 200ms ease-in-out
  input-field:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    typography: '{typography.body-md}'
    rounded: '{rounded.DEFAULT}'
    padding: 12px 16px
    border: 1px solid {colors.surface-container-high}
    height: 44px
  input-field-focus:
    borderColor: '{colors.primary}'
    boxShadow: 0 0 0 3px rgba(56, 141, 238, 0.1)
    transition: border-color 150ms ease-in-out, box-shadow 150ms ease-in-out
  list-item:
    backgroundColor: transparent
    rounded: '{rounded.md}'
    padding: '{spacing.sm}'
    typography: '{typography.body-md}'
    textColor: '{colors.on-surface}'
  list-item-hover:
    backgroundColor: '{colors.surface-container-low}'
    textColor: '{colors.primary}'
    transition: background-color 150ms ease-in-out
  badge:
    backgroundColor: '{colors.tertiary-container}'
    textColor: '{colors.on-tertiary-container}'
    typography: '{typography.label-sm}'
    rounded: '{rounded.full}'
    padding: 4px 12px
    display: inline-block
  badge-error:
    backgroundColor: '{colors.error-container}'
    textColor: '{colors.on-error-container}'
  divider:
    backgroundColor: '{colors.surface-container-high}'
    height: 1px
    margin: '{spacing.md} 0'
---

## Overview

LS ELECTRIC is a global smart energy solutions provider delivering power, automation, ICT, and DC technology to industrial and commercial markets. The design system embodies a 'Professional Minimalism' aesthetic—clean, precise, and technology-forward—that communicates reliability, innovation, and corporate sophistication. The UI prioritizes clarity through generous whitespace, a restrained color palette anchored by a professional blue (#388dee), and typography that balances warmth with technical precision. The emotional response is one of trust and competence: users encounter a mature, well-engineered interface that feels both accessible and authoritative.

The brand voice is measured, informative, and solution-oriented. Vocabulary favors concrete terms ('smart energy solutions', 'global leader', 'proven technology') over marketing hyperbole. Tone is professional yet approachable—never condescending, never breathless. Example sentence in brand voice: 'Our DC technology reduces energy loss by up to 15% while simplifying system architecture.'

## Colors

The color system is anchored by Professional Blue (#388dee) as the primary accent, used exclusively for interactive elements (CTAs, links, focus states) and key brand moments. This blue conveys trust and technological competence without aggression. The secondary palette introduces a deeper corporate blue (#296dba) for supporting UI elements and a vibrant teal (#14bc7e) for status indicators and success states. The surface stack is built on pure white (#ffffff) with a carefully calibrated gray hierarchy: surface-container-high (#dbdbdb) for subtle dividers, on-surface-variant (#727272) for secondary text, and on-surface (#333333) for primary body copy. Error states use a restrained red (#ed174b) applied sparingly. The design avoids pure black; instead, near-black (#1a1a1a) is reserved for i

## Typography

The type system uses Noto Sans KR exclusively, a humanist sans-serif that balances technical clarity with approachability—essential for a global B2B brand serving Korean and international audiences. Display (60px, 700 weight, -0.04em letter-spacing) is reserved for hero statements and major page titles; Headline-lg (42px, 600 weight) anchors section introductions; Headline-md (28px, 600 weight) organizes content hierarchies. Body-lg (18px, 400 weight, 28px line-height) is used for hero copy and prominent descriptions, while Body-md (16px, 400 weight, 24px line-height) serves as the default paragraph text. Label-md (14px, 600 weight, 0.02em letter-spacing) is applied to buttons and form labels to create visual distinction. All body text uses a 1.5x line-height ratio (24–28px) to ensure comf

## Layout

The layout system uses a 12-column grid with a fixed container max-width of 1280px, centered on the viewport. This provides a stable, professional frame for content while accommodating both desktop (1280px) and tablet (1024px) breakpoints. Horizontal padding is 24px (gutter) on desktop, reducing to 16px on tablets and 12px on mobile. Vertical rhythm is established through the spacing scale: section separation uses lg spacing (40px), component grouping uses md spacing (24px), and internal element spacing uses sm spacing (12px). The design favors generous whitespace over density—cards and content blocks are separated by at least 40px vertically, creating visual breathing room that reinforces the professional aesthetic. Container max-widths are enforced at 1280px to prevent line-length from e

## Elevation & Depth

Depth is conveyed through a restrained shadow system that avoids dramatic effects. Level 1 (Base): no shadow; elements sit flush on the white surface. Level 2 (Cards, inputs, standard containers): box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15), creating a subtle lift that distinguishes interactive surfaces from the background. Level 3 (Modals, elevated cards, hover states): box-shadow: 0px 2px 5px rgba(75, 75, 75, 0.1), a softer shadow that suggests proximity without visual aggression. Hover transitions use a 200ms ease-in-out timing function to smoothly elevate elements from Level 2 to Level 3. Bo

## Shapes

The shape philosophy is 'Architectural Precision'—sharp, geometric, and intentional. Buttons use full-rounded corners (50% border-radius) to create a modern, approachable CTA that stands out from the grid-based layout. Cards and containers use moderate rounding (10px / lg) to soften the grid while maintaining geometric clarity. Input fields and smaller UI elements use minimal rounding (4px / DEFAULT) to preserve the technical, structured feel. Dividers and subtle separators use 2px rounding (sm) or no rounding at all. This graduated approach—full-rounded CTAs, moderate-rounded containers, mini

## Components

### Action Elements
Buttons are the primary interaction pattern. Primary buttons use the full primary blue (#388dee) background with white text, 48px height, 12px vertical / 32px horizontal padding, and full-rounded corners (50%). On hover, the background transitions to #2a6bc4 over 200ms. Secondary buttons use a transparent background with a 2px primary-blue border and matching text color; on hover, the background fills with the primary-container color (#e5eef7). All buttons use label-md typography (14px, 600 weight) and apply a subtle shadow (0 3px 8px rgba(0, 0, 0, 0.15)) to suggest clickability. Avoid button text longer than 4 words; use icon + label combinations for complex actions.

### Containers & Surfaces
Cards are the primary content container, using white background, 10px border

## Do's and Don'ts

**Do**
- Do use primary blue (#388dee) exclusively for interactive elements—buttons, links, focus states—to create a consistent, scannable interface.
- Do maintain at least 40px vertical spacing between major sections to preserve the professional, uncluttered aesthetic.
- Do apply a 200ms ease-in-out transition on all hover and focus state changes to create a responsive, engineered feel.
- Do use Noto Sans KR at 400 weight for body text and 600 weight for headings; avoid mixing weights within a single text block.
- Do use full-rounded buttons (50% border-radius) for primary CTAs and moderate-rounded (10px) for cards to create a clear visual hierarchy.
- Do apply the shadow system consistently: md shadow (0 3px 8px rgba(0, 0, 0, 0.15)) for standard cards, lg shadow for hover states.

**Don't**
- Don't use pure black (#000000) or pure white (#ffffff) as text colors; use on-surface (#333333) for primary text and on-surface-variant (#727272) for secondary text.
- Don't apply shadows heavier than lg (0px 2px 5px rgba(75, 75, 75, 0.1)); the system favors subtlety over drama.
- Don't mix typefaces; Noto Sans KR is the exclusive font family across all UI elements.
- Don't use border-radius values outside the defined scale (sm: 2px, DEFAULT: 4px, md: 6px, lg: 10px, xl: 15px, full: 50%); custom radii break the system.
- Don't apply color to text without sufficient contrast; maintain a minimum 4.5:1 contrast ratio for body text and 3:1 for large text.
- Don't use the error color (#ed174b) for non-error states; reserve it exclusively for validation failures and critical alerts.
