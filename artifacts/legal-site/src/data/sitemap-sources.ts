export const BASE_URL = "https://counselo-legal.com";
export const TODAY = new Date().toISOString().slice(0, 10);

export const CORE_PAGES = [
  { path: "", changefreq: "weekly", priority: "1.0", isRoot: true },
  { path: "/sa", changefreq: "weekly", priority: "0.95" },
  { path: "/sa/services", changefreq: "monthly", priority: "0.9" },
  { path: "/sa/contact", changefreq: "monthly", priority: "0.9" },
  { path: "/sa/about", changefreq: "monthly", priority: "0.8" },
  { path: "/sa/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/sa/terms-of-service", changefreq: "yearly", priority: "0.4" },
  { path: "/sa/privacy-policy", changefreq: "yearly", priority: "0.4" },
  { path: "/syr", changefreq: "weekly", priority: "0.95" },
  { path: "/syr/services", changefreq: "monthly", priority: "0.9" },
  { path: "/syr/contact", changefreq: "monthly", priority: "0.9" },
  { path: "/syr/about", changefreq: "monthly", priority: "0.8" },
  { path: "/syr/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/syr/terms-of-service", changefreq: "yearly", priority: "0.4" },
  { path: "/syr/privacy-policy", changefreq: "yearly", priority: "0.4" },
] as const;
