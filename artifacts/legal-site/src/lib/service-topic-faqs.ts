import { urgentCopy } from "./urgent-legal-assistance";
import { SERVICE_TOPICS } from "./matter-topic-routing.js";
type Faq = { q: string; a: string };
type Pair = { en: Faq; ar: Faq };
/** Practical distinctions for every offered service family, without invented statutory rules. */
const FAQS: Record<string, Pair> = {
  family: {
    en: { q: "Are divorce, custody, maintenance and travel permission the same issue?", a: "They should be identified separately. State which outcome you need, whether there are existing orders or agreements, where the family members live and whether travel is proposed. A conclusion on one family issue does not by itself resolve the others." },
    ar: { q: "هل الطلاق والحضانة والنفقة وإذن السفر مسألة واحدة؟", a: "ينبغي تحديد كل مسألة على حدة. وضّح النتيجة المطلوبة والأحكام أو الاتفاقات القائمة ومحل إقامة أفراد الأسرة وأي سفر مقترح. لا يحسم الاستنتاج في إحدى المسائل الأسرية بقية المسائل تلقائياً." },
  },
  estate: {
    en: { q: "What should be clarified before dealing with an estate?", a: "Identify the deceased, available death and family records, any will or estate order, assets, liabilities and the person proposing to act. Authority to administer, validity of a document and eventual distribution need separate assessment; do not assume a share or transfer right from a general example." },
    ar: { q: "ما الذي ينبغي توضيحه قبل التعامل مع التركة؟", a: "حدّد المتوفى ومستندات الوفاة والأسرة المتاحة وأي وصية أو قرار بشأن التركة والأموال والالتزامات ومن يقترح التصرف. تحتاج صلاحية الإدارة وصحة المستند والتوزيع إلى تقييم منفصل؛ فلا تفترض حصة أو حق نقل استناداً إلى مثال عام." },
  },
  employment: {
    en: { q: "Should an employment claim combine all amounts into one figure?", a: "Keep salary, allowances, commission, leave, termination-related amounts and payments already received in separate lines with their supporting records. Identify what is disputed and why. A clear breakdown supports assessment without assuming that every requested amount is legally due." },
    ar: { q: "هل أجمع جميع المستحقات العمالية في مبلغ واحد؟", a: "افصل الأجر والبدلات والعمولات والإجازات والمبالغ المرتبطة بالإنهاء وما سبق قبضه في بنود مستقلة مع مستنداتها. حدّد البنود المتنازع عليها وأسباب الخلاف. يساعد التفصيل على التقييم دون افتراض استحقاق كل مبلغ مطلوب قانوناً." },
  },
  commercial: {
    en: { q: "Is an unpaid invoice always the same as a commercial contract dispute?", a: "An invoice identifies a demand, but the dispute may concern delivery, acceptance, price, an offset or who contracted. Match the invoice to the order, performance and payments before deciding whether the main issue is an unpaid balance or a disputed obligation." },
    ar: { q: "هل الفاتورة غير المدفوعة هي دائماً نزاع العقد التجاري نفسه؟", a: "تحدد الفاتورة مطالبة، لكن الخلاف قد يتعلق بالتسليم أو القبول أو السعر أو المقاصة أو هوية المتعاقد. طابق الفاتورة مع الطلب والتنفيذ والمدفوعات قبل تحديد ما إذا كانت المسألة رصيداً غير مسدد أو التزاماً متنازعاً عليه." },
  },
  company: {
    en: { q: "How does a shareholder dispute differ from a company's customer debt?", a: "A shareholder dispute may involve ownership, voting, management authority, accounts or exit terms. A customer debt concerns a separate transaction with the company. Identify the claimant's capacity and keep company obligations separate from any alleged personal obligation of a shareholder or director." },
    ar: { q: "كيف يختلف نزاع الشركاء عن دين عميل للشركة؟", a: "قد يتعلق نزاع الشركاء بالملكية أو التصويت أو صلاحيات الإدارة أو الحسابات أو شروط التخارج. أما دين العميل فيتعلق بمعاملة مستقلة مع الشركة. حدّد صفة صاحب المطالبة وافصل التزامات الشركة عن أي التزام شخصي مدعى به للشريك أو المدير." },
  },
  property: {
    en: { q: "Should I focus on title, possession or the property contract?", a: "Identify which of these is disputed. A title record, a right to occupy, a sale promise and a claim for defects are not interchangeable. Provide the property identifier, ownership or registration documents, the relevant agreement and the precise notice, handover or defect event." },
    ar: { q: "هل أركز على الملكية أم الحيازة أم العقد العقاري؟", a: "حدّد أيها محل الخلاف. قيد الملكية وحق الإشغال والوعد بالبيع ومطالبة العيوب ليست أموراً متطابقة. قدّم معرّف العقار ومستندات الملكية أو التسجيل والاتفاق ذي الصلة وواقعة الإخطار أو التسليم أو العيب المحددة." },
  },
  investment: {
    en: { q: "Is forming a company enough to confirm an investment can operate?", a: "Separate formation from activity permissions, ownership conditions, contractual commitments and operational requirements. Describe the actual activity, investors, financing and locations. The assessment must address that structure rather than assume that incorporation resolves every market-entry question." },
    ar: { q: "هل يكفي تأسيس الشركة لتأكيد إمكان تشغيل الاستثمار؟", a: "افصل التأسيس عن أذونات النشاط وشروط الملكية والالتزامات العقدية ومتطلبات التشغيل. صف النشاط الفعلي والمستثمرين والتمويل والمواقع. يجب أن يتناول التقييم هذا الهيكل بدلاً من افتراض أن التأسيس يحسم جميع مسائل دخول السوق." },
  },
  regulatory: {
    en: { q: "What matters most when challenging an administrative decision?", a: "Obtain the actual decision, stated reasons and evidence of notification. Distinguish a refusal, a penalty, a request for information and a suspension. The issuing body's identity, procedural stage and stated response date are essential before choosing a correction, objection or other route." },
    ar: { q: "ما الأهم عند بحث الطعن في قرار إداري؟", a: "احصل على القرار الفعلي وأسبابه المذكورة وإثبات التبليغ. ميّز الرفض عن الغرامة وطلب المعلومات والإيقاف. هوية الجهة المصدرة والمرحلة الإجرائية وميعاد الرد المذكور عناصر أساسية قبل اختيار التصحيح أو الاعتراض أو مسار آخر." },
  },
  arbitration: {
    en: { q: "What should I check before relying on an arbitration clause?", a: "Read the complete clause with the contract and any incorporated rules. Identify the parties, covered disputes, seat, language, appointment mechanism and any prior steps. Advice before a dispute differs from advice during proceedings or after an award; provide the actual procedural history." },
    ar: { q: "ما الذي أفحصه قبل الاعتماد على شرط التحكيم؟", a: "اقرأ الشرط كاملاً مع العقد وأي قواعد محال إليها. حدّد الأطراف والمنازعات المشمولة والمقر واللغة وآلية التعيين وأي خطوات سابقة. تختلف المشورة قبل النزاع عنها أثناء الإجراءات أو بعد الحكم؛ لذلك قدّم التاريخ الإجرائي الفعلي." },
  },
  enforcement: {
    en: { q: "Is proving a debt the same as enforcing it?", a: "Separate the basis and amount of the debt from whether there is an instrument or decision usable for the proposed enforcement step. Supply existing notices and payment records. An objection to the debt and an objection to a seizure or other measure can raise different questions." },
    ar: { q: "هل إثبات الدين هو نفسه تنفيذه؟", a: "افصل أساس الدين ومبلغه عن وجود سند أو قرار يصلح للخطوة التنفيذية المقترحة. قدّم الإخطارات القائمة وسجلات السداد. قد يثير الاعتراض على الدين مسائل تختلف عن الاعتراض على الحجز أو إجراء آخر." },
  },
  contract: {
    en: { q: "Which version of the contract should I send for review?", a: "Send the complete signed version, amendments and incorporated schedules, plus any disputed draft or notice. Identify whether the request is pre-signing review, interpretation during performance or advice after an alleged breach. A selected clause without its surrounding terms can give an incomplete picture." },
    ar: { q: "أي نسخة من العقد أرسل للمراجعة؟", a: "أرسل النسخة الموقعة كاملة وتعديلاتها وملاحقها المحال إليها، وأي مسودة أو إخطار محل خلاف. حدّد هل الطلب مراجعة قبل التوقيع أو تفسير أثناء التنفيذ أو مشورة بعد إخلال مدعى به. قد تعطي فقرة منفردة دون سياقها صورة ناقصة." },
  },
  criminal: {
    en: { q: "Does a complaint, summons or restriction establish guilt?", a: "Do not treat these as a final determination. Identify the document, issuing body and stage, and preserve the records without altering or destroying material. Explain any immediate restriction or attendance date so procedural advice addresses the actual position rather than assumptions about the allegation." },
    ar: { q: "هل تثبت الشكوى أو الاستدعاء أو القيد الإدانة؟", a: "لا تتعامل معها بوصفها حكماً نهائياً. حدّد المستند والجهة المصدرة والمرحلة، واحفظ السجلات دون تعديل أو إتلاف. وضّح أي قيد عاجل أو ميعاد حضور لتتناول المشورة الإجرائية الوضع الفعلي لا الافتراضات بشأن الاتهام." },
  },
  banking: {
    en: { q: "What should I clarify in a bank or financing complaint?", a: "Identify the account or product, disputed transaction, the bank's stated reason and previous complaint reference. Separate an unauthorized payment, account restriction, financing instalment and guarantee demand. They may involve different documents, parties and response routes." },
    ar: { q: "ما الذي أوضحه في شكوى مصرفية أو تمويلية؟", a: "حدّد الحساب أو المنتج والمعاملة محل الخلاف وسبب المصرف المذكور ومرجع الشكوى السابقة. افصل الدفع غير المأذون به عن قيد الحساب وقسط التمويل والمطالبة بالضمان، فقد تختلف المستندات والأطراف ومسارات الرد." },
  },
  ip: {
    en: { q: "Does registration advice differ from an infringement or takedown request?", a: "Registration concerns the claimed right, applicant and scope of protection. Infringement or removal requires the alleged use, ownership evidence, platform or market details and the requested response. Identify the actual right involved: a trademark, copyright, patent and trade secret need different analysis." },
    ar: { q: "هل تختلف استشارة التسجيل عن التعدي أو طلب الإزالة؟", a: "يتعلق التسجيل بالحق المدعى به ومقدم الطلب ونطاق الحماية. أما التعدي أو الإزالة فيحتاج إلى بيان الاستخدام المدعى به وإثبات الملكية والمنصة أو السوق والرد المطلوب. حدّد نوع الحق الفعلي؛ فالعلامة وحقوق المؤلف والبراءة والسر التجاري تحتاج إلى تحليل مختلف." },
  },
  tax: {
    en: { q: "Should different tax periods or penalties be combined in one explanation?", a: "Prepare a schedule for each tax, period and disputed item, showing the authority's figure, your calculation and supporting records. Distinguish registration, filing, payment, invoice correction and objection issues. Do not assume a rule for one tax or country applies to another." },
    ar: { q: "هل أجمع الفترات الضريبية أو الغرامات المختلفة في شرح واحد؟", a: "أعد جدولاً لكل ضريبة وفترة وبند محل خلاف يبين مبلغ الجهة وحسابك والمستندات المؤيدة. ميّز التسجيل والإقرار والسداد وتصحيح الفاتورة والاعتراض. لا تفترض أن قاعدة لضريبة أو دولة تنطبق على غيرها." },
  },
  cyber: {
    en: { q: "Are an online dispute, a data incident and a cybercrime allegation interchangeable?", a: "No. Describe the actual conduct, affected account or data, platform and location, and any notice received. Preserve original digital records and avoid sharing passwords or unnecessary personal data. A platform remedy, contractual response, privacy issue and criminal allegation require separate assessment." },
    ar: { q: "هل النزاع الإلكتروني وحادث البيانات واتهام الجريمة الإلكترونية شيء واحد؟", a: "لا. صف السلوك الفعلي والحساب أو البيانات المتأثرة والمنصة والمكان وأي إخطار وصل إليك. احفظ السجلات الرقمية الأصلية وتجنب مشاركة كلمات المرور أو البيانات الشخصية غير اللازمة. تحتاج معالجة المنصة والرد العقدي ومسألة الخصوصية والاتهام الجزائي إلى تقييم منفصل." },
  },
  medical: {
    en: { q: "What is the difference between a poor treatment outcome and a supported medical-liability concern?", a: "A poor outcome alone does not settle responsibility. Organize the treatment timeline, records, consent and claimed harm, identifying the particular act, delay or omission questioned. Clinical standards and medical causation may require appropriate medical expertise; legal assessment does not replace it." },
    ar: { q: "ما الفرق بين نتيجة علاجية غير موفقة ومسألة مسؤولية طبية مؤيدة؟", a: "لا تحسم النتيجة غير الموفقة وحدها المسؤولية. نظّم تسلسل العلاج والسجلات والموافقة والضرر المدعى به، وحدّد الفعل أو التأخير أو الامتناع محل التساؤل. قد تحتاج المعايير السريرية والسببية الطبية إلى خبرة طبية مناسبة لا يحل التقييم القانوني محلها." },
  },
  insurance: {
    en: { q: "How do I separate the underlying incident from the insurance coverage question?", a: "Keep evidence of the incident and loss alongside the complete policy, claim submission and insurer's reasons. Responsibility for an incident does not by itself answer every coverage, exclusion or notification question. Identify both what happened and why the insurer accepted, limited or refused the claim." },
    ar: { q: "كيف أفصل الواقعة الأصلية عن مسألة التغطية التأمينية؟", a: "احتفظ بأدلة الواقعة والخسارة إلى جانب الوثيقة كاملة وطلب المطالبة وأسباب شركة التأمين. لا تجيب المسؤولية عن الواقعة وحدها عن جميع مسائل التغطية أو الاستثناء أو الإخطار. حدّد ما حدث وسبب قبول المطالبة أو تقييدها أو رفضها." },
  },
  civil: {
    en: { q: "What should a civil claim or defence explain?", a: "Identify the parties, relationship, disputed act or obligation, alleged loss and the outcome requested. Distinguish an established fact from an inference and attach records supporting the important events. The assessment should address the legal basis and evidence, not the size of the demand alone." },
    ar: { q: "ماذا ينبغي أن يوضح ملف المطالبة أو الدفاع المدني؟", a: "حدّد الأطراف والعلاقة والفعل أو الالتزام المتنازع عليه والخسارة المدعى بها والنتيجة المطلوبة. ميّز الواقعة الثابتة عن الاستنتاج وأرفق ما يؤيد الأحداث المهمة. ينبغي أن يتناول التقييم الأساس القانوني والأدلة لا قيمة المطالبة وحدها." },
  },
  procedure: {
    en: { q: "What procedural history is needed before advice on filing or appeal?", a: "List the court or authority, case reference, parties, filing and service dates, orders and the latest notice. Identify the current step and requested change. A new claim, response, evidentiary request and appeal are not interchangeable, and their requirements must be checked separately." },
    ar: { q: "ما التاريخ الإجرائي المطلوب قبل المشورة بشأن القيد أو الطعن؟", a: "اذكر المحكمة أو الجهة ورقم الملف والأطراف وتواريخ القيد والتبليغ والأوامر وآخر إخطار. حدّد الخطوة الحالية والتغيير المطلوب. الدعوى الجديدة والرد والطلب المتعلق بالدليل والطعن ليست إجراءات متطابقة، ويجب التحقق من متطلبات كل منها منفصلة." },
  },
  insolvency: {
    en: { q: "How does business restructuring differ from an ordinary unpaid-debt dispute?", a: "Restructuring requires a wider view of cash flow, creditors, assets, security and existing proceedings. State whether you act for the business, a director or a creditor. A single unpaid invoice does not describe the whole financial position or establish which insolvency process is available." },
    ar: { q: "كيف تختلف إعادة تنظيم الأعمال عن نزاع دين غير مسدد؟", a: "تحتاج إعادة التنظيم إلى رؤية أشمل للتدفق النقدي والدائنين والأصول والضمانات والإجراءات القائمة. وضّح هل تتصرف باسم المنشأة أو المدير أو الدائن. لا تصف فاتورة غير مسددة واحدة الوضع المالي كاملاً ولا تحدد إجراء الإفلاس المتاح." },
  },
  immigration: {
    en: { q: "Are a visa issue, residence cancellation and travel restriction the same thing?", a: "Identify the precise status, issuing authority and written decision. Include nationality, visa category, sponsor or employer and relevant dates. Do not infer the meaning or scope of a restriction from an informal description; a work-permit matter may also need a separate employment assessment." },
    ar: { q: "هل مشكلة التأشيرة وإلغاء الإقامة وقيد السفر شيء واحد؟", a: "حدّد الوضع الدقيق والجهة المصدرة والقرار المكتوب، مع الجنسية وفئة التأشيرة والكفيل أو صاحب العمل والتواريخ ذات الصلة. لا تستنتج معنى القيد أو نطاقه من وصف غير رسمي؛ وقد تحتاج مسألة تصريح العمل أيضاً إلى تقييم عمالي منفصل." },
  },
  transport: {
    en: { q: "What changes the assessment of a shipping or passenger claim?", a: "Identify the transport mode, route, carrier and contracting parties, then the delay, damage, cancellation or loss. Provide the ticket or carriage document and complaint history. Cargo and passenger claims, and domestic and international routes, should not be assumed to follow identical rules." },
    ar: { q: "ما الذي يغير تقييم مطالبة الشحن أو المسافر؟", a: "حدّد وسيلة النقل والمسار والناقل والأطراف المتعاقدة ثم التأخير أو التلف أو الإلغاء أو الفقد. قدّم التذكرة أو مستند النقل وتاريخ الشكوى. لا يُفترض تطابق قواعد الشحن والمسافرين أو المسارات الداخلية والدولية." },
  },
  consumer: {
    en: { q: "Should I complain to the seller, platform or payment provider?", a: "Describe each party's role and what went wrong: the goods, service, delivery, account or payment. Keep the order, advertised terms, receipt and prior responses. The appropriate recipient and requested response depend on that relationship; a refund or charge reversal is not automatic." },
    ar: { q: "هل أوجه الشكوى إلى البائع أم المنصة أم مقدم الدفع؟", a: "صف دور كل طرف وما تعطل: السلعة أو الخدمة أو التسليم أو الحساب أو الدفع. احتفظ بالطلب والشروط المعلنة والإيصال والردود السابقة. تتوقف الجهة المناسبة والرد المطلوب على العلاقة، ولا يكون رد الثمن أو عكس الدفع تلقائياً." },
  },
};

export function serviceTopicFaq(slug: string, ar: boolean): Faq {
  if (slug === "urgent-legal-assistance") {
    const [q, a] = urgentCopy[ar ? "ar" : "en"].faqs[0];
    return { q, a };
  }
  const entry = FAQS[SERVICE_TOPICS[slug]];
  if (!entry) throw new Error(`Missing topic-specific FAQ for ${slug}`);
  return entry[ar ? "ar" : "en"];
}
