import { useEffect, useRef } from "react";
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
  [/قانوني المملكة العربية السعودية/g, "قانوني سوريا"],
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
      else if (k === "telephone" && typeof v === "string" && v.startsWith("+966")) out[k] = "+963114000000";
      else if (k === "addressLocality" && v === "Jubail") out[k] = "Hama";
      else if (k === "addressRegion" && v === "Eastern Province") out[k] = "Hama Governorate";
      else out[k] = syriafyObj(v);
    }
    return out;
  }
  return val;
}

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  schema?: object | object[];
  extraSchemas?: object[];
  ogType?: string;
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
}: SEOHeadProps) {
  const { lang } = useLanguage();
  const { region } = useRegion();
  const injectedRef = useRef<HTMLScriptElement[]>([]);

  const geo = GEO[region];
  const isArabic = lang === "ar";

  const fullTitle =
    title.endsWith("| CounselO") ||
    title.endsWith("| كاونسلو") ||
    title.endsWith("كاونسلو")
      ? title
      : isArabic
        ? `${title} | كاونسلو`
        : `${title} | CounselO`;

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

  const isSyr = region === "syr";
  const finalDescription = isSyr ? syriafyText(description) : description;
  const finalKeywords = isSyr ? syriafyText(rawKeywords) : rawKeywords;
  const finalSchema = isSyr && schema
    ? (Array.isArray(schema) ? schema.map((s) => syriafyObj(s) as object) : syriafyObj(schema) as object)
    : schema;
  const finalExtraSchemas = isSyr && extraSchemas
    ? extraSchemas.map((s) => syriafyObj(s) as object)
    : extraSchemas;

  useEffect(() => {
    const schemas: object[] = [
      ...(finalSchema ? (Array.isArray(finalSchema) ? finalSchema : [finalSchema]) : []),
      ...(finalExtraSchemas ?? []),
    ];

    const prev = injectedRef.current;
    prev.forEach((el) => el.parentNode?.removeChild(el));
    injectedRef.current = [];

    schemas.forEach((s) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.textContent = JSON.stringify(s);
      document.head.appendChild(el);
      injectedRef.current.push(el);
    });

    return () => {
      injectedRef.current.forEach((el) => el.parentNode?.removeChild(el));
      injectedRef.current = [];
    };
  }, [finalSchema, finalExtraSchemas]);

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

      {/* Geo-targeting */}
      <meta name="geo.region" content={geo.region} />
      <meta name="geo.placename" content={geo.placename} />
      <meta name="geo.position" content={geo.position} />
      <meta name="ICBM" content={geo.icbm} />
      <meta
        httpEquiv="content-language"
        content={isArabic ? lang : "en"}
      />

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

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@CounselOLegal" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={geo.imgAlt} />
    </Helmet>
  );
}
