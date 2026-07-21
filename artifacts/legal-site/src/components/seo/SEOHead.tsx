/**
 * SEOHead — renders all per-route head tags via react-helmet-async.
 *
 * SSR note: every tag here (title, meta, link, script) is rendered by
 * Helmet's renderToString capture, so the prerender script can extract
 * and inject them into the static HTML template. The previous approach of
 * injecting JSON-LD schemas via useEffect+DOM was invisible to renderToString;
 * schemas are now rendered as <script type="application/ld+json"> inside
 * <Helmet> so they appear in the prerendered HTML source.
 */

import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { COUNSELO_OPTIMIZED_META } from "@/lib/optimized-meta";

const SYR_TEXT_MAP: [RegExp, string][] = [
  [/Saudi Arabia/gi, "Syria"],
  [/\bKSA\b/g, "Syria"],
  [/Saudi property law/gi, "Syrian property law"],
  [/Saudi law\b/gi, "Syrian law"],
  [/Saudi courts?\b/gi, "Syrian courts"],
  [/Saudi authorities\b/gi, "Syrian authorities"],
  [/Saudi MOH\b/gi, "Syrian Ministry of Health"],
  [/\bBoard of Grievances\b/gi, "Syrian Administrative Courts"],
  [/\bdiwan al mazalim\b/gi, "Syrian administrative courts"],
  [/\bSAMA\b/g, "Central Bank of Syria"],
  [/\bZATCA\b/g, "General Tax Authority"],
  [/\bSAIP\b/g, "Syrian IP Office"],
  [/\bCCHI\b/g, "Insurance Authority"],
  [/\bNDMO\b/g, "Syrian data authority"],
  [/\bPDPL\b/g, "Syrian data protection law"],
  [/\bSCCA\b/g, "Syrian Arbitration Center"],
  [/\bCITC\b/g, "Syrian authorities"],
  [/\bCMA\b/g, "Syrian financial authorities"],
  [/MISA License Guide/g, "Business Licensing Guide"],
  [/MISA license/gi, "business licensing"],
  [/Saudi Labor Law/g, "Syrian Labor Law"],
  [/Saudi employment lawyer/gi, "Syrian employment lawyer"],
  [/المملكة العربية السعودية/g, "سوريا"],
  [/المحاكم السعودية/g, "المحاكم السورية"],
  [/في المملكة\b/g, "في سوريا"],
  [/\bبالمملكة\b/g, "في سوريا"],
  [/كاونسلو المملكة العربية السعودية/g, "كاونسلو سوريا"],
  [/ساما\b/g, "مصرف سوريا المركزي"],
  [/هيئة الزكاة والضريبة والجمارك/g, "هيئة الضرائب والرسوم"],
  [/ترخيص مساند/g, "الترخيص التجاري"],
  [/نظام العمل السعودي/g, "قانون العمل السوري"],
  [/محامي عمل سعودي/g, "محامي عمل في سوريا"],
];

function syriafyText(text: string): string {
  let out = text;
  for (const [pat, rep] of SYR_TEXT_MAP) out = out.replace(pat, rep);
  return out;
}

function syriafyObj(val: unknown): unknown {
  if (typeof val === "string") return syriafyText(val);
  if (Array.isArray(val)) return val.map(syriafyObj);
  if (val !== null && typeof val === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
      if (k === "addressCountry" && v === "SA") out[k] = "SY";
      else if (k === "addressLocality" && v === "Jubail") out[k] = "Damascus";
      else if (k === "addressRegion" && v === "Eastern Province") out[k] = "Damascus Governorate";
      else out[k] = syriafyObj(v);
    }
    return out;
  }
  return val;
}

/**
 * Serialize a schema object to a JSON string safe for inline <script> tags.
 * Escapes </script> to prevent the tag from being prematurely closed.
 */
function schemaJson(obj: object): string {
  return JSON.stringify(obj).replace(/<\/script>/gi, "<\\/script>");
}

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  schema?: object | object[];
  extraSchemas?: object[];
  ogType?: string;
  /** For blog/article pages: ISO date string (e.g. post.date) */
  articlePublishedTime?: string;
  /** For blog/article pages: author display name */
  articleAuthor?: string;
  /** For blog/article pages: article section/category */
  articleSection?: string;
  /** Override the document language when content intentionally differs from the site UI. */
  contentLanguage?: "en" | "ar";
  /**
   * When true, the canonical URL is built from the `canonical` prop as-is
   * (no region/language prefix is prepended). hreflang alternates are omitted
   * unless sharedLanguageAlternates is provided. Use for shared pages such as
   * /blog and region-independent language routes such as /ar/our-work.
   */
  noRegionPrefix?: boolean;
  /** Crawlable language alternates for a region-independent bilingual page. */
  sharedLanguageAlternates?: { en: string; ar: string; xDefault?: string };
}

const GEO = {
  sa: {
    region: "SA",
    placename: "Saudi Arabia",
    position: "24.774265;46.738586",
    icbm: "24.774265, 46.738586",
    ogLocaleAr: "ar_SA",
    ogLocaleEn: "en_US",
    hrefLangEn: "en-SA",
    hrefLangAr: "ar-SA",
    pathPrefix: "/sa",
    imgAlt: "CounselO — Online Legal Consultation Saudi Arabia",
  },
  syr: {
    region: "SY",
    placename: "Syria",
    position: "34.802075;38.996815",
    icbm: "34.802075, 38.996815",
    ogLocaleAr: "ar_SY",
    ogLocaleEn: "en_US",
    hrefLangEn: "en-SY",
    hrefLangAr: "ar-SY",
    pathPrefix: "/syr",
    imgAlt: "CounselO — Online Legal Consultation Syria",
  },
} as const;

export function SEOHead({
  title,
  description,
  canonical,
  keywords,
  schema,
  extraSchemas,
  ogType = "website",
  articlePublishedTime,
  articleAuthor,
  articleSection,
  contentLanguage,
  noRegionPrefix = false,
  sharedLanguageAlternates,
}: SEOHeadProps) {
  const { lang } = useLanguage();
  const { region } = useRegion();

  const geo = GEO[region];
  const effectiveLanguage = contentLanguage ?? lang;
  const isArabic = effectiveLanguage === "ar";
  const isSyr = region === "syr";

  const basePath = canonical === "/" ? "" : canonical ?? "";
  const langSegment = isArabic ? "/ar" : "";

  // For single-URL pages (blog), skip the region/language prefix so the
  // canonical URL and meta lookups use the path exactly as provided.
  const prefixedPath = noRegionPrefix
    ? basePath
    : `${geo.pathPrefix}${langSegment}${basePath}`;

  // If an optimized entry exists for this path, use it directly without
  // applying syriafyText — the Syria entries already contain correct text.
  // noRegionPrefix pages have no prefixed key in the map, so skip the lookup.
  const metaOverride = noRegionPrefix
    ? undefined
    : COUNSELO_OPTIMIZED_META[prefixedPath as keyof typeof COUNSELO_OPTIMIZED_META];

  // For noRegionPrefix pages the canonical is exactly the given path.
  // For region-prefixed pages, honour any canonicalOverride in the meta map.
  const canonicalUrl = noRegionPrefix
    ? `https://counselo-legal.com${basePath}`
    : (metaOverride?.canonicalOverride ?? `https://counselo-legal.com${prefixedPath}`);

  // Maps SA blog slugs → Syria-canonical slugs for hreflang.
  // SA blog pages must point en-SY/ar-SY hreflang at the correct Syria slug,
  // not the non-existent Saudi-worded URL under /syr/.
  const SYRIA_BLOG_SLUG_MAP: Record<string, string> = {
    "board-of-grievances-saudi-arabia": "administrative-court-disputes-syria",
    "child-custody-saudi-arabia": "child-custody-syria",
    "divorce-in-saudi-arabia": "divorce-in-syria",
    "foreign-company-registration-saudi-arabia": "foreign-company-registration-syria",
    "real-estate-disputes-saudi-arabia": "real-estate-disputes-syria",
    "wrongful-termination-saudi-labor-law": "wrongful-termination-syrian-labor-law",
  };

  // Services that exist only in Syria — no SA equivalent URL exists.
  // Remove en-SA/ar-SA hreflang entries for these paths.
  const SYRIA_ONLY_SERVICE_PATHS = new Set([
    "/services/civil-law",
    "/services/civil-procedure",
    "/services/criminal-procedure",
  ]);

  // When this page has a canonicalOverride for a Syria blog post, the Syria
  // hreflang entries should point to the new Syria slug, not the old SA slug.
  // Extract the blog path from the override URL (e.g. "/blog/new-syria-slug").
  const syriaOverrideBlogPath: string | null = (() => {
    const co = metaOverride?.canonicalOverride;
    if (!co) return null;
    const m = co.match(/^https:\/\/counselo-legal\.com\/syr(?:\/ar)?(\/blog\/.+)$/);
    return m ? m[1] : null;
  })();

  const rawTitle = metaOverride ? metaOverride.title : (isSyr ? syriafyText(title) : title);
  // Optimized meta titles are already final — never append a suffix to them.
  // For fallback (non-map) titles, append "| CounselO" only if not already present.
  const fullTitle = metaOverride
    ? rawTitle
    : (rawTitle.endsWith("| CounselO") ||
        rawTitle.endsWith("| كاونسلو") ||
        rawTitle.endsWith("كاونسلو")
          ? rawTitle
          : isArabic
            ? `${rawTitle} | كاونسلو`
            : `${rawTitle} | CounselO`);

  // Single-URL pages (noRegionPrefix=true, e.g. /blog, /blog/:slug) live at one
  // canonical URL shared by all regions and languages.  hreflang with per-region
  // alternates would point to non-existent (or redirect) URLs, which Google
  // penalises.  For these pages we emit no alternates and let x-default carry
  // the canonical — the correct approach for a single shared URL.
  //
  // All other pages have 4 real, distinct, crawlable region×language URLs so
  // hreflang correctly routes crawlers to matching-language content.
  const HREFLANG_COMBOS = [
    { region: "sa" as const, isArabic: false, hrefLang: GEO.sa.hrefLangEn },
    { region: "sa" as const, isArabic: true, hrefLang: GEO.sa.hrefLangAr },
    { region: "syr" as const, isArabic: false, hrefLang: GEO.syr.hrefLangEn },
    { region: "syr" as const, isArabic: true, hrefLang: GEO.syr.hrefLangAr },
  ];
  const absoluteUrl = (path: string) =>
    path.startsWith("http") ? path : `https://counselo-legal.com${path}`;
  const hreflangAlternates = sharedLanguageAlternates
    ? [
        { hrefLang: "en", href: absoluteUrl(sharedLanguageAlternates.en) },
        { hrefLang: "ar", href: absoluteUrl(sharedLanguageAlternates.ar) },
      ]
    : noRegionPrefix
      ? []
    : HREFLANG_COMBOS
        // Drop en-SA/ar-SA entries for services that have no Saudi equivalent.
        .filter((c) => !(c.region === "sa" && SYRIA_ONLY_SERVICE_PATHS.has(basePath)))
        .map((c) => {
          // Syria hreflang entries resolve to the correct Syria slug:
          // 1. canonicalOverride already carries the new slug (old-Syria-redirect pages).
          // 2. SA blog pages use SYRIA_BLOG_SLUG_MAP to cross-map the slug.
          // 3. All other pages share the same basePath across regions.
          let hrefPath = basePath;
          if (c.region === "syr" && syriaOverrideBlogPath) {
            hrefPath = syriaOverrideBlogPath;
          } else if (c.region === "syr" && basePath.startsWith("/blog/")) {
            const saSlug = basePath.replace("/blog/", "");
            const syrSlug = SYRIA_BLOG_SLUG_MAP[saSlug];
            if (syrSlug) hrefPath = `/blog/${syrSlug}`;
          }
          return {
            hrefLang: c.hrefLang,
            href: `https://counselo-legal.com${GEO[c.region].pathPrefix}${c.isArabic ? "/ar" : ""}${hrefPath}`,
          };
        });
  // x-default: region picker for normal pages; the canonical itself for single-URL pages.
  const xDefaultUrl = sharedLanguageAlternates
    ? absoluteUrl(sharedLanguageAlternates.xDefault ?? sharedLanguageAlternates.en)
    : noRegionPrefix
      ? canonicalUrl
      : "https://counselo-legal.com/";

  const ogImage = "https://counselo-legal.com/og-image.png";
  const locale = isArabic ? geo.ogLocaleAr : geo.ogLocaleEn;
  const alternateLocale = isArabic ? geo.ogLocaleEn : geo.ogLocaleAr;

  const defaultKeywordsEn =
    region === "sa"
      ? "online legal consultation Saudi Arabia, lawyer Saudi Arabia online, legal advice KSA, family law Saudi Arabia, commercial law KSA, employment law Saudi Arabia, real estate law Saudi Arabia, foreign investment lawyer KSA, administrative law Saudi Arabia, CounselO"
      : "online legal consultation Syria, lawyer Syria online, legal advice Syria, family law Syria, commercial law Syria, employment law Syria, real estate law Syria, foreign investment lawyer Syria, administrative law Syria, CounselO";

  const defaultKeywordsAr =
    region === "sa"
      ? "استشارة قانونية أونلاين السعودية, محامي أونلاين المملكة العربية السعودية, مشورة قانونية إلكترونية, قانون الأسرة السعودي, القانون التجاري السعودي, قانون العمل السعودي, القانون العقاري السعودي, استثمار أجنبي محامي, القانون الإداري السعودي, كاونسلو"
      : "استشارة قانونية أونلاين سوريا, محامي أونلاين سوريا, مشورة قانونية إلكترونية سوريا, قانون الأسرة السوري, القانون التجاري السوري, قانون العمل السوري, القانون العقاري السوري, كاونسلو";

  const rawKeywords = keywords ?? (isArabic ? defaultKeywordsAr : defaultKeywordsEn);

  const untrimmedDescription = metaOverride
    ? metaOverride.description
    : (isSyr ? syriafyText(description) : description);
  const finalDescription =
    untrimmedDescription.length <= 170
      ? untrimmedDescription
      : `${untrimmedDescription.slice(0, 167).replace(/\s+\S*$/, "").trimEnd()}…`;
  const finalKeywords = isSyr ? syriafyText(rawKeywords) : rawKeywords;

  // Apply syriafyObj for Syria pages, then patch any WebPage schema's name +
  // description with the overridden values so structured data stays in sync.
  const applyWebPagePatch = (s: object): object => {
    const typed = s as Record<string, unknown>;
    if (typed["@type"] === "WebPage") {
      return { ...typed, name: fullTitle, description: finalDescription };
    }
    return s;
  };

  const processSchema = (s: object): object => {
    const syrified = isSyr ? (syriafyObj(s) as object) : s;
    return metaOverride ? applyWebPagePatch(syrified) : syrified;
  };

  const finalSchema = schema
    ? (Array.isArray(schema) ? schema.map(processSchema) : processSchema(schema))
    : schema;
  const finalExtraSchemas = extraSchemas
    ? extraSchemas.map(processSchema)
    : extraSchemas;

  // All schemas to embed as JSON-LD. Rendered via Helmet <script> tags so
  // they are captured by renderToString during SSR prerendering.
  const schemas: object[] = [
    ...(finalSchema ? (Array.isArray(finalSchema) ? finalSchema : [finalSchema]) : []),
    ...(finalExtraSchemas ?? []),
  ];

  return (
    <Helmet>
      <html lang={effectiveLanguage} dir={isArabic ? "rtl" : "ltr"} />
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />

      {/* Region-independent pages must not inherit a misleading country target. */}
      {!noRegionPrefix && <meta name="geo.region" content={geo.region} />}
      {!noRegionPrefix && <meta name="geo.placename" content={geo.placename} />}
      {!noRegionPrefix && <meta name="geo.position" content={geo.position} />}
      {!noRegionPrefix && <meta name="ICBM" content={geo.icbm} />}
      <meta httpEquiv="content-language" content={effectiveLanguage} />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/*
        hreflang — all 4 region x language combinations, each a real,
        distinct URL (self-referencing entry included, as Google requires).
      */}
      {hreflangAlternates.map((a) => (
        <link key={a.hrefLang} rel="alternate" hrefLang={a.hrefLang} href={a.href} />
      ))}

      {/* hreflang — x-default (region picker) */}
      <link rel="alternate" hrefLang="x-default" href={xDefaultUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="CounselO كاونسلو" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={geo.imgAlt} />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content={alternateLocale} />

      {/* Author */}
      <meta name="author" content="CounselO — Lawyer and Legal Counsel Omar Al-Baghdadi" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@CounselOLegal" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={geo.imgAlt} />

      {/* Article-specific Open Graph (blog posts) */}
      {ogType === "article" && articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {ogType === "article" && articlePublishedTime && (
        <meta property="article:modified_time" content={articlePublishedTime} />
      )}
      {ogType === "article" && articleAuthor && (
        <meta property="article:author" content={articleAuthor} />
      )}
      {ogType === "article" && articleSection && (
        <meta property="article:section" content={articleSection} />
      )}

      {/*
        JSON-LD structured data schemas.
        Using Helmet <script> tags (not useEffect+DOM) ensures these are
        captured by renderToString and appear in prerendered HTML source,
        making them immediately readable by Googlebot and schema validators
        without JavaScript execution.
      */}
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {schemaJson(s)}
        </script>
      ))}
    </Helmet>
  );
}
