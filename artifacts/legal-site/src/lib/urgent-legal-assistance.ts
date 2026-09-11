import type { Region } from "@workspace/api-zod/browser";

export const URGENT_SLUG = "urgent-legal-assistance";
export const URGENT_UPDATED_AT = "2026-09-11";
export const urgentPath = (ar: boolean, region?: Region) => region
  ? `/${region}${ar ? "/ar" : ""}/services/${URGENT_SLUG}`
  : `${ar ? "/ar" : ""}/${URGENT_SLUG}`;

export const urgentCopy = {
  en: {
    title: "Urgent Legal Assistance",
    eyebrow: "When your legal matter cannot wait",
    intro: "Need a legal document urgently? CounselO prepares legal memoranda and statements of claim, and reviews existing contracts or agreements for individuals and businesses, using the documents you provide.",
    timing: "The 3-hour delivery target applies to the agreed memorandum, statement of claim or contract review—not an acknowledgement. The clock starts only after we accept the request, check that the documents are complete and confirm payment. We agree the delivery date, time and time zone before payment.",
    whatsapp: "Request urgent help on WhatsApp",
    email: "Send an urgent request by email",
    scopeTitle: "What you receive",
    services: [
      ["Legal memorandum", "A written memorandum addressing the agreed legal questions, the relevant facts and documents, and the conclusions or points requiring clarification. Send the case papers, relevant correspondence and the purpose of the memorandum. Its scope and language are confirmed before payment."],
      ["Statement of claim", "A draft statement of claim setting out the parties, material facts, requested relief and supporting documents within the agreed scope. Send the parties’ details, a dated account of events and the evidence for each request. Delivery does not include filing the claim or attending court."],
      ["Contract or agreement review", "Written observations on an existing contract or agreement, identifying material risks, unclear terms and points to clarify before signing. Send the full draft, schedules and relevant correspondence. We agree whether comments are delivered within the document or in a separate review; creating a new agreement is excluded."],
    ],
    stepsTitle: "When does the 3-hour delivery target begin?",
    steps: [
      ["1. Request received", "Send the service you need, your jurisdiction and deadline. Your message alone does not confirm acceptance or start the clock."],
      ["2. Documents checked", "We check the supplied material for completeness and identify any missing information."],
      ["3. Urgent request accepted", "We confirm acceptance, the responsible professional, scope, delivery time and urgent fee."],
      ["4. Payment confirmed", "Pay the agreed fee after acceptance and document checks."],
      ["5. 3-hour delivery target begins", "Once those requirements are met, the target is delivery of the agreed document or review within 3 hours."],
    ],
    documentsTitle: "A useful first message",
    template: "Urgent legal assistance request\nName / company:\nCountry and city:\nCourt / authority and case number, if any:\nOther parties (for conflict checking):\nBrief matter summary:\nRequested assistance / deliverable:\nOfficial deadline (date, time, time zone):\nRequested delivery time (date, time, time zone):\nAvailable documents:\nPreferred language and contact details:",
    privacy: "Send relevant, complete and readable documents that you are entitled to share. Flag missing information and ask about the transfer method before sending sensitive material.",
    coverageTitle: "Requests from every jurisdiction",
    coverage: "Requests may concern any country. Specify the jurisdiction and relevant court or authority so we can confirm our capability before accepting the task.",
    feesTitle: "Urgent fees differ from standard fees",
    fees: "Urgent fees differ from standard fees and reflect the scope, document volume, complexity and deadline. Your quote includes revisions and discussion of the delivered work within the agreed scope.",
    faqTitle: "Questions about urgent legal help",
    faqs: [
      ["Is the three-hour target for delivery or an acknowledgement?", "Delivery of the agreed legal memorandum, statement of claim or contract review. It begins only after acceptance, complete documents and confirmed payment."],
      ["What if my deadline is less than three hours away?", "Send the exact deadline and time zone before paying. We assess feasibility and confirm what we can accept; a message does not reserve availability or extend an official deadline."],
      ["Can I submit a request on Thursday or Friday?", "Requests are accepted at any time Saturday–Thursday. We do not accept new urgent requests on Friday. For a Thursday request, agree the exact delivery date and time before payment."],
      ["Can I discuss the work or request revisions after delivery?", "Yes. The agreed fee includes revisions within scope and discussion or questions about the delivered work. New matters and work beyond that scope are agreed separately."],
      ["Will you file the document or represent me in court?", "No. This service covers document preparation or review only. It excludes filing, attending hearings, monitoring court deadlines and creating new contracts."],
      ["How do I send my documents?", "Contact us through WhatsApp or email to agree the transfer method, then attach the files there. Include relevant schedules and correspondence. Website contact links do not attach files automatically."],
    ],
    relatedTitle: "Explore the relevant legal service",
    availability: "Requests welcome at any time Saturday–Thursday. No new urgent requests on Friday.",
    boundary: "Our response is prepared in light of the documents and information supplied by the client. This service does not establish court representation and does not include filing, attendance or monitoring judicial deadlines. We assume no responsibility for those excluded tasks, court outcomes, or consequences arising from incomplete or inaccurate client material, subject to any liability that cannot lawfully be excluded.",
    handlingTitle: "Who handles your request",
    handling: "We confirm the assigned professional and their role before acceptance. You may ask about their relevant qualifications and experience in the jurisdiction concerned.",
    deliveryTitle: "Delivery, included revisions and follow-up",
    delivery: "We agree the language, file format and delivery channel in advance. Revisions and questions about the delivered work are included within scope. A new matter or additional work outside that scope requires a separate agreement.",
  },
  ar: {
    title: "المساعدة القانونية العاجلة",
    eyebrow: "عندما لا تحتمل مسألتك القانونية الانتظار",
    intro: "تحتاج إلى مستند قانوني بصورة عاجلة؟ تُعد كاونسلو المذكرات القانونية ولوائح الدعاوى، وتدقق العقود والاتفاقيات القائمة للأفراد والشركات، استناداً إلى المستندات التي تقدمها.",
    timing: "هدف التسليم خلال ٣ ساعات يخص المذكرة أو لائحة الدعوى أو تدقيق العقد المتفق عليه، وليس مجرد إشعار باستلام الطلب. يبدأ الوقت فقط بعد قبول الطلب والتحقق من اكتمال المستندات وتأكيد السداد. نتفق على تاريخ وساعة التسليم والمنطقة الزمنية قبل الدفع.",
    whatsapp: "اطلب مساعدة عاجلة عبر واتساب",
    email: "أرسل طلبك العاجل بالبريد الإلكتروني",
    scopeTitle: "ما الذي تتسلمه من الخدمة؟",
    services: [
      ["إعداد مذكرة قانونية", "مذكرة مكتوبة تتناول المسائل القانونية المتفق عليها والوقائع والمستندات ذات الصلة، مع بيان الخلاصة والنقاط التي تحتاج إلى استيضاح. أرسل أوراق المسألة والمراسلات المرتبطة بها والغرض من المذكرة. يُؤكد نطاقها ولغتها قبل السداد."],
      ["إعداد لائحة دعوى", "مسودة لائحة دعوى تتضمن بيانات الأطراف والوقائع الجوهرية والطلبات والمستندات المؤيدة ضمن النطاق المتفق عليه. أرسل بيانات الأطراف وتسلسلاً مؤرخاً للوقائع وأدلة كل طلب. لا يشمل التسليم إيداع اللائحة أو حضور الجلسات."],
      ["تدقيق عقد أو اتفاقية", "ملاحظات مكتوبة على عقد أو اتفاقية قائمة، تبين المخاطر الجوهرية والبنود غير الواضحة والنقاط التي تحتاج إلى استيضاح قبل التوقيع. أرسل المسودة كاملة وملاحقها والمراسلات ذات الصلة. نتفق على تقديم الملاحظات داخل المستند أو في تقرير مستقل؛ ولا تشمل الخدمة إنشاء اتفاقية جديدة."],
    ],
    stepsTitle: "متى يبدأ هدف التسليم خلال ٣ ساعات؟",
    steps: [
      ["١. استلام الطلب", "أرسل الخدمة المطلوبة والاختصاص والموعد. رسالتك وحدها لا تعني قبول الطلب ولا يبدأ بها احتساب الوقت."],
      ["٢. فحص المستندات", "نتحقق من اكتمال المواد المقدمة ونحدد أي معلومات ناقصة."],
      ["٣. قبول الطلب المستعجل", "نؤكد قبول المهمة والمسؤول عنها ونطاقها وموعد التسليم وأتعاب الطوارئ."],
      ["٤. تأكيد السداد", "تُسدّد الأتعاب المتفق عليها بعد القبول وفحص المستندات."],
      ["٥. بدء هدف التسليم خلال ٣ ساعات", "بعد استيفاء هذه المتطلبات، نستهدف تسليم المستند أو التدقيق المتفق عليه خلال ٣ ساعات."],
    ],
    documentsTitle: "ما الذي تكتبه في رسالتك الأولى؟",
    template: "طلب مساعدة قانونية عاجلة\nالاسم / الشركة:\nالدولة والمدينة:\nالمحكمة / الجهة ورقم القضية إن وجد:\nالأطراف الأخرى للتحقق من تعارض المصالح:\nملخص المسألة:\nالمساعدة / المخرج المطلوب:\nالموعد الرسمي (التاريخ والساعة والمنطقة الزمنية):\nموعد التسليم المطلوب (التاريخ والساعة والمنطقة الزمنية):\nالمستندات المتاحة:\nاللغة المفضلة وبيانات التواصل:",
    privacy: "أرسل المستندات اللازمة كاملة ومقروءة، وتأكد من حقك في مشاركتها. وضّح أي معلومات ناقصة واستفسر عن وسيلة النقل قبل إرسال مواد حساسة.",
    coverageTitle: "نستقبل الطلبات من جميع الاختصاصات القضائية",
    coverage: "يمكن أن يتعلق طلبك بأي دولة. حدد الاختصاص والمحكمة أو الجهة ذات الصلة حتى نؤكد القدرة على تنفيذ المهمة قبل قبولها.",
    feesTitle: "أتعاب الطوارئ تختلف عن أتعاب الحالة العادية",
    fees: "تختلف أتعاب الطوارئ عن الأتعاب العادية بحسب النطاق وحجم المستندات والتعقيد والمهلة. يشمل العرض التعديلات ومناقشة العمل المسلّم ضمن النطاق المتفق عليه.",
    faqTitle: "أسئلة عن الخدمات القانونية العاجلة",
    faqs: [
      ["هل هدف الساعات الثلاث للتسليم أم لتأكيد الاستلام؟", "لتسليم المذكرة القانونية أو لائحة الدعوى أو تدقيق العقد المتفق عليه. يبدأ فقط بعد قبول الطلب واكتمال المستندات وتأكيد السداد."],
      ["ماذا لو بقي على الموعد أقل من ثلاث ساعات؟", "أرسل الموعد الدقيق والمنطقة الزمنية قبل الدفع. نقيّم إمكان التنفيذ ونؤكد ما يمكن قبوله؛ الرسالة لا تحجز التوافر ولا تمدد أي ميعاد رسمي."],
      ["هل يمكن تقديم الطلب يوم الخميس أو الجمعة؟", "نستقبل الطلبات في أي وقت من السبت إلى الخميس، ولا نستقبل طلبات مستعجلة جديدة يوم الجمعة. لطلب الخميس، اتفق معنا على تاريخ وساعة التسليم قبل السداد."],
      ["هل يمكن مناقشة العمل أو طلب تعديلات بعد التسليم؟", "نعم. تشمل الأتعاب المتفق عليها التعديلات ضمن النطاق ومناقشة العمل المسلّم والأسئلة المتعلقة به. تُتفق المسائل الجديدة والأعمال خارج النطاق بصورة مستقلة."],
      ["هل تتولون الإيداع أو التمثيل أمام القضاء؟", "لا. تقتصر الخدمة على إعداد المستند أو تدقيقه. لا تشمل الإيداع أو حضور الجلسات أو متابعة المواعيد القضائية أو إنشاء عقود جديدة."],
      ["كيف أرسل المستندات؟", "تواصل عبر واتساب أو البريد للاتفاق على وسيلة النقل، ثم أرفق الملفات هناك مع الملاحق والمراسلات ذات الصلة. روابط الموقع لا ترفق الملفات تلقائياً."],
    ],
    relatedTitle: "استكشف الخدمة القانونية ذات الصلة",
    availability: "نستقبل الطلبات في أي وقت من السبت إلى الخميس. لا نستقبل طلبات مستعجلة جديدة يوم الجمعة.",
    boundary: "يُعد الرد على ضوء المستندات والمعلومات المقدمة من العميل. لا تنشئ هذه الخدمة تمثيلاً أمام القضاء، ولا تشمل الإيداع أو حضور الجلسات أو متابعة المواعيد القضائية. لا نتحمل مسؤولية هذه الأعمال المستبعدة أو نتائج التقاضي أو الآثار الناشئة عن نقص مستندات العميل أو عدم صحتها، مع مراعاة أي مسؤولية لا يجوز استبعادها بموجب القانون.",
    handlingTitle: "من يتولى طلبك؟",
    handling: "نؤكد المهني المكلف بالمهمة وصفته قبل قبول الطلب. يمكنك الاستفسار عن مؤهلاته وخبرته ذات الصلة بالاختصاص المعني.",
    deliveryTitle: "التسليم والتعديلات المشمولة ومناقشة الرد",
    delivery: "نتفق مسبقاً على اللغة وصيغة الملف ووسيلة التسليم. تشمل الأتعاب التعديلات والأسئلة المتعلقة بالعمل المسلّم ضمن نطاقه. تحتاج المسألة الجديدة أو الأعمال الإضافية خارج النطاق إلى اتفاق مستقل.",
  },
} as const;

export const urgentJurisdictions = {
  sa: {
    en: ["Saudi Arabia", "For a Saudi matter, identify the city, court or authority, case stage and the exact date and time shown on the notice. If there is a digital filing or hearing invitation, share its details with the team without sharing passwords or verification codes. Specify whether you need a memorandum, a statement of claim or review of an existing contract. Filing and appearances are excluded."],
    ar: ["السعودية", "للمسألة السعودية، حدد المدينة والمحكمة أو الجهة ومرحلة القضية والتاريخ والساعة الواردين في الإخطار. إذا كان لديك إشعار إيداع إلكتروني أو دعوة جلسة، شارك تفاصيلها مع الفريق دون كلمات مرور أو رموز تحقق. حدد هل المطلوب مذكرة أم لائحة دعوى أم تدقيق عقد قائم. لا تشمل الخدمة الإيداع أو الحضور."],
  },
  syr: {
    en: ["Syria", "For a Syrian matter, identify the governorate, court or authority, case number and how and when the notice was received. Provide readable copies of the papers and identify the requested memorandum, statement of claim or contract review. Filing and attendance are excluded. Tell us where you are located if instructions or documents must be coordinated from abroad."],
    ar: ["سوريا", "للمسألة السورية، حدد المحافظة والمحكمة أو الجهة ورقم القضية وكيف ومتى وصل التبليغ. أرسل نسخاً مقروءة من الأوراق وحدد المذكرة أو لائحة الدعوى أو تدقيق العقد المطلوب. لا تشمل الخدمة الإيداع أو الحضور. اذكر مكان إقامتك إذا كان تنسيق التعليمات أو المستندات سيجري من الخارج."],
  },
  uae: {
    en: ["UAE", "For a UAE matter, identify the emirate and the named court, authority or free zone, including DIFC or ADGM where relevant. Send the contract's governing-law and dispute-resolution clauses if available. State the document language and whether you need a memorandum, a statement of claim or review of an existing agreement."],
    ar: ["الإمارات", "للمسألة الإماراتية، حدد الإمارة والمحكمة أو الجهة أو المنطقة الحرة، بما فيها مركز دبي المالي العالمي أو سوق أبوظبي العالمي عند الصلة. أرسل بنود القانون الواجب التطبيق وتسوية المنازعات إن توفرت. حدد لغة المستند وهل المطلوب مذكرة أم لائحة دعوى أم تدقيق اتفاقية قائمة."],
  },
} as const;

export function urgentContactLinks(ar: boolean, country?: string) {
  const copy = urgentCopy[ar ? "ar" : "en"];
  const body = country ? `${copy.template}\n${ar ? "اختصاص الطلب" : "Request jurisdiction"}: ${country}` : copy.template;
  return {
    whatsapp: `https://wa.me/966594850247?text=${encodeURIComponent(body)}`,
    email: `mailto:info@counselo-legal.com?subject=${encodeURIComponent(copy.title)}&body=${encodeURIComponent(body)}`,
  };
}
