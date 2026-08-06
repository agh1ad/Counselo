import { escapeXml, buildWorkHreflangHtmlTags } from "./hreflang.js";
import { BASE_URL } from "./routes.js";

const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;
const SITE_NAME = "CounselO";

export function safeJson(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeDescription(primary: string, fallback: string): string {
  const primaryTrimmed = (primary || "").trim();
  const fallbackTrimmed = (fallback || "").trim();

  const combined = primaryTrimmed.length >= 80
    ? primaryTrimmed
    : `${primaryTrimmed} ${fallbackTrimmed}`.trim();
  if (combined.length <= 170) return combined;
  return `${combined.slice(0, 167).replace(/\s+\S*$/, "").trimEnd()}…`;
}

export interface BlogPostMetaInput {
  slug: string;
  date: string;
  updatedAt?: string | null;
  titleEn?: string;
  titleAr?: string;
  seoTitleEn?: string;
  seoTitleAr?: string;
  seoDescriptionEn?: string;
  seoDescriptionAr?: string;
  excerptEn?: string;
  excerptAr?: string;
  bodyEn?: string;
  bodyAr?: string;
}

export function buildBlogHeadTags(post: BlogPostMetaInput): string {
  const isArabicPost = Boolean(post.titleAr?.trim() && !post.titleEn?.trim());

  const seoTitle = post.seoTitleEn || post.titleEn || post.seoTitleAr || post.titleAr || SITE_NAME;
  const brandedTitle = /(?:CounselO|كاونسلو)$/i.test(seoTitle)
    ? seoTitle
    : `${seoTitle} | ${isArabicPost ? "كاونسلو" : "CounselO"}`;

  const primaryDesc = normalizeDescription(
    post.seoDescriptionEn || post.seoDescriptionAr || "",
    post.excerptEn || post.excerptAr || stripHtml(post.bodyEn || post.bodyAr || "Online legal guidance from CounselO."),
  );

  const canonical = `${BASE_URL}/blog/${post.slug}`;

  const articleSchema = safeJson({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: seoTitle,
    description: primaryDesc,
    inLanguage: isArabicPost ? "ar" : "en",
    datePublished: post.date,
    dateModified: post.updatedAt ?? post.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    author: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "CounselO",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "CounselO",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
  });

  const breadcrumbSchema = safeJson({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${BASE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${BASE_URL}/blog`,
      },
      { "@type": "ListItem", position: 3, name: seoTitle, item: canonical },
    ],
  });

  return [
    `<title data-rh="true">${escapeXml(brandedTitle)}</title>`,
    `<meta data-rh="true" name="description" content="${escapeXml(primaryDesc)}">`,
    `<meta data-rh="true" name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">`,
    `<link data-rh="true" rel="canonical" href="${escapeXml(canonical)}">`,
    `<meta data-rh="true" property="og:type" content="article">`,
    `<meta data-rh="true" property="og:title" content="${escapeXml(seoTitle)}">`,
    `<meta data-rh="true" property="og:description" content="${escapeXml(primaryDesc)}">`,
    `<meta data-rh="true" property="og:url" content="${escapeXml(canonical)}">`,
    `<meta data-rh="true" property="og:image" content="${DEFAULT_OG_IMAGE}">`,
    `<meta data-rh="true" name="twitter:card" content="summary_large_image">`,
    `<meta data-rh="true" name="twitter:title" content="${escapeXml(seoTitle)}">`,
    `<meta data-rh="true" name="twitter:description" content="${escapeXml(primaryDesc)}">`,
    `<script data-rh="true" type="application/ld+json">${articleSchema}</script>`,
    `<script data-rh="true" type="application/ld+json">${breadcrumbSchema}</script>`,
    `<script>window.__SSR_POST__=${safeJson(post)};</script>`,
  ].join("\n");
}

export interface WorkSampleMetaInput {
  slug: string;
  date: string;
  updatedAt?: string | null;
  titleEn?: string;
  titleAr?: string;
  seoTitleEn?: string;
  seoTitleAr?: string;
  seoDescriptionEn?: string;
  seoDescriptionAr?: string;
  summaryEn?: string;
  summaryAr?: string;
  workTypeEn?: string;
  workTypeAr?: string;
  jurisdictionEn?: string;
  jurisdictionAr?: string;
  fileMimeType?: string;
}

export function buildWorkHeadTags(
  sample: WorkSampleMetaInput,
  language: "en" | "ar",
): string {
  const isArabic = language === "ar";

  const title =
    (isArabic
      ? sample.seoTitleAr || sample.titleAr
      : sample.seoTitleEn || sample.titleEn) ||
    sample.titleAr ||
    sample.titleEn ||
    SITE_NAME;

  const description = normalizeDescription(
    (isArabic
      ? sample.seoDescriptionAr || sample.summaryAr
      : sample.seoDescriptionEn || sample.summaryEn) ||
      sample.summaryAr ||
      sample.summaryEn ||
      "",
    sample.summaryEn || sample.summaryAr || "",
  );

  const basePath = isArabic ? "/ar/our-work" : "/our-work";
  const canonical = `${BASE_URL}${basePath}/${sample.slug}`;
  const englishUrl = `${BASE_URL}/our-work/${sample.slug}`;
  const arabicUrl = `${BASE_URL}/ar/our-work/${sample.slug}`;
  const fileUrl = `${BASE_URL}/api/work/${sample.slug}/file`;

  const hreflangTags = buildWorkHreflangHtmlTags(
    sample.titleEn || "",
    sample.titleAr || "",
    englishUrl,
    arabicUrl,
    canonical,
  );

  const workSchema = safeJson({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    url: canonical,
    dateCreated: sample.date,
    dateModified: sample.updatedAt ?? sample.date,
    inLanguage: language,
    genre: sample.workTypeEn || sample.workTypeAr,
    contentLocation: sample.jurisdictionEn || sample.jurisdictionAr,
    creator: {
      "@type": "LegalService",
      "@id": `${BASE_URL}/#organization`,
      name: "CounselO",
      url: BASE_URL,
    },
    encoding: {
      "@type": "MediaObject",
      contentUrl: fileUrl,
      encodingFormat: sample.fileMimeType || "application/pdf",
    },
  });

  const breadcrumbSchema = safeJson({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isArabic ? "الرئيسية" : "Home",
        item: `${BASE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isArabic ? "أعمالنا" : "Our Work",
        item: `${BASE_URL}${basePath}`,
      },
      { "@type": "ListItem", position: 3, name: title, item: canonical },
    ],
  });

  return [
    `<title data-rh="true">${escapeXml(title)}</title>`,
    `<meta data-rh="true" name="description" content="${escapeXml(description.slice(0, 170))}">`,
    `<meta data-rh="true" name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">`,
    `<link data-rh="true" rel="canonical" href="${escapeXml(canonical)}">`,
    hreflangTags,
    `<meta data-rh="true" property="og:type" content="article">`,
    `<meta data-rh="true" property="og:title" content="${escapeXml(title)}">`,
    `<meta data-rh="true" property="og:description" content="${escapeXml(description.slice(0, 170))}">`,
    `<meta data-rh="true" property="og:url" content="${escapeXml(canonical)}">`,
    `<meta data-rh="true" property="og:image" content="${DEFAULT_OG_IMAGE}">`,
    `<script data-rh="true" type="application/ld+json">${workSchema}</script>`,
    `<script data-rh="true" type="application/ld+json">${breadcrumbSchema}</script>`,
    `<script>window.__SSR_WORK__=${safeJson(sample)};</script>`,
  ].join("\n");
}
