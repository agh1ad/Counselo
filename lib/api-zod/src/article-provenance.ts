import { getRegionLabel, type Region } from "./region-services";

export type ArticleSource = {
  titleEn: string;
  titleAr: string;
  href: string;
};

export type ArticleContentType = "legal-guidance" | "professional-commentary";

export type ArticleProvenance = {
  contentType: ArticleContentType;
  primaryAuthorName: string;
  primaryAuthorNameAr: string;
  primaryAuthorUrl: string;
  legalReviewerName: string;
  legalReviewerNameAr: string;
  legalReviewerUrl: string;
  jurisdiction?: Region;
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

const REVIEWER = "Lawyer and Legal Counsel Omar Al-Baghdadi";
const REVIEWER_AR = "المحامي والمستشار القانوني عمر البغدادي";
const AUTHOR = REVIEWER;
const AUTHOR_AR = REVIEWER_AR;

const SOURCES: Record<Region, ArticleSource[]> = {
  sa: [
    { titleEn: "Bureau of Experts — Official Saudi Laws Portal", titleAr: "هيئة الخبراء — بوابة الأنظمة السعودية الرسمية", href: "https://laws.boe.gov.sa/" },
    { titleEn: "Saudi Ministry of Justice", titleAr: "وزارة العدل السعودية", href: "https://www.moj.gov.sa/" },
  ],
  syr: [
    { titleEn: "Syrian Ministry of Justice", titleAr: "وزارة العدل السورية", href: "https://moj.gov.sy/" },
    { titleEn: "Syrian People's Assembly — official legislative website", titleAr: "مجلس الشعب السوري — الموقع التشريعي الرسمي", href: "https://www.parliament.gov.sy/" },
  ],
  uae: [
    { titleEn: "UAE Legislation", titleAr: "تشريعات دولة الإمارات", href: "https://uaelegislation.gov.ae/" },
    { titleEn: "UAE Government — Justice, Safety and the Law", titleAr: "حكومة الإمارات — العدل والسلامة والقانون", href: "https://u.ae/en/information-and-services/justice-safety-and-the-law" },
  ],
};

const UAE_TOPIC_SOURCES: Record<string, ArticleSource> = {
  "corporate-commercial": { titleEn: "UAE Legislation — Commercial Companies", titleAr: "تشريعات الإمارات — الشركات التجارية", href: "https://uaelegislation.gov.ae/en/legislations/1542" },
  "foreign-investment-market-entry": { titleEn: "UAE Ministry of Economy", titleAr: "وزارة الاقتصاد الإماراتية", href: "https://www.moec.gov.ae/" },
  "commercial-contracts": { titleEn: "UAE Legislation — Commercial Transactions", titleAr: "تشريعات الإمارات — المعاملات التجارية", href: "https://uaelegislation.gov.ae/en/legislations/1610" },
  "employment-labour": { titleEn: "UAE Legislation — Labour Relations", titleAr: "تشريعات الإمارات — علاقات العمل", href: "https://uaelegislation.gov.ae/en/legislations/1541" },
  "real-estate-construction": { titleEn: "UAE Government — Housing and Property", titleAr: "حكومة الإمارات — السكن والعقار", href: "https://u.ae/en/information-and-services/housing" },
  "family-personal-status": { titleEn: "UAE Legislation — Personal Status", titleAr: "تشريعات الإمارات — الأحوال الشخصية", href: "https://uaelegislation.gov.ae/en/legislations/2770" },
  "wills-estates": { titleEn: "UAE Ministry of Justice", titleAr: "وزارة العدل الإماراتية", href: "https://www.moj.gov.ae/" },
  "criminal-investigations": { titleEn: "UAE Ministry of Justice — Courts", titleAr: "وزارة العدل — المحاكم", href: "https://www.moj.gov.ae/" },
  "arbitration-mediation": { titleEn: "UAE Legislation — Arbitration", titleAr: "تشريعات الإمارات — التحكيم", href: "https://uaelegislation.gov.ae/en/legislations/1069" },
  "litigation-court-disputes": { titleEn: "UAE Ministry of Justice — Courts", titleAr: "وزارة العدل — المحاكم", href: "https://www.moj.gov.ae/" },
  "enforcement-debt-recovery": { titleEn: "UAE Legislation Portal", titleAr: "بوابة تشريعات الإمارات", href: "https://uaelegislation.gov.ae/en/legislations" },
  "banking-finance": { titleEn: "Central Bank of the UAE", titleAr: "مصرف الإمارات العربية المتحدة المركزي", href: "https://www.centralbank.ae/" },
  "insolvency-restructuring": { titleEn: "UAE Legislation — Financial Restructuring and Bankruptcy", titleAr: "تشريعات الإمارات — إعادة التنظيم المالي والإفلاس", href: "https://uaelegislation.gov.ae/en/legislations/2190" },
  "tax-vat": { titleEn: "UAE Federal Tax Authority", titleAr: "الهيئة الاتحادية للضرائب", href: "https://tax.gov.ae/en/taxes.aspx" },
  "intellectual-property": { titleEn: "UAE Ministry of Economy — Intellectual Property", titleAr: "وزارة الاقتصاد — الملكية الفكرية", href: "https://www.moec.gov.ae/intellectual-property" },
  "technology-data-protection": { titleEn: "UAE Data Office", titleAr: "مكتب الإمارات للبيانات", href: "https://u.ae/en/about-the-uae/digital-uae/data/data-protection-laws" },
  "insurance": { titleEn: "Central Bank of the UAE — Insurance", titleAr: "مصرف الإمارات المركزي — التأمين", href: "https://www.centralbank.ae/" },
  "healthcare-medical-liability": { titleEn: "UAE Ministry of Health and Prevention", titleAr: "وزارة الصحة ووقاية المجتمع", href: "https://mohap.gov.ae/" },
  "immigration-residency": { titleEn: "UAE Legislation — Entry and Residence", titleAr: "تشريعات الإمارات — دخول وإقامة الأجانب", href: "https://uaelegislation.gov.ae/en/legislations/1528" },
  "maritime-aviation-transport": { titleEn: "UAE Ministry of Energy and Infrastructure", titleAr: "وزارة الطاقة والبنية التحتية", href: "https://www.moei.gov.ae/" },
  "administrative-regulatory": { titleEn: "UAE Legislation Portal", titleAr: "بوابة تشريعات الإمارات", href: "https://uaelegislation.gov.ae/en/legislations" },
  "consumer-ecommerce": { titleEn: "UAE Ministry of Economy — Consumer Protection", titleAr: "وزارة الاقتصاد — حماية المستهلك", href: "https://www.moec.gov.ae/consumer-protection" },
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

const SYRIA_TOPIC_SOURCES: Record<string, ArticleSource> = {
  "family-law": SOURCES.syr[0],
  "business-law": SOURCES.syr[1],
  "real-estate": SOURCES.syr[1],
  "employment-law": SOURCES.syr[1],
  "foreign-investment": SOURCES.syr[1],
  "administrative-law": SOURCES.syr[0],
  arbitration: SOURCES.syr[1],
  enforcement: SOURCES.syr[0],
  "companies-law": SOURCES.syr[1],
  contracts: SOURCES.syr[1],
  "criminal-law": SOURCES.syr[0],
  "banking-finance": SOURCES.syr[1],
  "intellectual-property": SOURCES.syr[1],
  "tax-zakat": SOURCES.syr[1],
  "cyber-law": SOURCES.syr[1],
  "medical-malpractice": SOURCES.syr[0],
  "insurance-law": SOURCES.syr[1],
  "civil-law": SOURCES.syr[0],
  "civil-procedure": SOURCES.syr[0],
  "criminal-procedure": SOURCES.syr[0],
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
  if (region === "uae") {
    const topicSource = relatedServiceSlugs.map((slug) => UAE_TOPIC_SOURCES[slug]).find(Boolean);
    return topicSource ? [topicSource, SOURCES.uae[0]] : SOURCES.uae;
  }
  if (region === "syr") {
    const topicSource = relatedServiceSlugs.map((slug) => SYRIA_TOPIC_SOURCES[slug]).find(Boolean);
    return topicSource ? [topicSource, SOURCES.syr[topicSource === SOURCES.syr[0] ? 1 : 0]] : SOURCES.syr;
  }
  const topicSource = relatedServiceSlugs.map((slug) => SAUDI_TOPIC_SOURCES[slug]).find(Boolean);
  return topicSource ? [topicSource, SOURCES.sa[0]] : SOURCES.sa;
}

export function assignArticleProvenance(input: {
  contentType?: ArticleContentType;
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
  const contentType = input.contentType ?? "professional-commentary";
  const text = [input.titleEn, input.titleAr, input.excerptEn, input.excerptAr, input.categoryEn, input.categoryAr, input.bodyEn, input.bodyAr].filter(Boolean).join(" ");
  const jurisdiction = inferRegion(text);
  const [applicableLaw, applicableLawAr] = regionLaw(jurisdiction, input.categoryEn || input.categoryAr || "legal guidance");
  const reviewDate = input.updatedAt
    ? new Date(input.updatedAt).toISOString().slice(0, 10)
    : input.date || new Date().toISOString().slice(0, 10);
  return {
    contentType,
    primaryAuthorName: AUTHOR,
    primaryAuthorNameAr: AUTHOR_AR,
    primaryAuthorUrl: "/about",
    legalReviewerName: REVIEWER,
    legalReviewerNameAr: REVIEWER_AR,
    legalReviewerUrl: "/about",
    jurisdiction: contentType === "legal-guidance" ? jurisdiction : undefined,
    applicableLaw: contentType === "legal-guidance" ? applicableLaw : "",
    applicableLawAr: contentType === "legal-guidance" ? applicableLawAr : "",
    sources: contentType === "legal-guidance" ? sourcesForArticle(jurisdiction, input.relatedServiceSlugs) : [],
    keyLegalUpdateNote: contentType === "legal-guidance" ? "Check the cited primary sources for amendments, implementing decisions and later official guidance before acting." : "This is CounselO professional commentary, not a statement of the law of a particular jurisdiction.",
    keyLegalUpdateNoteAr: contentType === "legal-guidance" ? "تحقق من المصادر الأولية المذكورة بشأن أي تعديلات أو قرارات تنفيذية أو إرشادات رسمية لاحقة قبل اتخاذ أي إجراء." : "هذا تعليق مهني من كاونسلو وليس بياناً للقانون في اختصاص قضائي محدد.",
    contentMethodology: contentType === "legal-guidance" ? "Primary-law review plus CounselO practice commentary." : "CounselO editorial analysis and professional commentary based on team experience; no jurisdiction-specific legal conclusion is made.",
    contentMethodologyAr: contentType === "legal-guidance" ? "مراجعة المصادر القانونية الأولية مع تعليق عملي من كاونسلو." : "تحليل تحريري وتعليق مهني من فريق كاونسلو استناداً إلى الخبرة العملية، من دون إبداء نتيجة قانونية خاصة باختصاص محدد.",
    lastSubstantiveReviewAt: reviewDate,
    correctionUrl: "/contact?subject=article-correction",
  };
}

export function articleJurisdictionLabel(region: Region, arabic = false): string {
  if (arabic) return region === "uae" ? "الإمارات العربية المتحدة" : region === "syr" ? "سوريا" : "المملكة العربية السعودية";
  return getRegionLabel(region);
}
