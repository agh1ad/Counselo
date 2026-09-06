import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { LEGAL_PROBLEM_PAGES, legalProblemPath } from "../lib/legal-problem-pages.js";

const root = resolve(import.meta.dirname, "../../../..");
const site = resolve(root, "artifacts/legal-site");
const output = resolve(root, "output/legal-review-2026-09-06");
const ledger = JSON.parse(readFileSync(resolve(root, "docs/page-seo-ledger-2026-09-06.json"), "utf8"));
const validation = JSON.parse(readFileSync(resolve(site, "seo-validation-report.json"), "utf8"));
const hash = (value: string) => createHash("sha256").update(value).digest("hex");
const decode = (value: string) => value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");
const plain = (value: string) => decode(value.replace(/<script\b[\s\S]*?<\/script>/gi, "").replace(/<style\b[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const rendered = new Map<string, { file: string }>(validation.pages.filter((page: any) => !page.isRedirect).map((page: any) => [page.route, page]));
if (ledger.buildValidationAt !== validation.generatedAt || ledger.pages.length !== rendered.size) throw new Error("Regenerate the page ledger from the current validated build before packaging review");
const matters = new Map(LEGAL_PROBLEM_PAGES.flatMap(page => ["en", "ar"].map(lang => [legalProblemPath(page.region, lang as "en" | "ar", page.parentServiceSlug, page.slug), page] as const)));
mkdirSync(output, { recursive: true });
const rows = ledger.pages.map((page: any) => {
  const record = rendered.get(page.route);
  if (!record) throw new Error(`Missing rendered source: ${page.route}`);
  const html = readFileSync(resolve(site, "dist/public", record.file), "utf8");
  const body = html.match(/<body\b[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? "";
  const text = plain(body);
  if (!text) throw new Error(`Empty page: ${page.route}`);
  const matter = matters.get(page.route);
  const language = page.language as "en" | "ar";
  const topicText = matter ? [matter.heroSummary[language], matter.overview[language], ...matter.keyQuestions[language], ...matter.faqs[language].flatMap(faq => [faq.q, faq.a])].join(" ") : text;
  const links = [...html.matchAll(/<a\b[^>]*href="(https?:\/\/[^"#]+)"/gi)].map(match => decode(match[1]));
  const sources = [...new Set(links.filter(url => !/counselo-legal\.com|wa\.me|omarbaghdadi\.com|baghdadilaw|facebook|instagram|linkedin/i.test(url)))];
  const flags: string[] = [];
  if (matter && !matter.editorialTopic) flags.push("Retained generated matter narrative: individual editorial assessment still required");
  if (matter?.editorialTopic) flags.push("Topic-specific rewrite: qualified review of this new version required");
  if (/(?:\d+\s*(?:days?|months?|years?|ساعة|أيام|يوماً|شهر|سنة)|Article\s+\d+|المادة\s*\(?\d+)/i.test(topicText)) flags.push("Candidate duration, statutory reference or numeric claim: verify context and current source");
  if (page.family === "article") flags.push("CMS article: verify operative law, sources, individual claims and bilingual equivalence");
  if (page.family === "work example") flags.push("Work example: confirm publication permission, anonymisation and support for outcome claims");
  if (!sources.length && ["legal matter", "article", "service"].includes(page.family)) flags.push("No external source link detected: assess whether substantive claims need specific primary citations");
  const fingerprint = hash(JSON.stringify({ title: page.title, description: page.description, canonical: page.canonical, text, sources }));
  const filename = `${hash(page.route).slice(0, 20)}.md`;
  const review = {
    route: page.route, title: page.title, language, region: page.region, family: page.family,
    contentSha256: fingerprint, topicFingerprint: hash(topicText), assignedReviewer: "Lawyer and Legal Counsel Omar Baghdadi",
    professionalReviewStatus: "pending", approvedBy: null, approvedAt: null,
    editorialStatus: matter?.editorialTopic ? "targeted-rewrite-awaiting-professional-review" : "individual-editorial-review-pending",
    editorialTopic: matter?.editorialTopic ?? null, automatedScreeningFlags: flags, sourceLinks: sources,
    sharedTemplateCleanup: matter ? "Removed inherited service-claim paragraphs and unconditional professional-review markup; individual editorial review remains pending" : null,
    snapshot: `output/legal-review-2026-09-06/${filename}`,
  };
  const readable = decode(body.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, "").replace(/<h([1-6])\b[^>]*>/gi, (_, level) => `\n\n${"#".repeat(Number(level))} `).replace(/<\/(?:p|section|details|li|h[1-6]|div)>/gi, "\n\n").replace(/<[^>]*>/g, " ")).replace(/[ \t]+/g, " ").replace(/\n\s*\n(?:\s*\n)+/g, "\n\n").trim();
  writeFileSync(resolve(output, filename), `# Review: ${page.title}\n\nRoute: ${page.canonical}\n\nLanguage: ${language}; jurisdiction: ${page.region}\n\nAssigned reviewer: Lawyer and Legal Counsel Omar Baghdadi\n\nStatus: PENDING — no approval is recorded.\n\nContent SHA-256: ${fingerprint}\n\n## Review checklist\n\n- [ ] Confirm jurisdiction and competence to review this subject.\n- [ ] Check legal propositions against current primary sources and exact operative provisions.\n- [ ] Verify deadlines, exceptions, forum, remedies and qualifications.\n- [ ] Check Arabic/English equivalence without importing another country's rules.\n- [ ] Check unsupported experience, outcome or representation claims.\n- [ ] Confirm useful distinct intent, identify repetition and specify corrections.\n- [ ] Record approval or requested changes against this fingerprint, with reviewer name and date.\n\n## Automated triage — not findings of legal error\n\n${flags.map(flag => `- ${flag}`).join("\n") || "No automated flag. Individual review is still pending."}\n\n## Existing source links — not verified citations for every claim\n\n${sources.map(url => `- ${url}`).join("\n") || "None extracted."}\n\n## Rendered page text\n\n${readable}\n`, "utf8");
  return review;
});
const topicGroups = new Map<string, string[]>();
for (const row of rows) topicGroups.set(row.topicFingerprint, [...(topicGroups.get(row.topicFingerprint) ?? []), row.route]);
const identicalTopicGroups = [...topicGroups.values()].filter(routes => routes.length > 1);
const report = {
  generatedAt: new Date().toISOString(), buildValidationAt: validation.generatedAt,
  scope: "Every retained indexable page screened and packaged; NOT a completed individual editorial or qualified legal review",
  assignedReviewer: "Lawyer and Legal Counsel Omar Baghdadi", reviewerSelectedBy: "User", approvalsReceived: 0,
  limitations: ["Exact topic fingerprints do not detect paraphrased or semantic duplication", "Automatic flags do not constitute individual editorial or legal review", "Source portals are not verified support for every proposition", "Prepared locally; not transmitted to the reviewer"],
  summary: { pages: rows.length, targetedRewrites: rows.filter((row: any) => row.editorialTopic).length, sharedTemplateCleanups: rows.filter((row: any) => row.sharedTemplateCleanup).length, pendingProfessionalReview: rows.length, identicalTopicGroups: identicalTopicGroups.length },
  identicalTopicGroups, pages: rows,
};
writeFileSync(resolve(root, "docs/legal-editorial-review-2026-09-06.json"), JSON.stringify(report, null, 2) + "\n");
writeFileSync(resolve(output, "INDEX.md"), `# CounselO page-by-page review for Omar Baghdadi\n\n${rows.length} page versions; ${report.summary.targetedRewrites} targeted rewrites. Every approval remains pending. Automated screening is not legal sign-off or a completed individual editorial review. Review each snapshot and return the route, fingerprint, corrections or approval, reviewer name and date. Do not approve an entire jurisdiction unless it falls within your professional competence.\n\n${rows.map((row: any) => `- [${row.route}](${row.snapshot.split("/").at(-1)}) — ${row.editorialStatus}`).join("\n")}\n`);
console.log(JSON.stringify(report.summary));
