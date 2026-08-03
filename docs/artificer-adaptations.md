# Artificer adaptations

How this project bends the Artificer design system, and why. Each entry mirrors a
feedback issue filed upstream.

## 2026-08-02 — Three-zone colophon spine (0.22.0)

**Fleet consistency pass.** `@cameronsjo/artificer@0.22.0` minted
`.colophon__spine` — the colophon's one row: identity · sign-off · links,
three positional grid slots. Bumped `0.21.0` → `0.22.0` and rebuilt
`Footer.astro` onto it, matching the shape five other sibling sites are
adopting in the same pass.

- **Before:** hand-rolled Tailwind flex-thirds (`flex flex-col gap-2 border-t
  py-6 text-sm sm:flex-row sm:items-center`, per-span `sm:flex-1` /
  `sm:text-center` / `sm:justify-end`, inline `border-color`/`color` on the
  `<footer>`, inline `font-size: smaller` on the whimsy span) plus a code
  comment explaining why three equal flex thirds were needed to keep the
  sign-off centered on the true page width.
- **After:** `<footer class="colophon"><div class="container"><div
  class="colophon__spine">…</div></div></footer>`. Zero footer-specific CSS
  remains in this repo — type treatment, the 44×44 touch floor on spine
  links, and the mobile stack all come from the package. The three-equal-
  thirds comment is gone; the primitive's own grid (`1fr auto 1fr`)
  guarantees the centering it used to explain.
- **Content unchanged:** `© {year} {SITE_TITLE}` identity, `kindness is a
  choice.` sign-off (kept from the 0.21.0 migration below, including the
  data-attribute whimsy-greeting form), single GitHub link — now wrapped in
  `<nav class="cluster">` instead of a bare `<span class="flex gap-4">`.
- Zones 1 and 3 (the colophon's optional pre/post-spine content) are unused
  here — this footer is spine-only, same as before.

**Verified:** `npm run build` and `npx astro check` both exit 0;
`--art-version: "0.22.0"` appears in built CSS; `dist/index.html`'s footer
carries `colophon` + `colophon__spine`, `data-whimsy-greeting` with
`kindness is a choice.` intact. No browser in this session — visual
rendering unconfirmed.

## 2026-08-02 — Retired the hand-forks, adopted standard consumption (0.21.0)

**Model migration.** This site carried two hand-forked Artificer copies at two
different vintages: `src/styles/global.css` stamped `--art-version: "0.9.0"`
(the palette/token subset below), and `src/styles/whimsy.css` (7 self-hosted
woff2 in `src/fonts/`) stamped v0.7.2. Neither had received an upstream fix
since — including the June Pride greeting swap, because the footer's whimsy
span carried static `whimsy whimsy--glacial` classes with no
`data-whimsy-greeting` attribute for `Whimsy.greeting()` to hook into. This
migration retires the *model*, not just the version: pin
`@cameronsjo/artificer@0.21.0`, consume its CSS + fonts + whimsy.js directly
via Vite (mirroring `blog`'s 0.18.0 migration — same stack, same shape), and
shrink `global.css` to only the genuinely site-specific layer stacked on top.

**Stripped from `global.css` (absorbed by the package):**

- The 7 `@font-face` blocks (JetBrains Mono + iA Writer Quattro S) — the
  package bundles both families and Vite hashes/emits them from
  `node_modules`; `src/fonts/` and `src/styles/whimsy.css` were deleted.
- The `--art-version: "0.9.0"` stamp — `global.css` loads last, so leaving it
  in place would have overridden the package's own `--art-version: "0.21.0"`
  and silently defeated the fleet's version verification.
- The full `:root` dark-mode token block (`--bg*`, `--fg*`, `--accent*`,
  `--steel`, `--brand-purple`, `--attention`/`--urgent`/`--success`,
  `--radius-*`, `--s-*`, `--dur-fast`, `--ease`, letter/word-spacing,
  `color-scheme`) and the `:root[data-theme="light"]` paper-mode block — all
  now sourced from `artificer.css`'s own `:root`, byte-for-byte the same
  values this repo had been hand-mirroring.
- The generic `a` / `a:hover` accent rules and `::selection` — now come from
  `artificer.css`.

**Kept as genuinely site-specific** (mirrors `blog/src/styles/global.css`
exactly — same editorial layer, same reasoning):

- `@theme { --font-sans; --font-mono }` — Tailwind v4's theme-var exposure;
  the package's plain `:root` custom properties don't map to Tailwind
  utilities on their own.
- `html { font-family; font-size: 16px; line-height; word-spacing }` — pins
  the rem/clamp() anchor explicitly. (`artificer.css`'s `html { font-size:
  100% }` resolves to the same 16px, but this repo already pinned 16px
  literally pre-migration — see the type-scale note below.)
- `body { margin: 0; min-height: 100vh }`, the `h1–h4` / chrome word-spacing
  rules, `.wordmark` (color + hover), `code/pre/kbd`, the `:focus-visible`
  fallback (the package only styles `:focus-visible` on specific components,
  not a blanket rule), `prefers-reduced-motion`, `.prose` token bindings, the
  paper-grain texture (`--grain-opacity`, `body::before`), `.topline`,
  `.shell`, `.reveal`, and the unused `.hero`/`.entries`/`.entry__*`/
  `.post-title` blocks (dead CSS left over from the blog mirror; out of scope
  for this migration — the index page is a command-palette launcher styled in
  `index.astro`'s own scoped `<style>`, not the editorial-list layer).

**Footer defect fixed.** `Footer.astro`'s whimsy span carried static
`whimsy whimsy--glacial` classes with no `data-whimsy-greeting` attribute —
`Whimsy.greeting()` only swaps elements matching `[data-whimsy-greeting]`, so
this site never received a seasonal swap. Converted to the data-attribute
form (mirroring `blog/src/components/Footer.astro`): inline fallback text +
`data-whimsy-greeting-class="whimsy--glacial"`, no static whimsy classes
(`greeting()` adds those itself). Also reworded the sign-off `kindness is
free.` → `kindness is a choice.` — coincidentally the package's own default
off-season fallback text (`artificer-whimsy.js`'s `greetingFor()`), confirming
the wording lines up with upstream doctrine.

**Whimsy load pattern.** `whimsy.js` is a side-effect-only module and the
package declares `sideEffects: ["*.css", "src/artificer-*.js"]`, so a static
`import` gets tree-shaken away. `BaseLayout.astro` loads it via a dynamic
`import()` in a plain `<script>` at the end of `<body>`, same pattern as
`blog` (which additionally re-applies on `astro:page-load` for View
Transitions — this site has no `<ClientRouter />`, so a single call on load
is sufficient).

**Type-scale crossing — what applied and what didn't.** The jump 0.9.0 →
0.21.0 crosses 0.18.0's "root re-true" (`html { font-size: 100% }` replacing a
silent 87.5% root). **No-op here**: this site's `html` rule already pinned
`font-size: 16px` explicitly pre-migration, so the effective root size is
unchanged. A **real, separate** cascade change did surface: `artificer.css`
now sets `body { font-size: var(--t-body-md-size) }` (14px, the
document/tool-surface default), where previously `body` had no font-size of
its own and inherited 16px from `html`. Two live-content rules relied on that
implicit inheritance and would have silently shrunk: `.row` (the launcher's
destination rows — text, name, all cascaded from `.row`'s unset font-size)
and `.palette__caret` (the `›` prompt symbol). Both now carry an explicit
`font-size: 1rem`, matching the 16px they rendered at before.

**Verified:** `npm run build` succeeds; `--art-version: "0.21.0"` appears in
built CSS; the footer span carries `data-whimsy-greeting` and no static
whimsy classes; no `kindness is free` remains in `src/`; `src/styles/
whimsy.css` and `src/fonts/` are gone; no `--art-version` or `@font-face`
remain in `global.css`. `npx @cameronsjo/artificer lint` reports 7 raw-px
violations (Header.astro's `.theme-toggle`, index.astro's `.row__num`/
`.palette__kbd`-adjacent 12px sizes, and `global.css`'s pinned `html {
font-size: 16px }` plus the two unused `.entry__num`/`.entry__date` 12px
rules) — all pre-existing, none introduced by this migration; not fixed here
per the migration's scope.

**Could not verify:** no browser is available in this session, so nothing
was checked visually — no screenshot of the rendered page, light-mode
paper-mode rendering, the command-palette's fuzzy-filter interaction, or the
whimsy greeting's actual pixel appearance. The type-scale analysis above is
from reading CSS source and the cascade rules directly, not from a rendered
DOM.

## 2026-05-31 — v0.6/v0.7.2 → v0.9.0 mirror crossing

Upstream issue: [cameronsjo/artificer-design-system#76](https://github.com/cameronsjo/artificer-design-system/issues/76)
Mirror commit: `832da70`

Upgraded the hand-mirrored tokens from v0.6 (palette, `src/styles/global.css`) /
v0.7.2 (whimsy, `src/styles/whimsy.css`) to the v0.9.0 baseline contract.

- **Palette was already color-identical.** Full dark+light hex diff vs. canonical
  `_palette.json` = zero color changes. v0.6 was the locked palette; v0.9.0 added
  the *contract* and taxonomy, not color edits. Not a contrast-sensitive re-mirror.
- **`/artificer-upgrade` high-risk 0.10.x items all N/A** for this doc/landing
  surface: theme key already `'artificer.theme'`; no `.tok-keyword`/code highlight;
  no `--t-*-size` px overrides.
- **Two real touches, both floor items:** stamped `--art-version: "0.9.0"`
  (provenance lever, runtime-queryable); added missing required `--urgent` token
  (terracotta, `#a04540` dark / `#8a2418` light, re-mirrored exactly).
- **Hardened `.whimsy--brand`** with literal dark-mode hex fallbacks — graceful
  degrade vs. silent invisible text. Consumer-specific defensive hack; not for
  upstream.
- **Deliberately skipped** recommended-but-unused tokens (`--dur-instant`,
  `--dur-max`, `--s-3xl`, `--on-*` pairs, fill variants, `--cyan`) per the
  "don't pad / one thousand no's" doctrine — this surface never references them.
- **Lane:** all Lane 3. `--urgent` is a re-mirror of an existing canonical value,
  not a new color/role.
- **Upstream signal:** for a read-only document/landing surface the baseline
  contract's floor reduces to `--art-version` + the status quartet; the rest is
  tool-surface-oriented. A "minimal landing-surface conformance" tier could help.

## 2026-05-31 — Homepage as a command-palette launcher

Upstream issue: [cameronsjo/artificer-design-system#98](https://github.com/cameronsjo/artificer-design-system/issues/98)

**Pivot:** the root landing page (links + bio wayfinding hub) became a ⌘K-style
command palette with fuzzy search, instead of the blog-mirrored editorial list.

| type | surface | token / rule / pattern | what we did + why | upstream? | lane |
|---|---|---|---|---|---|
| misfit | tool | "document surface" decision (CLAUDE.md) | Repo CLAUDE.md pre-declares the whole repo a *document* surface (sans body, mono headlines). The landing page's job is wayfinding — a *tool* surface. Reframing it as tool (mono throughout, launcher motif) is what made it work. | yes | 3 |
| gap | tool | none existed | No `.card` / `.palette` / command-palette primitive in the consumer CSS (`global.css` + Tailwind only). Built prompt + list + rows + empty-state + fuzzy/keyboard JS from tokens. | yes | 3 |
| extension | tool | keymap (`live-spec/keyboard.html`) | Keymap canonizes ⌘K = "the single entry to everything" and `/` = filter, but ships no component to bind them to. Implemented fuzzy filter + ↑↓ + ↵ + Esc + ⌘K + `/`. | yes | 3 |
| confusion | — | `.card`/`.grid-auto`/`.btn`/`.stack` (hard rules) | Hard rules reference `artificer.css` utilities that don't exist in this consumer's distributed CSS. "Use existing utility classes" is unfollowable for cards/palettes here. | maybe | 3 |
| override | — | "one whimsy moment per view" | Chrome already spends two whimsy moments (header wordmark + footer phrase) before the body adds any. Left as-is (chrome out of scope), flagged. | maybe | 3 |

**Friction:** the surface pre-classification fought hardest. Following "document
surface" produced a correct-but-generic editorial list identical to the blog. The
page only came alive when we contradicted the stated surface and treated the
landing page as a tool. Tool-vs-document is a per-*page* call, not a per-*repo*
constant.

**Don't upstream:** the 3-row content, bio copy, `slug()`/`num()` helpers, the
Cloudflare beacon, and the exact fuzzy weights (word-boundary +5, streak ×2) —
all tuned for 3 items. The command-palette *idea* generalizes; these constants
don't.

**Lane note:** pure Lane 3 — no palette values or role names changed. Everything
used existing tokens (`--bg-overlay`, `--accent`, `--steel`, `--radius-lg`,
`--s-*`, `--dur-fast`, `--ease`).
