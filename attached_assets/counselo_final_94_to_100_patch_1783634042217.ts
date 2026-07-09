/**
 * CounselO final SEO verification patch.
 * Generated from counselo-seo-full-export-2.json on 2026-07-09.
 *
 * Current technical SEO export estimate: 94/100.
 * This is not a live Google or Lighthouse score; it is based on the uploaded SEO export.
 */

export const COUNSELO_FINAL_EXPORT_STATS = {
  "total_export_rows": 139,
  "page_rows": 127,
  "redirect_rows": 12,
  "unique_page_routes": 127,
  "duplicate_page_routes": 0,
  "duplicate_export_routes_including_redirects": 12,
  "missing_titles": 0,
  "missing_descriptions": 0,
  "titles_over_65": 0,
  "titles_over_60_minor": 4,
  "descriptions_over_160": 0,
  "descriptions_under_70": 0,
  "canonical_mismatches": 0,
  "og_twitter_mismatches": 0,
  "wrong_html_lang": 0,
  "wrong_html_dir": 0,
  "empty_hreflang": 0,
  "html_entities_in_meta": 0,
  "adlex_in_schema": 0,
  "old_qanuni_brand_in_schema": 0,
  "largest_claims_in_schema": 0,
  "aggregate_rating_schema": 0,
  "speakable_schema": 0,
  "search_action_schema": 0,
  "broken_hreflang_targets": 36,
  "old_syria_slug_hreflang_targets": 24,
  "syria_only_service_bad_sa_hreflang_targets": 12,
  "self_hreflang_missing": 0,
  "top_level_webpage_schema_mismatches": 4,
  "article_schema_mismatches": 0,
  "service_count_schema_issues": 0,
  "syria_content_schema_contamination_routes": 1,
  "invalid_self_redirect_rows": 12,
  "redirect_rows_duplicate_live_page_routes": 12,
  "keywords_over_300_chars": 8,
  "root_og_locale_mismatch_minor": 1
} as const;

/**
 * Current redirect rows in the export are self-redirects:
 * route === redirect target.
 *
 * Replace them with these source -> target redirects.
 */
export const COUNSELO_CORRECT_SYRIA_BLOG_REDIRECTS: Record<string, string> = {
  "/syr/blog/board-of-grievances-saudi-arabia": "https://counselo-legal.com/syr/blog/administrative-court-disputes-syria",
  "/syr/blog/child-custody-saudi-arabia": "https://counselo-legal.com/syr/blog/child-custody-syria",
  "/syr/blog/divorce-in-saudi-arabia": "https://counselo-legal.com/syr/blog/divorce-in-syria",
  "/syr/blog/foreign-company-registration-saudi-arabia": "https://counselo-legal.com/syr/blog/foreign-company-registration-syria",
  "/syr/blog/real-estate-disputes-saudi-arabia": "https://counselo-legal.com/syr/blog/real-estate-disputes-syria",
  "/syr/blog/wrongful-termination-saudi-labor-law": "https://counselo-legal.com/syr/blog/wrongful-termination-syrian-labor-law",
  "/syr/ar/blog/board-of-grievances-saudi-arabia": "https://counselo-legal.com/syr/ar/blog/administrative-court-disputes-syria",
  "/syr/ar/blog/child-custody-saudi-arabia": "https://counselo-legal.com/syr/ar/blog/child-custody-syria",
  "/syr/ar/blog/divorce-in-saudi-arabia": "https://counselo-legal.com/syr/ar/blog/divorce-in-syria",
  "/syr/ar/blog/foreign-company-registration-saudi-arabia": "https://counselo-legal.com/syr/ar/blog/foreign-company-registration-syria",
  "/syr/ar/blog/real-estate-disputes-saudi-arabia": "https://counselo-legal.com/syr/ar/blog/real-estate-disputes-syria",
  "/syr/ar/blog/wrongful-termination-saudi-labor-law": "https://counselo-legal.com/syr/ar/blog/wrongful-termination-syrian-labor-law"
};

/**
 * Fix hreflang for Saudi blog posts so they do not point to old/nonexistent Syria URLs.
 * Either:
 * A) Map to the new Syria slugs below, OR
 * B) Safer legal-SEO option: keep blog hreflang only within the same jurisdiction.
 */
export const COUNSELO_BLOG_HREFLANG_SLUG_MAP: Record<string, string> = {
  "board-of-grievances-saudi-arabia": "administrative-court-disputes-syria",
  "child-custody-saudi-arabia": "child-custody-syria",
  "divorce-in-saudi-arabia": "divorce-in-syria",
  "foreign-company-registration-saudi-arabia": "foreign-company-registration-syria",
  "real-estate-disputes-saudi-arabia": "real-estate-disputes-syria",
  "wrongful-termination-saudi-labor-law": "wrongful-termination-syrian-labor-law"
};

export const COUNSELO_MINOR_TITLE_PATCH: Record<string, string> = {
  "/sa/services/banking-finance": "Banking & Finance Consultation in Saudi Arabia",
  "/sa/services/foreign-investment": "Foreign Investment Consultation in Saudi Arabia",
  "/sa/services/intellectual-property": "IP Law Consultation in Saudi Arabia | CounselO",
  "/sa/services/medical-malpractice": "Medical Malpractice Consultation in Saudi Arabia"
};

export const COUNSELO_SCHEMA_TEXT_PATCH = {
  "/syr/blog/real-estate-disputes-syria": {
    "find": "Expert Saudi property law consultation with CounselO.",
    "replace": "Expert Syrian property law consultation with CounselO."
  }
} as const;

/**
 * Hreflang rule for Syria-only services:
 *
 * For these routes:
 * - /syr/services/civil-law
 * - /syr/ar/services/civil-law
 * - /syr/services/civil-procedure
 * - /syr/ar/services/civil-procedure
 * - /syr/services/criminal-procedure
 * - /syr/ar/services/criminal-procedure
 *
 * Remove en-SA and ar-SA hreflang entries because Saudi equivalents do not exist.
 * Keep only en-SY, ar-SY, and x-default.
 */

/**
 * Root page minor polish:
 * route "/" uses html_lang="en" and html_dir="ltr".
 * Set og_locale to "en_US" or make root Arabic if og_locale remains "ar_SA".
 */

/**
 * Meta keywords:
 * Google ignores meta keywords. For a cleaner 100/100 export, remove the keywords tag
 * or shorten the eight rows currently over 300 characters.
 */
