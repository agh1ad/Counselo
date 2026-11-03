export type SaudiReviewWorksheet = {
  title: string;
  records: { label: string; prompt: string }[];
  outputs: string[];
  feeFactors: string;
  boundary: string;
};

// Original preparation aids, not legal opinions, forms for filing or client examples.
export const SAUDI_WORKSHEETS_UPDATED_AT = "2026-10-20";
export const SAUDI_REVIEW_WORKSHEETS: Record<string, { ar: SaudiReviewWorksheet; en: SaudiReviewWorksheet }> = {
  "family-law": {
    "ar": {
      "title": "ورقة ترتيب المسألة الأسرية",
      "records": [
        {
          "label": "الطلب والحكم القائم",
          "prompt": "ما المطلوب الآن؟ دوّن تاريخ أي حكم أو اتفاق وما إذا كان قد نُفّذ."
        },
        {
          "label": "السجل المالي أو الأسري",
          "prompt": "اربط كل مبلغ أو واقعة بمستند، وميّز ما تتذكره عما يمكن إثباته."
        },
        {
          "label": "التواصل والموعد",
          "prompt": "رتّب الإشعارات والمراسلات المهمة، مع الحد من بيانات الأطفال غير اللازمة."
        }
      ],
      "outputs": [
        "جدول يربط الطلب بالحكم أو الاتفاق والأدلة المتاحة.",
        "قائمة بالنقاط المتنازع عليها والمعلومات اللازمة قبل تحديد الخطوة."
      ],
      "feeFactors": "نوع الطلب وعدد الأوامر والوثائق والحاجة إلى مراجعة أو صياغة.",
      "boundary": "لا تحدد هذه الورقة نفقة أو حضانة مستحقة؛ التمثيل والتنفيذ يحتاجان إلى نطاق مستقل."
    },
    "en": {
      "title": "Family matter preparation",
      "records": [
        {
          "label": "Request and existing order",
          "prompt": "What do you need now? Record any order or agreement date and whether it was carried out."
        },
        {
          "label": "Financial or family record",
          "prompt": "Link each amount or event to a record; separate recollection from documented facts."
        },
        {
          "label": "Correspondence and timing",
          "prompt": "Arrange relevant notices and messages, limiting unnecessary information about children."
        }
      ],
      "outputs": [
        "A table connecting the request to existing arrangements and available evidence.",
        "A list of disputed points and information needed before deciding the next step."
      ],
      "feeFactors": "Type of request, number of orders/documents, and whether review or drafting is needed.",
      "boundary": "This worksheet does not determine maintenance or custody rights; representation and enforcement need a separate scope."
    }
  },
  "business-law": {
    "ar": {
      "title": "ورقة ربط المطالبة التجارية بأدلتها",
      "records": [
        {
          "label": "العقد والتكليف",
          "prompt": "حدّد الطرف المتعاقد والعمل المتفق عليه والنسخة التي اعتمدها الطرفان."
        },
        {
          "label": "التسليم والفاتورة",
          "prompt": "اربط كل فاتورة بأمر شراء أو إثبات تسليم، وسجّل أي اعتراض."
        },
        {
          "label": "السداد والمطالبة",
          "prompt": "دوّن المدفوعات والتسويات والمبلغ محل الخلاف دون تكرار البنود."
        }
      ],
      "outputs": [
        "جدول بالمبالغ والمستند المؤيد وما اعترض عليه الطرف الآخر.",
        "تمييز المطالبة التي تحتاج إلى إثبات عن سند قائم يحتاج إلى فحص مسار تنفيذه."
      ],
      "feeFactors": "عدد المعاملات والأطراف والفواتير، ووجود نزاع على أصل الدين.",
      "boundary": "المراجعة لا تضمن التحصيل؛ التفاوض والمطالبة القضائية والتنفيذ أعمال تُحدد في التكليف."
    },
    "en": {
      "title": "Commercial claim evidence map",
      "records": [
        {
          "label": "Contract and instruction",
          "prompt": "Identify the contracting party, agreed work and version accepted by the parties."
        },
        {
          "label": "Delivery and invoice",
          "prompt": "Connect each invoice to an order or delivery record and note any objection."
        },
        {
          "label": "Payment and demand",
          "prompt": "Record payments, settlements and the disputed balance without duplicating items."
        }
      ],
      "outputs": [
        "A schedule of amounts, supporting records and the other party’s objections.",
        "A distinction between a claim needing proof and an existing instrument needing enforcement-route review."
      ],
      "feeFactors": "Number of transactions, parties and invoices, and whether the underlying debt is disputed.",
      "boundary": "Review does not guarantee recovery; negotiation, litigation and enforcement must be specified in the engagement."
    }
  },
  "real-estate": {
    "ar": {
      "title": "ورقة مقارنة العقار بالعقد والتسليم",
      "records": [
        {
          "label": "العقار والصفة",
          "prompt": "دوّن وصف العقار وموقعه وصفة مقدم الطلب، مع مستند الملكية المتاح."
        },
        {
          "label": "العقد والملاحق",
          "prompt": "حدّد شروط الدفع والتسليم والمواصفات وأي تعديل لاحق."
        },
        {
          "label": "التسليم أو الإشعار",
          "prompt": "قارن ما سُلّم بما اتُفق عليه، وأرفق محضر التسليم أو الإشعار المتصل."
        }
      ],
      "outputs": [
        "جدول اختلافات بين وصف العقار والعقد والملاحق ومحضر التسليم.",
        "نقاط تحتاج إلى تحقق قانوني أو فحص فني أو وثيقة إضافية."
      ],
      "feeFactors": "عدد العقارات والعقود والملاحق، ومرحلة الصفقة أو النزاع.",
      "boundary": "لا تحل مراجعة الأوراق محل المعاينة الهندسية أو التقييم أو إجراءات نقل الملكية."
    },
    "en": {
      "title": "Property contract and handover comparison",
      "records": [
        {
          "label": "Property and role",
          "prompt": "Record the property description, location, your role and the available ownership record."
        },
        {
          "label": "Contract and annexes",
          "prompt": "Identify payment, delivery and specification terms and any later amendment."
        },
        {
          "label": "Handover or notice",
          "prompt": "Compare delivery with the agreement and identify the relevant handover record or notice."
        }
      ],
      "outputs": [
        "A discrepancy table comparing the property description, agreement, annexes and handover.",
        "Questions requiring legal verification, technical inspection or further records."
      ],
      "feeFactors": "Number of properties, contracts and annexes, and the transaction or dispute stage.",
      "boundary": "Document review does not replace engineering inspection, valuation or conveyancing."
    }
  },
  "employment-law": {
    "ar": {
      "title": "ورقة التسلسل الزمني للعلاقة العمالية",
      "records": [
        {
          "label": "العقد والتعديل",
          "prompt": "حدّد تاريخ البداية والنسخة الحالية والأجر كما ورد في المستندات."
        },
        {
          "label": "الأجر والحضور",
          "prompt": "رتّب كشوف الأجر والتحويلات وسجلات الحضور ذات الصلة بالمطالبة."
        },
        {
          "label": "الإنهاء أو الإشعار",
          "prompt": "انقل تاريخ الإشعار وسببه كما ورد، وأشر إلى أي مخالصة أو رد."
        }
      ],
      "outputs": [
        "تسلسل زمني يربط الوقائع بالعقد والإشعارات والسداد.",
        "بنود تحتاج إلى تقييم منفصل مع بيان الوثائق الناقصة."
      ],
      "feeFactors": "عدد فترات العمل والمطالبات والوثائق، وصفة مقدم الطلب كعامل أو صاحب عمل.",
      "boundary": "لا تحسب هذه الورقة تعويضاً أو مستحقات ولا تفترض صحة سبب الإنهاء."
    },
    "en": {
      "title": "Employment timeline worksheet",
      "records": [
        {
          "label": "Contract and amendments",
          "prompt": "Identify the start date, current contract version and documented pay terms."
        },
        {
          "label": "Pay and attendance",
          "prompt": "Arrange pay statements, transfers and attendance records relevant to the issue."
        },
        {
          "label": "Termination or notice",
          "prompt": "Record the stated notice date and reason, and identify any settlement or response."
        }
      ],
      "outputs": [
        "A chronology connecting events to contract terms, notices and payments.",
        "Items needing separate assessment, with missing records identified."
      ],
      "feeFactors": "Number of employment periods, issues and records, and whether the request is from an employee or employer.",
      "boundary": "This worksheet does not calculate compensation or entitlements or assume the termination reason is valid."
    }
  },
  "foreign-investment": {
    "ar": {
      "title": "ورقة نشاط المستثمر والكيان المقترح",
      "records": [
        {
          "label": "النشاط والمستثمر",
          "prompt": "صف النشاط الفعلي والمنتج أو الخدمة وصفة المستثمر والشركاء المقترحين."
        },
        {
          "label": "الكيان والملكية",
          "prompt": "حدّد هل المطلوب تأسيس أم شراء حصة أم فرع، وأرفق مخطط الملكية المتاح."
        },
        {
          "label": "الموافقات والاتفاقات",
          "prompt": "احصر ما صدر فعلاً من تسجيلات أو موافقات والمسودات والالتزامات القائمة."
        }
      ],
      "outputs": [
        "خريطة أسئلة تربط النشاط والملكية بالتحقق المطلوب قبل الالتزام.",
        "قائمة بالمستندات والجهات والمسائل التي تحتاج إلى تحقق متخصص."
      ],
      "feeFactors": "عدد الأنشطة والكيانات والدول والوثائق المطلوب ترجمتها أو مراجعتها.",
      "boundary": "هذه ليست موافقة على الاستثمار أو تأكيداً للأهلية؛ المتطلبات تختلف باختلاف النشاط والهيكل."
    },
    "en": {
      "title": "Investor activity and entity worksheet",
      "records": [
        {
          "label": "Activity and investor",
          "prompt": "Describe the actual activity, product or service, investor role and proposed partners."
        },
        {
          "label": "Entity and ownership",
          "prompt": "Identify formation, an equity purchase or a branch, with any ownership chart available."
        },
        {
          "label": "Approvals and agreements",
          "prompt": "List registrations or approvals actually obtained, draft agreements and existing commitments."
        }
      ],
      "outputs": [
        "A question map connecting activity and ownership to checks needed before commitment.",
        "A list of documents, authorities and issues needing specialist verification."
      ],
      "feeFactors": "Number of activities, entities, countries and documents needing translation or review.",
      "boundary": "This is not investment approval or eligibility confirmation; requirements depend on the activity and structure."
    }
  },
  "administrative-law": {
    "ar": {
      "title": "ورقة القرار والإبلاغ والتظلم",
      "records": [
        {
          "label": "القرار والجهة",
          "prompt": "حدّد القرار المطلوب مراجعته والجهة التي أصدرته والطلب المراد تحقيقه."
        },
        {
          "label": "الإبلاغ والتاريخ",
          "prompt": "سجّل تاريخ وطريقة العلم بالقرار واربطهما بما يثبت ذلك."
        },
        {
          "label": "التظلم والرد",
          "prompt": "اجمع الطلبات والتظلمات والردود السابقة بترتيبها الزمني."
        }
      ],
      "outputs": [
        "تسلسل موثق للقرار والإبلاغ والمراسلات والإجراءات السابقة.",
        "أسئلة الاختصاص والقبول والمواعيد التي تحتاج إلى تحقق قبل اختيار المسار."
      ],
      "feeFactors": "عدد القرارات والطلبات السابقة وحجم الملف وأي موعد مذكور في الإشعارات.",
      "boundary": "لا تستنتج مهلة اعتراض من هذه الورقة؛ يحتاج الميعاد إلى فحص القرار والإبلاغ والإجراء المنطبق."
    },
    "en": {
      "title": "Decision, notification and grievance worksheet",
      "records": [
        {
          "label": "Decision and authority",
          "prompt": "Identify the decision, issuing authority and outcome you seek."
        },
        {
          "label": "Notification and date",
          "prompt": "Record when and how you learned of the decision and the supporting evidence."
        },
        {
          "label": "Grievance and response",
          "prompt": "Arrange previous requests, grievances and responses chronologically."
        }
      ],
      "outputs": [
        "A documented chronology of the decision, notification, correspondence and earlier steps.",
        "Jurisdiction, admissibility and timing questions to verify before choosing a route."
      ],
      "feeFactors": "Number of decisions and earlier requests, file size and dates stated in notices.",
      "boundary": "Do not infer an objection deadline from this worksheet; timing needs review of the decision, notification and applicable procedure."
    }
  },
  "arbitration": {
    "ar": {
      "title": "ورقة اتفاق التحكيم ومرحلة النزاع",
      "records": [
        {
          "label": "الاتفاق",
          "prompt": "ضع نص شرط التحكيم أو الاتفاق والنسخة الموقعة وملاحقها معاً."
        },
        {
          "label": "القواعد والمرحلة",
          "prompt": "دوّن المقر والقواعد واللغة إن وردت، وأي إخطار أو تشكيل لهيئة التحكيم."
        },
        {
          "label": "الطلب والأدلة",
          "prompt": "اربط كل طلب بمستنده، وميّز المطالبات الأصلية والمقابلة إن وجدت."
        }
      ],
      "outputs": [
        "جدول بالشرط والإجراءات القائمة والمسائل التي تحتاج إلى تفسير أو تحقق.",
        "فهرس للطلبات والأدلة والمعلومات الناقصة لتحديد نطاق المراجعة."
      ],
      "feeFactors": "عدد الأطراف والمطالبات ولغة الملف والمرحلة الحالية.",
      "boundary": "لا تؤكد الورقة صلاحية الشرط أو اختصاص الهيئة أو قابلية تنفيذ الحكم."
    },
    "en": {
      "title": "Arbitration agreement and stage worksheet",
      "records": [
        {
          "label": "Agreement",
          "prompt": "Keep the arbitration clause or agreement with the signed contract and annexes."
        },
        {
          "label": "Rules and stage",
          "prompt": "Record any stated seat, rules and language, and any notice or tribunal appointment."
        },
        {
          "label": "Claims and evidence",
          "prompt": "Link each request to its evidence and distinguish any claims and counterclaims."
        }
      ],
      "outputs": [
        "A table of agreement terms, current steps and questions needing interpretation or verification.",
        "An index of claims, evidence and missing information for scoping the review."
      ],
      "feeFactors": "Number of parties and claims, file language and current stage.",
      "boundary": "The worksheet does not establish clause validity, tribunal jurisdiction or award enforceability."
    }
  },
  "enforcement": {
    "ar": {
      "title": "ورقة السند والمبلغ وإجراءات التنفيذ",
      "records": [
        {
          "label": "السند",
          "prompt": "حدّد نوع السند ونسخته وتاريخه وأطرافه وما يثبت حالته."
        },
        {
          "label": "المبلغ",
          "prompt": "اربط المبلغ المطلوب بالسند وسجل الدفعات والتسويات لتجنب الازدواج."
        },
        {
          "label": "الإجراءات",
          "prompt": "رتّب الطلبات والإشعارات والقرارات والاعتراضات القائمة زمنياً."
        }
      ],
      "outputs": [
        "مطابقة بين نطاق السند والمبلغ المطلوب والمدفوعات المثبتة.",
        "قائمة بالمسائل الإجرائية أو المستندية التي يلزم فحصها قبل الطلب التالي."
      ],
      "feeFactors": "عدد السندات والأطراف والدفعات والإجراءات السابقة.",
      "boundary": "وجود مستند لا يثبت وحده قابليته للتنفيذ، ولا تضمن المراجعة استرداد المبلغ."
    },
    "en": {
      "title": "Instrument, balance and enforcement worksheet",
      "records": [
        {
          "label": "Instrument",
          "prompt": "Identify the instrument type, copy, date, parties and evidence of its status."
        },
        {
          "label": "Balance",
          "prompt": "Reconcile the requested amount with the instrument, payments and settlements."
        },
        {
          "label": "Proceedings",
          "prompt": "Arrange existing applications, notices, decisions and objections chronologically."
        }
      ],
      "outputs": [
        "A reconciliation of the instrument’s scope, requested amount and documented payments.",
        "A list of procedural or evidential issues to review before the next request."
      ],
      "feeFactors": "Number of instruments, parties, payments and earlier procedural steps.",
      "boundary": "Having a document does not itself establish enforceability, and review does not guarantee recovery."
    }
  },
  "companies-law": {
    "ar": {
      "title": "ورقة الملكية والقرار وصلاحية التوقيع",
      "records": [
        {
          "label": "الكيان",
          "prompt": "اجمع وثائق التأسيس والسجل والتعديلات بحسب النسخ المتاحة."
        },
        {
          "label": "الملكية والإدارة",
          "prompt": "قارن سجل الشركاء أو المساهمين بالاتفاقات والقرارات ذات الصلة."
        },
        {
          "label": "القرار المطلوب",
          "prompt": "حدّد الصفقة أو القرار ومن سيوقع وأي موافقة سبق الحصول عليها."
        }
      ],
      "outputs": [
        "خريطة للوثائق والقرارات والصلاحيات التي يحتاجها الموضوع إلى مراجعة.",
        "نقاط تعارض أو نقص بين السجل والاتفاقات والقرار المقترح."
      ],
      "feeFactors": "عدد الكيانات والشركاء والقرارات، ونطاق التأسيس أو التعديل أو النزاع.",
      "boundary": "لا تُعد الورقة تدقيقاً مالياً أو تأكيداً لصحة قرار أو تفويض."
    },
    "en": {
      "title": "Ownership, decision and signing-authority worksheet",
      "records": [
        {
          "label": "Entity",
          "prompt": "Collect available formation documents, registration records and amendments."
        },
        {
          "label": "Ownership and management",
          "prompt": "Compare ownership records with relevant agreements and resolutions."
        },
        {
          "label": "Proposed decision",
          "prompt": "Identify the transaction or resolution, proposed signatory and approvals already obtained."
        }
      ],
      "outputs": [
        "A map of documents, decisions and authority questions needing review.",
        "Conflicts or gaps between records, agreements and the proposed decision."
      ],
      "feeFactors": "Number of entities, owners and decisions, and the formation, amendment or dispute scope.",
      "boundary": "The worksheet is not a financial audit or confirmation that a resolution or delegation is valid."
    }
  },
  "contracts": {
    "ar": {
      "title": "ورقة مراجعة البنود قبل التوقيع أو التعديل",
      "records": [
        {
          "label": "النسخة والأطراف",
          "prompt": "حدّد آخر مسودة والأطراف وصفة الموقّع والملاحق التي تدخل في الاتفاق."
        },
        {
          "label": "الالتزامات",
          "prompt": "ضع لكل التزام مقابله المالي وموعده ومعيار قبوله وما يحدث عند التأخر."
        },
        {
          "label": "النقاط المفتوحة",
          "prompt": "دوّن البنود غير المتفق عليها والهدف التجاري والموعد المطلوب للتوقيع."
        }
      ],
      "outputs": [
        "جدول يربط البند بالملاحظة والخطر العملي والسؤال المطلوب حسمه.",
        "تعديلات مقترحة أو خيارات تفاوض إذا شملها النطاق المتفق عليه."
      ],
      "feeFactors": "عدد الصفحات والملاحق واللغات والجولات، وهل المطلوب مراجعة أم صياغة.",
      "boundary": "مراجعة بند منفرد لا تعادل مراجعة العقد كاملاً؛ يُحدد ما يدخل في المراجعة صراحةً."
    },
    "en": {
      "title": "Clause review worksheet",
      "records": [
        {
          "label": "Version and parties",
          "prompt": "Identify the latest draft, parties, signatory role and incorporated annexes."
        },
        {
          "label": "Obligations",
          "prompt": "Connect each obligation to payment, timing, acceptance criteria and stated consequences of delay."
        },
        {
          "label": "Open issues",
          "prompt": "Record unresolved clauses, the business objective and intended signing date."
        }
      ],
      "outputs": [
        "A clause-by-clause table of observations, practical risks and questions to resolve.",
        "Proposed wording or negotiation options where included in the agreed scope."
      ],
      "feeFactors": "Pages, annexes, languages and revision rounds, and whether review or drafting is requested.",
      "boundary": "Reviewing one clause is not a review of the whole contract; the included material must be specified."
    }
  },
  "criminal-law": {
    "ar": {
      "title": "ورقة المرحلة والإشعار والمستندات",
      "records": [
        {
          "label": "الصفة والمرحلة",
          "prompt": "اذكر صفة صاحب الطلب والجهة والمرحلة كما تظهر في الأوراق المتاحة."
        },
        {
          "label": "الإشعار",
          "prompt": "اجمع الاستدعاء أو المحضر أو القرار، وسجّل المواعيد المذكورة فيه."
        },
        {
          "label": "المستند والواقعة",
          "prompt": "رتّب الوثائق زمنياً وافصل المشاهدات المباشرة عما نقله الآخرون."
        }
      ],
      "outputs": [
        "فهرس للملف والمرحلة والوثائق التي تحتاج إلى قراءة متخصصة.",
        "قائمة بالأسئلة والمعلومات اللازمة لتحديد المساعدة والتمثيل الممكنين."
      ],
      "feeFactors": "المرحلة وعدد الوثائق والأطراف والحاجة إلى حضور أو صياغة.",
      "boundary": "ليست هذه مذكرة دفاع أو توجيهاً للأقوال، ولا تتضمن وعداً بالإفراج أو نتيجة معينة."
    },
    "en": {
      "title": "Criminal matter stage and document worksheet",
      "records": [
        {
          "label": "Role and stage",
          "prompt": "State the person’s role, authority and stage as shown in available records."
        },
        {
          "label": "Notice",
          "prompt": "Identify the summons, record or decision and dates stated in it."
        },
        {
          "label": "Record and event",
          "prompt": "Arrange records chronologically, separating direct observations from accounts received from others."
        }
      ],
      "outputs": [
        "A file index identifying the stage and documents needing specialist reading.",
        "Questions and information needed to scope possible assistance and representation."
      ],
      "feeFactors": "Stage, number of documents and parties, and whether attendance or drafting is needed.",
      "boundary": "This is not a defence memorandum or instructions for giving a statement, and promises no release or outcome."
    }
  },
  "banking-finance": {
    "ar": {
      "title": "ورقة مقارنة التمويل بكشف الحساب",
      "records": [
        {
          "label": "التمويل",
          "prompt": "اجمع العقد وجدول السداد وأي تعديل أو تسوية لاحقة."
        },
        {
          "label": "القيد المختلف عليه",
          "prompt": "حدّد تاريخ القيد وقيمته ووصفه وما تقارنه به في العقد."
        },
        {
          "label": "الشكوى والرد",
          "prompt": "رتّب طلبات التصحيح وردود الجهة والمراسلات المرتبطة."
        }
      ],
      "outputs": [
        "جدول يربط القيد المختلف عليه بالعقد والسداد والمراسلات.",
        "نقاط تحتاج إلى حساب أو مستند إضافي أو مراجعة لمسار المنازعة."
      ],
      "feeFactors": "عدد العقود والكشوف والقيود محل الخلاف والمرحلة الحالية.",
      "boundary": "لا ترسل كلمات مرور أو رموز تحقق؛ هذه مراجعة مستندات وليست دخولاً إلى حسابك."
    },
    "en": {
      "title": "Finance agreement and statement reconciliation",
      "records": [
        {
          "label": "Finance terms",
          "prompt": "Collect the agreement, repayment schedule and any amendment or settlement."
        },
        {
          "label": "Disputed entry",
          "prompt": "Identify the entry date, amount and description, and the contract term used for comparison."
        },
        {
          "label": "Complaint and response",
          "prompt": "Arrange correction requests, the provider’s responses and related correspondence."
        }
      ],
      "outputs": [
        "A table connecting disputed entries to contract terms, payments and correspondence.",
        "Items needing calculation, further records or dispute-route review."
      ],
      "feeFactors": "Number of agreements, statements and disputed entries, and the current stage.",
      "boundary": "Do not send passwords or verification codes; this is document review, not access to your account."
    }
  },
  "intellectual-property": {
    "ar": {
      "title": "ورقة الأصل الفكري وسلسلة الحقوق",
      "records": [
        {
          "label": "الأصل",
          "prompt": "صف العلامة أو المصنف أو الاختراع أو غيره دون كشف سر غير لازم للطلب الأولي."
        },
        {
          "label": "سلسلة الحقوق",
          "prompt": "رتّب عقود الإنشاء والتنازل والترخيص وما يثبت صفة مقدم الطلب."
        },
        {
          "label": "التسجيل أو الاستخدام",
          "prompt": "حدّد طلب التسجيل أو الشهادة أو الاستخدام محل الخلاف مع التاريخ والمصدر."
        }
      ],
      "outputs": [
        "خريطة تربط الأصل وأصحاب الحقوق والاتفاقات والسجل المتاح.",
        "أسئلة منفصلة عن التسجيل أو الملكية أو الاستخدام أو الترخيص."
      ],
      "feeFactors": "عدد الأصول والدول والأطراف والاتفاقات، ونوع المساعدة المطلوبة.",
      "boundary": "لا تؤكد الورقة قابلية التسجيل أو وجود تعدٍ؛ يلزم فحص الأصل والحقوق والوقائع."
    },
    "en": {
      "title": "Intellectual asset and ownership-chain worksheet",
      "records": [
        {
          "label": "Asset",
          "prompt": "Describe the mark, work, invention or other asset without disclosing unnecessary secrets in an initial enquiry."
        },
        {
          "label": "Ownership chain",
          "prompt": "Arrange creation, assignment and licence agreements and evidence of your role."
        },
        {
          "label": "Registration or use",
          "prompt": "Identify the application, registration or disputed use with its date and source."
        }
      ],
      "outputs": [
        "A map connecting the asset, rights holders, agreements and available registration records.",
        "Separate questions about registration, ownership, use and licensing."
      ],
      "feeFactors": "Number of assets, countries, parties and agreements, and the assistance requested.",
      "boundary": "The worksheet does not confirm registrability or infringement; the asset, rights and facts need examination."
    }
  },
  "tax-zakat": {
    "ar": {
      "title": "ورقة الربط أو التقييم والرد السابق",
      "records": [
        {
          "label": "التقييم والفترة",
          "prompt": "حدّد نوع الضريبة أو الزكاة والفترة والجهة ونسخة الإشعار."
        },
        {
          "label": "البنود والمستندات",
          "prompt": "اربط كل بند محل خلاف بالإقرار والسجل أو الفاتورة ذات الصلة."
        },
        {
          "label": "الإبلاغ والرد",
          "prompt": "دوّن تاريخ الإبلاغ والردود والاعتراضات السابقة وما يثبت تقديمها."
        }
      ],
      "outputs": [
        "جدول يربط بند التقييم بسبب الاعتراض والمستند المتاح.",
        "فصل المسائل القانونية عن الحسابات التي تحتاج إلى مراجعة محاسبية."
      ],
      "feeFactors": "عدد الفترات والبنود والوثائق، ووجود اعتراض سابق أو أعمال محاسبية مستقلة.",
      "boundary": "الورقة لا تحسب الالتزام ولا تحدد ميعاد الاعتراض؛ يلزم فحص الإشعار والإجراء المنطبق."
    },
    "en": {
      "title": "Assessment and prior-response worksheet",
      "records": [
        {
          "label": "Assessment and period",
          "prompt": "Identify the tax or zakat type, period, authority and notice copy."
        },
        {
          "label": "Items and records",
          "prompt": "Connect each disputed item to the return and relevant ledger or invoice."
        },
        {
          "label": "Notification and response",
          "prompt": "Record notification dates, earlier responses or objections and evidence of submission."
        }
      ],
      "outputs": [
        "A table linking assessment items to objection grounds and available records.",
        "A separation of legal issues from calculations requiring accounting review."
      ],
      "feeFactors": "Number of periods, items and documents, and any earlier objection or separate accounting work.",
      "boundary": "The worksheet does not calculate liability or an objection deadline; the notice and applicable process need review."
    }
  },
  "cyber-law": {
    "ar": {
      "title": "ورقة الواقعة الرقمية ومصادر الأدلة",
      "records": [
        {
          "label": "الواقعة",
          "prompt": "دوّن المنصة والتاريخ ونوع الواقعة دون إضافة تخمينات عن هوية الفاعل."
        },
        {
          "label": "المصدر",
          "prompt": "حدّد مصدر الرسائل أو الروابط أو السجلات المتاحة واحتفظ بنسخها الأصلية المتاحة لك."
        },
        {
          "label": "التبليغ والرد",
          "prompt": "رتّب أرقام البلاغات وردود المنصة أو الجهة والمراسلات اللاحقة."
        }
      ],
      "outputs": [
        "تسلسل زمني يربط الواقعة بمصدر كل دليل متاح.",
        "قائمة بالثغرات المعلوماتية وما قد يحتاج إلى فحص تقني مستقل."
      ],
      "feeFactors": "عدد المنصات والوقائع والملفات والحاجة إلى خبرة تقنية منفصلة.",
      "boundary": "لا ترسل بيانات دخول أو رموز تحقق؛ المراجعة القانونية لا تعادل استعادة حساب أو فحصاً جنائياً تقنياً."
    },
    "en": {
      "title": "Digital incident and evidence-source worksheet",
      "records": [
        {
          "label": "Incident",
          "prompt": "Record the platform, date and incident type without guessing who was responsible."
        },
        {
          "label": "Source",
          "prompt": "Identify sources of available messages, links or logs and retain the originals available to you."
        },
        {
          "label": "Report and response",
          "prompt": "Arrange report references, platform or authority responses and subsequent correspondence."
        }
      ],
      "outputs": [
        "A chronology connecting the incident to the source of each available record.",
        "Information gaps and items that may require independent technical examination."
      ],
      "feeFactors": "Number of platforms, incidents and files, and any need for separate technical expertise.",
      "boundary": "Do not send login details or verification codes; legal review is not account recovery or technical forensic examination."
    }
  },
  "medical-malpractice": {
    "ar": {
      "title": "ورقة التسلسل العلاجي والملف الطبي",
      "records": [
        {
          "label": "العلاج",
          "prompt": "رتّب تواريخ المنشآت والزيارات والعلاج كما تظهر في السجل."
        },
        {
          "label": "الملف الطبي",
          "prompt": "احصر التقارير والموافقات ونتائج الفحوص وما طلبته ولم تحصل عليه."
        },
        {
          "label": "الضرر والمراجعة",
          "prompt": "ميّز الأعراض أو الخسائر الموثقة عن الاستنتاجات التي تحتاج إلى رأي طبي."
        }
      ],
      "outputs": [
        "تسلسل علاجي وفهرس للمستندات والفجوات في الملف.",
        "أسئلة تحتاج إلى رأي طبي متخصص منفصل عن التقييم القانوني."
      ],
      "feeFactors": "عدد المنشآت والفترات والتقارير والحاجة إلى رأي طبي مستقل.",
      "boundary": "النتيجة غير المرغوبة لا تثبت وحدها خطأً طبياً؛ لا تشخّص هذه الورقة الضرر أو سببه."
    },
    "en": {
      "title": "Treatment chronology and medical-record worksheet",
      "records": [
        {
          "label": "Treatment",
          "prompt": "Arrange facility, visit and treatment dates as shown in the records."
        },
        {
          "label": "Medical file",
          "prompt": "List reports, consents, test results and requested records not yet received."
        },
        {
          "label": "Harm and review",
          "prompt": "Separate documented symptoms or losses from conclusions requiring medical opinion."
        }
      ],
      "outputs": [
        "A treatment chronology and index of records and file gaps.",
        "Questions requiring specialist medical opinion separately from legal assessment."
      ],
      "feeFactors": "Number of facilities, treatment periods and reports, and any need for independent medical opinion.",
      "boundary": "An unwanted outcome alone does not establish malpractice; this worksheet does not diagnose harm or its cause."
    }
  },
  "insurance-law": {
    "ar": {
      "title": "ورقة مقارنة الوثيقة بسبب رفض المطالبة",
      "records": [
        {
          "label": "الوثيقة",
          "prompt": "اجمع الوثيقة وجدولها وملاحقها وفترة التغطية كما وردت."
        },
        {
          "label": "الواقعة والمطالبة",
          "prompt": "دوّن الواقعة والمبلغ المطلوب والمستندات التي قُدمت بالفعل."
        },
        {
          "label": "الرد",
          "prompt": "انقل سبب الرفض أو التخفيض ومرجع البند الذي استند إليه الرد إن ورد."
        }
      ],
      "outputs": [
        "جدول يربط سبب الرفض بنص الوثيقة والواقعة والمستند.",
        "تمييز الخلاف على التغطية عن الخلاف على تقدير الضرر أو نقص الوثائق."
      ],
      "feeFactors": "عدد الوثائق والمطالبات والأطراف وحجم ملف الضرر.",
      "boundary": "لا تؤكد الورقة استحقاق التعويض؛ التقييم الفني أو الطبي والخبرة تُحدد بصورة مستقلة."
    },
    "en": {
      "title": "Policy and claim-rejection comparison",
      "records": [
        {
          "label": "Policy",
          "prompt": "Collect the policy, schedule, endorsements and stated coverage period."
        },
        {
          "label": "Event and claim",
          "prompt": "Record the event, claimed amount and documents actually submitted."
        },
        {
          "label": "Response",
          "prompt": "Record the reason for rejection or reduction and any policy clause cited in the response."
        }
      ],
      "outputs": [
        "A table linking rejection grounds to policy wording, events and supporting records.",
        "A distinction between coverage disputes, valuation disputes and missing documentation."
      ],
      "feeFactors": "Number of policies, claims and parties, and the size of the loss-evidence file.",
      "boundary": "The worksheet does not confirm compensation entitlement; technical or medical assessment is separately scoped."
    }
  },
  "urgent-legal-assistance": {
    "ar": {
      "title": "ورقة نطاق المستند العاجل وموعده",
      "records": [
        {
          "label": "المخرج",
          "prompt": "حدّد هل تحتاج إلى مذكرة أو لائحة دعوى أو مراجعة عقد، واللغة والمستلم المقصود."
        },
        {
          "label": "الملف",
          "prompt": "ضع آخر نسخة مع المرفقات وحدّد ما ينقص وما ينبغي الرد عليه."
        },
        {
          "label": "الموعد",
          "prompt": "دوّن الموعد المطلوب ومصدره والمنطقة الزمنية، ولا تفترض قبول الطلب بمجرد إرساله."
        }
      ],
      "outputs": [
        "نطاق مكتوب يحدد نوع المستند والمواد التي ستُراجع وما يستثنى.",
        "تأكيد المخرج والرسوم والموعد والمهني المسؤول قبل بدء العمل."
      ],
      "feeFactors": "عدد الصفحات والمرفقات واللغات، وحجم الصياغة والوقت المتاح.",
      "boundary": "هدف التسليم خلال ٣ ساعات يبدأ بعد قبول الطلب واكتمال المستندات وتأكيد السداد؛ الإيداع والتمثيل ليسا تلقائيين."
    },
    "en": {
      "title": "Urgent document scope and deadline worksheet",
      "records": [
        {
          "label": "Output",
          "prompt": "Identify the memorandum, statement of claim or contract review, its language and intended recipient."
        },
        {
          "label": "File",
          "prompt": "Collect the latest version and attachments, identifying missing material and points to address."
        },
        {
          "label": "Timing",
          "prompt": "Record the requested deadline, its source and time zone; sending a request does not mean acceptance."
        }
      ],
      "outputs": [
        "A written scope identifying the document type, material to review and exclusions.",
        "Confirmation of output, fee, timing and responsible professional before work begins."
      ],
      "feeFactors": "Pages, attachments, languages, drafting extent and available time.",
      "boundary": "The three-hour delivery target begins after acceptance, complete documents and confirmed payment; filing and representation are not automatic."
    }
  }
};

export function saudiWorksheetPath(service: string, language: "ar" | "en") {
  return `/resources/saudi-review/${service}-${language}.txt`;
}
