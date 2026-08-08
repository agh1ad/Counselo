export type LegalSource = { en: string; ar: string; href: string };

export const SAUDI_SERVICE_SLUGS = [
  "family-law",
  "business-law",
  "real-estate",
  "employment-law",
  "foreign-investment",
  "administrative-law",
  "arbitration",
  "enforcement",
  "companies-law",
  "contracts",
  "criminal-law",
  "banking-finance",
  "intellectual-property",
  "tax-zakat",
  "cyber-law",
  "medical-malpractice",
  "insurance-law",
] as const;

export type SaudiServiceSlug = (typeof SAUDI_SERVICE_SLUGS)[number];

export const BOE_SOURCE: LegalSource = {
  en: "Bureau of Experts — Official Saudi Laws Portal",
  ar: "هيئة الخبراء بمجلس الوزراء — بوابة الأنظمة السعودية",
  href: "https://laws.boe.gov.sa/",
};

export const SAUDI_SOURCES = {
  justice: { en: "Saudi Ministry of Justice", ar: "وزارة العدل السعودية", href: "https://www.moj.gov.sa/" },
  labor: { en: "Ministry of Human Resources and Social Development", ar: "وزارة الموارد البشرية والتنمية الاجتماعية", href: "https://www.hrsd.gov.sa/" },
  business: { en: "Saudi Ministry of Commerce", ar: "وزارة التجارة السعودية", href: "https://mc.gov.sa/" },
  investment: { en: "Saudi Ministry of Investment", ar: "وزارة الاستثمار السعودية", href: "https://misa.gov.sa/" },
  realEstate: { en: "Real Estate General Authority", ar: "الهيئة العامة للعقار", href: "https://rega.gov.sa/" },
  finance: { en: "Saudi Central Bank", ar: "البنك المركزي السعودي", href: "https://www.sama.gov.sa/" },
  intellectualProperty: { en: "Saudi Authority for Intellectual Property", ar: "الهيئة السعودية للملكية الفكرية", href: "https://www.saip.gov.sa/" },
  tax: { en: "Zakat, Tax and Customs Authority", ar: "هيئة الزكاة والضريبة والجمارك", href: "https://zatca.gov.sa/" },
  data: { en: "Saudi Data and AI Authority", ar: "الهيئة السعودية للبيانات والذكاء الاصطناعي", href: "https://sdaia.gov.sa/" },
  health: { en: "Saudi Ministry of Health", ar: "وزارة الصحة السعودية", href: "https://www.moh.gov.sa/" },
  insurance: { en: "Insurance Authority", ar: "هيئة التأمين", href: "https://www.ia.gov.sa/" },
  arbitration: { en: "Saudi Center for Commercial Arbitration", ar: "المركز السعودي للتحكيم التجاري", href: "https://sadr.org/" },
} satisfies Record<string, LegalSource>;

/**
 * The complete Saudi service/source matrix.
 *
 * Keep this map exhaustive: adding a public Saudi service slug requires a
 * corresponding source entry and therefore a source-review decision.
 */
export const SAUDI_SERVICE_SOURCES: Record<SaudiServiceSlug, LegalSource[]> = {
  "family-law": [SAUDI_SOURCES.justice, BOE_SOURCE],
  "business-law": [SAUDI_SOURCES.business, BOE_SOURCE],
  "real-estate": [SAUDI_SOURCES.realEstate, BOE_SOURCE],
  "employment-law": [SAUDI_SOURCES.labor, BOE_SOURCE],
  "foreign-investment": [SAUDI_SOURCES.investment, BOE_SOURCE],
  "administrative-law": [SAUDI_SOURCES.justice, BOE_SOURCE],
  arbitration: [SAUDI_SOURCES.arbitration, BOE_SOURCE],
  enforcement: [SAUDI_SOURCES.justice, BOE_SOURCE],
  "companies-law": [SAUDI_SOURCES.business, BOE_SOURCE],
  contracts: [SAUDI_SOURCES.business, BOE_SOURCE],
  "criminal-law": [SAUDI_SOURCES.justice, BOE_SOURCE],
  "banking-finance": [SAUDI_SOURCES.finance, BOE_SOURCE],
  "intellectual-property": [SAUDI_SOURCES.intellectualProperty, BOE_SOURCE],
  "tax-zakat": [SAUDI_SOURCES.tax, BOE_SOURCE],
  "cyber-law": [SAUDI_SOURCES.data, BOE_SOURCE],
  "medical-malpractice": [SAUDI_SOURCES.health, BOE_SOURCE],
  "insurance-law": [SAUDI_SOURCES.insurance, BOE_SOURCE],
};

export function getSaudiLegalSources(serviceSlug: string): LegalSource[] {
  return SAUDI_SERVICE_SOURCES[serviceSlug as SaudiServiceSlug] ?? [];
}
