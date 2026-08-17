export const BASE_URL = "https://counselo-legal.com";
export const TODAY = new Date().toISOString().slice(0, 10);

type CorePage = {
  path: string;
  changefreq: string;
  priority: string;
  isRoot?: boolean;
};

const CORE_PAGES_EN: CorePage[] = [
  { path: "", changefreq: "weekly", priority: "1.0", isRoot: true },
  { path: "/sa", changefreq: "weekly", priority: "0.95" },
  { path: "/sa/services", changefreq: "monthly", priority: "0.9" },
  { path: "/sa/contact", changefreq: "monthly", priority: "0.9" },
  { path: "/sa/about", changefreq: "monthly", priority: "0.8" },
  { path: "/sa/vision", changefreq: "monthly", priority: "0.8" },
  { path: "/sa/terms-of-service", changefreq: "yearly", priority: "0.4" },
  { path: "/sa/privacy-policy", changefreq: "yearly", priority: "0.4" },
  { path: "/syr", changefreq: "weekly", priority: "0.95" },
  { path: "/syr/services", changefreq: "monthly", priority: "0.9" },
  { path: "/syr/contact", changefreq: "monthly", priority: "0.9" },
  { path: "/syr/about", changefreq: "monthly", priority: "0.8" },
  { path: "/syr/vision", changefreq: "monthly", priority: "0.8" },
  { path: "/syr/terms-of-service", changefreq: "yearly", priority: "0.4" },
  { path: "/syr/privacy-policy", changefreq: "yearly", priority: "0.4" },
  { path: "/uae", changefreq: "weekly", priority: "0.95" },
  { path: "/uae/services", changefreq: "monthly", priority: "0.9" },
  { path: "/uae/contact", changefreq: "monthly", priority: "0.9" },
  { path: "/uae/about", changefreq: "monthly", priority: "0.8" },
  { path: "/uae/vision", changefreq: "monthly", priority: "0.8" },
  { path: "/uae/terms-of-service", changefreq: "yearly", priority: "0.4" },
  { path: "/uae/privacy-policy", changefreq: "yearly", priority: "0.4" },
] as const;

/**
 * The blog index remains region-agnostic at /blog. Individual posts use
 * /blog/en/:slug and /blog/ar/:slug only after both versions meet the bilingual quality gate;
 * eligible posts use reciprocal /blog/en/:slug and /blog/ar/:slug URLs.
 */
export const BLOG_BASE_PATH = "/blog";
export const LEGAL_LIBRARY_BASE_PATH = "/legal-library";
export const WORK_BASE_PATH = "/our-work";

// Arabic is a real URL segment (e.g. "/sa/ar/about"), not a client-only
// toggle — every English core page gets a matching "/ar" sitemap entry so
// Arabic content is indexed as its own distinct, crawlable URL.
export const CORE_PAGES = [
  ...CORE_PAGES_EN,
  ...CORE_PAGES_EN.filter((p) => !p.isRoot).map((p) => ({
    ...p,
    path: p.path.replace(/^\/(sa|syr|uae)/, "/$1/ar"),
  })),
] as const;
