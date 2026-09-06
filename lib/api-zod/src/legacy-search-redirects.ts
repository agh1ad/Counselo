// Historical malformed and cross-template URLs observed in Google Search Console on 2026-09-06.
// Explicit destinations retain language and jurisdiction. Unknown URLs still return 404.
export const LEGACY_SEARCH_REDIRECTS: Readonly<Record<string, string>> = {
  "/sa/services/enforcement/execution-of-a-syrian-court-judgment": "/sa/services/enforcement/foreign-judgment-enforcement",
  "/sa/services/criminal-procedure/evidence-challenge-in-criminal-case": "/sa/services/criminal-law/digital-and-documentary-evidence",
  "/sa/services/civil-law/property-and-possession-disputes": "/sa/services/real-estate/property-ownership-disputes",
  "/sa/ar/services/criminal-procedure/trial-procedure": "/sa/ar/services/criminal-law/trial-and-appeal-preparation",
  "/sa/ar/services/companies-law/company-registration-and-amendment-dispute": "/sa/ar/services/companies-law/company-formation-and-restructuring",
  "/syr/services/employment-law/sick-leave-and-annual-leave-entitlement-dispute": "/syr/services/employment-law",
  "/sa/services/medical-malpractice/medical-record-access-and-expert-evidence-dispute": "/sa/services/medical-malpractice/medical-record-access-dispute",
  "/sa/ar/services/enforcement/execution-of-a-syrian-court-judgment": "/sa/ar/services/enforcement/foreign-judgment-enforcement",
  "/sa/ar/services/medical-malpractice/medical-record-access-and-expert-evidence-dispute": "/sa/ar/services/medical-malpractice/medical-record-access-dispute",
  "/sa/services/foreign-investment/foreign-investor-licensing-and-registration-problem": "/sa/services/foreign-investment/investment-and-business-licensing",
  "/sa/ar/services/family-law/family-status-document-or-civil-record-correction": "/sa/ar/services/family-law/marital-status-document-and-record-correction",
  "/syr/services/criminal-law/forgery-and-false-document-accusation": "/syr/services/criminal-law/criminal-complaints-and-defence",
  "/syr/services/criminal-law/public-prosecution-investigation-and-questioning": "/syr/services/criminal-law/investigation-and-questioning",
  "/sa/ar/ar/services/real-estate/eviction-notice-and-eviction-dispute": "/sa/ar/services/real-estate/eviction-notice-and-eviction-dispute",
  "/sa/ar/ar/services/criminal-law/arrest-and-detention-concerns": "/sa/ar/services/criminal-law/arrest-and-detention-concerns",
  "/syr/ar/ar/services/civil-procedure/evidence-and-procedural-objections": "/syr/ar/services/civil-procedure/evidence-and-procedural-objections",
  "/uae/ar/ar/services/arbitration-mediation/missing-or-inconsistent-records-concerning-arbitration-clauses-and-jurisdiction": "/uae/ar/services/arbitration-mediation",
  "/syr/ar/ar/services/medical-malpractice/misdiagnosis-and-delayed-diagnosis": "/syr/ar/services/medical-malpractice/misdiagnosis-and-delayed-diagnosis",
  "/sa/ar/ar/services/tax-zakat/tax-audit-and-assessment-objection": "/sa/ar/services/tax-zakat/tax-audit-and-assessment-objection"
};
