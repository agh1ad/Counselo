import { getUaeService } from "@/data/uae-legal-services";
import type { Region } from "@workspace/api-zod/browser";

// Scope descriptions, paired with the source-backed legal answers rendered beside them.
const overviews: Record<string, Record<string, { en: string; ar: string }>> = {
  "sa": {
    "family-law": {
      "en": "Saudi family matters can involve marriage, divorce, khulʿ, maintenance, custody, visitation and inheritance. The parties’ status, family documents and existing orders determine which personal-status questions and court route need review.",
      "ar": "تشمل المسائل الأسرية السعودية الزواج والطلاق والخلع والنفقة والحضانة والزيارة والإرث. وتحدد صفة الأطراف والوثائق الأسرية والأحكام القائمة مسائل الأحوال الشخصية والمسار القضائي الذي يحتاج إلى المراجعة."
    },
    "business-law": {
      "en": "Saudi commercial matters include unpaid invoices, supply failures, commercial agencies and disputes between business partners. The transaction, parties’ commercial capacity and dispute clause help distinguish a commercial claim from a corporate, civil or arbitration matter.",
      "ar": "تشمل المسائل التجارية السعودية الفواتير غير المسددة والإخلال بالتوريد والوكالات التجارية ونزاعات الشركاء. وتساعد طبيعة المعاملة والصفة التجارية للأطراف وشرط تسوية النزاع على تمييز المطالبة التجارية عن المسألة الشركاتية أو المدنية أو التحكيمية."
    },
    "real-estate": {
      "en": "Saudi property review distinguishes title and registration questions from leases, development contracts and ownership restrictions. The property location, register entry, parties’ status and requested remedy matter before considering REGA services or a court claim.",
      "ar": "تميز مراجعة العقارات السعودية بين الملكية والتسجيل والإيجار وعقود التطوير وقيود التملك. ويهم تحديد موقع العقار وقيده وصفة الأطراف والطلب قبل بحث خدمات الهيئة العامة للعقار أو المطالبة القضائية."
    },
    "employment-law": {
      "en": "Saudi employment review addresses wages, termination, leave, benefits and workplace obligations. Identify whether the relationship falls under the Labor Law, domestic-worker rules or a different employment regime before calculating a claim or selecting a labour-dispute route.",
      "ar": "تتناول مراجعة العمل السعودي الأجور والإنهاء والإجازات والمستحقات والالتزامات المهنية. ويجب تحديد خضوع العلاقة لنظام العمل أو قواعد العمالة المنزلية أو إطار وظيفي آخر قبل حساب المطالبة أو اختيار مسار النزاع العمالي."
    },
    "foreign-investment": {
      "en": "Saudi market-entry review starts with the investor, proposed activity and ownership structure. Investment registration, sector approvals, company formation and commercial contracts are separate checks; an approval for one step should not be treated as permission for every activity.",
      "ar": "تبدأ مراجعة دخول السوق السعودي بتحديد المستثمر والنشاط المقترح وهيكل الملكية. ويعد التسجيل الاستثماري والموافقات القطاعية وتأسيس الشركة والعقود التجارية فحوصاً مستقلة؛ فلا تعامل الموافقة على خطوة واحدة كإذن بجميع الأنشطة."
    },
    "administrative-law": {
      "en": "Saudi administrative review concerns government decisions, licensing, penalties and public-contract disputes. The issuing authority, legal basis, notification date and any grievance already submitted are central to assessing the Board of Grievances route or a sector-specific procedure.",
      "ar": "تتناول المراجعة الإدارية السعودية القرارات الحكومية والتراخيص والجزاءات ونزاعات العقود العامة. وتعد الجهة المصدرة والسند النظامي وتاريخ التبليغ والتظلم المقدم عناصر أساسية لبحث مسار ديوان المظالم أو الإجراء القطاعي الخاص."
    },
    "arbitration": {
      "en": "Saudi arbitration review begins with the written agreement, scope of the dispute, seat and chosen rules. Court proceedings, arbitral proceedings and award enforcement are distinct stages; the SCCA’s institutional rules apply only where the relevant arrangement calls for them.",
      "ar": "تبدأ مراجعة التحكيم السعودي بالاتفاق المكتوب ونطاق النزاع ومقر التحكيم والقواعد المختارة. وتختلف الدعوى القضائية وخصومة التحكيم وتنفيذ الحكم كمراحل؛ ولا تطبق قواعد المركز السعودي للتحكيم التجاري إلا وفق الاتفاق ذي الصلة."
    },
    "enforcement": {
      "en": "Saudi debt recovery depends on whether there is an enforceable instrument or a claim still requiring determination. Review the judgment, settlement or other instrument, service records, amounts paid and debtor details before choosing a Najiz execution request or another route.",
      "ar": "يتوقف تحصيل الدين في السعودية على وجود سند تنفيذي أو مطالبة ما زالت تحتاج إلى فصل. ويراجع الحكم أو التسوية أو السند الآخر وسجلات التبليغ والمبالغ المسددة وبيانات المدين قبل اختيار طلب التنفيذ عبر ناجز أو مسار آخر."
    },
    "companies-law": {
      "en": "Saudi company matters include formation, governance, share transfers, manager duties, restructuring and dissolution. The Companies Law framework must be read alongside the entity’s constitutional documents, approvals and commercial-register position; an agreement alone may not complete a corporate change.",
      "ar": "تشمل مسائل الشركات السعودية التأسيس والحوكمة ونقل الحصص وواجبات المديرين وإعادة الهيكلة والانقضاء. ويراجع إطار نظام الشركات مع وثائق تأسيس الكيان والموافقات ووضع السجل التجاري؛ فقد لا يكفي الاتفاق وحده لإتمام التغيير الشركاتي."
    },
    "contracts": {
      "en": "Saudi contract review addresses formation, performance, notices, breach and the requested remedy. The Civil Transactions Law may be relevant alongside special commercial or sector rules; governing-law and dispute clauses, evidence of performance and loss can change the analysis.",
      "ar": "تتناول مراجعة العقود السعودية الانعقاد والتنفيذ والإشعارات والإخلال والطلب المقصود. وقد ينطبق نظام المعاملات المدنية إلى جانب أحكام تجارية أو قطاعية خاصة؛ ويؤثر القانون المختار وشرط النزاع وإثبات التنفيذ والضرر في التحليل."
    },
    "criminal-law": {
      "en": "Saudi criminal review requires the allegation, case stage and any summons, detention or prosecution document. Substantive offences and criminal procedure must be distinguished; defence preparation, evidence preservation and court representation have different requirements.",
      "ar": "تحتاج المراجعة الجزائية السعودية إلى معرفة الاتهام ومرحلة القضية وأي استدعاء أو مستند توقيف أو إحالة. ويجب التمييز بين التجريم والإجراءات الجزائية؛ إذ تختلف متطلبات إعداد الدفاع وحفظ الأدلة والتمثيل القضائي."
    },
    "banking-finance": {
      "en": "Saudi banking and finance review covers loan terms, repayment, guarantees and disputed bank transactions. Identify the regulated provider and product before applying SAMA requirements or selecting a complaint or adjudication route; consumer finance and business facilities need different documents.",
      "ar": "تشمل مراجعة التمويل والمصارف السعودية شروط القرض والسداد والضمانات والعمليات المصرفية المتنازع عليها. وتحدد الجهة المنظمة والمنتج قبل تطبيق متطلبات البنك المركزي أو اختيار مسار الشكوى أو الفصل؛ وتختلف وثائق تمويل الأفراد عن التسهيلات التجارية."
    },
    "intellectual-property": {
      "en": "Saudi intellectual-property review separates trademarks, copyright, patents and confidential information. Ownership evidence, registration status, the protected subject matter and the alleged use determine the relevant SAIP materials and possible objection or enforcement questions.",
      "ar": "تميز مراجعة الملكية الفكرية السعودية بين العلامات وحقوق المؤلف والبراءات والمعلومات السرية. ويحدد إثبات الملكية وحالة التسجيل ومحل الحماية والاستخدام المدعى به مواد الهيئة السعودية للملكية الفكرية ومسائل الاعتراض أو الإنفاذ ذات الصلة."
    },
    "tax-zakat": {
      "en": "Saudi tax and zakat review starts with the taxpayer’s status, activity, registration and assessment period. VAT, zakat and other taxes are different obligations; a ZATCA assessment, penalty or registration issue must be checked against the relevant return, notice and objection stage.",
      "ar": "تبدأ مراجعة الضرائب والزكاة السعودية بصفة المكلف ونشاطه وتسجيله وفترة الربط. وتختلف ضريبة القيمة المضافة والزكاة والضرائب الأخرى؛ ويراجع الربط أو الجزاء أو مسألة التسجيل لدى الهيئة مع الإقرار والإشعار ومرحلة الاعتراض ذات الصلة."
    },
    "cyber-law": {
      "en": "Saudi digital matters can concern cybercrime allegations, online abuse or personal-data handling. These are not one legal regime: preserve the original messages, account details and processing records so the criminal-law and SDAIA data-protection questions can be assessed separately.",
      "ar": "قد تتعلق المسائل الرقمية السعودية باتهام معلوماتي أو إساءة عبر الإنترنت أو معالجة بيانات شخصية. ولا يجمعها نظام واحد؛ فاحفظ الرسائل الأصلية وبيانات الحساب وسجلات المعالجة لتقييم الأسئلة الجزائية ومتطلبات حماية البيانات لدى سدايا بصورة منفصلة."
    },
    "medical-malpractice": {
      "en": "Saudi medical-liability review separates an adverse treatment outcome from evidence of a professional breach, causation and harm. Clinical records, consent forms, expert findings and the complaint stage are essential before assessing a compensation claim or other procedure.",
      "ar": "تميز مراجعة المسؤولية الطبية السعودية بين النتيجة العلاجية غير المرغوبة وإثبات الإخلال المهني والسببية والضرر. وتعد السجلات الطبية ونماذج الموافقة ونتائج الخبرة ومرحلة الشكوى أساسية قبل تقييم مطالبة التعويض أو الإجراء الآخر."
    },
    "insurance-law": {
      "en": "Saudi insurance review turns on the policy type, cover period, insured event, exclusions and claim correspondence. Regulatory complaint handling, settlement duties and a coverage dispute require different checks; a motor-insurance rule should not be assumed to govern every policy.",
      "ar": "تتوقف مراجعة التأمين السعودي على نوع الوثيقة وفترة التغطية والحادث والاستثناءات ومراسلات المطالبة. وتختلف فحوص الشكوى التنظيمية والتزامات التسوية ونزاع التغطية؛ فلا يفترض انطباق قاعدة تأمين المركبات على كل وثيقة."
    }
  },
  "syr": {
    "family-law": {
      "en": "Syrian family matters require attention to the applicable personal-status framework, religious affiliation where relevant, civil records and existing judgments. A divorce, custody or inheritance request may also involve missing records or documents issued abroad.",
      "ar": "تحتاج المسائل الأسرية السورية إلى تحديد إطار الأحوال الشخصية المنطبق والانتماء الديني عند صلته بالمسألة والسجلات المدنية والأحكام القائمة. وقد يرتبط طلب الطلاق أو الحضانة أو الإرث بسجلات مفقودة أو وثائق صادرة في الخارج."
    },
    "business-law": {
      "en": "Syrian commercial review covers sales, supply, agency arrangements and business claims. Trade Law 33/2007 is a legislative starting point; the contract, transaction date, parties and any special legislation must be checked before choosing the applicable rule or forum.",
      "ar": "تشمل المراجعة التجارية السورية البيع والتوريد والوكالات والمطالبات التجارية. ويعد قانون التجارة رقم 33 لعام 2007 نقطة بدء تشريعية؛ مع ضرورة مراجعة العقد وتاريخ المعاملة وصفة الأطراف وأي تشريع خاص قبل تحديد القاعدة أو المرجع المختص."
    },
    "real-estate": {
      "en": "Syrian property matters may turn on the land-register entry, cadastral details, succession documents and the basis of possession. A sale agreement, occupation of land and registered ownership are different facts; missing records and local access can affect the next practical step.",
      "ar": "قد تتوقف المسائل العقارية السورية على القيد العقاري والبيانات المساحية ووثائق الإرث وأساس الحيازة. فعقد البيع وإشغال العقار والملكية المسجلة وقائع مختلفة؛ وقد تؤثر السجلات المفقودة وإمكانية الوصول محلياً في الخطوة العملية التالية."
    },
    "employment-law": {
      "en": "Syrian employment review separates employment contracts from public appointments and other special relationships. Labor Law 17/2010 provides a starting point for covered employment; the employer’s identity, applicable amendments, insurance records and termination documents require individual review.",
      "ar": "تميز مراجعة العمل السوري بين عقود العمل والتعيين العام والعلاقات ذات الأحكام الخاصة. ويشكل قانون العمل رقم 17 لعام 2010 نقطة بدء للعلاقات الخاضعة له؛ مع مراجعة هوية صاحب العمل والتعديلات المنطبقة وسجلات التأمينات ووثائق الإنهاء."
    },
    "foreign-investment": {
      "en": "Syrian investment review considers the proposed project, investment licence, land or premises, financing and sector approvals. The operative investment framework and implementing decisions must be checked against the project date, especially where an application, refusal or amendment is already pending.",
      "ar": "تتناول مراجعة الاستثمار السوري المشروع المقترح وإجازة الاستثمار والعقار أو المقر والتمويل والموافقات القطاعية. ويجب مراجعة الإطار الاستثماري النافذ وقراراته التنفيذية بحسب تاريخ المشروع، خصوصاً عند وجود طلب أو رفض أو تعديل قيد المعالجة."
    },
    "administrative-law": {
      "en": "Syrian administrative matters require the actual decision, issuing body and proof of notification. A request to cancel a decision, a compensation claim and a public-employment grievance may raise different jurisdiction and admissibility questions before the administrative courts.",
      "ar": "تحتاج المسائل الإدارية السورية إلى القرار الفعلي والجهة المصدرة وإثبات التبليغ. وقد يثير طلب إلغاء القرار أو التعويض أو التظلم الوظيفي أسئلة مختلفة بشأن الاختصاص والقبول أمام القضاء الإداري."
    },
    "arbitration": {
      "en": "Syrian arbitration review distinguishes an arbitration agreement from mediation or a court claim. The clause, seat, parties’ authority, chosen rules and status of any award determine which questions of validity, procedure or enforcement must be assessed.",
      "ar": "تميز مراجعة التحكيم السوري بين اتفاق التحكيم والوساطة والدعوى القضائية. ويحدد الشرط والمقر وصلاحية الأطراف والقواعد المختارة وحالة أي حكم مسائل الصحة والإجراءات والتنفيذ المطلوب تقييمها."
    },
    "enforcement": {
      "en": "Syrian enforcement review separates establishing a debt from executing an existing judgment or instrument. The execution file, notification, debtor assets, local conditions and any objection help determine the next available step without assuming recovery is assured.",
      "ar": "تميز مراجعة التنفيذ السوري بين إثبات الدين وتنفيذ حكم أو سند قائم. ويساعد ملف التنفيذ والتبليغ وأموال المدين والظروف المحلية وأي اعتراض على تحديد الخطوة المتاحة من دون افتراض ضمان التحصيل."
    },
    "companies-law": {
      "en": "Syrian company review begins with the legal form, founding documents, register and authority to act for the entity. Incorporation, a partner dispute, transfer of ownership and liquidation involve different records and registration steps, including where a shareholder is abroad.",
      "ar": "تبدأ مراجعة الشركات السورية بالشكل القانوني ووثائق التأسيس والسجل وصلاحية التصرف باسم الكيان. ويحتاج التأسيس ونزاع الشركاء ونقل الملكية والتصفية إلى سجلات وخطوات تسجيل مختلفة، بما فيها حالات وجود شريك في الخارج."
    },
    "contracts": {
      "en": "Syrian contract review distinguishes private agreements, consumer transactions and dealings with public bodies. The parties’ capacity, contract terms, performance records and applicable special rules matter before proposing amendment, termination, compensation or a dispute route.",
      "ar": "تميز مراجعة العقود السورية بين الاتفاقات الخاصة ومعاملات المستهلك والتعامل مع الجهات العامة. وتهم أهلية الأطراف وشروط العقد وسجلات التنفيذ والقواعد الخاصة المنطبقة قبل اقتراح تعديل أو إنهاء أو تعويض أو مسار للنزاع."
    },
    "criminal-law": {
      "en": "Syrian criminal review starts with the alleged conduct, investigating authority, detention status and case documents. Digital evidence, witness accounts and the distinction between a complaint and a formal charge can affect defence preparation and the competent procedural route.",
      "ar": "تبدأ المراجعة الجزائية السورية بالفعل المدعى به وجهة التحقيق وحالة التوقيف ووثائق القضية. وقد تؤثر الأدلة الرقمية وأقوال الشهود والتمييز بين الشكوى والاتهام الرسمي في إعداد الدفاع وتحديد المسار الإجرائي المختص."
    },
    "banking-finance": {
      "en": "Syrian banking review considers account terms, transfers, currency, credit facilities and security documents. The transaction date and relevant Central Bank decisions are important, especially where a cross-border payment or foreign-currency obligation is involved.",
      "ar": "تتناول المراجعة المصرفية السورية شروط الحساب والحوالات والعملة والتسهيلات ووثائق الضمان. ويهم تاريخ العملية وقرارات المصرف المركزي ذات الصلة، خصوصاً عند وجود حوالة عبر الحدود أو التزام بعملة أجنبية."
    },
    "intellectual-property": {
      "en": "Syrian intellectual-property matters require identifying the protected work, mark or invention and the chain of ownership. Copyright and registered industrial-property rights have different legal bases; publication, use, licences and alleged copying need to be assessed separately.",
      "ar": "تحتاج مسائل الملكية الفكرية السورية إلى تحديد المصنف أو العلامة أو الاختراع وتسلسل الملكية. وتختلف الأسس القانونية لحق المؤلف وحقوق الملكية الصناعية المسجلة؛ وتراجع وقائع النشر والاستعمال والترخيص والنسخ المدعى به بصورة مستقلة."
    },
    "tax-zakat": {
      "en": "Syrian tax review concerns the taxpayer, activity, assessment period and actual notice or payment demand. Announced reforms should be distinguished from enacted obligations; business records and the operative text must be checked before assuming a tax, exemption or challenge deadline applies.",
      "ar": "تتناول المراجعة الضريبية السورية صفة المكلف ونشاطه وفترة التكليف والإشعار أو المطالبة الفعلية. ويجب تمييز الإصلاحات المعلنة عن الالتزامات النافذة، ومراجعة السجلات والنص المنطبق قبل افتراض ضريبة أو إعفاء أو ميعاد اعتراض."
    },
    "cyber-law": {
      "en": "Syrian cybercrime review considers the specific allegation, technical evidence and investigation stage under the relevant legislation, including Law 20/2022 where applicable. Screenshots alone may not resolve attribution; original records and the competent technical investigation matter.",
      "ar": "تتناول مراجعة الجرائم المعلوماتية السورية الاتهام المحدد والأدلة الفنية ومرحلة التحقيق وفق التشريع ذي الصلة، بما فيه القانون 20 لعام 2022 عند انطباقه. وقد لا تكفي الصور لإثبات نسبة الفعل؛ فتهم السجلات الأصلية والتحقيق الفني المختص."
    },
    "medical-malpractice": {
      "en": "Syrian medical review distinguishes a hospital complaint, a records request and a compensation or criminal claim. Treatment records, alleged error, injury and medical findings must be assembled; any new medical-liability legislation must be checked before selecting the applicable route.",
      "ar": "تميز المراجعة الطبية السورية بين شكوى المستشفى وطلب السجلات ودعوى التعويض أو الادعاء الجزائي. وتجمع سجلات العلاج والخطأ المدعى به والإصابة والنتائج الطبية، مع التحقق من أي تشريع جديد للمسؤولية الطبية قبل اختيار المسار المنطبق."
    },
    "insurance-law": {
      "en": "Syrian insurance review begins with the policy, insured risk, beneficiary and insurer’s written position. Compulsory third-party motor cover, damage to the insured vehicle and other insurance products raise different coverage questions; the policy and operative regulations control the review.",
      "ar": "تبدأ مراجعة التأمين السوري بالوثيقة والخطر المؤمن منه والمستفيد وموقف الشركة المكتوب. وتختلف أسئلة تغطية الغير الإلزامية للمركبات عن ضرر المركبة المؤمنة والمنتجات الأخرى؛ وتراجع الوثيقة والأنظمة النافذة لتحديد النطاق."
    },
    "civil-law": {
      "en": "Syrian civil matters include ownership, obligations, damage and compensation outside a more specific regime. The basis of the right, available evidence and requested remedy must be distinguished, particularly where possession, displacement or a special recovery process affects the claim.",
      "ar": "تشمل المسائل المدنية السورية الملكية والالتزامات والضرر والتعويض خارج الإطار الخاص. ويجب تمييز أساس الحق والأدلة والطلب، خصوصاً عند تأثير الحيازة أو النزوح أو مسار استرداد خاص في المطالبة."
    },
    "civil-procedure": {
      "en": "Syrian civil-procedure review addresses jurisdiction, filing, notification, evidence and challenges to decisions. The exact court, case stage, service record and date of the order matter before selecting an appeal, objection or interim request.",
      "ar": "تتناول مراجعة أصول المحاكمات المدنية السورية الاختصاص والقيد والتبليغ والإثبات والطعن بالقرارات. ويهم تحديد المحكمة ومرحلة الدعوى وسجل التبليغ وتاريخ القرار قبل اختيار الاستئناف أو الاعتراض أو الطلب المستعجل."
    },
    "criminal-procedure": {
      "en": "Syrian criminal-procedure review focuses on investigation, detention, access to the file and challenges to procedural decisions. The alleged offence, authority holding the file and documented dates determine which safeguards and applications need examination.",
      "ar": "تركز مراجعة أصول المحاكمات الجزائية السورية على التحقيق والتوقيف والاطلاع على الملف والطعن بالقرارات الإجرائية. ويحدد الفعل المنسوب والجهة التي تحتفظ بالملف والتواريخ الموثقة الضمانات والطلبات التي تحتاج إلى البحث."
    }
  }
};

export function serviceLegalOverview(region: Region, service: string, lang: "en" | "ar") {
  return region === "uae" ? getUaeService(service)?.overview[lang] : overviews[region]?.[service]?.[lang];
}
