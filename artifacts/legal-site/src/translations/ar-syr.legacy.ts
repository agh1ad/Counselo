/** Retained source for retired detailed templates; intentionally absent from the active site bundle. */
import { ar as activeBase } from "./ar";
import { arLegacyServiceDetails } from "./ar.legacy";
const ar = { ...activeBase, ...arLegacyServiceDetails };

const fixNizam = <T>(obj: T): T => {
  if (typeof obj === 'string') return (obj as string).replace(/نظام/g, "قانون") as unknown as T;
  if (Array.isArray(obj)) return (obj as unknown[]).map(fixNizam) as unknown as T;
  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([k, v]) => [k, fixNizam(v)])
    ) as T;
  }
  return obj;
};


export const arSyrLegacyServiceDetails = {
familyLawDetail: {
    ...ar.familyLawDetail,
    parentTitle: "قانون الأسرة — سوريا",
    breadcrumb: { home: "الرئيسية", services: "الخدمات", parent: "قانون الأسرة — سوريا" },
    experienceBadge: "فريق قانوني متمرس · مشورة وصياغة ومراجعة مستندات · أونلاين",
    services: Object.fromEntries(
      Object.entries(ar.familyLawDetail.services).map(([id, svc]) => [id, fixNizam({
        ...svc,
        seoTitle: svc.seoTitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/في المملكة/g, "في سوريا"),
        subtitle: svc.subtitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/في المملكة/g, "في سوريا"),
        covers: svc.covers.map((c: string) => c.replace(/المملكة العربية السعودية/g, "سوريا").replace(/المحاكم السعودية/g, "المحاكم السورية")),
        overview1: svc.overview1.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/محاكم الأحوال الشخصية السعودية/g, "محاكم الأحوال الشخصية السورية"),
        overview2: svc.overview2 ? svc.overview2.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري"),
          a: faq.a.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/ديوان المظالم/g, "مجلس الدولة السوري"),
        })),
      })])
    ) as typeof ar.familyLawDetail.services,
  },

businessLawDetail: {
    ...ar.businessLawDetail,
    parentTitle: "القانون التجاري — سوريا",
    breadcrumb: { home: "الرئيسية", services: "الخدمات", parent: "القانون التجاري — سوريا" },
    experienceBadge: "فريق قانوني متمرس · مشورة وصياغة ومراجعة مستندات · أونلاين",
    services: Object.fromEntries(
      Object.entries(ar.businessLawDetail.services).map(([id, svc]) => [id, fixNizam({
        ...svc,
        seoTitle: svc.seoTitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/في المملكة/g, "في سوريا"),
        subtitle: svc.subtitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/في المملكة/g, "في سوريا"),
        covers: svc.covers.map((c: string) => c.replace(/المملكة العربية السعودية/g, "سوريا").replace(/SCCA|هيئة التحكيم السعودية/g, "تحكيم غرفة تجارة دمشق")),
        overview1: svc.overview1.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/رؤية 2030/g, "إصلاحات القانون التجاري السوري").replace(/ديوان المظالم/g, "مجلس الدولة").replace(/SCCA|هيئة التحكيم السعودية/g, "تحكيم غرفة تجارة دمشق"),
        overview2: svc.overview2 ? svc.overview2.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري"),
          a: faq.a.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/ديوان المظالم/g, "مجلس الدولة").replace(/رؤية 2030/g, "القانون التجاري السوري"),
        })),
      })])
    ) as typeof ar.businessLawDetail.services,
  },

realEstateLawDetail: {
    ...ar.realEstateLawDetail,
    parentTitle: "قانون الملكية — سوريا",
    breadcrumb: { home: "الرئيسية", services: "الخدمات", parent: "قانون الملكية — سوريا" },
    experienceBadge: "فريق قانوني متمرس · مشورة وصياغة ومراجعة مستندات · أونلاين",
    services: Object.fromEntries(
      Object.entries(ar.realEstateLawDetail.services).map(([id, svc]) => [id, fixNizam({
        ...svc,
        seoTitle: svc.seoTitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/في المملكة/g, "في سوريا"),
        subtitle: svc.subtitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/الهيئة العامة للعقار|REGA/g, "مديرية السجل العقاري"),
        covers: svc.covers.map((c: string) => c.replace(/المملكة العربية السعودية/g, "سوريا").replace(/الهيئة العامة للعقار|REGA/g, "مديرية السجل العقاري")),
        overview1: svc.overview1.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/الهيئة العامة للعقار|REGA/g, "مديرية السجل العقاري"),
        overview2: svc.overview2 ? svc.overview2.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري"),
          a: faq.a.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/الهيئة العامة للعقار/g, "مديرية السجل العقاري"),
        })),
      })])
    ) as typeof ar.realEstateLawDetail.services,
  },

employmentLawDetail: {
    ...ar.employmentLawDetail,
    parentTitle: "قانون العمل — سوريا",
    breadcrumb: { home: "الرئيسية", services: "الخدمات", parent: "قانون العمل — سوريا" },
    experienceBadge: "فريق قانوني متمرس · مشورة وصياغة ومراجعة مستندات · أونلاين",
    services: Object.fromEntries(
      Object.entries(ar.employmentLawDetail.services).map(([id, svc]) => [id, fixNizam({
        ...svc,
        seoTitle: svc.seoTitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/في المملكة/g, "في سوريا"),
        subtitle: svc.subtitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/نظام العمل السعودي/g, "قانون العمل السوري رقم 17/2010"),
        covers: svc.covers.map((c: string) => c.replace(/المملكة العربية السعودية/g, "سوريا").replace(/نظام العمل السعودي|قانون العمل السعودي/g, "قانون العمل السوري رقم 17/2010").replace(/محاكم العمل السعودية/g, "محاكم العمل السورية")),
        overview1: svc.overview1.replace(/المملكة العربية السعودية/g, "سوريا").replace(/نظام العمل السعودي|قانون العمل السعودي/g, "قانون العمل السوري رقم 17/2010").replace(/القانون السعودي/g, "القانون السوري").replace(/محاكم العمل السعودية/g, "محاكم العمل السورية"),
        overview2: svc.overview2 ? svc.overview2.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري"),
          a: faq.a.replace(/المملكة العربية السعودية/g, "سوريا").replace(/نظام العمل السعودي/g, "قانون العمل السوري رقم 17/2010").replace(/القانون السعودي/g, "القانون السوري").replace(/محاكم العمل السعودية/g, "محاكم العمل السورية"),
        })),
      })])
    ) as typeof ar.employmentLawDetail.services,
  },

foreignInvestmentDetail: {
    ...ar.foreignInvestmentDetail,
    parentTitle: "الاستثمار الأجنبي — سوريا",
    breadcrumb: { home: "الرئيسية", services: "الخدمات", parent: "الاستثمار الأجنبي — سوريا" },
    experienceBadge: "فريق قانوني متمرس · مشورة وصياغة ومراجعة مستندات · أونلاين",
    services: Object.fromEntries(
      Object.entries(ar.foreignInvestmentDetail.services).map(([id, svc]) => [id, fixNizam({
        ...svc,
        seoTitle: svc.seoTitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/في المملكة/g, "في سوريا"),
        subtitle: svc.subtitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/رؤية 2030/g, "قانون الاستثمار السوري رقم 18\/2021").replace(/وزارة الاستثمار|MISA/g, "هيئة الاستثمار السورية"),
        covers: svc.covers.map((c: string) => c.replace(/المملكة العربية السعودية/g, "سوريا").replace(/وزارة الاستثمار|MISA/g, "هيئة الاستثمار السورية").replace(/رؤية 2030/g, "قانون الاستثمار السوري").replace(/ديوان المظالم/g, "مجلس الدولة السوري")),
        overview1: svc.overview1.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/رؤية 2030/g, "قانون الاستثمار السوري رقم 18\/2021").replace(/وزارة الاستثمار|MISA/g, "هيئة الاستثمار السورية").replace(/ديوان المظالم/g, "مجلس الدولة السوري"),
        overview2: svc.overview2 ? svc.overview2.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/رؤية 2030/g, "قانون الاستثمار السوري").replace(/MISA/g, "هيئة الاستثمار السورية") : svc.overview2,
        experienceNote: svc.experienceNote ? svc.experienceNote.replace(/المملكة العربية السعودية/g, "سوريا").replace(/MISA/g, "هيئة الاستثمار السورية").replace(/رؤية 2030/g, "قانون الاستثمار السوري") : svc.experienceNote,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/MISA|وزارة الاستثمار/g, "هيئة الاستثمار السورية"),
          a: faq.a.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/MISA|وزارة الاستثمار/g, "هيئة الاستثمار السورية").replace(/رؤية 2030/g, "قانون الاستثمار السوري رقم 18\/2021").replace(/ديوان المظالم/g, "مجلس الدولة السوري"),
        })),
      })])
    ) as typeof ar.foreignInvestmentDetail.services,
  },

administrativeLawDetail: {
    ...ar.administrativeLawDetail,
    parentTitle: "القانون الإداري — سوريا",
    breadcrumb: { home: "الرئيسية", services: "الخدمات", parent: "القانون الإداري — سوريا" },
    experienceBadge: "فريق قانوني متمرس · مشورة وصياغة ومراجعة مستندات · أونلاين",
    subAreas: [
      { id: "board-of-grievances", label: "التقاضي أمام مجلس الدولة السوري" },
      { id: "administrative-appeals", label: "الطعن في القرارات الإدارية" },
      { id: "government-contracts", label: "نزاعات العقود الحكومية" },
      { id: "public-procurement", label: "نزاعات المشتريات الحكومية" },
      { id: "regulatory-licensing", label: "النزاعات التنظيمية والترخيص" },
      { id: "customs-tax-disputes", label: "نزاعات الجمارك وهيئة الضرائب" },
      { id: "disciplinary-proceedings", label: "الإجراءات التأديبية المهنية" },
      { id: "government-compensation", label: "مطالبات التعويض ضد الحكومة" },
    ],
    services: Object.fromEntries(
      Object.entries(ar.administrativeLawDetail.services).map(([id, svc]) => [id, fixNizam({
        ...svc,
        seoTitle: svc.seoTitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/في المملكة/g, "في سوريا").replace(/ديوان المظالم/g, "مجلس الدولة السوري"),
        subtitle: svc.subtitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/ديوان المظالم/g, "مجلس الدولة السوري"),
        covers: svc.covers.map((c: string) => c.replace(/المملكة العربية السعودية/g, "سوريا").replace(/ديوان المظالم/g, "مجلس الدولة السوري").replace(/ZATCA|هيئة الزكاة/g, "هيئة الضرائب والرسوم")),
        overview1: svc.overview1.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/ديوان المظالم/g, "مجلس الدولة السوري"),
        overview2: svc.overview2 ? svc.overview2.replace(/المملكة العربية السعودية/g, "سوريا").replace(/ديوان المظالم/g, "مجلس الدولة السوري") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/ديوان المظالم/g, "مجلس الدولة السوري"),
          a: faq.a.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/ديوان المظالم/g, "مجلس الدولة السوري"),
        })),
      })])
    ) as typeof ar.administrativeLawDetail.services,
  },

arbitrationDetail: {
    ...ar.arbitrationDetail,
    parentTitle: "التحكيم والوساطة — سوريا",
    breadcrumb: { home: "الرئيسية", services: "الخدمات", parent: "التحكيم والوساطة — سوريا" },
    experienceBadge: "فريق قانوني متمرس · مشورة وصياغة ومراجعة مستندات · أونلاين",
    services: Object.fromEntries(
      Object.entries(ar.arbitrationDetail.services).map(([id, svc]) => [id, fixNizam({
        ...svc,
        seoTitle: svc.seoTitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/في المملكة/g, "في سوريا").replace(/SCCA/g, "غرفة تجارة دمشق"),
        subtitle: svc.subtitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/SCCA|المركز السعودي للتحكيم/g, "مركز تحكيم غرفة تجارة دمشق"),
        covers: svc.covers.map((c: string) => c.replace(/المملكة العربية السعودية/g, "سوريا").replace(/SCCA|المركز السعودي للتحكيم التجاري/g, "مركز تحكيم غرفة تجارة دمشق")),
        overview1: svc.overview1.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/SCCA|المركز السعودي للتحكيم التجاري/g, "مركز تحكيم غرفة تجارة دمشق").replace(/رؤية 2030/g, "قانون التحكيم السوري رقم 4\/2008"),
        overview2: svc.overview2 ? svc.overview2.replace(/المملكة العربية السعودية/g, "سوريا").replace(/SCCA/g, "مركز تحكيم غرفة تجارة دمشق") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/SCCA/g, "تحكيم غرفة تجارة دمشق"),
          a: faq.a.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/SCCA|المركز السعودي للتحكيم التجاري/g, "مركز تحكيم غرفة تجارة دمشق"),
        })),
      })])
    ) as typeof ar.arbitrationDetail.services,
  },

enforcementDetail: {
    ...ar.enforcementDetail,
    parentTitle: "التنفيذ وتحصيل الديون — سوريا",
    breadcrumb: { home: "الرئيسية", services: "الخدمات", parent: "التنفيذ وتحصيل الديون — سوريا" },
    experienceBadge: "فريق قانوني متمرس · مشورة وصياغة ومراجعة مستندات · أونلاين",
    services: Object.fromEntries(
      Object.entries(ar.enforcementDetail.services).map(([id, svc]) => [id, fixNizam({
        ...svc,
        seoTitle: svc.seoTitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/في المملكة/g, "في سوريا").replace(/السعودية/g, "السورية"),
        subtitle: svc.subtitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري"),
        covers: svc.covers.map((c: string) => c.replace(/المملكة العربية السعودية/g, "سوريا").replace(/الحكومة السعودية/g, "الحكومة السورية")),
        overview1: svc.overview1.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/نظام التنفيذ \(المرسوم الملكي م\/53\)/g, "قانون الإجراءات المدنية السوري"),
        overview2: svc.overview2 ? svc.overview2.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري"),
          a: faq.a.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري"),
        })),
      })])
    ) as typeof ar.enforcementDetail.services,
  },

companiesLawDetail: {
    ...ar.companiesLawDetail,
    parentTitle: "قانون الشركات — سوريا",
    breadcrumb: { home: "الرئيسية", services: "الخدمات", parent: "قانون الشركات — سوريا" },
    experienceBadge: "فريق قانوني متمرس · مشورة وصياغة ومراجعة مستندات · أونلاين",
    services: Object.fromEntries(
      Object.entries(ar.companiesLawDetail.services).map(([id, svc]) => [id, fixNizam({
        ...svc,
        seoTitle: svc.seoTitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/في المملكة/g, "في سوريا"),
        subtitle: svc.subtitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/نظام الشركات السعودي/g, "قانون الشركات السوري رقم 29\/2011"),
        covers: svc.covers.map((c: string) => c.replace(/المملكة العربية السعودية/g, "سوريا").replace(/نظام الشركات السعودي/g, "قانون الشركات السوري رقم 29\/2011").replace(/SCCA/g, "تحكيم غرفة تجارة دمشق")),
        overview1: svc.overview1.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/نظام الشركات السعودي/g, "قانون الشركات السوري رقم 29\/2011").replace(/SCCA/g, "تحكيم غرفة تجارة دمشق"),
        overview2: svc.overview2 ? svc.overview2.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري"),
          a: faq.a.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/نظام الشركات السعودي/g, "قانون الشركات السوري رقم 29\/2011"),
        })),
      })])
    ) as typeof ar.companiesLawDetail.services,
  },

contractsDetail: {
    ...ar.contractsDetail,
    parentTitle: "العقود — سوريا",
    breadcrumb: { home: "الرئيسية", services: "الخدمات", parent: "العقود — سوريا" },
    experienceBadge: "فريق قانوني متمرس · مشورة وصياغة ومراجعة مستندات · أونلاين",
    services: Object.fromEntries(
      Object.entries(ar.contractsDetail.services).map(([id, svc]) => [id, fixNizam({
        ...svc,
        seoTitle: svc.seoTitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/في المملكة/g, "في سوريا"),
        subtitle: svc.subtitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/نظام المعاملات المدنية/g, "القانون المدني السوري رقم 84\/1949"),
        covers: svc.covers.map((c: string) => c.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/نظام المعاملات المدنية/g, "القانون المدني السوري رقم 84\/1949")),
        overview1: svc.overview1.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون المدني السوري").replace(/نظام المعاملات المدنية/g, "القانون المدني السوري رقم 84\/1949"),
        overview2: svc.overview2 ? svc.overview2.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري"),
          a: faq.a.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون المدني السوري").replace(/نظام المعاملات المدنية/g, "القانون المدني السوري رقم 84\/1949"),
        })),
      })])
    ) as typeof ar.contractsDetail.services,
  },

criminalLawDetail: {
    ...ar.criminalLawDetail,
    parentTitle: "القانون الجنائي — سوريا",
    breadcrumb: { home: "الرئيسية", services: "الخدمات", parent: "القانون الجنائي — سوريا" },
    experienceBadge: "فريق قانوني متمرس · مشورة وصياغة ومراجعة مستندات · أونلاين",
    services: Object.fromEntries(
      Object.entries(ar.criminalLawDetail.services).map(([id, svc]) => [id, fixNizam({
        ...svc,
        seoTitle: svc.seoTitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/في المملكة/g, "في سوريا"),
        subtitle: svc.subtitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/المحكمة العليا/g, "محكمة النقض السورية"),
        covers: svc.covers.map((c: string) => c.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/المحكمة العليا/g, "محكمة النقض السورية")),
        overview1: svc.overview1.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/نظام الإجراءات الجزائية/g, "قانون أصول المحاكمات الجزائية السوري").replace(/المحكمة العليا/g, "محكمة النقض السورية"),
        overview2: svc.overview2 ? svc.overview2.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري"),
          a: faq.a.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/المحكمة العليا/g, "محكمة النقض السورية"),
        })),
      })])
    ) as typeof ar.criminalLawDetail.services,
  },

bankingFinanceDetail: {
    ...ar.bankingFinanceDetail,
    parentTitle: "قانون المصارف والتمويل — سوريا",
    breadcrumb: { home: "الرئيسية", services: "الخدمات", parent: "قانون المصارف والتمويل — سوريا" },
    experienceBadge: "فريق قانوني متمرس · مشورة وصياغة ومراجعة مستندات · أونلاين",
    sidebar: {
      heading: "هل تحتاج إلى محامٍ في قانون المصارف والتمويل؟",
      desc: "احصل على استشارة قانونية متخصصة في قانون المصارف والتمويل السوري — أنظمة مصرف سوريا المركزي ونزاعات المصارف والتمويل الإسلامي وفق القانون السوري. استشارة إلكترونية متاحة.",
      ctaBtn: "ابدأ استشارة",
      whatsapp: "واتساب",
      email: "بريد إلكتروني",
      callLabel: "اتصل بنا",
      phone: "+963 11 XXX XXXX",
    },
    services: Object.fromEntries(
      Object.entries(ar.bankingFinanceDetail.services).map(([id, svc]) => [id, fixNizam({
        ...svc,
        seoTitle: svc.seoTitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/في المملكة/g, "في سوريا").replace(/ساما|SAMA/g, "مصرف سوريا المركزي"),
        subtitle: svc.subtitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/ساما|SAMA/g, "مصرف سوريا المركزي"),
        covers: svc.covers.map((c: string) => c.replace(/المملكة العربية السعودية/g, "سوريا").replace(/مؤسسة النقد|ساما|SAMA/g, "مصرف سوريا المركزي").replace(/هيئة السوق المالية|CMA/g, "وزارة الاقتصاد")),
        overview1: svc.overview1.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/مؤسسة النقد العربي السعودي|ساما|SAMA/g, "مصرف سوريا المركزي").replace(/هيئة السوق المالية|CMA/g, "هيئة الإشراف على التأمين"),
        overview2: svc.overview2 ? svc.overview2.replace(/المملكة العربية السعودية/g, "سوريا").replace(/ساما|SAMA/g, "مصرف سوريا المركزي") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/ساما|SAMA/g, "مصرف سوريا المركزي"),
          a: faq.a.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/ساما|SAMA|مؤسسة النقد/g, "مصرف سوريا المركزي"),
        })),
      })])
    ) as typeof ar.bankingFinanceDetail.services,
  },

intellectualPropertyDetail: {
    ...ar.intellectualPropertyDetail,
    parentTitle: "الملكية الفكرية — سوريا",
    breadcrumb: { home: "الرئيسية", services: "الخدمات", parent: "الملكية الفكرية — سوريا" },
    experienceBadge: "فريق قانوني متمرس · مشورة وصياغة ومراجعة مستندات · أونلاين",
    sidebar: {
      heading: "هل تحتاج إلى محامٍ ملكية فكرية في سوريا؟",
      desc: "احصل على استشارة قانونية متخصصة في الملكية الفكرية — تسجيل العلامات التجارية وبراءات الاختراع وحقوق التأليف والنزاعات وفق القانون السوري. استجابة خلال 24 ساعة.",
      ctaBtn: "ابدأ استشارة",
      whatsapp: "واتساب",
      email: "بريد إلكتروني",
      callLabel: "اتصل بنا",
      phone: "+963 11 XXX XXXX",
    },
    services: Object.fromEntries(
      Object.entries(ar.intellectualPropertyDetail.services).map(([id, svc]) => [id, fixNizam({
        ...svc,
        seoTitle: svc.seoTitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/في المملكة/g, "في سوريا").replace(/الهيئة السعودية للملكية الفكرية|SAIP/g, "وزارة الاقتصاد السورية"),
        subtitle: svc.subtitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/الهيئة السعودية للملكية الفكرية|SAIP/g, "وزارة الاقتصاد (قسم الملكية الفكرية)"),
        covers: svc.covers.map((c: string) => c.replace(/المملكة العربية السعودية/g, "سوريا").replace(/الهيئة السعودية للملكية الفكرية|SAIP/g, "وزارة الاقتصاد (قسم الملكية الفكرية)").replace(/رؤية 2030/g, "إصلاحات الملكية الفكرية السورية")),
        overview1: svc.overview1.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/الهيئة السعودية للملكية الفكرية|SAIP/g, "وزارة الاقتصاد والتجارة الخارجية (قسم الملكية الفكرية)").replace(/رؤية 2030/g, "إصلاحات الملكية الفكرية السورية"),
        overview2: svc.overview2 ? svc.overview2.replace(/المملكة العربية السعودية/g, "سوريا").replace(/SAIP/g, "وزارة الاقتصاد السورية") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/SAIP/g, "السلطة السورية للملكية الفكرية"),
          a: faq.a.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/الهيئة السعودية للملكية الفكرية|SAIP/g, "وزارة الاقتصاد والتجارة الخارجية (قسم الملكية الفكرية)"),
        })),
      })])
    ) as typeof ar.intellectualPropertyDetail.services,
  },

taxZakatDetail: {
    ...ar.taxZakatDetail,
    parentTitle: "قانون الضرائب — سوريا",
    breadcrumb: { home: "الرئيسية", services: "الخدمات", parent: "قانون الضرائب — سوريا" },
    experienceBadge: "فريق قانوني متمرس · مشورة وصياغة ومراجعة مستندات · أونلاين",
    notFoundLink: "العودة إلى قانون الضرائب",
    relatedHeading: "خدمات ضريبية أخرى",
    sidebar: {
      heading: "هل تحتاج إلى محامٍ ضريبي في سوريا؟",
      desc: "احصل على استشارة قانونية متخصصة في الضرائب السورية — نزاعات ضريبة الدخل والطعون أمام هيئة الضرائب والرسوم والاستشارات الضريبية. استشارة إلكترونية متاحة.",
      ctaBtn: "ابدأ استشارة",
      whatsapp: "واتساب",
      email: "بريد إلكتروني",
      callLabel: "اتصل بنا",
      phone: "+963 11 XXX XXXX",
    },
    subAreas: [
      { id: "vat-compliance", label: "ضريبة القيمة المضافة وضريبة الدخل" },
      { id: "zatca-appeals", label: "الطعون أمام هيئة الضرائب" },
      { id: "corporate-tax", label: "ضريبة الدخل على الشركات" },
      { id: "transfer-pricing", label: "تسعير التحويل" },
      { id: "customs-disputes", label: "نزاعات الرسوم الجمركية" },
      { id: "tax-advisory", label: "الاستشارات والهيكلة الضريبية" },
      { id: "excise-tax", label: "الامتثال الضريبي" },
    ],
    services: Object.fromEntries(
      Object.entries(ar.taxZakatDetail.services).filter(([id]) => id !== 'zakat-disputes').map(([id, svc]) => [id, fixNizam({
        ...svc,
        seoTitle: svc.seoTitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/في المملكة/g, "في سوريا").replace(/هيئة الزكاة والضريبة والجمارك|ZATCA/g, "هيئة الضرائب والرسوم").replace(/الزكاة/g, "ضريبة الدخل"),
        subtitle: svc.subtitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/هيئة الزكاة والضريبة والجمارك|ZATCA/g, "هيئة الضرائب والرسوم").replace(/الزكاة/g, "ضريبة الدخل"),
        covers: svc.covers.map((c: string) => c.replace(/المملكة العربية السعودية/g, "سوريا").replace(/هيئة الزكاة والضريبة والجمارك|ZATCA|هيئة الزكاة/g, "هيئة الضرائب والرسوم").replace(/الزكاة/g, "ضريبة الدخل")),
        overview1: svc.overview1.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/هيئة الزكاة والضريبة والجمارك|ZATCA/g, "هيئة الضرائب والرسوم السورية").replace(/الزكاة/g, "ضريبة الدخل"),
        overview2: svc.overview2 ? svc.overview2.replace(/المملكة العربية السعودية/g, "سوريا").replace(/ZATCA|هيئة الزكاة/g, "هيئة الضرائب والرسوم") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/ZATCA|هيئة الزكاة/g, "هيئة الضرائب والرسوم"),
          a: faq.a.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/ZATCA|هيئة الزكاة والضريبة والجمارك/g, "هيئة الضرائب والرسوم السورية").replace(/الزكاة/g, "ضريبة الدخل"),
        })),
      })])
    ) as typeof ar.taxZakatDetail.services,
  },

cyberLawDetail: {
    ...ar.cyberLawDetail,
    parentTitle: "القانون الإلكتروني — سوريا",
    breadcrumb: { home: "الرئيسية", services: "الخدمات", parent: "القانون الإلكتروني — سوريا" },
    experienceBadge: "فريق قانوني متمرس · مشورة وصياغة ومراجعة مستندات · أونلاين",
    sidebar: {
      heading: "هل تحتاج إلى محامٍ جرائم إلكترونية؟",
      desc: "احصل على استشارة عاجلة في قانون الجرائم المعلوماتية في سوريا — عبر واتساب أو البريد الإلكتروني وفق قانون الجرائم المعلوماتية السوري (القانون 20 لعام 2022 وتعديلاته الواجبة التطبيق). استجابة سرية وسريعة.",
      ctaBtn: "ابدأ استشارة",
      whatsapp: "واتساب",
      email: "بريد إلكتروني",
      callLabel: "اتصل بنا",
      phone: "+963 11 XXX XXXX",
    },
    services: Object.fromEntries(
      Object.entries(ar.cyberLawDetail.services).map(([id, svc]) => [id, fixNizam({
        ...svc,
        seoTitle: svc.seoTitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/في المملكة/g, "في سوريا"),
        subtitle: svc.subtitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/نظام مكافحة الجرائم المعلوماتية/g, "قانون الجرائم المعلوماتية السوري (المرسوم رقم 17\/2012)"),
        covers: svc.covers.map((c: string) => c.replace(/المملكة العربية السعودية/g, "سوريا").replace(/نظام مكافحة الجرائم المعلوماتية/g, "قانون الجرائم المعلوماتية السوري").replace(/نظام حماية البيانات الشخصية|PDPL/g, "قانون حماية البيانات السوري")),
        overview1: svc.overview1.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/نظام مكافحة الجرائم المعلوماتية السعودي/g, "قانون الجرائم المعلوماتية السوري (المرسوم رقم 17\/2012)").replace(/نظام حماية البيانات الشخصية|PDPL/g, "قانون حماية البيانات السوري"),
        overview2: svc.overview2 ? svc.overview2.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري"),
          a: faq.a.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/نظام مكافحة الجرائم المعلوماتية/g, "قانون الجرائم المعلوماتية السوري (المرسوم رقم 17\/2012)"),
        })),
      })])
    ) as typeof ar.cyberLawDetail.services,
  },

medicalMalpracticeDetail: {
    ...ar.medicalMalpracticeDetail,
    breadcrumb: { home: "الرئيسية", services: "الخدمات", parent: "المسؤولية الطبية — سوريا" },
    experienceBadge: "فريق قانوني متمرس · مشورة وصياغة ومراجعة مستندات · أونلاين",
    sidebar: {
      heading: "هل تحتاج إلى محامٍ مسؤولية طبية؟",
      desc: "احصل على استشارة قانونية متخصصة في المسؤولية الطبية وقانون الصحة في سوريا — عبر واتساب أو البريد الإلكتروني. استشارة سرية وفق أنظمة نقابة الأطباء السورية. استجابة خلال 24 ساعة.",
      ctaBtn: "ابدأ استشارة",
      whatsapp: "واتساب",
      email: "بريد إلكتروني",
      callLabel: "اتصل بنا",
      phone: "+963 11 XXX XXXX",
    },
    services: Object.fromEntries(
      Object.entries(ar.medicalMalpracticeDetail.services).map(([id, svc]) => [id, fixNizam({
        ...svc,
        seoTitle: svc.seoTitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/في المملكة/g, "في سوريا"),
        subtitle: svc.subtitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري"),
        covers: svc.covers.map((c: string) => c.replace(/المملكة العربية السعودية/g, "سوريا").replace(/ديوان المظالم/g, "المحاكم المدنية السورية").replace(/وزارة الصحة السعودية|MOH/g, "وزارة الصحة السورية")),
        overview1: svc.overview1.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/ديوان المظالم/g, "المحاكم المدنية السورية").replace(/وزارة الصحة السعودية|MOH/g, "وزارة الصحة السورية"),
        overview2: svc.overview2 ? svc.overview2.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري"),
          a: faq.a.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/ديوان المظالم/g, "المحاكم المدنية السورية"),
        })),
      })])
    ) as typeof ar.medicalMalpracticeDetail.services,
  },

insuranceLawDetail: {
    ...ar.insuranceLawDetail,
    breadcrumb: { home: "الرئيسية", services: "الخدمات", parent: "قانون التأمين — سوريا" },
    experienceBadge: "فريق قانوني متمرس · مشورة وصياغة ومراجعة مستندات · أونلاين",
    sidebar: {
      heading: "هل تحتاج إلى محامٍ نزاعات تأمين؟",
      desc: "احصل على استشارة قانونية متخصصة في نزاعات التأمين في سوريا وفق قانون التأمين رقم 68/2001 — عبر واتساب أو البريد الإلكتروني. استجابة خلال 24 ساعة.",
      ctaBtn: "ابدأ استشارة",
      whatsapp: "واتساب",
      email: "بريد إلكتروني",
      callLabel: "اتصل بنا",
      phone: "+963 11 XXX XXXX",
    },
    services: Object.fromEntries(
      Object.entries(ar.insuranceLawDetail.services).map(([id, svc]) => [id, fixNizam({
        ...svc,
        seoTitle: svc.seoTitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/في المملكة/g, "في سوريا").replace(/ساما|SAMA/g, "هيئة الإشراف على التأمين"),
        subtitle: svc.subtitle.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/ساما|SAMA/g, "هيئة الإشراف على التأمين"),
        covers: svc.covers.map((c: string) => c.replace(/المملكة العربية السعودية/g, "سوريا").replace(/مؤسسة النقد|ساما|SAMA/g, "هيئة الإشراف على التأمين")),
        overview1: svc.overview1.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/مؤسسة النقد العربي السعودي|ساما|SAMA/g, "هيئة الإشراف على التأمين").replace(/نظام التأمين \(المرسوم الملكي م\/32\)/g, "قانون التأمين السوري رقم 68\/2001"),
        overview2: svc.overview2 ? svc.overview2.replace(/المملكة العربية السعودية/g, "سوريا").replace(/ساما|SAMA/g, "هيئة الإشراف على التأمين") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/ساما|SAMA/g, "هيئة الإشراف على التأمين"),
          a: faq.a.replace(/المملكة العربية السعودية/g, "سوريا").replace(/القانون السعودي/g, "القانون السوري").replace(/ساما|SAMA|مؤسسة النقد/g, "هيئة الإشراف على التأمين").replace(/نظام التأمين/g, "قانون التأمين السوري رقم 68\/2001"),
        })),
      })])
    ) as typeof ar.insuranceLawDetail.services,
  }
};
