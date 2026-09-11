import type { LegalSource } from "./regional-legal-sources";

export type CitedProblemFaq = { q: string; a: string; sources?: LegalSource[] };

/** Keep citations with their claims, and give the first substantive occurrence precedence. */
export function distinctProblemFaqs(items: CitedProblemFaq[], alreadyVisible: string[]): CitedProblemFaq[] {
  const textKey = (text: string) => text.replace(/\s+/g, " ").trim();
  const answers = new Set(alreadyVisible.map(textKey));
  const questions = new Set<string>();
  return items.filter(item => {
    const q = textKey(item.q), a = textKey(item.a);
    if (questions.has(q) || answers.has(a)) return false;
    questions.add(q); answers.add(a);
    return true;
  });
}

/** An accurate excerpt from the visible problem-specific introduction, not keyword permutations. */
export function problemContentDescription(summary: string, country: string, arabic: boolean): string {
  const text = `${country}: ${summary}`.replace(/\s+/g, " ").trim();
  if (text.length <= 175) return text;
  const excerpt = text.slice(0, 172);
  const boundary = excerpt.lastIndexOf(" ");
  return excerpt.slice(0, boundary > 90 ? boundary : excerpt.length).replace(/[،,;: .]+$/, "") + "…";
}
