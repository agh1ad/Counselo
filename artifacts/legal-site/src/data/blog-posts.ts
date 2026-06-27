export interface BlogSection {
  heading?: string;
  body: string;
}

export interface BlogPost {
  slug: string;
  date: string;
  category: { en: string; ar: string };
  readTime: number;
  en: {
    title: string;
    excerpt: string;
    seoTitle: string;
    seoDescription: string;
    content: BlogSection[];
  };
  ar: {
    title: string;
    excerpt: string;
    seoTitle: string;
    seoDescription: string;
    content: BlogSection[];
  };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "divorce-in-saudi-arabia",
    date: "2026-06-15",
    category: { en: "Family Law", ar: "قانون الأسرة" },
    readTime: 7,
    en: {
      title: "Divorce in Saudi Arabia: Your Rights, Your Options, and What to Expect",
      excerpt:
        "Divorce in Saudi Arabia is governed by Islamic law and the Saudi Personal Status Law. Understanding the types of divorce, your rights to custody, and how assets are divided is essential before you begin proceedings.",
      seoTitle:
        "Divorce in Saudi Arabia: Legal Rights & Process | Online Family Law Consultation | Adlix",
      seoDescription:
        "Understand your rights in a Saudi Arabian divorce — Talaq, Khul', and judicial divorce explained. 30+ years of experience. Book an online consultation with Lawyer Omar Al-Baghdadi.",
      content: [
        {
          body: "Divorce in Saudi Arabia is governed by Islamic Sharia principles and the Saudi Personal Status Law. Whether you are considering filing for divorce or have been served with divorce proceedings, understanding the legal landscape is the first step to protecting yourself and your family.",
        },
        {
          heading: "Types of Divorce in Saudi Arabia",
          body: "Saudi law recognises three main forms of divorce. Talaq is the husband's right to pronounce divorce unilaterally — it must be registered before a notary to be legally effective. Khul' is a wife-initiated divorce in which she returns the mahr (dowry) in exchange for the husband's agreement to end the marriage; if the husband refuses, the court can grant Khul' regardless. Judicial divorce (Faskh) is available to wives on specific grounds — harm, abandonment, failure to provide maintenance, or the husband's imprisonment — and is decided by the Personal Status Court.",
        },
        {
          heading: "Child Custody (Hadhanah)",
          body: "Physical custody (Hadhanah) is typically awarded to the mother for young children — boys up to age seven and girls up to nine — after which custody may transfer to the father unless the court finds it is not in the child's best interest. Courts can extend maternal custody beyond these ages where the child's welfare requires it. Legal guardianship (Wilayah) — which includes decisions on education, travel, and major medical treatment — remains with the father unless a court order provides otherwise.",
        },
        {
          heading: "Financial Rights on Divorce",
          body: "A divorced wife is entitled to the deferred portion of her mahr, maintenance (nafaqah) during the waiting period (iddah) of three months, and — if she has custody of the children — child support. The marital home may be used by the custodial parent during the iddah. Property acquired during the marriage is not automatically divided equally; each spouse retains assets held in their name unless they can demonstrate a joint contribution to the other's assets.",
        },
        {
          heading: "The Divorce Process: Timeline and Court Proceedings",
          body: "Saudi Personal Status Courts have exclusive jurisdiction over family law matters. Proceedings typically begin with a reconciliation session before a judge. If reconciliation fails, the case proceeds to a hearing where evidence — including marriage contracts, financial records, and witness testimony — is presented. Most uncontested divorces are concluded within a few weeks; contested matters involving custody and financial disputes can take several months.",
        },
        {
          heading: "Getting Legal Advice",
          body: "Saudi family law involves nuanced procedural and evidentiary requirements that can significantly affect the outcome of your case. Consulting an experienced family law lawyer before taking any formal steps — including informal statements that could be used in proceedings — is strongly recommended. Adlix offers confidential online consultations via WhatsApp or email, so you can get expert guidance without the need to attend a physical office.",
        },
      ],
    },
    ar: {
      title: "الطلاق في المملكة العربية السعودية: حقوقك وخياراتك وما تتوقعه",
      excerpt:
        "يحكم قانون الأحوال الشخصية السعودي والشريعة الإسلامية إجراءات الطلاق في المملكة. فهم أنواع الطلاق وحقوق الحضانة وكيفية تقسيم الأصول أمر ضروري قبل الشروع في أي إجراءات.",
      seoTitle:
        "الطلاق في المملكة العربية السعودية: الحقوق القانونية والإجراءات | استشارة قانونية أونلاين | أدليكس",
      seoDescription:
        "تعرف على حقوقك في الطلاق بالمملكة — الطلاق والخلع والفسخ القضائي. خبرة تزيد على 30 عاماً. احجز استشارة أونلاين مع المحامي عمر البغدادي.",
      content: [
        {
          body: "يحكم الطلاق في المملكة العربية السعودية أحكامُ الشريعة الإسلامية ونظام الأحوال الشخصية السعودي. سواء كنت تفكر في رفع دعوى طلاق أو صدر بحقك طلب طلاق، فإن فهم الإطار القانوني هو الخطوة الأولى لحماية حقوقك وأسرتك.",
        },
        {
          heading: "أنواع الطلاق في المملكة العربية السعودية",
          body: "يعترف القانون السعودي بثلاثة أشكال رئيسية للطلاق. الطلاق: هو حق الزوج في إيقاع الطلاق، ويجب توثيقه أمام المأذون ليصبح نافذاً قانوناً. الخلع: طلاق تبادر به الزوجة مقابل ردّ المهر، وإن رفض الزوج يمكن للمحكمة إيقاعه قضائياً. الفسخ القضائي: يحق للزوجة طلبه أمام محكمة الأحوال الشخصية لأسباب محددة كالضرر والهجر وعدم الإنفاق.",
        },
        {
          heading: "الحضانة",
          body: "تُمنح حضانة الصغار عادةً للأم — الذكور حتى سن السابعة والإناث حتى التاسعة — ثم تنتقل للأب ما لم يقرر القاضي خلاف ذلك لمصلحة المحضون. يمكن للمحكمة مد حضانة الأم متى اقتضت ذلك مصلحة الأولاد. أما الولاية القانونية فتبقى للأب بقرار محكمة.",
        },
        {
          heading: "الحقوق المالية عند الطلاق",
          body: "تستحق المطلقة المهر المؤجل ونفقة العدة لمدة ثلاثة أشهر، وإن كانت حاضنةً فتستحق نفقة الأولاد. الأصول المكتسبة خلال الزواج لا تُقسَّم تلقائياً؛ يحتفظ كل طرف بما يملكه إلا إذا أثبت مساهمته في أصول الطرف الآخر.",
        },
        {
          heading: "إجراءات الطلاق: المراحل والمحاكم",
          body: "تختص محاكم الأحوال الشخصية حصراً بالنظر في قضايا الأسرة. تبدأ الإجراءات عادةً بجلسة صلح أمام القاضي، وإن تعذّر الإصلاح انتقلت القضية إلى مرحلة المرافعة. تُنهى حالات الطلاق غير المتنازع عليها في وقت قصير، فيما قد تستغرق القضايا المتنازع عليها — الخاصة بالحضانة والنفقة — عدة أشهر.",
        },
        {
          heading: "استشارة قانونية",
          body: "تنطوي قضايا الأسرة على متطلبات إجرائية دقيقة تؤثر بشكل مباشر على النتيجة. يُنصح بشدة باستشارة محامي أسرة متخصص قبل أي خطوة رسمية. يقدم أدليكس استشارات سرية عبر واتساب أو البريد الإلكتروني دون الحاجة لحضور مكتب.",
        },
      ],
    },
  },
  {
    slug: "wrongful-termination-saudi-labor-law",
    date: "2026-06-08",
    category: { en: "Employment Law", ar: "قانون العمل" },
    readTime: 6,
    en: {
      title: "Wrongful Termination Under Saudi Labor Law: Your Rights and How to Claim Them",
      excerpt:
        "Saudi Labor Law provides strong protections against arbitrary dismissal. If you have been terminated without a valid reason, you may be entitled to compensation, end-of-service benefits, and more — even if your employer claims otherwise.",
      seoTitle:
        "Wrongful Termination Saudi Arabia: Employee Rights | Saudi Labor Law Lawyer | Adlix",
      seoDescription:
        "Been wrongfully terminated in Saudi Arabia? Know your rights under Saudi Labor Law. Online consultation with a Saudi employment lawyer — 30+ years experience, response within minutes.",
      content: [
        {
          body: "Saudi Labor Law (Royal Decree No. M/51) provides employees with meaningful protection against arbitrary or unjust termination. Understanding the difference between lawful and unlawful dismissal — and the remedies available to you — is essential if you believe your employment was ended without justification.",
        },
        {
          heading: "What Is Wrongful Termination Under Saudi Law?",
          body: "An employer may terminate an employee for cause under Article 80 of the Saudi Labor Law, which lists specific grounds including serious misconduct, repeated failure to perform duties, and unauthorised absence. Termination without cause — or for reasons not listed in Article 80 — is considered arbitrary dismissal under Article 77. Employers must also follow the required notice period (60 days for monthly-paid employees) unless the dismissal falls under Article 80.",
        },
        {
          heading: "Your Rights If You Are Wrongfully Dismissed",
          body: "Under Article 77, an employee who is arbitrarily dismissed is entitled to compensation equivalent to two months' wages for each year of service, in addition to the full end-of-service gratuity (one month's salary per year for the first five years, and one and a half months' salary per year thereafter). You are also entitled to any unused annual leave pay and wages owed up to the termination date.",
        },
        {
          heading: "End-of-Service Benefits (Gratuity)",
          body: "Regardless of the reason for termination — unless you are dismissed under Article 80 — you are entitled to an end-of-service gratuity (Mak'afat Nihayat Al-Khadamah). The calculation is: one-third of a month's salary per year for the first two years, two-thirds for years three to five, and a full month's salary per year thereafter. Employees who resign before two years of service forfeit their gratuity; resignation between two and five years entitles you to one-third; resignation after five years entitles you to the full amount.",
        },
        {
          heading: "Filing a Claim: Process and Deadlines",
          body: "Employment disputes in Saudi Arabia must first be referred to the Ministry of Human Resources and Social Development (HRSD) for amicable settlement. If no settlement is reached within 21 days, the dispute is referred to the Labour Tribunals. Critically, claims must be filed within 12 months of the date of termination — missing this deadline may bar your claim entirely. Do not delay in seeking legal advice.",
        },
        {
          heading: "Practical Steps to Take Immediately",
          body: "Preserve all evidence: your employment contract, payslips, HR correspondence, performance reviews, and any communications regarding your termination. Do not sign any settlement agreement or waiver without independent legal advice — employers sometimes present waivers framed as routine administrative paperwork. A Saudi employment lawyer can assess your entitlements before you take any step.",
        },
      ],
    },
    ar: {
      title: "الفصل التعسفي في المملكة العربية السعودية: حقوقك وكيفية المطالبة بها",
      excerpt:
        "يوفر نظام العمل السعودي حماية قوية من الفصل التعسفي. إن أُنهيت خدمتك دون سبب مشروع، فقد يحق لك التعويض ومكافأة نهاية الخدمة وحقوق أخرى — حتى وإن ادّعى صاحب العمل خلاف ذلك.",
      seoTitle:
        "الفصل التعسفي في المملكة: حقوق الموظف ونظام العمل السعودي | محامي عمل | أدليكس",
      seoDescription:
        "هل تعرضت للفصل التعسفي في المملكة العربية السعودية؟ تعرف على حقوقك في نظام العمل السعودي. استشارة أونلاين مع محامي عمل سعودي متخصص — خبرة 30+ عاماً، استجابة خلال دقائق.",
      content: [
        {
          body: "يوفر نظام العمل السعودي (المرسوم الملكي م/51) حماية فعّالة للموظفين من الفصل التعسفي أو غير المبرر. فهم الفرق بين الفصل المشروع وغير المشروع والحقوق المترتبة عليه أمر بالغ الأهمية إن كنت تعتقد أن عقدك أُنهي دون مبرر.",
        },
        {
          heading: "ما هو الفصل التعسفي بموجب النظام السعودي؟",
          body: "يحق لصاحب العمل إنهاء خدمة الموظف لأسباب مشروعة وفق المادة 80 من نظام العمل — كالإخلال الجسيم بالواجبات أو التغيب غير المبرر. أما الفصل دون سبب أو لغير الأسباب المحددة في المادة 80 فيُعدّ فصلاً تعسفياً بموجب المادة 77. ويجب على صاحب العمل الالتزام بمهلة الإشعار (60 يوماً للعمال الشهريين) ما لم ينطبق الفصل على المادة 80.",
        },
        {
          heading: "حقوقك في حال الفصل التعسفي",
          body: "وفق المادة 77، يستحق الموظف المفصول تعسفياً تعويضاً يعادل شهرين من الراتب عن كل سنة خدمة، إضافةً إلى مكافأة نهاية الخدمة كاملةً وأجر الإجازة السنوية غير المستخدمة وجميع المستحقات حتى تاريخ الإنهاء.",
        },
        {
          heading: "مكافأة نهاية الخدمة",
          body: "بصرف النظر عن سبب الإنهاء — ما لم يكن الفصل وفق المادة 80 — يستحق الموظف مكافأة نهاية خدمة تُحسب كما يلي: ثلث راتب شهري لكل سنة خلال السنتين الأوليين، وثلثا راتب شهري للسنوات من الثالثة إلى الخامسة، وراتب شهر كامل لكل سنة بعد ذلك.",
        },
        {
          heading: "تقديم الشكوى: الإجراءات والمواعيد",
          body: "يجب أولاً رفع النزاع العمالي إلى وزارة الموارد البشرية والتنمية الاجتماعية للتسوية الودية. إن لم تُحسم القضية خلال 21 يوماً، تُحال إلى المحاكم العمالية. الأهم: يجب تقديم المطالبة خلال 12 شهراً من تاريخ الإنهاء — التأخير قد يسقط حقك نهائياً.",
        },
        {
          heading: "خطوات عملية فورية",
          body: "احتفظ بجميع الأدلة: عقد العمل والمراسلات والتقارير الوظيفية. لا توقع أي تسوية أو تنازل قبل الحصول على مشورة قانونية مستقلة — يقدم أدليكس استشارة عمالية سرية عبر واتساب أو البريد الإلكتروني خلال دقائق.",
        },
      ],
    },
  },
  {
    slug: "foreign-company-registration-saudi-arabia",
    date: "2026-06-01",
    category: { en: "Foreign Investment", ar: "الاستثمار الأجنبي" },
    readTime: 8,
    en: {
      title: "How to Register a Foreign Company in Saudi Arabia Under Vision 2030",
      excerpt:
        "Vision 2030 has transformed Saudi Arabia's investment landscape. Foreign investors can now own 100% of companies across most sectors — but navigating the MISA licensing process and Commercial Registration requires careful planning.",
      seoTitle:
        "Foreign Company Registration Saudi Arabia 2025: MISA License Guide | Adlix",
      seoDescription:
        "Step-by-step guide to registering a foreign company in Saudi Arabia. MISA license, Commercial Registration, company types, and common pitfalls. Expert legal advice from Adlix — 30+ years experience.",
      content: [
        {
          body: "Saudi Arabia's Vision 2030 economic transformation has fundamentally opened the Kingdom to foreign investment. Foreign nationals and companies can now own 100% of their Saudi business across most sectors — a significant shift from the historical requirement of a Saudi partner. However, the registration process involves multiple regulatory bodies and a structured sequence of steps that must be followed precisely.",
        },
        {
          heading: "Step 1: Obtain a Foreign Investment Licence from MISA",
          body: "The Ministry of Investment of Saudi Arabia (MISA, formerly SAGIA) is the gateway for all foreign investment licences. The application requires the investor's corporate documents (certified, apostilled, and translated into Arabic), a business plan, financial statements, and sector-specific documentation. MISA reviews whether your proposed activity is on the Negative List — a set of restricted sectors including oil exploration, security services, and certain professional activities. Activities not on the Negative List are generally open to 100% foreign ownership.",
        },
        {
          heading: "Step 2: Choose Your Legal Structure",
          body: "The most common structures for foreign investors are: (1) Limited Liability Company (LLC / WLL) — the most flexible option for most businesses; (2) Joint Stock Company (JSC) — required for certain large-scale activities and for companies planning a future IPO; (3) Branch Office — allows a foreign company to operate in Saudi Arabia directly without establishing a separate legal entity, but the parent company bears unlimited liability; and (4) Special Economic Zone (SEZ) entity — available in designated zones such as King Abdullah Economic City or the Special Integrated Logistics Zone, with distinct regulatory and tax benefits.",
        },
        {
          heading: "Step 3: Commercial Registration (CR)",
          body: "Once the MISA licence is issued, you must register with the Ministry of Commerce to obtain a Commercial Registration. This step requires the company's Articles of Association (authenticated and notarised), proof of the registered business address in Saudi Arabia, and payment of the CR fee. The CR formally constitutes the company as a Saudi legal entity.",
        },
        {
          heading: "Step 4: Additional Registrations",
          body: "After obtaining the CR, foreign companies must register with ZATCA (Zakat, Tax and Customs Authority) for VAT and Zakat purposes, register employees with the General Organisation for Social Insurance (GOSI), comply with Saudization (Nitaqat) requirements for the percentage of Saudi employees, and open a corporate bank account with a Saudi bank.",
        },
        {
          heading: "Common Pitfalls and How to Avoid Them",
          body: "The most frequent issues we see are: incorrect classification of the business activity (which affects the licence category and Saudization band), errors in the Arabic translation of corporate documents, failure to comply with minimum capital requirements for certain activities, and misunderstanding the obligations of the branch structure. Working with an experienced legal adviser from the outset avoids costly re-filings and delays.",
        },
      ],
    },
    ar: {
      title: "كيفية تسجيل شركة أجنبية في المملكة العربية السعودية في ظل رؤية 2030",
      excerpt:
        "أحدثت رؤية 2030 تحولاً جذرياً في مناخ الاستثمار السعودي. يمكن للمستثمرين الأجانب الآن امتلاك 100% من شركاتهم في معظم القطاعات، لكن الحصول على ترخيص وزارة الاستثمار (مساند) والتسجيل التجاري يستلزم تخطيطاً دقيقاً.",
      seoTitle:
        "تسجيل شركة أجنبية في المملكة 2025: دليل ترخيص مساند | أدليكس",
      seoDescription:
        "دليل خطوة بخطوة لتسجيل شركة أجنبية في المملكة العربية السعودية. ترخيص مساند والسجل التجاري وأنواع الشركات والأخطاء الشائعة. مشورة قانونية متخصصة من أدليكس — خبرة 30+ عاماً.",
      content: [
        {
          body: "أسهم تحول المملكة في إطار رؤية 2030 في فتح السوق السعودية للاستثمار الأجنبي فتحاً غير مسبوق. يمكن للمستثمرين والشركات الأجنبية الآن امتلاك 100% من أعمالهم في معظم القطاعات. غير أن عملية التسجيل تمر بجهات تنظيمية متعددة وخطوات متسلسلة يجب اتباعها بدقة.",
        },
        {
          heading: "الخطوة الأولى: الحصول على ترخيص استثماري من وزارة الاستثمار (مساند)",
          body: "وزارة الاستثمار (مساند) هي البوابة الرئيسية للتراخيص الاستثمارية الأجنبية. يستلزم الطلب تقديم وثائق الشركة (موثقة ومصادق عليها ومترجمة للعربية) وخطة عمل وكشوف مالية وأي وثائق خاصة بالقطاع. تتحقق الوزارة مما إذا كان النشاط المقترح مدرجاً في القائمة السلبية (الأنشطة المقيّدة) — وما لم يكن كذلك فالملكية الأجنبية الكاملة مسموح بها.",
        },
        {
          heading: "الخطوة الثانية: اختيار الشكل القانوني",
          body: "أبرز الأشكال المتاحة للمستثمرين الأجانب: شركة ذات مسؤولية محدودة (الأكثر شيوعاً ومرونةً)، وشركة مساهمة مطلوبة لبعض الأنشطة الكبرى، وفرع شركة أجنبية (لا كيان قانوني مستقل لكن المسؤولية تقع على الشركة الأم)، وكيان منطقة اقتصادية خاصة (بمزايا تنظيمية وضريبية مميزة).",
        },
        {
          heading: "الخطوة الثالثة: السجل التجاري",
          body: "بعد الترخيص من مساند، يتعين التسجيل في وزارة التجارة للحصول على السجل التجاري. يستلزم ذلك نظام الشركة الأساسي (موثقاً ومصادقاً عليه) وإثبات العنوان في المملكة وسداد رسوم التسجيل.",
        },
        {
          heading: "الخطوة الرابعة: التسجيلات اللازمة",
          body: "بعد الحصول على السجل التجاري، يجب التسجيل في هيئة الزكاة والضريبة والجمارك (زاتكا) والمؤسسة العامة للتأمينات الاجتماعية (التأمينات) والالتزام بنسب السعودة (نطاقات) وفتح حساب بنكي.",
        },
        {
          heading: "الأخطاء الشائعة وكيفية تجنبها",
          body: "أبرز الأخطاء التي نرصدها: خطأ في تصنيف النشاط التجاري، وقصور في ترجمة الوثائق الرسمية للعربية، وعدم الوفاء بمتطلبات الحد الأدنى لرأس المال، وسوء فهم التزامات هيكل الفرع. العمل مع مستشار قانوني متخصص من البداية يوفر وقتاً ومالاً.",
        },
      ],
    },
  },
  {
    slug: "board-of-grievances-saudi-arabia",
    date: "2026-05-25",
    category: { en: "Administrative Law", ar: "القانون الإداري" },
    readTime: 6,
    en: {
      title: "The Board of Grievances: Saudi Arabia's Administrative Court System Explained",
      excerpt:
        "When a government ministry, regulatory body, or public authority in Saudi Arabia makes a decision that harms your rights, the Board of Grievances is where you challenge it. Understanding how this court works — and its strict deadlines — can be the difference between winning and losing.",
      seoTitle:
        "Board of Grievances Saudi Arabia: How to File & Win | Administrative Law Lawyer | Adlix",
      seoDescription:
        "Learn how the Board of Grievances (Diwan Al-Mazalim) works in Saudi Arabia. Types of cases, filing deadlines, and what to expect. Expert administrative law consultation — Adlix.",
      content: [
        {
          body: "The Board of Grievances (Diwan Al-Mazalim) is Saudi Arabia's supreme administrative court. It has exclusive jurisdiction over disputes between private parties — individuals or businesses — and government authorities. Whether a ministry has refused your licence, cancelled a government contract, imposed an unlawful penalty, or taken an administrative decision that harms your business, the Board of Grievances is the proper forum for challenge.",
        },
        {
          heading: "What Cases Does the Board of Grievances Handle?",
          body: "The Board of Grievances has jurisdiction over: administrative decisions by government ministries and agencies (licence refusals, cancellations, and suspensions); government contract disputes where a public authority is a party; disciplinary decisions against civil servants; disputes with regulatory bodies such as SAMA, CMA, ZATCA, and the Communications Authority; customs and tax disputes; and claims for compensation against government entities for unlawful actions.",
        },
        {
          heading: "The Structure of the Court",
          body: "The Board of Grievances comprises three levels: the Administrative Courts (primary courts of first instance in each region), the Administrative Courts of Appeal, and the Supreme Administrative Court. The Supreme Administrative Court is the final court for administrative matters and also has jurisdiction over certain high-value government contract disputes.",
        },
        {
          heading: "Critical Deadlines You Must Know",
          body: "Administrative law cases in Saudi Arabia are subject to strict and short limitation periods. The general rule is that a challenge to an administrative decision must be filed within 60 days of the date you were notified of the decision, or from the date you became aware of it. For some decisions — particularly those issued by certain regulatory bodies — the deadline may be even shorter. Missing the deadline generally means your right to challenge the decision is permanently lost, regardless of how strong your case would have been.",
        },
        {
          heading: "How to File a Case",
          body: "Cases before the Administrative Courts are filed electronically through the Najiz platform (the Ministry of Justice's digital court system). Your case submission must include: the challenged decision (or description of the government's action), the legal grounds for the challenge, supporting documentary evidence, and the specific relief sought (annulment, compensation, reinstatement, injunction). A formal legal opinion drafted by an experienced administrative lawyer significantly improves the structure and persuasiveness of the submission.",
        },
        {
          heading: "What Remedies Can You Obtain?",
          body: "The Administrative Courts can: annul an unlawful administrative decision; order compensation for financial loss caused by the government's unlawful action; issue injunctions to suspend the implementation of a decision while the case is pending; and order reinstatement in cases involving civil servants. In government contract disputes, the court can award damages and order performance of contractual obligations.",
        },
      ],
    },
    ar: {
      title: "ديوان المظالم: نظام المحاكم الإدارية في المملكة العربية السعودية",
      excerpt:
        "حين تصدر وزارة أو جهة تنظيمية قراراً يضر بحقوقك في المملكة، فإن ديوان المظالم هو الجهة المختصة للطعن فيه. فهم آلية عمل هذه المحكمة ومواعيدها الصارمة قد يكون الفارق بين الفوز والخسارة.",
      seoTitle:
        "ديوان المظالم في المملكة العربية السعودية: كيفية الرفع والفوز | محامي إداري | أدليكس",
      seoDescription:
        "تعرف على آلية عمل ديوان المظالم في المملكة العربية السعودية — أنواع القضايا ومواعيد التقديم. استشارة قانونية إدارية متخصصة مع أدليكس.",
      content: [
        {
          body: "ديوان المظالم هو المحكمة الإدارية العليا في المملكة العربية السعودية، ويختص حصراً بالنظر في النزاعات بين الأفراد والشركات من جهة والجهات الحكومية من جهة أخرى. سواء رفضت وزارة ترخيصك أو ألغت عقداً حكومياً أو فرضت غرامة غير مشروعة، فإن ديوان المظالم هو الملاذ القانوني الصحيح.",
        },
        {
          heading: "أنواع القضايا التي ينظر فيها ديوان المظالم",
          body: "يختص الديوان بالنظر في: القرارات الإدارية للوزارات والجهات الحكومية (رفض التراخيص وإلغاؤها وتعليقها)، ونزاعات العقود الحكومية، والقرارات التأديبية بحق موظفي الدولة، والنزاعات مع الجهات التنظيمية كساما وهيئة السوق المالية وزاتكا، وقضايا الجمارك والضرائب، والمطالبات بالتعويض عن أضرار الأعمال غير المشروعة للجهات الحكومية.",
        },
        {
          heading: "هيكل المحكمة",
          body: "يتألف ديوان المظالم من ثلاث درجات: المحاكم الإدارية الابتدائية في مختلف المناطق، ومحاكم الاستئناف الإدارية، والمحكمة الإدارية العليا التي تُعدّ مرجعاً أخيراً في القضايا الإدارية.",
        },
        {
          heading: "المواعيد الحاسمة التي لا بد من معرفتها",
          body: "القضايا الإدارية في المملكة خاضعة لمواعيد إجرائية صارمة وقصيرة. القاعدة العامة: يجب رفع الطعن في القرار الإداري خلال 60 يوماً من تاريخ إبلاغك به أو من تاريخ علمك به. بعض الجهات التنظيمية قد تحدد مواعيد أقصر. فوات الميعاد يسقط حق الطعن نهائياً.",
        },
        {
          heading: "كيفية رفع الدعوى",
          body: "تُرفع الدعاوى أمام المحاكم الإدارية إلكترونياً عبر منصة ناجز. يشتمل ملف القضية على: القرار المطعون فيه، وأسباب الطعن القانونية، والمستندات الداعمة، والطلبات المحددة (الإلغاء أو التعويض أو الوقف). مذكرة قانونية محكمة يُعدّها محامٍ إداري متخصص تعزز بشكل كبير فرص النجاح.",
        },
        {
          heading: "ما هي الحلول القانونية المتاحة؟",
          body: "يملك ديوان المظالم صلاحية: إلغاء القرار الإداري غير المشروع، وإلزام الجهة الحكومية بالتعويض، وإصدار أوامر بوقف التنفيذ ريثما يُبتّ في القضية، وإعادة الموظف إلى عمله. في نزاعات العقود الحكومية يمكن للمحكمة إلزام الجهة بالتعويض أو تنفيذ الالتزامات التعاقدية.",
        },
      ],
    },
  },
  {
    slug: "real-estate-disputes-saudi-arabia",
    date: "2026-05-18",
    category: { en: "Real Estate Law", ar: "قانون العقارات" },
    readTime: 6,
    en: {
      title: "Real Estate Disputes in Saudi Arabia: Your Legal Rights and Remedies",
      excerpt:
        "From title fraud and boundary disputes to contractor defects and landlord-tenant conflicts, Saudi real estate disputes can be complex and high-stakes. Knowing the legal framework — and acting quickly — is critical.",
      seoTitle:
        "Real Estate Disputes Saudi Arabia: Legal Rights & Remedies | Property Lawyer | Adlix",
      seoDescription:
        "Facing a real estate dispute in Saudi Arabia? Learn your legal options — title disputes, contractor defects, rental disputes, and more. Expert Saudi property law consultation with Adlix.",
      content: [
        {
          body: "Real estate disputes in Saudi Arabia are handled by the General Courts (for private disputes) and the Board of Grievances (where a government entity is involved). Given the high capital values involved in property transactions in the Kingdom, and the increasingly complex regulatory framework, legal disputes in this area can have significant financial consequences if not handled properly and promptly.",
        },
        {
          heading: "Title and Ownership Disputes",
          body: "Disputes over property title are among the most serious real estate matters in Saudi Arabia. The Real Estate General Authority (REGA) supervises the real estate sector and the title registration system. Title disputes often arise from conflicting registered deeds, boundary encroachments, inheritance disagreements, or fraudulent transfers. Courts will examine the chain of title and the registered documents to determine rightful ownership. Prompt legal action is essential — continued possession by a third party can complicate recovery.",
        },
        {
          heading: "Construction Defects and Contractor Disputes",
          body: "Saudi law imposes a statutory liability of ten years on engineers and contractors for defects in the structure of buildings (Article 688 of the Implementing Regulations to the Building Law). Claims for latent defects — defects that were not apparent at handover — must be raised within one year of discovery. Contractor disputes involving payment, delay, or defective work are resolved before the General Courts unless the contract contains an arbitration clause.",
        },
        {
          heading: "Landlord-Tenant Disputes and the Ejar Platform",
          body: "Residential and commercial tenancy in Saudi Arabia is regulated by the Ejar platform, administered by the Ministry of Municipal and Rural Affairs and Housing. All rental contracts should be registered on Ejar — unregistered contracts are more difficult to enforce. Disputes between landlords and tenants over eviction, maintenance obligations, rent increases, and security deposits are referred to the General Courts. Saudi tenants have the right not to be evicted without court order, and eviction without proper legal process is unlawful.",
        },
        {
          heading: "Off-Plan (Under-Construction) Property Issues",
          body: "The purchase of off-plan properties in Saudi Arabia is regulated by REGA's regulations on real estate development and escrow. Developers must hold buyers' payments in escrow accounts. Disputes over delivery delays, specification changes, or developer insolvency are increasingly common. Buyers who have paid deposits or instalments on stalled projects have legal remedies — including contract rescission and recovery of payments — but must act within applicable limitation periods.",
        },
        {
          heading: "How to Protect Yourself in Property Transactions",
          body: "Before signing any property purchase, sale, or lease agreement: have the contract reviewed by a qualified real estate lawyer; verify the title deed through the official REGA portal; ensure any off-plan purchase is REGA-registered and payments go to an escrow account; and confirm that all parties to the contract have the legal capacity and authority to transact. Prevention is always less expensive than litigation.",
        },
      ],
    },
    ar: {
      title: "النزاعات العقارية في المملكة العربية السعودية: حقوقك القانونية وسبل الإنصاف",
      excerpt:
        "من الاحتيال في الملكية وحدود الأراضي إلى عيوب البناء ونزاعات الإيجار — تتسم النزاعات العقارية في المملكة بتعقيدها وارتفاع مخاطرها. معرفة الإطار القانوني والتصرف بسرعة أمران بالغا الأهمية.",
      seoTitle:
        "النزاعات العقارية في المملكة: الحقوق القانونية وسبل الإنصاف | محامي عقارات | أدليكس",
      seoDescription:
        "هل تواجه نزاعاً عقارياً في المملكة العربية السعودية؟ تعرف على خياراتك القانونية — نزاعات الملكية وعيوب البناء والإيجار. استشارة قانونية عقارية متخصصة مع أدليكس.",
      content: [
        {
          body: "تنظر المحاكم العامة في النزاعات العقارية بين الأفراد، فيما يختص ديوان المظالم بالنزاعات التي تكون جهة حكومية طرفاً فيها. ونظراً لضخامة قيم العقارات في المملكة وتنامي التعقيدات التنظيمية، يمكن أن تترتب على النزاعات العقارية عواقب مالية وخيمة إذا لم تُعالَج بسرعة واحترافية.",
        },
        {
          heading: "نزاعات الملكية وسند التسجيل",
          body: "تُعدّ نزاعات حقوق الملكية من أخطر المسائل العقارية في المملكة. تشرف هيئة العقار على القطاع ونظام تسجيل الملكية. تنشأ هذه النزاعات عادةً من تعارض الصكوك المسجلة أو التجاوز على حدود الملكية أو خلافات الميراث أو التصرفات المشبوهة. يفحص القضاء سلسلة الملكية والوثائق الرسمية لتحديد الأحق بالملكية.",
        },
        {
          heading: "عيوب البناء ونزاعات المقاولين",
          body: "يُلزم القانون السعودي المهندسين والمقاولين بمسؤولية قانونية عن عيوب البناء الجوهرية لمدة عشر سنوات. تُرفع دعاوى العيوب الخفية خلال سنة من اكتشافها. تُنظر نزاعات المقاولين المتعلقة بالمدفوعات والتأخير والعيوب أمام المحاكم العامة ما لم يتضمن العقد شرط تحكيم.",
        },
        {
          heading: "نزاعات الإيجار ومنصة إيجار",
          body: "تنظم منصة إيجار عقود الإيجار السكني والتجاري. يجب توثيق جميع عقود الإيجار عليها — إذ يصعب تطبيق العقود غير الموثقة. تُحال النزاعات بين الملاك والمستأجرين — حول الإخلاء والصيانة ورفع الإيجار والتأمين — للمحاكم العامة. الإخلاء دون أمر قضائي مخالف للقانون.",
        },
        {
          heading: "إشكاليات العقارات على الخارطة (تحت الإنشاء)",
          body: "تُنظَّم عقارات الخارطة في المملكة بموجب لوائح هيئة العقار للتطوير والضمان. تُودَع دفعات المشترين في حسابات ضمان. تتزايد النزاعات حول التأخير في التسليم أو تغيير المواصفات أو إعسار المطورين. للمشترين الذين سددوا دفعات عقود متعثرة حقوق قانونية تشمل فسخ العقد واسترداد المبالغ.",
        },
        {
          heading: "كيف تحمي نفسك في المعاملات العقارية؟",
          body: "قبل توقيع أي عقد بيع أو إيجار: راجع العقد مع محامٍ عقاري متخصص، وتحقق من صحة الصك عبر بوابة هيئة العقار، وتأكد من تسجيل عقود الخارطة لدى هيئة العقار وإيداع المبالغ في حساب ضمان. الوقاية دائماً أقل تكلفة من التقاضي.",
        },
      ],
    },
  },
  {
    slug: "child-custody-saudi-arabia",
    date: "2026-05-10",
    category: { en: "Family Law", ar: "قانون الأسرة" },
    readTime: 7,
    en: {
      title: "Child Custody in Saudi Arabia: How the Courts Decide",
      excerpt:
        "Child custody disputes in Saudi Arabia are governed by Islamic Sharia and the Personal Status Law. Understanding the distinction between physical custody (Hadhanah) and legal guardianship (Wilayah) — and what courts look for — can help you protect your relationship with your children.",
      seoTitle:
        "Child Custody Saudi Arabia: Rights & Court Process | Family Law Lawyer | Adlix",
      seoDescription:
        "Understand how Saudi Arabian courts decide child custody — Hadhanah, Wilayah, and the best interests of the child. Expert online family law consultation with Adlix. 30+ years experience.",
      content: [
        {
          body: "Child custody proceedings in Saudi Arabia are handled by the Personal Status Courts and are governed by Islamic Sharia principles as applied through Saudi judicial practice. The distinction between physical custody (Hadhanah) and legal guardianship (Wilayah) is fundamental — they are separate legal concepts with different rules and different courts.",
        },
        {
          heading: "Hadhanah (Physical Custody)",
          body: "Hadhanah refers to the right and responsibility of physical care and day-to-day upbringing. Under Saudi judicial practice, mothers are generally entitled to Hadhanah for boys until the age of seven and girls until the age of nine. After these ages, the father is presumed to be the appropriate custodian, but courts exercise discretion and will extend maternal custody where the child's best interest requires it — including where the mother is the primary caregiver, where the child expresses a strong preference, or where there is evidence of paternal neglect or instability.",
        },
        {
          heading: "Wilayah (Legal Guardianship)",
          body: "Wilayah encompasses legal authority over the child's major decisions — education, medical treatment, travel, and financial matters. In Saudi law, Wilayah remains with the father (or his male relatives in his absence) regardless of who has physical custody, unless the court makes a specific order changing guardianship. This means a mother with physical custody may still need the father's consent — or a court order — for certain decisions involving the child.",
        },
        {
          heading: "Visitation Rights",
          body: "The non-custodial parent retains the right to visit the child (Haq al-Ru'ya). If the custodial parent interferes with court-ordered visitation, this can be raised before the court and may result in modification of custody. Courts can set detailed visitation schedules including provisions for holidays and school vacations.",
        },
        {
          heading: "Custody Disputes Involving Foreign Nationals",
          body: "International custody disputes are among the most complex family law matters in Saudi Arabia. When one parent is a Saudi national and the other is a foreign national, Saudi courts will apply Saudi law. Saudi fathers can prevent their children from travelling abroad, and Saudi law does not automatically recognise foreign custody orders. If you are a foreign national involved in a Saudi custody dispute, obtaining immediate legal advice from a lawyer experienced in Saudi family law is critical.",
        },
        {
          heading: "What Courts Look For",
          body: "In all custody decisions, Saudi courts apply the principle of the child's best interest (Maslahah al-Mahdhun). Courts consider the age and gender of the child, the moral fitness and practical capacity of each parent to provide care, the child's own expressed preferences (particularly for older children), the continuity of the child's current living arrangements, and the proximity of each parent to the child's school and extended family. Presenting clear, well-documented evidence of your parenting capacity significantly strengthens your position.",
        },
      ],
    },
    ar: {
      title: "الحضانة في المملكة العربية السعودية: كيف تبت المحاكم في قضاياها",
      excerpt:
        "تحكم قضايا الحضانة في المملكة أحكامُ الشريعة الإسلامية ونظام الأحوال الشخصية. فهم الفرق بين حضانة الصغير (الحضانة) والولاية القانونية (الولاية) — وما تبحث عنه المحاكم — يساعدك في حماية علاقتك بأبنائك.",
      seoTitle:
        "الحضانة في المملكة العربية السعودية: الحقوق وإجراءات المحكمة | محامي أسرة | أدليكس",
      seoDescription:
        "تعرف على كيفية بت المحاكم السعودية في قضايا الحضانة — الحضانة والولاية ومصلحة المحضون. استشارة قانونية أسرية أونلاين مع أدليكس. خبرة 30+ عاماً.",
      content: [
        {
          body: "تنظر محاكم الأحوال الشخصية في قضايا الحضانة بالمملكة العربية السعودية وفق أحكام الشريعة الإسلامية مطبّقةً على الممارسة القضائية السعودية. الفرق بين الحضانة الجسدية والولاية القانونية محوري — فكلٌّ منهما مفهوم قانوني مستقل بأحكام مختلفة.",
        },
        {
          heading: "الحضانة (الرعاية الجسدية)",
          body: "الحضانة هي حق الرعاية اليومية والتربية الجسدية للصغير. وفق الاجتهاد القضائي السعودي، تُمنح الأم عادةً حضانة الذكور حتى السابعة والإناث حتى التاسعة. بعد هذه السن يُفترض انتقال الحضانة للأب، لكن المحاكم تملك صلاحية تقديرية وتمدّ حضانة الأم متى اقتضت مصلحة المحضون ذلك، كأن تكون هي القائمة الفعلية على الرعاية أو يُبدي الطفل رغبته الصريحة أو يثبت إهمال الأب.",
        },
        {
          heading: "الولاية (الولاية القانونية)",
          body: "تشمل الولاية السلطة القانونية على القرارات الكبرى — التعليم والرعاية الطبية والسفر والمسائل المالية. يظل الأب ولياً قانونياً في النظام السعودي بصرف النظر عمن لديه الحضانة، ما لم يصدر حكم محكمة بخلاف ذلك. وهذا يعني أن الأم الحاضنة قد تحتاج إلى موافقة الأب أو أمر قضائي لبعض القرارات المتعلقة بالأبناء.",
        },
        {
          heading: "حق الرؤية",
          body: "يحتفظ غير الحاضن بحق رؤية أبنائه (حق الرؤية). إن حال الحاضن دون تنفيذ حق الرؤية المقرر قضائياً، يُمكن رفع شكوى للمحكمة وقد يترتب على ذلك تعديل الحضانة. للمحاكم صلاحية تحديد جداول رؤية مفصّلة تشمل الإجازات والعطلات.",
        },
        {
          heading: "نزاعات الحضانة بمشاركة مواطنين أجانب",
          body: "تُعدّ نزاعات الحضانة الدولية من أعقد القضايا الأسرية في المملكة. حين يكون أحد الوالدين سعودي الجنسية تطبّق المحاكم السعودية القانون السعودي. يحق للآباء السعوديين منع أطفالهم من السفر للخارج، ولا يُعترف تلقائياً بأحكام الحضانة الأجنبية. إن كنت مواطناً أجنبياً في نزاع حضانة سعودي، فالحصول على مشورة قانونية فورية من محامٍ متخصص بقانون الأسرة السعودي أمر بالغ الأهمية.",
        },
        {
          heading: "ما الذي تبحث عنه المحاكم؟",
          body: "في جميع قرارات الحضانة، تُطبّق المحاكم مبدأ مصلحة المحضون الفضلى. تراعي المحاكم: سن المحضون وجنسه، واللياقة الأخلاقية والقدرة العملية لكل والد، ورغبة الطفل (لا سيما الأكبر سناً)، واستمرارية بيئة المعيشة الحالية، وقرب كل والد من مدرسة الطفل وأقاربه. تقديم أدلة موثقة وواضحة على قدرتك التربوية يعزز موقفك بشكل كبير.",
        },
      ],
    },
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function formatDate(dateStr: string, lang: "en" | "ar"): string {
  const date = new Date(dateStr);
  if (lang === "ar") {
    return date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
