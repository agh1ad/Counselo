import type { MatterSourceGuidance } from "./matter-source-guidance.js";

export const UAE_FINAL_SEARCH_GUIDANCE: MatterSourceGuidance[] = [
  {
    "region": "uae",
    "service": "banking-finance",
    "problems": [
      "unauthorized-bank-transaction"
    ],
    "id": "uae-final-bank-escalation",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "When can an unresolved bank complaint go to Sanadak?",
      "a": "First lodge an official complaint with the licensed financial institution. Sanadak’s current eligibility test requires 15 calendar days to pass with no written response or an unsatisfactory response. Court proceedings, matters outside the Central Bank mandate and certain policy issues can prevent acceptance. Keep the original complaint, response, transaction evidence and loss calculation; eligibility is separate from winning reimbursement."
    },
    "ar": {
      "q": "متى تُرفع الشكوى المصرفية غير المحلولة إلى سندك؟",
      "a": "قدم أولاً شكوى رسمية إلى المؤسسة المالية المرخصة. تشترط أهلية سندك الحالية مرور 15 يوماً تقويمياً دون رد مكتوب أو مع رد غير مرضٍ. وقد تمنع القبول دعوى قضائية قائمة أو خروج المسألة عن اختصاص المصرف المركزي أو بعض مسائل السياسات. احفظ الشكوى والرد وأدلة العملية وحساب الضرر؛ فالأهلية تختلف عن استحقاق التعويض."
    },
    "sources": [
      {
        "en": "Sanadak — complaint eligibility",
        "ar": "سندك — أهلية الشكوى",
        "href": "https://www.sanadak.gov.ae/en/make-a-complaint/complaint-eligibility/"
      }
    ],
    "includeOnServicePage": true
  },
  {
    "region": "uae",
    "service": "litigation-court-disputes",
    "problems": [
      "appeal-deadline-and-filing-problem",
      "court-service-and-notification-problem"
    ],
    "id": "uae-final-appeal-start",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Does the federal appeal clock always start when judgment is delivered to me?",
      "a": "No. Article 153 of the federal Civil Procedure Code ordinarily starts the challenge period on the day after judgment. It instead uses service in specified cases, including a losing party absent from all hearings who filed no defence. Check the complete attendance, submissions and service record, and special statutory rules. This rule does not replace DIFC or ADGM court procedures."
    },
    "ar": {
      "q": "هل يبدأ ميعاد الطعن الاتحادي دائماً من تسلمي الحكم؟",
      "a": "لا. تبدأ المادة 153 من قانون الإجراءات المدنية الاتحادي الميعاد عادة من اليوم التالي لصدور الحكم. وتعتد بالإعلان في حالات محددة، منها المحكوم عليه المتخلف عن جميع الجلسات دون تقديم مذكرة دفاع. راجع سجل الحضور والمذكرات والإعلان كاملاً والأحكام الخاصة. ولا تحل هذه القاعدة محل إجراءات محاكم مركز دبي المالي العالمي أو سوق أبوظبي العالمي."
    },
    "sources": [
      {
        "en": "Federal Civil Procedure Code, Article 153",
        "ar": "قانون الإجراءات المدنية الاتحادي، المادة 153",
        "href": "https://uaelegislation.gov.ae/en/legislations/1602/download"
      }
    ],
    "includeOnServicePage": false
  },
  {
    "region": "uae",
    "service": "litigation-court-disputes",
    "problems": [
      "appeal-deadline-and-filing-problem"
    ],
    "id": "uae-final-intermediate-ruling",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Can every ruling made during a civil case be appealed immediately?",
      "a": "Under federal Article 152, a ruling that does not finally determine the dispute is generally challenged with the final judgment. The article provides exceptions, including urgent or summary judgments, compulsory-execution rulings and specified jurisdiction decisions. Identify the ruling’s operative effect before treating an interim direction as separately appealable."
    },
    "ar": {
      "q": "هل يمكن الطعن فوراً في كل حكم يصدر أثناء الدعوى المدنية؟",
      "a": "وفق المادة 152 الاتحادية، يُطعن عادة في الحكم الذي لا ينهي الخصومة مع الحكم المنهي لها. وتقرر المادة استثناءات منها الأحكام الوقتية والمستعجلة والقابلة للتنفيذ الجبري وقرارات اختصاص محددة. حدد الأثر الفعلي للمنطوق قبل اعتبار توجيه أثناء الدعوى قابلاً لطعن مستقل."
    },
    "sources": [
      {
        "en": "Federal Civil Procedure Code, Article 152",
        "ar": "قانون الإجراءات المدنية الاتحادي، المادة 152",
        "href": "https://uaelegislation.gov.ae/en/legislations/1602/download"
      }
    ],
    "includeOnServicePage": false
  },
  {
    "region": "uae",
    "service": "consumer-ecommerce",
    "problems": [
      "defective-product-and-consumer-claim",
      "online-purchase-refund-dispute"
    ],
    "id": "uae-final-defect-remedies",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "What remedies does the federal Consumer Protection Law provide for a defective product or service?",
      "a": "Article 12 requires the provider to repair, replace or take back the goods and refund the price, or re-perform the service without charge, subject to the executive regulations. Identify the actual defect, supplier and applicable conditions rather than assuming every complaint gives an unrestricted choice of refund. Keep the invoice, warranty and repair record."
    },
    "ar": {
      "q": "ما معالجات عيب السلعة أو الخدمة في قانون حماية المستهلك الاتحادي؟",
      "a": "تلزم المادة 12 المزود بالإصلاح أو الاستبدال أو استرجاع السلعة ورد قيمتها، أو إعادة أداء الخدمة دون مقابل، وفق اللائحة التنفيذية. حدد العيب والمزود والشروط المنطبقة، ولا تفترض أن كل شكوى تمنح اختياراً مطلقاً لرد الثمن. احتفظ بالفاتورة والضمان وسجل الإصلاح."
    },
    "sources": [
      {
        "en": "Consumer Protection Law, Article 12",
        "ar": "قانون حماية المستهلك، المادة 12",
        "href": "https://www.uaelegislation.gov.ae/en/legislations/1455/download"
      }
    ],
    "includeOnServicePage": true
  },
  {
    "region": "uae",
    "service": "consumer-ecommerce",
    "problems": [
      "defective-product-and-consumer-claim"
    ],
    "id": "uae-final-repeated-defect",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "What if the same substantial product defect keeps recurring?",
      "a": "Article 13 addresses the same defect occurring three times in the first year after receipt and fundamentally affecting the product’s functioning. It requires replacement with a new product of the same type and specifications without cost, or taking it back and refunding its value, under the executive rules. Preserve each repair and recurrence date; unrelated faults or later years need separate assessment."
    },
    "ar": {
      "q": "ماذا إذا تكرر العيب الجوهري نفسه في السلعة؟",
      "a": "تعالج المادة 13 تكرر العيب نفسه ثلاث مرات خلال السنة الأولى من الاستلام مع تأثير جوهري في جودة الأداء الوظيفي. وتوجب الاستبدال بسلعة جديدة من النوع والمواصفات نفسها دون تكلفة أو الاسترجاع ورد القيمة وفق الأحكام التنفيذية. احفظ تواريخ كل إصلاح وتكرار؛ وتُراجع الأعطال المختلفة أو السنوات التالية مستقلة."
    },
    "sources": [
      {
        "en": "Consumer Protection Law, Article 13",
        "ar": "قانون حماية المستهلك، المادة 13",
        "href": "https://www.uaelegislation.gov.ae/en/legislations/1455/download"
      }
    ],
    "includeOnServicePage": false
  },
  {
    "region": "uae",
    "service": "employment-labour",
    "problems": [
      "delayed-or-unpaid-salary",
      "wrongful-termination-and-labour-complaint",
      "end-of-service-benefits-and-final-settlement-dispute",
      "commission-and-bonus-payment-dispute"
    ],
    "id": "uae-final-labour-decision-challenge",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Which court reviews a MOHRE decision on an individual labour claim?",
      "a": "Under Article 54 as replaced by Decree-Law 9/2024, MOHRE decides claims up to AED 50,000 and disputes about non-compliance with its earlier amicable settlement regardless of value. Either party may bring the dispute to the competent Court of First Instance within 15 working days of notification or service. Filing suspends that decision’s execution; the court’s judgment under this procedure is final. This is the federal employment-law route, not a universal rule for domestic workers or DIFC/ADGM employment."
    },
    "ar": {
      "q": "أي محكمة تنظر الاعتراض على قرار الوزارة في مطالبة عمالية فردية؟",
      "a": "وفق المادة 54 المستبدلة بالمرسوم بقانون 9 لسنة 2024، تفصل الوزارة في المطالبات التي لا تجاوز 50 ألف درهم، وفي عدم الالتزام بتسويتها الودية السابقة مهما كانت القيمة. يجوز لأي طرف إقامة الدعوى أمام المحكمة الابتدائية المختصة خلال 15 يوم عمل من إخطاره بالقرار أو إعلانه به. توقف إقامة الدعوى تنفيذ القرار، ويكون حكم المحكمة في هذا المسار نهائياً. هذا مسار قانون العمل الاتحادي، وليس قاعدة عامة للعمالة المساعدة أو عمل مركزي دبي المالي وأبوظبي العالمي."
    },
    "sources": [
      {
        "en": "Decree-Law 9/2024, replacement Article 54 (Arabic operative text)",
        "ar": "المرسوم بقانون 9 لسنة 2024، النص العربي المستبدل للمادة 54",
        "href": "https://uaelegislation.gov.ae/ar/constitution/modifications/1760/download"
      }
    ],
    "includeOnServicePage": true
  }
];
