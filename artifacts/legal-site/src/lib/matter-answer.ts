import type { Region } from "@workspace/api-zod/browser";
import { getLegalProblemPage, type LocalizedText } from "./legal-problem-pages.js";
import { getMatterIntentBrief } from "./matter-intent-briefs/index.js";
import { matterSourceGuidance } from "./matter-source-guidance.js";
import { getRegionalLegalSources, type LegalSource } from "./regional-legal-sources.js";
import { MATTER_ANSWER_ADDITIONS } from "./matter-answer-additions.js";

export type MatterAnswer = {
  question: LocalizedText;
  answer: LocalizedText;
  description: LocalizedText;
  sources: LegalSource[];
  evidenceStatus: "source-supported" | "source-routing-only";
  updatedAt: string;
  /** Editorial audit metadata; not a claim of professional legal review. */
  evidenceIds: string[];
  sourceLimitation?: string;
};

function sentences(value: string): string[] {
  return value.replace(/\s+/g, " ").trim().match(/[^.!?؟]+(?:[.!?؟]+|$)/g)?.map(s => s.trim()).filter(Boolean) ?? [];
}

function description(topic: string, country: string, answer: string, lang: "en" | "ar"): string {
  const prefix = lang === "ar" ? `في ${country}: ` : `${country}: `;
  const parts = sentences(answer);
  const topicWords = new Set(topic.toLowerCase().split(/[^\p{L}]+/u).filter(word => word.length > 3));
  const candidates = parts.flatMap((part, index) => [
    { text: `${prefix}${part}`, index },
    ...(parts[index + 1] ? [{ text: `${prefix}${part} ${parts[index + 1]}`, index }] : []),
  ]);
  // Whole sentences preserve legal qualifications. Display length is a preference,
  // never a reason to cut a legal phrase or append the same promotional tail.
  const score = ({ text, index }: { text: string; index: number }) => {
    const overlap = text.toLowerCase().split(/[^\p{L}]+/u).filter(word => topicWords.has(word)).length;
    return (text.length >= 110 && text.length <= 170 ? 100 : text.length <= 190 ? 55 : 0)
      + Math.min(overlap, 4) * 5 - Math.abs(text.length - 145) / 10 - index;
  };
  return candidates.sort((a, b) => score(b) - score(a))[0]?.text ?? `${prefix}${topic}.`;
}

/** Use only explicitly assigned topic evidence; a service homepage is never substantive evidence. */
export function getMatterAnswer(region: Region, serviceSlug: string, problemSlug: string): MatterAnswer | undefined {
  const page = getLegalProblemPage(region, serviceSlug, problemSlug);
  if (!page) return undefined;
  const brief = getMatterIntentBrief(page.titleEn);
  const additions = MATTER_ANSWER_ADDITIONS.filter(item => item.region === region && item.service === serviceSlug && item.problems.includes(problemSlug));
  const guidance = matterSourceGuidance(region, serviceSlug, problemSlug);
  // General execution guidance does not verify the procedure for visitation orders.
  const visitationProcedureUnverified = region === "syr" && serviceSlug === "family-law" && problemSlug === "visitation-order-enforcement";
  const sourceAnswer = additions[0] ?? guidance[0];
  // Keep the source's question and answer together: its opening "No" or a
  // dependent phrase must never be made to answer a different intake question.
  const question = sourceAnswer
    ? { en: sourceAnswer.en.q, ar: sourceAnswer.ar.q }
    : brief?.question ?? { en: page.faqs.en[0].q, ar: page.faqs.ar[0].q };
  const briefAnswer = brief?.answer ?? { en: page.faqs.en[0].a, ar: page.faqs.ar[0].a };
  const answer = sourceAnswer ? {
    en: `${sourceAnswer.en.a} ${briefAnswer.en}`,
    ar: `${sourceAnswer.ar.a} ${briefAnswer.ar}`,
  } : briefAnswer;
  const sources = sourceAnswer?.sources ?? getRegionalLegalSources(region, serviceSlug);
  const country = region === "syr" ? { en: "Syria", ar: "سوريا" } : region === "uae" ? { en: "the UAE", ar: "الإمارات" } : { en: "Saudi Arabia", ar: "السعودية" };
  return {
    question,
    answer,
    description: {
      en: description(page.titleEn, country.en, briefAnswer.en, "en"),
      ar: description(page.titleAr, country.ar, briefAnswer.ar, "ar"),
    },
    sources: [...new Map(sources.map(source => [source.href, source])).values()],
    evidenceStatus: sourceAnswer && !visitationProcedureUnverified ? "source-supported" : "source-routing-only",
    updatedAt: "2026-09-07",
    evidenceIds: sourceAnswer && !visitationProcedureUnverified ? [sourceAnswer.id] : [],
    sourceLimitation: additions[0]?.sourceLimitation ?? (sourceAnswer && !visitationProcedureUnverified ? undefined : visitationProcedureUnverified
      ? "No current primary text was found for ordinary Syrian visitation-order enforcement: the competent execution route, prerequisites, permitted coercive measures and any applicable filing period remain unverified. Historical maintenance/mahr detention rules and2025 northern-court integration circulars do not establish visitation procedure. The page retains order-specific evidence preparation and does not assert a remedy or numeric deadline."
      : `No topic-specific substantive source verified for ${region}/${serviceSlug}/${problemSlug}; the answer gives issue preparation only.`),
  };
}
