import { sourceBackedSearchGuidance } from "./source-backed-search-guidance";
import type { Region } from "@workspace/api-zod/browser";
import type { LegalSource } from "./regional-legal-sources";

// Specific text records checked on 11 September 2026. A record identifies a
// legislative starting point, not certification that it consolidates all amendments.
const family: LegalSource = {
  en: "Bureau of Experts — Personal Status Law", ar: "هيئة الخبراء — نظام الأحوال الشخصية",
  href: "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/4d72d829-947b-45d5-b9b5-ae5800d6bac2/1",
};
const arbitration: LegalSource = {
  en: "Bureau of Experts — Arbitration Law", ar: "هيئة الخبراء — نظام التحكيم",
  href: "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/5535039e-13da-43f6-8f53-a9a700f26485/1",
};
const civil: LegalSource = {
  en: "Bureau of Experts — Civil Transactions Law", ar: "هيئة الخبراء — نظام المعاملات المدنية",
  href: "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/655fdb42-8c96-422b-b8c4-b04f0095c94c/1",
};
const companies: LegalSource = {
  en: "Bureau of Experts — Companies Law", ar: "هيئة الخبراء — نظام الشركات",
  href: "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/a8376aea-1bc3-49d4-9027-aed900b555af/1",
};
const trade: LegalSource = {
  en: "ILO NATLEX — Syrian Trade Law 33/2007 (legislative record)", ar: "منظمة العمل الدولية — قانون التجارة السوري 33 لعام 2007 (سجل تشريعي)",
  href: "https://natlex.ilo.org/dyn/natlex2/r/natlex/fe/details?p3_isn=78618",
};
const labour: LegalSource = {
  en: "ILO NATLEX — Syrian Labor Law 17/2010 and listed amendments", ar: "منظمة العمل الدولية — قانون العمل السوري 17 لعام 2010 والتعديلات المدرجة",
  href: "https://natlex.ilo.org/dyn/natlex2/r/natlex/fe/details?p3_isn=84492",
};
export function serviceFrameworkSources(region: Region, service: string): LegalSource[] {
  const sources: Partial<Record<Region, Record<string, LegalSource[]>>> = {
    sa: { "family-law": [family], arbitration: [arbitration], contracts: [civil], "business-law": [civil], "companies-law": [companies], "foreign-investment": [companies] },
    syr: { "business-law": [trade], "employment-law": [labour] },
  };
  const linkedAnswers = sourceBackedSearchGuidance(region, service).flatMap(item => item.sources);
  // Keep original descriptive labels: an authority explanation is not relabelled
  // as a statute. Prefer named legal texts, then show the service's guidance.
  const legalTexts = linkedAnswers.filter(source => /law|regulation|code|standards|convention/i.test(source.en));
  return [...new Map([
    ...(sources[region]?.[service] ?? []), ...legalTexts, ...linkedAnswers,
  ].map(source => [source.href, source])).values()].slice(0, 4);
}
