// Editorial revisions, not build dates. Keep older dates for content that was
// not revised, including CMS articles/work and policy pages.
export const SITE_REFRESH_DATE = "2026-11-03";
const CREDIBILITY_REFRESH_DATE = "2026-11-12";

export function latestPageUpdate(path: string, previous?: string): string | undefined {
  const pathname = path.startsWith("http") ? new URL(path).pathname : path;
  if (/^(?:\/(?:ar\/)?|\/(?:sa|syr|uae)(?:\/ar)?\/services\/)urgent-legal-assistance$/.test(pathname)) {
    return [previous ?? "", "2026-11-13"].sort().at(-1);
  }
  if (/^(?:\/|\/ar|\/(?:sa|syr|uae)(?:\/ar)?(?:\/(?:about|contact|services))?|\/(?:ar\/)?our-work|\/blog(?:\/ar)?)$/.test(pathname)) {
    return [previous ?? "", "2026-11-13"].sort().at(-1);
  }
  // Only these page bodies changed in this revision. CMS dates remain intact.
  if (/^(?:\/|\/ar|\/(?:sa|syr|uae)(?:\/ar)?(?:\/(?:about|contact))?|\/(?:ar\/)?our-work)$/.test(pathname)) {
    return [previous ?? "", CREDIBILITY_REFRESH_DATE].sort().at(-1);
  }
  const revised = /^(?:\/(?:ar)?|\/(?:sa|syr|uae)(?:\/ar)?(?:\/(?:about|contact|services)(?:\/.*)?)?|\/(?:ar\/)?legal-library)$/.test(pathname || "/");
  return revised ? [previous ?? "", SITE_REFRESH_DATE].sort().at(-1) : previous;
}
