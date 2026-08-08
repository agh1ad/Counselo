import type { Region, Lang } from "../contexts/RegionContext.js";
import { ADDITIONAL_SEARCH_ISSUES, SERVICE_SEARCH_CONTENT } from "./service-search-content.js";
import { UAE_SERVICES } from "../data/uae-legal-services.js";
import { buildUaeServicePageContent } from "../data/uae-service-page-content.js";
import { getServiceDefinition, getServicesForRegion } from "@workspace/api-zod";

export type LocalizedText = { en: string; ar: string };
export type LocalizedList = { en: string[]; ar: string[] };
export type LocalizedFaq = { en: { q: string; a: string }[]; ar: { q: string; a: string }[] };
export type ProcessStep = { title: string; desc: string };
export type LocalizedProcess = { en: ProcessStep[]; ar: ProcessStep[] };

export type LegalProblemPage = {
  region: Region;
  parentServiceSlug: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  serviceTitleEn: string;
  serviceTitleAr: string;
  overview: LocalizedText;
  keyQuestions: LocalizedList;
  documentsEn: string[];
  documentsAr: string[];
  deliverables: LocalizedList;
  process: LocalizedProcess;
  experience: LocalizedText;
  faqs: LocalizedFaq;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "legal-problem";
}

function countryName(region: Region): LocalizedText {
  return region === "uae"
    ? { en: "the UAE", ar: "الإمارات" }
    : region === "syr"
      ? { en: "Syria", ar: "سوريا" }
      : { en: "Saudi Arabia", ar: "السعودية" };
}

type ProblemProfile = {
  factsEn: string;
  factsAr: string;
  evidenceEn: string;
  evidenceAr: string;
  outcomeEn: string;
  outcomeAr: string;
};

const SYRIA_ADDITIONAL_ISSUES: Record<string, LocalizedList> = {
  "family-law": {
    en: ["Recognition and enforcement of a Syrian family judgment", "Family-status document or civil-record correction"],
    ar: ["الاعتراف بالحكم الأسري السوري وتنفيذه", "تصحيح وثيقة الحالة الأسرية أو السجل المدني"],
  },
  "business-law": {
    en: ["Commercial-register and company-record dispute", "Commercial agency and distribution termination"],
    ar: ["منازعة السجل التجاري وسجلات الشركة", "إنهاء الوكالة التجارية أو التوزيع"],
  },
  "real-estate": {
    en: ["Land-registry and title-record correction", "Property possession and handover dispute"],
    ar: ["تصحيح قيود السجل العقاري وسند الملكية", "منازعة حيازة العقار وتسليمه"],
  },
  "employment-law": {
    en: ["Employment termination and labour-record dispute", "Work-permit or employment-status problem"],
    ar: ["منازعة إنهاء العمل والسجل العمالي", "مشكلة تصريح العمل أو الوضع الوظيفي"],
  },
  "foreign-investment": {
    en: ["Foreign-investor licensing and registration problem", "Cross-border investment payment or exit dispute"],
    ar: ["مشكلة ترخيص وتسجيل المستثمر الأجنبي", "منازعة دفع أو خروج استثماري عابر للحدود"],
  },
  "administrative-law": {
    en: ["Challenge to an administrative licence or public decision", "Administrative compensation claim"],
    ar: ["الطعن في الترخيص أو القرار الإداري", "مطالبة التعويض عن القرار الإداري"],
  },
  arbitration: {
    en: ["Challenge to a Syrian arbitration agreement or award", "Appointment or removal of an arbitrator dispute"],
    ar: ["الطعن في اتفاق التحكيم أو الحكم التحكيمي السوري", "منازعة تعيين المحكم أو رده"],
  },
  enforcement: {
    en: ["Execution of a Syrian court judgment", "Objection to an execution measure or seizure"],
    ar: ["تنفيذ حكم قضائي سوري", "الاعتراض على إجراء تنفيذي أو حجز"],
  },
  "companies-law": {
    en: ["Company registration and amendment dispute", "Partner withdrawal and liquidation dispute"],
    ar: ["منازعة تسجيل الشركة وتعديلها", "منازعة انسحاب الشريك وتصفية الشركة"],
  },
  contracts: {
    en: ["Commercial contract dispute under Syrian law", "Contract authentication and evidence problem"],
    ar: ["منازعة العقد التجاري بموجب القانون السوري", "مشكلة توثيق العقد وإثباته"],
  },
  "criminal-law": {
    en: ["Criminal complaint before Syrian authorities", "Criminal case settlement and compensation claim"],
    ar: ["الشكوى الجزائية أمام الجهات السورية", "التسوية في الدعوى الجزائية ومطالبة التعويض"],
  },
  "banking-finance": {
    en: ["Banking dispute with a Syrian financial institution", "Loan, guarantee or collateral enforcement dispute"],
    ar: ["منازعة مصرفية مع مؤسسة مالية سورية", "منازعة القرض أو الكفالة أو تنفيذ الضمان"],
  },
  "intellectual-property": {
    en: ["Trademark registration or opposition in Syria", "Copyright infringement and takedown request"],
    ar: ["تسجيل العلامة التجارية أو الاعتراض عليها في سوريا", "التعدي على حقوق المؤلف وطلب الإزالة"],
  },
  "tax-zakat": {
    en: ["Syrian tax assessment and objection", "Customs valuation or penalty dispute"],
    ar: ["الربط الضريبي السوري والاعتراض عليه", "منازعة التقييم الجمركي أو الغرامة"],
  },
  "cyber-law": {
    en: ["Cybercrime complaint and digital-evidence problem in Syria", "Online defamation and removal request in Syria"],
    ar: ["الشكوى في الجريمة الإلكترونية ومشكلة الدليل الرقمي في سوريا", "التشهير الإلكتروني وطلب الإزالة في سوريا"],
  },
  "medical-malpractice": {
    en: ["Medical negligence complaint and compensation in Syria", "Medical-record access and expert-evidence dispute"],
    ar: ["الشكوى عن الخطأ الطبي والتعويض في سوريا", "منازعة الحصول على السجل الطبي ودليل الخبرة"],
  },
  "insurance-law": {
    en: ["Insurance claim dispute with a Syrian insurer", "Traffic-accident compensation and fault dispute in Syria"],
    ar: ["منازعة مطالبة تأمينية مع شركة تأمين سورية", "التعويض عن الحادث المروري ومنازعة نسبة الخطأ في سوريا"],
  },
  "civil-law": {
    en: ["Civil compensation claim in Syria", "Defamation and reputation-damage claim in Syria"],
    ar: ["المطالبة بالتعويض المدني في سوريا", "مطالبة التعويض عن التشهير والضرر بالسمعة في سوريا"],
  },
  "civil-procedure": {
    en: ["Court filing and jurisdiction objection in Syria", "Appeal deadline and service problem in Syria"],
    ar: ["الاعتراض على قيد الدعوى والاختصاص في سوريا", "مشكلة ميعاد الطعن والتبليغ في سوريا"],
  },
  "criminal-procedure": {
    en: ["Arrest, detention and release application in Syria", "Criminal appeal and evidence objection in Syria"],
    ar: ["التوقيف والاحتجاز وطلب إخلاء السبيل في سوريا", "الطعن الجزائي والاعتراض على الدليل في سوريا"],
  },
};

const SAUDI_ADDITIONAL_ISSUES: Record<string, LocalizedList> = {
  "employment-law": {
    en: ["Workplace discrimination and harassment complaint", "Commission and bonus payment dispute", "GOSI registration or contribution dispute", "Sick leave and annual leave entitlement dispute", "Non-compete and confidentiality clause dispute", "Employment dispute after resignation or job transfer"],
    ar: ["شكوى التمييز والتحرش في مكان العمل", "منازعة صرف العمولة والمكافأة", "منازعة التسجيل أو الاشتراك في التأمينات الاجتماعية", "منازعة استحقاق الإجازة المرضية والسنوية", "منازعة شرط عدم المنافسة والسرية", "منازعة عمالية بعد الاستقالة أو نقل الوظيفة"],
  },
  "real-estate": {
    en: ["Ejar rental contract and registration dispute", "Off-plan property purchase and developer delay claim", "Mortgage, financing and property-lien dispute", "Foreign property ownership eligibility problem", "Property handover and defects after purchase"],
    ar: ["منازعة عقد الإيجار وتسجيله في إيجار", "شراء عقار على الخارطة ومطالبة تأخر المطور", "منازعة الرهن والتمويل والحق العيني على العقار", "مشكلة أهلية تملك الأجنبي للعقار", "منازعة تسليم العقار وعيوبه بعد الشراء"],
  },
  "family-law": {
    en: ["Khulʿ and marriage-annulment dispute", "Domestic-violence protection and family-safety application", "Marital-status document and record correction", "Contested will and inheritance distribution dispute"],
    ar: ["منازعة الخلع وفسخ الزواج", "طلب الحماية من العنف الأسري وحماية الأسرة", "تصحيح وثيقة أو سجل الحالة الزوجية", "منازعة الوصية وتوزيع التركة"],
  },
  "criminal-law": {
    en: ["Fraud and financial-crime accusation", "Forgery and false-document accusation", "Breach-of-trust complaint or defence", "Public Prosecution investigation and questioning", "Criminal compensation and restitution claim"],
    ar: ["اتهام بالاحتيال أو جريمة مالية", "اتهام بالتزوير أو استعمال محرر مزور", "شكوى أو دفاع في خيانة الأمانة", "التحقيق والاستجواب أمام النيابة العامة", "المطالبة بالتعويض والرد في الدعوى الجزائية"],
  },
  "business-law": {
    en: ["Franchise agreement and termination dispute", "Commercial distribution and agency dispute", "Commercial due diligence before acquisition or investment", "Business sale and purchase dispute", "Competition and unfair-trade-practice complaint"],
    ar: ["منازعة عقد الامتياز التجاري وإنهائه", "منازعة التوزيع والوكالة التجارية", "الفحص القانوني التجاري قبل الاستحواذ أو الاستثمار", "منازعة بيع وشراء المنشأة", "شكوى المنافسة والممارسات التجارية غير العادلة"],
  },
  "companies-law": {
    en: ["Mergers and acquisitions legal due diligence", "Minority shareholder oppression dispute", "Company valuation and shareholder buyout dispute"],
    ar: ["الفحص القانوني لعمليات الاندماج والاستحواذ", "منازعة إضرار الأغلبية بحقوق الأقلية من المساهمين", "منازعة تقييم الشركة وشراء حصة المساهم"],
  },
  enforcement: {
    en: ["Promissory-note and commercial-paper enforcement", "Bank-account and salary seizure dispute", "Execution against an unavailable or absconding debtor", "Objection to an execution judge's decision"],
    ar: ["تنفيذ السند لأمر والأوراق التجارية", "منازعة الحجز على الحساب البنكي والراتب", "التنفيذ على مدين متعذر الوصول إليه أو هارب", "الاعتراض على قرار قاضي التنفيذ"],
  },
  "banking-finance": {
    en: ["Frozen bank account and lifting request", "Credit report and banking-record dispute", "Debt settlement and financing restructuring", "Debt-collection harassment and bank dispute"],
    ar: ["تجميد الحساب البنكي وطلب رفع التجميد", "منازعة التقرير الائتماني والسجل المصرفي", "تسوية الدين وإعادة هيكلة التمويل", "مضايقات تحصيل الدين والمنازعة المصرفية"],
  },
  "tax-zakat": {
    en: ["ZATCA e-invoicing compliance problem", "Withholding-tax assessment and objection", "VAT penalty and late-registration dispute", "Tax certificate and clearance problem"],
    ar: ["مشكلة الامتثال للفوترة الإلكترونية لدى زاتكا", "الربط والاعتراض على ضريبة الاستقطاع", "منازعة غرامة ضريبة القيمة المضافة والتسجيل المتأخر", "مشكلة الشهادة أو المخالصة الضريبية"],
  },
  "administrative-law": {
    en: ["Board of Grievances appeal against an administrative judgment", "Municipal licence refusal and business-activity suspension", "Government compensation claim for an administrative decision", "Public-sector employment and disciplinary dispute"],
    ar: ["الاستئناف أمام ديوان المظالم ضد الحكم الإداري", "رفض الرخصة البلدية وإيقاف النشاط التجاري", "مطالبة التعويض عن القرار الإداري", "منازعة الوظيفة العامة والتأديب"],
  },
  "foreign-investment": {
    en: ["Foreign investor due diligence and market-entry review", "Investment exit, repatriation and shareholder dispute"],
    ar: ["الفحص القانوني للمستثمر الأجنبي ومراجعة دخول السوق", "خروج الاستثمار وتحويل الأموال ومنازعة المساهمين"],
  },
  contracts: {
    en: ["Power-of-attorney drafting and authority dispute", "Document attestation and contract authentication problem"],
    ar: ["صياغة الوكالة ومنازعة حدود الصلاحية", "مشكلة تصديق المستند وتوثيق العقد"],
  },
};

const OVERLAPPING_SHARED_ISSUES: Record<string, Set<string>> = {
  "insurance-law": new Set(["Denied or delayed insurance claims", "Liability and compensation", "Settlement negotiation"]),
  "banking-finance": new Set(["Unauthorized transactions"]),
  enforcement: new Set(["Asset and debtor investigation"]),
  "intellectual-property": new Set(["Counterfeit and brand infringement"]),
  "cyber-law": new Set(["Online defamation"]),
};

function problemProfile(titleEn: string, titleAr: string, serviceTitleEn: string): ProblemProfile {
  const text = titleEn.toLowerCase();
  if (/(termination|dismissal|disciplin|severance)/.test(text)) return {
    factsEn: "the reason and procedure for ending the employment relationship, including notice, warnings, investigation and the employer's stated reason",
    factsAr: "سبب وإجراءات إنهاء علاقة العمل، بما في ذلك الإخطار والإنذارات والتحقيق والسبب الذي ذكره صاحب العمل",
    evidenceEn: "the employment contract, termination letter, disciplinary record, HR messages, performance records and any grievance or complaint",
    evidenceAr: "عقد العمل وخطاب الإنهاء والسجل التأديبي ورسائل الموارد البشرية وسجلات الأداء وأي تظلم أو شكوى",
    outcomeEn: "challenge the termination, calculate entitlements, negotiate a settlement or prepare the appropriate labour claim",
    outcomeAr: "الطعن في الإنهاء أو حساب المستحقات أو التفاوض على تسوية أو إعداد المطالبة العمالية المناسبة",
  };
  if (/(wage|salary|benefit|payment|invoice|debt|recovery|unpaid)/.test(text)) return {
    factsEn: "what was promised, what was delivered, what remains unpaid and when the payment obligation became due",
    factsAr: "ما تم الاتفاق عليه وما تم تنفيذه وما بقي دون سداد ومتى حل ميعاد الاستحقاق",
    evidenceEn: "the agreement, invoices or payslips, account statements, delivery or performance records, payment demands and replies",
    evidenceAr: "العقد أو الفواتير أو كشوف الرواتب وكشوف الحساب وإثباتات التسليم أو التنفيذ ومطالبات الدفع والردود عليها",
    outcomeEn: "verify the amount, preserve the payment claim, pursue negotiation or select the correct filing and enforcement route",
    outcomeAr: "التحقق من المبلغ وحفظ المطالبة المالية والتفاوض أو اختيار مسار القيد والتنفيذ الصحيح",
  };
  if (/(contract|agreement|clause|draft|review|breach|termination and cancellation)/.test(text)) return {
    factsEn: "the parties' obligations, deadlines, conditions, approval rights, termination rights and the event that created the concern",
    factsAr: "التزامات الأطراف والمواعيد والشروط وحقوق الموافقة والإنهاء والواقعة التي أدت إلى القلق القانوني",
    evidenceEn: "the signed contract, amendments, schedules, specifications, negotiation history, notices and performance or payment records",
    evidenceAr: "العقد الموقع والتعديلات والملاحق والمواصفات وتاريخ التفاوض والإخطارات وسجلات التنفيذ أو السداد",
    outcomeEn: "identify exposure, correct the document, respond to the breach or pursue the remedy available under the agreement and law",
    outcomeAr: "تحديد المخاطر وتصحيح المستند أو الرد على الإخلال أو طلب وسيلة المعالجة المتاحة بموجب العقد والقانون",
  };
  if (/(custody|visitation|alimony|maintenance|divorce|separation|marriage|inheritance|khul|annulment|domestic violence|marital-status|will)/.test(text)) return {
    factsEn: "the family relationship, the current living and care arrangements, prior agreements or orders and the change that requires advice",
    factsAr: "العلاقة الأسرية وترتيبات السكن والرعاية الحالية والاتفاقيات أو الأحكام السابقة والتغيير الذي يستدعي المشورة",
    evidenceEn: "identity and family-status records, prior judgments or agreements, care and expense records, communications and evidence of the child's or family's circumstances",
    evidenceAr: "مستندات الهوية والحالة الأسرية والأحكام أو الاتفاقيات السابقة وسجلات الرعاية والمصروفات والمراسلات وما يثبت ظروف الطفل أو الأسرة",
    outcomeEn: "protect the relevant rights and interests, prepare a negotiated arrangement or identify the appropriate personal-status procedure",
    outcomeAr: "حماية الحقوق والمصالح ذات الصلة وإعداد ترتيب تفاوضي أو تحديد إجراء الأحوال الشخصية المناسب",
  };
  if (/(property|real estate|lease|eviction|title|registration|construction|contractor|ejar|off-plan|mortgage|financing|foreign property|handover)/.test(text)) return {
    factsEn: "the property or project, each party's legal interest, the transaction or possession history and the event that created the dispute",
    factsAr: "العقار أو المشروع والحق القانوني لكل طرف وتاريخ المعاملة أو الحيازة والواقعة التي نشأ عنها النزاع",
    evidenceEn: "title and registration records, sale or lease documents, plans, payment records, notices, photographs and expert or contractor reports",
    evidenceAr: "سجلات الملكية والتسجيل ومستندات البيع أو الإيجار والمخططات وإثباتات الدفع والإخطارات والصور وتقارير الخبراء أو المقاولين",
    outcomeEn: "clarify title, possession, contractual responsibility, registration status or the remedy needed to protect the property position",
    outcomeAr: "توضيح الملكية أو الحيازة أو المسؤولية العقدية أو حالة التسجيل أو وسيلة المعالجة اللازمة لحماية الوضع العقاري",
  };
  if (/(license|licensing|regulat|government|administrative|tax|zakat|customs|appeal|objection)/.test(text)) return {
    factsEn: "the authority's decision or requirement, the legal basis given, the response or deadline and the practical effect on the person or business",
    factsAr: "قرار الجهة أو متطلبها والأساس القانوني المذكور والرد أو الميعاد والأثر العملي على الشخص أو المنشأة",
    evidenceEn: "the licence or registration, application, decision, authority correspondence, submitted information, payment record and deadline notice",
    evidenceAr: "الرخصة أو التسجيل والطلب والقرار ومراسلات الجهة والمعلومات المقدمة وإثبات السداد وإخطار الميعاد",
    outcomeEn: "preserve the right to object or appeal, correct the record, seek approval or challenge the decision through the competent route",
    outcomeAr: "حفظ الحق في الاعتراض أو الطعن وتصحيح السجل أو طلب الموافقة أو الطعن في القرار عبر المسار المختص",
  };
  if (/(arbitration|mediation|enforcement|judgment|award|execution)/.test(text)) return {
    factsEn: "the existing judgment, award, agreement or enforceable instrument, the other party's conduct and the procedural stage already reached",
    factsAr: "الحكم أو القرار التحكيمي أو الاتفاق أو السند التنفيذي القائم وتصرف الطرف الآخر والمرحلة الإجرائية التي وصل إليها الملف",
    evidenceEn: "the judgment or award, arbitration or jurisdiction clause, service records, payment history, asset information and prior applications or objections",
    evidenceAr: "الحكم أو القرار وشرط التحكيم أو الاختصاص ومستندات التبليغ وتاريخ السداد ومعلومات الأصول والطلبات أو الاعتراضات السابقة",
    outcomeEn: "protect the procedural position, select the recognition, settlement or enforcement step and move the matter toward recovery or resolution",
    outcomeAr: "حماية المركز الإجرائي واختيار خطوة الاعتراف أو التسوية أو التنفيذ ودفع الملف نحو التحصيل أو الحل",
  };
  if (/(traffic|accident|vehicle|motor|حادث|مروري|مركبة)/.test(`${text} ${titleAr.toLowerCase()}`)) return {
    factsEn: "how the traffic accident occurred, the police or traffic report, the parties involved, the injuries or vehicle damage and the insurance position",
    factsAr: "كيفية وقوع الحادث المروري وتقرير الشرطة أو المرور والأطراف المعنية والإصابات أو أضرار المركبة وموقف التأمين",
    evidenceEn: "the traffic report, photographs or video, medical records, repair estimates, insurance policy, witness details and correspondence with the insurer",
    evidenceAr: "تقرير المرور والصور أو الفيديو والسجلات الطبية وتقديرات الإصلاح ووثيقة التأمين وبيانات الشهود والمراسلات مع شركة التأمين",
    outcomeEn: "challenge the fault assessment, recover vehicle or injury compensation, or respond to the insurer or opposing party",
    outcomeAr: "الطعن في نسبة الخطأ أو تحصيل تعويض المركبة أو الإصابة أو الرد على شركة التأمين أو الطرف الآخر",
  };
  if (/(insurance|claim|coverage|تأمين|مطالبة|تغطية)/.test(`${text} ${titleAr.toLowerCase()}`)) return {
    factsEn: "the policy promise, the event causing the loss, the claim submitted, the insurer's response and the amount or treatment being disputed",
    factsAr: "التغطية المتفق عليها والواقعة المسببة للضرر والمطالبة المقدمة ورد شركة التأمين والمبلغ أو العلاج محل النزاع",
    evidenceEn: "the policy and endorsements, claim form, rejection or settlement letter, loss records, expert or medical reports and payment evidence",
    evidenceAr: "وثيقة التأمين وملاحقها ونموذج المطالبة وخطاب الرفض أو التسوية وسجلات الضرر وتقارير الخبراء أو الأطباء وإثباتات الدفع",
    outcomeEn: "interpret the coverage, challenge the rejection or underpayment and pursue the amount or remedy available under the policy",
    outcomeAr: "تفسير التغطية والطعن في الرفض أو نقص السداد والمطالبة بالمبلغ أو وسيلة المعالجة المتاحة بموجب الوثيقة",
  };
  if (/(shareholder|partner|company formation|corporate|director|manager|dissolution|liquidation|commercial concealment|franchise|distribution|agency|due diligence|acquisition|merger|تأسيس الشركة|المساهم|الشريك|المدير|التصفية|التستر|الامتياز|التوزيع|الاستحواذ)/.test(`${text} ${titleAr.toLowerCase()}`)) return {
    factsEn: "the company structure, ownership or management decision, the parties' authority and the corporate act or dispute that needs to be addressed",
    factsAr: "هيكل الشركة وملكية الحصص أو قرار الإدارة وصلاحيات الأطراف والتصرف أو النزاع الشركاتي محل المعالجة",
    evidenceEn: "the articles, commercial register, shareholder or partner agreement, resolutions, transfers, financial records and company correspondence",
    evidenceAr: "عقد التأسيس والسجل التجاري واتفاق المساهمين أو الشركاء والقرارات والتحويلات والسجلات المالية ومراسلات الشركة",
    outcomeEn: "protect the ownership or management position, correct the corporate record, complete formation or pursue the available corporate remedy",
    outcomeAr: "حماية مركز الملكية أو الإدارة وتصحيح السجل الشركاتي أو إتمام التأسيس أو طلب وسيلة المعالجة الشركاتية المتاحة",
  };
  if (/(medical|misdiagnosis|treatment|medical-record|healthcare|malpractice|طبي|تشخيص|علاج|السجل الطبي)/.test(`${text} ${titleAr.toLowerCase()}`)) return {
    factsEn: "the treatment received, the expected professional standard, the medical event or delay and the physical or financial harm claimed",
    factsAr: "العلاج الذي تم تلقيه والمعيار المهني المتوقع والواقعة الطبية أو التأخير والضرر الجسدي أو المالي المدعى به",
    evidenceEn: "complete medical records, consent forms, reports, prescriptions, test results, expert opinions, expenses and provider correspondence",
    evidenceAr: "السجلات الطبية الكاملة ونماذج الموافقة والتقارير والوصفات ونتائج الفحوص وآراء الخبراء والمصروفات ومراسلات مقدم الخدمة",
    outcomeEn: "assess whether the evidence supports professional liability and pursue the appropriate compensation or response",
    outcomeAr: "تقييم ما إذا كانت الأدلة تثبت المسؤولية المهنية وطلب التعويض أو الرد المناسب",
  };
  if (/(trademark|copyright|counterfeit|brand|intellectual|علامة|مؤلف|تقليد|فكرية)/.test(`${text} ${titleAr.toLowerCase()}`)) return {
    factsEn: "the protected work, mark or brand, ownership or registration, the alleged use and the commercial harm or urgency involved",
    factsAr: "المصنف أو العلامة أو الاسم التجاري المحمي وملكيته أو تسجيله والاستخدام المدعى به والضرر التجاري أو الاستعجال",
    evidenceEn: "registration certificates, original files, ownership records, screenshots, product samples, sales evidence and platform or marketplace communications",
    evidenceAr: "شهادات التسجيل والملفات الأصلية ومستندات الملكية ولقطات الشاشة وعينات المنتجات وإثباتات المبيعات ومراسلات المنصات",
    outcomeEn: "preserve the right, seek removal or cessation, challenge the registration or pursue infringement compensation",
    outcomeAr: "حفظ الحق وطلب الإزالة أو وقف الاستخدام أو الطعن في التسجيل أو المطالبة بتعويض التعدي",
  };
  if (/(cyber|online defamation|hacked|unauthorized access|data breach|إلكتروني|تشهير|اختراق|بيانات)/.test(`${text} ${titleAr.toLowerCase()}`)) return {
    factsEn: "the digital conduct, account or data affected, the date and platform, the person or entity involved and any continuing risk",
    factsAr: "السلوك الرقمي أو الحساب أو البيانات المتأثرة والتاريخ والمنصة والشخص أو الجهة المعنية وأي خطر مستمر",
    evidenceEn: "screenshots, URLs, account logs, messages, device or platform records, incident reports and proof of identity or ownership",
    evidenceAr: "لقطات الشاشة والروابط وسجلات الحساب والرسائل وسجلات الجهاز أو المنصة وتقارير الحادث وإثبات الهوية أو الملكية",
    outcomeEn: "preserve digital evidence, seek removal or protection and identify the civil, criminal or regulatory response available",
    outcomeAr: "حفظ الدليل الرقمي وطلب الإزالة أو الحماية وتحديد المسار المدني أو الجزائي أو التنظيمي المتاح",
  };
  if (/(criminal|crime|investigation|arrest|detention|cyber|defamation|fraud|forgery|breach.of.trust|public prosecution|الاحتيال|التزوير|خيانة الأمانة|النيابة)/.test(`${text} ${titleAr.toLowerCase()}`)) return {
    factsEn: "what conduct is alleged, the investigation or complaint stage, the immediate restrictions and any evidence that could affect the defence",
    factsAr: "السلوك المدعى به ومرحلة التحقيق أو الشكوى والقيود العاجلة وأي دليل قد يؤثر في الدفاع",
    evidenceEn: "the complaint or summons, interview or investigation records, digital communications, devices or files, witnesses and previous decisions",
    evidenceAr: "الشكوى أو التكليف بالحضور ومحاضر الاستجواب أو التحقيق والمراسلات الرقمية والأجهزة أو الملفات والشهود والقرارات السابقة",
    outcomeEn: "protect procedural rights, preserve evidence, prepare the response and identify any urgent application or defence step",
    outcomeAr: "حماية الحقوق الإجرائية وحفظ الأدلة وإعداد الرد وتحديد أي طلب أو خطوة دفاع عاجلة",
  };
  return {
    factsEn: `the facts, documents and decision point specific to this ${serviceTitleEn.toLowerCase()} problem`,
    factsAr: `الوقائع والمستندات ونقطة القرار الخاصة بمسألة ${titleAr}`,
    evidenceEn: "the agreement or official record, relevant correspondence, proof of loss or performance and a dated chronology",
    evidenceAr: "العقد أو السجل الرسمي والمراسلات ذات الصلة وإثبات الضرر أو التنفيذ وتسلسل زمني مؤرخ",
    outcomeEn: "understand the legal position, compare the available options and choose the next step on an informed basis",
    outcomeAr: "فهم المركز القانوني ومقارنة الخيارات المتاحة واختيار الخطوة التالية على أساس واضح",
  };
}

function buildDetailedContent({
  region,
  serviceTitleEn,
  serviceTitleAr,
  titleEn,
  titleAr,
  conceptsEn = [],
  conceptsAr = [],
}: {
  region: Region;
  serviceTitleEn: string;
  serviceTitleAr: string;
  titleEn: string;
  titleAr: string;
  conceptsEn?: string[];
  conceptsAr?: string[];
}) {
  const country = countryName(region);
  const legalFocusEn = conceptsEn.slice(0, 2).join(" and ") || serviceTitleEn;
  const legalFocusAr = conceptsAr.slice(0, 2).join(" و") || serviceTitleAr;
  const profile = problemProfile(titleEn, titleAr, serviceTitleEn);

  return {
    overview: {
      en: `${titleEn} concerns ${profile.factsEn}. In ${country.en}, the answer depends on the applicable ${serviceTitleEn.toLowerCase()} framework, the competent authority or forum, the available evidence and any notice or deadline. CounselO uses this page to focus the initial review on the facts that change the legal position and the outcome you need: ${profile.outcomeEn}.`,
      ar: `تتعلق مسألة ${titleAr} بـ${profile.factsAr}. وفي ${country.ar} تعتمد الإجابة على إطار ${serviceTitleAr} المنطبق والجهة أو المحكمة المختصة والأدلة المتاحة وأي إخطار أو ميعاد. تستخدم كاونسلو هذه الصفحة لتركيز المراجعة الأولية على الوقائع التي تغير المركز القانوني والنتيجة المطلوبة، وهي: ${profile.outcomeAr}.`,
    },
    keyQuestions: {
      en: [
        `What facts show how ${titleEn.toLowerCase()} arose, and what outcome is required?`,
        `Which documents prove the key event, obligation, decision or loss in this matter?`,
        `How does ${legalFocusEn} affect the authority, deadline, remedy or burden of proof?`,
        `Is the evidence needed for ${titleEn.toLowerCase()} complete, reliable and preserved?`,
        `Should the next step be negotiation, a notice, an objection, a claim, an appeal or urgent protection?`,
      ],
      ar: [
        `ما الوقائع التي أدت إلى ${titleAr} وما النتيجة المطلوبة؟`,
        `ما المستندات التي تثبت الواقعة أو الالتزام أو القرار أو الضرر الأساسي في الملف؟`,
        `كيف يؤثر ${legalFocusAr} في الجهة المختصة أو الميعاد أو وسيلة المعالجة أو عبء الإثبات؟`,
        `هل الأدلة اللازمة لمسألة ${titleAr} كاملة وموثوقة ومحفوظة؟`,
        "هل تكون الخطوة التالية تفاوضاً أو إخطاراً أو اعتراضاً أو مطالبة أو طعناً أو حماية عاجلة؟",
      ],
    },
    deliverables: {
      en: [
        `A focused statement and chronology explaining how ${titleEn.toLowerCase()} arose`,
        `A problem-specific review of ${profile.evidenceEn}`,
        `A clear assessment of the rule, authority, deadline, risk and remedy for this problem`,
        `A written legal response and next-step plan directed to this outcome: ${profile.outcomeEn}`,
        "A clear explanation of what the consultation covers and whether separate representation, filing or attendance is needed",
      ],
      ar: [
        `عرض مركز للمسألة وتسلسل زمني يوضح كيف نشأت ${titleAr}`,
        `مراجعة مخصصة لـ${profile.evidenceAr}`,
        "تقييم واضح للقاعدة والجهة والميعاد والمخاطر ووسيلة المعالجة الخاصة بهذه المسألة",
        `رد قانوني مكتوب وخطة للخطوة التالية موجهة إلى النتيجة المطلوبة: ${profile.outcomeAr}`,
        "توضيح نطاق الاستشارة وما إذا كان يلزم تمثيل أو قيد أو حضور مستقل",
      ],
    },
    process: {
      en: [
        { title: "1. Submit the matter", desc: `Send the facts, desired outcome, notice or deadline, and the key documents about ${titleEn.toLowerCase()} through the contact form, WhatsApp or email.` },
        { title: "2. CounselO studies and confirms", desc: `We study the information relevant to ${titleEn.toLowerCase()}, identify what is missing, and confirm the scope, fee, timing and written deliverable before work starts.` },
        { title: "3. Pay and we begin", desc: "After you approve the scope and pay for the agreed consultation, CounselO begins the focused legal review." },
        { title: "4. Receive the legal response", desc: `You receive the agreed written analysis and next steps focused on whether and how to ${profile.outcomeEn}, through WhatsApp or email.` },
      ],
      ar: [
        { title: "1. ترسل المسألة", desc: `أرسل الوقائع والنتيجة المطلوبة وأي إخطار أو ميعاد والمستندات الأساسية المتعلقة بـ${titleAr} عبر نموذج التواصل أو واتساب أو البريد الإلكتروني.` },
        { title: "2. تدرس كاونسلو وتؤكد النطاق", desc: `تدرس كاونسلو المعلومات المرتبطة بـ${titleAr} وتحدد الناقص وتؤكد نطاق العمل والرسوم والمدة والمخرج المكتوب قبل البدء.` },
        { title: "3. تدفع ونبدأ العمل", desc: "بعد موافقتك على النطاق وسداد قيمة الاستشارة المتفق عليها، تبدأ كاونسلو المراجعة القانونية المركزة." },
        { title: "4. تتلقى الرد القانوني", desc: `تتلقى التحليل المكتوب والخطوات التالية المتفق عليها، مع التركيز على ${profile.outcomeAr}، عبر واتساب أو البريد الإلكتروني.` },
      ],
    },
    experience: {
      en: `CounselO is founded and led by Lawyer and Legal Counsel Omar Al-Baghdadi, with more than 30 years of regional legal practice and more than 20,000 cases and consultations across civil, commercial, employment, family, property, administrative, arbitration and enforcement matters. For ${titleEn.toLowerCase()}, that experience means testing ${profile.factsEn} against ${profile.evidenceEn}, then matching the advice to the relevant forum and remedy—not applying a one-size-fits-all answer.`,
      ar: `تأسست كاونسلو ويقودها المحامي والمستشار القانوني عمر البغدادي، مع خبرة قانونية إقليمية تزيد على 30 عاماً وأكثر من 20,000 قضية واستشارة في المسائل المدنية والتجارية والعمالية والأسرية والعقارية والإدارية والتحكيم والتنفيذ. وفي مسألة ${titleAr} تعني هذه الخبرة اختبار ${profile.factsAr} في ضوء ${profile.evidenceAr} ثم مواءمة المشورة مع الجهة ووسيلة المعالجة، لا تطبيق إجابة عامة واحدة للجميع.`,
    },
    faqs: {
      en: [
        {
          q: `What should I do first about ${titleEn.toLowerCase()}?`,
          a: `Preserve ${profile.evidenceEn}, prepare a dated chronology and identify any notice or deadline. Send those materials to CounselO for an initial assessment of the facts, forum and options in ${country.en}.`,
        },
        {
          q: `What documents help with a ${titleEn.toLowerCase()} assessment?`,
          a: `For this problem, start with ${profile.evidenceEn}. Add a short dated summary and identify any notice or deadline. The final list depends on the facts.`,
        },
        {
          q: `Can CounselO review a ${titleEn.toLowerCase()} matter online?`,
          a: `Yes. The initial assessment and document review can begin through WhatsApp, email or the consultation form in Arabic or English. Formal filing, attendance and reserved representation work are scoped separately where required in ${country.en}.`,
        },
        {
          q: `How does CounselO help with ${titleEn.toLowerCase()}?`,
          a: `CounselO focuses the review on ${profile.factsEn}, checks ${profile.evidenceEn}, identifies the applicable framework and authority, and delivers advice directed to whether and how to ${profile.outcomeEn}.`,
        },
        {
          q: "How quickly will I receive a response?",
          a: "CounselO targets a professional response within 24 hours, subject to the matter’s scope, urgency, intake completeness and service availability. The target is not a guaranteed legal outcome or filing deadline.",
        },
      ],
      ar: [
        {
          q: `ما أول خطوة في مسألة ${titleAr}؟`,
          a: `احفظ ${profile.evidenceAr} وأعد تسلسلاً زمنياً مؤرخاً وحدد أي إخطار أو ميعاد. أرسل هذه المواد إلى كاونسلو لتقييم أولي للوقائع والاختصاص والخيارات في ${country.ar}.`,
        },
        {
          q: `ما المستندات المفيدة لتقييم ${titleAr}؟`,
          a: `ابدأ بـ${profile.evidenceAr}، وأضف ملخصاً زمنياً مختصراً وحدد أي إخطار أو ميعاد. وتختلف القائمة النهائية بحسب الوقائع.`,
        },
        {
          q: `هل يمكن أن تراجع كاونسلو مسألة ${titleAr} أونلاين؟`,
          a: `نعم. يمكن بدء التقييم ومراجعة المستندات عبر واتساب أو البريد الإلكتروني أو نموذج التواصل بالعربية أو الإنجليزية. ويُحدد القيد الرسمي أو الحضور أو التمثيل المنظم بصورة منفصلة حيث يلزم في ${country.ar}.`,
        },
        {
          q: `كيف تساعد كاونسلو في ${titleAr}؟`,
          a: `تركز كاونسلو على ${profile.factsAr} وتراجع ${profile.evidenceAr} وتحدد الإطار والجهة المختصة وتقدم مشورة موجهة إلى ${profile.outcomeAr}.`,
        },
        {
          q: "متى يصل الرد المهني؟",
          a: "تستهدف كاونسلو رداً مهنياً خلال 24 ساعة بحسب نطاق المسألة ودرجة الاستعجال واكتمال المعلومات وتوفر الخدمة. ولا يمثل ذلك ضماناً لنتيجة قانونية أو لموعد قيد محدد.",
        },
      ],
    },
  };
}

function sharedPages(region: "sa" | "syr"): LegalProblemPage[] {
  const allowedServices = new Set(getServicesForRegion(region).map((service) => service.slug));
  return Object.entries(SERVICE_SEARCH_CONTENT)
    .filter(([parentServiceSlug]) => allowedServices.has(parentServiceSlug))
    .flatMap(([parentServiceSlug, content]) => {
      const service = getServiceDefinition(parentServiceSlug, region);
      const extra = ADDITIONAL_SEARCH_ISSUES[parentServiceSlug] ?? { en: [], ar: [] };
      const regional = region === "syr"
        ? (SYRIA_ADDITIONAL_ISSUES[parentServiceSlug] ?? { en: [], ar: [] })
        : region === "sa"
          ? (SAUDI_ADDITIONAL_ISSUES[parentServiceSlug] ?? { en: [], ar: [] })
          : { en: [], ar: [] };
      const excluded = OVERLAPPING_SHARED_ISSUES[parentServiceSlug] ?? new Set<string>();
      const pairedIssues = content.issuesEn
        .map((titleEn, index) => ({ titleEn, titleAr: content.issuesAr[index] ?? titleEn }))
        .filter(({ titleEn }) => !excluded.has(titleEn));
      const issuesEn = [...pairedIssues.map((item) => item.titleEn), ...extra.en, ...regional.en];
      const issuesAr = [...pairedIssues.map((item) => item.titleAr), ...extra.ar, ...regional.ar];
      return issuesEn.map((titleEn, index) => {
        const titleAr = issuesAr[index] ?? titleEn;
        const details = buildDetailedContent({
          region,
          serviceTitleEn: service?.titleEn ?? parentServiceSlug,
          serviceTitleAr: service?.titleAr ?? parentServiceSlug,
          titleEn,
          titleAr,
        });
        return {
          region,
          parentServiceSlug,
          slug: slugify(titleEn),
          titleEn,
          titleAr,
          serviceTitleEn: service?.titleEn ?? parentServiceSlug,
          serviceTitleAr: service?.titleAr ?? parentServiceSlug,
          documentsEn: content.documentsEn,
          documentsAr: content.documentsAr,
          ...details,
        };
      });
    });
}

function uaePages(): LegalProblemPage[] {
  return UAE_SERVICES.flatMap((service) => {
    const content = buildUaeServicePageContent(service);
    return content.issues.en.map((titleEn, index) => {
      const titleAr = content.issues.ar[index] ?? titleEn;
      const details = buildDetailedContent({
        region: "uae",
        serviceTitleEn: service.title.en,
        serviceTitleAr: service.title.ar,
        titleEn,
        titleAr,
        conceptsEn: service.concepts.en,
        conceptsAr: service.concepts.ar,
      });
      return {
        region: "uae" as const,
        parentServiceSlug: service.slug,
        slug: slugify(titleEn),
        titleEn,
        titleAr,
        serviceTitleEn: service.title.en,
        serviceTitleAr: service.title.ar,
        documentsEn: content.documents.en,
        documentsAr: content.documents.ar,
        ...details,
        experience: content.experienceNote,
        faqs: {
          en: [...details.faqs.en, ...content.faqs.en].slice(0, 8),
          ar: [...details.faqs.ar, ...content.faqs.ar].slice(0, 8),
        },
      };
    });
  });
}

export const LEGAL_PROBLEM_PAGES: readonly LegalProblemPage[] = [
  ...sharedPages("sa"),
  ...sharedPages("syr"),
  ...uaePages(),
];

export function getLegalProblemPages(region: Region, parentServiceSlug?: string): LegalProblemPage[] {
  return LEGAL_PROBLEM_PAGES.filter(
    (page) => page.region === region && (!parentServiceSlug || page.parentServiceSlug === parentServiceSlug),
  );
}

export function getLegalProblemPage(region: Region, parentServiceSlug: string, slug: string): LegalProblemPage | undefined {
  return LEGAL_PROBLEM_PAGES.find(
    (page) => page.region === region && page.parentServiceSlug === parentServiceSlug && page.slug === slug,
  );
}

export function legalProblemPath(region: Region, lang: Lang, parentServiceSlug: string, slug: string): string {
  return `/${region}${lang === "ar" ? "/ar" : ""}/services/${parentServiceSlug}/${slug}`;
}

export function getLegalProblemPaths(): string[] {
  return LEGAL_PROBLEM_PAGES.flatMap((page) => [
    legalProblemPath(page.region, "en", page.parentServiceSlug, page.slug),
    legalProblemPath(page.region, "ar", page.parentServiceSlug, page.slug),
  ]);
}
