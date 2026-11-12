import { SAUDI_EXPANDED_SERVICE_BRIEFS } from "./saudi-service-briefs-expanded";
import { SAUDI_WORKSHEETS_UPDATED_AT } from "./saudi-review-worksheets";

export type Brief = {
  intro: string;
  overview: [string, string, string];
  choices: { path: string; label: string }[];
};

export const SAUDI_SERVICE_BRIEFS_UPDATED_AT = "2026-10-20";

// Service-selection and illustrative document-review copy, not case results,
// legal rules, a pricing commitment or an expansion of the engagement scope.
const briefs: Record<string, { ar: Brief; en: Brief }> = {
  ...SAUDI_EXPANDED_SERVICE_BRIEFS,
  contracts: {
    ar: {
      intro: "خدمة لصياغة العقود أو مراجعتها وتعديلها، وتقييم الخلافات على تنفيذها. نوضح الالتزامات والمخاطر ونقدم الصياغة أو الملاحظات المكتوبة وفق طلبك ونطاق الاتفاق.",
      overview: [
        "أرسل المسودة والملاحق وهدفك وموعد التوقيع، مع نوع العقد وحجمه ولغته.",
        "نحدد البنود المؤثرة والمخاطر والأسئلة أو التعديلات المقترحة في ملاحظات مكتوبة.",
        "نؤكد المخرج والرسوم والمسؤول وموعد التسليم. الصياغة البديلة والتفاوض والمتابعة تُحدد في التكليف.",
      ],
      choices: [
        { path: "contracts/contract-drafting-and-review", label: "لدي مسودة أريد مراجعتها أو عقد أريد صياغته" },
        { path: "contracts/breach-of-contract", label: "العقد قائم وحدث إخلال أو خلاف على تنفيذه" },
      ],
    },
    en: {
      intro: "Contract drafting, review and amendment, plus advice on disputes over performance. We explain obligations and risks, and provide a draft or written comments to match your request and agreed scope.",
      overview: [
        "Send the draft, schedules, objective and signing date, with the contract type, length and language.",
        "Receive written observations on material clauses, risks, questions and proposed changes.",
        "We confirm output, fee, professional and delivery time. Alternative drafting, negotiation and follow-up are separately scoped.",
      ],
      choices: [
        { path: "contracts/contract-drafting-and-review", label: "I need a draft reviewed or a new contract prepared" },
        { path: "contracts/breach-of-contract", label: "An existing contract has been breached or disputed" },
      ],
    },
  },
  "employment-law": {
    ar: {
      intro: "نراجع الأجور وإنهاء العمل والتسويات والمستحقات للعامل أو صاحب العمل استناداً إلى العقد والسجلات.",
      overview: [
        "اذكر صفتك ومكان العمل وهل العلاقة مستمرة أم انتهت. أرسل العقد وكشوف الأجر والإشعارات.",
        "نراجع المطلوب والمبالغ المسددة والمتنازع عليها وأي تسوية أو مخالصة.",
        "نتفق على المخرج والرسوم والموعد. إعداد الطلبات والتمثيل يحتاجان إلى اتفاق مستقل.",
      ],
      choices: [
        { path: "employment-law/delayed-or-unpaid-salary", label: "العلاقة مستمرة ولدي راتب متأخر أو غير مدفوع" },
        { path: "employment-law/employment-settlement-and-final-dues-calculation", label: "انتهى العمل وأحتاج إلى مراجعة التسوية والمستحقات" },
      ],
    },
    en: {
      intro: "Review wages, termination, settlements and final dues for workers or employers using the contract and employment records.",
      overview: [
        "State your role, work location and whether employment has ended. Send the contract, pay records and notices.",
        "We review your request, paid and disputed amounts, and any settlement or release.",
        "We agree output, fee and timing first. Filing preparation and representation require separate agreement.",
      ],
      choices: [
        { path: "employment-law/delayed-or-unpaid-salary", label: "I am still employed and salary is overdue or unpaid" },
        { path: "employment-law/employment-settlement-and-final-dues-calculation", label: "Employment has ended and I need a settlement or final-dues review" },
      ],
    },
  },
  "business-law": {
    ar: {
      intro: "نراجع المطالبات التجارية والفواتير غير المسددة وخلافات التوريد لتحديد الأدلة والخيارات المتاحة.",
      overview: [
        "أرسل العقد والفواتير وإثبات التسليم والاعتراضات، مع المبلغ والعملة.",
        "نقيّم مستندات المطالبة وما ينقصها قبل اختيار الخطوة التالية.",
        "إذا صدر حكم أو سند، راجع خدمة التنفيذ. الصياغة والتفاوض والتمثيل تُحدد في التكليف.",
      ],
      choices: [
        { path: "business-law/unpaid-business-invoices", label: "لدي فواتير تجارية متنازع عليها أو غير مسددة" },
        { path: "enforcement", label: "لدي حكم أو سند وأحتاج إلى مراجعة مرحلة التنفيذ" },
      ],
    },
    en: {
      intro: "Review business claims, unpaid invoices and supply disputes to identify supporting evidence and available options.",
      overview: [
        "Send the contract, invoices, delivery evidence and objections, with the amount and currency.",
        "We assess the claim documents and gaps before identifying next steps.",
        "For an existing judgment or instrument, use enforcement review. Drafting, negotiation and representation are separately scoped.",
      ],
      choices: [
        { path: "business-law/unpaid-business-invoices", label: "I have disputed or unpaid business invoices" },
        { path: "enforcement", label: "I have a judgment or instrument and need an enforcement-stage review" },
      ],
    },
  },
  enforcement: {
    ar: {
      intro: "نراجع الحكم أو السند وإشعارات التنفيذ، سواء كنت طالب التنفيذ أو المنفذ ضده.",
      overview: [
        "أرسل السند كاملاً وآخر إشعار أو قرار، مع المرحلة والمواعيد والمبالغ المسددة.",
        "نراجع الطلب والاعتراض والمستندات الناقصة؛ وجود سند لا يحسم استيفاء شروط التنفيذ.",
        "الإيداع والمتابعة يحتاجان إلى تكليف مستقل. نؤكد الرسوم والمسؤول عن العمل دون ضمان التحصيل.",
      ],
      choices: [
        { path: "enforcement/unpaid-invoices-and-payment-claims", label: "أحتاج إلى تقييم مستند المطالبة ومرحلتها" },
        { path: "business-law/unpaid-business-invoices", label: "الخلاف التجاري على الفاتورة أو التسليم ما زال قائماً" },
      ],
    },
    en: {
      intro: "Review a judgment, instrument or enforcement notice, whether you are seeking enforcement or responding to it.",
      overview: [
        "Send the complete instrument and latest notice or decision, with the stage, dates and payments.",
        "We review the application, objections and missing records; possession alone does not establish enforceability.",
        "Filing and follow-up require separate engagement. We confirm fees and responsibility without guaranteeing recovery.",
      ],
      choices: [
        { path: "enforcement/unpaid-invoices-and-payment-claims", label: "I need the claim document and current stage assessed" },
        { path: "business-law/unpaid-business-invoices", label: "The commercial dispute over the invoice or delivery is still unresolved" },
      ],
    },
  },
};

export function saudiServiceBrief(region: string, service: string, language: "ar" | "en") {
  return region === "sa" ? briefs[service]?.[language] : undefined;
}

export function saudiServiceBriefModifiedAt(service: string) {
  return Object.hasOwn(briefs, service) ? SAUDI_WORKSHEETS_UPDATED_AT : SAUDI_SERVICE_BRIEFS_UPDATED_AT;
}
