---
title: "Altitude MTL Design System"
version: "1.0"
status: "source of truth for visual + component design"
direction: "Cinematic editorial monochrome — parchment + near-black, no accent color"
reference: "https://altitude-mtl.aura.build/"
last_reviewed: "2026-06-14"
---

# Altitude MTL Design System

The visual and component contract for **Altitude MTL**, a cinematic sky-lounge brand. One mood throughout: warm parchment paper, near-black ink, oversized light-weight display type, full-pill CTAs, and sharp-cornered photography that does the heavy lifting.

This system is deliberately austere. **Two colors. Two fonts. One radius decision (pill on controls, sharp on everything else).** Every variation in tone comes from opacity, not from new hues. If a screen feels busy, the fix is almost always "remove," not "add."

> **Relationship to `AGENTS.md`:** `AGENTS.md` is the operational guide (what to read, what to reuse, what to reject in review). `DESIGN.md` is the reference it points to. When a token or rule appears in both, the values must be identical. If they ever drift, fix both in the same change.

---

## 1. Design Principles

| Principle | What it means | How it shows up |
|-----------|---------------|-----------------|
| **Two colors, opacity for the rest** | One parchment, one ink. All hierarchy comes from ink at 100/70/60/50/15/10% opacity. | No blue, no brand accent, no gradients except photo overlays. |
| **Cinematic display type** | Headings are oversized, very light (300), tightly tracked. Scale carries the drama. | Hero H1 runs to `clamp(...)` topping out near 176px; section H2 near 72px. |
| **Photography is the color** | The palette is neutral on purpose so full-bleed images supply warmth and depth. | Sharp-cornered photo blocks with a bottom-up dark gradient for legible reversed captions. |
| **Editorial rhythm** | Numbered sections (01–08), sticky left headings, hairline dividers, asymmetric grids. | A reader scans top to bottom like a magazine, not a SaaS page. |
| **Pill controls, sharp surfaces** | The only round things are buttons, avatars, and icon chips. Everything structural is `0px`. | Photos, cards, and section edges never round. |
| **Quiet motion** | Slow fades and reveals, marquee in the dark band. Nothing bounces. | All motion respects `prefers-reduced-motion`. |
| **Reuse before invention** | Hero, feature grid, testimonial, step list, dark marquee, story split, gallery, footer are fixed patterns. | Compose from them rather than forking new layouts. |

---

## 2. Color Tokens

### 2.1 Core palette (canonical)

A strict two-color system. Use the token or the listed value, never an off-palette hex.

| Role | Value | CSS token | Usage |
|------|-------|-----------|-------|
| Page background | `#E8E6DF` | `--color-bg` | Parchment/ecru. Body, nav, footer, light sections. |
| Primary ink | `#1A1A1A` | `--color-ink` | Headings, primary text, dark-section background, primary button fill. |
| Reversed text | `#E8E6DF` | `--color-reversed` | Text on the near-black dark band and on photo overlays. |
| Body text | `rgba(26,26,26,0.70)` | `--color-ink-70` | Paragraphs, nav links, section labels. |
| Secondary text | `rgba(26,26,26,0.60)` | `--color-ink-60` | Supporting copy, captions. |
| Muted text | `rgba(26,26,26,0.50)` | `--color-ink-50` | Step numbers, faint meta, watermarks. |
| Section divider | `rgba(26,26,26,0.15)` | `--color-ink-15` | Section borders, nav bottom hairline. |
| Card border | `rgba(26,26,26,0.10)` | `--color-ink-10` | Feature/card borders, grid lines. |
| Ghost wash | `rgba(26,26,26,0.035)` | `--color-ink-04` | Very subtle hover/fill on light surfaces. |
| Nav blur fill | `rgba(232,230,223,0.90)` | `--nav-bg` | Sticky header behind `backdrop-blur`. |

### 2.2 Dark band

The inverted section flips the two core colors. No third color is introduced.

| Role | Value | Usage |
|------|-------|-------|
| Dark background | `#1A1A1A` | "Trusted by" marquee band, any inverted callout. |
| Dark-band text | `#E8E6DF` | Marquee text, labels on dark. |
| Dark-band hairline | `rgba(232,230,223,0.15)` | Dividers inside the dark band. |

### 2.3 Photo overlays

Photography always gets a bottom-up dark gradient so reversed captions stay legible. This is the only place gradients are allowed.

| Token | Value | Usage |
|-------|-------|-------|
| `--overlay-photo` | `linear-gradient(to top, rgba(26,26,26,0.45), transparent 60%)` | Default caption legibility. |
| `--overlay-photo-strong` | `linear-gradient(to top, rgba(26,26,26,0.55), transparent 60%)` | Hero / large image blocks. |

### 2.4 Forbidden / avoid

Not the direction for this brand. Reject in review.

| Thing | Why |
|-------|-----|
| Any accent hue (blue, orange, violet, green) | The system is monochrome by design. Status color is out of scope for this marketing surface. |
| Background gradients other than photo overlays | Flat parchment only. |
| Glassmorphism, heavy drop shadows | Depth comes from photography and hairlines, not blur or shadow. |
| Pure white `#FFFFFF` surfaces | The warm parchment is the light tone; never swap it for clinical white. |

---

## 3. Typography

### 3.1 Families

Loaded from Google Fonts:

```
https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Inter:wght@400;500;600&display=swap
```

- **DM Sans** — display only. Used at weight **300 (Light)** with strong negative tracking. This is the cinematic voice.
- **Inter** — everything else: body, nav, labels, buttons, captions. Uppercase + wide tracking for labels, normal tracking for body.

### 3.2 Display scale (DM Sans 300)

| Token | Size | Weight | Tracking | Line-height | Transform | Target |
|-------|------|--------|----------|-------------|-----------|--------|
| `.h1` | `clamp(3.5rem, 11vw, 176px)` | 300 | `-0.05em` (≈-8.8px @176) | `0.85` | uppercase | Hero headline |
| `.h2` | `clamp(2.5rem, 6vw, 72px)` | 300 | `-0.05em` (≈-3.6px @72) | `1.0` | none | Section headings |
| `.h3` | `30px` | 300 | `-0.025em` (≈-0.75px) | `1.2` | none | Card / step titles |
| `.stat` | `clamp(4rem, 8vw, 120px)` | 300 | `-0.04em` | `0.9` | none | Big numerals (e.g. "44") |

### 3.3 UI / body scale (Inter)

| Token | Size | Weight | Tracking | Transform | Color |
|-------|------|--------|----------|-----------|-------|
| `.body` | `16px` | 400 | normal | none | `--color-ink-70` |
| `.wordmark` | `18px` | 500 | `-0.05em` | uppercase | `--color-ink` |
| `.label` | `12px` | 500 | `0.14em` (≈+1.68px) | uppercase | `--color-ink-70` |
| `.cta` | `14px` | 500 | `0.14em` (≈+1.96px) | uppercase | varies by button |
| `.fineprint` | `12px` | 400 | `0.14em` | uppercase | `--color-ink` |
| `.caption` | `12px` | 400 | `0.16em` | uppercase | `--color-reversed` on photos |

### 3.4 Rules

- Display headings are **always** DM Sans 300. Never bold a display heading; scale is the emphasis, not weight.
- Labels and CTAs are **always** uppercase Inter with wide tracking. Section numbers use the `NN / NAME` form (e.g. `02 / FEATURES`).
- Body copy is Inter 400 at 70% ink. Never pure black body paragraphs.
- No serif, no script, no third font. The available font bundle is large; use only DM Sans and Inter.
- Negative tracking on display is non-negotiable; it's what makes the type feel cinematic rather than generic.

---

## 4. Spacing, Grid & Radius

| Token | Value |
|-------|-------|
| Base unit | `8px` |
| Section vertical padding | `clamp(64px, 10vw, 120px)` (`py-16` → `py-30`) |
| Horizontal padding | `px-6 md:px-12` (24px → 48px) |
| Max width | `max-w-[1600px]` centered |
| Default gap | `24px` |
| Radius — controls (button, avatar, icon chip) | `9999px` (pill / circle) |
| Radius — everything structural (photos, cards, sections) | `0px` |

**Layout primitives**

| Region | Pattern |
|--------|---------|
| Section shell | `border-b border-ink-15 px-6 md:px-12 py-[clamp(64px,10vw,120px)]` |
| Section label | `NN / NAME` mono-feel Inter label, top of section |
| Editorial split | `grid md:grid-cols-12`; sticky heading `md:col-span-5 md:sticky md:top-28`, content `md:col-span-7` |
| Hero mosaic | asymmetric grid: large image ~60%, right column = stacked smaller image + stat block |
| Feature grid | `grid sm:grid-cols-2` inside hairline-divided wrapper |
| Gallery | `grid md:grid-cols-3 gap-3`, mixed aspect ratios, sharp corners |
| Dark band | full-bleed `bg-ink text-reversed`, marquee inside, `py-10` |

---

## 5. Page Shell

Every page follows this root structure:

```html
<body class="bg-[#E8E6DF] text-[#1A1A1A]">
  <header><!-- sticky 3-col nav --></header>
  <main>
    <!-- 01 hero -->
    <!-- 02 features -->
    <!-- 03 testimonials -->
    <!-- 04 journey -->
    <!-- 05 dark marquee band -->
    <!-- 06 story split -->
    <!-- 07 gallery -->
  </main>
  <footer><!-- 08 footer --></footer>
</body>
```

- **Header** — sticky, `z-50`, `bg-[rgba(232,230,223,0.9)]` + `backdrop-blur-md`, hairline bottom border. Three columns: left links · center wordmark · right links. Collapses to a drawer on mobile.
- **Sections** — sequentially numbered, hairline-separated, generous vertical rhythm.
- **Footer** — parchment, oversized faint watermark behind, CTA heading, three info columns, bottom utility bar.

---

## 6. Component Specs

### 6.1 Button

**Anatomy:** pill container + uppercase Inter label (`tracking-[0.14em]`) + optional leading icon.

| Variant | Background | Text | Border | When |
|---------|------------|------|--------|------|
| `primary` | `#1A1A1A` | `#E8E6DF` | none | The single most important action (Reserve a table). |
| `ghost` | transparent | `#1A1A1A` | `1px solid rgba(26,26,26,0.25)` | Secondary actions (View atmosphere, Request a reservation, Back to top). |
| `reversed` | `#E8E6DF` | `#1A1A1A` | none | Primary action when placed on the dark band. |

- Shape: `border-radius: 9999px`. Padding `12px 28px`. Font Inter 500, 14px, uppercase, `letter-spacing: 1.96px`.
- Hover: primary → ink lightens slightly (`#262626`); ghost → border goes to full ink, optional `--color-ink-04` fill. Keep it subtle; no scale-up, no shadow.
- Focus-visible: 2px ink outline offset 2px (the only "ring" in the system).
- **Max one `primary` per viewport.** Pair it with at most one `ghost`.

### 6.2 Header / Nav

- 3-column flex: left links, center wordmark, right links.
- Links: `.label` (Inter 12px 500 uppercase, `0.14em`, ink-70). Hover → full ink.
- Wordmark: `.wordmark` (Inter 18px 500 uppercase, `-0.05em`, full ink).
- Sticky with translucent parchment + blur. Hairline bottom border `--color-ink-15`.
- Mobile: hamburger opens a full-height parchment drawer; links at 14px, `0.14em`, generous spacing.

### 6.3 Hero

- Asymmetric image mosaic + oversized H1 below or beside it.
- Large editorial photo (≈60% width) with `--overlay-photo-strong` and a reversed `.caption` tagline + coordinate line pinned bottom.
- Right column: a smaller stacked photo plus a stat block (`.stat` numeral + `.label`).
- Headline: `.h1` uppercase DM Sans 300.
- Two CTAs: one `primary`, one `ghost`.
- Section marker `(*01)` or `01 / HERO` top-left.

### 6.4 Section Heading Block

- Left sticky column: `NN / NAME` label + `.h2`.
- Right column: the content (cards, steps, testimonials).
- On the dark band, this inverts to reversed text.

### 6.5 Feature Card

- Hairline-bordered cell inside a divided grid (no shadow, no rounding).
- Anatomy: outlined circle icon chip (~40px, `border-radius: 9999px`, ink-10 border) + `.h3` title + `.body` paragraph.
- 2×2 on desktop, stacked on mobile.

### 6.6 Testimonial Card

- Circular portrait (`border-radius: 9999px`, ~96–240px) + name (`.h3` small or Inter 500) + role `.label` + blockquote in DM Sans light or Inter 16px.
- Three across, hairline dividers between.

### 6.7 Step List (Journey)

- Vertical numbered list. `01/02/03` as big `.stat`-scale numerals at `--color-ink-50`.
- Each row: number + `.h3` title + `.body` description, separated by `border-b border-ink-10`.
- Left column holds the heading and a `ghost` CTA.

### 6.8 Dark Marquee Band

- Full-bleed `bg-[#1A1A1A] text-[#E8E6DF]`, `py-10`, `overflow-hidden`.
- A horizontally scrolling marquee of uppercase phrases separated by ` · ` (e.g. `PRIVATE EVENTS · BRAND DINNERS · CULTURAL NIGHTS`).
- Marquee pauses / disables under `prefers-reduced-motion`.

### 6.9 Story Split

- ~40% text column (label + `.h2` + `.body` + uppercase pullquote) | ~60% full-bleed tall photo with overlay.
- Pullquote: uppercase, wide tracking, larger than body, ink-70.

### 6.10 Gallery

- 3-column grid of sharp-cornered photos at mixed aspect ratios.
- Each photo carries a reversed `.caption` over `--overlay-photo` (e.g. `NORTH VIEW`, `BLUE HOUR`).

### 6.11 Footer

- Oversized faint watermark wordmark behind (`--color-ink-50` at low opacity, DM Sans).
- CTA `.h2` heading.
- Three info columns: **VISIT / CONTACT / HOURS**, each a `.label` header + `.body` lines.
- Bottom bar: wordmark + copyright (left) · `ghost` pill links `BACK TO TOP`, `PRIVATE EVENTS` (right).

---

## 7. State Matrices

### 7.1 Button

| State | Background | Text | Border | Cursor |
|-------|-----------|------|--------|--------|
| Default | per variant | per variant | per variant | `pointer` |
| Hover | primary → `#262626`; ghost → ink-04 fill | unchanged | ghost → full ink | `pointer` |
| Focus-visible | unchanged | unchanged | 2px ink outline, offset 2px | `pointer` |
| Disabled | unchanged | `opacity-50` | unchanged | `not-allowed` |

### 7.2 Nav link

| State | Color | Underline |
|-------|-------|-----------|
| Default | ink-70 | none |
| Hover | full ink | optional 1px ink underline |
| Active (section in view) | full ink | none |

### 7.3 Photo block

| State | Overlay | Caption |
|-------|---------|---------|
| Default | `--overlay-photo` | reversed `.caption`, bottom |
| Hero | `--overlay-photo-strong` | tagline + coordinates |
| Hover (interactive) | overlay deepens ~5% | unchanged |

---

## 8. Motion & Accessibility

- Entrance: slow opacity + small Y-translate reveals (`y` 12–24px, 0.6–1s, light stagger).
- Dark band: continuous horizontal marquee, linear, no easing bounce.
- **Always** respect `prefers-reduced-motion`: disable marquee and reveals, render final state.
- Contrast: ink-70 on parchment and reversed on `#1A1A1A` both clear WCAG AA for text sizes used. Never drop body text below 60% ink.
- Reversed captions always sit over a gradient overlay, never raw on a photo.
- Focus is always visible (2px ink outline). Never remove outlines on nav or CTAs.

---

## 9. Copy & Language

- Brand voice: terse, atmospheric, lowercase sentences in body; uppercase for labels and CTAs.
- Section labels: `NN / NAME`. Numerals are content (floors, steps, coordinates), not decoration overload.
- No marketing fluff, no exclamation marks. Short declaratives ("Above the city.", "Built for the hour when Montreal turns silver.").

---

## 10. Anti-Patterns (reject in review)

- Any accent color, brand hue, or non-photo gradient.
- Bold display headings — display is always DM Sans 300; emphasis is scale.
- Rounded photo or card corners — only controls/avatars/icon chips are pill/circle.
- Drop shadows or glassmorphism for depth.
- Pure white surfaces instead of warm parchment.
- A third typeface, or system sans/serif for primary text.
- Tight, generic SaaS hero (centered single column, gradient blob).
- More than one `primary` button per viewport.
- Captions placed on photos without an overlay gradient.
- Positive tracking on display type, or zero tracking on labels.

---

## 11. Quick Reference

- **Palette:** parchment `#E8E6DF` + ink `#1A1A1A`, variation via ink opacity (70/60/50/15/10).
- **Fonts:** DM Sans 300 (display), Inter (UI/body). Negative tracking on display, `0.14em` uppercase on labels.
- **Radius:** `9999px` on controls/avatars/icon chips; `0px` on everything structural.
- **CTA:** filled-ink pill (primary) + transparent hairline pill (ghost); one primary per screen.
- **Sections:** numbered 01–08, hairline-divided, asymmetric editorial grids, one inverted dark band.
- **Never:** accent color, bold display, rounded photos, shadows, white surfaces, third font, em dash character in output.

---

## 12. CSS Token Block (ready to paste)

```css
:root {
  /* Color */
  --color-bg: #E8E6DF;
  --color-ink: #1A1A1A;
  --color-reversed: #E8E6DF;
  --color-ink-70: rgba(26,26,26,0.70);
  --color-ink-60: rgba(26,26,26,0.60);
  --color-ink-50: rgba(26,26,26,0.50);
  --color-ink-15: rgba(26,26,26,0.15);
  --color-ink-10: rgba(26,26,26,0.10);
  --color-ink-04: rgba(26,26,26,0.035);
  --nav-bg: rgba(232,230,223,0.90);
  --dark-bg: #1A1A1A;
  --dark-hairline: rgba(232,230,223,0.15);

  /* Type */
  --font-display: 'DM Sans', sans-serif;
  --font-body: 'Inter', sans-serif;
  --w-display: 300;
  --w-body: 400;
  --w-ui: 500;

  --h1-size: clamp(3.5rem, 11vw, 176px); --h1-track: -0.05em; --h1-lh: 0.85;
  --h2-size: clamp(2.5rem, 6vw, 72px);   --h2-track: -0.05em; --h2-lh: 1.0;
  --h3-size: 30px;                        --h3-track: -0.025em; --h3-lh: 1.2;
  --stat-size: clamp(4rem, 8vw, 120px);   --stat-track: -0.04em;
  --label-size: 12px;  --label-track: 0.14em;
  --cta-size: 14px;    --cta-track: 0.14em;

  /* Radius */
  --radius-pill: 9999px;
  --radius-none: 0px;

  /* Overlays */
  --overlay-photo: linear-gradient(to top, rgba(26,26,26,0.45), transparent 60%);
  --overlay-photo-strong: linear-gradient(to top, rgba(26,26,26,0.55), transparent 60%);

  /* Rhythm */
  --pad-x: clamp(24px, 5vw, 48px);
  --pad-y: clamp(64px, 10vw, 120px);
  --max-w: 1600px;
}

## 13. Tailwind Mapping (kamus-bahasa-paser)

The web app uses Vite + React + Tailwind v3. The token values in `tailwind.config.js` are **1:1 identical** to the CSS custom properties in §12. If a value disagrees, fix both. Do not introduce new values in one place that don't appear in the other.

### 13.1 Theme extension keys

| Token | CSS variable | Tailwind class | Value |
|---|---|---|---|
| bg | `--color-bg` | `bg-bg` | `#E8E6DF` |
| ink | `--color-ink` | `text-ink` / `bg-ink` | `#1A1A1A` |
| ink 70 | `--color-ink-70` | `text-ink/70` | `rgba(26,26,26,0.70)` |
| ink 60 | `--color-ink-60` | `text-ink/60` | `rgba(26,26,26,0.60)` |
| ink 50 | `--color-ink-50` | `text-ink/50` | `rgba(26,26,26,0.50)` |
| ink 15 | `--color-ink-15` | `border-ink/15` | `rgba(26,26,26,0.15)` |
| ink 10 | `--color-ink-10` | `border-ink/10` | `rgba(26,26,26,0.10)` |
| ink 04 | `--color-ink-04` | `bg-ink/04` | `rgba(26,26,26,0.035)` |
| reversed | `--color-reversed` | `text-reversed` | `#E8E6DF` |
| nav-bg | `--nav-bg` | `bg-nav-bg/90` | `rgba(232,230,223,0.90)` |
| dark-bg | `--dark-bg` | `bg-dark-bg` | `#1A1A1A` |
| dark-hairline | `--dark-hairline` | (not used yet) | `rgba(232,230,223,0.15)` |

### 13.2 Type scale

`text-h1` / `text-h2` / `text-h3` / `text-stat` already bake in `font-display` + `font-weight: 300` + letter-spacing + line-height. **Do not** override `font-weight` on h1/h2/h3 elements.

```jsx
<h1 className="font-display text-h1 uppercase text-ink">BAHASA PASER</h1>
```

### 13.3 Radius, spacing, layout

- `rounded-pill` → `9999px` (only for buttons, chips, avatars)
- `rounded-none` → `0px` (all structural elements)
- `max-w-wrap` → `1600px`
- `max-w-content` → `960px` (centered single-column sections like Hasil pencarian)
- `px-pad-x` / `py-pad-y` → `clamp()` rhythm

### 13.4 CSS-layer utilities (not in Tailwind)

These live in `src/index.css` and must stay in sync with §8 motion:

- `.reveal` / `.reveal.in` — page-load entrance
- `.marquee` + `@keyframes marquee-scroll` — dark band animation
- `@media (prefers-reduced-motion: reduce)` — disables all of the above

### 13.5 Forbidden Tailwind classes

Reject in review (same as §10):
- `rounded-lg`, `rounded-md`, `rounded-xl`, `rounded-2xl`, `rounded-3xl` — use `rounded-none` or `rounded-pill`
- `shadow-*` (any) — no drop shadows anywhere
- `bg-gradient-*` — no gradients (except photo overlays in §2.3)
- `text-blue-*`, `text-red-*`, `text-green-*` — no accent colors
- `border-blue-*`, `border-red-*`, `border-green-*` — no accent colors
```
