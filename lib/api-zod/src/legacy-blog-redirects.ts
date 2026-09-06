// Exact retained redirect contracts for removed legacy blog routes.
export const LEGACY_BLOG_REDIRECTS: Readonly<Record<string, string>> = {
  // Old region-prefixed blog index pages → language-split blog index
  "/sa/blog": "/blog",
  "/syr/blog": "/blog",
  "/uae/blog": "/blog",
  "/sa/ar/blog": "/blog/ar",
  "/syr/ar/blog": "/blog/ar",
  "/uae/ar/blog": "/blog/ar",
  "/ar/blog": "/blog/ar",

  // Old SA-region blog post slugs (both EN and AR) → blog index
  // (these posts are removed from the DB; redirect to /blog rather than 404)
  "/sa/blog/divorce-in-saudi-arabia": "/blog",
  "/sa/blog/wrongful-termination-saudi-labor-law": "/blog",
  "/sa/blog/foreign-company-registration-saudi-arabia": "/blog",
  "/sa/blog/board-of-grievances-saudi-arabia": "/blog",
  "/sa/blog/real-estate-disputes-saudi-arabia": "/blog",
  "/sa/blog/child-custody-saudi-arabia": "/blog",

  "/sa/ar/blog/divorce-in-saudi-arabia": "/blog/ar",
  "/sa/ar/blog/wrongful-termination-saudi-labor-law": "/blog/ar",
  "/sa/ar/blog/foreign-company-registration-saudi-arabia": "/blog/ar",
  "/sa/ar/blog/board-of-grievances-saudi-arabia": "/blog/ar",
  "/sa/ar/blog/real-estate-disputes-saudi-arabia": "/blog/ar",
  "/sa/ar/blog/child-custody-saudi-arabia": "/blog/ar",

  // Old SYR-region SA-named slugs → blog index (collapsed from two hops)
  "/syr/blog/divorce-in-saudi-arabia": "/blog",
  "/syr/blog/wrongful-termination-saudi-labor-law": "/blog",
  "/syr/blog/foreign-company-registration-saudi-arabia": "/blog",
  "/syr/blog/board-of-grievances-saudi-arabia": "/blog",
  "/syr/blog/real-estate-disputes-saudi-arabia": "/blog",
  "/syr/blog/child-custody-saudi-arabia": "/blog",

  "/syr/ar/blog/divorce-in-saudi-arabia": "/blog/ar",
  "/syr/ar/blog/wrongful-termination-saudi-labor-law": "/blog/ar",
  "/syr/ar/blog/foreign-company-registration-saudi-arabia": "/blog/ar",
  "/syr/ar/blog/board-of-grievances-saudi-arabia": "/blog/ar",
  "/syr/ar/blog/real-estate-disputes-saudi-arabia": "/blog/ar",
  "/syr/ar/blog/child-custody-saudi-arabia": "/blog/ar",

  // Old SYR-region Syria-named canonical slugs → blog index
  // (these static posts are also removed from DB)
  "/syr/blog/divorce-in-syria": "/blog",
  "/syr/blog/wrongful-termination-syrian-labor-law": "/blog",
  "/syr/blog/foreign-company-registration-syria": "/blog",
  "/syr/blog/administrative-court-disputes-syria": "/blog",
  "/syr/blog/real-estate-disputes-syria": "/blog",
  "/syr/blog/child-custody-syria": "/blog",

  "/syr/ar/blog/divorce-in-syria": "/blog/ar",
  "/syr/ar/blog/wrongful-termination-syrian-labor-law": "/blog/ar",
  "/syr/ar/blog/foreign-company-registration-syria": "/blog/ar",
  "/syr/ar/blog/administrative-court-disputes-syria": "/blog/ar",
  "/syr/ar/blog/real-estate-disputes-syria": "/blog/ar",
  "/syr/ar/blog/child-custody-syria": "/blog/ar",
};
