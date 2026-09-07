/** Exact published section labels only; this does not infer headings from emphasis. */
const ARTICLE_SECTION_LABELS: Readonly<Record<string, Readonly<Record<string, "h2" | "h3">>>> = {
  "ar/Penalty-clause-in-saudi": {
    "أولًا: ماهية الشرط الجزائي وأهميته في العقود التجارية.": "h2",
    "ثانيًا: الأساس النظامي للشرط الجزائي في السعودية.": "h2",
    "ثالثًا: شروط صحة الشرط الجزائي.": "h2",
    "رابعًا: الاتجاه القضائي السعودي في تطبيق الشرط الجزائي.": "h2",
    "خامسًا: صور تطبيق الشرط الجزائي في العقود التجارية.": "h2",
    "سادسًا: كيفية صياغة شرط جزائي قوي ونافذ.": "h2",
    "سابعًا: هل يمكن للمحكمة تعديل الشرط الجزائي؟": "h2"
  },
  "ar/adarh-almkhatr-fy-alaqwd-wfq-alnzam-alsawdy": {
    "أولًا: مفهوم إدارة المخاطر في العقود.": "h2",
    "ثانيًا: أنواع المخاطر في العقود التجارية.": "h2",
    "ثالثًا: أدوات إدارة المخاطر في العقود التجارية.": "h2",
    "رابعًا: منهجية عملية لإدارة المخاطر قبل توقيع العقد.": "h2",
    "خامسًا: إدارة المخاطر أثناء تنفيذ العقد.": "h2",
    "سادسًا: الاتجاه القضائي السعودي في قضايا المخاطر.": "h2"
  },
  "ar/alahlyh-fy-altaaqd-fy-alqanwn-alswry": {
    "أولاً: ما المقصود بالأهلية؟": "h2",
    "ثانياً: أهلية الوجوب.": "h2",
    "ثالثاً: أهلية الأداء.": "h2",
    "رابعاً: متى يكون الشخص كامل الأهلية؟": "h2",
    "خامساً: ناقص الأهلية.": "h2",
    "سادساً: عديم الأهلية.": "h2",
    "سابعاً: أثر نقص الأهلية على العقد.": "h2",
    "ثامناً: من يملك التمسك بعدم الأهلية؟": "h2",
    "تاسعاً: إثبات الأهلية.": "h2",
    "عاشراً: تطبيقات عملية.": "h2"
  },
  "ar/alaqd-fy-alqanwn-alswry": {
    "أولاً: ما هو العقد؟": "h2",
    "ثانياً: لماذا تُعد العقود أساس الحياة القانونية؟": "h2",
    "ثالثاً: خصائص العقد في القانون السوري.": "h2",
    "رابعاً: أركان العقد بصورة إجمالية.": "h2",
    "خامساً: مبدأ سلطان الإرادة.": "h2",
    "سادساً: الفرق بين العقد والاتفاق.": "h2",
    "سابعاً: متى يصبح العقد ملزماً؟": "h2",
    "ثامناً: أمثلة عملية.": "h2",
    "تاسعاً: أخطاء شائعة عند إبرام العقود.": "h2",
    "عاشراً: أسئلة شائعة.": "h2"
  },
  "ar/almswwlyh-alaqdyh-fy-alqanwn-alswry": {
    "أولاً: وجود عقد صحيح.": "h3",
    "ثانياً: إخلال أحد المتعاقدين بالتزامه.": "h3",
    "ثالثاً: وقوع ضرر.": "h3",
    "رابعاً: وجود علاقة سببية.": "h3",
    "ما المقصود بالمسؤولية العقدية؟": "h2",
    "متى تقوم المسؤولية العقدية؟": "h2",
    "صور الإخلال بالعقد:": "h2",
    "هل يكفي الإخلال للمطالبة بالتعويض؟": "h2",
    "الإعذار وأثره في المسؤولية العقدية:": "h2",
    "وسائل حماية الدائن:": "h2",
    "أمثلة عملية:": "h2",
    "متى تنتفي المسؤولية العقدية؟": "h2",
    "كيف تتجنب المسؤولية العقدية؟": "h2",
    "المراجع:": "h2"
  },
  "ar/almswwlyh-an-fal-alghyr": {
    "أولاً: المفهوم والأساس الفلسفي.": "h2",
    "ثانياً: صور المسؤولية عن فعل الغير.": "h2",
    "ثالثاً: شروط التطبيق (في التشريعات المقارنة).": "h2",
    "رابعاً: أهمية فهم هذه المسؤولية للمجتمع.": "h2"
  },
  "ar/altakhr-fy-alrwatb-aw-alamtnaa-an-dfaha": {
    "أولًا: مفهوم التأخر في دفع الأجر.": "h2",
    "ثانيًا: حقوق العامل عند تأخر الرواتب.": "h2",
    "ثالثًا: مسؤوليات صاحب العمل.": "h2",
    "رابعًا: وسائل الإثبات في قضايا الرواتب.": "h2",
    "خامسًا: نصائح عملية للعامل.": "h2"
  },
  "ar/altawyd-an-alakhlal-balaqd-fy-alqanwn-alswry": {
    "أولاً: وجود عقد صحيح": "h3",
    "ثانياً: وقوع إخلال عقدي": "h3",
    "ثالثاً: تحقق الضرر": "h3",
    "رابعاً: العلاقة السببية": "h3",
    "أولاً: الخسارة اللاحقة": "h3",
    "ثانياً: الكسب الفائت": "h3",
    "ما المقصود بالتعويض عن الإخلال بالعقد؟": "h2",
    "الأصل هو التنفيذ العيني": "h2",
    "متى يستحق الدائن التعويض؟": "h2",
    "ما أنواع الضرر القابل للتعويض؟": "h2",
    "الضرر المباشر والضرر غير المباشر": "h2",
    "الضرر المتوقع وقت التعاقد": "h2",
    "التعويض عن الضرر الأدبي": "h2",
    "هل يشترط إعذار المدين؟": "h2",
    "كيف يقدّر القاضي التعويض؟": "h2",
    "دور الخبرة في تقدير التعويض": "h2",
    "التعويض المتفق عليه مسبقاً": "h2",
    "التعويض عن التأخر في دفع المبالغ النقدية": "h2",
    "مساهمة الدائن في وقوع الضرر": "h2",
    "السبب الأجنبي والقوة القاهرة": "h2",
    "أمثلة عملية": "h2",
    "ما المستندات اللازمة لإثبات التعويض؟": "h2",
    "كيف تُصاغ المطالبة بالتعويض؟": "h2",
    "نصائح قانونية للأفراد والشركات": "h2",
    "الخاتمة": "h2",
    "المراجع القانونية": "h2"
  },
  "ar/altwsyat-alamlyh-lsyaghh-aqd-qwy": {
    "أولًا: تحديد هوية الأطراف بدقة.": "h2",
    "ثانيًا: تحديد نطاق العقد بوضوح.": "h2",
    "ثالثًا: تحديد المدة والجدول الزمني.": "h2",
    "رابعًا: تحديد المقابل المالي وآلية الدفع.": "h2",
    "خامسًا: تضمين الشرط الجزائي.": "h2",
    "سادسًا: آلية الفحص والقبول.": "h2",
    "سابعًا: القوة القاهرة والظروف الطارئة.": "h2",
    "ثامنًا: آلية إنهاء العقد وفسخه.": "h2",
    "تاسعًا: حل النزاعات.": "h2",
    "عاشرًا: التوقيع والكتابة.": "h2"
  },
  "ar/anha-aqd-alaml-bdwn-sbb-mshrwa": {
    "أولًا: مفهوم الفصل التعسفي.": "h2",
    "ثانيًا: الحالات الأكثر شيوعًا للفصل غير المشروع.": "h2",
    "ثالثًا: حقوق العامل عند الفصل التعسفي.": "h2",
    "رابعًا: إجراءات العامل عند التعرض للفصل التعسفي.": "h2",
    "خامسًا: مسؤوليات صاحب العمل عند إنهاء العقد.": "h2",
    "سادسًا: الأسئلة الشائعة حول الفصل التعسفي.": "h2"
  },
  "ar/aqwd-alamtyaz-altjary-alfrnshayz-fy-alnzam-alsawdy": {
    "أولًا: ماهية عقد الامتياز التجاري.": "h2",
    "ثانيًا: الإطار النظامي للامتياز التجاري في السعودية.": "h2",
    "ثالثًا: التزامات مانح الامتياز.": "h2",
    "رابعًا: التزامات صاحب الامتياز.": "h2",
    "خامسًا: وثيقة الإفصاح وأهميتها القانونية.": "h2",
    "سادسًا: أبرز المخاطر العملية في عقود الامتياز.": "h2",
    "سابعًا: النزاعات الشائعة في عقود الامتياز التجاري.": "h2",
    "ثامنًا: الاتجاه القضائي السعودي في نزاعات الامتياز.": "h2",
    "تاسعًا: توصيات عملية لصياغة عقد امتياز قوي.": "h2"
  },
  "ar/aqwd-almqawlat-fy-alnzam-alsawdy": {
    "أولًا: ماهية عقد المقاولة.": "h2",
    "ثانيًا: الالتزامات المتبادلة بين المقاول وصاحب العمل.": "h2",
    "ثالثًا: البنود الجوهرية في عقود المقاولات.": "h2",
    "رابعًا: المسؤولية في عقود المقاولات.": "h2",
    "خامسًا: أبرز النزاعات في عقود المقاولات.": "h2",
    "سادسًا: الاتجاه القضائي السعودي في نزاعات المقاولات.": "h2",
    "سابعًا: طرق إثبات النزاعات في عقود المقاولات.": "h2",
    "ثامنًا: توصيات عملية لصياغة عقد مقاولة قوي.": "h2"
  },
  "ar/aqwd-alwkalat-altjaryh-fy-alnzam-alsawd": {
    "أولًا: ماهية عقد الوكالة التجارية.": "h2",
    "ثانيًا: الإطار النظامي للوكالات التجارية في السعودية.": "h2",
    "ثالثًا: حقوق الموكل في عقد الوكالة التجارية.": "h2",
    "رابعًا: حقوق الوكيل التجاري.": "h2",
    "خامسًا: التزامات الموكل.": "h2",
    "سادسًا: التزامات الوكيل.": "h2",
    "سابعًا: أبرز النزاعات في عقود الوكالات التجارية.": "h2",
    "ثامنًا: الإنهاء والتعويض في عقود الوكالات التجارية.": "h2",
    "تاسعًا: الاتجاه القضائي السعودي في نزاعات الوكالات.": "h2",
    "عاشرًا: البنود الجوهرية في عقد الوكالة التجارية.": "h2"
  },
  "ar/commercial-supply-contracts-in-saudi": {
    "أولًا: ماهية عقد التوريد التجاري:": "h2",
    "ثانيًا: البنود الجوهرية في عقود التوريد:": "h2",
    "ثالثًا: أبرز صور الإخلال في عقود التوريد:": "h2",
    "رابعًا: الاتجاه القضائي السعودي في نزاعات التوريد:": "h2",
    "خامسًا: طرق إثبات الإخلال في عقود التوريد:": "h2",
    "سادسًا: مخاطر الإخلال في عقود التوريد:": "h2",
    "سابعًا: توصيات عملية لصياغة عقد توريد قوي:": "h2"
  },
  "ar/consensual-formal-real-contracts-syrian-law": {
    "أولاً: العقود الرضائية.": "h2",
    "ثانياً: العقود الشكلية:": "h2",
    "ثالثاً: العقود العينية:": "h2"
  },
  "ar/contract-interpretation-syrian-courts": {
    "أولاً: البحث عن الإرادة المشتركة للمتعاقدين:": "h3",
    "ثانياً: تفسير العقد كوحدة واحدة:": "h3",
    "ثالثاً: الأخذ بطبيعة التعامل:": "h3",
    "رابعاً: الاستعانة بالعرف:": "h3",
    "ما المقصود بتفسير العقد؟": "h2",
    "الأصل: العقد شريعة المتعاقدين.": "h2",
    "متى يتدخل القاضي لتفسير العقد؟": "h2",
    "كيف يفسر القاضي العقد؟": "h2",
    "تفسير الشك لمصلحة المدين.": "h2",
    "دور حسن النية في تفسير العقود.": "h2",
    "أمثلة عملية:": "h2",
    "أخطاء شائعة تؤدي إلى النزاعات:": "h2",
    "كيف تتجنب الخلاف حول تفسير العقد؟": "h2",
    "الخلاصة:": "h2",
    "المراجع": "h2"
  },
  "ar/defects-of-will-syrian-law": {
    "تمهيد: ماهية عيوب الإرادة وأثرها في صحة العقد": "h2",
    "المبحث الأول: عيوب الإرادة المؤثرة في الرضا": "h2",
    "المطلب الأول: الغلط": "h3",
    "المطلب الثاني: الإكراه": "h3",
    "المطلب الثالث: التدليس": "h3",
    "المطلب الرابع: الاستغلال": "h3",
    "المبحث الثاني: المقارنة بين عيوب الإرادة": "h2",
    "المبحث الثالث: الآثار القانونية المترتبة على عيوب الإرادة": "h2",
    "المبحث الرابع: إثبات عيوب الإرادة أمام القضاء": "h2",
    "المبحث الخامس: أهمية الفحص القانوني السابق للتعاقد": "h2",
    "الخاتمة": "h2",
    "قائمة المراجع": "h2"
  },
  "ar/e-contracts-legal-validity-saudi-arabia": {
    "أولًا: ماهية العقد الإلكتروني.": "h2",
    "ثانيًا: الأساس النظامي للعقود الإلكترونية في السعودية.": "h2",
    "ثالثًا: أركان العقد الإلكتروني.": "h2",
    "رابعًا: حجية التوقيع الإلكتروني.": "h2",
    "خامسًا: وسائل إثبات العقود الإلكترونية أمام القضاء.": "h2",
    "سادسًا: أبرز النزاعات المتعلقة بالعقود الإلكترونية.": "h2",
    "سابعًا: مسؤولية المنصات الإلكترونية.": "h2",
    "ثامنًا: توصيات عملية للتجار والمتعاملين إلكترونيًا.": "h2"
  },
  "ar/fskh-alaqd-altjary-fy-alnzam-alsawdy": {
    "أولًا: ماهية فسخ العقد التجاري": "h2",
    "ثانيًا: الأساس النظامي للفسخ في السعودية": "h2",
    "ثالثًا: أنواع فسخ العقد التجاري": "h2",
    "رابعًا: شروط فسخ العقد التجاري": "h2",
    "خامسًا: آثار فسخ العقد التجاري": "h2",
    "سادساً: مسائل تُفحص في طلب الفسخ": "h2",
    "سابعًا: طرق إثبات الفسخ أمام القضاء": "h2",
    "ثامنًا: توصيات عملية للتجار والمحامين": "h2"
  },
  "ar/performance-of-contracts-in-good-faith-under-syrian-law": {
    "أولاً: عقود المقاولات.": "h3",
    "ثانياً: عقود التوريد.": "h3",
    "ثالثاً: عقود الإيجار.": "h3",
    "رابعاً: عقود الشركات.": "h3",
    "ما المقصود بتنفيذ العقد بحسن النية؟": "h2",
    "الأساس القانوني:": "h2",
    "ماذا يفرض مبدأ حسن النية على المتعاقدين؟": "h2",
    "حسن النية لا يعني التنازل عن الحقوق:": "h2",
    "تطبيقات عملية لمبدأ حسن النية:": "h2",
    "متى يُعد أحد الأطراف سيئ النية؟": "h2",
    "أثر حسن النية في تفسير العقد:": "h2",
    "العلاقة بين حسن النية والتعسف في استعمال الحق:": "h2",
    "عبء الإثبات:": "h2",
    "كيف تتجنب النزاعات المتعلقة بتنفيذ العقد؟": "h2",
    "المراجع": "h2"
  },
  "en/Penalty-clause-in-saudi": {
    "First: The Nature and Importance of Penalty Clauses in Commercial Contracts.": "h2",
    "Second: The Legal Basis for Penalty Clauses in Saudi Arabia.": "h2",
    "Third: Conditions for the Validity of a Penalty Clause.": "h2",
    "Fourth: The Saudi Judicial Approach to Applying Penalty Clauses.": "h2",
    "Fifth: Applications of Penalty Clauses in Commercial Contracts.": "h2",
    "Sixth: How to Draft a Strong and Enforceable Penalty Clause.": "h2",
    "Seventh: Can the Court Modify a Penalty Clause?": "h2"
  },
  "en/adarh-almkhatr-fy-alaqwd-wfq-alnzam-alsawdy": {
    "First: The concept of risk management in contracts.": "h2",
    "Second: Types of risks in commercial contracts.": "h2",
    "Third: Risk management tools in commercial contracts.": "h2",
    "Fourth: A practical methodology for risk management before signing the contract.": "h2",
    "Fifth: Risk management during contract performance.": "h2",
    "Sixth: The Saudi judicial approach in risk cases.": "h2"
  },
  "en/alahlyh-fy-altaaqd-fy-alqanwn-alswry": {
    "First: What is meant by capacity?": "h2",
    "Second: Capacity for enjoyment.": "h2",
    "Third: Capacity to act.": "h2",
    "Fourth: When does a person have full capacity?": "h2",
    "Fifth: A person with limited capacity.": "h2",
    "Sixth: A person without capacity.": "h2",
    "Seventh: The effect of limited capacity on a contract.": "h2",
    "Eighth: Who may rely on lack of capacity?": "h2",
    "Ninth: Proving capacity.": "h2",
    "Tenth: Practical applications.": "h2"
  },
  "en/alaqd-fy-alqanwn-alswry": {
    "First: What Is a Contract?": "h2",
    "Second: Why Are Contracts the Foundation of Legal Life?": "h2",
    "Third: Characteristics of Contracts in Syrian Law.": "h2",
    "Fourth: The Elements of a Contract in General.": "h2",
    "Fifth: The Principle of Freedom of Contract.": "h2",
    "Sixth: The Difference Between a Contract and an Agreement.": "h2",
    "Seventh: When Does a Contract Become Binding?": "h2",
    "Eighth: Practical Examples.": "h2",
    "Ninth: Common Mistakes When Concluding Contracts.": "h2",
    "Tenth: Frequently Asked Questions.": "h2"
  },
  "en/almswwlyh-alaqdyh-fy-alqanwn-alswry": {
    "First: the existence of a valid contract.": "h3",
    "Second: breach of an obligation by one contracting party.": "h3",
    "Third: occurrence of damage.": "h3",
    "Fourth: a causal relationship.": "h3",
    "What is meant by contractual liability?": "h2",
    "When does contractual liability arise?": "h2",
    "Forms of breach of contract:": "h2",
    "Is breach alone sufficient to claim compensation?": "h2",
    "Formal notice and its effect on contractual liability:": "h2",
    "Means of protecting the creditor:": "h2",
    "Practical examples:": "h2",
    "When is contractual liability excluded?": "h2",
    "How can contractual liability be avoided?": "h2",
    "References:": "h2"
  },
  "en/almswwlyh-an-fal-alghyr": {
    "First: The Concept and Philosophical Basis": "h2",
    "Second: Forms of Liability for the Acts of Others": "h2",
    "Third: Conditions for Application (in Comparative Legislation)": "h2",
    "Fourth: The Importance of Understanding This Liability for Society": "h2"
  },
  "en/altakhr-fy-alrwatb-aw-alamtnaa-an-dfaha": {
    "First: The concept of delayed wage payment.": "h2",
    "Second: The worker's rights when wages are delayed.": "h2",
    "Third: Employer responsibilities.": "h2",
    "Fourth: Means of proof in wage cases.": "h2",
    "Fifth: Practical advice for workers.": "h2"
  },
  "en/altawyd-an-alakhlal-balaqd-fy-alqanwn-alswry": {
    "First: the existence of a valid contract": "h3",
    "Second: occurrence of a contractual breach": "h3",
    "Third: occurrence of harm": "h3",
    "Fourth: causation": "h3",
    "First: actual loss": "h3",
    "Second: loss of profit": "h3",
    "What is meant by compensation for breach of contract?": "h2",
    "Specific performance is the general rule": "h2",
    "When is the creditor entitled to compensation?": "h2",
    "What types of harm are compensable?": "h2",
    "Direct and indirect harm": "h2",
    "Foreseeable harm at the time of contracting": "h2",
    "Compensation for non-pecuniary harm": "h2",
    "Must the debtor be put in default?": "h2",
    "How does the judge assess compensation?": "h2",
    "The role of expert evidence in assessing compensation": "h2",
    "Pre-agreed compensation": "h2",
    "Compensation for delay in payment of monetary sums": "h2",
    "The creditor's contribution to the occurrence of harm": "h2",
    "External cause and force majeure": "h2",
    "Practical examples": "h2",
    "What documents are required to prove compensation?": "h2",
    "How should a compensation claim be drafted?": "h2",
    "Legal advice for individuals and companies": "h2",
    "Conclusion": "h2",
    "Legal references": "h2"
  },
  "en/altwsyat-alamlyh-lsyaghh-aqd-qwy": {
    "First: Precisely identify the parties.": "h2",
    "Second: Clearly define the scope of the contract.": "h2",
    "Third: Specify the term and timetable.": "h2",
    "Fourth: Specify the financial consideration and payment mechanism.": "h2",
    "Fifth: Include a liquidated damages clause.": "h2",
    "Sixth: Inspection and acceptance mechanism.": "h2",
    "Seventh: Force majeure and unforeseen circumstances.": "h2",
    "Eighth: Contract termination and rescission mechanism.": "h2",
    "Ninth: Dispute resolution.": "h2",
    "Tenth: Signature and writing.": "h2"
  },
  "en/anha-aqd-alaml-bdwn-sbb-mshrwa": {
    "First: The concept of unfair dismissal.": "h2",
    "Second: The most common cases of unlawful dismissal.": "h2",
    "Third: A worker’s rights following unfair dismissal.": "h2",
    "Fourth: Procedures for a worker facing unfair dismissal.": "h2",
    "Fifth: The employer’s responsibilities when terminating a contract.": "h2",
    "Sixth: Frequently asked questions about unfair dismissal.": "h2"
  },
  "en/aqwd-alamtyaz-altjary-alfrnshayz-fy-alnzam-alsawdy": {
    "First: The nature of a commercial franchise agreement.": "h2",
    "Second: The regulatory framework for commercial franchising in Saudi Arabia.": "h2",
    "Third: Obligations of the franchisor.": "h2",
    "Fourth: Obligations of the franchisee.": "h2",
    "Fifth: The disclosure document and its legal importance.": "h2",
    "Sixth: Key practical risks in franchise agreements.": "h2",
    "Seventh: Common disputes in commercial franchise agreements.": "h2",
    "Eighth: Saudi judicial approach to franchise disputes.": "h2",
    "Ninth: Practical recommendations for drafting a strong franchise agreement.": "h2"
  },
  "en/aqwd-almqawlat-fy-alnzam-alsawdy": {
    "First: Nature of the Construction Contract.": "h2",
    "Second: Mutual Obligations of Contractor and Employer.": "h2",
    "Third: Essential Terms of Construction Contracts.": "h2",
    "Fourth: Liability in Construction Contracts.": "h2",
    "Fifth: Key Construction Contract Disputes.": "h2",
    "Sixth: Saudi Judicial Approach to Construction Disputes.": "h2",
    "Seventh: Proving Construction Contract Disputes.": "h2",
    "Eighth: Practical Recommendations for a Strong Construction Contract.": "h2"
  },
  "en/aqwd-alwkalat-altjaryh-fy-alnzam-alsawd": {
    "First: The Nature of a Commercial Agency Contract.": "h2",
    "Second: The Legal Framework for Commercial Agencies in Saudi Arabia.": "h2",
    "Third: The Principal’s Rights under a Commercial Agency Contract.": "h2",
    "Fourth: The Commercial Agent’s Rights.": "h2",
    "Fifth: The Principal’s Obligations.": "h2",
    "Sixth: The Agent’s Obligations.": "h2",
    "Seventh: Principal Disputes in Commercial Agency Contracts.": "h2",
    "Eighth: Termination and Compensation in Commercial Agency Contracts.": "h2",
    "Ninth: Saudi Judicial Approach to Agency Disputes.": "h2",
    "Tenth: Essential Clauses in a Commercial Agency Contract.": "h2"
  },
  "en/commercial-supply-contracts-in-saudi": {
    "First: The Nature of a Commercial Supply Contract:": "h2",
    "Second: Essential Clauses in Supply Contracts:": "h2",
    "Third: Principal Forms of Breach in Supply Contracts:": "h2",
    "Fourth: Saudi Judicial Approach to Supply Disputes:": "h2",
    "Fifth: Methods of Proving Breach in Supply Contracts:": "h2",
    "Sixth: Risks of Breach in Supply Contracts:": "h2",
    "Seventh: Practical Recommendations for Drafting a Strong Supply Contract:": "h2"
  },
  "en/consensual-formal-real-contracts-syrian-law": {
    "First: Consensual Contracts.": "h2",
    "Second: Formal Contracts:": "h2",
    "Third: Real Contracts:": "h2"
  },
  "en/defects-of-will-syrian-law": {
    "Part One: Defects of Consent Affecting Consent": "h2",
    "Section One: Mistake": "h3",
    "Section Two: Duress": "h3",
    "Section Three: Fraud": "h3",
    "Section Four: Exploitation": "h3",
    "Part Two: Comparison of Defects of Consent": "h2",
    "Part Three: Legal Effects of Defects of Consent": "h2",
    "Part Four: Proving Defects of Consent Before the Courts": "h2",
    "Part Five: The Importance of Legal Review Before Contracting": "h2"
  },
  "en/e-contracts-legal-validity-saudi-arabia": {
    "First: The nature of the electronic contract.": "h2",
    "Second: The statutory basis for electronic contracts in Saudi Arabia.": "h2",
    "Third: The elements of the electronic contract.": "h2",
    "Fourth: The evidentiary value of the electronic signature.": "h2",
    "Fifth: Methods of proving electronic contracts before the courts.": "h2",
    "Sixth: The principal disputes relating to electronic contracts.": "h2",
    "Seventh: Liability of electronic platforms.": "h2",
    "Eighth: Practical recommendations for merchants and electronic transactors.": "h2"
  },
  "en/fskh-alaqd-altjary-fy-alnzam-alsawdy": {
    "First: Meaning of Commercial Contract Termination": "h2",
    "Second: Legal Basis for Termination in Saudi Arabia": "h2",
    "Third: Types of Commercial Contract Termination": "h2",
    "Fourth: Conditions for Terminating a Commercial Contract": "h2",
    "Fifth: Effects of Commercial Contract Termination": "h2",
    "Sixth: Issues to examine in a termination claim": "h2",
    "Seventh: Proving Termination Before the Courts": "h2",
    "Eighth: Practical Recommendations for Traders and Lawyers": "h2"
  },
  "en/performance-of-contracts-in-good-faith-under-syrian-law": {
    "First: construction contracts.": "h3",
    "Second: supply contracts.": "h3",
    "Third: lease contracts.": "h3",
    "Fourth: company contracts.": "h3",
    "What is meant by performing a contract in good faith?": "h2",
    "Legal basis:": "h2",
    "What does the principle of good faith require of contracting parties?": "h2",
    "Good faith does not mean relinquishing rights:": "h2",
    "Practical applications of the principle of good faith:": "h2",
    "When is a party deemed to be acting in bad faith?": "h2",
    "Effect of good faith on contract interpretation:": "h2",
    "The relationship between good faith and abuse of rights:": "h2",
    "Burden of proof:": "h2",
    "How can disputes relating to contract performance be avoided?": "h2",
    "References": "h2"
  }
};

function paragraphLabel(inner: string): string {
  return inner.replace(/<[^>]*>/g, "")
    .replace(/&#(?:x([0-9a-f]+)|(\d+));/gi, (entity, hex, decimal) => {
      const value = Number.parseInt(hex ?? decimal, hex ? 16 : 10);
      return value <= 0x10ffff ? String.fromCodePoint(value) : entity;
    })
    .replace(/&(nbsp|amp|quot|apos|lt|gt);/g, (_, name: string) => ({
      nbsp: " ", amp: "&", quot: '"', apos: "'", lt: "<", gt: ">",
    }[name] ?? _))
    .replace(/\s+/g, " ").trim();
}

/** Preserve inner markup, links and paragraph attributes; repeated reads are stable. */
export function correctArticleHeadings(
  slug: string, lang: "en" | "ar", html: string | null | undefined,
): string | null | undefined {
  if (!html) return html;
  const labels = ARTICLE_SECTION_LABELS[`${lang}/${slug}`];
  if (!labels) return html;
  return html.replace(/<p\b([^>]*)>([\s\S]*?)<\/p>/gi, (original, attrs, inner) => {
    const tag = labels[paragraphLabel(inner)];
    return tag ? `<${tag}${attrs}>${inner}</${tag}>` : original;
  });
}
