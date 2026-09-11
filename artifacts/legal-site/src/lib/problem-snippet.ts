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

// A leading "problem" does not make an otherwise precise legal subject vague.
// These reviewed subjects already identify their service in the matter title.
const SELF_IDENTIFYING_ARABIC_SUBJECT = /الزواج|الحالة الأسرية|تملك الأجنبي للعقار|المالك|المستأجر|المستثمر الأجنبي|توثيق العقد|زاتكا|الضريبية|ضريبة الشركات|تأسيس الشركة|الهوية الإماراتية/;
const CONCISE_ARABIC_SERVICE_CONTEXT: Readonly<Record<string, string>> = {
  "أصول المحاكمات المدنية": "الدعاوى المدنية",
  "القانون الجزائي والتحقيقات والإجراءات": "القضايا الجزائية",
  "الدخول والإقامة والهجرة": "الإقامة والهجرة",
};
// These topics already name the legal subject; repeating the full service label
// makes the snippet harder to read without adding context.
const SELF_DESCRIBING_ARABIC_TOPICS = new Set([
  "مشكلة تأسيس الشركة وتسجيلها",
  "مشكلة إلغاء الهوية الإماراتية والإقامة",
  "مشكلة التسجيل والإقرار بضريبة الشركات",
]);

// Preserve the complete legal subject. Search engines choose display length;
// cutting the middle of a phrase can change its meaning and create duplicates.
export function buildArabicProblemTitle({titleAr, serviceTitleAr, countryNameAr}: ArabicProblemSnippetInput): string {
  const topic = arabicTopic(titleAr, countryNameAr);
  if (countryNameAr === "سوريا" && /أجنبية (?:لنشاط سوري|لمعاملة سورية)$/.test(topic)) return `${topic} | كاونسلو`;
  const needsContext = /^(?:عدم وضوح|الحاجة إلى|مشكلة|وجود|نزاع بشأن)/.test(topic)
    && !SELF_IDENTIFYING_ARABIC_SUBJECT.test(topic) && !SELF_DESCRIBING_ARABIC_TOPICS.has(topic);
  const context = needsContext ? ` | ${CONCISE_ARABIC_SERVICE_CONTEXT[serviceTitleAr] ?? serviceTitleAr}` : "";
  return `${topic}${context} في ${countryNameAr} | كاونسلو`;
}
export function buildEnglishProblemTitle({titleEn, serviceTitleEn, countryNameEn}: EnglishProblemSnippetInput): string {
  const topic = englishTopic(titleEn, countryNameEn);
  if (countryNameEn === "Syria" && /^Foreign VAT .*Syrian (?:business|transaction)$/.test(topic)) return `${topic} | CounselO`;
  const context = /^(?:Uncertainty|Unclear|A need|A dispute|A problem)/i.test(topic) ? ` | ${serviceTitleEn}` : "";
  return `${topic}${context} in ${countryNameEn} | CounselO`;
}
export function buildArabicProblemDescription({titleAr, countryNameAr}: ArabicProblemSnippetInput): string {
  return `${arabicTopic(titleAr, countryNameAr)} في ${countryNameAr}: تعرّف على ما يلزم مراجعته والمستندات المطلوبة، واطلب استشارة قانونية أونلاين من كاونسلو بشأن حالتك.`;
}
export function buildEnglishProblemDescription({titleEn, countryNameEn}: EnglishProblemSnippetInput): string {
  return `${englishTopic(titleEn, countryNameEn)} in ${countryNameEn}: see the issues to review and documents to prepare. Request online legal advice from CounselO about your case.`;
}
