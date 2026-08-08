import {
  getRegionalSeoRegion,
  getRegionalSeoServices,
  regionalSeoRoutePrefix,
  type RegionalSeoIntent,
  type Region,
} from "@workspace/api-zod";
import { getLegalProblemPages, legalProblemPath } from "./legal-problem-pages";

export type RegionalSeoMatrixRow = {
  region: Region;
  intent: RegionalSeoIntent;
  pageType: "service" | "problem" | "editorial" | "conversion";
  serviceSlug: string;
  slug: string;
  pathEn: string;
  pathAr: string;
  keywordEn: string;
  keywordAr: string;
  keywordVariantsEn: string[];
  keywordVariantsAr: string[];
  contentBrief: string;
  publishStatus: "live" | "planned" | "funnel";
};

const regionKeywordModifier = {
  sa: { en: "Saudi Arabia", ar: "السعودية" },
  syr: { en: "Syria", ar: "سوريا" },
  uae: { en: "UAE", ar: "الإمارات" },
} as const;

function serviceRows(region: Region): RegionalSeoMatrixRow[] {
  const profile = getRegionalSeoRegion(region);
  const modifier = regionKeywordModifier[region];
  return getRegionalSeoServices(region).flatMap((service) => {
    const pathEn = `${regionalSeoRoutePrefix(region)}/services/${service.slug}`;
    const pathAr = `${regionalSeoRoutePrefix(region, "ar")}/services/${service.slug}`;
    return [
      {
        region,
        intent: "service" as const,
        pageType: "service" as const,
        serviceSlug: service.slug,
        slug: service.slug,
        pathEn,
        pathAr,
        keywordEn: `${service.titleEn} lawyer in ${modifier.en}`,
        keywordAr: `${service.titleAr} في ${modifier.ar}`,
        keywordVariantsEn: [
          `${service.titleEn} legal advice ${modifier.en}`,
          `online ${service.titleEn} consultation ${modifier.en}`,
          `${service.titleEn} lawyer near me`,
        ],
        keywordVariantsAr: [
          `استشارة ${service.titleAr} ${modifier.ar}`,
          `محامي ${service.titleAr} أونلاين`,
          `محامي ${service.titleAr} قريب مني`,
        ],
        contentBrief: `Build the ${service.titleEn} service landing page for ${profile.countryEn}, including local legal basis, scope, documents, FAQs, proof, related services, and consultation CTA.`,
        publishStatus: "live" as const,
      },
      {
        region,
        intent: "conversion" as const,
        pageType: "conversion" as const,
        serviceSlug: service.slug,
        slug: service.slug,
        pathEn: `${regionalSeoRoutePrefix(region)}/contact?service=${service.slug}`,
        pathAr: `${regionalSeoRoutePrefix(region, "ar")}/contact?service=${service.slug}`,
        keywordEn: `${service.titleEn} legal consultation ${modifier.en}`,
        keywordAr: `استشارة ${service.titleAr} ${modifier.ar}`,
        keywordVariantsEn: [`${service.titleEn} consultation cost ${modifier.en}`, `urgent ${service.titleEn} lawyer ${modifier.en}`],
        keywordVariantsAr: [`تكلفة استشارة ${service.titleAr} ${modifier.ar}`, `محامي ${service.titleAr} عاجل ${modifier.ar}`],
        contentBrief: "Track consultation CTA, contact form submission, WhatsApp click, phone click, service prefill, and source route.",
        publishStatus: "funnel" as const,
      },
    ];
  });
}

function problemRows(region: Region): RegionalSeoMatrixRow[] {
  const modifier = regionKeywordModifier[region];
  return getLegalProblemPages(region).map((page) => ({
    region,
    intent: "problem" as const,
    pageType: "problem" as const,
    serviceSlug: page.parentServiceSlug,
    slug: page.slug,
    pathEn: legalProblemPath(region, "en", page.parentServiceSlug, page.slug),
    pathAr: legalProblemPath(region, "ar", page.parentServiceSlug, page.slug),
    keywordEn: `${page.titleEn} lawyer ${modifier.en}`,
    keywordAr: `${page.titleAr} محامي ${modifier.ar}`,
    keywordVariantsEn: page.searchVariantsEn,
    keywordVariantsAr: page.searchVariantsAr,
    contentBrief: `Answer the specific ${page.titleEn} problem in ${modifier.en}: facts, documents, process, jurisdiction limits, expected deliverables, FAQs, related service, and consultation CTA.`,
    publishStatus: "live" as const,
  }));
}

export function getRegionalSeoMatrix(region?: Region): RegionalSeoMatrixRow[] {
  const regions: Region[] = region ? [region] : ["sa", "syr", "uae"];
  return regions.flatMap((entry) => [...serviceRows(entry), ...problemRows(entry)]);
}

export function getRegionalSeoMatrixSummary(region?: Region) {
  const rows = getRegionalSeoMatrix(region);
  return {
    regions: [...new Set(rows.map((row) => row.region))],
    totalRows: rows.length,
    serviceRows: rows.filter((row) => row.intent === "service").length,
    problemRows: rows.filter((row) => row.intent === "problem").length,
    conversionRows: rows.filter((row) => row.intent === "conversion").length,
    englishUrls: rows.length,
    arabicUrls: rows.length,
  };
}
