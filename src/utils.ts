/**
 * Prefix a path with the configured `base`, collapsing slashes. This root
 * site has NO `base`, so withBase() returns plain `/`-rooted paths — but it's
 * kept (rather than dropped) so the shell components stay identical to the
 * blog's and so adding a base later wouldn't silently break internal links.
 *
 * NOTE: links to the *other* project sites (/blog, /agentic-harnesses) are
 * separate deployments and are hardcoded as absolute root paths — they must
 * NOT pass through here.
 */
export function withBase(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\//, '');
  return clean ? `${base}/${clean}` : `${base}/`;
}
