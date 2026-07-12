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
  { path: "/sa/terms-of-service", changefreq: "yearly", priority: "0.4" },
  { path: "/sa/privacy-policy", changefreq: "yearly", priority: "0.4" },
  { path: "/syr", changefreq: "weekly", priority: "0.95" },
  { path: "/syr/services", changefreq: "monthly", priority: "0.9" },
  { path: "/syr/contact", changefreq: "monthly", priority: "0.9" },
  { path: "/syr/about", changefreq: "monthly", priority: "0.8" },
  { path: "/syr/terms-of-service", changefreq: "yearly", priority: "0.4" },
  { path: "/syr/privacy-policy", changefreq: "yearly", priority: "0.4" },
] as const;

/**
 * The blog lives at a single, region-agnostic URL /blog (and /blog/:slug).
 * Listed separately so the sitemap emits it with x-default-only hreflang,
 * not with region-prefixed alternates that would redirect.
 */
export const BLOG_BASE_PATH = "/blog";

// Arabic is a real URL segment (e.g. "/sa/ar/about"), not a client-only
// toggle — every English core page gets a matching "/ar" sitemap entry so
// Arabic content is indexed as its own distinct, crawlable URL.
export const CORE_PAGES = [
  ...CORE_PAGES_EN,
  ...CORE_PAGES_EN.filter((p) => !p.isRoot).map((p) => ({
    ...p,
    path: p.path.replace(/^\/(sa|syr)/, "/$1/ar"),
  })),
] as const;
