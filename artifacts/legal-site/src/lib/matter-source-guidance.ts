import { PROBLEM_GAP_GUIDANCE } from "./problem-gap-guidance";
import { PROBLEM_COMPLETION_GUIDANCE } from "./problem-completion-guidance";
import type { Region } from "@workspace/api-zod/browser";
import type { LegalSource } from "./regional-legal-sources";
import { INTENT_EXPANSION_GUIDANCE } from "./intent-expansion-guidance.js";

export type MatterSourceGuidance = {
  region: Region;
  service: string;
  problems: string[];
  id: string;
  reviewedAt: string;
  includeOnServicePage?: boolean;
  en: { q: string; a: string };
  ar: { q: string; a: string };
  sources: LegalSource[];
};

export const MATTER_SOURCE_GUIDANCE: MatterSourceGuidance[] = [
  ...PROBLEM_GAP_GUIDANCE,
  ...PROBLEM_COMPLETION_GUIDANCE,
  ...INTENT_EXPANSION_GUIDANCE,
  {
    region: "sa", service: "insurance-law", problems: ["denied-insurance-claim", "delayed-insurance-settlement", "policy-coverage-dispute"],
    id: "saudi-insurance-complaint-channel", reviewedAt: "2026-09-07",
    en: { q: "Where can I check the official Saudi insurance-complaint service?", a: "The Insurance Authority provides an electronic complaint service through its official website. Prepare the policy, insurer's written position, supporting records and any earlier company complaint reference. Identify whether you are acting for yourself or someone else. A regulatory complaint and a dispute before the insurance committees are different steps; check the correct route and current requirements for your file before submitting." },
    ar: { q: "أين أراجع الخدمة الرسمية للشكاوى التأمينية في السعودية؟", a: "توفر هيئة التأمين خدمة إلكترونية للشكاوى عبر موقعها الرسمي. جهّز الوثيقة وموقف شركة التأمين المكتوب والمستندات المؤيدة ومرجع أي شكوى سابقة لدى الشركة. حدّد هل تقدم الطلب لنفسك أم عن شخص آخر. تختلف الشكوى الرقابية عن المنازعة أمام اللجان التأمينية؛ فراجع المسار الصحيح ومتطلباته الحالية وفق ملفك قبل التقديم." },
    sources: [{ en: "Insurance Authority — electronic insurance complaint", ar: "هيئة التأمين — الشكوى التأمينية الإلكترونية", href: "https://www.ia.gov.sa/en/eservices-ia/service-details/Complaint-against-an-insurance-company" }, { en: "Insurance Authority — complaints and dispute committees", ar: "هيئة التأمين — الشكاوى ولجان المنازعات", href: "https://www.ia.gov.sa/ar/faqs" }],
  },
  {
    region: "uae", service: "insurance", problems: ["denied-insurance-claim", "delayed-insurance-settlement", "policy-coverage-dispute"],
    id: "sanadak-insurance-complaint-eligibility", reviewedAt: "2026-09-07",
    en: { q: "What should I check before escalating an insurance complaint to Sanadak?", a: "Keep the complaint first submitted to the insurer, its reference and any written response. Sanadak's eligibility checks address the company involved, your capacity, the response period, duplicate complaints and existing court proceedings. Review the current criteria before escalating; an insurer's denial is not itself a Sanadak decision. A complaint and a later appeal also have separate requirements and possible charges." },
    ar: { q: "ما الذي أراجعه قبل تصعيد شكوى تأمين إلى سندك؟", a: "احفظ الشكوى المقدمة أولاً إلى شركة التأمين ومرجعها وأي رد مكتوب. تشمل معايير سندك الشركة المعنية وصفتك ومدة الرد وتكرار الشكاوى ووجود إجراءات قضائية. راجع المعايير الحالية قبل التصعيد؛ فرفض الشركة ليس قراراً صادراً عن سندك. وللشكوى والطعن اللاحق متطلبات وتكاليف محتملة مستقلة." },
    sources: [{ en: "Sanadak — insurance complaints, eligibility and appeals", ar: "سندك — الشكاوى التأمينية والأهلية والطعن", href: "https://www.sanadak.gov.ae/en/faqs/" }],
  },
  {
    region: "uae", service: "tax-vat", problems: ["tax-audit-and-assessment-objection"],
    id: "fta-review-and-reconsideration", reviewedAt: "2026-09-06",
    en: { q: "Is every FTA message eligible for a reconsideration request?", a: "The FTA distinguishes an official decision concerning the taxpayer from responses to general inquiries, complaints or clarification requests. Identify the actual decision, its notification and any tax-assessment review already requested before selecting reconsideration. A pending assessment review can affect when reconsideration is available. Check the current FTA service requirements, filing period and the submitter's authority; preparing a consultation request does not file the objection." },
    ar: { q: "هل تصلح كل رسالة من الهيئة الاتحادية للضرائب لطلب إعادة النظر؟", a: "تميز الهيئة بين قرار رسمي يخص المكلف وبين الردود على الاستفسارات العامة أو الشكاوى أو طلبات التوضيح. حدّد القرار الفعلي وتبليغه وأي طلب مراجعة للتقييم الضريبي سبق تقديمه قبل اختيار إعادة النظر؛ فقد تؤثر المراجعة المعلقة في توقيت إتاحة هذا المسار. راجع متطلبات الخدمة الحالية ومدة التقديم وصلاحية مقدّم الطلب. لا يُعد إعداد طلب استشارة تقديماً للاعتراض." },
    sources: [{ en: "Federal Tax Authority — reconsideration request and assessment-review distinction", ar: "الهيئة الاتحادية للضرائب — طلب إعادة النظر وتمييزه عن مراجعة التقييم", href: "https://tax.gov.ae/en/services/reconsideration.request.aspx" }],
  },
  {
    region: "uae", service: "commercial-contracts", problems: ["legal-notice-and-demand-letter-drafting"],
    id: "dubai-notice-drafting-and-attestation", reviewedAt: "2026-09-06",
    en: { q: "Does drafting a demand letter also complete Dubai Courts attestation?", a: "Drafting the notice and obtaining any required official attestation are separate steps. Dubai Courts describes a notary service for legal notices, with identity, authority and supporting-document requirements. Check the notice's purpose, recipient, required language and service method before choosing that process. An online consultation or draft does not itself complete court attestation or delivery to the other party." },
    ar: { q: "هل تكتمل مصادقة محاكم دبي بمجرد صياغة خطاب المطالبة؟", a: "صياغة الإنذار واستكمال أي مصادقة رسمية لازمة خطوتان منفصلتان. توضح محاكم دبي خدمة الكاتب العدل للإنذارات العدلية ومتطلبات الهوية والصلاحية والمستندات المؤيدة. راجع غرض الإنذار والمخاطب واللغة المطلوبة وطريقة التبليغ قبل اختيار هذا الإجراء. لا تُكمل الاستشارة الإلكترونية أو المسودة وحدها مصادقة المحكمة أو تبليغ الطرف الآخر." },
    sources: [{ en: "Dubai Courts — legal notices service", ar: "محاكم دبي — خدمة الإنذارات العدلية", href: "https://dc.gov.ae/PublicServices/GessServiceDetails.aspx?ServiceCode=G5&lang=en" }],
  },
  {
    region: "sa", service: "foreign-investment",
    problems: ["foreign-owned-company-formation", "investment-and-business-licensing", "market-entry-legal-structure", "regulatory-compliance", "investment-licence-refusal-or-cancellation", "foreign-investor-due-diligence-and-market-entry-review"],
    id: "investor-registration-and-activity-permissions", reviewedAt: "2026-09-06",
    en: { q: "Is Saudi investor registration the same as an activity licence?", a: "No. The updated Investment Law provides for investor registration with the Ministry of Investment, while the approvals, licences and permits required for the actual activity remain separate checks. Identify whether your file concerns registration, an existing permission, a restricted activity or a change in ownership. For a refusal or cancellation, obtain the exact decision and notification rather than relying on the older expression ‘investment licence’ alone." },
    ar: { q: "هل تسجيل المستثمر في السعودية هو نفسه ترخيص النشاط؟", a: "لا. ينظم نظام الاستثمار المحدث تسجيل المستثمر لدى وزارة الاستثمار، وتظل الموافقات والتراخيص والتصاريح اللازمة للنشاط الفعلي مسائل تُفحص مستقلة. حدّد هل يتعلق ملفك بالتسجيل أو بإذن قائم أو بنشاط مقيد أو بتغيير الملكية. وعند الرفض أو الإلغاء، احصل على القرار المحدد وإثبات تبليغه بدلاً من الاعتماد على التعبير السابق «ترخيص الاستثمار» وحده." },
    sources: [{ en: "Ministry of Investment — updated Investment Law, registration and approvals", ar: "وزارة الاستثمار — نظام الاستثمار المحدث والتسجيل والموافقات", href: "https://misa.gov.sa/activities/laws-regulations-copy/" }],
  },
  {
    region: "sa", service: "administrative-law", problems: ["municipal-licence-refusal-and-business-activity-suspension"],
    id: "municipal-suspension-service", reviewedAt: "2026-09-06",
    en: { q: "Where do I check the official service for an objection to a suspended municipal business licence?", a: "The Ministry of Municipalities and Housing describes a Balady service for objecting to suspension of a commercial licence. Identify the affected licence and explain the grounds for lifting the suspension, with supporting records. Check the current service requirements and the notice in your file before choosing a route. A request to lift suspension is different from a new licence application or a challenge to a separate fine; submitting it does not guarantee approval." },
    ar: { q: "أين أراجع الخدمة الرسمية للاعتراض على إيقاف رخصة نشاط تجاري بلدية؟", a: "توضح وزارة البلديات والإسكان خدمة بلدي للاعتراض على إيقاف رخصة تجارية. حدّد الرخصة المعنية وسبب طلب رفع الإيقاف مع المستندات المؤيدة. راجع متطلبات الخدمة الحالية والإشعار في ملفك قبل اختيار المسار. يختلف طلب رفع الإيقاف عن طلب ترخيص جديد أو الاعتراض على غرامة مستقلة؛ ولا يضمن تقديم الطلب الموافقة عليه." },
    sources: [{ en: "Ministry of Municipalities and Housing — objection to commercial-licence suspension", ar: "وزارة البلديات والإسكان — الاعتراض على إيقاف رخصة تجارية", href: "https://momah.gov.sa/ar/e-services/khdmt-atrad-ly-ayqaf-rkhst" }],
  },
  {
    region: "sa", service: "administrative-law",
    problems: ["public-procurement-dispute", "public-procurement-disputes"],
    id: "award-notification-and-standstill", reviewedAt: "2026-09-06",
    en: { q: "What should I check immediately after a Saudi tender-award notification?", a: "Identify the award notification, the stated standstill period and the objection channel. Check which version of the procurement law governs the tender: publication of the September 2026 law does not itself make it immediately applicable. Review the operative standstill rules before contracting. Preserve the published criteria, submitted bid and notification timestamp. Check the applicable rules and tender record promptly; an ordinary complaint or consultation request should not be treated as a timely procurement objection." },
    ar: { q: "ما الذي أراجعه فور إشعاري بترسية منافسة حكومية سعودية؟", a: "حدّد إشعار الترسية وفترة التوقف المعلنة وقناة التظلم. تحقق من نسخة النظام التي تحكم المنافسة؛ فنشر نظام سبتمبر 2026 لا يعني نفاذه فوراً. راجع قواعد فترة التوقف النافذة قبل التعاقد. احفظ المعايير المنشورة والعرض المقدم ووقت الإشعار، وراجع القواعد المنطبقة وسجل المنافسة سريعاً؛ ولا تعامل شكوى عامة أو طلب استشارة باعتباره تظلماً من الترسية مقدماً في الميعاد." },
    sources: [{ en: "Ministry of Finance — bids, awards and standstill period", ar: "وزارة المالية — العروض والترسية وفترة التوقف", href: "https://www.mof.gov.sa/Knowledgecenter/newGovTendandProcLow/pages/sec03.aspx" }, { en: "Umm Al-Qura — 2026 procurement law and commencement, Article 101", ar: "أم القرى — نظام المنافسات لعام 2026 ونفاذه، المادة 101", href: "https://www.uqn.gov.sa/decisions-and-regulations/4001762" }],
  },
  {
    region: "sa", service: "administrative-law",
    problems: ["administrative-objections-and-appeals", "board-of-grievances-appeal-against-an-administrative-judgment"],
    id: "administrative-court-online-services", reviewedAt: "2026-09-06",
    en: { q: "Where can I find official Saudi administrative-court online services?", a: "The Board of Grievances links to the Moeen digital platform for judicial requests and case services. First distinguish an objection to an authority's decision from an appeal against a court judgment. Selecting a platform does not establish the correct procedure, eligibility or deadline; check those against the decision, notification and case record." },
    ar: { q: "أين أجد الخدمات القضائية الإلكترونية الرسمية للمحاكم الإدارية السعودية؟", a: "يوفر موقع ديوان المظالم رابط منصة معين الرقمية للطلبات والخدمات القضائية. ميّز أولاً بين التظلم من قرار جهة إدارية والطعن في حكم قضائي. اختيار المنصة لا يحدد وحده الإجراء الصحيح أو شروط القبول أو الميعاد؛ وتُراجع هذه الأمور على ضوء القرار والتبليغ وسجل القضية." },
    sources: [{ en: "Board of Grievances — Moeen and judicial services", ar: "ديوان المظالم — معين والخدمات القضائية", href: "https://www.bog.gov.sa/en/Pages/default.aspx" }],
  },
  {
    region: "sa", service: "arbitration", problems: ["commercial-arbitration"],
    id: "arbitration-cost-components", reviewedAt: "2026-09-06",
    en: { q: "Does the consultation fee cover SCCA arbitration costs?", a: "Treat the legal consultation, institutional charges and arbitrator fees as separate budget items. The SCCA calculator estimates administrative and tribunal fees using the dispute amount and number of arbitrators; its result is indicative. Confirm the applicable procedure, taxes, deposits and any expert or translation costs. CounselO confirms its own review scope and fee separately before paid work begins." },
    ar: { q: "هل تشمل رسوم الاستشارة تكاليف التحكيم لدى المركز السعودي؟", a: "افصل ميزانية الاستشارة القانونية عن رسوم المؤسسة وأتعاب المحكمين. تقدّر حاسبة المركز الرسوم الإدارية وأتعاب الهيئة بحسب مبلغ النزاع وعدد المحكمين، ونتيجتها استرشادية. تحقّق من الإجراء المنطبق والضرائب والدفعات المقدمة وتكاليف الخبرة أو الترجمة. وتؤكد كاونسلو نطاق مراجعتها وأتعابها بصورة مستقلة قبل بدء العمل المدفوع." },
    sources: [{ en: "SCCA — indicative arbitration fee calculator", ar: "المركز السعودي للتحكيم التجاري — حاسبة رسوم استرشادية", href: "https://www.sadr.org/en/scca-fee-calculator" }],
  },
];

export function matterSourceGuidance(region: Region, service: string, problem: string) {
  return MATTER_SOURCE_GUIDANCE.filter(item => item.region === region && item.service === service && item.problems.includes(problem));
}

export function matterGuidanceUpdatedAt(region: Region, service: string, problem: string, fallback: string) {
  return matterSourceGuidance(region, service, problem).reduce((latest, item) => item.reviewedAt > latest ? item.reviewedAt : latest, fallback);
}
