import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { LEGAL_PROBLEM_PAGES, legalProblemPath } from "../lib/legal-problem-pages";
import { getMatterIntentBrief } from "../lib/matter-intent-briefs/index";
import { getMatterEditorial } from "../lib/matter-editorial";
import { getRegionalLegalSources } from "../lib/regional-legal-sources";
const root = resolve(import.meta.dirname, "../../../..");
const rendered = JSON.parse(readFileSync(resolve(root, "docs/editorial-render-verification-2026-09-06.json"), "utf8"));
const evidence = new Map<string, any>(rendered.pages.map((row: any) => [row.route, row]));
const pages = LEGAL_PROBLEM_PAGES.flatMap(page => (["en", "ar"] as const).map(lang => {
  const route = legalProblemPath(page.region, lang, page.parentServiceSlug, page.slug);
  const record = evidence.get(route);
  const brief = getMatterIntentBrief(page.titleEn);
  const editorial = getMatterEditorial(page.titleEn);
  const sources = getRegionalLegalSources(page.region, page.parentServiceSlug);
  const complete = !!(brief || editorial) && !!record && record.missing.length === 0 && sources.length > 0;
  return { route, language: lang, region: page.region, title: lang === "ar" ? page.titleAr : page.titleEn,
    primaryIntent: brief?.question[lang] ?? editorial?.questions[lang][0],
    decisionGuidance: brief?.answer[lang] ?? (lang === "ar" ? editorial?.summaryAr : editorial?.summaryEn),
    evidenceChecklist: lang === "ar" ? page.documentsAr : page.documentsEn,
    assessmentMethod: "Authored issue guidance and bilingual evidence reviewed in the source; complete shared regional template, subject profiles and additional exact-topic answers reviewed; every assembled content section compared with initial rendered HTML. This is component-based editorial assessment, not a claim of independently researching the law anew for each URL.",
    reviewedComponents: ["Issue question and answer", "Evidence and disputed facts", "Regional scope and source routing", "Consultation process and deliverables", "FAQ distinctions and language equivalence", "Parent, sibling and contact discovery"],
    sourceRoutes: sources.map(source => source.href),
    sourceRole: "Starting points for verifying operative law. The intake guidance does not establish an individual entitlement, filing deadline or outcome.",
    contentFingerprint: createHash("sha256").update(JSON.stringify(page)).digest("hex"),
    renderedContentFingerprint: record?.renderedContentFingerprint,
    passagesChecked: record?.passagesChecked ?? 0,
    status: complete ? "implementation-assessed-and-render-verified" : "open",
    openFindings: complete ? [] : ["Missing authored guidance, sources or passing rendered comparison"],
  };
}));
const output = { generatedAt: new Date().toISOString(), buildValidationAt: rendered.buildValidationAt, scope: "All 1120 retained matter language routes, including shared and jurisdiction-specific components.", independentProfessionalApprovalRequiredByUser: false, summary: { pages: pages.length, open: pages.filter(row => row.status === "open").length }, pages };
writeFileSync(resolve(root, "docs/matter-editorial-assessment-2026-09-06.json"), JSON.stringify(output, null, 2) + "\n");
console.log(JSON.stringify(output.summary));
if (output.summary.open) process.exitCode = 1;
