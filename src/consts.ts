export const SITE_TITLE = 'Cameron Sjo';

// Terminal-prompt wordmark, matching the blog's `blog.` Trivially changeable.
export const SITE_WORDMARK = 'cameron.';

export const SITE_DESCRIPTION =
  'Principal Software Engineer in AI security. I build things, then tune them until they sing.';

export const GITHUB_URL = 'https://github.com/cameronsjo';

/**
 * The "properties" index — every project site this root page links out to.
 * Single source for the landing list. Hrefs are ABSOLUTE root paths to
 * separate GitHub Pages deployments; they must NOT route through withBase().
 */
export interface Project {
  title: string;
  blurb: string;
  href: string;
}

export const PROJECTS: Project[] = [
  {
    title: 'Blog',
    blurb:
      'Notes on software, AI security, and tuning systems until they sing.',
    href: '/blog',
  },
  {
    title: 'Agentic Harnesses',
    blurb:
      'Source-grounded comparison of four agentic coding harnesses (Claude Code, OpenCode, pi, code_puppy) with an interactive loop visualizer.',
    href: '/agentic-harnesses',
  },
  {
    title: 'Spec-Driven Development Tools',
    blurb:
      'Research-grounded comparison of eleven spec-driven-development tools — workflows stepped in lockstep, a feature matrix, and a use-case scoring heatmap.',
    href: '/spec-compare',
  },
];
