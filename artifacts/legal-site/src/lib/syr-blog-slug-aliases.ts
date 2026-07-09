/**
 * Syria blog slug alias maps.
 *
 * The database stores blog posts using Saudi-worded slugs (e.g.
 * "board-of-grievances-saudi-arabia"). Syria blog posts are being migrated to
 * Syria-specific canonical URLs (e.g. "administrative-court-disputes-syria").
 *
 * SYR_BLOG_SLUG_TO_DB_SLUG: new Syria slug → original database slug (for fetching)
 * SYR_DB_SLUG_TO_NEW_SLUG:  old SA-worded slug → new Syria slug (for redirects)
 */
export const SYR_BLOG_SLUG_TO_DB_SLUG: Record<string, string> = {
  "administrative-court-disputes-syria": "board-of-grievances-saudi-arabia",
  "child-custody-syria": "child-custody-saudi-arabia",
  "divorce-in-syria": "divorce-in-saudi-arabia",
  "foreign-company-registration-syria": "foreign-company-registration-saudi-arabia",
  "real-estate-disputes-syria": "real-estate-disputes-saudi-arabia",
  "wrongful-termination-syrian-labor-law": "wrongful-termination-saudi-labor-law",
};

export const SYR_DB_SLUG_TO_NEW_SLUG: Record<string, string> = {
  "board-of-grievances-saudi-arabia": "administrative-court-disputes-syria",
  "child-custody-saudi-arabia": "child-custody-syria",
  "divorce-in-saudi-arabia": "divorce-in-syria",
  "foreign-company-registration-saudi-arabia": "foreign-company-registration-syria",
  "real-estate-disputes-saudi-arabia": "real-estate-disputes-syria",
  "wrongful-termination-saudi-labor-law": "wrongful-termination-syrian-labor-law",
};
