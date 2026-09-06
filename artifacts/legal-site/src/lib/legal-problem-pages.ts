import type { Region, Lang } from "../contexts/RegionContext.js";
import { ADDITIONAL_SEARCH_ISSUES, SERVICE_SEARCH_CONTENT } from "./service-search-content.js";
import { UAE_SERVICES } from "../data/uae-legal-services.js";
import { buildUaeServicePageContent } from "../data/uae-service-page-content.js";
import { getServiceDefinition, getServicesForRegion } from "@workspace/api-zod/browser";
import { getMatterEditorial } from "./matter-editorial.js";
import { matterTopic, SPECIALIST_PROFILES } from "./matter-topic-routing.js";
import { getMatterIntentBrief } from "./matter-intent-briefs/index.js";

export type LocalizedText = { en: string; ar: string };
export type LocalizedList = { en: string[]; ar: string[] };
export type LocalizedFaq = { en: { q: string; a: string }[]; ar: { q: string; a: string }[] };
export type ProcessStep = { title: string; desc: string };
export type LocalizedProcess = { en: ProcessStep[]; ar: ProcessStep[] };
export type LegalAccuracyBoundary = {
  reviewedAt: string;
  status: "framework-verified-matter-review-required";
  checks: LocalizedList;
  urgentWarning: LocalizedText;
  engagementWarning: LocalizedText;
  intakeChecklist: LocalizedList;
};

export type LegalProblemPage = {
  contentTopic?: string;
  editorialTopic?: string;
  intentBriefTitle?: string;
  contentUpdatedAt?: string;
  region: Region;
  parentServiceSlug: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  serviceTitleEn: string;
  serviceTitleAr: string;
  heroSummary: LocalizedText;
  atAGlance: LocalizedList;
  overview: LocalizedText;
  keyQuestions: LocalizedList;
  documentsEn: string[];
  documentsAr: string[];
  deliverables: LocalizedList;
  process: LocalizedProcess;
  experience: LocalizedText;
  faqs: LocalizedFaq;
  legalAccuracy: LegalAccuracyBoundary;
  /**
   * Search variants are grouped onto the canonical problem page instead of
   * generating thin pages for every wording a customer may use.
   */
  searchVariantsEn: string[];
  searchVariantsAr: string[];
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "legal-problem";
}

// Search-target wording may evolve, but published canonical paths must remain
// stable so refinements do not discard backlinks or create avoidable 404s.
const PRESERVED_PROBLEM_SLUGS: Readonly<Record<string, string>> = {
  "Termination of an exclusive distribution relationship": "commercial-agency-and-distribution-termination",
  "Correction of a work permit or labour record": "work-permit-or-employment-status-problem",
  "Claim for reputational harm caused by online publication in Syria": "online-defamation-and-removal-request-in-syria",
  "Challenge to an adverse medical expert report": "medical-record-access-and-expert-evidence-dispute",
  "Civil damages for reputational harm in Syria": "defamation-and-reputation-damage-claim-in-syria",
  "Challenge to court jurisdiction or improper service in Syria": "court-filing-and-jurisdiction-objection-in-syria",
  "Power-of-attorney misuse, rejection or scope dispute": "power-of-attorney-drafting-and-authority-problem",
  "Residency or employment-status restriction affecting work authorisation": "work-permit-residency-or-employment-status-problem",
  "Traffic accident compensation for personal injury and vehicle damage": "traffic-accident-compensation-and-liability-claim",
  "Personal injury compensation for a non-traffic accident": "personal-injury-compensation-after-an-accident",
  "Bid exclusion and tender-award challenge": "public-procurement-dispute",
  "Compromised-account recovery and access restoration": "hacked-account-and-unauthorized-access",
  "Claim denial based on a policy exclusion": "policy-coverage-dispute",
};

function canonicalProblemSlug(titleEn: string): string {
  return PRESERVED_PROBLEM_SLUGS[titleEn] ?? slugify(titleEn);
}

function countryName(region: Region): LocalizedText {
  return region === "uae"
    ? { en: "the UAE", ar: "الإمارات" }
    : region === "syr"
      ? { en: "Syria", ar: "سوريا" }
      : { en: "Saudi Arabia", ar: "السعودية" };
}

function uniqueVariants(values: string[]): string[] {
  return [...new Map(values.map((value) => [value.toLocaleLowerCase(), value])).values()];
}

function intentSearchVariants(titleEn: string, titleAr: string, country: LocalizedText): LocalizedList {
  const text = `${titleEn} ${titleAr}`.toLowerCase();
  const variants: LocalizedList = { en: [], ar: [] };
  const add = (pattern: RegExp, en: string[], ar: string[]) => {
    if (pattern.test(text)) {
      variants.en.push(...en);
      variants.ar.push(...ar);
    }
  };

  add(/deadline|notice|appeal|objection|limitation|filing|ميعاد|إخطار|اعتراض|طعن|تقادم|قيد/, [
    `deadline for ${titleEn.toLowerCase()} in ${country.en}`,
    `missed deadline for ${titleEn.toLowerCase()}`,
    `time limit to file ${titleEn.toLowerCase()}`,
    `urgent appeal or objection for ${titleEn.toLowerCase()}`,
  ], [
    `ميعاد ${titleAr} في ${country.ar}`,
    `فوات ميعاد ${titleAr}`,
    `مدة تقديم ${titleAr}`,
    `طعن أو اعتراض عاجل في ${titleAr}`,
  ]);
  add(/evidence|record|document|proof|expert|witness|دليل|إثبات|سجل|مستند|خبرة|شاهد/, [
    `how to prove ${titleEn.toLowerCase()}`,
    `evidence required for ${titleEn.toLowerCase()}`,
    `expert report for ${titleEn.toLowerCase()}`,
    `preserve digital and documentary evidence for ${titleEn.toLowerCase()}`,
  ], [
    `كيفية إثبات ${titleAr}`,
    `الأدلة المطلوبة في ${titleAr}`,
    `تقرير خبير في ${titleAr}`,
    `حفظ الأدلة الرقمية والمستندية في ${titleAr}`,
  ]);
  add(/payment|debt|invoice|wage|salary|compensation|refund|unpaid|سداد|دين|فاتورة|أجر|راتب|تعويض|استرداد/, [
    `recover money for ${titleEn.toLowerCase()}`,
    `calculate a claim for ${titleEn.toLowerCase()}`,
    `payment demand for ${titleEn.toLowerCase()}`,
    `compensation available for ${titleEn.toLowerCase()}`,
  ], [
    `تحصيل المبلغ في ${titleAr}`,
    `حساب المطالبة في ${titleAr}`,
    `إنذار سداد بشأن ${titleAr}`,
    `التعويض المستحق في ${titleAr}`,
  ]);
  add(/termination|cancel|rescission|end of|dismissal|إنهاء|إلغاء|فسخ|فصل/, [
    `challenge ${titleEn.toLowerCase()} in ${country.en}`,
    `notice requirements for ${titleEn.toLowerCase()}`,
    `compensation after ${titleEn.toLowerCase()}`,
    `settlement options after ${titleEn.toLowerCase()}`,
  ], [
    `الطعن في ${titleAr} في ${country.ar}`,
    `شروط الإخطار في ${titleAr}`,
    `التعويض بعد ${titleAr}`,
    `خيارات التسوية بعد ${titleAr}`,
  ]);
  add(/enforcement|execution|judgment|award|seizure|تنفيذ|حكم|قرار تحكيم|حجز/, [
    `how to enforce ${titleEn.toLowerCase()} in ${country.en}`,
    `execution procedure for ${titleEn.toLowerCase()}`,
    `asset seizure for ${titleEn.toLowerCase()}`,
    `objection to enforcement of ${titleEn.toLowerCase()}`,
  ], [
    `كيفية تنفيذ ${titleAr} في ${country.ar}`,
    `إجراءات التنفيذ في ${titleAr}`,
    `الحجز على الأموال في ${titleAr}`,
    `الاعتراض على تنفيذ ${titleAr}`,
  ]);
  add(/jurisdiction|forum|court|authority|venue|اختصاص|محكمة|جهة/, [
    `which court handles ${titleEn.toLowerCase()} in ${country.en}`,
    `competent authority for ${titleEn.toLowerCase()}`,
    `where to file ${titleEn.toLowerCase()}`,
    `challenge jurisdiction in ${titleEn.toLowerCase()}`,
  ], [
    `المحكمة المختصة في ${titleAr} في ${country.ar}`,
    `الجهة المختصة في ${titleAr}`,
    `أين ترفع دعوى ${titleAr}`,
    `الدفع بعدم الاختصاص في ${titleAr}`,
  ]);
  add(/register|registration|licen|permit|approval|تسجيل|ترخيص|تصريح|موافقة/, [
    `requirements for ${titleEn.toLowerCase()} in ${country.en}`,
    `documents needed for ${titleEn.toLowerCase()}`,
    `rejected application for ${titleEn.toLowerCase()}`,
    `appeal refusal of ${titleEn.toLowerCase()}`,
  ], [
    `شروط ${titleAr} في ${country.ar}`,
    `المستندات المطلوبة في ${titleAr}`,
    `رفض طلب ${titleAr}`,
    `الطعن في رفض ${titleAr}`,
  ]);
  return variants;
}

/**
 * Exact, relevant queries observed in Google Search Console for CounselO for
 * 2026-07-01 through 2026-09-03. Each query is routed to one principal problem
 * page to avoid making multiple canonicals compete for the same wording.
 * Noisy fragments, unrelated brands and misleading free-service wording are
 * deliberately excluded.
 */
export const OBSERVED_SEARCH_QUERY_ALIASES: Readonly<Record<string, LocalizedList>> = {
  "sa:Medical negligence claims": {
    en: ["medical malpractice lawyer", "medical liability attorneys", "medical malpractice lawyers near me", "medical law attorney", "medical injury lawyer", "medical legal consultant", "healthcare lawyer", "free medical negligence lawyers"],
    ar: [],
  },
  "syr:Misdiagnosis and delayed diagnosis": { en: ["lawyer medical negligence"], ar: ["سوء تشخيص"] },
  "sa:Commercial debt recovery": {
    en: ["debt collection in saudi arabia", "debt recovery lawyer", "debt collection lawyer", "debt collection attorney", "debt collection agency saudi arabia", "debt recovery services", "debt collection saudi arabia", "debt recovery saudi arabia", "debt collection attorney in riyadh", "debt collection agency in saudi arabia", "collection attorneys"],
    ar: [],
  },
  "syr:Commercial debt recovery": { en: ["debt collection in syria"], ar: [] },
  "sa:Wrongful termination": { en: ["wrongful termination lawyer", "wrongful termination lawyer ksa", "unfair termination lawyers"], ar: ["فصل تعسفي"] },
  "sa:Employment contract review": { en: ["employment lawyer", "employment law attorney", "employment attorney", "employment law firm", "employment lawyers", "employment dispute lawyer", "employment law specialist"], ar: [] },
  "sa:Unpaid wages and benefits": { en: ["pay disputes", "salary delay in saudi arabia", "how to complaint salary delay in saudi arabia", "unpaid leave in saudi arabia", "payroll laws"], ar: [] },
  "sa:Contract drafting and review": { en: ["contract lawyer", "legal contract lawyer", "contracts lawyer", "contracts law firm"], ar: [] },
  "syr:Contract drafting and review": { en: [], ar: ["شرح قانون العقود السوري", "عقد سوري"] },
  "sa:Breach of contract": { en: ["breach of contract in saudi arabia"], ar: [] },
  "syr:Penalty and compensation clauses": { en: [], ar: ["الشرط الجزائي", "ما هو الشرط الجزائي", "صيغة الشرط الجزائي في العقود"] },
  "syr:Sale and purchase contract disputes": { en: [], ar: ["أركان عقد البيع في القانون السوري", "شروط صحة عقد البيع في القانون السوري"] },
  "sa:Commercial arbitration": { en: ["arbitration services", "arbitral tribunal"], ar: [] },
  "sa:Challenge to arbitration jurisdiction": { en: ["jurisdiction of arbitral tribunal", "competence of arbitral tribunal", "competence of arbitral tribunal to rule on its jurisdiction"], ar: [] },
  "sa:Bank and customer disputes": { en: ["banking litigation lawyer", "banking lawyer", "bank lawyer", "lawyer for banking issues", "lawyer for bank disputes", "bank dispute lawyer", "bank lawyer in saudi", "banking lawyer in saudi", "lawyers that deal with bank issues", "banking & finance lawyers"], ar: [] },
  "sa:Loan default and restructuring": { en: ["loan default in saudi arabia", "personal loan lawyer", "default on funds lawyer"], ar: [] },
  "sa:Coverage and policy interpretation": { en: ["insurance lawyer", "insurance disputes lawyer", "insurance coverage lawyer", "insurance regulatory lawyer", "health insurance lawyer"], ar: [] },
  "sa:Traffic accident liability and compensation": { en: ["car insurance lawyer", "auto insurance lawyer near me"], ar: [] },
  "sa:Tax and zakat assessments": { en: ["tax lawyer", "tax lawyer in saudi arabia", "tax attorney", "tax attorneys", "zakat tax consultancy", "zatca taxation advisory services in saudi arabia"], ar: [] },
  "sa:VAT and customs issues": { en: ["vat dispute resolution", "vat"], ar: [] },
  "sa:Trademark opposition and cancellation": { en: [], ar: [] },
  "uae:Trademark opposition and cancellation": { en: ["trademark opposition uae"], ar: [] },
  "syr:Cybercrime complaint and digital-evidence problem in Syria": {
    en: ["cyber crime lawyer"],
    ar: ["نموذج شكوى جرائم إلكترونية في سوريا", "طريقة رفع دعوى جرائم معلوماتية في سوريا"],
  },
  "syr:Claim for reputational harm caused by online publication in Syria": { en: [], ar: ["دعوى التشهير في القانون السوري", "التشهير في القانون السوري"] },
  "syr:Foreign judgment enforcement": { en: ["foreign judgment enforcement"], ar: ["اصول التنفيذ المدني السوري"] },
  "syr:Arrest, detention and release application in Syria": { en: [], ar: ["نموذج اخلاء سبيل في القانون السوري"] },
  "syr:Challenges to government decisions": { en: [], ar: ["القانون الاداري السوري"] },
  "syr:Civil claims and private disputes": { en: [], ar: ["القانون المدني السوري", "قانون المدني السوري"] },
  "sa:Contract evidence and electronic messages": { en: ["electronic signature in saudi arabia", "electronic signature in ksa", "saudi electronic transactions law", "saudi evidence law private documents evidentiary value", "saudi evidence law private document evidentiary value signature"], ar: [] },
  "sa:Company dissolution and liquidation dispute": { en: ["corporate dissolution lawyer", "company dissolution lawyer", "company liquidation saudi arabia"], ar: [] },
  "sa:Foreign-owned company formation": { en: ["foreign investment law firms saudi arabia"], ar: [] },
  "sa:Sale and purchase contract disputes": { en: ["property dispute", "real estate legal services", "land law lawyers"], ar: [] },
  "uae:Travel-ban and detention concern": { en: [], ar: ["منع السفر الامارات", "منع السفر"] },
  "sa:Construction and contractor claims": { en: ["construction lawyer"], ar: ["عقود المقاولين"] },
};

function searchVariants(region: Region, titleEn: string, titleAr: string, serviceTitleEn: string, serviceTitleAr: string): LocalizedList {
  const country = countryName(region);
  const title = titleEn.toLowerCase();
  const arabicTitle = titleAr;
  const intent = intentSearchVariants(titleEn, titleAr, country);
  const observed = OBSERVED_SEARCH_QUERY_ALIASES[`${region}:${titleEn}`] ?? { en: [], ar: [] };
  return {
    en: uniqueVariants([
      `${titleEn} lawyer in ${country.en}`,
      `${titleEn} attorney in ${country.en}`,
      `law firm for ${title} in ${country.en}`,
      `legal consultant for ${title} in ${country.en}`,
      `${titleEn} legal advice in ${country.en}`,
      `${titleEn} legal consultation in ${country.en}`,
      `how to address ${title} in ${country.en}`,
      `what to do about ${title}`,
      `urgent legal review for ${title}`,
      `documents and evidence for ${title}`,
      `what documents are needed for ${title}`,
      `how to prove ${title}`,
      `legal process for ${title}`,
      `steps to handle ${title}`,
      `consultation about ${title}`,
      `online legal review for ${title}`,
      `online lawyer for ${title}`,
      `${title} dispute advice`,
      `${title} claim or defence`,
      `${title} court case`,
      `${title} settlement options`,
      `legal options for ${title}`,
      `${serviceTitleEn} review for ${title}`,
      `${serviceTitleEn} lawyer for ${title}`,
      `${title} rights and next steps`,
      `${title} consultation cost`,
      `${title} lawyer fees`,
      `${title} lawyer near me`,
      `${title} help in ${country.en}`,
      `legal help for ${title}`,
      `initial case assessment for ${title}`,
      `legal consequences of ${title}`,
      `law and requirements for ${title} in ${country.en}`,
      ...intent.en,
      ...observed.en,
    ]),
    ar: uniqueVariants([
      `${arabicTitle} محامي في ${country.ar}`,
      `محامي ${arabicTitle} في ${country.ar}`,
      `مستشار قانوني في ${arabicTitle}`,
      `مكتب محاماة لقضية ${arabicTitle}`,
      `استشارة قانونية بشأن ${arabicTitle} ${country.ar}`,
      `استشارة محامي في ${arabicTitle}`,
      `كيفية حل ${arabicTitle}`,
      `ماذا أفعل في ${arabicTitle}`,
      `مساعدة عاجلة في ${arabicTitle}`,
      `مستندات وأدلة ${arabicTitle}`,
      `ما المستندات المطلوبة في ${arabicTitle}`,
      `كيفية إثبات ${arabicTitle}`,
      `إجراءات ${arabicTitle}`,
      `خطوات التعامل مع ${arabicTitle}`,
      `تكلفة الاستشارة في ${arabicTitle}`,
      `أتعاب محامي ${arabicTitle}`,
      `استشارة أونلاين بشأن ${arabicTitle}`,
      `محامي أونلاين في ${arabicTitle}`,
      `محامي نزاع ${arabicTitle}`,
      `رفع دعوى ${arabicTitle}`,
      `الدفاع في قضية ${arabicTitle}`,
      `تسوية ${arabicTitle}`,
      `تجنب مشكلة ${arabicTitle}`,
      `محامي ${serviceTitleAr} في مسألة ${arabicTitle}`,
      `حقوق وخيارات ${arabicTitle}`,
      `محامي ${arabicTitle} قريب مني`,
      `مساعدة قانونية في ${arabicTitle} ${country.ar}`,
      `مساعدة قانونية بشأن ${arabicTitle}`,
      `تقييم قانوني أولي لمسألة ${arabicTitle}`,
      `الآثار القانونية لـ ${arabicTitle}`,
      `النظام والإجراءات في ${arabicTitle} في ${country.ar}`,
      ...intent.ar,
      ...observed.ar,
    ]),
  };
}

type ProblemIntent = {
  key: string;
  actionEn: string;
  actionAr: string;
  riskEn: string;
  riskAr: string;
  decisionEn: string;
  decisionAr: string;
};

function problemIntent(titleEn: string, titleAr: string): ProblemIntent {
  const text = `${titleEn} ${titleAr}`.toLowerCase();
  const intents: Array<[RegExp, ProblemIntent]> = [
    [/(deadline|notice|appeal|objection|limitation|filing|ميعاد|إخطار|اعتراض|طعن|تقادم|قيد)/, { key: "deadline", actionEn: "calculate the controlling date and preserve the available procedural step", actionAr: "حساب التاريخ الحاكم وحفظ الإجراء المتاح", riskEn: "losing a right because a notice, objection, appeal or filing date is miscalculated", riskAr: "فوات حق بسبب خطأ في حساب ميعاد إخطار أو اعتراض أو طعن أو قيد", decisionEn: "the exact deadline, competent forum and protective filing", decisionAr: "الموعد الدقيق والجهة المختصة وإجراء الحماية" }],
    [/(jurisdiction|forum|court|authority|venue|اختصاص|محكمة|جهة)/, { key: "forum", actionEn: "identify the competent court, authority and governing procedural route", actionAr: "تحديد المحكمة أو الجهة المختصة والمسار الإجرائي الحاكم", riskEn: "starting before the wrong forum or relying on a procedure that does not apply", riskAr: "البدء أمام جهة غير مختصة أو الاعتماد على إجراء غير منطبق", decisionEn: "where and how the matter should proceed", decisionAr: "أين وكيف يجب أن تسير المسألة" }],
    [/(evidence|record|document|proof|expert|witness|دليل|إثبات|سجل|مستند|خبرة|شاهد)/, { key: "evidence", actionEn: "preserve, authenticate and organize the evidence around the disputed event", actionAr: "حفظ الأدلة والتحقق من حجيتها وتنظيمها حول الواقعة المتنازع عليها", riskEn: "a potentially valid position becoming difficult to prove", riskAr: "صعوبة إثبات مركز قانوني قد يكون صحيحاً", decisionEn: "which evidence is admissible, missing or needs expert support", decisionAr: "ما الدليل المقبول أو الناقص أو المحتاج إلى خبرة" }],
    [/(payment|debt|invoice|wage|salary|compensation|refund|unpaid|سداد|دين|فاتورة|أجر|راتب|تعويض|استرداد)/, { key: "money", actionEn: "reconcile the amount, due date, supporting records and recovery route", actionAr: "مطابقة المبلغ وميعاد الاستحقاق والسجلات المؤيدة ومسار التحصيل", riskEn: "overstating, understating or delaying a financial claim", riskAr: "المبالغة في المطالبة المالية أو إنقاصها أو تأخيرها", decisionEn: "what is recoverable and the proportionate demand or filing", decisionAr: "ما يمكن تحصيله والمطالبة أو القيد المتناسب" }],
    [/(termination|cancel|rescission|end of|dismissal|إنهاء|إلغاء|فسخ|فصل)/, { key: "termination", actionEn: "test the termination ground, notice, consequences and post-termination obligations", actionAr: "فحص سبب الإنهاء والإخطار وآثاره والالتزامات اللاحقة", riskEn: "ending the relationship without a valid ground, required notice or evidence", riskAr: "إنهاء العلاقة دون سبب صحيح أو إخطار واجب أو دليل", decisionEn: "whether to challenge, cure, negotiate or complete the termination", decisionAr: "هل يلزم الطعن أو التصحيح أو التفاوض أو استكمال الإنهاء" }],
    [/(enforcement|execution|judgment|award|seizure|تنفيذ|حكم|قرار تحكيم|حجز)/, { key: "enforcement", actionEn: "confirm enforceability, debtor or asset information and the correct execution measure", actionAr: "تأكيد قابلية التنفيذ ومعلومات المدين أو الأموال وإجراء التنفيذ الصحيح", riskEn: "pursuing an unavailable measure or overlooking an enforceable asset or objection", riskAr: "طلب إجراء غير متاح أو إغفال مال قابل للتنفيذ أو اعتراض", decisionEn: "the next enforceable measure and any response to objections", decisionAr: "إجراء التنفيذ التالي والرد على أي اعتراض" }],
    [/(register|registration|licen|permit|approval|تسجيل|ترخيص|تصريح|موافقة)/, { key: "registration", actionEn: "map the eligibility, filing documents, authority and correction or appeal route", actionAr: "تحديد شروط الأهلية ومستندات الطلب والجهة ومسار التصحيح أو الطعن", riskEn: "delay or refusal caused by the wrong application, record or authority", riskAr: "تأخير أو رفض بسبب طلب أو سجل أو جهة غير صحيحة", decisionEn: "what must be filed, corrected or challenged", decisionAr: "ما يجب تقديمه أو تصحيحه أو الطعن فيه" }],
  ];
  return intents.find(([pattern]) => pattern.test(text))?.[1] ?? {
    key: "rights",
    actionEn: "separate the relevant facts, legal duties, available options and practical sequence",
    actionAr: "فصل الوقائع ذات الصلة والالتزامات القانونية والخيارات المتاحة والتسلسل العملي",
    riskEn: "taking action before the governing facts, authority and remedy are verified",
    riskAr: "اتخاذ إجراء قبل التحقق من الوقائع الحاكمة والجهة ووسيلة المعالجة",
    decisionEn: "the legal position and the most proportionate next step",
    decisionAr: "المركز القانوني والخطوة التالية الأكثر تناسباً",
  };
}

type ProblemProfile = {
  factsEn: string;
  factsAr: string;
  evidenceEn: string;
  evidenceAr: string;
  outcomeEn: string;
  outcomeAr: string;
};

const SYRIA_ADDITIONAL_ISSUES: Record<string, LocalizedList> = {
  "family-law": {
    en: ["Recognition and enforcement of a Syrian family judgment", "Family-status document or civil-record correction"],
    ar: ["الاعتراف بالحكم الأسري السوري وتنفيذه", "تصحيح وثيقة الحالة الأسرية أو السجل المدني"],
  },
  "business-law": {
    en: ["Commercial-register and company-record dispute", "Termination of an exclusive distribution relationship"],
    ar: ["منازعة السجل التجاري وسجلات الشركة", "إنهاء علاقة توزيع حصرية"],
  },
  "real-estate": {
    en: ["Land-registry and title-record correction", "Property possession and handover dispute"],
    ar: ["تصحيح قيود السجل العقاري وسند الملكية", "منازعة حيازة العقار وتسليمه"],
  },
  "employment-law": {
    en: ["Employment termination and labour-record dispute", "Correction of a work permit or labour record"],
    ar: ["منازعة إنهاء العمل والسجل العمالي", "تصحيح تصريح العمل أو السجل العمالي"],
  },
  "foreign-investment": {
    en: ["Foreign-investor licensing and registration problem", "Cross-border investment payment or exit dispute"],
    ar: ["مشكلة ترخيص وتسجيل المستثمر الأجنبي", "منازعة دفع أو خروج استثماري عابر للحدود"],
  },
  "administrative-law": {
    en: ["Challenge to an administrative licence or public decision", "Administrative compensation claim"],
    ar: ["الطعن في الترخيص أو القرار الإداري", "مطالبة التعويض عن القرار الإداري"],
  },
  arbitration: {
    en: ["Challenge to a Syrian arbitration agreement or award", "Appointment or removal of an arbitrator dispute"],
    ar: ["الطعن في اتفاق التحكيم أو الحكم التحكيمي السوري", "منازعة تعيين المحكم أو رده"],
  },
  enforcement: {
    en: ["Execution of a Syrian court judgment", "Objection to an execution measure or seizure"],
    ar: ["تنفيذ حكم قضائي سوري", "الاعتراض على إجراء تنفيذي أو حجز"],
  },
  "companies-law": {
    en: ["Company registration and amendment dispute", "Partner withdrawal and liquidation dispute"],
    ar: ["منازعة تسجيل الشركة وتعديلها", "منازعة انسحاب الشريك وتصفية الشركة"],
  },
  contracts: {
    en: ["Commercial contract dispute under Syrian law", "Contract authentication and evidence problem"],
    ar: ["منازعة العقد التجاري بموجب القانون السوري", "مشكلة توثيق العقد وإثباته"],
  },
  "criminal-law": {
    en: ["Criminal complaint before Syrian authorities", "Criminal case settlement and compensation claim"],
    ar: ["الشكوى الجزائية أمام الجهات السورية", "التسوية في الدعوى الجزائية ومطالبة التعويض"],
  },
  "banking-finance": {
    en: ["Banking dispute with a Syrian financial institution", "Loan, guarantee or collateral enforcement dispute"],
    ar: ["منازعة مصرفية مع مؤسسة مالية سورية", "منازعة القرض أو الكفالة أو تنفيذ الضمان"],
  },
  "intellectual-property": {
    en: ["Trademark registration or opposition in Syria", "Copyright infringement and takedown request"],
    ar: ["تسجيل العلامة التجارية أو الاعتراض عليها في سوريا", "التعدي على حقوق المؤلف وطلب الإزالة"],
  },
  "tax-zakat": {
    en: ["Syrian tax assessment and objection", "Customs valuation or penalty dispute"],
    ar: ["الربط الضريبي السوري والاعتراض عليه", "منازعة التقييم الجمركي أو الغرامة"],
  },
  "cyber-law": {
    en: ["Cybercrime complaint and digital-evidence problem in Syria", "Claim for reputational harm caused by online publication in Syria"],
    ar: ["الشكوى في الجريمة الإلكترونية ومشكلة الدليل الرقمي في سوريا", "مطالبة عن ضرر السمعة الناتج عن النشر الإلكتروني في سوريا"],
  },
  "medical-malpractice": {
    en: ["Medical negligence complaint and compensation in Syria", "Challenge to an adverse medical expert report"],
    ar: ["الشكوى عن الخطأ الطبي والتعويض في سوريا", "الطعن في تقرير خبرة طبية ضار بالموقف"],
  },
  "insurance-law": {
    en: ["Insurance claim dispute with a Syrian insurer", "Traffic-accident compensation and fault dispute in Syria"],
    ar: ["منازعة مطالبة تأمينية مع شركة تأمين سورية", "التعويض عن الحادث المروري ومنازعة نسبة الخطأ في سوريا"],
  },
  "civil-law": {
    en: ["Civil compensation claim in Syria", "Civil damages for reputational harm in Syria"],
    ar: ["المطالبة بالتعويض المدني في سوريا", "التعويض المدني عن الإضرار بالسمعة في سوريا"],
  },
  "civil-procedure": {
    en: ["Challenge to court jurisdiction or improper service in Syria", "Appeal deadline and service problem in Syria"],
    ar: ["الطعن في اختصاص المحكمة أو التبليغ غير الصحيح في سوريا", "مشكلة ميعاد الطعن والتبليغ في سوريا"],
  },
  "criminal-procedure": {
    en: ["Arrest, detention and release application in Syria", "Criminal appeal and evidence objection in Syria"],
    ar: ["التوقيف والاحتجاز وطلب إخلاء السبيل في سوريا", "الطعن الجزائي والاعتراض على الدليل في سوريا"],
  },
};

const SAUDI_ADDITIONAL_ISSUES: Record<string, LocalizedList> = {
  "employment-law": {
    en: ["Workplace discrimination and harassment complaint", "Commission and bonus payment dispute", "GOSI registration or contribution dispute", "Sick leave and annual leave entitlement dispute", "Non-compete and confidentiality clause dispute", "Employment dispute after resignation or job transfer"],
    ar: ["شكوى التمييز والتحرش في مكان العمل", "منازعة صرف العمولة والمكافأة", "منازعة التسجيل أو الاشتراك في التأمينات الاجتماعية", "منازعة استحقاق الإجازة المرضية والسنوية", "منازعة شرط عدم المنافسة والسرية", "منازعة عمالية بعد الاستقالة أو نقل الوظيفة"],
  },
  "real-estate": {
    en: ["Ejar rental contract and registration dispute", "Off-plan property purchase and developer delay claim", "Mortgage, financing and property-lien dispute", "Foreign property ownership eligibility problem", "Property handover and defects after purchase"],
    ar: ["منازعة عقد الإيجار وتسجيله في إيجار", "شراء عقار على الخارطة ومطالبة تأخر المطور", "منازعة الرهن والتمويل والحق العيني على العقار", "مشكلة أهلية تملك الأجنبي للعقار", "منازعة تسليم العقار وعيوبه بعد الشراء"],
  },
  "family-law": {
    en: ["Khulʿ and marriage-annulment dispute", "Domestic-violence protection and family-safety application", "Marital-status document and record correction", "Contested will and inheritance distribution dispute"],
    ar: ["منازعة الخلع وفسخ الزواج", "طلب الحماية من العنف الأسري وحماية الأسرة", "تصحيح وثيقة أو سجل الحالة الزوجية", "منازعة الوصية وتوزيع التركة"],
  },
  "criminal-law": {
    en: ["Fraud and financial-crime accusation", "Forgery and false-document accusation", "Breach-of-trust complaint or defence", "Public Prosecution investigation and questioning", "Criminal compensation and restitution claim"],
    ar: ["اتهام بالاحتيال أو جريمة مالية", "اتهام بالتزوير أو استعمال محرر مزور", "شكوى أو دفاع في خيانة الأمانة", "التحقيق والاستجواب أمام النيابة العامة", "المطالبة بالتعويض والرد في الدعوى الجزائية"],
  },
  "business-law": {
    en: ["Franchise agreement and termination dispute", "Commercial distribution and agency dispute", "Commercial due diligence before acquisition or investment", "Business sale and purchase dispute", "Competition and unfair-trade-practice complaint"],
    ar: ["منازعة عقد الامتياز التجاري وإنهائه", "منازعة التوزيع والوكالة التجارية", "الفحص القانوني التجاري قبل الاستحواذ أو الاستثمار", "منازعة بيع وشراء المنشأة", "شكوى المنافسة والممارسات التجارية غير العادلة"],
  },
  "companies-law": {
    en: ["Mergers and acquisitions legal due diligence", "Minority shareholder oppression dispute", "Company valuation and shareholder buyout dispute"],
    ar: ["الفحص القانوني لعمليات الاندماج والاستحواذ", "منازعة إضرار الأغلبية بحقوق الأقلية من المساهمين", "منازعة تقييم الشركة وشراء حصة المساهم"],
  },
  enforcement: {
    en: ["Promissory-note and commercial-paper enforcement", "Bank-account and salary seizure dispute", "Execution against an unavailable or absconding debtor", "Objection to an execution judge's decision"],
    ar: ["تنفيذ السند لأمر والأوراق التجارية", "منازعة الحجز على الحساب البنكي والراتب", "التنفيذ على مدين متعذر الوصول إليه أو هارب", "الاعتراض على قرار قاضي التنفيذ"],
  },
  "banking-finance": {
    en: ["Frozen bank account and lifting request", "Credit report and banking-record dispute", "Debt settlement and financing restructuring", "Debt-collection harassment and bank dispute"],
    ar: ["تجميد الحساب البنكي وطلب رفع التجميد", "منازعة التقرير الائتماني والسجل المصرفي", "تسوية الدين وإعادة هيكلة التمويل", "مضايقات تحصيل الدين والمنازعة المصرفية"],
  },
  "tax-zakat": {
    en: ["ZATCA e-invoicing compliance problem", "Withholding-tax assessment and objection", "VAT penalty and late-registration dispute", "Tax certificate and clearance problem"],
    ar: ["مشكلة الامتثال للفوترة الإلكترونية لدى زاتكا", "الربط والاعتراض على ضريبة الاستقطاع", "منازعة غرامة ضريبة القيمة المضافة والتسجيل المتأخر", "مشكلة الشهادة أو المخالصة الضريبية"],
  },
  "administrative-law": {
    en: ["Board of Grievances appeal against an administrative judgment", "Municipal licence refusal and business-activity suspension", "Government compensation claim for an administrative decision", "Public-sector employment and disciplinary dispute"],
    ar: ["الاستئناف أمام ديوان المظالم ضد الحكم الإداري", "رفض الرخصة البلدية وإيقاف النشاط التجاري", "مطالبة التعويض عن القرار الإداري", "منازعة الوظيفة العامة والتأديب"],
  },
  "foreign-investment": {
    en: ["Foreign investor due diligence and market-entry review", "Investment exit, repatriation and shareholder dispute"],
    ar: ["الفحص القانوني للمستثمر الأجنبي ومراجعة دخول السوق", "خروج الاستثمار وتحويل الأموال ومنازعة المساهمين"],
  },
  contracts: {
    en: ["Power-of-attorney drafting and authority dispute", "Document attestation and contract authentication problem"],
    ar: ["صياغة الوكالة ومنازعة حدود الصلاحية", "مشكلة تصديق المستند وتوثيق العقد"],
  },
};

/**
 * Cross-region lead-intent coverage. These are explicit customer problems,
 * not keyword variants, and are mapped to the closest existing service so
 * every served jurisdiction can answer the same high-intent need without
 * inventing unsupported regional service hubs.
 */
const ALL_REGION_LEAD_ISSUES: Record<string, LocalizedList> = {
  contracts: {
    en: [
      "Legal notice and demand letter drafting",
      "Power-of-attorney misuse, rejection or scope dispute",
      "Document attestation and legalisation problem",
      "Consumer refund and purchase cancellation dispute",
      "Defective product and consumer compensation claim",
      "Unpaid professional fees and service invoice dispute",
    ],
    ar: [
      "صياغة الإنذار والمطالبة القانونية",
      "إساءة استخدام الوكالة أو رفضها أو تجاوز نطاقها",
      "مشكلة تصديق المستند وإضفاء الصفة القانونية",
      "منازعة استرداد قيمة الشراء وإلغاء المعاملة",
      "المنتج المعيب ومطالبة المستهلك بالتعويض",
      "منازعة أتعاب المهنة والفاتورة الخدمية غير المدفوعة",
    ],
  },
  "employment-law": {
    en: [
      "Employment settlement and final-dues calculation",
      "Residency or employment-status restriction affecting work authorisation",
      "Visa, exit and re-entry restriction affecting employment",
    ],
    ar: [
      "تسوية العمل وحساب المستحقات النهائية",
      "قيود الإقامة أو الوضع الوظيفي المؤثرة في تصريح العمل",
      "قيود التأشيرة أو الخروج والعودة المؤثرة في العمل",
    ],
  },
  "family-law": {
    en: [
      "Marriage registration and family-status certificate problem",
      "Inheritance document and civil-record correction",
    ],
    ar: [
      "مشكلة تسجيل الزواج وشهادة الحالة الأسرية",
      "تصحيح مستندات الميراث والسجل المدني",
    ],
  },
  "real-estate": {
    en: [
      "Landlord or tenant notice and settlement problem",
      "Property service-charge and maintenance dispute",
    ],
    ar: [
      "مشكلة إخطار المالك أو المستأجر والتسوية",
      "منازعة رسوم الخدمات وصيانة العقار",
    ],
  },
  enforcement: {
    en: [
      "Bounced-cheque defence and criminal complaint concern",
      "Wrongful debt-collection or creditor harassment complaint",
    ],
    ar: [
      "الدفاع في الشيك المرتجع ومشكلة الشكوى الجزائية",
      "شكوى التحصيل غير المشروع أو مضايقة الدائن",
    ],
  },
  "insurance-law": {
    en: [
      "Traffic accident compensation for personal injury and vehicle damage",
      "Personal injury compensation for a non-traffic accident",
    ],
    ar: [
      "تعويض الحادث المروري عن الإصابة الشخصية وأضرار المركبة",
      "التعويض عن الإصابة الشخصية في حادث غير مروري",
    ],
  },
  "cyber-law": {
    en: [
      "Personal-data access, correction or deletion request",
      "Online account recovery and platform complaint",
    ],
    ar: [
      "طلب الوصول إلى البيانات الشخصية أو تصحيحها أو حذفها",
      "استرداد الحساب الإلكتروني والشكوى أمام المنصة",
    ],
  },
  "tax-zakat": {
    en: [
      "Corporate-tax registration and filing problem",
      "VAT invoice and tax-correction dispute",
    ],
    ar: [
      "مشكلة التسجيل والإقرار بضريبة الشركات",
      "منازعة فاتورة ضريبة القيمة المضافة وتصحيحها",
    ],
  },
};

const UAE_LEAD_ISSUES: Record<string, LocalizedList> = {
  "family-personal-status": {
    en: [
      "Divorce filing and personal-status procedure",
      "Child custody and visitation dispute",
      "Alimony and child-maintenance claim",
      "Marriage registration and certificate problem",
      "Inheritance document and civil-record correction",
    ],
    ar: [
      "قيد دعوى الطلاق وإجراءات الأحوال الشخصية",
      "منازعة حضانة الأطفال والزيارة",
      "مطالبة النفقة الزوجية ونفقة الأطفال",
      "مشكلة تسجيل الزواج وشهادة الزواج",
      "تصحيح مستندات الميراث والسجل المدني",
    ],
  },
  "employment-labour": {
    en: [
      "Wrongful termination and labour complaint",
      "End-of-service benefits and final-settlement dispute",
      "Commission and bonus payment dispute",
    ],
    ar: [
      "الفصل التعسفي والشكوى العمالية",
      "منازعة مكافأة نهاية الخدمة والتسوية النهائية",
      "منازعة صرف العمولة والمكافأة",
    ],
  },
  "real-estate-construction": {
    en: [
      "Dubai tenancy and RERA rental dispute",
      "Landlord notice and tenant settlement problem",
      "Property service-charge and maintenance dispute",
    ],
    ar: [
      "منازعة إيجار دبي وعقد الإيجار أمام ريرا",
      "مشكلة إخطار المالك وتسوية المستأجر",
      "منازعة رسوم الخدمات وصيانة العقار",
    ],
  },
  "enforcement-debt-recovery": {
    en: [
      "Bounced-cheque defence and criminal complaint concern",
      "Wrongful debt-collection or creditor harassment complaint",
    ],
    ar: [
      "الدفاع في الشيك المرتجع ومشكلة الشكوى الجزائية",
      "شكوى التحصيل غير المشروع أو مضايقة الدائن",
    ],
  },
  "tax-vat": {
    en: [
      "Corporate-tax registration and filing problem",
      "VAT invoice and tax-correction dispute",
    ],
    ar: [
      "مشكلة التسجيل والإقرار بضريبة الشركات",
      "منازعة فاتورة ضريبة القيمة المضافة وتصحيحها",
    ],
  },
  "immigration-residency": {
    en: [
      "Emirates ID and residency cancellation problem",
      "Visa overstay and immigration penalty dispute",
      "Entry, exit and travel restriction problem",
    ],
    ar: [
      "مشكلة إلغاء الهوية الإماراتية والإقامة",
      "منازعة مخالفة مدة التأشيرة والغرامة والهجرة",
      "مشكلة قيود الدخول والخروج والسفر",
    ],
  },
  "commercial-contracts": {
    en: [
      "Legal notice and demand letter drafting",
      "Power-of-attorney drafting and authority problem",
      "Document attestation and legalisation problem",
      "Consumer refund and purchase cancellation dispute",
      "Defective product and consumer compensation claim",
      "Unpaid professional fees and service invoice dispute",
    ],
    ar: [
      "صياغة الإنذار والمطالبة القانونية",
      "صياغة الوكالة ومشكلة حدود الصلاحية",
      "مشكلة تصديق المستند وإضفاء الصفة القانونية",
      "منازعة استرداد قيمة الشراء وإلغاء المعاملة",
      "المنتج المعيب ومطالبة المستهلك بالتعويض",
      "منازعة أتعاب المهنة والفاتورة الخدمية غير المدفوعة",
    ],
  },
};

function appendUniqueIssues(base: LocalizedList, ...additional: LocalizedList[]): LocalizedList {
  const en = [...base.en];
  const ar = [...base.ar];
  for (const list of additional) {
    for (const item of list.en) if (!en.includes(item)) en.push(item);
    for (const item of list.ar) if (!ar.includes(item)) ar.push(item);
  }
  return { en, ar };
}

const OVERLAPPING_SHARED_ISSUES: Record<string, Set<string>> = {
  "insurance-law": new Set(["Denied or delayed insurance claims", "Liability and compensation", "Settlement negotiation"]),
  "banking-finance": new Set(["Unauthorized transactions"]),
  enforcement: new Set(["Asset and debtor investigation"]),
  "intellectual-property": new Set(["Counterfeit and brand infringement"]),
  "cyber-law": new Set(["Online defamation"]),
};

function problemProfile(titleEn: string, serviceSlug: string): ProblemProfile {
  const topic = matterTopic(serviceSlug, titleEn);
  if (SPECIALIST_PROFILES[topic]) return SPECIALIST_PROFILES[topic];
  if (topic === "employment-termination") return {
    factsEn: "the reason and procedure for ending the employment relationship, including notice, warnings, investigation and the employer's stated reason",
    factsAr: "سبب وإجراءات إنهاء علاقة العمل، بما في ذلك الإخطار والإنذارات والتحقيق والسبب الذي ذكره صاحب العمل",
    evidenceEn: "the employment contract, termination letter, disciplinary record, HR messages, performance records and any grievance or complaint",
    evidenceAr: "عقد العمل وخطاب الإنهاء والسجل التأديبي ورسائل الموارد البشرية وسجلات الأداء وأي تظلم أو شكوى",
    outcomeEn: "challenge the termination, calculate entitlements, negotiate a settlement or prepare the appropriate labour claim",
    outcomeAr: "الطعن في الإنهاء أو حساب المستحقات أو التفاوض على تسوية أو إعداد المطالبة العمالية المناسبة",
  };
  if (topic === "money") return {
    factsEn: "what was promised, what was delivered, what remains unpaid and when the payment obligation became due",
    factsAr: "ما تم الاتفاق عليه وما تم تنفيذه وما بقي دون سداد ومتى حل ميعاد الاستحقاق",
    evidenceEn: "the agreement, invoices or payslips, account statements, delivery or performance records, payment demands and replies",
    evidenceAr: "العقد أو الفواتير أو كشوف الرواتب وكشوف الحساب وإثباتات التسليم أو التنفيذ ومطالبات الدفع والردود عليها",
    outcomeEn: "verify the amount, preserve the payment claim, pursue negotiation or select the correct filing and enforcement route",
    outcomeAr: "التحقق من المبلغ وحفظ المطالبة المالية والتفاوض أو اختيار مسار القيد والتنفيذ الصحيح",
  };
  if (topic === "contract") return {
    factsEn: "the parties' obligations, deadlines, conditions, approval rights, termination rights and the event that created the concern",
    factsAr: "التزامات الأطراف والمواعيد والشروط وحقوق الموافقة والإنهاء والواقعة التي أدت إلى القلق القانوني",
    evidenceEn: "the signed contract, amendments, schedules, specifications, negotiation history, notices and performance or payment records",
    evidenceAr: "العقد الموقع والتعديلات والملاحق والمواصفات وتاريخ التفاوض والإخطارات وسجلات التنفيذ أو السداد",
    outcomeEn: "identify exposure, correct the document, respond to the breach or pursue the remedy available under the agreement and law",
    outcomeAr: "تحديد المخاطر وتصحيح المستند أو الرد على الإخلال أو طلب وسيلة المعالجة المتاحة بموجب العقد والقانون",
  };
  if (topic === "family") return {
    factsEn: "the family relationship, the current living and care arrangements, prior agreements or orders and the change that requires advice",
    factsAr: "العلاقة الأسرية وترتيبات السكن والرعاية الحالية والاتفاقيات أو الأحكام السابقة والتغيير الذي يستدعي المشورة",
    evidenceEn: "identity and family-status records, prior judgments or agreements, care and expense records, communications and evidence of the child's or family's circumstances",
    evidenceAr: "مستندات الهوية والحالة الأسرية والأحكام أو الاتفاقيات السابقة وسجلات الرعاية والمصروفات والمراسلات وما يثبت ظروف الطفل أو الأسرة",
    outcomeEn: "protect the relevant rights and interests, prepare a negotiated arrangement or identify the appropriate personal-status procedure",
    outcomeAr: "حماية الحقوق والمصالح ذات الصلة وإعداد ترتيب تفاوضي أو تحديد إجراء الأحوال الشخصية المناسب",
  };
  if (topic === "property") return {
    factsEn: "the property or project, each party's legal interest, the transaction or possession history and the event that created the dispute",
    factsAr: "العقار أو المشروع والحق القانوني لكل طرف وتاريخ المعاملة أو الحيازة والواقعة التي نشأ عنها النزاع",
    evidenceEn: "title and registration records, sale or lease documents, plans, payment records, notices, photographs and expert or contractor reports",
    evidenceAr: "سجلات الملكية والتسجيل ومستندات البيع أو الإيجار والمخططات وإثباتات الدفع والإخطارات والصور وتقارير الخبراء أو المقاولين",
    outcomeEn: "clarify title, possession, contractual responsibility, registration status or the remedy needed to protect the property position",
    outcomeAr: "توضيح الملكية أو الحيازة أو المسؤولية العقدية أو حالة التسجيل أو وسيلة المعالجة اللازمة لحماية الوضع العقاري",
  };
  if (topic === "regulatory") return {
    factsEn: "the authority's decision or requirement, the legal basis given, the response or deadline and the practical effect on the person or business",
    factsAr: "قرار الجهة أو متطلبها والأساس القانوني المذكور والرد أو الميعاد والأثر العملي على الشخص أو المنشأة",
    evidenceEn: "the licence or registration, application, decision, authority correspondence, submitted information, payment record and deadline notice",
    evidenceAr: "الرخصة أو التسجيل والطلب والقرار ومراسلات الجهة والمعلومات المقدمة وإثبات السداد وإخطار الميعاد",
    outcomeEn: "preserve the right to object or appeal, correct the record, seek approval or challenge the decision through the competent route",
    outcomeAr: "حفظ الحق في الاعتراض أو الطعن وتصحيح السجل أو طلب الموافقة أو الطعن في القرار عبر المسار المختص",
  };
  if (topic === "enforcement") return {
    factsEn: "the existing judgment, award, agreement or enforceable instrument, the other party's conduct and the procedural stage already reached",
    factsAr: "الحكم أو القرار التحكيمي أو الاتفاق أو السند التنفيذي القائم وتصرف الطرف الآخر والمرحلة الإجرائية التي وصل إليها الملف",
    evidenceEn: "the judgment or award, arbitration or jurisdiction clause, service records, payment history, asset information and prior applications or objections",
    evidenceAr: "الحكم أو القرار وشرط التحكيم أو الاختصاص ومستندات التبليغ وتاريخ السداد ومعلومات الأصول والطلبات أو الاعتراضات السابقة",
    outcomeEn: "protect the procedural position, select the recognition, settlement or enforcement step and move the matter toward recovery or resolution",
    outcomeAr: "حماية المركز الإجرائي واختيار خطوة الاعتراف أو التسوية أو التنفيذ ودفع الملف نحو التحصيل أو الحل",
  };
  if (topic === "traffic") return {
    factsEn: "how the traffic accident occurred, the police or traffic report, the parties involved, the injuries or vehicle damage and the insurance position",
    factsAr: "كيفية وقوع الحادث المروري وتقرير الشرطة أو المرور والأطراف المعنية والإصابات أو أضرار المركبة وموقف التأمين",
    evidenceEn: "the traffic report, photographs or video, medical records, repair estimates, insurance policy, witness details and correspondence with the insurer",
    evidenceAr: "تقرير المرور والصور أو الفيديو والسجلات الطبية وتقديرات الإصلاح ووثيقة التأمين وبيانات الشهود والمراسلات مع شركة التأمين",
    outcomeEn: "challenge the fault assessment, recover vehicle or injury compensation, or respond to the insurer or opposing party",
    outcomeAr: "الطعن في نسبة الخطأ أو تحصيل تعويض المركبة أو الإصابة أو الرد على شركة التأمين أو الطرف الآخر",
  };
  if (topic === "insurance") return {
    factsEn: "the policy promise, the event causing the loss, the claim submitted, the insurer's response and the amount or treatment being disputed",
    factsAr: "التغطية المتفق عليها والواقعة المسببة للضرر والمطالبة المقدمة ورد شركة التأمين والمبلغ أو العلاج محل النزاع",
    evidenceEn: "the policy and endorsements, claim form, rejection or settlement letter, loss records, expert or medical reports and payment evidence",
    evidenceAr: "وثيقة التأمين وملاحقها ونموذج المطالبة وخطاب الرفض أو التسوية وسجلات الضرر وتقارير الخبراء أو الأطباء وإثباتات الدفع",
    outcomeEn: "interpret the coverage, challenge the rejection or underpayment and pursue the amount or remedy available under the policy",
    outcomeAr: "تفسير التغطية والطعن في الرفض أو نقص السداد والمطالبة بالمبلغ أو وسيلة المعالجة المتاحة بموجب الوثيقة",
  };
  if (topic === "company") return {
    factsEn: "the company structure, ownership or management decision, the parties' authority and the corporate act or dispute that needs to be addressed",
    factsAr: "هيكل الشركة وملكية الحصص أو قرار الإدارة وصلاحيات الأطراف والتصرف أو النزاع الشركاتي محل المعالجة",
    evidenceEn: "the articles, commercial register, shareholder or partner agreement, resolutions, transfers, financial records and company correspondence",
    evidenceAr: "عقد التأسيس والسجل التجاري واتفاق المساهمين أو الشركاء والقرارات والتحويلات والسجلات المالية ومراسلات الشركة",
    outcomeEn: "protect the ownership or management position, correct the corporate record, complete formation or pursue the available corporate remedy",
    outcomeAr: "حماية مركز الملكية أو الإدارة وتصحيح السجل الشركاتي أو إتمام التأسيس أو طلب وسيلة المعالجة الشركاتية المتاحة",
  };
  if (topic === "medical") return {
    factsEn: "the treatment received, the expected professional standard, the medical event or delay and the physical or financial harm claimed",
    factsAr: "العلاج الذي تم تلقيه والمعيار المهني المتوقع والواقعة الطبية أو التأخير والضرر الجسدي أو المالي المدعى به",
    evidenceEn: "complete medical records, consent forms, reports, prescriptions, test results, expert opinions, expenses and provider correspondence",
    evidenceAr: "السجلات الطبية الكاملة ونماذج الموافقة والتقارير والوصفات ونتائج الفحوص وآراء الخبراء والمصروفات ومراسلات مقدم الخدمة",
    outcomeEn: "assess whether the evidence supports professional liability and pursue the appropriate compensation or response",
    outcomeAr: "تقييم ما إذا كانت الأدلة تثبت المسؤولية المهنية وطلب التعويض أو الرد المناسب",
  };
  if (topic === "ip") return {
    factsEn: "the protected work, mark or brand, ownership or registration, the alleged use and the commercial harm or urgency involved",
    factsAr: "المصنف أو العلامة أو الاسم التجاري المحمي وملكيته أو تسجيله والاستخدام المدعى به والضرر التجاري أو الاستعجال",
    evidenceEn: "registration certificates, original files, ownership records, screenshots, product samples, sales evidence and platform or marketplace communications",
    evidenceAr: "شهادات التسجيل والملفات الأصلية ومستندات الملكية ولقطات الشاشة وعينات المنتجات وإثباتات المبيعات ومراسلات المنصات",
    outcomeEn: "preserve the right, seek removal or cessation, challenge the registration or pursue infringement compensation",
    outcomeAr: "حفظ الحق وطلب الإزالة أو وقف الاستخدام أو الطعن في التسجيل أو المطالبة بتعويض التعدي",
  };
  if (topic === "cyber") return {
    factsEn: "the digital conduct, account or data affected, the date and platform, the person or entity involved and any continuing risk",
    factsAr: "السلوك الرقمي أو الحساب أو البيانات المتأثرة والتاريخ والمنصة والشخص أو الجهة المعنية وأي خطر مستمر",
    evidenceEn: "screenshots, URLs, account logs, messages, device or platform records, incident reports and proof of identity or ownership",
    evidenceAr: "لقطات الشاشة والروابط وسجلات الحساب والرسائل وسجلات الجهاز أو المنصة وتقارير الحادث وإثبات الهوية أو الملكية",
    outcomeEn: "preserve digital evidence, seek removal or protection and identify the civil, criminal or regulatory response available",
    outcomeAr: "حفظ الدليل الرقمي وطلب الإزالة أو الحماية وتحديد المسار المدني أو الجزائي أو التنظيمي المتاح",
  };
  if (topic === "criminal") return {
    factsEn: "what conduct is alleged, the investigation or complaint stage, the immediate restrictions and any evidence that could affect the defence",
    factsAr: "السلوك المدعى به ومرحلة التحقيق أو الشكوى والقيود العاجلة وأي دليل قد يؤثر في الدفاع",
    evidenceEn: "the complaint or summons, interview or investigation records, digital communications, devices or files, witnesses and previous decisions",
    evidenceAr: "الشكوى أو التكليف بالحضور ومحاضر الاستجواب أو التحقيق والمراسلات الرقمية والأجهزة أو الملفات والشهود والقرارات السابقة",
    outcomeEn: "protect procedural rights, preserve evidence, prepare the response and identify any urgent application or defence step",
    outcomeAr: "حماية الحقوق الإجرائية وحفظ الأدلة وإعداد الرد وتحديد أي طلب أو خطوة دفاع عاجلة",
  };
  throw new Error(`Missing evidence profile for ${serviceSlug}: ${topic}`);
}

function legalAccuracyBoundary(region: Region): LegalAccuracyBoundary {
  const regionalChecks: LocalizedList = region === "uae"
    ? {
        en: [
          "Whether federal, emirate-level, free-zone, DIFC or ADGM rules and institutions govern the matter",
          "Which current legislation, implementing rules and contractual terms were operative on the relevant date",
          "Which court, tribunal, regulator or administrative authority is competent and whether a preliminary step is required",
        ],
        ar: [
          "ما إذا كانت القواعد والجهات الاتحادية أو المحلية أو الخاصة بالمناطق الحرة أو مركز دبي المالي العالمي أو سوق أبوظبي العالمي هي المنطبقة",
          "ما التشريع واللائحة التنفيذية والشروط التعاقدية النافذة في التاريخ ذي الصلة",
          "ما المحكمة أو اللجنة أو الجهة التنظيمية أو الإدارية المختصة وما إذا كانت توجد خطوة أولية لازمة",
        ],
      }
    : region === "syr"
      ? {
          en: [
            "The operative statutory text and amendments for the relevant date, checked against available official publication",
            "The court or authority with subject-matter and territorial competence, including any preliminary procedure",
            "Whether civil-status, registration, authentication, enforcement or cross-border facts change the available route",
          ],
          ar: [
            "النص التشريعي النافذ وتعديلاته في التاريخ ذي الصلة بالرجوع إلى النشر الرسمي المتاح",
            "المحكمة أو الجهة المختصة نوعياً ومكانياً وأي إجراء أولي لازم",
            "ما إذا كانت وقائع الأحوال المدنية أو التسجيل أو التصديق أو التنفيذ أو العنصر العابر للحدود تغير المسار المتاح",
          ],
        }
      : {
          en: [
            "Which current law, regulation, implementing decision and contractual terms govern the matter",
            "Which court, committee, regulator or administrative authority is competent and whether a pre-filing step is required",
            "Whether nationality, residency, sector, employment status, registration or the date of the event changes the analysis",
          ],
          ar: [
            "ما النظام واللائحة والقرار التنفيذي والشروط التعاقدية النافذة على المسألة",
            "ما المحكمة أو اللجنة أو الجهة التنظيمية أو الإدارية المختصة وما إذا كانت توجد خطوة سابقة على القيد",
            "ما إذا كانت الجنسية أو الإقامة أو القطاع أو صفة العمل أو التسجيل أو تاريخ الواقعة تغير التحليل",
          ],
        };

  return {
    reviewedAt: "2026-09-05",
    status: "framework-verified-matter-review-required",
    checks: regionalChecks,
    urgentWarning: {
      en: "If you have a hearing, detention, notice, appeal, limitation or filing date, state the exact date in your first message and seek immediate advice. Contacting CounselO does not suspend or extend a deadline.",
      ar: "إذا كان لديك توقيف أو جلسة أو إخطار أو ميعاد اعتراض أو تقادم أو قيد، فاذكر التاريخ الدقيق في أول رسالة واطلب المشورة فوراً. التواصل مع كاونسلو لا يوقف الميعاد ولا يمدده.",
    },
    engagementWarning: {
      en: "This page identifies issues for intake; it does not determine entitlement, liability, forum, deadline or outcome. Sending information does not by itself create an engagement. Matter-specific advice begins only after CounselO accepts the scope and confirms the service terms.",
      ar: "تحدد هذه الصفحة مسائل الفحص الأولي ولا تحسم الاستحقاق أو المسؤولية أو الاختصاص أو الميعاد أو النتيجة. ولا ينشئ إرسال المعلومات وحده علاقة تكليف. تبدأ المشورة الخاصة بالملف بعد قبول كاونسلو للنطاق وتأكيد شروط الخدمة.",
    },
    intakeChecklist: {
      en: [
        "Country, city or emirate, and any free-zone or cross-border connection",
        "The exact date of any hearing, notice, appeal or filing deadline",
        "A five-line chronology and the outcome you want",
        "The key contract, decision, notice or other document—redacted where appropriate",
      ],
      ar: [
        "الدولة والمدينة أو الإمارة وأي صلة بمنطقة حرة أو عنصر عابر للحدود",
        "التاريخ الدقيق لأي جلسة أو إخطار أو اعتراض أو ميعاد قيد",
        "تسلسل زمني في خمسة أسطر والنتيجة التي تريدها",
        "العقد أو القرار أو الإخطار أو المستند الأساسي بعد حجب البيانات غير اللازمة عند الاقتضاء",
      ],
    },
  };
}

function buildDetailedContent({
  region,
  serviceSlug,
  serviceTitleEn,
  serviceTitleAr,
  titleEn,
  titleAr,
  conceptsEn = [],
  conceptsAr = [],
}: {
  region: Region;
  serviceSlug: string;
  serviceTitleEn: string;
  serviceTitleAr: string;
  titleEn: string;
  titleAr: string;
  conceptsEn?: string[];
  conceptsAr?: string[];
}) {
  const country = countryName(region);
  const legalFocusEn = conceptsEn.slice(0, 2).join(" and ") || serviceTitleEn;
  const legalFocusAr = conceptsAr.slice(0, 2).join(" و") || serviceTitleAr;
  const editorial = getMatterEditorial(titleEn);
  const brief = getMatterIntentBrief(titleEn);
  const baseProfile = editorial ?? problemProfile(titleEn, serviceSlug);
  const profile = brief ? { ...baseProfile, evidenceEn: brief.documents.en, evidenceAr: brief.documents.ar } : baseProfile;
  const intent = problemIntent(titleEn, titleAr);

  return {
    contentTopic: matterTopic(serviceSlug, titleEn),
    documentsEn: [profile.evidenceEn],
    documentsAr: [profile.evidenceAr],
    heroSummary: {
      en: brief?.answer.en ?? editorial?.summaryEn ?? `For ${titleEn.toLowerCase()}, the immediate task is to ${intent.actionEn}. CounselO checks the facts and the legal framework applicable in ${country.en} before confirming the legal position.`,
      ar: brief?.answer.ar ?? editorial?.summaryAr ?? `في مسألة ${titleAr} تتمثل المهمة العاجلة في ${intent.actionAr}. وتتحقق كاونسلو من الوقائع والإطار النافذ في ${country.ar} قبل تأكيد المركز القانوني.`,
    },
    atAGlance: {
      en: [
        `Issue: ${brief?.question.en ?? profile.factsEn}`,
        `Evidence: ${profile.evidenceEn}`,
        `Decision: ${brief ? "identify the supported options and the next action for the issue above" : editorial?.outcomeEn ?? intent.decisionEn}`,
      ],
      ar: [
        `المسألة: ${brief?.question.ar ?? profile.factsAr}`,
        `الأدلة: ${profile.evidenceAr}`,
        `القرار المطلوب: ${brief ? "تحديد الخيارات المؤيدة والإجراء التالي للمسألة أعلاه" : editorial?.outcomeAr ?? intent.decisionAr}`,
      ],
    },
    overview: {
      en: editorial ? `${editorial.summaryEn} The assessment for ${country.en} examines ${profile.factsEn}. Provide ${profile.evidenceEn}; the next step is to ${profile.outcomeEn}.` : `${titleEn} sits within ${serviceTitleEn.toLowerCase()} and concerns ${profile.factsEn}. The practical risk is ${intent.riskEn}. In ${country.en}, CounselO therefore checks the competent authority, evidence, operative rule and deadline before advising whether and how to ${profile.outcomeEn}.`,
      ar: editorial ? `${editorial.summaryAr} يتناول التقييم في ${country.ar} ${profile.factsAr}. قدّم ${profile.evidenceAr}؛ ويستهدف التقييم ${profile.outcomeAr}.` : `تندرج مسألة ${titleAr} ضمن ${serviceTitleAr} وتتعلق بـ${profile.factsAr}. ويتمثل الخطر العملي في ${intent.riskAr}. لذلك تتحقق كاونسلو في ${country.ar} من الجهة المختصة والأدلة والنص النافذ والميعاد قبل تقديم المشورة بشأن ${profile.outcomeAr}.`,
    },
    keyQuestions: {
      en: [
        `What facts show how ${titleEn.toLowerCase()} arose, and what outcome is required?`,
        `Which documents prove the key event, obligation, decision or loss in this matter?`,
        `How does ${legalFocusEn} affect the authority, deadline, remedy or burden of proof?`,
        `What would change the decision about ${intent.decisionEn}?`,
        `Is the evidence needed for ${titleEn.toLowerCase()} complete, reliable and preserved?`,
        `Should the next step be negotiation, a notice, an objection, a claim, an appeal or urgent protection?`,
      ],
      ar: [
        `ما الوقائع التي أدت إلى ${titleAr} وما النتيجة المطلوبة؟`,
        `ما المستندات التي تثبت الواقعة أو الالتزام أو القرار أو الضرر الأساسي في الملف؟`,
        `كيف يؤثر ${legalFocusAr} في الجهة المختصة أو الميعاد أو وسيلة المعالجة أو عبء الإثبات؟`,
        `ما الذي يمكن أن يغير القرار بشأن ${intent.decisionAr}؟`,
        `هل الأدلة اللازمة لمسألة ${titleAr} كاملة وموثوقة ومحفوظة؟`,
        "هل تكون الخطوة التالية تفاوضاً أو إخطاراً أو اعتراضاً أو مطالبة أو طعناً أو حماية عاجلة؟",
      ],
    },
    deliverables: {
      en: [
        `A focused statement and chronology explaining how ${titleEn.toLowerCase()} arose`,
        `A problem-specific review of ${profile.evidenceEn}`,
        "An issue map identifying the potentially applicable framework and the exact current provisions, authority and deadlines that must be verified",
        brief ? `A written answer to “${brief.question.en}” and prioritized next steps within the agreed scope` : `A written analysis and prioritized next-step plan, within the agreed scope, directed to this objective: ${profile.outcomeEn}`,
        "A clear explanation of what the consultation covers and whether separate representation, filing or attendance is needed",
      ],
      ar: [
        `عرض مركز للمسألة وتسلسل زمني يوضح كيف نشأت ${titleAr}`,
        `مراجعة مخصصة لـ${profile.evidenceAr}`,
        "خريطة للمسائل تحدد الإطار المحتمل انطباقه والنصوص النافذة والجهة والمواعيد الواجب التحقق منها بدقة",
        brief ? `إجابة مكتوبة عن «${brief.question.ar}» وخطوات تالية مرتبة ضمن النطاق المتفق عليه` : `تحليل مكتوب وخطة مرتبة للخطوة التالية ضمن النطاق المتفق عليه وموجهة إلى الهدف المطلوب: ${profile.outcomeAr}`,
        "توضيح نطاق الاستشارة وما إذا كان يلزم تمثيل أو قيد أو حضور مستقل",
      ],
    },
    process: {
      en: [
        { title: "1. Submit the matter", desc: `Send the facts, desired outcome, notice or deadline, and the key documents about ${titleEn.toLowerCase()} through the contact form, WhatsApp or email.` },
        { title: "2. CounselO studies and confirms", desc: `We study the information relevant to ${titleEn.toLowerCase()}, identify what is missing, and confirm the scope, fee, timing and written deliverable before work starts.` },
        { title: "3. Pay and we begin", desc: "After you approve the scope and pay for the agreed consultation, CounselO begins the focused legal review." },
        { title: "4. Receive the legal response", desc: brief ? "You receive the agreed written answer, its factual and legal basis, unresolved questions and next steps through WhatsApp or email." : `You receive the agreed written analysis and next steps focused on whether and how to ${profile.outcomeEn}, through WhatsApp or email.` },
      ],
      ar: [
        { title: "1. ترسل المسألة", desc: `أرسل الوقائع والنتيجة المطلوبة وأي إخطار أو ميعاد والمستندات الأساسية المتعلقة بـ${titleAr} عبر نموذج التواصل أو واتساب أو البريد الإلكتروني.` },
        { title: "2. تدرس كاونسلو وتؤكد النطاق", desc: `تدرس كاونسلو المعلومات المرتبطة بـ${titleAr} وتحدد الناقص وتؤكد نطاق العمل والرسوم والمدة والمخرج المكتوب قبل البدء.` },
        { title: "3. تدفع ونبدأ العمل", desc: "بعد موافقتك على النطاق وسداد قيمة الاستشارة المتفق عليها، تبدأ كاونسلو المراجعة القانونية المركزة." },
        { title: "4. تتلقى الرد القانوني", desc: brief ? "تتلقى الإجابة المكتوبة المتفق عليها وأساسها الواقعي والقانوني والمسائل غير المحسومة والخطوات التالية عبر واتساب أو البريد الإلكتروني." : `تتلقى التحليل المكتوب والخطوات التالية المتفق عليها، مع التركيز على ${profile.outcomeAr}، عبر واتساب أو البريد الإلكتروني.` },
      ],
    },
    experience: {
      en: `CounselO is founded and led by Lawyer and Legal Counsel Omar Al-Baghdadi, with 30+ years of legal practice and 20,000+ legal matters and consultations across civil, commercial, employment, family, property, administrative, arbitration and enforcement matters. For ${titleEn.toLowerCase()}, that experience means testing ${profile.factsEn} against ${profile.evidenceEn}, then matching the advice to the relevant forum and remedy—not applying a one-size-fits-all answer.`,
      ar: `تأسست كاونسلو ويقودها المحامي والمستشار القانوني عمر البغدادي، مع خبرة قانونية إقليمية 30+ عاماً من الممارسة القانونية وأكثر من 20,000 مسألة واستشارة قانونية في المسائل المدنية والتجارية والعمالية والأسرية والعقارية والإدارية والتحكيم والتنفيذ. وفي مسألة ${titleAr} تعني هذه الخبرة اختبار ${profile.factsAr} في ضوء ${profile.evidenceAr} ثم مواءمة المشورة مع الجهة ووسيلة المعالجة، لا تطبيق إجابة عامة واحدة للجميع.`,
    },
    faqs: {
      en: [
        {
          q: `What should I do first about ${titleEn.toLowerCase()}?`,
          a: `Preserve ${profile.evidenceEn}, prepare a dated chronology and identify any notice or deadline. Send those materials to CounselO for an initial assessment of the facts, forum and options in ${country.en}.`,
        },
        {
          q: `What documents help assess ${titleEn.toLowerCase()}?`,
          a: `For this problem, start with ${profile.evidenceEn}. Add a short dated summary and identify any notice or deadline. The final list depends on the facts.`,
        },
        {
          q: `Can CounselO review ${titleEn.toLowerCase()} online?`,
          a: `Yes. The initial assessment and document review can begin through WhatsApp, email or the consultation form in Arabic or English. Formal filing, attendance and reserved representation work are scoped separately where required in ${country.en}.`,
        },
        {
          q: `How does CounselO help with ${titleEn.toLowerCase()}?`,
          a: brief ? `The review addresses this question: ${brief.question.en} CounselO examines ${profile.evidenceEn}, checks the applicable framework and authority, and explains the supported options and remaining uncertainties within the agreed scope.` : `CounselO focuses the review on ${profile.factsEn}, checks ${profile.evidenceEn}, identifies the potentially applicable framework and authority, verifies the operative provisions within the agreed scope, and delivers advice directed to whether and how to ${profile.outcomeEn}.`,
        },
        {
          q: "How quickly will I receive a response?",
          a: "CounselO targets a professional response within 24 hours, subject to the matter’s scope, urgency, intake completeness and service availability. The target is not a guaranteed legal outcome or filing deadline.",
        },
      ],
      ar: [
        {
          q: `ما أول خطوة في مسألة ${titleAr}؟`,
          a: `احفظ ${profile.evidenceAr} وأعد تسلسلاً زمنياً مؤرخاً وحدد أي إخطار أو ميعاد. أرسل هذه المواد إلى كاونسلو لتقييم أولي للوقائع والاختصاص والخيارات في ${country.ar}.`,
        },
        {
          q: `ما المستندات المفيدة لتقييم ${titleAr}؟`,
          a: `ابدأ بـ${profile.evidenceAr}، وأضف ملخصاً زمنياً مختصراً وحدد أي إخطار أو ميعاد. وتختلف القائمة النهائية بحسب الوقائع.`,
        },
        {
          q: `هل يمكن أن تراجع كاونسلو مسألة ${titleAr} أونلاين؟`,
          a: `نعم. يمكن بدء التقييم ومراجعة المستندات عبر واتساب أو البريد الإلكتروني أو نموذج التواصل بالعربية أو الإنجليزية. ويُحدد القيد الرسمي أو الحضور أو التمثيل المنظم بصورة منفصلة حيث يلزم في ${country.ar}.`,
        },
        {
          q: `كيف تساعد كاونسلو في ${titleAr}؟`,
          a: brief ? `تتناول المراجعة السؤال: ${brief.question.ar} وتفحص كاونسلو ${profile.evidenceAr} وتتحقق من الإطار والجهة المختصة وتوضح الخيارات المؤيدة وما بقي غير محسوم ضمن النطاق المتفق عليه.` : `تركز كاونسلو على ${profile.factsAr} وتراجع ${profile.evidenceAr} وتحدد الإطار المحتمل والجهة المختصة وتتحقق من النصوص النافذة ضمن النطاق المتفق عليه وتقدم مشورة موجهة إلى ${profile.outcomeAr}.`,
        },
        {
          q: "متى يصل الرد المهني؟",
          a: "تستهدف كاونسلو رداً مهنياً خلال 24 ساعة بحسب نطاق المسألة ودرجة الاستعجال واكتمال المعلومات وتوفر الخدمة. ولا يمثل ذلك ضماناً لنتيجة قانونية أو لموعد قيد محدد.",
        },
      ],
    },
    legalAccuracy: legalAccuracyBoundary(region),
  };
}

const SYRIA_TAX_ISSUE_TITLES: Readonly<Record<string, LocalizedText>> = {
  "Tax and zakat assessments": { en: "Tax jurisdiction and assessment review", ar: "مراجعة الاختصاص والتكليف الضريبي" },
  "VAT and customs issues": { en: "Cross-border transaction taxes and customs", ar: "ضرائب المعاملات العابرة للحدود والجمارك" },
  "VAT refund and registration dispute": { en: "Foreign VAT registration or refund affecting a Syrian business", ar: "تسجيل أو استرداد ضريبة قيمة مضافة أجنبية لنشاط سوري" },
  "VAT invoice and tax-correction dispute": { en: "Foreign VAT invoice correction for a Syrian transaction", ar: "تصحيح فاتورة ضريبة قيمة مضافة أجنبية لمعاملة سورية" },
};

function sharedPages(region: "sa" | "syr"): LegalProblemPage[] {
  const allowedServices = new Set(getServicesForRegion(region).map((service) => service.slug));
  return Object.entries(SERVICE_SEARCH_CONTENT)
    .filter(([parentServiceSlug]) => allowedServices.has(parentServiceSlug))
    .flatMap(([parentServiceSlug, content]) => {
      const service = getServiceDefinition(parentServiceSlug, region);
      const extra = ADDITIONAL_SEARCH_ISSUES[parentServiceSlug] ?? { en: [], ar: [] };
      const regional = region === "syr"
        ? (SYRIA_ADDITIONAL_ISSUES[parentServiceSlug] ?? { en: [], ar: [] })
        : region === "sa"
          ? (SAUDI_ADDITIONAL_ISSUES[parentServiceSlug] ?? { en: [], ar: [] })
          : { en: [], ar: [] };
      const allRegion = ALL_REGION_LEAD_ISSUES[parentServiceSlug] ?? { en: [], ar: [] };
      const excluded = OVERLAPPING_SHARED_ISSUES[parentServiceSlug] ?? new Set<string>();
      const pairedIssues = content.issuesEn
        .map((titleEn, index) => ({ titleEn, titleAr: content.issuesAr[index] ?? titleEn }))
        .filter(({ titleEn }) => !excluded.has(titleEn));
      const issueList = appendUniqueIssues(
        { en: pairedIssues.map((item) => item.titleEn), ar: pairedIssues.map((item) => item.titleAr) },
        extra,
        regional,
        allRegion,
      );
      const issuesEn = issueList.en;
      const issuesAr = issueList.ar;
      return issuesEn.map((originalTitleEn, index) => {
        const scopedTitle = region === "syr" && parentServiceSlug === "tax-zakat" ? SYRIA_TAX_ISSUE_TITLES[originalTitleEn] : undefined;
        const titleEn = scopedTitle?.en ?? originalTitleEn;
        const titleAr = scopedTitle?.ar ?? issuesAr[index] ?? titleEn;
        const details = buildDetailedContent({
          region,
          serviceSlug: parentServiceSlug,
          serviceTitleEn: service?.titleEn ?? parentServiceSlug,
          serviceTitleAr: service?.titleAr ?? parentServiceSlug,
          titleEn,
          titleAr,
        });
        const variants = searchVariants(region, titleEn, titleAr, service?.titleEn ?? parentServiceSlug, service?.titleAr ?? parentServiceSlug);
        return {
          region,
          parentServiceSlug,
          slug: canonicalProblemSlug(originalTitleEn),
          titleEn,
          titleAr,
          serviceTitleEn: service?.titleEn ?? parentServiceSlug,
          serviceTitleAr: service?.titleAr ?? parentServiceSlug,
          searchVariantsEn: variants.en,
          searchVariantsAr: variants.ar,
          ...details,
        };
      });
    });
}

function uaePages(): LegalProblemPage[] {
  return UAE_SERVICES.flatMap((service) => {
    const content = buildUaeServicePageContent(service);
    const issueList = appendUniqueIssues(
      content.specificIssues,
      UAE_LEAD_ISSUES[service.slug] ?? { en: [], ar: [] },
    );
    return issueList.en.map((originalTitleEn, index) => {
      const isDubaiRental = originalTitleEn === "Dubai tenancy and RERA rental dispute";
      const titleEn = isDubaiRental ? "Dubai tenancy and Rental Disputes Center claim" : originalTitleEn;
      const titleAr = isDubaiRental ? "منازعة إيجار دبي أمام مركز فض المنازعات الإيجارية" : issueList.ar[index] ?? titleEn;
      const details = buildDetailedContent({
        region: "uae",
        serviceSlug: service.slug,
        serviceTitleEn: service.title.en,
        serviceTitleAr: service.title.ar,
        titleEn,
        titleAr,
        conceptsEn: service.concepts.en,
        conceptsAr: service.concepts.ar,
      });
      const variants = searchVariants("uae", titleEn, titleAr, service.title.en, service.title.ar);
      return {
        region: "uae" as const,
        parentServiceSlug: service.slug,
        slug: canonicalProblemSlug(originalTitleEn),
        titleEn,
        titleAr,
        serviceTitleEn: service.title.en,
        serviceTitleAr: service.title.ar,
        searchVariantsEn: variants.en,
        searchVariantsAr: variants.ar,
        ...details,
        experience: {
          en: `${details.experience.en} ${content.experienceNote.en}`,
          ar: `${details.experience.ar} ${content.experienceNote.ar}`,
        },
      };
    });
  });
}

/** Retired procedural variants retain their original URLs and language through one-hop redirects. */
export const LEGAL_PROBLEM_REDIRECTS: Readonly<Record<string, string>> = Object.fromEntries(
  UAE_SERVICES.flatMap((service) =>
    buildUaeServicePageContent(service).proceduralIssues.en.flatMap((title) =>
      ["/uae", "/uae/ar"].map((prefix) => [
        `${prefix}/services/${service.slug}/${canonicalProblemSlug(title)}`,
        `${prefix}/services/${service.slug}`,
      ]),
    ),
  ),
);

export const LEGAL_PROBLEM_PAGES: readonly LegalProblemPage[] = [
  ...sharedPages("sa"),
  ...sharedPages("syr"),
  ...uaePages(),
].map(page => {
  const brief = getMatterIntentBrief(page.titleEn);
  if (brief) return {
    ...page,
    editorialTopic: getMatterEditorial(page.titleEn)?.id,
    intentBriefTitle: page.titleEn,
    contentUpdatedAt: "2026-09-06",
    overview: {
      en: `${brief.answer.en} For ${countryName(page.region).en}, identify the issuing authority, any foreign element and any date stated in a notice so the assessment addresses the actual procedure.`,
      ar: `${brief.answer.ar} وفي الملف المتعلق بـ${countryName(page.region).ar} حدّد الجهة المصدرة وأي عنصر أجنبي والموعد المذكور في الإخطار ليتناول التقييم الإجراء الفعلي.`,
    },
    keyQuestions: {
      en: [brief.question.en, ...(getMatterEditorial(page.titleEn)?.questions.en ?? []), "What outcome do you need, and which facts are disputed?", "What is missing from the evidence listed below?", "Which countries, parties, assets or authorities connect to this matter?", "Has any notice, agreement or decision set a date for action?"],
      ar: [brief.question.ar, ...(getMatterEditorial(page.titleEn)?.questions.ar ?? []), "ما النتيجة المطلوبة وما الوقائع المتنازع عليها؟", "ما الناقص من الأدلة المذكورة أدناه؟", "ما الدول والأطراف والأصول أو الجهات المرتبطة بالمسألة؟", "هل حدد إخطار أو اتفاق أو قرار موعداً لاتخاذ إجراء؟"],
    },
    faqs: {
      en: [{ q: brief.question.en, a: brief.answer.en }, ...(getMatterEditorial(page.titleEn)?.faqs.en ?? []), ...page.faqs.en].slice(0, 8),
      ar: [{ q: brief.question.ar, a: brief.answer.ar }, ...(getMatterEditorial(page.titleEn)?.faqs.ar ?? []), ...page.faqs.ar].slice(0, 8),
    },
  };
  const editorial = getMatterEditorial(page.titleEn);
  if (!editorial) return page;
  return {
    ...page,
    editorialTopic: editorial.id,
    contentUpdatedAt: "2026-09-06",
    documentsEn: [editorial.evidenceEn],
    documentsAr: [editorial.evidenceAr],
    keyQuestions: {
      en: [...editorial.questions.en, ...page.keyQuestions.en.slice(0, 3)],
      ar: [...editorial.questions.ar, ...page.keyQuestions.ar.slice(0, 3)],
    },
    faqs: {
      en: [...editorial.faqs.en, ...page.faqs.en].slice(0, 8),
      ar: [...editorial.faqs.ar, ...page.faqs.ar].slice(0, 8),
    },
  };
});

export function getLegalProblemPages(region: Region, parentServiceSlug?: string): LegalProblemPage[] {
  return LEGAL_PROBLEM_PAGES.filter(
    (page) => page.region === region && (!parentServiceSlug || page.parentServiceSlug === parentServiceSlug),
  );
}

export function getLegalProblemPage(region: Region, parentServiceSlug: string, slug: string): LegalProblemPage | undefined {
  return LEGAL_PROBLEM_PAGES.find(
    (page) => page.region === region && page.parentServiceSlug === parentServiceSlug && page.slug === slug,
  );
}

function relatedProblemTokens(value: string): Set<string> {
  const ignored = new Set([
    "a", "an", "and", "for", "in", "of", "or", "the", "to", "with",
    "claim", "dispute", "matter", "problem", "request",
  ]);
  return new Set(
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .split(/\s+/)
      .filter((token) => token && !ignored.has(token)),
  );
}

function relatedProblemScore(source: LegalProblemPage, candidate: LegalProblemPage): number {
  const sourceTokens = relatedProblemTokens(source.titleEn);
  const candidateTokens = relatedProblemTokens(candidate.titleEn);
  let overlap = 0;
  for (const token of sourceTokens) if (candidateTokens.has(token)) overlap += 1;
  return overlap / Math.max(1, new Set([...sourceTokens, ...candidateTokens]).size);
}

/**
 * Build a balanced sibling cluster for a problem page. Ring neighbours ensure
 * that every page receives contextual inbound links; semantic matches fill the
 * remaining positions without repeatedly favouring the first registry items.
 */
export function getRelatedLegalProblemPages(page: LegalProblemPage, limit = 6): LegalProblemPage[] {
  const siblings = getLegalProblemPages(page.region, page.parentServiceSlug);
  if (siblings.length <= 1 || limit <= 0) return [];

  const currentIndex = siblings.findIndex((candidate) => candidate.slug === page.slug);
  const selected: LegalProblemPage[] = [];
  const add = (candidate: LegalProblemPage | undefined) => {
    if (candidate && candidate.slug !== page.slug && !selected.some((item) => item.slug === candidate.slug)) {
      selected.push(candidate);
    }
  };

  for (let distance = 1; distance < siblings.length && selected.length < Math.min(4, limit); distance++) {
    add(siblings[(currentIndex + distance) % siblings.length]);
    if (selected.length < Math.min(4, limit)) {
      add(siblings[(currentIndex - distance + siblings.length) % siblings.length]);
    }
  }

  const semanticCandidates = siblings
    .filter((candidate) => candidate.slug !== page.slug && !selected.some((item) => item.slug === candidate.slug))
    .map((candidate, registryIndex) => ({ candidate, registryIndex, score: relatedProblemScore(page, candidate) }))
    .sort((left, right) => right.score - left.score || left.registryIndex - right.registryIndex);
  for (const { candidate } of semanticCandidates) {
    if (selected.length >= limit) break;
    add(candidate);
  }
  return selected.slice(0, limit);
}

export type LegalProblemLanguageAlternate = {
  hrefLang: "en-AE" | "ar-AE" | "en-SA" | "ar-SA" | "en-SY" | "ar-SY";
  href: string;
};

/** Return only real reciprocal jurisdiction/language variants for hreflang. */
export function getLegalProblemLanguageAlternates(page: LegalProblemPage): LegalProblemLanguageAlternate[] {
  const candidateRegions: Region[] = page.region === "uae" ? ["uae"] : ["sa", "syr"];
  return candidateRegions.flatMap((candidateRegion) => {
    if (!getLegalProblemPage(candidateRegion, page.parentServiceSlug, page.slug)) return [];
    const languageCodes = candidateRegion === "uae"
      ? ({ en: "en-AE", ar: "ar-AE" } as const)
      : candidateRegion === "sa"
        ? ({ en: "en-SA", ar: "ar-SA" } as const)
        : ({ en: "en-SY", ar: "ar-SY" } as const);
    return (["en", "ar"] as const).map((language) => ({
      hrefLang: languageCodes[language],
      href: `https://counselo-legal.com${legalProblemPath(candidateRegion, language, page.parentServiceSlug, page.slug)}`,
    }));
  });
}

export function legalProblemPath(region: Region, lang: Lang, parentServiceSlug: string, slug: string): string {
  return `/${region}${lang === "ar" ? "/ar" : ""}/services/${parentServiceSlug}/${slug}`;
}

export function getLegalProblemPaths(): string[] {
  return LEGAL_PROBLEM_PAGES.flatMap((page) => [
    legalProblemPath(page.region, "en", page.parentServiceSlug, page.slug),
    legalProblemPath(page.region, "ar", page.parentServiceSlug, page.slug),
  ]);
}
