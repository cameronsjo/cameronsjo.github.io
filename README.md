# cameronsjo.github.io

Cameron Sjo's root landing page — the front door at
[`https://cameronsjo.github.io`](https://cameronsjo.github.io). A single-page
index that links out to the project sites. Built with
[Astro](https://astro.build), deployed to GitHub Pages as a **user site**.

## Develop

```bash
npm install      # once
npm run dev      # http://localhost:4321/
npm run build    # static output to dist/
npm run preview  # serve the built site
npm run check    # type-check components
```

> **Don't remove the `vite` override in `package.json`.** It pins Vite to
> `7.3.3`. Without it a fresh install / `npm update` pulls Vite 8, which
> `@tailwindcss/vite` resolves against Astro 6's bundled Vite 7, and the build
> dies with `Missing field 'tsconfigPaths'`.

## What this is

The other GitHub Pages sites are **project sites** served under a sub-path
(`/blog`, `/agentic-harnesses`). GitHub reserves the apex
`cameronsjo.github.io` for a **user site**, served from a repo named exactly
`cameronsjo.github.io` — this one. It's the discoverable index over everything
else.

The "properties" list is driven by the `PROJECTS` array in `src/consts.ts` —
add an entry there to list a new site. Each `href` is an **absolute root path**
to a separate deployment (`/blog`), hardcoded rather than routed through
`withBase()`, because those sites are independent of this one.

## Structure

| Path | Purpose |
|------|---------|
| `src/pages/index.astro` | The landing — hero, bio, properties list |
| `src/consts.ts` | `PROJECTS` list + title/wordmark/description |
| `src/layouts/BaseLayout.astro` | Topline, grain shell, theme script, Header/Footer |
| `src/components/` | Head/SEO, header (base-less nav), footer |
| `src/styles/global.css` | Tailwind v4 + Artificer tokens + editorial composition layer |
| `src/styles/whimsy.css` | Artificer whimsy layer (mirrored from canonical `artificer-design-system/src/artificer-whimsy.css`) |
| `src/fonts/` | Self-hosted iA Writer Quattro S + JetBrains Mono (WOFF2), from the canonical bundle |
| `CLAUDE.md` | Artificer house rules (consumer-scoped — see the preamble) |

Styling follows the [Artificer](https://github.com/cameronsjo) design system —
dark-default with a paper light mode (toggle in the header, persisted to
`localStorage` under `artificer.theme`), mono headlines over a humanist-sans
body, gold accent. The treatment is **mirrored, not depended on** — the same
pattern the blog uses. Rationale and the dogfooding feedback it surfaced live in
the design-system repo at
`docs/field-reports/homepage-mirror-and-the-unowned-editorial-layer.md`.

The `cameron.` wordmark carries the Artificer `ultrathink` shimmer
(brand-palette gradient, flowing). It honors `prefers-reduced-motion` — the flow
stops, the burnished gradient stays.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`
(`withastro/action` → GitHub Pages). The repo's **Settings → Pages → Source**
must be set to **GitHub Actions** once.

## License

[MIT](./LICENSE)
