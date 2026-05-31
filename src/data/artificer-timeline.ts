/**
 * Artificer — the dated evolution timeline.
 *
 * Dates are EVIDENCE-BACKED, not guessed:
 *  - persona prompts: frontmatter `created:` (2025)
 *  - claude.ai/design launch: Apr 17, 2026 (announced)
 *  - v0.1 birth: the claude.ai/design *session message timestamps* — the design
 *    session opened Apr 22, 2026 (23:23Z); the entire core spec minted in one
 *    build run Apr 26 (14:36:54Z); repo scaffolded that same day
 *  - themes + palette lock (May 5–6): session timestamps (theme build, the
 *    brick/terracotta destructive A/B, the warm-bone white softening)
 *  - sister theme + ANSI fix (May 9–11): session timestamps + bundle mtimes
 *  - v0.7 → v0.10.1: canonical repo git log (commit dates)
 *
 * The point of the dates: show how fast — and how burstily — it materialized.
 * A complete, multi-surface, distributed system went from a blank design session
 * to v0.10.1 in ~40 days, with same-day version flurries inside that.
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
    date: 'Apr 22–26, 2026',
    phase: 'Scaffolded',
    title: 'The whole spec, in one sitting',
    body: 'The design session opened on Apr 22 — five days after claude.ai/design launched. A round of discovery questions, three aesthetic directions, then the build: on Apr 26 the entire core spec — tokens, components, forms, motion, accessibility, voice — minted in a single run, and became a repo that same day.',
  },
  {
    version: 'v0.x',
    date: 'May 5, 2026',
    phase: 'An ecosystem',
    title: 'One palette, every surface',
    body: 'Artificer stopped being a web stylesheet and became a multi-surface theme — Claude Code, Ghostty, and VS Code, all generated from one palette, dogfooding the terminal it descends from. Even pure white got backed off to a warm bone so long sessions read as ink-on-paper, not laser-etched chrome.',
  },
  {
    version: 'v0.6.0',
    date: 'May 6, 2026',
    phase: 'The lock',
    title: 'The palette stops moving',
    body: 'After a hard A/B the colours were chosen and frozen: deep purple, gold, champagne; apothecary green for success and brick for destructive — siblings in weight, never one loud and one quiet. The single hardest decision in the system, settled in an evening.',
  },
  {
    version: 'v0.6.1–0.6.4',
    date: 'May 9–11, 2026',
    phase: 'A sister theme',
    title: 'Three releases in twenty-five minutes',
    body: 'An ANSI ordering bug got caught and fixed, Obsidian split off as a hand-authored sister theme, and the lane model was born to keep the surfaces coherent. One May morning Obsidian went 0.6.1 → 0.6.2 → 0.6.3 in twenty-five minutes — the cadence this thing actually moves at.',
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
    date: 'May 29–30, 2026',
    phase: 'The exception',
    title: 'Whimsy — the one place the rules relax',
    body: 'A burnished, flowing rainbow for genuine delight — inspired by the ultrathink shimmer in Claude Code, then bounded hard: never on chrome, status, data, or errors, one per view. Built over one late night, it is the mark at the top of this page — the system using its own exception.',
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
    date: '~40 days in',
    phase: 'Used, then tuned',
    title: 'A blank session to v0.10.1 in six weeks',
    body: 'The design session opened Apr 22, the repo followed on Apr 26, and ten versions landed by the end of May — with three sites now running on it and feeding gaps back upstream. Built fast and on purpose; tuned ever since. The finished object was never the point — the finished feel is.',
  },
];
