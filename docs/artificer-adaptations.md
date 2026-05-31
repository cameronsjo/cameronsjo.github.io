# Artificer adaptations

How this project bends the Artificer design system, and why. Each entry mirrors a
feedback issue filed upstream.

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
