// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// Root user site, served from the apex GitHub Pages domain. Unlike the project
// sites (blog, agentic-harnesses), this has NO `base` — it lives at `/`. Links
// to those sites are absolute root paths (`/blog`, `/agentic-harnesses`) and
// must be hardcoded, never routed through withBase().
export default defineConfig({
  site: 'https://cameronsjo.github.io',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
