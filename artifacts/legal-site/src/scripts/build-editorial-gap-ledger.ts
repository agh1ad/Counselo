import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { LEGAL_PROBLEM_PAGES, legalProblemPath } from "../lib/legal-problem-pages.js";

const root = resolve(import.meta.dirname, "../../../..");
const input = JSON.parse(readFileSync(resolve(root, "docs/page-seo-ledger-2026-09-06.json"), "utf8"));
const hash = (text: string) => createHash("sha256").update(text).digest("hex");
const matters = new Map(LEGAL_PROBLEM_PAGES.flatMap(page => (["en", "ar"] as const).map(lang => [legalProblemPath(page.region, lang, page.parentServiceSlug, page.slug), { page, lang }] as const)));
const groups = new Map<string, string[]>();
for (const [route, { page, lang }] of matters) {
  const signature = `${page.region}:${lang}:${page.parentServiceSlug}:${hash(page.faqs[lang].map(faq => faq.a).join("\n"))}`;
  groups.set(signature, [...(groups.get(signature) ?? []), route]);
}
const repeatedAnswers = new Map([...groups.values()].filter(routes => routes.length > 1).flatMap(routes => routes.map(route => [route, routes.filter(other => other !== route)] as const)));
const rows = input.pages.map((entry: any) => {
  const matter = matters.get(entry.route);
  const assessed = entry.individualEditorialReview === "implementation-assessed-and-render-verified";
  const flags: string[] = [];
  const next: string[] = [];
  if (matter) {
    const { page, lang } = matter;
    if (!page.editorialTopic && !page.intentBriefTitle) {
      flags.push("Only service-level evidence and generated matter wording are established");
      next.push("Assess the actual issue and supply a distinct answer, evidence needs and decision points where the service template is insufficient");
    } else if (!assessed) {
      next.push("Assess the complete regional page and its sources beyond the revised issue summary and FAQs");
    }
    if (repeatedAnswers.has(entry.route)) flags.push("Exact FAQ answer set is also used by different matters in this service and language");
    if (page.region === "syr" && /\b(?:VAT|zakat)\b/i.test(page.titleEn) && !/Foreign|Cross-border/i.test(page.titleEn)) {
      flags.push("Shared VAT or zakat label needs a supported Syrian or explicit cross-border scope; current applicability is not established by this audit");
      next.unshift("Resolve the tax jurisdiction and appropriate visible wording against current primary sources while preserving the existing route");
    }
    return { route: entry.route, language: lang, family: entry.family, title: lang === "ar" ? page.titleAr : page.titleEn,
      status: assessed && !flags.length ? "implementation-assessed-and-render-verified" : "open", selectedIntentRevision: page.intentBriefTitle ?? page.editorialTopic ?? null,
      contentFingerprint: hash(JSON.stringify({ summary: page.heroSummary[lang], overview: page.overview[lang], documents: lang === "ar" ? page.documentsAr : page.documentsEn, questions: page.keyQuestions[lang], faqs: page.faqs[lang] })),
      screeningFlags: flags, identicalAnswerPeers: repeatedAnswers.get(entry.route) ?? [], nextAssessment: next };
  }
  if (!assessed) next.push(entry.family === "article" ? "Read the complete article, verify its specific legal claims and sources, answer coverage, bilingual equivalence and contextual links"
    : entry.family === "work example" ? "Assess the full narrative, search intent and contextual links without inventing facts or outcomes"
      : entry.family === "service" ? "Assess the complete regional service scope, useful answers, distinctions from sibling services and source support"
        : "Assess the complete page purpose, visitor questions, copy and relevant discovery paths");
  return { route: entry.route, language: entry.language, family: entry.family, title: entry.title, status: assessed && !flags.length ? "implementation-assessed-and-render-verified" : "open", selectedIntentRevision: null, screeningFlags: flags, identicalAnswerPeers: [], nextAssessment: next };
});
const result = {
  generatedAt: new Date().toISOString(), buildValidationAt: input.buildValidationAt,
  scope: "Complete page-level editorial assessment ledger tied to source assessments and rendered verification. This closes recorded implementation findings only; publication, indexing and ranking outcomes remain separate.",
  independentProfessionalApprovalRequiredByUser: false,
  summary: { pages: rows.length, open: rows.filter((row: any) => row.status === "open").length, assessed: rows.filter((row: any) => row.status !== "open").length, selectedIntentRevisionPages: rows.filter((row: any) => row.selectedIntentRevision).length,
    matterPagesWithoutSelectedRevision: rows.filter((row: any) => row.family === "legal matter" && !row.selectedIntentRevision).length,
    pagesSharingExactAnswerSets: repeatedAnswers.size, exactAnswerGroups: [...groups.values()].filter(routes => routes.length > 1).length,
    syriaTaxScopeFlags: rows.filter((row: any) => row.screeningFlags.some((flag: string) => flag.startsWith("Shared VAT"))).length },
  limitations: ["Shared text is a screening signal, not proof that a page should be removed", "No ranking maximum or search-engine outcome is inferred", "No external reviewer approval gate is introduced"], pages: rows,
};
writeFileSync(resolve(root, "docs/editorial-gap-ledger-2026-09-06.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result.summary));
