import type { MatterSourceGuidance } from "./matter-source-guidance.js";

// Scoped primary-source answers; no page is certified as covering every intent.
export const UAE_CORPORATE_CONTRACTS_SEARCH_GUIDANCE: MatterSourceGuidance[] = [
  {
    "region": "uae",
    "service": "corporate-commercial",
    "problems": [
      "company-formation-and-registration-problem"
    ],
    "id": "uae-mainland-initial-approval",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Does UAE mainland initial approval let my company start trading?",
      "a": "No. Initial approval allows the establishment process to continue; it is not permission to practise the activity. Complete the relevant licensing steps and any sector approvals. Identify the issuing authority, legal form and activity; a mainland application and a free-zone application have different procedures."
    },
    "ar": {
      "q": "هل تسمح الموافقة المبدئية في البر الرئيسي الإماراتي ببدء النشاط؟",
      "a": "لا. تسمح الموافقة المبدئية باستكمال إجراءات التأسيس ولا تجيز ممارسة النشاط. استكمل الترخيص والموافقات القطاعية اللازمة، وحدّد الجهة المصدرة والشكل القانوني والنشاط؛ فإجراءات البر الرئيسي تختلف عن إجراءات المنطقة الحرة."
    },
    "sources": [
      {
        "en": "UAE Government — mainland establishment and initial approval",
        "ar": "حكومة الإمارات — التأسيس في البر الرئيسي والموافقة المبدئية",
        "href": "https://u.ae/en/information-and-services/business/doing-business-on-the-mainland/steps-to-start-a-business-on-the-mainland"
      }
    ],
    "includeOnServicePage": true
  },
  {
    "region": "uae",
    "service": "corporate-commercial",
    "problems": [
      "director-and-manager-liability"
    ],
    "id": "uae-llc-manager-liability",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Can an LLC manager be personally liable despite limited liability?",
      "a": "Yes. Federal Companies Law Article 84 addresses fraud, misuse of powers, legal or constitutional breaches and gross error by LLC managers. Identify the alleged act and loss. Different company forms and free-zone regimes require separate analysis."
    },
    "ar": {
      "q": "هل يمكن مساءلة مدير الشركة ذات المسؤولية المحدودة شخصياً؟",
      "a": "نعم. تتناول المادة 84 من قانون الشركات الاتحادي الغش وإساءة استعمال الصلاحية ومخالفة القانون أو وثائق الشركة والخطأ الجسيم لمديرها. حدّد الفعل والضرر؛ وتُراجع الأشكال الأخرى وأنظمة المناطق الحرة بصورة مستقلة."
    },
    "sources": [
      {
        "en": "UAE Legislation — Commercial Companies Law, Article 84",
        "ar": "تشريعات الإمارات — قانون الشركات التجارية، المادة 84",
        "href": "https://uaelegislation.gov.ae/en/legislations/1542"
      }
    ]
  },
  {
    "region": "uae",
    "service": "corporate-commercial",
    "problems": [
      "company-dissolution-and-liquidation-dispute"
    ],
    "id": "uae-dissolution-creditor-priority",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Can shareholders divide company capital immediately after dissolution?",
      "a": "Under Federal Companies Law Article 312, capital is not distributed to partners or shareholders before company debts are paid. Dissolution and liquidation are distinct stages. Confirm the company regime and outstanding liabilities before any distribution."
    },
    "ar": {
      "q": "هل يوزع رأس المال على الشركاء فور حل الشركة؟",
      "a": "وفق المادة 312 من قانون الشركات الاتحادي، لا يستحق الشركاء أو المساهمون نصيباً من رأس المال قبل سداد ديون الشركة. الحل والتصفية مرحلتان مختلفتان؛ تحقّق من نظام الشركة والتزاماتها قبل التوزيع."
    },
    "sources": [
      {
        "en": "UAE Legislation — Commercial Companies Law, Article 312",
        "ar": "تشريعات الإمارات — قانون الشركات التجارية، المادة 312",
        "href": "https://uaelegislation.gov.ae/en/legislations/1542"
      }
    ]
  },
  {
    "region": "uae",
    "service": "corporate-commercial",
    "problems": [
      "shareholder-exit-and-buyout-dispute"
    ],
    "id": "uae-shareholder-exit-clauses",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Do the 2025 UAE company amendments automatically give me a buyout right?",
      "a": "No automatic buyout should be assumed. The amendments allow LLCs and private joint-stock companies to include agreed sale and participation rights in their constitutional documents. Check the actual clause, triggering conditions, approvals and company regime before demanding or resisting a transfer."
    },
    "ar": {
      "q": "هل تمنح تعديلات الشركات الإماراتية لعام 2025 حق تخارج تلقائياً؟",
      "a": "لا يُفترض حق شراء الحصة تلقائياً. تجيز التعديلات للشركات ذات المسؤولية المحدودة والمساهمة الخاصة تضمين وثائقها حقوق بيع ومشاركة متفقاً عليها. راجع الشرط والواقعة التي تفعّله والموافقات ونظام الشركة قبل طلب النقل أو رفضه."
    },
    "sources": [
      {
        "en": "Ministry of Economy and Tourism — 2025 company amendments and agreed exit rights",
        "ar": "وزارة الاقتصاد والسياحة — تعديلات الشركات لعام 2025 وحقوق التخارج الاتفاقية",
        "href": "https://www.moet.gov.ae/en/-/-%D8%A7%D9%84%D8%A7%D9%82%D8%AA%D8%B5%D8%A7%D8%AF-%D9%88%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%AD%D8%A9-%D8%AA%D8%B3%D8%AA%D8%B9%D8%B1%D8%B6-%D8%A7%D9%84%D8%AA%D8%B9%D8%AF%D9%8A%D9%84%D8%A7%D8%AA-%D8%A7%D9%84%D8%AC%D8%AF%D9%8A%D8%AF%D8%A9-%D8%B9%D9%84%D9%89-"
      }
    ]
  },
  {
    "region": "uae",
    "service": "commercial-contracts",
    "problems": [
      "consumer-refund-and-purchase-cancellation-dispute",
      "defective-product-and-consumer-compensation-claim"
    ],
    "id": "uae-consumer-defect-remedies",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Does a defective product always mean an immediate cash refund in the UAE?",
      "a": "The federal consumer framework provides repair, replacement or return with reimbursement under the applicable conditions; it is not an unrestricted refund rule for every purchase. Identify the defect, warranty and supplier response. A separate injury or property-loss claim needs its own evidence and assessment."
    },
    "ar": {
      "q": "هل يعني عيب المنتج استرداد الثمن نقداً فوراً في كل حالة بالإمارات؟",
      "a": "يقرر إطار حماية المستهلك الاتحادي الإصلاح أو الاستبدال أو الاسترجاع ورد الثمن وفق الشروط المنطبقة؛ وليس حقاً مطلقاً للاسترداد في كل شراء. حدّد العيب والضمان ورد المزود. وتحتاج مطالبة الإصابة أو تلف المال الأخرى إلى إثبات وتقييم مستقلين."
    },
    "sources": [
      {
        "en": "UAE Legislation — Consumer Protection Law, Article 12",
        "ar": "تشريعات الإمارات — قانون حماية المستهلك، المادة 12",
        "href": "https://uaelegislation.gov.ae/en/legislations/1455"
      }
    ]
  },
  {
    "region": "uae",
    "service": "commercial-contracts",
    "problems": [
      "contract-evidence-and-electronic-messages"
    ],
    "id": "uae-electronic-contract-form",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Can a contract record lose legal effect just because it is electronic?",
      "a": "Article 5 of the federal Electronic Transactions and Trust Services Law prevents rejection merely because a document is electronic. That does not prove who sent a message, their authority, agreement to the terms or every required formality. Preserve the original conversation and attachments so those separate questions can be assessed."
    },
    "ar": {
      "q": "هل يفقد السجل العقدي أثره القانوني لمجرد أنه إلكتروني؟",
      "a": "تمنع المادة 5 من قانون المعاملات الإلكترونية وخدمات الثقة الاتحادي استبعاد المستند لمجرد شكله الإلكتروني. ولا يثبت ذلك وحده هوية المرسل أو صلاحيته أو قبول الشروط أو استيفاء كل شكل مطلوب. احفظ أصل المحادثة ومرفقاتها لتقييم هذه المسائل المستقلة."
    },
    "sources": [
      {
        "en": "UAE Legislation — Electronic Transactions and Trust Services, Article 5",
        "ar": "تشريعات الإمارات — المعاملات الإلكترونية وخدمات الثقة، المادة 5",
        "href": "https://uaelegislation.gov.ae/en/legislations/1539"
      }
    ],
    "includeOnServicePage": true
  },
  {
    "region": "uae",
    "service": "commercial-contracts",
    "problems": [
      "document-attestation-and-legalisation-problem"
    ],
    "id": "uae-mofa-attestation-prerequisites",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Why might MoFA reject my document for attestation?",
      "a": "MoFA lists prior authentication by the relevant bodies and an Arabic or English document, or official translation, among its requirements. Laminated documents are not accepted. Identify the issuing country, document format and missing authentication before resubmitting; the destination authority may impose further requirements."
    },
    "ar": {
      "q": "لماذا قد ترفض وزارة الخارجية الإماراتية تصديق المستند؟",
      "a": "تشمل متطلبات الوزارة تصديق الجهات المختصة مسبقاً وتقديم المستند بالعربية أو الإنجليزية أو ترجمة رسمية، ولا تُقبل المستندات المغلفة حرارياً. حدّد دولة الإصدار وصيغة المستند والتصديق الناقص قبل إعادة التقديم؛ وقد تطلب جهة الاستخدام متطلبات إضافية."
    },
    "sources": [
      {
        "en": "MoFA — document attestation requirements",
        "ar": "وزارة الخارجية — متطلبات تصديق المستندات",
        "href": "https://www.mofa.gov.ae/en/faqs"
      }
    ]
  },
  {
    "region": "uae",
    "service": "commercial-contracts",
    "problems": [
      "power-of-attorney-drafting-and-authority-problem"
    ],
    "id": "uae-english-poa-notary",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Can a power of attorney be notarised in English in Abu Dhabi?",
      "a": "Abu Dhabi Judicial Department offers digital English-language notarisation, including powers of attorney. This is an Abu Dhabi service, not a universal rule that every receiving authority accepts any English document. Check the intended act, authority wording and recipient requirements before selecting the service."
    },
    "ar": {
      "q": "هل يمكن توثيق وكالة باللغة الإنجليزية في أبوظبي؟",
      "a": "تتيح دائرة القضاء في أبوظبي التوثيق الرقمي باللغة الإنجليزية، بما يشمل الوكالات. هذه خدمة في أبوظبي وليست قاعدة بأن كل جهة تقبل أي مستند إنجليزي. تحقّق من التصرف المقصود وحدود الصلاحية ومتطلبات الجهة المستقبلة قبل اختيار الخدمة."
    },
    "sources": [
      {
        "en": "Abu Dhabi Judicial Department — English-language notary services",
        "ar": "دائرة القضاء في أبوظبي — خدمات الكاتب العدل باللغة الإنجليزية",
        "href": "https://www.adjd.gov.ae/EN/Pages/Abu-Dhabi-English-NotARy-Services-Bureau-at-Abu-Dhabi-Judicial-Department.aspx"
      }
    ]
  },
  {
    "region": "uae",
    "service": "commercial-contracts",
    "problems": [
      "unpaid-business-invoice",
      "unpaid-professional-fees-and-service-invoice-dispute",
      "legal-notice-and-demand-letter-drafting"
    ],
    "id": "uae-invoice-payment-order",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Does every unpaid UAE invoice qualify for a payment order?",
      "a": "Under the federal Civil Procedure Law, the payment-order route requires a due right evidenced in writing, electronically or on paper, and a specified money debt or qualifying movable property. Article 144 also requires prior payment notice allowing at least five days. Check evidence, service and forum; a disputed professional-fee claim may require a different procedure."
    },
    "ar": {
      "q": "هل تصلح كل فاتورة غير مدفوعة في الإمارات لأمر أداء؟",
      "a": "يشترط مسار أمر الأداء في قانون الإجراءات المدنية الاتحادي حقاً حالّ الأداء وثابتاً كتابةً إلكترونياً أو ورقياً، وديناً نقدياً معين المقدار أو منقولاً مستوفياً للشروط. وتشترط المادة 144 تكليفاً سابقاً بالوفاء لمدة خمسة أيام على الأقل. راجع الإثبات والتبليغ والاختصاص؛ فقد تخضع الأتعاب المهنية المتنازع عليها لإجراء مختلف."
    },
    "sources": [
      {
        "en": "UAE Legislation — Civil Procedure Law, Articles 143–144",
        "ar": "تشريعات الإمارات — قانون الإجراءات المدنية، المادتان 143 و144",
        "href": "https://uaelegislation.gov.ae/en/legislations/1602"
      }
    ]
  },
  {
    "region": "uae",
    "service": "commercial-contracts",
    "problems": [
      "service-agreement-breach",
      "supply-contract-non-delivery"
    ],
    "id": "uae-civil-transactions-current-law",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Should a UAE contract dispute still rely only on the 1985 Civil Transactions Law?",
      "a": "No. Federal Decree-Law 25 of 2025 repealed the 1985 law and took effect on 1 June 2026. Assess the transaction and dispute dates, applicable special legislation and chosen law before selecting provisions. This change does not by itself establish a right to cancel a service or supply contract."
    },
    "ar": {
      "q": "هل يكفي الاعتماد على قانون المعاملات المدنية لعام 1985 في نزاع عقد إماراتي؟",
      "a": "لا. ألغى المرسوم بقانون الاتحادي 25 لسنة 2025 القانون السابق وبدأ نفاذه في 1 يونيو 2026. افحص تواريخ المعاملة والنزاع والتشريع الخاص والقانون المختار قبل تحديد النصوص المنطبقة. ولا ينشئ هذا التغيير وحده حق إلغاء عقد خدمة أو توريد."
    },
    "sources": [
      {
        "en": "UAE Legislation — 2025 Civil Transactions Law, enactment Articles 2–3",
        "ar": "تشريعات الإمارات — قانون المعاملات المدنية لعام 2025، مادتا الإصدار 2 و3",
        "href": "https://uaelegislation.gov.ae/en/legislations/4011/download"
      }
    ],
    "includeOnServicePage": true
  },
  {
    "region": "uae",
    "service": "commercial-contracts",
    "problems": [
      "defective-goods-and-non-conforming-delivery"
    ],
    "id": "uae-latent-defect-evidence",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Can a defect discovered after delivery still be a latent defect?",
      "a": "Under Article 494 of the 2025 federal Civil Transactions Law, a post-delivery defect can qualify if proved to arise from a pre-delivery cause. Preserve inspection and technical evidence. This does not determine the remedy or deadline for every commercial or consumer sale; applicable special rules and transaction dates must also be checked."
    },
    "ar": {
      "q": "هل يُعد العيب المكتشف بعد التسليم عيباً خفياً؟",
      "a": "وفق المادة 494 من قانون المعاملات المدنية الاتحادي لعام 2025، قد يُعد كذلك إذا ثبت نشوؤه عن سبب موجود قبل التسليم. احفظ أدلة الفحص والخبرة. ولا يحدد ذلك جزاء أو ميعاد كل بيع تجاري أو استهلاكي؛ إذ تُراجع القواعد الخاصة وتواريخ المعاملة أيضاً."
    },
    "sources": [
      {
        "en": "UAE Legislation — 2025 Civil Transactions Law, Article 494",
        "ar": "تشريعات الإمارات — قانون المعاملات المدنية لعام 2025، المادة 494",
        "href": "https://uaelegislation.gov.ae/en/legislations/4011/download"
      }
    ]
  },
  {
    "region": "uae",
    "service": "commercial-contracts",
    "problems": [
      "service-agreement-breach",
      "supply-contract-non-delivery"
    ],
    "id": "uae-bilateral-performance-rescission",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Can I seek performance or cancellation when a UAE supplier or service provider breaches the contract?",
      "a": "Where the 2025 federal Civil Transactions Law applies, Article 234 permits a court request for performance or rescission after notice of a due, unperformed bilateral obligation. The court may allow time to perform or refuse rescission for a minor failure; compensation requires justification. Check the contract, special rules and governing regime first."
    },
    "ar": {
      "q": "هل أطلب التنفيذ أم الفسخ عند إخلال المورد أو مقدم الخدمة في الإمارات؟",
      "a": "عند انطباق قانون المعاملات المدنية الاتحادي لعام 2025، تجيز المادة 234 طلب التنفيذ أو الفسخ قضائياً بعد إعذار المدين بالتزام حالّ لم ينفذه في عقد ملزم للجانبين. قد تمنح المحكمة مهلة أو ترفض الفسخ للإخلال قليل الأهمية، ويحتاج التعويض إلى مقتضى. راجع العقد والقواعد الخاصة والنظام المنطبق أولاً."
    },
    "sources": [
      {
        "en": "UAE Legislation — 2025 Civil Transactions Law, Article 234",
        "ar": "تشريعات الإمارات — قانون المعاملات المدنية لعام 2025، المادة 234",
        "href": "https://uaelegislation.gov.ae/en/legislations/4011/download"
      }
    ],
    "includeOnServicePage": true
  },
  {
    "region": "uae",
    "service": "commercial-contracts",
    "problems": [
      "service-agreement-breach",
      "supply-contract-non-delivery",
      "legal-notice-and-demand-letter-drafting"
    ],
    "id": "uae-automatic-rescission-notice",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Does an automatic cancellation clause remove the need to notify the other party?",
      "a": "Not by itself. Article 235 of the 2025 federal Civil Transactions Law permits agreed automatic rescission without a judgment, but notice remains required unless the parties expressly waive it. Check the exact wording, breach trigger and governing regime before treating the contract as ended."
    },
    "ar": {
      "q": "هل يعفي شرط الفسخ التلقائي من إعذار الطرف الآخر؟",
      "a": "ليس بمجرده. تجيز المادة 235 من قانون المعاملات المدنية الاتحادي لعام 2025 الاتفاق على الفسخ التلقائي دون حكم، لكنها تبقي الإعذار ما لم يتفق الطرفان صراحة على الإعفاء منه. راجع صياغة الشرط وواقعة الإخلال والنظام المنطبق قبل اعتبار العقد منتهياً."
    },
    "sources": [
      {
        "en": "UAE Legislation — 2025 Civil Transactions Law, Article 235",
        "ar": "تشريعات الإمارات — قانون المعاملات المدنية لعام 2025، المادة 235",
        "href": "https://uaelegislation.gov.ae/ar/legislations/4011/download"
      }
    ]
  },
  {
    "region": "uae",
    "service": "commercial-contracts",
    "problems": [
      "service-agreement-breach",
      "supply-contract-non-delivery"
    ],
    "id": "uae-difc-contract-termination",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "If DIFC Contract Law governs, does any missed delivery or service obligation justify termination?",
      "a": "Article 86 distinguishes fundamental non-performance from other failures. Delay can also engage the additional-performance-period procedure in Article 81. Article 87 requires termination notice, and late or defective performance must be addressed within a reasonable time to preserve the termination right. Identify the applicable DIFC law and contractual terms; this is not a rule for every UAE contract."
    },
    "ar": {
      "q": "إذا حكم قانون عقود مركز دبي المالي العالمي العقد، فهل يبرر كل إخلال إنهاءه؟",
      "a": "تميّز المادة 86 الإخلال الجوهري عن غيره. وقد يتيح التأخير مسار المهلة الإضافية للتنفيذ وفق المادة 81. وتشترط المادة 87 إخطار الإنهاء، مع مراعاة الوقت المعقول عند التنفيذ المتأخر أو المعيب لحفظ الحق. تحقّق من القانون المنطبق وشروط العقد؛ فهذه ليست قاعدة لكل عقد إماراتي."
    },
    "sources": [
      {
        "en": "DIFC — Contract Law, Articles 81 and 86–87",
        "ar": "مركز دبي المالي العالمي — قانون العقود، المواد 81 و86 و87",
        "href": "https://assets.difc.com/v1/media/edge/images/dubaiintern0078-difcexperie96c5-production-3253/media/project/difcexperiences/difc/difcwebsite/documents/difc_docs/contract_law_difc_law_no_6_of_2004-done.pdf?sc_lang=en"
      }
    ]
  },
  {
    "region": "uae",
    "service": "commercial-contracts",
    "problems": [
      "service-agreement-breach",
      "supply-contract-non-delivery",
      "contract-evidence-and-electronic-messages"
    ],
    "id": "uae-adgm-contract-law-boundary",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Should I apply federal UAE contract rules automatically to an ADGM agreement?",
      "a": "No. ADGM has its own civil and commercial framework with direct application of English common law under its Application of English Law Regulations. Identify the governing-law clause, transaction and forum before selecting remedies or evidence rules. An ADGM connection alone does not answer which law governs a particular dispute."
    },
    "ar": {
      "q": "هل أطبق قواعد العقود الاتحادية تلقائياً على اتفاق مرتبط بسوق أبوظبي العالمي؟",
      "a": "لا. لسوق أبوظبي العالمي إطار مدني وتجاري مستقل يقوم على التطبيق المباشر للقانون العام الإنجليزي وفق لوائحه. حدّد شرط القانون الواجب التطبيق والمعاملة وجهة الفصل قبل اختيار الجزاء أو قواعد الإثبات. ولا تكفي صلة المعاملة بالسوق وحدها لتحديد قانون النزاع."
    },
    "sources": [
      {
        "en": "ADGM Courts — applicable common-law framework",
        "ar": "محاكم سوق أبوظبي العالمي — إطار القانون العام المنطبق",
        "href": "https://www.adgm.com/adgm-courts/english-common-law"
      }
    ],
    "includeOnServicePage": true
  },
  {
    "region": "uae",
    "service": "corporate-commercial",
    "problems": [
      "company-formation-and-registration-problem",
      "director-and-manager-liability",
      "shareholder-exit-and-buyout-dispute",
      "company-dissolution-and-liquidation-dispute"
    ],
    "id": "uae-free-zone-company-law-boundary",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Does the Federal Companies Law govern every issue in a UAE free-zone company?",
      "a": "Article 5 preserves special free-zone company provisions for the matters they regulate. It also addresses authorised mainland branches or representative offices, which fall under the federal Companies Law. Identify the zone, entity and activity; free-zone incorporation is not a blanket exemption from other UAE legislation."
    },
    "ar": {
      "q": "هل يحكم قانون الشركات الاتحادي كل مسائل شركة المنطقة الحرة؟",
      "a": "تُبقي المادة 5 الأحكام الخاصة بالمنطقة الحرة للمسائل التي تنظمها. وتتناول أيضاً الفروع أو مكاتب التمثيل المسموح بها في البر الرئيسي والخاضعة لقانون الشركات الاتحادي. حدّد المنطقة والكيان والنشاط؛ فالتأسيس في منطقة حرة ليس إعفاءً شاملاً من التشريعات الإماراتية الأخرى."
    },
    "sources": [
      {
        "en": "UAE Legislation — Commercial Companies Law, Article 5",
        "ar": "تشريعات الإمارات — قانون الشركات التجارية، المادة 5",
        "href": "https://uaelegislation.gov.ae/en/legislations/1542/download"
      }
    ],
    "includeOnServicePage": true
  }
];
