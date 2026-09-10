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
    intro: "CounselO’s Urgent Legal Assistance is a service for individuals and businesses who need a legal document prepared or reviewed before a short deadline. It covers three tasks: preparing a legal memorandum, preparing a statement of claim, and reviewing an existing contract or agreement. The response is based on the documents and information you provide. The service excludes creating new contracts and representing clients in court.",
    timing: "For an accepted request, the target is to deliver the agreed response within 3 hours after both the complete documents and payment of the agreed fees have been received. If payment follows document delivery, the target starts at payment. We confirm feasibility and timing before payment.",
    whatsapp: "Request urgent help on WhatsApp",
    email: "Send an urgent request by email",
    scopeTitle: "What you receive",
    services: [
      ["Legal memorandum", "A written memorandum addressing the agreed legal questions, the relevant facts and documents, and the conclusions or points requiring clarification. Send the case papers, relevant correspondence and the purpose of the memorandum. Its scope and language are confirmed before payment."],
      ["Statement of claim", "A draft statement of claim setting out the parties, material facts, requested relief and supporting documents within the agreed scope. Send the parties’ details, a dated account of events and the evidence for each request. Delivery does not include filing the claim or attending court."],
      ["Contract or agreement review", "Written observations on an existing contract or agreement, identifying material risks, unclear terms and points to clarify before signing. Send the full draft, schedules and relevant correspondence. We agree whether comments are delivered within the document or in a separate review; creating a new agreement is excluded."],
    ],
    stepsTitle: "From your first message to the agreed legal response",
    steps: [
      ["1. Describe the matter and deadline", "Contact us through WhatsApp or email. Identify the requested service, jurisdiction, parties and any court or authority involved. Give the exact delivery date, time and time zone, and distinguish that request from any official filing deadline."],
      ["2. Send the relevant documents", "List the available documents so we can confirm the transfer method. Send readable, complete copies, including relevant schedules and correspondence. Explain any missing papers or facts. Files must be attached in the agreed conversation or email; website contact links do not upload them automatically."],
      ["3. Confirm the engagement before payment", "We confirm the scope, person responsible for the task, required documents, output language and format, urgent fee and delivery time. Revisions and follow-up questions about the delivered response are included within the agreed scope. A message alone does not confirm acceptance or reserve the team’s availability."],
      ["4. Receive the agreed response", "The three-hour target starts once the accepted request has both complete documents and confirmed payment. We prepare the agreed document or review from the supplied material and deliver it through the agreed channel. You can then discuss the response, ask questions about it and request revisions within the agreed scope."],
    ],
    documentsTitle: "A useful first message",
    template: "Urgent legal assistance request\nName / company:\nCountry and city:\nCourt / authority and case number, if any:\nOther parties (for conflict checking):\nBrief matter summary:\nRequested assistance / deliverable:\nOfficial deadline (date, time, time zone):\nRequested response or delivery time (date, time, time zone):\nAvailable documents:\nPreferred language and contact details:",
    privacy: "Send only relevant information and documents you are entitled to share. Ask about the transfer method before sending especially sensitive material. Our response is based on the documents and information you provide; you are responsible for their accuracy and completeness.",
    coverageTitle: "Requests from every jurisdiction",
    coverage: "You may submit a request concerning any jurisdiction. Specify the country and relevant court or authority so we can confirm whether we can undertake the requested document preparation or review. This urgent service does not include court representation, filing, attendance or case management.",
    feesTitle: "Urgent fees differ from standard fees",
    fees: "Urgent fees differ from standard fees. The quote reflects the requested deliverable, document volume, complexity, jurisdiction and deadline. The agreed fee includes revisions and follow-up discussion about the delivered response within its scope. The scope and fee are confirmed before payment; additional matters require a separate agreement.",
    faqTitle: "Questions about urgent legal help",
    faqs: [
      ["When does the 3-hour target begin?", "For an accepted request, the delivery target begins when both complete documents and the agreed payment have been received. If you deliver the documents first and then pay, the target begins at payment. We confirm feasibility and the delivery time before payment."],
      ["What do I receive and how is it delivered?", "Depending on your request, you receive a legal memorandum, a draft statement of claim, or written observations on an existing contract or agreement. The language, format and delivery channel are confirmed before payment. Contract reviews may be annotated in the document or supplied separately, as agreed."],
      ["When can I request urgent assistance?", "You may request urgent assistance at any time from Saturday through Thursday. We do not accept new urgent cases on Friday. For a Thursday request, confirm the exact delivery date, time and time zone with the team before payment; sending a message alone does not confirm acceptance."],
      ["Do the urgent fees include revisions and follow-up questions?", "Yes. Urgent fees differ from standard fees and are agreed before payment. They include revisions within the agreed scope and discussion of the delivered response, including questions about its contents. A new matter or work outside that scope requires a separate agreement."],
      ["What is the response based on, and will you represent me in court?", "The response relies on the documents and information you supply. You are responsible for their accuracy and completeness. We do not represent you in court under this service or handle filing, attendance or judicial deadlines. The limits of responsibility are described in the fees and scope section, subject to liability that cannot lawfully be excluded."],
      ["Can I apply from another country and send documents electronically?", "Yes. Specify the jurisdiction and list your documents through WhatsApp or email. We confirm capability, scope and the transfer method before acceptance. Attach the agreed files in the conversation or email; the website links do not attach files automatically."],
    ],
    relatedTitle: "Explore the relevant legal service",
    availability: "Urgent requests are accepted at any time from Saturday through Thursday. We do not accept new urgent cases on Friday. Acceptance and the exact delivery date, time and time zone are confirmed before payment.",
    boundary: "Our response is prepared in light of the documents and information supplied by the client. This service does not establish court representation and does not include filing, attendance or monitoring judicial deadlines. We assume no responsibility for those excluded tasks, court outcomes, or consequences arising from incomplete or inaccurate client material, subject to any liability that cannot lawfully be excluded.",
    handlingTitle: "Who handles your request",
    handling: "Before acceptance, CounselO confirms who will be responsible for the work and whether the team can undertake the task in the relevant jurisdiction. Ask for the assigned professional’s name, role and relevant qualifications. The urgent service is limited to the agreed document preparation or review; it does not create a court representation mandate.",
    deliveryTitle: "Delivery, included revisions and follow-up",
    delivery: "The agreed fee includes revisions to the delivered response within the agreed scope. After receiving it, you may discuss the response with the team and ask questions about its contents. We confirm the document language, delivery format and channel before payment; tell us if you need an editable file or a particular format. A new matter or work beyond the agreed scope requires a separate agreement on fees and timing.",
  },
  ar: {
    title: "المساعدة القانونية العاجلة",
    eyebrow: "عندما لا تحتمل مسألتك القانونية الانتظار",
    intro: "المساعدة القانونية العاجلة من كاونسلو خدمة للأفراد والشركات الذين يحتاجون إلى إعداد مستند قانوني أو تدقيقه خلال مهلة قصيرة. تشمل ثلاث مهام: إعداد مذكرة قانونية، وإعداد لائحة دعوى، وتدقيق عقد أو اتفاقية قائمة. يُعد الرد على ضوء المستندات والمعلومات المقدمة من العميل. لا تشمل الخدمة إنشاء عقود جديدة أو تمثيل العميل أمام القضاء.",
    timing: "للطلب المقبول، الوقت المستهدف لتسليم الرد المتفق عليه هو ٣ ساعات بعد اكتمال تسليم المستندات وسداد الأتعاب المتفق عليها معاً. إذا سُددت الأتعاب بعد تسليم المستندات، يبدأ احتساب الوقت من السداد. نؤكد إمكان التنفيذ والموعد قبل الدفع.",
    whatsapp: "اطلب مساعدة عاجلة عبر واتساب",
    email: "أرسل طلبك العاجل بالبريد الإلكتروني",
    scopeTitle: "ما الذي تتسلمه من الخدمة؟",
    services: [
      ["إعداد مذكرة قانونية", "مذكرة مكتوبة تتناول المسائل القانونية المتفق عليها والوقائع والمستندات ذات الصلة، مع بيان الخلاصة والنقاط التي تحتاج إلى استيضاح. أرسل أوراق المسألة والمراسلات المرتبطة بها والغرض من المذكرة. يُؤكد نطاقها ولغتها قبل السداد."],
      ["إعداد لائحة دعوى", "مسودة لائحة دعوى تتضمن بيانات الأطراف والوقائع الجوهرية والطلبات والمستندات المؤيدة ضمن النطاق المتفق عليه. أرسل بيانات الأطراف وتسلسلاً مؤرخاً للوقائع وأدلة كل طلب. لا يشمل التسليم إيداع اللائحة أو حضور الجلسات."],
      ["تدقيق عقد أو اتفاقية", "ملاحظات مكتوبة على عقد أو اتفاقية قائمة، تبين المخاطر الجوهرية والبنود غير الواضحة والنقاط التي تحتاج إلى استيضاح قبل التوقيع. أرسل المسودة كاملة وملاحقها والمراسلات ذات الصلة. نتفق على تقديم الملاحظات داخل المستند أو في تقرير مستقل؛ ولا تشمل الخدمة إنشاء اتفاقية جديدة."],
    ],
    stepsTitle: "من رسالتك الأولى إلى الرد القانوني المتفق عليه",
    steps: [
      ["١. وضّح المسألة والموعد المطلوب", "تواصل عبر واتساب أو البريد الإلكتروني، وحدد الخدمة المطلوبة والاختصاص والأطراف والمحكمة أو الجهة إن وجدت. اذكر تاريخ وساعة التسليم والمنطقة الزمنية، وميّز بين الموعد المطلوب وأي ميعاد رسمي للإيداع."],
      ["٢. أرسل المستندات ذات الصلة", "اذكر المستندات المتاحة حتى نؤكد وسيلة نقلها. أرسل نسخاً كاملة ومقروءة، بما فيها الملاحق والمراسلات ذات الصلة، ووضح أي أوراق أو وقائع ناقصة. تُرفق الملفات في المحادثة أو البريد المتفق عليه؛ روابط الموقع لا ترفعها تلقائياً."],
      ["٣. أكّد تفاصيل التكليف قبل السداد", "نؤكد نطاق المهمة والمسؤول عنها والمستندات اللازمة ولغة التسليم وصيغته وأتعاب الطوارئ والموعد. تشمل الأتعاب التعديلات والأسئلة اللاحقة المتعلقة بالرد ضمن النطاق المتفق عليه. لا تعني الرسالة وحدها قبول الطلب أو حجز توافر الفريق."],
      ["٤. تسلّم الرد المتفق عليه", "يبدأ الوقت المستهدف البالغ ٣ ساعات بعد قبول الطلب واكتمال المستندات وتأكيد السداد معاً. نعد المستند أو التدقيق على ضوء المواد المقدمة ونسلمه بالوسيلة المتفق عليها. يمكنك بعدها مناقشة الرد وطرح الأسئلة المتعلقة به وطلب تعديلاته ضمن النطاق المتفق عليه."],
    ],
    documentsTitle: "ما الذي تكتبه في رسالتك الأولى؟",
    template: "طلب مساعدة قانونية عاجلة\nالاسم / الشركة:\nالدولة والمدينة:\nالمحكمة / الجهة ورقم القضية إن وجد:\nالأطراف الأخرى للتحقق من تعارض المصالح:\nملخص المسألة:\nالمساعدة / المخرج المطلوب:\nالموعد الرسمي (التاريخ والساعة والمنطقة الزمنية):\nموعد الرد أو التسليم المطلوب (التاريخ والساعة والمنطقة الزمنية):\nالمستندات المتاحة:\nاللغة المفضلة وبيانات التواصل:",
    privacy: "أرسل فقط المعلومات ذات الصلة والمستندات التي يحق لك مشاركتها. استفسر عن وسيلة النقل قبل إرسال مواد شديدة الحساسية. يُعد الرد على ضوء المستندات والمعلومات التي تقدمها، وتقع عليك مسؤولية صحتها واكتمالها.",
    coverageTitle: "نستقبل الطلبات من جميع الاختصاصات القضائية",
    coverage: "يمكن تقديم طلب يتعلق بأي اختصاص قضائي. حدد الدولة والمحكمة أو الجهة ذات الصلة حتى نؤكد إمكان إعداد المستند أو تدقيقه ضمن النطاق المطلوب. لا تشمل هذه الخدمة المستعجلة التمثيل أمام القضاء أو الإيداع أو حضور الجلسات أو متابعة القضية.",
    feesTitle: "أتعاب الطوارئ تختلف عن أتعاب الحالة العادية",
    fees: "تختلف أتعاب الطوارئ عن أتعاب الحالة العادية. يعكس العرض المخرج المطلوب وحجم المستندات وتعقيد المسألة والاختصاص والمهلة المتاحة. تشمل الأتعاب المتفق عليها التعديلات ومناقشة الرد بعد تسلمه ضمن نطاقه. نؤكد النطاق والأتعاب قبل السداد، وتحتاج المسائل الإضافية إلى اتفاق مستقل.",
    faqTitle: "أسئلة عن الخدمات القانونية العاجلة",
    faqs: [
      ["متى يبدأ احتساب الوقت المستهدف البالغ ٣ ساعات؟", "للطلب المقبول، يبدأ الوقت المستهدف لتسليم الرد بعد اكتمال تسليم المستندات وسداد الأتعاب معاً. إذا سلمت المستندات أولاً ثم سددت الأتعاب، يبدأ الاحتساب من السداد. نؤكد إمكان التنفيذ وموعد التسليم قبل الدفع."],
      ["ما الذي أتسلمه، وبأي صيغة؟", "بحسب طلبك، تتسلم مذكرة قانونية أو مسودة لائحة دعوى أو ملاحظات مكتوبة على عقد أو اتفاقية قائمة. نؤكد اللغة والصيغة ووسيلة التسليم قبل السداد. يمكن تقديم تدقيق العقد كملاحظات داخل المستند أو في تقرير مستقل بحسب الاتفاق."],
      ["متى أستطيع تقديم طلب مستعجل؟", "يمكن تقديم الطلبات المستعجلة في أي وقت من السبت إلى الخميس. لا نستقبل حالات طارئة جديدة يوم الجمعة. لطلب يوم الخميس، أكّد مع الفريق تاريخ وساعة التسليم والمنطقة الزمنية قبل السداد؛ إرسال الرسالة وحده لا يؤكد قبول الطلب."],
      ["هل تشمل أتعاب الطوارئ التعديلات والأسئلة بعد التسليم؟", "نعم. تختلف أتعاب الطوارئ عن أتعاب الحالة العادية ويُتفق عليها قبل السداد. تشمل التعديلات ضمن النطاق المتفق عليه ومناقشة الرد بعد استلامه وطرح الأسئلة المتعلقة بمضمونه. أما المسألة الجديدة أو العمل خارج ذلك النطاق فيحتاج إلى اتفاق مستقل."],
      ["على أي أساس يُعد الرد، وهل تمثلونني أمام القضاء؟", "يستند الرد إلى المستندات والمعلومات التي تقدمها، وتقع عليك مسؤولية صحتها واكتمالها. لا نمثلك أمام القضاء ضمن هذه الخدمة ولا نتولى الإيداع أو الحضور أو متابعة المواعيد القضائية. تُوضح حدود المسؤولية في قسم الأتعاب والنطاق، مع مراعاة المسؤولية التي لا يجوز استبعادها قانوناً."],
      ["هل يمكن تقديم الطلب من دولة أخرى وإرسال المستندات إلكترونياً؟", "نعم. حدد الاختصاص واذكر المستندات عبر واتساب أو البريد الإلكتروني. نؤكد إمكان تقديم الخدمة والنطاق ووسيلة نقل المستندات قبل القبول. أرفق الملفات المتفق عليها في المحادثة أو البريد؛ روابط الموقع لا ترفقها تلقائياً."],
    ],
    relatedTitle: "استكشف الخدمة القانونية ذات الصلة",
    availability: "نستقبل الطلبات المستعجلة في أي وقت من السبت إلى الخميس. لا نستقبل حالات طارئة جديدة يوم الجمعة. نؤكد قبول الطلب وتاريخ وساعة التسليم والمنطقة الزمنية قبل سداد الأتعاب.",
    boundary: "يُعد الرد على ضوء المستندات والمعلومات المقدمة من العميل. لا تنشئ هذه الخدمة تمثيلاً أمام القضاء، ولا تشمل الإيداع أو حضور الجلسات أو متابعة المواعيد القضائية. لا نتحمل مسؤولية هذه الأعمال المستبعدة أو نتائج التقاضي أو الآثار الناشئة عن نقص مستندات العميل أو عدم صحتها، مع مراعاة أي مسؤولية لا يجوز استبعادها بموجب القانون.",
    handlingTitle: "من يتولى طلبك؟",
    handling: "تؤكد كاونسلو قبل قبول الطلب المسؤول عن المهمة وإمكان تنفيذها في الاختصاص المعني. يمكنك طلب اسم المهني المكلف وصفته ومؤهلاته ذات الصلة. تقتصر الخدمة المستعجلة على إعداد المستند أو تدقيقه ضمن النطاق المتفق عليه، ولا تنشئ تفويضاً بالتمثيل أمام القضاء.",
    deliveryTitle: "التسليم والتعديلات المشمولة ومناقشة الرد",
    delivery: "تشمل الأتعاب المتفق عليها تعديلات الرد ضمن نطاق المهمة. بعد استلامه، يمكنك مناقشة الرد مع الفريق وطرح الأسئلة المتعلقة بمضمونه. نؤكد لغة المستند وصيغة التسليم ووسيلته قبل السداد؛ أخبرنا إذا كنت تحتاج إلى نسخة قابلة للتحرير أو تنسيق معين. أما المسألة الجديدة أو العمل خارج النطاق المتفق عليه فيحتاج إلى اتفاق مستقل على الأتعاب والموعد.",
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
