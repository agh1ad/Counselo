import type { MatterSourceGuidance } from "./matter-source-guidance.js";

// Individually scoped answers. Shared use means the same rule is relevant to
// each listed matter; it does not certify complete intent coverage of a page.
export const EMPLOYMENT_SEARCH_GUIDANCE: MatterSourceGuidance[] = [
  {
    region: "sa", service: "employment-law", id: "sa-service-certificate", reviewedAt: "2026-09-07",
    problems: ["experience-certificate-and-service-transfer-dispute"],
    en: { q: "Can my employer in Saudi Arabia charge for a service certificate after employment ends?", a: "Article 64 requires a free certificate on the worker's request at the end of employment. It records the start and end dates, occupation and last wage, and must not contain material harming future employment prospects. Ask for inaccurate entries to be corrected; the certificate does not itself approve a transfer to another employer." },
    ar: { q: "هل يجوز لصاحب العمل في السعودية طلب مقابل لشهادة الخدمة بعد انتهاء العمل؟", a: "تلزم المادة 64 صاحب العمل بإعطاء شهادة خدمة دون مقابل عند طلب العامل بعد انتهاء العلاقة. تتضمن تاريخي الالتحاق والانتهاء والمهنة والأجر الأخير، ولا يجوز تضمينها ما يضر بفرص العمل اللاحقة. اطلب تصحيح البيانات الخاطئة؛ فالشهادة لا تمنح بحد ذاتها الموافقة على نقل العمل." },
    sources: [{ en: "HRSD — Labour Law, Article 64", ar: "وزارة الموارد البشرية — نظام العمل، المادة 64", href: "https://www.hrsd.gov.sa/sites/default/files/2025-05/hrsd.pdf" }],
  },
  {
    region: "sa", service: "employment-law", id: "sa-non-compete-limits", reviewedAt: "2026-09-07",
    problems: ["non-compete-and-confidentiality-clause-dispute"],
    en: { q: "Is every Saudi non-compete clause enforceable for two years?", a: "Two years is a maximum, not automatic validity. Under Article 83, the employer's legitimate interest, the worker's access to clients, and a written restriction specifying time, place and work type matter. Confidentiality has a separate provision. Compare the actual new role with the clause before accepting that any job with a competitor is prohibited." },
    ar: { q: "هل يصح كل شرط عدم منافسة في السعودية لمدة سنتين؟", a: "السنتان حد أقصى وليستا دليلاً على صحة الشرط تلقائياً. تتطلب المادة 83 مراعاة مصلحة صاحب العمل المشروعة واطلاع العامل على عملائه، وشرطاً مكتوباً يحدد الزمان والمكان ونوع العمل. وللسرية حكم مستقل. قارن الوظيفة الجديدة بالشرط قبل افتراض منع كل عمل لدى منافس." },
    sources: [{ en: "HRSD — Labour Law, Article 83", ar: "وزارة الموارد البشرية — نظام العمل، المادة 83", href: "https://www.hrsd.gov.sa/sites/default/files/2025-05/hrsd.pdf" }],
  },
  {
    region: "sa", service: "employment-law", id: "sa-leave-types", reviewedAt: "2026-09-07",
    problems: ["sick-leave-and-annual-leave-entitlement-dispute"],
    en: { q: "Are Saudi annual leave and sick leave paid on the same basis?", a: "No. The ordinary annual entitlement is at least 21 paid days, rising to at least 30 after five continuous years with the employer. For medically established sickness, Article 117 provides 30 days at full pay, the next 60 at three-quarter pay and the next 30 unpaid during the relevant year, whether continuous or intermittent. Verify the governing regime, medical proof and leave-year record before combining balances." },
    ar: { q: "هل تتساوى الإجازة السنوية والمرضية السعودية في الأجر والمدة؟", a: "لا. الإجازة السنوية المعتادة لا تقل عن 21 يوماً بأجر، وتصبح 30 يوماً على الأقل بعد خمس سنوات متصلة لدى صاحب العمل. وللمرض المثبت، تقرر المادة 117 ثلاثين يوماً بأجر كامل، ثم ستين بثلاثة أرباع الأجر، ثم ثلاثين دون أجر خلال السنة المعنية، متصلة أو متقطعة. تحقق من النظام المنطبق وإثبات المرض وسجل سنة الإجازة قبل جمع الأرصدة." },
    sources: [{ en: "HRSD — working conditions, Articles 109 and 117", ar: "وزارة الموارد البشرية — شروط العمل وظروفه، المادتان 109 و117", href: "https://www.hrsd.gov.sa/شروط-العمل-وظروفه" }],
  },
  {
    region: "sa", service: "employment-law", id: "sa-gosi-record-correction", reviewedAt: "2026-09-07",
    problems: ["gosi-registration-or-contribution-dispute"],
    en: { q: "Can incorrect GOSI wages or employment dates be corrected retrospectively?", a: "GOSI provides an employer service for retrospective corrections to registered wages, joining dates, exclusion dates and exclusion reasons. Identify the incorrect period and supporting employment or pay record, and request correction through the authorised channel. The service's availability does not mean every requested change will be accepted or that a worker can use an employer account. A record correction and a disputed wage claim are separate issues." },
    ar: { q: "هل يمكن تصحيح الأجر أو تواريخ العمل المسجلة بالتأمينات بأثر رجعي؟", a: "توفر التأمينات خدمة لصاحب العمل لتعديل الأجر وتاريخ الالتحاق وتاريخ الاستبعاد وسببه بأثر رجعي. حدّد المدة الخاطئة ومستند العمل أو الأجر المؤيد، واطلب التصحيح عبر القناة المخولة. إتاحة الخدمة لا تعني قبول كل تعديل ولا تمكين العامل من حساب صاحب العمل. ويختلف تصحيح السجل عن الفصل في مطالبة أجر متنازع عليها." },
    sources: [{ en: "GOSI — retrospective subscription-data corrections", ar: "التأمينات الاجتماعية — تعديل بيانات الاشتراك بأثر رجعي", href: "https://beta.gosi.gov.sa/ar/services/business/Add_Backdated_Engagement_" }],
  },
  {
    region: "sa", service: "employment-law", id: "sa-gosi-injury-report", reviewedAt: "2026-09-07",
    problems: ["work-injury-and-compensation-claim"],
    en: { q: "Can a Saudi insured worker report a work injury electronically?", a: "GOSI's individual service provides an injury-report route under Occupational Hazards. The submitted report goes to the establishment supervisor for acceptance or rejection; submission is not a final decision on coverage or compensation. Keep the incident date, employer notification, medical evidence and report reference. Obtain urgent care when needed and check the applicable reporting duties promptly instead of waiting for a compensation calculation." },
    ar: { q: "هل يستطيع المشترك في التأمينات السعودية الإبلاغ عن إصابة العمل إلكترونياً؟", a: "تتيح خدمة الأفراد لدى التأمينات الإبلاغ عن الإصابة ضمن الأخطار المهنية. يُحال البلاغ إلى مشرف المنشأة لاعتماده أو رفضه؛ وتقديمه ليس قراراً نهائياً بالتغطية أو التعويض. احفظ تاريخ الحادث وإبلاغ صاحب العمل والمستندات الطبية ومرجع البلاغ. اطلب العلاج العاجل عند الحاجة وتحقق سريعاً من واجبات الإبلاغ المنطبقة دون انتظار حساب التعويض." },
    sources: [{ en: "GOSI — individual injury-report service", ar: "التأمينات الاجتماعية — خدمة إبلاغ الفرد عن إصابة", href: "https://beta.gosi.gov.sa/ar/services/individual-services/Report_Injury" }],
  },
  {
    region: "uae", service: "employment-labour", id: "uae-work-injury-treatment", reviewedAt: "2026-09-07",
    problems: ["work-injury-and-compensation-claim"],
    en: { q: "Who pays for treatment and wages after a UAE work injury?", a: "Under the federal private-sector framework, the employer covers qualifying work-injury treatment until recovery or confirmation of disability. During treatment, the stated wage entitlement is full pay for up to six months, then half pay for an additional six months if treatment continues. The employer must report the incident to MOHRE within 48 hours. Confirm coverage, medical findings and any statutory exclusion; treatment costs and disability compensation are separate calculations." },
    ar: { q: "من يدفع العلاج والأجر بعد إصابة العمل في الإمارات؟", a: "في إطار القطاع الخاص الاتحادي، يتحمل صاحب العمل علاج إصابة العمل المشمولة حتى الشفاء أو ثبوت العجز. وخلال العلاج يستحق العامل الأجر كاملاً لمدة تصل إلى ستة أشهر، ثم نصفه لستة أشهر إضافية إذا استمر العلاج. ويلتزم صاحب العمل بالإبلاغ للوزارة خلال 48 ساعة. تحقق من التغطية والنتائج الطبية والاستثناءات القانونية؛ فتكاليف العلاج وتعويض العجز حسابان منفصلان." },
    sources: [{ en: "UAE Government — work-injury treatment, wages and reporting", ar: "حكومة الإمارات — علاج إصابات العمل والأجر والإبلاغ", href: "https://u.ae/en/information-and-services/jobs/employment-in-the-private-sector/Work-Injury-Compensation-in-the-UAE" }],
  },
  {
    region: "sa", service: "employment-law", id: "sa-executable-wage-contract", reviewedAt: "2026-09-07", includeOnServicePage: true,
    problems: ["delayed-or-unpaid-salary", "unpaid-wages-and-benefits", "resignation-because-of-unpaid-wages", "employment-contract-review"],
    en: { q: "Can I enforce unpaid Saudi wages through Najiz without a labour judgment?", a: "The executable employment-contract initiative provides a direct route for the wage clause when the Qiwa contract uses the executable unified form and has a Ministry of Justice execution number. HRSD describes eligibility after 30 days of complete non-payment or 90 days of partial payment from the due date. Check the contract's execution status and payment record first. This route does not automatically cover every bonus, dismissal claim or employment contract." },
    ar: { q: "هل أستطيع تنفيذ الأجور المتأخرة عبر ناجز دون حكم عمالي؟", a: "تتيح مبادرة العقد التنفيذي التنفيذ المباشر لبند الأجر إذا كان العقد موثقاً في قوى بالنموذج الموحد التنفيذي وله رقم تنفيذ صادر من وزارة العدل. توضح الوزارة إتاحة الطلب بعد 30 يوماً من الاستحقاق عند عدم دفع الأجر كاملاً، أو 90 يوماً عند السداد الجزئي. تحقّق من صفة العقد التنفيذية وسجل الدفع أولاً؛ فلا يشمل هذا المسار تلقائياً كل مكافأة أو مطالبة فصل أو عقد عمل." },
    sources: [{ en: "HRSD — executable employment contract, eligibility and unpaid wages", ar: "وزارة الموارد البشرية — عقد العمل التنفيذي وشروط تنفيذ الأجر", href: "https://www.hrsd.gov.sa/media-center/news/مبادرة-عقد-العمل-الموثّق-سندًا-تنفيذيًا" }],
  },
  {
    region: "sa", service: "employment-law", id: "sa-labour-settlement-route", reviewedAt: "2026-09-07", includeOnServicePage: true,
    problems: ["wrongful-termination", "delayed-or-unpaid-salary", "unpaid-wages-and-benefits", "employment-settlement-and-final-dues-calculation", "end-of-service-entitlements", "employment-dispute-after-resignation-or-job-transfer", "commission-and-bonus-payment-dispute"],
    en: { q: "Where do I start a Saudi labour dispute that needs a decision on the claim?", a: "For disputes within its scope, HRSD's amicable-settlement service is the first stage before the labour court. The service describes settlement attempts or court referral within 21 working days from the first session; this is not a deadline to start your claim or a promise of judgment within 21 days. Submit the employment evidence and specific demands through the official service. Check separately whether an executable wage contract offers a direct enforcement route." },
    ar: { q: "أين أبدأ نزاعاً عمالياً سعودياً يحتاج إلى الفصل في المطالبة؟", a: "في الخلافات الداخلة في نطاقها، تكون خدمة التسوية الودية لدى وزارة الموارد البشرية المرحلة الأولى قبل المحكمة العمالية. تصف الخدمة محاولة التسوية أو الإحالة خلال 21 يوم عمل من أول جلسة؛ وهذه ليست مهلة بدء المطالبة ولا وعداً بصدور حكم خلالها. قدّم إثبات علاقة العمل والطلبات المحددة عبر الخدمة الرسمية، وتحقق بصورة مستقلة من انطباق مسار التنفيذ المباشر لعقد الأجر التنفيذي." },
    sources: [{ en: "HRSD — amicable settlement for labour disputes", ar: "وزارة الموارد البشرية — التسوية الودية للخلافات العمالية", href: "https://www.hrsd.gov.sa/ministry-services/services/269970" }],
  },
  {
    region: "sa", service: "employment-law", id: "sa-indefinite-contract-notice", reviewedAt: "2026-09-07",
    problems: ["wrongful-termination", "employment-contract-review", "employment-dispute-after-resignation-or-job-transfer"],
    en: { q: "Is Saudi termination notice always 30 days?", a: "No. Under Article 75, for an indefinite-term contract paid monthly, the employee gives at least 30 days' written notice and the employer at least 60 days. For other wage-payment periods, the minimum is 30 days by either party. These rules concern termination for a legitimate reason under that article. Fixed-term expiry, probation and termination without notice need separate analysis; notice pay and compensation for unlawful termination are distinct claims." },
    ar: { q: "هل مهلة الإشعار بإنهاء العمل في السعودية 30 يوماً دائماً؟", a: "لا. وفق المادة 75، إذا كان العقد غير محدد المدة والأجر شهرياً، يُشعر العامل صاحب العمل كتابةً قبل 30 يوماً على الأقل، ويُشعر صاحب العمل العامل قبل 60 يوماً على الأقل. ولغير الأجر الشهري تكون المدة 30 يوماً على الأقل من أي طرف. تتعلق القاعدة بالإنهاء لسبب مشروع وفق المادة؛ أما العقد المحدد والتجربة والإنهاء دون إشعار فتُراجع مستقلة، كما يختلف بدل الإشعار عن تعويض الإنهاء غير المشروع." },
    sources: [{ en: "HRSD — Labour Law, Articles 75–77", ar: "وزارة الموارد البشرية — نظام العمل، المواد 75–77", href: "https://www.hrsd.gov.sa/en/علاقات-العمل" }],
  },
  {
    region: "sa", service: "employment-law", id: "sa-gratuity-calculation-basis", reviewedAt: "2026-09-07",
    problems: ["end-of-service-entitlements", "employment-settlement-and-final-dues-calculation", "commission-and-bonus-payment-dispute"],
    en: { q: "Is Saudi end-of-service pay calculated only on basic salary?", a: "The ordinary statutory calculation uses the last wage: half a month's wage per year for the first five years and a month's wage per later year, with fractions apportioned. Do not substitute basic salary automatically. Article 86 permits an agreement excluding specified variable commissions or similar components. Resignation, service length and statutory exceptions affect entitlement, so confirm those facts before accepting a final calculation." },
    ar: { q: "هل تُحسب مكافأة نهاية الخدمة السعودية على الراتب الأساسي فقط؟", a: "تعتمد القاعدة العامة على الأجر الأخير: نصف شهر عن كل سنة من السنوات الخمس الأولى وشهر عن كل سنة تالية، مع احتساب أجزاء السنة بنسبة مدتها. لا تستبدل الأجر بالراتب الأساسي تلقائياً؛ فالمادة 86 تجيز الاتفاق على استبعاد عمولات متغيرة أو عناصر مماثلة محددة. وتؤثر الاستقالة ومدة الخدمة والاستثناءات النظامية في الاستحقاق، لذا تحقق منها قبل اعتماد المخالصة." },
    sources: [{ en: "HRSD — end-of-service award and wage components", ar: "وزارة الموارد البشرية — أحكام مكافأة نهاية الخدمة وعناصر الأجر", href: "https://www.hrsd.gov.sa/en/knowledge-centre/articles/317-0" }],
  },
  {
    region: "uae", service: "employment-labour", id: "uae-notice-and-retaliatory-dismissal", reviewedAt: "2026-09-07",
    problems: ["wrongful-termination-and-labour-complaint", "resignation-because-of-unpaid-wages"],
    en: { q: "Does every UAE dismissal qualify for three months' compensation?", a: "No. Article 47 addresses dismissal because of a serious MOHRE complaint or a lawsuit against the employer proven valid; its compensation ceiling is not an automatic award for every termination. Ordinary contractual notice under Article 43 is 30–90 days. Notice allowance, unpaid entitlements and an Article 47 claim are separate questions. Confirm the federal private-sector regime applies; probation and termination without notice have different requirements." },
    ar: { q: "هل يستحق كل مفصول في الإمارات تعويض ثلاثة أشهر؟", a: "لا. تتناول المادة 47 الفصل بسبب شكوى جدية إلى الوزارة أو دعوى على صاحب العمل ثبتت صحتها؛ وحد التعويض فيها ليس مبلغاً تلقائياً لكل إنهاء. وتتراوح مهلة الإشعار العادية وفق المادة 43 بين 30 و90 يوماً. افصل بدل الإشعار والمستحقات المتأخرة عن مطالبة المادة 47، وتحقق من انطباق نظام القطاع الخاص الاتحادي؛ فللتجربة والإنهاء دون إشعار شروط أخرى." },
    sources: [{ en: "UAE Government — notice and unlawful dismissal", ar: "حكومة الإمارات — الإشعار والإنهاء غير المشروع", href: "https://u.ae/en/information-and-services/jobs/employment-in-the-private-sector/job-offers-and-work-permits-and-contracts/terminating-employment-contracts" }],
  },
  {
    region: "uae", service: "employment-labour", id: "uae-gratuity-and-final-payment", reviewedAt: "2026-09-07",
    problems: ["end-of-service-benefits-and-final-settlement-dispute", "commission-and-bonus-payment-dispute"],
    en: { q: "Which salary and payment deadline apply to UAE end-of-service gratuity?", a: "For foreign full-time workers under the ordinary federal scheme, eligibility starts after one continuous year. Gratuity uses the last basic salary: 21 days per year for the first five years and 30 days per later year, with a two-year wage cap. Outstanding wages and entitlements are due within 14 days of termination. Check unpaid absence, lawful deductions, different work models and any alternative savings scheme before calculating; citizens' pension rules are different." },
    ar: { q: "ما الأجر وموعد السداد المعتمدان لمكافأة نهاية الخدمة في الإمارات؟", a: "للعامل الأجنبي بدوام كامل في النظام الاتحادي المعتاد، يبدأ الاستحقاق بعد سنة خدمة متصلة. تُحسب المكافأة على آخر راتب أساسي: 21 يوماً عن كل سنة من الخمس الأولى و30 يوماً عن كل سنة لاحقة، بحد أقصى أجر سنتين. تُدفع الأجور والمستحقات خلال 14 يوماً من انتهاء العقد. راجع الغياب دون أجر والاستقطاعات المشروعة ونمط العمل والاشتراك في نظام الادخار البديل؛ وتختلف قواعد معاشات المواطنين." },
    sources: [{ en: "UAE Government — end-of-service benefits for private-sector workers", ar: "حكومة الإمارات — مكافأة نهاية الخدمة للعاملين بالقطاع الخاص", href: "https://u.ae/en/information-and-services/jobs/employment-in-the-private-sector/end-of-service-benefits-for-employees-in-the-private-sector" }],
  },
  {
    region: "uae", service: "employment-labour", id: "uae-wage-payment-complaint", reviewedAt: "2026-09-07", includeOnServicePage: true,
    problems: ["delayed-or-unpaid-salary", "resignation-because-of-unpaid-wages", "commission-and-bonus-payment-dispute"],
    en: { q: "Where can I complain about unpaid UAE private-sector salary?", a: "The UAE Government directs salary-payment concerns to MOHRE and its salary-complaint channel. Prepare the agreed wage, pay periods, bank receipts and an itemised shortfall. Wage-protection payment records help distinguish missing salary from a contested commission or other entitlement. Confirm which authority governs your employment, especially in a financial free zone or domestic-work arrangement; contacting CounselO does not register an official complaint." },
    ar: { q: "أين أشتكي عن راتب غير مدفوع في القطاع الخاص الإماراتي؟", a: "توجّه البوابة الحكومية شكاوى دفع الرواتب إلى وزارة الموارد البشرية والتوطين وقناة الشكوى عن الراتب. جهّز الأجر المتفق عليه وفترات الاستحقاق والتحويلات وجدول النقص. تساعد سجلات حماية الأجور على تمييز الراتب المفقود عن العمولة المتنازع عليها أو المستحق الآخر. تحقق من الجهة التي تنظم عملك، خصوصاً في المناطق الحرة المالية أو العمالة المنزلية؛ فالتواصل مع كاونسلو لا يسجل شكوى رسمية." },
    sources: [{ en: "UAE Government — payment of wages and salary complaints", ar: "حكومة الإمارات — دفع الرواتب وشكاوى الأجور", href: "https://u.ae/en/information-and-services/jobs/employment-in-the-private-sector/payment-of-wages" }],
  },
];
