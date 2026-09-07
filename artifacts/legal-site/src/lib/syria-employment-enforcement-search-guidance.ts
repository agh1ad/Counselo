import type { MatterSourceGuidance } from "./matter-source-guidance.js";

// Dated, narrow source findings; none certifies a complete or consolidated legal regime.
export const SYRIA_EMPLOYMENT_ENFORCEMENT_SEARCH_GUIDANCE: MatterSourceGuidance[] = [
  {
    region: "syr", service: "employment-law", id: "syr-employment-without-written-contract", reviewedAt: "2026-09-07",
    problems: ["employment-contract-review", "delayed-or-unpaid-salary", "unpaid-wages-and-benefits"],
    en: { q: "Does having no written Syrian employment contract mean there is no wage claim?", a: "Not necessarily. Article 47(b) in the published 2010 Labour Law permits workers without a written contract to prove entitlements by other evidence, which the employer may contest. Keep payment, attendance and instruction records. Confirm the applicable current regime and amendments before relying on that provision in proceedings." },
    ar: { q: "هل غياب عقد العمل السوري المكتوب يمنع المطالبة بالأجر؟", a: "ليس بالضرورة. تجيز المادة 47/ب في النص المنشور لقانون العمل لعام 2010 للعامل دون عقد مكتوب إثبات حقوقه بطرق الإثبات الأخرى، مع حق صاحب العمل بإثبات العكس. احفظ سجلات الدفع والحضور وتعليمات العمل، وتحقق من النظام النافذ وتعديلاته المنطبقة قبل الاستناد للمادة قضائياً." },
    sources: [{ en: "WIPO Lex — published 2010 Labour Law, Article 47", ar: "ويبو لكس — النص المنشور لقانون العمل لعام 2010، المادة 47", href: "https://www.wipo.int/wipolex/en/legislation/details/10834" }],
  },
  {
    region: "syr", service: "employment-law", id: "syr-ngo-employment-insurance", reviewedAt: "2026-09-07", includeOnServicePage: true,
    problems: ["employment-contract-review", "employment-termination-and-labour-record-dispute", "work-injury-and-compensation-claim"],
    en: { q: "Does working for an NGO in Syria remove social-insurance protection?", a: "The Ministry's January 2026 circular called on NGOs to register Syrian workers and equivalent categories for social insurance. Its explanation also distinguishes the special NGO contract-renewal rule from insurance duties. Check the employer's legal identity, contract and registration record; NGO status alone is not a reason to disregard insurance. Injury coverage and compensation still require a separate assessment." },
    ar: { q: "هل العمل لدى منظمة غير حكومية في سوريا يلغي الحماية التأمينية؟", a: "دعا تعميم الوزارة في كانون الثاني 2026 المنظمات إلى تسجيل العمال السوريين ومن في حكمهم بالتأمينات. وفصل التوضيح بين حكم تجديد عقود المنظمات الخاص وواجبات التأمين. راجع الصفة القانونية لصاحب العمل والعقد وسجل الاشتراك؛ فصفة المنظمة وحدها لا تبرر تجاهل التأمين، وتبقى تغطية الإصابة والتعويض بحاجة إلى تقييم مستقل." },
    sources: [{ en: "SANA — Ministry circular and Social Insurance Director's explanation, 21 January 2026", ar: "سانا — تعميم الوزارة وتوضيح مدير التأمينات، 21 كانون الثاني 2026", href: "https://sana.sy/locals/2380160/" }],
  },
  {
    region: "syr", service: "employment-law", id: "syr-insurance-penalty-relief-scope", reviewedAt: "2026-09-07",
    problems: ["employment-settlement-and-final-dues-calculation", "end-of-service-entitlements", "employment-termination-and-labour-record-dispute"],
    en: { q: "Does the 2026 Syrian insurance-penalty exemption erase unpaid contributions?", a: "Decree 29/2026 concerns specified interest, penalties and additional amounts for delayed contributions, conditional on payment within its applicable period. It does not describe a general cancellation of the contribution principal or an employee's wage claim. Reconcile employment dates, registered contributions and any settlement separately; obtain confirmation of the exemption's conditions before treating an account as cleared." },
    ar: { q: "هل إعفاء غرامات التأمينات السورية لعام 2026 يمحو الاشتراكات غير المدفوعة؟", a: "يتناول المرسوم 29 لعام 2026 فوائد وغرامات ومبالغ إضافية محددة عن تأخر الاشتراكات، بشرط التسديد ضمن مدته المنطبقة. ولا يقرر إلغاءً عاماً لأصل الاشتراكات أو مطالبة العامل بالأجر. طابق مدد العمل والاشتراكات والمخالصة بصورة منفصلة، وتحقق من شروط الإعفاء قبل اعتبار الحساب مسدداً." },
    sources: [{ en: "SANA — text of Decree 29/2026", ar: "سانا — نص المرسوم 29 لعام 2026", href: "https://sana.sy/presidency/2397625/" }],
  },
  {
    region: "syr", service: "enforcement", id: "syr-suwayda-execution-scope", reviewedAt: "2026-09-07", includeOnServicePage: true,
    problems: ["enforcement-of-court-judgments", "execution-of-a-syrian-court-judgment", "objection-to-an-execution-measure-or-seizure", "service-suspension-and-asset-freezing-request"],
    en: { q: "Can an ordinary execution timetable be assumed for a Suwayda property?", a: "No. On 21 May 2026 the Ministry announced a temporary pause covering specified Suwayda proceedings, including execution that disposes of property there, while allowing protective measures. The announcement also addresses specified parties and related procedural periods. Obtain the decision and any later amendment from the competent authority and check your file's coverage. Do not infer that every Syrian case is paused or stop responding to notices without that check." },
    ar: { q: "هل يمكن افتراض سير التنفيذ المعتاد على عقار في السويداء؟", a: "لا. أعلنت الوزارة في 21 أيار 2026 وقفاً مؤقتاً لإجراءات محددة في السويداء، منها التنفيذ المؤدي للتصرف بالعقار فيها، مع السماح بإجراءات تحفظية. ويتناول الإعلان أطرافاً محددين والمهل المرتبطة بالإجراءات المشمولة. اطلب القرار وأي تعديل لاحق من الجهة المختصة وتحقق من انطباقه على ملفك؛ ولا تفترض وقف كل قضية سورية أو تتجاهل التبليغات دون هذا التحقق." },
    sources: [{ en: "SANA — Ministry of Justice announcement, 21 May 2026", ar: "سانا — إعلان وزارة العدل، 21 أيار 2026", href: "https://sana.sy/locals/2481883/" }],
  },
  {
    region: "syr", service: "enforcement", id: "syr-security-attachment-distinction", reviewedAt: "2026-09-07",
    problems: ["objection-to-an-execution-measure-or-seizure", "service-suspension-and-asset-freezing-request", "enforcement-objections-and-settlement"],
    en: { q: "Does the Syrian measure lifting security-based attachments cancel every creditor's seizure?", a: "The May 2025 official explanation concerns Finance Ministry attachments based on security directions under Decree 63/2012, addressed through Decree 16/2025. It is not a statement cancelling every ordinary civil creditor's seizure. Identify the issuing authority, legal basis and property entry, then verify the removal decision and its implementation for that record." },
    ar: { q: "هل رفع الحجوزات ذات الأساس الأمني في سوريا يلغي كل حجز لمصلحة دائن؟", a: "يتناول التوضيح الرسمي في أيار 2025 حجوزات وزارة المالية المبنية على توجيهات أمنية وفق المرسوم 63 لعام 2012، والمعالجة بالمرسوم 16 لعام 2025. وليس إعلاناً بإلغاء كل حجز مدني عادي لمصلحة دائن. حدّد الجهة المصدرة والأساس القانوني والقيد العقاري، ثم تحقق من قرار الرفع وتنفيذه على القيد المعني." },
    sources: [{ en: "SANA — ministries' explanation of Decree 16/2025 implementation", ar: "سانا — توضيح الوزارات لتنفيذ المرسوم 16 لعام 2025", href: "https://sana.sy/locals/2218190/" }],
  },
  {
    region: "syr", service: "enforcement", id: "syr-public-bank-settlement-scope", reviewedAt: "2026-09-07",
    problems: ["commercial-debt-recovery", "enforcement-objections-and-settlement"],
    en: { q: "Does Syria's 2026 public-bank debt settlement cover an ordinary supplier invoice?", a: "The official explanation of Decree 70/2026 concerns distressed debts and credit facilities at public banks, with conditions and deadlines. Do not apply that announcement to a private supplier's invoice merely because payment is overdue. Identify the creditor and facility, and obtain the operative decree, instructions and any extension before deciding whether a particular bank debt can still qualify." },
    ar: { q: "هل تشمل تسوية ديون المصارف العامة السورية لعام 2026 فاتورة مورد عادية؟", a: "يتناول التوضيح الرسمي للمرسوم 70 لعام 2026 الديون والتسهيلات المتعثرة لدى المصارف العامة، بشروط ومهل. لا تطبق الإعلان على فاتورة مورد خاص لمجرد تأخر السداد. حدّد الدائن والتسهيل، واطلب نص المرسوم والتعليمات وأي تمديد قبل تقرير استمرار أهلية دين مصرفي معين للتسوية." },
    sources: [{ en: "SANA — Finance Minister's explanation of Decree 70/2026", ar: "سانا — توضيح وزير المالية للمرسوم 70 لعام 2026", href: "https://sana.sy/economy/2431326/" }],
  },
  {
    region: "syr", service: "enforcement", id: "syr-scholarship-recovery-pause", reviewedAt: "2026-09-07",
    problems: ["travel-ban-application-for-debt-recovery"],
    en: { q: "Did the 2026 measures for Syrian overseas scholarship students abolish all debt-related travel restrictions?", a: "No general abolition follows from that announcement. On 7 April 2026 the Finance Minister requested a pause in recovery against overseas scholarship students and their guarantors pending a settlement; the report separately refers to steps lifting their travel restrictions. Identify the specific decision and debt. Confirm subsequent measures with the authority; the announcement does not establish the position of an unrelated private-debt case." },
    ar: { q: "هل ألغت إجراءات الموفدين السوريين لعام 2026 كل منع سفر مرتبط بدين؟", a: "لا يُستفاد من الإعلان إلغاء عام. طلب وزير المالية في 7 نيسان 2026 وقف التحصيل بحق الموفدين للدراسة خارج سوريا وكفلائهم لحين التسوية، وأشار الخبر بصورة منفصلة إلى إجراءات رفع قيود سفرهم. حدّد القرار والدين المعنيين، وتحقق من الإجراءات اللاحقة لدى الجهة المختصة؛ فلا يحسم الإعلان وضع قضية دين خاص لا ترتبط بالإيفاد." },
    sources: [{ en: "SANA — Finance Minister's request, 7 April 2026", ar: "سانا — طلب وزير المالية، 7 نيسان 2026", href: "https://sana.sy/economy/2444579/" }],
  },
];
