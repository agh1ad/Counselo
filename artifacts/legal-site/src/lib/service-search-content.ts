export type SearchContent = {
  issuesEn: string[];
  issuesAr: string[];
  documentsEn: string[];
  documentsAr: string[];
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
