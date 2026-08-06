export const BASE_URL = "https://counselo-legal.com";

export interface CorePageSpec {
  path: string;
  changefreq: string;
  priority: string;
  isRoot?: boolean;
}

export const CORE_PAGES_EN: CorePageSpec[] = [
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
];

export const BLOG_BASE_PATH = "/blog";
export const WORK_BASE_PATH = "/our-work";
export const ARABIC_WORK_BASE_PATH = "/ar/our-work";

export const CORE_PAGES: CorePageSpec[] = [
  ...CORE_PAGES_EN,
  ...CORE_PAGES_EN.filter((p) => !p.isRoot).map((p) => ({
    ...p,
    path: p.path.replace(/^\/(sa|syr|uae)/, "/$1/ar"),
  })),
];

export const SYRIA_ONLY_SERVICE_SLUGS = new Set([
  "civil-law",
  "civil-procedure",
  "criminal-procedure",
]);

export const SYRIA_SLUG_OVERRIDES: Record<string, string> = {
  "board-of-grievances-saudi-arabia": "administrative-court-disputes-syria",
  "child-custody-saudi-arabia": "child-custody-syria",
  "divorce-in-saudi-arabia": "divorce-in-syria",
  "foreign-company-registration-saudi-arabia":
    "foreign-company-registration-syria",
  "real-estate-disputes-saudi-arabia": "real-estate-disputes-syria",
  "wrongful-termination-saudi-labor-law":
    "wrongful-termination-syrian-labor-law",
};
