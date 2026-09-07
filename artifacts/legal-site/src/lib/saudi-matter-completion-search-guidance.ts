import type { MatterSourceGuidance } from "./matter-source-guidance.js";

export const SAUDI_MATTER_COMPLETION_SEARCH_GUIDANCE: MatterSourceGuidance[] = [
  {
    "region": "sa",
    "service": "contracts",
    "problems": [
      "contract-evidence-and-electronic-messages"
    ],
    "id": "sa-matter-writing-threshold",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Can witnesses replace written evidence for a large contract?",
      "a": "Under Evidence Law Article 66, a transaction exceeding SAR 100,000 or of undetermined value generally requires writing, subject to a different agreement or legal rule. Article 67 also restricts testimony for transactions requiring writing, a remaining part of a written-proof right, or matters contradicting written evidence. Digital evidence has the status of writing under Article 55. Assess the original transaction value and the actual digital record, rather than treating every unsigned exchange as inadmissible."
    },
    "ar": {
      "q": "هل تحل شهادة الشهود محل الكتابة في عقد مرتفع القيمة؟",
      "a": "تتطلب المادة 66 من نظام الإثبات الكتابة أصلاً للتصرف الذي تزيد قيمته على 100 ألف ريال أو يكون غير محدد القيمة، مع مراعاة الاتفاق أو النص المخالف. وتقيد المادة 67 الشهادة أيضاً فيما يلزم فيه الكتابة أو في باقي حق لا يثبت إلا بها أو فيما يخالف الدليل الكتابي. وللدليل الرقمي حكم الكتابة وفق المادة 55. افحص قيمة التصرف الأصلية والسجل الرقمي الفعلي بدلاً من اعتبار كل مراسلة غير موقعة غير مقبولة."
    },
    "sources": [
      {
        "en": "Evidence Law — Articles 55, 66–67",
        "ar": "نظام الإثبات — المواد 55, 66–67",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/2716057c-c097-4bad-8e1e-ae1400c678d5/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "contracts",
    "problems": [
      "contract-evidence-and-electronic-messages"
    ],
    "id": "sa-matter-writing-exceptions",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "What if written contract evidence was unavailable or lost?",
      "a": "Article 68 permits testimony in specified writing-required cases: an initial written indication, a material or moral obstacle to obtaining writing, or loss of the written evidence for a reason outside the claimant’s control. Article 51 explains the initial indication as writing from the opponent making the transaction plausible, supported by another proof method. Identify the particular exception and supporting facts; merely lacking a signed contract does not establish it."
    },
    "ar": {
      "q": "ماذا لو تعذرت الكتابة أو فُقد دليل العقد الكتابي؟",
      "a": "تجيز المادة 68 الشهادة في حالات محددة مما يلزم إثباته بالكتابة: وجود مبدأ ثبوت بالكتابة، أو مانع مادي أو أدبي يحول دون الحصول عليها، أو ثبوت فقد المدعي دليله لسبب لا يد له فيه. وتوضح المادة 51 أن مبدأ الثبوت كتابة صادرة من الخصم تجعل التصرف قريب الاحتمال، تعزز بطريق إثبات آخر. حدد الاستثناء وأدلته؛ فمجرد غياب عقد موقع لا يثبت توافره."
    },
    "sources": [
      {
        "en": "Evidence Law — Articles 51, 68",
        "ar": "نظام الإثبات — المواد 51, 68",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/2716057c-c097-4bad-8e1e-ae1400c678d5/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "contracts",
    "problems": [
      "contract-evidence-and-electronic-messages"
    ],
    "id": "sa-matter-digital-verification",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "How is a disputed electronic message or signature checked in court?",
      "a": "Identify the challenged author, signature, alteration or missing context and retain the original record and related verification data. Articles 58–63 distinguish the proof burden for specified digital-evidence categories, submission in its original or another digital form, and matching extracts to their source record. Unjustified refusal to provide verification material requested by the court can defeat reliance on the evidence or count against the refusing party. If verification fails for reasons outside the parties’ control, the court assesses its weight from the case circumstances."
    },
    "ar": {
      "q": "كيف يفحص القضاء رسالة أو توقيعاً إلكترونياً متنازعاً عليه؟",
      "a": "حدد النزاع في هوية المرسل أو التوقيع أو التعديل أو السياق الناقص، واحتفظ بالسجل الأصلي وبيانات التحقق ذات الصلة. تميز المواد 58–63 بين عبء إثبات عدم صحة فئات محددة من الأدلة الرقمية وتقديمها بهيئتها الأصلية أو بوسيلة رقمية أخرى ومطابقة المستخرجات لسجلها. وقد يؤدي الامتناع بلا عذر مقبول عن تقديم ما تطلبه المحكمة للتحقق إلى سقوط التمسك بالدليل أو اعتباره حجة على الممتنع. وإذا تعذر التحقق لسبب لا يعود للخصوم، قدرت المحكمة الحجية من ظروف الدعوى."
    },
    "sources": [
      {
        "en": "Evidence Law — Articles 58–63",
        "ar": "نظام الإثبات — المواد 58–63",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/2716057c-c097-4bad-8e1e-ae1400c678d5/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "contracts",
    "problems": [
      "defective-goods-and-non-conforming-delivery"
    ],
    "id": "sa-matter-sale-defect-remedies",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Can a buyer cancel a defective sale or keep the goods with a price adjustment?",
      "a": "Article 338 covers a delivery defect reducing the item’s value or intended usefulness, even if the seller did not know of it. The buyer may seek rescission or keep the goods and claim the statutory price difference; the seller may avert this by supplying an equivalent defect-free replacement. Additional damages require their own basis and evidence. Identify the defect, contract purpose and requested remedy; this sale-warranty framework should not be substituted for a special product or consumer rule."
    },
    "ar": {
      "q": "هل يحق للمشتري فسخ بيع المعيب أو الاحتفاظ به مع فرق الثمن؟",
      "a": "تشمل المادة 338 العيب عند التسليم الذي ينقص قيمة المبيع أو نفعه المقصود ولو لم يعلم به البائع. وللمشتري طلب الفسخ أو إمساك المبيع مع فرق الثمن وفق التقدير النظامي، وللبائع توقي ذلك ببديل مماثل غير معيب. ويحتاج التعويض الإضافي إلى مقتضاه وأدلته. حدد العيب وغرض العقد والطلب؛ ولا يستبدل إطار ضمان عيب البيع بقاعدة خاصة بالمنتج أو بحماية المستهلك."
    },
    "sources": [
      {
        "en": "Civil Transactions Law — Article 338",
        "ar": "نظام المعاملات المدنية — المادة 338",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/655fdb42-8c96-422b-b8c4-b04f0095c94c/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "contracts",
    "problems": [
      "defective-goods-and-non-conforming-delivery"
    ],
    "id": "sa-matter-sale-defect-exclusions",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "When might the seller not be responsible under the ordinary defect warranty?",
      "a": "Article 339 excludes defects known to the buyer or discoverable by ordinary inspection, subject to an express defect guarantee or deliberate concealment; customary tolerable defects; defects arising after delivery without an earlier cause; and judicial or administrative auction sales. Article 343 allows warranty changes but not deliberate concealment. Preserve the sale terms and inspection history. These are the ordinary Civil Transactions Law limits, not permission to disregard a separate mandatory consumer obligation."
    },
    "ar": {
      "q": "متى قد لا يضمن البائع العيب وفق القواعد العامة؟",
      "a": "تستثني المادة 339 العيب المعلوم للمشتري أو القابل للكشف بالفحص المعتاد، مع مراعاة ضمان السلامة من عيب معين أو تعمد إخفائه؛ والعيب المتسامح فيه عرفاً؛ وما يحدث بعد التسليم دون سبب سابق؛ والبيع بالمزاد القضائي أو الإداري. وتجيز المادة 343 تعديل الضمان دون تعمد إخفاء العيب. احتفظ بشروط البيع وسجل الفحص. وهذه حدود القواعد العامة لنظام المعاملات المدنية وليست إذناً بتجاهل التزام خاص آمر لحماية المستهلك."
    },
    "sources": [
      {
        "en": "Civil Transactions Law — Articles 339, 343",
        "ar": "نظام المعاملات المدنية — المواد 339, 343",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/655fdb42-8c96-422b-b8c4-b04f0095c94c/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "contracts",
    "problems": [
      "defective-goods-and-non-conforming-delivery"
    ],
    "id": "sa-matter-sale-defect-acceptance",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Does accepting or disposing of defective goods affect the available remedy?",
      "a": "Article 341 distinguishes accepting the defect from losing only the rescission remedy. Express or implied acceptance of the defect removes rescission and the price-difference claim. Certain later dealings, third-party rights or loss or damage to the item can instead leave a price-difference claim while preventing rescission. Article 342 separately addresses divisible batches: a defect in one item does not always justify cancelling the whole sale. Record what happened after discovery before choosing a remedy."
    },
    "ar": {
      "q": "هل يؤثر قبول المبيع المعيب أو التصرف فيه في الطلب المتاح؟",
      "a": "تميز المادة 341 بين الرضا بالعيب وسقوط الفسخ وحده. فالرضا الصريح أو الضمني بالعيب يسقط الفسخ وفرق الثمن، بينما قد تُبقي بعض التصرفات اللاحقة أو حقوق الغير أو هلاك المبيع أو تعيبه المطالبة بفرق الثمن مع سقوط الفسخ. وتعالج المادة 342 الصفقة القابلة للتجزئة؛ فلا يبرر عيب بعض الأشياء دائماً فسخ البيع كله. وثّق ما جرى بعد اكتشاف العيب قبل اختيار الطلب."
    },
    "sources": [
      {
        "en": "Civil Transactions Law — Articles 341–342",
        "ar": "نظام المعاملات المدنية — المواد 341–342",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/655fdb42-8c96-422b-b8c4-b04f0095c94c/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "contracts",
    "problems": [
      "defective-goods-and-non-conforming-delivery"
    ],
    "id": "sa-matter-sale-defect-time",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Is prompt defect notice enough to preserve a warranty claim indefinitely?",
      "a": "No. Notification and the time for a warranty action are different. Article 344 generally prevents hearing a defect-warranty action after 180 days from delivery unless the seller undertook a longer warranty; a seller who fraudulently concealed the defect cannot rely on that period. Preserve delivery, discovery, notice and warranty dates. Check any special governing rule and procedural effect before filing; a complaint to the seller is not itself a court action."
    },
    "ar": {
      "q": "هل يكفي الإبلاغ السريع عن العيب لحفظ الدعوى دون حد زمني؟",
      "a": "لا؛ فالإبلاغ ومدة دعوى الضمان أمران مختلفان. تقضي المادة 344 أصلاً بعدم سماع دعوى ضمان العيب بعد 180 يوماً من تسليم المبيع، ما لم يلتزم البائع بضمان أطول، ولا يتمسك بهذه المدة بائع ثبت إخفاؤه العيب غشاً. احتفظ بتواريخ التسليم والكشف والإبلاغ ومدة الضمان. تحقّق من أي قاعدة خاصة وأثرها الإجرائي قبل الرفع؛ فالشكوى إلى البائع ليست بذاتها دعوى قضائية."
    },
    "sources": [
      {
        "en": "Civil Transactions Law — Article 344",
        "ar": "نظام المعاملات المدنية — المادة 344",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/655fdb42-8c96-422b-b8c4-b04f0095c94c/1"
      }
    ]
  }
];
