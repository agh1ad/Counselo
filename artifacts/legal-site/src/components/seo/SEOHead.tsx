import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  schema?: object | object[];
  extraSchemas?: object[];
  ogType?: string;
}

export function SEOHead({ title, description, canonical, keywords, schema, extraSchemas, ogType = "website" }: SEOHeadProps) {
  const { lang } = useLanguage();
  const injectedRef = useRef<HTMLScriptElement[]>([]);

  const isArabic = lang === "ar";
  const locale = isArabic ? "ar_SA" : "en_US";
  const alternateLocale = isArabic ? "en_US" : "ar_SA";

  const fullTitle = title.endsWith("| Qanoni") || title.endsWith("| قانوني") || title.endsWith("قانوني")
    ? title
    : isArabic
      ? `${title} | قانوني`
      : `${title} | Qanoni`;

  const canonicalUrl = canonical ? `https://qanoni.com${canonical}` : "https://qanoni.com";
  const ogImage = "https://qanoni.com/opengraph.jpg";

  const defaultKeywordsEn = "online legal consultation Saudi Arabia, lawyer Saudi Arabia online, legal advice KSA, family law Saudi Arabia, commercial law KSA, employment law Saudi Arabia, real estate law Saudi Arabia, foreign investment lawyer KSA, administrative law Saudi Arabia, Qanoni";
  const defaultKeywordsAr = "استشارة قانونية أونلاين السعودية, محامي أونلاين المملكة العربية السعودية, مشورة قانونية إلكترونية, قانون الأسرة السعودي, القانون التجاري السعودي, قانون العمل السعودي, القانون العقاري السعودي, استثمار أجنبي محامي, القانون الإداري السعودي, قانوني";
  const finalKeywords = keywords ?? (isArabic ? defaultKeywordsAr : defaultKeywordsEn);

  useEffect(() => {
    const schemas: object[] = [
      ...(schema ? (Array.isArray(schema) ? schema : [schema]) : []),
      ...(extraSchemas ?? []),
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
  }, [schema, extraSchemas]);

  return (
    <Helmet>
      <html lang={lang} dir={isArabic ? "rtl" : "ltr"} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* Canonical + hreflang */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      <link rel="alternate" hrefLang="ar" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Qanoni قانوني" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Qanoni — Online Legal Consultation Saudi Arabia" />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content={alternateLocale} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content="Qanoni — Online Legal Consultation Saudi Arabia" />
    </Helmet>
  );
}
