/**
 * Internal linking relationships for SEO.
 * Drives "Related Practice Areas", "Related Legal Guides", and
 * "Related Articles" sections on service and blog pages.
 */

/** Maps each service ID to its 3 most contextually related service IDs. */
export const RELATED_SERVICES: Record<string, string[]> = {
  "family-law":            ["real-estate", "criminal-law", "contracts"],
  "business-law":          ["companies-law", "contracts", "tax-zakat"],
  "real-estate":           ["contracts", "business-law", "administrative-law"],
  "employment-law":        ["criminal-law", "administrative-law", "contracts"],
  "foreign-investment":    ["business-law", "companies-law", "tax-zakat"],
  "administrative-law":    ["employment-law", "arbitration", "contracts"],
  "arbitration":           ["contracts", "enforcement", "business-law"],
  "enforcement":           ["arbitration", "contracts", "criminal-law"],
  "companies-law":         ["business-law", "contracts", "tax-zakat"],
  "contracts":             ["business-law", "employment-law", "real-estate"],
  "criminal-law":          ["employment-law", "cyber-law", "administrative-law"],
  "banking-finance":       ["business-law", "contracts", "tax-zakat"],
  "intellectual-property": ["business-law", "contracts", "cyber-law"],
  "tax-zakat":             ["business-law", "companies-law", "foreign-investment"],
  "cyber-law":             ["criminal-law", "intellectual-property", "contracts"],
  "medical-malpractice":   ["criminal-law", "insurance-law", "administrative-law"],
  "insurance-law":         ["medical-malpractice", "business-law", "contracts"],
};

/** Maps blog post category (English) to the canonical service page ID. */
export const BLOG_CATEGORY_TO_SERVICE: Record<string, string> = {
  "Family Law":           "family-law",
  "Employment Law":       "employment-law",
  "Foreign Investment":   "foreign-investment",
  "Administrative Law":   "administrative-law",
  "Real Estate Law":      "real-estate",
  "Commercial Law":       "business-law",
  "Business Law":         "business-law",
  "Criminal Law":         "criminal-law",
  "Banking & Finance":    "banking-finance",
  "Tax & Zakat":          "tax-zakat",
  "Intellectual Property":"intellectual-property",
  "Cyber Law":            "cyber-law",
  "Medical Malpractice":  "medical-malpractice",
  "Insurance Law":        "insurance-law",
  "Companies Law":        "companies-law",
  "Contracts":            "contracts",
  "Arbitration":          "arbitration",
};

/** Maps service ID to the blog post slugs most relevant to it. */
export const SERVICE_TO_BLOG_SLUGS: Record<string, string[]> = {
  "family-law":         ["divorce-in-saudi-arabia", "child-custody-saudi-arabia"],
  "employment-law":     ["wrongful-termination-saudi-labor-law"],
  "foreign-investment": ["foreign-company-registration-saudi-arabia"],
  "administrative-law": ["board-of-grievances-saudi-arabia"],
  "real-estate":        ["real-estate-disputes-saudi-arabia"],
};
