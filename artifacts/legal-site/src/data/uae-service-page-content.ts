import type { UaeLegalService } from "@/data/uae-legal-services";

type LocalizedList = { en: string[]; ar: string[] };
type LocalizedFaq = { en: { q: string; a: string }[]; ar: { q: string; a: string }[] };

const DOCUMENTS_BY_CATEGORY: Record<UaeLegalService["category"], LocalizedList> = {
  business: {
    en: [
      "Trade licence, constitutional documents and current corporate records",
      "Relevant agreements, amendments, schedules and signed term sheets",
      "Shareholder, manager or board resolutions and signing authorities",
      "Material correspondence, notices and a dated chronology",
      "Regulator, free-zone or licensing-authority communications",
      "Financial or operational records relevant to the requested analysis",
    ],
    ar: [
      "الرخصة التجارية ووثائق التأسيس وسجلات الشركة الحالية",
      "العقود والتعديلات والملاحق ومذكرات الشروط الموقعة ذات الصلة",
      "قرارات الشركاء أو المديرين أو مجلس الإدارة وصلاحيات التوقيع",
      "المراسلات والإخطارات الجوهرية وتسلسل زمني مؤرخ",
      "مراسلات الجهة التنظيمية أو المنطقة الحرة أو سلطة الترخيص",
      "السجلات المالية أو التشغيلية المتصلة بالتحليل المطلوب",
    ],
  },
  individuals: {
    en: [
      "Passport, Emirates ID and documents establishing residence or status",
      "Relevant certificates, agreements, orders or official decisions",
      "Complete correspondence and notices exchanged with the other party or authority",
      "A dated chronology identifying urgent events and deadlines",
      "Financial, medical, employment or family records relevant to the matter",
      "Any foreign document, judgment or certificate that may require legalisation or translation",
    ],
    ar: [
      "جواز السفر والهوية الإماراتية وما يثبت الإقامة أو الصفة",
      "الشهادات والعقود والأوامر أو القرارات الرسمية ذات الصلة",
      "كامل المراسلات والإخطارات المتبادلة مع الطرف الآخر أو الجهة",
      "تسلسل زمني مؤرخ يحدد الوقائع العاجلة والمواعيد",
      "السجلات المالية أو الطبية أو الوظيفية أو الأسرية المتصلة بالمسألة",
      "أي مستند أو حكم أو شهادة أجنبية قد تحتاج إلى تصديق أو ترجمة قانونية",
    ],
  },
  disputes: {
    en: [
      "The governing contract, amendments and dispute-resolution clause",
      "Demand letters, notices, acknowledgements and settlement communications",
      "Pleadings, judgments, awards or execution documents already issued",
      "Invoices, payment records, expert reports and supporting evidence",
      "A dated chronology showing performance, breach and procedural deadlines",
      "Known information about assets, counterparties and the competent forum",
    ],
    ar: [
      "العقد الحاكم وتعديلاته وشرط تسوية النزاع",
      "المطالبات والإخطارات والإقرارات ومراسلات التسوية",
      "صحف الدعاوى والأحكام وقرارات التحكيم أو مستندات التنفيذ الصادرة",
      "الفواتير وسجلات السداد وتقارير الخبراء والأدلة المؤيدة",
      "تسلسل زمني يوضح التنفيذ والإخلال والمواعيد الإجرائية",
      "المعلومات المتاحة عن الأصول والأطراف والجهة المختصة",
    ],
  },
  regulated: {
    en: [
      "Current licences, registrations, approvals and conditions",
      "Policies, procedures, risk assessments and compliance records",
      "Relevant customer, supplier, processor or professional agreements",
      "Regulator correspondence, inspection records and decisions",
      "Incident logs, transaction records or technical evidence",
      "A dated chronology identifying reporting, objection and appeal deadlines",
    ],
    ar: [
      "التراخيص والتسجيلات والموافقات والشروط السارية",
      "السياسات والإجراءات وتقييمات المخاطر وسجلات الامتثال",
      "عقود العملاء أو الموردين أو المعالجين أو المهنيين ذات الصلة",
      "مراسلات الجهة التنظيمية وسجلات التفتيش والقرارات",
      "سجلات الحوادث أو المعاملات أو الأدلة التقنية",
      "تسلسل زمني يحدد مواعيد الإبلاغ والاعتراض والطعن",
    ],
  },
};

const SEO_ISSUES_BY_SERVICE: Record<string, LocalizedList> = {
  "corporate-commercial": {
    en: ["Company formation and registration problem", "Shareholder exit and buyout dispute", "Director and manager liability", "Company dissolution and liquidation dispute"],
    ar: ["مشكلة تأسيس الشركة وتسجيلها", "خروج المساهم أو الشريك ومنازعة شراء الحصة", "مسؤولية المدير وعضو مجلس الإدارة", "منازعة حل الشركة وتصفيتها"],
  },
  "foreign-investment-market-entry": {
    en: ["Investment licence refusal or cancellation", "Foreign investor compensation claim", "Foreign investor and local-partner dispute"],
    ar: ["رفض أو إلغاء ترخيص الاستثمار", "مطالبة المستثمر الأجنبي بالتعويض", "منازعة المستثمر الأجنبي والشريك المحلي"],
  },
  "commercial-contracts": {
    en: ["Unpaid business invoice", "Supply contract non-delivery", "Defective goods and non-conforming delivery", "Service agreement breach", "Contract evidence and electronic messages"],
    ar: ["الفاتورة التجارية غير المدفوعة", "عدم التسليم في عقد التوريد", "عيوب البضائع وعدم مطابقة التسليم", "الإخلال بعقد الخدمات", "إثبات العقد والرسائل الإلكترونية"],
  },
  "employment-labour": {
    en: ["Delayed or unpaid salary", "Resignation because of unpaid wages", "Experience certificate and work-permit dispute", "Sponsorship and work-permit transfer dispute", "Work injury and compensation claim", "Disciplinary warning and workplace investigation"],
    ar: ["تأخر الراتب أو عدم دفعه", "الاستقالة بسبب عدم دفع الأجور", "منازعة شهادة الخبرة وتصريح العمل", "منازعة نقل الكفالة وتصريح العمل", "إصابة العمل ومطالبة التعويض", "الإنذار التأديبي والتحقيق في مكان العمل"],
  },
  "real-estate-construction": {
    en: ["Eviction notice and eviction dispute", "Unpaid rent and rental payment claim", "Bounced rental cheque", "Security deposit recovery", "Construction delay and defective construction", "Title deed and registration dispute", "Property encroachment and boundary dispute", "Expropriation and compensation claim"],
    ar: ["إخطار الإخلاء ومنازعة الإخلاء", "الإيجار غير المدفوع ومطالبة الأجرة", "الشيك الإيجاري المرتجع", "استرداد مبلغ التأمين", "تأخر البناء وعيوب الإنشاء", "منازعة سند الملكية والتسجيل", "التعدي على العقار ومنازعة الحدود", "نزع الملكية ومطالبة التعويض"],
  },
  "family-personal-status": {
    en: ["Visitation order enforcement", "Child relocation and travel dispute", "Recognition of foreign family judgment", "Paternity dispute"],
    ar: ["تنفيذ حكم الزيارة", "منازعة انتقال الأطفال والسفر بهم", "الاعتراف بالحكم الأسري الأجنبي", "منازعة إثبات النسب"],
  },
  "wills-estates": {
    en: ["Foreign will recognition and probate", "Inheritance distribution dispute", "Estate administration and asset transfer"],
    ar: ["الاعتراف بالوصية الأجنبية وإثباتها", "منازعة توزيع الميراث", "إدارة التركة ونقل الأصول"],
  },
  "criminal-investigations": {
    en: ["Police complaint defence", "Travel-ban and detention concern", "Fraud and breach-of-trust accusation"],
    ar: ["الدفاع في الشكوى أمام الشرطة", "مشكلة منع السفر أو التوقيف", "اتهام بالاحتيال أو خيانة الأمانة"],
  },
  "arbitration-mediation": {
    en: ["Foreign arbitral award enforcement", "Emergency arbitration and interim measures", "Challenge to arbitration jurisdiction"],
    ar: ["تنفيذ حكم التحكيم الأجنبي", "التحكيم الطارئ والتدابير المؤقتة", "الطعن في اختصاص هيئة التحكيم"],
  },
  "litigation-court-disputes": {
    en: ["Court service and notification problem", "Expert evidence and report dispute", "Appeal deadline and filing problem"],
    ar: ["مشكلة إعلان الدعوى والتبليغ القضائي", "منازعة الخبرة والتقرير الفني", "مشكلة ميعاد الطعن والقيد"],
  },
  "enforcement-debt-recovery": {
    en: ["Bounced cheque execution", "Foreign judgment enforcement", "Payment order and urgent debt recovery", "Asset tracing and debtor investigation", "Travel-ban application for debt recovery", "Service suspension and asset-freezing request"],
    ar: ["تنفيذ الشيك المرتجع", "تنفيذ الحكم الأجنبي", "أمر الأداء والتحصيل العاجل للدين", "تتبع الأصول والتحري عن المدين", "طلب منع السفر لتحصيل الدين", "طلب إيقاف الخدمات وتجميد الأصول"],
  },
  "banking-finance": {
    en: ["Unauthorized bank transaction", "Loan default and restructuring", "Personal guarantee enforcement"],
    ar: ["المعاملة المصرفية غير المصرح بها", "التعثر في سداد القرض وإعادة الهيكلة", "تنفيذ الكفالة الشخصية"],
  },
  "insolvency-restructuring": {
    en: ["Creditor claim in insolvency", "Business debt restructuring", "Director liability in insolvency"],
    ar: ["مطالبة الدائن في الإعسار", "إعادة هيكلة ديون المنشأة", "مسؤولية المدير في الإعسار"],
  },
  "tax-vat": {
    en: ["Tax audit and assessment objection", "VAT refund and registration dispute", "Customs penalty challenge"],
    ar: ["الفحص والربط الضريبي والاعتراض عليه", "استرداد ضريبة القيمة المضافة ومنازعة التسجيل", "الطعن في الغرامة الجمركية"],
  },
  "intellectual-property": {
    en: ["Trademark opposition and cancellation", "Counterfeit and brand infringement", "Copyright infringement online"],
    ar: ["الاعتراض على العلامة التجارية وإلغاؤها", "تقليد العلامة التجارية والتعدي عليها", "التعدي على حقوق المؤلف أونلاين"],
  },
  "technology-data-protection": {
    en: ["Online defamation and removal request", "Hacked account and unauthorized access", "Personal-data breach response"],
    ar: ["التشهير الإلكتروني وطلب الإزالة", "اختراق الحساب والدخول غير المصرح به", "الاستجابة لحادث خرق البيانات الشخصية"],
  },
  insurance: {
    en: ["Denied insurance claim", "Delayed insurance settlement", "Policy coverage dispute", "Traffic accident liability and compensation", "Traffic report and fault dispute", "Uninsured accident compensation claim"],
    ar: ["رفض مطالبة التأمين", "تأخر تسوية مطالبة التأمين", "منازعة تغطية وثيقة التأمين", "المسؤولية والتعويض عن حادث مروري", "منازعة تقرير الحادث ونسبة الخطأ", "مطالبة التعويض عن حادث دون تأمين"],
  },
  "healthcare-medical-liability": {
    en: ["Misdiagnosis and delayed diagnosis", "Medical-record access dispute", "Treatment injury and compensation claim"],
    ar: ["سوء التشخيص وتأخره", "منازعة الحصول على السجل الطبي", "إصابة العلاج ومطالبة التعويض"],
  },
  "immigration-residency": {
    en: ["Visa cancellation and overstay dispute", "Residence ban and entry restriction", "Work-permit refusal or cancellation"],
    ar: ["منازعة إلغاء التأشيرة ومخالفة مدة الإقامة", "منع الإقامة وقيود الدخول", "رفض أو إلغاء تصريح العمل"],
  },
  "maritime-aviation-transport": {
    en: ["Cargo damage and transport claim", "Shipping delay and delivery dispute", "Passenger compensation claim"],
    ar: ["تلف البضائع ومطالبة النقل", "تأخر الشحن ومنازعة التسليم", "مطالبة تعويض المسافر"],
  },
  "administrative-regulatory": {
    en: ["Licence refusal or cancellation", "Government penalty challenge", "Public procurement dispute"],
    ar: ["رفض أو إلغاء الترخيص", "الطعن في الغرامة الحكومية", "منازعة المشتريات العامة"],
  },
  "consumer-ecommerce": {
    en: ["Online purchase refund dispute", "Defective product and consumer claim", "E-commerce platform account dispute"],
    ar: ["منازعة استرداد قيمة الشراء الإلكتروني", "المنتج المعيب ومطالبة المستهلك", "منازعة حساب منصة التجارة الإلكترونية"],
  },
};

export function buildUaeServicePageContent(service: UaeLegalService) {
  const documents = DOCUMENTS_BY_CATEGORY[service.category];
  const baseIssues: LocalizedList = {
    en: [
      `Uncertainty about the application of ${service.concepts.en[0]} to the facts`,
      `Missing or inconsistent records concerning ${service.covers.en[0]}`,
      `Potentially conflicting obligations involving ${service.concepts.en[1]}`,
      `A missed notice, filing, objection or appeal deadline affecting ${service.title.en}`,
      `Unclear authority, court or forum for a ${service.title.en} matter in the UAE`,
      `A need to preserve ${service.title.en.toLowerCase()} evidence or obtain urgent protection`,
    ],
    ar: [
      `عدم وضوح مدى انطباق ${service.concepts.ar[0]} على الوقائع`,
      `نقص أو تعارض السجلات بشأن ${service.covers.ar[0]}`,
      `تعارض الالتزامات بشأن ${service.concepts.ar[1]}`,
      `فوات أو اقتراب ميعاد إخطار أو قيد أو اعتراض أو طعن في مسألة ${service.title.ar}`,
      `عدم وضوح الجهة أو المحكمة أو المنتدى المختص بمسألة ${service.title.ar} في الإمارات`,
      `الحاجة إلى حفظ أدلة ${service.title.ar} أو طلب حماية عاجلة`,
    ],
  };
  const extraIssues = SEO_ISSUES_BY_SERVICE[service.slug] ?? { en: [], ar: [] };
  const issues: LocalizedList = {
    en: [...baseIssues.en, ...extraIssues.en],
    ar: [...baseIssues.ar, ...extraIssues.ar],
  };

  const faqs: LocalizedFaq = {
    en: [
      {
        q: `Which UAE framework applies to a matter involving ${service.title.en}?`,
        a: `The answer depends on the parties, Emirate, activity, contract and chosen forum. The initial review considers ${service.concepts.en.join(", ")} before a recommendation is made.`,
      },
      {
        q: `Which authority or court handles matters involving ${service.title.en}?`,
        a: `${service.authority.en} is a relevant official starting point, but the competent regulator, committee, onshore court, DIFC or ADGM forum depends on the facts and any valid jurisdiction or arbitration agreement.`,
      },
      {
        q: "What should I provide for the initial UAE legal review?",
        a: `Provide a short chronology and the key documents, including the following where relevant: ${documents.en[0]}; ${documents.en[1]}; and any notice or decision carrying a deadline.`,
      },
      {
        q: `Can a consultation about ${service.title.en} begin online?`,
        a: "Yes. The initial assessment and document review can begin online in Arabic or English. Formal representation, filing, notarisation or attendance is scoped separately with an appropriately licensed UAE practitioner where required.",
      },
      {
        q: "When should I seek UAE legal advice?",
        a: "Seek advice before signing, responding to a regulator, terminating a relationship, transferring funds or assets, or allowing a notice, limitation, objection or appeal period to expire.",
      },
    ],
    ar: [
      {
        q: `ما الإطار الإماراتي المنطبق على مسألة ${service.title.ar}؟`,
        a: `يعتمد ذلك على الأطراف والإمارة والنشاط والعقد والجهة المختارة. وتتناول المراجعة الأولية ${service.concepts.ar.join("، و")} قبل تقديم التوصية.`,
      },
      {
        q: `ما الجهة أو المحكمة المختصة بمسائل ${service.title.ar}؟`,
        a: `تمثل ${service.authority.ar} نقطة رسمية ذات صلة، لكن تحديد الجهة التنظيمية أو اللجنة أو المحكمة المحلية أو محاكم مركز دبي المالي أو أبوظبي العالمي يعتمد على الوقائع وأي اتفاق صحيح على الاختصاص أو التحكيم.`,
      },
      {
        q: "ما الذي ينبغي تقديمه للمراجعة القانونية الإماراتية الأولية؟",
        a: `قدّم ملخصاً زمنياً والمستندات الأساسية، ولا سيما ${documents.ar[0]}، و${documents.ar[1]}، وأي إخطار أو قرار يرتبط بميعاد.`,
      },
      {
        q: `هل يمكن بدء استشارة ${service.title.ar} أونلاين؟`,
        a: "نعم. يمكن بدء التقييم ومراجعة المستندات أونلاين بالعربية أو الإنجليزية. ويُحدد التمثيل الرسمي أو القيد أو التوثيق أو الحضور بصورة منفصلة مع ممارس مرخص في الإمارات حيثما يلزم.",
      },
      {
        q: "متى ينبغي طلب المشورة القانونية في الإمارات؟",
        a: "اطلب المشورة قبل التوقيع أو الرد على جهة تنظيمية أو إنهاء علاقة أو نقل أموال أو أصول، وقبل انقضاء ميعاد إخطار أو تقادم أو اعتراض أو طعن.",
      },
    ],
  };

  return {
    issues,
    documents,
    faqs,
    experienceNote: {
      en: `Work involving ${service.title.en} in the UAE is jurisdiction-sensitive. We identify the competent Emirate, authority and forum, test the position against the relevant federal, local or free-zone rules, and separate online consultation from any regulated representation or filing requirement.`,
      ar: `تتأثر مسائل ${service.title.ar} في الإمارات بالاختصاص. نحدد الإمارة والجهة والمنتدى المختص، ونراجع الموقف وفق القواعد الاتحادية أو المحلية أو قواعد المنطقة الحرة ذات الصلة، ونفصل بين الاستشارة الأونلاين وأي تمثيل أو قيد منظم مطلوب.`,
    },
    seoKeywords: {
      en: [
        `${service.title.en} UAE`,
        `${service.title.en} lawyer UAE`,
        "UAE online legal consultation",
        ...service.concepts.en,
        ...service.covers.en.slice(0, 3),
        "Dubai legal consultation",
        "Abu Dhabi legal consultation",
      ].join(", "),
      ar: [
        `${service.title.ar} الإمارات`,
        `محامي ${service.title.ar} الإمارات`,
        "استشارة قانونية أونلاين الإمارات",
        ...service.concepts.ar,
        ...service.covers.ar.slice(0, 3),
        "استشارة قانونية دبي",
        "استشارة قانونية أبوظبي",
      ].join("، "),
    },
  };
}
