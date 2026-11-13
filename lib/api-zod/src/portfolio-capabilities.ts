type CapabilityCopy = {
  title: string;
  capability: string;
  role: string;
  documents: string;
};

type PortfolioCapability = {
  slug: string;
  en: CapabilityCopy;
  ar: CapabilityCopy;
};

/**
 * Summaries of the published case records, checked against the public detail
 * API and case pages on 2026-11-13. All four linked Arabic PDF attachments
 * returned 200/application/pdf. This describes CounselO's work, not an
 * independent review, success rate, collected sum or promise of an outcome.
 * Source URLs: https://counselo-legal.com/our-work/{slug}
 */
export const portfolioCapabilities: readonly PortfolioCapability[] = [
  {
    slug: "kawnslw-w-tkhfyd-mtalbh-amwlh-tjaryh-mn-348-mlywn-ryal-ila-584-alf-ryal",
    en: {
      title: "Commercial defence",
      capability: "Building a defence from contractual conditions and financial evidence.",
      role: "Analysed commission entitlement and developed the defence with the legal representative.",
      documents: "Undertaking letter, payment certificates and amounts received.",
    },
    ar: {
      title: "الدفاع في مطالبة تجارية",
      capability: "بناء الدفاع على شروط العقد والأدلة المالية.",
      role: "تحليل استحقاق العمولة وبناء الدفاع بالتعاون مع الممثل النظامي.",
      documents: "خطاب التعهد والمستخلصات والمبالغ المستلمة.",
    },
  },
  {
    slug: "msandh-kawnslw-fy-qdyh-aabrh-llhdwd",
    en: {
      title: "Cross-border coordination",
      capability: "Preparing a coherent Saudi–Bahrain commercial claim.",
      role: "Organised the evidence and outstanding balance, then coordinated the claim with local counsel in Bahrain.",
      documents: "Purchase orders, invoices, correspondence and partial payments.",
    },
    ar: {
      title: "التنسيق في نزاع عابر للحدود",
      capability: "إعداد مطالبة تجارية مترابطة بين السعودية والبحرين.",
      role: "تنظيم الأدلة والرصيد المستحق وتنسيق المطالبة مع الممثل النظامي المحلي في البحرين.",
      documents: "أوامر الشراء والفواتير والمراسلات والدفعات الجزئية.",
    },
  },
  {
    slug: "kyf-sahmt-kawnslw-fy-anjah-mlf-thkymy-kaml",
    en: {
      title: "Construction arbitration",
      capability: "Connecting legal, financial and technical evidence in a complex dispute.",
      role: "Organised the claims, supported memorandum drafting and analysed engineering expert reports for the claimant’s representative.",
      documents: "Construction contract, invoices and engineering expert reports.",
    },
    ar: {
      title: "التحكيم في نزاع مقاولات",
      capability: "ربط الأدلة القانونية والمالية والفنية في نزاع معقد.",
      role: "تنظيم المطالبات ودعم صياغة المذكرات وتحليل تقارير الخبرة الهندسية لمساندة ممثل المحتكم.",
      documents: "عقد المقاولة والفواتير وتقارير الخبرة الهندسية.",
    },
  },
  {
    slug: "mnhj-kawnslw-fy-mrajah-alaqwd-altjaryh",
    en: {
      title: "Commercial contract review",
      capability: "Turning contractual risks into drafting and negotiation priorities.",
      role: "Reviewed the transaction, proposed amendments and checked the final signing version.",
      documents: "Draft agreement, commission and liability clauses, definitions and annexes.",
    },
    ar: {
      title: "مراجعة العقود التجارية",
      capability: "تحويل مخاطر العقد إلى أولويات للصياغة والتفاوض.",
      role: "دراسة الصفقة واقتراح التعديلات ومراجعة النسخة النهائية المعدة للتوقيع.",
      documents: "مسودة الاتفاق وبنود العمولة والمسؤولية والتعريفات والملاحق.",
    },
  },
];
