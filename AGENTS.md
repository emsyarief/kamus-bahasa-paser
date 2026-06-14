# AGENTS.md

Operational guide for AI agents and human contributors working on `kamus-bahasa-paser`.
For visual + component design, **always defer to [`docs/DESIGN.md`](docs/DESIGN.md) and [`docs/altitude.html`](docs/altitude.html) first** — they are the single source of truth for tokens, type, components, motion, and anti-patterns. This file documents the *process*; the design system is defined there.

> **Drift rule.** If a value or rule appears in both `AGENTS.md` and `DESIGN.md`, the values must be identical. If they ever drift, fix both in the same change. Do not silently re-define design tokens in code; import them or use the published CSS custom properties.

---

## 1. Read first, every time

Before touching UI, design, copy, or component structure:

1. **Open `docs/DESIGN.md`** — full token block, type scale, components, state matrices, motion, anti-patterns.
2. **Open `docs/altitude.html`** — concrete HTML/CSS proof of the design system in use; the cleanest source for "what does this look like rendered."
3. **Open `docs/ARCHITECTURE.md`** — only for data, OCR pipeline, or repository-structure questions (not visual).
4. **Open `OCR_PIPELINE.md`** — only when touching the OCR/parsing scripts.

Do not re-derive values from screenshots or guess from prior output. The reference files win.

---

## 2. Visual & UI rules (must)

These are operational, not duplicative. Full values live in `DESIGN.md` §2, §3, §6.

- **Two colors only:** parchment `#E8E6DF` + ink `#1A1A1A`. Variation comes from ink opacity (`--color-ink-70/60/50/15/10/04`). No third color. No "brand hue."
- **Two fonts only:** `DM Sans 300` for display, `Inter` for everything else. No third typeface. Display headings are *always* light (300) — emphasis is scale, never weight.
- **Radius decision is binary:** `9999px` on controls (buttons, avatars, icon chips) and `0px` on everything structural (photos, cards, sections, inputs).
- **One primary button per viewport.** Pair with at most one ghost. Reversed variant only inside the dark band.
- **No shadows. No glassmorphism. No accent gradients.** Depth comes from photography + hairlines. The only gradients allowed are the `--overlay-photo` family over photos.
- **No pure white surfaces.** Use parchment warm tones, even on cards.
- **Captions on photos always sit over `--overlay-photo` or `--overlay-photo-strong`.** Never raw.
- **Focus is always visible** — `2px ink outline, offset 2px`. Never remove outlines.
- **Section labels use the `NN / NAME` form** (e.g. `02 / ENTRI`). Numerals are content, not decoration.
- **Body copy is `Inter 16px` at 70% ink.** Never pure black paragraphs.
- **Uppercase + wide tracking (`0.14em`) for labels and CTAs** only. Never positive tracking on display type.

---

## 3. Motion & accessibility

- All entrance reveals: slow opacity + small Y translate (`y` 12–24px, 0.6–1s, light stagger). Nothing bounces. Marquees use linear, no easing.
- **Always respect `prefers-reduced-motion`:** disable reveals, disable marquee, render final state.
- Contrast: ink-70 on parchment and reversed on `#1A1A1A` both clear WCAG AA for the sizes used. Never drop body text below 60% ink.
- When a screen feels busy, the fix is almost always *remove*, not *add*.

---

## 4. Anti-patterns — reject in review

If a PR contains any of these, request changes. Do not merge.

- Any accent color, brand hue, or non-photo gradient.
- Bold display headings (display is always DM Sans 300; emphasis is scale).
- Rounded photo or card corners (only controls/avatars/icon chips are pill/circle).
- Drop shadows or glassmorphism for depth.
- Pure white surfaces instead of warm parchment.
- A third typeface, or system sans/serif for primary text.
- Tight, generic SaaS hero (centered single column, gradient blob).
- More than one `primary` button per viewport.
- Captions placed on photos without an overlay gradient.
- Positive tracking on display type, or zero tracking on labels.

---

## 5. Repository conventions

### Code style
- **Works over elegant.** Plain approaches win (per user preference). If there is a one-liner and a clever one-liner, prefer the readable one.
- **No premature abstraction.** Three usages, then refactor. Two usages, leave it.
- **Use the current build stack for the live app.** The repository now uses Vite + React + Tailwind in `src/` for the web UI. Keep `data/entries.json` as the canonical validator source, and serve a copy from `public/data/entries.json` for preview/build output.
- **No extra frontend frameworks.** React is the framework here; do not add Next.js, Remix, Astro, or a second UI runtime. GSAP is allowed for motion; do not add another animation library.
- **Keep build scripts simple.** Use `npm run dev`, `npm run build`, and `npm test`. If you need to change the web surface, update the Vite entry (`index.html` + `src/main.jsx`) and keep the token contract in sync with `docs/DESIGN.md`.

### Data discipline (per `docs/ARCHITECTURE.md` and `OCR_PIPELINE.md`)
- **Never modify, move, or overwrite** `sources/KamusPaser-Indonesia.pdf` (not in repo, but referenced). The original is the source of truth.
- **Raw OCR text stays in `data/raw_ocr/`** as the audit trail. Don't merge raw OCR into curated output.
- **Every curated entry must be traceable** to a page (`source.file` + `source.page`).
- **Review status is required** on every entry. New entries default to `needs_review`.
- **`data/entries.json` is the publishable artifact.** Sample data lives at `data/entries.sample.json` and must not leak into the live web view.
- **Run `npm test`** before committing changes to the web or data layer. The validator checks structure (headword string, translations array, JSON array shape) — it does not check semantic correctness, so human review is still required for content.

### Branch & PR workflow
- **`main` is the contributor branch.** Feature work happens on `feat/*`, `fix/*`, `chore/*` branches off `main` (or off an upstream sync point).
- **Single commit per logical change.** Squash noisy WIP commits before pushing.
- **Commit messages:**
  - Imperative mood, lowercase summary line (≤72 chars).
  - Blank line, then a 3–7 line body explaining *why* (not what — the diff shows what).
  - Reference issues / pages with `(#NN)` or `(OCR page-NNN)` when relevant.
  - Prefix with type: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `style:`, `test:`, `data:`.

### Updating the design system
- A change to a design token, component, or anti-pattern is a `docs:` commit that touches **both** `docs/DESIGN.md` and (if the change affects rendered output) `docs/altitude.html` in the same commit.
- If the change also affects the live app, follow up with a `feat:` or `refactor:` commit that applies the change. Do not bundle them.
- New code that introduces a pattern not in `DESIGN.md` should either (a) reuse an existing pattern, or (b) update `DESIGN.md` to register the new pattern.

---

## 6. Definition of done

A change is shippable when:

1. The validator passes: `npm test` reports `OK: N entries validated`.
2. The local server renders the change at `http://localhost:4173/public/` and motion / typography / color match `docs/altitude.html` and `docs/DESIGN.md`.
3. `prefers-reduced-motion: reduce` is respected (test by toggling it in dev tools).
4. No anti-pattern from §4 was introduced.
5. The commit message names the why, the diff is focused, and the branch is pushed.
6. If the change is a design system change, both `DESIGN.md` and (when applicable) `altitude.html` were updated in lockstep.
