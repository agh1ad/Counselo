import type { MatterSourceGuidance } from "./matter-source-guidance.js";

// Specific source findings only. Remaining substantive and procedural intents stay open.
export const SYRIA_FAMILY_PROPERTY_SEARCH_GUIDANCE: MatterSourceGuidance[] = [
  {
    region: "syr", service: "family-law", id: "syr-civil-record-correction-venue", reviewedAt: "2026-09-07", includeOnServicePage: true,
    problems: ["family-status-document-or-civil-record-correction", "inheritance-document-and-civil-record-correction", "marriage-registration-and-family-status-certificate-problem"],
    en: { q: "Must a Syrian civil-record correction claim be filed where the original record is held?", a: "The Justice Ministry's 22 February 2026 circular permits civil-status correction claims before any civil magistrates court, inside or outside the original registration district. Identify the exact civil entry and supporting documents. This concerns correction proceedings; it does not move every marriage, parentage or inheritance dispute to that court. Confirm the claim's classification and the applicable instructions before filing." },
    ar: { q: "هل يجب رفع دعوى تصحيح القيد المدني السوري في منطقة القيد الأصلي؟", a: "أجاز تعميم وزارة العدل في 22 شباط 2026 رفع دعاوى تصحيح قيود الأحوال المدنية أمام أي محكمة صلح مدنية، داخل منطقة القيد أو خارجها. حدّد القيد المدني المطلوب تصحيحه ومستنداته. يتعلق ذلك بدعاوى التصحيح، ولا ينقل كل نزاع زواج أو نسب أو إرث إلى محكمة الصلح؛ فتحقق من تكييف الطلب والتعليمات المنطبقة قبل القيد." },
    sources: [{ en: "SANA — Justice Ministry civil-record correction circular, 22 February 2026", ar: "سانا — تعميم وزارة العدل لتصحيح القيود، 22 شباط 2026", href: "https://sana.sy/locals/2410039/" }],
  },
  {
    region: "syr", service: "family-law", id: "syr-missing-person-estate", reviewedAt: "2026-09-07",
    problems: ["inheritance-and-family-settlements", "will-validity-and-estate-distribution"],
    en: { q: "Can a missing person's Syrian property immediately be divided as an inheritance?", a: "Disappearance alone does not establish an estate ready for distribution. The UN missing-persons institution distinguishes managing the person's affairs through judicial representation from inheritance following legally established death. Check existing status decisions before seeking heir identification or distributing assets." },
    ar: { q: "هل تُقسم أموال المفقود في سوريا فوراً باعتبارها تركة؟", a: "الفقدان وحده لا يثبت وجود تركة جاهزة للقسمة. تميّز مؤسسة الأمم المتحدة المعنية بالمفقودين بين إدارة شؤون المفقود بالوكالة القضائية والإرث بعد ثبوت الوفاة قانوناً. تحقق من القرارات المتعلقة بحالته قبل طلب حصر الإرث أو توزيع الأموال." },
    sources: [{ en: "UN IIMP — legal questions concerning missing persons in Syria", ar: "مؤسسة الأمم المتحدة المعنية بالمفقودين — أسئلة قانونية حول مفقودي سوريا", href: "https://iimp.un.org/ar/node/693" }],
  },
  {
    region: "syr", service: "family-law", id: "syr-missing-spouse-marriage", reviewedAt: "2026-09-07",
    problems: ["divorce-and-separation", "marriage-and-personal-status-disputes"],
    en: { q: "Does a spouse's disappearance automatically end a Syrian marriage?", a: "No. The UN missing-persons institution explains that the marriage continues unless death is established or a qualifying separation occurs. Grounds, periods and the competent religious court vary with the applicable personal-status regime. Establish that regime and existing decisions before treating the marriage as ended." },
    ar: { q: "هل ينتهي الزواج السوري تلقائياً بفقدان أحد الزوجين؟", a: "لا. توضح مؤسسة الأمم المتحدة المعنية بالمفقودين استمرار الزواج ما لم تثبت الوفاة أو يقع تفريق مستوفٍ لشروطه. تختلف الأسباب والمدد والمحكمة الدينية المختصة بحسب نظام الأحوال الشخصية المنطبق. حدّد هذا النظام والقرارات القائمة قبل اعتبار الزواج منتهياً." },
    sources: [{ en: "UN IIMP — missing spouses and personal-status consequences", ar: "مؤسسة الأمم المتحدة المعنية بالمفقودين — فقدان الزوج وآثار الأحوال الشخصية", href: "https://iimp.un.org/ar/node/693" }],
  },
  {
    region: "syr", service: "real-estate", id: "syr-electronic-property-extract", reviewedAt: "2026-09-07", includeOnServicePage: true,
    problems: ["registration-and-title-problems", "title-deed-and-registration-dispute", "property-ownership-disputes", "sale-and-purchase-contract-disputes"],
    en: { q: "Can I request a Syrian property-register extract electronically?", a: "The March 2026 launch provides a property-extract request through Moamalati or Anjez: choose the land-registry provider and extract service, enter the property and applicant details, then select delivery and payment options. The announcement initially covered Damascus, Daraa, Quneitra and Latakia. Check current coverage for your parcel. Obtaining an extract does not itself transfer title or decide an ownership dispute." },
    ar: { q: "هل يمكن طلب بيان قيد عقاري سوري إلكترونياً؟", a: "أُطلقت في آذار 2026 خدمة طلب البيان عبر «معاملاتي» أو «أنجز»: اختر مزود المصالح العقارية وخدمة بيان القيد، وأدخل بيانات العقار وصاحب العلاقة وحدد التسليم والدفع. شمل الإعلان أولياً دمشق ودرعا والقنيطرة واللاذقية؛ فتحقق من التغطية الحالية لعقارك. إصدار البيان لا ينقل الملكية ولا يفصل في نزاع عليها." },
    sources: [{ en: "SANA — Land Registry Directorate's electronic-extract launch", ar: "سانا — إطلاق المصالح العقارية لخدمة بيان القيد الإلكتروني", href: "https://sana.sy/governorates/2433432/" }],
  },
  {
    region: "syr", service: "real-estate", id: "syr-zamalka-record-reconstruction", reviewedAt: "2026-09-07",
    problems: ["land-registry-and-title-record-correction", "registration-and-title-problems", "title-deed-and-registration-dispute"],
    en: { q: "Is a damaged Zamalka property record handled as an ordinary typing correction?", a: "The June 2026 official explanation distinguishes administrative reconstruction of damaged records from files requiring judicial reconstruction. Owners need to inspect the relevant reconstruction decision and the applicable objection or appeal process. Identify your parcel and the published decision first; do not calculate a deadline from the news report's date or assume every damaged Syrian register follows this local project." },
    ar: { q: "هل يُعالج تلف صحيفة عقار في زملكا كتصحيح خطأ كتابي عادي؟", a: "يميز التوضيح الرسمي في حزيران 2026 بين إعادة التكوين الإداري للصحائف والملفات التي تستلزم التكوين القضائي. يحتاج صاحب العلاقة إلى الاطلاع على قرار التكوين ومسار الاعتراض أو الاستئناف المنطبق. حدّد العقار والقرار المنشور أولاً؛ ولا تحسب المهلة من تاريخ الخبر أو تفترض خضوع كل سجل سوري متضرر لهذا المشروع المحلي." },
    sources: [{ en: "SANA — officials explain Zamalka record reconstruction, 23 June 2026", ar: "سانا — توضيح إجراءات إعادة تكوين صحائف زملكا، 23 حزيران 2026", href: "https://sana.sy/locals/2508971/" }],
  },
  {
    region: "syr", service: "real-estate", id: "syr-usurpation-versus-tenancy", reviewedAt: "2026-09-07",
    problems: ["property-possession-and-handover-dispute", "property-ownership-disputes", "eviction-notice-and-eviction-dispute"],
    en: { q: "Is every disputed occupation of Syrian property a blatant-usurpation case?", a: "No. The Justice Ministry's April 2026 account describes blatant usurpation as unlawful taking without a legal basis, lease or ownership. A disputed tenancy or competing title cannot simply be assumed to meet that description. Establish the occupier's asserted basis and the property's history, then verify the competent court and current procedure. The announcement does not authorise private eviction." },
    ar: { q: "هل يُعد كل إشغال متنازع عليه لعقار سوري غصباً بيناً؟", a: "لا. يصف بيان وزارة العدل في نيسان 2026 الغصب البين بأنه استيلاء غير قانوني دون مسوغ أو عقد إيجار أو ملكية. فلا يُفترض تلقائياً انطباقه على إيجار متنازع عليه أو ادعاءات ملكية متقابلة. حدّد سند الشاغل وتاريخ العقار ثم تحقق من المحكمة والإجراء المنطبقين؛ ولا يجيز الإعلان الإخلاء بالقوة من قبل الأفراد." },
    sources: [{ en: "SANA — Court of Cassation and Justice Ministry on blatant usurpation", ar: "سانا — محكمة النقض ووزارة العدل بشأن الغصب البين", href: "https://sana.sy/locals/2455989/" }],
  },
  {
    region: "syr", service: "real-estate", id: "syr-lease-reform-versus-enactment", reviewedAt: "2026-09-07",
    problems: ["lease-and-eviction-matters", "eviction-notice-and-eviction-dispute", "landlord-or-tenant-notice-and-settlement-problem"],
    en: { q: "Did the announced Syrian rent-review committee itself end statutory lease extensions?", a: "No. The June 2025 announcement established a committee to study existing legislation and propose solutions for leases subject to statutory extension. Establishing that committee is not an enacted termination rule. Before serving or responding to a notice, check the lease date, use, applicable law and any subsequently enacted change; do not assume a news announcement sets an eviction date." },
    ar: { q: "هل أنهى إعلان لجنة مراجعة الإيجارات السورية التمديد الحكمي بحد ذاته؟", a: "لا. أنشأ إعلان حزيران 2025 لجنة لدراسة التشريعات النافذة واقتراح حلول لعقود التمديد الحكمي، وليس قاعدة نافذة لإنهائها. قبل توجيه الإنذار أو الرد عليه، تحقق من تاريخ العقد واستعمال العقار والقانون المنطبق وأي تعديل صدر لاحقاً؛ ولا تعتبر الخبر محدداً لموعد التخلية." },
    sources: [{ en: "SANA — Justice Ministry's lease-review committee announcement", ar: "سانا — إعلان وزارة العدل عن لجنة دراسة عقود الإيجار", href: "https://sana.sy/locals/2231447/" }],
  },
  {
    region: "syr", service: "real-estate", id: "syr-suwayda-property-proceedings", reviewedAt: "2026-09-07",
    problems: ["sale-and-purchase-contract-disputes", "property-possession-and-handover-dispute"],
    en: { q: "Can a Suwayda property-sale case proceed on the ordinary timetable?", a: "The Ministry's 21 May 2026 announcement temporarily paused specified Suwayda proceedings, including property-sale claims and execution disposing of property, while allowing specified registration and protective steps. Obtain the decision and any later change, and check the court, property and parties involved. Filing to preserve a position and obtaining a final transfer are different stages; the announcement is not a nationwide pause." },
    ar: { q: "هل تسير دعوى بيع عقار في السويداء وفق المواعيد المعتادة؟", a: "أعلن قرار الوزارة في 21 أيار 2026 وقفاً مؤقتاً لإجراءات محددة في السويداء، منها دعاوى البيوع والتنفيذ المؤدي للتصرف بالعقار، مع السماح بقيد وإجراءات تحفظية محددة. اطلب القرار وأي تعديل لاحق وتحقق من المحكمة والعقار والأطراف. يختلف القيد لحفظ المركز عن نقل الملكية النهائي؛ والإعلان ليس وقفاً عاماً في سوريا." },
    sources: [{ en: "SANA — Justice Ministry's Suwayda proceedings announcement", ar: "سانا — إعلان وزارة العدل بشأن إجراءات السويداء", href: "https://sana.sy/locals/2481883/" }],
  },
];
