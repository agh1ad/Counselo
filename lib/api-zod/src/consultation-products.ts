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
  priceEn: "Online consultations have published fixed fees by country and legal category: SAR in Saudi Arabia, AED in the UAE and USD in Syria. The same CounselO team handles representation and other legal work, with separate fees agreed when requested.",
  priceAr: "للاستشارات الأونلاين رسوم ثابتة منشورة بحسب الدولة والمجال القانوني: بالريال السعودي في السعودية، والدرهم الإماراتي في الإمارات، والدولار الأمريكي في سوريا. ويتولى فريق كاونسلو نفسه التمثيل والأعمال القانونية الأخرى بأتعاب منفصلة نتفق عليها عند طلبها.",
  paymentEn: "The available payment method is confirmed with the scope and fee; this form does not take payment.",
  paymentAr: "تُحدد طريقة الدفع مع النطاق والرسوم؛ ولا يتضمن هذا النموذج تحصيل الدفع.",
  followUpEn: "The consultation fee includes discussion and questions on the same consultation topic. We agree any additional work and its fees before proceeding.",
  followUpAr: "تشمل رسوم الاستشارة المناقشة والأسئلة ضمن موضوع الاستشارة نفسه. ونتفق معك على أي عمل إضافي وأتعابه قبل البدء به.",
  deliveryEn: "The primary consultation is a detailed written professional response delivered through email or WhatsApp. Discussion and questions on the same consultation topic are included; voice messages, a voice call or video call may be added when they improve the assessment and are agreed in advance.",
  deliveryAr: "المخرج الأساسي للاستشارة هو رد مهني مكتوب ومفصل يُسلّم عبر البريد الإلكتروني أو واتساب. وتشمل الاستشارة المناقشة والإجابة عن الأسئلة ضمن موضوعها نفسه، ويمكن إضافة رسائل صوتية أو مكالمة صوتية أو مرئية عندما تساعد في التقييم وبعد الاتفاق عليها.",
  monitoringEn: "Follow-up monitoring is included only when stated in the agreed scope, such as tracking an agreed response, deadline or next action; we confirm the team’s responsibilities before starting and do not promise a legal result.",
  monitoringAr: "تُدرج متابعة المسألة فقط إذا نص عليها النطاق المتفق عليه، مثل متابعة رد أو مهلة أو خطوة متفق عليها؛ ونؤكد مسؤوليات الفريق قبل البدء دون ضمان نتيجة قانونية.",
  representationEn: "The same CounselO team handles your online communication, consultation, court representation, filing and other regulated work through its appropriately licensed members. Representation has separate fees, agreed when requested, with the scope and authorisation confirmed before we act.",
  representationAr: "يتولى فريق كاونسلو نفسه التواصل معك أونلاين والاستشارة والتمثيل أمام المحاكم والإيداع والأعمال المنظمة مهنياً بأعضائه المرخّصين في الدولة المعنية. وللتمثيل أتعاب تُتفق عند طلبه، مع تأكيد نطاق العمل والتفويض قبل مباشرته.",
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
    includesEn: ["Priority and deadline mapping", "Staged work plan", "Representation planning with our team"],
    includesAr: ["تحديد الأولويات والمواعيد", "خطة عمل مرحلية", "تخطيط التمثيل القانوني مع فريقنا"],
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
      "Discussion and questions about the same consultation topic",
      "Voice messages, voice call or video call when necessary and agreed",
      "Monitoring of the agreed consultation follow-up, response or next action",
      "Planning any needed court representation with the same CounselO team through its appropriately licensed members",
    ],
    includesAr: [
      "استشارة مهنية مكتوبة ومفصلة عبر البريد الإلكتروني أو واتساب",
      "المناقشة والإجابة عن الأسئلة ضمن موضوع الاستشارة نفسه",
      "رسائل صوتية أو مكالمة صوتية أو مرئية عند الحاجة وبعد الاتفاق",
      "متابعة ما تم الاتفاق عليه من رد أو إجراء أو خطوة لاحقة",
      "تخطيط التمثيل المطلوب أمام المحكمة مع فريق كاونسلو نفسه بأعضائه المرخّصين في الدولة المعنية",
    ],
    bestForEn: "You want a complete legal consultation package for a defined matter, with a written record and practical follow-through.",
    bestForAr: "إذا كنت تريد حزمة استشارة قانونية متكاملة لمسألة محددة مع مخرج مكتوب ومتابعة عملية.",
  },
];

export function getConsultationProduct(id: string): ConsultationProduct | undefined {
  return CONSULTATION_PRODUCTS.find((product) => product.id === id);
}
