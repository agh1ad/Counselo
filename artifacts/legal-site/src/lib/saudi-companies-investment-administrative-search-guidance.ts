import type { MatterSourceGuidance } from "./matter-source-guidance.js";

/** Scoped current-law answers; existing FAQ reuse and unresolved intents remain in the review ledger. */
export const SAUDI_COMPANIES_INVESTMENT_ADMINISTRATIVE_SEARCH_GUIDANCE: MatterSourceGuidance[] = [
  {
    "region": "sa",
    "service": "companies-law",
    "problems": [
      "company-formation-and-restructuring",
      "mergers-and-acquisitions-legal-due-diligence",
      "shareholder-exit-and-buyout-dispute"
    ],
    "id": "sa-cia-transfer-registration",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": true,
    "en": {
      "q": "Does signing a share sale complete the ownership transfer?",
      "a": "Article 25 of the Companies Law ties transfer of partnership and LLC interests to commercial-register entry. Unlisted joint-stock and simplified joint-stock shares transfer through the shareholder register. The transfer is recognised against the company and others from the relevant entry. Check the entity form and registration evidence in addition to the signed sale agreement."
    },
    "ar": {
      "q": "هل يكتمل نقل الحصص أو الأسهم بمجرد توقيع البيع؟",
      "a": "تربط المادة 25 من نظام الشركات انتقال حصص شركات التضامن والتوصية البسيطة والشركات ذات المسؤولية المحدودة بالقيد التجاري، وأسهم المساهمة غير المدرجة والمساهمة المبسطة بالقيد في سجل المساهمين. ويعتد بالنقل تجاه الشركة والغير من تاريخ القيد المعني. تحقّق من شكل الشركة ودليل القيد إلى جانب عقد البيع الموقع."
    },
    "sources": [
      {
        "en": "Companies Law — company forms and governance",
        "ar": "نظام الشركات — أشكال الشركات والحوكمة",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/a8376aea-1bc3-49d4-9027-aed900b555af/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "companies-law",
    "problems": [
      "shareholder-exit-and-buyout-dispute",
      "shareholder-and-partner-disputes"
    ],
    "id": "sa-cia-llc-transfer-notice",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Must an LLC partner notify the others before selling to an outsider?",
      "a": "The Companies Law requires an LLC partner proposing a transfer to a non-partner, with or without payment, to notify the other partners through the manager of the recipient and terms. Statutory recovery or company-purchase rights must then be checked. A private sale agreement should not ignore that process; review the articles and notice record before closing."
    },
    "ar": {
      "q": "هل يبلغ شريك الشركة المحدودة بقية الشركاء قبل البيع للغير؟",
      "a": "يلزم نظام الشركات شريك الشركة ذات المسؤولية المحدودة عند التنازل لغير شريك، بعوض أو دونه، بإبلاغ الباقين عبر المدير باسم المتنازل له والشروط. ثم تُراجع حقوق الاسترداد أو شراء الشركة المقررة نظاماً. لا ينبغي تجاوز ذلك بعقد بيع خاص؛ راجع عقد التأسيس وسجل الإبلاغ قبل الإتمام."
    },
    "sources": [
      {
        "en": "Companies Law — company forms and governance",
        "ar": "نظام الشركات — أشكال الشركات والحوكمة",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/a8376aea-1bc3-49d4-9027-aed900b555af/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "companies-law",
    "problems": [
      "company-valuation-and-shareholder-buyout-dispute",
      "shareholder-exit-and-buyout-dispute"
    ],
    "id": "sa-cia-partnership-valuation",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Is there one statutory valuation method for every partner exit?",
      "a": "No. Article 49 addresses general-partnership interests: absent an agreed value or constitutional method, specified exits use an accredited valuer’s fair-value assessment at the event date. An ordinary transfer instead follows the agreed price unless the articles provide a method. First establish the company form and exit event; do not apply the partnership rule to every LLC or share buyout."
    },
    "ar": {
      "q": "هل توجد طريقة نظامية واحدة لتقييم كل تخارج؟",
      "a": "لا. تتناول المادة 49 حصص شركة التضامن؛ فعند غياب قيمة متفق عليها أو طريقة في عقد التأسيس، تخضع حالات خروج محددة لتقدير القيمة العادلة من مقيم معتمد بتاريخ الواقعة. ويتبع التنازل العادي السعر المتفق عليه ما لم يحدد العقد طريقة. حدّد شكل الشركة وسبب الخروج قبل تطبيق الحكم على شراء حصص شركة محدودة أو أسهم."
    },
    "sources": [
      {
        "en": "Companies Law — company forms and governance",
        "ar": "نظام الشركات — أشكال الشركات والحوكمة",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/a8376aea-1bc3-49d4-9027-aed900b555af/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "companies-law",
    "problems": [
      "corporate-governance",
      "director-and-manager-liability",
      "minority-shareholder-oppression-dispute"
    ],
    "id": "sa-cia-director-duties",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": true,
    "en": {
      "q": "What duties apply when a director has a personal interest in a decision?",
      "a": "Article 26 requires care and loyalty, action within authority, independent judgment and attention to company interests. It expressly requires avoiding conflicts and disclosing direct or indirect interests in company transactions. Preserve the disclosure, approval and voting record. Disclosure alone does not establish that every authorisation or related-party requirement was met."
    },
    "ar": {
      "q": "ما واجبات المدير عند وجود مصلحة شخصية في القرار؟",
      "a": "توجب المادة 26 العناية والولاء والعمل ضمن الصلاحية واستقلال القرار ومراعاة مصلحة الشركة. وتشمل تجنب التعارض والإفصاح عن المصلحة المباشرة أو غير المباشرة في معاملاتها. احفظ الإفصاح والموافقة والتصويت؛ فالإفصاح وحده لا يثبت استيفاء كل متطلبات الإذن أو معاملة الطرف المرتبط."
    },
    "sources": [
      {
        "en": "Companies Law — company forms and governance",
        "ar": "نظام الشركات — أشكال الشركات والحوكمة",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/a8376aea-1bc3-49d4-9027-aed900b555af/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "companies-law",
    "problems": [
      "director-and-manager-liability",
      "corporate-governance"
    ],
    "id": "sa-cia-business-judgment",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Does a business loss automatically make the manager liable?",
      "a": "Article 31 protects a good-faith decision when the decision-maker had no interest in it, was appropriately informed in the circumstances and reasonably believed it served the company. The claimant bears the burden of showing otherwise. Assess the information and interests at the decision date, rather than treating a poor result alone as proof of breach."
    },
    "ar": {
      "q": "هل تثبت خسارة النشاط مسؤولية المدير تلقائياً؟",
      "a": "تعتبر المادة 31 واجب القرار مؤدى بحسن نية إذا انتفت المصلحة الشخصية، وتوافرت الإحاطة المناسبة بموضوعه بحسب الظروف، والاعتقاد الجازم والمعقول بتحقيق مصلحة الشركة. ويقع إثبات خلاف ذلك على المدعي. افحص المعلومات والمصالح وقت القرار، ولا تجعل النتيجة السيئة وحدها دليلاً على الإخلال."
    },
    "sources": [
      {
        "en": "Companies Law — company forms and governance",
        "ar": "نظام الشركات — أشكال الشركات والحوكمة",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/a8376aea-1bc3-49d4-9027-aed900b555af/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "companies-law",
    "problems": [
      "minority-shareholder-oppression-dispute",
      "shareholder-and-partner-disputes",
      "director-and-manager-liability"
    ],
    "id": "sa-cia-derivative-standing",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Can minority shareholders bring the company’s liability claim?",
      "a": "The Companies Law permits qualifying partners or shareholders holding at least 5% of capital, or a lower constitutional threshold, to bring the company’s claim if it does not do so. The claim must have a sound basis, pursue company interests and be brought in good faith by a current holder. Notify the manager or board at least 14 days before filing; distinguish personal harm from company loss."
    },
    "ar": {
      "q": "هل ترفع الأقلية دعوى المسؤولية المقررة للشركة؟",
      "a": "يجيز نظام الشركات ذلك للشركاء أو المساهمين المالكين 5% على الأقل من رأس المال أو النسبة الأقل المحددة بوثائق الشركة عند عدم رفع الشركة الدعوى. ويشترط أساس صحيح وتحقيق مصلحة الشركة وحسن النية واستمرار صفة الشريك أو المساهم عند الرفع. ويلزم إبلاغ المدير أو المجلس قبل الرفع بأربعة عشر يوماً على الأقل، مع فصل الضرر الشخصي عن ضرر الشركة."
    },
    "sources": [
      {
        "en": "Companies Law — company forms and governance",
        "ar": "نظام الشركات — أشكال الشركات والحوكمة",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/a8376aea-1bc3-49d4-9027-aed900b555af/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "companies-law",
    "problems": [
      "company-dissolution-and-liquidation-dispute",
      "mergers-dissolution-and-liquidation"
    ],
    "id": "sa-cia-solvency-before-dissolution",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Can shareholders dissolve a company that cannot pay its debts?",
      "a": "Article 242 requires management to examine the financial position before a voluntary dissolution decision and confirm assets can meet debts by the proposed liquidation end. If assets are insufficient or the company is distressed under the Bankruptcy Law, shareholders cannot use that voluntary dissolution route; doing so can expose them to joint liability for remaining debt. Obtain current accounts before voting."
    },
    "ar": {
      "q": "هل يحل الشركاء شركة لا تكفي أصولها لسداد ديونها؟",
      "a": "توجب المادة 242 فحص الإدارة للمركز المالي قبل قرار الحل الاختياري وتأكيد كفاية الأصول لسداد الديون بنهاية التصفية المقترحة. عند عدم الكفاية أو التعثر وفق نظام الإفلاس، لا يجوز اتخاذ هذا القرار، وإلا قد يسأل متخذوه بالتضامن عن الدين المتبقي. اطلب حسابات حديثة قبل التصويت."
    },
    "sources": [
      {
        "en": "Companies Law — company forms and governance",
        "ar": "نظام الشركات — أشكال الشركات والحوكمة",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/a8376aea-1bc3-49d4-9027-aed900b555af/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "companies-law",
    "problems": [
      "company-dissolution-and-liquidation-dispute",
      "mergers-dissolution-and-liquidation"
    ],
    "id": "sa-cia-liquidation-personality",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Does dissolution immediately end the company and its debts?",
      "a": "Article 244 keeps the company’s legal personality to the extent necessary for liquidation. If it has insufficient assets or is distressed under the Bankruptcy Law, the appropriate court procedure must be considered rather than treating dissolution as a release of debts. Preserve creditor claims and liquidator authority before distributing any balance."
    },
    "ar": {
      "q": "هل ينهي الحل فوراً شخصية الشركة وديونها؟",
      "a": "تبقي المادة 244 الشخصية الاعتبارية بالقدر اللازم للتصفية. وعند عدم كفاية الأصول أو التعثر وفق نظام الإفلاس يلزم بحث الإجراء القضائي المناسب، لا اعتبار الحل إبراءً من الديون. احفظ مطالبات الدائنين وصلاحية المصفي قبل توزيع الرصيد."
    },
    "sources": [
      {
        "en": "Companies Law — company forms and governance",
        "ar": "نظام الشركات — أشكال الشركات والحوكمة",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/a8376aea-1bc3-49d4-9027-aed900b555af/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "companies-law",
    "problems": [
      "mergers-and-acquisitions-legal-due-diligence",
      "mergers-dissolution-and-liquidation",
      "company-formation-and-restructuring"
    ],
    "id": "sa-cia-merger-obligations",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Does a merger remove the absorbed company’s obligations?",
      "a": "The Companies Law transfers the absorbed company’s rights, obligations, assets and contracts when the merger takes effect. The merger proposal must address consideration and each company’s ability to meet debts. This is a reason to review liabilities and creditor protections before approval, rather than assume a new structure leaves old commitments behind."
    },
    "ar": {
      "q": "هل يزيل الاندماج التزامات الشركة المندمجة؟",
      "a": "ينقل نظام الشركات حقوق الشركة المندمجة والتزاماتها وأصولها وعقودها عند نفاذ الاندماج. ويجب أن يتناول المقترح العوض وقدرة كل شركة على الوفاء بديونها. لذلك تُراجع الالتزامات وحماية الدائنين قبل الموافقة، ولا يُفترض زوال التعهدات القديمة بتغير الهيكل."
    },
    "sources": [
      {
        "en": "Companies Law — company forms and governance",
        "ar": "نظام الشركات — أشكال الشركات والحوكمة",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/a8376aea-1bc3-49d4-9027-aed900b555af/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "companies-law",
    "problems": [
      "company-formation-and-restructuring",
      "shareholder-exit-and-buyout-dispute"
    ],
    "id": "sa-cia-conversion-dissent",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Can an objecting shareholder exit after a company-form conversion?",
      "a": "The Companies Law gives partners or shareholders objecting to conversion a written exit-request route within 15 days of the decision. Payment follows an agreed value or accredited fair-value assessment at conversion, subject to the constitution, with disputes referable to the competent court. This specific conversion route is not a general right to force a buyout whenever shareholders disagree."
    },
    "ar": {
      "q": "هل يتخارج المعترض على تحول شكل الشركة؟",
      "a": "يتيح نظام الشركات للشركاء أو المساهمين المعترضين على التحول طلب التخارج كتابة خلال خمسة عشر يوماً من القرار. ويكون الوفاء بالقيمة المتفق عليها أو بتقييم معتمد للقيمة العادلة عند التحول مع مراعاة الوثائق، ويجوز اللجوء للقضاء عند الخلاف. هذا مسار خاص بالتحول وليس حقاً عاماً بفرض الشراء عند كل اختلاف."
    },
    "sources": [
      {
        "en": "Companies Law — company forms and governance",
        "ar": "نظام الشركات — أشكال الشركات والحوكمة",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/a8376aea-1bc3-49d4-9027-aed900b555af/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "foreign-investment",
    "problems": [
      "market-entry-legal-structure",
      "foreign-owned-company-formation",
      "foreign-investor-due-diligence-and-market-entry-review",
      "regulatory-compliance",
      "investment-and-business-licensing"
    ],
    "id": "sa-cia-restricted-activities",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": true,
    "en": {
      "q": "Can a foreign investor enter every activity or change ownership freely?",
      "a": "Article 8 of the Investment Law requires prior Ministry approval procedures for investment in listed excluded activities and ownership changes in restricted activities. Check the actual activity and proposed change against the current published list. A general freedom-to-invest statement does not establish eligibility for a particular regulated activity or ownership structure."
    },
    "ar": {
      "q": "هل يستثمر الأجنبي في كل نشاط ويغير الملكية بحرية؟",
      "a": "توجب المادة 8 من نظام الاستثمار اتباع إجراءات الموافقة المسبقة لدى الوزارة للاستثمار في الأنشطة المستثناة المدرجة ولتغير ملكية الاستثمار في الأنشطة المقيدة. طابق النشاط والتغيير المقترح بالقائمة المنشورة الحالية. ولا يثبت مبدأ حرية الاستثمار وحده أهلية نشاط منظم أو هيكل ملكية معين."
    },
    "sources": [
      {
        "en": "Ministry of Investment — Investment Law, full text",
        "ar": "وزارة الاستثمار — النص الكامل لنظام الاستثمار",
        "href": "https://eservices.misa.gov.sa/ar/resources/updatedInvestmentLaw"
      }
    ]
  },
  {
    "region": "sa",
    "service": "foreign-investment",
    "problems": [
      "investment-exit-repatriation-and-shareholder-dispute",
      "investor-and-cross-border-disputes"
    ],
    "id": "sa-cia-repatriation",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "May investment sale proceeds and profits be transferred abroad?",
      "a": "Article 4 protects transfer of investment funds, including profits, sale and liquidation proceeds, through lawful channels in a recognised currency. It remains subject to related laws. Identify whether the obstacle is an unpaid contractual amount, unfinished corporate distribution or bank compliance requirement; the statutory transfer right does not prove that the payer owes the amount claimed."
    },
    "ar": {
      "q": "هل يجوز تحويل أرباح الاستثمار وحصيلة بيعه إلى الخارج؟",
      "a": "تحمي المادة 4 تحويل أموال الاستثمار، ومنها الأرباح وحصيلة البيع والتصفية، عبر القنوات النظامية وبعملة معترف بها مع مراعاة الأنظمة ذات العلاقة. حدّد هل العائق مبلغ عقدي غير مدفوع أو توزيع مؤسسي غير مكتمل أو متطلب مصرفي؛ فحق التحويل لا يثبت أن المدين ملزم بالمبلغ المدعى به."
    },
    "sources": [
      {
        "en": "Ministry of Investment — Investment Law, full text",
        "ar": "وزارة الاستثمار — النص الكامل لنظام الاستثمار",
        "href": "https://eservices.misa.gov.sa/ar/resources/updatedInvestmentLaw"
      }
    ]
  },
  {
    "region": "sa",
    "service": "foreign-investment",
    "problems": [
      "foreign-investor-compensation-claim",
      "investor-and-cross-border-disputes"
    ],
    "id": "sa-cia-investment-protection",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "What protection applies to confiscation or expropriation of investment?",
      "a": "Article 4 distinguishes confiscation, which requires a final judicial judgment, from direct or indirect expropriation, which requires public interest, lawful procedure and fair compensation. Identify the measure, affected investment and documented loss. An adverse business decision is not automatically an expropriation, and the law does not set one guaranteed compensation figure for every dispute."
    },
    "ar": {
      "q": "ما حماية الاستثمار من المصادرة أو نزع الملكية؟",
      "a": "تميز المادة 4 المصادرة التي تتطلب حكماً قضائياً نهائياً عن نزع الملكية المباشر أو غير المباشر الذي يتطلب المصلحة العامة والإجراءات النظامية والتعويض العادل. حدّد التدبير والاستثمار المتأثر والخسارة الموثقة. ولا يصبح كل قرار ضار بالنشاط نزع ملكية، ولا يحدد النظام تعويضاً مضموناً موحداً لكل نزاع."
    },
    "sources": [
      {
        "en": "Ministry of Investment — Investment Law, full text",
        "ar": "وزارة الاستثمار — النص الكامل لنظام الاستثمار",
        "href": "https://eservices.misa.gov.sa/ar/resources/updatedInvestmentLaw"
      }
    ]
  },
  {
    "region": "sa",
    "service": "foreign-investment",
    "problems": [
      "foreign-investor-and-local-partner-dispute",
      "investor-and-cross-border-disputes",
      "foreign-investor-compensation-claim"
    ],
    "id": "sa-cia-investment-dispute-forum",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": true,
    "en": {
      "q": "Does foreign-investor status automatically create an international arbitration claim?",
      "a": "Article 10 preserves access to the competent court unless the parties agree otherwise and permits agreed arbitration, mediation or conciliation subject to related laws. Article 13 preserves applicable treaty commitments. Establish the actual agreement or treaty, protected investment and parties before selecting a forum; foreign nationality alone is not an arbitration agreement."
    },
    "ar": {
      "q": "هل تمنح صفة المستثمر الأجنبي حق التحكيم الدولي تلقائياً؟",
      "a": "تحفظ المادة 10 اللجوء للمحكمة المختصة ما لم يتفق الأطراف على غير ذلك، وتجيز الاتفاق على التحكيم والوساطة والمصالحة مع مراعاة الأنظمة. وتحفظ المادة 13 التزامات الاتفاقيات النافذة. تحقّق من الاتفاق أو المعاهدة والاستثمار المشمول والأطراف قبل اختيار الجهة؛ فالجنسية الأجنبية وحدها ليست اتفاق تحكيم."
    },
    "sources": [
      {
        "en": "Ministry of Investment — Investment Law, full text",
        "ar": "وزارة الاستثمار — النص الكامل لنظام الاستثمار",
        "href": "https://eservices.misa.gov.sa/ar/resources/updatedInvestmentLaw"
      }
    ]
  },
  {
    "region": "sa",
    "service": "foreign-investment",
    "problems": [
      "investment-licence-refusal-or-cancellation",
      "regulatory-compliance"
    ],
    "id": "sa-cia-investment-sanction",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Is every investment-registration breach followed by immediate cancellation?",
      "a": "Article 11 distinguishes serious violations from non-serious breaches of registration or excluded-activity rules. For a non-serious breach, the Ministry first notifies the investor to correct it within the regulatory period; uncorrected or serious breaches may attract sanctions including cancellation. Identify the cited rule and classification instead of assuming every refusal or licence issue follows this sanctions process."
    },
    "ar": {
      "q": "هل تؤدي كل مخالفة لتسجيل الاستثمار إلى إلغائه فوراً؟",
      "a": "تميز المادة 11 المخالفة الجسيمة عن غير الجسيمة لأحكام التسجيل والأنشطة المستثناة. في غير الجسيمة تُبلغ الوزارة المستثمر بإزالتها خلال المدة المحددة لائحياً؛ وقد يعاقب عند عدم التصحيح أو جسامة المخالفة بما يشمل الإلغاء. حدّد النص والتصنيف؛ فليس كل رفض أو إشكال ترخيص خاضعاً لهذا المسار."
    },
    "sources": [
      {
        "en": "Ministry of Investment — Investment Law, full text",
        "ar": "وزارة الاستثمار — النص الكامل لنظام الاستثمار",
        "href": "https://eservices.misa.gov.sa/ar/resources/updatedInvestmentLaw"
      }
    ]
  },
  {
    "region": "sa",
    "service": "foreign-investment",
    "problems": [
      "investment-licence-refusal-or-cancellation"
    ],
    "id": "sa-cia-investment-sanction-appeal",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "What is the court-challenge period for a Ministry investment penalty?",
      "a": "Article 12 allows a person sanctioned by a Ministry decision to challenge it before the competent court within 30 days of notification. Keep the decision and proof of notification. This is a specific penalty rule: do not apply it automatically to an incomplete registration application or a separate sector regulator’s licensing refusal."
    },
    "ar": {
      "q": "ما مهلة الطعن في عقوبة تصدرها وزارة الاستثمار؟",
      "a": "تجيز المادة 12 لمن صدر بحقه قرار من الوزارة بعقوبة التظلم أمام المحكمة المختصة خلال ثلاثين يوماً من التبليغ. احفظ القرار وإثبات إبلاغه. هذا حكم خاص بالعقوبة؛ فلا يطبق تلقائياً على طلب تسجيل ناقص أو رفض ترخيص صادر عن منظم قطاعي مستقل."
    },
    "sources": [
      {
        "en": "Ministry of Investment — Investment Law, full text",
        "ar": "وزارة الاستثمار — النص الكامل لنظام الاستثمار",
        "href": "https://eservices.misa.gov.sa/ar/resources/updatedInvestmentLaw"
      }
    ]
  },
  {
    "region": "sa",
    "service": "foreign-investment",
    "problems": [
      "foreign-investor-and-local-partner-dispute",
      "foreign-owned-company-formation"
    ],
    "id": "sa-cia-investor-ownership-record",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Does an investment agreement prove company ownership against third parties?",
      "a": "Article 25 of the Companies Law requires the relevant commercial-register or shareholder-register entry for the specified company forms to recognise a transfer against the company and others. Compare the agreed investment, paid contribution and registered interest. A funding promise, profit share and registered ownership can represent different rights."
    },
    "ar": {
      "q": "هل يثبت اتفاق الاستثمار ملكية الشركة تجاه الغير؟",
      "a": "تتطلب المادة 25 من نظام الشركات القيد التجاري أو القيد في سجل المساهمين بحسب الشكل للاعتداد بالنقل تجاه الشركة والغير. قارن الاستثمار المتفق عليه والمساهمة المدفوعة والحصة المسجلة. فقد يمثل وعد التمويل واقتسام الربح والملكية المسجلة حقوقاً مختلفة."
    },
    "sources": [
      {
        "en": "Companies Law — company forms and governance",
        "ar": "نظام الشركات — أشكال الشركات والحوكمة",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/a8376aea-1bc3-49d4-9027-aed900b555af/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "foreign-investment",
    "problems": [
      "foreign-investor-due-diligence-and-market-entry-review",
      "investment-and-business-licensing",
      "market-entry-legal-structure"
    ],
    "id": "sa-cia-special-zones",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Does investment in a special economic zone remove other legal requirements?",
      "a": "Article 14 of the Investment Law preserves special laws governing particular activities and special economic zones while ensuring the law’s minimum investor rights. Establish the precise zone and activity before relying on a special incentive or exemption. Registration alone does not prove that every advertised benefit applies to the project."
    },
    "ar": {
      "q": "هل يزيل الاستثمار في منطقة اقتصادية خاصة المتطلبات الأخرى؟",
      "a": "تحفظ المادة 14 من نظام الاستثمار الأنظمة الخاصة بالأنشطة والمناطق الاقتصادية الخاصة مع ضمان الحد الأدنى من حقوق المستثمر. حدّد المنطقة والنشاط بدقة قبل التعويل على حافز أو استثناء خاص. ولا يثبت التسجيل وحده استحقاق المشروع كل ميزة معلنة."
    },
    "sources": [
      {
        "en": "Ministry of Investment — Investment Law, full text",
        "ar": "وزارة الاستثمار — النص الكامل لنظام الاستثمار",
        "href": "https://eservices.misa.gov.sa/ar/resources/updatedInvestmentLaw"
      }
    ]
  },
  {
    "region": "sa",
    "service": "administrative-law",
    "problems": [
      "challenges-to-government-decisions",
      "licence-refusal-or-cancellation",
      "licensing-refusals-and-penalties",
      "government-penalty-challenge"
    ],
    "id": "sa-cia-cancellation-grounds",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": true,
    "en": {
      "q": "What legal defects can support cancellation of an administrative decision?",
      "a": "Article 13 of the Board of Grievances Law identifies grounds including lack of competence, defects in form or reasons, unlawful application or interpretation, and misuse of power. Identify a final decision affecting your interest and connect each alleged defect to the record. Disagreement with the outcome alone does not identify the legal ground."
    },
    "ar": {
      "q": "ما العيوب التي تسند طلب إلغاء قرار إداري؟",
      "a": "تحدد المادة 13 من نظام ديوان المظالم أسباباً تشمل عدم الاختصاص وعيب الشكل أو السبب ومخالفة الأنظمة أو الخطأ في تطبيقها أو تأويلها وإساءة استعمال السلطة. حدّد القرار النهائي الذي يمس مصلحتك واربط كل عيب بأوراق الملف. ولا يحدد عدم الرضا بالنتيجة وحده سبب الطعن النظامي."
    },
    "sources": [
      {
        "en": "Board of Grievances Law — Article 13",
        "ar": "نظام ديوان المظالم — المادة 13",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/5d3379bd-3547-494e-9fbd-a9a700f26e24/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "administrative-law",
    "problems": [
      "administrative-objections-and-appeals",
      "challenges-to-government-decisions",
      "licence-refusal-or-cancellation",
      "licensing-refusals-and-penalties",
      "government-penalty-challenge"
    ],
    "id": "sa-cia-ordinary-cancellation-timing",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "What is the ordinary objection sequence for a non-civil-service cancellation claim?",
      "a": "Unless a special rule applies, Article 8(4) requires objection to the issuing authority within 60 days of knowledge of the decision. The authority has 60 days to decide; court filing then has a 60-day period from knowledge of rejection or expiry without decision. This sequence is for the specified cancellation claims, not every penalty, procurement dispute or civil-service matter."
    },
    "ar": {
      "q": "ما تسلسل التظلم المعتاد لدعوى الإلغاء غير الوظيفية؟",
      "a": "عند غياب نص خاص، توجب المادة 8(4) التظلم للجهة المصدرة خلال ستين يوماً من العلم بالقرار. وللجهة ستون يوماً للبت، ثم ترفع الدعوى خلال ستين يوماً من العلم بالرفض أو انتهاء مهلة البت دون قرار. يخص ذلك دعاوى الإلغاء المحددة، لا جميع العقوبات أو المنافسات أو شؤون الخدمة المدنية."
    },
    "sources": [
      {
        "en": "Law of Procedure before the Board of Grievances",
        "ar": "نظام المرافعات أمام ديوان المظالم",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/f2f7b465-b576-4f47-a8e7-a9a700f27202/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "administrative-law",
    "problems": [
      "municipal-licence-refusal-and-business-activity-suspension",
      "licence-refusal-or-cancellation",
      "government-penalty-challenge",
      "challenges-to-government-decisions"
    ],
    "id": "sa-cia-stay-of-decision",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": true,
    "en": {
      "q": "Does filing a cancellation case suspend the administrative decision?",
      "a": "No. Article 9 states that filing does not itself stop enforcement. The court may order a stay on request when implementation would produce effects difficult to remedy. Keep evidence of the threatened effects and frame the stay request separately from the cancellation grounds; a platform submission or complaint is not a suspension order."
    },
    "ar": {
      "q": "هل توقف دعوى الإلغاء تنفيذ القرار الإداري؟",
      "a": "لا. تقرر المادة 9 أن رفع الدعوى لا يوقف التنفيذ بذاته، ويجوز للمحكمة وقفه عند الطلب إذا رأت آثاراً يتعذر تداركها. احفظ دليل الآثار المهددة وصغ طلب الوقف مستقلاً عن أسباب الإلغاء؛ فالتقديم الإلكتروني أو الشكوى ليس أمراً بوقف التنفيذ."
    },
    "sources": [
      {
        "en": "Law of Procedure before the Board of Grievances",
        "ar": "نظام المرافعات أمام ديوان المظالم",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/f2f7b465-b576-4f47-a8e7-a9a700f27202/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "administrative-law",
    "problems": [
      "municipal-licence-refusal-and-business-activity-suspension",
      "administrative-objections-and-appeals"
    ],
    "id": "sa-cia-urgent-cancellation",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Must an urgent cancellation case always wait until the mandatory objection period ends?",
      "a": "Article 8(5) permits the court, in urgent cases, to accept a cancellation claim during the mandatory objection period if it includes a stay request and the issuing authority has already been challenged. The court decides the stay urgently; the merits follow the statutory sequence. Urgency must be explained with evidence, not merely asserted."
    },
    "ar": {
      "q": "هل تنتظر دعوى الإلغاء المستعجلة دائماً انتهاء التظلم الوجوبي؟",
      "a": "تجيز المادة 8(5) للمحكمة في الحالات المستعجلة قبول دعوى الإلغاء أثناء فترة التظلم الوجوبي إذا اقترنت بطلب وقف التنفيذ وسبق التظلم للجهة المصدرة. وتبت عاجلاً في الوقف، ثم تتبع الموضوع وفق التسلسل النظامي. بيّن الاستعجال بأدلة ولا تكتف بوصف الطلب مستعجلاً."
    },
    "sources": [
      {
        "en": "Law of Procedure before the Board of Grievances",
        "ar": "نظام المرافعات أمام ديوان المظالم",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/f2f7b465-b576-4f47-a8e7-a9a700f27202/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "administrative-law",
    "problems": [
      "board-of-grievances-appeal-against-an-administrative-judgment",
      "administrative-objections-and-appeals"
    ],
    "id": "sa-cia-judgment-appeal-period",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "When does the administrative-judgment objection period start?",
      "a": "Article 33 generally provides 30 days from receiving the judgment copy, or the scheduled receipt date if the party does not attend. Check appealability, the actual receipt record and any applicable special rule. This is a judgment-objection period, distinct from objecting first to the administrative authority’s underlying decision."
    },
    "ar": {
      "q": "متى تبدأ مهلة الاعتراض على الحكم الإداري؟",
      "a": "تقرر المادة 33 عموماً ثلاثين يوماً من تسلم صورة الحكم أو من الموعد المحدد للتسلم عند عدم الحضور. راجع قابلية الحكم للاعتراض وإثبات التسلم وأي حكم خاص منطبق. هذه مهلة اعتراض على حكم، وتختلف عن التظلم الأول من قرار الجهة الإدارية."
    },
    "sources": [
      {
        "en": "Law of Procedure before the Board of Grievances",
        "ar": "نظام المرافعات أمام ديوان المظالم",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/f2f7b465-b576-4f47-a8e7-a9a700f27202/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "administrative-law",
    "problems": [
      "government-compensation-claim-for-an-administrative-decision"
    ],
    "id": "sa-cia-administrative-damage",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Does challenging an administrative decision prove my compensation claim?",
      "a": "The Board of Grievances explains that administrative compensation examines fault, damage and the causal connection, with the amount assessed from the circumstances. Identify actual losses linked to the decision and distinguish them from the request to cancel it. A pending challenge or allegation of invalidity does not itself establish each claimed expense or lost return."
    },
    "ar": {
      "q": "هل يثبت الطعن في القرار الإداري استحقاق التعويض؟",
      "a": "يوضح ديوان المظالم أن التعويض الإداري يبحث الخطأ والضرر والعلاقة السببية، ويقدر المبلغ بحسب الظروف. حدّد الخسائر الفعلية المرتبطة بالقرار وافصلها عن طلب إلغائه. ولا يثبت الطعن القائم أو ادعاء البطلان بذاته كل مصروف أو عائد فائت مطلوب."
    },
    "sources": [
      {
        "en": "Board of Grievances — administrative compensation elements",
        "ar": "ديوان المظالم — أركان التعويض الإداري",
        "href": "https://www.bog.gov.sa/MediaCenter/news/Pages/news-355.aspx"
      }
    ]
  },
  {
    "region": "sa",
    "service": "administrative-law",
    "problems": [
      "government-compensation-claim-for-an-administrative-decision",
      "government-contract-disputes"
    ],
    "id": "sa-cia-contract-damage-timebar",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Do compensation and government-contract claims follow the same short period as cancellation?",
      "a": "Article 8(6) sets a ten-year non-hearing period from accrual for the specified administrative compensation and government-contract claims, unless a special rule applies, the defendant acknowledges the right or the court accepts an excuse. Identify the right and accrual event before calculating time. Do not use that period to postpone a separate cancellation or procurement objection."
    },
    "ar": {
      "q": "هل تتبع دعاوى التعويض والعقود الحكومية مهلة الإلغاء القصيرة نفسها؟",
      "a": "تقرر المادة 8(6) عدم سماع دعاوى التعويض والعقود الحكومية المحددة بعد عشر سنوات من نشوء الحق، ما لم يوجد نص خاص أو إقرار من المدعى عليه أو عذر تقبله المحكمة. حدّد الحق وواقعة نشوئه قبل الحساب. ولا تستخدم هذه المدة لتأجيل تظلم مستقل من قرار أو ترسية."
    },
    "sources": [
      {
        "en": "Law of Procedure before the Board of Grievances",
        "ar": "نظام المرافعات أمام ديوان المظالم",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/f2f7b465-b576-4f47-a8e7-a9a700f27202/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "administrative-law",
    "problems": [
      "public-sector-employment-and-disciplinary-dispute"
    ],
    "id": "sa-cia-disciplinary-hearing",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Can an employee covered by the Job Discipline Law be sanctioned without a recorded defence?",
      "a": "Article 4 requires investigation, confronting the employee with the alleged breach, hearing their account, examining their defence and recording it in writing; the sanction decision must give reasons. The law excludes cases governed by special disciplinary rules to that extent. Obtain the inquiry and decision records and establish the employment framework before selecting the challenge route."
    },
    "ar": {
      "q": "هل يعاقب الخاضع لنظام الانضباط الوظيفي دون إثبات دفاعه؟",
      "a": "توجب المادة 4 التحقيق ومواجهة الموظف بالمخالفة وسماع أقواله وتحقيق دفاعه وإثبات ذلك كتابة، وتسبيب قرار الجزاء. ويستثني النظام ما تنظمه قواعد تأديبية خاصة في حدود أحكامها. احصل على محاضر التحقيق والقرار وحدّد الإطار الوظيفي قبل اختيار طريق الاعتراض."
    },
    "sources": [
      {
        "en": "Job Discipline Law — investigation and reasoned sanction",
        "ar": "نظام الانضباط الوظيفي — التحقيق وتسبيب الجزاء",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/896f4986-334b-4c76-b938-ada500eae2eb/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "administrative-law",
    "problems": [
      "public-procurement-dispute",
      "public-procurement-disputes"
    ],
    "id": "sa-cia-procurement-evaluation",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Must bid evaluation follow the published criteria?",
      "a": "Articles 24–25 of the operative 2019 procurement law require evaluation and acceptance criteria in the tender documents; non-price criteria must be objective and proportionate to the procurement. Compare the disputed score or exclusion reason with those criteria and the bid actually submitted. A lower price alone does not establish entitlement to the award."
    },
    "ar": {
      "q": "هل يلتزم تقييم العرض بالمعايير المنشورة؟",
      "a": "توجب المادتان 24 و25 من نظام المنافسات لعام 1440 تحديد معايير التقييم والقبول بوثائق المنافسة، وأن تكون المعايير غير السعرية موضوعية ومتناسبة مع الأعمال والمشتريات. قارن الدرجة أو سبب الاستبعاد بالمعايير وبالعرض المقدم فعلاً. ولا يثبت انخفاض السعر وحده استحقاق الترسية."
    },
    "sources": [
      {
        "en": "Government Tenders and Procurement Law 2019 — Articles 24–25, 53 and 87",
        "ar": "نظام المنافسات والمشتريات الحكومية لعام 1440 — المواد 24 و25 و53 و87",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/24c563f9-7292-49c8-b0fb-aa9800b999f1/1"
      }
    ]
  },
  {
    "region": "sa",
    "service": "administrative-law",
    "problems": [
      "public-procurement-dispute",
      "public-procurement-disputes"
    ],
    "id": "sa-cia-procurement-objection",
    "reviewedAt": "2026-09-07",
    "includeOnServicePage": false,
    "en": {
      "q": "Does a pre-award objection have the same deadline as an award objection?",
      "a": "Under Article 87 of the 2019 law, a pre-award decision is challenged to the authority within five working days of issuance; an award is challenged during the standstill. Article 53 sets that standstill at five to ten working days. The authority has fifteen working days to decide, followed by a three-day committee-escalation window after rejection notification or expiry. Verify the governing version and exact event dates; the September 2026 replacement is not yet operative at this review."
    },
    "ar": {
      "q": "هل تتطابق مهلة الاعتراض قبل الترسية مع الاعتراض عليها؟",
      "a": "وفق المادة 87 من نظام 1440، يكون التظلم للجهة من قرار قبل الترسية خلال خمسة أيام عمل من صدوره، ومن الترسية خلال فترة التوقف المحددة بالمادة 53 بين خمسة وعشرة أيام عمل. وللجهة خمسة عشر يوم عمل للبت، ثم ثلاثة أيام للتظلم للجنة بعد إبلاغ الرفض أو انتهاء مهلة البت. تحقّق من النسخة المنطبقة وتواريخ الوقائع؛ فالبديل المنشور في سبتمبر 2026 لم ينفذ وقت هذه المراجعة."
    },
    "sources": [
      {
        "en": "Government Tenders and Procurement Law 2019 — Articles 24–25, 53 and 87",
        "ar": "نظام المنافسات والمشتريات الحكومية لعام 1440 — المواد 24 و25 و53 و87",
        "href": "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/24c563f9-7292-49c8-b0fb-aa9800b999f1/1"
      }
    ]
  }
];
