import type { MatterSourceGuidance } from "./matter-source-guidance";

/** Narrow additions: the linked source supports the stated answer, not all law on the topic. */
export const PROBLEM_GAP_GUIDANCE: MatterSourceGuidance[] = [
  {
    region: "uae", service: "enforcement-debt-recovery", problems: ["travel-ban-application-for-debt-recovery"],
    id: "uae-debt-travel-ban-conditions", reviewedAt: "2026-09-11",
    en: { q: "Does an unpaid UAE debt automatically justify a travel ban?", a: "No. Article 324 of the federal Civil Procedure Law requires a judicial application and serious grounds to fear the debtor's departure, with further conditions concerning the debt. The stated monetary threshold has exceptions, including specified maintenance and employment-related obligations. Identify the debt, evidence of risk and competent court; a payment demand or consultation does not itself restrict travel. Review the complete current provision before applying its threshold or exceptions." },
    ar: { q: "هل يبرر الدين غير المسدد في الإمارات منع السفر تلقائياً؟", a: "لا. تتطلب المادة 324 من قانون الإجراءات المدنية الاتحادي طلباً قضائياً وأسباباً جدية يخشى معها فرار المدين، مع شروط أخرى تخص الدين. وللحد المالي المذكور استثناءات، منها التزامات نفقة وعمل محددة. حدد الدين ودليل الخشية والمحكمة المختصة؛ فالمطالبة بالسداد أو الاستشارة لا تقيد السفر بذاتها. راجع النص النافذ كاملاً قبل تطبيق الحد أو الاستثناء." },
    sources: [{ en: "UAE Legislation — Civil Procedure Law, Article 324", ar: "تشريعات الإمارات — قانون الإجراءات المدنية، المادة 324", href: "https://uaelegislation.gov.ae/ar/legislations/1602/download" }],
  },
  {
    region: "sa", service: "tax-zakat", problems: ["vat-invoice-and-tax-correction-dispute"],
    id: "sa-vat-return-correction-distinction", reviewedAt: "2026-09-11",
    en: { q: "Is correcting a Saudi VAT return the same as resolving an invoice dispute?", a: "No. ZATCA provides a service to amend a previously submitted VAT return. That changes a tax filing; it does not itself establish whether the customer owes a disputed invoice. Identify the reporting period, original return, reason for correction and underlying transaction documents. Review invoice adjustments and any assessment or penalty separately, using the applicable VAT rules." },
    ar: { q: "هل تعديل إقرار القيمة المضافة السعودي يحسم نزاع الفاتورة؟", a: "لا. توفر الهيئة خدمة تعديل إقرار ضريبة القيمة المضافة المقدم سابقاً. ويخص ذلك الملف الضريبي، ولا يثبت بذاته التزام العميل بسداد فاتورة متنازع عليها. حدد الفترة والإقرار الأصلي وسبب التصحيح ومستندات المعاملة. وراجع تعديل الفاتورة وأي ربط أو جزاء بصورة مستقلة وفق قواعد القيمة المضافة المنطبقة." },
    sources: [{ en: "ZATCA — amend a VAT return", ar: "هيئة الزكاة والضريبة والجمارك — تعديل إقرار القيمة المضافة", href: "https://zatca.gov.sa/ar/eServices/Pages/eservices-078.aspx" }],
  },
  {
    region: "syr", service: "employment-law", problems: ["wrongful-termination", "resignation-because-of-unpaid-wages"],
    id: "syr-termination-versus-worker-exit", reviewedAt: "2026-09-11",
    en: { q: "Should dismissal and resignation over an employer's breach be assessed in the same way?", a: "No. The published Syrian Labor Law distinguishes employer termination from the worker leaving for specified employer breaches. Establish that the employment is covered by the law, then document who ended it, the reasons, notice and evidence of unpaid obligations. An allegation of breach does not itself prove a right to compensation. Read the operative rules and amendments against the actual contract and end date before choosing the claim." },
    ar: { q: "هل يراجع التسريح وترك العامل للعمل بسبب إخلال صاحب العمل بالطريقة نفسها؟", a: "لا. يميز قانون العمل السوري المنشور بين إنهاء صاحب العمل وترك العامل للعمل لأسباب محددة تتعلق بإخلال صاحب العمل. تحقق أولاً من خضوع العلاقة للقانون، ثم وثق من أنهاها والأسباب والإخطار ودليل الالتزامات غير المسددة. ولا يثبت ادعاء الإخلال وحده استحقاق التعويض. راجع الأحكام النافذة وتعديلاتها مع العقد وتاريخ الانتهاء قبل اختيار المطالبة." },
    sources: [{ en: "WIPO Lex — published Syrian Labor Law 17/2010, termination provisions", ar: "ويبو لكس — قانون العمل السوري 17 لعام 2010 المنشور، أحكام إنهاء العلاقة", href: "https://www.wipo.int/wipolex/en/text/446166" }],
  },
  {
    region: "syr", service: "companies-law", problems: ["shareholder-and-partner-disputes", "corporate-governance", "director-and-manager-liability", "mergers-dissolution-and-liquidation", "shareholder-exit-and-buyout-dispute", "company-dissolution-and-liquidation-dispute", "partner-withdrawal-and-liquidation-dispute"],
    id: "syr-company-form-before-partner-remedy", reviewedAt: "2026-09-11",
    en: { q: "Why must the Syrian company’s legal form be identified before assessing partner rights?", a: "The official explanation of Companies Law 29/2011 distinguishes company forms and their management arrangements. Do not treat a partner in a partnership as interchangeable with an LLC member or joint-stock shareholder. Obtain the commercial record, constitutional documents, ownership evidence and challenged resolution. The explanation identifies the framework; it does not establish an individual exit price, manager liability or entitlement to dissolve the company." },
    ar: { q: "لماذا يجب تحديد شكل الشركة السورية قبل تقييم حقوق الشركاء؟", a: "يميز الشرح الرسمي لقانون الشركات 29 لعام 2011 بين أشكال الشركات وترتيبات إدارتها. فلا تعامل شريك شركة الأشخاص معاملة صاحب حصة في شركة محدودة المسؤولية أو مساهم في شركة مساهمة. اجمع السجل ووثائق التأسيس وإثبات الملكية والقرار المعترض عليه. يحدد الشرح الإطار، ولا يثبت بذاته سعر التخارج أو مسؤولية المدير أو حق حل الشركة." },
    sources: [{ en: "SANA — company forms under Companies Law 29/2011", ar: "سانا — أشكال الشركات وفق قانون الشركات 29 لعام 2011", href: "https://sana.sy/economy/2223713/" }],
  },
{
  "region": "sa",
  "service": "banking-finance",
  "problems": [
    "credit-report-and-banking-record-dispute"
  ],
  "id": "sa-credit-record-dispute-right",
  "reviewedAt": "2026-09-11",
  "en": {
    "q": "Can inaccurate Saudi credit information be challenged?",
    "a": "The Credit Information Implementing Regulations provide a right to challenge information that is inaccurate, outdated or incomplete, and information retained beyond its lawful period. Identify the disputed entry, reporting provider and supporting payment or correction evidence. A challenge to the record is distinct from proving that the underlying debt has been discharged; preserve the complaint reference and the provider’s response."
  },
  "ar": {
    "q": "هل يمكن الاعتراض على معلومات ائتمانية سعودية غير صحيحة؟",
    "a": "تقرر اللائحة التنفيذية لنظام المعلومات الائتمانية حق الاعتراض على البيانات غير الصحيحة أو غير المحدثة أو غير المكتملة أو التي تجاوزت مدة حفظها النظامية. حدد القيد والجهة المبلغة وإثبات السداد أو التصحيح. ويختلف الاعتراض على السجل عن إثبات انقضاء أصل الدين؛ فاحفظ مرجع الشكوى ورد الجهة."
  },
  "sources": [
    {
      "en": "SAMA — Credit Information Implementing Regulations",
      "ar": "البنك المركزي — اللائحة التنفيذية لنظام المعلومات الائتمانية",
      "href": "https://rulebook.sama.gov.sa/ar/اللائحة-التنفيذية-لنظام-المعلومات-الائتمانية"
    }
  ]
},
{
  "region": "sa",
  "service": "banking-finance",
  "problems": [
    "guarantees-and-security-enforcement",
    "personal-guarantee-enforcement"
  ],
  "id": "sa-guarantee-security-sequence",
  "reviewedAt": "2026-09-11",
  "en": {
    "q": "Does a Saudi guarantee always permit immediate execution against the guarantor?",
    "a": "The Civil Transactions Law distinguishes the guarantor’s position and the effect of existing security. It provides a protection concerning prior execution against secured assets where the debt was secured before or with the guarantee and the guarantor is not jointly liable. Read the guarantee, solidarity terms, security and enforcement papers before applying that rule. The label “guarantor” alone does not settle the sequence or scope of recovery."
  },
  "ar": {
    "q": "هل تتيح الكفالة السعودية التنفيذ على الكفيل فوراً في كل حالة؟",
    "a": "يميز نظام المعاملات المدنية مركز الكفيل وأثر التأمين العيني القائم. ويقرر حماية تتعلق بسبق التنفيذ على المال الموثق للدين عندما يكون الضمان سابقاً للكفالة أو مقارناً لها ولا يكون الكفيل متضامناً. راجع الكفالة وشروط التضامن والتأمين وأوراق التنفيذ قبل تطبيق الحكم؛ فوصف الشخص بالكفيل وحده لا يحسم ترتيب الاستيفاء أو نطاقه."
  },
  "sources": [
    {
      "en": "Official Gazette — Civil Transactions Law, guarantee and security",
      "ar": "أم القرى — نظام المعاملات المدنية، الكفالة والضمان العيني",
      "href": "https://www.uqn.gov.sa/details?p=23125"
    }
  ]
},
{
  "region": "sa",
  "service": "tax-zakat",
  "problems": [
    "tax-and-zakat-assessments",
    "objections-and-appeals",
    "tax-audit-and-assessment-objection"
  ],
  "id": "sa-zakat-assessment-objection-route",
  "reviewedAt": "2026-09-11",
  "en": {
    "q": "Is a Saudi zakat reassessment challenge the same as correcting the original filing?",
    "a": "ZATCA provides a specific objection service for a reassessed zakat return. Identify the challenged assessment, period, reasons and notice date, and distinguish it from correcting your own filing. The correct objection and any later committee route depend on the decision and applicable rules; submitting general correspondence should not be assumed to preserve the formal objection period."
  },
  "ar": {
    "q": "هل الاعتراض على إعادة ربط الزكاة هو نفسه تصحيح الإقرار؟",
    "a": "توفر الهيئة خدمة محددة للاعتراض على الإقرار الزكوي المعاد تقييمه. حدد الربط والفترة والأسباب وتاريخ الإشعار، وميزه عن تصحيح إقرارك. ويتوقف الاعتراض والمسار اللاحق أمام اللجان على القرار والقواعد المنطبقة؛ فلا يفترض أن المراسلات العامة تحفظ ميعاد الاعتراض الرسمي."
  },
  "sources": [
    {
      "en": "ZATCA — objection to zakat reassessment",
      "ar": "الهيئة — الاعتراض على إعادة تقييم الزكاة",
      "href": "https://zatca.gov.sa/ar/eServices/Pages/eServices-071.aspx"
    }
  ]
},
{
  "region": "sa",
  "service": "tax-zakat",
  "problems": [
    "customs-penalty-challenge"
  ],
  "id": "sa-customs-objection-scope",
  "reviewedAt": "2026-09-11",
  "en": {
    "q": "Which decision should be identified before challenging a Saudi customs charge?",
    "a": "ZATCA lists an objection service for collection decisions, fines and rejected refund requests. Identify which of those decisions you received and keep the customs declaration, valuation or classification evidence and notice. A request to correct shipment data is not necessarily an objection to the penalty itself; check the designated procedure and time limit for the actual decision."
  },
  "ar": {
    "q": "ما القرار الذي يجب تحديده قبل الاعتراض على مطالبة جمركية سعودية؟",
    "a": "تدرج الهيئة خدمة اعتراض على قرارات التحصيل والتغريم وطلبات الاسترداد المرفوضة. حدد القرار المستلم واحفظ البيان الجمركي وأدلة القيمة أو التصنيف والإشعار. ولا يعد طلب تصحيح بيانات الشحنة بالضرورة اعتراضاً على الغرامة نفسها؛ فتحقق من الإجراء والميعاد الخاصين بالقرار الفعلي."
  },
  "sources": [
    {
      "en": "ZATCA — customs electronic services",
      "ar": "الهيئة — الخدمات الجمركية الإلكترونية",
      "href": "https://eservices.zatca.gov.sa/sites/sc/ar/Pages/Pages/ListEServiceLinks.aspx"
    }
  ]
},
{
  "region": "sa",
  "service": "insurance-law",
  "problems": [
    "insurer-and-broker-disputes"
  ],
  "id": "sa-insurance-complaint-versus-case",
  "reviewedAt": "2026-09-11",
  "en": {
    "q": "Does an insurance complaint replace a Saudi insurance-dispute case?",
    "a": "The Insurance Authority distinguishes customer complaints from disputes within the jurisdiction of the insurance dispute committees. Identify whether you need the insurer or broker to respond, or require a determination of contested rights. Preserve the policy, intermediary mandate, correspondence and complaint outcome. Use the official committee channel when the matter requires that procedure rather than assuming a customer-service complaint is a filed case."
  },
  "ar": {
    "q": "هل تحل شكوى التأمين محل الدعوى التأمينية السعودية؟",
    "a": "تميز هيئة التأمين شكاوى العملاء عن المنازعات الداخلة في اختصاص لجان الفصل. حدد هل المطلوب رد الشركة أو الوسيط أم الفصل في حقوق متنازع عليها. احفظ الوثيقة وتكليف الوسيط والمراسلات ونتيجة الشكوى. واستخدم قناة اللجان الرسمية إذا اقتضت المسألة ذلك الإجراء، دون اعتبار شكوى خدمة العملاء دعوى مقيدة."
  },
  "sources": [
    {
      "en": "Insurance Authority — complaints and dispute-committee channels",
      "ar": "هيئة التأمين — قنوات الشكاوى ولجان المنازعات",
      "href": "https://www.ia.gov.sa/ar/faqs"
    }
  ]
},
];
