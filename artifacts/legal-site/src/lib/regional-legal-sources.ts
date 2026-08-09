import type { Region } from "@/contexts/RegionContext";
import { getUaeService } from "@/data/uae-legal-services";
import { getSaudiLegalSources, type LegalSource } from "@/lib/saudi-legal-sources";

export type { LegalSource } from "@/lib/saudi-legal-sources";

export const SYRIA_PRIMARY_SOURCES: LegalSource[] = [
  { en: "Syrian Ministry of Justice", ar: "وزارة العدل السورية", href: "https://moj.gov.sy/" },
  { en: "Syrian People's Assembly — official legislative website", ar: "مجلس الشعب السوري — الموقع التشريعي الرسمي", href: "https://www.parliament.gov.sy/" },
];

const SYRIA_SOURCES = {
  justice: SYRIA_PRIMARY_SOURCES[0],
  legislation: SYRIA_PRIMARY_SOURCES[1],
} as const;

export const SYRIA_SERVICE_SLUGS = [
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
  "civil-law",
  "civil-procedure",
  "criminal-procedure",
] as const;

export type SyriaServiceSlug = (typeof SYRIA_SERVICE_SLUGS)[number];

/**
 * The Syria service/source matrix is intentionally explicit. The available
 * official sources are different starting points by practice, even where a
 * practice needs both the legislative portal and the justice authority.
 */
export const SYRIA_SERVICE_SOURCES: Record<SyriaServiceSlug, LegalSource[]> = {
  "family-law": [SYRIA_SOURCES.justice, SYRIA_SOURCES.legislation],
  "business-law": [SYRIA_SOURCES.legislation, SYRIA_SOURCES.justice],
  "real-estate": [SYRIA_SOURCES.legislation, SYRIA_SOURCES.justice],
  "employment-law": [SYRIA_SOURCES.legislation, SYRIA_SOURCES.justice],
  "foreign-investment": [SYRIA_SOURCES.legislation, SYRIA_SOURCES.justice],
  "administrative-law": [SYRIA_SOURCES.justice, SYRIA_SOURCES.legislation],
  arbitration: [SYRIA_SOURCES.legislation, SYRIA_SOURCES.justice],
  enforcement: [SYRIA_SOURCES.justice, SYRIA_SOURCES.legislation],
  "companies-law": [SYRIA_SOURCES.legislation, SYRIA_SOURCES.justice],
  contracts: [SYRIA_SOURCES.legislation, SYRIA_SOURCES.justice],
  "criminal-law": [SYRIA_SOURCES.justice, SYRIA_SOURCES.legislation],
  "banking-finance": [SYRIA_SOURCES.legislation, SYRIA_SOURCES.justice],
  "intellectual-property": [SYRIA_SOURCES.legislation, SYRIA_SOURCES.justice],
  "tax-zakat": [SYRIA_SOURCES.legislation, SYRIA_SOURCES.justice],
  "cyber-law": [SYRIA_SOURCES.legislation, SYRIA_SOURCES.justice],
  "medical-malpractice": [SYRIA_SOURCES.justice, SYRIA_SOURCES.legislation],
  "insurance-law": [SYRIA_SOURCES.legislation, SYRIA_SOURCES.justice],
  "civil-law": [SYRIA_SOURCES.justice, SYRIA_SOURCES.legislation],
  "civil-procedure": [SYRIA_SOURCES.justice, SYRIA_SOURCES.legislation],
  "criminal-procedure": [SYRIA_SOURCES.justice, SYRIA_SOURCES.legislation],
};

export const UAE_LEGISLATION_SOURCE: LegalSource = {
  en: "UAE Legislation — official government legislation platform",
  ar: "تشريعات الإمارات — المنصة الرسمية للتشريعات الحكومية",
  href: "https://uaelegislation.gov.ae/",
};

export function getRegionalLegalSources(region: Region, serviceSlug: string): LegalSource[] {
  if (region === "sa") return getSaudiLegalSources(serviceSlug);
  if (region === "syr") return SYRIA_SERVICE_SOURCES[serviceSlug as SyriaServiceSlug] ?? [];
  const authority = getUaeService(serviceSlug)?.authority;
  return authority ? [authority] : [UAE_LEGISLATION_SOURCE];
}
