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
      'Four agentic coding harnesses compared, with an interactive loop visualizer.',
    href: '/agentic-harnesses',
  },
  {
    title: 'Spec-Driven Development Tools',
    blurb:
      'Eleven spec-driven tools compared — feature matrix and use-case heatmap.',
    href: '/spec-compare',
  },
  {
    title: 'Understanding Claude Code',
    blurb:
      'Claude Code, concept by concept — forks, subagents, and the ideas that catch people.',
    href: '/understanding-claude-code',
  },
  {
    // A separate project Pages site (cameronsjo/artificer) mounted at
    // /artificer/ — it owns this path and shadows any in-site route here.
    title: 'Artificer Design System',
    blurb:
      'The dark-first design system these sites are built on — intent, components, and how it grew.',
    href: '/artificer/',
  },
];
