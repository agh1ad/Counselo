import { getServicesForRegion } from "./region-services";

export const PUBLIC_BASE_URL = "https://counselo-legal.com";

export const PUBLIC_CACHE_POLICY = {
  immutableAsset: "public, max-age=31536000, immutable",
  crawlControl: "public, max-age=3600, must-revalidate",
  prerenderedHtml: "public, max-age=0, must-revalidate",
  dynamicHtml: "public, max-age=300, must-revalidate",
  redirect: "public, max-age=86400",
  notFound: "no-store",
} as const;

export const PUBLIC_REGION_PREFIXES = [
  "/sa",
  "/sa/ar",
  "/syr",
  "/syr/ar",
  "/uae",
  "/uae/ar",
] as const;

export const LEGACY_REDIRECTS = {
  regionalBlog: ["/sa/blog", "/syr/blog", "/sa/ar/blog", "/syr/ar/blog"],
  regionalWork: ["/sa/our-work", "/syr/our-work"],
  regionalArabicWork: ["/sa/ar/our-work", "/syr/ar/our-work"],
} as const;

export function routeToFlatFilename(route: string): string {
  return `${route.replace(/^\//, "").replace(/\//g, "-")}.html`;
}

export function toArabicRoute(route: string): string {
  const match = route.match(/^\/(sa|syr|uae)(.*)$/);
  if (!match) return route;
  return `/${match[1]}/ar${match[2]}`;
}

/** The complete build-time inventory for the public renderer. */
export function getPublicRouteInventory(): string[] {
  const serviceRoutes = (region: "sa" | "syr" | "uae") =>
    getServicesForRegion(region).map((service) => `/${region}/services/${service.slug}`);
  const englishRoutes = [
    "/sa",
    "/sa/services",
    "/sa/about",
    "/sa/vision",
    "/sa/contact",
    "/sa/terms-of-service",
    "/sa/privacy-policy",
    "/syr",
    "/syr/services",
    "/syr/about",
    "/syr/vision",
    "/syr/contact",
    "/syr/terms-of-service",
    "/syr/privacy-policy",
    ...serviceRoutes("sa"),
    ...serviceRoutes("syr"),
    "/uae",
    "/uae/services",
    "/uae/about",
    "/uae/vision",
    "/uae/contact",
    "/uae/terms-of-service",
    "/uae/privacy-policy",
    ...serviceRoutes("uae"),
  ];
  return [
    "/",
    "/ar",
    ...englishRoutes,
    ...englishRoutes.map(toArabicRoute),
    "/blog",
    "/our-work",
    "/ar/our-work",
  ];
}

export function canonicalPublicUrl(path: string): string {
  return `${PUBLIC_BASE_URL}${path === "/" ? "/" : path}`;
}

export type BlogLanguage = "en" | "ar";

export type BilingualBlogContent = {
  titleEn?: string | null;
  titleAr?: string | null;
  excerptEn?: string | null;
  excerptAr?: string | null;
  seoTitleEn?: string | null;
  seoTitleAr?: string | null;
  seoDescriptionEn?: string | null;
  seoDescriptionAr?: string | null;
  bodyEn?: string | null;
  bodyAr?: string | null;
  contentEn?: Array<{ body?: string | null }> | null;
  contentAr?: Array<{ body?: string | null }> | null;
};

function hasWrittenContent(body: string | null | undefined, sections: Array<{ body?: string | null }> | null | undefined): boolean {
  return Boolean(body?.trim() || sections?.some((section) => section.body?.trim()));
}

/**
 * Only complete, independently readable translations receive language URLs.
 * This deliberately excludes partial or automatically translated records.
 */
export function hasQualityBilingualBlogContent(post: BilingualBlogContent): boolean {
  return [
    post.titleEn,
    post.titleAr,
    post.excerptEn,
    post.excerptAr,
    post.seoTitleEn,
    post.seoTitleAr,
    post.seoDescriptionEn,
    post.seoDescriptionAr,
  ].every((value) => Boolean(value?.trim()))
    && hasWrittenContent(post.bodyEn, post.contentEn)
    && hasWrittenContent(post.bodyAr, post.contentAr);
}

export function blogPath(slug: string, language?: BlogLanguage): string {
  return language ? `/blog/${language}/${slug}` : `/blog/${slug}`;
}

export function blogLanguageAlternates(slug: string): Array<[string, string]> {
  return [
    ["en", canonicalPublicUrl(blogPath(slug, "en"))],
    ["ar", canonicalPublicUrl(blogPath(slug, "ar"))],
    ["x-default", canonicalPublicUrl(blogPath(slug, "en"))],
  ];
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function dateOnly(value: string | Date | null | undefined): string | undefined {
  if (!value) return undefined;
  return value instanceof Date ? value.toISOString().slice(0, 10) : value.slice(0, 10);
}

function latestDate(values: Array<string | Date | null | undefined>): string | undefined {
  return values.map(dateOnly).filter((value): value is string => Boolean(value)).sort().at(-1);
}

export function buildHreflangLinks(path: string): string[] {
  if (path === "/") {
    return [
      ["x-default", "/"],
      ["en-SA", "/sa"],
      ["ar-SA", "/sa/ar"],
      ["en-SY", "/syr"],
      ["ar-SY", "/syr/ar"],
      ["en-AE", "/uae"],
      ["ar-AE", "/uae/ar"],
    ].map(([language, target]) => `${language}|${canonicalPublicUrl(target)}`);
  }
  if (path.startsWith("/uae")) {
    const basePath = path.replace(/^\/uae(\/ar)?/, "");
    return [
      ["en-AE", `/uae${basePath}`],
      ["ar-AE", `/uae/ar${basePath}`],
      ["x-default", "/"],
    ].map(([language, target]) => `${language}|${canonicalPublicUrl(target)}`);
  }
  const basePath = path.replace(/^\/(sa|syr)(\/ar)?/, "");
  return [
    ["en-SA", `/sa${basePath}`],
    ["ar-SA", `/sa/ar${basePath}`],
    ["en-SY", `/syr${basePath}`],
    ["ar-SY", `/syr/ar${basePath}`],
    ["x-default", "/"],
  ].map(([language, target]) => `${language}|${canonicalPublicUrl(target)}`);
}

export type PublicHtmlMetadata = {
  title: string;
  description: string;
  canonical: string;
  language: "en" | "ar";
};

export function buildBlogHtmlMetadata(input: {
  slug: string;
  title: string;
  description: string;
  language?: "en" | "ar";
}): PublicHtmlMetadata {
  return {
    title: input.title,
    description: input.description,
    canonical: canonicalPublicUrl(blogPath(input.slug, input.language)),
    language: input.language ?? "en",
  };
}

export function buildWorkHtmlMetadata(input: {
  slug: string;
  title: string;
  description: string;
  language: "en" | "ar";
}): PublicHtmlMetadata {
  const basePath = input.language === "ar" ? "/ar/our-work" : "/our-work";
  return {
    title: input.title,
    description: input.description,
    canonical: canonicalPublicUrl(`${basePath}/${input.slug}`),
    language: input.language,
  };
}

export type DiscoveryPost = {
  slug: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  date: string;
  updatedAt?: string | Date | null;
  seoTitleEn?: string | null;
  seoTitleAr?: string | null;
  seoDescriptionEn?: string | null;
  seoDescriptionAr?: string | null;
  bodyEn?: string | null;
  bodyAr?: string | null;
  contentEn?: Array<{ body?: string | null }> | null;
  contentAr?: Array<{ body?: string | null }> | null;
};

export type DiscoveryWorkSample = {
  slug: string;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  date: string;
  updatedAt?: string | Date | null;
};

function sitemapEntry(url: string, lastmod: string, links: Array<[string, string]>): string {
  return `  <url>\n    <loc>${escapeXml(url)}</loc>\n${links
    .map(([language, target]) => `    <xhtml:link rel="alternate" hreflang="${language}" href="${target}"/>`)
    .join("\n")}\n    <changefreq>monthly</changefreq>\n    <priority>0.75</priority>\n    <lastmod>${escapeXml(lastmod)}</lastmod>\n  </url>`;
}

export function buildDynamicSitemap(
  baseXml: string,
  posts: DiscoveryPost[],
  samples: DiscoveryWorkSample[],
): string {
  let xml = baseXml
    .replace(/\s*<url>\s*<loc>https:\/\/counselo-legal\.com\/blog\/[^<]+<\/loc>[\s\S]*?<\/url>/g, "")
    .replace(/\s*<url>\s*<loc>https:\/\/counselo-legal\.com\/(?:ar\/)?our-work\/[^<]+<\/loc>[\s\S]*?<\/url>/g, "");
  const entries = posts.flatMap((post) => {
    const modified = dateOnly(post.updatedAt) ?? post.date;
    if (hasQualityBilingualBlogContent(post)) {
      const links = blogLanguageAlternates(post.slug);
      return [
        sitemapEntry(canonicalPublicUrl(blogPath(post.slug, "en")), modified, links),
        sitemapEntry(canonicalPublicUrl(blogPath(post.slug, "ar")), modified, links),
      ];
    }
    const path = blogPath(post.slug);
    return [sitemapEntry(canonicalPublicUrl(path), modified, [["x-default", canonicalPublicUrl(path)] as [string, string]])];
  });
  const workEntries = samples.flatMap((sample) => {
    const modified = dateOnly(sample.updatedAt) ?? sample.date;
    const enPath = `/our-work/${sample.slug}`;
    const arPath = `/ar/our-work/${sample.slug}`;
    if (!sample.titleEn) return [sitemapEntry(canonicalPublicUrl(arPath), modified, [["x-default", canonicalPublicUrl(arPath)] as [string, string]])];
    if (!sample.titleAr) return [sitemapEntry(canonicalPublicUrl(enPath), modified, [["x-default", canonicalPublicUrl(enPath)] as [string, string]])];
    const links: Array<[string, string]> = [["en", canonicalPublicUrl(enPath)], ["ar", canonicalPublicUrl(arPath)], ["x-default", canonicalPublicUrl(enPath)]];
    return [sitemapEntry(canonicalPublicUrl(enPath), modified, links), sitemapEntry(canonicalPublicUrl(arPath), modified, links)];
  });
  const addIndexLastmod = (url: string, date: string | undefined) => {
    if (date) xml = xml.replace(`<loc>${url}</loc>`, `<loc>${url}</loc>\n    <lastmod>${date}</lastmod>`);
  };
  const latestBlog = latestDate(posts.map((post) => post.updatedAt ?? post.date));
  addIndexLastmod(canonicalPublicUrl("/blog"), latestBlog);
  const latestWork = latestDate(samples.map((sample) => sample.updatedAt ?? sample.date));
  addIndexLastmod(canonicalPublicUrl("/our-work"), latestWork);
  addIndexLastmod(canonicalPublicUrl("/ar/our-work"), latestWork);
  const allEntries = [...entries, ...workEntries];
  return xml.replace("</urlset>", `${allEntries.length ? `\n${allEntries.join("\n")}\n` : ""}</urlset>`);
}

export function buildDiscoveryFeed(
  posts: DiscoveryPost[],
  samples: DiscoveryWorkSample[],
): string {
  const items = [
    ...posts.map((post) => ({ title: post.titleEn || post.titleAr, description: post.excerptEn || post.excerptAr, url: canonicalPublicUrl(blogPath(post.slug, hasQualityBilingualBlogContent(post) ? "en" : undefined)), modified: post.updatedAt ?? post.date })),
    ...samples.flatMap((sample) => [
      ...(sample.titleEn ? [{ title: sample.titleEn, description: sample.summaryEn, url: canonicalPublicUrl(`/our-work/${sample.slug}`), modified: sample.updatedAt ?? sample.date }] : []),
      ...(sample.titleAr ? [{ title: sample.titleAr, description: sample.summaryAr, url: canonicalPublicUrl(`/ar/our-work/${sample.slug}`), modified: sample.updatedAt ?? sample.date }] : []),
    ]),
  ].sort((a, b) => Date.parse(String(b.modified)) - Date.parse(String(a.modified))).slice(0, 50);
  const lastBuildDate = items[0]?.modified ? new Date(items[0].modified).toUTCString() : new Date(0).toUTCString();
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>CounselO Legal Articles and Work</title>\n    <link>${PUBLIC_BASE_URL}/</link>\n    <description>Recently published legal articles and redacted professional work from CounselO.</description>\n    <language>en</language>\n    <lastBuildDate>${escapeXml(lastBuildDate)}</lastBuildDate>\n${items.map((item) => `    <item>\n      <title>${escapeXml(item.title)}</title>\n      <link>${escapeXml(item.url)}</link>\n      <guid isPermaLink="true">${escapeXml(item.url)}</guid>\n      <description>${escapeXml(item.description)}</description>\n      <pubDate>${escapeXml(new Date(item.modified).toUTCString())}</pubDate>\n    </item>`).join("\n")}\n  </channel>\n</rss>`;
}

export function buildNotFoundHtml(shellHtml?: string, title = "Page Not Found | CounselO"): string {
  const head = `<title>${title}</title><meta name="robots" content="noindex, nofollow">`;
  if (shellHtml) return shellHtml.replace("<!--app-head-->", head);
  return `<!doctype html><html><head>${head}</head><body><h1>Page not found</h1></body></html>`;
}
