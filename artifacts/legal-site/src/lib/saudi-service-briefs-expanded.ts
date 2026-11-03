import type { Brief } from "./saudi-service-briefs";

// Original service-intake guidance and illustrative review outlines.
export const SAUDI_EXPANDED_SERVICE_BRIEFS: Record<string, { ar: Brief; en: Brief }> = {
  "family-law": {
    "ar": {
      "overview": [
        "أرسل الطلب وأي حكم أو اتفاق سابق. تجنّب بيانات الأطفال غير اللازمة.",
        "نراجع الوثائق ونوضح الوقائع المتنازع عليها والمعلومات الناقصة.",
        "نحدد المخرج والرسوم قبل العمل. إعداد الدعوى والتنفيذ والتمثيل تحتاج إلى تكليف مستقل."
      ],
      "choices": [
        {
          "path": "family-law/alimony-and-child-maintenance",
          "label": "أحتاج إلى مراجعة النفقة والمستندات المالية"
        },
        {
          "path": "family-law/child-custody-and-visitation",
          "label": "المسألة تتعلق بالحضانة أو الزيارة"
        }
      ],
      "intro": "نراجع مسائل النفقة والحضانة والزيارة والانفصال والتركات لتحديد المستندات والخيارات والخطوة التالية."
    },
    "en": {
      "overview": [
        "Send your request and any existing order or agreement. Omit unnecessary children's personal data.",
        "We review the records, disputed facts and missing information.",
        "We agree the output and fee first. Claims, enforcement and representation require separate engagement."
      ],
      "choices": [
        {
          "path": "family-law/alimony-and-child-maintenance",
          "label": "I need maintenance and financial documents reviewed"
        },
        {
          "path": "family-law/child-custody-and-visitation",
          "label": "My matter concerns custody or visitation"
        }
      ],
      "intro": "Review maintenance, custody, visitation, separation or estate matters, with clear documents, options and next steps."
    }
  },
  "real-estate": {
    "ar": {
      "overview": [
        "حدّد العقار وصفَتك ومرحلة المعاملة. أرسل العقد والصك والملاحق والإشعارات.",
        "نراجع وصف العقار والتزامات الدفع والتسليم والمستندات الناقصة.",
        "المراجعة ليست فحصاً هندسياً أو نقل ملكية. الخبرة الفنية والتوثيق والتمثيل تُرتب بصورة مستقلة."
      ],
      "choices": [
        {
          "path": "real-estate/sale-and-purchase-contract-disputes",
          "label": "المسألة تتعلق بعقد بيع أو شراء عقار"
        },
        {
          "path": "real-estate/lease-and-eviction-matters",
          "label": "المسألة تتعلق بالإيجار أو الإخلاء"
        }
      ],
      "intro": "نراجع عقود البيع والإيجار والتسليم ونزاعات الملكية، مع تحديد المستندات والالتزامات محل الخلاف."
    },
    "en": {
      "overview": [
        "Identify the property, your role and transaction stage. Send the contract, title, schedules and notices.",
        "We review the property description, payment and delivery terms, and missing records.",
        "Review is not an engineering inspection or title transfer. Expertise, notarization and representation are separately arranged."
      ],
      "choices": [
        {
          "path": "real-estate/sale-and-purchase-contract-disputes",
          "label": "My issue concerns a property sale or purchase"
        },
        {
          "path": "real-estate/lease-and-eviction-matters",
          "label": "My issue concerns a lease or eviction"
        }
      ],
      "intro": "Review property sales, leases, handover and ownership disputes, focusing on documents and disputed obligations."
    }
  },
  "foreign-investment": {
    "ar": {
      "overview": [
        "حدّد النشاط والمستثمرين وجنسياتهم وهيكل الملكية والكيان المقترح أو القائم.",
        "نوضح المتطلبات التي تحتاج إلى تحقق لدى الجهات المختصة؛ الاسم التجاري وحده لا يثبت الترخيص.",
        "الترجمة والتصديق والتسجيل والمتابعة تُحدد صراحةً. الاستشارة لا تضمن قبول الطلب."
      ],
      "choices": [
        {
          "path": "foreign-investment/foreign-investor-due-diligence-and-market-entry-review",
          "label": "أخطط لدخول السوق وأحتاج إلى فحص الهيكل والوثائق"
        },
        {
          "path": "foreign-investment/investment-licence-refusal-or-cancellation",
          "label": "لدي رفض أو إلغاء يتعلق بالترخيص الاستثماري"
        }
      ],
      "intro": "نراجع هيكل الاستثمار والنشاط والمستندات المطلوبة لدخول السوق السعودي أو تعديل استثمار قائم."
    },
    "en": {
      "overview": [
        "Identify the activity, investors, nationalities, ownership and proposed or existing entity.",
        "We identify requirements to verify with the authorities; a trade name alone does not establish licensing.",
        "Translation, authentication, registration and follow-up must be agreed. Consultation does not guarantee approval."
      ],
      "choices": [
        {
          "path": "foreign-investment/foreign-investor-due-diligence-and-market-entry-review",
          "label": "I need a market-entry and document review"
        },
        {
          "path": "foreign-investment/investment-licence-refusal-or-cancellation",
          "label": "I have an investment-licensing refusal or cancellation"
        }
      ],
      "intro": "Review your investment structure, activity and documents for Saudi market entry or changes to an existing investment."
    }
  },
  "administrative-law": {
    "ar": {
      "overview": [
        "أرسل القرار كاملاً والجهة المصدرة وتاريخ التبليغ وأي تظلم أو رد سابق.",
        "نراجع الأسباب والتسلسل الزمني والطلب المطلوب والمسار الذي يحتاج إلى تحقق.",
        "اذكر أي ميعاد فوراً؛ التواصل لا يوقفه. المراجعة وصياغة التظلم والدعوى والتمثيل مهام مستقلة."
      ],
      "choices": [
        {
          "path": "administrative-law/challenges-to-government-decisions",
          "label": "أريد مراجعة قرار صادر عن جهة حكومية"
        },
        {
          "path": "administrative-law/government-contract-disputes",
          "label": "لدي نزاع يتعلق بعقد حكومي"
        }
      ],
      "intro": "نراجع القرارات الحكومية والتظلمات والمستندات لتقييم المسار المتاح والمواعيد التي تحتاج إلى تحقق."
    },
    "en": {
      "overview": [
        "Send the complete decision, issuing authority, notification date and any grievance or response.",
        "We review reasons, chronology, your requested outcome and the route to verify.",
        "Flag deadlines immediately; contact does not suspend them. Review, drafting, claims and representation are separate tasks."
      ],
      "choices": [
        {
          "path": "administrative-law/challenges-to-government-decisions",
          "label": "I need a government decision reviewed"
        },
        {
          "path": "administrative-law/government-contract-disputes",
          "label": "My dispute concerns a government contract"
        }
      ],
      "intro": "Review government decisions, grievances and supporting records to assess possible routes and deadlines requiring verification."
    }
  },
  "arbitration": {
    "ar": {
      "overview": [
        "أرسل الاتفاق والقواعد والمقر واللغة وأي إشعار أو أمر إجرائي.",
        "نراجع المرحلة والاختصاص والخيارات. مراجعة الشرط والخصومة وتنفيذ الحكم مهام مختلفة.",
        "اذكر المواعيد والمخرج المطلوب. أتعاب الاستشارة مستقلة عن رسوم المؤسسة والمحكمين والخبراء والتمثيل."
      ],
      "choices": [
        {
          "path": "arbitration/arbitration-clause-review",
          "label": "أريد مراجعة شرط التحكيم قبل الاعتماد عليه"
        },
        {
          "path": "arbitration/recognition-and-enforcement-of-awards",
          "label": "صدر حكم وأحتاج إلى مراجعة الاعتراف به أو تنفيذه"
        }
      ],
      "intro": "نراجع شرط التحكيم أو النزاع أو الحكم الصادر، مع تحديد المرحلة والأسئلة والمستندات اللازمة."
    },
    "en": {
      "overview": [
        "Send the agreement, rules, seat, language and any notice or procedural order.",
        "We review the stage, jurisdiction and options. Clause review, proceedings and enforcement are separate tasks.",
        "State deadlines and the requested output. Consultation fees exclude institutional, tribunal, expert and representation charges."
      ],
      "choices": [
        {
          "path": "arbitration/arbitration-clause-review",
          "label": "I need an arbitration clause reviewed"
        },
        {
          "path": "arbitration/recognition-and-enforcement-of-awards",
          "label": "An award has been issued and I need recognition or enforcement reviewed"
        }
      ],
      "intro": "Review an arbitration clause, dispute or award, with a clear assessment of the stage, questions and documents."
    }
  },
  "companies-law": {
    "ar": {
      "overview": [
        "حدّد نوع الشركة وصفَتك والقرار المطلوب. أرسل وثائق التأسيس واتفاقات الشركاء والقرارات.",
        "نراجع صلاحيات القرار والالتزامات والتعارضات والمعلومات الناقصة.",
        "المراجعة ليست تقييماً مالياً أو إتمام تسجيل. التعديل والإيداع والتمثيل تُحدد في التكليف."
      ],
      "choices": [
        {
          "path": "companies-law/company-formation-and-restructuring",
          "label": "أحتاج إلى مراجعة تأسيس الشركة أو إعادة هيكلتها"
        },
        {
          "path": "companies-law/shareholder-and-partner-disputes",
          "label": "لدي خلاف بين الشركاء أو بشأن إدارة الشركة"
        }
      ],
      "intro": "نراجع وثائق الشركات وحقوق الشركاء والقرارات والتغييرات المقترحة، من التأسيس إلى الخروج أو النزاع."
    },
    "en": {
      "overview": [
        "Identify the company type, your role and proposed decision. Send constitutional documents, shareholder agreements and resolutions.",
        "We review decision rights, obligations, inconsistencies and missing information.",
        "Review is not a financial valuation or completed registration. Amendments, filing and representation are separately scoped."
      ],
      "choices": [
        {
          "path": "companies-law/company-formation-and-restructuring",
          "label": "I need formation or restructuring reviewed"
        },
        {
          "path": "companies-law/shareholder-and-partner-disputes",
          "label": "I have a shareholder or company-management dispute"
        }
      ],
      "intro": "Review company documents, shareholder rights, decisions and proposed changes, from formation to exit or dispute."
    }
  },
  "criminal-law": {
    "ar": {
      "overview": [
        "حدّد صفتك والمرحلة، وأرسل الإشعار أو المحضر وتاريخه والجهة المصدرة دون نشر تفاصيل حساسة.",
        "نراجع الأوراق والتسلسل الزمني، أو نعد مسودة متفقاً عليها. الرواية المختصرة لا تحسم الاتهام.",
        "نبّه فوراً إلى التوقيف أو الجلسة. الاستشارة لا تشمل الحضور أو ضمان الإفراج؛ التمثيل يُرتب مستقلاً عبر مهني مخول."
      ],
      "choices": [
        {
          "path": "criminal-law/investigation-and-questioning",
          "label": "لدي استدعاء أو مسألة في مرحلة التحقيق"
        },
        {
          "path": "criminal-law/trial-and-appeal-preparation",
          "label": "الملف في المحاكمة أو يتطلب مراجعة حكم"
        }
      ],
      "intro": "نراجع المستندات الجنائية ومرحلة القضية والأسئلة المطروحة، مع تحديد الحاجة إلى مساعدة محلية مرخصة."
    },
    "en": {
      "overview": [
        "State your role and stage. Send the notice or record, date and authority without public disclosure of sensitive details.",
        "We review the papers and chronology, or prepare an agreed draft. A short account does not settle an allegation.",
        "Flag detention or hearings immediately. Consultation excludes attendance and guaranteed release; representation requires separate authorized arrangements."
      ],
      "choices": [
        {
          "path": "criminal-law/investigation-and-questioning",
          "label": "I have a summons or an investigation-stage matter"
        },
        {
          "path": "criminal-law/trial-and-appeal-preparation",
          "label": "The matter is at trial or requires judgment review"
        }
      ],
      "intro": "Review criminal-case documents, procedural stage and questions, identifying where authorized local assistance is needed."
    }
  },
  "banking-finance": {
    "ar": {
      "overview": [
        "حدّد المنتج والمشكلة. أرسل الاتفاق والكشف والإشعار ورقم الشكوى والرد.",
        "نقارن الشروط والحركات المالية والمبالغ المسددة أو المطالب بها، ونوضح ما يحتاج إلى تحقق.",
        "ميّز بين الشكوى والمطالبة والتنفيذ. لا ترسل كلمات مرور أو رموز تحقق؛ الصياغة والتمثيل يُتفق عليهما منفصلين."
      ],
      "choices": [
        {
          "path": "banking-finance/unauthorized-bank-transaction",
          "label": "لدي عملية مصرفية أقول إنني لم أصرح بها"
        },
        {
          "path": "banking-finance/financing-agreement-review",
          "label": "أحتاج إلى مراجعة اتفاق تمويل أو التزاماته"
        }
      ],
      "intro": "نراجع نزاعات التمويل والضمانات والتحويلات والحسابات بمقارنة الاتفاق والسجلات وردود الجهة المالية."
    },
    "en": {
      "overview": [
        "Identify the product and issue. Send the agreement, statement, notice, complaint reference and response.",
        "We compare terms, transactions and paid or claimed amounts, identifying what needs verification.",
        "Distinguish complaints, claims and enforcement. Never send passwords or verification codes; drafting and representation are separately agreed."
      ],
      "choices": [
        {
          "path": "banking-finance/unauthorized-bank-transaction",
          "label": "I dispute authorization of a bank transaction"
        },
        {
          "path": "banking-finance/financing-agreement-review",
          "label": "I need a financing agreement or its obligations reviewed"
        }
      ],
      "intro": "Review financing, guarantee, transfer and account disputes against the agreement, records and provider responses."
    }
  },
  "intellectual-property": {
    "ar": {
      "overview": [
        "حدّد الحق وصاحبه والدولة والتواريخ. أرسل سجلات التسجيل والتراخيص والتنازلات وأدلة الاستخدام.",
        "نراجع مستندات الصفة ونطاق الحق وما يحتاج إلى استكمال.",
        "اذكر رقم الطلب والميعاد. البحث الشامل والإيداع والاعتراض والرسوم الرسمية والتمثيل تحتاج إلى نطاق صريح."
      ],
      "choices": [
        {
          "path": "intellectual-property/trademark-registration-and-disputes",
          "label": "أحتاج إلى مراجعة طلب علامة أو نزاع بشأنها"
        },
        {
          "path": "intellectual-property/copyright-infringement-online",
          "label": "المسألة تتعلق باستخدام مصنف على الإنترنت"
        }
      ],
      "intro": "نراجع مستندات حقوق الملكية الفكرية والتسجيل والاعتراضات أو استخدام الغير للحق محل النزاع."
    },
    "en": {
      "overview": [
        "Identify the right, owner, country and dates. Send registration records, licences, assignments and use evidence.",
        "We review support for standing and scope, and identify missing documents.",
        "State application references and deadlines. Comprehensive searches, filing, opposition, official fees and representation require an explicit scope."
      ],
      "choices": [
        {
          "path": "intellectual-property/trademark-registration-and-disputes",
          "label": "I need a trademark application or dispute reviewed"
        },
        {
          "path": "intellectual-property/copyright-infringement-online",
          "label": "My matter concerns use of a copyrighted work online"
        }
      ],
      "intro": "Review intellectual-property records, registration issues, oppositions or disputed third-party use."
    }
  },
  "tax-zakat": {
    "ar": {
      "overview": [
        "حدّد النوع والفترة والمنشأة. أرسل القرار والإقرار والتبليغ والمراسلات وأي اعتراض سابق.",
        "نربط كل بند بأسبابه ومستنداته، ونفصل الأسئلة القانونية عن التسويات المحاسبية التي تحتاج إلى مختص.",
        "اذكر ميعاد الرد أو الاعتراض. المراجعة لا تشمل تقديم الإقرار أو اعتماد الحسابات؛ الصياغة والإيداع والمتابعة تُحدد مسبقاً."
      ],
      "choices": [
        {
          "path": "tax-zakat/tax-audit-and-assessment-objection",
          "label": "لدي ربط أو نتيجة فحص أريد مراجعتها"
        },
        {
          "path": "tax-zakat/vat-penalty-and-late-registration-dispute",
          "label": "لدي جزاء متعلق بضريبة القيمة المضافة أو التسجيل"
        }
      ],
      "intro": "نراجع التقديرات والغرامات والاعتراضات الضريبية والزكوية، مع ربط البنود المتنازع عليها بمستنداتها."
    },
    "en": {
      "overview": [
        "Identify the type, period and entity. Send the decision, return, notification, correspondence and any earlier objection.",
        "We connect each item to its reasons and evidence, separating legal questions from specialist accounting work.",
        "State response deadlines. Review excludes return filing and account certification; drafting, submission and follow-up are agreed separately."
      ],
      "choices": [
        {
          "path": "tax-zakat/tax-audit-and-assessment-objection",
          "label": "I need an assessment or audit finding reviewed"
        },
        {
          "path": "tax-zakat/vat-penalty-and-late-registration-dispute",
          "label": "I have a VAT or registration-penalty dispute"
        }
      ],
      "intro": "Review tax and zakat assessments, penalties and objections, connecting disputed items with their supporting documents."
    }
  },
  "cyber-law": {
    "ar": {
      "overview": [
        "حدّد الواقعة والهدف والتواريخ والمنصة. أرسل المراسلات والأدلة دون كلمات مرور أو رموز دخول.",
        "نراجع التسلسل الزمني والطلبات السابقة وما يحتاج إلى حفظ أو تحقق تقني أو قانوني.",
        "الاستشارة لا تضمن استعادة الحساب أو إزالة المحتوى. الفحص التقني والصياغة والمخاطبات تُحدد بصورة مستقلة."
      ],
      "choices": [
        {
          "path": "cyber-law/hacked-account-and-unauthorized-access",
          "label": "المسألة تتعلق باختراق حساب أو دخول غير مصرح به"
        },
        {
          "path": "cyber-law/personal-data-breach-response",
          "label": "أحتاج إلى مراجعة واقعة تتعلق بالبيانات الشخصية"
        }
      ],
      "intro": "نراجع الحوادث الرقمية والمحتوى ومعالجة البيانات والمستندات لتحديد الأسئلة القانونية والخطوات الممكنة."
    },
    "en": {
      "overview": [
        "Describe the incident, objective, dates and platform. Send correspondence and evidence, never passwords or access codes.",
        "We review chronology, earlier requests and what needs preservation or technical or legal verification.",
        "Consultation does not guarantee account recovery or content removal. Forensics, drafting and communications are separately scoped."
      ],
      "choices": [
        {
          "path": "cyber-law/hacked-account-and-unauthorized-access",
          "label": "My matter concerns a compromised account or unauthorized access"
        },
        {
          "path": "cyber-law/personal-data-breach-response",
          "label": "I need a personal-data incident reviewed"
        }
      ],
      "intro": "Review digital incidents, online content, data-processing concerns and records to identify legal questions and possible next steps."
    }
  },
  "medical-malpractice": {
    "ar": {
      "overview": [
        "حدّد صفتك وتاريخ العلاج ومقدمه. أرسل السجلات والتقارير والموافقات والشكوى والرد، مع حذف بيانات الغير غير اللازمة.",
        "نرتب الوقائع والمستندات والطلب؛ النتيجة غير المرغوبة وحدها لا تثبت المسؤولية.",
        "طلب السجلات يختلف عن مطالبة التعويض. الخبرة الطبية والصياغة والتمثيل والرسوم تُحدد بحسب الحاجة."
      ],
      "choices": [
        {
          "path": "medical-malpractice/medical-record-access-dispute",
          "label": "أحتاج إلى مراجعة الحصول على الملف الطبي"
        },
        {
          "path": "medical-malpractice/treatment-injury-and-compensation-claim",
          "label": "أريد تقييم أوراق مطالبة تتعلق بضرر علاجي"
        }
      ],
      "intro": "نراجع مستندات العلاج والشكوى لتحديد المسائل القانونية والأسئلة التي تحتاج إلى رأي طبي مختص."
    },
    "en": {
      "overview": [
        "State your role, treatment date and provider. Send records, reports, consents, complaints and responses; redact unrelated people's data.",
        "We organize facts, documents and your request. An unwanted outcome alone does not establish liability.",
        "Obtaining records differs from pursuing compensation. Medical expertise, drafting, representation and fees are separately scoped."
      ],
      "choices": [
        {
          "path": "medical-malpractice/medical-record-access-dispute",
          "label": "I need a medical-record access issue reviewed"
        },
        {
          "path": "medical-malpractice/treatment-injury-and-compensation-claim",
          "label": "I need documents for a treatment-injury claim assessed"
        }
      ],
      "intro": "Review treatment and complaint records to identify legal issues and questions requiring specialist medical opinion."
    }
  },
  "insurance-law": {
    "ar": {
      "overview": [
        "أرسل الوثيقة وملاحقها والمطالبة والقرار والمراسلات، مع نوع التأمين وفترة التغطية وتاريخ الواقعة.",
        "نقارن سبب الرفض أو التخفيض بالشروط والأدلة، ونحدد المستندات الناقصة ونقاط الرد.",
        "التغطية وتقدير الخسارة ومسؤولية الغير مسائل مختلفة. المراجعة لا تضمن السداد؛ المتابعة والتمثيل والخبرة تُحدد مستقلاً."
      ],
      "choices": [
        {
          "path": "insurance-law/denied-insurance-claim",
          "label": "رُفضت مطالبتي وأحتاج إلى مراجعة سبب الرفض"
        },
        {
          "path": "insurance-law/coverage-and-policy-interpretation",
          "label": "الخلاف يتعلق بالتغطية أو تفسير الوثيقة"
        }
      ],
      "intro": "نراجع رفض المطالبة أو تخفيض التعويض بمقارنة قرار شركة التأمين بالوثيقة والوقائع المثبتة."
    },
    "en": {
      "overview": [
        "Send the policy, endorsements, claim, decision and correspondence, with insurance type, coverage period and incident date.",
        "We compare the refusal or reduction with terms and evidence, identifying gaps and response points.",
        "Coverage, loss valuation and third-party liability differ. Review does not guarantee payment; follow-up, representation and expertise are separately scoped."
      ],
      "choices": [
        {
          "path": "insurance-law/denied-insurance-claim",
          "label": "My claim was refused and I need the reason reviewed"
        },
        {
          "path": "insurance-law/coverage-and-policy-interpretation",
          "label": "My dispute concerns coverage or policy interpretation"
        }
      ],
      "intro": "Review a rejected or reduced insurance claim against the policy wording and documented facts."
    }
  }
};
