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
  "against",
  "and",
  "before",
  "for",
  "from",
  "in",
  "of",
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

function truncateAtWord(value: string, max: number): string {
  if ([...value].length <= max) return value;
  const shortened = [...value].slice(0, max - 1).join("");
  const boundary = shortened.lastIndexOf(" ");
  return removeDanglingWords(shortened
    .slice(0, boundary > 0 ? boundary : shortened.length)
    .replace(/[|،,:;]$/, "")
    .trimEnd());
}

function withoutRepeatedCountry(titleAr: string, countryNameAr: string): string {
  const escaped = countryNameAr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return titleAr.replace(new RegExp(`(?:\\s+في)?\\s+${escaped}$`), "").trim();
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
  countryNameAr,
}: ArabicProblemSnippetInput): string {
  const topic = withoutRepeatedCountry(titleAr, countryNameAr);
  const prefix = "استشارة: ";
  const suffix = ` | ${countryNameAr} | كاونسلو`;
  const available = ARABIC_TITLE_LIMIT - [...prefix].length - [...suffix].length;
  return `${prefix}${truncateAtWord(topic, available)}${suffix}`;
}

/**
 * Uses customer language and a clear next step without claiming guaranteed
 * outcomes, court representation, or jurisdiction-wide lawyer licensing.
 */
export function buildArabicProblemDescription({
  titleAr,
  countryNameAr,
}: ArabicProblemSnippetInput): string {
  const topic = withoutRepeatedCountry(titleAr, countryNameAr);
  const prefix = "هل تواجه ";
  const suffix = ` في ${countryNameAr}؟ استشارة قانونية أونلاين بالعربية مع كاونسلو، التي أسسها المحامي والمستشار القانوني عمر البغدادي.`;
  const available = ARABIC_DESCRIPTION_LIMIT - [...prefix].length - [...suffix].length;
  const focusedTopic = truncateAtWord(topic, available);
  return `${prefix}${focusedTopic}${suffix}`;
}

/**
 * English counterpart to the Arabic snippet contract. The concise
 * "Consultation" prefix preserves legal intent while leaving room for the
 * problem, jurisdiction, and CounselO brand in every emitted title.
 */
export function buildEnglishProblemTitle({
  titleEn,
  countryNameEn,
}: {
  titleEn: string;
  serviceTitleEn: string;
  countryNameEn: string;
}): string {
  const topic = withoutRepeatedEnglishCountry(titleEn, countryNameEn);
  const suffix = ` | ${countryNameEn} | CounselO`;
  const available = ENGLISH_TITLE_LIMIT - suffix.length;
  return `${truncateAtWord(topic, available)}${suffix}`;
}

/**
 * Makes Omar's founder relationship explicit without implying a guaranteed
 * outcome or unrestricted local representation rights.
 */
export function buildEnglishProblemDescription({
  titleEn,
  countryNameEn,
}: {
  titleEn: string;
  serviceTitleEn: string;
  countryNameEn: string;
}): string {
  const topic = withoutRepeatedEnglishCountry(titleEn, countryNameEn);
  const prefix = "Facing ";
  const suffix = ` in ${countryNameEn}? Online legal advice from CounselO founder, Lawyer and Legal Counsel Omar Al-Baghdadi.`;
  const available = ENGLISH_DESCRIPTION_LIMIT - prefix.length - suffix.length;
  return `${prefix}${truncateAtWord(topic, available)}${suffix}`;
}
