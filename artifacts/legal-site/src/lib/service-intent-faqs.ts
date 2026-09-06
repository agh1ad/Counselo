import type { Region } from "@workspace/api-zod/browser";
import { serviceTopicFaq } from "./service-topic-faqs.js";

type Faq = { q: string; a: string };
type Intent = { ar: Faq; en: Faq };

// Editorially selected client questions, not permutations or ranking promises.
const INTENTS: Record<string, Intent> = {
  "employment-law": {
    ar: { q: "متى أحتاج إلى محامي قضايا عمالية؟", a: "عند تأخر الأجور أو إنهاء العمل أو الاختلاف على المستحقات، جهّز عقد العمل وكشوف الرواتب وإشعار الإنهاء والمراسلات. تساعد مراجعة هذه المستندات على تحديد المطالبة والأدلة الناقصة قبل اختيار مسار التسوية أو النزاع." },
    en: { q: "When should I consult an employment lawyer about unpaid wages or dismissal?", a: "Prepare your employment contract, payslips, dismissal notice and relevant correspondence. A document-based review can distinguish unpaid salary, disputed benefits and termination issues before identifying the appropriate dispute route." },
  },
  "business-law": {
    ar: { q: "كيف أجهز ملفي لاستشارة محامي قضايا تجارية؟", a: "اجمع العقد وأوامر الشراء والفواتير وإثبات التسليم والسداد، وحدد هل النزاع مع عميل أم مورد أم شريك. يمكن أن تختلف مطالبة الدين التجاري عن نزاع الشركاء أو الإخلال بالعقد، لذلك تبدأ المراجعة بتحديد العلاقة والطلب." },
    en: { q: "What should I prepare for a commercial dispute consultation?", a: "Collect the contract, purchase orders, invoices and evidence of delivery and payment. Identify whether the dispute concerns a customer, supplier or business partner: unpaid invoices, contractual breaches and shareholder claims may require different analyses." },
  },
  contracts: {
    ar: { q: "ما الفرق بين مراجعة العقود وطلب فسخ العقد مع التعويض؟", a: "تبحث مراجعة العقود في الالتزامات والمخاطر قبل التوقيع أو أثناء التنفيذ. أما طلب الفسخ أو التعويض فيحتاج أيضاً إلى دراسة الإخلال والإشعارات والضرر وشروط العقد والقانون الواجب التطبيق؛ فلا ينشأ حق الفسخ أو التعويض لمجرد الرغبة في إنهاء الاتفاق." },
    en: { q: "How does contract review differ from advice on termination and compensation?", a: "Contract review examines obligations and risks before signing or during performance. Termination and compensation advice also requires the alleged breach, notices, loss evidence and applicable contractual and legal requirements; an unwanted agreement does not by itself establish a remedy." },
  },
  enforcement: {
    ar: { q: "ما المستندات اللازمة لمراجعة اعتراض على التنفيذ؟", a: "أرسل السند أو الحكم المطلوب تنفيذه وإشعار التنفيذ وإثبات التبليغ والسداد وأسباب الاعتراض. ميّز بين الاعتراض على أصل المطالبة والاعتراض على إجراء التنفيذ، واذكر أي موعد وارد في الإشعار؛ فلا توقف الاستشارة الإجراءات أو تمدد المواعيد." },
    en: { q: "What documents are needed to review an enforcement objection?", a: "Provide the judgment or instrument, enforcement notice, service records, payment evidence and grounds for objection. A challenge to the underlying debt may differ from a challenge to an enforcement step. Identify any stated deadline; a consultation does not suspend proceedings." },
  },
  "cyber-law": {
    ar: { q: "كيف أجهز الأدلة لاستشارة بشأن جرائم الابتزاز الإلكتروني؟", a: "احتفظ بالرسائل الأصلية وبيانات الحساب والروابط والتواريخ وإشعارات المنصة، ولا تعدّل الملفات الأصلية. احجب المعلومات غير اللازمة عند إرسال نسخة للمراجعة. يحدد التقييم طبيعة الواقعة ومكانها والجهة المختصة دون افتراض أن كل خلاف إلكتروني يشكل جريمة." },
    en: { q: "What evidence should I preserve for advice about online blackmail?", a: "Preserve original messages, account identifiers, links, dates and platform notices without altering the source files. Redact unrelated information in review copies. The assessment considers the conduct, location and competent authority rather than assuming every online dispute is criminal." },
  },
  "medical-malpractice": {
    ar: { q: "ماذا أرسل إلى محامي أخطاء طبية لتقييم التعويض عن الخطأ الطبي؟", a: "جهّز السجل الطبي وتقارير الفحوص والموافقات وتسلسل العلاج وإثبات المصروفات والضرر. النتيجة العلاجية غير المرغوبة لا تثبت الخطأ وحدها؛ يتطلب التقييم دراسة الوقائع وقد يحتاج إلى رأي طبي متخصص قبل بحث المسؤولية والتعويض." },
    en: { q: "What does a medical malpractice lawyer need to assess a potential claim?", a: "Prepare medical records, test reports, consent documents, a treatment timeline and evidence of expenses and harm. An adverse outcome alone does not establish negligence. Assessment may require independent medical expertise before responsibility and compensation can be considered." },
  },
  "insurance-law": {
    ar: { q: "كيف أعرف طريقة مطالبة شركة التأمين والمستندات المطلوبة؟", a: "ابدأ بوثيقة التأمين وشروطها ورقم المطالبة وتقرير الواقعة والمستندات المؤيدة للمبلغ، وأرفق خطاب الرفض أو التأخير إن وجد. تتناول المراجعة التغطية والاستثناءات ومتطلبات الإخطار وأسباب قرار الشركة قبل تحديد الخطوة التالية." },
    en: { q: "What should I prepare for an insurance claim or a denied-claim review?", a: "Start with the policy and terms, claim number, incident report and evidence supporting the amount claimed. Include any refusal or delay correspondence. Review addresses coverage, exclusions, notification requirements and the insurer's reasons before identifying the next step." },
  },
  "tax-zakat": {
    ar: { q: "ما الذي يحتاجه محامي ضرائب لمراجعة اعتراض ضريبي؟", a: "جهّز قرار الربط أو الغرامة وتاريخ التبليغ والإقرارات والفواتير والمراسلات والحسابات ذات الصلة. حدد البنود محل الخلاف وأسباب الاعتراض، مع مراجعة الجهة والمواعيد بحسب نوع الضريبة والدولة المعنية." },
    en: { q: "What records are needed for a tax assessment objection?", a: "Prepare the assessment or penalty, notification date, returns, invoices, correspondence and relevant accounts. Identify each disputed item and its supporting grounds. The applicable authority and timing must be checked for the tax and jurisdiction concerned." },
  },
};

const UAE_EQUIVALENTS: Record<string, string> = {
  "employment-labour": "employment-law", "corporate-commercial": "business-law",
  "commercial-contracts": "contracts", "enforcement-debt-recovery": "enforcement",
  "healthcare-medical-liability": "medical-malpractice", insurance: "insurance-law", "tax-vat": "tax-zakat",
};

export function getServiceIntentFaqs(region: Region, slug: string, ar: boolean, title: string, documents: string[], issues: string[]): Faq[] {
  const country = ar ? { sa: "السعودية", syr: "سوريا", uae: "الإمارات" }[region] : { sa: "Saudi Arabia", syr: "Syria", uae: "the UAE" }[region];
  const entry = INTENTS[region === "uae" ? UAE_EQUIVALENTS[slug] ?? slug : slug];
  const faqs: Faq[] = entry ? [{ ...entry[ar ? "ar" : "en"] }] : [];
  if (region === "sa" && slug === "employment-law" && ar) faqs[0].q = "متى أحتاج إلى محامي مكتب العمل أو محامي قضايا عمالية في السعودية؟";
  if (region === "sa" && slug === "enforcement" && ar) faqs[0].q = "ماذا أجهز لاستشارة محامي سند لأمر بشأن الاعتراض على تنفيذ سند لأمر؟";
  if (region === "sa" && slug === "tax-zakat" && ar) faqs[0].q = "ما المستندات المطلوبة لمراجعة الاعتراض على الزكاة أو الربط الضريبي؟";
  faqs.push(serviceTopicFaq(slug, ar));
  if (documents.length) faqs.push({
    q: ar ? `ما مستندات استشارة ${title} في ${country}؟` : `What documents support the ${title.toLowerCase()} consultation in ${country}?`,
    a: ar ? `تتضمن المستندات المفيدة: ${documents.join("؛ ")}. أضف ملخصاً مؤرخاً ووضح النتيجة التي تطلبها، واحجب البيانات غير المرتبطة بالمسألة.` : `Useful records include: ${documents.join("; ")}. Add a dated summary and explain the outcome you seek. Redact information unrelated to the matter.`,
  });
  if (issues.length) faqs.push({
    q: ar ? `هل تشمل استشارة ${title} المسألة التي أواجهها في ${country}؟` : `Does the ${title.toLowerCase()} consultation cover my issue in ${country}?`,
    a: ar ? `تشمل الموضوعات الموضحة في هذه الصفحة: ${issues.slice(0, 3).join("؛ ")}. يراجع الفريق الوقائع والاختصاص ثم يؤكد نطاق التكليف والرسوم قبل بدء العمل.` : `Topics explained on this page include: ${issues.slice(0, 3).join("; ")}. The team reviews the facts and jurisdiction, then confirms the engagement scope and fee before work begins.`,
  });
  return faqs;
}
