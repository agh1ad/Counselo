/** Service-specific intake copy. Jurisdiction and procedural rules are resolved separately. */
type Localized<T> = { en: T; ar: T };
export type ServiceIntakeContent = { summary: Localized<string>; documents: Localized<string[]> };
export const SERVICE_INTAKE_CONTENT: Record<string, ServiceIntakeContent> = {
  "urgent-legal-assistance": {
    summary: { en: "Request a legal memorandum, statement of claim or review of an existing contract or agreement. Share documents and your deadline; urgent fees differ from standard fees.", ar: "اطلب إعداد مذكرة قانونية أو لائحة دعوى أو تدقيق عقد أو اتفاقية قائمة. أرسل المستندات والموعد المطلوب؛ تختلف أتعاب الطوارئ عن الأتعاب العادية." },
    documents: {
      en: ["Notice or document showing the official deadline", "Relevant contract, draft or case papers", "Key evidence and previous correspondence", "Parties, jurisdiction and requested deliverable with date, time and time zone"],
      ar: ["الإخطار أو المستند المتضمن الموعد الرسمي", "العقد أو المسودة أو أوراق القضية ذات الصلة", "الأدلة الأساسية والمراسلات السابقة", "الأطراف والاختصاص والمخرج المطلوب مع التاريخ والساعة والمنطقة الزمنية"],
    },
  },
  "administrative-law": {
    "summary": {
      "en": "Review a licence refusal, administrative penalty or tender decision before choosing an objection or court challenge. The review examines the decision, reasons, service date and available procedural route.",
      "ar": "نراجع رفض الترخيص أو الجزاء الإداري أو قرار المناقصة قبل اختيار التظلم أو الطعن القضائي، مع فحص القرار وأسبابه وتاريخ تبليغه والمسار الإجرائي المتاح."
    },
    "documents": {
      "en": [
        "Complete decision and proof of service",
        "Application, licence or tender file and conditions",
        "Objections already submitted and authority responses",
        "Documents supporting the alleged error and resulting loss"
      ],
      "ar": [
        "القرار كاملاً وإثبات تبليغه",
        "طلب الترخيص أو ملف المناقصة وشروطه",
        "التظلمات المقدمة وردود الجهة",
        "مستندات الخطأ المدعى به والضرر الناتج عنه"
      ]
    }
  },
  "administrative-regulatory": {
    "summary": {
      "en": "Review a licence refusal, administrative penalty or tender decision before choosing an objection or court challenge. The review examines the decision, reasons, service date and available procedural route.",
      "ar": "نراجع رفض الترخيص أو الجزاء الإداري أو قرار المناقصة قبل اختيار التظلم أو الطعن القضائي، مع فحص القرار وأسبابه وتاريخ تبليغه والمسار الإجرائي المتاح."
    },
    "documents": {
      "en": [
        "Complete decision and proof of service",
        "Application, licence or tender file and conditions",
        "Objections already submitted and authority responses",
        "Documents supporting the alleged error and resulting loss"
      ],
      "ar": [
        "القرار كاملاً وإثبات تبليغه",
        "طلب الترخيص أو ملف المناقصة وشروطه",
        "التظلمات المقدمة وردود الجهة",
        "مستندات الخطأ المدعى به والضرر الناتج عنه"
      ]
    }
  },
  "arbitration": {
    "summary": {
      "en": "Assess the arbitration agreement, seat and procedural stage before starting a claim or responding to one. Review can address tribunal jurisdiction, settlement, interim relief and the separate requirements for challenging or enforcing an award.",
      "ar": "نقيّم اتفاق التحكيم ومقره ومرحلة الإجراءات قبل بدء المطالبة أو الرد عليها. وقد تشمل المراجعة اختصاص الهيئة والتسوية والتدابير المؤقتة والشروط المستقلة للطعن في الحكم أو تنفيذه."
    },
    "documents": {
      "en": [
        "Signed contract and complete arbitration clause",
        "Institutional notices, procedural orders and filing dates",
        "Claims, defences and supporting evidence",
        "Award and proof of notification, if issued"
      ],
      "ar": [
        "العقد الموقع وشرط التحكيم كاملاً",
        "إخطارات المؤسسة والأوامر الإجرائية ومواعيد القيد",
        "المطالبات والدفوع وأدلتها",
        "حكم التحكيم وإثبات تبليغه إن صدر"
      ]
    }
  },
  "arbitration-mediation": {
    "summary": {
      "en": "Assess the arbitration agreement, seat and procedural stage before starting a claim or responding to one. Review can address tribunal jurisdiction, settlement, interim relief and the separate requirements for challenging or enforcing an award.",
      "ar": "نقيّم اتفاق التحكيم ومقره ومرحلة الإجراءات قبل بدء المطالبة أو الرد عليها. وقد تشمل المراجعة اختصاص الهيئة والتسوية والتدابير المؤقتة والشروط المستقلة للطعن في الحكم أو تنفيذه."
    },
    "documents": {
      "en": [
        "Signed contract and complete arbitration clause",
        "Institutional notices, procedural orders and filing dates",
        "Claims, defences and supporting evidence",
        "Award and proof of notification, if issued"
      ],
      "ar": [
        "العقد الموقع وشرط التحكيم كاملاً",
        "إخطارات المؤسسة والأوامر الإجرائية ومواعيد القيد",
        "المطالبات والدفوع وأدلتها",
        "حكم التحكيم وإثبات تبليغه إن صدر"
      ]
    }
  },
  "banking-finance": {
    "summary": {
      "en": "Review disputed bank transactions, financing obligations and guarantees using the actual facility terms and account records. Separate a service complaint from a payment claim, regulatory question or enforcement defence.",
      "ar": "نراجع المعاملات المصرفية المتنازع عليها والتزامات التمويل والضمانات وفق شروط التسهيلات وسجلات الحساب، مع التمييز بين شكوى الخدمة والمطالبة المالية والمسألة التنظيمية والدفاع في التنفيذ."
    },
    "documents": {
      "en": [
        "Facility agreement, amendments and repayment schedule",
        "Relevant statements and disputed transaction references",
        "Guarantees, security documents and demand notices",
        "Bank complaint and response, including incident dates"
      ],
      "ar": [
        "اتفاق التمويل وتعديلاته وجدول السداد",
        "كشوف الحساب ذات الصلة ومراجع العمليات المتنازع عليها",
        "الضمانات ومستندات التأمين وإخطارات المطالبة",
        "الشكوى المصرفية والرد عليها وتواريخ الواقعة"
      ]
    }
  },
  "business-law": {
    "summary": {
      "en": "Resolve commercial payment, supply, agency and partner disputes by identifying the transaction, obligation and evidence of performance. The initial review separates recoverable claims from corporate, regulatory or procedural issues requiring a different route.",
      "ar": "نقيّم منازعات السداد والتوريد والوكالات والشركاء بتحديد المعاملة والالتزام وأدلة التنفيذ، مع فصل المطالبات المالية عن مسائل الشركات أو التنظيم أو الإجراءات التي تحتاج إلى مسار مختلف."
    },
    "documents": {
      "en": [
        "Contract, orders and commercial registration",
        "Invoices, delivery records and account reconciliation",
        "Payment evidence and acknowledgements",
        "Demand letters and settlement correspondence"
      ],
      "ar": [
        "العقد والطلبات والسجل التجاري",
        "الفواتير ومستندات التسليم ومطابقة الحساب",
        "أدلة السداد والإقرارات",
        "خطابات المطالبة ومراسلات التسوية"
      ]
    }
  },
  "companies-law": {
    "summary": {
      "en": "Plan company formation, governance changes, a shareholder exit or dissolution around the entity’s legal form and records. Review signing authority, approval requirements and ownership rights before committing the company or transferring an interest.",
      "ar": "نراجع التأسيس وتغييرات الحوكمة وخروج الشريك أو حل الشركة وفق شكلها القانوني وسجلاتها، مع فحص صلاحيات التوقيع والموافقات وحقوق الملكية قبل إلزام الشركة أو نقل حصة."
    },
    "documents": {
      "en": [
        "Constitutional documents and current registry extract",
        "Ownership register and shareholder agreements",
        "Board or partner resolutions and signing authorities",
        "Accounts, valuation material and proposed transaction terms"
      ],
      "ar": [
        "وثائق التأسيس ومستخرج السجل الحالي",
        "سجل الملكية واتفاقات الشركاء",
        "قرارات المجلس أو الشركاء وصلاحيات التوقيع",
        "الحسابات ومستندات التقييم وشروط المعاملة المقترحة"
      ]
    }
  },
  "corporate-commercial": {
    "summary": {
      "en": "Plan company formation, governance changes, a shareholder exit or dissolution around the entity’s legal form and records. Review signing authority, approval requirements and ownership rights before committing the company or transferring an interest.",
      "ar": "نراجع التأسيس وتغييرات الحوكمة وخروج الشريك أو حل الشركة وفق شكلها القانوني وسجلاتها، مع فحص صلاحيات التوقيع والموافقات وحقوق الملكية قبل إلزام الشركة أو نقل حصة."
    },
    "documents": {
      "en": [
        "Constitutional documents and current registry extract",
        "Ownership register and shareholder agreements",
        "Board or partner resolutions and signing authorities",
        "Accounts, valuation material and proposed transaction terms"
      ],
      "ar": [
        "وثائق التأسيس ومستخرج السجل الحالي",
        "سجل الملكية واتفاقات الشركاء",
        "قرارات المجلس أو الشركاء وصلاحيات التوقيع",
        "الحسابات ومستندات التقييم وشروط المعاملة المقترحة"
      ]
    }
  },
  "contracts": {
    "summary": {
      "en": "Review a draft agreement or a disputed obligation before signing, giving notice or stopping performance. Identify scope, payment, acceptance, liability and termination risks, then prepare the agreed amendments or response.",
      "ar": "نراجع مشروع العقد أو الالتزام المتنازع عليه قبل التوقيع أو الإخطار أو وقف التنفيذ، لتحديد مخاطر النطاق والسداد والقبول والمسؤولية والإنهاء وإعداد التعديلات أو الرد المتفق عليه."
    },
    "documents": {
      "en": [
        "Complete contract, schedules and amendments",
        "Draft terms and negotiation correspondence",
        "Performance, acceptance and payment records",
        "Breach notices and evidence of loss or mitigation"
      ],
      "ar": [
        "العقد كاملاً وملاحقه وتعديلاته",
        "الشروط المقترحة ومراسلات التفاوض",
        "مستندات التنفيذ والقبول والسداد",
        "إخطارات الإخلال وأدلة الضرر أو الحد منه"
      ]
    }
  },
  "commercial-contracts": {
    "summary": {
      "en": "Review a draft agreement or a disputed obligation before signing, giving notice or stopping performance. Identify scope, payment, acceptance, liability and termination risks, then prepare the agreed amendments or response.",
      "ar": "نراجع مشروع العقد أو الالتزام المتنازع عليه قبل التوقيع أو الإخطار أو وقف التنفيذ، لتحديد مخاطر النطاق والسداد والقبول والمسؤولية والإنهاء وإعداد التعديلات أو الرد المتفق عليه."
    },
    "documents": {
      "en": [
        "Complete contract, schedules and amendments",
        "Draft terms and negotiation correspondence",
        "Performance, acceptance and payment records",
        "Breach notices and evidence of loss or mitigation"
      ],
      "ar": [
        "العقد كاملاً وملاحقه وتعديلاته",
        "الشروط المقترحة ومراسلات التفاوض",
        "مستندات التنفيذ والقبول والسداد",
        "إخطارات الإخلال وأدلة الضرر أو الحد منه"
      ]
    }
  },
  "criminal-law": {
    "summary": {
      "en": "Assess a complaint, summons or criminal accusation from the alleged facts and current procedural stage. Preserve the available evidence and identify the competent investigating authority, response requirements and need for locally authorised representation.",
      "ar": "نقيّم الشكوى أو الاستدعاء أو الاتهام الجزائي انطلاقاً من الوقائع ومرحلة الإجراءات، مع حفظ الأدلة وتحديد جهة التحقيق ومتطلبات الرد والحاجة إلى تمثيل ممن يملك الصفة المهنية اللازمة."
    },
    "documents": {
      "en": [
        "Complaint or summons and case reference",
        "Available interview records, orders and judgments",
        "A dated account distinguishing personal knowledge from inference",
        "Lawfully held communications, transaction records or other evidence"
      ],
      "ar": [
        "الشكوى أو الاستدعاء ورقم القضية",
        "محاضر الاستجواب والأوامر والأحكام المتاحة",
        "ملخص مؤرخ يميز العلم المباشر عن الاستنتاج",
        "المراسلات وسجلات المعاملات أو الأدلة المحفوظة بصورة مشروعة"
      ]
    }
  },
  "criminal-investigations": {
    "summary": {
      "en": "Assess a complaint, summons or criminal accusation from the alleged facts and current procedural stage. Preserve the available evidence and identify the competent investigating authority, response requirements and need for locally authorised representation.",
      "ar": "نقيّم الشكوى أو الاستدعاء أو الاتهام الجزائي انطلاقاً من الوقائع ومرحلة الإجراءات، مع حفظ الأدلة وتحديد جهة التحقيق ومتطلبات الرد والحاجة إلى تمثيل ممن يملك الصفة المهنية اللازمة."
    },
    "documents": {
      "en": [
        "Complaint or summons and case reference",
        "Available interview records, orders and judgments",
        "A dated account distinguishing personal knowledge from inference",
        "Lawfully held communications, transaction records or other evidence"
      ],
      "ar": [
        "الشكوى أو الاستدعاء ورقم القضية",
        "محاضر الاستجواب والأوامر والأحكام المتاحة",
        "ملخص مؤرخ يميز العلم المباشر عن الاستنتاج",
        "المراسلات وسجلات المعاملات أو الأدلة المحفوظة بصورة مشروعة"
      ]
    }
  },
  "criminal-procedure": {
    "summary": {
      "en": "Identify what can be challenged at the current criminal-procedure stage, including service, detention, investigation steps or a judgment. The review links each proposed request to the competent authority, supporting record and applicable deadline.",
      "ar": "نحدد ما يمكن الاعتراض عليه في المرحلة الجزائية الحالية، من تبليغ أو توقيف أو إجراءات تحقيق أو حكم، ونربط كل طلب بالجهة المختصة والمستند المؤيد والميعاد الواجب مراعاته."
    },
    "documents": {
      "en": [
        "Procedural orders and proof of notification",
        "Available case file and hearing records",
        "Prior applications and responses",
        "Chronology of detention, service and appeal steps"
      ],
      "ar": [
        "الأوامر الإجرائية وإثبات تبليغها",
        "ملف القضية ومحاضر الجلسات المتاحة",
        "الطلبات السابقة والردود عليها",
        "تسلسل التوقيف والتبليغ وإجراءات الطعن"
      ]
    }
  },
  "cyber-law": {
    "summary": {
      "en": "Respond to account compromise, online abuse, data incidents or technology-contract disputes without damaging the evidence. Review lawful preservation, platform or authority reporting and contractual responsibilities before selecting a response.",
      "ar": "نراجع اختراق الحساب أو الإساءة الإلكترونية أو حادث البيانات أو نزاع العقد التقني دون الإضرار بالأدلة، مع تقييم الحفظ المشروع والإبلاغ للمنصة أو الجهة والمسؤوليات التعاقدية قبل اختيار الرد."
    },
    "documents": {
      "en": [
        "Incident timeline, URLs and original messages",
        "Available access logs and platform notifications",
        "Relevant IT, hosting, processing or service contracts",
        "Prior reports, responses and documented impact"
      ],
      "ar": [
        "تسلسل الحادث والروابط والرسائل الأصلية",
        "سجلات الدخول المتاحة وإشعارات المنصة",
        "عقود التقنية أو الاستضافة أو المعالجة أو الخدمة ذات الصلة",
        "البلاغات السابقة والردود والأثر الموثق"
      ]
    }
  },
  "technology-data-protection": {
    "summary": {
      "en": "Respond to account compromise, online abuse, data incidents or technology-contract disputes without damaging the evidence. Review lawful preservation, platform or authority reporting and contractual responsibilities before selecting a response.",
      "ar": "نراجع اختراق الحساب أو الإساءة الإلكترونية أو حادث البيانات أو نزاع العقد التقني دون الإضرار بالأدلة، مع تقييم الحفظ المشروع والإبلاغ للمنصة أو الجهة والمسؤوليات التعاقدية قبل اختيار الرد."
    },
    "documents": {
      "en": [
        "Incident timeline, URLs and original messages",
        "Available access logs and platform notifications",
        "Relevant IT, hosting, processing or service contracts",
        "Prior reports, responses and documented impact"
      ],
      "ar": [
        "تسلسل الحادث والروابط والرسائل الأصلية",
        "سجلات الدخول المتاحة وإشعارات المنصة",
        "عقود التقنية أو الاستضافة أو المعالجة أو الخدمة ذات الصلة",
        "البلاغات السابقة والردود والأثر الموثق"
      ]
    }
  },
  "employment-law": {
    "summary": {
      "en": "Assess unpaid wages, termination, workplace discipline or end-of-service calculations against the employment relationship and payment history. Review the appropriate complaint route and the effect of signing a resignation or settlement before acting.",
      "ar": "نقيّم الأجور غير المدفوعة والإنهاء والجزاءات الوظيفية وحساب مستحقات نهاية الخدمة وفق علاقة العمل وسجل السداد، مع مراجعة مسار الشكوى وأثر توقيع الاستقالة أو التسوية قبل اتخاذ القرار."
    },
    "documents": {
      "en": [
        "Employment contract, amendments and work-status records",
        "Payslips, bank transfers and attendance or leave records",
        "Warnings, termination or resignation notices",
        "Benefit calculation and any proposed settlement"
      ],
      "ar": [
        "عقد العمل وتعديلاته ومستندات الوضع الوظيفي",
        "مسيرات الأجر والتحويلات وسجلات الحضور أو الإجازات",
        "الإنذارات وإخطارات الإنهاء أو الاستقالة",
        "حساب المستحقات وأي تسوية مقترحة"
      ]
    }
  },
  "employment-labour": {
    "summary": {
      "en": "Assess unpaid wages, termination, workplace discipline or end-of-service calculations against the employment relationship and payment history. Review the appropriate complaint route and the effect of signing a resignation or settlement before acting.",
      "ar": "نقيّم الأجور غير المدفوعة والإنهاء والجزاءات الوظيفية وحساب مستحقات نهاية الخدمة وفق علاقة العمل وسجل السداد، مع مراجعة مسار الشكوى وأثر توقيع الاستقالة أو التسوية قبل اتخاذ القرار."
    },
    "documents": {
      "en": [
        "Employment contract, amendments and work-status records",
        "Payslips, bank transfers and attendance or leave records",
        "Warnings, termination or resignation notices",
        "Benefit calculation and any proposed settlement"
      ],
      "ar": [
        "عقد العمل وتعديلاته ومستندات الوضع الوظيفي",
        "مسيرات الأجر والتحويلات وسجلات الحضور أو الإجازات",
        "الإنذارات وإخطارات الإنهاء أو الاستقالة",
        "حساب المستحقات وأي تسوية مقترحة"
      ]
    }
  },
  "enforcement": {
    "summary": {
      "en": "Determine whether a judgment, instrument or unpaid claim supports an enforcement application or needs a prior merits claim. Review service, objections, payment records and available asset information before recommending recovery steps.",
      "ar": "نحدد ما إذا كان الحكم أو السند أو الدين غير المدفوع يصلح لطلب التنفيذ أو يحتاج إلى دعوى أصلية، مع مراجعة التبليغ والاعتراضات والسداد ومعلومات الأصول قبل اقتراح خطوات التحصيل."
    },
    "documents": {
      "en": [
        "Judgment, award or instrument in full",
        "Finality and service records where applicable",
        "Debt calculation and all payments received",
        "Existing execution orders and lawfully available asset information"
      ],
      "ar": [
        "الحكم أو قرار التحكيم أو السند كاملاً",
        "مستندات القطعية والتبليغ عند انطباقها",
        "حساب الدين وجميع المبالغ المستلمة",
        "أوامر التنفيذ القائمة ومعلومات الأصول المتاحة بصورة مشروعة"
      ]
    }
  },
  "enforcement-debt-recovery": {
    "summary": {
      "en": "Determine whether a judgment, instrument or unpaid claim supports an enforcement application or needs a prior merits claim. Review service, objections, payment records and available asset information before recommending recovery steps.",
      "ar": "نحدد ما إذا كان الحكم أو السند أو الدين غير المدفوع يصلح لطلب التنفيذ أو يحتاج إلى دعوى أصلية، مع مراجعة التبليغ والاعتراضات والسداد ومعلومات الأصول قبل اقتراح خطوات التحصيل."
    },
    "documents": {
      "en": [
        "Judgment, award or instrument in full",
        "Finality and service records where applicable",
        "Debt calculation and all payments received",
        "Existing execution orders and lawfully available asset information"
      ],
      "ar": [
        "الحكم أو قرار التحكيم أو السند كاملاً",
        "مستندات القطعية والتبليغ عند انطباقها",
        "حساب الدين وجميع المبالغ المستلمة",
        "أوامر التنفيذ القائمة ومعلومات الأصول المتاحة بصورة مشروعة"
      ]
    }
  },
  "family-law": {
    "summary": {
      "en": "Review separation, maintenance, custody, contact or family-status recognition with attention to the people affected and existing orders. Identify the applicable personal-status framework and urgent child or financial concerns before choosing a procedure.",
      "ar": "نراجع الانفصال والنفقة والحضانة والزيارة والاعتراف بالحالة الأسرية مع مراعاة الأطراف والأحكام القائمة، لتحديد إطار الأحوال الشخصية المنطبق والمسائل العاجلة المتعلقة بالأطفال أو المال قبل اختيار الإجراء."
    },
    "documents": {
      "en": [
        "Marriage, divorce and birth certificates relevant to the issue",
        "Existing family judgments or agreed arrangements",
        "Income and expense records for financial claims",
        "Residence, travel and notification records relevant to the request"
      ],
      "ar": [
        "وثائق الزواج أو الطلاق أو الميلاد المتصلة بالمسألة",
        "الأحكام الأسرية أو الترتيبات المتفق عليها",
        "مستندات الدخل والنفقات للمطالبات المالية",
        "مستندات الإقامة والسفر والتبليغ المتصلة بالطلب"
      ]
    }
  },
  "family-personal-status": {
    "summary": {
      "en": "Review separation, maintenance, custody, contact or family-status recognition with attention to the people affected and existing orders. Identify the applicable personal-status framework and urgent child or financial concerns before choosing a procedure.",
      "ar": "نراجع الانفصال والنفقة والحضانة والزيارة والاعتراف بالحالة الأسرية مع مراعاة الأطراف والأحكام القائمة، لتحديد إطار الأحوال الشخصية المنطبق والمسائل العاجلة المتعلقة بالأطفال أو المال قبل اختيار الإجراء."
    },
    "documents": {
      "en": [
        "Marriage, divorce and birth certificates relevant to the issue",
        "Existing family judgments or agreed arrangements",
        "Income and expense records for financial claims",
        "Residence, travel and notification records relevant to the request"
      ],
      "ar": [
        "وثائق الزواج أو الطلاق أو الميلاد المتصلة بالمسألة",
        "الأحكام الأسرية أو الترتيبات المتفق عليها",
        "مستندات الدخل والنفقات للمطالبات المالية",
        "مستندات الإقامة والسفر والتبليغ المتصلة بالطلب"
      ]
    }
  },
  "foreign-investment": {
    "summary": {
      "en": "Assess market entry, an investment structure or a dispute before committing funds. Distinguish investor registration from company formation, sector approvals and operating permissions, and review partner rights and exit terms.",
      "ar": "نقيّم دخول السوق وهيكل الاستثمار أو النزاع قبل تحويل الأموال، مع التمييز بين تسجيل المستثمر وتأسيس الشركة والموافقات القطاعية وتصاريح التشغيل ومراجعة حقوق الشركاء وشروط التخارج."
    },
    "documents": {
      "en": [
        "Proposed activity, ownership structure and investor details",
        "Registration, licensing and authority correspondence",
        "Business plan and proposed company or joint-venture documents",
        "Investment, funding and exit agreements"
      ],
      "ar": [
        "النشاط المقترح وهيكل الملكية وبيانات المستثمر",
        "مستندات التسجيل والترخيص ومراسلات الجهة",
        "خطة العمل ووثائق الشركة أو المشروع المشترك المقترحة",
        "اتفاقات الاستثمار والتمويل والتخارج"
      ]
    }
  },
  "foreign-investment-market-entry": {
    "summary": {
      "en": "Assess market entry, an investment structure or a dispute before committing funds. Distinguish investor registration from company formation, sector approvals and operating permissions, and review partner rights and exit terms.",
      "ar": "نقيّم دخول السوق وهيكل الاستثمار أو النزاع قبل تحويل الأموال، مع التمييز بين تسجيل المستثمر وتأسيس الشركة والموافقات القطاعية وتصاريح التشغيل ومراجعة حقوق الشركاء وشروط التخارج."
    },
    "documents": {
      "en": [
        "Proposed activity, ownership structure and investor details",
        "Registration, licensing and authority correspondence",
        "Business plan and proposed company or joint-venture documents",
        "Investment, funding and exit agreements"
      ],
      "ar": [
        "النشاط المقترح وهيكل الملكية وبيانات المستثمر",
        "مستندات التسجيل والترخيص ومراسلات الجهة",
        "خطة العمل ووثائق الشركة أو المشروع المشترك المقترحة",
        "اتفاقات الاستثمار والتمويل والتخارج"
      ]
    }
  },
  "insurance-law": {
    "summary": {
      "en": "Review a rejected or delayed insurance claim against the policy, exclusions and claim history. Separate coverage, valuation and fault disputes, and identify whether the next step is an insurer response, regulatory complaint or formal dispute.",
      "ar": "نراجع مطالبة التأمين المرفوضة أو المتأخرة وفق الوثيقة والاستثناءات وسجل المطالبة، مع التمييز بين منازعة التغطية والتقدير والخطأ وتحديد ما إذا كانت الخطوة التالية رداً للمؤمّن أو شكوى تنظيمية أو منازعة رسمية."
    },
    "documents": {
      "en": [
        "Complete policy, schedule, endorsements and exclusions",
        "Claim form and insurer’s written decision",
        "Incident reports, valuations and relevant expert material",
        "Notification dates and insurer correspondence"
      ],
      "ar": [
        "وثيقة التأمين وجدولها وملاحقها واستثناءاتها كاملة",
        "نموذج المطالبة وقرار شركة التأمين المكتوب",
        "تقارير الحادث والتقييم ومستندات الخبرة ذات الصلة",
        "تواريخ الإبلاغ والمراسلات مع شركة التأمين"
      ]
    }
  },
  "insurance": {
    "summary": {
      "en": "Review a rejected or delayed insurance claim against the policy, exclusions and claim history. Separate coverage, valuation and fault disputes, and identify whether the next step is an insurer response, regulatory complaint or formal dispute.",
      "ar": "نراجع مطالبة التأمين المرفوضة أو المتأخرة وفق الوثيقة والاستثناءات وسجل المطالبة، مع التمييز بين منازعة التغطية والتقدير والخطأ وتحديد ما إذا كانت الخطوة التالية رداً للمؤمّن أو شكوى تنظيمية أو منازعة رسمية."
    },
    "documents": {
      "en": [
        "Complete policy, schedule, endorsements and exclusions",
        "Claim form and insurer’s written decision",
        "Incident reports, valuations and relevant expert material",
        "Notification dates and insurer correspondence"
      ],
      "ar": [
        "وثيقة التأمين وجدولها وملاحقها واستثناءاتها كاملة",
        "نموذج المطالبة وقرار شركة التأمين المكتوب",
        "تقارير الحادث والتقييم ومستندات الخبرة ذات الصلة",
        "تواريخ الإبلاغ والمراسلات مع شركة التأمين"
      ]
    }
  },
  "intellectual-property": {
    "summary": {
      "en": "Assess ownership, registration, licensing or infringement of a mark, work or invention. Compare the claimed right with the disputed use and available evidence before choosing an objection, negotiated licence or enforcement response.",
      "ar": "نقيّم ملكية العلامة أو المصنف أو الاختراع وتسجيله وترخيصه أو التعدي عليه، بمقارنة الحق المدعى به بالاستخدام المتنازع عليه وأدلته قبل اختيار الاعتراض أو الترخيص التفاوضي أو إجراء الحماية."
    },
    "documents": {
      "en": [
        "Registration or application records, if any",
        "Dated evidence of creation, ownership and use",
        "Assignment, employment or licence agreements",
        "Examples and dates of the disputed use or official objection"
      ],
      "ar": [
        "مستندات التسجيل أو الطلب إن وجدت",
        "أدلة مؤرخة على الإنشاء والملكية والاستخدام",
        "اتفاقات التنازل أو العمل أو الترخيص",
        "نماذج الاستخدام المتنازع عليه وتواريخه أو الاعتراض الرسمي"
      ]
    }
  },
  "medical-malpractice": {
    "summary": {
      "en": "Assess a treatment complaint using the medical chronology, records and specialist findings. Distinguish an adverse outcome from an evidenced breach, and review causation, loss and the appropriate medical complaint or compensation route.",
      "ar": "نقيّم الشكوى العلاجية وفق التسلسل الطبي والسجلات والنتائج الفنية، مع التمييز بين النتيجة غير المرغوبة والخطأ المثبت ومراجعة السببية والضرر ومسار الشكوى الطبية أو التعويض."
    },
    "documents": {
      "en": [
        "Available medical records, consent forms and test results",
        "Treatment timeline and referral or discharge records",
        "Medical committee or expert reports, if issued",
        "Documented expenses, harm and prior complaint responses"
      ],
      "ar": [
        "السجلات الطبية ونماذج الموافقة ونتائج الفحوص المتاحة",
        "تسلسل العلاج ومستندات الإحالة أو الخروج",
        "تقارير اللجنة الطبية أو الخبرة إن صدرت",
        "النفقات والضرر الموثقان والردود على الشكاوى السابقة"
      ]
    }
  },
  "healthcare-medical-liability": {
    "summary": {
      "en": "Assess a treatment complaint using the medical chronology, records and specialist findings. Distinguish an adverse outcome from an evidenced breach, and review causation, loss and the appropriate medical complaint or compensation route.",
      "ar": "نقيّم الشكوى العلاجية وفق التسلسل الطبي والسجلات والنتائج الفنية، مع التمييز بين النتيجة غير المرغوبة والخطأ المثبت ومراجعة السببية والضرر ومسار الشكوى الطبية أو التعويض."
    },
    "documents": {
      "en": [
        "Available medical records, consent forms and test results",
        "Treatment timeline and referral or discharge records",
        "Medical committee or expert reports, if issued",
        "Documented expenses, harm and prior complaint responses"
      ],
      "ar": [
        "السجلات الطبية ونماذج الموافقة ونتائج الفحوص المتاحة",
        "تسلسل العلاج ومستندات الإحالة أو الخروج",
        "تقارير اللجنة الطبية أو الخبرة إن صدرت",
        "النفقات والضرر الموثقان والردود على الشكاوى السابقة"
      ]
    }
  },
  "real-estate": {
    "summary": {
      "en": "Review title, possession, rent or construction obligations using the property records and the actual agreement. Separate registration and boundary issues from payment, defects or handover claims before giving notice or starting proceedings.",
      "ar": "نراجع الملكية والحيازة والإيجار والتزامات البناء وفق سجلات العقار والاتفاق الفعلي، مع فصل مسائل التسجيل والحدود عن مطالبات السداد والعيوب والتسليم قبل الإخطار أو بدء الإجراءات."
    },
    "documents": {
      "en": [
        "Title or registry records and property identification",
        "Sale, lease or construction agreement and amendments",
        "Payment, handover and inspection records",
        "Notices, surveys and relevant defect or valuation reports"
      ],
      "ar": [
        "سند الملكية أو السجل وبيانات العقار",
        "عقد البيع أو الإيجار أو البناء وتعديلاته",
        "مستندات السداد والتسليم والفحص",
        "الإخطارات والمخططات وتقارير العيوب أو التقييم ذات الصلة"
      ]
    }
  },
  "real-estate-construction": {
    "summary": {
      "en": "Review title, possession, rent or construction obligations using the property records and the actual agreement. Separate registration and boundary issues from payment, defects or handover claims before giving notice or starting proceedings.",
      "ar": "نراجع الملكية والحيازة والإيجار والتزامات البناء وفق سجلات العقار والاتفاق الفعلي، مع فصل مسائل التسجيل والحدود عن مطالبات السداد والعيوب والتسليم قبل الإخطار أو بدء الإجراءات."
    },
    "documents": {
      "en": [
        "Title or registry records and property identification",
        "Sale, lease or construction agreement and amendments",
        "Payment, handover and inspection records",
        "Notices, surveys and relevant defect or valuation reports"
      ],
      "ar": [
        "سند الملكية أو السجل وبيانات العقار",
        "عقد البيع أو الإيجار أو البناء وتعديلاته",
        "مستندات السداد والتسليم والفحص",
        "الإخطارات والمخططات وتقارير العيوب أو التقييم ذات الصلة"
      ]
    }
  },
  "tax-zakat": {
    "summary": {
      "en": "Review registration, reporting, assessment or penalty questions using the tax period, activity and authority record. Identify the applicable tax and objection route before disputing an amount or submitting a correction.",
      "ar": "نراجع مسائل التسجيل والإقرار والربط والغرامة وفق الفترة الضريبية والنشاط وملف الجهة، لتحديد الضريبة المنطبقة ومسار الاعتراض قبل منازعة المبلغ أو تقديم التصحيح."
    },
    "documents": {
      "en": [
        "Assessment or penalty decision and notification record",
        "Relevant registration, returns and correspondence",
        "Invoices, ledgers and supporting transaction documents",
        "Reconciliation of the disputed amount and prior objections"
      ],
      "ar": [
        "قرار الربط أو الغرامة وإثبات تبليغه",
        "التسجيل والإقرارات والمراسلات ذات الصلة",
        "الفواتير والدفاتر ومستندات المعاملات المؤيدة",
        "مطابقة المبلغ المتنازع عليه والاعتراضات السابقة"
      ]
    }
  },
  "tax-vat": {
    "summary": {
      "en": "Review registration, reporting, assessment or penalty questions using the tax period, activity and authority record. Identify the applicable tax and objection route before disputing an amount or submitting a correction.",
      "ar": "نراجع مسائل التسجيل والإقرار والربط والغرامة وفق الفترة الضريبية والنشاط وملف الجهة، لتحديد الضريبة المنطبقة ومسار الاعتراض قبل منازعة المبلغ أو تقديم التصحيح."
    },
    "documents": {
      "en": [
        "Assessment or penalty decision and notification record",
        "Relevant registration, returns and correspondence",
        "Invoices, ledgers and supporting transaction documents",
        "Reconciliation of the disputed amount and prior objections"
      ],
      "ar": [
        "قرار الربط أو الغرامة وإثبات تبليغه",
        "التسجيل والإقرارات والمراسلات ذات الصلة",
        "الفواتير والدفاتر ومستندات المعاملات المؤيدة",
        "مطابقة المبلغ المتنازع عليه والاعتراضات السابقة"
      ]
    }
  },
  "civil-law": {
    "summary": {
      "en": "Assess contractual and non-contractual obligations, ownership or compensation from the facts and available proof. Distinguish validity, performance and damages questions so the requested remedy matches the legal basis of the claim.",
      "ar": "نقيّم الالتزامات العقدية وغير العقدية والملكية والتعويض انطلاقاً من الوقائع والأدلة، مع التمييز بين صحة التصرف وتنفيذه والضرر حتى يطابق الطلب الأساس القانوني للمطالبة."
    },
    "documents": {
      "en": [
        "Agreement or record of the disputed transaction",
        "Chronology and supporting communications",
        "Documents proving ownership, payment or loss",
        "Previous notices, settlements or judgments"
      ],
      "ar": [
        "الاتفاق أو مستند التصرف المتنازع عليه",
        "تسلسل الوقائع والمراسلات المؤيدة",
        "مستندات الملكية أو السداد أو الضرر",
        "الإخطارات أو التسويات أو الأحكام السابقة"
      ]
    }
  },
  "civil-procedure": {
    "summary": {
      "en": "Review the claim, service and case history to identify the correct court, procedural request or appeal route. Check evidence gaps and filing deadlines before submitting a pleading or relying on an existing judgment.",
      "ar": "نراجع الدعوى والتبليغ وسجل القضية لتحديد المحكمة والطلب الإجرائي أو طريق الطعن المناسب، مع فحص نقص الأدلة ومواعيد القيد قبل تقديم مذكرة أو الاستناد إلى حكم قائم."
    },
    "documents": {
      "en": [
        "Complete pleadings and attachments",
        "Service records and hearing minutes",
        "Judgments, expert reports and procedural orders",
        "Chronology of filing, notification and appeal dates"
      ],
      "ar": [
        "صحف الدعوى والمذكرات ومرفقاتها كاملة",
        "مستندات التبليغ ومحاضر الجلسات",
        "الأحكام وتقارير الخبرة والأوامر الإجرائية",
        "تسلسل مواعيد القيد والتبليغ والطعن"
      ]
    }
  },
  "litigation-court-disputes": {
    "summary": {
      "en": "Review the claim, service and case history to identify the correct court, procedural request or appeal route. Check evidence gaps and filing deadlines before submitting a pleading or relying on an existing judgment.",
      "ar": "نراجع الدعوى والتبليغ وسجل القضية لتحديد المحكمة والطلب الإجرائي أو طريق الطعن المناسب، مع فحص نقص الأدلة ومواعيد القيد قبل تقديم مذكرة أو الاستناد إلى حكم قائم."
    },
    "documents": {
      "en": [
        "Complete pleadings and attachments",
        "Service records and hearing minutes",
        "Judgments, expert reports and procedural orders",
        "Chronology of filing, notification and appeal dates"
      ],
      "ar": [
        "صحف الدعوى والمذكرات ومرفقاتها كاملة",
        "مستندات التبليغ ومحاضر الجلسات",
        "الأحكام وتقارير الخبرة والأوامر الإجرائية",
        "تسلسل مواعيد القيد والتبليغ والطعن"
      ]
    }
  },
  "consumer-ecommerce": {
    "summary": {
      "en": "Review an online purchase, refund refusal or platform-account dispute using the advertised terms and transaction record. Identify the roles of the seller, marketplace and payment provider before directing the complaint.",
      "ar": "نراجع الشراء الإلكتروني أو رفض الاسترداد أو نزاع حساب المنصة وفق الشروط المعلنة وسجل المعاملة، مع تحديد دور البائع والسوق الإلكتروني ومقدم الدفع قبل توجيه الشكوى."
    },
    "documents": {
      "en": [
        "Order, receipt and payment reference",
        "Terms and product description shown at purchase",
        "Delivery, defect or account-restriction evidence",
        "Refund request, complaint and responses"
      ],
      "ar": [
        "الطلب والإيصال ومرجع الدفع",
        "الشروط ووصف المنتج المعروضان عند الشراء",
        "أدلة التسليم أو العيب أو تقييد الحساب",
        "طلب الاسترداد والشكوى والردود"
      ]
    }
  },
  "wills-estates": {
    "summary": {
      "en": "Plan or review a will and estate administration around the deceased’s or testator’s status, asset location and family circumstances. Check the applicable succession and registration route before assuming a foreign will or informal instruction transfers an asset.",
      "ar": "نراجع إعداد الوصية وإدارة التركة وفق صفة الموصي أو المتوفى ومكان الأصول وظروف الأسرة، مع التحقق من مسار الإرث والتسجيل قبل افتراض أن الوصية الأجنبية أو التعليمات غير الرسمية تنقل الأصل."
    },
    "documents": {
      "en": [
        "Will and any amendments or probate documents",
        "Relevant status, death and family certificates",
        "Asset and liability inventory by location",
        "Existing estate orders and beneficiary correspondence"
      ],
      "ar": [
        "الوصية وتعديلاتها أو مستندات إثباتها",
        "وثائق الصفة والوفاة والأسرة ذات الصلة",
        "قائمة الأصول والالتزامات بحسب مكانها",
        "أوامر التركة القائمة ومراسلات المستفيدين"
      ]
    }
  },
  "immigration-residency": {
    "summary": {
      "en": "Review a visa, residence, work-permit or entry-restriction issue from the issuing authority’s decision and current status. Distinguish immigration permissions from employment rights and identify time-sensitive steps before travel or cancellation.",
      "ar": "نراجع التأشيرة أو الإقامة أو تصريح العمل أو قيد الدخول وفق قرار الجهة المصدرة والوضع الحالي، مع التمييز بين تصاريح الإقامة والحقوق العمالية وتحديد الخطوات العاجلة قبل السفر أو الإلغاء."
    },
    "documents": {
      "en": [
        "Relevant passport and current permit details",
        "Application, refusal or cancellation notice",
        "Employment or sponsorship documents relevant to the issue",
        "Entry, exit and prior authority correspondence"
      ],
      "ar": [
        "بيانات جواز السفر والتصريح الحالي ذات الصلة",
        "الطلب أو إخطار الرفض أو الإلغاء",
        "مستندات العمل أو الكفالة المتصلة بالمسألة",
        "سجل الدخول والخروج والمراسلات السابقة مع الجهة"
      ]
    }
  },
  "insolvency-restructuring": {
    "summary": {
      "en": "Assess cash-flow distress, creditor claims and restructuring options before transferring assets or choosing a filing route. The debtor’s legal form, jurisdiction and financial records determine which framework requires examination.",
      "ar": "نقيّم التعثر والمطالبات وخيارات إعادة الهيكلة قبل نقل الأصول أو اختيار مسار القيد، إذ يحدد شكل المدين واختصاصه وسجله المالي الإطار الذي يلزم فحصه."
    },
    "documents": {
      "en": [
        "Current accounts, cash-flow forecasts and asset register",
        "Creditor list, security and maturity dates",
        "Debt demands, judgments and execution records",
        "Ownership records and recent material transactions"
      ],
      "ar": [
        "الحسابات الحالية وتوقعات التدفق النقدي وسجل الأصول",
        "قائمة الدائنين والضمانات ومواعيد الاستحقاق",
        "مطالبات الديون والأحكام ومستندات التنفيذ",
        "سجلات الملكية والمعاملات الجوهرية الحديثة"
      ]
    }
  },
  "maritime-aviation-transport": {
    "summary": {
      "en": "Review cargo loss, delay or passenger claims by identifying the transport mode, route and contractual carrier. Preserve delivery and damage evidence and check notice requirements before assuming the same liability rules apply to every leg of the journey.",
      "ar": "نراجع فقد البضائع وتأخرها ومطالبات المسافرين بتحديد وسيلة النقل والمسار والناقل المتعاقد، مع حفظ أدلة التسليم والضرر وفحص متطلبات الإخطار دون افتراض وحدة قواعد المسؤولية في جميع مراحل الرحلة."
    },
    "documents": {
      "en": [
        "Bill of lading, air waybill, ticket or carriage agreement",
        "Booking terms, route and carrier details",
        "Delivery records, survey and damage photographs",
        "Claim notice, response and evidence of value or loss"
      ],
      "ar": [
        "سند الشحن أو بوليصة النقل الجوي أو التذكرة أو عقد النقل",
        "شروط الحجز والمسار وبيانات الناقل",
        "سجلات التسليم والمعاينة وصور الضرر",
        "إخطار المطالبة والرد وأدلة القيمة أو الضرر"
      ]
    }
  }
};

/** Related services follow the likely next question, rather than catalogue order. */
export const UAE_RELATED_SERVICES: Record<string, string[]> = {
  "urgent-legal-assistance": ["commercial-contracts", "litigation-court-disputes", "criminal-investigations"],
  "administrative-regulatory": ["litigation-court-disputes", "foreign-investment-market-entry", "tax-vat"],
  "arbitration-mediation": ["commercial-contracts", "enforcement-debt-recovery", "litigation-court-disputes"],
  "banking-finance": ["enforcement-debt-recovery", "insolvency-restructuring", "commercial-contracts"],
  "commercial-contracts": ["corporate-commercial", "arbitration-mediation", "enforcement-debt-recovery"],
  "consumer-ecommerce": ["commercial-contracts", "technology-data-protection", "banking-finance"],
  "corporate-commercial": ["foreign-investment-market-entry", "commercial-contracts", "insolvency-restructuring"],
  "criminal-investigations": ["technology-data-protection", "banking-finance", "immigration-residency"],
  "employment-labour": ["immigration-residency", "litigation-court-disputes", "commercial-contracts"],
  "enforcement-debt-recovery": ["litigation-court-disputes", "arbitration-mediation", "insolvency-restructuring"],
  "family-personal-status": ["wills-estates", "immigration-residency", "enforcement-debt-recovery"],
  "foreign-investment-market-entry": ["corporate-commercial", "tax-vat", "immigration-residency"],
  "healthcare-medical-liability": ["insurance", "administrative-regulatory", "litigation-court-disputes"],
  "immigration-residency": ["employment-labour", "family-personal-status", "foreign-investment-market-entry"],
  "insolvency-restructuring": ["corporate-commercial", "banking-finance", "enforcement-debt-recovery"],
  insurance: ["healthcare-medical-liability", "real-estate-construction", "litigation-court-disputes"],
  "intellectual-property": ["commercial-contracts", "technology-data-protection", "consumer-ecommerce"],
  "litigation-court-disputes": ["enforcement-debt-recovery", "arbitration-mediation", "commercial-contracts"],
  "maritime-aviation-transport": ["insurance", "commercial-contracts", "arbitration-mediation"],
  "real-estate-construction": ["commercial-contracts", "litigation-court-disputes", "enforcement-debt-recovery"],
  "tax-vat": ["corporate-commercial", "foreign-investment-market-entry", "administrative-regulatory"],
  "technology-data-protection": ["intellectual-property", "commercial-contracts", "criminal-investigations"],
  "wills-estates": ["family-personal-status", "real-estate-construction", "corporate-commercial"],
};

export const BILINGUAL_SERVICE_COVERAGE: Record<string, Localized<string[]>> = {
  "family-law": {
    "en": [
      "Marriage, separation and divorce",
      "Maintenance and financial arrangements",
      "Custody, contact and child travel",
      "Family-status documents and recognition",
      "Inheritance and estate questions"
    ],
    "ar": [
      "الزواج والانفصال والطلاق",
      "النفقة والترتيبات المالية",
      "الحضانة والزيارة وسفر الأطفال",
      "وثائق الحالة الأسرية والاعتراف بها",
      "مسائل الميراث والتركات"
    ]
  },
  "business-law": {
    "en": [
      "Commercial payment and invoice disputes",
      "Supply, distribution and agency arrangements",
      "Business-partner disputes",
      "Commercial evidence and settlement",
      "Coordination with corporate or regulatory procedures"
    ],
    "ar": [
      "منازعات السداد والفواتير التجارية",
      "ترتيبات التوريد والتوزيع والوكالات",
      "منازعات شركاء الأعمال",
      "الإثبات التجاري والتسوية",
      "التنسيق مع إجراءات الشركات أو الإجراءات التنظيمية"
    ]
  },
  "real-estate": {
    "en": [
      "Title and property-registration questions",
      "Lease, rent and eviction disputes",
      "Construction performance, delay and defects",
      "Handover, possession and boundaries",
      "Property loss and compensation assessment"
    ],
    "ar": [
      "مسائل الملكية والتسجيل العقاري",
      "منازعات الإيجار والأجرة والإخلاء",
      "تنفيذ البناء وتأخره وعيوبه",
      "التسليم والحيازة والحدود",
      "تقييم الضرر العقاري والتعويض"
    ]
  },
  "employment-law": {
    "en": [
      "Employment contracts and workplace policies",
      "Wages, leave and end-of-service calculations",
      "Termination, resignation and discipline",
      "Workplace injury and evidence",
      "Labour complaints and settlement"
    ],
    "ar": [
      "عقود العمل وسياسات المنشأة",
      "حساب الأجور والإجازات ومستحقات نهاية الخدمة",
      "الإنهاء والاستقالة والجزاءات",
      "إصابة العمل وإثباتها",
      "الشكاوى العمالية والتسوية"
    ]
  },
  "foreign-investment": {
    "en": [
      "Investor registration and activity approvals",
      "Company, branch and joint-venture structures",
      "Ownership and partner arrangements",
      "Regulatory decisions and investment disputes",
      "Funding, exit and cross-border coordination"
    ],
    "ar": [
      "تسجيل المستثمر والموافقات على النشاط",
      "هياكل الشركات والفروع والمشاريع المشتركة",
      "ترتيبات الملكية والشركاء",
      "القرارات التنظيمية ومنازعات الاستثمار",
      "التمويل والتخارج والتنسيق عبر الحدود"
    ]
  },
  "administrative-law": {
    "en": [
      "Licence refusal, suspension and cancellation",
      "Administrative penalties and objections",
      "Tender exclusion and award challenges",
      "Government-contract disputes",
      "Judicial review and compensation assessment"
    ],
    "ar": [
      "رفض الترخيص وتعليقه وإلغاؤه",
      "الجزاءات الإدارية والتظلم منها",
      "الطعن في الاستبعاد من المناقصة أو الترسية",
      "منازعات العقود الحكومية",
      "الطعن القضائي وتقييم التعويض"
    ]
  },
  "arbitration": {
    "en": [
      "Arbitration clauses and signatory authority",
      "Seat, institution and tribunal jurisdiction",
      "Claims, defence and evidence",
      "Settlement and interim-measure assessment",
      "Award challenges, recognition and enforcement"
    ],
    "ar": [
      "شروط التحكيم وسلطة الموقّع",
      "المقر والمؤسسة واختصاص الهيئة",
      "المطالبات والدفوع والإثبات",
      "التسوية وتقييم التدابير المؤقتة",
      "الطعن في الحكم والاعتراف به وتنفيذه"
    ]
  },
  "enforcement": {
    "en": [
      "Enforceable instruments and judgment status",
      "Debt balances, payment and settlement",
      "Foreign judgment and award recognition",
      "Debtor objections and execution procedure",
      "Lawful asset information and attachment assessment"
    ],
    "ar": [
      "السندات التنفيذية وحالة الحكم",
      "أرصدة الديون والسداد والتسوية",
      "الاعتراف بالأحكام والقرارات الأجنبية",
      "اعتراضات المدين وإجراءات التنفيذ",
      "معلومات الأصول المشروعة وتقييم الحجز"
    ]
  },
  "companies-law": {
    "en": [
      "Formation, registration and legal structure",
      "Shareholder agreements and ownership changes",
      "Directors’ duties and signing authority",
      "Partner exit, valuation and buyout disputes",
      "Restructuring, dissolution and liquidation"
    ],
    "ar": [
      "التأسيس والتسجيل والشكل القانوني",
      "اتفاقات الشركاء وتغييرات الملكية",
      "واجبات المديرين وصلاحيات التوقيع",
      "خروج الشريك والتقييم ومنازعة شراء الحصة",
      "إعادة الهيكلة والحل والتصفية"
    ]
  },
  "contracts": {
    "en": [
      "Drafting and negotiation",
      "Scope, payment and acceptance terms",
      "Breach notices and performance disputes",
      "Termination, damages and agreed compensation",
      "Evidence, authority and dispute-resolution clauses"
    ],
    "ar": [
      "الصياغة والتفاوض",
      "شروط النطاق والسداد والقبول",
      "إخطارات الإخلال ومنازعات التنفيذ",
      "الإنهاء والتعويض والتعويض الاتفاقي",
      "الإثبات والصلاحية وشروط تسوية النزاع"
    ]
  },
  "criminal-law": {
    "en": [
      "Complaints and investigation response",
      "Financial crime, fraud and forgery allegations",
      "Cybercrime and digital-evidence questions",
      "Detention and release applications",
      "Trial, appeal and procedural defence"
    ],
    "ar": [
      "الشكاوى والرد في التحقيق",
      "اتهامات الجرائم المالية والاحتيال والتزوير",
      "الجرائم المعلوماتية والأدلة الرقمية",
      "طلبات التوقيف والإفراج",
      "المحاكمة والطعن والدفاع الإجرائي"
    ]
  },
  "banking-finance": {
    "en": [
      "Loan and financing terms",
      "Guarantees and security",
      "Disputed transactions and payment records",
      "Restructuring and repayment negotiations",
      "Bank complaints and financial disputes"
    ],
    "ar": [
      "شروط القروض والتمويل",
      "الكفالات والضمانات",
      "العمليات المتنازع عليها وسجلات السداد",
      "إعادة الهيكلة والتفاوض على السداد",
      "الشكاوى المصرفية والمنازعات المالية"
    ]
  },
  "intellectual-property": {
    "en": [
      "Trademark clearance, registration and opposition",
      "Copyright ownership and infringement",
      "Patent and design protection questions",
      "Licensing, assignment and confidentiality",
      "Counterfeiting and evidence preservation"
    ],
    "ar": [
      "فحص العلامة وتسجيلها والاعتراض عليها",
      "ملكية حق المؤلف والتعدي عليه",
      "مسائل حماية البراءات والتصاميم",
      "الترخيص والتنازل والسرية",
      "التقليد وحفظ الأدلة"
    ]
  },
  "cyber-law": {
    "en": [
      "Account compromise and unauthorised access",
      "Online fraud, defamation and reporting",
      "Digital evidence and preservation",
      "Privacy and data-incident responsibilities",
      "Software, hosting and technology contracts"
    ],
    "ar": [
      "اختراق الحساب والدخول غير المصرح به",
      "الاحتيال والتشهير الإلكتروني والإبلاغ",
      "الأدلة الرقمية وحفظها",
      "مسؤوليات الخصوصية وحوادث البيانات",
      "عقود البرمجيات والاستضافة والتقنية"
    ]
  },
  "medical-malpractice": {
    "en": [
      "Treatment complaints and alleged negligence",
      "Medical records, consent and expert findings",
      "Causation and compensation assessment",
      "Professional or facility complaint routes",
      "Healthcare contracts and confidentiality"
    ],
    "ar": [
      "الشكاوى العلاجية والخطأ المدعى به",
      "السجلات الطبية والموافقة والنتائج الفنية",
      "تقييم السببية والتعويض",
      "مسارات الشكوى المهنية أو الخاصة بالمنشأة",
      "العقود الصحية والسرية"
    ]
  },
  "insurance-law": {
    "en": [
      "Rejected or delayed claims",
      "Policy interpretation and exclusions",
      "Motor, health and commercial coverage",
      "Valuation, fault and subrogation",
      "Insurer complaints and formal dispute routes"
    ],
    "ar": [
      "المطالبات المرفوضة أو المتأخرة",
      "تفسير الوثيقة والاستثناءات",
      "تغطية المركبات والصحة والأعمال",
      "التقدير والخطأ والحلول",
      "شكاوى المؤمّن ومسارات المنازعة الرسمية"
    ]
  },
  "civil-law": {
    "en": [
      "Contractual and non-contractual obligations",
      "Validity, consent and capacity questions",
      "Property and possession rights",
      "Civil evidence and compensation",
      "Settlement and remedy assessment"
    ],
    "ar": [
      "الالتزامات العقدية وغير العقدية",
      "مسائل الصحة والرضا والأهلية",
      "حقوق الملكية والحيازة",
      "الإثبات المدني والتعويض",
      "تقييم التسوية ووسائل الحماية"
    ]
  },
  "civil-procedure": {
    "en": [
      "Jurisdiction and claim filing",
      "Service and procedural objections",
      "Pleadings, expert reports and evidence",
      "Appeal and review requirements",
      "Interim measures and enforcement interfaces"
    ],
    "ar": [
      "الاختصاص وقيد الدعوى",
      "التبليغ والدفوع الإجرائية",
      "المذكرات وتقارير الخبرة والإثبات",
      "متطلبات الطعن والمراجعة",
      "التدابير المؤقتة والمسائل المتصلة بالتنفيذ"
    ]
  },
  "criminal-procedure": {
    "en": [
      "Complaint and investigation procedure",
      "Detention orders and release requests",
      "Service, defence access and hearing records",
      "Trial and evidence objections",
      "Appeal, cassation and judgment status"
    ],
    "ar": [
      "إجراءات الشكوى والتحقيق",
      "أوامر التوقيف وطلبات الإفراج",
      "التبليغ واطلاع الدفاع ومحاضر الجلسات",
      "المحاكمة والاعتراضات على الإثبات",
      "الاستئناف والنقض وحالة الحكم"
    ]
  }
};
