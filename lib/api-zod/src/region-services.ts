export type Region = "uae" | "sa" | "syr";

export type ServiceDefinition = {
  slug: string;
  /** Shared discovery family used to align equivalent regional offerings. */
  clusterSlug: string;
  regions: Region[];
  titleEn: string;
  titleAr: string;
  leadCategory: string;
};

const sharedServices = [
  ["family-law", "Family Law", "قانون الأسرة", "family"],
  ["business-law", "Commercial Law", "القانون التجاري", "business"],
  ["real-estate", "Property Law", "قانون العقارات", "property"],
  ["employment-law", "Employment Law", "قانون العمل", "employment"],
  ["foreign-investment", "Foreign Investment", "الاستثمار الأجنبي", "investment"],
  ["administrative-law", "Administrative Law", "القانون الإداري", "administrative"],
  ["arbitration", "Arbitration & Mediation", "التحكيم والوساطة", "disputes"],
  ["enforcement", "Enforcement & Debt Collection", "التنفيذ وتحصيل الديون", "enforcement"],
  ["companies-law", "Companies Law", "قانون الشركات", "business"],
  ["contracts", "Contracts", "العقود", "contracts"],
  ["criminal-law", "Criminal Law", "القانون الجنائي", "criminal"],
  ["banking-finance", "Banking & Finance", "القانون المصرفي والتمويل", "finance"],
  ["intellectual-property", "Intellectual Property", "الملكية الفكرية", "ip"],
  ["tax-zakat", "Tax & Zakat", "الضرائب والزكاة", "tax"],
  ["cyber-law", "Cyber & IT Law", "القانون الإلكتروني", "technology"],
  ["medical-malpractice", "Medical Malpractice", "المسؤولية الطبية", "medical"],
  ["insurance-law", "Insurance Law", "قانون التأمين", "insurance"],
] as const satisfies ReadonlyArray<[string, string, string, string]>;

const saSyriaServices: ServiceDefinition[] = sharedServices.map(
  ([slug, titleEn, titleAr, leadCategory]) => ({
    slug,
    clusterSlug: slug,
    regions: ["sa", "syr"],
    titleEn,
    titleAr,
    leadCategory,
  }),
);

const syriaOnlyServices: ServiceDefinition[] = [
  ["civil-law", "Civil Law", "القانون المدني", "civil"],
  ["civil-procedure", "Civil Procedure", "أصول المحاكمات المدنية", "civil"],
  ["criminal-procedure", "Criminal Procedure", "أصول المحاكمات الجزائية", "criminal"],
].map(([slug, titleEn, titleAr, leadCategory]) => ({
  slug,
  clusterSlug: slug,
  regions: ["syr"],
  titleEn,
  titleAr,
  leadCategory,
}));

const uaeServices: ServiceDefinition[] = [
  { slug: "corporate-commercial", clusterSlug: "business-law", regions: ["uae"], titleEn: "Company Formation & Commercial Companies Law", titleAr: "تأسيس الشركات وقانون الشركات التجارية", leadCategory: "business" },
  { slug: "foreign-investment-market-entry", clusterSlug: "foreign-investment", regions: ["uae"], titleEn: "Foreign Investment & Market Entry", titleAr: "الاستثمار الأجنبي ودخول السوق", leadCategory: "investment" },
  { slug: "commercial-contracts", clusterSlug: "contracts", regions: ["uae"], titleEn: "Commercial Contracts", titleAr: "العقود التجارية", leadCategory: "contracts" },
  { slug: "employment-labour", clusterSlug: "employment-law", regions: ["uae"], titleEn: "Employment & Labour Relations", titleAr: "علاقات العمل والتوظيف", leadCategory: "employment" },
  { slug: "real-estate-construction", clusterSlug: "real-estate", regions: ["uae"], titleEn: "Real Estate & Construction", titleAr: "العقارات والإنشاءات", leadCategory: "property" },
  { slug: "family-personal-status", clusterSlug: "family-law", regions: ["uae"], titleEn: "Family & Personal Status", titleAr: "الأسرة والأحوال الشخصية", leadCategory: "family" },
  { slug: "wills-estates", clusterSlug: "wills-estates", regions: ["uae"], titleEn: "Wills, Estates & Succession", titleAr: "الوصايا والتركات والميراث", leadCategory: "family" },
  { slug: "criminal-investigations", clusterSlug: "criminal-law", regions: ["uae"], titleEn: "Criminal Law, Investigations & Procedure", titleAr: "القانون الجزائي والتحقيقات والإجراءات", leadCategory: "criminal" },
  { slug: "arbitration-mediation", clusterSlug: "arbitration", regions: ["uae"], titleEn: "Arbitration & Mediation", titleAr: "التحكيم والوساطة", leadCategory: "disputes" },
  { slug: "litigation-court-disputes", clusterSlug: "civil-law", regions: ["uae"], titleEn: "Civil & Commercial Litigation", titleAr: "التقاضي المدني والتجاري", leadCategory: "disputes" },
  { slug: "enforcement-debt-recovery", clusterSlug: "enforcement", regions: ["uae"], titleEn: "Enforcement & Debt Recovery", titleAr: "التنفيذ وتحصيل الديون", leadCategory: "enforcement" },
  { slug: "banking-finance", clusterSlug: "banking-finance", regions: ["uae"], titleEn: "Banking, Finance & Financial Regulation", titleAr: "البنوك والتمويل والتنظيم المالي", leadCategory: "finance" },
  { slug: "insolvency-restructuring", clusterSlug: "insolvency-restructuring", regions: ["uae"], titleEn: "Financial Restructuring & Bankruptcy", titleAr: "إعادة التنظيم المالي والإفلاس", leadCategory: "finance" },
  { slug: "tax-vat", clusterSlug: "tax-zakat", regions: ["uae"], titleEn: "Corporate Tax, VAT & Tax Disputes", titleAr: "ضريبة الشركات وضريبة القيمة المضافة والمنازعات الضريبية", leadCategory: "tax" },
  { slug: "intellectual-property", clusterSlug: "intellectual-property", regions: ["uae"], titleEn: "Intellectual Property & Brand Protection", titleAr: "الملكية الفكرية وحماية العلامات", leadCategory: "ip" },
  { slug: "technology-data-protection", clusterSlug: "cyber-law", regions: ["uae"], titleEn: "Technology, Data Protection & Cybercrime", titleAr: "التقنية وحماية البيانات والجرائم الإلكترونية", leadCategory: "technology" },
  { slug: "insurance", clusterSlug: "insurance-law", regions: ["uae"], titleEn: "Insurance & Coverage Disputes", titleAr: "التأمين ومنازعات التغطية", leadCategory: "insurance" },
  { slug: "healthcare-medical-liability", clusterSlug: "medical-malpractice", regions: ["uae"], titleEn: "Healthcare & Medical Liability", titleAr: "الرعاية الصحية والمسؤولية الطبية", leadCategory: "medical" },
  { slug: "immigration-residency", clusterSlug: "immigration-residency", regions: ["uae"], titleEn: "Entry, Residency & Immigration", titleAr: "الدخول والإقامة والهجرة", leadCategory: "immigration" },
  { slug: "maritime-aviation-transport", clusterSlug: "maritime-aviation-transport", regions: ["uae"], titleEn: "Maritime, Aviation & Transport", titleAr: "القانون البحري والجوي والنقل", leadCategory: "transport" },
  { slug: "administrative-regulatory", clusterSlug: "administrative-law", regions: ["uae"], titleEn: "Administrative & Regulatory Law", titleAr: "القانون الإداري والتنظيمي", leadCategory: "administrative" },
  { slug: "consumer-ecommerce", clusterSlug: "consumer-ecommerce", regions: ["uae"], titleEn: "Consumer, E-commerce & Digital Business", titleAr: "حماية المستهلك والتجارة الإلكترونية والأعمال الرقمية", leadCategory: "consumer" },
];

export const SERVICE_REGISTRY: readonly ServiceDefinition[] = [
  ...saSyriaServices,
  ...syriaOnlyServices,
  ...uaeServices,
];

export function getServicesForRegion(region: Region): ServiceDefinition[] {
  return SERVICE_REGISTRY.filter((service) => service.regions.includes(region));
}

export function getServiceDefinition(
  slug: string,
  region?: Region,
): ServiceDefinition | undefined {
  return (region ? getServicesForRegion(region) : SERVICE_REGISTRY).find(
    (service) => service.slug === slug,
  );
}

export function isServiceValidForRegion(region: Region, slug: string): boolean {
  return getServicesForRegion(region).some((service) => service.slug === slug);
}

export function getRegionLabel(region: Region): string {
  return region === "uae" ? "United Arab Emirates" : region === "syr" ? "Syria" : "Saudi Arabia";
}

export function getCrmRoute(region: Region, leadCategory: string): string {
  return `counselo-${region}-${leadCategory}`;
}
