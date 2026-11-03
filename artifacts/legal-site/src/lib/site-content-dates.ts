// Editorial revisions, not build dates. Keep older dates for content that was
// not revised, including CMS articles/work and policy pages.
export const SITE_REFRESH_DATE = "2026-11-03";

export function latestPageUpdate(path: string, previous?: string): string | undefined {
  const pathname = path.startsWith("http") ? new URL(path).pathname : path;
  const revised = /^(?:\/(?:ar)?|\/(?:sa|syr|uae)(?:\/ar)?(?:\/(?:about|contact|services)(?:\/.*)?)?|\/(?:ar\/)?legal-library)$/.test(pathname || "/");
  return revised ? [previous ?? "", SITE_REFRESH_DATE].sort().at(-1) : previous;
}
