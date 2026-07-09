/**
 * CounselO final remaining SEO patch after latest full export.
 * Generated: 2026-07-09
 *
 * Latest export status:
 * - Metadata, hreflang, OG/Twitter: mostly fixed.
 * - Remaining blockers are old redirect routes + schema polish.
 */

export const COUNSELO_LATEST_AUDIT_STATS = {
  "total_rows": 139,
  "unique_routes": 139,
  "duplicate_route_rows": 0,
  "missing_titles": 0,
  "missing_descriptions": 0,
  "titles_over_65": 0,
  "descriptions_over_160": 0,
  "og_twitter_mismatches": 0,
  "og_url_mismatches": 0,
  "hreflang_empty_rows": 0,
  "canonical_route_mismatches_old_redirects": 12,
  "old_syria_saudi_slug_routes_still_rendering": 12,
  "root_lang_dir_mismatch": 1,
  "html_entities_in_visible_metadata": 3,
  "schema_adlex": 0,
  "schema_old_qanuni": 1,
  "aggregate_rating": 0,
  "speakable": 0,
  "search_action": 0,
  "webpage_schema_policy_mismatches": 8,
  "article_schema_missing_id_or_mainEntity": 36,
  "arabic_schema_wrong_language_url_routes": 4,
  "arabic_schema_wrong_language_url_pairs": 45,
  "arabic_breadcrumb_wrong_language_routes": 4,
  "offer_catalog_count_issues": 2,
  "home_serviceType_count_issues": 4,
  "syria_child_custody_schema_saudi_text_routes": 2,
  "syria_about_person_text_typo_routes": 2
} as const;

export const COUNSELO_OLD_SYRIA_ROUTES_TO_301_REDIRECT: Record<string, string> = {
  "/syr/blog/board-of-grievances-saudi-arabia": "/syr/blog/administrative-court-disputes-syria",
  "/syr/blog/child-custody-saudi-arabia": "/syr/blog/child-custody-syria",
  "/syr/blog/divorce-in-saudi-arabia": "/syr/blog/divorce-in-syria",
  "/syr/blog/foreign-company-registration-saudi-arabia": "/syr/blog/foreign-company-registration-syria",
  "/syr/blog/real-estate-disputes-saudi-arabia": "/syr/blog/real-estate-disputes-syria",
  "/syr/blog/wrongful-termination-saudi-labor-law": "/syr/blog/wrongful-termination-syrian-labor-law",
  "/syr/ar/blog/board-of-grievances-saudi-arabia": "/syr/ar/blog/administrative-court-disputes-syria",
  "/syr/ar/blog/child-custody-saudi-arabia": "/syr/ar/blog/child-custody-syria",
  "/syr/ar/blog/divorce-in-saudi-arabia": "/syr/ar/blog/divorce-in-syria",
  "/syr/ar/blog/foreign-company-registration-saudi-arabia": "/syr/ar/blog/foreign-company-registration-syria",
  "/syr/ar/blog/real-estate-disputes-saudi-arabia": "/syr/ar/blog/real-estate-disputes-syria",
  "/syr/ar/blog/wrongful-termination-saudi-labor-law": "/syr/ar/blog/wrongful-termination-syrian-labor-law"
};

/**
 * These routes should NOT render indexable pages anymore.
 * Return server-side HTTP 301 to target route.
 * Remove them from sitemap and from normal SEO export.
 */
export const COUNSELO_OLD_SYRIA_ROUTES_TO_REMOVE_FROM_SITEMAP = Object.keys(COUNSELO_OLD_SYRIA_ROUTES_TO_301_REDIRECT);

export const COUNSELO_POLICY_WEBPAGE_SCHEMA_FIX: Record<string, { url: string; "@id": string }> = {
  "/sa/terms-of-service": {
    "url": "https://counselo-legal.com/sa/terms-of-service",
    "@id": "https://counselo-legal.com/sa/terms-of-service#webpage"
  },
  "/sa/privacy-policy": {
    "url": "https://counselo-legal.com/sa/privacy-policy",
    "@id": "https://counselo-legal.com/sa/privacy-policy#webpage"
  },
  "/syr/terms-of-service": {
    "url": "https://counselo-legal.com/syr/terms-of-service",
    "@id": "https://counselo-legal.com/syr/terms-of-service#webpage"
  },
  "/syr/privacy-policy": {
    "url": "https://counselo-legal.com/syr/privacy-policy",
    "@id": "https://counselo-legal.com/syr/privacy-policy#webpage"
  },
  "/sa/ar/terms-of-service": {
    "url": "https://counselo-legal.com/sa/ar/terms-of-service",
    "@id": "https://counselo-legal.com/sa/ar/terms-of-service#webpage"
  },
  "/sa/ar/privacy-policy": {
    "url": "https://counselo-legal.com/sa/ar/privacy-policy",
    "@id": "https://counselo-legal.com/sa/ar/privacy-policy#webpage"
  },
  "/syr/ar/terms-of-service": {
    "url": "https://counselo-legal.com/syr/ar/terms-of-service",
    "@id": "https://counselo-legal.com/syr/ar/terms-of-service#webpage"
  },
  "/syr/ar/privacy-policy": {
    "url": "https://counselo-legal.com/syr/ar/privacy-policy",
    "@id": "https://counselo-legal.com/syr/ar/privacy-policy#webpage"
  }
};

export const COUNSELO_HOME_SERVICE_TYPE_FIX: Record<string, string[]> = {
  "/sa": [
    "Family Law",
    "Commercial Law",
    "Employment Law",
    "Real Estate Law",
    "Foreign Investment Law",
    "Administrative Law",
    "Criminal Law",
    "Banking & Finance Law",
    "Tax & Zakat Law",
    "Cyber Law",
    "Medical Malpractice",
    "Insurance Law",
    "Arbitration",
    "Enforcement Law",
    "Companies Law",
    "Contracts Law",
    "Intellectual Property"
  ],
  "/sa/ar": [
    "Family Law",
    "Commercial Law",
    "Employment Law",
    "Real Estate Law",
    "Foreign Investment Law",
    "Administrative Law",
    "Criminal Law",
    "Banking & Finance Law",
    "Tax & Zakat Law",
    "Cyber Law",
    "Medical Malpractice",
    "Insurance Law",
    "Arbitration",
    "Enforcement Law",
    "Companies Law",
    "Contracts Law",
    "Intellectual Property"
  ],
  "/syr": [
    "Family Law",
    "Commercial Law",
    "Civil Law",
    "Civil Procedure",
    "Employment Law",
    "Real Estate Law",
    "Foreign Investment Law",
    "Administrative Law",
    "Criminal Law",
    "Criminal Procedure",
    "Banking & Finance Law",
    "Tax Law",
    "Cyber Law",
    "Medical Malpractice",
    "Insurance Law",
    "Arbitration",
    "Enforcement Law",
    "Companies Law",
    "Contracts Law",
    "Intellectual Property"
  ],
  "/syr/ar": [
    "Family Law",
    "Commercial Law",
    "Civil Law",
    "Civil Procedure",
    "Employment Law",
    "Real Estate Law",
    "Foreign Investment Law",
    "Administrative Law",
    "Criminal Law",
    "Criminal Procedure",
    "Banking & Finance Law",
    "Tax Law",
    "Cyber Law",
    "Medical Malpractice",
    "Insurance Law",
    "Arbitration",
    "Enforcement Law",
    "Companies Law",
    "Contracts Law",
    "Intellectual Property"
  ]
};

export const COUNSELO_OFFER_CATALOG_COUNT_FIX: Record<string, number> = {
  "/sa": 17,
  "/sa/ar": 17,
  "/syr": 20,
  "/syr/ar": 20,
};

export const COUNSELO_TEXT_REPLACEMENTS_IN_SCHEMA: Record<string, string> = {
  "قانوني السعودية": "كاونسلو السعودية",
  "مدونة قانوني القانونية": "مدونة كاونسلو القانونية",
  "تعرف على كيفية بت المحاكم السعودية في قضايا الحضانة": "تعرف على كيفية نظر المحاكم السورية في قضايا الحضانة",
  "Senior advocate and legal counsel with 30+ years experience across Syria, UAE and Syria. Founder of CounselO.": "Senior advocate and legal counsel with 30+ years experience across Syria, Saudi Arabia and the UAE. Founder of CounselO.",
  "Saudi Arabia&#x27;s": "Saudi Arabia's",
  "CounselO Saudi Arabia&#x27;s": "CounselO Saudi Arabia's",
  "CounselO Syria&#x27;s": "CounselO Syria's"
};

/**
 * Arabic schema URL rules:
 *
 * /sa/ar/services:
 *   - ItemList.url must be https://counselo-legal.com/sa/ar/services
 *   - every itemListElement.url must use /sa/ar/services/...
 *   - breadcrumb Services item must be /sa/ar/services
 *
 * /syr/ar/services:
 *   - ItemList.url must be https://counselo-legal.com/syr/ar/services
 *   - every itemListElement.url must use /syr/ar/services/...
 *   - breadcrumb Services item must be /syr/ar/services
 *
 * /sa/ar/contact:
 *   - ContactPage.url and breadcrumb Contact item must be /sa/ar/contact
 *
 * /syr/ar/contact:
 *   - ContactPage.url and breadcrumb Contact item must be /syr/ar/contact
 */
export const COUNSELO_ARABIC_SCHEMA_URL_FIX_ROUTES = [
  "/sa/ar/services",
  "/syr/ar/services",
  "/sa/ar/contact",
  "/syr/ar/contact",
] as const;

/**
 * Article schema rule for all blog article routes:
 *
 * Add:
 *   @id: canonical + "#article"
 *   mainEntityOfPage: { "@id": canonical + "#webpage" }
 *
 * Also add WebPage schema for article pages if not already present:
 *   @id: canonical + "#webpage"
 *   url: canonical
 *   name: meta title
 *   description: meta description
 *   inLanguage: en-SA/ar-SA/en-SY/ar-SY
 */
export const COUNSELO_ARTICLE_SCHEMA_REQUIRED_FIELDS = {
  articleIdSuffix: "#article",
  webPageIdSuffix: "#webpage",
  requireMainEntityOfPage: true,
};

/**
 * Root page polish:
 * The current root export uses html_lang="ar" and html_dir="rtl" while title/description are English.
 * Recommended:
 *   html_lang="en"
 *   html_dir="ltr"
 * Or split root into a properly bilingual visible page with consistent primary language.
 */
export const COUNSELO_ROOT_HTML_ATTR_FIX = {
  route: "/",
  html_lang: "en",
  html_dir: "ltr",
};
