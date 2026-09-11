import type { Region } from "@workspace/api-zod/browser";
import { homepageContent } from "./homepage-content";

export function regionalHomeFaqs(region: Region, isArabic: boolean) {
  const c = homepageContent[isArabic ? "ar" : "en"];
  const shared = [c.questions[0], c.questions[1], c.questions[4], c.questions[5]];
  const local = {
    sa: {
      en: [
        ["Can I request Saudi legal advice while living abroad?", "Yes. Identify the Saudi matter, parties, documents and any deadline, even if you live elsewhere. We confirm whether consultation can proceed remotely and whether any later filing or representation requires a separately engaged Saudi professional."],
        ["What should a business or investor provide?", "Describe the proposed activity, entity or investment, current registration status and the decision you need to make. Identify any notice or correspondence from a Saudi authority. We confirm the relevant documents and scope before reviewing formation, contracts, approvals or a dispute."],
        ["What should I send about a Saudi dispute?", "Begin with a short chronology, your objective and any deadline. Identify the contract, notice, decision or judgment and the relevant court or authority if known. We confirm the evidence needed and distinguish advice from separately agreed proceedings."],
      ],
      ar: [
        ["هل يمكن طلب مشورة سعودية من خارج المملكة؟", "نعم. حدد المسألة السعودية والأطراف والمستندات وأي مهلة حتى لو كنت تقيم خارج المملكة. نؤكد إمكانية بدء الاستشارة عن بُعد، وما إذا كانت الإجراءات أو المرافعة اللاحقة تحتاج إلى مهني سعودي بتكليف منفصل."],
        ["ما المعلومات المطلوبة من شركة أو مستثمر؟", "وضح النشاط أو الكيان أو الاستثمار المقترح وحالة التسجيل الحالية والقرار الذي تريد اتخاذه. اذكر أي إخطار أو مراسلات مع جهة سعودية. نحدد المستندات والنطاق قبل مراجعة التأسيس أو العقود أو الموافقات أو النزاع."],
        ["ما الذي أرسله بشأن نزاع سعودي؟", "ابدأ بتسلسل موجز للوقائع وهدفك وأي مهلة. حدد العقد أو الإنذار أو القرار أو الحكم والمحكمة أو الجهة المعنية إن كانت معلومة. نؤكد الأدلة المطلوبة ونفصل المشورة عن الإجراءات المتفق عليها بصورة مستقلة."],
      ],
    },
    syr: {
      en: [
        ["Can Syrians abroad request property or inheritance advice?", "Yes. State where the property or records are located, your relationship to the matter and the result you need. Identify available ownership records, family documents, existing judgments or authorisations. We assess the document gaps and whether local steps require a separate engagement."],
        ["How are documents issued outside Syria reviewed?", "Identify the issuing country, document type, intended use and authority that will receive it. Translation, certification, legalisation or authorisation requirements depend on those facts and are checked before a filing or local step is agreed."],
        ["What information is needed for an investment enquiry in Syria?", "Describe the activity, investor, proposed entity, project location and any existing approval or correspondence. The review checks the applicable investment framework and amendments, sector requirements and document status; an old law number or earlier approval is not treated as proof of current eligibility."],
      ],
      ar: [
        ["هل يمكن للسوريين في الخارج طلب مشورة عقارية أو بشأن الميراث؟", "نعم. حدد مكان العقار أو السجلات وصلتك بالمسألة والنتيجة التي تحتاجها. اذكر وثائق الملكية والمستندات الأسرية والأحكام أو الوكالات المتاحة. نقيّم النواقص وما إذا كانت الخطوات المحلية تحتاج إلى تكليف مستقل."],
        ["كيف تُراجع المستندات الصادرة خارج سوريا؟", "حدد بلد الإصدار ونوع المستند والغرض منه والجهة التي سيقدم إليها. تتوقف متطلبات الترجمة والتصديق والتوثيق أو الوكالة على هذه الوقائع، ويُتحقق منها قبل الاتفاق على تقديم مستند أو إجراء محلي."],
        ["ما المعلومات اللازمة لاستفسار استثماري في سوريا؟", "وضح النشاط والمستثمر والكيان المقترح وموقع المشروع وأي موافقة أو مراسلات قائمة. تفحص المراجعة إطار الاستثمار المنطبق وتعديلاته ومتطلبات القطاع وحالة المستندات؛ ولا يُعامل رقم قانون قديم أو موافقة سابقة كدليل على الأهلية الحالية."],
      ],
    },
    uae: {
      en: [
        ["How do you identify the relevant UAE jurisdiction?", "Tell us the emirate, authority, employer or company registration, property location and any governing-law or forum clause. These facts help distinguish federal, emirate-level, mainland, free-zone, DIFC or ADGM issues before the legal route is assessed."],
        ["What should I prepare for a UAE employment or tenancy matter?", "For employment, identify the employer, registration jurisdiction, contract, payment records and any termination or complaint notice. For tenancy, identify the emirate, property, tenancy agreement, payment history and notices. Share dates and deadlines first; the required documents are confirmed after scope review."],
        ["Can I request UAE advice from outside the Emirates?", "Yes. Consultation and document review can begin online for an agreed UAE matter. If notarisation, attendance, filing or representation is needed, availability and the authorised local professional are confirmed under a separate engagement."],
      ],
      ar: [
        ["كيف تحددون الاختصاص المعني في الإمارات؟", "اذكر الإمارة والجهة وتسجيل صاحب العمل أو الشركة وموقع العقار وأي شرط للقانون المنطبق أو جهة الفصل. تساعد هذه الوقائع على التمييز بين المسائل الاتحادية والمحلية والبرّ الرئيسي والمناطق الحرة ومركز دبي المالي العالمي وسوق أبوظبي العالمي قبل تقييم المسار القانوني."],
        ["ما الذي أجهزه لمسألة عمالية أو إيجارية في الإمارات؟", "للعمل، حدد صاحب العمل واختصاص تسجيله والعقد وسجلات السداد وأي إخطار بالإنهاء أو الشكوى. وللإيجار، حدد الإمارة والعقار والعقد وسجل المدفوعات والإخطارات. اذكر التواريخ والمواعيد أولاً؛ وتُحدد المستندات اللازمة بعد مراجعة النطاق."],
        ["هل يمكن طلب مشورة إماراتية من خارج الإمارات؟", "نعم. يمكن بدء الاستشارة ومراجعة المستندات عبر الإنترنت لمسألة إماراتية متفق عليها. وعند الحاجة إلى توثيق أو حضور أو تقديم طلبات أو تمثيل، يُؤكد التوفر والمهني المحلي المخول ضمن تكليف مستقل."],
      ],
    },
  }[region][isArabic ? "ar" : "en"];
  return [...shared, ...local].map(([question, answer]) => ({ question, answer }));
}
