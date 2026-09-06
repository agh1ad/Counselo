import { createHash } from "node:crypto";

/** Reviewed legacy text only: later CMS edits remain authoritative, field by field. */
const CORRECTIONS: Record<string, Record<string, { sourceHash: string; value: string }>> = {
  "kyf-sahmt-kawnslw-fy-tkhfyd-mtalbh-mn-500-alf-ryal-ila-227": {
    "titleAr": {
      "sourceHash": "ecdf587b60edec0f565caca5df32bd7bd8418e02a64534b8e217c65367b307d8",
      "value": "تخفيض مطالبة تجارية من 500 ألف ريال إلى 227 ألف ريال"
    },
    "seoTitleAr": {
      "sourceHash": "b42ddca49f7edc1240704546cad87d7f5ae56327bbe505aceab9b3fcc4c53fae",
      "value": "تخفيض مطالبة تجارية من 500 ألف ريال إلى 227 ألف ريال | CounselO"
    }
  },
  "ray-fy-mshrwa-qanwn-alwsath-alswry-maaljh-10-thghrat": {
    "workTypeEn": {
      "sourceHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "value": "Legislative review of a Syrian mediation bill"
    },
    "jurisdictionEn": {
      "sourceHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "value": "Syria"
    },
    "clientTypeEn": {
      "sourceHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "value": "Baghdadi Lawyers"
    },
    "challengeEn": {
      "sourceHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "value": "The review concerned whether the mediation bill’s safeguards matched the enforceable effect of a court-ratified settlement. The challenge was to preserve consensual, flexible dispute resolution while addressing the governing legal rules, mediator qualifications and role, informed consent, access to justice, and judicial scrutiny before enforcement."
    },
    "approachEn": {
      "sourceHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "value": "The opinion supported mediation in principle and examined gaps in the bill, including private mediators, training and accreditation, language and translation, international and electronic mediation, and mediation with criminal-law effects. It proposed legislative changes concerning mediator qualifications, legal advice before signature, judicial review of capacity, consent and representation, and licensing and supervision of mediation centres."
    },
    "outcomeEn": {
      "sourceHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "value": "The deliverable was a critical legislative opinion with proposals for strengthening the bill before adoption. It connected the enforceable effect of settlement with safeguards for reaching it, offering material for legislative and professional discussion. This describes the bill reviewed in the attached study; it is not confirmation of the text or commencement of an enacted law."
    },
    "outcomeAr": {
      "sourceHash": "ecf8d5f850285c3ecf449ca5e0ee1782af9e85a86caaac4886e3000d0a9de4b6",
      "value": "القيمة الأساسية التي قدّمناها هي أننا لم نكتفِ بعرض مشروع قانون الوساطة السوري أو تلخيص مواده، بل قدّمنا قراءة قانونية نقدية تضيف تصورًا عمليًا وتشريعيًا لتحسينه قبل إقراره.\nوبشكل محدد، تتمثل القيمة المقدمة في الآتي:\nتحويل النقاش من تأييد الفكرة إلى تقييم المنظومة\nأوضحنا أن الوساطة فكرة إيجابية، لكن نجاحها لا يتحقق بمجرد النص عليها، بل بوجود ضمانات قانونية تحكمها.\nكشف الثغرات غير الظاهرة في المشروع\nأبرزنا نقاطًا قد لا تبدو خطيرة عند القراءة الأولى، مثل غياب المرجعية القانونية، وضعف تنظيم الوسيط الخاص، وعدم تحديد اللغة، وحدود دور الوسيط.\nربط الأثر التنفيذي للتسوية بضرورة الضمانات\nبيّنا أن اتفاق التسوية قد يتحول إلى سند تنفيذي، ولذلك يجب ألا تكون إجراءات الوصول إليه أقل انضباطًا من الآثار التي يرتبها.\nتقديم حلول تشريعية قابلة للاستخدام\nلم يقتصر العمل على النقد، بل تضمن مقترحات وصياغات يمكن الاستفادة منها عند تعديل المشروع.\nحماية التوازن بين المرونة والعدالة\nحافظنا على جوهر الوساطة كطريق سريع ورضائي، مع التأكيد على ضرورة حماية الإرادة، والحقوق، وحق التقاضي، وسلامة الاتفاق.\nرفع قيمة النقاش القانوني حول المشروع\nجعلنا الدراسة تصلح كوثيقة مهنية يمكن عرضها على مشرّع، أو نقابة، أو مركز وساطة، أو جهة قانونية مختصة.\nللاطلاع على كامل الدراسة حمّل الملف المرفق. يتعلق الرأي بمشروع القانون محل الدراسة، ولا يؤكد صدور قانون نافذ أو يحدد نصه وتاريخ نفاذه."
    },
    "summaryEn": {
      "sourceHash": "687d06739360aea59448561b2db186fa4ff9a4613cbdfe3503063b944ca9f23a",
      "value": "Baghdadi Lawyers reviewed a Syrian mediation bill and proposed stronger safeguards for enforceable settlements. The opinion addresses mediator qualifications, informed consent, governing rules, access to legal advice and judicial scrutiny. It concerns the bill examined in the attached study, rather than confirmation of an enacted law."
    },
    "summaryAr": {
      "sourceHash": "5cdaa5ebee822a3231f7f23e9cf2763e5ca7e98f58169b0ec9446d661995b479",
      "value": "راجع البغدادي للمحاماة مشروع قانون الوساطة السوري واقترح تعزيز ضمانات التسويات القابلة للتنفيذ. تناول الرأي تأهيل الوسطاء والإرادة المستنيرة والقواعد واجبة المراعاة والاستشارة القانونية والرقابة القضائية. يتعلق العمل بالمشروع محل الدراسة المرفقة، ولا يؤكد صدور قانون نافذ."
    },
    "seoDescriptionEn": {
      "sourceHash": "b31eb1d5a1373c24f9b607621e1fca6cdd2f88aaa5239bee092f4724d8ff57c5",
      "value": "Baghdadi Lawyers’ review of a Syrian mediation bill: mediator qualifications, informed consent, judicial scrutiny and proposed safeguards."
    },
    "seoDescriptionAr": {
      "sourceHash": "d581f8419a769c19d68f624e5dfdb06226386b4540e3d0396583e26074a3fb17",
      "value": "رأي البغدادي للمحاماة في مشروع قانون الوساطة السوري: تأهيل الوسطاء والإرادة المستنيرة والرقابة القضائية والضمانات المقترحة."
    }
  },
  "kawnslw-wtswyh-alarsdh-almalyh-qanwna": {
    "workTypeAr": {
      "sourceHash": "dafc962796df7061c30e68efac2632ce52e3bf559e12cf8b593da0ac2e3af60b",
      "value": "عقود - تسوية مالية- مقاصه"
    },
    "jurisdictionEn": {
      "sourceHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "value": "Saudi Arabia"
    },
    "clientTypeEn": {
      "sourceHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "value": "Large group of companies"
    },
    "challengeEn": {
      "sourceHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "value": "Related companies needed to reconcile balances arising from current accounts, transactions, payments, financing and services before year end. Each company had a separate legal personality and assets. The review therefore needed to distinguish an accounting entry from an authorised legal act affecting a debt, including set-off, payment or release."
    },
    "approachEn": {
      "sourceHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "value": "CounselO reviewed the companies’ separate legal positions and proposed independent corporate decisions followed by a joint settlement agreement. The work distinguished set-off, payment, release and reclassification; identified the final reconciliation schedule, set-off records and implementation documents; and addressed the auditor’s role alongside the required legal approvals."
    },
    "outcomeEn": {
      "sourceHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "value": "The work produced a proposed legal process for intercompany settlement, supported by separate approvals, a joint agreement and reconciliation records. Its purpose was to protect each company’s rights and creditor interests and give management and auditors a traceable legal basis for accounting entries. The published account describes this advisory framework rather than a court judgment."
    }
  },
  "kyf-adart-kawnslw-mrajah-mhasbyh-hsash": {
    "approachEn": {
      "sourceHash": "697300f4c504509ec5bb8b92b8ad3d9c15f7d4ee215977c81486d36ed59ec2c4",
      "value": "We managed a sensitive accounting review from a legal perspective to protect the client’s legal position.\nIn brief, we:\n\nDefined the scope of the review before addressing the details.\nDemonstrated the client’s cooperation without allowing it to be understood as an admission.\nClarified what the client acknowledged and what remained disputed in each response and signature reservation.\nShifted the evidentiary reference point from the client’s personal memory to official records and documents.\nReviewed the wording of responses to avoid absolute or open-to-interpretation statements.\nProtected the client from assuming responsibility for documents or figures not in the client’s possession.\nPrevented speculation or accusations concerning matters involving other individuals.\nAdded clear reservations to the final minutes preserving the client’s right to provide clarification or correction later.\n\nConclusion:\nWe converted a situation that could have exposed the client to scrutiny into a legally controlled process that demonstrated cooperation while protecting the client from an unintended admission."
    },
    "approachAr": {
      "sourceHash": "f5bf63bc32117b62476a559463a1d500e4819da0738dc910a10cae1c46566b55",
      "value": "العمل الذي قمنا به هو إدارة مراجعة محاسبية حساسة من منظور قانوني لحماية المركز القانوني للعميل.\nباختصار، قمنا بـ:\n\nضبط نطاق المراجعة قبل الدخول في التفاصيل.\nإثبات تعاون العميل دون أن يُفهم ذلك كإقرار.\nتوضيح ما يقر به العميل وما يبقى محل نزاع في الإجابات والتحفظات المصاحبة للتوقيع.\nنقل مرجع الإثبات من ذاكرة العميل إلى السجلات والمستندات الرسمية.\nمراجعة صياغات الإجابات لتجنب العبارات المطلقة أو القابلة للتأويل.\nحماية العميل من تحمل مسؤولية مستندات أو أرقام ليست في حيازته.\nمنع التخمين أو الاتهام في مسائل تتعلق بأشخاص آخرين.\nإضافة تحفظات واضحة في المحضر النهائي تحفظ حق العميل في التوضيح أو التصحيح لاحقًا.\n\nالخلاصة:\nقمنا بتحويل المراجعة من موقف قد يعرّض العميل للمساءلة إلى إجراء مضبوط قانونيًا، يثبت التعاون ويحميه من الإقرار غير المقصود."
    },
    "outcomeEn": {
      "sourceHash": "50a1fe161209c2680bb43fff7831306ce576432d5362bfbd9c96a29bc6ba9f73",
      "value": "The value delivered was that CounselO did not merely assist the client in attending the review or answering questions; it transformed the review from a high-risk situation into a legally controlled process.\nMore specifically, the value lay in:\n\nProtecting the client from an unintended admission of liability or of the amounts.\nDocumenting the client’s cooperation without allowing it to be understood as an admission.\nShifting the evidence from the client’s memory to official records and documents.\nReducing the risk that attendance or a qualified signature would be misread as acceptance of disputed figures; the minutes and underlying statements could still be assessed as evidence.\nDrafting reservations preserving the client’s right to provide clarification or correction.\nReducing the legal risks arising from a sensitive accounting review.\nConclusion:\nThe value delivered was the protection of the client’s legal position before the accounting review could become evidence used against the client."
    },
    "outcomeAr": {
      "sourceHash": "2c575005e0bb38a7e2a3499d3791d008edeb47752a538879da221b315b24cda8",
      "value": "القيمة المقدمة هي أن كاونسلو لم تكتفِ بمساعدة العميل على حضور المراجعة أو الإجابة على الأسئلة، بل حوّلت المراجعة من موقف عالي المخاطر إلى إجراء مضبوط قانونيًا.\nبمعنى أوضح، القيمة كانت في:\n\nحماية العميل من الإقرار غير المقصود بالمسؤولية أو بالمبالغ.\nتثبيت تعاونه كتابةً دون أن يُفهم ذلك كاعتراف.\nنقل الإثبات من ذاكرة العميل إلى السجلات والمستندات الرسمية.\nتقليل خطر تفسير الحضور أو التوقيع المتحفظ على أنه قبول بالأرقام المتنازع عليها؛ ولا تمنع التحفظات تقييم المحضر والأقوال الواردة فيه كأدلة.\nصياغة تحفظات تحفظ حقه في التوضيح أو التصحيح.\nتقليل المخاطر القانونية الناتجة عن مراجعة محاسبية حساسة.\nالخلاصة:\nالقيمة المقدمة هي حماية المركز القانوني للعميل قبل أن تتحول المراجعة المحاسبية إلى دليل يمكن استخدامه ضده."
    }
  },
  "rfd-dawa-fskh-aqd-amtyaz-tjary-wtawyd": {
    "challengeAr": {
      "sourceHash": "107683badc62575e8e1ff294bdff76e5d904faf0a544281b93715a9672877efb",
      "value": "المسألة:\nهل يحق للمدعي فسخ عقد الامتياز التجاري والمطالبة بتعويض قدره 500,000 ريال، أم أن ما استند إليه لا يتجاوز خلافات تنفيذية لا ترقى إلى إخلال جوهري يبرر إنهاء العقد؟\nالتحدي:\nكان التحدي في تفكيك ادعاءات المدعي وتحويل النزاع من مطالبة عامة بالفسخ والتعويض إلى اختبار قانوني دقيق: هل ثبت وجود إخلال جوهري؟ وهل توافرت عناصر التعويض من خطأ وضرر وعلاقة سببية؟ مع إبراز أن العقد صحيح وملزم، وأن الخلافات التشغيلية أو الفنية لا تكفي وحدها لإسقاط عقد امتياز تجاري كامل."
    }
  },
  "mn-alkhta-ala-altawyd-kyf-hddt-kawnslw-almswwl-almbashran-hadth": {
    "summaryEn": {
      "sourceHash": "df362783a9e0b1e6d200507cedcfa385e15eccedfb4992ffc446b5d3d2a4d6c1",
      "value": "**CounselO successfully transformed a complex traffic accident case into a clear and substantiated compensation claim by analyzing liability, identifying the directly responsible party, and linking the traffic report with the assessment reports. The case concluded with a judgment ordering the responsible vehicle driver to pay 120,172.50 riyals to the client, with the judgment remaining in force after the objection was rejected for failing to meet its statutory requirements.**"
    }
  },
  "thwyl-qdyh-mn-rfd-ala-qbwl-wtayyd": {
    "titleEn": {
      "sourceHash": "72d34f84ee740fa255824733d85e90bfc184a7b7643e138958f28e7d5af7bd48",
      "value": "Equipment Non-Delivery: SAR 248,600 Award After Appeal"
    },
    "titleAr": {
      "sourceHash": "3cfe949a036c2c853b906b945500272c0e4e450e92065f441a3a7b5483c3fac1",
      "value": "عدم تسليم معدات: حكم بـ248,600 ريال بعد الاستئناف"
    },
    "seoTitleEn": {
      "sourceHash": "2ee0f2254052e677ad649b2e767a9dab0a12d27c07d742e35183a59e71e592fa",
      "value": "Equipment Non-Delivery: SAR 248,600 Award After Appeal | CounselO"
    },
    "seoTitleAr": {
      "sourceHash": "81aee65ba7d75d8fde189babd4c728decc0c22bfc1ef2a19ad9bb62b872e32a3",
      "value": "عدم تسليم معدات: حكم بـ248,600 ريال بعد الاستئناف | CounselO"
    }
  },
  "tfkyk-mstndat-altmas-aaadh-alnzr-bnjah": {
    "approachEn": {
      "sourceHash": "1c3248663d26b45152c823e90d7d026d32eae6ae6990c4c7e339d3a99a483ff6",
      "value": "CounselO conducted a comprehensive review of the reconsideration petition file, reconstructed the facts and documents from the outset of the dispute, and analyzed the final judgment, the grounds for reconsideration, and the documents submitted by the opposing party. CounselO developed a defense strategy focused on protecting the res judicata effect of the prior judgment, dismantling the new documents, and demonstrating that they did not affect the outcome. The strategy also distinguished between liability for defective performance and supervisory liability and addressed the expert report in coordination with the legal representative, ultimately resulting in the petition being rejected on the merits."
    },
    "outcomeEn": {
      "sourceHash": "7a938d54e9ab8f84aade557afa1e5de9e8df0aea0351a043cac874b0ddc0dc7a",
      "value": "**Outcome:**  \nThe court accepted the petition for reconsideration in form but rejected it on the merits, lifted the stay of enforcement of the prior judgment, and thereby restored the original judgment’s enforceable effect in favor of the client. The court also ordered the petitioner to pay **SAR 23,000** in expert fees incurred by the claimant.\n\n**Value:**  \nCounselO provided practical value by protecting the final judgment from being reopened without a material legal basis, dismantling the documents relied upon by the petitioner, and connecting the legal issues with the technical expertise while highlighting the distinction between liability for defective performance and supervisory liability. This helped uphold the judicial outcome and preserve the client’s rights under the judgment issued in its favor."
    }
  },
  "kyf-sahmt-kawnslw-fy-anjah-mlf-thkymy-kaml": {
    "titleEn": {
      "sourceHash": "60252ba8da31d2c9dc3d4c1411df5ec8fa663ed777f3216626e4217fa1a6bd35",
      "value": "Construction Arbitration: Organising Claims and Expert Evidence"
    },
    "titleAr": {
      "sourceHash": "c50881a200c49982bfb79291e8fd16526815d91381b01c736dab5665bdc5489f",
      "value": "تحكيم مقاولات: تنظيم المطالبات وأدلة الخبرة"
    },
    "summaryEn": {
      "sourceHash": "7a6c8032261f376449631f8f3a1c68357fcdcc31cf4f28b7e52da3d6f212464c",
      "value": "This file demonstrates CounselO’s role in managing an arbitration matter arising from a construction dispute, including document review, legal strategy formulation, assistance in drafting memoranda, following the hearings, and analysis of engineering expert reports. It also highlights CounselO’s role in organizing claims and linking them to evidence, which helped obtain an award for the claimant obliging the respondent to pay multiple amounts for payments and invoices, delay, demolition, attorney’s fees, expert fees, and arbitration costs."
    },
    "outcomeEn": {
      "sourceHash": "676fb717962e6a33f52f58923284fe42fc8137f6f93cb01cf6580e4466fb6d5a",
      "value": "The published account records an arbitral award in the claimant’s favour covering payments and invoices, delay, demolition, legal fees, expert fees and arbitration costs. CounselO supported the claimant’s representative by organising the legal, financial and technical case. No total award amount or subsequent enforcement outcome is stated in this account."
    },
    "outcomeAr": {
      "sourceHash": "c13f974b8bbd79fc0394f8b6915b8132f6e8b48df31f997d130d6080a61476c5",
      "value": "يسجل ملخص العمل صدور حكم تحكيمي لصالح المحتكم شمل الدفعات والفواتير والتأخير والهدم وأتعاب المحاماة والخبرة والتحكيم. دعمت كاونسلو ممثل المحتكم في تنظيم الملف قانونياً ومالياً وفنياً. ولا يحدد الملخص إجمالي المبلغ المحكوم به أو نتيجة التنفيذ اللاحق."
    },
    "seoTitleEn": {
      "sourceHash": "e1190709b621b6a0f042fbe2495b751e2b9a700a5931a1a5ed378d3d89ecae2d",
      "value": "Construction Arbitration: Organising Claims and Expert Evidence | CounselO"
    },
    "seoTitleAr": {
      "sourceHash": "de3cb51be8b1a8f1acf43c2b7e8381f1a34a52fe081eaf73b922793f9ad72ee5",
      "value": "تحكيم مقاولات: تنظيم المطالبات وأدلة الخبرة | CounselO"
    }
  },
  "kawnslw-tdam-shrkh-lastrdad-448958-ryala-an-aqd-mqawlat": {
    "titleEn": {
      "sourceHash": "5681efdc67d969f15d7112eea4ba93b734a6330c83df021894146128719384fc",
      "value": "Construction Payment Claim: Judgment for SAR 448,958"
    },
    "titleAr": {
      "sourceHash": "c2c351d2aefde7bf1ed07f2e84dfa37ca667f60254d34ef0bcd32cf613a9f38d",
      "value": "مطالبة بمستحقات مقاولات: حكم بـ448,958 ريالاً"
    },
    "summaryEn": {
      "sourceHash": "8260cad0a5edadfddfac5aaf9d0be12a62b0809fc6372638341cd4aeb33cd829",
      "value": "CounselO supported a monetary claim arising from a construction contract by reviewing documents and preparing a legal strategy focused on proving the contractual relationship and the approval of invoices without objection. The case concluded with a final judgment ordering the defendant to pay SAR 448,958 to the claimant."
    },
    "seoTitleEn": {
      "sourceHash": "ef7a74997edd52a2acb5f2966934e818b0299cafd000c5a4ca3518fd3e80b101",
      "value": "Construction Payment Claim: Judgment for SAR 448,958 | CounselO"
    },
    "seoTitleAr": {
      "sourceHash": "8620b9c7fef9a9c2e9672463a4ff21b7f282b20c681f7de6386d827e5d6205bd",
      "value": "مطالبة بمستحقات مقاولات: حكم بـ448,958 ريالاً | CounselO"
    }
  },
  "mn-drash-almstndat-ila-alhkm-bjmya-altlbat": {
    "titleEn": {
      "sourceHash": "3cb523a1dde673c43cd8dba05d9bc345f1b5ae9a99245226a903be8b729e5a28",
      "value": "Construction Receivables: Judgment on SAR 2,049,094 in Claims"
    },
    "titleAr": {
      "sourceHash": "4621896aa5a24df4d6613c89ec5760fb9b8c26de973792b54fd2597043569d67",
      "value": "مستحقات مقاولات: حكم في مطالبات بإجمالي 2,049,094 ريالاً"
    },
    "seoTitleEn": {
      "sourceHash": "cd86ccd3cd22e969ab2f75d0e666cf1d8952fee4dfd3e62c6c3d3cf12ca70a6b",
      "value": "Construction Receivables: Judgment on SAR 2,049,094 in Claims | CounselO"
    },
    "seoTitleAr": {
      "sourceHash": "44d601b21e5c5d32c987cc36151dcd2d0a9cd9d5668e2a87c0c0fa1d9c2cacbc",
      "value": "مستحقات مقاولات: حكم في مطالبات بإجمالي 2,049,094 ريالاً | CounselO"
    }
  },
  "tshyh-altkyyf-alqanwny-lanha-aqd-alaml": {
    "approachEn": {
      "sourceHash": "021cd0c1f9dcf59c1cf0e17d87f5338047170108ac86b68d5c0eaa6c85361417",
      "value": "We reviewed the trial judgment and reconstructed the legal issue for appeal. Actions taken: identified the grounds for denial of compensation; analysed the established facts, notably delayed wage payments; recharacterised the issue from ‘abandonment’ to ‘lawful termination due to employer breach’; linked the facts to Article 81 of the Labor Law; drafted a legal opinion and recommendation for appeal; and argued that the employer’s default caused the termination. The Court of Appeal accepted this recharacterisation and awarded SAR 280,000."
    }
  },
  "fskh-aqd-iyjar-tjary-bsbb-khta-byanat-mnsh-iyjar": {
    "titleEn": {
      "sourceHash": "4d0e53e9f31ba56d483ac5b67b31aab0fa63641a71cb51e3cc510a6d76de809d",
      "value": "Termination of Commercial Lease Due to Ejar Data Error"
    },
    "summaryEn": {
      "sourceHash": "d1ebd8ddd3942b0292a4ddd998bba222c2700505c35f4761303be71ffc2658d4",
      "value": "The case concerns a commercial lease documented on the “Ejar” platform with data inconsistent with reality: the property was registered as a single unit despite comprising eight units. That prevented the tenant from fully occupying and subletting the premises. CounselO reviewed the case and developed a strategy for a termination claim through the claimant’s representative while reserving financial rights. The matter concluded with termination through a binding judicial settlement, achieving the client's practical objective and preserving her financial claims."
    },
    "challengeEn": {
      "sourceHash": "9c3adbfe322429783e485327837d2af25f0c21c610437456690f14561f268a79",
      "value": "Issue: A material error existed in the lease data documented on the “Ejar” platform: the property was recorded as a single unit though it actually comprised eight commercial units, preventing the tenant from full use and subletting. Challenge: In this matter, the parties had been unable to amend the documented contract data, while the tenant remained obliged to pay rent for the entire property despite inability to exploit all units, requiring a legal route to obtain termination and preserve financial rights."
    },
    "approachEn": {
      "sourceHash": "a08293769f253e4e3c0873a92494958f7008175d6a9d830732d1f22db418711f",
      "value": "CounselO's work:\n1. Accepted the case and reviewed the lease, correspondence, and Ejar platform documents.\n2. Assessed the effect of the data error on the tenant's right to use and sublease.\n3. Evaluated amicable and regulatory remedies before litigation.\n4. Recommended a claim to terminate the lease while reserving financial rights.\n5. Formulated legal strategy and directed the plaintiff's representative in court.\n6. Assisted in achieving termination through a binding judicial settlement that met the primary objective."
    },
    "outcomeEn": {
      "sourceHash": "1f42f16cf245ce1db1842cff3d0c77cd4e358b41ab0ea0b04dc774d305bab728",
      "value": "The parties agreed to terminate the lease through a binding judicial settlement, with financial claims reserved as described in the case account. This was a settlement outcome, not a judgment determining all financial claims."
    },
    "outcomeAr": {
      "sourceHash": "57b48f2d82e6bb35bc54a273e53aad22c185ec6e0f70de6c5f5b282a43d47049",
      "value": "انتهى النزاع بفسخ العقد بالتراضي في صلح قضائي ملزم، مع حفظ المطالبات المالية وفق ما يورده ملخص القضية. تمثل النتيجة صلحاً، لا حكماً فاصلاً في جميع المطالبات المالية."
    },
    "seoTitleEn": {
      "sourceHash": "e45c9675d4b532a64a812d6d86947a42546e22a87ff4ecf9cdcd379cf9434336",
      "value": "Termination of Commercial Lease Due to Ejar Data Error | CounselO"
    },
    "seoDescriptionEn": {
      "sourceHash": "62428f976588947656830d376a1daae48c8174d321aae4f315283b12b3fb8e30",
      "value": "Case of a commercial lease documented on the Ejar platform with incorrect data: the property was registered as one unit despite eight units, preventing full use and subleasing."
    }
  },
  "andma-la-ykwn-alnzaa-hwl-alwaya-anma-altkyyf": {
    "titleEn": {
      "sourceHash": "e4964aaaa6f7c2bbc0872b75056e909dafe2ffe5906c84c9a2f82edb8705550d",
      "value": "Partner Payments or Company Debt? Assessing Grounds for Appeal"
    },
    "titleAr": {
      "sourceHash": "2fbca1b27d5a883b01ae87f9ee3c09870785fb101881587a2b08a620f8a892f8",
      "value": "مدفوعات شريك أم دين على الشركة؟ دراسة أسباب الاستئناف"
    },
    "seoTitleEn": {
      "sourceHash": "e3b3cf4db0ad7f7b8edcc7e4d17d7a2b2c86e2242905e0cac87a80ddb4d84989",
      "value": "Partner Payments or Company Debt? Assessing Grounds for Appeal | CounselO"
    },
    "seoTitleAr": {
      "sourceHash": "51514b015b56923b28ceb5676b38d5f1bcaaaf7d511b6b3bca93a57ebf11d69e",
      "value": "مدفوعات شريك أم دين على الشركة؟ دراسة أسباب الاستئناف | CounselO"
    }
  },
  "mnazah-tnfydh": {
    "titleEn": {
      "sourceHash": "7d20452262db757f4aa88cc5ec6f002a964ed32b0b3a28dd287482668d696a23",
      "value": "Bank Transfer Allocation in an Enforcement Dispute"
    },
    "titleAr": {
      "sourceHash": "c449b92ac4818401ddc500c5522c186fe95ee5dbe32a33086ee72576d39061e3",
      "value": "تحديد سبب الحوالة المالية في منازعة تنفيذ"
    },
    "seoTitleEn": {
      "sourceHash": "0f64def9e9c122aef4239aa4a1d47383a9c0ae4e655ba482c487b4f4a1d08708",
      "value": "Bank Transfer Allocation in an Enforcement Dispute | CounselO"
    },
    "seoTitleAr": {
      "sourceHash": "76067048fe22c86e1171909974dd0f72b0ca9b91ba3ca855a06f6ae678eb6147",
      "value": "تحديد سبب الحوالة المالية في منازعة تنفيذ | CounselO"
    }
  },
  "alajrh-mqabl-almnfah-fy-aliyjar-altjary": {
    "summaryEn": {
      "sourceHash": "bcb39d0f27331b7b4b6bebaf15c296eaed9073d7ec8ef20393f96c62a7eb2d73",
      "value": "CounselO assessed an appeal concerning commercial rent where inaccurate property data allegedly prevented the agreed use and subletting of units. The analysis linked the contract, Ejar correspondence and use records to the extent of the landlord’s performance. It concerned an asserted impediment to the agreed benefit, rather than a tenant simply choosing not to use premises that were available."
    },
    "summaryAr": {
      "sourceHash": "0cfbe1cce503dcb906cc249a59a1c2d83beee8b551a4ca903bcec33f907e1637",
      "value": "درست كاونسلو استئنافاً يتعلق بأجرة عقار تجاري قيل إن بياناته غير الدقيقة حالت دون الانتفاع المتفق عليه وتأجير وحداته من الباطن. ربط التحليل العقد ومراسلات إيجار وسجل الانتفاع بمدى تنفيذ المؤجر لالتزامه. تتعلق الدراسة بعائق مزعوم يحول دون المنفعة المتفق عليها، لا بمجرد اختيار المستأجر عدم استخدام عقار مُمكَّن منه."
    },
    "outcomeEn": {
      "sourceHash": "0d37960c39bbbf57facb9f4829e4a16d10bd27cacfb3625540cc5c4ebdef97aa",
      "value": "CounselO provided an in-depth legal analysis that reframed the dispute from an apparent monetary claim to a substantive question about the extent of actual enjoyment. By reconstructing the facts and linking them to the contract, Ejar correspondence, and the usage record, the study helped establish a stronger legal basis for valuing rent in light of the proven impediment, its cause and duration, and the agreed use. The account records an appeal assessment and does not state a final rent award."
    },
    "outcomeAr": {
      "sourceHash": "abd0af3b6f44470db8c268b411e6c10a53843c1fc493e8b50f9acfa76568ca00",
      "value": "قدّمت كاونسلو تحليلًا قانونيًا معمقًا حوّل النزاع من مطالبة مالية ظاهرية إلى مسألة جوهرية تتعلق بمدى تحقق المنفعة الفعلية. ومن خلال إعادة بناء الوقائع وربطها بالعقد ومراسلات منصة إيجار وسجل الانتفاع، ساعدت الدراسة في إبراز أساس قانوني أقوى لتقدير الأجرة في ضوء العائق المثبت وسببه ومدته والمنفعة المتفق عليها. يورد الملخص دراسة للاستئناف، ولا يحدد حكماً نهائياً بالأجرة."
    },
    "seoDescriptionEn": {
      "sourceHash": "60adca80b567e7e4dbef56b38e477f96872a1c6ccfa3d9f19f1be775dca22149",
      "value": "A commercial-rent appeal assessment linking inaccurate property data, Ejar correspondence and impediments to the agreed use of leased units."
    },
    "seoDescriptionAr": {
      "sourceHash": "62efc51028f757be3a8a813221956db24130755775f429eace1246be6b6ae8ad",
      "value": "دراسة استئناف إيجاري تربط بيانات العقار ومراسلات إيجار والعوائق التي حالت دون المنفعة المتفق عليها من الوحدات التجارية."
    }
  },
  "almttlbat-alqanwnyh-walhwkmh-aldakhlyh": {
    "titleEn": {
      "sourceHash": "bd6acd7b7f5ac8652368c98a7b22fb9fa2df168ec3ea8295ee25bf491d9263db",
      "value": "Intercompany Settlement: Corporate Approvals and Signing Authority"
    },
    "titleAr": {
      "sourceHash": "745d4fcba28ccd26da8f0bc60400aa567d04dae5927c1b79a5c1259f203a1194",
      "value": "تسوية بين شركات مرتبطة: الموافقات وصلاحية التوقيع"
    },
    "summaryEn": {
      "sourceHash": "ab00e735ecf2f4cd6b6b30bf883261c0dd6b3efdbf7b3776c2f6add5b880b8b5",
      "value": "This study addresses the appropriate legal mechanism for settling financial balances between related companies, emphasizing each company’s separate legal personality and the proposed independent internal approvals for each company in the settlement reviewed. It concludes that the safest approach is to prepare independent resolutions for each company alongside a joint settlement agreement that governs implementation and considers accounting, zakat and tax requirements and auditors’ observations."
    },
    "summaryAr": {
      "sourceHash": "c55b60046bdcdd9ab5f84cbc535466e0768923ab43c3c4d359b99e891e8b817c",
      "value": "تتناول هذه الدراسة الآلية القانونية المناسبة لتسوية الأرصدة المالية بين شركات ذات علاقة، مع التأكيد على استقلال الذمة المالية لكل شركة والموافقات الداخلية المستقلة المقترحة لكل شركة في التسوية محل الدراسة. وتخلص الدراسة إلى أن الإجراء الأكثر سلامة يتمثل في إعداد قرارات مستقلة لكل شركة، إلى جانب اتفاقية تسوية مشتركة تنظم آلية التنفيذ، وتراعي المتطلبات المحاسبية والضريبية وملاحظات المدققين القانونيين."
    },
    "outcomeEn": {
      "sourceHash": "34d3fc34fe8b2a6b01c838c08b5f3c13eea4a71d43d41575bf41460cafc87126",
      "value": "CounselO delivered practical legal value by converting an accounting issue between related companies into an organized, enforceable legal framework that preserves each company’s independence and documents signing authority and delegation for subsequent review. The work reduced regulatory, accounting and tax risks by providing independent internal resolutions and a unified settlement agreement, giving management and auditors clear, reliable documentation to adopt and implement the settlement."
    },
    "outcomeAr": {
      "sourceHash": "b08863513b7980bec1a0a071f9c5fa66516f0b889e45610fc001e31956762ef4",
      "value": "**القيمة التي قدمتها كاونسلو:**\n\nقدّمت **كاونسلو** قيمة عملية وقانونية من خلال تحويل مسألة محاسبية بين شركات ذات علاقة إلى إطار قانوني منظم وقابل للتنفيذ، يضمن استقلال كل شركة ويوثق صلاحية التوقيع والتفويض بما يتيح مراجعتهما. كما ساعدت على تقليل المخاطر النظامية والمحاسبية والضريبية عبر إعداد قرارات داخلية مستقلة واتفاقية تسوية موحدة، بما يمنح الإدارة والمدققين مستندات واضحة وآمنة لاعتماد التسوية وتنفيذها."
    },
    "seoTitleEn": {
      "sourceHash": "c3d7ca45c7c411fabc008e6aba7fa74b6637bd1852ef4c31a2ce5c423a753e89",
      "value": "Intercompany Settlement: Corporate Approvals and Signing Authority | CounselO"
    },
    "seoTitleAr": {
      "sourceHash": "275374303a759018841169fc0acbd3aa3ee70fca6f16edc12c4395e8faf12aa8",
      "value": "تسوية بين شركات مرتبطة: الموافقات وصلاحية التوقيع | CounselO"
    }
  },
  "mswwlyh-almqawlyn": {
    "titleEn": {
      "sourceHash": "043320c8b85cfbbf43ca1a1c2b94ce9b2a1dc58d8f2f643ce4806c6f5240a9d2",
      "value": "Subcontractor Replacement and Back Charges: Liability Review"
    },
    "titleAr": {
      "sourceHash": "26a9bfabfc257f6059f5f6799ca42fad89462f994ead167aafcd9b008bc0c528",
      "value": "استبدال مقاول الباطن وتحميله التكاليف: دراسة المسؤولية"
    },
    "summaryEn": {
      "sourceHash": "79b8336110ace1994e0ccbcc6a60467f058b432b5c0b0fc4330993f33a0bb2e2",
      "value": "CounselO reviewed a main contractor’s proposed replacement of a subcontractor and recovery of additional completion costs after work stopped. The assessment examined breach, applicable notice and cure requirements, scope disputes, delayed drawings, access and each party’s contribution to the delay. Entitlement and recoverable costs required assessment against the contract, applicable law and evidence rather than following automatically from a stoppage."
    },
    "summaryAr": {
      "sourceHash": "0a67d89f4ae63087e27baab2c23e8410337145a01964d7da32f977fb10ca69e3",
      "value": "راجعت كاونسلو استبدال مقاول من الباطن وتحميله تكاليف الإكمال بعد توقف الأعمال. بحثت الدراسة الإخلال ومتطلبات الإشعار والمعالجة الواجبة، والخلاف حول نطاق العمل وتأخر الرسومات والتمكين ومساهمة كل طرف في التأخير. استلزم تحديد الحق والتكاليف القابلة للمطالبة فحص العقد والنظام والأدلة، فلا يترتب ذلك تلقائياً على توقف الأعمال."
    },
    "outcomeEn": {
      "sourceHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "value": "The deliverables were a legal assessment, negotiation and dispute strategies, and draft correspondence addressing replacement and additional costs. The published account does not record a final court judgment or arbitral award."
    },
    "outcomeAr": {
      "sourceHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "value": "تمثلت المخرجات في دراسة قانونية واستراتيجيات للتفاوض والنزاع ومسودات مراسلات بشأن الاستبدال والتكاليف الإضافية. ولا يورد ملخص العمل حكماً قضائياً أو تحكيمياً نهائياً."
    },
    "seoTitleEn": {
      "sourceHash": "29de3f3552eb57437693da917b5d1b7c588a29f530af84b102ce3beeb8ec942a",
      "value": "Subcontractor Replacement and Back Charges: Liability Review | CounselO"
    },
    "seoTitleAr": {
      "sourceHash": "d3794eb43b96dd78d60707cb41a583ab0004a4aa0b93673066dc8e1679b0eee8",
      "value": "استبدال مقاول الباطن وتحميله التكاليف: دراسة المسؤولية | CounselO"
    },
    "seoDescriptionEn": {
      "sourceHash": "a76fa802667d4c07268ab76a5a9e6823ae3a150593dbe20cb995e28ba57c4ed1",
      "value": "Reviewing a subcontractor’s replacement, notice and cure requirements, delay causes and proposed back charges in a Saudi construction dispute."
    },
    "seoDescriptionAr": {
      "sourceHash": "e4a822edf62dc5e78b66b18798b80f2d5e597f3d9a8a1a80a6baa6108de397fa",
      "value": "دراسة استبدال مقاول الباطن ومتطلبات الإشعار والمعالجة وأسباب التأخير والتكاليف الإضافية في نزاع مقاولات سعودي."
    }
  },
  "astsharh-fy-ahtyal-maly": {
    "challengeEn": {
      "sourceHash": "67d27a766efbbe03f9efec4782db9a09f8512b001bb155a4d5aa229aaaaf54df",
      "value": "The client denied initiating or benefiting from electronic financing attributed to him and alleged impersonation. The review needed to test attribution and consent against the verification process, contact-data discrepancies, fraud report and benefit-use records. The issue was the evidential weight of the particular record and the available rebuttal, not a universal rule that a verification code is worthless or that the financier always bears every evidential burden."
    },
    "challengeAr": {
      "sourceHash": "03c9c65f6d52ddaeb212c92bbc450347e3957c17cc914fb8d9e6ba66d35e2f71",
      "value": "أنكر العميل مباشرة التمويل الإلكتروني المنسوب إليه أو الانتفاع به، وتمسك بانتحال هويته. اقتضت الدراسة اختبار نسبة التصرف والرضا من خلال إجراءات التحقق واختلاف بيانات الاتصال وبلاغ الاحتيال وسجل استخدام المنفعة. تعلقت المسألة بحجية الدليل المعين ووسائل الاعتراض عليه، لا بقاعدة عامة تسقط قيمة رمز التحقق أو تحمل الممول دائماً كل عبء للإثبات."
    },
    "approachEn": {
      "sourceHash": "8a22651fb1f8b27890cdb506d9c01938741bbcc9391d2b655fcc59ea3bb7a5d7",
      "value": "CounselO reviewed the financier’s memorandum and verification process, then prepared a response focused on attribution and disputed consent. The proposed evidence requests covered contact details, device and IP records, verification logs and records of who received or used the benefit. The review connected the prompt objection and fraud report with discrepancies in the records and formulated requests concerning liability and credit or enforcement consequences. It did not treat ownership of a phone or device as the only means of proving authorised use."
    },
    "approachAr": {
      "sourceHash": "8ca45c7201810d93450f5ed739048cc4b325b1951d1bfeed0178273ca95bd00e",
      "value": "راجعت كاونسلو مذكرة الممول وإجراءات التحقق، وأعدت رداً يركز على نسبة التصرف والرضا المتنازع عليه. شملت طلبات الأدلة المقترحة بيانات الاتصال والجهاز وعنوان الإنترنت وسجلات التحقق وهوية مستلم المنفعة أو مستخدمها. وربطت الدراسة الاعتراض السريع وبلاغ الاحتيال باختلاف البيانات، وصاغت طلبات تتعلق بالمسؤولية والآثار الائتمانية أو التنفيذية، دون اعتبار ملكية الهاتف أو الجهاز الوسيلة الوحيدة لإثبات الاستخدام المأذون."
    },
    "outcomeEn": {
      "sourceHash": "1531909a43bcdad8484f767836e49170bd8b114d2c64479c82c135c8b65af01f",
      "value": "The deliverable was a focused evidential response and requests for technical records, testing who initiated the transaction and received its benefit. Relief concerning discharge and credit or enforcement effects was requested, not reported as granted. The assessment preserves the need to apply the statutory rules on electronic evidence and burdens of proof to the particular record."
    },
    "outcomeAr": {
      "sourceHash": "85a87b6058acce70b89574e8fe8c81804aab5bb9e3c8452f9329d9c70ba66240",
      "value": "تمثل المخرج في رد إثباتي محدد وطلبات لسجلات فنية لاختبار من باشر العملية ومن تلقى منفعتها. كانت براءة الذمة ومعالجة الآثار الائتمانية أو التنفيذية ضمن الطلبات، ولم يورد الملخص صدور حكم بها. ويبقى تطبيق قواعد حجية الدليل الإلكتروني وعبء الإثبات مرتبطاً بالدليل المعروض في النزاع."
    }
  },
  "drash-qdyh-aqaryh-maqdh-fy-swrya": {
    "outcomeEn": {
      "sourceHash": "290a28d0fc5bcbc88771a8046db6605ff9c35bb2fcd6aad6ceaa7ce62bff1867",
      "value": "The account records movement toward a real-estate expert valuation to determine the property’s value. This was a procedural development; it does not state a final judgment awarding the heir money or restoring ownership."
    },
    "outcomeAr": {
      "sourceHash": "fa79c2463c4bbc99da31933854d96c12fbcfd89a83bd676c5cae6716aadecb17",
      "value": "يسجل الملخص اتجاه المحكمة إلى خبرة عقارية لتقدير قيمة العقار. يمثل ذلك تطوراً إجرائياً، ولا يورد حكماً نهائياً بمبلغ للوريث أو بإعادة الملكية."
    }
  },
  "darsh-qdyh-qbl-alnzaa": {
    "titleEn": {
      "sourceHash": "e454450c9e2ba8eabd802c4620a2364869144660a5cfea3c1b1f27023585207f",
      "value": "Pre-Litigation Assessment of a Manpower Services Payment Claim"
    },
    "titleAr": {
      "sourceHash": "cb5d282a9874db7f6925a886db0928adec203f2f335ec1f1508d86f6a5ec9779",
      "value": "دراسة مطالبة بمستحقات توريد عمالة قبل رفع الدعوى"
    },
    "outcomeEn": {
      "sourceHash": "c7fd8388bb911ae38ebc028311e80f422131e32861f4291fc33517f0b2003976",
      "value": "The published account records an award of the unpaid service amounts and part of the litigation fees, broadly consistent with the earlier assessment. It does not support a claim of 100% prediction accuracy or establish that later cases will follow the same result."
    },
    "outcomeAr": {
      "sourceHash": "c072f7d4749977cf089f8876c807ef2023d522b6789b3a9e9a05199e06521b45",
      "value": "يسجل ملخص العمل الحكم بالمستحقات غير المدفوعة وجزء من أتعاب التقاضي، بما توافق بدرجة كبيرة مع الدراسة السابقة. ولا يسند ذلك ادعاء دقة تنبؤ بنسبة 100% أو يثبت أن قضايا لاحقة ستنتهي بالنتيجة نفسها."
    },
    "seoTitleEn": {
      "sourceHash": "0232d5c5f9554d18989cc2733901e0e62465307c79c01c8687316e1d20f91a11",
      "value": "Pre-Litigation Assessment of a Manpower Services Payment Claim | CounselO"
    },
    "seoTitleAr": {
      "sourceHash": "9c4439aab21fd9cb7d2c33a54bc9d06432b1b978cdc89ad16c67ba667c89b3f3",
      "value": "دراسة مطالبة بمستحقات توريد عمالة قبل رفع الدعوى | CounselO"
    },
    "seoDescriptionEn": {
      "sourceHash": "95775acda998ccc8b08acd0f7abc42f3ad1e99563ac10371c9cc7733d7e22fcf",
      "value": "A Saudi manpower-services claim assessed through purchase orders, invoices and correspondence, followed by an award of dues and part of the legal fees."
    },
    "seoDescriptionAr": {
      "sourceHash": "a27ade11702c7609b1433c5f9110f6fccc0c33d05589dc9ba764a4ff81c9f496",
      "value": "دراسة مطالبة سعودية بمستحقات توريد عمالة من خلال أوامر الشراء والفواتير والمراسلات، أعقبها حكم بالمستحقات وجزء من الأتعاب."
    }
  },
  "maaljh-halh-khta-tby": {
    "outcomeEn": {
      "sourceHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "value": "The deliverable was an appellate assessment addressing conflicting expert findings, allocation of medical liability and the adequacy of compensation for the injuries described in the file. The account does not report the appellate outcome or a revised compensation amount."
    },
    "outcomeAr": {
      "sourceHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "value": "تمثل المخرج في دراسة للاستئناف تناولت تعارض نتائج الخبرة وتوزيع المسؤولية الطبية وكفاية التعويض عن الأضرار الواردة في الملف. ولا يورد الملخص نتيجة الاستئناف أو مبلغ تعويض معدل."
    }
  },
  "ray-qanwny-fy-tswyh-aabrh-llhdwd": {
    "approachEn": {
      "sourceHash": "b265a6c675f73e1594d2b4b931bc23860f555af1642157c4027dd5ad5551e334",
      "value": "We prepared an independent legal opinion for an international client concerning the settlement of a commercial dispute and the restructuring of a joint venture in Saudi Arabia. Our work included reviewing the settlement agreement, analysing its compliance with the Saudi Companies Law, and assessing the legal and enforcement risks associated with one partner’s exit, the transfer of shares, and the termination of the relationship between the parties.\n\nWe also provided practical recommendations to strengthen the agreement, including improving the drafting of release and discharge provisions, reinforcing warranties and undertakings, regulating liabilities and obligations, and addressing enforcement requirements before the competent authorities. This work enhanced the parties’ legal protection, reduced risk, and addressed requirements relevant to enforceability in Saudi Arabia."
    },
    "approachAr": {
      "sourceHash": "ab8d35b67b784d1abbf50660a70906c9ac19e7fcb72e54146d1117537affe077",
      "value": "قمنا بإعداد رأي قانوني مستقل لأحد العملاء الدوليين بشأن تسوية نزاع تجاري وإعادة هيكلة مشروع مشترك داخل المملكة العربية السعودية. شمل العمل مراجعة اتفاقية التسوية وتحليل مدى توافقها مع نظام الشركات السعودي، إلى جانب تقييم المخاطر القانونية والتنفيذية المرتبطة بخروج أحد الشركاء، وانتقال الحصص، وإنهاء العلاقة بين الأطراف.\n\nكما قدمنا توصيات عملية لتعزيز الاتفاقية، شملت تحسين صياغة بنود الإبراء والمخالصة، تقوية الضمانات والتعهدات، تنظيم المسؤوليات والالتزامات، ومعالجة متطلبات التنفيذ أمام الجهات المختصة. وقد ساعد هذا العمل في رفع مستوى الحماية القانونية للأطراف، وتقليل المخاطر، ومعالجة متطلبات قابلية الاتفاقية للتنفيذ داخل المملكة."
    },
    "outcomeEn": {
      "sourceHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "value": "CounselO delivered an independent opinion and drafting recommendations on partner exit, share transfer, releases, liabilities and implementation requirements for the Saudi joint venture. The account describes advisory work and does not report completed registration, court enforcement or final implementation of the settlement."
    },
    "outcomeAr": {
      "sourceHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "value": "قدمت كاونسلو رأياً مستقلاً وتوصيات للصياغة بشأن خروج الشريك وانتقال الحصص والمخالصات والمسؤوليات ومتطلبات تنفيذ تسوية المشروع السعودي. يصف الملخص عملاً استشارياً، ولا يورد اكتمال التسجيل أو التنفيذ القضائي أو التطبيق النهائي للتسوية."
    }
  },
  "altfawd-alqanwny-aldhky": {
    "titleEn": {
      "sourceHash": "ad2f57733b53e9fd45d0dcb1943ddacb32a0b3882504f5c5af97483f309d1886",
      "value": "Negotiating an International Technology NDA and Non-Circumvention Terms"
    },
    "titleAr": {
      "sourceHash": "757cb629bf4faf94c3987c36fe4422d0d2c6d0cef7e44e250e2d9c72dd95b604",
      "value": "التفاوض على سرية مشروع تقني دولي وشروط عدم الالتفاف"
    },
    "outcomeEn": {
      "sourceHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "value": "Most material drafting amendments were accepted in negotiation. The dispute-resolution clause remained under discussion, so the account does not describe a fully agreed or signed final contract."
    },
    "outcomeAr": {
      "sourceHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "value": "قُبلت معظم التعديلات الجوهرية في التفاوض، وبقي بند تسوية المنازعات محل نقاش؛ لذلك لا يصف الملخص عقداً نهائياً مكتملاً بالتوافق أو التوقيع."
    },
    "seoTitleEn": {
      "sourceHash": "6ae7a8c22bf58e66db4c7225213b50724be25159e98981a681389d64af602231",
      "value": "Negotiating an International Technology NDA and Non-Circumvention Terms | CounselO"
    },
    "seoTitleAr": {
      "sourceHash": "7a9c8699cb4c813d00b405adbc1586beaf26534c9f73470d5b5193a37c16cda9",
      "value": "التفاوض على سرية مشروع تقني دولي وشروط عدم الالتفاف | CounselO"
    }
  },
  "mn-atham-maly-maqd-ila-brah-qtayh": {
    "summaryEn": {
      "sourceHash": "a6328063a8255240b22c95d5fd24080c8ef02dd4dce936c1c25d240d3fd369c5",
      "value": "This matter concerns a financial accusation made against a client because funds were transferred to his personal account while he worked for a company. **CounselO** conducted a comprehensive legal and accounting review of the file and established that the accounting report alone was insufficient to prove liability and that relevant documents, authorizations, and releases had not been considered. Following an integrated defense strategy, the client was acquitted; the judgment was then affirmed on appeal and became final after affirmation by the Supreme Court."
    },
    "seoDescriptionEn": {
      "sourceHash": "b5b165dbf1a91e0692fd26625843379d0abf0b134fc05c896dab31fc8f7e3cd1",
      "value": "A Saudi financial-accusation case: reviewing transfers, authorisations and accounting evidence through a final acquittal."
    },
    "seoDescriptionAr": {
      "sourceHash": "02c4b7c95187d40e75a0d607a6ee80b0212308caf355d827942ac8fc7e0054c1",
      "value": "قضية اتهام مالي في السعودية: مراجعة الحوالات والتفويضات والأدلة المحاسبية وصولاً إلى براءة قطعية وفق ملخص العمل."
    }
  },
  "drash-tan-amam-almhkmh-aladaryh-alalya": {
    "clientTypeEn": {
      "sourceHash": "095a3e32f2239e579df5fc641e994cc09d528003da2e2df0c146a8b342abf069",
      "value": "Identity withheld"
    },
    "clientTypeAr": {
      "sourceHash": "095a3e32f2239e579df5fc641e994cc09d528003da2e2df0c146a8b342abf069",
      "value": "حُجبت الهوية"
    },
    "outcomeEn": {
      "sourceHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "value": "The Supreme Administrative Court overturned the challenged judgment and remanded the compensation claim for reconsideration, as recorded in the published account. Reopening the claim did not itself determine liability or award compensation."
    },
    "outcomeAr": {
      "sourceHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "value": "نقضت المحكمة الإدارية العليا الحكم المطعون فيه وأعادت دعوى التعويض للنظر مجدداً وفق الملخص المنشور. ولا يعني إعادة نظر الدعوى بذاته الفصل في المسؤولية أو الحكم بالتعويض."
    }
  },
  "atfaqyh-atar-ltqdym-alkhdmat-altqnyh-whlwl-aldhka-alastnaay": {
    "summaryEn": {
      "sourceHash": "b70a5a6be1d6c222a73ced1dcaed36edfb9befce5be83887e125ec488a7fff03",
      "value": "This framework agreement governs the contractual relationship between an anonymised artificial-intelligence and data-solutions company and the client for the provision of specialized technology services in artificial intelligence, data engineering, digital transformation, advanced analytics, business intelligence, cloud computing, automation, digital twins, and technical support."
    },
    "summaryAr": {
      "sourceHash": "8ace1061dd2679ebaa8320ca28820ed15f6481efb969a85f10002bc625402f0f",
      "value": "توضح هذه الاتفاقية الإطارية العلاقة التعاقدية بين شركة حُجبت هويتها تعمل في الذكاء الاصطناعي وحلول البيانات والعميل بشأن تقديم خدمات تقنية متخصصة في مجالات الذكاء الاصطناعي، هندسة البيانات، التحول الرقمي، التحليلات المتقدمة، ذكاء الأعمال، الحوسبة السحابية، الأتمتة، التوأم الرقمي، والدعم الفني."
    },
    "approachEn": {
      "sourceHash": "ac82d0241707c12c34244685b90efc693a2992cecd822da36ad47dc7c0682c6a",
      "value": "We prepared and structured a comprehensive framework agreement defining the relationship between the technology provider and its client for the provision of technology, artificial-intelligence, and data services. The work clarified the scope of services, the work-order mechanism, each party’s responsibilities, data and intellectual-property management, confidentiality, cybersecurity, invoicing, acceptance, change control, warranties, liability, and termination, with the aim of creating a clear and flexible agreement that protects both parties’ rights and facilitates future technology projects."
    },
    "approachAr": {
      "sourceHash": "37e2efd2e9b8a3b8f414a5fed9bf1c1694d38fd07b72e980c13ffbb4f2c3ce30",
      "value": "قمنا بإعداد وتنظيم عقد إطاري شامل يحدد العلاقة بين مقدم الخدمات التقنية والعميل لتقديم خدمات التقنية والذكاء الاصطناعي والبيانات. شمل العمل توضيح نطاق الخدمات، آلية أوامر العمل، مسؤوليات كل طرف، إدارة البيانات والملكية الفكرية، السرية، الأمن السيبراني، الفواتير، القبول، التغيير، الضمان، المسؤولية، والإنهاء؛ بهدف إنشاء عقد واضح ومرن يحمي حقوق الطرفين ويسهّل تنفيذ المشاريع التقنية المستقبلية."
    },
    "outcomeEn": {
      "sourceHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "value": "The deliverable was a framework agreement covering work orders, acceptance, change control, data, intellectual property, payment and liability. The published account does not confirm execution of the agreement or completion of a technology project."
    },
    "outcomeAr": {
      "sourceHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "value": "تمثل المخرج في اتفاقية إطارية تنظم أوامر العمل والقبول والتغيير والبيانات والملكية الفكرية والسداد والمسؤولية. ولا يؤكد الملخص توقيع الاتفاقية أو إنجاز مشروع تقني."
    }
  },
  "ray-qanwny-fy-tlb-aflas": {
    "outcomeEn": {
      "sourceHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "value": "A legal assessment identified a proposed bankruptcy route from the documents supplied. The published account does not name that procedure or report a filing, court decision, creditor recovery or completed restructuring."
    },
    "outcomeAr": {
      "sourceHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "value": "حددت الدراسة مساراً مقترحاً للإفلاس بالاستناد إلى المستندات المقدمة. لا يسمي الملخص الإجراء المختار، ولا يورد تقديم الطلب أو قرار المحكمة أو حصيلة للدائنين أو إعادة هيكلة مكتملة."
    }
  }
};

export function correctPublicWorkFields<T extends { slug: string }>(sample: T): T {
  if (sample.slug === "ray-fy-mshrwa-qanwn-alwsath-alswry-maaljh-10-thghrat" && createHash("sha256").update(["summaryAr", "challengeAr", "approachAr", "outcomeAr"].map(key => String((sample as Record<string, unknown>)[key] ?? "")).join("\n")).digest("hex") !== "3e6fe012cc1089fafd5d615552e71bd82170cad24ec201b307b2fcfe2bd07c50") return sample;
  if (sample.slug === "kawnslw-wtswyh-alarsdh-almalyh-qanwna" && createHash("sha256").update(["summaryAr", "challengeAr", "approachAr", "outcomeAr"].map(key => String((sample as Record<string, unknown>)[key] ?? "")).join("\n")).digest("hex") !== "e5d4e76d8b629660bddfcd92ec126e209ee5c514366981a1cd9bb28542646bb9") return sample;
  const patches = CORRECTIONS[sample.slug];
  if (!patches) return sample;
  const result = { ...sample } as Record<string, unknown>;
  for (const [field, correction] of Object.entries(patches)) {
    const current = typeof result[field] === "string" ? result[field] as string : "";
    if (createHash("sha256").update(current).digest("hex") === correction.sourceHash) {
      result[field] = correction.value;
    }
  }
  return result as T;
}
