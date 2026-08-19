import fs from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "../../dist/public");
const PAGES = path.join(DIST, "__pages");
const BASE = "https://counselo-legal.com";

function decode(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function meta(html: string, attr: "name" | "property", key: string): string {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  for (const pattern of [
    new RegExp(`<meta\\b[^>]*\\b${attr}="${escaped}"[^>]*\\bcontent="([^"]*)"`, "i"),
    new RegExp(`<meta\\b[^>]*\\bcontent="([^"]*)"[^>]*\\b${attr}="${escaped}"`, "i"),
  ]) {
    const match = html.match(pattern);
    if (match) return decode(match[1]);
  }
  return "";
}

function tagText(html: string, tag: string): string[] {
  const values: string[] = [];
  const re = new RegExp(`<${tag}\\b[^>]*>(.*?)</${tag}>`, "gis");
  let match: RegExpExecArray | null;
  while ((match = re.exec(html)) !== null) {
    values.push(decode(match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()));
  }
  return values;
}

function canonical(html: string): string {
  return html.match(/<link\b[^>]*\brel="canonical"[^>]*\bhref="([^"]*)"/i)?.[1]
    ?? html.match(/<link\b[^>]*\bhref="([^"]*)"[^>]*\brel="canonical"/i)?.[1]
    ?? "";
}

function schemaTypes(html: string): Set<string> {
  const types = new Set<string>();
  for (const match of html.matchAll(/"@type"\s*:\s*"([^"]+)"/g)) types.add(match[1]);
  return types;
}

function countryToken(route: string, language: "ar" | "en"): string {
  if (language === "ar") return route.startsWith("/uae/") ? "الإمارات" : route.startsWith("/syr/") ? "سوريا" : "السعودية";
  return route.startsWith("/uae/") ? "the UAE" : route.startsWith("/syr/") ? "Syria" : "Saudi Arabia";
}

type ComponentScores = {
  queryRelevance: number;
  serpAppeal: number;
  technical: number;
  content: number;
  performanceProxy: number;
};

type PageScore = {
  route: string;
  language: "ar" | "en";
  score: number;
  components: ComponentScores;
  title: string;
  description: string;
  bytes: number;
  transferredBytes: number;
};

function topicTokens(value: string): Set<string> {
  const stop = new Set(["أو", "إلى", "التي", "الذي", "في", "على", "عن", "من", "و", "and", "for", "from", "in", "of", "or", "the", "to", "with"]);
  return new Set(value.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter((word) => word.length > 2 && !stop.has(word)));
}

function hasTopicOverlap(source: string, target: string): boolean {
  const sourceTokens = topicTokens(source);
  const targetTokens = topicTokens(target);
  return [...sourceTokens].filter((word) => targetTokens.has(word)).length >= Math.min(2, sourceTokens.size);
}

function scorePage(file: string): PageScore | null {
  const html = fs.readFileSync(file, "utf8");
  const route = meta(html, "property", "og:url").replace(BASE, "") || "/";
  const segments = route.split("/").filter(Boolean);
  const language: "ar" | "en" = /\/ar\//.test(route) ? "ar" : "en";
  if (!/^\/(?:sa|syr|uae)\/(?:ar\/)?services\//.test(route) || segments.length < (language === "ar" ? 5 : 4)) return null;

  const title = tagText(html, "title")[0] ?? "";
  const description = meta(html, "name", "description");
  const h1 = tagText(html, "h1");
  const h2 = tagText(html, "h2");
  const country = countryToken(route, language);
  const types = schemaTypes(html);
  const hrefLangCount = (html.match(/hrefLang="[^"]+"/g) ?? []).length;
  const internalLinks = new Set([...html.matchAll(/<a\b[^>]*\bhref="(\/[^"#?]*)/gi)].map((match) => match[1])).size;
  const htmlLangMatches = new RegExp(`<html\\b[^>]*\\blang="${language}"`, "i").test(html);
  const indexable = !/name="robots"[^>]*content="[^"]*noindex/i.test(html);
  const selfCanonical = canonical(html) === `${BASE}${route}`;

  let queryRelevance = 0;
  if (h1[0] && hasTopicOverlap(h1[0], title)) queryRelevance += 8;
  if (title.includes(country)) queryRelevance += 5;
  if (language === "ar" ? /استشارة|قانونية|أونلاين/.test(title) : /consultation|legal|online/i.test(`${title} ${description}`)) queryRelevance += 5;
  if ([...title].length >= 30 && [...title].length <= 70) queryRelevance += 4;
  if (language === "ar" ? /كاونسلو/.test(title) : /CounselO/.test(title)) queryRelevance += 3;

  let serpAppeal = 0;
  const descriptionLength = [...description].length;
  if (descriptionLength >= 100 && descriptionLength <= 165) serpAppeal += 6;
  else if (descriptionLength >= 80 && descriptionLength <= 170) serpAppeal += 4;
  if (h1[0] && hasTopicOverlap(h1[0], description)) serpAppeal += 7;
  if (description.includes(country)) serpAppeal += 3;
  if (language === "ar" ? /تحتاج|ابدأ|اطلب|راجع|هل تواجه|هل تبحث/.test(description) : /facing|start|get|request|review|need/i.test(description)) serpAppeal += 4;
  if (language === "ar" ? /أونلاين/.test(description) : /online/i.test(description)) serpAppeal += 2;
  if (language === "ar" ? /مستندات|خيارات|أدلة|إجراءات|تسوية|مراجعة|عمر البغدادي/.test(description) : /documents|options|evidence|procedure|settlement|review|Omar Al-Baghdadi/i.test(description)) serpAppeal += 3;

  let technical = 0;
  if (selfCanonical) technical += 5;
  if (meta(html, "property", "og:title") && meta(html, "property", "og:description")) technical += 4;
  if (hrefLangCount >= 3) technical += 5;
  if (htmlLangMatches) technical += 3;
  if (h1.length === 1) technical += 3;
  for (const type of ["WebPage", "LegalService", "FAQPage", "BreadcrumbList"]) {
    if (types.has(type)) technical += 2;
  }
  if (indexable) technical += 2;

  let content = 0;
  if (h2.length >= 4) content += 4;
  if (internalLinks >= 5) content += 3;
  if (language === "ar" ? (description.match(/[\u0600-\u06ff]/g) ?? []).length >= 60 : description.split(/\s+/).length >= 15) content += 3;

  const bytes = Buffer.byteLength(html);
  const transferredBytes = gzipSync(html, { level: 6 }).byteLength;
  const performanceProxy = transferredBytes <= 110_000 ? 10 : transferredBytes <= 140_000 ? 8 : transferredBytes <= 180_000 ? 6 : transferredBytes <= 240_000 ? 4 : 2;
  const components = { queryRelevance, serpAppeal, technical, content, performanceProxy };
  const score = Object.values(components).reduce((sum, value) => sum + value, 0);
  return { route, language, score, components, title, description, bytes, transferredBytes };
}

if (!fs.existsSync(PAGES)) {
  throw new Error(`Prerendered pages not found at ${PAGES}. Run the legal-site build first.`);
}

const pages = fs.readdirSync(PAGES)
  .filter((name) => name.endsWith(".html"))
  .map((name) => scorePage(path.join(PAGES, name)))
  .filter((page): page is PageScore => page !== null)
  .sort((a, b) => a.route.localeCompare(b.route));

if (pages.length === 0) throw new Error("No Arabic regional legal-problem pages were found.");

const average = Number((pages.reduce((sum, page) => sum + page.score, 0) / pages.length).toFixed(1));
const componentAverages = Object.fromEntries(
  (Object.keys(pages[0].components) as Array<keyof ComponentScores>).map((key) => [
    key,
    Number((pages.reduce((sum, page) => sum + page.components[key], 0) / pages.length).toFixed(1)),
  ]),
);
const distribution = {
  excellent_90_100: pages.filter((page) => page.score >= 90).length,
  strong_80_89: pages.filter((page) => page.score >= 80 && page.score < 90).length,
  needs_work_60_79: pages.filter((page) => page.score >= 60 && page.score < 80).length,
  weak_0_59: pages.filter((page) => page.score < 60).length,
};
const languageScores = Object.fromEntries((["ar", "en"] as const).map((language) => {
  const languagePages = pages.filter((page) => page.language === language);
  return [language, {
    pageCount: languagePages.length,
    score: Number((languagePages.reduce((sum, page) => sum + page.score, 0) / languagePages.length).toFixed(1)),
    perfectPages: languagePages.filter((page) => page.score === 100).length,
  }];
}));
const weakest = [...pages].sort((a, b) => a.score - b.score).slice(0, 20);
const report = {
  generatedAt: new Date().toISOString(),
  metric: "Bilingual legal-problem click readiness",
  disclaimer: "This 0-100 proxy measures controllable on-page readiness. It does not predict or report Google clicks.",
  primaryOutcomeRequired: "Google Search Console non-branded organic clicks segmented by language",
  pageCount: pages.length,
  score: average,
  languageScores,
  componentAverages,
  distribution,
  weakest,
};

fs.writeFileSync(path.join(DIST, "click-readiness-report.json"), `${JSON.stringify(report, null, 2)}\n`);
fs.writeFileSync(path.join(DIST, "click-readiness-report.md"), [
  "# CounselO Bilingual Click Readiness",
  "",
  `Generated: ${report.generatedAt}`,
  "",
  `Score: **${average}/100** across ${pages.length} English and Arabic legal-problem pages.`,
  "",
  `- Arabic: ${languageScores.ar.score}/100 across ${languageScores.ar.pageCount} pages`,
  `- English: ${languageScores.en.score}/100 across ${languageScores.en.pageCount} pages`,
  "",
  "> This is a controllable on-page proxy, not a prediction or report of Google clicks.",
  "",
  "## Component averages",
  "",
  ...Object.entries(componentAverages).map(([key, value]) => `- ${key}: ${value}`),
  "",
  "## Distribution",
  "",
  ...Object.entries(distribution).map(([key, value]) => `- ${key}: ${value}`),
  "",
  "## Weakest pages",
  "",
  ...weakest.map((page) => `- ${page.score}/100 — ${page.route}`),
  "",
].join("\n"));

console.log(`Bilingual legal-problem click readiness: ${average}/100 (${pages.length} pages)`);
console.log(JSON.stringify({ languageScores, componentAverages, distribution }, null, 2));
