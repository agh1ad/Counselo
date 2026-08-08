import {
  getServicesForRegion,
  type Region,
  type ServiceDefinition,
} from "./region-services";

export type RegionalSeoLanguage = "en" | "ar";
export type RegionalSeoIntent =
  | "service"
  | "problem"
  | "procedure"
  | "audience"
  | "question"
  | "conversion";

export type RegionalSeoRegion = {
  region: Region;
  countryEn: string;
  countryAr: string;
  isoCountry: string;
  pathPrefix: `/${string}`;
  languages: readonly RegionalSeoLanguage[];
  hreflang: { en: string; ar: string };
  serviceSlugs: readonly string[];
  indexablePageTypes: readonly Exclude<RegionalSeoIntent, "conversion">[];
  conversionPageTypes: readonly ["conversion"];
};

/**
 * The jurisdiction-level SEO contract. Add a new region here first; routing,
 * service coverage, hreflang, and matrix validation can then consume the same
 * identity instead of maintaining parallel country lists.
 */
export const REGIONAL_SEO_REGISTRY: readonly RegionalSeoRegion[] = [
  {
    region: "sa",
    countryEn: "Saudi Arabia",
    countryAr: "السعودية",
    isoCountry: "SA",
    pathPrefix: "/sa",
    languages: ["en", "ar"],
    hreflang: { en: "en-SA", ar: "ar-SA" },
    serviceSlugs: getServicesForRegion("sa").map(({ slug }) => slug),
    indexablePageTypes: ["service", "problem", "procedure", "audience", "question"],
    conversionPageTypes: ["conversion"],
  },
  {
    region: "syr",
    countryEn: "Syria",
    countryAr: "سوريا",
    isoCountry: "SY",
    pathPrefix: "/syr",
    languages: ["en", "ar"],
    hreflang: { en: "en-SY", ar: "ar-SY" },
    serviceSlugs: getServicesForRegion("syr").map(({ slug }) => slug),
    indexablePageTypes: ["service", "problem", "procedure", "audience", "question"],
    conversionPageTypes: ["conversion"],
  },
  {
    region: "uae",
    countryEn: "United Arab Emirates",
    countryAr: "الإمارات العربية المتحدة",
    isoCountry: "AE",
    pathPrefix: "/uae",
    languages: ["en", "ar"],
    hreflang: { en: "en-AE", ar: "ar-AE" },
    serviceSlugs: getServicesForRegion("uae").map(({ slug }) => slug),
    indexablePageTypes: ["service", "problem", "procedure", "audience", "question"],
    conversionPageTypes: ["conversion"],
  },
] as const;

export type RegionalSeoIntentDefinition = {
  intent: RegionalSeoIntent;
  pageType: "landing" | "generated" | "editorial" | "funnel";
  indexable: boolean;
  contentRequirement: string;
  routePattern: string;
};

export const REGIONAL_SEO_INTENTS: readonly RegionalSeoIntentDefinition[] = [
  {
    intent: "service",
    pageType: "landing",
    indexable: true,
    contentRequirement: "Jurisdiction-specific service explanation, authority basis, FAQs, proof, and consultation CTA.",
    routePattern: "/{region}/services/{serviceSlug}",
  },
  {
    intent: "problem",
    pageType: "generated",
    indexable: true,
    contentRequirement: "A distinct legal problem with facts, documents, process, jurisdiction limits, FAQs, and related links.",
    routePattern: "/{region}/services/{serviceSlug}/{problemSlug}",
  },
  {
    intent: "procedure",
    pageType: "editorial",
    indexable: true,
    contentRequirement: "Current procedure or authority guide with source-backed steps, eligibility, documents, timing, and update date.",
    routePattern: "/blog/{procedureSlug}",
  },
  {
    intent: "audience",
    pageType: "editorial",
    indexable: true,
    contentRequirement: "Audience-specific guide for employees, founders, investors, families, landlords, or other validated segments.",
    routePattern: "/blog/{audienceSlug}",
  },
  {
    intent: "question",
    pageType: "editorial",
    indexable: true,
    contentRequirement: "One focused question answered for the jurisdiction, linked to the relevant service and consultation path.",
    routePattern: "/blog/{questionSlug}",
  },
  {
    intent: "conversion",
    pageType: "funnel",
    indexable: false,
    contentRequirement: "Prefilled consultation journey with region, service, source page, WhatsApp, phone, and form event attribution.",
    routePattern: "/{region}/contact?service={serviceSlug}",
  },
] as const;

export function getRegionalSeoRegion(region: Region): RegionalSeoRegion {
  const profile = REGIONAL_SEO_REGISTRY.find((entry) => entry.region === region);
  if (!profile) throw new Error(`No regional SEO profile registered for ${region}`);
  return profile;
}
export function getRegionalSeoServices(region: Region): ServiceDefinition[] {
  const profile = getRegionalSeoRegion(region);
  return getServicesForRegion(region).filter((service) => profile.serviceSlugs.includes(service.slug));
}

export function getRegionalSeoIntent(intent: RegionalSeoIntent): RegionalSeoIntentDefinition {
  const definition = REGIONAL_SEO_INTENTS.find((entry) => entry.intent === intent);
  if (!definition) throw new Error(`No regional SEO intent registered for ${intent}`);
  return definition;
}

export function regionalSeoRoutePrefix(region: Region, language: RegionalSeoLanguage = "en"): string {
  const prefix = getRegionalSeoRegion(region).pathPrefix;
  return language === "ar" ? `${prefix}/ar` : prefix;
}
