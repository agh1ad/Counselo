import type { Region } from "@workspace/api-zod/browser";
import { BAGHDADI_LAW_PROFILE_URL, COOPERATING_OFFICES, OMAR_ABDULLAH_PROFILE_PATHS, OMAR_AL_ABDULLAH_OFFICE_LOGO_PATH, SAUDI_OFFICE_DIRECTORY_URL } from "@workspace/api-zod/browser";
import { COUNSELO_CLIENT_TRUST } from "@/lib/public-claims";

// Owner-confirmed team relationship, 2026-11-18: the local lawyers and offices
// are part of the CounselO team. Licence 37/440 identifies Abdullah Al-Anzi;
// it is not a licence held by every team member or by the CounselO brand.
export const SAUDI_PARTNER_LICENCE = "37/440";
export const ABOUT_UPDATED = "2026-11-24";

// Official public lookup routes for readers checking current professional status.
export const SAUDI_LAWYER_DIRECTORY = {
  en: "https://eservice.sba.gov.sa/en/lawyers?search=37%2F440",
  ar: "https://eservice.sba.gov.sa/lawyers?search=37%2F440",
} as const;
const SYRIAN_LAWYER_DIRECTORY = "https://syrianbar.org.sy/lawyer-directory/";

export const regionalCredentialLookup: Record<Region, Record<"en" | "ar", {
  text: string;
  directory: { url: string; label: string };
}>> = {
  sa: {
    en: {
      text: "The Saudi Bar Association lists the firm in Dammam under the registered name Abdullah Moghthi Qaid Al-Anazi Law Firm.",
      directory: { url: "https://eservice.sba.gov.sa/en/directory/855", label: "View the firm’s Saudi Bar Association record" },
    },
    ar: {
      text: "تُدرج الهيئة السعودية للمحامين المنشأة في الدمام باسم «مكتب عبدالله مغثي قاعد العنزي للمحاماة».",
      directory: { url: SAUDI_OFFICE_DIRECTORY_URL, label: "سجل المنشأة لدى الهيئة السعودية للمحامين" },
    },
  },
  syr: {
    en: {
      text: "Search by the individual lawyer’s name in Arabic to check their registration and bar branch.",
      directory: { url: SYRIAN_LAWYER_DIRECTORY, label: "Syrian Bar Association lawyers directory (Arabic)" },
    },
    ar: {
      text: "ابحث باسم المحامي للتحقّق من صفته النقابية والفرع الذي ينتسب إليه.",
      directory: { url: SYRIAN_LAWYER_DIRECTORY, label: "دليل نقابة المحامين السوريين" },
    },
  },
  uae: {
    en: {
      text: "Before work begins, we identify the professional responsible for your matter and the applicable licensing authority. You can check registrations in Dubai with the Dubai Legal Affairs Department.",
      directory: { url: "https://legal.dubai.gov.ae/en/Services/Pages/Legal-Directory.aspx?ServiceID=19", label: "Dubai directory of advocates and legal consultants" },
    },
    ar: {
      text: "قبل بدء العمل نحدد لك اسم المهني المسؤول عن مسألتك والجهة المختصة بترخيصه. ويمكنك التحقّق من قيد المحامين والمستشارين القانونيين المسجلين في دبي لدى دائرة الشؤون القانونية لحكومة دبي.",
      directory: { url: "https://legal.dubai.gov.ae/ar/Services/Pages/Legal-Directory.aspx?ServiceID=19", label: "دليل المحامين والمستشارين القانونيين في دبي" },
    },
  },
};

// Existing business record: en-syr.ts/ar-syr.ts at HEAD and the published
// https://counselo-legal.com/syr/ar partner card (checked 2026-11-03).
// This identifies Omar Al-Abdullah's licence, not a CounselO platform licence.
export const SYRIAN_ABDULLAH_LICENCE = "4519";

// Names match the shared entity registry; locations match the Syrian office
// records already published in en-syr.ts and ar-syr.ts.
export const syrianPartners = {
  en: [
    { name: COOPERATING_OFFICES.alBaghdadi.name, location: "Syria", description: "Riyad Al-Baghdadi founded the firm in 1957. The next generation, lawyers Mosef and Omar Al-Baghdadi, carried the family practice forward. Today Omar leads a regional firm that retains its roots in the Syrian legal profession and brings together lawyers and member firms across Syria, Saudi Arabia and the United Arab Emirates.", licence: null, licenceLabel: null, logo: "/images/baghdadi-law-logo-en.webp", profileHref: BAGHDADI_LAW_PROFILE_URL, profileLabel: "Firm profile", logoAlt: "Baghdadi Law logo" },
    { name: COOPERATING_OFFICES.syriaAbdullah.name, location: "Damascus, Syria", description: "Omar Al-Abdullah Law Office is an established Damascus firm with its own team of lawyers licensed in Syria. Omar Al-Abdullah practises alongside colleagues whose professional experience is rooted in the Syrian capital. Together they form the Damascus office’s team within CounselO Legal.", licence: SYRIAN_ABDULLAH_LICENCE, licenceLabel: "Omar Al-Abdullah’s lawyer licence, as listed by CounselO Legal", logo: OMAR_AL_ABDULLAH_OFFICE_LOGO_PATH, profileHref: OMAR_ABDULLAH_PROFILE_PATHS.en, profileLabel: "Firm profile", logoAlt: "Omar Al-Abdullah Law Office logo" },
  ],
  ar: [
    { name: COOPERATING_OFFICES.alBaghdadi.alternateName, location: "سوريا", description: "أسّس المحامي رياض البغدادي المكتب عام 1957، وواصل المحاميان مسعف وعمر البغدادي مسيرته في الجيل الثاني من العائلة. يقود عمر اليوم مكتباً إقليمياً يحتفظ بجذوره في المحاماة السورية، ويجمع ضمن شبكته المهنية محامين ومكاتب محاماة في سوريا والسعودية والإمارات العربية المتحدة.", licence: null, licenceLabel: null, logo: "/images/baghdadi-law-logo-ar.webp", profileHref: "https://www.baghdadilaw.co/ar/who-we-are", profileLabel: "ملف المكتب", logoAlt: "شعار البغدادي للمحاماة" },
    { name: COOPERATING_OFFICES.syriaAbdullah.alternateName, location: "دمشق، سوريا", description: "مكتب المحامي عمر العبد الله مكتب محاماة راسخ في دمشق، يضمّ فريقاً من المحامين المرخّصين في سوريا. يزاول عمر العبد الله المحاماة إلى جانب زملائه في العاصمة السورية، حيث تكوّنت خبرتهم المهنية. ويشكّل محامو المكتب معاً جزءاً من فريق كاونسلو القانوني.", licence: SYRIAN_ABDULLAH_LICENCE, licenceLabel: "رقم رخصة المحامي عمر العبد الله بحسب بيانات كاونسلو", logo: OMAR_AL_ABDULLAH_OFFICE_LOGO_PATH, profileHref: OMAR_ABDULLAH_PROFILE_PATHS.ar, profileLabel: "ملف المكتب", logoAlt: "شعار مكتب المحامي عمر العبد الله" },
  ],
} as const;

export const aboutContent = {
  en: {
    label: "About CounselO Legal",
    heading: "An experienced legal team.\nFrom advice to representation.",
    lead: "Access CounselO’s legal team online from wherever you are. We serve individuals, families, businesses and investors in Saudi Arabia, Syria and the UAE, bringing online consultation, document preparation, negotiation, court representation and remote follow-up together with one team.",
    contact: "Discuss your matter online",
    servicesLink: "Explore our services",
    heroSideTitle: "Legal knowledge, put to work for you.",
    heroServices: ["Consultation, contracts and legal strategy", "Case preparation, negotiation and follow-up", "Representation and court attendance with the same team"],
    features: [
      { title: "One legal team", text: "Consultation through representation." },
      { title: "Online access", text: "Consult, share documents and follow up remotely." },
      { title: "Wide practice areas", text: "Personal, business and investment matters." },
      { title: "3 countries", text: "Saudi Arabia, Syria and the UAE." },
    ],
    platformTitle: "Professional legal support, built around you.",
    introduction: "CounselO Legal was founded by lawyer and legal counsel Omar Al-Baghdadi to bring legal services together in one destination. Our team includes licensed lawyers and offices in Saudi Arabia, Syria and the UAE, delivering consultation, drafting, negotiation, dispute work and representation. Consult online, share documents and follow your matter remotely with the same team.",
    purpose: "You do not need an office appointment to access our team's expertise. Share your question and documents from home, discuss them in Arabic or English and receive advice you can act on. From a family concern or employment dispute to a property transaction or business decision, we build the service around your facts and objectives.",
    teamTitle: "The lawyers behind CounselO",
    team: "CounselO Legal brings together lawyers who have built their careers in three different legal systems. They practise with member firms in Saudi Arabia, Syria and the United Arab Emirates.",
    teamSupport: "Each firm retains its own name and professional identity. The firm profiles introduce its lawyers and the legal community in which its team gained its experience.",
    complexTitle: "From everyday questions to complex cases",
    complexText: "We handle straightforward questions, detailed transactions and complex disputes involving multiple parties, substantial evidence or more than one country. Our work connects case analysis, legal strategy, drafting, settlement negotiations and follow-up. We agree one work plan with you, including the responsible team members, legal steps and any required representation.",
    workTitle: "Published legal work you can examine",
    workText: "Our published work shows the legal questions addressed, our approach and the documents prepared. Explore the matters and their available supporting documents to see the team's work in context and discuss the experience relevant to your own matter.",
    workLink: "Explore our published legal work",
    servicesTitle: "What we can do for you",
    servicesIntro: "Our services cover the legal work a matter needs: advice, document review and drafting, negotiation, litigation and arbitration support, representation and ongoing legal support.",
    services: [
      { title: "Individuals and families", text: "Advice and document preparation for marriage, separation, maintenance, custody, inheritance, employment rights and personal financial disputes." },
      { title: "Property and transactions", text: "Review of sales, leases, ownership records, payment obligations and disputed terms, with advice and drafting for negotiation or the next legal step." },
      { title: "Businesses and investors", text: "Contract drafting and review, company and investment advice, commercial arrangements, compliance questions and ongoing business legal support." },
      { title: "Disputes and cross-border matters", text: "Assessment of claims and evidence, settlement proposals, legal memoranda and preparation for proceedings, and representation with the same CounselO team." },
    ],
    processTitle: "One team through every stage",
    process: [
      { title: "Tell us what needs resolving", text: "Send your question through WhatsApp or email, with the country, key facts and any deadline. We review your request and identify the documents needed for a useful assessment." },
      { title: "Agree the work with our team", text: "We confirm the legal work, deliverables, responsible team members and timing. Online consultations have published fixed category fees; drafting and representation fees are agreed for the requested work. Once you approve the proposal, we provide payment instructions and confirm the start of the agreed work." },
      { title: "Move forward with our team", text: "We carry out the agreed work, from advice and document preparation to negotiation or representation. Our team keeps you informed of progress, deadlines and next steps. You can reach us by email or WhatsApp, with phone and video consultations available as agreed." },
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
    partnerLabel: "Part of our CounselO team in Saudi Arabia",
    licenceLabel: "Abdullah Al-Anzi’s lawyer licence",
    directoryLabel: "Search the Saudi Bar Association lawyers directory",
    faqTitle: "Your questions about our legal services",
    faqs: [
      { question: "What legal services does CounselO provide?", answer: "CounselO provides consultation, legal analysis, contract and document drafting, negotiation, litigation, arbitration and continuing legal support in Saudi Arabia, Syria and the UAE. Our team includes the locally licensed lawyers and offices that handle court and authority representation, so you work with CounselO from your first consultation through the agreed stages of your matter.", link: null },
      { question: "Can CounselO handle both simple and complex cases?", answer: "Yes. Our team handles everyday legal questions and complex matters involving multiple parties, extensive evidence or cross-border issues. We develop a work plan covering the legal strategy, documents, deadlines and the professionals responsible for the agreed stages.", link: null },
      { question: "Where can I examine CounselO’s experience?", answer: "Our Work contains published case studies, contract reviews and supporting legal documents. These explain the legal issue, the work performed and the context, including commercial contracts, a Saudi commercial claim and a cross-border dispute. The portfolio figure counts the platform’s published work records.", link: { label: "Examine our published work", href: "/our-work" } },
    ],
    ctaTitle: "Put our legal experience to work for you.",
    ctaText: "Choose CounselO for a clear answer, a carefully prepared document or representation in a dispute. Work with one experienced team for your advice, drafting, negotiation and court proceedings, with accessible communication wherever you are.",
    ctaNote: "Include the country, your objective and any approaching deadline. We agree the scope, fee and delivery date before paid work begins.",
    whatsapp: "Speak to us on WhatsApp",
  },
  ar: {
    label: "عن كاونسلو للاستشارات القانونية",
    heading: "فريق قانوني بخبرة راسخة.\nمن الاستشارة إلى التمثيل.",
    lead: "تواصل مع فريق كاونسلو القانوني أونلاين أينما كنت. نخدم الأفراد والأسر والشركات والمستثمرين في السعودية وسوريا والإمارات، ونجمع الاستشارة أونلاين وإعداد المستندات والتفاوض والتمثيل أمام المحاكم والمتابعة عن بُعد مع فريق واحد.",
    contact: "ناقش مسألتك أونلاين",
    servicesLink: "استكشف خدماتنا",
    heroSideTitle: "معرفة قانونية نضعها في خدمتك.",
    heroServices: ["استشارات وعقود واستراتيجية قانونية", "إعداد القضايا والتفاوض والمتابعة", "التمثيل والحضور أمام المحاكم مع الفريق نفسه"],
    features: [
      { title: "فريق قانوني واحد", text: "من الاستشارة إلى التمثيل." },
      { title: "تواصل أونلاين", text: "استشرنا وأرسل مستنداتك وتابع معنا عن بُعد." },
      { title: "مجالات قانونية واسعة", text: "للأفراد والشركات والاستثمارات." },
      { title: "3 دول", text: "السعودية وسوريا والإمارات." },
    ],
    platformTitle: "دعم قانوني مهني، مصمم حول احتياجك.",
    introduction: "أسس المحامي والمستشار القانوني عمر البغدادي كاونسلو لتجمع الخدمات القانونية في وجهة واحدة. يضم فريقنا محامين ومكاتب مرخصة في السعودية وسوريا والإمارات، ويتولى الاستشارة والصياغة والتفاوض والمنازعات والتمثيل. استشرنا أونلاين وأرسل مستنداتك وتابع مسألتك عن بُعد مع الفريق نفسه.",
    purpose: "لا تحتاج إلى موعد في مكتب للاستفادة من خبرة فريقنا. أرسل سؤالك ومستنداتك من منزلك، وناقشها بالعربية أو الإنجليزية، وتسلّم مشورة تساعدك على اتخاذ القرار. من المسائل الأسرية والنزاعات العمالية إلى المعاملات العقارية والقرارات التجارية، نبني الخدمة حول وقائعك وأهدافك.",
    teamTitle: "المحامون الذين يشكّلون فريق كاونسلو",
    team: "يجمع كاونسلو محامين بنوا مسيرتهم المهنية في ثلاثة أنظمة قانونية مختلفة، ويزاولون المحاماة ضمن المكاتب الأعضاء في السعودية وسوريا والإمارات العربية المتحدة.",
    teamSupport: "يحتفظ كلّ مكتب باسمه وهويّته المهنية. وتعرّف ملفات المكاتب بمحاميها والبيئة القانونية التي اكتسب فيها كلّ فريق خبرته.",
    complexTitle: "من الأسئلة اليومية إلى القضايا المعقدة",
    complexText: "نتولى الأسئلة المباشرة والمعاملات التفصيلية والنزاعات المعقدة التي تتعدد أطرافها أو تتسع أدلتها أو ترتبط بأكثر من دولة. ويربط عملنا تحليل الملف بالاستراتيجية القانونية والصياغة ومفاوضات التسوية والمتابعة. ونتفق معك على خطة عمل واحدة تحدد أعضاء الفريق المسؤولين والخطوات القانونية والتمثيل المطلوب.",
    workTitle: "أعمال قانونية منشورة يمكنك الاطّلاع عليها",
    workText: "توضح أعمالنا المنشورة الأسئلة القانونية التي عالجناها ومنهج العمل والمستندات التي أعددناها. تصفح المسائل وما يتاح معها من مستندات داعمة للاطلاع على عمل الفريق في سياقه، ومناقشة الخبرة المرتبطة بمسألتك.",
    workLink: "تصفح أعمالنا القانونية المنشورة",
    servicesTitle: "ما الذي نقدمه لك؟",
    servicesIntro: "تشمل خدماتنا العمل القانوني الذي تحتاجه المسألة: المشورة ومراجعة المستندات وصياغتها والتفاوض ودعم التقاضي والتحكيم والتمثيل والدعم القانوني المستمر.",
    services: [
      { title: "الأفراد والأسرة", text: "الاستشارة وإعداد المستندات في مسائل الزواج والانفصال والنفقة والحضانة والميراث والحقوق العمالية والمنازعات المالية الشخصية." },
      { title: "العقارات والمعاملات", text: "مراجعة عقود البيع والإيجار وسجلات الملكية والالتزامات المالية والشروط المتنازع عليها، وإعداد الرأي والصياغة للتفاوض أو الخطوة القانونية التالية." },
      { title: "الشركات والمستثمرون", text: "صياغة العقود ومراجعتها، والمشورة في شؤون الشركات والاستثمار والترتيبات التجارية والامتثال، والدعم القانوني المستمر للأعمال." },
      { title: "المنازعات والمسائل العابرة للحدود", text: "تقييم المطالبات والأدلة، ومقترحات التسوية، والمذكرات القانونية والتحضير للإجراءات، والتمثيل مع فريق كاونسلو نفسه." },
    ],
    processTitle: "فريق واحد في كل مرحلة",
    process: [
      { title: "أخبرنا بما تحتاج إلى معالجته", text: "أرسل سؤالك عبر واتساب أو البريد الإلكتروني، مع الدولة والوقائع الأساسية وأي موعد مهم. نراجع الطلب ونحدد المستندات اللازمة لتقييم مفيد لمسألتك." },
      { title: "اتفق مع فريقنا على العمل", text: "نحدد العمل القانوني والمخرجات وأعضاء الفريق المسؤولين والمواعيد. للاستشارات أونلاين رسوم ثابتة منشورة بحسب المجال، ونتفق على أتعاب الصياغة والتمثيل وفق العمل المطلوب. وبعد موافقتك على العرض، نرسل تعليمات الدفع ونؤكد بدء العمل المتفق عليه." },
      { title: "تابع العمل مع فريقنا", text: "نتولى العمل المتفق عليه من الاستشارة وإعداد المستندات إلى التفاوض أو التمثيل. ونطلعك على تقدم العمل والمواعيد والخطوات التالية. يمكنك التواصل معنا عبر البريد الإلكتروني أو واتساب، مع إتاحة المكالمات الهاتفية والمرئية بحسب الاتفاق." },
    ],
    standardsTitle: "المعايير التي تحكم عملنا",
    standards: `${COUNSELO_CLIENT_TRUST.ar} ونكسب هذه الثقة بدقة التحليل وجودة الصياغة ووضوح التواصل. تربط استشارتنا أدلتك بموقفك القانوني، وتشرح خياراتك، وتحدد الخطوة العملية التالية. وتعرف ما الذي نعدّه لك ومتى تتسلمه.`,
    privacy: "نتعامل مع معلوماتك وفق التزامات السرية المهنية والخصوصية المنطبقة. والمستندات التي نطلبها تخدم تقييم مسألتك؛ أما أي خدمة إضافية أو تمثيل محلي أو دعم مستمر، فنناقشه معك ونتفق عليه.",
    privacyLink: "الخصوصية والتعامل مع معلوماتك",
    founderLabel: "مؤسس كاونسلو وقيادتها القانونية",
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
    partnerLabel: "من فريق كاونسلو في السعودية",
    licenceLabel: "رخصة المحامي عبدالله العنزي",
    directoryLabel: "البحث في دليل المحامين لدى الهيئة السعودية للمحامين",
    faqTitle: "أسئلتك عن خدماتنا القانونية",
    faqs: [
      { question: "ما الخدمات القانونية التي تقدمها كاونسلو؟", answer: "تقدم كاونسلو الاستشارات والتحليل القانوني وصياغة العقود والمستندات والتفاوض والتقاضي والتحكيم والدعم القانوني المستمر في السعودية وسوريا والإمارات. ويضم فريقنا المحامين والمكاتب المرخصة محلياً التي تتولى التمثيل أمام المحاكم والجهات المختصة، لتبقى مع كاونسلو من استشارتك الأولى إلى مراحل العمل المتفق عليها.", link: null },
      { question: "هل تتولى كاونسلو القضايا البسيطة والمعقدة؟", answer: "نعم. يتولى فريقنا الأسئلة القانونية اليومية والمسائل المعقدة التي تتعدد أطرافها أو تتسع أدلتها أو ترتبط بأكثر من دولة. ونضع خطة عمل تشمل الاستراتيجية القانونية والمستندات والمواعيد والمهنيين المسؤولين عن المراحل المتفق عليها.", link: null },
      { question: "أين يمكنني الاطّلاع على خبرة كاونسلو؟", answer: "يتضمن قسم أعمالنا دراسات قضايا ومراجعات عقود ومستندات قانونية داعمة منشورة. وتوضح هذه السجلات المسألة القانونية والعمل المنجز وسياق الملف، بما يشمل العقود التجارية ومطالبة تجارية سعودية ونزاعاً عابراً للحدود. ويعبّر رقم الأعمال عن عدد السجلات المنشورة في مكتبة المنصة.", link: { label: "اطّلع على أعمالنا المنشورة", href: "/ar/our-work" } },
    ],
    ctaTitle: "ضع خبرتنا القانونية في خدمة مسألتك.",
    ctaText: "اختر كاونسلو لإجابة واضحة أو مستند محكم الصياغة أو تمثيل في نزاع. تعامل مع فريق متمرس واحد للاستشارة والصياغة والتفاوض والإجراءات القضائية، مع سهولة التواصل أينما كنت.",
    ctaNote: "اذكر الدولة وهدفك وأي موعد قريب. نتفق على نطاق العمل والأتعاب وموعد التسليم قبل بدء العمل المدفوع.",
    whatsapp: "تواصل معنا عبر واتساب",
  },
} as const;

export const aboutRegions: Record<Region, { en: { country: string; focus: string; partnerTitle: string; partnerText: string }; ar: { country: string; focus: string; partnerTitle: string; partnerText: string } }> = {
  sa: {
    en: { country: "Saudi Arabia", focus: "For Saudi matters, we assess family, employment, property, commercial and investment questions against the relevant Saudi rules and documents, with online support available throughout the Kingdom.", partnerTitle: COOPERATING_OFFICES.saudi.name, partnerText: "Based in Dammam, Abdullah Al-Anzi Law Office is an established Saudi firm listed in the Saudi Bar Association’s register of law firms. Abdullah Moghthi Qaid Al-Anazi practises alongside the office’s group of licensed Saudi lawyers. They bring their experience in the Saudi legal profession to CounselO Legal as members of its Saudi team." },
    ar: { country: "السعودية", focus: "في المسائل السعودية، نراجع شؤون الأسرة والعمل والعقارات والتجارة والاستثمار في ضوء الأنظمة والمستندات ذات الصلة، مع إتاحة الدعم أونلاين في جميع أنحاء المملكة.", partnerTitle: COOPERATING_OFFICES.saudi.alternateName, partnerText: "مكتب المحامي عبدالله العنزي مكتب محاماة سعودي راسخ مقره الدمام، ومقيّد في سجل المنشآت القانونية لدى الهيئة السعودية للمحامين. يزاول المحامي عبدالله مغثي قاعد العنزي المحاماة إلى جانب زملائه المرخّصين في المكتب. وينتمي محامو المكتب جميعاً إلى فريق كاونسلو السعودي، بما يحملونه من خبرة مهنية في المملكة." },
  },
  syr: {
    en: { country: "Syria", focus: "For Syrian matters, we review family and inheritance questions, property records, civil obligations and commercial disputes, and prepare advice and documents around the relevant Syrian law and procedural stage.", partnerTitle: "Law firms on our team in Syria", partnerText: "Two established law firms belong to CounselO Legal’s Syrian team, each with its own history and group of licensed lawyers." },
    ar: { country: "سوريا", focus: "في المسائل السورية، نراجع شؤون الأسرة والميراث والسجلات العقارية والالتزامات المدنية والمنازعات التجارية، ونعد الاستشارة والمستندات وفق القانون السوري ذي الصلة والمرحلة الإجرائية للمسألة.", partnerTitle: "مكاتب المحاماة في فريقنا السوري", partnerText: "يضمّ فريق كاونسلو السوري مكتبين راسخين للمحاماة، لكلّ منهما مسيرته المهنية وفريقه من المحامين المرخّصين." },
  },
  uae: {
    en: { country: "the UAE", focus: "For UAE matters, we assess employment, property, family, company and commercial questions with attention to the emirate, the relevant authority and any mainland or free-zone framework affecting the request.", partnerTitle: "Our CounselO team in the UAE", partnerText: "CounselO Legal’s team in the Emirates brings together member law firms and the licensed lawyers who practise with them. Each firm contributes its own group of lawyers, whose professional experience in the UAE is part of the collective experience of CounselO’s regional team." },
    ar: { country: "الإمارات", focus: "في المسائل الإماراتية، نراجع شؤون العمل والعقارات والأسرة والشركات والتجارة، مع تحديد الإمارة والجهة المختصة وأثر القواعد المنطبقة داخل الدولة أو في المنطقة الحرة على الطلب.", partnerTitle: "فريق كاونسلو في الإمارات", partnerText: "يجمع فريق كاونسلو في الإمارات مكاتب المحاماة الأعضاء والمحامين المرخّصين العاملين فيها. وينضمّ كل مكتب بفريقه من المحامين إلى كاونسلو، لتكون خبراتهم المهنية في الإمارات جزءاً من الخبرة التي يجمعها الفريق القانوني في البلدان الثلاثة." },
  },
};
