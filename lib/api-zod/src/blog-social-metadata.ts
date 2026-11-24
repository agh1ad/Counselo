import { COUNSELO_ABOUT_PATHS, COUNSELO_BRAND } from "./brand";

export const BLOG_SOCIAL_IMAGE = {
  url: "https://counselo-legal.com/og-image.png",
  secureUrl: "https://counselo-legal.com/og-image.png",
  type: "image/png",
  width: 1200,
  height: 630,
} as const;

export const BLOG_REVIEWER_ATTRIBUTION = {
  en: "Lawyer and Legal Counsel Omar Al-Baghdadi",
  ar: "المحامي والمستشار القانوني عمر البغدادي",
} as const;

function escapeMeta(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function buildBlogSocialMetaTags(input: {
  title: string;
  description: string;
  canonical: string;
  language: "en" | "ar";
  authorUrl?: string;
  reviewerName?: string;
}): string {
  const title = escapeMeta(input.title);
  const description = escapeMeta(input.description);
  const canonical = escapeMeta(input.canonical);
  const articleAuthor = escapeMeta(input.authorUrl ?? `https://counselo-legal.com${COUNSELO_ABOUT_PATHS[input.language]}`);
  const siteName = input.language === "ar" ? COUNSELO_BRAND.designationAr : COUNSELO_BRAND.en;
  const reviewerName = input.reviewerName ? escapeMeta(input.reviewerName) : undefined;
  const imageAlt = escapeMeta(!input.reviewerName ? input.title : input.language === "ar"
    ? `مقال قانوني من كاونسلو للاستشارات القانونية، راجعه ${input.reviewerName}`
    : `CounselO Legal article reviewed by ${input.reviewerName}`);

  return [
    `<meta property="og:type" content="article">`,
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${description}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:site_name" content="${siteName}">`,
    `<meta property="og:locale" content="${input.language === "ar" ? "ar_SA" : "en_US"}">`,
    `<meta property="og:image" content="${BLOG_SOCIAL_IMAGE.url}">`,
    `<meta property="og:image:secure_url" content="${BLOG_SOCIAL_IMAGE.secureUrl}">`,
    `<meta property="og:image:type" content="${BLOG_SOCIAL_IMAGE.type}">`,
    `<meta property="og:image:width" content="${BLOG_SOCIAL_IMAGE.width}">`,
    `<meta property="og:image:height" content="${BLOG_SOCIAL_IMAGE.height}">`,
    `<meta property="og:image:alt" content="${imageAlt}">`,
    `<meta property="article:author" content="${articleAuthor}">`,
    ...(reviewerName ? [`<meta name="reviewed-by" content="${reviewerName}">`] : []),
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${title}">`,
    `<meta name="twitter:description" content="${description}">`,
    `<meta name="twitter:image" content="${BLOG_SOCIAL_IMAGE.url}">`,
    `<meta name="twitter:image:alt" content="${imageAlt}">`,
  ].join("\n    ");
}
