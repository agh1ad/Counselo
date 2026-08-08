export type ConsultationProductId =
  | "case-assessment"
  | "focused-consultation"
  | "document-review"
  | "matter-roadmap"
  | "comprehensive-consultation";

export type ConsultationProduct = {
  id: ConsultationProductId;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  includesEn: string[];
  includesAr: string[];
  bestForEn: string;
  bestForAr: string;
};

export const CONSULTATION_OPERATING_POLICY = {
  sessionEn: "Format and session length are confirmed after the initial study.",
  sessionAr: "يُحدد شكل الاستشارة ومدتها بعد الدراسة الأولية.",
  bookingEn: "No automatic calendar slot is promised; the appropriate time is agreed after scope review.",
  bookingAr: "لا يُحجز موعد تلقائياً؛ يُتفق على الوقت المناسب بعد مراجعة النطاق.",
  priceEn: "No fixed price is published. The fee is agreed after the initial study of the request and before paid work begins.",
  priceAr: "لا يُنشر سعر ثابت. تُتفق الرسوم بعد الدراسة الأولية للطلب وقبل بدء العمل المدفوع.",
  paymentEn: "The available payment method is confirmed with the scope and fee; this form does not take payment.",
  paymentAr: "تُحدد طريقة الدفع مع النطاق والرسوم؛ ولا يتضمن هذا النموذج تحصيل الدفع.",
  followUpEn: "Follow-up is included only when stated in the agreed scope; additional work is confirmed separately.",
  followUpAr: "تُدرج المتابعة فقط إذا نص عليها النطاق المتفق عليه؛ ويُؤكد أي عمل إضافي بشكل منفصل.",
  deliveryEn: "The primary consultation is a detailed written professional response delivered through email or WhatsApp. Relevant clarification questions are answered within the agreed scope; voice messages, a voice call or video call may be added when they improve the assessment and are agreed in advance.",
  deliveryAr: "المخرج الأساسي للاستشارة هو رد مهني مكتوب ومفصل يُسلّم عبر البريد الإلكتروني أو واتساب. تُجاب الأسئلة التوضيحية ذات الصلة ضمن النطاق المتفق عليه، ويمكن إضافة رسائل صوتية أو مكالمة صوتية أو مرئية عندما تساعد في التقييم وبعد الاتفاق عليها.",
  monitoringEn: "Follow-up monitoring is included only when stated in the agreed scope, such as tracking an agreed response, deadline or next action; it does not promise a legal result or replace a separate engagement.",
  monitoringAr: "تُدرج متابعة المسألة فقط إذا نص عليها النطاق المتفق عليه، مثل متابعة رد أو مهلة أو خطوة متفق عليها؛ ولا تضمن نتيجة قانونية ولا تحل محل تكليف مستقل.",
  representationEn: "Court representation, filing and other reserved work are separate and can be arranged through an appropriately licensed partner professional or cooperating office when requested or necessary.",
  representationAr: "التمثيل أمام المحاكم والإيداع والأعمال المحجوزة مهنياً منفصلة، ويمكن ترتيبها عبر شريك أو مكتب متعاون مرخص عند طلبها أو ضرورتها.",
  reschedulingEn: "Any rescheduling terms are confirmed with the agreed appointment or engagement.",
  reschedulingAr: "تُحدد شروط إعادة الجدولة مع الموعد أو التكليف المتفق عليه.",
} as const;

export const CONSULTATION_PRODUCTS: ConsultationProduct[] = [
  {
    id: "case-assessment",
    titleEn: "Initial Case Assessment",
    titleAr: "التقييم الأولي للمسألة",
    summaryEn: "A confidential first review to identify the jurisdiction, legal issue, urgency and sensible next step.",
    summaryAr: "مراجعة أولية سرية لتحديد الاختصاص والمسألة القانونية ودرجة الاستعجال والخطوة المناسبة التالية.",
    includesEn: ["Fact and document intake", "Issue and jurisdiction check", "Recommended next step and scope"],
    includesAr: ["استلام الوقائع والمستندات", "تحديد المسألة والاختصاص", "الخطوة التالية والنطاق المقترح"],
    bestForEn: "You are unsure what kind of legal help you need.",
    bestForAr: "إذا لم تكن متأكداً من نوع المساعدة القانونية التي تحتاجها.",
  },
  {
    id: "focused-consultation",
    titleEn: "Focused Legal Consultation",
    titleAr: "الاستشارة القانونية المركزة",
    summaryEn: "A scoped consultation addressing a defined legal question after the facts and boundaries are confirmed.",
    summaryAr: "استشارة محددة تعالج سؤالاً قانونياً واضحاً بعد تأكيد الوقائع والنطاق.",
    includesEn: ["Defined question or issue", "Legal options and risks", "Practical next-step guidance"],
    includesAr: ["سؤال أو مسألة محددة", "الخيارات والمخاطر القانونية", "إرشاد عملي للخطوة التالية"],
    bestForEn: "You have a specific question and need an informed route forward.",
    bestForAr: "إذا كان لديك سؤال محدد وتحتاج إلى مسار عملي مبني على فهم قانوني.",
  },
  {
    id: "document-review",
    titleEn: "Document Review",
    titleAr: "مراجعة المستندات",
    summaryEn: "A review of a defined document set to identify legal risks, missing protections and priority changes.",
    summaryAr: "مراجعة مجموعة مستندات محددة لتحديد المخاطر والثغرات وأولويات التعديل.",
    includesEn: ["Document and clause review", "Risk and gap summary", "Amendment or response recommendations"],
    includesAr: ["مراجعة المستندات والبنود", "ملخص المخاطر والثغرات", "توصيات التعديل أو الرد"],
    bestForEn: "You have a contract, notice, decision or case file to understand before acting.",
    bestForAr: "إذا كان لديك عقد أو إنذار أو قرار أو ملف قضية تريد فهمه قبل اتخاذ إجراء.",
  },
  {
    id: "matter-roadmap",
    titleEn: "Matter Roadmap",
    titleAr: "خريطة مسار المسألة",
    summaryEn: "A staged plan for a complex matter involving multiple documents, parties, authorities or deadlines.",
    summaryAr: "خطة مرحلية لمسألة معقدة تشمل مستندات أو أطرافاً أو جهات أو مواعيد متعددة.",
    includesEn: ["Priority and deadline mapping", "Staged work plan", "Representation or specialist coordination assessment"],
    includesAr: ["تحديد الأولويات والمواعيد", "خطة عمل مرحلية", "تقييم الحاجة إلى التمثيل أو التنسيق المتخصص"],
    bestForEn: "You need a structured plan before committing to a larger engagement.",
    bestForAr: "إذا كنت تحتاج إلى خطة منظمة قبل الالتزام بتكليف أوسع.",
  },
  {
    id: "comprehensive-consultation",
    titleEn: "Comprehensive Online Legal Consultation",
    titleAr: "الاستشارة القانونية الإلكترونية المتكاملة",
    summaryEn: "A complete, scoped consultation combining detailed written legal analysis, relevant clarifications, optional voice or video support, and agreed follow-up monitoring—without requiring a physical office visit.",
    summaryAr: "استشارة متكاملة ومحددة النطاق تجمع بين التحليل القانوني المكتوب والمفصل، والإجابة عن الاستفسارات ذات الصلة، والدعم الصوتي أو المرئي عند الحاجة، والمتابعة المتفق عليها دون الحاجة إلى زيارة مكتب فعلي.",
    includesEn: [
      "Detailed professional written consultation delivered by email or WhatsApp",
      "Clarification questions and relevant answers within the agreed scope",
      "Voice messages, voice call or video call when necessary and agreed",
      "Monitoring of the agreed consultation follow-up, response or next action",
      "Separate assessment and coordination of court representation if requested or necessary",
    ],
    includesAr: [
      "استشارة مهنية مكتوبة ومفصلة عبر البريد الإلكتروني أو واتساب",
      "الإجابة عن الأسئلة التوضيحية ذات الصلة ضمن النطاق المتفق عليه",
      "رسائل صوتية أو مكالمة صوتية أو مرئية عند الحاجة وبعد الاتفاق",
      "متابعة ما تم الاتفاق عليه من رد أو إجراء أو خطوة لاحقة",
      "تقييم وترتيب التمثيل أمام المحكمة بشكل منفصل عند الطلب أو الضرورة",
    ],
    bestForEn: "You want a complete legal consultation package for a defined matter, with a written record and practical follow-through.",
    bestForAr: "إذا كنت تريد حزمة استشارة قانونية متكاملة لمسألة محددة مع مخرج مكتوب ومتابعة عملية.",
  },
];

export function getConsultationProduct(id: string): ConsultationProduct | undefined {
  return CONSULTATION_PRODUCTS.find((product) => product.id === id);
}
