export type MatterIntentBrief = {
  titles: string[];
  question: { en: string; ar: string };
  answer: { en: string; ar: string };
  documents: { en: string; ar: string };
};

/** An explicit editorial brief, not a keyword classifier or legal sign-off. */
export function brief(titles: string[], questionEn: string, questionAr: string, answerEn: string, answerAr: string, documentsEn: string, documentsAr: string): MatterIntentBrief {
  return { titles, question: { en: questionEn, ar: questionAr }, answer: { en: answerEn, ar: answerAr }, documents: { en: documentsEn, ar: documentsAr } };
}
