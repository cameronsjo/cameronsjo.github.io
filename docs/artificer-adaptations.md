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
