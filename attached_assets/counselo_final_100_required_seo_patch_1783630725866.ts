/**
 * CounselO final SEO fixes needed before claiming 100/100.
 * Generated from counselo-seo-export-2.json on 2026-07-09.
 *
 * Current export score estimate: 72/100.
 *
 * Apply these fixes, then export again.
 */

export const COUNSELO_FINAL_AUDIT_STATS = {
  "rows": 139,
  "unique_routes": 127,
  "duplicate_routes": 12,
  "missing_titles": 0,
  "missing_descriptions": 0,
  "title_over_65": 3,
  "descriptions_over_160": 0,
  "html_entities_in_metadata_rows": 16,
  "og_twitter_mismatches": 0,
  "canonical_route_mismatches": 0,
  "empty_hreflang_rows": 139,
  "wrong_lang_attr_rows": 69,
  "wrong_dir_attr_rows": 139,
  "schema_adlex_routes": 12,
  "schema_old_qanuni_routes": 3,
  "unsupported_largest_claim_routes": 4,
  "aggregate_rating_routes": 86,
  "speakable_routes": 74,
  "invalid_search_action_routes": 1,
  "immigration_law_schema_routes": 4,
  "sa_offer_catalog_18_routes": 2,
  "syria_schema_saudi_phrases_routes": 12,
  "webpage_schema_url_id_mismatches": 86,
  "schema_wrong_language_url_pairs": 274,
  "breadcrumb_wrong_language_routes": 57
} as const;

export const COUNSELO_DUPLICATE_ROUTES_TO_DEDUPE = [
  "/syr/ar/blog/administrative-court-disputes-syria",
  "/syr/ar/blog/child-custody-syria",
  "/syr/ar/blog/divorce-in-syria",
  "/syr/ar/blog/foreign-company-registration-syria",
  "/syr/ar/blog/real-estate-disputes-syria",
  "/syr/ar/blog/wrongful-termination-syrian-labor-law",
  "/syr/blog/administrative-court-disputes-syria",
  "/syr/blog/child-custody-syria",
  "/syr/blog/divorce-in-syria",
  "/syr/blog/foreign-company-registration-syria",
  "/syr/blog/real-estate-disputes-syria",
  "/syr/blog/wrongful-termination-syrian-labor-law"
] as const;

export const COUNSELO_TITLE_PATCH: Record<string, string> = {
  "/": "CounselO | Online Legal Consultation in Saudi Arabia & Syria",
  "/sa/services/arbitration": "Arbitration Consultation in Saudi Arabia | CounselO",
  "/sa/services/enforcement": "Debt Collection Lawyer in Saudi Arabia | CounselO",
  "/syr/services/enforcement": "Debt Collection Consultation in Syria | CounselO"
};

export const COUNSELO_SCHEMA_TEXT_REPLACEMENTS: Record<string, string> = {
  "Adlex": "CounselO",
  "أدليكس": "كاونسلو",
  "مدونة قانوني القانونية": "مدونة كاونسلو القانونية",
  "قانوني السعودية": "كاونسلو السعودية",
  "Saudi Arabia's largest online legal consultation platform": "Saudi Arabia's specialized online legal consultation platform",
  "أكبر منصة للاستشارات القانونية الأونلاين في المملكة العربية السعودية": "منصة متخصصة للاستشارات القانونية الأونلاين في المملكة العربية السعودية",
  "أكبر منصة للاستشارات القانونية الأونلاين في المملكة": "منصة متخصصة للاستشارات القانونية الأونلاين في المملكة",
  "MISA License Guide": "Business Licensing Guide",
  "MISA license": "business licensing",
  "Saudi Labor Law": "Syrian Labor Law",
  "Saudi employment lawyer": "Syrian employment lawyer",
  "ترخيص مساند": "الترخيص التجاري",
  "نظام العمل السعودي": "قانون العمل السوري",
  "محامي عمل سعودي": "محامي عمل في سوريا"
};

export function getCounselOHtmlAttributes(route: string) {
  if (route === "/") return { lang: "en", dir: "ltr" };
  if (route.startsWith("/sa/ar")) return { lang: "ar", dir: "rtl" };
  if (route.startsWith("/syr/ar")) return { lang: "ar", dir: "rtl" };
  return { lang: "en", dir: "ltr" };
}

export function getCounselOHreflang(route: string) {
  const base = "https://counselo-legal.com";

  const common = ["/about", "/contact", "/privacy-policy", "/terms-of-service", "/services", "/blog"];
  const commonServices = [
    "/services/administrative-law",
    "/services/arbitration",
    "/services/banking-finance",
    "/services/business-law",
    "/services/companies-law",
    "/services/contracts",
    "/services/criminal-law",
    "/services/cyber-law",
    "/services/employment-law",
    "/services/enforcement",
    "/services/family-law",
    "/services/foreign-investment",
    "/services/insurance-law",
    "/services/intellectual-property",
    "/services/medical-malpractice",
    "/services/real-estate",
    "/services/tax-zakat",
  ];

  if (route === "/") {
    return {
      "en-SA": `${base}/sa`,
      "ar-SA": `${base}/sa/ar`,
      "en-SY": `${base}/syr`,
      "ar-SY": `${base}/syr/ar`,
      "x-default": `${base}/`,
    };
  }

  // Country home pages.
  if (route === "/sa" || route === "/sa/ar" || route === "/syr" || route === "/syr/ar") {
    return {
      "en-SA": `${base}/sa`,
      "ar-SA": `${base}/sa/ar`,
      "en-SY": `${base}/syr`,
      "ar-SY": `${base}/syr/ar`,
      "x-default": `${base}/`,
    };
  }

  // Shared structural pages and common service pages.
  for (const suffix of [...common, ...commonServices]) {
    if (route === `/sa${suffix}` || route === `/sa/ar${suffix}` || route === `/syr${suffix}` || route === `/syr/ar${suffix}`) {
      return {
        "en-SA": `${base}/sa${suffix}`,
        "ar-SA": `${base}/sa/ar${suffix}`,
        "en-SY": `${base}/syr${suffix}`,
        "ar-SY": `${base}/syr/ar${suffix}`,
        "x-default": `${base}/`,
      };
    }
  }

  // Syria-only services.
  const syriaOnlyServices = [
    "/services/civil-law",
    "/services/civil-procedure",
    "/services/criminal-procedure",
  ];
  for (const suffix of syriaOnlyServices) {
    if (route === `/syr${suffix}` || route === `/syr/ar${suffix}`) {
      return {
        "en-SY": `${base}/syr${suffix}`,
        "ar-SY": `${base}/syr/ar${suffix}`,
        "x-default": `${base}/syr${suffix}`,
      };
    }
  }

  // Blog posts: keep hreflang within the same jurisdiction unless there is a true regional equivalent.
  if (route.startsWith("/sa/blog/") || route.startsWith("/sa/ar/blog/")) {
    const slug = route.split("/blog/")[1];
    return {
      "en-SA": `${base}/sa/blog/${slug}`,
      "ar-SA": `${base}/sa/ar/blog/${slug}`,
      "x-default": `${base}/sa/blog/${slug}`,
    };
  }

  if (route.startsWith("/syr/blog/") || route.startsWith("/syr/ar/blog/")) {
    const slug = route.split("/blog/")[1];
    return {
      "en-SY": `${base}/syr/blog/${slug}`,
      "ar-SY": `${base}/syr/ar/blog/${slug}`,
      "x-default": `${base}/syr/blog/${slug}`,
    };
  }

  return {};
}

/**
 * Schema rules:
 *
 * 1. Remove aggregateRating everywhere unless the exact rating/review count is visible on the same page.
 * 2. Remove speakable from normal service pages unless the page actually qualifies and selectors exist.
 * 3. Remove WebSite SearchAction unless /search?q= exists.
 * 4. Remove "Immigration Law" from Saudi serviceType unless a real immigration page exists.
 * 5. Saudi OfferCatalog numberOfItems must be 17, not 18.
 * 6. For every WebPage schema:
 *    @id = canonical + "#webpage"
 *    url = canonical
 *    inLanguage = en-SA / ar-SA / en-SY / ar-SY
 * 7. For every Article schema:
 *    @id = canonical + "#article"
 *    mainEntityOfPage = { "@id": canonical + "#webpage" }
 *    headline and description must match the page topic and must not contain Adlex/أدليكس.
 * 8. For Arabic pages, all schema URLs and breadcrumb URLs must use the /ar route, not the English route.
 */
