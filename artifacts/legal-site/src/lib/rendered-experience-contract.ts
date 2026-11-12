import { servicePageCopy } from "./experience-page-copy";
import { serviceLegalOverview } from "./service-legal-overviews";
import { BILINGUAL_SERVICE_COVERAGE } from "./service-intake-content";
import { alignSearchIntentCopy } from "./search-intent-copy";
import { qualifyProfessionalRoleCopy } from "./professional-role-scope";
import { qualifyEeatCopy } from "./eeat-scope";
import { saudiUrgentCopy } from "./urgent-legal-assistance";
import { en } from "../translations/en";
import { ar } from "../translations/ar";
import { enSyr } from "../translations/en-syr";
import { arSyr } from "../translations/ar-syr";
import { enUae } from "../translations/en-uae";
import { arUae } from "../translations/ar-uae";
import type { Region } from "@workspace/api-zod/browser";
import type { ExperienceCopy } from "../components/legal/service-experience";

const locales = { sa: { en, ar }, syr: { en: enSyr, ar: arSyr }, uae: { en: enUae, ar: arUae } };
const translations = new Map<string, typeof en>();

export function experienceStatements(copy: ExperienceCopy & { hero: string }): string[] {
  return [copy.hero, copy.heading, copy.introduction, copy.experience, copy.invitation,
    copy.coverageTitle, copy.coverageIntro, ...copy.coverage.flatMap(item => [item.title, item.text]),
    copy.contactTitle, copy.contactText].filter((value): value is string => Boolean(value));
}

/** Mirror the current public template's source selection, not retired FAQ layouts. */
export function regionalServiceStatements(region: Region, service: string, language: "en" | "ar"): string[] {
  if (service === "urgent-legal-assistance") {
    const copy = servicePageCopy(region, service, language, []);
    const urgent = saudiUrgentCopy[language];
    return [copy.hero, copy.heading, copy.introduction, copy.experience, urgent.scopeTitle, ...urgent.services.flat()];
  }
  const key = `${region}:${language}`;
  if (!translations.has(key)) translations.set(key, qualifyEeatCopy(qualifyProfessionalRoleCopy(alignSearchIntentCopy(locales[region][language], region, language))));
  const services = translations.get(key)!.serviceDetail.services;
  const data = services[service as keyof typeof services];
  if (!data) throw new Error(`Missing current service content: ${key}/${service}`);
  const safeJurisdiction = (value: string) => region === "uae"
    ? !/(Saudi|KSA|SAMA|ZATCA|MISA|SAIP|Vision 2030|Syria|Syrian|السعود|ساما|هيئة الزكاة|سوريا|السوري)/i.test(value)
    : region === "syr" ? !/(Saudi|KSA|SAMA|CMA|ZATCA|MISA|SAIP|CITC|Vision 2030|UAE|Emirates|DIFC|ADGM|السعود|ساما|هيئة الزكاة|الإمارات|مركز دبي المالي|أبوظبي العالمي)/i.test(value) : true;
  const covers = (region !== "uae" && BILINGUAL_SERVICE_COVERAGE[service] ? BILINGUAL_SERVICE_COVERAGE[service][language] : data.covers).filter(safeJurisdiction);
  return experienceStatements(servicePageCopy(region, service, language, covers, serviceLegalOverview(region, service, language)));
}
