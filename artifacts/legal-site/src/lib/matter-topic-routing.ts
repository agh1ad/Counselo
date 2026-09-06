/** A service's subject controls its evidence guidance; incidental title words do not. */
export const SERVICE_TOPICS: Readonly<Record<string, string>> = {
  "family-law": "family", "family-personal-status": "family", "wills-estates": "estate",
  "employment-law": "employment", "employment-labour": "employment",
  "business-law": "commercial", "companies-law": "company", "corporate-commercial": "company",
  "real-estate": "property", "real-estate-construction": "property",
  "foreign-investment": "investment", "foreign-investment-market-entry": "investment",
  "administrative-law": "regulatory", "administrative-regulatory": "regulatory",
  arbitration: "arbitration", "arbitration-mediation": "arbitration",
  enforcement: "enforcement", "enforcement-debt-recovery": "enforcement",
  contracts: "contract", "commercial-contracts": "contract",
  "criminal-law": "criminal", "criminal-procedure": "criminal", "criminal-investigations": "criminal",
  "banking-finance": "banking", "intellectual-property": "ip",
  "tax-zakat": "tax", "tax-vat": "tax", "cyber-law": "cyber", "technology-data-protection": "cyber",
  "medical-malpractice": "medical", "healthcare-medical-liability": "medical",
  "insurance-law": "insurance", insurance: "insurance", "civil-law": "civil",
  "civil-procedure": "procedure", "litigation-court-disputes": "procedure",
  "insolvency-restructuring": "insolvency", "immigration-residency": "immigration",
  "maritime-aviation-transport": "transport", "consumer-ecommerce": "consumer",
};

export function matterTopic(serviceSlug: string, title: string): string {
  const topic = SERVICE_TOPICS[serviceSlug];
  if (!topic) throw new Error(`Missing explicit content topic for service: ${serviceSlug}`);
  if (topic === "commercial" && /company formation|shareholder|partner dispute|corporate|director|merger|acquisition|liquidation/i.test(title)) return "company";
  if (topic === "family" && /inheritance|\bwill\b|estate|probate/i.test(title)) return "estate";
  if (topic === "employment" && /termination|dismissal|disciplin|severance/i.test(title)) return "employment-termination";
  if (topic === "insurance" && /traffic|vehicle|motor|accident/i.test(title) && !/non-traffic/i.test(title)) return "traffic";
  if (topic === "contract" && /consumer|defective product|refund/i.test(title)) return "consumer";
  if (topic === "commercial" && /invoice|unpaid|payment|debt/i.test(title)) return "money";
  return topic;
}

type Profile = { factsEn: string; factsAr: string; evidenceEn: string; evidenceAr: string; outcomeEn: string; outcomeAr: string };
export const SPECIALIST_PROFILES: Readonly<Record<string, Profile>> = {
  employment: {
    factsEn: "the employment terms, work performed, disputed workplace decision or entitlement and the sequence of communications between worker and employer",
    factsAr: "شروط العمل والعمل المنجز والقرار أو المستحق العمالي محل الخلاف وتسلسل المراسلات بين العامل وصاحب العمل",
    evidenceEn: "the employment contract and amendments, payslips, attendance and leave records, workplace policies and the relevant HR correspondence or decision",
    evidenceAr: "عقد العمل وتعديلاته وكشوف الرواتب وسجلات الحضور والإجازات والسياسات الداخلية ومراسلات الموارد البشرية أو القرار ذي الصلة",
    outcomeEn: "distinguish pay, leave, workplace conduct and employment-status issues before assessing the appropriate response",
    outcomeAr: "التمييز بين مسائل الأجر والإجازة والسلوك المهني والوضع الوظيفي قبل تقييم الرد المناسب",
  },
  commercial: {
    factsEn: "the business relationship, each party's promised performance, the disputed transaction and whether the concern is contractual, financial or about business ownership",
    factsAr: "العلاقة التجارية وأداء كل طرف المتفق عليه والمعاملة محل النزاع وما إذا كانت المسألة عقدية أو مالية أو متعلقة بملكية النشاط",
    evidenceEn: "commercial agreements, purchase orders, delivery and acceptance records, invoices, payments and correspondence identifying the disputed obligation",
    evidenceAr: "الاتفاقات التجارية وأوامر الشراء وسجلات التسليم والقبول والفواتير والمدفوعات والمراسلات التي تحدد الالتزام محل الخلاف",
    outcomeEn: "separate the disputed obligations and amounts, evaluate the evidence and compare negotiation with the relevant dispute route",
    outcomeAr: "فصل الالتزامات والمبالغ المتنازع عليها وتقييم الأدلة ومقارنة التفاوض بالمسار المناسب للنزاع",
  },
  investment: {
    factsEn: "the proposed or existing investment, investor and ownership structure, licensed activity, relevant jurisdictions and the entry, operation or exit decision at issue",
    factsAr: "الاستثمار المقترح أو القائم وهيكل المستثمر والملكية والنشاط المرخص والاختصاصات ذات الصلة وقرار الدخول أو التشغيل أو التخارج محل البحث",
    evidenceEn: "investor and entity records, ownership charts, licences and applications, investment agreements, funding records and regulator or local-partner correspondence",
    evidenceAr: "مستندات المستثمر والمنشأة ومخططات الملكية والتراخيص والطلبات واتفاقات الاستثمار وسجلات التمويل ومراسلات الجهة التنظيمية أو الشريك المحلي",
    outcomeEn: "identify the activity-specific approval and contractual questions before evaluating the proposed investment step",
    outcomeAr: "تحديد مسائل الموافقة والعقود الخاصة بالنشاط قبل تقييم الخطوة الاستثمارية المقترحة",
  },
  arbitration: {
    factsEn: "the proposed or signed arbitration agreement, parties and dispute scope, chosen seat and rules, and whether the matter is before referral, during proceedings or after an award",
    factsAr: "اتفاق التحكيم المقترح أو الموقع والأطراف ونطاق النزاع والمقر والقواعد المختارة وما إذا كانت المسألة قبل الإحالة أو أثناء الإجراءات أو بعد صدور حكم",
    evidenceEn: "the complete dispute-resolution clause and contract, incorporated rules, notices, appointment correspondence and any procedural orders, settlement terms or award",
    evidenceAr: "شرط تسوية المنازعات والعقد كاملين والقواعد المحال إليها والإخطارات ومراسلات التعيين وأي أوامر إجرائية أو شروط تسوية أو حكم تحكيمي",
    outcomeEn: "assess consent, procedure and the available step at the actual arbitration stage rather than assuming an award already exists",
    outcomeAr: "تقييم الرضا والإجراء والخطوة المتاحة في مرحلة التحكيم الفعلية بدلاً من افتراض وجود حكم تحكيمي مسبقاً",
  },
  banking: {
    factsEn: "the banking product or transaction, account holder and other parties, the bank's explanation and the disputed payment, restriction, security or financing term",
    factsAr: "المنتج أو المعاملة المصرفية وصاحب الحساب والأطراف الأخرى وتفسير المصرف والدفع أو القيد أو الضمان أو شرط التمويل محل الخلاف",
    evidenceEn: "account statements, transaction references, financing and security documents, bank notices, complaint numbers and the bank's written response",
    evidenceAr: "كشوف الحساب ومراجع المعاملات ومستندات التمويل والضمان وإخطارات المصرف وأرقام الشكاوى والرد المكتوب للمصرف",
    outcomeEn: "reconcile the transaction and contractual position, distinguish a bank complaint from proceedings and identify the relevant next step",
    outcomeAr: "مطابقة المعاملة والمركز العقدي والتمييز بين الشكوى المصرفية والإجراءات القضائية وتحديد الخطوة التالية ذات الصلة",
  },
  tax: {
    factsEn: "the tax type and period, registration or filing position, disputed assessment or invoice entry, the authority's reasons and the date of notification",
    factsAr: "نوع الضريبة والفترة وحالة التسجيل أو الإقرار والربط أو القيد في الفاتورة محل الخلاف وأسباب الجهة وتاريخ التبليغ",
    evidenceEn: "the assessment or penalty notice, tax registrations and returns, invoices, ledgers, reconciliations, proof of payment and authority correspondence",
    evidenceAr: "إخطار الربط أو الغرامة والتسجيلات والإقرارات الضريبية والفواتير ودفاتر الحساب والمطابقات وإثبات السداد ومراسلات الجهة",
    outcomeEn: "identify the disputed tax treatment and supporting records before assessing correction, clarification or an objection under the applicable framework",
    outcomeAr: "تحديد المعالجة الضريبية محل الخلاف والمستندات المؤيدة قبل تقييم التصحيح أو الاستيضاح أو الاعتراض وفق الإطار المنطبق",
  },
  estate: {
    factsEn: "the deceased's relevant family and jurisdictional connections, potential beneficiaries, any will, the asset and liability inventory and existing estate proceedings",
    factsAr: "الصلات الأسرية والاختصاصية ذات الصلة بالمتوفى والمستفيدين المحتملين وأي وصية وجرد الأموال والالتزامات والإجراءات القائمة بشأن التركة",
    evidenceEn: "death and civil-status records, wills and estate orders, relationship documents, asset locations, debt records and correspondence with asset-holding institutions",
    evidenceAr: "مستندات الوفاة والحالة المدنية والوصايا وقرارات التركة ومستندات القرابة ومواقع الأموال وسجلات الديون ومراسلات المؤسسات الحائزة للأموال",
    outcomeEn: "separate authority, document validity, liabilities and distribution questions before proposing an estate-related step",
    outcomeAr: "فصل مسائل الصلاحية وصحة المستندات والالتزامات والتوزيع قبل اقتراح خطوة متعلقة بالتركة",
  },
  civil: {
    factsEn: "the relationship between the parties, alleged act or omission, disputed obligation or right and the causal link to the loss or interference claimed",
    factsAr: "العلاقة بين الأطراف والفعل أو الامتناع المدعى به والالتزام أو الحق المتنازع عليه وعلاقة السببية بالخسارة أو التعرض المدعى به",
    evidenceEn: "the relevant agreement or civil record, incident chronology, correspondence, witness details and records supporting the alleged loss or interference",
    evidenceAr: "العقد أو السجل المدني ذي الصلة وتسلسل الواقعة والمراسلات وبيانات الشهود والمستندات المؤيدة للخسارة أو التعرض المدعى به",
    outcomeEn: "identify the civil issue, evidence and disputed relief without assuming that a criminal or specialist procedure applies",
    outcomeAr: "تحديد المسألة المدنية والأدلة والطلب المتنازع عليه دون افتراض انطباق إجراء جزائي أو متخصص",
  },
  procedure: {
    factsEn: "the parties, proposed or existing proceedings, current procedural stage, service history and the specific filing, evidence or jurisdiction issue",
    factsAr: "الأطراف والإجراءات المقترحة أو القائمة والمرحلة الإجرائية الحالية وتاريخ التبليغ ومسألة القيد أو الإثبات أو الاختصاص المحددة",
    evidenceEn: "the claim and response, case reference, service notices, court orders, hearing records, evidence schedules and any decision carrying a response date",
    evidenceAr: "الدعوى والرد ورقم الملف وإخطارات التبليغ وأوامر المحكمة ومحاضر الجلسات وقوائم الأدلة وأي قرار يتضمن ميعاداً للرد",
    outcomeEn: "identify the procedural question at the current stage and verify the forum, document requirements and timing before a filing is proposed",
    outcomeAr: "تحديد المسألة الإجرائية في المرحلة الحالية والتحقق من الجهة ومتطلبات المستندات والمواعيد قبل اقتراح قيد طلب",
  },
  insolvency: {
    factsEn: "the debtor's financial position, creditor claims and security, current proceedings and the proposed restructuring, creditor response or director decision",
    factsAr: "الوضع المالي للمدين ومطالبات الدائنين وضماناتهم والإجراءات القائمة وإعادة التنظيم أو رد الدائن أو قرار المدير المقترح",
    evidenceEn: "current accounts and cash-flow records, creditor and asset schedules, security documents, director resolutions and notices or orders in any existing proceedings",
    evidenceAr: "الحسابات الحالية وسجلات التدفق النقدي وقوائم الدائنين والأصول ومستندات الضمان وقرارات المديرين والإخطارات أو الأوامر في أي إجراءات قائمة",
    outcomeEn: "distinguish financial restructuring from a collection dispute and assess the options and restrictions relevant to the current stage",
    outcomeAr: "التمييز بين إعادة التنظيم المالي ونزاع التحصيل وتقييم الخيارات والقيود ذات الصلة بالمرحلة الحالية",
  },
  immigration: {
    factsEn: "the person's nationality, visa or residence category, sponsor or employer, travel history and the precise decision or restriction communicated by the authority",
    factsAr: "جنسية الشخص وفئة التأشيرة أو الإقامة والكفيل أو صاحب العمل وسجل السفر والقرار أو القيد المحدد الذي أبلغته الجهة",
    evidenceEn: "passport and visa or residence records, application references, entry and exit dates, relevant employment documents and the authority's written decision or notice",
    evidenceAr: "جواز السفر ومستندات التأشيرة أو الإقامة ومراجع الطلبات وتواريخ الدخول والخروج ومستندات العمل ذات الصلة والقرار أو الإخطار المكتوب للجهة",
    outcomeEn: "identify the status and issuing authority, verify the stated restriction and assess the available correction or response route",
    outcomeAr: "تحديد الوضع والجهة المصدرة والتحقق من القيد المذكور وتقييم طريق التصحيح أو الرد المتاح",
  },
  transport: {
    factsEn: "the transport mode and route, carrier and contracting parties, shipment or journey details, incident and documented delay, damage or loss",
    factsAr: "وسيلة النقل ومساره والناقل والأطراف المتعاقدة وتفاصيل الشحنة أو الرحلة والواقعة والتأخير أو الضرر أو الفقد الموثق",
    evidenceEn: "the ticket, bill of lading or carriage agreement, booking and tracking records, delivery and damage reports, notices and invoices supporting the claimed loss",
    evidenceAr: "التذكرة أو سند الشحن أو عقد النقل وسجلات الحجز والتتبع وتقارير التسليم والتلف والإخطارات والفواتير المؤيدة للخسارة المطالب بها",
    outcomeEn: "identify the carriage relationship and incident evidence before checking the applicable transport framework, complaint and claim options",
    outcomeAr: "تحديد علاقة النقل وأدلة الواقعة قبل التحقق من الإطار المنطبق وخيارات الشكوى والمطالبة",
  },
  consumer: {
    factsEn: "the product or service purchased, seller and platform roles, promised and actual performance, payment and the reason for the refund, defect or account complaint",
    factsAr: "المنتج أو الخدمة المشتراة ودور البائع والمنصة والأداء الموعود والفعلي والسداد وسبب طلب الاسترداد أو الشكوى من العيب أو الحساب",
    evidenceEn: "the order confirmation, receipt, advertised specifications and terms, delivery or defect records and the seller's or platform's complaint response",
    evidenceAr: "تأكيد الطلب والإيصال والمواصفات والشروط المعلنة وسجلات التسليم أو العيب ورد البائع أو المنصة على الشكوى",
    outcomeEn: "distinguish a seller, platform or payment issue and assess the evidence for the requested correction, refund or other response",
    outcomeAr: "التمييز بين مسألة البائع أو المنصة أو الدفع وتقييم الأدلة المؤيدة للتصحيح أو الاسترداد أو الرد الآخر المطلوب",
  },
};
