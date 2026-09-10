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
    intro: "An unexpected deadline should not leave you facing a legal matter alone. CounselO accepts urgent requests from individuals and businesses for three services only: preparing a legal memorandum, preparing a statement of claim, and reviewing an existing contract or agreement. Contact us through WhatsApp or email.",
    timing: "For an accepted request, the target is to deliver the agreed response within 3 hours after both the complete documents and payment of the agreed fees have been received. If payment follows document delivery, the target starts at payment. We confirm feasibility and timing before payment.",
    whatsapp: "Request urgent help on WhatsApp",
    email: "Send an urgent request by email",
    scopeTitle: "What do you need before the deadline?",
    services: [["Prepare a legal memorandum", "Preparation of a legal memorandum based on the facts and documents you provide. Send the relevant case papers, your questions and the required deadline."], ["Prepare a statement of claim", "Preparation of a statement of claim based on your documents and the agreed scope. Send the parties’ details, facts, requested relief and supporting evidence. This service does not include filing or court representation."], ["Review a contract or agreement", "Review of an existing contract or agreement, with comments on its terms and risks based on the supplied documents. Send the existing draft and any relevant attachments. Creating a new contract or agreement is outside this urgent service."]],
    stepsTitle: "From your first message to the agreed legal response",
    steps: [["1. Tell us the matter and the clock", "Contact us on WhatsApp or by email. State the country, court or authority if known, a short summary, the assistance required and your requested response date, time and time zone. Distinguish your preferred delivery time from any official deadline."], ["2. Share the relevant documents", "List the documents available in your first message. We confirm the appropriate channel for copies through WhatsApp, email or an agreed transfer method. Attach readable contracts, notices, case papers and key evidence there; website contact links do not upload files automatically."], ["3. Agree scope, urgent fees and timing", "We confirm the requested memorandum, statement of claim or review, conflicts, jurisdiction and feasibility. Urgent fees differ from standard fees. We accept urgent cases Saturday through Thursday only, never Friday. Confirm the delivery date, time and time zone before payment."], ["4. Complete documents and payment", "For an accepted request, our target is delivery of the agreed response within 3 hours after both complete documents and payment have been received. If payment follows document delivery, the target starts at payment. The response is based on your supplied material and excludes court representation."]],
    documentsTitle: "A useful first message",
    template: "Urgent legal assistance request\nName / company:\nCountry and city:\nCourt / authority and case number, if any:\nOther parties (for conflict checking):\nBrief matter summary:\nRequested assistance / deliverable:\nOfficial deadline (date, time, time zone):\nRequested response or delivery time (date, time, time zone):\nAvailable documents:\nPreferred language and contact details:",
    privacy: "Send only relevant information and documents you are entitled to share. Ask about the transfer method before sending especially sensitive material. Our response is based on the documents and information you provide; you are responsible for their accuracy and completeness.",
    coverageTitle: "Requests from every jurisdiction",
    coverage: "You may submit a request concerning any jurisdiction. Specify the country and relevant court or authority so we can confirm whether we can undertake the requested document preparation or review. This urgent service does not include court representation, filing, attendance or case management.",
    feesTitle: "Urgent fees differ from standard fees",
    fees: "Fees for urgent work differ from fees for an ordinary case. They depend on the requested document, volume of material, complexity, jurisdiction and urgency. We agree the fee and scope before payment. Additional work requires a separate agreement.",
    faqTitle: "Questions about urgent legal help",
    faqs: [["When does the 3-hour target begin?", "For an accepted request, the delivery target begins when both complete documents and the agreed payment have been received. If you deliver the documents first and then pay, the target begins at payment. We confirm feasibility and the delivery time before payment."], ["Which urgent services can I request?", "Three services only: preparation of a legal memorandum, preparation of a statement of claim, or review of an existing contract or agreement. New contract drafting and court representation are not included."], ["Do you accept urgent cases on Friday?", "No. Urgent cases are accepted Saturday through Thursday only. No urgent cases are accepted on Friday. Confirm availability and the exact delivery date, time and time zone with the team before payment."], ["Are urgent fees the same as ordinary fees?", "No. Urgent fees differ from standard fees and are agreed according to the scope, document volume, complexity and urgency before payment."], ["What is the response based on, and will you represent me in court?", "The response relies on the documents and information you supply. You are responsible for their accuracy and completeness. We do not represent you in court under this service or handle filing, attendance or judicial deadlines. The limits of responsibility are described in the fees and scope section, subject to liability that cannot lawfully be excluded."], ["Can I apply from another country and send documents electronically?", "Yes. Specify the jurisdiction and list your documents through WhatsApp or email. We confirm capability, scope and the transfer method before acceptance. Attach the agreed files in the conversation or email; the website links do not attach files automatically."]],
    relatedTitle: "Explore the relevant legal service",
    availability: "Urgent requests are accepted Saturday through Thursday only. We do not accept any urgent cases on Friday. Availability and the delivery date, time and time zone are confirmed before payment.",
    boundary: "Our response is prepared in light of the documents and information supplied by the client. This service does not establish court representation and does not include filing, attendance or monitoring judicial deadlines. We assume no responsibility for those excluded tasks, court outcomes, or consequences arising from incomplete or inaccurate client material, subject to any liability that cannot lawfully be excluded.",
  },
  ar: {
    title: "المساعدة القانونية العاجلة",
    eyebrow: "عندما لا تحتمل مسألتك القانونية الانتظار",
    intro: "لا ينبغي أن تواجه موعداً قانونياً مفاجئاً وحدك. تستقبل كاونسلو طلبات الأفراد والشركات العاجلة لثلاث خدمات فقط: إعداد مذكرة قانونية، وإعداد لائحة دعوى، وتدقيق عقد أو اتفاقية قائمة. تواصل معنا عبر واتساب أو البريد الإلكتروني.",
    timing: "للطلب المقبول، الوقت المستهدف لتسليم الرد المتفق عليه هو ٣ ساعات بعد اكتمال تسليم المستندات وسداد الأتعاب المتفق عليها معاً. إذا سُددت الأتعاب بعد تسليم المستندات، يبدأ احتساب الوقت من السداد. نؤكد إمكان التنفيذ والموعد قبل الدفع.",
    whatsapp: "اطلب مساعدة عاجلة عبر واتساب",
    email: "أرسل طلبك العاجل بالبريد الإلكتروني",
    scopeTitle: "ما الذي تحتاجه قبل انتهاء المهلة؟",
    services: [["إعداد مذكرة قانونية", "إعداد مذكرة قانونية على ضوء الوقائع والمستندات المقدمة من العميل. أرسل أوراق المسألة ذات الصلة والأسئلة المطلوب تناولها والموعد المطلوب."], ["إعداد لائحة دعوى", "إعداد لائحة دعوى استناداً إلى مستندات العميل والنطاق المتفق عليه. أرسل بيانات الأطراف والوقائع والطلبات والأدلة المؤيدة. لا تشمل الخدمة إيداع اللائحة أو التمثيل أمام القضاء."], ["تدقيق عقد أو اتفاقية", "تدقيق عقد أو اتفاقية قائمة وإبداء الملاحظات على البنود والمخاطر في ضوء المستندات المقدمة. أرسل المسودة القائمة ومرفقاتها ذات الصلة. لا تشمل الخدمة المستعجلة إنشاء عقد أو اتفاقية جديدة."]],
    stepsTitle: "من رسالتك الأولى إلى الرد القانوني المتفق عليه",
    steps: [["١. وضّح المسألة والوقت المتاح", "تواصل عبر واتساب أو البريد الإلكتروني، وحدد الدولة والمحكمة أو الجهة إن عُرفت، وملخص المسألة والمساعدة المطلوبة وتاريخ وساعة الرد المرغوب والمنطقة الزمنية. ميّز بين موعد التسليم الذي تفضله وأي ميعاد رسمي."], ["٢. شارك المستندات ذات الصلة", "اذكر المستندات المتاحة في رسالتك الأولى. نؤكد وسيلة إرسال النسخ عبر واتساب أو البريد الإلكتروني أو وسيلة نقل متفق عليها. أرفق هناك نسخاً مقروءة من العقود والإخطارات وأوراق القضية والأدلة الأساسية؛ روابط التواصل في الموقع لا ترفع الملفات تلقائياً."], ["٣. اتفق على النطاق وأتعاب الطوارئ والموعد", "نؤكد المذكرة أو لائحة الدعوى أو التدقيق المطلوب، ونتحقق من تعارض المصالح والاختصاص وإمكان التنفيذ. تختلف أتعاب الطوارئ عن الأتعاب العادية. نستقبل الحالات من السبت إلى الخميس فقط، ولا نستقبلها يوم الجمعة. نؤكد تاريخ وساعة التسليم والمنطقة الزمنية قبل السداد."], ["٤. أكمل المستندات وسداد الأتعاب", "للطلب المقبول، نستهدف تسليم الرد المتفق عليه خلال ٣ ساعات بعد اكتمال المستندات وسداد الأتعاب معاً. إذا جاء السداد بعد تسليم المستندات، يبدأ الوقت من السداد. يُعد الرد على ضوء مستنداتك ولا يشمل التمثيل أمام القضاء."]],
    documentsTitle: "ما الذي تكتبه في رسالتك الأولى؟",
    template: "طلب مساعدة قانونية عاجلة\nالاسم / الشركة:\nالدولة والمدينة:\nالمحكمة / الجهة ورقم القضية إن وجد:\nالأطراف الأخرى للتحقق من تعارض المصالح:\nملخص المسألة:\nالمساعدة / المخرج المطلوب:\nالموعد الرسمي (التاريخ والساعة والمنطقة الزمنية):\nموعد الرد أو التسليم المطلوب (التاريخ والساعة والمنطقة الزمنية):\nالمستندات المتاحة:\nاللغة المفضلة وبيانات التواصل:",
    privacy: "أرسل فقط المعلومات ذات الصلة والمستندات التي يحق لك مشاركتها. استفسر عن وسيلة النقل قبل إرسال مواد شديدة الحساسية. يُعد الرد على ضوء المستندات والمعلومات التي تقدمها، وتقع عليك مسؤولية صحتها واكتمالها.",
    coverageTitle: "نستقبل الطلبات من جميع الاختصاصات القضائية",
    coverage: "يمكن تقديم طلب يتعلق بأي اختصاص قضائي. حدد الدولة والمحكمة أو الجهة ذات الصلة حتى نؤكد إمكان إعداد المستند أو تدقيقه ضمن النطاق المطلوب. لا تشمل هذه الخدمة المستعجلة التمثيل أمام القضاء أو الإيداع أو حضور الجلسات أو متابعة القضية.",
    feesTitle: "أتعاب الطوارئ تختلف عن أتعاب الحالة العادية",
    fees: "تختلف أتعاب الخدمة المستعجلة عن أتعاب الحالة العادية. تُحدد بحسب المستند المطلوب وحجم الأوراق وتعقيد المسألة والاختصاص ودرجة الاستعجال. نتفق معك على الأتعاب والنطاق قبل السداد، ويحتاج أي عمل إضافي إلى اتفاق مستقل.",
    faqTitle: "أسئلة عن الخدمات القانونية العاجلة",
    faqs: [["متى يبدأ احتساب الوقت المستهدف البالغ ٣ ساعات؟", "للطلب المقبول، يبدأ الوقت المستهدف لتسليم الرد بعد اكتمال تسليم المستندات وسداد الأتعاب معاً. إذا سلمت المستندات أولاً ثم سددت الأتعاب، يبدأ الاحتساب من السداد. نؤكد إمكان التنفيذ وموعد التسليم قبل الدفع."], ["ما الحالات التي تشملها الخدمة المستعجلة؟", "ثلاث خدمات فقط: إعداد مذكرة قانونية، وإعداد لائحة دعوى، وتدقيق عقد أو اتفاقية قائمة. لا تشمل إنشاء العقود أو الاتفاقيات ولا التمثيل أمام القضاء."], ["هل تستقبلون الحالات الطارئة يوم الجمعة؟", "لا. نستقبل الحالات المستعجلة من السبت إلى الخميس فقط، ولا نستقبل أي حالة طارئة يوم الجمعة. يُؤكد التوافر وتاريخ وساعة التسليم والمنطقة الزمنية مع الفريق قبل السداد."], ["هل أتعاب الطوارئ مماثلة لأتعاب الحالة العادية؟", "لا. تختلف أتعاب الطوارئ عن أتعاب الحالة العادية، ويُتفق عليها بحسب النطاق وحجم المستندات والتعقيد والاستعجال قبل السداد."], ["على أي أساس يُعد الرد، وهل تمثلونني أمام القضاء؟", "يستند الرد إلى المستندات والمعلومات التي تقدمها، وتقع عليك مسؤولية صحتها واكتمالها. لا نمثلك أمام القضاء ضمن هذه الخدمة ولا نتولى الإيداع أو الحضور أو متابعة المواعيد القضائية. تُوضح حدود المسؤولية في قسم الأتعاب والنطاق، مع مراعاة المسؤولية التي لا يجوز استبعادها قانوناً."], ["هل يمكن تقديم الطلب من دولة أخرى وإرسال المستندات إلكترونياً؟", "نعم. حدد الاختصاص واذكر المستندات عبر واتساب أو البريد الإلكتروني. نؤكد إمكان تقديم الخدمة والنطاق ووسيلة نقل المستندات قبل القبول. أرفق الملفات المتفق عليها في المحادثة أو البريد؛ روابط الموقع لا ترفقها تلقائياً."]],
    relatedTitle: "استكشف الخدمة القانونية ذات الصلة",
    availability: "نستقبل الحالات المستعجلة من السبت إلى الخميس فقط. لا نستقبل أي حالة طارئة يوم الجمعة. نؤكد التوافر وتاريخ وساعة التسليم والمنطقة الزمنية قبل سداد الأتعاب.",
    boundary: "يُعد الرد على ضوء المستندات والمعلومات المقدمة من العميل. لا تنشئ هذه الخدمة تمثيلاً أمام القضاء، ولا تشمل الإيداع أو حضور الجلسات أو متابعة المواعيد القضائية. لا نتحمل مسؤولية هذه الأعمال المستبعدة أو نتائج التقاضي أو الآثار الناشئة عن نقص مستندات العميل أو عدم صحتها، مع مراعاة أي مسؤولية لا يجوز استبعادها بموجب القانون.",
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
