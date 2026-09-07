import { SERVICE_INTAKE_CONTENT } from "./service-intake-content";

export const SEARCH_COPY_UPDATED_AT = "2026-09-07";

type Locale = "ar" | "en";
type Region = "sa" | "syr" | "uae";
type Translations = typeof import("../translations/en")["en"];
export const SEARCH_SERVICE_LABELS: Record<string, Record<Locale, string>> = {
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
    title: `${heading} | ${lang === "ar" ? "كاونسلو" : "CounselO"}`,
    description: lang === "ar"
      ? `استشارة قانونية بشأن ${label} في ${country}. تعرّف على المسائل التي نراجعها والمستندات المطلوبة، وأرسل تفاصيل طلبك لتحديد نطاق الاستشارة ورسومها.`
      : `Legal advice on ${label.toLowerCase()} in ${country}. See the issues and documents we review, then request a consultation with an agreed scope and fee.`,
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
  t.nav.services = ar ? "الاستشارات القانونية" : "Legal services";
  t.nav.blog = ar ? "المقالات القانونية" : "Legal articles";
  t.nav.bookConsultation = ar ? "اطلب استشارة قانونية" : "Request legal advice";
  t.home.hero.h1a = ar ? "استشارات قانونية أونلاين" : "Online legal advice";
  t.home.hero.h1b = `${ar ? "في" : "in"} ${country}`;
  t.home.hero.badge = ar ? "استشارات للأفراد والشركات بالعربية والإنجليزية" : "Legal consultations for individuals and businesses";
  t.home.hero.desc = ar ? `استشارة في قضايا العمل والأسرة والعقارات والعقود والشركات في ${country}. أرسل تفاصيل المسألة والمستندات عبر واتساب أو البريد الإلكتروني.` : `Get advice on employment, family, property, contract and business matters in ${country}. Send your question and documents by WhatsApp or email.`;
  t.home.hero.descBold = ar ? "نحدد نطاق الاستشارة ورسومها قبل بدء العمل." : "We agree the consultation scope and fee before work starts.";
  t.home.hero.descEnd = "";
  t.home.hero.subDesc = ar ? "نراجع الوقائع والمستندات لتوضيح الخيارات والخطوة التالية. وأي تمثيل أمام المحاكم يخضع لاتفاق مستقل والتحقق من المحامي المرخص محلياً." : "We review the facts and documents to explain your options and next step. Court representation requires a separate agreement and verification of the locally licensed lawyer.";
  t.home.hero.bookBtn = t.nav.bookConsultation;
  t.home.hero.servicesBtn = ar ? "اختر موضوع استشارتك" : "Find advice for your legal issue";
  t.home.practiceAreas.heading = ar ? `استشارات قانونية حسب نوع القضية في ${country}` : `Legal advice by issue in ${country}`;
  t.home.practiceAreas.viewAllBtn = ar ? "جميع موضوعات الاستشارة" : "Browse all legal services";
  t.home.platform.heading = ar ? "كيف تحصل على استشارة قانونية أونلاين؟" : "How to get legal advice online";
  t.home.platform.subheading = ar ? "أرسل سؤالك والمستندات المتاحة، وحدد الدولة وأي موعد عاجل. نؤكد نطاق المراجعة والرسوم وطريقة تسليم الاستشارة قبل البدء." : "Send your question and available documents, identifying the country and any urgent deadline. We confirm the review scope, fee and delivery method before starting.";
  t.services.hero.heading = ar ? `الاستشارات القانونية في ${country}` : `Legal consultation services in ${country}`;
  t.services.hero.desc = ar ? "اختر الموضوع الأقرب إلى مسألتك للاطلاع على المشكلات التي نراجعها والمستندات المطلوبة والأسئلة الشائعة، ثم اطلب استشارة بشأن حالتك." : "Choose the issue closest to yours to see what we review, the documents to prepare and common questions, then request advice on your circumstances.";
  t.footer.practiceAreasHeading = ar ? "موضوعات الاستشارة القانونية" : "Legal consultation topics";
  t.footer.tagline = ar ? `استشارات قانونية أونلاين في ${country} للأفراد والشركات. مراجعة الوقائع والمستندات وتوضيح الخيارات القانونية.` : `Online legal advice in ${country} for individuals and businesses. Review your facts and documents and understand your legal options.`;
  t.contact.hero.heading = ar ? `اطلب استشارة قانونية في ${country}` : `Request a legal consultation in ${country}`;
  t.contact.hero.subheading = ar ? "اشرح المسألة، وحدد الدولة والنتيجة المطلوبة وأي ميعاد قريب. نراجع الطلب ونؤكد نطاق الاستشارة ورسومها قبل بدء العمل المدفوع." : "Explain your legal issue, country, intended outcome and any urgent deadline. We review your request and confirm the consultation scope and fee before paid work starts.";
  t.contact.firmDetails.heading = ar ? "التواصل مع كاونسلو" : "Contact CounselO";
  t.contact.form.messageLabel = ar ? "ما المسألة القانونية التي تحتاج إلى مساعدة بشأنها؟" : "What legal issue do you need help with?";
  t.aboutPage.hero.heading = ar ? "عن كاونسلو للاستشارات القانونية أونلاين" : "About CounselO online legal consultations";
  t.aboutPage.hero.subheading = ar ? `تعرّف على الفريق المهني ومنهج مراجعة الطلبات ونطاق الاستشارات المقدمة بشأن المسائل القانونية في ${country}.` : `Meet the professionals behind CounselO and understand how we review requests and scope legal consultations concerning ${country}.`;
  return t;
}

export function searchIntentMeta(path: string) {
  const match = path.match(/^\/(sa|syr|uae)(\/ar)?(?:\/(services|about|contact|vision)(?:\/([^/]+))?)?$/);
  if (!match) return undefined;
  const region = match[1] as Region;
  const lang = match[2] ? "ar" : "en";
  if (match[4]) return match[3] === "services" ? serviceSearchCopy(match[4], region, lang) : undefined;
  const country = SEARCH_COUNTRIES[region][lang];
  const pageLabels = {
    services: {ar: "الاستشارات القانونية", en: "Legal consultation services"},
    about: {ar: "عن كاونسلو للاستشارات القانونية", en: "About CounselO legal consultations"},
    contact: {ar: "اطلب استشارة قانونية", en: "Request a legal consultation"},
    vision: {ar: "رؤية كاونسلو ومنهج الاستشارات القانونية", en: "CounselO’s vision and approach to legal advice"},
  };
  const page = match[3] as keyof typeof pageLabels | undefined;
  if (page) return {
    title: `${pageLabels[page][lang]} ${lang === "ar" ? "في" : "in"} ${country} | ${lang === "ar" ? "كاونسلو" : "CounselO"}`,
    description: lang === "ar"
      ? ({services: `اختر موضوع استشارتك القانونية في ${country}. اطّلع على نطاق مراجعة قضايا العمل والأسرة والعقارات والشركات والمستندات اللازمة لكل خدمة.`, about: `تعرّف على فريق كاونسلو وخبرته المهنية ومنهج مراجعة طلبات الاستشارة القانونية المتعلقة بـ${country} وحدود نطاق الخدمة.`, contact: `اطلب استشارة قانونية بشأن مسألتك في ${country} عبر واتساب أو البريد الإلكتروني. أرسل الوقائع والمواعيد المهمة لتأكيد نطاق المراجعة ورسومها.`, vision: `تعرّف على منهج كاونسلو للاستشارات القانونية المتعلقة بـ${country}: مراجعة الوقائع والمصادر، وضوح النطاق، وسرية المعلومات.`})[page]
      : ({services: `Find legal advice in ${country} by issue. Explore employment, family, property and business services, review scope and the documents to prepare.`, about: `Meet CounselO’s professionals and learn about their experience, request review process and the scope of legal consultations concerning ${country}.`, contact: `Request legal advice concerning ${country} by WhatsApp or email. Send the facts and relevant dates so we can confirm the review scope and fee.`, vision: `Learn how CounselO approaches legal consultations concerning ${country}: review of facts and sources, a clear scope and professional confidentiality.`})[page],
  };
  return {
    title: lang === "ar" ? `استشارات قانونية أونلاين في ${country} | كاونسلو` : `Online legal advice in ${country} | CounselO`,
    description: lang === "ar" ? `استشارات قانونية في ${country} بشأن العمل والأسرة والعقارات والعقود والشركات. أرسل سؤالك ومستنداتك عبر واتساب أو البريد لتحديد نطاق الاستشارة ورسومها.` : `Online legal advice in ${country} on employment, family, property, contracts and business. Send your question to confirm the consultation scope and fee.`,
  };
}
