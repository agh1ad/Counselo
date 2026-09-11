import type { MatterSourceGuidance } from "./matter-source-guidance";
import { SYRIA_PROBLEM_COMPLETION } from "./syria-problem-completion";

// Explicit mappings only. A source supports the answer beside it, not every claim on a page.
export const PROBLEM_COMPLETION_GUIDANCE: MatterSourceGuidance[] = [
  ...SYRIA_PROBLEM_COMPLETION,
  {
    region: "sa", service: "arbitration", id: "sa-award-execution-documents", reviewedAt: "2026-09-11",
    problems: ["recognition-and-enforcement-of-awards", "foreign-arbitral-award-enforcement"],
    en: { q: "Which enforcement framework applies to the arbitration award in Saudi Arabia?", a: "Identify the seat, governing arbitration law and any applicable convention first. For awards governed by the Saudi Arbitration Law, Articles 53–55 address the enforcement application, supporting documents, notification and public-order checks. A foreign award needs its own applicable recognition route; do not assume that translating it completes enforcement. Supply the award, arbitration agreement, service evidence and any challenge or stay decision." },
    ar: { q: "ما إطار تنفيذ حكم التحكيم في السعودية؟", a: "حدد مقر التحكيم ونظامه وأي اتفاقية منطبقة أولاً. تعالج المواد 53–55 من نظام التحكيم السعودي طلب التنفيذ ومستنداته والتبليغ وفحص النظام العام للأحكام الخاضعة له. ويحتاج الحكم الأجنبي إلى تحديد طريق الاعتراف المنطبق؛ فلا تفترض أن ترجمته تستكمل التنفيذ. قدم الحكم والاتفاق ودليل التبليغ وأي طعن أو وقف." },
    sources: [{ en: "SCCA — official translation of Saudi Arbitration Law, Articles 53–55", ar: "المركز السعودي للتحكيم — الترجمة الرسمية لنظام التحكيم، المواد 53–55", href: "https://sadr.org/public/upload/pdf-files/Saudi-Arbitration-Law-En.pdf" }],
  },
  {
    region: "sa", service: "arbitration", id: "sa-jurisdiction-plea-stage", reviewedAt: "2026-09-11", problems: ["challenge-to-arbitration-jurisdiction"],
    en: { q: "Who considers a Saudi arbitration jurisdiction objection, and when?", a: "Article 20 gives the tribunal competence to consider objections to its jurisdiction, including the existence, validity and scope of the agreement. Timing matters, particularly when new matters allegedly exceed the clause. Identify the precise objection and procedural stage promptly. Article 21 treats a valid arbitration clause separately from the main contract, so termination of that contract does not itself invalidate the clause." },
    ar: { q: "من يفصل في الدفع بعدم اختصاص هيئة التحكيم السعودية ومتى؟", a: "تخول المادة 20 الهيئة نظر الدفوع المتعلقة باختصاصها ومنها وجود الاتفاق وصحته ونطاقه. ويؤثر توقيت الدفع، خصوصاً عند إدخال مسائل يقال إنها تتجاوز الشرط. حدد الدفع والمرحلة فوراً. وتستقل جملة التحكيم الصحيحة عن العقد الأصلي وفق المادة 21، فلا يبطلها مجرد إنهاء العقد." },
    sources: [{ en: "SCCA — official Arbitration Law translation, Articles 20–21", ar: "المركز السعودي للتحكيم — الترجمة الرسمية، المادتان 20–21", href: "https://sadr.org/public/upload/pdf-files/Saudi-Arbitration-Law-En.pdf" }],
  },
  {
    region: "sa", service: "enforcement", id: "sa-debt-title-before-execution", reviewedAt: "2026-09-11",
    problems: ["commercial-debt-recovery", "unpaid-invoices-and-payment-claims", "payment-order-and-urgent-debt-recovery"],
    en: { q: "Can every unpaid Saudi invoice be submitted directly for execution?", a: "First identify whether you hold a qualifying executable instrument or still need a determination of the debt. The Ministry’s execution service requires selection and submission of the instrument on which execution is based. Reconcile the invoice with the contract, delivery, acceptance and payments. A payment-order application, ordinary claim and execution request are different routes; urgency does not by itself turn an invoice into an executable title." },
    ar: { q: "هل تقدم كل فاتورة سعودية غير مسددة للتنفيذ مباشرة؟", a: "حدد أولاً هل تملك سنداً مستوفياً لشروط التنفيذ أم تحتاج إلى إثبات أصل الدين. تتطلب خدمة التنفيذ لدى الوزارة تحديد السند الذي يستند إليه الطلب وتقديمه. طابق الفاتورة بالعقد والتسليم والقبول والمدفوعات. أمر الأداء والدعوى العادية وطلب التنفيذ مسارات مختلفة؛ ولا تحول الاستعجالية الفاتورة بذاتها إلى سند تنفيذي." },
    sources: [{ en: "Ministry of Justice — submitting an execution request", ar: "وزارة العدل — تقديم طلب تنفيذ", href: "https://www.moj.gov.sa/ar/eServices/pages/1c719954-3463-4754-85e1-1b319b937b86.aspx" }],
  },
  {
    region: "sa", service: "enforcement", id: "sa-debtor-unavailable-record", reviewedAt: "2026-09-11", problems: ["execution-against-an-unavailable-or-absconding-debtor"],
    en: { q: "What changes when a Saudi judgment debtor cannot be reached?", a: "Identify the existing execution file, service attempts, debtor identifiers and any lawful information about assets. Najiz provides execution-file and financial-report services, but a creditor’s inability to contact the debtor does not itself prove concealment or authorize access to private banking data. Ask for the procedure available in the actual file, distinguishing service, disclosure, attachment and objections; preserve the executable instrument and payment history." },
    ar: { q: "ما الذي يتغير عند تعذر الوصول إلى المنفذ ضده في السعودية؟", a: "حدد ملف التنفيذ ومحاولات التبليغ وهوية المدين والمعلومات المشروعة عن أمواله. يتيح ناجز خدمات ملف التنفيذ والتقرير المالي، لكن تعذر التواصل لا يثبت إخفاء الأموال ولا يخول الاطلاع الخاص على بيانات المصارف. اطلب الإجراء المتاح في الملف مع تمييز التبليغ والإفصاح والحجز والمنازعة، واحفظ السند وسجل المدفوعات." },
    sources: [{ en: "Ministry of Justice — execution financial report", ar: "وزارة العدل — الاستعلام عن التقرير المالي", href: "https://www.moj.gov.sa/ar/eServices/pages/2200fd6a-d8d2-4583-a843-2d67839f5a1b.aspx" }],
  },
  {
    region: "sa", service: "enforcement", id: "sa-cheque-debt-and-allegation", reviewedAt: "2026-09-11", problems: ["bounced-cheque-defence-and-criminal-complaint-concern"],
    en: { q: "Does answering a Saudi cheque execution request also answer a criminal allegation?", a: "Treat the execution demand and any criminal complaint as separate proceedings. Obtain the cheque, bank-return reason, underlying transaction, payment evidence and actual summons or case reference. The execution channel concerns the instrument and outstanding obligation; it does not determine every alleged cheque offence. Review signature, authority, amount and the stated accusation before responding, and do not assume that a payment arrangement closes every related file." },
    ar: { q: "هل يجيب الرد على تنفيذ شيك سعودي عن الاتهام الجزائي أيضاً؟", a: "تعامل مع مطالبة التنفيذ وأي شكوى جزائية كإجرائين مستقلين. اجمع الشيك وسبب الإرجاع والمعاملة الأصلية ودليل السداد والاستدعاء أو مرجع القضية. يتعلق مسار التنفيذ بالسند والالتزام الباقي، ولا يحسم كل جريمة شيك مدعاة. راجع التوقيع والصلاحية والمبلغ والاتهام قبل الرد ولا تفترض أن جدولة السداد تغلق كل ملف مرتبط." },
    sources: [{ en: "Ministry of Justice — execution request and instrument requirements", ar: "وزارة العدل — طلب التنفيذ ومتطلبات السند", href: "https://www.moj.gov.sa/ar/eServices/pages/1c719954-3463-4754-85e1-1b319b937b86.aspx" }],
  },
  {
    region: "sa", service: "tax-zakat", id: "sa-company-income-tax-registration", reviewedAt: "2026-09-11", problems: ["corporate-tax-registration-and-filing-problem"],
    en: { q: "Is Saudi commercial registration the last step in income-tax registration?", a: "No. ZATCA’s service explains that a taxpayer identifier is created after commercial registration and the taxpayer completes registration requirements through its portal. Check legal form, ownership, residence and the relevant tax category before selecting the filing. Registration, submitting the return and paying the liability are separate tasks. Preserve portal acknowledgements and resolve the specific error without assuming that a commercial record proves all tax obligations are complete." },
    ar: { q: "هل ينتهي التسجيل في ضريبة الدخل السعودية بإصدار السجل التجاري؟", a: "لا. توضح خدمة الهيئة إنشاء رقم مميز بعد التسجيل التجاري واستكمال المكلف متطلبات التسجيل في البوابة. افحص الشكل والملكية والإقامة والفئة الضريبية قبل اختيار الإقرار. التسجيل وتقديم الإقرار والسداد مهام منفصلة. احفظ إشعارات البوابة وعالج الخطأ المحدد دون اعتبار السجل دليلاً على استكمال كل الالتزامات الضريبية." },
    sources: [{ en: "ZATCA — income-tax registration", ar: "الهيئة — التسجيل في ضريبة الدخل", href: "https://www.zatca.gov.sa/ar/eServices/Pages/eServices-029.aspx" }],
  },
  {
    region: "sa", service: "insurance-law", id: "sa-traffic-report-evidence", reviewedAt: "2026-09-11", problems: ["traffic-report-and-fault-dispute"],
    en: { q: "What should a Saudi accident-report objection identify?", a: "Identify the contested finding, your proposed correction and supporting scene, vehicle or witness evidence. Published insurance-committee decisions show the report being examined alongside the claim evidence; an insurer’s disagreement is not a replacement report. Obtain the complete report and ask its issuing body for the current review process. Preserve the insurance claim separately, and avoid assuming that an objection automatically changes the recorded percentage or pauses another deadline." },
    ar: { q: "ما الذي ينبغي أن يحدده الاعتراض على تقرير حادث سعودي؟", a: "حدد النتيجة المعترض عليها والتصحيح المطلوب وأدلة الموقع أو المركبات أو الشهود. تظهر قرارات اللجان المنشورة فحص التقرير مع أدلة المطالبة؛ ولا يحل خلاف الشركة محل تقرير مصحح. احصل على التقرير الكامل واسأل مصدره عن إجراء المراجعة الحالي. احفظ المطالبة التأمينية مستقلة ولا تفترض أن الاعتراض يعدل النسبة أو يوقف ميعاداً آخر تلقائياً." },
    sources: [{ en: "Insurance Dispute Committees — published motor decision 1436/152 (case-specific)", ar: "لجان التأمين — قرار مركبات منشور 1436/152، خاص بوقائعه", href: "https://idc.gov.sa/en-us/CommitteesDecisions/Dammam/General%20Insurance/Motor%20Insurance/Liability/1436%20H/1436-152.pdf" }],
  },
  {
    region: "sa", service: "insurance-law", id: "sa-accident-compensation-basis", reviewedAt: "2026-09-11", problems: ["uninsured-accident-compensation-claim", "personal-injury-compensation-after-an-accident"],
    en: { q: "How should a Saudi accident claim be assessed when cover is missing or injury is involved?", a: "Separate the person responsible for the harm from any insurer that may cover it. The Civil Transactions Law provides the civil-liability framework; an absence of cover does not itself calculate liability or compensation. Collect the accident findings, medical record, expenses and evidence linking the claimed loss to the event. Identify the defendant, any applicable policy and the correct claim route without assuming that every head of loss or requested amount is recoverable." },
    ar: { q: "كيف تراجع مطالبة الحادث السعودي عند غياب التأمين أو وجود إصابة؟", a: "افصل المسؤول عن الضرر عن الشركة التي قد تغطيه. يوفر نظام المعاملات المدنية إطار المسؤولية، ولا يحسم غياب التغطية المسؤولية أو مقدار التعويض. اجمع نتائج الحادث والسجل الطبي والنفقات ودليل ارتباط الخسارة به. حدد المدعى عليه والوثيقة إن وجدت والمسار الصحيح دون افتراض استحقاق كل بند ضرر أو مبلغ مطلوب." },
    sources: [{ en: "Official Gazette — Civil Transactions Law, civil liability", ar: "أم القرى — نظام المعاملات المدنية والمسؤولية عن الضرر", href: "https://www.uqn.gov.sa/details?p=23125" }],
  },
  {
    region: "uae", service: "enforcement-debt-recovery", id: "uae-assets-and-attachment", reviewedAt: "2026-09-11", problems: ["asset-tracing-and-debtor-investigation", "service-suspension-and-asset-freezing-request"],
    en: { q: "Does identifying a UAE debtor’s assets permit an immediate freeze?", a: "No. Article 247 of the federal Civil Procedure Code sets conditions for prejudgment attachment, including specified risks to recovery. Asset information must be obtained lawfully, and attachment requires the competent procedure. Identify ownership, location, the debt and evidence of risk. Do not import a general Saudi-style ‘service suspension’ request: specify the UAE measure sought and distinguish it from execution after judgment, travel restriction or a private payment demand." },
    ar: { q: "هل يجيز تحديد أموال المدين الإماراتي تجميدها فوراً؟", a: "لا. تضع المادة 247 من قانون الإجراءات المدنية الاتحادي شروط الحجز التحفظي ومنها مخاطر محددة على الاستيفاء. تجمع معلومات الأموال بصورة مشروعة ويتطلب الحجز الإجراء المختص. حدد الملكية والموقع والدين ودليل الخطر. ولا تنقل طلب «إيقاف خدمات» سعودياً عاماً؛ سم التدبير الإماراتي وميزه عن تنفيذ الحكم أو منع السفر أو المطالبة الخاصة." },
    sources: [{ en: "UAE Legislation — Civil Procedure Code, Article 247", ar: "تشريعات الإمارات — قانون الإجراءات المدنية، المادة 247", href: "https://uaelegislation.gov.ae/en/legislations/1602/download" }],
  },
  {
    region: "uae", service: "administrative-regulatory", id: "uae-licence-issuing-authority", reviewedAt: "2026-09-11", problems: ["licence-refusal-or-cancellation"],
    en: { q: "Which UAE authority’s decision must a licence challenge address?", a: "Identify the emirate, mainland or free-zone authority, activity and any sector regulator. Official licensing guidance distinguishes the business licence from additional activity approvals. Obtain the actual refusal or cancellation, reasons, notice and application record; a missing sector approval may require a different response from a registry rejection. Check that authority’s review route and applicable deadline rather than assuming a single federal licence-appeal procedure." },
    ar: { q: "قرار أي جهة إماراتية يجب أن يستهدفه اعتراض الترخيص؟", a: "حدد الإمارة وجهة البر الرئيسي أو المنطقة الحرة والنشاط والجهة القطاعية إن وجدت. تميز إرشادات الترخيص الرسمية الرخصة عن الموافقات الإضافية للنشاط. احصل على الرفض أو الإلغاء وأسبابه وتبليغه وملف الطلب؛ فقد يختلف علاج نقص الموافقة القطاعية عن رفض التسجيل. راجع طريق المراجعة وميعاده لدى الجهة دون افتراض إجراء اتحادي موحد." },
    sources: [{ en: "Jafza — licence types and additional regulatory approvals", ar: "جافزا — أنواع التراخيص والموافقات التنظيمية الإضافية", href: "https://www.jafza.ae/business-setup/business-license/" }],
  },
  {
    region: "uae", service: "insurance", id: "uae-traffic-report-correction", reviewedAt: "2026-09-11", problems: ["traffic-report-and-fault-dispute"],
    en: { q: "Is obtaining another copy of a UAE accident report the same as challenging fault?", a: "No. Dubai Government lists accident-report reissue among its police services. To dispute its findings, identify the issuing emirate and body, report number, exact alleged error and supporting evidence, then confirm the available correction or objection channel with that body. Keep the report dispute separate from the insurer’s coverage or valuation decision. Do not assume a duplicate report changes fault or that one emirate’s procedure applies throughout the UAE." },
    ar: { q: "هل استخراج نسخة أخرى من تقرير حادث إماراتي هو الاعتراض على المسؤولية؟", a: "لا. تدرج حكومة دبي إعادة إصدار تقرير الحادث ضمن خدمات الشرطة. وللاعتراض على النتيجة حدد الإمارة والجهة المصدرة ورقم التقرير والخطأ المدعى به ودليله، ثم تحقق لديها من قناة التصحيح أو الاعتراض. افصل نزاع التقرير عن قرار التغطية أو التقدير لدى الشركة. ولا تفترض أن النسخة الجديدة تغير المسؤولية أو أن إجراء إمارة يسري في كل الدولة." },
    sources: [{ en: "Dubai Government — accident reporting and report reissue", ar: "حكومة دبي — الإبلاغ عن الحوادث وإعادة إصدار التقارير", href: "https://www.dubai.ae/driving-transportation" }],
  },
  {
    region: "syr", service: "employment-law", id: "syr-disciplinary-defence", reviewedAt: "2026-09-11",
    problems: ["workplace-and-disciplinary-disputes", "disciplinary-warning-and-workplace-investigation"],
    en: { q: "Can a Syrian employer impose a disciplinary penalty without hearing the worker?", a: "The published Labor Law 17/2010 requires an opportunity to defend against a disciplinary allegation and ties penalties to the approved penalty list. Obtain the allegation, investigation record, workplace rules and notified decision. A disagreement about performance is not enough to establish that the selected penalty and procedure were lawful. Check the applicable employment regime and amendments before challenging the decision." },
    ar: { q: "هل يجوز لصاحب العمل السوري فرض جزاء تأديبي دون سماع دفاع العامل؟", a: "يشترط قانون العمل 17 لعام 2010 المنشور إتاحة الدفاع عن المخالفة التأديبية ويربط الجزاءات بلائحة العقوبات المعتمدة. اجمع الاتهام ومحضر التحقيق ونظام العمل والقرار المبلغ. فلا يكفي الخلاف حول الأداء لإثبات مشروعية الجزاء والإجراء المتبع. تحقق من نظام العمل المنطبق وتعديلاته قبل الاعتراض." },
    sources: [{ en: "WIPO Lex — Labor Law 17/2010, Articles 97–104", ar: "ويبو لكس — قانون العمل 17 لعام 2010، المواد 97–104", href: "https://www.wipo.int/wipolex/en/text/446166" }],
  },
  {
    region: "syr", service: "employment-law", id: "syr-service-certificate-content", reviewedAt: "2026-09-11",
    problems: ["experience-certificate-and-service-transfer-dispute"],
    en: { q: "What should a Syrian employment certificate establish?", a: "The published Labor Law requires an end-of-service certificate recording commencement, termination and position, with additional truthful information at the worker’s request. Compare the certificate with payroll and contract records. Issuing this document is separate from approving a new employer, clearing a disputed debt or transferring social-insurance records; specify which record actually needs correction." },
    ar: { q: "ما الذي ينبغي أن تثبته شهادة العمل السورية؟", a: "يلزم قانون العمل المنشور بإعطاء شهادة نهاية خدمة تبين بدء العمل وانتهاءه ونوعه، مع إضافة البيانات الصحيحة التي يطلبها العامل. قارن الشهادة بالعقد وسجلات الأجور. وإصدارها يختلف عن الموافقة على صاحب عمل جديد أو إبراء دين متنازع عليه أو نقل قيود التأمينات؛ فحدد السجل المطلوب تصحيحه." },
    sources: [{ en: "WIPO Lex — Labor Law, employer duties and service certificates", ar: "ويبو لكس — قانون العمل، التزامات صاحب العمل وشهادة الخدمة", href: "https://www.wipo.int/wipolex/en/text/446166" }],
  },
  {
    region: "sa", service: "banking-finance", id: "sa-freeze-reason-before-lifting", reviewedAt: "2026-09-11",
    problems: ["frozen-bank-account-and-lifting-request"],
    en: { q: "Will updating my identity document lift every Saudi bank-account freeze?", a: "No. SAMA’s account rules address freezes caused by expired identification or missing customer updates. Ask the bank to identify the actual reason and required correction. An administrative document update should not be assumed to discharge a separate judicial attachment. Keep the bank’s response, current identity documents and any execution reference so the request goes to the body responsible for the restriction." },
    ar: { q: "هل يرفع تحديث الهوية كل تجميد لحساب مصرفي سعودي؟", a: "لا. تعالج قواعد الحسابات لدى البنك المركزي التجميد الناشئ عن انتهاء الهوية أو عدم تحديث بيانات العميل. اطلب من المصرف تحديد السبب والتصحيح المطلوب. ولا يفترض أن يزيل تحديث إداري حجزاً قضائياً مستقلاً. احفظ رد المصرف والهوية السارية ومرجع التنفيذ إن وجد لتوجيه الطلب إلى الجهة المسؤولة عن القيد." },
    sources: [{ en: "SAMA — account freezing", ar: "البنك المركزي السعودي — تجميد الحساب", href: "https://rulebook.sama.gov.sa/ar/تجميد-الحساب" }],
  },
  {
    region: "sa", service: "tax-zakat", id: "sa-penalty-specific-objection", reviewedAt: "2026-09-11",
    problems: ["tax-penalties-and-disputes"],
    en: { q: "How should a Saudi tax penalty be separated from the underlying assessment?", a: "ZATCA provides a dedicated VAT-penalty objection service. Identify the tax, penalty decision and alleged failure before selecting it; it is not a universal objection form for every levy. Supply filing receipts, payment dates and the penalty notice, and explain the disputed factual or legal basis. Check whether the assessment also needs its own objection and preserve each applicable deadline." },
    ar: { q: "كيف يفصل الاعتراض على الجزاء الضريبي السعودي عن أصل الربط؟", a: "توفر الهيئة خدمة مخصصة للاعتراض على غرامات القيمة المضافة. حدد الضريبة وقرار الغرامة والمخالفة قبل اختيارها؛ فهي ليست نموذجاً موحداً لكل رسم. قدم إيصالات الإقرار والسداد وإشعار الغرامة وبيّن الأساس الواقعي أو النظامي المعترض عليه. وتحقق هل يحتاج الربط نفسه إلى اعتراض مستقل مع حفظ ميعاد كل إجراء." },
    sources: [{ en: "ZATCA — VAT penalty objection", ar: "الهيئة — الاعتراض على غرامات القيمة المضافة", href: "https://zatca.gov.sa/ar/eServices/Pages/eservices-021.aspx" }],
  },
  {
    region: "sa", service: "tax-zakat", id: "sa-certificate-versus-tax-clearance", reviewedAt: "2026-09-11",
    problems: ["tax-certificate-and-clearance-problem"],
    en: { q: "Which Saudi certificate do I need for a clearance problem?", a: "ZATCA distinguishes requesting a zakat or tax certificate from verifying an existing certificate. Identify the requesting body, taxpayer number, certificate type and rejection message. A valid registration record does not answer whether the requested clearance conditions are met. Reconcile outstanding returns and payments with the account and ask for the specific reason preventing issuance rather than repeatedly submitting the same request." },
    ar: { q: "ما الشهادة اللازمة لمعالجة مشكلة المخالصة السعودية؟", a: "تميز الهيئة بين طلب شهادة الزكاة أو الضريبة والتحقق من شهادة قائمة. حدد الجهة الطالبة والرقم الضريبي ونوع الشهادة ورسالة الرفض. فصحة التسجيل لا تحسم استيفاء شروط المخالصة المطلوبة. طابق الإقرارات والمدفوعات المعلقة مع الحساب واطلب تحديد سبب تعذر الإصدار بدلاً من تكرار الطلب ذاته." },
    sources: [{ en: "ZATCA — request a zakat or tax certificate", ar: "الهيئة — طلب شهادة الزكاة أو الضريبة", href: "https://zatca.gov.sa/ar/eServices/Pages/eServices-076.aspx" }],
  },
  {
    region: "uae", service: "banking-finance", id: "uae-personal-credit-security-scope", reviewedAt: "2026-09-11",
    problems: ["personal-guarantee-enforcement"],
    en: { q: "Does a signed personal guarantee settle every UAE bank-enforcement question?", a: "No. Article 150 of Federal Decree-Law 6/2025 imposes adequate-guarantee requirements on licensed institutions for facilities to natural persons and sole proprietorships, with consequences for admissibility where the requirements are not met. Identify the borrower’s legal form, facility date, security and claimant before assessing that provision. It does not automatically cancel every personal guarantee or apply to every corporate borrowing arrangement." },
    ar: { q: "هل تحسم الكفالة الشخصية الموقعة كل مسائل التنفيذ المصرفي الإماراتي؟", a: "لا. تفرض المادة 150 من المرسوم بقانون اتحادي 6 لعام 2025 متطلبات ضمانات كافية على المنشآت المرخصة لتسهيلات الأشخاص الطبيعيين والمؤسسات الفردية، مع أثر على قبول المطالبة عند عدم استيفائها. حدد شكل المقترض وتاريخ التسهيل والضمانات والمدعي قبل تقييم النص. ولا يلغي ذلك كل كفالة شخصية تلقائياً ولا ينطبق على كل اقتراض للشركات." },
    sources: [{ en: "CBUAE — Article 150, Credit Facilities Guarantees (in force)", ar: "المصرف المركزي الإماراتي — المادة 150، ضمانات التسهيلات الائتمانية النافذة", href: "https://rulebook.centralbank.ae/en/rulebook/article-150-credit-facilities-guarantees" }],
  },
];
