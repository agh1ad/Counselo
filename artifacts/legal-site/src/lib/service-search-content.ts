export type SearchContent = {
  issuesEn: string[];
  issuesAr: string[];
  documentsEn: string[];
  documentsAr: string[];
};

export const ADDITIONAL_SEARCH_ISSUES: Record<string, { en: string[]; ar: string[] }> = {
  "family-law": {
    en: ["Visitation order enforcement", "Child relocation and travel disputes", "Recognition of foreign family judgments", "Paternity dispute", "Will validity and estate distribution"],
    ar: ["تنفيذ أحكام الزيارة", "منازعات انتقال الأطفال والسفر بهم", "الاعتراف بالأحكام الأسرية الأجنبية", "منازعة إثبات النسب", "صحة الوصية وتوزيع التركة"],
  },
  "employment-law": {
    en: ["Delayed or unpaid salary", "Resignation because of unpaid wages", "Experience certificate and service-transfer dispute", "Sponsorship transfer dispute", "Work injury and compensation claim", "Disciplinary warning and workplace investigation"],
    ar: ["تأخر الراتب أو عدم دفعه", "الاستقالة بسبب عدم دفع الأجور", "منازعة شهادة الخبرة ونقل الخدمات", "منازعة نقل الكفالة", "إصابة العمل ومطالبة التعويض", "الإنذار التأديبي والتحقيق في مكان العمل"],
  },
  "business-law": {
    en: ["Company formation and registration", "Unpaid business invoices", "Commercial supply contract dispute", "Commercial agency termination", "Commercial concealment dispute", "Shareholder and partner dispute", "Government tender dispute"],
    ar: ["تأسيس الشركة وتسجيلها", "الفواتير التجارية غير المدفوعة", "منازعة عقد التوريد التجاري", "إنهاء الوكالة التجارية", "منازعة التستر التجاري", "منازعة المساهمين والشركاء", "منازعة المناقصة الحكومية"],
  },
  "real-estate": {
    en: ["Eviction notice and eviction dispute", "Unpaid rent and rental payment claim", "Security deposit recovery", "Construction delay and defective construction", "Title deed and registration dispute", "Property encroachment and boundary dispute", "Expropriation and compensation claim"],
    ar: ["إخطار الإخلاء ومنازعة الإخلاء", "الإيجار غير المدفوع ومطالبة الأجرة", "استرداد مبلغ التأمين", "تأخر البناء وعيوب الإنشاء", "منازعة سند الملكية والتسجيل", "التعدي على العقار ومنازعة الحدود", "نزع الملكية ومطالبة التعويض"],
  },
  "foreign-investment": {
    en: ["Investment licence refusal or cancellation", "Foreign investor compensation claim", "Foreign investor and local-partner dispute"],
    ar: ["رفض أو إلغاء ترخيص الاستثمار", "مطالبة المستثمر الأجنبي بالتعويض", "منازعة المستثمر الأجنبي والشريك المحلي"],
  },
  "administrative-law": {
    en: ["Licence refusal or cancellation", "Government penalty challenge", "Public procurement dispute"],
    ar: ["رفض أو إلغاء الترخيص", "الطعن في الغرامة الحكومية", "منازعة المشتريات العامة"],
  },
  arbitration: {
    en: ["Foreign arbitral award enforcement", "Emergency arbitration and interim measures", "Challenge to arbitration jurisdiction"],
    ar: ["تنفيذ حكم التحكيم الأجنبي", "التحكيم الطارئ والتدابير المؤقتة", "الطعن في اختصاص هيئة التحكيم"],
  },
  enforcement: {
    en: ["Bounced cheque execution", "Foreign judgment enforcement", "Payment order and urgent debt recovery", "Asset tracing and debtor investigation", "Travel-ban application for debt recovery", "Service suspension and asset-freezing request"],
    ar: ["تنفيذ الشيك المرتجع", "تنفيذ الحكم الأجنبي", "أمر الأداء والتحصيل العاجل للدين", "تتبع الأصول والتحري عن المدين", "طلب منع السفر لتحصيل الدين", "طلب إيقاف الخدمات وتجميد الأصول"],
  },
  "companies-law": {
    en: ["Shareholder exit and buyout dispute", "Company dissolution and liquidation dispute"],
    ar: ["خروج المساهم أو الشريك ومنازعة شراء الحصة", "منازعة حل الشركة وتصفيتها"],
  },
  contracts: {
    en: ["Supply contract non-delivery", "Defective goods and non-conforming delivery", "Service agreement breach", "Contract evidence and electronic messages"],
    ar: ["عدم التسليم في عقد التوريد", "عيوب البضائع وعدم مطابقة التسليم", "الإخلال بعقد الخدمات", "إثبات العقد والرسائل الإلكترونية"],
  },
  "criminal-law": {
    en: ["Police complaint defence", "Travel-ban and detention concern", "Online defamation complaint", "Cybercrime accusation and defence"],
    ar: ["الدفاع في الشكوى أمام الشرطة", "مشكلة منع السفر أو التوقيف", "شكوى التشهير الإلكتروني", "اتهام بجريمة إلكترونية والدفاع فيها"],
  },
  "banking-finance": {
    en: ["Unauthorized bank transaction", "Loan default and restructuring", "Personal guarantee enforcement"],
    ar: ["المعاملة المصرفية غير المصرح بها", "التعثر في سداد القرض وإعادة الهيكلة", "تنفيذ الكفالة الشخصية"],
  },
  "intellectual-property": {
    en: ["Trademark opposition and cancellation", "Counterfeit and brand infringement", "Copyright infringement online"],
    ar: ["الاعتراض على العلامة التجارية وإلغاؤها", "تقليد العلامة التجارية والتعدي عليها", "التعدي على حقوق المؤلف أونلاين"],
  },
  "tax-zakat": {
    en: ["Tax audit and assessment objection", "VAT refund and registration dispute", "Customs penalty challenge"],
    ar: ["الفحص والربط الضريبي والاعتراض عليه", "استرداد ضريبة القيمة المضافة ومنازعة التسجيل", "الطعن في الغرامة الجمركية"],
  },
  "cyber-law": {
    en: ["Online defamation and removal request", "Hacked account and unauthorized access", "Personal-data breach response"],
    ar: ["التشهير الإلكتروني وطلب الإزالة", "اختراق الحساب والدخول غير المصرح به", "الاستجابة لحادث خرق البيانات الشخصية"],
  },
  "medical-malpractice": {
    en: ["Medical-record access dispute", "Treatment injury and compensation claim"],
    ar: ["منازعة الحصول على السجل الطبي", "إصابة العلاج ومطالبة التعويض"],
  },
  "insurance-law": {
    en: ["Denied insurance claim", "Delayed insurance settlement", "Policy coverage dispute", "Traffic accident liability and compensation", "Traffic report and fault dispute", "Uninsured accident compensation claim"],
    ar: ["رفض مطالبة التأمين", "تأخر تسوية مطالبة التأمين", "منازعة تغطية وثيقة التأمين", "المسؤولية والتعويض عن حادث مروري", "منازعة تقرير الحادث ونسبة الخطأ", "مطالبة التعويض عن حادث دون تأمين"],
  },
  "civil-law": {
    en: ["Personal injury compensation claim", "Defamation and reputation damage claim", "Possession and interference dispute"],
    ar: ["مطالبة التعويض عن الإصابة الشخصية", "مطالبة التشهير والضرر بالسمعة", "منازعة الحيازة والتعرض لها"],
  },
  "civil-procedure": {
    en: ["Court service and notification problem", "Expert evidence and report dispute", "Appeal deadline and filing problem"],
    ar: ["مشكلة إعلان الدعوى والتبليغ القضائي", "منازعة الخبرة والتقرير الفني", "مشكلة ميعاد الطعن والقيد"],
  },
  "criminal-procedure": {
    en: ["Release and detention application", "Evidence challenge in criminal case", "Criminal appeal deadline"],
    ar: ["طلب الإفراج والتوقيف", "الطعن في الدليل في القضية الجزائية", "ميعاد الطعن الجزائي"],
  },
};

export const RELATED_SERVICES: Record<string, string[]> = {
  "family-law": ["civil-law", "real-estate", "enforcement"],
  "employment-law": ["contracts", "business-law", "enforcement"],
  "business-law": ["companies-law", "contracts", "arbitration"],
  "real-estate": ["contracts", "civil-law", "enforcement"],
  "foreign-investment": ["companies-law", "business-law", "contracts"],
  "administrative-law": ["foreign-investment", "tax-zakat", "enforcement"],
  arbitration: ["business-law", "contracts", "enforcement"],
  enforcement: ["business-law", "contracts", "arbitration"],
  "companies-law": ["business-law", "contracts", "foreign-investment"],
  contracts: ["business-law", "companies-law", "arbitration"],
  "criminal-law": ["criminal-procedure", "cyber-law", "enforcement", "civil-law"],
  "banking-finance": ["business-law", "contracts", "enforcement"],
  "intellectual-property": ["business-law", "contracts", "companies-law"],
  "tax-zakat": ["business-law", "companies-law", "administrative-law"],
  "cyber-law": ["criminal-law", "intellectual-property", "business-law"],
  "medical-malpractice": ["insurance-law", "employment-law", "civil-law", "civil-procedure"],
  "insurance-law": ["civil-law", "contracts", "enforcement"],
  "civil-law": ["civil-procedure", "contracts", "real-estate"],
  "civil-procedure": ["civil-law", "enforcement", "arbitration"],
  "criminal-procedure": ["criminal-law", "cyber-law", "civil-procedure"],
};

const sharedDocs = {
  en: ["Identity and contact information", "Relevant agreements and correspondence", "Court, authority, or regulator documents", "A dated summary of the facts and desired outcome"],
  ar: ["بيانات الهوية والتواصل", "العقود والمراسلات ذات الصلة", "مستندات المحكمة أو الجهة الرسمية أو التنظيمية", "ملخص مؤرخ للوقائع والنتيجة المطلوبة"],
};

function entry(issuesEn: string[], issuesAr: string[], documentsEn: string[] = sharedDocs.en, documentsAr: string[] = sharedDocs.ar): SearchContent {
  return { issuesEn, issuesAr, documentsEn, documentsAr };
}

export const SERVICE_SEARCH_CONTENT: Record<string, SearchContent> = {
  "family-law": entry(
    ["Divorce and separation", "Child custody and visitation", "Alimony and child maintenance", "Marriage and personal-status disputes", "Inheritance and family settlements"],
    ["الطلاق والتفريق", "الحضانة والزيارة", "النفقة الزوجية ونفقة الأطفال", "الزواج ومنازعات الأحوال الشخصية", "الميراث والتسويات العائلية"],
    ["Marriage or divorce documents", "Children's identity and custody records", "Income and expense evidence", "Prior judgments, agreements, and family correspondence"],
    ["وثائق الزواج أو الطلاق", "هويات الأطفال وسجلات الحضانة", "إثبات الدخل والمصروفات", "الأحكام والاتفاقيات والمراسلات العائلية السابقة"],
  ),
  "employment-law": entry(
    ["Wrongful termination", "Unpaid wages and benefits", "Employment contract review", "End-of-service entitlements", "Workplace and disciplinary disputes"],
    ["الفصل التعسفي", "الأجور والمستحقات غير المدفوعة", "مراجعة عقد العمل", "مستحقات نهاية الخدمة", "منازعات العمل والإجراءات التأديبية"],
    ["Employment contract and amendments", "Payslips and benefit records", "Termination or disciplinary notices", "HR emails, messages, and performance records"],
    ["عقد العمل وتعديلاته", "كشوف الرواتب وسجلات المزايا", "إشعارات الفصل أو العقوبات", "رسائل الموارد البشرية وسجلات الأداء"],
  ),
  "business-law": entry(
    ["Commercial disputes", "Supplier and customer claims", "Business contract risk", "Commercial liability", "Negotiation and settlement strategy"],
    ["المنازعات التجارية", "مطالبات الموردين والعملاء", "مخاطر العقود التجارية", "المسؤولية التجارية", "استراتيجية التفاوض والتسوية"],
  ),
  "real-estate": entry(
    ["Property ownership disputes", "Sale and purchase contract disputes", "Lease and eviction matters", "Registration and title problems", "Construction and contractor claims"],
    ["منازعات ملكية العقارات", "منازعات عقود البيع والشراء", "الإيجار والإخلاء", "مشكلات التسجيل والسندات", "مطالبات البناء والمقاولين"],
    ["Title, deed, or registration records", "Sale, lease, or construction contract", "Payment evidence", "Property correspondence, notices, and expert reports"],
    ["سندات الملكية أو سجلات التسجيل", "عقد البيع أو الإيجار أو البناء", "إثباتات الدفع", "مراسلات العقار والإشعارات وتقارير الخبرة"],
  ),
  "foreign-investment": entry(
    ["Foreign-owned company formation", "Investment and business licensing", "Market-entry legal structure", "Regulatory compliance", "Investor and cross-border disputes"],
    ["تأسيس الشركات المملوكة لأجانب", "تراخيص الاستثمار والأعمال", "الهيكل القانوني لدخول السوق", "الامتثال التنظيمي", "منازعات المستثمرين والمعاملات العابرة للحدود"],
    ["Investor and shareholder identification", "Proposed business activity and ownership structure", "Draft constitutional and investment documents", "Existing licenses, approvals, and authority correspondence"],
    ["هويات المستثمرين والمساهمين", "النشاط المقترح وهيكل الملكية", "مسودات وثائق التأسيس والاستثمار", "التراخيص والموافقات ومراسلات الجهات الرسمية"],
  ),
  "administrative-law": entry(
    ["Challenges to government decisions", "Licensing refusals and penalties", "Government contract disputes", "Public procurement disputes", "Administrative objections and appeals"],
    ["الطعن في القرارات الحكومية", "رفض التراخيص والعقوبات", "منازعات العقود الحكومية", "منازعات المشتريات العامة", "الاعتراضات والطعون الإدارية"],
  ),
  arbitration: entry(
    ["Commercial arbitration", "Arbitration clause review", "Urgent protective measures", "Recognition and enforcement of awards", "Mediation and negotiated settlement"],
    ["التحكيم التجاري", "مراجعة شرط التحكيم", "التدابير التحفظية العاجلة", "الاعتراف بأحكام التحكيم وتنفيذها", "الوساطة والتسوية التفاوضية"],
  ),
  enforcement: entry(
    ["Enforcement of court judgments", "Commercial debt recovery", "Unpaid invoices and payment claims", "Asset and debtor investigation", "Enforcement objections and settlement"],
    ["تنفيذ الأحكام القضائية", "تحصيل الديون التجارية", "الفواتير والمطالبات المالية غير المدفوعة", "البحث عن أصول المدين", "منازعات التنفيذ والتسوية"],
    ["Judgment, award, cheque, or enforceable instrument", "Debtor identification and known asset details", "Invoices and account statements", "Payment demands and settlement correspondence"],
    ["الحكم أو قرار التحكيم أو الشيك أو السند التنفيذي", "بيانات المدين والأصول المعروفة", "الفواتير وكشوف الحساب", "مطالبات الدفع ومراسلات التسوية"],
  ),
  "companies-law": entry(
    ["Company formation and restructuring", "Shareholder and partner disputes", "Corporate governance", "Director and manager liability", "Mergers, dissolution, and liquidation"],
    ["تأسيس الشركات وإعادة الهيكلة", "منازعات الشركاء والمساهمين", "حوكمة الشركات", "مسؤولية المديرين", "الاندماج والحل والتصفية"],
  ),
  contracts: entry(
    ["Contract drafting and review", "Breach of contract", "Termination and cancellation", "Penalty and compensation clauses", "Negotiation and enforcement"],
    ["صياغة العقود ومراجعتها", "الإخلال بالعقد", "الفسخ والإنهاء", "الشروط الجزائية والتعويض", "التفاوض والتنفيذ"],
    ["Current contract and all amendments", "Offers, purchase orders, and specifications", "Performance and payment evidence", "Notices, emails, and dispute correspondence"],
    ["العقد الحالي وجميع تعديلاته", "العروض وأوامر الشراء والمواصفات", "إثباتات التنفيذ والدفع", "الإشعارات والرسائل ومراسلات النزاع"],
  ),
  "criminal-law": entry(
    ["Criminal complaints and defence", "Investigation and questioning", "Arrest and detention concerns", "Digital and documentary evidence", "Trial and appeal preparation"],
    ["الشكاوى والدفاع الجزائي", "التحقيق والاستجواب", "القبض والتوقيف", "الأدلة الرقمية والمستندية", "التحضير للمحاكمة والطعن"],
  ),
  "banking-finance": entry(
    ["Bank and customer disputes", "Financing agreement review", "Unauthorized transactions", "Guarantees and security enforcement", "Financial regulatory compliance"],
    ["منازعات البنوك والعملاء", "مراجعة عقود التمويل", "المعاملات غير المصرح بها", "الضمانات وتنفيذ التأمينات", "الامتثال المالي والتنظيمي"],
  ),
  "intellectual-property": entry(
    ["Trademark registration and disputes", "Copyright protection", "Patent and licensing matters", "Trade-secret protection", "Infringement and counterfeit claims"],
    ["تسجيل العلامات التجارية ومنازعاتها", "حماية حقوق المؤلف", "البراءات والتراخيص", "حماية الأسرار التجارية", "التعدي والتقليد"],
  ),
  "tax-zakat": entry(
    ["Tax and zakat assessments", "VAT and customs issues", "Objections and appeals", "Business tax compliance", "Tax penalties and disputes"],
    ["الربوط الضريبية والزكوية", "ضريبة القيمة المضافة والجمارك", "الاعتراضات والطعون", "الامتثال الضريبي للشركات", "الغرامات والمنازعات الضريبية"],
  ),
  "cyber-law": entry(
    ["Cybercrime allegations and defence", "Online defamation", "Unauthorized access and account misuse", "Data-protection incidents", "Digital evidence and platform disputes"],
    ["ادعاءات الجرائم الإلكترونية والدفاع", "التشهير الإلكتروني", "الدخول غير المصرح به وإساءة استخدام الحسابات", "حوادث حماية البيانات", "الأدلة الرقمية ومنازعات المنصات"],
  ),
  "medical-malpractice": entry(
    ["Medical negligence claims", "Misdiagnosis and delayed diagnosis", "Surgical and treatment errors", "Medical-record review", "Compensation and professional-liability disputes"],
    ["مطالبات الإهمال الطبي", "سوء التشخيص وتأخره", "الأخطاء الجراحية والعلاجية", "مراجعة السجلات الطبية", "التعويض ومنازعات المسؤولية المهنية"],
    ["Complete medical records", "Reports, prescriptions, and test results", "Consent and treatment documents", "Expenses, loss evidence, and provider correspondence"],
    ["السجلات الطبية الكاملة", "التقارير والوصفات ونتائج الفحوص", "وثائق الموافقة والعلاج", "المصروفات وإثبات الضرر ومراسلات مقدم الخدمة"],
  ),
  "insurance-law": entry(
    ["Denied or delayed insurance claims", "Coverage and policy interpretation", "Insurer and broker disputes", "Liability and compensation", "Settlement negotiation"],
    ["رفض مطالبات التأمين أو تأخيرها", "تفسير التغطية ووثيقة التأمين", "منازعات شركات التأمين والوسطاء", "المسؤولية والتعويض", "التفاوض على التسوية"],
  ),
  "civil-law": entry(
    ["Civil claims and private disputes", "Contractual and non-contractual liability", "Compensation claims", "Property and possession disputes", "Obligations and remedies"],
    ["الدعاوى المدنية والمنازعات الخاصة", "المسؤولية العقدية والتقصيرية", "مطالبات التعويض", "منازعات الملكية والحيازة", "الالتزامات ووسائل المعالجة"],
  ),
  "civil-procedure": entry(
    ["Court filing and jurisdiction", "Evidence and procedural objections", "Interim and protective measures", "Appeals and enforcement", "Litigation strategy and case management"],
    ["رفع الدعوى والاختصاص", "الإثبات والدفوع الإجرائية", "التدابير المؤقتة والتحفظية", "الطعون والتنفيذ", "استراتيجية التقاضي وإدارة الدعوى"],
  ),
  "criminal-procedure": entry(
    ["Investigation rights", "Arrest and detention procedure", "Evidence challenges", "Trial procedure", "Appeals and post-judgment remedies"],
    ["حقوق المتهم أثناء التحقيق", "إجراءات القبض والتوقيف", "الطعن في الأدلة", "إجراءات المحاكمة", "الطعون وطرق المراجعة بعد الحكم"],
  ),
};
