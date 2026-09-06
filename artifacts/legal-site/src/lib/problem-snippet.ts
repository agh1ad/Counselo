// SEOHead applies a global 68-character ceiling. Stay within it here so its
// generic fallback never removes the deliberately preserved brand suffix.
const ARABIC_TITLE_LIMIT = 68;
const ARABIC_DESCRIPTION_LIMIT = 158;
const ENGLISH_TITLE_LIMIT = 68;
const ENGLISH_DESCRIPTION_LIMIT = 158;
const DANGLING_ARABIC_WORDS = new Set([
  "أمام",
  "أو",
  "إلى",
  "بين",
  "بشأن",
  "ضد",
  "ضمن",
  "على",
  "عن",
  "غير",
  "في",
  "لدى",
  "مع",
  "من",
]);
const DANGLING_ENGLISH_WORDS = new Set([
  "a",
  "about",
  "against",
  "an",
  "and",
  "at",
  "before",
  "by",
  "for",
  "from",
  "in",
  "into",
  "of",
  "on",
  "or",
  "to",
  "under",
  "with",
]);

function removeDanglingWords(value: string): string {
  const words = value.trim().split(/\s+/);
  while (
    words.length > 1 &&
    (DANGLING_ARABIC_WORDS.has(words.at(-1) ?? "") || DANGLING_ENGLISH_WORDS.has((words.at(-1) ?? "").toLowerCase()))
  ) words.pop();
  return words.join(" ");
}

function withoutRepeatedEnglishCountry(titleEn: string, countryNameEn: string): string {
  const escaped = countryNameEn.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return titleEn.replace(new RegExp(`(?:\\s+in)?\\s+${escaped}$`, "i"), "").trim();
}

function compactEnglishTopic(value: string): string {
  return value
    .replace(/^public prosecution investigation and questioning$/i, "Public prosecution questioning")
    .replace(/^Document attestation and contract authentication problem$/i, "Contract authentication and attestation")
    .replace(/^Document attestation and legalisation problem$/i, "Document attestation and legalisation");
}

function truncateAtWord(value: string, max: number): string {
  if ([...value].length <= max) return value;
  const shortened = [...value].slice(0, max - 1).join("");
  const boundary = shortened.lastIndexOf(" ");
  return removeDanglingWords(shortened
    .slice(0, boundary > 0 ? boundary : shortened.length)
    .replace(/[|،,:;]$/, "")
    .trimEnd());
}

function truncateWithDistinctiveTail(value: string, max: number): string {
  if ([...value].length <= max) return value;
  if (max < 14) return truncateAtWord(value, max);
  const words = value.trim().split(/\s+/);
  const fullestTail: string[] = [];
  for (let index = words.length - 1; index > 0; index--) {
    const candidate = [words[index], ...fullestTail].join(" ");
    if ([...candidate].length > max) break;
    fullestTail.unshift(words[index]);
  }
  while (fullestTail.length > 1 && DANGLING_ENGLISH_WORDS.has(fullestTail[0].toLowerCase())) fullestTail.shift();
  while (fullestTail.length > 1 && DANGLING_ARABIC_WORDS.has(fullestTail[0])) fullestTail.shift();
  const distinctiveTail = fullestTail.join(" ");
  if (fullestTail.length >= 2 && [...distinctiveTail].length >= Math.floor(max * 0.55)) return distinctiveTail;
  const tailBudget = Math.max(6, Math.floor(max * 0.42));
  const tailWords: string[] = [];
  for (let index = words.length - 1; index > 0; index--) {
    const candidate = [words[index], ...tailWords].join(" ");
    if ([...candidate].length > tailBudget) break;
    tailWords.unshift(words[index]);
  }
  while (tailWords.length > 1 && DANGLING_ENGLISH_WORDS.has(tailWords[0].toLowerCase())) tailWords.shift();
  while (tailWords.length > 1 && DANGLING_ARABIC_WORDS.has(tailWords[0])) tailWords.shift();
  const tail = tailWords.join(" ");
  const head = truncateAtWord(value, max - [...tail].length - 3);
  return tail && head ? `${head} … ${tail}` : truncateAtWord(value, max);
}

function truncateWithBalancedTail(value: string, max: number): string {
  if ([...value].length <= max) return value;
  if (max < 14) return truncateAtWord(value, max);
  const words = value.trim().split(/\s+/);
  const tailBudget = Math.max(6, Math.floor(max * 0.42));
  const tailWords: string[] = [];
  for (let index = words.length - 1; index > 0; index--) {
    const candidate = [words[index], ...tailWords].join(" ");
    if ([...candidate].length > tailBudget) break;
    tailWords.unshift(words[index]);
  }
  while (tailWords.length > 1 && DANGLING_ARABIC_WORDS.has(tailWords[0])) tailWords.shift();
  const tail = tailWords.join(" ");
  const head = truncateAtWord(value, max - [...tail].length - 3);
  return tail && head ? `${head} … ${tail}` : truncateAtWord(value, max);
}

function withoutRepeatedCountry(titleAr: string, countryNameAr: string): string {
  const escaped = countryNameAr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return titleAr.replace(new RegExp(`(?:\\s+في)?\\s+${escaped}$`), "").trim();
}

function compactEnglishService(value: string): string {
  return removeDanglingWords(value
    .replace(/\b(?:legal|law|services?|advice|consultation)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim()) || "Legal review";
}

function compactArabicService(value: string): string {
  return removeDanglingWords(value
    .replace(/(?:خدمات?|استشارات?|قانونية|القانون|قانون)/g, " ")
    .replace(/\s+/g, " ")
    .trim()) || "مراجعة قانونية";
}

type ArabicProblemSnippetInput = {
  titleAr: string;
  serviceTitleAr: string;
  countryNameAr: string;
};

/**
 * Builds a query-aligned Arabic title while keeping the jurisdiction and
 * CounselO brand visible within a conservative search-result title budget.
 */
export function buildArabicProblemTitle({
  titleAr,
  serviceTitleAr,
  countryNameAr,
}: ArabicProblemSnippetInput): string {
  const topic = withoutRepeatedCountry(titleAr, countryNameAr);
  const prefix = "استشارة: ";
  // Generated jurisdiction/process questions need their service context; a
  // standalone legal subject gets the full title budget instead.
  const needsService = /^(?:عدم وضوح|الحاجة إلى|مشكلة|وجود|نزاع بشأن)/.test(topic);
  const service = truncateAtWord(compactArabicService(serviceTitleAr), 17);
  const suffix = needsService ? ` | ${service} | ${countryNameAr} | كاونسلو` : ` | ${countryNameAr} | كاونسلو`;
  const available = ARABIC_TITLE_LIMIT - [...prefix].length - [...suffix].length;
  return `${prefix}${truncateWithBalancedTail(topic, available)}${suffix}`;
}

/**
 * Uses customer language and a clear next step without claiming guaranteed
 * outcomes, court representation, or jurisdiction-wide lawyer licensing.
 */
export function buildArabicProblemDescription({
  titleAr,
  serviceTitleAr,
  countryNameAr,
}: ArabicProblemSnippetInput): string {
  const topic = withoutRepeatedCountry(titleAr, countryNameAr);
  const prefix = "راجع ";
  const service = compactArabicService(serviceTitleAr);
  const suffix = ` ضمن ${service} في ${countryNameAr}. تحدد كاونسلو الجهة والمستندات والخطوة التالية أونلاين.`;
  const available = ARABIC_DESCRIPTION_LIMIT - [...prefix].length - [...suffix].length;
  const focusedTopic = truncateWithBalancedTail(topic, available);
  return `${prefix}${focusedTopic}${suffix}`;
}

/**
 * English counterpart to the Arabic snippet contract. The concise
 * "Consultation" prefix preserves legal intent while leaving room for the
 * problem, jurisdiction, and CounselO brand in every emitted title.
 */
export function buildEnglishProblemTitle({
  titleEn,
  serviceTitleEn,
  countryNameEn,
}: {
  titleEn: string;
  serviceTitleEn: string;
  countryNameEn: string;
}): string {
  const topic = compactEnglishTopic(withoutRepeatedEnglishCountry(titleEn, countryNameEn));
  const needsService = /^(?:Uncertainty|Unclear|A need|A dispute|A problem)/i.test(topic);
  const service = truncateAtWord(compactEnglishService(serviceTitleEn), 18);
  const suffix = needsService ? ` | ${service} | ${countryNameEn} | CounselO` : ` | ${countryNameEn} | CounselO`;
  const available = ENGLISH_TITLE_LIMIT - suffix.length;
  return `${needsService ? truncateWithDistinctiveTail(topic, available) : truncateWithBalancedTail(topic, available)}${suffix}`;
}

/**
 * Prioritizes the user's matter in the limited description budget, followed
 * by the jurisdiction, review scope, and a practical online next step.
 */
export function buildEnglishProblemDescription({
  titleEn,
  serviceTitleEn,
  countryNameEn,
}: {
  titleEn: string;
  serviceTitleEn: string;
  countryNameEn: string;
}): string {
  const topic = withoutRepeatedEnglishCountry(titleEn, countryNameEn);
  const prefix = "Review ";
  const service = compactEnglishService(serviceTitleEn).toLowerCase();
  const suffix = ` under ${service} in ${countryNameEn}. CounselO checks the authority, documents and next step online.`;
  const available = ENGLISH_DESCRIPTION_LIMIT - prefix.length - suffix.length;
  return `${prefix}${truncateWithDistinctiveTail(topic, available)}${suffix}`;
}
