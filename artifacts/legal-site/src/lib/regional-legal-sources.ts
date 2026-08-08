import type { Region } from "@/contexts/RegionContext";
import { getUaeService } from "@/data/uae-legal-services";
import { getSaudiLegalSources, type LegalSource } from "@/lib/saudi-legal-sources";

export type { LegalSource } from "@/lib/saudi-legal-sources";

export const SYRIA_PRIMARY_SOURCES: LegalSource[] = [
  { en: "Syrian Ministry of Justice", ar: "وزارة العدل السورية", href: "https://moj.gov.sy/" },
  { en: "Syrian People's Assembly — official legislative website", ar: "مجلس الشعب السوري — الموقع التشريعي الرسمي", href: "https://www.parliament.gov.sy/" },
];

export const UAE_LEGISLATION_SOURCE: LegalSource = {
  en: "UAE Legislation — official government legislation platform",
  ar: "تشريعات الإمارات — المنصة الرسمية للتشريعات الحكومية",
  href: "https://uaelegislation.gov.ae/",
};

export function getRegionalLegalSources(region: Region, serviceSlug: string): LegalSource[] {
  if (region === "sa") return getSaudiLegalSources(serviceSlug);
  if (region === "syr") return SYRIA_PRIMARY_SOURCES;
  const authority = getUaeService(serviceSlug)?.authority;
  return authority ? [authority] : [UAE_LEGISLATION_SOURCE];
}
