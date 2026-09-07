import type { MatterSourceGuidance } from "./matter-source-guidance.js";

/** Scoped primary-source answers; unresolved route intents are recorded in the review ledger. */
export const SAUDI_BUSINESS_CONTRACTS_SEARCH_GUIDANCE: MatterSourceGuidance[] = [
  {
    "region": "sa",
    "service": "contracts",
    "problems": [
      "breach-of-contract",
      "service-agreement-breach",
      "supply-contract-non-delivery",
      "termination-and-cancellation"
    ],
    "id": "sa-bc-performance-rescission",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": true,
    "en": {
      "q": "Can I demand performance or end the contract after a breach?",
      "a": "Article 107 of the Civil Transactions Law allows the other party to a reciprocal contract, after notifying the defaulting party, to seek performance or rescission with compensation where justified. A court may refuse rescission for a minor unperformed part. Identify the specific obligation, default notice and remaining performance before choosing the remedy."
    },
    "ar": {
      "q": "هل أطلب التنفيذ أم فسخ العقد عند الإخلال؟",
      "a": "تجيز المادة 107 من نظام المعاملات المدنية للطرف الآخر في العقد الملزم للجانبين، بعد إعذار المتعاقد المخل، طلب التنفيذ أو الفسخ مع التعويض عند مقتضاه. وللمحكمة رفض الفسخ إذا كان الجزء غير المنفذ قليل الأهمية. حدّد الالتزام والإعذار والأداء المتبقي قبل اختيار الطلب."
    },
    "sources": [
      {
        "en": "Civil Transactions Law — obligations, remedies and agency",
        "ar": "نظام المعاملات المدنية — الالتزامات والجزاءات والوكالة",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/655fdb42-8c96-422b-b8c4-b04f0095c94c/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "business-law",
    "problems": [
      "commercial-disputes",
      "commercial-supply-contract-dispute",
      "supplier-and-customer-claims",
      "business-sale-and-purchase-dispute"
    ],
    "id": "sa-bc-business-remedy",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": true,
    "en": {
      "q": "Does one failed business obligation justify cancelling the entire deal?",
      "a": "Under Article 107 of the Civil Transactions Law, performance or rescission of a reciprocal contract may be sought after default notice; the court can refuse rescission for an insignificant unperformed portion. Match the failed shipment, payment or transfer to the agreement concerned. Special commercial rules still take priority where applicable."
    },
    "ar": {
      "q": "هل يبرر إخلال تجاري واحد فسخ الصفقة كاملة؟",
      "a": "تجيز المادة 107 من نظام المعاملات المدنية طلب تنفيذ العقد الملزم للجانبين أو فسخه بعد الإعذار، وللمحكمة رفض الفسخ لقلة أهمية الجزء غير المنفذ. اربط الشحنة أو الدفعة أو النقل المتعثر بالعقد المعني، مع أولوية الأحكام التجارية الخاصة عند انطباقها."
    },
    "sources": [
      {
        "en": "Civil Transactions Law — obligations, remedies and agency",
        "ar": "نظام المعاملات المدنية — الالتزامات والجزاءات والوكالة",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/655fdb42-8c96-422b-b8c4-b04f0095c94c/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "contracts",
    "problems": [
      "termination-and-cancellation",
      "contract-drafting-and-review",
      "legal-notice-and-demand-letter-drafting"
    ],
    "id": "sa-bc-automatic-termination",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Does an automatic termination clause remove the need for notice?",
      "a": "Article 108 permits an agreed right to rescind without a court judgment, but default notice remains required unless the parties expressly dispense with it. A clause removing the need for a judgment and a clause dispensing with notice address different requirements. Read both before treating the contract as ended."
    },
    "ar": {
      "q": "هل يغني شرط الفسخ التلقائي عن الإعذار؟",
      "a": "تجيز المادة 108 الاتفاق على الفسخ دون حكم قضائي، لكن الإعذار يبقى لازماً ما لم يتفق صراحة على الإعفاء منه. الإعفاء من الحكم والإعفاء من الإعذار مسألتان مختلفتان؛ راجع نصهما قبل اعتبار العقد مفسوخاً."
    },
    "sources": [
      {
        "en": "Civil Transactions Law — obligations, remedies and agency",
        "ar": "نظام المعاملات المدنية — الالتزامات والجزاءات والوكالة",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/655fdb42-8c96-422b-b8c4-b04f0095c94c/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "contracts",
    "problems": [
      "penalty-and-compensation-clauses",
      "contract-drafting-and-review"
    ],
    "id": "sa-bc-agreed-damages",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Is a penalty clause payable exactly as written?",
      "a": "Articles 178–179 allow agreed compensation except where the obligation is a sum of money. It is not due if the debtor proves no damage; the court may reduce an excessive amount or account for partial performance. A higher award requires the statutory basis of greater damage caused by fraud or gross fault."
    },
    "ar": {
      "q": "هل يستحق الشرط الجزائي بكامل المبلغ المكتوب؟",
      "a": "تجيز المادتان 178 و179 التعويض الاتفاقي إلا إذا كان محل الالتزام مبلغاً نقدياً. ولا يستحق إذا أثبت المدين عدم الضرر، وللمحكمة تخفيض المبلغ المبالغ فيه أو مراعاة التنفيذ الجزئي. وتتطلب الزيادة ضرراً أكبر ناشئاً عن غش أو خطأ جسيم وفق النص."
    },
    "sources": [
      {
        "en": "Civil Transactions Law — obligations, remedies and agency",
        "ar": "نظام المعاملات المدنية — الالتزامات والجزاءات والوكالة",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/655fdb42-8c96-422b-b8c4-b04f0095c94c/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "business-law",
    "problems": [
      "business-contract-risk",
      "commercial-liability"
    ],
    "id": "sa-bc-risk-damages",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Can the contract fix compensation for any business loss?",
      "a": "The Civil Transactions Law distinguishes an agreed compensation clause from a debt consisting of money: Article 178 excludes monetary obligations from that mechanism. Article 179 permits judicial adjustment in its specified cases. Review the obligation secured, actual loss and partial performance; a quoted penalty is not automatically recoverable."
    },
    "ar": {
      "q": "هل يحدد العقد التعويض عن أي خسارة تجارية؟",
      "a": "يميز نظام المعاملات المدنية التعويض الاتفاقي عن الالتزام النقدي؛ فتستثني المادة 178 المبالغ النقدية من هذه الآلية، وتجيز المادة 179 تعديل التعويض قضائياً في حالات محددة. افحص الالتزام المقصود والضرر والتنفيذ الجزئي؛ ولا يفترض تحصيل كل مبلغ مسمى جزاءً."
    },
    "sources": [
      {
        "en": "Civil Transactions Law — obligations, remedies and agency",
        "ar": "نظام المعاملات المدنية — الالتزامات والجزاءات والوكالة",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/655fdb42-8c96-422b-b8c4-b04f0095c94c/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "business-law",
    "problems": [
      "unpaid-business-invoices",
      "commercial-disputes",
      "supplier-and-customer-claims"
    ],
    "id": "sa-bc-payment-order-business",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": true,
    "en": {
      "q": "When can an unpaid commercial debt use a payment order?",
      "a": "Articles 67–68 of the Commercial Courts Law require a written, due debt with a specified amount or identified movable property. The creditor must demand payment in writing at least five days before applying. The regulations exclude amounts requiring judicial valuation. A claim needing proof of disputed work or assessment of damages may require ordinary proceedings; check commercial jurisdiction first."
    },
    "ar": {
      "q": "متى تصلح المطالبة التجارية لأمر أداء؟",
      "a": "تشترط المادتان 67 و68 من نظام المحاكم التجارية ديناً ثابتاً بالكتابة وحال الأداء ومعين المقدار أو منقولاً محدداً، وإشعار المدين كتابة بالوفاء قبل تقديم الطلب بخمسة أيام على الأقل. وتستبعد اللائحة المبلغ المحتاج إلى تقدير المحكمة. قد تحتاج المطالبة بعمل متنازع عليه أو تعويض مقدر إلى دعوى عادية؛ ويجب التحقق أولاً من الاختصاص التجاري."
    },
    "sources": [
      {
        "en": "Ministry of Justice — Commercial Courts Law, Articles 67–68",
        "ar": "وزارة العدل — نظام المحاكم التجارية، المادتان 67 و68",
        "href": "https://www.moj.gov.sa/Documents/Regulations/pdf/96.pdf"
      },
      {
        "en": "Ministry of Justice — Commercial Courts implementing regulations",
        "ar": "وزارة العدل — اللائحة التنفيذية لنظام المحاكم التجارية",
        "href": "https://www.moj.gov.sa/Documents/Regulations/pdf/87.pdf"
      }
    ]
  },
  {
    "region": "sa",
    "service": "contracts",
    "problems": [
      "unpaid-professional-fees-and-service-invoice-dispute",
      "negotiation-and-enforcement"
    ],
    "id": "sa-bc-payment-order-contracts",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": true,
    "en": {
      "q": "When can an unpaid commercial debt use a payment order?",
      "a": "Articles 67–68 of the Commercial Courts Law require a written, due debt with a specified amount or identified movable property. The creditor must demand payment in writing at least five days before applying. The regulations exclude amounts requiring judicial valuation. A claim needing proof of disputed work or assessment of damages may require ordinary proceedings; check commercial jurisdiction first."
    },
    "ar": {
      "q": "متى تصلح المطالبة التجارية لأمر أداء؟",
      "a": "تشترط المادتان 67 و68 من نظام المحاكم التجارية ديناً ثابتاً بالكتابة وحال الأداء ومعين المقدار أو منقولاً محدداً، وإشعار المدين كتابة بالوفاء قبل تقديم الطلب بخمسة أيام على الأقل. وتستبعد اللائحة المبلغ المحتاج إلى تقدير المحكمة. قد تحتاج المطالبة بعمل متنازع عليه أو تعويض مقدر إلى دعوى عادية؛ ويجب التحقق أولاً من الاختصاص التجاري."
    },
    "sources": [
      {
        "en": "Ministry of Justice — Commercial Courts Law, Articles 67–68",
        "ar": "وزارة العدل — نظام المحاكم التجارية، المادتان 67 و68",
        "href": "https://www.moj.gov.sa/Documents/Regulations/pdf/96.pdf"
      },
      {
        "en": "Ministry of Justice — Commercial Courts implementing regulations",
        "ar": "وزارة العدل — اللائحة التنفيذية لنظام المحاكم التجارية",
        "href": "https://www.moj.gov.sa/Documents/Regulations/pdf/87.pdf"
      }
    ]
  },
  {
    "region": "sa",
    "service": "contracts",
    "problems": [
      "contract-evidence-and-electronic-messages",
      "unpaid-professional-fees-and-service-invoice-dispute"
    ],
    "id": "sa-bc-digital-evidence",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Can emails or messages prove an agreement or unpaid fee?",
      "a": "Articles 53–60 of the Evidence Law recognise digital records and correspondence. Their weight depends on origin and the applicable evidence category, including an agreed communication channel. Preserve the original digital material and full exchange with dates and attachments; the court may require verification. A cropped screenshot alone may leave identity, context or completeness disputed."
    },
    "ar": {
      "q": "هل تثبت الرسائل والبريد الإلكتروني الاتفاق أو الأتعاب؟",
      "a": "يعترف نظام الإثبات في المواد 53 إلى 60 بالسجلات والمراسلات الرقمية، وتتحدد حجيتها بمصدرها وفئتها، ومنها الوسيلة المتفق عليها في العقد. احتفظ بالأصل الرقمي والمحادثة الكاملة بالتواريخ والمرفقات؛ فقد تطلب المحكمة التحقق. وقد تترك الصورة المقتطعة هوية المرسل أو السياق أو الاكتمال محل نزاع."
    },
    "sources": [
      {
        "en": "Evidence Law — digital and documentary evidence",
        "ar": "نظام الإثبات — الدليل الرقمي والكتابة",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/2716057c-c097-4bad-8e1e-ae1400c678d5/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "business-law",
    "problems": [
      "unpaid-business-invoices",
      "commercial-supply-contract-dispute",
      "business-sale-and-purchase-dispute"
    ],
    "id": "sa-bc-business-digital-evidence",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "What should I keep when commercial terms were agreed electronically?",
      "a": "The Evidence Law recognises digital correspondence, with different rules for official records, qualifying private records and other digital evidence. Keep the complete order, acceptance, variations and payment trail in original digital form. These records help test what was agreed and delivered; electronic format alone does not prove every allegation."
    },
    "ar": {
      "q": "ماذا أحفظ إذا اتفقنا على الشروط التجارية إلكترونياً؟",
      "a": "يعترف نظام الإثبات بالمراسلات الرقمية مع اختلاف أحكام السجلات الرسمية والخاصة المستوفية للشروط وغيرها. احتفظ بالطلب والقبول والتعديلات ومسار السداد كاملة بهيئتها الرقمية الأصلية. تساعد هذه السجلات على التحقق من الاتفاق والتسليم؛ ولا يثبت الشكل الإلكتروني وحده كل ادعاء."
    },
    "sources": [
      {
        "en": "Evidence Law — digital and documentary evidence",
        "ar": "نظام الإثبات — الدليل الرقمي والكتابة",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/2716057c-c097-4bad-8e1e-ae1400c678d5/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "contracts",
    "problems": [
      "consumer-refund-and-purchase-cancellation-dispute"
    ],
    "id": "sa-bc-online-cancellation",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Can I cancel an online purchase simply because I changed my mind?",
      "a": "Article 13 of the E-Commerce Law generally allows cancellation within seven days after receiving goods or contracting for a service if unused and no benefit was obtained. Statutory exceptions include custom goods and certain accommodation, transport and food services. This right is separate from defect warranties; cancellation costs fall on the consumer unless otherwise agreed."
    },
    "ar": {
      "q": "هل أستطيع إلغاء الشراء الإلكتروني لمجرد تغيير رأيي؟",
      "a": "تجيز المادة 13 من نظام التجارة الإلكترونية الفسخ عموماً خلال الأيام السبعة التالية لتسلم المنتج أو التعاقد على الخدمة، بشرط عدم الاستخدام أو الانتفاع. وتوجد استثناءات نظامية منها المنتجات المصنوعة حسب الطلب وبعض خدمات الإيواء والنقل والإطعام. ويختلف ذلك عن ضمان العيب؛ ويتحمل المستهلك تكاليف الفسخ ما لم يتفق على غير ذلك."
    },
    "sources": [
      {
        "en": "E-Commerce Law — consumer cancellation and advertisements",
        "ar": "نظام التجارة الإلكترونية — فسخ المستهلك والإعلانات",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/360de590-0286-4fa5-a243-aa9100c31979/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "contracts",
    "problems": [
      "consumer-refund-and-purchase-cancellation-dispute",
      "supply-contract-non-delivery"
    ],
    "id": "sa-bc-online-delay",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "What changes when an online seller misses delivery?",
      "a": "Article 14 of the E-Commerce Law provides a cancellation and repayment route for qualifying delivery or performance delay, subject to the agreed period and force majeure. Preserve the promised delivery date, order date and delay messages. Apply that consumer rule only to a transaction within the law; it is not a universal deadline for every business supply contract."
    },
    "ar": {
      "q": "ما أثر تأخر المتجر الإلكتروني في التسليم؟",
      "a": "تقرر المادة 14 من نظام التجارة الإلكترونية مساراً للفسخ واسترداد المدفوع عند التأخير المستوفي لشروطها، مع مراعاة المدة المتفق عليها والقوة القاهرة. احفظ تاريخ الطلب وموعد التسليم الموعود ورسائل التأخير. يطبق هذا الحكم الاستهلاكي على المعاملة الخاضعة للنظام، ولا يمثل مهلة عامة لكل عقد توريد تجاري."
    },
    "sources": [
      {
        "en": "E-Commerce Law — consumer cancellation and advertisements",
        "ar": "نظام التجارة الإلكترونية — فسخ المستهلك والإعلانات",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/360de590-0286-4fa5-a243-aa9100c31979/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "contracts",
    "problems": [
      "defective-goods-and-non-conforming-delivery",
      "defective-product-and-consumer-compensation-claim"
    ],
    "id": "sa-bc-defect-notification",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Should I wait before notifying the seller about a defect?",
      "a": "Article 340 of the Civil Transactions Law requires inspection when possible and notice of a covered defect within a reasonable period. A hidden defect not discoverable by ordinary inspection must be notified immediately when it appears. Keep delivery, inspection and notification evidence; using or accepting goods after learning of a defect can affect remedies under Article 341."
    },
    "ar": {
      "q": "هل أنتظر قبل إبلاغ البائع بالعيب؟",
      "a": "توجب المادة 340 من نظام المعاملات المدنية الفحص عند التمكن وإبلاغ البائع بالعيب المشمول بالضمان خلال مدة معقولة. والعيب الخفي الذي لا يكشفه الفحص المعتاد يجب الإبلاغ عنه بمجرد ظهوره. احفظ التسليم والفحص والإبلاغ؛ فقد يؤثر قبول المبيع بعد العلم بالعيب في الجزاء وفق المادة 341."
    },
    "sources": [
      {
        "en": "Civil Transactions Law — obligations, remedies and agency",
        "ar": "نظام المعاملات المدنية — الالتزامات والجزاءات والوكالة",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/655fdb42-8c96-422b-b8c4-b04f0095c94c/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "contracts",
    "problems": [
      "defective-product-and-consumer-compensation-claim",
      "consumer-refund-and-purchase-cancellation-dispute"
    ],
    "id": "sa-bc-advertised-specification",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Does an online advertisement matter if the product differs from it?",
      "a": "Article 10 of the E-Commerce Law makes the electronic advertisement part of the contractual documents; Article 11 prohibits misleading claims. Preserve the listing as it appeared when ordering and compare it with the delivered product. Regulatory action against an advertisement and your private compensation claim are different processes; Article 22 assigns disputes and compensation claims to the competent court."
    },
    "ar": {
      "q": "هل للإعلان الإلكتروني أثر إذا اختلف المنتج عنه؟",
      "a": "تعد المادة 10 من نظام التجارة الإلكترونية الإعلان الإلكتروني من الوثائق التعاقدية المكملة، وتحظر المادة 11 الادعاءات المضللة. احفظ الإعلان وقت الطلب وقارنه بالمنتج المسلم. تختلف معالجة المخالفة الإعلانية عن المطالبة الخاصة بالتعويض؛ وتحيل المادة 22 المنازعات ودعاوى التعويض إلى المحكمة المختصة."
    },
    "sources": [
      {
        "en": "E-Commerce Law — consumer cancellation and advertisements",
        "ar": "نظام التجارة الإلكترونية — فسخ المستهلك والإعلانات",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/360de590-0286-4fa5-a243-aa9100c31979/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "contracts",
    "problems": [
      "power-of-attorney-drafting-and-authority-dispute",
      "power-of-attorney-drafting-and-authority-problem"
    ],
    "id": "sa-bc-authority-scope",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Is a general power of attorney enough for the intended transaction?",
      "a": "Articles 482–484 of the Civil Transactions Law reject wording that does not identify the type of legal act. Acts outside administration require a special authority specifying the type of act and associated dealings. Match the proposed sale, settlement or other transaction to the actual authority; notarisation does not expand the wording."
    },
    "ar": {
      "q": "هل تكفي وكالة عامة للتصرف المطلوب؟",
      "a": "لا تصح وفق المواد 482 إلى 484 من نظام المعاملات المدنية ألفاظ عامة لا تحدد نوع التصرف النظامي. ويحتاج ما يخرج عن الإدارة إلى وكالة خاصة تعين نوع العمل وما يستلزمه. طابق البيع أو الصلح أو غيرهما مع الصلاحية الفعلية؛ فالتوثيق لا يوسع نص الوكالة."
    },
    "sources": [
      {
        "en": "Civil Transactions Law — obligations, remedies and agency",
        "ar": "نظام المعاملات المدنية — الالتزامات والجزاءات والوكالة",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/655fdb42-8c96-422b-b8c4-b04f0095c94c/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "contracts",
    "problems": [
      "power-of-attorney-drafting-and-authority-problem",
      "power-of-attorney-drafting-and-authority-dispute"
    ],
    "id": "sa-bc-authority-limit",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "What matters if a representative exceeded the stated authority?",
      "a": "Article 88 of the Civil Transactions Law prevents a representative from exceeding the authority granted by contract, court order or statute. Preserve the version effective when the disputed act occurred and the counterparty correspondence. Revocation, later approval and third-party knowledge require separate assessment; cancelling a power now does not itself decide an earlier transaction."
    },
    "ar": {
      "q": "ما المهم عند تجاوز الوكيل حدود الصلاحية؟",
      "a": "تمنع المادة 88 من نظام المعاملات المدنية النائب من تجاوز حدود النيابة المقررة بعقد أو حكم أو نص نظامي. احفظ النسخة السارية وقت التصرف والمراسلات مع الطرف الآخر. وتحتاج الإجازة اللاحقة والعزل وعلم الغير إلى تقييم مستقل؛ ففسخ الوكالة الآن لا يحسم بذاته أثر تصرف سابق."
    },
    "sources": [
      {
        "en": "Civil Transactions Law — obligations, remedies and agency",
        "ar": "نظام المعاملات المدنية — الالتزامات والجزاءات والوكالة",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/655fdb42-8c96-422b-b8c4-b04f0095c94c/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "contracts",
    "problems": [
      "document-attestation-and-contract-authentication-problem",
      "document-attestation-and-legalisation-problem"
    ],
    "id": "sa-bc-attestation-limits",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Does attestation confirm that a contract is valid in substance?",
      "a": "The Foreign Ministry states that it is not responsible for document contents and that attestation loses effect if the underlying content or earlier seals or signatures prove invalid. Identify the issuing country, receiving authority and document type before arranging the required authentication and translation. An attested signature does not settle disputed obligations or representative authority."
    },
    "ar": {
      "q": "هل يثبت التصديق صحة مضمون العقد؟",
      "a": "توضح وزارة الخارجية أنها غير مسؤولة عن محتوى الوثائق، وأن التصديق يفقد أثره عند ثبوت بطلان المضمون أو عدم صحة الأختام أو التواقيع السابقة. حدّد بلد الإصدار والجهة المستقبلة ونوع الوثيقة قبل استكمال التصديق والترجمة المطلوبة. ولا يحسم تصديق التوقيع الالتزامات المتنازع عليها أو صلاحية الممثل."
    },
    "sources": [
      {
        "en": "Ministry of Foreign Affairs — attestation conditions",
        "ar": "وزارة الخارجية — شروط التصديق على الوثائق",
        "href": "https://ratification.mofa.gov.sa/Ratification/Create"
      }
    ]
  },
  {
    "region": "sa",
    "service": "business-law",
    "problems": [
      "company-formation-and-registration",
      "commercial-due-diligence-before-acquisition-or-investment"
    ],
    "id": "sa-bc-incorporation-status",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": true,
    "en": {
      "q": "When does a Saudi company acquire legal personality?",
      "a": "The Companies Law grants legal personality after commercial registration, with limited personality during formation conditional on completing incorporation. Obtain the current registration and constitutional documents and check who signed pre-incorporation commitments. Incorporation and activity-specific licensing are separate checks; the Civil Transactions Law preserves statutory registration and licensing requirements."
    },
    "ar": {
      "q": "متى تكتسب الشركة السعودية الشخصية الاعتبارية؟",
      "a": "يقرر نظام الشركات اكتساب الشخصية الاعتبارية بعد القيد في السجل التجاري، مع شخصية بالقدر اللازم للتأسيس مشروطة بإتمامه. اطلب القيد ووثائق التأسيس الحالية وتحقق من موقع الالتزامات السابقة للتأسيس. ويختلف التأسيس عن ترخيص النشاط؛ ويحفظ نظام المعاملات المدنية متطلبات القيد والترخيص النظامية."
    },
    "sources": [
      {
        "en": "Companies Law — incorporation and shareholder rights",
        "ar": "نظام الشركات — التأسيس وحقوق الشركاء والمساهمين",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/a8376aea-1bc3-49d4-9027-aed900b555af/1"
      },
      {
        "en": "Civil Transactions Law — obligations, remedies and agency",
        "ar": "نظام المعاملات المدنية — الالتزامات والجزاءات والوكالة",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/655fdb42-8c96-422b-b8c4-b04f0095c94c/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "business-law",
    "problems": [
      "shareholder-and-partner-dispute",
      "commercial-due-diligence-before-acquisition-or-investment"
    ],
    "id": "sa-bc-shareholder-rights",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Does being a shareholder give an unrestricted right to company records?",
      "a": "The Companies Law recognises shareholder information and participation rights subject to its conditions and the company constitution, including confidentiality. The applicable provisions differ by company form. Identify the registered ownership and entity form, then specify the records or decision challenged; an investor negotiating a purchase is not automatically an existing shareholder."
    },
    "ar": {
      "q": "هل تتيح صفة المساهم الاطلاع غير المقيد على السجلات؟",
      "a": "يقرر نظام الشركات حقوق اطلاع ومشاركة وفق شروطه ووثائق الشركة، مع مراعاة سرية المعلومات. وتختلف الأحكام بحسب شكل الشركة. حدّد الملكية المسجلة والشكل القانوني ثم السجلات المطلوبة أو القرار المطعون فيه؛ فالمستثمر الذي يفاوض على الشراء ليس تلقائياً مساهماً قائماً."
    },
    "sources": [
      {
        "en": "Companies Law — incorporation and shareholder rights",
        "ar": "نظام الشركات — التأسيس وحقوق الشركاء والمساهمين",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/a8376aea-1bc3-49d4-9027-aed900b555af/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "business-law",
    "problems": [
      "shareholder-and-partner-dispute",
      "commercial-liability"
    ],
    "id": "sa-bc-company-loss-action",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Can a shareholder sue for loss suffered by the company?",
      "a": "The Companies Law provides a company-liability action by qualifying shareholders when the company does not sue. The statutory route generally requires at least 5% of capital unless the constitution sets less, a proper company-interest purpose, a sound basis and good faith. Distinguish company loss from personal loss before choosing the claimant and remedy; further notice and procedural conditions apply."
    },
    "ar": {
      "q": "هل يقيم المساهم دعوى عن ضرر أصاب الشركة؟",
      "a": "يتيح نظام الشركات للشركاء أو المساهمين المستوفين للشروط رفع دعوى المسؤولية المقررة للشركة عند عدم رفعها. ويتطلب المسار عموماً 5% من رأس المال ما لم تحدد الوثائق نسبة أقل، وهدفاً يحقق مصلحة الشركة وأساساً صحيحاً وحسن نية. ميّز ضرر الشركة عن الضرر الشخصي قبل اختيار المدعي والطلب، مع مراعاة شروط الإبلاغ والإجراءات الأخرى."
    },
    "sources": [
      {
        "en": "Companies Law — incorporation and shareholder rights",
        "ar": "نظام الشركات — التأسيس وحقوق الشركاء والمساهمين",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/a8376aea-1bc3-49d4-9027-aed900b555af/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "business-law",
    "problems": [
      "commercial-concealment-dispute"
    ],
    "id": "sa-bc-concealment-test",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "What makes a business arrangement a potential concealment offence?",
      "a": "Articles 2–3 of the Anti-Concealment Law focus on enabling a non-Saudi to conduct an unlicensed economic activity for their own account using another person’s permission or registration. Nationality or employment alone does not answer that test. Review the actual licence, account control, income and operating arrangement against the allegation; do not alter or withhold records from investigators."
    },
    "ar": {
      "q": "متى يثير ترتيب النشاط شبهة تستر تجاري؟",
      "a": "تركز المادتان 2 و3 من نظام مكافحة التستر على تمكين غير السعودي من نشاط اقتصادي غير مرخص له لحسابه الخاص باستخدام موافقة أو قيد الغير. ولا تحسم الجنسية أو علاقة العمل وحدهما ذلك. افحص الترخيص والسيطرة على الحساب والإيراد والتشغيل الفعلي مقابل الاتهام، ولا تعدل السجلات أو تحجبها عن التحقيق."
    },
    "sources": [
      {
        "en": "Anti-Concealment Law — Articles 2–3 and 10",
        "ar": "نظام مكافحة التستر — المواد 2 و3 و10",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/bf9e0aae-6df6-4785-a305-ac2300bd0856/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "business-law",
    "problems": [
      "commercial-concealment-dispute"
    ],
    "id": "sa-bc-concealment-third-party",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "What if my legitimate money is linked to a concealment case?",
      "a": "Article 10 of the Anti-Concealment Law preserves lawful rights of good-faith third parties when proceeds are confiscated. Identify the legal basis and traceable payment records for your own claim. This is not an exemption for a participant in the arrangement and does not guarantee release of seized funds; the criminal court assesses the relevant rights."
    },
    "ar": {
      "q": "ماذا إذا ارتبط مالي المشروع بقضية تستر؟",
      "a": "تحفظ المادة 10 من نظام مكافحة التستر الحقوق المشروعة للغير حسن النية عند مصادرة المتحصلات. حدّد سند حقك وسجلات السداد التي تتيح تتبعه. ولا يعد ذلك إعفاءً للمشارك في الترتيب أو ضماناً للإفراج عن المحجوز؛ إذ تفصل المحكمة الجزائية في الحقوق المعنية."
    },
    "sources": [
      {
        "en": "Anti-Concealment Law — Articles 2–3 and 10",
        "ar": "نظام مكافحة التستر — المواد 2 و3 و10",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/bf9e0aae-6df6-4785-a305-ac2300bd0856/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "business-law",
    "problems": [
      "competition-and-unfair-trade-practice-complaint",
      "commercial-distribution-and-agency-dispute"
    ],
    "id": "sa-bc-competition-conduct",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "When can pricing or exclusivity become a competition issue?",
      "a": "Articles 5–6 of the Competition Law address anticompetitive arrangements and abuse of dominance, including price coordination, market division and exclusion. An exclusive term or strong market position is not by itself the whole legal test. Identify the product market, parties, conduct and competitive effect. Article 25 separately permits an injured person to seek compensation before the competent court."
    },
    "ar": {
      "q": "متى يصبح التسعير أو الحصر مسألة منافسة؟",
      "a": "تتناول المادتان 5 و6 من نظام المنافسة الترتيبات المخلة بالمنافسة وإساءة الوضع المهيمن، ومنها تنسيق الأسعار وتقاسم الأسواق والإقصاء. ولا يستكمل شرط حصري أو مركز سوقي قوي وحده التكييف. حدّد سوق المنتج والأطراف والسلوك وأثره التنافسي. وتجيز المادة 25 للمتضرر طلب التعويض أمام المحكمة المختصة بصورة مستقلة."
    },
    "sources": [
      {
        "en": "Competition Law — prohibited practices and compensation",
        "ar": "نظام المنافسة — الممارسات المحظورة والتعويض",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/e3605c0d-ef87-4cff-b5da-aa3f0102bbb4/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "business-law",
    "problems": [
      "commercial-agency-termination",
      "commercial-distribution-and-agency-dispute"
    ],
    "id": "sa-bc-agency-deregistration",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Does cancelling an agency registration settle termination compensation?",
      "a": "The Ministry of Commerce provides an agent’s request to deregister a commercial agency, subject to review and approval. That administrative service records cessation; it is not a judgment on compensation, commissions or stock. Keep those contractual claims and customer commitments identified alongside the deregistration request."
    },
    "ar": {
      "q": "هل يحسم شطب قيد الوكالة تعويض الإنهاء؟",
      "a": "تتيح وزارة التجارة للوكيل طلب شطب قيد الوكالة التجارية، مع مراجعة الطلب والموافقة عليه. هذا إجراء لتسجيل التوقف وليس حكماً بالتعويض أو العمولات أو المخزون. حدّد تلك المطالبات العقدية والتزامات العملاء إلى جانب طلب الشطب."
    },
    "sources": [
      {
        "en": "Ministry of Commerce — agency deregistration",
        "ar": "وزارة التجارة — طلب شطب قيد وكالة تجارية",
        "href": "https://mc.gov.sa/ar/eservices/Pages/ServiceDetails.aspx?sID=44"
      }
    ]
  },
  {
    "region": "sa",
    "service": "business-law",
    "problems": [
      "franchise-agreement-and-termination-dispute"
    ],
    "id": "sa-bc-franchise-disclosure",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "When should franchise disclosure reach a prospective franchisee?",
      "a": "The official Franchise Center guide states that disclosure must arrive at least 14 days before signing the franchise agreement or paying any franchise consideration, whichever happens first. Keep the delivered version and proof of date alongside payment and signature records. A disclosure failure needs its own statutory remedy assessment; it does not establish a particular compensation amount automatically."
    },
    "ar": {
      "q": "متى تسلم وثيقة الإفصاح لصاحب الامتياز المحتمل؟",
      "a": "يوضح دليل مركز الامتياز التجاري تسليم وثيقة الإفصاح قبل توقيع الاتفاقية أو دفع أي مقابل للامتياز بأربعة عشر يوماً على الأقل، أيهما أسبق. احتفظ بالنسخة المسلمة وإثبات تاريخها مع الدفع والتوقيع. ويحتاج الإخلال بالإفصاح إلى بحث الجزاء النظامي الخاص؛ ولا يحدد تلقائياً مبلغ تعويض."
    },
    "sources": [
      {
        "en": "Franchise Center — disclosure document guide",
        "ar": "مركز الامتياز التجاري — دليل وثيقة الإفصاح",
        "href": "https://franchisecenter.sa/sites/default/files/2024-01/الدليل%20الاسترشادي%20لصياغة%20وثيقة%20الافصاح00.pdf"
      }
    ]
  },
  {
    "region": "sa",
    "service": "business-law",
    "problems": [
      "franchise-agreement-and-termination-dispute",
      "commercial-due-diligence-before-acquisition-or-investment"
    ],
    "id": "sa-bc-franchise-change-control",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Which franchise terms matter when selling or exiting the business?",
      "a": "The Ministry of Commerce requires franchise agreements to address changes of ownership or control, assignment restrictions, termination and post-termination obligations. Check the actual clauses before promising the buyer continued brand or operating rights. A business sale agreement should identify any required franchise consent and who bears unresolved exit obligations."
    },
    "ar": {
      "q": "ما شروط الامتياز المهمة عند بيع النشاط أو الخروج منه؟",
      "a": "تشترط وزارة التجارة معالجة تغير الملكية أو السيطرة وقيود التنازل والإنهاء والتزامات ما بعده في اتفاقية الامتياز. راجع البنود الفعلية قبل وعد المشتري باستمرار حقوق العلامة أو التشغيل. وينبغي أن يحدد عقد البيع موافقات الامتياز المطلوبة ومن يتحمل التزامات الخروج غير المسواة."
    },
    "sources": [
      {
        "en": "Ministry of Commerce — franchise contract registration requirements",
        "ar": "وزارة التجارة — متطلبات قيد عقد الامتياز",
        "href": "https://mc.gov.sa/ar/eservices/pages/servicedetails.aspx?sid=24"
      }
    ]
  },
  {
    "region": "sa",
    "service": "business-law",
    "problems": [
      "negotiation-and-settlement-strategy"
    ],
    "id": "sa-bc-approved-settlement-business",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "How can a settlement be made directly enforceable?",
      "a": "The Ministry of Justice states that settlement documents issued through Taradhi after review, approval and party consent are enforceable instruments. Before approval, specify the obligations, instalment dates and exact claims settled, and verify authority to consent. Exchanging an informal offer does not itself produce that approved document."
    },
    "ar": {
      "q": "كيف تكتسب التسوية قوة السند التنفيذي؟",
      "a": "توضح وزارة العدل أن وثائق الصلح الصادرة عبر تراضي بعد التدقيق والاعتماد وموافقة الأطراف تعد سندات تنفيذية. حدّد قبل الاعتماد الالتزامات ومواعيد الأقساط والمطالبات المسواة بدقة وتحقق من صلاحية الموافقة. ولا ينتج تبادل عرض غير رسمي بذاته تلك الوثيقة المعتمدة."
    },
    "sources": [
      {
        "en": "Ministry of Justice — approved settlement documents",
        "ar": "وزارة العدل — وثائق الصلح المعتمدة",
        "href": "https://www.moj.gov.sa/Lists/MOJNews/DispForm.aspx?ID=1305"
      }
    ]
  },
  {
    "region": "sa",
    "service": "contracts",
    "problems": [
      "negotiation-and-enforcement"
    ],
    "id": "sa-bc-approved-settlement-contracts",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "How can a settlement be made directly enforceable?",
      "a": "The Ministry of Justice states that settlement documents issued through Taradhi after review, approval and party consent are enforceable instruments. Before approval, specify the obligations, instalment dates and exact claims settled, and verify authority to consent. Exchanging an informal offer does not itself produce that approved document."
    },
    "ar": {
      "q": "كيف تكتسب التسوية قوة السند التنفيذي؟",
      "a": "توضح وزارة العدل أن وثائق الصلح الصادرة عبر تراضي بعد التدقيق والاعتماد وموافقة الأطراف تعد سندات تنفيذية. حدّد قبل الاعتماد الالتزامات ومواعيد الأقساط والمطالبات المسواة بدقة وتحقق من صلاحية الموافقة. ولا ينتج تبادل عرض غير رسمي بذاته تلك الوثيقة المعتمدة."
    },
    "sources": [
      {
        "en": "Ministry of Justice — approved settlement documents",
        "ar": "وزارة العدل — وثائق الصلح المعتمدة",
        "href": "https://www.moj.gov.sa/Lists/MOJNews/DispForm.aspx?ID=1305"
      }
    ]
  },
  {
    "region": "sa",
    "service": "business-law",
    "problems": [
      "government-tender-dispute"
    ],
    "id": "sa-bc-procurement-commencement",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Does the procurement law published in September 2026 immediately govern my challenge?",
      "a": "No. Article 101 of the newly published Government Tenders and Procurement Law postpones operation until 120 days after publication. For a current challenge, identify the tender and notification dates and the operative law before calculating the objection period. Do not substitute a newly displayed provision for the rules applicable to the actual decision."
    },
    "ar": {
      "q": "هل يسري نظام المنافسات المنشور في سبتمبر 2026 فوراً على اعتراضي؟",
      "a": "لا؛ تؤجل المادة 101 من نظام المنافسات والمشتريات الحكومية المنشور حديثاً العمل به إلى ما بعد 120 يوماً من النشر. في الاعتراض القائم، حدّد تاريخ المنافسة والتبليغ والنظام النافذ قبل حساب المهلة. ولا تستبدل بالأحكام المنطبقة على القرار نصاً جديداً لمجرد ظهوره في صفحة محدثة."
    },
    "sources": [
      {
        "en": "Umm Al-Qura — new procurement law, Article 101 commencement",
        "ar": "أم القرى — نظام المنافسات الجديد، المادة 101 والنفاذ",
        "href": "https://www.uqn.gov.sa/decisions-and-regulations/4001762"
      }
    ]
  },
  {
    "region": "sa",
    "service": "contracts",
    "problems": [
      "legal-notice-and-demand-letter-drafting",
      "breach-of-contract"
    ],
    "id": "sa-bc-notice-method",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "How should a default notice be delivered?",
      "a": "Article 177 of the Civil Transactions Law allows the method agreed by the parties or the legally prescribed notification method, including bringing proceedings. Preserve the recipient details, complete notice and delivery proof. A response date invented in a demand letter is not automatically the statutory waiting period for a payment order or another procedure."
    },
    "ar": {
      "q": "كيف يوجه إعذار الإخلال؟",
      "a": "تجيز المادة 177 من نظام المعاملات المدنية الوسيلة المتفق عليها أو وسيلة التبليغ المقررة نظاماً، ومنها رفع الدعوى. احتفظ ببيانات المرسل إليه والنص الكامل ودليل الوصول. ولا يصبح موعد الرد الذي تضعه في الخطاب تلقائياً مهلة نظامية لأمر أداء أو إجراء آخر."
    },
    "sources": [
      {
        "en": "Civil Transactions Law — obligations, remedies and agency",
        "ar": "نظام المعاملات المدنية — الالتزامات والجزاءات والوكالة",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/655fdb42-8c96-422b-b8c4-b04f0095c94c/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "contracts",
    "problems": [
      "defective-product-and-consumer-compensation-claim",
      "service-agreement-breach"
    ],
    "id": "sa-bc-actual-loss",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Does a defect or breach establish the amount of compensation?",
      "a": "The Civil Transactions Law separates liability from assessing loss. Article 137 addresses loss and lost profit naturally resulting from a harmful act, while Article 180 limits ordinary contract damages to foreseeable loss absent fraud or gross fault. Link each injury, property loss or expense to the alleged conduct; do not treat the purchase price as proof of all additional damage."
    },
    "ar": {
      "q": "هل يحدد العيب أو الإخلال مبلغ التعويض؟",
      "a": "يفصل نظام المعاملات المدنية المسؤولية عن تقدير الضرر. تتناول المادة 137 الخسارة والكسب الفائت الناتجين طبيعياً عن الفعل الضار، وتقيد المادة 180 التعويض العقدي المعتاد بالضرر المتوقع دون الغش أو الخطأ الجسيم. اربط كل إصابة أو تلف أو مصروف بالسلوك المدعى به؛ ولا تجعل ثمن الشراء دليلاً لكل ضرر إضافي."
    },
    "sources": [
      {
        "en": "Civil Transactions Law — obligations, remedies and agency",
        "ar": "نظام المعاملات المدنية — الالتزامات والجزاءات والوكالة",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/655fdb42-8c96-422b-b8c4-b04f0095c94c/1"
      }
    ]
  }
];
