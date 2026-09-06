/** Individually selected topics. These are editorial drafts, not professional legal approvals. */
export type MatterEditorial = {
  id: string;
  titles: string[];
  factsEn: string; factsAr: string;
  evidenceEn: string; evidenceAr: string;
  outcomeEn: string; outcomeAr: string;
  summaryEn: string; summaryAr: string;
  questions: { en: string[]; ar: string[] };
  faqs: { en: { q: string; a: string }[]; ar: { q: string; a: string }[] };
};

import { ADDITIONAL_MATTER_EDITORIAL } from "./matter-editorial-additions.js";

export const MATTER_EDITORIAL: readonly MatterEditorial[] = [
  ...ADDITIONAL_MATTER_EDITORIAL,
  {
    id: "personal-data-incident",
    titles: ["Personal-data breach response", "Data-protection incidents"],
    factsEn: "which personal data may have been accessed, disclosed, lost or changed, which people and systems are affected, and what is known rather than assumed about the incident",
    factsAr: "البيانات الشخصية التي ربما جرى الوصول إليها أو كشفها أو فقدها أو تعديلها، والأشخاص والأنظمة المتأثرة، وما ثبت بشأن الواقعة وما لا يزال مجرد احتمال",
    evidenceEn: "a restricted incident chronology, access and security logs, the affected data categories, processor agreements and records of containment and communications",
    evidenceAr: "تسلسل زمني محدود التداول للواقعة وسجلات الدخول والأمن وفئات البيانات المتأثرة واتفاقات معالجة البيانات وسجل الاحتواء والمراسلات",
    outcomeEn: "assess the incident, preserve evidence and establish whether notification, remedial action or a response to affected people is required",
    outcomeAr: "تقييم الواقعة وحفظ الأدلة وتحديد ما إذا كان يلزم إخطار أو إجراء تصحيحي أو رد على الأشخاص المتأثرين",
    summaryEn: "A personal-data incident needs a documented account of what happened, which data and people are affected, and what has been contained. Notification duties and timing require a separate jurisdiction-specific assessment.",
    summaryAr: "تحتاج واقعة البيانات الشخصية إلى توثيق ما حدث والبيانات والأشخاص المتأثرين وإجراءات الاحتواء. ويتطلب تحديد واجب الإخطار وميعاده تقييماً منفصلاً وفق الاختصاص، ولا يُفترض انطباق مدة واحدة على كل واقعة.",
    questions: {
      en: ["When was the incident discovered, and when might access or disclosure have begun?", "Which data categories, people, systems and external processors are affected?", "What containment steps were taken, and did they preserve the investigation records?"],
      ar: ["متى اكتُشفت الواقعة ومتى ربما بدأ الوصول أو الإفصاح؟", "ما فئات البيانات والأشخاص والأنظمة وجهات المعالجة الخارجية المتأثرة؟", "ما إجراءات الاحتواء المتخذة وهل حافظت على سجلات التحقيق؟"],
    },
    faqs: {
      en: [{ q: "Should I send the leaked personal data with my first inquiry?", a: "Describe the data categories and scale without circulating the leaked dataset. Use a restricted summary first; agree a secure, limited transfer if specific records are needed for the assessment." }, { q: "Does every data incident require the same notification?", a: "Do not assume a universal notification rule or deadline. Identify the controller and processor roles, relevant jurisdictions, affected data and discovery timeline so the applicable duties can be checked promptly. This page does not establish whether your incident is reportable." }],
      ar: [{ q: "هل أرسل البيانات الشخصية المسربة مع الاستفسار الأول؟", a: "صف فئات البيانات ونطاق الواقعة دون إعادة تداول مجموعة البيانات المسربة. ابدأ بملخص محدود التداول، واتفق على نقل آمن ومحدود إذا لزم الاطلاع على سجلات معينة للتقييم." }, { q: "هل تتطلب جميع حوادث البيانات الإخطار نفسه؟", a: "لا تفترض وجود قاعدة أو ميعاد موحد للإخطار. حدّد أدوار التحكم والمعالجة والاختصاصات والبيانات المتأثرة وتسلسل الاكتشاف للتحقق العاجل من الالتزامات المنطبقة. لا تقرر هذه الصفحة ما إذا كانت واقعتك تستوجب الإبلاغ." }],
    },
  },
  {
    id: "account-recovery",
    titles: ["Compromised-account recovery and access restoration", "Online account recovery and platform complaint", "Hacked account and unauthorized access"],
    factsEn: "who controls the account, how access was lost, changes to recovery details, platform responses and whether impersonation or unauthorized transactions followed",
    factsAr: "من يسيطر على الحساب وكيف فُقد الوصول وتغييرات بيانات الاسترداد وردود المنصة وما إذا تلا الواقعة انتحال أو معاملات غير مأذون بها",
    evidenceEn: "account identifiers, original recovery messages, security alerts, dated screenshots, support ticket numbers and proof of account ownership without passwords or recovery codes",
    evidenceAr: "معرّفات الحساب ورسائل الاسترداد الأصلية والتنبيهات الأمنية ولقطات الشاشة المؤرخة وأرقام طلبات الدعم وما يثبت ملكية الحساب دون كلمات مرور أو رموز استرداد",
    outcomeEn: "organize an ownership and incident record, assess the platform response and identify any separate complaint or loss claim",
    outcomeAr: "تنظيم إثبات ملكية الحساب وسجل الواقعة وتقييم رد المنصة وتحديد أي شكوى أو مطالبة مستقلة عن الخسارة",
    summaryEn: "Account recovery starts with ownership evidence, security alerts and the platform's response. Regaining access, removing impersonation and recovering a financial loss are separate objectives and may require different steps.",
    summaryAr: "يبدأ استرداد الحساب بإثبات الملكية والتنبيهات الأمنية ورد المنصة. استعادة الوصول وإزالة الانتحال واسترداد خسارة مالية أهداف منفصلة وقد تحتاج إلى خطوات مختلفة، ولا تكفي مطالبة مالية وحدها لمعالجة فقدان الحساب.",
    questions: { en: ["Can you still access a trusted recovery email or phone?", "What did the platform say in each support ticket?", "Was the account only inaccessible, or was it used for impersonation or transactions?"], ar: ["هل ما زلت تستطيع الوصول إلى بريد أو هاتف استرداد موثوق؟", "ماذا كان رد المنصة في كل طلب دعم؟", "هل تعذر الوصول فقط أم استُخدم الحساب للانتحال أو المعاملات؟"] },
    faqs: {
      en: [{ q: "Does CounselO need my password or one-time recovery code?", a: "No. Do not share passwords, authentication codes or backup codes. Provide account identifiers, redacted security alerts and support correspondence. Use the platform's official recovery tools and keep a record of each request." }, { q: "Is recovering an account the same as recovering stolen money?", a: "No. Account access, content removal, a platform complaint and a financial-loss claim should be assessed separately. Preserve transaction references where relevant, but do not assume that restoring access reverses a transfer or determines liability." }],
      ar: [{ q: "هل تحتاج كاونسلو إلى كلمة المرور أو رمز استرداد لمرة واحدة؟", a: "لا. لا تشارك كلمات المرور أو رموز المصادقة أو الرموز الاحتياطية. قدّم معرّفات الحساب والتنبيهات الأمنية بعد حجب البيانات غير اللازمة ومراسلات الدعم. استخدم أدوات الاسترداد الرسمية للمنصة واحتفظ بسجل لكل طلب." }, { q: "هل استرداد الحساب هو نفسه استرداد الأموال المسروقة؟", a: "لا. يلزم تقييم الوصول إلى الحساب وإزالة المحتوى والشكوى للمنصة ومطالبة الخسارة المالية كلٌّ على حدة. احفظ مراجع المعاملات عند صلتها بالواقعة، ولا تفترض أن استعادة الوصول تعكس التحويل أو تحسم المسؤولية." }],
    },
  },
  {
    id: "non-traffic-injury",
    titles: ["Personal injury compensation for a non-traffic accident", "Personal injury compensation claim"],
    factsEn: "the location and mechanism of the injury, the people or premises involved, the reported hazard, treatment and the connection between the event and claimed loss",
    factsAr: "مكان الإصابة وكيفية وقوعها والأشخاص أو المنشأة المعنية والخطر المبلغ عنه والعلاج والصلة بين الواقعة والخسارة المطالب بها",
    evidenceEn: "an incident report if available, dated photographs, witness details, medical records, treatment invoices and records of absence or income loss",
    evidenceAr: "محضر الواقعة إن وجد والصور المؤرخة وبيانات الشهود والسجلات الطبية وفواتير العلاج وإثبات الغياب أو فقدان الدخل",
    outcomeEn: "assess the alleged responsibility, causal link and documented loss without assuming a traffic or motor-insurance procedure",
    outcomeAr: "تقييم المسؤولية المدعى بها والسببية والخسارة الموثقة دون افتراض تطبيق إجراء مروري أو تأمين مركبات",
    summaryEn: "A non-traffic injury should be assessed from the incident, responsibility, medical evidence and documented loss. A premises accident, workplace incident and treatment-related injury may involve different legal routes.",
    summaryAr: "تُقيّم الإصابة غير المرورية انطلاقاً من الواقعة والمسؤولية والأدلة الطبية والخسارة الموثقة. وقد تختلف المسارات القانونية بين حادث في منشأة وإصابة عمل وإصابة مرتبطة بالعلاج، فلا يُفترض اتباع إجراء مروري.",
    questions: { en: ["Where and how did the injury occur, and who was informed?", "Is the event connected to work, treatment or a condition on premises?", "Which treatment costs and income losses can be supported by records?"], ar: ["أين وكيف وقعت الإصابة ومن أُبلغ بها؟", "هل ترتبط الواقعة بالعمل أو العلاج أو حالة في منشأة؟", "ما تكاليف العلاج وخسائر الدخل التي تؤيدها مستندات؟"] },
    faqs: {
      en: [{ q: "Do I need a traffic report for a non-traffic injury?", a: "Do not substitute a traffic checklist for the actual incident. Preserve the incident report that exists, photographs, witnesses and treatment records. The appropriate reporting body and evidence requirements depend on how and where the injury occurred." }, { q: "Can compensation be estimated from the injury description alone?", a: "An injury label alone is insufficient. The assessment needs evidence of responsibility, causation and actual loss, together with the applicable legal framework. Keep separate records for treatment, other expenses and income loss; no amount or recovery is guaranteed." }],
      ar: [{ q: "هل أحتاج إلى تقرير مروري لإصابة غير مرورية؟", a: "لا تستبدل مستندات الواقعة الفعلية بقائمة مرورية. احفظ محضر الواقعة المتاح والصور وبيانات الشهود وسجلات العلاج. تتوقف جهة الإبلاغ المناسبة ومتطلبات الإثبات على كيفية وقوع الإصابة ومكانها." }, { q: "هل يمكن تقدير التعويض من وصف الإصابة وحده؟", a: "لا يكفي اسم الإصابة. يحتاج التقييم إلى إثبات المسؤولية والسببية والخسارة الفعلية والإطار القانوني المنطبق. افصل سجلات العلاج والمصروفات الأخرى وفقدان الدخل، ولا يمكن ضمان مبلغ أو تحصيل." }],
    },
  },
  {
    id: "will-validity",
    titles: ["Will validity and estate distribution", "Contested will and inheritance distribution dispute", "Foreign will recognition and probate"],
    factsEn: "which will is relied on, its execution and amendment history, the grounds of challenge, the deceased's relevant connections and the countries where assets are situated",
    factsAr: "الوصية المستند إليها وتاريخ إعدادها وتعديلها وأسباب المنازعة وصلات المتوفى ذات الصلة والدول التي توجد فيها الأموال",
    evidenceEn: "the will and earlier versions, death and identity records, available execution or registration records, asset locations and any probate or estate orders",
    evidenceAr: "الوصية ونسخها السابقة ومستندات الوفاة والهوية وسجلات الإنشاء أو التسجيل المتاحة ومواقع الأموال وأي قرارات بشأن الوصية أو التركة",
    outcomeEn: "identify the validity or recognition questions and separate them from administration and eventual distribution of the estate",
    outcomeAr: "تحديد مسائل صحة الوصية أو الاعتراف بها وفصلها عن إدارة التركة وتوزيعها لاحقاً",
    summaryEn: "A contested or foreign will requires review of the document, competing versions, grounds of challenge and asset locations. Validity, recognition and distribution are different questions; a foreign document is not assumed to govern every asset.",
    summaryAr: "تحتاج الوصية المتنازع عليها أو الأجنبية إلى مراجعة المستند والنسخ المتعارضة وأسباب المنازعة ومواقع الأموال. صحة الوصية والاعتراف بها والتوزيع مسائل مختلفة، ولا يُفترض أن المستند الأجنبي يحكم جميع الأموال.",
    questions: { en: ["Which original or certified version is available, and are there later amendments?", "What specific validity or recognition objection is being raised?", "Where are the assets and any existing estate proceedings?"], ar: ["ما النسخة الأصلية أو المصدقة المتاحة وهل توجد تعديلات لاحقة؟", "ما الاعتراض المحدد على الصحة أو الاعتراف؟", "أين توجد الأموال وأي إجراءات قائمة بشأن التركة؟"] },
    faqs: {
      en: [{ q: "Does a will made abroad automatically govern local assets?", a: "Do not assume automatic effect. The document, the deceased's relevant connections, asset location and any existing order need review under the applicable jurisdiction's rules. Recognition of the document and authority to transfer a particular asset must be checked separately." }, { q: "What if family members have different versions of the will?", a: "Preserve every version with its source and date, without marking or altering originals. List the differences and any execution or registration records. Whether a later document replaces an earlier one requires legal assessment, not a comparison of dates alone." }],
      ar: [{ q: "هل تحكم الوصية المحررة في الخارج الأموال المحلية تلقائياً؟", a: "لا تفترض الأثر التلقائي. يلزم فحص المستند وصلات المتوفى ذات الصلة وموقع الأموال وأي قرار قائم وفق قواعد الاختصاص المنطبق. ويُتحقق بصورة منفصلة من الاعتراف بالمستند وصلاحية نقل مال معين." }, { q: "ماذا لو كانت لدى أفراد الأسرة نسخ مختلفة من الوصية؟", a: "احفظ كل نسخة مع مصدرها وتاريخها دون الكتابة على الأصول أو تعديلها. بيّن الاختلافات وأي سجلات إنشاء أو تسجيل. يحتاج اعتبار مستند لاحق بديلاً عن سابق إلى تقييم قانوني، لا إلى مقارنة التواريخ وحدها." }],
    },
  },
  {
    id: "estate-administration",
    titles: ["Estate administration and asset transfer", "Inheritance document and civil-record correction"],
    factsEn: "the authority to act for the estate, inconsistencies in identity or civil records, the inventory of assets and liabilities and the transfer requested from each institution",
    factsAr: "صلاحية التصرف باسم التركة والتعارض في الهوية أو القيود المدنية وجرد الأموال والالتزامات وإجراء النقل المطلوب من كل مؤسسة",
    evidenceEn: "death and civil-status records, estate or succession orders, a list of assets and liabilities, institution correspondence and the document containing the disputed entry",
    evidenceAr: "مستندات الوفاة والحالة المدنية وقرارات التركة أو الإرث وقائمة الأموال والالتزامات ومراسلات المؤسسات والمستند المتضمن للقيد المختلف عليه",
    outcomeEn: "identify missing authority or records and organize the institution-specific correction or transfer requests before distribution is proposed",
    outcomeAr: "تحديد الصلاحيات أو المستندات الناقصة وتنظيم طلبات التصحيح أو النقل الخاصة بكل مؤسسة قبل اقتراح التوزيع",
    summaryEn: "Estate administration starts by identifying who may act, which records are missing and which assets and liabilities exist. Correcting an inheritance record, obtaining authority and transferring an asset are separate steps.",
    summaryAr: "تبدأ إدارة التركة بتحديد من يملك صلاحية التصرف والمستندات الناقصة والأموال والالتزامات القائمة. تصحيح مستند الإرث وإثبات الصلاحية ونقل المال خطوات منفصلة، ولا تعني معرفة الورثة وحدها اكتمال متطلبات النقل.",
    questions: { en: ["Who is seeking to act for the estate and under which document?", "Which institution rejected or requested correction of a record?", "Is there an inventory of debts as well as assets?"], ar: ["من يطلب التصرف باسم التركة وبموجب أي مستند؟", "ما المؤسسة التي رفضت مستنداً أو طلبت تصحيحه؟", "هل يشمل الجرد الديون إلى جانب الأموال؟"] },
    faqs: {
      en: [{ q: "Should assets be distributed before records and liabilities are checked?", a: "Do not treat an initial family agreement as confirmation that distribution can proceed. Identify the authority to act, outstanding liabilities, disputed records and institution requirements first. The lawful sequence must be confirmed for the particular estate." }, { q: "What should I provide when an institution rejects an inheritance record?", a: "Provide the rejected document, the institution's written reason, the entry said to be incorrect and records showing the proposed correction. Distinguish a clerical discrepancy from a dispute about a person's entitlement; they may require different assessments." }],
      ar: [{ q: "هل توزع الأموال قبل مراجعة القيود والالتزامات؟", a: "لا تعتبر الاتفاق الأسري الأولي تأكيداً لجواز بدء التوزيع. حدّد أولاً صلاحية التصرف والالتزامات القائمة والقيود المتنازع عليها ومتطلبات المؤسسات. يلزم تأكيد التسلسل القانوني للتركة المعينة." }, { q: "ماذا أقدم إذا رفضت مؤسسة مستند الإرث؟", a: "قدّم المستند المرفوض والسبب المكتوب للرفض والقيد المطلوب تصحيحه والمستندات المؤيدة للتصحيح المقترح. ميّز الاختلاف الكتابي عن النزاع حول استحقاق شخص، فقد يحتاج كل منهما إلى تقييم مختلف." }],
    },
  },
  {
    id: "medical-expert-report",
    titles: ["Challenge to an adverse medical expert report"],
    factsEn: "which medical records or report are available, the questions the expert was asked, any missing material and the specific reasoning or factual statement disputed",
    factsAr: "السجلات أو التقرير الطبي المتاح والأسئلة المكلف بها الخبير والمواد الناقصة والتعليل أو الواقعة المحددة محل المنازعة",
    evidenceEn: "the complete medical record available to the patient, the expert report and appendices, referral questions, a treatment chronology and the correspondence about access or objections",
    evidenceAr: "السجل الطبي الكامل المتاح للمريض وتقرير الخبير ومرفقاته وأسئلة الإحالة وتسلسل العلاج والمراسلات بشأن الاطلاع أو الاعتراض",
    outcomeEn: "distinguish missing-record issues from a challenge to expert reasoning and determine what further medical or procedural assessment is needed",
    outcomeAr: "التمييز بين نقص السجلات ومنازعة تعليل الخبير وتحديد التقييم الطبي أو الإجرائي الإضافي المطلوب",
    summaryEn: "An adverse report is not assessed by disagreement with its conclusion alone. Identify missing records, factual errors and unanswered questions. Clinical assessment belongs to an appropriately qualified medical expert; legal review addresses the process and implications.",
    summaryAr: "لا يُقيّم التقرير الضار بالموقف بمجرد عدم الموافقة على نتيجته. حدّد السجلات الناقصة والأخطاء الواقعية والأسئلة غير المجاب عنها. التقييم السريري من اختصاص خبير طبي مؤهل، بينما تتناول المراجعة القانونية الإجراء وآثاره.",
    questions: { en: ["Does the report identify the complete records and questions it considered?", "Which factual statement or conclusion is disputed, and why?", "Has a notice set a response date or a procedure for requesting records?"], ar: ["هل يحدد التقرير السجلات الكاملة والأسئلة التي تناولها؟", "ما الواقعة أو النتيجة المعترض عليها ولماذا؟", "هل حدد إخطار ميعاداً للرد أو إجراء لطلب السجلات؟"] },
    faqs: {
      en: [{ q: "Is an unfavourable medical report proof that an objection will fail?", a: "The report must be read in context. Identify its instructions, evidence and reasoning, together with the stage of the proceedings. A possible objection needs specific grounds; neither an unfavourable conclusion nor a second opinion alone establishes the legal outcome." }, { q: "Can a legal review replace a medical expert's assessment?", a: "No. Legal review can organize the evidence, identify procedural questions and assess the legal implications of a report. It cannot independently establish the clinical standard, diagnosis or medical causation without appropriate medical expertise." }],
      ar: [{ q: "هل يثبت التقرير الطبي غير الملائم أن الاعتراض سيفشل؟", a: "يجب قراءة التقرير في سياقه، مع تحديد التكليف والأدلة والتعليل والمرحلة الإجرائية. يحتاج الاعتراض المحتمل إلى أسباب محددة، ولا تحسم النتيجة غير الملائمة أو الرأي الطبي الثاني وحده المآل القانوني." }, { q: "هل تحل المراجعة القانونية محل تقييم الخبير الطبي؟", a: "لا. تنظم المراجعة القانونية الأدلة وتحدد المسائل الإجرائية وتقيّم الآثار القانونية للتقرير. ولا تثبت بصورة مستقلة المعيار السريري أو التشخيص أو السببية الطبية دون خبرة طبية مناسبة." }],
    },
  },
];

export function getMatterEditorial(title: string): MatterEditorial | undefined {
  return MATTER_EDITORIAL.find(entry => entry.titles.includes(title));
}
