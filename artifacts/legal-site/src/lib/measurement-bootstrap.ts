import { ACQUISITION_SOURCES, deriveAcquisitionContext } from "@workspace/api-zod/browser";

// Fixed origins preserve GA4's search/referral classification without disclosing
// referring article paths, search queries or potentially identifying subdomains.
const REFERRAL_ORIGINS: Record<string, string> = {
  google: "https://www.google.com/", bing: "https://www.bing.com/",
  duckduckgo: "https://duckduckgo.com/", yahoo: "https://search.yahoo.com/",
  chatgpt: "https://chatgpt.com/", perplexity: "https://www.perplexity.ai/",
  claude: "https://claude.ai/", gemini: "https://gemini.google.com/",
  facebook: "https://www.facebook.com/", instagram: "https://www.instagram.com/",
  linkedin: "https://www.linkedin.com/",
};

export function measurementBootstrap(path: string, referrer: string, search: string) {
  const referral = deriveAcquisitionContext(path, referrer, "");
  const params = new URLSearchParams(search);
  const source = params.get("utm_source")?.toLowerCase();
  const medium = params.get("utm_medium")?.toLowerCase();
  const campaignSource = source && ACQUISITION_SOURCES.includes(source as typeof ACQUISITION_SOURCES[number])
    && !["direct", "external_referral"].includes(source) ? source : undefined;
  const campaignMedium = medium && ["organic", "referral", "social", "cpc", "ppc", "paid", "paid_social", "display", "email"].includes(medium) ? medium : undefined;
  return {
    counselo_page_location: `https://counselo-legal.com${referral?.landingPath ?? "/"}`,
    counselo_page_referrer: REFERRAL_ORIGINS[referral?.source ?? ""] ?? "",
    counselo_campaign_source: campaignSource,
    counselo_campaign_medium: campaignSource ? campaignMedium : undefined,
  };
}
