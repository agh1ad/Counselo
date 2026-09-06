import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { SEARCH_INTENT_EDITORIAL, editorialTarget } from "../lib/search-intent-editorial";
import { UAE_SERVICES } from "../data/uae-legal-services";
import { buildUaeServicePageContent } from "../data/uae-service-page-content";
import { LEGAL_PROBLEM_PAGES, LEGAL_PROBLEM_REDIRECTS, legalProblemPath } from "../lib/legal-problem-pages";
import { getMatterEditorial } from "../lib/matter-editorial";
import { getMatterIntentBrief } from "../lib/matter-intent-briefs/index";
import { getServicesForRegion } from "@workspace/api-zod/browser";
import { serviceTopicFaq } from "../lib/service-topic-faqs";

const root = resolve(import.meta.dirname, "../../../..");
const site = resolve(root, "artifacts/legal-site");
const report = JSON.parse(readFileSync(resolve(site, "seo-validation-report.json"), "utf8"));
const assessments = new Map<string, { status: string; evidenceFile: string }>();
for (const family of ["matter", "service", "core", "article", "work"]) {
  const evidenceFile = `docs/${family}-editorial-assessment-2026-09-06.json`;
  if (!existsSync(resolve(root, evidenceFile))) continue;
  const assessment = JSON.parse(readFileSync(resolve(root, evidenceFile), "utf8"));
  for (const row of assessment.pages ?? assessment.assessments ?? []) {
    const routes = row.routes ?? (row.route ? [row.route] : family === "work" ? [`/our-work/${row.slug}`, `/ar/our-work/${row.slug}`] : []);
    for (const route of routes) assessments.set(route, { status: row.status, evidenceFile });
  }
}
const queries = JSON.parse(readFileSync(resolve(root, "docs/search-query-targets-2026-09-06.json"), "utf8"));
const base = "https://counselo-legal.com";
const decode = (s: string) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");
const plain = (s: string) => decode(s.replace(/<script\b[\s\S]*?<\/script>/gi, " ").replace(/<style\b[\s\S]*?<\/style>/gi, " ").replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
const pages = report.pages.filter((p: any) => !p.isRedirect);
const routes = new Set(pages.map((p: any) => p.route));
const redirects = new Map(report.pages.filter((p: any) => p.isRedirect).map((p: any) => [p.route, p.redirectTo]));
const issues: { route: string; issue: string }[] = [];
for (const [route, target] of Object.entries(LEGAL_PROBLEM_REDIRECTS)) {
  if (routes.has(route)) issues.push({ route, issue: "Consolidated URL remains indexable" });
  if (!routes.has(target)) issues.push({ route, issue: "Consolidation target is missing" });
  if (redirects.get(route) !== `${base}${target}`) issues.push({ route, issue: "Missing or incorrect static consolidation redirect" });
}
const inventory = JSON.parse(readFileSync(resolve(site, "dist/audit-route-inventory.json"), "utf8"));
for (const route of inventory.routes) if (!routes.has(route)) issues.push({ route, issue: "Build inventory route was not validated" });
const sitemapRoutes = new Set<string>();
for (const file of readdirSync(resolve(site, "public")).filter(file => /^sitemap-.*\.xml$/.test(file))) {
  const xml = readFileSync(resolve(site, "public", file), "utf8");
  for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) sitemapRoutes.add(new URL(decode(match[1])).pathname);
}
for (const route of sitemapRoutes) if (!routes.has(route)) issues.push({ route, issue: "Sitemap URL was not validated" });
for (const route of routes) if (!sitemapRoutes.has(String(route))) issues.push({ route: String(route), issue: "Rendered indexable route is absent from sitemaps" });
const entries = pages.map((p: any) => {
  const html = readFileSync(resolve(site, "dist/public", p.file), "utf8");
  const body = html.match(/<body\b[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? "";
  const text = plain(body);
  const canonical = decode(html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1] ?? "");
  const h1 = plain(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "");
  if (canonical !== `${base}${p.route}`) issues.push({ route: p.route, issue: "Canonical is not the rendered route" });
  const ar = /(?:^|\/)ar(?:\/|$)/.test(p.route);
  const region = p.route.match(/^\/(sa|syr|uae)(?:\/|$)/)?.[1] as "sa" | "syr" | "uae" | undefined;
  const matter = LEGAL_PROBLEM_PAGES.find(page => legalProblemPath(page.region, ar ? "ar" : "en", page.parentServiceSlug, page.slug) === p.route);
  if (matter) for (const fact of matter.atAGlance[ar ? "ar" : "en"]) {
    if (!text.includes(plain(fact))) issues.push({ route: p.route, issue: "Subject-specific matter guidance missing from initial HTML" });
  }
  if (matter) {
    const brief = getMatterIntentBrief(matter.titleEn);
    if (brief) for (const value of [brief.question[ar ? "ar" : "en"], brief.answer[ar ? "ar" : "en"]]) {
      if (!text.includes(plain(value))) issues.push({ route: p.route, issue: "Authored matter intent answer missing from initial HTML" });
    }
    const documents = ar ? matter.documentsAr : matter.documentsEn;
    const documentSection = body.match(/<section\b[^>]*id="problem-documents"[^>]*>([\s\S]*?)<\/section>/i)?.[1] ?? "";
    for (const document of documents) if (!plain(documentSection).includes(plain(document))) issues.push({ route: p.route, issue: "Matter evidence missing from the rendered documents section" });
  }
  const service = region ? getServicesForRegion(region).find(item => p.route === `/${region}${ar ? "/ar" : ""}/services/${item.slug}`) : undefined;
  if (service) {
    const faq = serviceTopicFaq(service.slug, ar);
    if (!text.includes(faq.q) || !text.includes(faq.a)) issues.push({ route: p.route, issue: "Subject-specific service FAQ missing from initial HTML" });
  }
  if (p.route === "/legal-library" || p.route === "/ar/legal-library") {
    for (const country of ["sa", "syr", "uae"] as const) for (const item of getServicesForRegion(country)) {
      if (!body.includes(`href="/${country}${ar ? "/ar" : ""}/services/${item.slug}"`)) issues.push({ route: p.route, issue: `Service directory destination missing: ${country}/${item.slug}` });
    }
  }
  const revisedMatter = LEGAL_PROBLEM_PAGES.find(page => page.editorialTopic && legalProblemPath(page.region, ar ? "ar" : "en", page.parentServiceSlug, page.slug) === p.route);
  if (revisedMatter) {
    const revision = getMatterEditorial(revisedMatter.titleEn)!;
    for (const faq of revision.faqs[ar ? "ar" : "en"]) if (!text.includes(faq.q) || !text.includes(faq.a)) issues.push({ route: p.route, issue: `Revised matter answer missing from initial body: ${faq.q}` });
    if (!text.includes(revisedMatter.heroSummary[ar ? "ar" : "en"])) issues.push({ route: p.route, issue: "Revised matter summary missing" });
  }
  const uaeService = UAE_SERVICES.find(service => p.route === `/uae${ar ? "/ar" : ""}/services/${service.slug}`);
  if (uaeService) for (const faq of buildUaeServicePageContent(uaeService).faqs[ar ? "ar" : "en"]) {
    if (!text.includes(faq.q) || !text.includes(faq.a)) issues.push({ route: p.route, issue: `Consolidated procedural guidance missing: ${faq.q}` });
  }
  const editorial = SEARCH_INTENT_EDITORIAL.filter(e => editorialTarget(e, region ?? "sa", ar) === p.route);
  for (const e of editorial) {
    if (!text.includes(e[ar ? "ar" : "en"].q) || !text.includes(e[ar ? "ar" : "en"].a)) issues.push({ route: p.route, issue: `Editorial answer missing from initial body: ${e.id}` });
  }
  const assignedQueries = queries.rows.filter((q: any) => q.targets.some((t: any) => t.ar === p.route || t.en === p.route)).map((q: any) => q.keyword);
  const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(m => JSON.parse(m[1]));
  const flatten = (x: any): any[] => Array.isArray(x) ? x.flatMap(flatten) : x && typeof x === "object" ? [x, ...Object.values(x).flatMap(flatten)] : [];
  const nodes = schemas.flatMap(flatten);
  for (const schema of nodes.filter(x => x["@type"] === "FAQPage")) {
    const questions = schema.mainEntity ?? [];
    if (new Set(questions.map((q: any) => q.name)).size !== questions.length) issues.push({ route: p.route, issue: "Duplicate FAQ questions" });
    for (const q of questions) if (!text.includes(plain(q.name)) || !text.includes(plain(q.acceptedAnswer?.text ?? ""))) issues.push({ route: p.route, issue: `FAQ schema is not in initial body: ${q.name}` });
  }
  const links = [...body.matchAll(/<a\b[^>]*href="([^"]+)"/gi)].map(m => decode(m[1]));
  const missingLinks = new Set<string>();
  for (const href of links) {
    if (!href.startsWith("/") && !href.startsWith(base)) continue;
    const url = new URL(href, base);
    if (url.origin !== base) continue;
    const target = url.pathname.replace(/\/$/, "") || "/";
    if (routes.has(target) || redirects.has(target) || /^\/(?:api|admin|auth|assets|attached_assets)(?:\/|$)/.test(target) || /\.[a-z0-9]{2,5}$/i.test(target)) continue;
    missingLinks.add(target);
  }
  for (const target of missingLinks) issues.push({ route: p.route, issue: `Internal destination not in rendered inventory: ${target}` });
  const family = /\/services\/[^/]+\/[^/]+$/.test(p.route) ? "legal matter" : /\/services\/[^/]+$/.test(p.route) ? "service" : /\/blog\/(?:ar|en)\//.test(p.route) ? "article" : /\/our-work\/[^/]+$/.test(p.route) ? "work example" : "shared or regional page";
  if (family === "legal matter") {
    if (!text.includes(ar ? "ترتبط هذه المسألة بخدمة" : "This matter falls within")) issues.push({ route: p.route, issue: "Safe service-scope explanation missing" });
    if (nodes.some(node => node["@type"] === "WebPage" && node.reviewedBy)) issues.push({ route: p.route, issue: "Professional review asserted without a recorded approval for this revision" });
  }
  const utility = /(?:privacy-policy|terms-of-service|editorial-policy|corrections-policy|disclaimer|accessibility)/.test(p.route);
  const primaryIntent = matter ? getMatterIntentBrief(matter.titleEn)?.question[ar ? "ar" : "en"] ?? h1 : h1;
  const supportingIntents = family === "legal matter" ? ["Issue-specific first steps", "Relevant evidence", "Jurisdiction and source limits", "Consultation process and contact"]
    : family === "service" ? ["Service scope", "Documents for assessment", "Common questions", "Relevant matters and articles", "Start a consultation"]
    : family === "article" ? ["Understand the legal topic", "Supporting analysis and sources", "Related reading and relevant services"]
    : family === "work example" ? ["Understand the recorded challenge", "Approach taken", "Reported outcome and its limits", "Related services and reading"]
    : utility ? ["Understand the applicable website policy", "Find the appropriate contact or correction route"]
    : ["Navigate the relevant country or content collection", "Understand the professional identity and service scope", "Find the appropriate next step"];
  return { route: p.route, family, searchIntent: { primary: primaryIntent, supporting: supportingIntents, role: utility ? "Policy and trust utility" : family, evidence: "Derived from the reviewed page purpose and visible sections; not a claim of observed search volume or every possible query." }, language: ar ? "ar" : "en", region: region ?? "shared", title: p.title, description: p.description, h1, canonical, initialBodyWords: text.split(/\s+/).length, editorialIntents: editorial.map(e => e.id), assignedQueries, contentTopic: matter?.contentTopic, contentAction: matter?.intentBriefTitle ? `Authored intent question, answer and evidence: ${matter.intentBriefTitle}` : revisedMatter ? `Topic-specific editorial revision: ${revisedMatter.editorialTopic}` : matter ? `Service-aware evidence guidance: ${matter.contentTopic}` : service ? "Subject-specific bilingual FAQ and service content checks" : editorial.length ? "Targeted bilingual guidance added" : "Published content retained; discovery, template and technical checks applied", individualEditorialReview: assessments.get(p.route)?.status ?? "open", editorialAssessmentFile: assessments.get(p.route)?.evidenceFile ?? null, technicalIssues: p.issues, legalReview: "Independent review not requested; no professional certification asserted by this audit" };
});
for (const q of queries.rows) for (const t of q.targets) for (const route of [t.ar, t.en]) if (!routes.has(route)) issues.push({ route, issue: `Mapped query target is missing: ${q.keyword}` });
const result = { generatedAt: new Date().toISOString(), buildValidationAt: report.generatedAt, scope: "All rendered indexable public pages; local implementation evidence only, not indexing, rankings or individual legal certification", summary: { pages: entries.length, editorialPages: entries.filter((p: any) => p.editorialIntents.length).length, mappedQueries: queries.summary.mapped, excludedQueries: queries.summary.excluded, additionalIssues: issues.length, editorialAssessedPages: entries.filter((p: { individualEditorialReview: string }) => p.individualEditorialReview === "implementation-assessed-and-render-verified").length, editorialOpenPages: entries.filter((p: { individualEditorialReview: string }) => p.individualEditorialReview !== "implementation-assessed-and-render-verified").length }, issues, pages: entries };
writeFileSync(resolve(root, "docs/page-seo-ledger-2026-09-06.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result.summary));
if (issues.length) { console.error(JSON.stringify(issues.slice(0, 30), null, 2)); process.exitCode = 1; }
