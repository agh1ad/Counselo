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
  reviewerName: string;
}): string {
  const title = escapeMeta(input.title);
  const description = escapeMeta(input.description);
  const canonical = escapeMeta(input.canonical);
  const reviewerName = escapeMeta(input.reviewerName);
  const imageAlt = escapeMeta(input.language === "ar"
    ? `مقال قانوني من كاونسلو، راجعه ${input.reviewerName}`
    : `CounselO legal article reviewed by ${input.reviewerName}`);

  return [
    `<meta property="og:type" content="article">`,
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${description}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:site_name" content="CounselO كاونسلو">`,
    `<meta property="og:locale" content="${input.language === "ar" ? "ar_SA" : "en_US"}">`,
    `<meta property="og:image" content="${BLOG_SOCIAL_IMAGE.url}">`,
    `<meta property="og:image:secure_url" content="${BLOG_SOCIAL_IMAGE.secureUrl}">`,
    `<meta property="og:image:type" content="${BLOG_SOCIAL_IMAGE.type}">`,
    `<meta property="og:image:width" content="${BLOG_SOCIAL_IMAGE.width}">`,
    `<meta property="og:image:height" content="${BLOG_SOCIAL_IMAGE.height}">`,
    `<meta property="og:image:alt" content="${imageAlt}">`,
    `<meta property="article:author" content="https://counselo-legal.com/about">`,
    `<meta name="reviewed-by" content="${reviewerName}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${title}">`,
    `<meta name="twitter:description" content="${description}">`,
    `<meta name="twitter:image" content="${BLOG_SOCIAL_IMAGE.url}">`,
    `<meta name="twitter:image:alt" content="${imageAlt}">`,
  ].join("\n    ");
}
