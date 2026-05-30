# CLAUDE.md — Artificer Design System

This project uses the **Artificer** design system. Read this file before making any UI changes.

> **This repo is a downstream *consumer* of Artificer, not the design system
> itself.** It's `cameronsjo.github.io` — the root landing page, a document /
> wayfinding surface in the Artificer voice. The rules that matter here are the
> **Hard rules**, the **token cheatsheet**, the **surface decision** (this is a
> *document* surface — sans body, mono headlines), the **Whimsy doctrine**, and
> the **a11y / voice checklists** below. Honor those.
>
> The **ownership / lane** sections (Scope, Ownership lanes, Working with
> upstream artifacts, the Obsidian/theme/`build.mjs` material) describe the
> *artificer-design-system repo* and do **not** apply here — this repo owns no
> tokens, mints no palette values, and ships no themes. The design treatment is
> **mirrored**: tokens from `_palette.json`, the editorial composition layer
> (`src/styles/global.css`) copied from the blog, and the whimsy layer
> (`src/styles/whimsy.css`) copied from the canonical `artificer-design-system/
> src/artificer-whimsy.css`. Any palette / token / role change happens
> **upstream** in the design-system repo, then re-mirrors down — never edit a
> hex here to "fix" a color. The provenance rationale lives in that repo at
> `docs/field-reports/homepage-mirror-and-the-unowned-editorial-layer.md`.

## Scope — what this session owns

This session — **Lane 3, the local Claude Code session** — owns the **entire
repo**: tokens, components, `src/`, `live-spec/`, `framework-adapters/`, the
**palette-routed application themes** generated from `themes/_palette.json` via
`themes/build.mjs` (Ghostty, Claude Code, VS Code, tmux, gitmux, lazygit,
gh-dash), **and the Obsidian theme** (`themes/obsidian/Artificer/`).

Downstream surfaces split into two distribution shapes:

- **Theme primitives** (Ghostty, Claude Code, VS Code, tmux, gitmux) ship
  full files the user installs or symlinks.
- **Block fragments** (lazygit, gh-dash) — apps with no `@import`; ship as
  config fragments that splice into the user's config via chezmoi
  templating (primary) or copy-paste (fallback). Prior art and decision in
  `docs/research/category-3-distribution.md`.

**The Obsidian theme is yours to edit.** `themes/obsidian/Artificer/theme.src.css`
is the source; `theme.css` is generated (`npm run build:themes`) — edit the
source, never the generated file. A separate `claude.ai/design` Obsidian session
still exists, but it is now **advisory**: a design consultant you pull aesthetic
direction from, not an authority that gates your edits. Adopt its output, adapt
it, or decline it.

**The only thing that escalates out of this repo is a palette value or a semantic
role** — those stay centralized in Lane 1 (see below). Everything else, including
how the palette is *applied* to Obsidian surfaces, is Lane 3's to ship.

Why the change: a file-path boundary ("don't touch Obsidian") kept blocking
objective fixes — WCAG floor compliance, token-swaps, plain bug fixes — that are
mechanical, not aesthetic. Owning the surface end-to-end lets Lane 3 ship those
directly, with the advisory session as a reference rather than a gate. Full
rationale: `docs/field-reports/lane-3-owns-obsidian.md`.

## Ownership lanes — read before editing

The Scope section above defines the surfaces Lane 3 owns. This section defines the ownership model the repo lives inside. It is **not** three walled gardens — it is one repo (Lane 3) that escalates exactly two kinds of change upstream: **palette values** and **semantic roles** (Lane 1). Everything else is Lane 3's. The boundary is the *kind of change*, never the file it lands in.

### Lane 1 — Artificer core

**Upstream:** `claude.ai/design` session A.
**Owns:** `themes/_palette.json`, design tokens, type scale, motion curves, WCAG rules, plus the **simple-themed targets** (Ghostty, Claude Code, VS Code) because those are thin wrappers around the palette.
**Authoritative for:** token values, semantic role names, and the core *visual* rules below (color, type scale, motion curves, WCAG floor — `Hard rules`, `Token cheatsheet`). **Not** interaction/usage conventions (keyboard shortcuts, composition recipes) — those are Lane 3-authored, subject to Lane 1 ratification.

### Lane 2 — Obsidian theme (advisory)

**Upstream:** `claude.ai/design` session B — now **advisory, not authoritative.**
**Provides:** aesthetic direction for the Obsidian theme — cascade direction (subtle paper-on-paper vs. dramatic paper-in-frame), surface roles, heading variants A/B/C, callout palette bridge, Style Settings structure, plugin-integration ideas.
**But Lane 3 owns the file.** Treat session B's output the way you'd treat a senior designer's mockup: a strong reference you adopt, adapt, or decline. There is no "Lane 2 violation" anymore — `themes/obsidian/Artificer/` is Lane 3 territory. Record significant aesthetic decisions so the two stay in loose sync; coordination is courtesy, not a gate.

### Lane 3 — the repo (owns every surface)

**Owner:** the local Claude Code session + the repo itself. Owns **every file in the repo**, including the Obsidian theme.

**Governing principle:** *palette values and semantic roles escalate to Lane 1; everything else is Lane 3's to ship* — integration, usage, bug fixes, **and** how the palette is applied to Obsidian surfaces. Using an **existing** token is always Lane 3's call. Minting a **new** token value or role is Lane 1's. That single line is the whole boundary.

**Owns and ships without asking:**

- **Integration wiring** — which existing token/role paints which UI element, in **all** targets including Obsidian. Role-mapping with the established palette is integration, not a new design value.
- **The Obsidian theme** — edit `theme.src.css`, rebuild `theme.css`; surface roles, component overrides, cascade application, Style Settings wiring. Pull aesthetic direction from the advisory session when you want it; you don't need its sign-off.
- **Pipeline & distribution** — `themes/build.mjs`, `install.sh`, manifest/version bumps, BRAT release wiring, CI, dotfile integration, hardlink/symlink repair, font inlining.
- **Interaction & usage conventions** — keyboard shortcuts, focus behavior, composition of primitives into product surfaces, documentation.
- **Unambiguous bug fixes & floor compliance** — a surface painting browser-default white through a missing `background`; WCAG contrast/focus floor fixes; swapping a raw `px`/hex for an existing token.

**Escalates — the narrow list (Lane 1 only):**

- A **new color value**, or a change to an existing token value in `_palette.json`.
- A **new or renamed semantic role name**.

That's the entire list. Obsidian aesthetic intent **no longer escalates** — it's yours, informed by the advisory session.

**When in doubt, ship it and note it for upstream ratification.** The Lane 1 ratification cycle (Lane 3 ships → Lane 1 ratifies on its next pass) is the safety net, not a gate. Reserve escalation for the two-item list above — don't pre-clear routine wiring or Obsidian work.

**If Lane 1 is unreachable** (e.g. at token capacity) and a genuine *palette-value* block is rotting, Lane 3 may file a *proposal* with full scaffolding — never an adoption — using the pattern in `docs/field-reports/lane-crossing-under-capacity-pressure.md` (version suffix, `$notes` flag, proposal doc, draft PR titled `(Lane 3 → Lane 1 review)`, Open Questions section). This applies to palette values/roles only — Obsidian aesthetic blocks no longer rot, since Lane 3 owns them outright.

### Working with upstream artifacts

When **Lane 1** produces a palette artifact (zip, `_palette.json`), it is
authoritative — adopt it deliberately:

0. **Distrust the packet's provenance.** An accompanying audit packet may claim edits are "already in-tree" or "workshopped" — verify against the current working copy first. Provenance sections go stale across machines/sessions; diagnosis survives a lost working copy, "it's already applied" does not.
1. **Diff** the new artifact against current repo state.
2. **Surface every delta** — color values, removed/added rules, structural changes — before applying.
3. **Apply adoption as a single coherent commit (or set)**, preserving upstream values faithfully.
4. **Only AFTER adoption:** layer fine tweaks (install fixes, manifest bumps, build pipeline adjustments) as separate commits.

When the **advisory Obsidian session** hands you a `theme.css`, it is **reference, not law.** You own the file. The verbatim-then-patches technique is still useful when you want a clean record of what came from the consultant vs. what you changed:

1. (optional) `feat(obsidian): take advisory vX.Y.Z as baseline` — drop in the consultant's output as a starting point.
2. `fix(obsidian): Lane 3 adaptations on top of vX.Y.Z` — your edits, deviations, and floor fixes.

But you are free to cherry-pick, adapt, or decline outright — no obligation to adopt verbatim. The `/adopt-handoff` skill encodes the Lane 1 palette flow; for Obsidian, use it only as far as it's useful. Retrospective on the prior hard-lane model: `docs/field-reports/three-lane-ownership-under-load.md`.

### Why the boundary is kind-of-change, not file-path

History shows the cost of getting this wrong in *both* directions. Under the old hard-lane model, the standalone Obsidian repo silently re-tuned the light-mode cream cascade and it carried forward unnoticed for versions — the lesson there was **record your aesthetic decisions and distrust "it's already applied" provenance**, which still holds. But the *other* failure was the file-path wall itself: it blocked Lane 3 from fixing objective WCAG/token violations in Obsidian without ceremony (`docs/field-reports/lane-3-owns-obsidian.md`). The fix for both is the same discipline: **decide by the kind of change.** A new palette *value* or *role* → Lane 1. Anything else, anywhere in the repo → ship it, and write down any non-obvious aesthetic call so the advisory session can stay in sync.

### Concurrent sessions & git hygiene

Cameron often runs a parallel Lane 1/Lane 2 `claude.ai/design` session
alongside this one. The git **index is shared state** across sessions:
`git add <your-file>` then `git commit` sweeps in *anything* another
session pre-staged — including out-of-lane files. **Commit by explicit
pathspec** (`git commit -- path/to/file`) or check `git diff --cached
--stat` before committing. Untracked (`??`) or unstaged (` M`) files you
don't recognize belong to the other session — leave them alone.

## Obsidian theme — debugging tokens

When a CSS variable resolves to an unexpected value in the rendered DOM (but the theme.css source looks correct), the cause is almost always a user CSS snippet shadowing the theme at `:root`. Snippets cascade AFTER the theme.

First diagnostic — one shell command:

```bash
grep -rn '<token-name>' "$OBSIDIAN_VAULT/.obsidian/snippets/"
```

**Coincidence trap:** if dark mode "works" and light mode doesn't, the snippet may be shadowing both — the dark-mode values just happen to match the theme's tokens. Don't assume mode-specificity from working/broken alone; check the snippets directory first. Full saga: `docs/field-reports/snippet-hijacks-theme-debug-saga.md`.

When the source is correct and snippets are clear but the *rendered* result still looks wrong (especially mobile), **stop guessing selectors from screenshots — query the live DOM.** Obsidian is Electron: open the renderer console (`Cmd+Opt+I`), run an IIFE that walks the DOM, reads *computed* styles, and copies the report to the clipboard (`navigator.clipboard.writeText`) for the user to paste back. `app.emulateMobile(true)` (revert `false`) flips the mobile layout on desktop (not pixel-identical to a device — confirm final look on-device). Process of elimination on a nested "double-box": dump ancestor backgrounds; if all transparent, the second fill is a child. Reusable snippets + saga: `docs/field-reports/live-dom-inspection-via-clipboard.md`.

## Where the system lives

- **`src/artificer.css`** — every token and component class. Import this once at app entry; do not duplicate values.
- **`src/tokens.json`** — machine-readable token export. Source of truth for non-CSS consumers (Tailwind, generators).
- **`src/artificer-theme.js`** — dark/cream theme persistence. Already handles `localStorage` and `prefers-color-scheme`.
- **`src/artificer-focus.js`** — `ArtificerFocus.trap(el, {onEscape})` for modal focus-trapping.
- **`src/artificer-icons.js`** — Lucide icon hydration via `<i data-icon="name">`.
- **`src/artificer-whimsy.css` + `src/artificer-whimsy.js`** — the sanctioned whimsy layer (burnished `ultrathink` shimmer). Opt-in; load after `artificer.css`. See § Whimsy. `window.Whimsy` exposes `hydrate / watch / celebrate / run / settle / ignite / clear`.

## Hard rules — do not break

1. **Use existing tokens.** Never write hex codes, hardcoded `px` for spacing, or invented `cubic-bezier` curves. If the value isn't in `artificer.css` (search for `--`), don't use it. *(The sole exception is the **Whimsy** layer — see § Whimsy — which is opt-in, bounded, and the one place full-spectrum color and looping motion are sanctioned.)*
2. **Use existing utility classes.** `.stack`, `.cluster`, `.grid-auto`, `.container`, `.btn`, `.card`, `.field`, `.notif`, etc. Don't recreate them with bespoke flexbox.
3. **One primary CTA per view.** `.btn--primary` shows up at most once per visible screen. Secondary actions use `.btn--secondary` or `.btn--ghost`.
4. **Lists cap at 7 visible items** (default 5). Beyond that: progressive disclosure, search, or grouping.
5. **Anchor words bold** — 3–5 `<b class="anchor">` per paragraph in body content. This is the system's primary scan mechanism, not optional emphasis.
6. **Notifications tier by action required**, not severity. See the four `.notif--*` modifiers.
7. **Numbers use `font-variant-numeric: tabular-nums`** — there's a `.num` utility, or set on parent.
8. **z-index uses the six rungs only**: `--z-base | --z-raised | --z-overlay | --z-popover | --z-modal | --z-toast`. No improvising.
9. **Honor `prefers-reduced-motion`.** Already wired. Don't add hard-coded `transition: 600ms` that bypasses `--dur-*`.
10. **WCAG 2.2 AA floor.** Every focusable element gets a `:focus-visible` outline (already wired). Every form field gets a `<label for>`. Every status uses dot+text, not color alone.

## First decision — what surface is this?

Before you write any CSS, decide: **is this a tool surface or a document surface?** The answer determines the body font and a couple of other defaults. If you skip this, you'll end up setting prose in monospace, which is the single fastest way to make Artificer feel wrong.

| | **Tool surface** | **Document surface** |
|---|---|---|
| What it is | Dashboards, consoles, terminals, log views, settings panels, command palettes, data tables, IDE-adjacent UI — anywhere the user came to *do something* | Writeups, READMEs, reports, postmortems, design docs, onboarding explainers, marketing-adjacent pages — anywhere the user came to *read something* |
| Body font | `var(--font-mono)` | `var(--font-sans)` |
| Default size | 14px | 15–16px |
| Mono shows up in… | Most things | Code, identifiers, file paths, numerals, table cells |
| Sans shows up in… | Labels, hints, microcopy | Most things |
| Mental model | Mono *is* the voice — every line is "data" | Mono is the *exception* — used to mark things that aren't prose |

**The same project can mix both.** A settings page is a tool. The README explaining the settings is a document. Use the right default for the right page; don't try to make one rule cover both.

**Why this matters.** Monospace gives every glyph the same horizontal slot. That's an asset for column-aligned numbers and code, and a liability for prose: it kills kerning cues, mutes bold/italic contrast, and flattens the anchor-word scan mechanism that Artificer's whole reading model depends on. When the *whole page* is mono, **nothing stands out** — which defeats the point.

**Anti-pattern that bit us once.** A written analysis with embedded data tables, set in mono throughout, with three explicit overrides back to sans (`.meta`, `h3`, `th`). That's the tell: if you're spending the type budget *escaping* the body face, the body face is wrong. Flip it — sans body, mono only on the identifiers and numbers — and the overrides disappear.

## Token cheatsheet

```css
/* Colors — always semantic, never raw */
var(--bg) /* base surface */
var(--bg-raised) /* cards, sidebar */
var(--bg-overlay) /* modals, palette */
var(--bg-inactive) /* unfocused panes */
var(--fg) /* primary text */
var(--fg-secondary) /* secondary text — meta, hints */
var(--fg-disabled) /* disabled text */
var(--accent) /* primary interactive — gold (dark) / sienna (light) */
var(--accent-bright) /* hover/focus accent */
var(--accent-fill) /* button bg, filled badges */
var(--on-accent) /* text on accent-fill */
var(--brand) /* Cameron's purple — wordmark, brand surfaces */
var(--success) /* sage green */
var(--attention) /* burnished amber */
var(--urgent) /* terracotta red */
var(--border) /* dividers, input borders */

/* Spacing */
var(--s-xs) /* 4 */
var(--s-sm) /* 8 */
var(--s-md) /* 16 — default gap */
var(--s-lg) /* 24 */
var(--s-xl) /* 32 */
var(--s-2xl) /* 48 */

/* Type — read this. The default depends on surface kind. */
var(--font-mono) /* JetBrains Mono — code, identifiers, file paths,
                          numerals, dense UI chrome (toolbars, status bars,
                          terminals). Default body face for TOOL surfaces:
                          dashboards, consoles, log views, data tables. */
var(--font-sans) /* iA Writer Quattro — prose. Default body face for DOCUMENT
                          surfaces: writeups, READMEs, reports, settings
                          explainers, marketing-adjacent content. Also: form
                          labels, hints, microcopy on tool surfaces. (Quattro,
                          not Inter — Inter was deliberately rejected; see FONTS.md.) */
/* Sizes via classes: .t-headline-lg/md, .t-body-lg/md, .t-label-md/sm */

/* Radius */
var(--radius-sm) /* 4 — inputs, badges */
var(--radius-md) /* 8 — cards, popovers */
var(--radius-lg) /* 12 — modals */

/* Motion */
var(--dur-instant) /* 80ms — hover/focus */
var(--dur-fast) /* 160ms — default */
var(--dur-max) /* 300ms — modal entry. Ceiling. */
var(--ease) /* cubic-bezier(.2,.7,.3,1) — single curve */

/* z-index — six rungs, no improvising */
var(--z-base) var(--z-raised) var(--z-overlay) var(--z-popover) var(--z-modal) var(--z-toast)
```

## Recipe — when asked to build…

| Ask | Use |
|---|---|
| "Add a settings page" | `.page-shell` + `.container--md` + `<fieldset>` + `.field` blocks, 3–5 fields per group |
| "Confirmation dialog" | `.scrim` + `.modal` + `ArtificerFocus.trap()` — see `overlay.html` in live system |
| "Toast" | `.notif` + tier modifier; pick by action-required not severity |
| "Status pill" | `.badge--{tier}` + `.dot--{tier}` inside |
| "Loading state" | Pick by duration: <100ms nothing · 100–500ms disabled label · 500ms–2s `.skeleton` · >2s `.progress` with concrete copy · >10s background |
| "Empty state" | `.empty-state` — title + body + ONE primary action |
| "Table" | `.table`, right-align numerics with `.num`, em-dash for empty cells |
| "Stat card" | Stat pattern: label (mono small caps) + value (mono large tabular) + delta (small) |
| "Form field" | `<div class="field">` with label, input, and EITHER hint OR error (with `aria-describedby`) |
| "Animation" | Only animate state changes. `transition: prop var(--dur-fast) var(--ease)`. Never invent durations. |
| "User-defined fun element / celebration / long 'thinking' state / brand wordmark" | `.whimsy` + `artificer-whimsy.css` & `.js` — the ONE sanctioned exception to the motion + raw-color rules. **See § Whimsy.** Never reach for it on chrome, status, data, or errors. |
| "Make it fun / playful / celebratory / rainbow" | The **Whimsy** layer — see § Whimsy. `.whimsy` / `data-whimsy="wave"` / `Whimsy.celebrate()`. Don't hand-roll a one-off. |

## Composition — dashboards, charts, diagrams

When you're past primitives and assembling product surfaces, three more rule-sets kick in. The full reference lives in `live-spec/composition.html`, `live-spec/charts.html`, `live-spec/diagrams.html`.

### Dashboards (`composition.html`)

- **Five page shells, pick one — don't invent a sixth.** `.dash-kpi-strip` (KPI row), `.dash-ops` (sidebar + log + detail), `.dash-observe` (chart-grid), `.dash-table-first` (table is the page), `.dash-split` (master/detail).
- **Density is a container choice.** Set `.density-compact|cozy|comfortable` on the page or panel. Compact for ops/log views, cozy default, comfortable for docs.
- **Filters live in one bar at the top.** Time-range, search, faceted filters, and density toggle in `.toolbar`. Don't sprinkle filters into individual panels.
- **Live data uses `.live-dot` + `.last-updated` + `.streaming` atoms.** No spinning refresh icons; the dot pulses and the timestamp updates.

### Charts (`charts.html`)

- **No new chart libraries without forwarding tokens.** ECharts, Recharts, Chart.js, vanilla SVG — all read `--chart-grid`, `--chart-axis`, `--series-1..5`. Snippets in `charts.html`.
- **Five series max.** If you need more, you have two charts or you have a sequential ramp problem. Use `--series-ramp-*` for magnitude.
- **No pies/donuts above 3 slices.** Bar chart instead. Hard rule.
- **Sparklines have no axes** and use `.sparkline` / `.sparkbars`. They live in tables, not standalone.
- **Two gridlines max** — baseline and one mid. Bars start at zero; lines may use a fitted Y range.
- **Don't animate chart entry by default.** Honor `prefers-reduced-motion`. The data is the point, not the reveal.

### Diagrams (`diagrams.html`)

- **Use `.dia-node` / `.dia-edge` / `.dia-edge-label` on inline SVG.** They inherit theme; you don't restyle.
- **One accent node per diagram** (`.dia-node--accent`) — the thing the diagram is *about*. Everything else is the default surface.
- **Ghost nodes for "planned/optional"** (`.dia-node--ghost` — dashed border, transparent fill). No legend needed.
- **Edge weight encodes resolution, not importance.** `.dia-edge--strong` for the message that closes a flow; default for everything else; `.dia-edge--dashed` for async/return.
- **No more than 9 nodes per diagram.** Group into sub-systems and link out.
- **Mermaid:** call `mermaid.initialize({ theme: 'base', themeVariables })` once at boot, reading from CSS vars. Snippet in `diagrams.html`.
- **React Flow:** wrap in `.rf-artificer` — class-scoped overrides forward all tokens.

## Voice & microcopy

- **Literal, not gestural.** "No runs yet" beats "Nothing to see here."
- **Name what's missing**, **why** (briefly), **what to do.** Three sentences max for empty states.
- **Errors say what to do**, not just what went wrong. "Add a digit" beats "Invalid."
- **No loading verbs alone.** "Loading…" → "Indexing 1,247 of 8,300 files."
- **Tabular > narrative for data.** Tables before paragraphs.
- **One thousand no's for every yes.** Every element earns its place. If a section feels empty, solve it with layout — not invented content.
- **Ask before adding sections or content.** Cameron knows the audience; don't pad a surface unilaterally to fill space.
- **No data-slop.** Decorative stats, counts, or icons that don't inform are noise — cut them.

## Anti-patterns

```html
<!-- Don't -->
<div onclick="..." style="padding:12px;background:#3c4150">Click</div>
<input placeholder="Email" /> <!-- placeholder-as-label -->
<div class="my-stack">...</div> <!-- bespoke layout -->
<button style="border-radius:24px">Save</button> <!-- non-token radius -->
<span class="text-red-500"></span> <!-- color-only signal -->
<div class="row"><button>OK</button><button>Cancel</button></div> <!-- two primary CTAs -->

<!-- Do -->
<button class="btn btn--secondary">Click</button>
<div class="field">
  <label class="field__label" for="e">Email</label>
  <input class="input" id="e" type="email" />
</div>
<div class="stack">...</div>
<button class="btn btn--primary">Save</button>
<span class="badge badge--urgent"><span class="dot dot--urgent"></span>Failed</span>
<div class="cluster"><button class="btn btn--primary">Save</button><button class="btn btn--ghost">Cancel</button></div>
```

**More anti-tropes — the AI-slop tells.** These don't show up as a wrong class; they show up as a *generic* look. Avoid them:

- **No faked imagery in hand-drawn SVG.** Illustrations, photos, logos, hero art drawn as inline SVG read as filler. Use a **labeled placeholder** and ask for the real asset. (The Lucide icon set and the `.dia-*` diagram system *are* the system — those SVGs are correct, not faked imagery.)
- **A placeholder beats a bad attempt** at the real thing. In hi-fi work, an honest gap is better than a wrong fill.
- **No decorative rounded-card + left-border accent stripe.** The "card with a colored left edge" combo is the single most generic AI-output cliché. This is distinct from `.pane--active`'s functional `border-left` — that one *signals active state*, it isn't decoration.

## Before shipping a UI change

1. Did you use existing tokens for every color/space/duration?
2. Did you add a new utility class only if no existing one fits?
3. Does the page work at 200% zoom without horizontal scroll?
4. Tab through — every interactive element reachable, focus order matches visual order?
5. Set OS to reduced-motion — does anything still animate?
6. Squint test — can you tell what's active without color?
7. Run axe DevTools — zero violations?

---

## The 5 motion patterns

| # | Pattern | When | Spec |
|---|---|---|---|
| 01 | **State change** | Hover, focus, theme toggle, toggle/switch | `var(--dur-fast) var(--ease)` (160ms) |
| 02 | **Continuous translation** | Loading bars, scrubbers, progress | Linear easing OK; everything else stays on `--ease` |
| 03 | **Attention pulse** | **Urgent only.** Blocking errors. | `.pulse` class — 1.6s, low contrast, suppressed under reduced-motion |
| 04 | **Skeleton shimmer** | Wait states > 1s | `.skeleton` — 1.4s horizontal sweep |
| 05 | **Modal entry** | `.modal` opening | Slide-up 8px + fade, 160ms — already wired |

**Rules.** 300ms is the ceiling. One easing — don't invent `cubic-bezier`s, use `--ease`. No parallax, no auto-play, no looping decoration. Honor reduced-motion (already wired). Animate state, not arrival — never animate things appearing on page load. **The one sanctioned exception is Whimsy (§ Whimsy) — opt-in, user-defined fun only.**

---

## Whimsy — the sanctioned exception

Whimsy is the **one** place Artificer relaxes "no looping decoration" and "no raw color": a flowing, burnished rainbow on text — the feeling of Claude Code's `ultrathink` shimmer. It exists for **user-defined fun elements** and **whimsical operations** — and nowhere else. Lives in `artificer-whimsy.css` + `artificer-whimsy.js` (in both `src/` and `live-spec/`); full interactive reference + playground at `live-spec/whimsy.html`.

**Load it (after `artificer.css`):**

```html
<link rel="stylesheet" href="artificer-whimsy.css" />
<script src="artificer-whimsy.js" defer></script>
```

### When to reach for it

- A **user-defined fun element** — a feature a person chose to light up, a brand wordmark, an easter egg.
- A **whimsical operation** — a celebration (deploy succeeded, streak hit), the `ultrathink` trigger-word gesture, a long "thinking" state.

That's the whole list. If it's not user-chosen delight, it doesn't get whimsy.

### The three effects (the whole motion vocabulary)

- **Flow** — the hue gradient slides sideways through the glyphs. On by default on every `.whimsy`. (Tiles seamlessly — never scrolls off / pops.)
- **Bob** — per-character sine bob; wave elements only (`data-whimsy="wave"`, hydrated into `.whimsy-char` spans).
- **Glow** — a static halo (`.whimsy--glow`). Not motion.

Toggle any layer off independently: `.whimsy--no-flow`, `.whimsy--no-bob`. Freezing a wave needs **both** off.

### Palettes (color, not motion)

- **Spectrum** (default) — burnished full-spectrum, generated in oklch at the palette's own chroma; hue stops land on Artificer's brand colors.
- **`.whimsy--brand`** — cycles the real semantic tokens (gold → rose → purple → steel → green); tracks light/dark for free.
- **`.whimsy--silver`** — near-neutral metal sheen: silver/grey on dark, warm graphite on cream. The most restrained variant — the only one calm enough to consider for headers (and only as a **static fill**: `.whimsy--silver.whimsy--no-flow`).

Knobs are all custom properties (`--whimsy-c` chroma, `--whimsy-speed`, `--whimsy-angle`, `--whimsy-gradient`, …). Override on any scope — no new tokens, no hex.

### Settle — whimsy rests

Long-lived whimsy must not loop forever. After N hue-cycles it settles: **static** (motion off, gradient frozen) or **glacial** (one hue drift over `--whimsy-settle-speed` ≈ 2.5 min, all secondary motion off). `Whimsy.run(el, {loops, settle})`, `Whimsy.watch(input, {…, loops, settle})`, or `Whimsy.scheduleSettle(el, n, mode)`.

### API

```js
Whimsy.hydrate(root?)            // split [data-whimsy~="wave"] into bobbing chars
Whimsy.watch(input, opts)        // ignite a target when a trigger word is typed
Whimsy.celebrate(el, ms?)        // one-shot, auto-clears
Whimsy.run(el, {loops, settle})  // ignite, then settle after N loops
Whimsy.settle(el, mode) / .unsettle(el)   // mode: "static" | "glacial"
Whimsy.ignite(el) / .clear(el)   // manual toggle
```

### Doctrine — do not break

1. **Opt-in only.** Never on chrome, nav, or anything automatic.
2. **One whimsy moment per view.** Like one-primary-CTA. Whimsy everywhere is wallpaper.
3. **Never on load-bearing UI.** No whimsy on errors, destructive actions, status, or data.
4. **Burnished by default.** `.whimsy--vivid` is a conscious choice, not a reflex.
5. **Display + bold only.** Gradient text drops contrast — keep it large. Never body copy.
6. **Reduced-motion is sacred.** Flow stops, burnish stays. Already wired — don't undo it.
7. **Whimsy rests.** Anything long-lived settles. A rainbow that never stops is just noise.

---

## The 8 form rules

1. **Label every field.** Placeholder is not a label — it disappears.
2. **Hint text explains constraints** ("2–32 chars") *before* the user types, not after.
3. **Error text says what to do**, not just what went wrong. "Add a digit" beats "Invalid."
4. **Wire `aria-invalid` + `aria-describedby`** to the error message id. Screen-reader users need this.
5. **Validate on blur**, not on every keystroke — except for password strength and async checks (e.g. username taken).
6. **One primary button per form.** If you need two, the secondary is "Cancel" or a ghost variant.
7. **Submit on `Enter`** from any text input. Multi-line forms: `⌘ Enter`.
8. **Don't reset the form on error.** Preserve everything the user typed.

---

## The canonical keymap

Artificer is keyboard-first: same gesture, same intent, everywhere. Full reference + cross-app convention in `live-spec/keyboard.html`.

| Action | Keys |
|---|---|
| Open command palette | `⌘ K` — the single entry to everything. **Never rebind to a command.** Editor/IDE targets also accept `⌘ ⇧ P`. |
| Search / filter in view | `/` |
| Confirm · multi-line submit | `↵` · `⌘ ↵` |
| Cancel / close / dismiss | `Esc` — returns focus to trigger |
| Toggle theme | `⌘ ⇧ L` |
| Navigate list / palette | `↑ ↓` then `↵` |
| Switch tab / pane | `⌘ 1`…`⌘ 9` |

**Rules.** `⌘ K` is the palette opener — don't overload it. Display combos with inline `<kbd>` (one element per key; `artificer.css` themes it — no bespoke styling). macOS glyphs in docs; map `⌘→Ctrl`, `⌥→Alt` at the binding layer per platform. Cross-app keybinds (Ghostty/tmux/VS Code/lazygit/gh-dash) conform to the convention where the app can honor it; their configs live in dotfiles, not this repo.

---

## The 12-point a11y shipping checklist

1. **One `<h1>` per page;** headings nest in order (no h2 → h4 jumps).
2. **Every form input has a `<label for>`.** Placeholder is not a label.
3. **Errors use `aria-invalid="true"` + `aria-describedby`** pointing to the error id.
4. **Color is not the only signal.** Status badges include a dot AND text. Required fields say "required."
5. **All interactive elements reachable by keyboard.** No `onclick` on bare divs.
6. **Focus order matches visual order.** No CSS `order` tricks that desync Tab.
7. **Modals trap focus** via `artificer-focus.js`; Esc closes; focus returns to trigger.
8. **Touch targets ≥ 44 × 44 px** in nav; smaller OK only inside dense tables.
9. **Images have `alt`** — empty `alt=""` for decorative, descriptive otherwise. Icons-as-labels need `aria-label` on the parent.
10. **Honor `prefers-reduced-motion`** — already wired; durations collapse to 0ms.
11. **Page works at 200% zoom** without horizontal scroll.
12. **Content readable without JavaScript.** Forms can require JS; content shouldn't.

**Test it.** Tab through. Turn off your mouse. Run axe DevTools (zero violations). VoiceOver/NVDA once per major view. Set OS reduced-motion, reload — nothing should jump.

---

## The 7-point voice & tone checklist

1. **Name the surface or object.** "No projects yet" beats "Nothing here."
2. **Front-load the verb.** The first word of a button is what it does.
3. **Three jobs for an error:** what broke · why · how to fix.
4. **No emoji** in product copy. (Wordmarks and avatars are fine.)
5. **No metaphor in failures.** "Gremlins" / "magic" / "sideways" are confusing under stress.
6. **Don't celebrate.** A success message is a receipt, not a parade.
7. **Read it back at 1.5× speed.** If anything feels like filler, cut it.

---

## Where to read more

- `README.md` (this folder) — system overview, install paths
- `reference/SKILL.md` — exhaustive token cheatsheet, recipe table, anti-patterns
- `live-spec/` — every HTML preview page, copied verbatim from the source project. Open any of them in a browser alongside `src/artificer.css`.
- `themes/` — Artificer ported to Claude Code, Ghostty, and VS Code. Same palette across all three; install paths in `themes/README.md`.
