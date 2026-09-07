import type { MatterSourceGuidance } from "./matter-source-guidance.js";

export const UAE_INSOLVENCY_COMPLETION_SEARCH_GUIDANCE: MatterSourceGuidance[] = [
  {
    "region": "uae",
    "service": "insolvency-restructuring",
    "problems": [
      "business-debt-restructuring",
      "creditor-claim-in-insolvency",
      "director-liability-in-insolvency"
    ],
    "id": "uae-insolvency-regime-selection",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Does the federal business-bankruptcy law cover every UAE debtor?",
      "a": "No. Law 51/2023 covers the specified companies, licensed professional civil companies and natural persons acting as traders. Personal or family debts and entities governed by excluded sector or special free-zone insolvency rules, including DIFC and ADGM, need their own regime. A sole trader is not excluded merely because they are an individual. Identify the debtor’s legal form, licence, activity and debt purpose first."
    },
    "ar": {
      "q": "هل يشمل قانون الإفلاس التجاري الاتحادي كل مدين في الإمارات؟",
      "a": "لا. يشمل القانون 51 لسنة 2023 الشركات المحددة فيه والشركات المدنية المهنية المرخصة والأشخاص الطبيعيين بصفة تاجر. وللديون الشخصية أو العائلية والجهات الخاضعة للقواعد القطاعية أو أنظمة المناطق الحرة المستثناة، ومنها مركز دبي المالي وسوق أبوظبي العالمي، نظامها المناسب. فلا يستبعد التاجر الفرد لمجرد كونه شخصاً طبيعياً. حدد الشكل القانوني والرخصة والنشاط وغرض الدين أولاً."
    },
    "sources": [
      {
        "en": "UAE Government — current bankruptcy scope and exclusions",
        "ar": "حكومة الإمارات — نطاق الإفلاس الحالي واستثناءاته",
        "href": "https://u.ae/en/information-and-services/business/bankruptcy-and-insolvency/uae-law-on-bankruptcy"
      }
    ],
    "includeOnServicePage": true
  },
  {
    "region": "uae",
    "service": "insolvency-restructuring",
    "problems": [
      "business-debt-restructuring"
    ],
    "id": "uae-insolvency-procedure-selection",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "How do preventive settlement, restructuring and bankruptcy differ?",
      "a": "Under Law 51/2023, preventive settlement starts at the debtor’s request and normally leaves ordinary management with the debtor under court supervision. Restructuring may be requested by the debtor, creditors or regulator and uses a court-supervised plan with a trustee; management powers may be restricted. Bankruptcy is collective liquidation and distribution. An informal instalment agreement is not any of these court procedures."
    },
    "ar": {
      "q": "ما الفرق بين التسوية الوقائية وإعادة الهيكلة والإفلاس؟",
      "a": "وفق القانون 51 لسنة 2023 تبدأ التسوية الوقائية بطلب المدين مع استمرار إدارته المعتادة تحت إشراف المحكمة. وقد يطلب الهيكلة المدين أو الدائنون أو الجهة الرقابية، وتنفذ بخطة تحت إشراف المحكمة وبمساعدة أمين، وقد تقيد صلاحيات الإدارة. أما الإفلاس فتصفية وتوزيع جماعيان. واتفاق التقسيط الودي ليس أياً من هذه الإجراءات القضائية."
    },
    "sources": [
      {
        "en": "Law 51/2023, Article 1 procedural definitions",
        "ar": "القانون 51 لسنة 2023، تعريفات المادة 1",
        "href": "https://uaelegislation.gov.ae/ar/legislations/2190/download"
      }
    ],
    "includeOnServicePage": true
  },
  {
    "region": "uae",
    "service": "insolvency-restructuring",
    "problems": [
      "business-debt-restructuring"
    ],
    "id": "uae-insolvency-debtor-threshold",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "What debt threshold applies to a debtor’s federal application?",
      "a": "Executive Article 5 sets minimum debt that has stopped being paid or will not be payable when due: AED 300,000 for a natural-person debtor within this business regime and AED 500,000 for a legal person. The threshold is AED 5 million for a regulator-supervised debtor. Meeting the amount alone does not establish every opening condition or apply the business procedure to personal consumer debt."
    },
    "ar": {
      "q": "ما حد الدين في الطلب الاتحادي المقدم من المدين؟",
      "a": "تحدد المادة التنفيذية 5 أدنى الدين المتوقف عن سداده أو المتوقع العجز عن سداده عند الاستحقاق: 300 ألف درهم للشخص الطبيعي المشمول بنظام الأعمال، و500 ألف للشخص الاعتباري. ويرتفع إلى 5 ملايين للمدين الخاضع لجهة رقابية. ولا يثبت بلوغ المبلغ وحده كل شروط الافتتاح، ولا يدخل الدين الاستهلاكي الشخصي في هذا المسار."
    },
    "sources": [
      {
        "en": "Executive Regulations 94/2024, Article 5",
        "ar": "اللائحة التنفيذية 94 لسنة 2024، المادة 5",
        "href": "https://www.uaelegislation.gov.ae/en/legislations/2582/download"
      }
    ],
    "includeOnServicePage": false
  },
  {
    "region": "uae",
    "service": "insolvency-restructuring",
    "problems": [
      "creditor-claim-in-insolvency"
    ],
    "id": "uae-insolvency-creditor-threshold",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Is filing a claim in an open case the same as petitioning to open bankruptcy?",
      "a": "No. Executive Article 6 requires an ordinary creditor or group seeking restructuring or bankruptcy to have unpaid debt totalling at least AED 1 million, or AED 10 million for a regulator-supervised debtor. Secured applicants have separate security-shortfall tests. These opening thresholds do not replace the invitation to prove a creditor claim in an already opened proceeding. For a secured applicant, Executive Article 6 requires a collateral shortfall of at least AED 1 million for a single creditor or AED 5 million for a group, rising to AED 10 million for the regulated debtor."
    },
    "ar": {
      "q": "هل إثبات الدين في قضية مفتوحة كطلب افتتاح الإفلاس؟",
      "a": "لا. تشترط المادة التنفيذية 6 للدائن العادي أو المجموعة التي تطلب الهيكلة أو الإفلاس ديوناً متوقفاً عن سدادها لا تقل عن مليون درهم، أو 10 ملايين للمدين الخاضع لجهة رقابية. ولأصحاب الضمانات اختبارات مستقلة لنقص قيمتها. ولا تحل حدود طلب الافتتاح محل دعوة إثبات الدين في إجراء مفتوح بالفعل. وللطالب المضمون تشترط المادة التنفيذية 6 نقصاً في قيمة الضمان لا يقل عن مليون درهم للدائن المنفرد أو 5 ملايين للمجموعة، ويرتفع إلى 10 ملايين للمدين الخاضع للرقابة."
    },
    "sources": [
      {
        "en": "Executive Regulations 94/2024, Article 6",
        "ar": "اللائحة التنفيذية 94 لسنة 2024، المادة 6",
        "href": "https://www.uaelegislation.gov.ae/en/legislations/2582/download"
      }
    ],
    "includeOnServicePage": false
  },
  {
    "region": "uae",
    "service": "insolvency-restructuring",
    "problems": [
      "business-debt-restructuring"
    ],
    "id": "uae-insolvency-application-records",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "What financial records are required beyond an unpaid-invoice list?",
      "a": "Article 22 requires the procedure and reasons, previous applications, licence and register, financial position and employee dues, three preceding fiscal years of books or statements, and cases and execution proceedings. Include next-year cash-flow and profit/loss forecasts, classified creditor/debtor contacts, amounts and security, requested financing and its effect on creditors, and corporate authority and constitutional documents where applicable. Explain missing material; Article 23 allows court orders for necessary records held by others. These categories help preparation; the full Article 22 attachments and case requests govern filing."
    },
    "ar": {
      "q": "ما السجلات المطلوبة غير قائمة الفواتير المتأخرة؟",
      "a": "تطلب المادة 22 الإجراء وأسبابه والطلبات السابقة والرخصة والسجل والوضع المالي ومستحقات العاملين ودفاتر أو قوائم السنوات المالية الثلاث السابقة والدعاوى والتنفيذ. وأرفق توقعات التدفقات والأرباح والخسائر للسنة التالية، وبيانات الدائنين والمدينين المصنفة واتصالاتهم والمبالغ والضمانات، والتمويل المطلوب وأثره على الدائنين، والتفويض ووثائق التأسيس بحسب الحال. بيّن سبب النقص؛ وتتيح المادة 23 أمر المحكمة بتقديم السجلات لدى الغير. وهذه فئات للإعداد، وتبقى مرفقات المادة 22 كاملة وطلبات القضية حاكمة للإيداع."
    },
    "sources": [
      {
        "en": "Law 51/2023, Articles 22–23",
        "ar": "القانون 51 لسنة 2023، المادتان 22 و23",
        "href": "https://uaelegislation.gov.ae/ar/legislations/2190/download"
      }
    ],
    "includeOnServicePage": false
  },
  {
    "region": "uae",
    "service": "insolvency-restructuring",
    "problems": [
      "business-debt-restructuring",
      "creditor-claim-in-insolvency"
    ],
    "id": "uae-insolvency-working-day-definition",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Are the periods stated in days calendar days under this bankruptcy law?",
      "a": "Article 1 defines a day as an official working day in the UAE. Apply that definition to the law’s day-based periods, including the creditor invitation, and read the actual court notice. A period expressed in months or years is different; do not carry this definition into the personal-insolvency or financial-free-zone legislation without checking it."
    },
    "ar": {
      "q": "هل المدد المذكورة بالأيام في قانون الإفلاس أيام تقويمية؟",
      "a": "تعرّف المادة 1 اليوم بأنه يوم العمل الرسمي في الدولة. طبّق هذا التعريف على مدد القانون المحددة بالأيام، ومنها دعوة الدائنين، واقرأ إخطار المحكمة الفعلي. وتختلف المدة المحددة بالشهور أو السنوات؛ ولا تنقل التعريف إلى الإعسار الشخصي أو قوانين المناطق المالية الحرة دون تحقق."
    },
    "sources": [
      {
        "en": "Law 51/2023, Article 1 definition of day",
        "ar": "القانون 51 لسنة 2023، تعريف اليوم بالمادة 1",
        "href": "https://uaelegislation.gov.ae/ar/legislations/2190/download"
      }
    ],
    "includeOnServicePage": false
  },
  {
    "region": "uae",
    "service": "insolvency-restructuring",
    "problems": [
      "creditor-claim-in-insolvency"
    ],
    "id": "uae-insolvency-secured-proof",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Must a secured creditor or a creditor without final judgment submit proof?",
      "a": "Yes. Article 98 includes unmatured, secured and non-finally-adjudicated debts. Submit the debt documents, security, maturity and amount in dirhams at the opening-date exchange rate within the invitation period. Under Article 99, deduct amounts already received from guarantors or third parties; those payers may prove their own claim to the extent paid."
    },
    "ar": {
      "q": "هل يقدم صاحب الضمان أو الدين غير المحكوم به نهائياً إثباته؟",
      "a": "نعم. تشمل المادة 98 الديون غير الحالة والمضمونة وغير الثابتة بحكم بات. قدم المستندات والضمانات والاستحقاق والمبلغ بالدرهم وفق سعر الصرف يوم الافتتاح خلال مهلة الدعوة. وبالمادة 99 تخصم المبالغ المقبوضة من الضامنين أو الغير، ويجوز لهم إثبات مطالبتهم بقدر ما سددوه."
    },
    "sources": [
      {
        "en": "Law 51/2023, Articles 98–99",
        "ar": "القانون 51 لسنة 2023، المادتان 98 و99",
        "href": "https://uaelegislation.gov.ae/ar/legislations/2190/download"
      }
    ],
    "includeOnServicePage": false
  },
  {
    "region": "uae",
    "service": "insolvency-restructuring",
    "problems": [
      "creditor-claim-in-insolvency"
    ],
    "id": "uae-insolvency-late-proof",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Is a missed restructuring proof deadline automatically the end of the claim?",
      "a": "Under Article 106, apply to the trustee for late admission. Acceptance needs Bankruptcy Court certification and an amended, republished list; payment is from distributions after acceptance. If refused or unanswered for ten working days after applying, apply to the Bankruptcy Court, which determines the request within ten working days. Admission does not reopen earlier distributions."
    },
    "ar": {
      "q": "هل يفقد الدائن مطالبته تلقائياً إذا فات موعد إثباتها في الهيكلة؟",
      "a": "بالمادة 106 يقدم طلب القبول المتأخر إلى الأمين. ويحتاج القبول إلى تصديق محكمة الإفلاس وتعديل القائمة وإعادة نشرها، ويستوفى الدين من التوزيعات اللاحقة للقبول. وعند الرفض أو عدم الرد خلال عشرة أيام عمل من الطلب، يقدم الطلب لمحكمة الإفلاس التي تفصل فيه خلال عشرة أيام عمل. ولا يعيد القبول التوزيعات السابقة."
    },
    "sources": [
      {
        "en": "Law 51/2023, Article 106",
        "ar": "القانون 51 لسنة 2023، المادة 106",
        "href": "https://uaelegislation.gov.ae/ar/legislations/2190/download"
      }
    ],
    "includeOnServicePage": false
  },
  {
    "region": "uae",
    "service": "insolvency-restructuring",
    "problems": [
      "business-debt-restructuring"
    ],
    "id": "uae-insolvency-plan-preparation",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Who prepares the restructuring plan and when is it filed?",
      "a": "Under Article 107 the debtor prepares the plan under trustee supervision and deposits it with the Bankruptcy Department within three months of opening. The court may extend the period; an extension taking preparation beyond six months needs the required majority’s approval. Creditor approval and court ratification remain separate stages: filing a proposal does not itself bind every creditor."
    },
    "ar": {
      "q": "من يعد خطة الهيكلة ومتى تودع؟",
      "a": "بالمادة 107 يعد المدين الخطة تحت إشراف الأمين ويودعها لدى إدارة الإفلاس خلال ثلاثة أشهر من الافتتاح. ويجوز للمحكمة التمديد، لكن تجاوز الإعداد ستة أشهر يحتاج موافقة الأغلبية المطلوبة. وتبقى موافقة الدائنين وتصديق المحكمة مرحلتين منفصلتين؛ فلا يلزم مجرد إيداع المقترح جميع الدائنين."
    },
    "sources": [
      {
        "en": "Law 51/2023, Article 107",
        "ar": "القانون 51 لسنة 2023، المادة 107",
        "href": "https://uaelegislation.gov.ae/ar/legislations/2190/download"
      }
    ],
    "includeOnServicePage": false
  },
  {
    "region": "uae",
    "service": "insolvency-restructuring",
    "problems": [
      "director-liability-in-insolvency"
    ],
    "id": "uae-insolvency-director-acts",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Which conduct can trigger Article 246 director liability?",
      "a": "The provision identifies poorly assessed transactions used to avoid or delay bankruptcy, transfers for no or inadequate value without proportionate benefit, paying creditors with intent to harm others, and proven mismanagement causing deterioration where assets cannot cover at least 20% of debts. The conduct must fall within the two years before cessation of payment. The 20% figure alone is not proof of fault."
    },
    "ar": {
      "q": "ما الأفعال التي قد تقيم مسؤولية المدير بالمادة 246؟",
      "a": "تحدد المادة أساليب تجارية غير مدروسة لتجنب الإفلاس أو تأخيره، والتصرف بلا مقابل أو بمقابل غير كاف دون منفعة متناسبة، والوفاء بقصد الإضرار بدائنين آخرين، وتقصيراً إدارياً ثابتاً سبب التدهور مع عدم كفاية الموجودات لوفاء 20% على الأقل من الديون. ويلزم وقوع الأفعال خلال السنتين قبل التوقف عن السداد. ولا تثبت نسبة 20% وحدها الخطأ."
    },
    "sources": [
      {
        "en": "Law 51/2023, Article 246(1)",
        "ar": "القانون 51 لسنة 2023، المادة 246(1)",
        "href": "https://uaelegislation.gov.ae/ar/legislations/2190/download"
      }
    ],
    "includeOnServicePage": false
  },
  {
    "region": "uae",
    "service": "insolvency-restructuring",
    "problems": [
      "director-liability-in-insolvency"
    ],
    "id": "uae-insolvency-director-application-defence",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Who brings the director-liability claim and what timing and defence matter?",
      "a": "Following company bankruptcy, Article 246 permits a trustee, creditor or the Unit for a regulated debtor to request proportionate liability from the Bankruptcy Court. The liability action must be brought within two years of the bankruptcy judgment. Proven written reservation against the relevant acts provides an express exemption. Preserve contemporaneous reservations, minutes and loss-reduction measures; do not confuse the filing limit with the earlier conduct lookback."
    },
    "ar": {
      "q": "من يقيم دعوى مسؤولية المدير وما الميعاد والدفاع المهم؟",
      "a": "بعد إفلاس الشركة تجيز المادة 246 للأمين أو الدائن أو الوحدة للمدين الخاضع للرقابة طلب المسؤولية المتناسبة أمام محكمة الإفلاس. وتقام الدعوى خلال سنتين من حكم الإفلاس. وتنص على إعفاء من يثبت تحفظه كتابة على الأفعال المعنية. احفظ التحفظات والمحاضر وإجراءات تقليل الخسائر المعاصرة؛ ولا تخلط ميعاد الدعوى بمدة الرجوع السابقة للأفعال."
    },
    "sources": [
      {
        "en": "Law 51/2023, Article 246(1), (3) and (4)",
        "ar": "القانون 51 لسنة 2023، المادة 246(1 و3 و4)",
        "href": "https://uaelegislation.gov.ae/ar/legislations/2190/download"
      }
    ],
    "includeOnServicePage": false
  },
  {
    "region": "uae",
    "service": "insolvency-restructuring",
    "problems": [
      "business-debt-restructuring"
    ],
    "id": "uae-insolvency-personal-route-boundary",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "What if the debts are personal rather than those of a business trader?",
      "a": "The separate natural-person insolvency framework is Decree-Law 19/2019; do not simply use the business-law debt thresholds. Its settlement application goes to the competent court and includes income and expected twelve-month liquidity, creditors and guarantees, assets inside and outside the UAE, and existing proceedings. Confirm which regime covers the debtor and each liability; this is not an automatic debt write-off."
    },
    "ar": {
      "q": "ماذا إن كانت الديون شخصية وليست ديون تاجر؟",
      "a": "للشخص الطبيعي إطار إعسار مستقل بالمرسوم بقانون 19 لسنة 2019؛ فلا تستخدم حدود ديون قانون الأعمال تلقائياً. ويقدم طلب التسوية للمحكمة المختصة مع الدخل والسيولة المتوقعة لاثني عشر شهراً والدائنين والضمانات والأموال داخل الدولة وخارجها والإجراءات القائمة. تحقق من نظام المدين وكل التزام؛ وليس ذلك إسقاطاً تلقائياً للدين."
    },
    "sources": [
      {
        "en": "Natural-Person Insolvency Law 19/2019, Articles 1–3",
        "ar": "قانون الإعسار 19 لسنة 2019، المواد 1 إلى 3",
        "href": "https://uaelegislation.gov.ae/en/legislations/1032/download"
      }
    ],
    "includeOnServicePage": true
  },
  {
    "region": "uae",
    "service": "insolvency-restructuring",
    "problems": [
      "business-debt-restructuring",
      "creditor-claim-in-insolvency"
    ],
    "id": "uae-insolvency-voting-majority",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Does a majority of creditor headcount approve a restructuring plan?",
      "a": "The ordinary required-majority definition uses debt value, with voting by the relevant creditor classes: attendance must represent more than half the debts and approval must represent two-thirds of the debts represented at the meeting. Quorum and approval are different tests. The small-debtor procedure has a separate voting rule; a single formula must not be applied to every case."
    },
    "ar": {
      "q": "هل تكفي أغلبية عدد الدائنين لاعتماد خطة الهيكلة؟",
      "a": "تعتمد الأغلبية المطلوبة في المسار المعتاد على قيمة الديون مع التصويت بحسب فئات الدائنين المعنية: يمثل الحاضرون أكثر من نصف الديون، وتمثل الموافقة ثلثي الديون الممثلة في الاجتماع. فنصاب الحضور غير نسبة الموافقة. ولإجراءات صغار المدينين قاعدة تصويت خاصة؛ فلا تطبق صيغة واحدة على كل القضايا."
    },
    "sources": [
      {
        "en": "Law 51/2023, Article 1 required-majority definition",
        "ar": "القانون 51 لسنة 2023، تعريف الأغلبية المطلوبة بالمادة 1",
        "href": "https://uaelegislation.gov.ae/ar/legislations/2190/download"
      }
    ],
    "includeOnServicePage": false
  },
  {
    "region": "uae",
    "service": "insolvency-restructuring",
    "problems": [
      "business-debt-restructuring"
    ],
    "id": "uae-insolvency-rejected-plan",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Does creditor rejection necessarily end a restructuring proposal?",
      "a": "No. Article 114(3) permits court ratification on the debtor’s request despite rejection if creditor rights are no less than they would receive in bankruptcy, after considering the trustee’s observations and hearing creditor objections. Ratification is a court decision subject to the statutory conditions, not an automatic consequence of presenting a viable proposal."
    },
    "ar": {
      "q": "هل ينهي رفض الدائنين مقترح الهيكلة بالضرورة؟",
      "a": "لا. تتيح المادة 114(3) التصديق بطلب المدين رغم الرفض إذا لم تقل حقوق الدائنين عما يحصلون عليه في الإفلاس، بعد أخذ ملاحظات الأمين وسماع اعتراضات الدائنين. فالتصديق قرار للمحكمة بشروطه القانونية، وليس نتيجة تلقائية لتقديم مقترح قابل للتنفيذ."
    },
    "sources": [
      {
        "en": "Law 51/2023, Article 114(3)",
        "ar": "القانون 51 لسنة 2023، المادة 114(3)",
        "href": "https://uaelegislation.gov.ae/ar/legislations/2190/download"
      }
    ],
    "includeOnServicePage": false
  },
  {
    "region": "uae",
    "service": "insolvency-restructuring",
    "problems": [
      "creditor-claim-in-insolvency"
    ],
    "id": "uae-insolvency-claim-objection",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "How do I object to the restructuring debt list?",
      "a": "Under Article 101, the debtor and every creditor, including an omitted creditor, may file a grievance with the Bankruptcy Department within ten working days of announcement of the list. The Bankruptcy Court decides it. Article 103 allows provisional admission at an estimated amount pending the grievance or appeal, except where a criminal case has been filed concerning the debt; Article 105 reserves the relevant distribution pending determination."
    },
    "ar": {
      "q": "كيف أعترض على قائمة ديون الهيكلة؟",
      "a": "بالمادة 101 يجوز للمدين ولكل دائن ولو لم يدرج بالقائمة تقديم التظلم لإدارة الإفلاس خلال عشرة أيام عمل من إعلان القائمة، وتفصل فيه محكمة الإفلاس. وتتيح المادة 103 قبولاً مؤقتاً بمبلغ مقدر لحين الفصل في التظلم أو الاستئناف، إلا إذا أقيمت دعوى جزائية بشأن الدين، وتحفظ المادة 105 حصة التوزيع المعنية لحين الفصل."
    },
    "sources": [
      {
        "en": "Law 51/2023, Articles 101, 103 and 105",
        "ar": "القانون 51 لسنة 2023، المواد 101 و103 و105",
        "href": "https://uaelegislation.gov.ae/ar/legislations/2190/download"
      }
    ],
    "includeOnServicePage": false
  },
  {
    "region": "uae",
    "service": "insolvency-restructuring",
    "problems": [
      "business-debt-restructuring",
      "creditor-claim-in-insolvency"
    ],
    "id": "uae-insolvency-secured-execution",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Can a secured creditor enforce collateral during the collective procedure?",
      "a": "Articles 213–216 require Bankruptcy Court permission. Following notification of the request, the debtor, trustee or relevant Unit may object within ten working days, including where execution would prevent a viable plan or cause greater harm to the debtor and creditors than refusal would cause the secured creditor. The court may refuse permission to preserve a going-concern sale in creditors’ interests. Security does not mean unrestricted individual execution."
    },
    "ar": {
      "q": "هل ينفذ الدائن المضمون على الضمان أثناء الإجراء الجماعي؟",
      "a": "تستلزم المواد 213 إلى 216 إذن محكمة الإفلاس. وبعد إخطار طلب الإذن يجوز للمدين أو الأمين أو الوحدة المعنية الاعتراض خلال عشرة أيام عمل، ومن أسبابه تعطيل خطة قابلة للتنفيذ أو إلحاق ضرر بالمدين والدائنين أكبر من ضرر الرفض على صاحب الضمان. وقد ترفض المحكمة الإذن حفاظاً على البيع كنشاط قائم لمصلحة الدائنين. فلا يعني الضمان حرية التنفيذ الفردي دون قيد."
    },
    "sources": [
      {
        "en": "Law 51/2023, Articles 213–216",
        "ar": "القانون 51 لسنة 2023، المواد 213 إلى 216",
        "href": "https://uaelegislation.gov.ae/ar/legislations/2190/download"
      }
    ],
    "includeOnServicePage": false
  },
  {
    "region": "uae",
    "service": "insolvency-restructuring",
    "problems": [
      "creditor-claim-in-insolvency"
    ],
    "id": "uae-insolvency-distribution-priority",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Who receives liquidation proceeds first?",
      "a": "Article 179 pays secured creditors from their collateral after reasonable sale and trustee costs; any shortfall ranks as ordinary debt. Statutory privileged debts then precede ordinary debt. Their ordered categories include court and common-benefit costs, court-ordered maintenance, government dues, qualifying employee dues, appointed-expert fees and qualifying continuation expenses. Employee priority has a three-month salary cap for the specified entitlements. Claims within each privileged category rank equally and are reduced proportionately if funds are insufficient."
    },
    "ar": {
      "q": "من يستوفي حصيلة التصفية أولاً؟",
      "a": "تخصص المادة 179 حصيلة الضمان لصاحبه بعد مصروفات البيع والأمين المعقولة، ويعامل العجز كدين عادي. ثم تتقدم الديون الممتازة على العادية. وتشمل فئاتها المرتبة المصروفات القضائية والمصلحة المشتركة، والنفقة المحكوم بها، ومستحقات الحكومة، ومستحقات العاملين المؤهلة، وأتعاب الخبراء المعينين، ونفقات الاستمرار المؤهلة. ولامتياز مستحقات العاملين المحددة حد يعادل راتب ثلاثة أشهر. وتتساوى الديون داخل كل فئة ممتازة وتخفض نسبياً عند عدم كفاية المال."
    },
    "sources": [
      {
        "en": "Law 51/2023, Article 179",
        "ar": "القانون 51 لسنة 2023، المادة 179",
        "href": "https://uaelegislation.gov.ae/ar/legislations/2190/download"
      }
    ],
    "includeOnServicePage": false
  },
  {
    "region": "uae",
    "service": "insolvency-restructuring",
    "problems": [
      "business-debt-restructuring",
      "creditor-claim-in-insolvency"
    ],
    "id": "uae-insolvency-small-debtor",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "When can the small-debtor procedure change the ordinary timetable and vote?",
      "a": "After inventory, Executive Article 18 uses assets not exceeding AED 1 million for a natural person or AED 2 million for a legal person. If the court applies Article 247, ordinary periods are halved unless it decides otherwise, and approval requires a majority by number and value of participating voting creditors. These asset limits differ from the debt thresholds for opening a case."
    },
    "ar": {
      "q": "متى تغير إجراءات صغار المدينين المدد والتصويت المعتادين؟",
      "a": "بعد الجرد تعتمد المادة التنفيذية 18 أموالاً لا تتجاوز مليون درهم للشخص الطبيعي أو مليوني درهم للشخص الاعتباري. وإذا طبقت المحكمة المادة 247 تنصف المدد المعتادة ما لم تقرر خلاف ذلك، وتتطلب الموافقة أغلبية عدد وقيمة الدائنين المشاركين في التصويت. وهذه حدود للأموال تختلف عن حدود الدين اللازمة لافتتاح القضية."
    },
    "sources": [
      {
        "en": "Law 51/2023, Article 247; Executive 94/2024, Article 18",
        "ar": "القانون 51 لسنة 2023، المادة 247؛ اللائحة 94 لسنة 2024، المادة 18",
        "href": "https://uaelegislation.gov.ae/ar/legislations/2190/download"
      },
      {
        "en": "Executive Regulations 94/2024, Article 18",
        "ar": "اللائحة التنفيذية 94 لسنة 2024، المادة 18",
        "href": "https://www.uaelegislation.gov.ae/en/legislations/2582/download"
      }
    ],
    "includeOnServicePage": false
  },
  {
    "region": "uae",
    "service": "insolvency-restructuring",
    "problems": [
      "director-liability-in-insolvency"
    ],
    "id": "uae-insolvency-precautions-evidence",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "What evidence matters when a director says they tried to reduce losses?",
      "a": "Article 246(2) requires proof of all precautions a reasonable person could take to reduce potential losses to company assets and creditors. Contemporaneous cash-flow reviews, board minutes, valuations and mitigation records can support that evidence. Paragraph 4 expressly exempts a person who proves a written reservation against the acts. A general assertion of good intentions does not establish either evidential requirement; the paragraph 2 wording must not be converted into a blanket promise of personal immunity."
    },
    "ar": {
      "q": "ما الدليل المهم عندما يقول المدير إنه حاول تقليل الخسائر؟",
      "a": "تطلب المادة 246(2) إثبات جميع الاحتياطات التي يمكن للشخص المعتاد اتخاذها لتقليص الخسائر المحتملة على أموال الشركة ودائنيها. وقد تدعم ذلك مراجعات التدفق النقدي والمحاضر والتقييمات وسجلات المعالجة المعاصرة. وتعفي الفقرة 4 صراحة من يثبت تحفظه كتابة على الأفعال. ولا يحقق مجرد القول بحسن النية متطلبات الإثبات، ولا تحول صياغة الفقرة 2 إلى وعد بإعفاء شخصي شامل."
    },
    "sources": [
      {
        "en": "Law 51/2023, Article 246(2) and (4)",
        "ar": "القانون 51 لسنة 2023، المادة 246(2 و4)",
        "href": "https://uaelegislation.gov.ae/ar/legislations/2190/download"
      }
    ],
    "includeOnServicePage": false
  },
  {
    "region": "uae",
    "service": "insolvency-restructuring",
    "problems": [
      "business-debt-restructuring"
    ],
    "id": "uae-insolvency-preventive-financing",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Can the debtor obtain finance during settlement or restructuring?",
      "a": "Article 62 permits borrowing or facilities before the opening decision as described in the opening application or a later request to the Bankruptcy Department. After opening, financing must be included in the proposal or approved by the required majority unless the court decides otherwise, and the lender must be told of the preventive-settlement proceedings. Court-authorised priority finance has additional conditions; ordinary borrowing does not automatically outrank existing security. Article 94 applies these financing rules to restructuring. Under Article 62(3)–(5), court-authorised necessary finance may outrank ordinary debt if it does not harm common creditor interests or the procedure; equal or senior ranking over existing collateral requires the prior secured creditors’ consent."
    },
    "ar": {
      "q": "هل يجوز تمويل المدين أثناء التسوية أو الهيكلة؟",
      "a": "تجيز المادة 62 الاقتراض أو التسهيلات قبل قرار الافتتاح وفق الطلب الأصلي أو طلب لاحق لإدارة الإفلاس. وبعد الافتتاح يلزم النص عليه في المقترح أو موافقة الأغلبية المطلوبة ما لم تقرر المحكمة خلاف ذلك، مع إخطار الممول بالخضوع للتسوية الوقائية. وللتمويل ذي الأولوية بإذن المحكمة شروط إضافية؛ فلا يتقدم الاقتراض المعتاد تلقائياً على الضمانات القائمة. وتطبق المادة 94 هذه الأحكام على الهيكلة. وبالمادة 62(3 إلى 5) قد يتقدم التمويل الضروري بإذن المحكمة على الدين العادي إن لم يضر بالمصلحة المشتركة أو الإجراء؛ وتستلزم مساواة الرهن الجديد بالقائم أو تقدمه عليه موافقة أصحاب الرهون السابقين."
    },
    "sources": [
      {
        "en": "Law 51/2023, Articles 62 and 94",
        "ar": "القانون 51 لسنة 2023، المادتان 62 و94",
        "href": "https://uaelegislation.gov.ae/ar/legislations/2190/download"
      }
    ],
    "includeOnServicePage": false
  },
  {
    "region": "uae",
    "service": "insolvency-restructuring",
    "problems": [
      "creditor-claim-in-insolvency"
    ],
    "id": "uae-insolvency-liquidation-proof",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Must a creditor update its claim when restructuring turns into liquidation?",
      "a": "Article 122 requires a trustee-prepared court-approved list if none exists. If a list already exists, the trustee calls for any previously unsubmitted final claims within ten working days of notification; the invitation may be published. A later claim needs a reason accepted by the Bankruptcy Court. Article 123 excludes claims finally rejected by that court. Do not assume the earlier restructuring invitation is the only relevant notice."
    },
    "ar": {
      "q": "هل يحدث الدائن مطالبته عند انتقال الهيكلة إلى التصفية؟",
      "a": "تطلب المادة 122 قائمة يعدها الأمين وتعتمدها المحكمة إن لم توجد قائمة سابقة. وإذا وجدت، يدعو الأمين لتقديم المطالبات النهائية التي لم تقدم من قبل خلال عشرة أيام عمل من الإخطار، ويجوز نشر الدعوة. وتحتاج المطالبة اللاحقة إلى سبب تقبله محكمة الإفلاس. وتستبعد المادة 123 ما رفضته المحكمة نهائياً. فلا تفترض أن دعوة الهيكلة السابقة هي الإخطار الوحيد المهم."
    },
    "sources": [
      {
        "en": "Law 51/2023, Articles 122–123",
        "ar": "القانون 51 لسنة 2023، المادتان 122 و123",
        "href": "https://uaelegislation.gov.ae/ar/legislations/2190/download"
      }
    ],
    "includeOnServicePage": false
  },
  {
    "region": "uae",
    "service": "insolvency-restructuring",
    "problems": [
      "business-debt-restructuring"
    ],
    "id": "uae-insolvency-eligibility-repeat-application",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Can a viable business apply again after a failed restructuring?",
      "a": "Article 87 requires a business capable of continuing and the statutory financial-distress conditions. Following creditor rejection, refusal of ratification or termination, the ordinary waiting period is three months. A final bankruptcy judgment normally requires rehabilitation first; an application during bankruptcy must evidence renewed viability. Article 87(3) permits an application at any time despite those specified restrictions when evidence of the required majority’s approval of the proposed plan is attached. The opening debt thresholds and other application requirements still matter."
    },
    "ar": {
      "q": "هل تعيد المنشأة القابلة للاستمرار الطلب بعد فشل الهيكلة؟",
      "a": "تتطلب المادة 87 قابلية الأعمال للاستمرار وشروط التعثر القانونية. وبعد رفض الدائنين أو رفض التصديق أو إنهاء الهيكلة تكون مدة الانتظار المعتادة ثلاثة أشهر. ويستلزم الحكم النهائي بالإفلاس عادة رد الاعتبار أولاً، ويحتاج الطلب أثناء الإفلاس إلى دليل تجدد قابلية الاستمرار. وتجيز المادة 87(3) التقديم في أي وقت استثناء من هذه القيود المحددة مع إثبات موافقة الأغلبية المطلوبة على الخطة المقدمة. وتبقى حدود دين الافتتاح وسائر متطلبات الطلب معتبرة."
    },
    "sources": [
      {
        "en": "Law 51/2023, Article 87",
        "ar": "القانون 51 لسنة 2023، المادة 87",
        "href": "https://uaelegislation.gov.ae/ar/legislations/2190/download"
      }
    ],
    "includeOnServicePage": false
  }
];
