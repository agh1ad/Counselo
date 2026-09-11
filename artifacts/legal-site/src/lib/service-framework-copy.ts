import type { Region } from "@workspace/api-zod/browser";

// Framework scope, not a statement that every named regime applies to every matter.
const frameworks: Record<string, Record<string, { en: string; ar: string }>> = {
  "sa": {
    "family-law": {
      "en": "Personal Status Law; personal-status proceedings and enforcement of family orders. Separate a request to document an agreed arrangement from a disputed claim, and identify whether an existing judgment must be enforced or changed.",
      "ar": "نظام الأحوال الشخصية وإجراءات الدعاوى وتنفيذ الأحكام الأسرية. ميّز بين توثيق اتفاق قائم والمطالبة المتنازع عليها، وحدد هل المطلوب تنفيذ حكم سابق أم تعديله."
    },
    "business-law": {
      "en": "Civil Transactions Law, relevant commercial legislation and Commercial Courts procedure may intersect. Identify the contractual obligation and whether the request is payment, performance, termination or a company-rights remedy before choosing the claim.",
      "ar": "قد تتداخل أحكام نظام المعاملات المدنية والأنظمة التجارية وإجراءات المحاكم التجارية. حدد الالتزام العقدي وما إذا كان الطلب سداداً أو تنفيذاً أو فسخاً أو حقاً شركاتياً قبل اختيار المطالبة."
    },
    "real-estate": {
      "en": "Property registration, non-Saudi ownership and lease regulation address different questions. Check the property’s geographic zone and registration position before assessing ownership; for a rental dispute, review the lease, notices and the applicable local restrictions.",
      "ar": "تعالج قواعد التسجيل العقاري وتملك غير السعوديين وتنظيم الإيجار أسئلة مختلفة. تحقق من النطاق الجغرافي للعقار ووضع قيده قبل بحث التملك؛ وفي نزاع الإيجار راجع العقد والإشعارات والقيود المحلية المنطبقة."
    },
    "employment-law": {
      "en": "The Labor Law and its amendments must be distinguished from domestic-worker and public-employment rules. HRSD settlement procedures, executable-contract eligibility and labour-court proceedings are different routes; a wage claim is not automatically ready for direct execution.",
      "ar": "يجب تمييز نظام العمل وتعديلاته عن قواعد العمالة المنزلية والوظيفة العامة. وتختلف التسوية الودية لدى الوزارة وشروط العقد التنفيذي والدعوى العمالية كمسارات؛ فمطالبة الأجر ليست جاهزة تلقائياً للتنفيذ المباشر."
    },
    "foreign-investment": {
      "en": "The Investment Law sits alongside company, sector-licensing and ownership requirements. Check whether the activity is restricted, whether a registration or approval is needed, and whether the proposed change concerns the investor, activity or ownership.",
      "ar": "يراجع نظام الاستثمار إلى جانب متطلبات الشركات والترخيص القطاعي والملكية. تحقق من تقييد النشاط والحاجة إلى تسجيل أو موافقة، وما إذا كان التغيير المقترح يتعلق بالمستثمر أو النشاط أو الملكية."
    },
    "administrative-law": {
      "en": "The Board of Grievances framework and its procedural law distinguish jurisdiction from the merits of an objection. Review the decision’s competence, form, reasons and legal basis, then check grievance requirements and the notification date before a court challenge.",
      "ar": "يميز إطار ديوان المظالم ونظام المرافعات أمامه بين الاختصاص وأسباب الاعتراض الموضوعية. راجع الاختصاص والشكل والسبب والسند النظامي للقرار، ثم متطلبات التظلم وتاريخ التبليغ قبل الطعن القضائي."
    },
    "arbitration": {
      "en": "The Arbitration Law, the written arbitration agreement and any chosen institutional rules must be read together. Check the clause’s coverage and timing of a court defence before proceedings; after an award, separate annulment questions from recognition and execution.",
      "ar": "يراجع نظام التحكيم مع الاتفاق المكتوب والقواعد المؤسسية المختارة. تحقق من نطاق الشرط وتوقيت الدفع أمام المحكمة قبل السير في الخصومة؛ وبعد صدور الحكم ميّز بين البطلان والاعتراف والتنفيذ."
    },
    "enforcement": {
      "en": "Execution legislation and commencement or transitional provisions must be checked against the filing date. Identify an eligible instrument, the amount still owed and the debtor; distinguish an objection to an execution measure from reopening the underlying dispute.",
      "ar": "تراجع أنظمة التنفيذ وأحكام نفاذها وانتقالها بحسب تاريخ الطلب. حدد السند المؤهل والمبلغ المتبقي والمدين؛ وميّز الاعتراض على إجراء تنفيذي عن إعادة بحث أصل النزاع."
    },
    "companies-law": {
      "en": "The Companies Law governs questions of legal form and governance, while incorporation documents and registration evidence establish the entity’s actual position. Review approval requirements, pre-emption rights and record changes before treating a share transfer or manager decision as complete.",
      "ar": "يعالج نظام الشركات مسائل الشكل القانوني والحوكمة، بينما تحدد وثائق التأسيس والقيد الوضع الفعلي للكيان. راجع متطلبات الموافقة وحقوق الأولوية وتعديل السجلات قبل اعتبار نقل الحصص أو قرار المدير مكتمل الأثر."
    },
    "contracts": {
      "en": "Civil Transactions Law rules on obligations and remedies may interact with commercial-court procedure and special contract regimes. Review notice, performance, causation and the precise requested remedy; franchise and agency arrangements require their own classification checks.",
      "ar": "قد تتداخل أحكام الالتزامات والجزاءات في نظام المعاملات المدنية مع إجراءات المحاكم التجارية وأطر العقود الخاصة. راجع الإعذار والتنفيذ والسببية والطلب المحدد؛ وتحتاج اتفاقات الامتياز والوكالة إلى تكييف مستقل."
    },
    "criminal-law": {
      "en": "Criminal Procedure Law and its implementing regulations govern procedural safeguards; the alleged offence requires its own substantive legal basis. Identify the investigation stage, defence access and admissibility questions without assuming that a complaint proves guilt.",
      "ar": "يعالج نظام الإجراءات الجزائية ولائحته الضمانات الإجرائية، بينما يحتاج التجريم إلى سنده الموضوعي الخاص. حدد مرحلة التحقيق وتمكين الدفاع ومسائل قبول الأدلة من دون اعتبار الشكوى إثباتاً للإدانة."
    },
    "banking-finance": {
      "en": "SAMA rules, the financing agreement and the borrower’s circumstances inform repayment and collection review. A restructuring request is different from disputing an unauthorized debit or challenging a debt; identify the product and the bank’s written response first.",
      "ar": "تراجع قواعد البنك المركزي وعقد التمويل وظروف المقترض في مسائل السداد والتحصيل. ويختلف طلب إعادة الجدولة عن الاعتراض على خصم غير مصرح به أو منازعة الدين؛ فحدد المنتج ورد المصرف المكتوب أولاً."
    },
    "intellectual-property": {
      "en": "Trademark and copyright rules protect different subject matter and use different procedures. Check the registration, relevant goods or services and alleged use for a trademark; for copyright, identify the work, ownership and permission before selecting an SAIP complaint route.",
      "ar": "تحمي قواعد العلامات وحق المؤلف محال مختلفة وتستخدم إجراءات مختلفة. راجع التسجيل والسلع أو الخدمات والاستعمال للعلامة، وحدد المصنف والملكية والإذن في حق المؤلف قبل اختيار مسار الشكوى لدى الهيئة."
    },
    "tax-zakat": {
      "en": "ZATCA registration, assessment and objection requirements depend on the tax and taxpayer. VAT registration thresholds are not a complete tax analysis: taxable activity, periods, returns, notices and penalties must each be reviewed before calculating exposure or challenging an assessment.",
      "ar": "تتوقف متطلبات التسجيل والربط والاعتراض لدى الهيئة على الضريبة وصفة المكلف. ولا تكفي حدود التسجيل في القيمة المضافة لتحليل الملف؛ بل تراجع الأنشطة والفترات والإقرارات والإشعارات والجزاءات قبل الحساب أو الاعتراض."
    },
    "cyber-law": {
      "en": "Anti-Cyber Crime Law and criminal procedure address offences and investigation, while personal-data legislation addresses processing obligations. Identify whether the request is a criminal complaint, removal of content, compensation or regulatory compliance before selecting a route.",
      "ar": "يعالج نظام مكافحة جرائم المعلوماتية والإجراءات الجزائية التجريم والتحقيق، بينما تعالج تشريعات البيانات الشخصية التزامات المعالجة. حدد هل المطلوب شكوى جزائية أو إزالة محتوى أو تعويض أو امتثال تنظيمي قبل اختيار المسار."
    },
    "medical-malpractice": {
      "en": "Health-profession rules, evidence requirements and medical-claim jurisdiction work together. A regulatory complaint or expert opinion is different from a compensation judgment; assess the alleged breach, causal link and harm, including any objections to an expert report.",
      "ar": "تتكامل قواعد المهن الصحية ومتطلبات الإثبات والاختصاص بالمطالبات الطبية. وتختلف الشكوى التنظيمية أو الخبرة عن حكم التعويض؛ فيراجع الإخلال المدعى به والسببية والضرر وأوجه الاعتراض على تقرير الخبير."
    },
    "insurance-law": {
      "en": "Insurance Authority requirements and the actual policy govern different parts of a claim. Check the product before applying a motor-policy settlement rule; coverage, exclusions, completeness of the claim and any insurer refusal require separate review.",
      "ar": "تحكم متطلبات هيئة التأمين والوثيقة الفعلية جوانب مختلفة للمطالبة. تحقق من المنتج قبل تطبيق قاعدة لتسوية تأمين المركبات؛ وتراجع التغطية والاستثناءات واكتمال المطالبة وأي رفض بصورة مستقلة."
    }
  },
  "syr": {
    "family-law": {
      "en": "The applicable personal-status rules and civil-registration procedures need separate review. Religious personal-status jurisdiction, the actual court order and the civil record can each affect whether the next step is a family claim, record correction or enforcement.",
      "ar": "تراجع قواعد الأحوال الشخصية المنطبقة وإجراءات السجل المدني بصورة مستقلة. وقد يؤثر الاختصاص الديني للأحوال الشخصية والحكم الفعلي والقيد المدني في اختيار دعوى أسرية أو تصحيح قيد أو تنفيذ."
    },
    "business-law": {
      "en": "Trade Law 33/2007 is a starting point for commercial transactions, alongside the contract and applicable special rules. A claim for unpaid goods differs from a change to company registration: identify the transaction, responsible party and relief sought.",
      "ar": "يشكل قانون التجارة 33 لعام 2007 نقطة بدء للمعاملات التجارية مع العقد والقواعد الخاصة المنطبقة. وتختلف مطالبة ثمن البضاعة عن تعديل تسجيل الشركة؛ لذا تحدد المعاملة والطرف المسؤول والطلب المقصود."
    },
    "real-estate": {
      "en": "Land-registry records and the legal basis of possession are central to property review. Obtain the available cadastral entry and identify any sale, inheritance, seizure or competing claim; an electronic extract service does not itself decide ownership or remove an encumbrance.",
      "ar": "تعد قيود السجل العقاري والأساس القانوني للحيازة عناصر محورية. اجمع القيد المساحي المتاح وحدد البيع أو الإرث أو الحجز أو الادعاء المنافس؛ فخدمة استخراج بيان إلكتروني لا تفصل بذاتها في الملكية ولا تزيل الإشارة."
    },
    "employment-law": {
      "en": "Labor Law 17/2010, its applicable amendments and social-insurance rules must be matched to the employment relationship. Public appointments and special categories require a separate scope check; distinguish a wage claim, insurance issue and challenge to an employment decision.",
      "ar": "تطابق أحكام قانون العمل 17 لعام 2010 وتعديلاته المنطبقة وقواعد التأمينات مع علاقة العمل. ويتطلب التعيين العام والفئات الخاصة تحققاً مستقلاً من النطاق؛ مع تمييز مطالبة الأجر عن مسألة التأمينات والطعن بالقرار الوظيفي."
    },
    "foreign-investment": {
      "en": "The investment legislation and its implementing instructions govern different stages of the project review. Identify the application, licence conditions and any refusal before assessing the available review route; land, company and sector permissions remain separate questions.",
      "ar": "تراجع تشريعات الاستثمار وتعليماتها التنفيذية بحسب مرحلة المشروع. حدد الطلب وشروط الإجازة وأي رفض قبل تقييم مسار المراجعة المتاح؛ وتبقى أذونات العقار والشركة والقطاع مسائل مستقلة."
    },
    "administrative-law": {
      "en": "Administrative jurisdiction and filing requirements need to be checked against the decision and requested remedy. A Council of State claim requires attention to standing, documents, notification and any prior grievance; a complaint to the issuing body is not necessarily a filed court case.",
      "ar": "يراجع الاختصاص الإداري ومتطلبات القيد بحسب القرار والطلب. وتحتاج الدعوى أمام مجلس الدولة إلى فحص الصفة والمستندات والتبليغ وأي تظلم سابق؛ فالشكوى إلى الجهة المصدرة ليست بالضرورة دعوى قضائية مقيدة."
    },
    "arbitration": {
      "en": "Domestic arbitration, mediation and recognition of a foreign award have different legal bases. Check the agreement, seat and applicable arbitration rules; for a foreign award, the New York Convention documents and relevant domestic procedure need separate assessment.",
      "ar": "تختلف الأسس القانونية للتحكيم المحلي والوساطة والاعتراف بالحكم الأجنبي. راجع الاتفاق والمقر وقواعد التحكيم المنطبقة؛ وللحكم الأجنبي تراجع وثائق اتفاقية نيويورك والإجراءات المحلية ذات الصلة بصورة مستقلة."
    },
    "enforcement": {
      "en": "Execution procedure depends on the instrument, service and status of the file. Local Ministry of Justice measures may affect particular areas or cases; verify whether an existing suspension or special arrangement applies before relying on an ordinary timetable.",
      "ar": "تتوقف إجراءات التنفيذ على السند والتبليغ وحالة الملف. وقد تؤثر تدابير وزارة العدل المحلية في مناطق أو قضايا معينة؛ فتحقق من أي وقف أو ترتيب خاص قبل الاعتماد على سير إجرائي معتاد."
    },
    "companies-law": {
      "en": "Company legislation, constitutional documents and registration instructions must be considered together. Identify the legal form, signatory authority and approvals needed; an online incorporation application or signed agreement does not by itself establish that every registration step is complete.",
      "ar": "تراجع تشريعات الشركات ووثائق التأسيس وتعليمات التسجيل معاً. حدد الشكل القانوني وصلاحية التوقيع والموافقات المطلوبة؛ فطلب التأسيس الإلكتروني أو الاتفاق الموقع لا يثبت وحده اكتمال جميع خطوات التسجيل."
    },
    "contracts": {
      "en": "Civil obligations, trade or consumer rules and evidence of the actual agreement may overlap. Review whether terms are documented, whether the transaction is subject to special protection, and whether a missing notarised record needs reconstruction before a substantive claim.",
      "ar": "قد تتداخل الالتزامات المدنية والقواعد التجارية أو الاستهلاكية مع إثبات الاتفاق الفعلي. راجع توثيق الشروط وخضوع المعاملة لحماية خاصة والحاجة إلى إعادة تكوين مستند موثق مفقود قبل المطالبة الموضوعية."
    },
    "criminal-law": {
      "en": "Criminal legislation and procedure must be matched to the alleged act and case stage. For digital evidence, the origin, integrity and attribution of the material require examination; a screenshot, account name or accusation is not a substitute for establishing responsibility.",
      "ar": "تطابق التشريعات الجزائية والإجراءات مع الفعل المنسوب ومرحلة القضية. وفي الدليل الرقمي تراجع جهة المصدر والسلامة ونسبة المادة؛ فلا تغني الصورة أو اسم الحساب أو الاتهام عن إثبات المسؤولية."
    },
    "banking-finance": {
      "en": "Banking rules and Central Bank decisions must be matched to the transfer channel, currency and transaction date. Separate a service complaint from a contractual debt or remittance dispute; preserve the transfer instructions and the bank’s stated reason for withholding or conversion.",
      "ar": "تطابق القواعد المصرفية وقرارات المصرف المركزي مع قناة التحويل والعملة وتاريخ العملية. وميّز شكوى الخدمة عن الدين العقدي أو نزاع الحوالة، مع حفظ تعليمات التحويل وسبب الحجز أو التحويل النقدي الذي ذكره المصرف."
    },
    "intellectual-property": {
      "en": "Copyright legislation and industrial-property rules require separate analysis. Identify whether the claim concerns protected expression, a registered mark or another right; evidence of authorship, publication and licensing affects the choice of infringement or ownership claim.",
      "ar": "تحتاج تشريعات حق المؤلف وقواعد الملكية الصناعية إلى تحليل مستقل. حدد ما إذا كان الادعاء يتعلق بتعبير محمي أو علامة مسجلة أو حق آخر؛ ويؤثر إثبات التأليف والنشر والترخيص في اختيار مطالبة التعدي أو الملكية."
    },
    "tax-zakat": {
      "en": "Tax legislation, implementing instructions and the actual assessment determine the review. Distinguish an announced tax proposal from an operative obligation, and an exemption from a payment deferral; keep the notice and its service date to assess the objection route.",
      "ar": "تحدد التشريعات الضريبية والتعليمات التنفيذية والتكليف الفعلي نطاق المراجعة. ميّز بين المقترح المعلن والالتزام النافذ، وبين الإعفاء وتأجيل السداد؛ واحفظ الإشعار وتاريخ تبليغه لبحث مسار الاعتراض."
    },
    "cyber-law": {
      "en": "Cybercrime legislation and the Ministry’s investigation instructions must be distinguished. Identify the alleged conduct and technical-investigation status; procedural safeguards and attribution of electronic evidence are separate from deciding whether a statement or act is criminal.",
      "ar": "يجب التمييز بين تشريعات الجرائم المعلوماتية وتعليمات التحقيق الوزارية. حدد الفعل المدعى به وحالة التحقيق الفني؛ فالضمانات الإجرائية ونسبة الدليل الإلكتروني مسألتان مستقلتان عن تقرير تجريم القول أو الفعل."
    },
    "medical-malpractice": {
      "en": "Civil and criminal liability must be distinguished from a hospital-service complaint. Ministry reporting about proposed medical-liability reform does not itself enact a new law; verify the operative framework and medical evidence before assessing a compensation or criminal route.",
      "ar": "يجب تمييز المسؤولية المدنية والجزائية عن شكوى الخدمة بالمستشفى. ولا ينشئ الإعلان عن إصلاح مقترح للمسؤولية الطبية قانوناً جديداً بذاته؛ فتحقق من الإطار النافذ والدليل الطبي قبل بحث مسار التعويض أو المسار الجزائي."
    },
    "insurance-law": {
      "en": "Insurance regulation and the policy wording must be matched to the loss. Compulsory motor insurance concerns a different risk from own-vehicle damage; identify the injured party, insured event, exclusions and claim history before assessing the insurer’s obligation.",
      "ar": "تطابق أنظمة التأمين وشروط الوثيقة مع الضرر. ويختلف خطر التأمين الإلزامي للمركبات عن ضرر المركبة نفسها؛ فحدد المتضرر والحادث والاستثناءات وسجل المطالبة قبل تقييم التزام الشركة."
    },
    "civil-law": {
      "en": "Civil obligations and property rules interact with evidence and any special recovery procedure. Identify whether the requested relief is possession, ownership, restitution or compensation; a special court designation or recovery mechanism must be checked before using an ordinary civil route.",
      "ar": "تتداخل قواعد الالتزامات والملكية المدنية مع الإثبات وأي إجراء استرداد خاص. حدد ما إذا كان الطلب حيازة أو ملكية أو رداً أو تعويضاً، وتحقق من أي تخصيص قضائي أو آلية استرداد قبل استخدام المسار المدني المعتاد."
    },
    "civil-procedure": {
      "en": "Civil procedure determines how a claim is filed, notified and challenged, independently of whether the underlying right is proved. Check the court and case stage, especially where electronic notification, a local pilot or temporary procedural measures are involved.",
      "ar": "تحدد أصول المحاكمات المدنية كيفية قيد الدعوى وتبليغها والطعن فيها، بصورة مستقلة عن إثبات أصل الحق. تحقق من المحكمة ومرحلة الدعوى، خصوصاً عند وجود تبليغ إلكتروني أو تجربة محلية أو تدبير إجرائي مؤقت."
    },
    "criminal-procedure": {
      "en": "Criminal procedure governs investigation, detention and defence participation. Specific Ministry instructions for cybercrime cases should not be extended automatically to every allegation; identify the offence, responsible authority and order before assessing an application or challenge.",
      "ar": "تنظم أصول المحاكمات الجزائية التحقيق والتوقيف ومشاركة الدفاع. ولا تعمم تعليمات الوزارة الخاصة بالقضايا المعلوماتية تلقائياً على كل اتهام؛ فحدد الجرم والجهة المسؤولة والقرار قبل تقييم الطلب أو الطعن."
    }
  }
};

const uaeFrameworks: Record<string, { en: string; ar: string }> = {
  "corporate-commercial": {
    "en": "The federal Commercial Companies framework must be distinguished from the rules governing a particular free-zone entity. Review the legal form, licensing authority and constitutional documents; initial approval, incorporation and permission to carry on an activity are separate steps.",
    "ar": "يجب تمييز الإطار الاتحادي للشركات التجارية عن القواعد المنظمة لكيان منطقة حرة معين. راجع الشكل القانوني وسلطة الترخيص ووثائق التأسيس؛ فالموافقة الأولية والتأسيس والإذن بمزاولة النشاط خطوات مستقلة."
  },
  "foreign-investment-market-entry": {
    "en": "Foreign ownership, strategic-impact activities and sector approvals require separate checks. A treaty-protection question also depends on the investor, investment and relevant treaty; choosing a company location does not alone establish a right to bring an investment claim.",
    "ar": "تحتاج الملكية الأجنبية والأنشطة ذات الأثر الاستراتيجي والموافقات القطاعية إلى فحوص مستقلة. وتتوقف الحماية الاتفاقية على المستثمر والاستثمار والمعاهدة ذات الصلة؛ فلا ينشئ اختيار مقر الشركة وحده حق رفع مطالبة استثمارية."
  },
  "commercial-contracts": {
    "en": "The applicable civil or commercial framework depends on the governing law, transaction and relevant dates. Review electronic execution and evidence as well as notices and remedies; ADGM common-law questions require a separate assessment from federal civil-law questions.",
    "ar": "يتوقف الإطار المدني أو التجاري المنطبق على القانون المختار والمعاملة والتواريخ ذات الصلة. راجع التوقيع الإلكتروني والإثبات والإشعارات والجزاءات؛ وتحتاج مسائل القانون العام في سوق أبوظبي العالمي إلى تقييم مستقل عن القانون المدني الاتحادي."
  },
  "employment-labour": {
    "en": "Federal private-sector labour rules, government employment and financial free-zone employment must be distinguished. Identify the employer and permit authority before selecting MOHRE, a court or a free-zone route; wages, termination and a challenge to a ministry decision involve different requirements.",
    "ar": "يجب التمييز بين قواعد العمل الاتحادي للقطاع الخاص والوظيفة الحكومية والعمل في المناطق الحرة المالية. حدد صاحب العمل وجهة التصريح قبل اختيار مسار الوزارة أو المحكمة أو المنطقة الحرة؛ وتختلف متطلبات الأجور والإنهاء والطعن بقرار الوزارة."
  },
  "family-personal-status": {
    "en": "The applicable personal-status framework can depend on religion, nationality and the competent court. Federal civil personal-status rules and other family-law regimes should not be treated as interchangeable; identify the marriage documents, existing orders and requested relief first.",
    "ar": "قد يتوقف إطار الأحوال الشخصية المنطبق على الديانة والجنسية والمحكمة المختصة. ولا تعامل قواعد الأحوال الشخصية المدنية الاتحادية وغيرها من الأنظمة الأسرية باعتبارها واحدة؛ فحدد وثائق الزواج والأحكام السابقة والطلب أولاً."
  },
  "real-estate-construction": {
    "en": "Property and rental rules depend on the emirate, property and dispute type. A Dubai tenancy notice is different from a construction-defect or ownership claim; review the land record, lease or project contract, notices and requested remedy before selecting the forum.",
    "ar": "تتوقف قواعد العقارات والإيجار على الإمارة والعقار ونوع النزاع. ويختلف إخطار إيجاري في دبي عن مطالبة عيوب بناء أو ملكية؛ فتراجع القيود وعقد الإيجار أو المشروع والإشعارات والطلب قبل اختيار المرجع."
  },
  "arbitration-mediation": {
    "en": "The federal Arbitration Law, seat and chosen institutional rules must be distinguished. DIAC emergency relief and a court application have separate requirements; for a foreign award, review recognition documents and the New York Convention before assuming execution is available.",
    "ar": "يجب تمييز قانون التحكيم الاتحادي والمقر والقواعد المؤسسية المختارة. وتختلف متطلبات تدابير الطوارئ لدى مركز دبي للتحكيم الدولي عن الطلب القضائي؛ وللحكم الأجنبي تراجع وثائق الاعتراف واتفاقية نيويورك قبل افتراض إتاحة التنفيذ."
  },
  "banking-finance": {
    "en": "CBUAE consumer-protection requirements and the product contract inform bank complaints. Review whether the matter concerns an unauthorized transaction, arrears or another facility; the bank’s complaint response and Sanadak eligibility are separate from a court’s determination of liability.",
    "ar": "تراجع متطلبات حماية المستهلك لدى المصرف المركزي وعقد المنتج في الشكوى المصرفية. حدد ما إذا كانت المسألة عملية غير مصرح بها أو متأخرات أو تسهيلاً آخر؛ ويختلف رد المصرف وشروط قبول سندك عن الفصل القضائي في المسؤولية."
  },
  "insurance": {
    "en": "Policy cover and Sanadak complaint eligibility address different issues. Establish the insured event, exclusions, evidence and insurer’s final position; satisfying the complaint requirements does not itself establish that the policy covers the loss.",
    "ar": "تعالج تغطية الوثيقة وشروط قبول الشكوى لدى سندك مسألتين مختلفتين. حدد الحادث والاستثناءات والأدلة وموقف الشركة النهائي؛ فاستيفاء شروط الشكوى لا يثبت بذاته شمول الضرر بالتغطية."
  },
  "tax-vat": {
    "en": "Federal corporate-tax and VAT rules have separate scope, registration and filing requirements. Identify the taxpayer, tax period and relevant FTA notice; registration is not a substitute for a return, and a reminder for one reporting period should not be applied to every business.",
    "ar": "تختلف قواعد ضريبة الشركات الاتحادية والقيمة المضافة من حيث النطاق والتسجيل والإقرار. حدد المكلف والفترة الضريبية وإشعار الهيئة ذي الصلة؛ فالتسجيل لا يغني عن الإقرار، ولا يعمم تذكير فترة معينة على كل منشأة."
  },
  "enforcement-debt-recovery": {
    "en": "Commercial Transactions and execution rules distinguish a claim requiring judgment from an instrument capable of direct execution. A dishonoured cheque may raise specific execution questions; check the instrument, bank endorsement, payments and debtor before selecting the route.",
    "ar": "تميز قواعد المعاملات التجارية والتنفيذ بين مطالبة تحتاج إلى حكم وسند يقبل التنفيذ المباشر. وقد يثير الشيك المرتجع مسائل تنفيذ خاصة؛ فتراجع الورقة وتأشير المصرف والمدفوعات والمدين قبل اختيار المسار."
  },
  "healthcare-medical-liability": {
    "en": "Medical-liability law and the competent health authority’s process must be assessed together. Identify whether MOHAP, DHA or DOH handles the relevant complaint and whether a committee report is required; records access, professional discipline and compensation are distinct requests.",
    "ar": "يراجع قانون المسؤولية الطبية وإجراء الجهة الصحية المختصة معاً. حدد دور وزارة الصحة أو هيئة صحة دبي أو دائرة صحة أبوظبي والحاجة إلى تقرير لجنة؛ فطلب السجلات والتأديب المهني والتعويض طلبات مختلفة."
  },
  "immigration-residency": {
    "en": "Entry and residence rules, the permit category and the issuing authority determine the immigration review. ICP and GDRFA Dubai channels differ, and residence cancellation should be distinguished from employment-permit cancellation and settlement of employment entitlements.",
    "ar": "تحدد قواعد الدخول والإقامة وفئة الإذن والجهة المصدرة نطاق المراجعة. وتختلف قنوات الهيئة الاتحادية للهوية والجنسية وإقامة دبي؛ كما يميز إلغاء الإقامة عن إلغاء تصريح العمل وتسوية المستحقات العمالية."
  },
  "wills-estates": {
    "en": "The will, personal-status framework and location of assets affect estate administration. A DIFC will, Dubai inheritance application and Abu Dhabi civil-family procedure have different scope; registration of a will does not automatically transfer foreign assets.",
    "ar": "تؤثر الوصية وإطار الأحوال الشخصية وموقع الأموال في إدارة التركة. وتختلف نطاقات وصية مركز دبي المالي وطلب الإرث في دبي والإجراء المدني الأسري بأبوظبي؛ فتسجيل الوصية لا ينقل الأموال الأجنبية تلقائياً."
  },
  "criminal-investigations": {
    "en": "Criminal Procedure Law safeguards depend on the investigation stage and the actual order or summons. Establish whether the person is a complainant, witness or accused and which authority holds the file before assessing attendance, defence participation or a challenge to detention.",
    "ar": "تتوقف ضمانات قانون الإجراءات الجزائية على مرحلة التحقيق والقرار أو الاستدعاء الفعلي. حدد صفة الشخص كشاكٍ أو شاهد أو متهم والجهة التي تحتفظ بالملف قبل بحث الحضور أو مشاركة الدفاع أو الطعن بالتوقيف."
  },
  "technology-data-protection": {
    "en": "Federal data-protection rules, DIFC and ADGM regimes are distinct frameworks. Identify the controller, establishment and affected processing before choosing breach-reporting obligations; cybercrime reporting and contractual technology disputes require separate analysis.",
    "ar": "تختلف قواعد حماية البيانات الاتحادية وأنظمة مركز دبي المالي وسوق أبوظبي العالمي. حدد المتحكم والمنشأة والمعالجة المتأثرة قبل اختيار التزامات الإبلاغ بالخرق؛ وتحتاج الشكوى المعلوماتية والنزاع التقني العقدي إلى تحليل مستقل."
  },
  "intellectual-property": {
    "en": "Federal trademark and copyright rules protect different rights. A trademark-publication opposition, infringement complaint and ownership dispute require different evidence and procedures; identify the right, registration or publication status and alleged act before calculating a deadline.",
    "ar": "تحمي قواعد العلامات وحق المؤلف الاتحادية حقوقاً مختلفة. وتختلف أدلة وإجراءات الاعتراض على نشر علامة وشكوى التعدي ونزاع الملكية؛ فحدد الحق وحالة التسجيل أو النشر والفعل المدعى به قبل حساب الميعاد."
  },
  "administrative-regulatory": {
    "en": "The issuing authority and subject matter determine the relevant federal, emirate or sector procedure. A federal-procurement grievance is only one route; review the decision, tender conditions, service date and any internal review requirements before choosing an objection or court claim.",
    "ar": "تحدد الجهة المصدرة والموضوع الإجراء الاتحادي أو المحلي أو القطاعي المنطبق. والتظلم من المشتريات الاتحادية مسار واحد؛ فتراجع القرارات وشروط المناقصة وتاريخ التبليغ ومتطلبات المراجعة الداخلية قبل اختيار التظلم أو الدعوى."
  },
  "consumer-ecommerce": {
    "en": "Consumer Protection and technology-based trade rules need to be matched to the transaction. Defective goods, misdescription and a change-of-mind return are different questions; preserve the product listing, order, delivery evidence and trader’s response.",
    "ar": "تطابق قواعد حماية المستهلك والتجارة بوسائل التقنية مع المعاملة. ويختلف عيب السلعة والوصف المضلل عن الإرجاع لتغير الرغبة؛ فاحفظ عرض المنتج والطلب وإثبات التسليم ورد التاجر."
  },
  "insolvency-restructuring": {
    "en": "Financial reorganisation and bankruptcy rules must be distinguished from natural-person insolvency and excluded or special regimes. Identify the debtor and procedural stage; proposing a restructuring is different from a court order that affects creditor enforcement.",
    "ar": "يجب تمييز قواعد إعادة التنظيم المالي والإفلاس عن إعسار الشخص الطبيعي والأنظمة الخاصة أو المستثناة. حدد المدين والمرحلة الإجرائية؛ فاقتراح إعادة الهيكلة يختلف عن أمر المحكمة المؤثر في تنفيذ الدائنين."
  },
  "litigation-court-disputes": {
    "en": "Civil Procedure and Evidence rules operate alongside the chosen court’s jurisdiction. Identify the judgment type, service date and procedural stage before selecting an appeal; comments on an expert’s preliminary report are different from a challenge to the final judgment.",
    "ar": "تعمل قواعد الإجراءات المدنية والإثبات إلى جانب اختصاص المحكمة المختارة. حدد نوع الحكم وتاريخ التبليغ والمرحلة قبل اختيار الطعن؛ وتختلف الملاحظات على تقرير الخبير الأولي عن الطعن بالحكم النهائي."
  },
  "maritime-aviation-transport": {
    "en": "Maritime legislation and applicable air-carriage treaties address different modes of transport. Identify the carrier, route, transport document and type of loss before selecting notice or claim requirements; a sea-cargo delay rule should not be applied to an air-baggage claim.",
    "ar": "تعالج التشريعات البحرية واتفاقيات النقل الجوي المنطبقة وسائل نقل مختلفة. حدد الناقل والمسار ووثيقة النقل ونوع الضرر قبل اختيار متطلبات الإخطار أو المطالبة؛ ولا تطبق قاعدة تأخر شحنة بحرية على مطالبة أمتعة جوية."
  }
};

export function serviceFrameworkCopy(region: Region, service: string, lang: "en" | "ar") {
 if (region === "uae") return uaeFrameworks[service]?.[lang];
 return frameworks[region]?.[service]?.[lang];
}
