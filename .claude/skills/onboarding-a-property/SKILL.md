---
name: onboarding-a-property
description: Use when adding a new project site (a separate GitHub Pages repo) under cameronsjo.github.io — linking it from the landing page and wiring its deploy + Pages.
metadata:
  author: cameronsjo
---

# Onboarding a property to cameronsjo.github.io

## Overview

The root site at `cameronsjo.github.io` is an index that links out to separate
GitHub Pages **properties** — each its own repo, deployed to
`cameronsjo.github.io/<repo>/`. Onboarding one touches **two repos**: the new
site (deploy + Pages) and this repo (register the link). Analytics is automatic.

## When to use

- Adding a new project site / GitHub Pages repo under `cameronsjo.github.io/<name>`
- "Link out to the new site", "add it to the landing page", a new property

## Checklist

### In the NEW site's repo

1. **Vite `base: './'`** (relative). Absolute `/assets/...` paths 404 on the
   `/<repo>/` subpath; Vite rebases `./` and `/`-rooted `index.html` refs to it.
2. **Deploy workflow** `.github/workflows/deploy.yml` — paths-filtered, build →
   `upload-pages-artifact` → `deploy-pages`. Copy from `spec-compare` or
   `agentic-harnesses`; least-privilege perms, pinned actions, no untrusted input.
3. **`package-lock.json` gitignore trap.** Research repos often ignore
   `package-lock.json` globally, but CI's `npm ci` REQUIRES it. Check
   `git check-ignore -v <site>/package-lock.json`; if ignored, append a scoped
   negation (`!<site>/package-lock.json`) and `git add` it. Silent CI failure otherwise.
4. **Enable Pages with the Actions builder** (a settings change — only with Cameron's go-ahead):
   ```bash
   gh api repos/cameronsjo/<repo>/pages            # 404 = not enabled yet
   gh api -X POST repos/cameronsjo/<repo>/pages -f build_type=workflow
   gh api repos/cameronsjo/<repo>/pages --jq '{build_type, html_url}'  # verify "workflow"
   ```
   Must be `build_type: workflow`, not a legacy branch source, or `deploy-pages` fails.
5. **Merge to main** → the deploy Action publishes to `https://cameronsjo.github.io/<repo>/`.

### In THIS repo (cameronsjo.github.io) — TWO registration points

6. `src/consts.ts` → add a `PROJECTS` entry `{ title, blurb, href: '/<repo>' }`.
   The href is an **absolute root path** — do NOT route it through `withBase()`.
7. `src/components/Header.astro` → add a `nav` entry `{ href: '/<repo>', label: '<short>' }`.
   **Easy to add the card (6) and forget the nav (7).** Both are needed.
8. *(optional accuracy)* `src/layouts/BaseLayout.astro` → add `/<repo>` to the
   Cloudflare analytics token-coverage comment.
9. `npm run build` — confirm the link renders in nav + cards. `dist/` is
   gitignored (CI builds it), so only the `src/` files are committed.

### Analytics — already done, just VERIFY

10. Cloudflare Web Analytics is **hostname-scoped**: one token covers
    `cameronsjo.github.io/*`. If the new site copied the shell, the beacon is
    already in its `index.html` — confirm the token matches
    (`9db7302de886402680e0838d0f35f7db`). Do NOT register anything in the
    Cloudflare dashboard; sub-paths report automatically.

## Merge order

Merge the **new site's PR first** and let its Pages deploy run, so `/<repo>`
resolves before the landing link goes live — otherwise the new link 404s transiently.

## Common mistakes

- Committing without `package-lock.json` (gitignored) → CI `npm ci` fails.
- Registering the card but not the nav (or vice-versa).
- Leaving Pages on a branch source instead of `build_type: workflow`.
