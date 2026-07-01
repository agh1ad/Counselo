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

const SYR_TEXT_MAP: [RegExp, string][] = [
  [/Saudi Arabia/gi, "Syria"],
  [/\bKSA\b/g, "Syria"],
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
  [/المملكة العربية السعودية/g, "سوريا"],
  [/في المملكة\b/g, "في سوريا"],
  [/كاونسلو المملكة العربية السعودية/g, "كاونسلو سوريا"],
  [/ساما\b/g, "مصرف سوريا المركزي"],
  [/هيئة الزكاة والضريبة والجمارك/g, "هيئة الضرائب والرسوم"],
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
}: SEOHeadProps) {
  const { lang } = useLanguage();
  const { region } = useRegion();

  const geo = GEO[region];
  const isArabic = lang === "ar";
  const isSyr = region === "syr";

  const rawTitle = isSyr ? syriafyText(title) : title;
  const fullTitle =
    rawTitle.endsWith("| CounselO") ||
    rawTitle.endsWith("| كاونسلو") ||
    rawTitle.endsWith("كاونسلو")
      ? rawTitle
      : isArabic
        ? `${rawTitle} | كاونسلو`
        : `${rawTitle} | CounselO`;

  const basePath = canonical === "/" ? "" : canonical ?? "";
  const prefixedPath = `${geo.pathPrefix}${basePath}`;
  const canonicalUrl = `https://counselo.com${prefixedPath}`;

  const altRegion = region === "sa" ? "syr" : "sa";
  const altGeo = GEO[altRegion];
  const altCanonicalUrl = `https://counselo.com${altGeo.pathPrefix}${basePath}`;
  const xDefaultUrl = "https://counselo.com/";

  const ogImage = "https://counselo.com/opengraph.jpg";
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

  const finalDescription = isSyr ? syriafyText(description) : description;
  const finalKeywords = isSyr ? syriafyText(rawKeywords) : rawKeywords;
  const finalSchema = isSyr && schema
    ? (Array.isArray(schema) ? schema.map((s) => syriafyObj(s) as object) : syriafyObj(schema) as object)
    : schema;
  const finalExtraSchemas = isSyr && extraSchemas
    ? extraSchemas.map((s) => syriafyObj(s) as object)
    : extraSchemas;

  // All schemas to embed as JSON-LD. Rendered via Helmet <script> tags so
  // they are captured by renderToString during SSR prerendering.
  const schemas: object[] = [
    ...(finalSchema ? (Array.isArray(finalSchema) ? finalSchema : [finalSchema]) : []),
    ...(finalExtraSchemas ?? []),
  ];

  return (
    <Helmet>
      <html lang={lang} dir={isArabic ? "rtl" : "ltr"} />
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />

      {/* Geo-targeting — region-specific coordinates and country code */}
      <meta name="geo.region" content={geo.region} />
      <meta name="geo.placename" content={geo.placename} />
      <meta name="geo.position" content={geo.position} />
      <meta name="ICBM" content={geo.icbm} />
      <meta httpEquiv="content-language" content={isArabic ? lang : "en"} />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* hreflang — current region (both languages share same URL) */}
      <link rel="alternate" hrefLang={geo.hrefLangEn} href={canonicalUrl} />
      <link rel="alternate" hrefLang={geo.hrefLangAr} href={canonicalUrl} />

      {/* hreflang — alternate region */}
      <link rel="alternate" hrefLang={altGeo.hrefLangEn} href={altCanonicalUrl} />
      <link rel="alternate" hrefLang={altGeo.hrefLangAr} href={altCanonicalUrl} />

      {/* hreflang — x-default (region picker) */}
      <link rel="alternate" hrefLang="x-default" href={xDefaultUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="CounselO كاونسلو" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
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
