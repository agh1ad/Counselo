import type { MatterSourceGuidance } from "./matter-source-guidance.js";

// Jurisdiction-scoped answers; no complete-intent coverage certification.
export const UAE_FAMILY_PROPERTY_SEARCH_GUIDANCE: MatterSourceGuidance[] = [
  {
    "region": "uae",
    "service": "family-personal-status",
    "problems": [
      "divorce-filing-and-personal-status-procedure"
    ],
    "id": "uae-civil-divorce-no-fault",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Does a federal civil divorce require proof that the other spouse was at fault?",
      "a": "Under the federal civil personal-status framework, either spouse may ask the court to end the marriage without proving fault. First establish that this framework applies; the general Personal Status Law and Abu Dhabi civil-family procedures must not be treated as identical. Custody and financial applications remain separate questions."
    },
    "ar": {
      "q": "هل يتطلب الطلاق المدني الاتحادي إثبات خطأ الزوج الآخر؟",
      "a": "يتيح إطار الأحوال الشخصية المدني الاتحادي لأي من الزوجين طلب إنهاء الزواج قضائياً دون إثبات الخطأ. تحقّق أولاً من انطباقه؛ فلا يتطابق مع قانون الأحوال الشخصية العام أو إجراءات الأسرة المدنية في أبوظبي. وتبقى طلبات الحضانة والمال مسائل مستقلة."
    },
    "sources": [
      {
        "en": "UAE Government — federal civil divorce and related claims",
        "ar": "حكومة الإمارات — الطلاق المدني الاتحادي والطلبات المرتبطة",
        "href": "https://u.ae/en/information-and-services/social-affairs/divorce-in-the-uae"
      }
    ],
    "includeOnServicePage": true
  },
  {
    "region": "uae",
    "service": "family-personal-status",
    "problems": [
      "alimony-and-child-maintenance-claim"
    ],
    "id": "uae-temporary-family-maintenance",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Can temporary maintenance be requested before the final family judgment?",
      "a": "Where Federal Decree-Law 41 of 2024 applies, Article 100 permits the court, at the wife’s request during the maintenance case, to order temporary support for her and her children, immediately enforceable by law. It is a court decision, not an automatic sum; document needs, payments and the applicable family regime."
    },
    "ar": {
      "q": "هل يمكن طلب نفقة مؤقتة قبل الحكم النهائي؟",
      "a": "عند انطباق المرسوم بقانون 41 لسنة 2024، تجيز المادة 100 للمحكمة أثناء دعوى النفقة، بناءً على طلب الزوجة، تقرير نفقة مؤقتة لها ولأولادها واجبة النفاذ فوراً بقوة القانون. ليست مبلغاً تلقائياً؛ وثّق الاحتياجات والمدفوعات والنظام الأسري المنطبق."
    },
    "sources": [
      {
        "en": "UAE Legislation — Personal Status Law, Article 100",
        "ar": "تشريعات الإمارات — قانون الأحوال الشخصية، المادة 100",
        "href": "https://uaelegislation.gov.ae/en/legislations/2770/download"
      }
    ]
  },
  {
    "region": "uae",
    "service": "family-personal-status",
    "problems": [
      "child-custody-and-visitation-dispute"
    ],
    "id": "uae-custody-age-and-interest",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Does custody under the current general UAE Personal Status Law end at the old age limits?",
      "a": "Articles 122–123 of the 2024 law provide for a child’s choice of residence with a parent at 15, subject to the child’s interests, and ordinarily end custody at 18 Gregorian years, with specified disability-related exceptions. These are not universal rules for every civil non-Muslim or foreign-law case."
    },
    "ar": {
      "q": "هل تنتهي الحضانة في قانون الأحوال الشخصية الإماراتي الحالي بالأعمار القديمة؟",
      "a": "تقرر المادتان 122 و123 من قانون 2024 اختيار المحضون الإقامة لدى أحد والديه عند 15 سنة مع مراعاة مصلحته، وانتهاء الحضانة عادةً عند 18 سنة ميلادية مع استثناءات متعلقة بالعجز. ولا تُعمم هذه القواعد على كل قضية مدنية لغير المسلمين أو خاضعة لقانون أجنبي."
    },
    "sources": [
      {
        "en": "UAE Legislation — Personal Status Law, Articles 122–123",
        "ar": "تشريعات الإمارات — قانون الأحوال الشخصية، المادتان 122 و123",
        "href": "https://uaelegislation.gov.ae/en/legislations/2770/download"
      }
    ]
  },
  {
    "region": "uae",
    "service": "family-personal-status",
    "problems": [
      "child-relocation-and-travel-dispute",
      "child-custody-and-visitation-dispute"
    ],
    "id": "uae-civil-joint-custody-travel",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Can one parent take a child abroad over the other’s objection during federal civil joint custody?",
      "a": "Article 21 of the civil personal-status Executive Regulation requires judicial permission where the other parent objects; the court may require return guarantees. Article 22 also allows an application for a temporary travel restriction after divorce. A passport or shared custody alone is not permission for unilateral travel or permanent relocation."
    },
    "ar": {
      "q": "هل يسافر أحد الوالدين بالمحضون رغم اعتراض الآخر أثناء الحضانة المدنية المشتركة؟",
      "a": "تستلزم المادة 21 من اللائحة التنفيذية للأحوال الشخصية المدني إذن القاضي عند اعتراض الطرف الآخر، وقد تُطلب ضمانات العودة. وتجيز المادة 22 طلب منع مؤقت من السفر بعد الطلاق. امتلاك الجواز أو الحضانة المشتركة لا يجيز وحده السفر المنفرد أو الانتقال الدائم."
    },
    "sources": [
      {
        "en": "UAE Legislation — civil personal-status Executive Regulation, Articles 21–22",
        "ar": "تشريعات الإمارات — اللائحة التنفيذية لقانون الأحوال الشخصية المدني، المادتان 21 و22",
        "href": "https://uaelegislation.gov.ae/en/legislations/2301/download"
      }
    ]
  },
  {
    "region": "uae",
    "service": "family-personal-status",
    "problems": [
      "child-relocation-and-travel-dispute"
    ],
    "id": "uae-custodian-travel-consent",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Is holding the child’s passport enough to travel under the general Personal Status Law?",
      "a": "No. Article 116 of the 2024 law addresses written consent and judicial travel permission; Article 117 treats passport possession separately. Identify the custodian, surviving parents or guardian, proposed dates and any existing order before applying. Permanent relocation also raises custody interests and is not merely a passport-handover request."
    },
    "ar": {
      "q": "هل تكفي حيازة جواز المحضون للسفر وفق قانون الأحوال الشخصية العام؟",
      "a": "لا. تتناول المادة 116 من قانون 2024 الموافقة الخطية والإذن القضائي بالسفر، وتعالج المادة 117 حيازة الجواز بصورة مستقلة. حدّد الحاضن والوالدين أو الولي وتواريخ الرحلة والأوامر القائمة. والانتقال الدائم يثير مصلحة المحضون ولا يقتصر على تسليم الجواز."
    },
    "sources": [
      {
        "en": "UAE Legislation — Personal Status Law, Articles 116–117",
        "ar": "تشريعات الإمارات — قانون الأحوال الشخصية، المادتان 116 و117",
        "href": "https://uaelegislation.gov.ae/en/legislations/2770/download"
      }
    ]
  },
  {
    "region": "uae",
    "service": "family-personal-status",
    "problems": [
      "paternity-dispute"
    ],
    "id": "uae-lineage-dna-court",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Does a private DNA report itself establish or change legal parentage?",
      "a": "The 2024 Personal Status Law places DNA-based proof of lineage within a court-controlled process, including Article 90’s conditions. The federal civil framework also provides a judicial route under Article 14 of its 2022 law. Establishing unknown parentage and disputing an existing legal relationship require separate analysis; do not treat a private test as a corrected civil record."
    },
    "ar": {
      "q": "هل يثبت تقرير فحص وراثي خاص النسب أو يغيّره قانوناً؟",
      "a": "يضع قانون الأحوال الشخصية لعام 2024 إثبات النسب بالفحص الوراثي ضمن مسار قضائي وشروط المادة 90. ويوفر الإطار المدني الاتحادي أيضاً مساراً قضائياً بالمادة 14 من قانون 2022. يختلف إثبات النسب المجهول عن منازعة نسب قائم؛ ولا يُعامل الفحص الخاص كسجل مدني مصحح."
    },
    "sources": [
      {
        "en": "UAE Legislation — Personal Status Law, Article 90",
        "ar": "تشريعات الإمارات — قانون الأحوال الشخصية، المادة 90",
        "href": "https://uaelegislation.gov.ae/en/legislations/2770/download"
      },
      {
        "en": "UAE Legislation — Civil Personal Status Law, Article 14",
        "ar": "تشريعات الإمارات — قانون الأحوال الشخصية المدني، المادة 14",
        "href": "https://uaelegislation.gov.ae/en/legislations/1586/download"
      }
    ]
  },
  {
    "region": "uae",
    "service": "family-personal-status",
    "problems": [
      "visitation-order-enforcement"
    ],
    "id": "uae-abu-dhabi-visitation-enforcement",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "What happens when an Abu Dhabi court-ordered visit does not take place?",
      "a": "ADJD’s visitation service records the reason for non-implementation and reports to the competent enforcement judge. The affected party can request appropriate action through the judicial process. This service concerns qualifying Abu Dhabi orders; preserve the order and each missed appointment rather than changing the schedule unilaterally."
    },
    "ar": {
      "q": "ماذا يحدث عند تعذر تنفيذ زيارة مقررة من محاكم أبوظبي؟",
      "a": "توثّق خدمة الرؤية بدائرة القضاء سبب عدم التنفيذ وترفع تقريراً إلى قاضي التنفيذ المختص. ويستطيع المتضرر طلب الإجراء المناسب قضائياً. تتعلق الخدمة بأوامر أبوظبي المشمولة؛ احفظ الحكم ومواعيد الزيارات الفائتة بدلاً من تعديل الجدول منفرداً."
    },
    "sources": [
      {
        "en": "Abu Dhabi Judicial Department — child visitation and enforcement",
        "ar": "دائرة القضاء في أبوظبي — الرؤية وتنفيذها",
        "href": "https://www.adjd.gov.ae/EN/Pages/FAQs_.aspx"
      }
    ]
  },
  {
    "region": "uae",
    "service": "family-personal-status",
    "problems": [
      "marriage-registration-and-certificate-problem"
    ],
    "id": "uae-marriage-registration-evidence",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "What should I check when a UAE Sharia marriage application is missing documents?",
      "a": "Identify the competent Emirate authority and its exact deficiency notice. Official guidance lists identity documents, marital-status evidence and medical screening; earlier marriages require the relevant final divorce or death record. Foreign documents need the applicable authentication and translation. These Sharia marriage requirements should not be copied automatically into a civil-marriage application."
    },
    "ar": {
      "q": "ما الذي أراجعه عند نقص مستندات طلب زواج شرعي في الإمارات؟",
      "a": "حدّد جهة الإمارة المختصة وإشعار النقص بدقة. يورد الدليل الرسمي وثائق الهوية والحالة الاجتماعية والفحص الطبي؛ ويتطلب الزواج السابق وثيقة الطلاق النهائي أو الوفاة بحسب الحالة. وتحتاج المستندات الأجنبية إلى التصديق والترجمة المنطبقين. لا تُنقل هذه الشروط تلقائياً إلى الزواج المدني."
    },
    "sources": [
      {
        "en": "UAE Government — marriage under Sharia law",
        "ar": "حكومة الإمارات — الزواج وفق الشريعة الإسلامية",
        "href": "https://u.ae/en/information-and-services/social-affairs/marriages/marriage-as-per-the-sharia-law"
      }
    ]
  },
  {
    "region": "uae",
    "service": "family-personal-status",
    "problems": [
      "inheritance-document-and-civil-record-correction"
    ],
    "id": "uae-birth-record-correction",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "If a birth-record mismatch affects inheritance documents, where can the underlying record be corrected?",
      "a": "For an EHS-issued birth certificate, its modification service directs applicants to the issuing public-health centre with supporting documents, including court or embassy evidence where applicable. Obtain the corrected underlying record through the issuing authority. This does not itself amend a court’s heir determination or decide a disputed inheritance share."
    },
    "ar": {
      "q": "أين يُصحح اختلاف شهادة الميلاد المؤثر في مستندات الإرث؟",
      "a": "توجّه خدمة تعديل شهادة الميلاد التابعة لمؤسسة الإمارات للخدمات الصحية مقدم الطلب إلى مركز الصحة العامة الذي أصدرها مع المستندات المؤيدة، ومنها مستندات المحكمة أو السفارة بحسب الحالة. اطلب تصحيح الأصل من مصدره؛ فهذا لا يعدّل وحده حصر الورثة القضائي ولا يفصل في حصة إرث متنازع عليها."
    },
    "sources": [
      {
        "en": "Emirates Health Services — modification of birth certificate details",
        "ar": "مؤسسة الإمارات للخدمات الصحية — تعديل بيانات شهادة الميلاد",
        "href": "https://www.ehs.gov.ae/Handlers/DownloadPDF.ashx?id=32761"
      }
    ]
  },
  {
    "region": "uae",
    "service": "family-personal-status",
    "problems": [
      "recognition-of-foreign-family-judgment"
    ],
    "id": "uae-foreign-family-enforcement-check",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Can a foreign family judgment simply be filed as if it were a UAE judgment?",
      "a": "Foreign-judgment enforcement follows a separate process. Federal Civil Procedure Article 222 requires checks including jurisdiction and proper service or representation. Identify whether you seek status recognition, money enforcement or a child-related measure, and check applicable treaties and the relevant court procedure. An authenticated copy alone does not establish enforceability."
    },
    "ar": {
      "q": "هل يُودع الحكم الأسري الأجنبي كما لو كان حكماً إماراتياً؟",
      "a": "لتنفيذ الحكم الأجنبي مسار مستقل. تتطلب المادة 222 من الإجراءات المدنية الاتحادية التحقق، ضمن شروطها، من الاختصاص وصحة التكليف بالحضور أو التمثيل. حدّد هل المطلوب إثبات الحالة أم تنفيذ مبلغ أم إجراء يخص الطفل، وراجع الاتفاقيات وإجراء المحكمة. النسخة المصدقة وحدها لا تثبت قابلية التنفيذ."
    },
    "sources": [
      {
        "en": "UAE Legislation — Civil Procedure Law, Article 222",
        "ar": "تشريعات الإمارات — قانون الإجراءات المدنية، المادة 222",
        "href": "https://uaelegislation.gov.ae/en/legislations/1602/download"
      }
    ]
  },
  {
    "region": "uae",
    "service": "real-estate-construction",
    "problems": [
      "eviction-notice-and-eviction-dispute",
      "landlord-notice-and-tenant-settlement-problem"
    ],
    "id": "dubai-eviction-ground-notice",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Is every Dubai eviction notice governed by a twelve-month period?",
      "a": "No. The twelve-month notice concerns specified end-of-tenancy grounds, such as sale or personal use, and must state the ground through the prescribed notification channel. Non-payment has a different notice route. Check the stated ground, service evidence and dates; an eviction notice is not itself an eviction judgment."
    },
    "ar": {
      "q": "هل تخضع كل إنذارات الإخلاء في دبي لمهلة اثني عشر شهراً؟",
      "a": "لا. تتعلق مهلة الاثني عشر شهراً بأسباب محددة عند انتهاء الإيجار، مثل البيع أو الاستعمال الشخصي، مع بيان السبب والتبليغ بالطريق المقرر. ولعدم الدفع مسار إنذار مختلف. افحص السبب وإثبات التبليغ والتواريخ؛ فالإنذار ليس حكماً بالإخلاء."
    },
    "sources": [
      {
        "en": "Dubai Land Department — eviction grounds and notice",
        "ar": "دائرة الأراضي والأملاك في دبي — أسباب الإخلاء والإنذار",
        "href": "https://dubailand.gov.ae/en/frequently-asked-questions"
      }
    ],
    "includeOnServicePage": true
  },
  {
    "region": "uae",
    "service": "real-estate-construction",
    "problems": [
      "unpaid-rent-and-rental-payment-claim",
      "eviction-notice-and-eviction-dispute"
    ],
    "id": "dubai-unpaid-rent-notice",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Does an overdue Dubai rent payment permit immediate eviction?",
      "a": "Dubai tenancy legislation provides a non-payment ground after the tenant fails to pay within thirty days of service of the payment notice, unless otherwise agreed. Reconcile payment and notice records before filing or responding. Recovery of rent and eviction are distinct requests; this Dubai period is not a rule for every Emirate."
    },
    "ar": {
      "q": "هل يجيز تأخر إيجار دبي الإخلاء الفوري؟",
      "a": "يقرر تشريع الإيجارات في دبي سبباً للإخلاء عند عدم السداد خلال ثلاثين يوماً من تبليغ المطالبة، ما لم يتفق على خلاف ذلك. طابق الدفعات وسجل التبليغ قبل رفع الطلب أو الرد. تحصيل الأجرة والإخلاء طلبان مختلفان، ولا تُعمم مهلة دبي على كل إمارة."
    },
    "sources": [
      {
        "en": "Dubai Land Department — tenancy legislation, Article 25",
        "ar": "دائرة الأراضي والأملاك في دبي — تشريع الإيجارات، المادة 25",
        "href": "https://dubailand.gov.ae/media/x0bf21ii/book.pdf"
      }
    ]
  },
  {
    "region": "uae",
    "service": "real-estate-construction",
    "problems": [
      "dubai-tenancy-and-rera-rental-dispute"
    ],
    "id": "dubai-rent-renewal-index",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Does the Dubai rental index alone change the rent payable under my lease?",
      "a": "The index helps assess the permitted renewal increase; it is not a replacement lease or judicial order. Check the Ejari data and the proposed amendment. Unless otherwise agreed, a party seeking to amend tenancy terms must notify the other at least ninety days before expiry. New-letting pricing and renewal disputes are different questions."
    },
    "ar": {
      "q": "هل يغيّر مؤشر إيجارات دبي وحده الأجرة المستحقة في عقدي؟",
      "a": "يساعد المؤشر في تقييم زيادة التجديد المسموح بها، ولا يحل محل العقد أو الحكم. راجع بيانات إيجاري والتعديل المقترح. ما لم يتفق على خلاف ذلك، يُبلّغ طالب تعديل شروط الإيجار الطرف الآخر قبل انتهاء العقد بتسعين يوماً على الأقل. ويختلف تسعير الإيجار الجديد عن نزاع التجديد."
    },
    "sources": [
      {
        "en": "Dubai Rental Disputes Center — tenancy amendment notice",
        "ar": "مركز فض المنازعات الإيجارية في دبي — إشعار تعديل الإيجار",
        "href": "https://rdc.gov.ae/en/frequently-asked-questions/"
      }
    ]
  },
  {
    "region": "uae",
    "service": "real-estate-construction",
    "problems": [
      "security-deposit-recovery"
    ],
    "id": "dubai-deposit-return",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Must the landlord return the entire Dubai rental deposit regardless of property condition?",
      "a": "The landlord must return the deposit or remaining balance at the end of the lease; justified maintenance deductions may be disputed before the competent rental body. Compare move-in and handover condition, ordinary wear and the itemised costs claimed. Neither an unexplained deduction nor a promise of an automatic full refund resolves the evidence."
    },
    "ar": {
      "q": "هل يجب رد كامل تأمين إيجار دبي مهما كانت حالة العقار؟",
      "a": "يلتزم المؤجر برد التأمين أو المتبقي منه عند انتهاء العقد، ويمكن منازعة استقطاعات الصيانة أمام الجهة الإيجارية المختصة. قارن حالة الاستلام والتسليم والاستهلاك العادي والتكاليف المفصلة. فلا يحسم النزاع استقطاع غير مفسر ولا وعد برد كامل تلقائي."
    },
    "sources": [
      {
        "en": "Dubai Land Department — rental deposit return and deductions",
        "ar": "دائرة الأراضي والأملاك في دبي — رد التأمين والاستقطاعات",
        "href": "https://dubailand.gov.ae/en/news-media/tenant-refunded-security-deposit-in-spite-of-the-landlords-procrastination-after-lease-expired/"
      }
    ]
  },
  {
    "region": "uae",
    "service": "real-estate-construction",
    "problems": [
      "bounced-rental-cheque"
    ],
    "id": "dubai-rental-cheque-execution",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Is there a Dubai RDC enforcement service for a dishonoured rental cheque?",
      "a": "Yes. RDC lists a cheque-execution service requiring the recent Ejari lease, cheque and bank return memo, identity and payment-account documents. Verify eligibility, the return reason and any replacement payment before using it. Enforcement of the instrument does not itself decide eviction or every allegation connected with the tenancy."
    },
    "ar": {
      "q": "هل يوجد بمركز فض المنازعات الإيجارية في دبي مسار لتنفيذ شيك الإيجار المرتجع؟",
      "a": "نعم. يتيح المركز خدمة تنفيذ الشيكات مع عقد إيجاري حديث وصورة الشيك ومذكرة الإرجاع البنكية ومستندات الهوية وحساب السداد. تحقّق من الأهلية وسبب الإرجاع وأي دفع بديل قبل استخدامها. تنفيذ الورقة لا يفصل وحده في الإخلاء أو كل ادعاء متعلق بالإيجار."
    },
    "sources": [
      {
        "en": "Dubai Rental Disputes Center — cheque execution",
        "ar": "مركز فض المنازعات الإيجارية في دبي — تنفيذ الشيكات",
        "href": "https://rdc.gov.ae/en/eservices/file-an-execution-cheques/"
      }
    ]
  },
  {
    "region": "uae",
    "service": "real-estate-construction",
    "problems": [
      "landlord-notice-and-tenant-settlement-problem"
    ],
    "id": "dubai-rental-settlement-enforcement",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Can a Dubai RDC settlement be enforced if the other party later refuses to comply?",
      "a": "RDC describes conciliation signed by the parties and conciliator and approved by the supervising judge as enforceable at the Center. Submit the lease, identity and supporting payment or notice records through the relevant service. A draft settlement exchanged privately has not completed that approval process."
    },
    "ar": {
      "q": "هل يمكن تنفيذ تسوية مركز فض المنازعات الإيجارية في دبي إذا امتنع الطرف الآخر؟",
      "a": "يصف المركز الصلح الموقع من الأطراف والمصلح والمعتمد من القاضي المشرف بأنه قابل للتنفيذ لديه. قدّم العقد والهوية ومستندات السداد أو الإنذار المؤيدة عبر الخدمة المناسبة. أما مسودة التسوية المتبادلة على نحو خاص فلم تستكمل هذا الاعتماد."
    },
    "sources": [
      {
        "en": "Dubai Rental Disputes Center — approved amicable settlement",
        "ar": "مركز فض المنازعات الإيجارية في دبي — الصلح المعتمد",
        "href": "https://rdc.gov.ae/en/eservices/dispute-lawsuit-for-amicable-settlement/"
      }
    ]
  },
  {
    "region": "uae",
    "service": "real-estate-construction",
    "problems": [
      "property-service-charge-and-maintenance-dispute"
    ],
    "id": "dubai-approved-service-charges",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "How can I check the approved charge behind a Dubai jointly owned property invoice?",
      "a": "Mollak’s service-charge index shows the RERA-approved community rate. Match the project, year, unit area and invoice components before disputing the amount with the management entity. An approved rate does not itself resolve who must pay under a particular lease or whether an individual maintenance claim is justified."
    },
    "ar": {
      "q": "كيف أتحقق من الرسم المعتمد وراء فاتورة خدمات عقار مشترك في دبي؟",
      "a": "يعرض مؤشر مُلّاك معدل رسوم المجمع المعتمد من ريرا. طابق المشروع والسنة ومساحة الوحدة وعناصر الفاتورة قبل منازعة المبلغ مع جهة الإدارة. ولا يحسم اعتماد المعدل وحده من يتحمل الرسم في عقد إيجار معين أو صحة مطالبة صيانة فردية."
    },
    "sources": [
      {
        "en": "Dubai Land Department — Mollak service-charge index",
        "ar": "دائرة الأراضي والأملاك في دبي — مؤشر رسوم خدمات مُلّاك",
        "href": "https://mollak.dubailand.gov.ae/"
      }
    ]
  },
  {
    "region": "uae",
    "service": "real-estate-construction",
    "problems": [
      "property-encroachment-and-boundary-dispute"
    ],
    "id": "dubai-boundary-survey",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Can Dubai Land Department measure the property when a boundary is disputed?",
      "a": "DLD offers a real-estate survey: the owner applies, the Survey Department reviews the request, arranges site access and measurements, and issues a report. Compare it with registered plans. A survey supplies technical evidence; it is not itself a judgment ordering removal of a neighbour’s structure."
    },
    "ar": {
      "q": "هل يمكن لدائرة الأراضي في دبي قياس العقار عند نزاع الحدود؟",
      "a": "تتيح الدائرة مسحاً عقارياً بطلب المالك، تراجعه إدارة المساحة ثم تحدد الزيارة وتأخذ القياسات وتصدر التقرير، مع إتاحة دخول الموقع. قارنه بالمخططات المسجلة. التقرير دليل فني وليس حكماً بإزالة منشأة الجار."
    },
    "sources": [
      {
        "en": "Dubai Land Department — real-estate survey",
        "ar": "دائرة الأراضي والأملاك في دبي — المسح العقاري",
        "href": "https://dubailand.gov.ae/en/eservices/request-for-real-estate-survey/"
      }
    ]
  },
  {
    "region": "uae",
    "service": "real-estate-construction",
    "problems": [
      "title-deed-and-registration-dispute"
    ],
    "id": "dubai-title-data-correction",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Can an incorrect name or identity detail on a Dubai title deed be corrected administratively?",
      "a": "DLD’s title-deed modification service covers specified ownership-data corrections, including name, nationality and passport details. Owners or authorised representatives submit the supporting identity documents for review. A substantive dispute about who owns the property is different and should not be presented as a simple data correction."
    },
    "ar": {
      "q": "هل يُصحح الاسم أو بيان الهوية الخاطئ في ملكية دبي إدارياً؟",
      "a": "تشمل خدمة تعديل سند الملكية بيانات محددة، منها الاسم والجنسية والجواز، ويقدم المالك أو ممثله المخول مستندات الهوية المؤيدة للمراجعة. أما النزاع الموضوعي على صاحب الحق في العقار فيختلف ولا يُقدّم كتصحيح بيانات بسيط."
    },
    "sources": [
      {
        "en": "Dubai Land Department — title-deed modification",
        "ar": "دائرة الأراضي والأملاك في دبي — تعديل سند الملكية",
        "href": "https://dubailand.gov.ae/en/eservices/title-deed-modification/"
      }
    ]
  },
  {
    "region": "uae",
    "service": "real-estate-construction",
    "problems": [
      "expropriation-and-compensation-claim"
    ],
    "id": "dubai-expropriation-objection-route",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Is a Dubai acquisition-compensation objection the same as challenging implementation of the acquisition?",
      "a": "Dubai Law 2 of 2022 distinguishes the committee procedure for objecting to the compensation amount from a judicial challenge to implementation procedures. Preserve the acquisition decision, valuation and proof of notification and identify the precise objection promptly. Different triggers and procedures apply; a general complaint does not replace the required route."
    },
    "ar": {
      "q": "هل يساوي الاعتراض على تعويض الاستملاك في دبي الطعن في إجراءات تنفيذه؟",
      "a": "يميّز قانون دبي 2 لسنة 2022 مسار اللجنة للاعتراض على مقدار التعويض عن الطعن القضائي في إجراءات التنفيذ. احفظ قرار الاستملاك والتقييم وإثبات التبليغ وحدّد الاعتراض سريعاً. تختلف بدايات المواعيد والإجراءات، ولا تحل الشكوى العامة محل المسار المطلوب."
    },
    "sources": [
      {
        "en": "Dubai Legislation — acquisition for public benefit, Law 2 of 2022",
        "ar": "تشريعات دبي — الاستملاك للمنفعة العامة، قانون 2 لسنة 2022",
        "href": "https://dlp.dubai.gov.ae/Legislation%20Reference/2022/Law%20No.%20%282%29%20of%202022%20Concerning%20Acquisition%20of%20Real%20Property%20for%20Public%20Use.html"
      }
    ]
  },
  {
    "region": "uae",
    "service": "real-estate-construction",
    "problems": [
      "construction-delay-and-defective-construction"
    ],
    "id": "uae-construction-performance-remedy",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Can a construction breach support a request for performance or rescission?",
      "a": "Where the 2025 federal Civil Transactions Law governs, Article 234 allows a court request for performance or rescission after notice of a due, unperformed bilateral obligation, subject to the court’s assessment. Identify the particular delay or defect, contractual remedy process and construction-specific rules; this general provision does not establish a universal defect warranty or automatic damages."
    },
    "ar": {
      "q": "هل يتيح إخلال المقاول طلب التنفيذ أو الفسخ؟",
      "a": "عند انطباق قانون المعاملات المدنية الاتحادي لعام 2025، تجيز المادة 234 طلب التنفيذ أو الفسخ قضائياً بعد إعذار المدين بالتزام حال لم ينفذه في عقد ملزم للجانبين، مع تقدير المحكمة. حدّد التأخير أو العيب وإجراء المعالجة العقدي وأحكام المقاولة الخاصة؛ فلا تقرر القاعدة ضماناً موحداً للعيوب أو تعويضاً تلقائياً."
    },
    "sources": [
      {
        "en": "UAE Legislation — 2025 Civil Transactions Law, Article 234",
        "ar": "تشريعات الإمارات — قانون المعاملات المدنية لعام 2025، المادة 234",
        "href": "https://uaelegislation.gov.ae/en/legislations/4011/download"
      }
    ]
  },
  {
    "region": "uae",
    "service": "family-personal-status",
    "problems": [
      "divorce-filing-and-personal-status-procedure"
    ],
    "id": "uae-family-guidance-current-referral",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": true,
    "en": {
      "q": "Is family counselling mandatory before every UAE personal-status case?",
      "a": "Article 8 of the 2024 general Personal Status Law lets the supervising judge refer a dispute to family guidance where settlement appears feasible. It expressly exempts matters including inheritance, urgent or temporary applications and proceedings to prove marriage or divorce. Establish the claim type and family regime before assuming referral is compulsory."
    },
    "ar": {
      "q": "هل التوجيه الأسري إلزامي قبل كل دعوى أحوال شخصية في الإمارات؟",
      "a": "تجيز المادة 8 من قانون الأحوال الشخصية العام لعام 2024 للقاضي المشرف الإحالة للتوجيه الأسري إذا رأى جدوى الصلح. وتستثني صراحةً مسائل منها الإرث والطلبات المستعجلة أو المؤقتة ودعاوى إثبات الزواج والطلاق. حدّد نوع الطلب والنظام الأسري قبل افتراض إلزامية الإحالة."
    },
    "sources": [
      {
        "en": "UAE Legislation — Personal Status Law, Article 8",
        "ar": "تشريعات الإمارات — قانون الأحوال الشخصية، المادة 8",
        "href": "https://uaelegislation.gov.ae/en/legislations/2770/download"
      }
    ]
  }
];
