/** Published Saudi consultation fees in SAR. Category IDs do not create service routes. */
export const SAUDI_CONSULTATION_PRICES_UPDATED_AT = "2026-11-18";

export const SAUDI_CONSULTATION_PRICES = [
  { id: "family-law", titleEn: "Family Law", titleAr: "قانون الأسرة", priceSAR: 250 },
  { id: "business-law", titleEn: "Commercial Law", titleAr: "القانون التجاري", priceSAR: 350 },
  { id: "real-estate", titleEn: "Property Law", titleAr: "قانون العقارات", priceSAR: 300 },
  { id: "employment-law", titleEn: "Employment Law", titleAr: "قانون العمل", priceSAR: 250 },
  { id: "foreign-investment", titleEn: "Foreign Investment", titleAr: "الاستثمار الأجنبي", priceSAR: 500 },
  { id: "administrative-law", titleEn: "Administrative Law", titleAr: "القانون الإداري", priceSAR: 350 },
  { id: "arbitration", titleEn: "Arbitration & Mediation", titleAr: "التحكيم والوساطة", priceSAR: 500 },
  { id: "enforcement", titleEn: "Enforcement & Debt Collection", titleAr: "التنفيذ وتحصيل الديون", priceSAR: 300 },
  { id: "companies-law", titleEn: "Companies Law", titleAr: "قانون الشركات", priceSAR: 400 },
  { id: "contracts", titleEn: "Contracts", titleAr: "العقود", priceSAR: 350 },
  { id: "criminal-law", titleEn: "Criminal Law", titleAr: "القانون الجنائي", priceSAR: 350 },
  { id: "banking-finance", titleEn: "Banking & Finance", titleAr: "القانون المصرفي والتمويل", priceSAR: 400 },
  { id: "intellectual-property", titleEn: "Intellectual Property", titleAr: "الملكية الفكرية", priceSAR: 350 },
  { id: "tax-zakat", titleEn: "Tax & Zakat", titleAr: "الضرائب والزكاة", priceSAR: 400 },
  { id: "cyber-law", titleEn: "Cyber & IT Law", titleAr: "القانون الإلكتروني", priceSAR: 350 },
  { id: "medical-malpractice", titleEn: "Medical Liability", titleAr: "المسؤولية الطبية", priceSAR: 500 },
  { id: "insurance-law", titleEn: "Insurance Law", titleAr: "قانون التأمين", priceSAR: 350 },
  { id: "civil-law", titleEn: "Civil Law", titleAr: "القانون المدني", priceSAR: 300 },
  { id: "civil-procedure", titleEn: "Civil Procedure", titleAr: "أصول المحاكمات المدنية", priceSAR: 300 },
  { id: "criminal-procedure", titleEn: "Criminal Procedure", titleAr: "أصول المحاكمات الجزائية", priceSAR: 350 },
  { id: "wills-estates", titleEn: "Wills, Estates & Inheritance", titleAr: "الوصايا والتركات والميراث", priceSAR: 350 },
  { id: "insolvency-restructuring", titleEn: "Financial Restructuring & Bankruptcy", titleAr: "إعادة التنظيم المالي والإفلاس", priceSAR: 500 },
  { id: "immigration-residency", titleEn: "Entry, Residency & Immigration", titleAr: "الدخول والإقامة والهجرة", priceSAR: 300 },
  { id: "maritime-aviation-transport", titleEn: "Maritime, Aviation & Transport", titleAr: "القانون البحري والجوي والنقل", priceSAR: 500 },
  { id: "consumer-ecommerce", titleEn: "Consumer Protection, E-commerce & Digital Business", titleAr: "حماية المستهلك والتجارة الإلكترونية والأعمال الرقمية", priceSAR: 300 },
] as const;

export type SaudiConsultationPrice = (typeof SAUDI_CONSULTATION_PRICES)[number];
export type SaudiConsultationCategoryId = SaudiConsultationPrice["id"];

export const SAUDI_CONSULTATION_SCOPE = {
  en: "The fixed fee includes detailed, professional written legal advice online, with discussion and answers to your questions on the same consultation topic. The same CounselO team provides legal representation, with separate fees agreed when you request it.",
  ar: "تشمل الرسوم الثابتة استشارة قانونية مهنية مكتوبة ومفصلة عبر الإنترنت، مع مناقشة الاستشارة والإجابة عن أسئلتك في موضوعها نفسه. ويتولى فريق كاونسلو نفسه التمثيل القانوني، بأتعاب منفصلة نتفق عليها معك عند طلبه.",
} as const;

const pricesById = new Map<string, SaudiConsultationPrice>(SAUDI_CONSULTATION_PRICES.map(category => [category.id, category]));

/** @deprecated Each service has one consultation fee for all of its topics. */
export function getSaudiConsultationRelatedPrices(_serviceSlug: string): readonly SaudiConsultationPrice[] {
  return [];
}

/** Every topic within a Saudi service uses that service's published fee. */
export function getSaudiConsultationPrice(serviceSlug: string, _problemSlug?: string): SaudiConsultationPrice | undefined {
  return pricesById.get(serviceSlug);
}
