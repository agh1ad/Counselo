import express, { type Express, type Request, type Response } from "express";
import { db, blogPostsTable, workSamplesTable } from "@workspace/db";
import { and, eq, getTableColumns } from "drizzle-orm";
import * as fs from "fs";
import * as path from "path";
import * as http from "http";
import { logger } from "./lib/logger.js";
import { repairPublicBlogPost } from "./lib/public-blog-repairs.js";
import { repairPublicWorkSample } from "./lib/public-work-repairs.js";
import { prerenderedRedirect } from "./lib/prerendered-redirect.js";
import { renderPublicBlogBody } from "./lib/public-blog-body.js";
import {
  LEGACY_BLOG_REDIRECTS,
  LEGACY_SEARCH_REDIRECTS,
  buildDiscoveryFeed,
  buildDynamicSitemap,
  buildBlogHtmlMetadata,
  buildWorkHtmlMetadata,
  articleJurisdictionLabel,
  articleContextRegion,
  ARTICLE_LINK_LABELS,
  articleModifiedAt,
  ARTICLE_CONTEXT,
  WORK_CONTEXT,
  WORK_READER_GUIDANCE,
  workModifiedAt,
  getServiceDefinition,
  assignArticleProvenance,
  blogLanguageAlternates,
  blogPath,
  hasQualityBilingualBlogContent,
  localizeArticleProvenanceUrl,
  buildNotFoundHtml,
  LEGACY_REDIRECTS,
  PUBLIC_CACHE_POLICY,
  routeToFlatFilename,
  COUNSELO_ENTITY_IDS,
  BLOG_SOCIAL_IMAGE,
  BLOG_REVIEWER_ATTRIBUTION,
  buildBlogSocialMetaTags,
  safeSeoTitle,
} from "@workspace/api-zod";

const BASE_URL = "https://counselo-legal.com";

// In production, the process runs from workspace root.
// In dev, pnpm runs the script from the package dir (artifacts/api-server/).
// Try both so the path resolves correctly in both environments.
function findLegalDist(): string {
  const fromRoot = path.join(process.cwd(), "artifacts/legal-site/dist/public");
  if (fs.existsSync(path.join(fromRoot, "index.html"))) return fromRoot;
  // dev: CWD is artifacts/api-server/, so go up two levels to workspace root
  return path.resolve(process.cwd(), "../../artifacts/legal-site/dist/public");
}
const LEGAL_DIST = findLegalDist();
const LEGAL_TEMPLATE = path.resolve(LEGAL_DIST, "../ssr-template.html");
const DEFAULT_OG_IMAGE = BLOG_SOCIAL_IMAGE.url;
const SITE_NAME = "CounselO";

let indexHtmlCache: string | null = null;
let shellHtmlCache: string | null = null;

function getIndexHtml(): string | null {
  if (indexHtmlCache !== null) return indexHtmlCache;
  try {
    const content = fs.readFileSync(
      path.join(LEGAL_DIST, "index.html"),
      "utf-8",
    );
    indexHtmlCache = content;
    return indexHtmlCache;
  } catch {
    return null; // Don't cache null — retry on next request
  }
}

function getShellHtml(): string | null {
  if (shellHtmlCache !== null) return shellHtmlCache;
  try {
    shellHtmlCache = fs.readFileSync(LEGAL_TEMPLATE, "utf-8");
    return shellHtmlCache;
  } catch {
    return null;
  }
}

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildOgHtml(
  title: string,
  description: string,
  url: string,
  lang: string,
): string {
  const locale = lang === "ar" ? "ar_SA" : "en_US";
  // Include the canonical here so the static HTML served to crawlers has the
  // correct canonical. Without this, the prerendered index.html canonical
  // (https://counselo-legal.com/) would conflict with og:url, causing
  // "Multiple conflicting canonical URLs" in Google Search Console.
  const ogTags = `\n    <title>${esc(title)}</title>
    <link rel="canonical" href="${esc(url)}" />
    <meta name="description" content="${esc(description)}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:image" content="${DEFAULT_OG_IMAGE}" />
    <meta property="og:url" content="${esc(url)}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:locale" content="${locale}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />`;

  const indexHtml = getIndexHtml();
  if (!indexHtml) {
    return `<!DOCTYPE html><html lang="${lang}"><head><meta charset="UTF-8" />${ogTags}</head><body><div id="root"></div></body></html>`;
  }

  // Strip the prerendered root canonical from index.html — it belongs to the
  // region-picker page ("/"), not to this CMS blog post. We inject the correct
  // canonical above via ogTags, so removing the stale one prevents both the
  // static-HTML conflict Google sees and the client-side duplicate after hydration.
  const stripped = indexHtml.replace(/<link[^>]*\brel=["']canonical["'][^>]*\/?>/gi, "");

  // Inject page-specific tags immediately after <head>. Crawlers that use the
  // first occurrence of each og:* / canonical take the injected values.
  return stripped.replace("<head>", `<head>${ogTags}`);
}

function safeJson(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function normalizeDescription(primary: string, fallback: string): string {
  const combined = primary.trim().length >= 80
    ? primary.trim()
    : `${primary.trim()} ${fallback.trim()}`.trim();
  if (combined.length <= 170) return combined;
  return `${combined.slice(0, 167).replace(/\s+\S*$/, "").trimEnd()}…`;
}

export function buildDynamicBlogHtml(
  post: typeof blogPostsTable.$inferSelect,
  requestedLanguage: "en" | "ar",
  shellOverride?: string | null,
): string {
  const isArabicPost = requestedLanguage === "ar";
  const title = isArabicPost
    ? safeSeoTitle(post.seoTitleAr, post.titleAr) || safeSeoTitle(post.seoTitleEn, post.titleEn) || SITE_NAME
    : safeSeoTitle(post.seoTitleEn, post.titleEn) || safeSeoTitle(post.seoTitleAr, post.titleAr) || SITE_NAME;
  const brandedTitle = /(?:CounselO|كاونسلو)$/i.test(title)
    ? title
    : `${title} | ${isArabicPost ? "كاونسلو" : "CounselO"}`;
  const description = normalizeDescription(
    isArabicPost ? post.seoDescriptionAr || post.seoDescriptionEn || "" : post.seoDescriptionEn || post.seoDescriptionAr || "",
    isArabicPost ? post.excerptAr || post.excerptEn || "Online legal guidance from CounselO." : post.excerptEn || post.excerptAr || "Online legal guidance from CounselO.",
  );
  const metadata = buildBlogHtmlMetadata({
    slug: post.slug,
    title,
    description,
    language: isArabicPost ? "ar" : "en",
  });
  const canonical = metadata.canonical;
  const languageAlternates = blogLanguageAlternates(post.slug)
    .map(([language, target]) => `<link rel="alternate" hreflang="${language}" href="${target}">`)
    .join("");
  const provenance = assignArticleProvenance(post);
  const reviewerAttribution = isArabicPost ? BLOG_REVIEWER_ATTRIBUTION.ar : BLOG_REVIEWER_ATTRIBUTION.en;
  const contentType = post.contentType ?? "professional-commentary";
  const articleRegion = articleContextRegion(post);
  const correctionDate = ARTICLE_CONTEXT[post.slug]?.editorialUpdatedAt;
  const editorialUpdatedAt = correctionDate ? articleModifiedAt(correctionDate, post.updatedAt, post.date) : undefined;
  const authorUrl = localizeArticleProvenanceUrl(provenance.primaryAuthorEntityId ? provenance.primaryAuthorUrl : post.primaryAuthorUrl || provenance.primaryAuthorUrl, articleRegion, requestedLanguage, "profile");
  const reviewerUrl = localizeArticleProvenanceUrl(post.legalReviewerUrl || provenance.legalReviewerUrl, articleRegion, requestedLanguage, "profile");
  const correctionUrl = localizeArticleProvenanceUrl(post.correctionUrl || provenance.correctionUrl, articleRegion, requestedLanguage, "correction");
  // Tests pass a minimal shell so the future-post contract is validated
  // without depending on whichever posts happened to exist at build time.
  // Production deliberately loads only the generic SSR template/index shell;
  // all article-specific metadata below comes from the live database record.
  const shell = shellOverride === undefined
    ? getShellHtml() ?? getIndexHtml()
    : shellOverride;
  const articleSchema = safeJson({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    inLanguage: isArabicPost ? "ar" : "en",
    datePublished: post.date,
    dateModified: editorialUpdatedAt ?? provenance.lastSubstantiveReviewAt,
    mainEntityOfPage: canonical,
    author: {
      "@type": "Organization",
      "@id": provenance.primaryAuthorEntityId ?? COUNSELO_ENTITY_IDS.organization,
      name: isArabicPost ? provenance.primaryAuthorNameAr : provenance.primaryAuthorName,
      alternateName: isArabicPost ? provenance.primaryAuthorName : provenance.primaryAuthorNameAr,
      url: new URL(authorUrl, BASE_URL).href,
    },
    publisher: {
      "@type": "Organization",
      "@id": COUNSELO_ENTITY_IDS.organization,
      name: "CounselO",
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png` },
    },
    image: {
      "@type": "ImageObject",
      url: BLOG_SOCIAL_IMAGE.url,
      width: BLOG_SOCIAL_IMAGE.width,
      height: BLOG_SOCIAL_IMAGE.height,
    },
    ...(!editorialUpdatedAt ? { reviewedBy: {
      "@type": "Person",
      "@id": COUNSELO_ENTITY_IDS.omar,
      name: isArabicPost ? provenance.legalReviewerNameAr : provenance.legalReviewerName,
      jobTitle: isArabicPost ? "محامٍ ومستشار قانوني" : "Lawyer and Legal Counsel",
      url: `${BASE_URL}${reviewerUrl}`,
    } } : {}),
    ...(contentType === "legal-guidance" && articleRegion ? {
      citation: provenance.sources.map((source) => source.href),
      about: {
        "@type": "LegalService",
        areaServed: articleRegion === "uae" ? "United Arab Emirates" : articleRegion === "syr" ? "Syria" : "Saudi Arabia",
      },
    } : {}),
  });
  const head = `<title>${esc(brandedTitle)}</title>
    <meta name="description" content="${esc(description.slice(0, 170))}">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    <link rel="canonical" href="${esc(canonical)}">${languageAlternates}
    ${buildBlogSocialMetaTags({
      title,
      description: description.slice(0, 170),
      canonical,
      language: isArabicPost ? "ar" : "en",
      reviewerName: editorialUpdatedAt ? undefined : reviewerAttribution,
    })}
    <script type="application/ld+json">${articleSchema}</script>
    <script>window.__SSR_POST__=${safeJson(post)};</script>`;
  const reviewerLabel = editorialUpdatedAt ? isArabicPost ? "القيادة القانونية" : "Legal leadership" : isArabicPost ? "تمت المراجعة بواسطة" : "Reviewed by";
  const legalFields = contentType === "legal-guidance" && provenance.jurisdiction
    ? `<p>${isArabicPost ? "الاختصاص" : "Jurisdiction"}: ${esc(articleJurisdictionLabel(provenance.jurisdiction, isArabicPost))}</p><p>${isArabicPost ? "القانون المنطبق" : "Applicable law"}: ${esc(isArabicPost ? provenance.applicableLawAr : provenance.applicableLaw)}</p><p>${isArabicPost ? "المصادر والاقتباسات" : "Sources and citations"}: ${provenance.sources.map((source) => `<a href="${esc(source.href)}">${esc(isArabicPost ? source.titleAr : source.titleEn)}</a>`).join(" · ")}</p>`
    : "";
  const body = `<article><h1>${esc(title)}</h1><p>${esc(description)}</p><section aria-labelledby="article-provenance-heading"><h2 id="article-provenance-heading">${contentType === "legal-guidance" ? (isArabicPost ? "بيانات المراجعة والمصادر" : "Review and source information") : (isArabicPost ? "بيانات المقال التحريري" : "Editorial information")}</h2><p>${isArabicPost ? "كتب بواسطة" : "Written by"}: <a href="${esc(authorUrl)}">${esc(isArabicPost ? provenance.primaryAuthorNameAr : provenance.primaryAuthorName)}</a></p><p>${reviewerLabel}: <a href="${esc(reviewerUrl)}">${esc(reviewerAttribution)}</a></p>${legalFields}<p>${isArabicPost ? "تاريخ النشر" : "Publication date"}: ${esc(post.date)}</p><p>${editorialUpdatedAt ? isArabicPost ? "تحديث المحتوى" : "Content updated" : isArabicPost ? (contentType === "legal-guidance" ? "آخر مراجعة جوهرية" : "آخر مراجعة تحريرية") : (contentType === "legal-guidance" ? "Last substantive review" : "Last editorial review")}: ${esc(editorialUpdatedAt ?? provenance.lastSubstantiveReviewAt)}</p><p>${esc(isArabicPost ? provenance.keyLegalUpdateNoteAr : provenance.keyLegalUpdateNote)}</p><p>${esc(isArabicPost ? provenance.contentMethodologyAr : provenance.contentMethodology)}</p><p>${isArabicPost ? "هذا المقال لأغراض توعوية ولا يشكل مشورة قانونية." : "This article is informational only and is not legal advice."} <a href="${esc(correctionUrl)}">${isArabicPost ? "الإبلاغ عن تصحيح" : "Report a correction"}</a></p></section></article>`;
  const relatedArticles = (ARTICLE_CONTEXT[post.slug]?.relatedBlogSlugs ?? []).flatMap(slug => {
    const label = ARTICLE_LINK_LABELS[slug];
    return label ? [`<li><a href="${esc(blogPath(slug, requestedLanguage))}">${esc(label[requestedLanguage])}</a></li>`] : [];
  });
  const articleContext = ARTICLE_CONTEXT[post.slug];
  const relatedCases = (articleContext?.relatedWorkSlugs ?? []).flatMap(slug => {
    const context = WORK_CONTEXT[slug];
    return context ? [`<li><a href="${isArabicPost ? "/ar" : ""}/our-work/${esc(slug)}">${esc(isArabicPost ? context.titleAr : context.titleEn)}</a></li>`] : [];
  });
  const service = articleContext?.region ? getServiceDefinition(articleContext.serviceSlug, articleContext.region) : undefined;
  const serviceLink = service && articleContext?.region ? `<li><a href="/${articleContext.region}${isArabicPost ? "/ar" : ""}/services/${esc(service.slug)}">${esc(isArabicPost ? service.titleAr : service.titleEn)}</a></li>` : "";
  relatedArticles.push(...relatedCases, ...(serviceLink ? [serviceLink] : []));
  const relatedSection = relatedArticles.length ? `<nav aria-label="${isArabicPost ? "قراءات مرتبطة" : "Related reading"}"><h2>${isArabicPost ? "قراءات مرتبطة" : "Related reading"}</h2><ul>${relatedArticles.join("")}</ul></nav>` : "";
  const bodyWithArticle = body.replace("</article>", `<div id="article-content">${renderPublicBlogBody(post, requestedLanguage)}</div>${relatedSection}</article>`);
  if (!shell) {
    return `<!doctype html><html lang="${isArabicPost ? "ar" : "en"}" dir="${isArabicPost ? "rtl" : "ltr"}"><head>${head}</head><body><div id="root">${bodyWithArticle}</div></body></html>`;
  }
  return shell
    .replace(/<html\b[^>]*>/i, `<html lang="${isArabicPost ? "ar" : "en"}" dir="${isArabicPost ? "rtl" : "ltr"}">`)
    .replace("<!--app-head-->", head)
    .replace(/<div id="root"><\/div>/, `<div id="root">${bodyWithArticle}</div>`);
}

function buildDynamicBlogIndex(
  posts: Array<typeof blogPostsTable.$inferSelect>,
  language: "en" | "ar",
): string {
  const isArabic = language === "ar";
  const visiblePosts = posts.filter(hasQualityBilingualBlogContent);
  const discoveryPosts = visiblePosts.map((post) => ({
    id: post.id,
    slug: post.slug,
    date: post.date,
    updatedAt: post.updatedAt,
    categoryEn: post.categoryEn,
    categoryAr: post.categoryAr,
    readTime: post.readTime,
    titleEn: post.titleEn,
    titleAr: post.titleAr,
    excerptEn: post.excerptEn,
    excerptAr: post.excerptAr,
    seoTitleEn: post.seoTitleEn,
    seoTitleAr: post.seoTitleAr,
    seoDescriptionEn: post.seoDescriptionEn,
    seoDescriptionAr: post.seoDescriptionAr,
    relatedServiceSlugs: post.relatedServiceSlugs,
    relatedBlogSlugs: post.relatedBlogSlugs,
    relatedWorkSlugs: post.relatedWorkSlugs,
    published: true,
    bilingual: true,
  }));
  const shell = getShellHtml() ?? getIndexHtml();
  const title = isArabic
    ? "المدونة القانونية | مقالات وأدلة | كاونسلو"
    : "Legal Blog | Articles & Guides | CounselO";
  const description = isArabic
    ? "مقالات وأدلة قانونية عربية حول قوانين الإمارات والسعودية وسوريا من فريق كاونسلو القانوني."
    : "Practical legal guides covering UAE, Saudi and Syrian law from CounselO's legal team.";
  const canonical = `${BASE_URL}${isArabic ? "/blog/ar" : "/blog"}`;
  const collection = safeJson({
    "@context": "https://schema.org",
    "@type": ["CollectionPage", "Blog"],
    "@id": `${canonical}#collection`,
    name: title,
    description,
    url: canonical,
  });
  const itemList = safeJson({
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: visiblePosts.length,
    itemListElement: visiblePosts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: isArabic ? post.titleAr : post.titleEn,
      url: `${BASE_URL}${blogPath(post.slug, language)}`,
    })),
  });
  const head = `<title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}"><meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
    <link rel="canonical" href="${canonical}"><link rel="alternate" hreflang="en" href="${BASE_URL}/blog"><link rel="alternate" hreflang="ar" href="${BASE_URL}/blog/ar"><link rel="alternate" hreflang="x-default" href="${BASE_URL}/blog"><meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${DEFAULT_OG_IMAGE}"><meta property="og:locale" content="${isArabic ? "ar_SA" : "en_US"}">
    <meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${DEFAULT_OG_IMAGE}">
    <script type="application/ld+json">${collection}</script><script type="application/ld+json">${itemList}</script><script>window.__SSR_POSTS__=${safeJson(discoveryPosts)};</script>`;
  const links = visiblePosts
    .map(
      (post) =>
        `<article><h2><a href="${blogPath(encodeURIComponent(post.slug), language)}">${esc(isArabic ? post.titleAr : post.titleEn)}</a></h2><p>${esc(isArabic ? post.excerptAr : post.excerptEn)}</p></article>`,
    )
    .join("");
  const body = `<main><h1>${isArabic ? "المدونة القانونية" : "Legal Blog"}</h1>${links}</main>`;
  if (!shell) {
    return `<!doctype html><html lang="${language}"${isArabic ? ' dir="rtl"' : ""}><head>${head}</head><body><div id="root">${body}</div></body></html>`;
  }
  return shell
    .replace(/<html\b[^>]*>/i, `<html lang="${language}" dir="${isArabic ? "rtl" : "ltr"}">`)
    .replace("<!--app-head-->", head)
    .replace(/<div id="root"><\/div>/, `<div id="root">${body}</div>`);
}

type PublicWorkSample = Omit<typeof workSamplesTable.$inferSelect, "fileData" | "confidentialityConfirmed">;
const { fileData: _workFileData, confidentialityConfirmed: _workConfidentiality, ...publicWorkColumns } = getTableColumns(workSamplesTable);

export function buildDynamicWorkHtml(sample: PublicWorkSample, language: "en" | "ar"): string {
  sample = repairPublicWorkSample(sample);
  const isArabic = language === "ar";
  const title = (isArabic ? sample.seoTitleAr || sample.titleAr : sample.seoTitleEn || sample.titleEn) || sample.titleAr || sample.titleEn;
  const description = normalizeDescription(
    (isArabic ? sample.seoDescriptionAr || sample.summaryAr : sample.seoDescriptionEn || sample.summaryEn) || sample.summaryAr || sample.summaryEn,
    sample.summaryEn || sample.summaryAr,
  );
  const basePath = isArabic ? "/ar/our-work" : "/our-work";
  const metadata = buildWorkHtmlMetadata({ slug: sample.slug, title, description, language });
  const canonical = metadata.canonical;
  const englishUrl = `${BASE_URL}/our-work/${sample.slug}`;
  const arabicUrl = `${BASE_URL}/ar/our-work/${sample.slug}`;
  const fileUrl = `${BASE_URL}/api/work/${sample.slug}/file`;
  const shell = getShellHtml() ?? getIndexHtml();
  const schema = safeJson({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    url: canonical,
    dateCreated: sample.date,
    dateModified: workModifiedAt(sample.slug, sample.updatedAt, sample.date),
    inLanguage: language,
    genre: sample.workTypeEn || sample.workTypeAr,
    contentLocation: sample.jurisdictionEn || sample.jurisdictionAr,
    creator: WORK_CONTEXT[sample.slug]?.creator === "baghdadi-law"
      ? { "@type": "LegalService", "@id": COUNSELO_ENTITY_IDS.alBaghdadiOffice, name: "Baghdadi Law", alternateName: "البغدادي للمحاماة", url: "https://www.baghdadilaw.co" }
      : { "@type": "Organization", "@id": COUNSELO_ENTITY_IDS.organization, name: "CounselO", alternateName: "كاونسلو", url: BASE_URL },
    encoding: sample.fileSize > 0 ? { "@type": "MediaObject", contentUrl: fileUrl, encodingFormat: sample.fileMimeType } : undefined,
  });
  const breadcrumbs = safeJson({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isArabic ? "الرئيسية" : "Home", item: `${BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: isArabic ? "أعمالنا" : "Our Work", item: `${BASE_URL}${basePath}` },
      { "@type": "ListItem", position: 3, name: title, item: canonical },
    ],
  });
  const head = `<title>${esc(title)}</title>
    <meta name="description" content="${esc(description.slice(0, 170))}"><meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
    <link rel="canonical" href="${canonical}">${sample.titleEn && sample.titleAr ? `<link rel="alternate" hreflang="en" href="${englishUrl}"><link rel="alternate" hreflang="ar" href="${arabicUrl}">` : ""}<link rel="alternate" hreflang="x-default" href="${sample.titleEn ? englishUrl : arabicUrl}"><meta property="og:type" content="article"><meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(description.slice(0, 170))}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${DEFAULT_OG_IMAGE}">
    <script type="application/ld+json">${schema}</script><script type="application/ld+json">${breadcrumbs}</script>
    <script>window.__SSR_WORK__=${safeJson(sample)};</script>`;
  const localized = (en: string, ar: string) => isArabic ? ar || en : en || ar;
  const sections = [
    [isArabic ? "المسألة" : "The matter", localized(sample.challengeEn, sample.challengeAr)],
    [isArabic ? "العمل الذي قمنا به" : "Work performed", localized(sample.approachEn, sample.approachAr)],
    [isArabic ? "النتيجة أو القيمة المقدمة" : "Outcome or value delivered", localized(sample.outcomeEn, sample.outcomeAr)],
  ].filter(([, value]) => value.trim()).map(([heading, value]) => `<section><h2>${esc(heading)}</h2><p style="white-space:pre-line">${esc(value)}</p></section>`).join("");
  const disclaimer = isArabic ? "هذا النموذج لأغراض توضيح الخبرة المهنية فقط. عُدّلت بعض التفاصيل أو حُجبت لحماية السرية، ولا تمثل النتائج السابقة ضماناً لنتيجة أي مسألة أخرى." : "This sample demonstrates professional experience only. Details may be modified or withheld to protect confidentiality, and past work or outcomes do not guarantee the result of another matter.";
  const context = WORK_CONTEXT[sample.slug];
  const evidenceNote = context?.evidenceNote ? `<section><h2>${isArabic ? "ما الذي يوضحه المستند المنشور؟" : "What does the published document establish?"}</h2><p>${esc(context.evidenceNote[language])}</p></section>` : "";
  const readerGuidance = (WORK_READER_GUIDANCE[sample.slug]?.[language] ?? []).map(answer => `<section><h2>${esc(answer.q)}</h2><p>${esc(answer.a)}</p></section>`).join("");
  const serviceLinks = context?.region ? context.relatedServiceSlugs.flatMap(slug => {
    const service = getServiceDefinition(slug, context.region!);
    return service ? [`<li><a href="/${context.region}${isArabic ? "/ar" : ""}/services/${esc(slug)}">${esc(localized(service.titleEn, service.titleAr))}</a></li>`] : [];
  }) : [];
  const articleLinks = (context?.relatedBlogSlugs ?? []).flatMap(slug => {
    const label = ARTICLE_LINK_LABELS[slug];
    return label ? [`<li><a href="${esc(blogPath(slug, language))}">${esc(label[language])}</a></li>`] : [];
  });
  const workLinks = (context?.relatedWorkSlugs ?? []).flatMap(slug => {
    const related = WORK_CONTEXT[slug];
    return related ? [`<li><a href="${isArabic ? "/ar" : ""}/our-work/${esc(slug)}">${esc(localized(related.titleEn, related.titleAr))}</a></li>`] : [];
  });
  const links = [...serviceLinks, ...articleLinks, ...workLinks];
  const related = links.length ? `<nav aria-label="${isArabic ? "محتوى ذو صلة" : "Related content"}"><h2>${isArabic ? "خدمات ومحتوى ذو صلة" : "Related services and content"}</h2><ul>${links.join("")}</ul></nav>` : "";
  const contactPath = context?.region ? `/${context.region}${isArabic ? "/ar" : ""}/contact` : `${isArabic ? "/ar" : "/"}#jurisdictions-heading${isArabic ? "-ar" : ""}`;
  const attribution = context?.creator === "baghdadi-law" ? `<p>${isArabic ? "الجهة صاحبة الدراسة" : "Study by"}: <a href="https://www.baghdadilaw.co">${isArabic ? "البغدادي للمحاماة" : "Baghdadi Law"}</a></p>` : "";
  const updated = context ? `<p>${isArabic ? "تحديث المحتوى" : "Content updated"}: ${esc(workModifiedAt(sample.slug, sample.updatedAt, sample.date)?.slice(0, 10) ?? sample.date)}</p>` : "";
  const body = `<main><article><h1>${esc(localized(sample.titleEn, sample.titleAr))}</h1>${attribution}${updated}<p>${esc(localized(sample.summaryEn, sample.summaryAr))}</p><p>${esc(localized(sample.workTypeEn, sample.workTypeAr))} · ${esc(localized(sample.jurisdictionEn, sample.jurisdictionAr))}</p>${sections}${evidenceNote}${readerGuidance}<p>${esc(disclaimer)}</p>${related}<p><a href="${contactPath}">${isArabic ? "ناقش متطلباتك القانونية" : "Discuss your legal requirements"}</a></p>${sample.fileSize > 0 ? `<a href="${fileUrl}">${isArabic ? "عرض المستند المنقح" : "View redacted document"}</a>` : ""}</article></main>`;
  if (!shell) return `<!doctype html><html lang="${isArabic ? "ar" : "en"}" dir="${isArabic ? "rtl" : "ltr"}"><head>${head}</head><body><div id="root">${body}</div></body></html>`;
  return shell.replace(/<html\b[^>]*>/i, `<html lang="${isArabic ? "ar" : "en"}" dir="${isArabic ? "rtl" : "ltr"}">`).replace("<!--app-head-->", head).replace(/<div id="root"><\/div>/, `<div id="root">${body}</div>`);
}

function buildDynamicWorkIndex(samples: PublicWorkSample[], language: "en" | "ar"): string {
  samples = samples.map(repairPublicWorkSample);
  const isArabic = language === "ar";
  const visibleSamples = samples.filter((sample) => isArabic ? Boolean(sample.titleAr) : Boolean(sample.titleEn));
  const shell = getShellHtml() ?? getIndexHtml();
  const title = isArabic ? "نماذج من أعمالنا القانونية | خبرة وصياغة احترافية | كاونسلو" : "Our Legal Work | Redacted Documents & Experience | CounselO";
  const description = isArabic ? "اطلع على نماذج منقحة من العقود والمذكرات والأعمال القانونية التي أعدها فريق كاونسلو، مع حماية كاملة لسرية وخصوصية العملاء." : "View redacted contracts, legal documents, and selected professional work prepared by CounselO, with client confidentiality protected.";
  const canonical = `${BASE_URL}${isArabic ? "/ar/our-work" : "/our-work"}`;
  const itemList = safeJson({
    "@context": "https://schema.org", "@type": "ItemList", numberOfItems: visibleSamples.length,
    itemListElement: visibleSamples.map((sample, index) => ({ "@type": "ListItem", position: index + 1, name: isArabic ? sample.titleAr : sample.titleEn, url: `${canonical}/${sample.slug}` })),
  });
  const breadcrumbs = safeJson({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isArabic ? "الرئيسية" : "Home", item: `${BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: isArabic ? "أعمالنا القانونية" : "Our Legal Work", item: canonical },
    ],
  });
  const head = `<title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large"><link rel="canonical" href="${canonical}"><link rel="alternate" hreflang="en" href="${BASE_URL}/our-work"><link rel="alternate" hreflang="ar" href="${BASE_URL}/ar/our-work"><link rel="alternate" hreflang="x-default" href="${BASE_URL}/our-work"><meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${canonical}"><script type="application/ld+json">${itemList}</script><script type="application/ld+json">${breadcrumbs}</script><script>window.__SSR_WORK_SAMPLES__=${safeJson(visibleSamples.map((sample) => ({ ...sample, hasFile: sample.fileSize > 0 })))};</script>`;
  const body = `<main><h1>${isArabic ? "أعمالنا القانونية" : "Our Legal Work"}</h1>${visibleSamples.map((sample) => `<article><h2><a href="${isArabic ? "/ar" : ""}/our-work/${encodeURIComponent(sample.slug)}">${esc(isArabic ? sample.titleAr : sample.titleEn)}</a></h2><p>${esc(isArabic ? sample.summaryAr : sample.summaryEn)}</p></article>`).join("")}</main>`;
  if (!shell) return `<!doctype html><html lang="${language}" dir="${isArabic ? "rtl" : "ltr"}"><head>${head}</head><body><div id="root">${body}</div></body></html>`;
  return shell.replace(/<html\b[^>]*>/i, `<html lang="${language}" dir="${isArabic ? "rtl" : "ltr"}">`).replace("<!--app-head-->", head).replace(/<div id="root"><\/div>/, `<div id="root">${body}</div>`);
}

/**
 * Try to find and return a prerendered HTML file for the given path.
 * Returns the absolute file path if it exists, null otherwise.
 */
function findPrerenderedFile(urlPath: string): string | null {
  const fileName = routeToFlatFilename(urlPath);
  const filePath = path.join(LEGAL_DIST, "__pages", fileName);
  return fs.existsSync(filePath) ? filePath : null;
}

const IS_DEV = process.env.NODE_ENV !== "production";
// Vite dev server port for the legal-site artifact
const VITE_PORT = parseInt(process.env.LEGAL_SITE_DEV_PORT ?? "24438", 10);

/**
 * In development, proxy the request to the Vite dev server so the full
 * HMR / React dev experience is preserved. In production the Vite server
 * does not run — we serve the prerendered files directly.
 */
function proxyToVite(req: Request, res: Response): void {
  const options: http.RequestOptions = {
    hostname: "localhost",
    port: VITE_PORT,
    path: req.url,
    method: req.method,
    headers: { ...req.headers, host: `localhost:${VITE_PORT}` },
  };
  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode ?? 200, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });
  proxyReq.on("error", () => {
    res.status(503).send("Legal-site dev server not ready — is the legal-site workflow running?");
  });
  req.pipe(proxyReq, { end: true });
}

export function registerOgPageRoutes(app: Express): void {
  for (const [source, destination] of Object.entries({ ...LEGACY_BLOG_REDIRECTS, ...LEGACY_SEARCH_REDIRECTS })) app.get(source, (_req, res) => {
    res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.redirect);
    return res.redirect(301, destination);
  });
  // Replit's production server must emit HTTP redirects, not serve a 200 meta refresh.
  const consolidationTargets = new Map<string, string | undefined>();
  app.get(/^\/uae(?:\/ar)?\/services\/[^/]+\/[^/]+$/, (req, res, next) => {
    if (!consolidationTargets.has(req.path)) {
      const file = findPrerenderedFile(req.path);
      consolidationTargets.set(req.path, file ? prerenderedRedirect(fs.readFileSync(file, "utf8"), req.path) : undefined);
    }
    const destination = consolidationTargets.get(req.path);
    if (!destination) return next();
    res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.redirect);
    res.redirect(301, destination);
  });
  // The index and regional/core child sitemaps are build artifacts. Blog and
  // work child sitemaps stay database-backed so newly published records appear
  // immediately while drafts/unpublished records never leak into discovery.
  app.get("/sitemap.xml", async (_req, res) => {
    try {
      const sitemapIndex = fs.readFileSync(path.join(LEGAL_DIST, "sitemap.xml"), "utf-8");
      res.type("application/xml");
      res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.dynamicHtml);
      res.send(sitemapIndex);
    } catch (err) {
      logger.error({ err }, "Failed to read sitemap index");
      res.status(503).type("text/plain").send("Sitemap temporarily unavailable");
    }
  });

  app.get(["/sitemap-blog.xml", "/sitemap-work.xml"], async (req, res) => {
    try {
      const filename = req.path.endsWith("blog.xml") ? "sitemap-blog.xml" : "sitemap-work.xml";
      const baseXml = fs.readFileSync(path.join(LEGAL_DIST, filename), "utf-8");
      const posts = await db
        .select()
        .from(blogPostsTable)
        .where(eq(blogPostsTable.published, true));
      const samples = await db
        .select(publicWorkColumns)
        .from(workSamplesTable)
        .where(eq(workSamplesTable.published, true));
      res.type("application/xml");
      res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.dynamicHtml);
      res.send(
        buildDynamicSitemap(
          baseXml,
          filename === "sitemap-blog.xml" ? posts.map(repairPublicBlogPost) : [],
          filename === "sitemap-work.xml" ? samples.map(repairPublicWorkSample) : [],
        ),
      );
    } catch (err) {
      logger.error({ err }, "Failed to generate live sitemap");
      res.status(503).type("text/plain").send("Sitemap temporarily unavailable");
    }
  });

  // Google accepts RSS 2.0 as a sitemap for recent URLs. This small,
  // database-backed feed makes new articles and work samples discoverable
  // immediately without pretending that unchanged static pages were updated.
  app.get("/feed.xml", async (_req, res) => {
    try {
      const posts = await db
        .select()
        .from(blogPostsTable)
        .where(eq(blogPostsTable.published, true));
      const samples = await db
        .select(publicWorkColumns)
        .from(workSamplesTable)
        .where(eq(workSamplesTable.published, true));
      res.type("application/rss+xml");
      res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.dynamicHtml);
      res.send(buildDiscoveryFeed(posts.map(repairPublicBlogPost), samples.map(repairPublicWorkSample)));
    } catch (err) {
      logger.error({ err }, "Failed to generate discovery feed");
      res.status(503).type("text/plain").send("Feed temporarily unavailable");
    }
  });

  // Fingerprinted assets remain immutable; crawl-control files must revalidate.
  app.use(
    express.static(LEGAL_DIST, {
      index: false,
      maxAge: "1y",
      immutable: true,
      setHeaders(res, filePath) {
        if (filePath.endsWith("robots.txt") || filePath.endsWith("llms.txt")) {
          res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.crawlControl);
        } else if (filePath.endsWith(".html")) {
          res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.prerenderedHtml);
        }
      },
    }),
  );

  app.get("/counselo-admin", (_req, res) => {
    const shell = getShellHtml();
    res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.notFound);
    res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
    res.status(200).send(
      shell?.replace(
        "<!--app-head-->",
        '<title>CounselO Admin</title><meta name="robots" content="noindex, nofollow, noarchive">',
      ) ?? "<!doctype html><title>CounselO Admin</title><meta name=\"robots\" content=\"noindex,nofollow\">",
    );
  });

  // Legacy regional blog URLs permanently consolidate into the single
  // canonical blog URL space.
  app.get([...LEGACY_REDIRECTS.regionalBlog], (_req, res) => {
    res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.redirect);
    res.redirect(301, "/blog");
  });
  app.get([...LEGACY_REDIRECTS.regionalArabicBlog], (_req, res) => {
    res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.redirect);
    res.redirect(301, "/blog/ar");
  });
  app.get(
    ["/sa/blog/:slug", "/syr/blog/:slug", "/uae/blog/:slug"],
    async (req, res) => {
      const slug = String(req.params["slug"] ?? "");
      const [post] = await db
        .select({ slug: blogPostsTable.slug })
        .from(blogPostsTable)
        .where(
          and(
            eq(blogPostsTable.slug, slug),
            eq(blogPostsTable.published, true),
          ),
        );
      res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.redirect);
      // Preserve a published article destination; retired legacy articles
      // consolidate to the blog hub instead of producing a redirect-to-404.
      res.redirect(301, post ? blogPath(encodeURIComponent(slug), "en") : "/blog");
    },
  );
  app.get(
    ["/ar/blog/:slug", "/sa/ar/blog/:slug", "/syr/ar/blog/:slug", "/uae/ar/blog/:slug"],
    async (req, res) => {
      const slug = String(req.params["slug"] ?? "");
      const [post] = await db
        .select({ slug: blogPostsTable.slug })
        .from(blogPostsTable)
        .where(and(eq(blogPostsTable.slug, slug), eq(blogPostsTable.published, true)));
      res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.redirect);
      res.redirect(301, post ? blogPath(encodeURIComponent(slug), "ar") : "/blog/ar");
    },
  );

  app.get([...LEGACY_REDIRECTS.regionalWork], (_req, res) => {
    res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.redirect);
    res.redirect(301, "/our-work");
  });
  app.get([...LEGACY_REDIRECTS.regionalArabicWork], (_req, res) => {
    res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.redirect);
    res.redirect(301, "/ar/our-work");
  });
  app.get(["/sa/our-work/:slug", "/syr/our-work/:slug", "/uae/our-work/:slug"], (req, res) => {
    res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.redirect);
    res.redirect(301, `/our-work/${encodeURIComponent(String(req.params["slug"] ?? ""))}`);
  });
  app.get(["/sa/ar/our-work/:slug", "/syr/ar/our-work/:slug", "/uae/ar/our-work/:slug"], (req, res) => {
    res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.redirect);
    res.redirect(301, `/ar/our-work/${encodeURIComponent(String(req.params["slug"] ?? ""))}`);
  });

  app.get("/ar/our-work/:slug", async (req, res) => {
    const [rawSample] = await db
      .select(publicWorkColumns)
      .from(workSamplesTable)
      .where(and(eq(workSamplesTable.slug, String(req.params["slug"] ?? "")), eq(workSamplesTable.published, true)));
    const sample = rawSample ? repairPublicWorkSample(rawSample) : undefined;
    if (!sample) {
      sendNotFound(res);
      return;
    }
    if (!sample.titleAr && sample.titleEn) {
      res.redirect(301, `/our-work/${encodeURIComponent(sample.slug)}`);
      return;
    }
    res.type("html");
    res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.dynamicHtml);
    res.send(buildDynamicWorkHtml(sample, "ar"));
  });

  app.get("/ar/our-work", async (_req, res) => {
    const samples = await db
      .select(publicWorkColumns)
      .from(workSamplesTable)
      .where(eq(workSamplesTable.published, true));
    res.type("html");
    res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.dynamicHtml);
    res.send(buildDynamicWorkIndex(samples, "ar"));
  });

  app.get("/our-work/:slug", async (req, res) => {
    const [rawSample] = await db
      .select(publicWorkColumns)
      .from(workSamplesTable)
      .where(and(eq(workSamplesTable.slug, String(req.params["slug"] ?? "")), eq(workSamplesTable.published, true)));
    const sample = rawSample ? repairPublicWorkSample(rawSample) : undefined;
    if (!sample) {
      sendNotFound(res);
      return;
    }
    if (!sample.titleEn && sample.titleAr) {
      res.redirect(301, `/ar/our-work/${encodeURIComponent(sample.slug)}`);
      return;
    }
    res.type("html");
    res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.dynamicHtml);
    res.send(buildDynamicWorkHtml(sample, "en"));
  });

  app.get("/our-work", async (_req, res) => {
    const samples = await db
      .select(publicWorkColumns)
      .from(workSamplesTable)
      .where(eq(workSamplesTable.published, true));
    res.type("html");
    res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.dynamicHtml);
    res.send(buildDynamicWorkIndex(samples, "en"));
  });

  app.get("/blog/ar", async (_req, res) => {
    const posts = await db
      .select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.published, true));
    res.type("html");
    res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.dynamicHtml);
    res.send(buildDynamicBlogIndex(posts.map(repairPublicBlogPost), "ar"));
  });

  app.get(["/blog/en/:slug", "/blog/ar/:slug"], async (req, res) => {
    const slug = String(req.params["slug"] ?? "");
    const language: "en" | "ar" = req.path.startsWith("/blog/ar/") ? "ar" : "en";
    const [post] = await db
      .select()
      .from(blogPostsTable)
      .where(
        and(
          eq(blogPostsTable.slug, slug),
          eq(blogPostsTable.published, true),
        ),
      );
    const repairedPost = post ? repairPublicBlogPost(post) : undefined;
    if (!repairedPost) {
      sendNotFound(res);
      return;
    }
    if (!hasQualityBilingualBlogContent(repairedPost)) {
      sendNotFound(res);
      return;
    }
    res.type("html");
    res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.dynamicHtml);
    res.setHeader("X-CounselO-Page-Source", "live-blog-database");
    res.send(buildDynamicBlogHtml(repairedPost, language));
  });

  app.get("/blog/:slug", async (req, res) => {
    const slug = String(req.params["slug"] ?? "");
    const [post] = await db
      .select()
      .from(blogPostsTable)
      .where(
        and(
          eq(blogPostsTable.slug, slug),
          eq(blogPostsTable.published, true),
        ),
      );
    const repairedPost = post ? repairPublicBlogPost(post) : undefined;
    if (!repairedPost) {
      sendNotFound(res);
      return;
    }
    if (!hasQualityBilingualBlogContent(repairedPost)) {
      sendNotFound(res);
      return;
    }
    res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.redirect);
    res.redirect(301, blogPath(repairedPost.slug, "en"));
  });

  app.get("/blog", async (_req, res) => {
    const posts = await db
      .select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.published, true));
    res.type("html");
    res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.dynamicHtml);
    res.send(buildDynamicBlogIndex(posts.map(repairPublicBlogPost), "en"));
  });

  /**
   * Unified handler for all /sa/* and /syr/* paths.
   *
   * In development: proxy to the Vite dev server (port 24438) so HMR
   * and client-side React work normally.
   *
   * In production — priority order:
   *   1. Serve the prerendered flat file if it exists — it already has
   *      page-specific OG tags injected by the prerender pipeline.
   *   2. For blog post paths: look up the post in the DB and inject OG tags
   *      (handles CMS-created posts that aren't prerendered).
   *   3. Fall back to index.html for any completely unknown path.
   */
  app.get(["/sa{/*path}", "/syr{/*path}"], async (req, res) => {
    // ── Dev mode: proxy to Vite ──────────────────────────────────────────────
    if (IS_DEV) {
      proxyToVite(req, res);
      return;
    }

    const reqPath = req.path;

    // ── 1. Prerendered file ──────────────────────────────────────────────────
    const prerenderedFile = findPrerenderedFile(reqPath);
    if (prerenderedFile) {
      res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.prerenderedHtml);
      res.sendFile(prerenderedFile);
      return;
    }

    sendNotFound(res);
  });

  // Root, Arabic picker, blog index, and other known flat prerenders.
  app.get("/{*path}", (req, res) => {
    const reqPath = req.path;
    if (reqPath === "/") {
    res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.prerenderedHtml);
      res.sendFile(path.join(LEGAL_DIST, "index.html"));
      return;
    }
    const prerenderedFile = findPrerenderedFile(reqPath);
    if (prerenderedFile) {
      res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.prerenderedHtml);
      res.sendFile(prerenderedFile);
      return;
    }
    sendNotFound(res);
  });
}

function sendNotFound(res: Response): void {
  const shellHtml = getShellHtml();
  res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.notFound);
  res.type("html");
  if (shellHtml) {
    res.status(404).send(buildNotFoundHtml(shellHtml));
  } else {
    res.status(404).send(buildNotFoundHtml());
  }
}
