import { SERVICE_INTAKE_CONTENT } from "./service-intake-content";
import { siteSectionMeta } from "./site-section-meta";

export const SEARCH_COPY_UPDATED_AT = "2026-09-07";

type Locale = "ar" | "en";
type Region = "sa" | "syr" | "uae";
type Translations = typeof import("../translations/en")["en"];
export const SEARCH_SERVICE_LABELS: Record<string, Record<Locale, string>> = {
  "urgent-legal-assistance": { en: "Urgent Legal Assistance", ar: "المساعدة القانونية العاجلة" },
  "family-law": {
    "ar": "الطلاق والنفقة وحضانة الأطفال",
    "en": "Divorce, maintenance and child custody"
  },
  "business-law": {
    "ar": "النزاعات التجارية ومطالبات الشركات",
    "en": "Commercial disputes and business claims"
  },
  "real-estate": {
    "ar": "النزاعات العقارية والإيجارية",
    "en": "Property and rental disputes"
  },
  "employment-law": {
    "ar": "القضايا العمالية والمستحقات الوظيفية",
    "en": "Employment disputes and unpaid benefits"
  },
  "foreign-investment": {
    "ar": "تأسيس الشركات والاستثمار الأجنبي",
    "en": "Company formation and foreign investment"
  },
  "administrative-law": {
    "ar": "التظلم من القرارات الإدارية",
    "en": "Administrative decisions and appeals"
  },
  "arbitration": {
    "ar": "التحكيم التجاري وتسوية النزاعات",
    "en": "Commercial arbitration and dispute resolution"
  },
  "enforcement": {
    "ar": "تحصيل الديون وتنفيذ الأحكام",
    "en": "Debt collection and judgment enforcement"
  },
  "companies-law": {
    "ar": "تأسيس الشركات ونزاعات الشركاء",
    "en": "Company formation and shareholder disputes"
  },
  "contracts": {
    "ar": "صياغة العقود ومراجعتها ونزاعاتها",
    "en": "Contract drafting, review and disputes"
  },
  "criminal-law": {
    "ar": "القضايا الجزائية والتحقيقات",
    "en": "Criminal cases and investigations"
  },
  "banking-finance": {
    "ar": "النزاعات المصرفية وعقود التمويل",
    "en": "Banking disputes and finance agreements"
  },
  "intellectual-property": {
    "ar": "تسجيل العلامات التجارية وحماية الملكية الفكرية",
    "en": "Trademarks and intellectual property protection"
  },
  "tax-zakat": {
    "ar": "الاعتراضات الضريبية والزكوية",
    "en": "Tax and zakat objections"
  },
  "cyber-law": {
    "ar": "الجرائم الإلكترونية والأدلة الرقمية",
    "en": "Cybercrime complaints and digital evidence"
  },
  "medical-malpractice": {
    "ar": "الأخطاء الطبية ومطالبات التعويض",
    "en": "Medical malpractice and compensation claims"
  },
  "insurance-law": {
    "ar": "رفض مطالبات التأمين ونزاعات التغطية",
    "en": "Rejected insurance claims and coverage disputes"
  },
  "civil-law": {
    "ar": "المطالبات المدنية والتعويض عن الضرر",
    "en": "Civil claims and damages"
  },
  "civil-procedure": {
    "ar": "إجراءات الدعوى المدنية والطعن بالأحكام",
    "en": "Civil court procedure and appeals"
  },
  "criminal-procedure": {
    "ar": "إجراءات التحقيق والتوقيف والطعن الجزائي",
    "en": "Criminal investigation, detention and appeals"
  },
  "wills-estates": {
    "ar": "الوصايا والميراث وتسوية التركات",
    "en": "Wills, inheritance and estate settlement"
  },
  "litigation-court-disputes": {
    "ar": "الدعاوى القضائية والاستئناف",
    "en": "Court claims and appeals"
  },
  "insolvency-restructuring": {
    "ar": "الإفلاس وإعادة هيكلة الديون",
    "en": "Insolvency and debt restructuring"
  },
  "tax-vat": {
    "ar": "ضريبة الشركات والقيمة المضافة والاعتراضات",
    "en": "Corporate tax, VAT and tax objections"
  },
  "technology-data-protection": {
    "ar": "حماية البيانات وعقود التقنية",
    "en": "Data protection and technology contracts"
  },
  "immigration-residency": {
    "ar": "الإقامة والتأشيرات ومشكلات الهجرة",
    "en": "Residency, visas and immigration issues"
  },
  "maritime-aviation-transport": {
    "ar": "منازعات الشحن والنقل البحري والجوي",
    "en": "Shipping, aviation and transport disputes"
  },
  "consumer-ecommerce": {
    "ar": "حقوق المستهلك ونزاعات التجارة الإلكترونية",
    "en": "Consumer rights and ecommerce disputes"
  },
  "corporate-commercial": {
    "ar": "النزاعات التجارية ومطالبات الشركات",
    "en": "Commercial disputes and business claims"
  },
  "foreign-investment-market-entry": {
    "ar": "تأسيس الشركات والاستثمار الأجنبي",
    "en": "Company formation and foreign investment"
  },
  "commercial-contracts": {
    "ar": "صياغة العقود ومراجعتها ونزاعاتها",
    "en": "Contract drafting, review and disputes"
  },
  "employment-labour": {
    "ar": "القضايا العمالية والمستحقات الوظيفية",
    "en": "Employment disputes and unpaid benefits"
  },
  "real-estate-construction": {
    "ar": "النزاعات العقارية والإيجارية",
    "en": "Property and rental disputes"
  },
  "family-personal-status": {
    "ar": "الطلاق والنفقة وحضانة الأطفال",
    "en": "Divorce, maintenance and child custody"
  },
  "criminal-investigations": {
    "ar": "القضايا الجزائية والتحقيقات",
    "en": "Criminal cases and investigations"
  },
  "arbitration-mediation": {
    "ar": "التحكيم التجاري وتسوية النزاعات",
    "en": "Commercial arbitration and dispute resolution"
  },
  "enforcement-debt-recovery": {
    "ar": "تحصيل الديون وتنفيذ الأحكام",
    "en": "Debt collection and judgment enforcement"
  },
  "insurance": {
    "ar": "رفض مطالبات التأمين ونزاعات التغطية",
    "en": "Rejected insurance claims and coverage disputes"
  },
  "healthcare-medical-liability": {
    "ar": "الأخطاء الطبية ومطالبات التعويض",
    "en": "Medical malpractice and compensation claims"
  },
  "administrative-regulatory": {
    "ar": "التظلم من القرارات الإدارية",
    "en": "Administrative decisions and appeals"
  }
};
export const SEARCH_COUNTRIES = {
  sa: { ar: "السعودية", en: "Saudi Arabia" },
  syr: { ar: "سوريا", en: "Syria" },
  uae: { ar: "الإمارات", en: "the UAE" },
} as const;

export function serviceSearchCopy(id: string, region: Region, lang: Locale) {
  const regionalLabels: Record<string, Record<Locale, string>> = {
    "syr:tax-zakat": {ar: "الاعتراضات الضريبية ومنازعات الرسوم", en: "Tax objections and disputed assessments"},
    "uae:corporate-commercial": {ar: "تأسيس الشركات ونزاعات الشركاء", en: "Company formation and shareholder disputes"},
    "uae:real-estate-construction": {ar: "النزاعات العقارية والإيجارية ومطالبات المقاولات", en: "Property, rental and construction disputes"},
  };
  const label = (regionalLabels[`${region}:${id}`] ?? SEARCH_SERVICE_LABELS[id])?.[lang];
  if (!label) return undefined;
  const country = SEARCH_COUNTRIES[region][lang];
  const heading = `${label} ${lang === "ar" ? "في" : "in"} ${country}`;
  const summary = SERVICE_INTAKE_CONTENT[id]?.summary[lang];
  return { label, heading, summary,
    title: `${heading} | ${lang === "ar" ? "كاونسلو للاستشارات القانونية" : "CounselO Legal"}`,
    description: id === "urgent-legal-assistance" && summary ? summary : lang === "ar"
      ? `استشارة قانونية مكتوبة بشأن ${label} في ${country} بالرسوم المنشورة لمجالها. تعرّف على المسائل والمستندات التي نراجعها، مع المناقشة والأسئلة ضمن موضوع الاستشارة.`
      : `Written legal advice on ${label.toLowerCase()} in ${country} at the published category fee. See the issues and documents we review, with discussion and questions on the same topic included.`,
  };
}

/** Explicit field overrides keep UI, intake and crawler HTML on the same subject.
 * The loaded translation object is shared: clone before changing any field.
 * Professional credentials, substantive guidance and procedural sources stay intact.
 */
export function alignSearchIntentCopy(source: Translations, region: Region, lang: Locale): Translations {
  const t = structuredClone(source);
  const ar = lang === "ar";
  const country = SEARCH_COUNTRIES[region][lang];
  const lookup = (path: string) => serviceSearchCopy(path.split("/").at(-1) ?? "", region, lang);
  const services = t.serviceDetail.services as Record<string, {title: string; subtitle: string; overview: string}>;
  for (const [id, service] of Object.entries(services)) {
    const copy = serviceSearchCopy(id, region, lang);
    if (!copy) continue;
    service.title = copy.label;
    if (copy.summary) { service.subtitle = copy.summary; service.overview = copy.summary; }
  }
  const urgent = serviceSearchCopy("urgent-legal-assistance", region, lang)!;
  if (!t.services.items.some(item => item.id === "urgent-legal-assistance")) {
    t.services.items.unshift({ id: "urgent-legal-assistance", title: urgent.label, longDesc: urgent.summary ?? "" });
    t.nav.servicesList.unshift({ href: "/services/urgent-legal-assistance", name: urgent.label });
  }
  t.services.items = t.services.items.map(item => {
    const copy = serviceSearchCopy(item.id, region, lang);
    return copy ? {...item, title: copy.label, longDesc: copy.summary ?? item.longDesc} : item;
  });
  t.nav.servicesList = t.nav.servicesList.map(item => ({...item, name: lookup(item.href)?.label ?? item.name}));
  t.footer.practiceAreaLinks = t.footer.practiceAreaLinks.map(item => ({...item, label: lookup(item.href)?.label ?? item.label}));
  t.home.practiceAreas.areas = t.home.practiceAreas.areas.map(item => {
    const copy = lookup(item.path);
    return {...item, title: copy?.label ?? item.title, desc: copy?.summary ?? item.desc};
  });
  t.contact.form.serviceOptions = t.contact.form.serviceOptions.map(item => ({...item, label: serviceSearchCopy(item.value, region, lang)?.label ?? item.label}));
  t.nav.services = ar ? "الخدمات القانونية" : "Legal services";
  t.nav.blog = ar ? "المقالات القانونية" : "Legal articles";
  t.nav.bookConsultation = ar ? "ناقش مسألتك أونلاين" : "Discuss your matter online";
  t.home.hero.h1a = ar ? "خدمات قانونية متخصصة أونلاين" : "Expert legal support online";
  t.home.hero.h1b = `${ar ? "في" : "in"} ${country}`;
  t.home.hero.badge = ar ? "فريق كاونسلو من الاستشارة إلى التمثيل" : "One CounselO team from advice to representation";
  t.home.hero.desc = ar ? `استشر محامي كاونسلو أونلاين في قضايا العمل والأسرة والعقارات والعقود والشركات في ${country}. نتولى المشورة والصياغة والتفاوض والتمثيل ونتابع مسألتك ضمن فريق واحد.` : `Consult CounselO’s lawyers online on employment, family, property, contracts and business matters in ${country}. We advise, draft, negotiate and represent you, with one team following your matter through.`;
  t.home.hero.descBold = ar ? "استشارة مهنية مكتوبة برسوم ثابتة منشورة، تشمل المناقشة والأسئلة ضمن الموضوع نفسه." : "Detailed written advice at published fixed fees, including discussion and questions on the same topic.";
  t.home.hero.descEnd = "";
  t.home.hero.subDesc = ar ? "يتولى فريق كاونسلو نفسه التواصل معك أونلاين والعمل القانوني والتمثيل، بما يشمل الحضور المطلوب أمام المحاكم والجهات المختصة بأعضائه المرخّصين في الدولة المعنية. ونوضح لك أي حضور شخصي يلزمك." : "The same CounselO team handles your online communication, legal work and representation, including required court and authority attendance through its appropriately licensed members. We explain any personal attendance required from you.";
  t.home.hero.bookBtn = t.nav.bookConsultation;
  t.home.hero.servicesBtn = ar ? "استعرض خدماتنا القانونية" : "Explore our legal services";
  t.home.practiceAreas.heading = ar ? `خدمات قانونية حسب نوع القضية في ${country}` : `Legal services by issue in ${country}`;
  t.home.practiceAreas.viewAllBtn = ar ? "جميع الخدمات القانونية" : "Browse all legal services";
  t.home.platform.heading = ar ? "تواصل أونلاين. وفريق واحد يتولى مسألتك." : "Connect online. One team handles your matter.";
  t.home.platform.subheading = ar ? "أرسل سؤالك والمستندات المتاحة، وحدد الدولة وأي موعد قريب. يراجع فريقنا مسألتك ويتفق معك على المشورة والصياغة والتمثيل والمتابعة التي تحتاجها." : "Send your question and available documents, identifying the country and any deadline. Our team reviews your matter and agrees the advice, drafting, representation and follow-up you need.";
  t.services.hero.heading = ar ? `الخدمات القانونية في ${country}` : `Legal services in ${country}`;
  t.services.hero.desc = ar ? "اختر الموضوع الأقرب إلى مسألتك للاطلاع على المشكلات التي نراجعها والمستندات المطلوبة والأسئلة الشائعة، ثم استشر محامينا أونلاين." : "Choose the issue closest to yours to see what we review, the documents to prepare and common questions, then consult our lawyers online.";
  t.footer.practiceAreasHeading = ar ? "مجالات الخدمات القانونية" : "Legal practice areas";
  t.footer.tagline = ar ? `خدمات قانونية متخصصة في ${country}. استشر فريق كاونسلو أونلاين وتابع معنا العقود والنزاعات والتمثيل القانوني.` : `Expert legal support in ${country}. Consult CounselO online and stay with our team for contracts, disputes and representation.`;
  t.contact.hero.heading = ar ? `تواصل أونلاين مع فريق كاونسلو في ${country}` : `Connect online with CounselO’s team in ${country}`;
  t.contact.hero.subheading = ar ? "أرسل تفاصيل مسألتك ومستنداتك، وبيّن ما تحتاج إليه من استشارة أو صياغة أو تفاوض أو تمثيل قانوني. يتولى فريق كاونسلو نفسه التواصل معك أونلاين والعمل القانوني والتمثيل، بما يشمل الحضور المطلوب أمام المحاكم والجهات المختصة بأعضائه المرخّصين في الدولة المعنية." : "Share your matter and documents, and tell us whether you need advice, drafting, negotiation or representation. The same CounselO team handles your online communication, legal work and representation, including required court and authority attendance through its appropriately licensed members.";
  t.contact.firmDetails.heading = ar ? "التواصل مع فريق كاونسلو" : "Contact the CounselO team";
  t.contact.form.messageLabel = ar ? "ما المسألة القانونية التي تحتاج إلى مساعدة بشأنها؟" : "What legal issue do you need help with?";
  t.aboutPage.hero.heading = ar ? "خدمات قانونية متخصصة أونلاين. فريق واحد من الاستشارة إلى التمثيل." : "Expert legal support online. One team from advice to representation.";
  t.aboutPage.hero.subheading = ar ? `استشارات وعقود وتمثيل قانوني للمسائل في ${country}، مع محامين متمرسين وتواصل أونلاين بالعربية والإنجليزية.` : `Legal advice, contracts and representation for matters in ${country}, with experienced lawyers and online access in Arabic and English.`;
  return t;
}

export function searchIntentMeta(path: string) {
  const match = path.match(/^\/(sa|syr|uae)(\/ar)?(?:\/(services|about|contact)(?:\/([^/]+))?)?$/);
  if (!match) return undefined;
  const region = match[1] as Region;
  const lang = match[2] ? "ar" : "en";
  if (match[4]) return match[3] === "services" ? serviceSearchCopy(match[4], region, lang) : undefined;
  return siteSectionMeta(path);
}
