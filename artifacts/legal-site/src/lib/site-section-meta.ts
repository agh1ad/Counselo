type Region = "sa" | "syr" | "uae";
type Language = "en" | "ar";
type Section = "home" | "services" | "contact" | "about";

const COUNTRIES: Record<Region, Record<Language, string>> = {
  sa: { en: "Saudi Arabia", ar: "السعودية" },
  syr: { en: "Syria", ar: "سوريا" },
  uae: { en: "the UAE", ar: "الإمارات" },
};

/** Core section identities follow the public navigation; service leaves keep their own metadata. */
export function siteSectionMeta(path: string) {
  const match = path.match(/^\/(sa|syr|uae)(\/ar)?(?:\/(services|contact|about))?$/);
  if (!match) return undefined;
  const region = match[1] as Region;
  const language: Language = match[2] ? "ar" : "en";
  const section = (match[3] ?? "home") as Section;
  const country = COUNTRIES[region][language];
  const ar = language === "ar";
  const sectionLabels: Record<Section, string> = ar
    ? { home: "الرئيسية", services: "الخدمات", contact: "تواصل معنا", about: "من نحن" }
    : { home: "Home", services: "Services", contact: "Contact Us", about: "About Us" };
  const titles: Record<Section, string> = ar ? {
    home: `كاونسلو في ${country} | خدمات واستشارات قانونية`,
    services: `الخدمات القانونية في ${country} | كاونسلو`,
    contact: `تواصل معنا | كاونسلو في ${country}`,
    about: `من نحن | كاونسلو في ${country}`,
  } : {
    home: `CounselO Legal in ${country} | Advice & Representation`,
    services: `Legal Services in ${country} | CounselO Legal`,
    contact: `Contact Us | CounselO Legal in ${country}`,
    about: `About Us | CounselO Legal in ${country}`,
  };
  const descriptions: Record<Section, string> = ar ? {
    home: `خدمات قانونية في ${country} من الاستشارة والعقود إلى القضايا المعقدة. تحليل وصياغة ومتابعة، وتمثيل أمام المحاكم بواسطة المحامين المحليين المرخصين وفق نطاق التكليف.`,
    services: `استكشف خدمات كاونسلو في ${country} للأفراد والأعمال: استشارات وعقود ونزاعات وتمثيل بواسطة المحامين المحليين المرخصين. تعرّف على المستندات ونطاق كل خدمة.`,
    contact: `تواصل مع كاونسلو بشأن مسألتك القانونية في ${country}. شارك المتطلبات والمهل لتحديد المحامي المسؤول ونطاق العمل والأتعاب والمواعيد قبل بدء التكليف.`,
    about: `تعرّف على كاونسلو وفريقها وخدماتها في ${country} للمسائل اليومية والقضايا المعقدة. استعرض الأعمال المنشورة وآلية إدارة التكليف والتمثيل المحلي.`,
  } : {
    home: `Legal services in ${country}, from advice and contracts to complex disputes. Case preparation and court representation through licensed local lawyers.`,
    services: `Explore legal services in ${country}: advice, contracts, disputes and representation through licensed local lawyers. See each service's scope and documents.`,
    contact: `Contact CounselO about your legal matter in ${country}. Share your needs and deadlines to agree the responsible lawyer, scope, fees and timing before work begins.`,
    about: `Meet CounselO and its team serving ${country}, from everyday legal matters to complex cases. Explore published work, engagement standards and local representation.`,
  };
  return { title: titles[section], description: descriptions[section], label: sectionLabels[section], section, region, language };
}
