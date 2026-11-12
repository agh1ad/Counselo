import type { Region } from "@workspace/api-zod/browser";
import { COOPERATING_OFFICES } from "@workspace/api-zod/browser";
import { COUNSELO_CLIENT_TRUST } from "@/lib/public-claims";

// Business facts: the existing approved founder biography and platform-positioning
// record. The owner supplied partner licence 37440 on 2026-10-19 and requested
// its display on About on 2026-11-03. It belongs to the Saudi partner, not CounselO.
export const SAUDI_PARTNER_LICENCE = "37440";
export const ABOUT_UPDATED = "2026-11-13";

// Official service descriptions checked on 2026-11-12. These are routes for
// independent enquiries, not evidence that a particular licence was checked.
export const SAUDI_LAWYER_DIRECTORY = {
  en: "https://www.moj.gov.sa/English/eServices/pages/10abd1a2-a4c2-4951-a464-ac926eb24417.aspx",
  ar: "https://www.moj.gov.sa/ar/eServices/Pages/10abd1a2-a4c2-4951-a464-ac926eb24417.aspx",
} as const;

// Existing business record: en-syr.ts/ar-syr.ts at HEAD and the published
// https://counselo-legal.com/syr/ar partner card (checked 2026-11-03).
// This identifies Omar Al-Abdullah's licence, not a CounselO platform licence.
const SYRIAN_ABDULLAH_LICENCE = "4519";

// Names match the shared entity registry; locations match the Syrian office
// records already published in en-syr.ts and ar-syr.ts.
export const syrianPartners = {
  en: [
    { name: COOPERATING_OFFICES.alBaghdadi.name, location: "Syria", licence: null },
    { name: COOPERATING_OFFICES.syriaAbdullah.name, location: "Damascus, Syria", licence: SYRIAN_ABDULLAH_LICENCE },
  ],
  ar: [
    { name: COOPERATING_OFFICES.alBaghdadi.alternateName, location: "سوريا", licence: null },
    { name: COOPERATING_OFFICES.syriaAbdullah.alternateName, location: "دمشق، سوريا", licence: SYRIAN_ABDULLAH_LICENCE },
  ],
} as const;

export const aboutContent = {
  en: {
    label: "About CounselO Legal",
    heading: "An experienced legal team.\nFrom advice to representation.",
    lead: "CounselO provides comprehensive legal support for individuals, families, businesses and investors in Saudi Arabia, Syria and the UAE. From everyday questions to complex cases, we bring together advice, legal strategy, drafting and follow-up, with court representation through licensed partners and lawyers.",
    contact: "Discuss your legal matter",
    servicesLink: "Explore our services",
    heroSideTitle: "Legal knowledge, put to work for you.",
    heroServices: ["Consultation, contracts and legal strategy", "Case preparation, negotiation and follow-up", "Court representation through licensed partners"],
    features: [
      { title: "Fully online", text: "Consult without an office visit." },
      { title: "Experienced legal team", text: "Practical experience in legal analysis, drafting and disputes." },
      { title: "Wide practice areas", text: "Personal, business and investment matters." },
      { title: "3 countries", text: "Saudi Arabia, Syria and the UAE." },
    ],
    platformTitle: "Professional legal support, built around you.",
    introduction: "CounselO Legal is a legal services platform founded by lawyer and legal counsel Omar Al-Baghdadi. Our team and licensed partner lawyers connect consultation, drafting, negotiation, dispute work and representation for matters in Saudi Arabia, Syria and the UAE, with online communication throughout your work with us.",
    purpose: "You do not need an office appointment to access our team's expertise. Share your question and documents from home, discuss them in Arabic or English and receive advice you can act on. From a family concern or employment dispute to a property transaction or business decision, we build the service around your facts and objectives.",
    teamTitle: "The team behind your advice",
    team: "Our legal team draws on its practical experience in contracts, disputes, arbitration and cross-border legal analysis. We examine the chronology, test the documents against the legal questions and identify the strengths, gaps and risks before preparing our recommendations. This discipline carries through to our drafting, settlement reviews and preparation for proceedings.",
    teamSupport: "Our support connects your online consultation with the legal work that follows. Our team handles analysis, drafting and follow-up; licensed partners and lawyers in the relevant country deliver court and authority representation under an agreed engagement. You know who is handling your matter and can stay in touch with our team online.",
    complexTitle: "From everyday questions to complex cases",
    complexText: "We handle straightforward questions, detailed transactions and complex disputes involving multiple parties, substantial evidence or more than one country. Our work connects case analysis, legal strategy, drafting, settlement negotiations and follow-up. The plan identifies the professional responsible for each agreed stage and the licensed local lawyer handling court representation.",
    workTitle: "Published legal work you can examine",
    workText: "Our published work shows the legal questions addressed, our approach and the documents prepared. Explore the matters and their available supporting documents to see the team's work in context and discuss the experience relevant to your own matter.",
    workLink: "Explore our published legal work",
    servicesTitle: "What we can do for you",
    servicesIntro: "Our services cover the legal work a matter needs: advice, document review and drafting, negotiation, litigation and arbitration support, partner representation and ongoing legal support.",
    services: [
      { title: "Individuals and families", text: "Advice and document preparation for marriage, separation, maintenance, custody, inheritance, employment rights and personal financial disputes." },
      { title: "Property and transactions", text: "Review of sales, leases, ownership records, payment obligations and disputed terms, with advice and drafting for negotiation or the next legal step." },
      { title: "Businesses and investors", text: "Contract drafting and review, company and investment advice, commercial arrangements, compliance questions and ongoing business legal support." },
      { title: "Disputes and cross-border matters", text: "Assessment of claims and evidence, settlement proposals, legal memoranda and preparation for proceedings, with local representation arranged where required." },
    ],
    processTitle: "From your request to delivery",
    process: [
      { title: "Tell us what needs resolving", text: "Send your question through the website, WhatsApp or email, with the country, key facts and any deadline. We review your request and identify the documents needed for a useful assessment." },
      { title: "Agree the work with our team", text: "We confirm the legal task, deliverables, consultation format, fee and expected delivery date. Once you approve the proposal, we provide payment instructions and confirm the start of the agreed work." },
      { title: "Receive advice you can use", text: "Depending on your request, we deliver a written legal opinion, reviewed document, draft agreement or legal memorandum. Advice is delivered by email or WhatsApp; phone and video consultations can be arranged. Clarifications and further work follow the agreed scope." },
    ],
    standardsTitle: "The standards behind our work",
    standards: `${COUNSELO_CLIENT_TRUST.en} We earn that trust through careful analysis, precise drafting and clear communication. Our advice connects your evidence to your legal position, explains your options and identifies the next practical step. You know what we are preparing and when to expect it.`,
    privacy: "We handle your information under applicable professional confidentiality and privacy obligations. The documents we request serve the assessment of your matter; any additional service, local representation or continuing support is discussed and agreed with you.",
    privacyLink: "Privacy and handling of your information",
    founderLabel: "Our founder and legal leadership",
    founderName: "Omar Al-Baghdadi",
    founderRole: "Lawyer and Legal Counsel · Founder of CounselO Legal",
    founderIntro: "Omar founded CounselO to bring experienced legal work into an accessible online service. His role combines professional direction, review of legal analysis and coordination of work that crosses legal systems and jurisdictions.",
    founderExperience: "His practice began in 1996 and includes commercial disputes, contract drafting, arbitration and cross-border matters. His responsibilities at CounselO include professional direction, reviewing legal analysis and supporting the team’s development through training and supervision.",
    founderFacts: [
      { title: "Education", text: "Faculty of Law, Damascus University, 1996" },
      { title: "Professional practice", text: "Contracts, disputes, arbitration and cross-border legal analysis" },
      { title: "At CounselO", text: "Legal direction, review and coordination of the team’s work" },
    ],
    profileLink: "View his professional profile",
    partnerLabel: "Our licensed Saudi partner",
    licenceLabel: "Saudi lawyer licence",
    directoryLabel: "Saudi Ministry of Justice · Practising lawyers directory",
    directoryNote: "The Ministry's directory provides a search by lawyer name. The licence shown above identifies our Saudi partner; the professional responsible for your representation is confirmed in your engagement.",
    faqTitle: "Your questions about our legal services",
    faqs: [
      { question: "What legal services does CounselO provide?", answer: "CounselO provides consultation, legal analysis, contract and document drafting, negotiation, dispute and arbitration support, and continuing legal advice for matters in Saudi Arabia, Syria and the UAE. Licensed partners and lawyers provide representation before courts and authorities, with CounselO coordinating preparation and follow-up under the agreed engagement.", link: null },
      { question: "Can CounselO handle both simple and complex cases?", answer: "Yes. Our team handles everyday legal questions and complex matters involving multiple parties, extensive evidence or cross-border issues. We develop a work plan covering the legal strategy, documents, deadlines and the professionals responsible for the agreed stages.", link: null },
      { question: "Where can I examine CounselO’s experience?", answer: "Our Work contains published case studies, contract reviews and supporting legal documents. These explain the legal issue, the work performed and the context, including commercial contracts, a Saudi commercial claim and a cross-border dispute. The portfolio figure counts the platform’s published work records.", link: { label: "Examine our published work", href: "/our-work" } },
    ],
    ctaTitle: "Put our legal experience to work for you.",
    ctaText: "Choose CounselO for a clear answer, a carefully prepared document or support with a dispute. Speak with our experienced team from home and take the next step with advice, drafting and access to licensed local representation through our partners.",
    ctaNote: "Include the country, your objective and any approaching deadline. We agree the scope, fee and delivery date before paid work begins.",
    whatsapp: "Speak to us on WhatsApp",
  },
  ar: {
    label: "عن كاونسلو للاستشارات القانونية",
    heading: "فريق قانوني بخبرة راسخة.\nمن الاستشارة إلى التمثيل.",
    lead: "تقدم كاونسلو دعماً قانونياً متكاملاً للأفراد والأسر والشركات والمستثمرين في السعودية وسوريا والإمارات. من الأسئلة اليومية إلى القضايا المعقدة، نجمع المشورة والاستراتيجية القانونية والصياغة والمتابعة، مع التمثيل أمام المحاكم عبر شركاء ومحامين مرخصين.",
    contact: "ناقش مسألتك القانونية معنا",
    servicesLink: "استكشف خدماتنا",
    heroSideTitle: "معرفة قانونية نضعها في خدمتك.",
    heroServices: ["استشارات وعقود واستراتيجية قانونية", "إعداد القضايا والتفاوض والمتابعة", "تمثيل أمام المحاكم عبر شركاء مرخصين"],
    features: [
      { title: "أونلاين بالكامل", text: "استشر فريقنا دون زيارة مكتب." },
      { title: "فريق قانوني متمرس", text: "خبرة عملية في التحليل القانوني والصياغة والمنازعات." },
      { title: "مجالات قانونية واسعة", text: "للأفراد والشركات والاستثمارات." },
      { title: "3 دول", text: "السعودية وسوريا والإمارات." },
    ],
    platformTitle: "دعم قانوني مهني، مصمم حول احتياجك.",
    introduction: "كاونسلو للاستشارات القانونية منصة خدمات قانونية أسسها المحامي والمستشار القانوني عمر البغدادي. يربط فريقنا وشركاؤنا المحامون المرخصون الاستشارة والصياغة والتفاوض والعمل على المنازعات والتمثيل في المسائل المرتبطة بالسعودية وسوريا والإمارات، مع التواصل أونلاين طوال العمل معنا.",
    purpose: "لا تحتاج إلى موعد في مكتب للاستفادة من خبرة فريقنا. أرسل سؤالك ومستنداتك من منزلك، وناقشها بالعربية أو الإنجليزية، وتسلّم مشورة تساعدك على اتخاذ القرار. من المسائل الأسرية والنزاعات العمالية إلى المعاملات العقارية والقرارات التجارية، نبني الخدمة حول وقائعك وأهدافك.",
    teamTitle: "الفريق الذي يقف وراء استشارتك",
    team: "يستند فريقنا القانوني إلى خبرته العملية في العقود والمنازعات والتحكيم والتحليل القانوني للمسائل العابرة للحدود. نفحص تسلسل الوقائع، ونربط المستندات بالأسئلة القانونية، ونحدد نقاط القوة والنقص والمخاطر قبل إعداد التوصيات. ويمتد هذا المنهج إلى الصياغة ومراجعة التسويات والتحضير للإجراءات.",
    teamSupport: "نربط استشارتك أونلاين بالعمل القانوني الذي يليها. يتولى فريقنا التحليل والصياغة والمتابعة، ويقدم شركاء ومحامون مرخصون في الدولة المعنية التمثيل أمام المحاكم والجهات المختصة وفق تكليف متفق عليه. تعرف من يتولى مسألتك، وتبقى على تواصل مع فريقنا أونلاين.",
    complexTitle: "من الأسئلة اليومية إلى القضايا المعقدة",
    complexText: "نتولى الأسئلة المباشرة والمعاملات التفصيلية والنزاعات المعقدة التي تتعدد أطرافها أو تتسع أدلتها أو ترتبط بأكثر من دولة. ويربط عملنا تحليل الملف بالاستراتيجية القانونية والصياغة ومفاوضات التسوية والمتابعة. وتحدد الخطة المهني المسؤول عن كل مرحلة متفق عليها والمحامي المحلي المرخص الذي يتولى التمثيل أمام المحاكم.",
    workTitle: "أعمال قانونية منشورة يمكنك الاطّلاع عليها",
    workText: "توضح أعمالنا المنشورة الأسئلة القانونية التي عالجناها ومنهج العمل والمستندات التي أعددناها. تصفح المسائل وما يتاح معها من مستندات داعمة للاطلاع على عمل الفريق في سياقه، ومناقشة الخبرة المرتبطة بمسألتك.",
    workLink: "تصفح أعمالنا القانونية المنشورة",
    servicesTitle: "ما الذي نقدمه لك؟",
    servicesIntro: "تشمل خدماتنا العمل القانوني الذي تحتاجه المسألة: المشورة ومراجعة المستندات وصياغتها والتفاوض ودعم التقاضي والتحكيم والتمثيل عبر الشركاء والدعم القانوني المستمر.",
    services: [
      { title: "الأفراد والأسرة", text: "الاستشارة وإعداد المستندات في مسائل الزواج والانفصال والنفقة والحضانة والميراث والحقوق العمالية والمنازعات المالية الشخصية." },
      { title: "العقارات والمعاملات", text: "مراجعة عقود البيع والإيجار وسجلات الملكية والالتزامات المالية والشروط المتنازع عليها، وإعداد الرأي والصياغة للتفاوض أو الخطوة القانونية التالية." },
      { title: "الشركات والمستثمرون", text: "صياغة العقود ومراجعتها، والمشورة في شؤون الشركات والاستثمار والترتيبات التجارية والامتثال، والدعم القانوني المستمر للأعمال." },
      { title: "المنازعات والمسائل العابرة للحدود", text: "تقييم المطالبات والأدلة، ومقترحات التسوية، والمذكرات القانونية والتحضير للإجراءات، مع ترتيب التمثيل المحلي عند الحاجة." },
    ],
    processTitle: "من طلبك إلى تسليم العمل",
    process: [
      { title: "أخبرنا بما تحتاج إلى معالجته", text: "أرسل سؤالك عبر الموقع أو واتساب أو البريد الإلكتروني، مع الدولة والوقائع الأساسية وأي موعد مهم. نراجع الطلب ونحدد المستندات اللازمة لتقييم مفيد لمسألتك." },
      { title: "اتفق مع فريقنا على العمل", text: "نحدد المهمة القانونية والمخرجات وشكل الاستشارة والأتعاب وموعد التسليم المتوقع. وبعد موافقتك على العرض، نرسل تعليمات الدفع ونؤكد بدء العمل المتفق عليه." },
      { title: "تسلّم عملاً قانونياً تستفيد منه", text: "بحسب طلبك، نقدم رأياً قانونياً مكتوباً أو مستنداً تمت مراجعته أو مشروع اتفاق أو مذكرة قانونية. نرسل الاستشارة عبر البريد الإلكتروني أو واتساب، ويمكن ترتيب مكالمة هاتفية أو مرئية. وتتم الإيضاحات والأعمال اللاحقة ضمن النطاق المتفق عليه." },
    ],
    standardsTitle: "المعايير التي تحكم عملنا",
    standards: `${COUNSELO_CLIENT_TRUST.ar} ونكسب هذه الثقة بدقة التحليل وجودة الصياغة ووضوح التواصل. تربط استشارتنا أدلتك بموقفك القانوني، وتشرح خياراتك، وتحدد الخطوة العملية التالية. وتعرف ما الذي نعدّه لك ومتى تتسلمه.`,
    privacy: "نتعامل مع معلوماتك وفق التزامات السرية المهنية والخصوصية المنطبقة. والمستندات التي نطلبها تخدم تقييم مسألتك؛ أما أي خدمة إضافية أو تمثيل محلي أو دعم مستمر، فنناقشه معك ونتفق عليه.",
    privacyLink: "الخصوصية والتعامل مع معلوماتك",
    founderLabel: "مؤسس المنصة وقيادتها القانونية",
    founderName: "عمر البغدادي",
    founderRole: "محامٍ ومستشار قانوني · مؤسس كاونسلو للاستشارات القانونية",
    founderIntro: "أسس عمر البغدادي كاونسلو ليقدم العمل القانوني القائم على الخبرة عبر خدمة أونلاين يسهل الوصول إليها. ويجمع دوره بين التوجيه المهني ومراجعة التحليل القانوني وتنسيق الأعمال المرتبطة بأكثر من نظام قانوني أو اختصاص.",
    founderExperience: "بدأ ممارسته المهنية عام 1996، وتشمل خبرته المنازعات التجارية وصياغة العقود والتحكيم والمسائل العابرة للحدود. وتشمل مسؤولياته في كاونسلو التوجيه المهني ومراجعة التحليل القانوني ودعم التطوير المهني للفريق بالتدريب والإشراف.",
    founderFacts: [
      { title: "التعليم", text: "كلية الحقوق بجامعة دمشق، 1996" },
      { title: "الممارسة المهنية", text: "العقود والمنازعات والتحكيم والتحليل القانوني للمسائل العابرة للحدود" },
      { title: "دوره في كاونسلو", text: "التوجيه القانوني والمراجعة وتنسيق عمل الفريق" },
    ],
    profileLink: "اطّلع على ملفه المهني",
    partnerLabel: "شريكنا السعودي المرخص",
    licenceLabel: "ترخيص المحاماة السعودي",
    directoryLabel: "وزارة العدل السعودية · دليل المحامين الممارسين",
    directoryNote: "يتيح دليل الوزارة البحث باسم المحامي. يخص رقم الترخيص المعروض شريكنا السعودي، ويُحدد المهني المسؤول عن تمثيلك في اتفاق التكليف.",
    faqTitle: "أسئلتك عن خدماتنا القانونية",
    faqs: [
      { question: "ما الخدمات القانونية التي تقدمها كاونسلو؟", answer: "تقدم كاونسلو الاستشارات والتحليل القانوني وصياغة العقود والمستندات والتفاوض ودعم المنازعات والتحكيم والمشورة القانونية المستمرة للمسائل المرتبطة بالسعودية وسوريا والإمارات. ويتولى الشركاء والمحامون المرخصون التمثيل أمام المحاكم والجهات المختصة، مع تنسيق كاونسلو للإعداد والمتابعة وفق التكليف المتفق عليه.", link: null },
      { question: "هل تتولى كاونسلو القضايا البسيطة والمعقدة؟", answer: "نعم. يتولى فريقنا الأسئلة القانونية اليومية والمسائل المعقدة التي تتعدد أطرافها أو تتسع أدلتها أو ترتبط بأكثر من دولة. ونضع خطة عمل تشمل الاستراتيجية القانونية والمستندات والمواعيد والمهنيين المسؤولين عن المراحل المتفق عليها.", link: null },
      { question: "أين يمكنني الاطّلاع على خبرة كاونسلو؟", answer: "يتضمن قسم أعمالنا دراسات قضايا ومراجعات عقود ومستندات قانونية داعمة منشورة. وتوضح هذه السجلات المسألة القانونية والعمل المنجز وسياق الملف، بما يشمل العقود التجارية ومطالبة تجارية سعودية ونزاعاً عابراً للحدود. ويعبّر رقم الأعمال عن عدد السجلات المنشورة في مكتبة المنصة.", link: { label: "اطّلع على أعمالنا المنشورة", href: "/ar/our-work" } },
    ],
    ctaTitle: "ضع خبرتنا القانونية في خدمة مسألتك.",
    ctaText: "اختر كاونسلو لإجابة واضحة، أو مستند محكم الصياغة، أو مساندة في نزاع. تحدث مع فريقنا المتمرس من منزلك، واتخذ خطوتك التالية بالمشورة والصياغة والتمثيل المحلي عبر شركائنا المرخصين.",
    ctaNote: "اذكر الدولة وهدفك وأي موعد قريب. نتفق على نطاق العمل والأتعاب وموعد التسليم قبل بدء العمل المدفوع.",
    whatsapp: "تواصل معنا عبر واتساب",
  },
} as const;

export const aboutRegions: Record<Region, { en: { country: string; focus: string; partnerTitle: string; partnerText: string }; ar: { country: string; focus: string; partnerTitle: string; partnerText: string } }> = {
  sa: {
    en: { country: "Saudi Arabia", focus: "For Saudi matters, we assess family, employment, property, commercial and investment questions against the relevant Saudi rules and documents, with online support available throughout the Kingdom.", partnerTitle: "Lawyer Abdullah Al-Anzi", partnerText: "Our presence in Saudi Arabia is supported by our licensed partner, lawyer Abdullah Al-Anzi. CounselO coordinates the legal analysis and preparation with him when a matter requires local representation before courts or authorities, under a separately agreed engagement." },
    ar: { country: "السعودية", focus: "في المسائل السعودية، نراجع شؤون الأسرة والعمل والعقارات والتجارة والاستثمار في ضوء الأنظمة والمستندات ذات الصلة، مع إتاحة الدعم أونلاين في جميع أنحاء المملكة.", partnerTitle: "المحامي عبدالله العنزي", partnerText: "يدعم حضورنا المهني في السعودية شريكنا المرخص، المحامي عبدالله العنزي. وتنسق كاونسلو معه التحليل القانوني والتحضير عندما تتطلب المسألة تمثيلاً محلياً أمام المحاكم أو الجهات المختصة، ضمن تكليف مستقل متفق عليه." },
  },
  syr: {
    en: { country: "Syria", focus: "For Syrian matters, we review family and inheritance questions, property records, civil obligations and commercial disputes, and prepare advice and documents around the relevant Syrian law and procedural stage.", partnerTitle: "Our legal partners in Syria", partnerText: "We work with Al-Baghdadi Law Firm and Lawyer Omar Al-Abdullah’s office to connect our team’s online advice and document preparation with local legal support in Syria. When your matter requires court or authority representation, we coordinate with the responsible partner and agree the work and engagement with you." },
    ar: { country: "سوريا", focus: "في المسائل السورية، نراجع شؤون الأسرة والميراث والسجلات العقارية والالتزامات المدنية والمنازعات التجارية، ونعد الاستشارة والمستندات وفق القانون السوري ذي الصلة والمرحلة الإجرائية للمسألة.", partnerTitle: "شركاؤنا القانونيون في سوريا", partnerText: "نتعاون مع مكتب البغدادي للمحاماة ومكتب المحامي عمر العبد الله لربط استشارات فريقنا وإعداد المستندات أونلاين بالدعم القانوني المحلي في سوريا. وعندما تتطلب مسألتك تمثيلاً أمام المحاكم أو الجهات المختصة، ننسق مع الشريك المسؤول ونتفق معك على العمل والتكليف." },
  },
  uae: {
    en: { country: "the UAE", focus: "For UAE matters, we assess employment, property, family, company and commercial questions with attention to the emirate, the relevant authority and any mainland or free-zone framework affecting the request.", partnerTitle: "Legal support for matters in the UAE", partnerText: "CounselO provides online consultation and document preparation for UAE matters. When a matter requires locally authorised representation or another reserved service, we arrange coordination through licensed partners and lawyers under a separately agreed engagement." },
    ar: { country: "الإمارات", focus: "في المسائل الإماراتية، نراجع شؤون العمل والعقارات والأسرة والشركات والتجارة، مع تحديد الإمارة والجهة المختصة وأثر القواعد المنطبقة داخل الدولة أو في المنطقة الحرة على الطلب.", partnerTitle: "دعم قانوني للمسائل في الإمارات", partnerText: "تقدم كاونسلو الاستشارات وإعداد المستندات أونلاين للمسائل الإماراتية. وعندما تحتاج المسألة إلى تمثيل محلي مخول أو خدمة أخرى محجوزة قانوناً، نرتب التنسيق من خلال شركاء ومحامين مرخصين ضمن تكليف مستقل متفق عليه." },
  },
};
