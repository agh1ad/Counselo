import { getServicesForRegion, type Region } from "./region-services";
import { REGIONAL_SEO_REGISTRY } from "./regional-seo";

export const PUBLIC_BASE_URL = "https://counselo-legal.com";

export const PUBLIC_CACHE_POLICY = {
  immutableAsset: "public, max-age=31536000, immutable",
  crawlControl: "public, max-age=3600, must-revalidate",
  prerenderedHtml: "public, max-age=300, must-revalidate",
  // CMS-backed HTML, sitemaps, and feeds must never reuse a pre-publication
  // response. This also prevents an edge from retaining a transient 404 for a
  // newly published blog or work URL.
  dynamicHtml: "no-store",
  redirect: "public, max-age=86400",
  notFound: "no-store",
} as const;

export const PUBLIC_REGION_PREFIXES = REGIONAL_SEO_REGISTRY.flatMap((entry) => [
  entry.pathPrefix,
  `${entry.pathPrefix}/ar`,
]) as readonly string[];

const REGION_PREFIX_PATTERN = REGIONAL_SEO_REGISTRY.map((entry) => entry.region).join("|");

export const LEGACY_REDIRECTS = {
  regionalBlog: ["/sa/blog", "/syr/blog", "/uae/blog"],
  regionalArabicBlog: ["/ar/blog", "/sa/ar/blog", "/syr/ar/blog", "/uae/ar/blog"],
  regionalWork: ["/sa/our-work", "/syr/our-work", "/uae/our-work"],
  regionalArabicWork: ["/sa/ar/our-work", "/syr/ar/our-work", "/uae/ar/our-work"],
} as const;

export function routeToFlatFilename(route: string): string {
  return `${route.replace(/^\//, "").replace(/\//g, "-")}.html`;
}

export function toArabicRoute(route: string): string {
  const match = route.match(new RegExp(`^/(${REGION_PREFIX_PATTERN})(.*)$`));
  if (!match) return route;
  return `/${match[1]}/ar${match[2]}`;
}

/** The complete build-time inventory for the public renderer. */
export function getPublicRouteInventory(): string[] {
  const englishRoutes = REGIONAL_SEO_REGISTRY.flatMap(({ region, pathPrefix }) => [
    pathPrefix,
    `${pathPrefix}/services`,
    `${pathPrefix}/about`,
    `${pathPrefix}/vision`,
    `${pathPrefix}/contact`,
    `${pathPrefix}/terms-of-service`,
    `${pathPrefix}/privacy-policy`,
    ...getServicesForRegion(region as Region).map((service) => `${pathPrefix}/services/${service.slug}`),
  ]);
  return [
    "/",
    "/ar",
    ...englishRoutes,
    ...englishRoutes.map(toArabicRoute),
    "/blog",
    "/blog/ar",
    "/legal-library",
    "/ar/legal-library",
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

function normalizedComparableText(value: string | null | undefined): string {
  return (value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&(?:nbsp|amp|lt|gt|quot|#39);/gi, " ")
    .normalize("NFKC")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase("en");
}

function normalizedArticleText(
  body: string | null | undefined,
  sections: Array<{ body?: string | null }> | null | undefined,
): string {
  return normalizedComparableText([
    body ?? "",
    ...(sections ?? []).map((section) => section.body ?? ""),
  ].join(" "));
}

/**
 * Only complete, independently readable translations receive language URLs.
 * This deliberately excludes partial or automatically translated records.
 */
export function hasQualityBilingualBlogContent(post: BilingualBlogContent): boolean {
  const complete = [
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
  if (!complete) return false;

  const distinctMetadata = [
    [post.titleEn, post.titleAr],
    [post.excerptEn, post.excerptAr],
    [post.seoTitleEn, post.seoTitleAr],
    [post.seoDescriptionEn, post.seoDescriptionAr],
  ].every(([english, arabic]) =>
    normalizedComparableText(english) !== normalizedComparableText(arabic),
  );
  const englishArticle = normalizedArticleText(post.bodyEn, post.contentEn);
  const arabicArticle = normalizedArticleText(post.bodyAr, post.contentAr);
  const englishMetadata = normalizedComparableText([
    post.titleEn,
    post.excerptEn,
    post.seoTitleEn,
    post.seoDescriptionEn,
  ].join(" "));
  const arabicMetadata = normalizedComparableText([
    post.titleAr,
    post.excerptAr,
    post.seoTitleAr,
    post.seoDescriptionAr,
  ].join(" "));
  return distinctMetadata
    && englishArticle !== arabicArticle
    && /[a-z]/i.test(`${englishMetadata} ${englishArticle}`)
    && /[\u0600-\u06ff]/u.test(`${arabicMetadata} ${arabicArticle}`);
}

export function blogPath(slug: string, language: BlogLanguage = "en"): string {
  return `/blog/${language}/${slug}`;
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
      ...REGIONAL_SEO_REGISTRY.flatMap((entry) => [
        [entry.hreflang.en, entry.pathPrefix],
        [entry.hreflang.ar, `${entry.pathPrefix}/ar`],
      ]),
    ].map(([language, target]) => `${language}|${canonicalPublicUrl(target)}`);
  }
  const regionMatch = path.match(new RegExp(`^/(${REGION_PREFIX_PATTERN})(/ar)?(?=/|$)`));
  const currentRegion = regionMatch?.[1] as Region | undefined;
  if (currentRegion === "uae") {
    const basePath = path.replace(/^\/uae(\/ar)?/, "");
    const profile = REGIONAL_SEO_REGISTRY.find((entry) => entry.region === currentRegion)!;
    return [
      [profile.hreflang.en, `/uae${basePath}`],
      [profile.hreflang.ar, `/uae/ar${basePath}`],
      ["x-default", "/"],
    ].map(([language, target]) => `${language}|${canonicalPublicUrl(target)}`);
  }
  const basePath = path.replace(new RegExp(`^/(${REGION_PREFIX_PATTERN})(/ar)?`), "");
  const serviceSlug = path.match(/\/services\/([^/]+)/)?.[1];
  const eligibleRegions = serviceSlug
    ? REGIONAL_SEO_REGISTRY.filter((entry) => entry.serviceSlugs.includes(serviceSlug))
    : REGIONAL_SEO_REGISTRY.filter((entry) => entry.region === "sa" || entry.region === "syr");
  return [
    ...eligibleRegions.flatMap((entry) => [
      [entry.hreflang.en, `${entry.pathPrefix}${basePath}`],
      [entry.hreflang.ar, `${entry.pathPrefix}/ar${basePath}`],
    ]),
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
  language: "en" | "ar";
}): PublicHtmlMetadata {
  return {
    title: input.title,
    description: input.description,
    canonical: canonicalPublicUrl(blogPath(input.slug, input.language)),
    language: input.language,
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
  bilingual?: boolean;
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
    .replace(/\s*<url>\s*<loc>https:\/\/counselo-legal\.com\/blog\/([^<]+)<\/loc>[\s\S]*?<\/url>/g, (entry, suffix: string) => suffix === "ar" ? entry : "")
    .replace(/\s*<url>\s*<loc>https:\/\/counselo-legal\.com\/(?:ar\/)?our-work\/[^<]+<\/loc>[\s\S]*?<\/url>/g, "");
  const bilingualPosts = posts.filter((post) =>
    post.bilingual === true || hasQualityBilingualBlogContent(post),
  );
  const entries = bilingualPosts.flatMap((post) => {
    const modified = dateOnly(post.updatedAt) ?? post.date;
    const links = blogLanguageAlternates(post.slug);
    return [
      sitemapEntry(canonicalPublicUrl(blogPath(post.slug, "en")), modified, links),
      sitemapEntry(canonicalPublicUrl(blogPath(post.slug, "ar")), modified, links),
    ];
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
  const latestBlog = latestDate(bilingualPosts.map((post) => post.updatedAt ?? post.date));
  addIndexLastmod(canonicalPublicUrl("/blog"), latestBlog);
  addIndexLastmod(canonicalPublicUrl("/blog/ar"), latestBlog);
  const latestWork = latestDate(samples.map((sample) => sample.updatedAt ?? sample.date));
  const latestLibrary = latestDate([
    ...bilingualPosts.map((post) => post.updatedAt ?? post.date),
    ...samples.map((sample) => sample.updatedAt ?? sample.date),
  ]);
  addIndexLastmod(canonicalPublicUrl("/legal-library"), latestLibrary);
  addIndexLastmod(canonicalPublicUrl("/ar/legal-library"), latestLibrary);
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
    ...posts.filter((post) => post.bilingual === true || hasQualityBilingualBlogContent(post)).flatMap((post) => [
      { title: post.titleEn, description: post.excerptEn, url: canonicalPublicUrl(blogPath(post.slug, "en")), modified: post.updatedAt ?? post.date },
      { title: post.titleAr, description: post.excerptAr, url: canonicalPublicUrl(blogPath(post.slug, "ar")), modified: post.updatedAt ?? post.date },
    ]),
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
