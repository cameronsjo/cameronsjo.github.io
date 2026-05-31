# Artificer origin story — outline / riff

> **Status:** DRAFT outline to riff on. Not published. Eventual home is the blog
> repo (`~/Projects/blog/src/content/blog/`), not this site repo. Dates here are
> evidence-backed (handoff-bundle mtimes + canonical git log + the Apr 17 launch).
> ⚠ Owner-review the personal/candor beats before any of this goes public.

## The hook (cold open)

The page you're reading is built with Artificer. Artificer was built **in
claude.ai/design** and handed to **Claude Code** as handoff bundles — the tool's
own design-to-build workflow, pointed at itself. Tools all the way down. The
whole thing went from nothing to v0.10.1 in about **thirty-five days**.

## Working titles
- *Thirty-Five Days: A Design System Built Through the Tool That Built It*
- *Tools All the Way Down*
- *From a Persona to v0.10 in Five Weeks*

## The spine (beats)

1. **Before the tool — the persona (2025).** The Artificer was an *identity*
   first: a workshop figure, "each system ran quieter for having known him,"
   written as prompts in early 2025. The taste was set a year before there was
   anything to theme. *(Evidence: prompt frontmatter `created: 2025`.)*
2. **The launch + the itch (Apr 17–25).** claude.ai/design ships Apr 17. The
   first Artificer sketches happen inside it that week — not good enough to
   dogfood. A handoff for a *different* app ("Minute," Apr 25) proves the
   workflow works.
3. **The commit (Apr 26).** Artificer is finally solid enough to become a repo.
   First commit: "Initial design system scaffold." Designed-in-tool → bundle →
   Claude Code. *(Evidence: git initial commit 2026-04-26.)*
4. **The palette locks (v0.6, May 9–10).** Dropping sage/vermillion/lilac;
   canonicalising apothecary green, brick, indigo. The CHANGELOG first appears
   *between two handoff bundles fifty-six minutes apart.* The colors stop moving.
5. **The lane model + the 25-minute sister theme (May 11–19).** Obsidian splits
   off, hand-authored. One morning: 0.6.1 → 0.6.2 → 0.6.3 in **25 minutes**.
   The lane model exists to keep that velocity coherent. *(Candor beat: the
   burst pattern — intentional and not. Owner's call how personal to get.)*
6. **Honest contrast (v0.7, May 19).** The lesson: a WCAG-AA pass isn't a
   perceptual pass. Mint a muted foreground so a comment reads as *metadata*,
   not just legible. Contrast is a judgement, not a number. 0.7.0→0.7.2 in a day.
7. **Whimsy (v0.8, May 29).** The single sanctioned exception to "no looping
   decoration / no raw color" — burnished rainbow, bounded hard. Why a strict
   system needs exactly one place to play.
8. **Becoming dependable (v0.9–v0.10.1, May 30–31).** Baseline contract,
   pre-paint theme boot, editorial surface; navigation primitives, responsive,
   an on-ramp; npm + CDN with integrity hashes. A contract, not a snapshot.
9. **Used, then tuned (now).** Three sites run on it; each surfaces a gap that
   feeds back as an issue. 30% building, 70% tuning — the finished *feel* is the
   point.
10. **Coda.** What it means that a design tool's handoff workflow can birth a
    real, multi-surface, distributed system in five weeks — and the dogfooding
    loop that keeps it honest.

## Threads to weave through
- **Built-through-the-tool** (the meta-loop; claude.ai/design → Claude Code).
- **Velocity & bursts** (same-day version flurries; the 25-minute sister theme).
- **Doctrine over decoration** (anchor words, one CTA, tier-by-action, the one
  whimsy exception).
- **Contrast as judgement** (the v0.7 lesson; "WCAG pass ≠ perceptual pass").
- **Dogfooding feedback loop** (consumers file issues upstream).

## Evidence appendix (for fact-checking the post)

| Date | Event | Source |
|---|---|---|
| 2025-01/02 | Persona prompts authored | prompt frontmatter |
| 2026-04-17 | claude.ai/design launches | announcement |
| 2026-04-25 | "Minute" handoff (different app) | bundle mtime |
| 2026-04-26 | Artificer repo scaffolded | git initial commit |
| 2026-05-09→10 | v0.6 palette lock; CHANGELOG appears | bundles + git |
| 2026-05-11 | Obsidian 0.6.1→0.6.3 in 25 min | bundle mtimes |
| 2026-05-19 | v0.7.0→0.7.2 (one day) | git |
| 2026-05-29 | v0.8.0 whimsy | git + bundle |
| 2026-05-30 | v0.9.0 + distribution + v0.10.0/0.10.1 | git + bundle |
| 2026-05-31 | CI gating; v0.10.1 canonical | git |

## Pull-quote candidates
- "The colors stop moving." (the palette lock)
- "Three releases in twenty-five minutes."
- "A WCAG pass isn't a perceptual pass."
- "The finished object was never the point — the finished feel is."
- "Tools all the way down."

## Open questions / flags before publishing
- How personal on the ADHD/burst framing? (page keeps it professional; the post
  could go further — owner's call.)
- Confirm the Apr 17 launch date and any NDA/embargo on naming claude.ai/design
  specifics.
- "Minute" is a separate app — mention by name or keep generic?
- Decide canonical home + cross-links (this `/artificer` page ↔ the post).
