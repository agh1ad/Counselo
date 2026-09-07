type ArabicProblemSnippetInput = { titleAr: string; serviceTitleAr: string; countryNameAr: string };
type EnglishProblemSnippetInput = { titleEn: string; serviceTitleEn: string; countryNameEn: string };

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function arabicTopic(title: string, country: string): string {
  return title.replace(new RegExp(`\\s+في\\s+${escapeRegex(country)}$`), "").trim();
}
function englishTopic(title: string, country: string): string {
  return title.replace(new RegExp(`\\s+in\\s+${escapeRegex(country)}$`, "i"), "").trim();
}

// Preserve the complete legal subject. Search engines choose display length;
// cutting the middle of a phrase can change its meaning and create duplicates.
export function buildArabicProblemTitle({titleAr, serviceTitleAr, countryNameAr}: ArabicProblemSnippetInput): string {
  const topic = arabicTopic(titleAr, countryNameAr);
  const context = /^(?:عدم وضوح|الحاجة إلى|مشكلة|وجود|نزاع بشأن)/.test(topic) ? ` | ${serviceTitleAr}` : "";
  return `${topic}${context} في ${countryNameAr} | كاونسلو`;
}
export function buildEnglishProblemTitle({titleEn, serviceTitleEn, countryNameEn}: EnglishProblemSnippetInput): string {
  const topic = englishTopic(titleEn, countryNameEn);
  const context = /^(?:Uncertainty|Unclear|A need|A dispute|A problem)/i.test(topic) ? ` | ${serviceTitleEn}` : "";
  return `${topic}${context} in ${countryNameEn} | CounselO`;
}
export function buildArabicProblemDescription({titleAr, countryNameAr}: ArabicProblemSnippetInput): string {
  return `${arabicTopic(titleAr, countryNameAr)} في ${countryNameAr}: تعرّف على ما يلزم مراجعته والمستندات المطلوبة، واطلب استشارة قانونية أونلاين من كاونسلو بشأن حالتك.`;
}
export function buildEnglishProblemDescription({titleEn, countryNameEn}: EnglishProblemSnippetInput): string {
  return `${englishTopic(titleEn, countryNameEn)} in ${countryNameEn}: see the issues to review and documents to prepare. Request online legal advice from CounselO about your case.`;
}
