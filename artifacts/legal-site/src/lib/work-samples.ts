export interface WorkSamplePublic {
  id: number;
  slug: string;
  date: string;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  workTypeEn: string;
  workTypeAr: string;
  jurisdictionEn: string;
  jurisdictionAr: string;
  clientTypeEn: string;
  clientTypeAr: string;
  challengeEn: string;
  challengeAr: string;
  approachEn: string;
  approachAr: string;
  outcomeEn: string;
  outcomeAr: string;
  seoTitleEn: string;
  seoTitleAr: string;
  seoDescriptionEn: string;
  seoDescriptionAr: string;
  documentLanguage: "ar" | "en" | "bilingual";
  fileName: string;
  fileMimeType: string;
  fileSize: number;
  featured: boolean;
  published: boolean;
  updatedAt?: string;
  hasFile: boolean;
}

export function localized(valueEn: string, valueAr: string, lang: "en" | "ar"): string {
  return lang === "ar" ? (valueAr || valueEn) : (valueEn || valueAr);
}

export function formatWorkDate(date: string, lang: "en" | "ar"): string {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString(lang === "ar" ? "ar" : "en-GB", { year: "numeric", month: "long" });
}

export function documentLanguageLabel(value: WorkSamplePublic["documentLanguage"], lang: "en" | "ar"): string {
  const labels = {
    en: { en: "English", ar: "Arabic", bilingual: "Arabic & English" },
    ar: { en: "الإنجليزية", ar: "العربية", bilingual: "العربية والإنجليزية" },
  } as const;
  return labels[lang][value];
}
