/**
 * Artificer — the dated evolution timeline.
 *
 * Dates are EVIDENCE-BACKED, not guessed:
 *  - persona prompts: frontmatter `created:` (2025)
 *  - claude.ai/design launch: Apr 17, 2026 (announced)
 *  - v0.1 → v0.6 birth: claude.ai/design → Claude Code *handoff bundles*
 *    (file mtimes of the "Cameron Personal Design System" / "Obsidian Theme" zips)
 *  - v0.7 → v0.10.1: canonical repo git log (commit dates)
 *
 * The point of the dates: show how fast — and how burstily — it materialized.
 * A complete, multi-surface, distributed system went from repo-scaffold to
 * v0.10.1 in ~35 days, with same-day version flurries inside that.
 *
 * ⚠ OWNER-REVIEW before publish. The "before" and "now" entries carry the
 * personal/archetype voice; the velocity framing is candid but kept
 * professional (no diagnosis named — dial that up if you want it). Edit freely.
 */

export interface Milestone {
  /** Version tag, or a soft anchor for the bookends. */
  version: string;
  /** Human date or span — evidence-backed. */
  date: string;
  /** Short phase label — the chip on the rail. */
  phase: string;
  /** One-line headline for the moment. */
  title: string;
  /** 1–2 sentences. Limited telling. */
  body: string;
}

export const ARTIFICER_TIMELINE: Milestone[] = [
  {
    version: '—',
    date: '2025',
    phase: 'Before',
    title: 'The persona, a year early',
    body: 'The Artificer existed as an identity long before it was a design system — a workshop figure who makes things run quieter for having known him, written up as prompts in early 2025. The taste was set; there was just nothing to theme yet.',
  },
  {
    version: 'v0.1',
    date: 'Apr 17–26, 2026',
    phase: 'Scaffolded',
    title: 'Built through the tool that launched it',
    body: 'claude.ai/design shipped on Apr 17; within the week the first Artificer sketches were taking shape inside it — not yet good enough to dogfood. By Apr 26 it was solid enough to hand off to Claude Code as a repo. The system was designed in the product, using the product’s own design-to-handoff workflow on itself.',
  },
  {
    version: 'v0.6.0',
    date: 'May 9–10, 2026',
    phase: 'The lock',
    title: 'The palette stops moving',
    body: 'The first full handoff bundle: sage, vermillion, and lilac dropped; apothecary green, brick, deep and lifted purple, and midnight indigo canonicalised. The CHANGELOG first appears between two bundles fifty-six minutes apart.',
  },
  {
    version: 'v0.6.1–0.6.4',
    date: 'May 11–19, 2026',
    phase: 'A sister theme',
    title: 'Three releases in twenty-five minutes',
    body: 'Obsidian split off as a hand-authored sister theme, and the lane model was born to keep the surfaces coherent. One May morning it went 0.6.1 → 0.6.2 → 0.6.3 in twenty-five minutes — the cadence this thing actually moves at.',
  },
  {
    version: 'v0.7',
    date: 'May 19, 2026',
    phase: 'Honest contrast',
    title: "A WCAG pass isn't a perceptual pass",
    body: 'Syntax roles were mapped and a muted foreground minted so a code comment reads as metadata, not merely as legible text. 0.7.0 through 0.7.2 landed in a single day.',
  },
  {
    version: 'v0.8.0',
    date: 'May 29, 2026',
    phase: 'The exception',
    title: 'Whimsy — the one place the rules relax',
    body: 'A burnished, flowing rainbow for genuine delight — bounded hard, never on chrome, status, data, or errors, one per view. The mark at the top of this page is the system using its own exception.',
  },
  {
    version: 'v0.9.0',
    date: 'May 30, 2026',
    phase: 'The contract',
    title: 'Baseline, and out the door',
    body: 'In one day: it named its own baseline and version, learned to apply the theme before first paint, promoted an editorial surface, and shipped as a versioned package with integrity-hashed assets. A contract, not a snapshot.',
  },
  {
    version: 'v0.10.x',
    date: 'May 30–31, 2026',
    phase: 'A system you navigate',
    title: 'Navigation, responsive, an on-ramp',
    body: 'Breadcrumbs, a collapsing sidenav, an app bar and tabs; responsive breakpoints and finger-sized touch targets; a quickstart. v0.10.0 and v0.10.1 landed in the same stretch.',
  },
  {
    version: 'now',
    date: '~35 days in',
    phase: 'Used, then tuned',
    title: 'v0.1 to v0.10.1 in five weeks',
    body: 'Repo scaffold on Apr 26, ten versions by the end of May, three sites running on it and feeding gaps back upstream. Built fast and on purpose; tuned ever since. The finished object was never the point — the finished feel is.',
  },
];
