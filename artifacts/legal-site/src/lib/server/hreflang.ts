import { BASE_URL } from "./routes.js";

/**
 * Escapes XML/HTML special characters in attributes/urls.
 */
export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Generates sitemap hreflang links for regional paths (SA, SYR).
 */
export function buildHreflangSitemapLinks(path: string): string {
  if (path === "") {
    return [
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/"/>`,
      `    <xhtml:link rel="alternate" hreflang="en-SA"     href="${BASE_URL}/sa"/>`,
      `    <xhtml:link rel="alternate" hreflang="ar-SA"     href="${BASE_URL}/sa/ar"/>`,
      `    <xhtml:link rel="alternate" hreflang="en-SY"     href="${BASE_URL}/syr"/>`,
      `    <xhtml:link rel="alternate" hreflang="ar-SY"     href="${BASE_URL}/syr/ar"/>`,
    ].join("\n");
  }

  const basePath = path.replace(/^\/(sa|syr)(\/ar)?/, "");
  const combos: Array<[string, string]> = [
    ["en-SA", `/sa${basePath}`],
    ["ar-SA", `/sa/ar${basePath}`],
    ["en-SY", `/syr${basePath}`],
    ["ar-SY", `/syr/ar${basePath}`],
  ];
  return [
    ...combos.map(
      ([l, p]) =>
        `    <xhtml:link rel="alternate" hreflang="${l}"     href="${BASE_URL}${p}"/>`,
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/"/>`,
  ].join("\n");
}

/**
 * Generates sitemap hreflang links for UAE pages.
 */
export function buildHreflangUaeSitemapLinks(path: string): string {
  const basePath = path.replace(/^\/uae(\/ar)?/, "");
  return [
    `    <xhtml:link rel="alternate" hreflang="en-AE" href="${BASE_URL}/uae${basePath}"/>`,
    `    <xhtml:link rel="alternate" hreflang="ar-AE" href="${BASE_URL}/uae/ar${basePath}"/>`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/"/>`,
  ].join("\n");
}

/**
 * Generates sitemap hreflang links for Syria-only services.
 */
export function buildHreflangSyrOnlySitemapLinks(path: string): string {
  const basePath = path.replace(/^\/(sa|syr)(\/ar)?/, "");
  const combos: Array<[string, string]> = [
    ["en-SY", `/syr${basePath}`],
    ["ar-SY", `/syr/ar${basePath}`],
  ];
  return [
    ...combos.map(
      ([l, p]) =>
        `    <xhtml:link rel="alternate" hreflang="${l}"     href="${BASE_URL}${p}"/>`,
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/"/>`,
  ].join("\n");
}

/**
 * Generates sitemap hreflang link for single-URL pages (e.g. blog posts).
 */
export function buildHreflangSingleUrlSitemapLink(fullUrl: string): string {
  return `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(fullUrl)}"/>`;
}

/**
 * Generates sitemap hreflang links for language variants (English & Arabic).
 */
export function buildHreflangLanguageVariantSitemapLinks(
  englishUrl: string,
  arabicUrl: string,
): string {
  return [
    `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(englishUrl)}"/>`,
    `    <xhtml:link rel="alternate" hreflang="ar" href="${escapeXml(arabicUrl)}"/>`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(englishUrl)}"/>`,
  ].join("\n");
}

/**
 * Generates HTML <head> hreflang tags for work samples.
 */
export function buildWorkHreflangHtmlTags(
  titleEn: string,
  titleAr: string,
  englishUrl: string,
  arabicUrl: string,
  canonicalUrl: string,
): string {
  if (titleEn && titleAr) {
    return [
      `<link data-rh="true" rel="alternate" hreflang="en" href="${escapeXml(englishUrl)}">`,
      `<link data-rh="true" rel="alternate" hreflang="ar" href="${escapeXml(arabicUrl)}">`,
      `<link data-rh="true" rel="alternate" hreflang="x-default" href="${escapeXml(englishUrl)}">`,
    ].join("\n");
  }
  return `<link data-rh="true" rel="alternate" hreflang="x-default" href="${escapeXml(canonicalUrl)}">`;
}
