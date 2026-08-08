import { getRegionLabel, type Region } from "./region-services";

export type ArticleSource = {
  titleEn: string;
  titleAr: string;
  href: string;
};

export type ArticleProvenance = {
  primaryAuthorName: string;
  primaryAuthorNameAr: string;
  primaryAuthorUrl: string;
  legalReviewerName: string;
  legalReviewerNameAr: string;
  legalReviewerUrl: string;
  jurisdiction: Region;
  applicableLaw: string;
  applicableLawAr: string;
  sources: ArticleSource[];
  keyLegalUpdateNote: string;
  keyLegalUpdateNoteAr: string;
  contentMethodology: string;
  contentMethodologyAr: string;
  lastSubstantiveReviewAt: string;
  correctionUrl: string;
};

const AUTHOR = "CounselO Legal team";
const AUTHOR_AR = "فريق كاونسلو القانوني";
const REVIEWER = "Lawyer and Legal Consultant Omar Al-Baghdadi";
const REVIEWER_AR = "المحامي والمستشار القانوني عمر البغدادي";

const SOURCES: Record<Region, ArticleSource[]> = {
  sa: [
    { titleEn: "Bureau of Experts — Official Saudi Laws Portal", titleAr: "هيئة الخبراء — بوابة الأنظمة السعودية الرسمية", href: "https://laws.boe.gov.sa/" },
    { titleEn: "Saudi Ministry of Justice", titleAr: "وزارة العدل السعودية", href: "https://www.moj.gov.sa/" },
  ],
  syr: [
    { titleEn: "Syrian Ministry of Justice", titleAr: "وزارة العدل السورية", href: "http://www.moj.gov.sy/" },
    { titleEn: "Syrian legal legislation portal", titleAr: "بوابة التشريعات السورية", href: "http://www.parliament.gov.sy/" },
  ],
  uae: [
    { titleEn: "UAE Legislation", titleAr: "تشريعات دولة الإمارات", href: "https://uaelegislation.gov.ae/" },
    { titleEn: "UAE Government — Justice, Safety and the Law", titleAr: "حكومة الإمارات — العدل والسلامة والقانون", href: "https://u.ae/en/information-and-services/justice-safety-and-the-law" },
  ],
};

const SAUDI_TOPIC_SOURCES: Record<string, ArticleSource> = {
  "intellectual-property": { titleEn: "Saudi Authority for Intellectual Property", titleAr: "الهيئة السعودية للملكية الفكرية", href: "https://www.saip.gov.sa/" },
  "real-estate": { titleEn: "Real Estate General Authority", titleAr: "الهيئة العامة للعقار", href: "https://rega.gov.sa/" },
  "employment-law": { titleEn: "Ministry of Human Resources and Social Development", titleAr: "وزارة الموارد البشرية والتنمية الاجتماعية", href: "https://www.hrsd.gov.sa/" },
  "business-law": { titleEn: "Saudi Ministry of Commerce", titleAr: "وزارة التجارة السعودية", href: "https://mc.gov.sa/" },
  "companies-law": { titleEn: "Saudi Ministry of Commerce", titleAr: "وزارة التجارة السعودية", href: "https://mc.gov.sa/" },
  contracts: { titleEn: "Saudi Ministry of Commerce", titleAr: "وزارة التجارة السعودية", href: "https://mc.gov.sa/" },
  "foreign-investment": { titleEn: "Saudi Ministry of Investment", titleAr: "وزارة الاستثمار السعودية", href: "https://misa.gov.sa/" },
  "banking-finance": { titleEn: "Saudi Central Bank", titleAr: "البنك المركزي السعودي", href: "https://www.sama.gov.sa/" },
  "tax-zakat": { titleEn: "Zakat, Tax and Customs Authority", titleAr: "هيئة الزكاة والضريبة والجمارك", href: "https://zatca.gov.sa/" },
  "cyber-law": { titleEn: "Saudi Data and AI Authority", titleAr: "الهيئة السعودية للبيانات والذكاء الاصطناعي", href: "https://sdaia.gov.sa/" },
  "medical-malpractice": { titleEn: "Saudi Ministry of Health", titleAr: "وزارة الصحة السعودية", href: "https://www.moh.gov.sa/" },
  "insurance-law": { titleEn: "Insurance Authority", titleAr: "هيئة التأمين", href: "https://www.ia.gov.sa/" },
  arbitration: { titleEn: "Saudi Center for Commercial Arbitration", titleAr: "المركز السعودي للتحكيم التجاري", href: "https://sadr.org/" },
};

function inferRegion(text: string): Region {
  if (/United Arab Emirates|\bUAE\b|Dubai|Abu Dhabi|الإمارات|دبي|أبو ظبي/i.test(text)) return "uae";
  if (/Syria|Syrian|Damascus|سوريا|السوري|دمشق/i.test(text)) return "syr";
  return "sa";
}

function regionLaw(region: Region, category: string): [string, string] {
  const topic = category.trim() || "the subject discussed in this article";
  if (region === "uae") return [`UAE federal, emirate-level or free-zone law applicable to ${topic}`, `القانون الاتحادي أو المحلي أو قانون المنطقة الحرة في الإمارات المنطبق على ${topic}`];
  if (region === "syr") return [`Syrian legislation and implementing rules applicable to ${topic}`, `التشريعات السورية واللوائح التنفيذية المنطبقة على ${topic}`];
  return [`Saudi legislation and implementing rules applicable to ${topic}`, `الأنظمة السعودية واللوائح التنفيذية المنطبقة على ${topic}`];
}

function sourcesForArticle(region: Region, relatedServiceSlugs: string[] = []): ArticleSource[] {
  if (region !== "sa") return SOURCES[region];
  const topicSource = relatedServiceSlugs.map((slug) => SAUDI_TOPIC_SOURCES[slug]).find(Boolean);
  return topicSource ? [topicSource, SOURCES.sa[0]] : SOURCES.sa;
}

export function assignArticleProvenance(input: {
  titleEn?: string;
  titleAr?: string;
  excerptEn?: string;
  excerptAr?: string;
  categoryEn?: string;
  categoryAr?: string;
  bodyEn?: string;
  bodyAr?: string;
  relatedServiceSlugs?: string[];
  date?: string;
  updatedAt?: string | Date | null;
}): ArticleProvenance {
  const text = [input.titleEn, input.titleAr, input.excerptEn, input.excerptAr, input.categoryEn, input.categoryAr, input.bodyEn, input.bodyAr].filter(Boolean).join(" ");
  const jurisdiction = inferRegion(text);
  const [applicableLaw, applicableLawAr] = regionLaw(jurisdiction, input.categoryEn || input.categoryAr || "legal guidance");
  const reviewDate = input.updatedAt
    ? new Date(input.updatedAt).toISOString().slice(0, 10)
    : input.date || new Date().toISOString().slice(0, 10);
  return {
    primaryAuthorName: AUTHOR,
    primaryAuthorNameAr: AUTHOR_AR,
    primaryAuthorUrl: "/about",
    legalReviewerName: REVIEWER,
    legalReviewerNameAr: REVIEWER_AR,
    legalReviewerUrl: "/about",
    jurisdiction,
    applicableLaw,
    applicableLawAr,
    sources: sourcesForArticle(jurisdiction, input.relatedServiceSlugs),
    keyLegalUpdateNote: "Check the cited primary sources for amendments, implementing decisions and later official guidance before acting.",
    keyLegalUpdateNoteAr: "تحقق من المصادر الأولية المذكورة بشأن أي تعديلات أو قرارات تنفيذية أو إرشادات رسمية لاحقة قبل اتخاذ أي إجراء.",
    contentMethodology: "Primary-law review plus CounselO practice commentary.",
    contentMethodologyAr: "مراجعة المصادر القانونية الأولية مع تعليق عملي من كاونسلو.",
    lastSubstantiveReviewAt: reviewDate,
    correctionUrl: "/contact?subject=article-correction",
  };
}

export function articleJurisdictionLabel(region: Region, arabic = false): string {
  if (arabic) return region === "uae" ? "الإمارات العربية المتحدة" : region === "syr" ? "سوريا" : "المملكة العربية السعودية";
  return getRegionLabel(region);
}
