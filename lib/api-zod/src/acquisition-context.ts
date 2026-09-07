/** A coarse acquisition record: never a raw URL, query, referrer or user text. */
export const ACQUISITION_SOURCES = ["direct", "google", "bing", "duckduckgo", "yahoo", "chatgpt", "perplexity", "claude", "gemini", "facebook", "instagram", "linkedin", "external_referral", "campaign"] as const;
export type AcquisitionSource = typeof ACQUISITION_SOURCES[number];
export interface AcquisitionContext {
  version: 1;
  landingPath: string;
  source: AcquisitionSource;
  medium: "direct" | "organic" | "ai_referral" | "referral" | "social" | "paid" | "email";
}

export function publicMeasurementPath(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const path = value.split(/[?#]/, 1)[0];
  if (path.length > 250 || !/^\/(?:[a-z0-9-]+\/?)*$/.test(path)) return undefined;
  if (/^\/(?:api|counselo-admin)(?:\/|$)/.test(path)) return undefined;
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

export function sanitizeAcquisitionContext(value: unknown): AcquisitionContext | undefined {
  if (!value || typeof value !== "object") return undefined;
  const input = value as Record<string, unknown>;
  const landingPath = publicMeasurementPath(input.landingPath);
  if (!landingPath || input.version !== 1 || !ACQUISITION_SOURCES.includes(input.source as AcquisitionSource)) return undefined;
  const media = ["direct", "organic", "ai_referral", "referral", "social", "paid", "email"] as const;
  if (!media.includes(input.medium as typeof media[number])) return undefined;
  return { version: 1, landingPath, source: input.source as AcquisitionSource, medium: input.medium as AcquisitionContext["medium"] };
}

export function deriveAcquisitionContext(path: string, referrer: string, search: string): AcquisitionContext | undefined {
  const landingPath = publicMeasurementPath(path);
  if (!landingPath) return undefined;
  let host = "";
  host = referrer.match(/^https?:\/\/([a-z0-9.-]+)(?::[0-9]+)?(?:[/?#]|$)/i)?.[1]?.toLowerCase() ?? "";
  const match = (domain: string) => host === domain || host.endsWith(`.${domain}`);
  let source: AcquisitionSource = !host || match("counselo-legal.com") ? "direct" : "external_referral";
  let medium: AcquisitionContext["medium"] = source === "direct" ? "direct" : "referral";
  for (const [domain, name, category] of [
    ["google.com", "google", "organic"], ["bing.com", "bing", "organic"], ["duckduckgo.com", "duckduckgo", "organic"], ["yahoo.com", "yahoo", "organic"],
    ["chatgpt.com", "chatgpt", "ai_referral"], ["chat.openai.com", "chatgpt", "ai_referral"], ["perplexity.ai", "perplexity", "ai_referral"], ["claude.ai", "claude", "ai_referral"], ["gemini.google.com", "gemini", "ai_referral"],
    ["facebook.com", "facebook", "social"], ["instagram.com", "instagram", "social"], ["linkedin.com", "linkedin", "social"],
  ] as const) if (match(domain)) { source = name; medium = category; }
  const parameter = (key: string): string | undefined => {
    const entry = search.replace(/^\?/, "").split("&").find((value) => value.startsWith(`${key}=`));
    if (!entry) return undefined;
    try { return decodeURIComponent(entry.slice(key.length + 1).replace(/\+/g, " ")).toLowerCase(); } catch { return undefined; }
  };
  const campaignSource = parameter("utm_source");
  // Only known source names and coarse media survive. Arbitrary campaign names,
  // terms, click IDs, full referrers and search queries are deliberately omitted.
  if (campaignSource && ACQUISITION_SOURCES.includes(campaignSource as AcquisitionSource)) source = campaignSource as AcquisitionSource;
  if (["chatgpt", "perplexity", "claude", "gemini"].includes(source)) medium = "ai_referral";
  else if (["google", "bing", "duckduckgo", "yahoo"].includes(source) && medium === "direct") medium = "organic";
  else if (["facebook", "instagram", "linkedin"].includes(source)) medium = "social";
  const campaignMedium = parameter("utm_medium");
  if (["cpc", "ppc", "paid", "paid_social", "display"].includes(campaignMedium ?? "")) medium = "paid";
  else if (campaignMedium === "email") medium = "email";
  return { version: 1, landingPath, source, medium };
}
