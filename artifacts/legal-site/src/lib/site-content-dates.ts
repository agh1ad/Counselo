import { ABDULLAH_PROFILE_PATHS, BAGHDADI_LAW_PROFILE_PATHS, COUNSELO_ABOUT_PATHS, OMAR_ABDULLAH_PROFILE_PATHS, UAE_SYRIA_CONSULTATION_PATHS } from "@workspace/api-zod/browser";

// Editorial revisions, not build dates. Keep older dates for content that was
// not revised, including CMS articles/work and policy pages.
export const SITE_REFRESH_DATE = "2026-11-03";
export const BRAND_PROFILE_UPDATED = "2026-11-26";
const CREDIBILITY_REFRESH_DATE = "2026-11-12";
const brandAndConsultationPages = new Set([
  "/", "/ar", ...Object.values(COUNSELO_ABOUT_PATHS), ...Object.values(UAE_SYRIA_CONSULTATION_PATHS),
  "/sa/about", "/sa/ar/about", ...Object.values(ABDULLAH_PROFILE_PATHS),
  "/uae/about", "/uae/ar/about", "/syr/about", "/syr/ar/about", ...Object.values(OMAR_ABDULLAH_PROFILE_PATHS),
  ...Object.values(BAGHDADI_LAW_PROFILE_PATHS),
  "/uae/contact", "/uae/ar/contact", "/syr/contact", "/syr/ar/contact",
]);

export function latestPageUpdate(path: string, previous?: string): string | undefined {
  const pathname = path.startsWith("http") ? new URL(path).pathname : path || "/";
  if (brandAndConsultationPages.has(pathname)) return [previous ?? "", BRAND_PROFILE_UPDATED].sort().at(-1);
  const entityContentUpdated = /^(?:\/(?:sa|syr|uae)(?:\/ar)?(?:\/about)?|\/sa(?:\/ar)?\/services\/contracts\/contract-drafting-and-review)$/.test(pathname);
  if (entityContentUpdated) return [previous ?? "", "2026-11-24"].sort().at(-1);
  // Team positioning and portfolio presentation revised these owned pages, not CMS publications.
  if (/^(?:\/|\/ar|\/(?:sa|syr|uae)(?:\/ar)?(?:\/(?:about|contact|terms-of-service|privacy-policy|services)(?:\/.*)?)?|\/(?:ar\/)?(?:urgent-legal-assistance|our-work))$/.test(pathname)) {
    return [previous ?? "", "2026-11-18"].sort().at(-1);
  }
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
