import type { Region } from "@workspace/api-zod/browser";
import { getLegalProblemPages, legalProblemPath } from "./legal-problem-pages";

import { SEARCH_INTENT_EDITORIAL, type SearchIntentEditorial } from "./search-intent-editorial-data";
export { SEARCH_INTENT_EDITORIAL, type SearchIntentEditorial } from "./search-intent-editorial-data";
type Faq = { q: string; a: string };

const UAE: Record<string, string> = {
  "employment-law": "employment-labour", "business-law": "corporate-commercial", "companies-law": "corporate-commercial",
  "real-estate": "real-estate-construction", "family-law": "family-personal-status", contracts: "commercial-contracts",
  enforcement: "enforcement-debt-recovery", "tax-zakat": "tax-vat", "cyber-law": "technology-data-protection",
  "medical-malpractice": "healthcare-medical-liability", "insurance-law": "insurance", "criminal-law": "criminal-investigations",
  "administrative-law": "administrative-regulatory",
};

export function editorialTarget(entry: SearchIntentEditorial, region: Region, ar: boolean): string {
  if (entry.shared === "library") return ar ? "/ar/legal-library" : "/legal-library";
  const prefix = `/${region}${ar ? "/ar" : ""}`;
  if (entry.shared === "home") return prefix;
  if (entry.shared === "contact") return `${prefix}/contact`;
  const service = region === "uae" ? UAE[entry.service!] ?? entry.service! : entry.service!;
  const problem = entry.problem && getLegalProblemPages(region, service).find(page => page.slug === entry.problem);
  return problem ? legalProblemPath(region, ar ? "ar" : "en", service, problem.slug) : `${prefix}/services/${service}`;
}

export function editorialFaqs(path: string, region: Region, ar: boolean): Faq[] {
  return SEARCH_INTENT_EDITORIAL.filter(entry => editorialTarget(entry, region, ar) === path).map(entry => entry[ar ? "ar" : "en"]);
}
