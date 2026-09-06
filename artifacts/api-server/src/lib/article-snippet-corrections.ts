import { createHash } from "node:crypto";

// Audited legacy summaries only. Preserve every subsequently authored field.
const ARTICLE_SNIPPET_CORRECTIONS: Record<string, Record<string, { sourceHash: string; text: string }>> = {
  "mta-ykwn-alslh-afdl-mn-alastmrar-fy-alkhswmh": {
    "excerptEn": {
      "sourceHash": "9af7cca0d7fe419fe0f47052d22c4308417fe692761530315ac9a405f85656f0",
      "text": "Compare settlement and litigation through evidence, recovery prospects, cost, timing and enforceability before choosing how to resolve a commercial dispute."
    },
    "excerptAr": {
      "sourceHash": "d48ff3bb15294e587cdffb9494cc40e99750d4280a0910e0cc15de87a30080ea",
      "text": "قارن بين الصلح والتقاضي من حيث الأدلة وفرص التحصيل والتكلفة والوقت وقابلية التنفيذ قبل اختيار مسار تسوية النزاع التجاري."
    },
    "seoDescriptionEn": {
      "sourceHash": "de083a9063dd15ff5a161bcb0b8ba16cf593ef555878963d8d5604014b50bd75",
      "text": "Compare settlement and litigation through evidence, recovery prospects, cost, timing and enforceability before choosing how to resolve a commercial dispute."
    },
    "seoDescriptionAr": {
      "sourceHash": "baf0b2d13581fb36de2e6cfdfd872b19e0aec724a4ad0f90d3e8c8baf7440699",
      "text": "قارن بين الصلح والتقاضي من حيث الأدلة وفرص التحصيل والتكلفة والوقت وقابلية التنفيذ قبل اختيار مسار تسوية النزاع التجاري."
    }
  },
  "mta-ysthq-alwsyt-altjary-kaml-amwlth": {
    "excerptEn": {
      "sourceHash": "89f2ba8091fc4143c4900fc9fe58e912f813fac9fb6f0f7a8cc649d73b4c4abd",
      "text": "Assess a broker’s commission claim by separating the agreed rate, payment trigger, completed work and proof of the underlying transaction."
    },
    "excerptAr": {
      "sourceHash": "ac1e3ec8c6414f17a4438f8e5ae5fad4d5166cd01f6c2d7c8d284cdf13488ba1",
      "text": "قيّم المطالبة بعمولة الوساطة من خلال نسبة العمولة وشرط استحقاقها والعمل المنجز والأدلة على الصفقة الأصلية."
    },
    "seoDescriptionEn": {
      "sourceHash": "25c59ddaa832185b0ec1db17672cf648d1dc037cc11563e173ce01ce4943be99",
      "text": "Assess a broker’s commission claim by separating the agreed rate, payment trigger, completed work and proof of the underlying transaction."
    },
    "seoDescriptionAr": {
      "sourceHash": "f3e9f6971bc597bd4aec3f677dc3da18ebbf8b437e06cf41f7e17f52f024fb00",
      "text": "قيّم المطالبة بعمولة الوساطة من خلال نسبة العمولة وشرط استحقاقها والعمل المنجز والأدلة على الصفقة الأصلية."
    }
  },
  "hyn-ykwn-alaqrar-aqwa-mn-alankar": {
    "excerptEn": {
      "sourceHash": "4ca500672350958ccaf82418ff638dc64261e3bf41d857acdaabc2c47bbd1902",
      "text": "How admissions, sale documents and restrictions on title transfer affect the handling of a Saudi property dispute and the relief requested."
    },
    "excerptAr": {
      "sourceHash": "4357c8e4a2f33dbbd158e3395e384aebed2e95ba6e4e80321cad24ec1c4d0d38",
      "text": "كيف يؤثر الإقرار ومستندات البيع وقيود الإفراغ في إدارة النزاع العقاري السعودي وتحديد الطلب المناسب أمام المحكمة."
    },
    "seoDescriptionEn": {
      "sourceHash": "4e833329ab83a2e6257dcb0545707a06be76600550e86b00db7bddc6164dd9ed",
      "text": "How admissions, sale documents and restrictions on title transfer affect the handling of a Saudi property dispute and the relief requested."
    },
    "seoDescriptionAr": {
      "sourceHash": "db151400cdb17479d083b41d47ba767a435f78adefd12bd42259f680924ea874",
      "text": "كيف يؤثر الإقرار ومستندات البيع وقيود الإفراغ في إدارة النزاع العقاري السعودي وتحديد الطلب المناسب أمام المحكمة."
    }
  },
  "lys-kl-mblgh-ytalb-bh-yhkm-bh-kyf-tfkk-almtalbat-altjaryh-qbl-bna-aldfaa": {
    "excerptEn": {
      "sourceHash": "8ae41e6e883bf3bc9201f5d05e894c55522c6ad1e6f8fde2c366c8c4a83cada6",
      "text": "Break a Saudi commercial claim into its contractual basis, calculations, evidence and alleged loss before assessing liability and preparing a defence."
    },
    "excerptAr": {
      "sourceHash": "8509c9ff2f800b98c794d2fae38bbd86912baa731a742232fc5a67b8a95404ba",
      "text": "فكك المطالبة التجارية السعودية إلى أساسها التعاقدي وحساباتها وأدلتها والضرر المدعى به قبل تقييم المسؤولية وإعداد الدفاع."
    },
    "seoDescriptionEn": {
      "sourceHash": "7bb185c573a584e8cfce79d8db8a4084ca15f420b681cbefc5ded82b509d443e",
      "text": "Break a Saudi commercial claim into its contractual basis, calculations, evidence and alleged loss before assessing liability and preparing a defence."
    },
    "seoDescriptionAr": {
      "sourceHash": "8eb5fc1af83816e4a238163d649e841f3de333ab0ec14de7d529ad90f8cbbe43",
      "text": "فكك المطالبة التجارية السعودية إلى أساسها التعاقدي وحساباتها وأدلتها والضرر المدعى به قبل تقييم المسؤولية وإعداد الدفاع."
    }
  },
  "mta-ysbh-astamal-alhq-tasfa-fy-alnzam-alsawdy": {
    "excerptEn": {
      "sourceHash": "97611604eb6fbde6fd3452aea0bcbb17274ea8310d5e16a334fdaa34e25dfa8b",
      "text": "Understand the Saudi Civil Transactions Law’s limits on exercising rights and the facts that may distinguish legitimate use from abuse."
    },
    "excerptAr": {
      "sourceHash": "0cdf1417a26c798e4b8591bd3f034e8837ad498670bf55a025625e486afc9373",
      "text": "تعرّف إلى حدود استعمال الحق في نظام المعاملات المدنية السعودي والوقائع التي قد تميز الاستعمال المشروع عن التعسف."
    },
    "seoDescriptionEn": {
      "sourceHash": "159a2e5dda9f6ce58f7187c49497d3d53d49ad8bb5b12fa2c69dc50c597c2052",
      "text": "Understand the Saudi Civil Transactions Law’s limits on exercising rights and the facts that may distinguish legitimate use from abuse."
    },
    "seoDescriptionAr": {
      "sourceHash": "4106dcafa2d4335dc3451fff62323d1e2d5259d758110f3cdbfe8406fe584eb1",
      "text": "تعرّف إلى حدود استعمال الحق في نظام المعاملات المدنية السعودي والوقائع التي قد تميز الاستعمال المشروع عن التعسف."
    }
  },
  "alsnd-lamr-kadah-dman-mta-ythwl-ala-khtr-tnfydhy": {
    "excerptEn": {
      "sourceHash": "5031f8471594371ee5e15c816666e96b15ea19f3c9dde6c3b422cb4a7513eee9",
      "text": "Review a Saudi promissory note’s purpose, amount and relationship to the underlying debt before assessing enforcement exposure and available objections."
    },
    "excerptAr": {
      "sourceHash": "dc81c9ebd8cbc947c11e4908cc2048632a54708dcf4e70fcc776c067a8ca9dd9",
      "text": "راجع غرض السند لأمر ومبلغه وصلته بالدين الأصلي قبل تقييم مخاطر التنفيذ والاعتراضات الممكنة في السعودية."
    },
    "seoDescriptionEn": {
      "sourceHash": "52ed9f0315fa05e7de9168f70d4b7af924ef7b727ae6ee8a94b9b874bafce20e",
      "text": "Review a Saudi promissory note’s purpose, amount and relationship to the underlying debt before assessing enforcement exposure and available objections."
    },
    "seoDescriptionAr": {
      "sourceHash": "d900248bf5a0c7c846b44dcc5ab23b1fc216dc16b930138893b35bc9d710f95d",
      "text": "راجع غرض السند لأمر ومبلغه وصلته بالدين الأصلي قبل تقييم مخاطر التنفيذ والاعتراضات الممكنة في السعودية."
    }
  },
  "alaywb-alkhfyh-fy-alaqwd-wathrha-alqanwny": {
    "excerptEn": {
      "sourceHash": "d1d9abacc6c16e3525c0ce6589212ecfdbc414f2f98a08b75b88d0d843add7a6",
      "text": "Assess hidden defects in a Saudi sale through disclosure, buyer knowledge, notice, evidence and the statutory limits on warranty claims."
    },
    "excerptAr": {
      "sourceHash": "5d5c43c20f6967969bf720f435f14def52b7d506a4361914144a8877d7e0afe5",
      "text": "قيّم العيب الخفي في البيع السعودي من خلال الإفصاح وعلم المشتري والإخطار والأدلة والقيود النظامية على دعوى الضمان."
    },
    "seoDescriptionEn": {
      "sourceHash": "19eefc7ae3f2a153063ae197bdf298f6f243e42693a435fd071b970059cc40c9",
      "text": "Assess hidden defects in a Saudi sale through disclosure, buyer knowledge, notice, evidence and the statutory limits on warranty claims."
    },
    "seoDescriptionAr": {
      "sourceHash": "66a8cf4504f4930a412e8ccda69f29b8a575d3dd25575cf9f729a9a826eb76c3",
      "text": "قيّم العيب الخفي في البيع السعودي من خلال الإفصاح وعلم المشتري والإخطار والأدلة والقيود النظامية على دعوى الضمان."
    }
  },
  "hmayh-alamyl-mn-mswdh-alaqd-ala-altwqya": {
    "excerptEn": {
      "sourceHash": "177f36b163d8aed16c25f6eda073e148cf63f12650565c5a90a2f72738765682",
      "text": "A practical contract review approach covering obligations, payment, acceptance, liability and dispute terms before a draft becomes a signed commitment."
    },
    "excerptAr": {
      "sourceHash": "03897c1b61d09f0705521b384d76211c893df5a7d13323a14228f32176352a9e",
      "text": "منهج عملي لمراجعة الالتزامات والسداد والقبول والمسؤولية وشروط النزاع قبل تحول مسودة العقد إلى التزام موقع."
    },
    "seoDescriptionEn": {
      "sourceHash": "822a964e17aa2af8bd9632252cc00955a12d7db15bdc896c0e1f0e4a2ac0e416",
      "text": "A practical contract review approach covering obligations, payment, acceptance, liability and dispute terms before a draft becomes a signed commitment."
    },
    "seoDescriptionAr": {
      "sourceHash": "2945da018bfc7e7758bfe773ddcd73286985144709110b226758b955fab180ca",
      "text": "منهج عملي لمراجعة الالتزامات والسداد والقبول والمسؤولية وشروط النزاع قبل تحول مسودة العقد إلى التزام موقع."
    }
  },
  "mta-ythwl-twqya-alaaml-ala-mhdr-almrajah-ala-aqrar-balmswwlyh": {
    "excerptEn": {
      "sourceHash": "ce6448778f4d85744be4b01a4911290e887a9e849de2a52dd2ca510a6e05b190",
      "text": "Distinguish an employee’s signed internal audit record from a judicial admission and examine its wording, supporting evidence and circumstances."
    },
    "excerptAr": {
      "sourceHash": "26b039d630526916fc52d0af900303c48011e8342b3511c8ce762396fc754268",
      "text": "ميّز بين توقيع العامل على محضر مراجعة داخلي والإقرار القضائي، وافحص صياغة المحضر والأدلة المؤيدة وظروف التوقيع."
    },
    "seoDescriptionEn": {
      "sourceHash": "719c27529bbb3d96198aead07eb70546d5cd711bb217a581c276a349752d91c2",
      "text": "Distinguish an employee’s signed internal audit record from a judicial admission and examine its wording, supporting evidence and circumstances."
    },
    "seoDescriptionAr": {
      "sourceHash": "78ea4db56f33260bde3890977707b79e77a3288d38b147bce13d69a139079d6a",
      "text": "ميّز بين توقيع العامل على محضر مراجعة داخلي والإقرار القضائي، وافحص صياغة المحضر والأدلة المؤيدة وظروف التوقيع."
    }
  },
  "alfrq-byn-alfskh-waltawyd-fy-alaqwd-altjaryh": {
    "excerptEn": {
      "sourceHash": "2375904471359563690f12f1cec31ba4a8dd6a38982692594aff208ae48759d0",
      "text": "Compare rescission and damages under Saudi contract law, including breach, notice, loss and when the two remedies may be sought together."
    },
    "excerptAr": {
      "sourceHash": "d4dd2a078a00194b5f3d8082c31cc9bc4c825df49f9071ffdad1dadaf27b7db3",
      "text": "قارن بين الفسخ والتعويض في العقود السعودية من حيث الإخلال والإعذار والضرر والحالات التي يمكن فيها الجمع بين الطلبين."
    },
    "seoDescriptionEn": {
      "sourceHash": "1f176e401f705e5c9a007f996522f46a50256be397e896b0d33662b04f54991a",
      "text": "Compare rescission and damages under Saudi contract law, including breach, notice, loss and when the two remedies may be sought together."
    },
    "seoDescriptionAr": {
      "sourceHash": "d20ee6016ea5c26f69179cf23028796759ee53e18d64296865db1bc9cc3f7813",
      "text": "قارن بين الفسخ والتعويض في العقود السعودية من حيث الإخلال والإعذار والضرر والحالات التي يمكن فيها الجمع بين الطلبين."
    }
  },
  "bna-astratyjyh-aldfaa-qbl-bd-alkhswmh": {
    "excerptEn": {
      "sourceHash": "19096e4dccd6596a92027bcce5385f0425b2f4fe74c74ec468872fe34afb44bd",
      "text": "Prepare for a threatened commercial claim by preserving records, mapping events, testing the claimed amounts and identifying the correct dispute route."
    },
    "excerptAr": {
      "sourceHash": "61e5f6c2a119d461418c309037cee29deacc995c76382d09cffb316faadf1abc",
      "text": "استعد للمطالبة التجارية المحتملة بحفظ المستندات وترتيب الوقائع وفحص المبالغ المطلوبة وتحديد مسار النزاع المناسب."
    },
    "seoDescriptionEn": {
      "sourceHash": "2ef4e616424f2083106dfcae33f86c769ecb2f621b1594e26b25a1bbd46e4c25",
      "text": "Prepare for a threatened commercial claim by preserving records, mapping events, testing the claimed amounts and identifying the correct dispute route."
    },
    "seoDescriptionAr": {
      "sourceHash": "3b936ed825516edf61d426f2124276efa49819280cb92e9ac9ebf6affa901fa5",
      "text": "استعد للمطالبة التجارية المحتملة بحفظ المستندات وترتيب الوقائع وفحص المبالغ المطلوبة وتحديد مسار النزاع المناسب."
    }
  },
  "mta-yfqd-shrt-althkym-athrh-alamly-fy-alnzaa": {
    "excerptEn": {
      "sourceHash": "6687dd447aeb284266e37bb500ef1628d8bf852b4653896f69c0b3a8d77a83a5",
      "text": "Check a Saudi arbitration clause’s scope, validity and procedural use, including when an objection must be raised before the court."
    },
    "excerptAr": {
      "sourceHash": "3a6fa9bdf35056c2eacde7ea46f515ded900c5e4e983558054da274ad43d1f71",
      "text": "افحص نطاق شرط التحكيم السعودي وصحته واستخدامه الإجرائي، بما في ذلك توقيت إبداء الدفع أمام المحكمة."
    },
    "seoDescriptionEn": {
      "sourceHash": "09402604dc6baf703ad39b264859b4b88fd695cc656cd27d66bab55565c6b880",
      "text": "Check a Saudi arbitration clause’s scope, validity and procedural use, including when an objection must be raised before the court."
    },
    "seoDescriptionAr": {
      "sourceHash": "2d9cb3e7ddbbad3a913e152d53b6b195d54ad3166c6e70de0388c0d78e19ea5f",
      "text": "افحص نطاق شرط التحكيم السعودي وصحته واستخدامه الإجرائي، بما في ذلك توقيت إبداء الدفع أمام المحكمة."
    }
  },
  "altwqya-ala-byad": {
    "excerptEn": {
      "sourceHash": "c6d050b2b7c0b1c70b262ff81b63994db2e5921bed8e8d0b9be9b8555fbf8193",
      "text": "A historical discussion of Al-Sanhuri’s analysis of signing in blank, entrusted completion and proof of misuse, subject to the applicable local law."
    },
    "excerptAr": {
      "sourceHash": "ca0f1e69b5e7554e7d3a21291ebb1251f856848989626a3b02e91a269c6ef8a0",
      "text": "عرض فقهي تاريخي لتحليل السنهوري للتوقيع على بياض والكتابة المؤتمن عليها وإثبات إساءة الاستعمال، مع مراعاة القانون المحلي المنطبق."
    },
    "seoDescriptionEn": {
      "sourceHash": "e961fc5174a80a7793d9362e17a6f5a52ec4b3bade138f64c8c1e49706d4f995",
      "text": "A historical discussion of Al-Sanhuri’s analysis of signing in blank, entrusted completion and proof of misuse, subject to the applicable local law."
    },
    "seoDescriptionAr": {
      "sourceHash": "2c320280e7bd8a937f6b76467efaf96d54144b231a9845a0d6a48027b17da402",
      "text": "عرض فقهي تاريخي لتحليل السنهوري للتوقيع على بياض والكتابة المؤتمن عليها وإثبات إساءة الاستعمال، مع مراعاة القانون المحلي المنطبق."
    }
  },
  "mta-ykwn-alqrar-aladary-qabla-llalgha-amam-dywan-almzalm": {
    "excerptEn": {
      "sourceHash": "172a27a25ee331f8458f6b3912f47417ef52244edcf8d7a2e2944fc35ddb0be6",
      "text": "Review the grounds for challenging a Saudi administrative decision before the Board of Grievances, alongside standing and procedural requirements."
    },
    "excerptAr": {
      "sourceHash": "74001c5f247d7ba32c53704ae734a0fa80b85781e76a5b9a93f07c278722ee6f",
      "text": "راجع أسباب الطعن في القرار الإداري السعودي أمام ديوان المظالم، مع مراعاة الصفة والمتطلبات الإجرائية للدعوى."
    },
    "seoDescriptionEn": {
      "sourceHash": "8a1ea353fc7ffa2a0c6d91fb5f4101dfc1dd60904d2123bf30741b313581fbbd",
      "text": "Review the grounds for challenging a Saudi administrative decision before the Board of Grievances, alongside standing and procedural requirements."
    },
    "seoDescriptionAr": {
      "sourceHash": "4822a18038a26760008a47c64bb430a385d85a91c34be336f002bb7621b753dc",
      "text": "راجع أسباب الطعن في القرار الإداري السعودي أمام ديوان المظالم، مع مراعاة الصفة والمتطلبات الإجرائية للدعوى."
    }
  },
  "syghh-mdhkrh-tfahm-qablh-lltadyl": {
    "excerptEn": {
      "sourceHash": "37dc3fc9533c14e4e2c721de0969a2d2c99408203e72e7e024d7e5a22e9f6691",
      "text": "Adapt an MOU’s purpose, cooperation terms, confidentiality and termination provisions while making clear which obligations are intended to bind the parties."
    },
    "excerptAr": {
      "sourceHash": "5d37085ebf1c162ca184cf3d286ab135b272f50660de3793e647ba6e56971145",
      "text": "كيّف غرض مذكرة التفاهم ونطاق التعاون والسرية والإنهاء، مع توضيح الالتزامات المقصود إلزام الطرفين بها."
    },
    "seoDescriptionEn": {
      "sourceHash": "a3aa9230f263faf59fde679f1dc0a0ecd14010baf73704b6ff171ef6135f416c",
      "text": "Adapt an MOU’s purpose, cooperation terms, confidentiality and termination provisions while making clear which obligations are intended to bind the parties."
    },
    "seoDescriptionAr": {
      "sourceHash": "86f7602326f49040abdfb63499d7483288840f8d658c4644c88f49e907321f1b",
      "text": "كيّف غرض مذكرة التفاهم ونطاق التعاون والسرية والإنهاء، مع توضيح الالتزامات المقصود إلزام الطرفين بها."
    }
  },
  "hwkmh-alshrkat-kdmanh-mwdwayh-lhmayh-hqwq-msahmy-alaqlyh": {
    "excerptEn": {
      "sourceHash": "79da06254b61e8ceb84049c402e653a0a1e0f4a0a8b3ba4f786d3c4616836b72",
      "text": "Explore Saudi minority shareholder protections through disclosure, governance controls and the conditions for judicial inspection under the Companies Law."
    },
    "excerptAr": {
      "sourceHash": "4edae281b542dffbfe4eb6287b82d96af9bfaa5041c621306ec0190cc4ada4e5",
      "text": "تعرّف إلى حماية مساهمي الأقلية في السعودية عبر الإفصاح وضوابط الحوكمة وشروط طلب التفتيش القضائي في نظام الشركات."
    },
    "seoDescriptionEn": {
      "sourceHash": "e6e457669f18aa16a0d12dee27203c61f2f501ac7b220d5db88d199fcd7988fa",
      "text": "Explore Saudi minority shareholder protections through disclosure, governance controls and the conditions for judicial inspection under the Companies Law."
    },
    "seoDescriptionAr": {
      "sourceHash": "600a1aec3c56d03e78b7fe4fc2fed28706d9029e12d4fc5a0cd8c0d093b8ceeb",
      "text": "تعرّف إلى حماية مساهمي الأقلية في السعودية عبر الإفصاح وضوابط الحوكمة وشروط طلب التفتيش القضائي في نظام الشركات."
    }
  },
  "almswwlyh-an-fal-alghyr": {
    "excerptEn": {
      "sourceHash": "5d19517e1f3e961ed7060f899d8a55f18f42357d45de6b5337ac51893c27b147",
      "text": "An introductory account of liability for another person’s acts, focusing on supervision, actual authority and the connection between the act and assigned work."
    },
    "excerptAr": {
      "sourceHash": "0e1a45a352bbc055af0da34e58db0d1f07e25b12d9b04972878a5ac51a98f1f1",
      "text": "مدخل إلى المسؤولية عن فعل الغير يركز على الرقابة والسلطة الفعلية وصلة الفعل بالعمل المكلف به، وفق القانون المنطبق."
    },
    "seoDescriptionEn": {
      "sourceHash": "52930ee9cd820e8bd470c1d1e29399ccda21fcffd8458453ba7ee9296f12fbd8",
      "text": "An introductory account of liability for another person’s acts, focusing on supervision, actual authority and the connection between the act and assigned work."
    },
    "seoDescriptionAr": {
      "sourceHash": "90e2c18e7a62624aca6859b89ab428a412992370c426eb5bd400b718f034df61",
      "text": "مدخل إلى المسؤولية عن فعل الغير يركز على الرقابة والسلطة الفعلية وصلة الفعل بالعمل المكلف به، وفق القانون المنطبق."
    }
  },
  "hdwd-alymyn-alhasmh-fy-alathbat-almdny-swry": {
    "excerptEn": {
      "sourceHash": "a5cd1054b67af4d5a46a0997c34ea8e6abe01753cba9294543a3c6aad7671abe",
      "text": "Examine the Syrian conclusive oath’s limits through statutory requirements, mandatory rules and a discussion of the cited historical court ruling."
    },
    "excerptAr": {
      "sourceHash": "616d1253abad9c424df96fdebaad9a204ef9f9ccd0f0c8c5e1d369ec802b82ea",
      "text": "افحص حدود اليمين الحاسمة السورية في ضوء شروطها القانونية والقواعد الآمرة ومناقشة الاجتهاد القضائي التاريخي المشار إليه."
    },
    "seoDescriptionEn": {
      "sourceHash": "a533c0ba5b55e695973af60ced21d32abde93af55abc32e263419f84a0889473",
      "text": "Examine the Syrian conclusive oath’s limits through statutory requirements, mandatory rules and a discussion of the cited historical court ruling."
    },
    "seoDescriptionAr": {
      "sourceHash": "fb38efc35ea57d80f262e78f39c0864ed87bede2569f3f5db5b2e36606d73c3a",
      "text": "افحص حدود اليمين الحاسمة السورية في ضوء شروطها القانونية والقواعد الآمرة ومناقشة الاجتهاد القضائي التاريخي المشار إليه."
    }
  },
  "mnhjyh-5why-fy-alaml-alqanwny": {
    "excerptEn": {
      "sourceHash": "e59f0804d84ec39213fed44bd4ee3c517c717a56accfb44fec37c1b51e9415d2",
      "text": "Use successive “why” questions to examine the underlying causes of a dispute, then test each explanation against documents and the factual record."
    },
    "excerptAr": {
      "sourceHash": "d560a2a4bde30d317efc39fc80e4d9539d34e3a1573550db59b910e7df191605",
      "text": "استخدم أسئلة «لماذا» المتتابعة لفحص أسباب النزاع، ثم اختبر كل تفسير بالمستندات والوقائع بدلاً من الاكتفاء بافتراضات أولية."
    },
    "seoDescriptionEn": {
      "sourceHash": "51cbb73efcc6542ac010d216f8260313e2e91654e20dde8fc1679a473da57441",
      "text": "Use successive “why” questions to examine the underlying causes of a dispute, then test each explanation against documents and the factual record."
    },
    "seoDescriptionAr": {
      "sourceHash": "602060f56b126e5d1cf397c77bc0a3b87c75df282bbfae906e49283fa2920381",
      "text": "استخدم أسئلة «لماذا» المتتابعة لفحص أسباب النزاع، ثم اختبر كل تفسير بالمستندات والوقائع بدلاً من الاكتفاء بافتراضات أولية."
    }
  },
  "mhl-alaqd-fy-alqanwn-alswry": {
    "excerptEn": {
      "sourceHash": "d844f2dad6928b12f57a96917896c4180390330d0918f1227f0ecac168929004",
      "text": "Understand the requirements for a contractual obligation’s subject matter under Syrian law, including possibility, determination and legality."
    },
    "excerptAr": {
      "sourceHash": "fbb28d1af8558297753ef52e0547afa572841e7ddddf9140777692a2bd425398",
      "text": "تعرّف إلى شروط محل الالتزام العقدي في القانون السوري، بما فيها الإمكان والتعيين أو قابلية التعيين والمشروعية."
    },
    "seoDescriptionEn": {
      "sourceHash": "04981ccc018c488a7687e53b94c17cf9154afc03a08bff77b66abe652119e619",
      "text": "Understand the requirements for a contractual obligation’s subject matter under Syrian law, including possibility, determination and legality."
    },
    "seoDescriptionAr": {
      "sourceHash": "1f89f34aad73745da353e5d0a6d65d58c62b2b6045f7d23e2d14e2fd607d1c68",
      "text": "تعرّف إلى شروط محل الالتزام العقدي في القانون السوري، بما فيها الإمكان والتعيين أو قابلية التعيين والمشروعية."
    }
  },
  "anha-aqd-alaml-bdwn-sbb-mshrwa": {
    "excerptEn": {
      "sourceHash": "bee9448f39d34d228499b8a70845c0e8d64b0615d9533ee54b8607f8d0ca3a16",
      "text": "Assess Saudi employment termination through the contract, stated reason, notice, compensation and procedural steps; mobility eligibility requires a separate check."
    },
    "excerptAr": {
      "sourceHash": "e6ba469a82fb50d031151784b1e751bdf38620e3253c5ab14095013750c6d942",
      "text": "قيّم إنهاء العمل في السعودية من خلال العقد والسبب والإشعار والتعويض والخطوات الإجرائية، مع فحص أهلية الانتقال الوظيفي بصورة مستقلة."
    },
    "seoDescriptionEn": {
      "sourceHash": "7d5ab6a86a45f3f9322f0797111ec830175b4079a64cf51ff5a2c40336b4eee0",
      "text": "Assess Saudi employment termination through the contract, stated reason, notice, compensation and procedural steps; mobility eligibility requires a separate check."
    },
    "seoDescriptionAr": {
      "sourceHash": "2430d4159b8421a7da3d07b018a57ee62e7b76259252ee3c27c7a7227da3e468",
      "text": "قيّم إنهاء العمل في السعودية من خلال العقد والسبب والإشعار والتعويض والخطوات الإجرائية، مع فحص أهلية الانتقال الوظيفي بصورة مستقلة."
    }
  },
  "altakhr-fy-alrwatb-aw-alamtnaa-an-dfaha": {
    "excerptEn": {
      "sourceHash": "0bc73178dbdb6aad536c8b7637cc50609e5a65d661a0e4d443ac6efe58f95f48",
      "text": "Prepare a Saudi unpaid-wage claim using the contract, payroll and bank records, with attention to the employment dispute process and recoverable sums."
    },
    "excerptAr": {
      "sourceHash": "3200d5e5d6a04750e4a0e0e6fd88744deb43e0f0279c021a613e218129f424b7",
      "text": "جهّز مطالبة الأجور المتأخرة في السعودية بالعقد ومسيرات الرواتب والسجلات البنكية، مع تحديد مسار النزاع والمبالغ المطالب بها."
    },
    "seoDescriptionEn": {
      "sourceHash": "d6782108d1c14a21847cb3468b438ed708086f6154d622df9ea800dc957c85f6",
      "text": "Prepare a Saudi unpaid-wage claim using the contract, payroll and bank records, with attention to the employment dispute process and recoverable sums."
    },
    "seoDescriptionAr": {
      "sourceHash": "545a2e23662fe4758b54316ae8adfa0c7728cc0f0bb9734fe210b3f37e6bb456",
      "text": "جهّز مطالبة الأجور المتأخرة في السعودية بالعقد ومسيرات الرواتب والسجلات البنكية، مع تحديد مسار النزاع والمبالغ المطالب بها."
    }
  },
  "alahlyh-fy-altaaqd-fy-alqanwn-alswry": {
    "excerptEn": {
      "sourceHash": "d41ed845606c98aec1df54f3f243ed7dd5bf2a723fdbe71c1f52825704ba4ae9",
      "text": "Review contractual capacity under Syrian law, including age, discernment and the different effects of acts made by persons with limited capacity."
    },
    "excerptAr": {
      "sourceHash": "6ad7670774464b1b69cd7f3786d344f80c5b6b64afcc424ef23aea5e0da37106",
      "text": "راجع أهلية التعاقد في القانون السوري من حيث السن والتمييز واختلاف أثر التصرفات الصادرة عن ناقص الأهلية."
    },
    "seoDescriptionEn": {
      "sourceHash": "4d6b918df717ff4df28fbc9f206e1ab61b2b977b43e9c1064321ac8cce7813aa",
      "text": "Review contractual capacity under Syrian law, including age, discernment and the different effects of acts made by persons with limited capacity."
    },
    "seoDescriptionAr": {
      "sourceHash": "6c364c74003b415ae7dcba416686bd6b23e144293d90a2f50f86561b4d332ae1",
      "text": "راجع أهلية التعاقد في القانون السوري من حيث السن والتمييز واختلاف أثر التصرفات الصادرة عن ناقص الأهلية."
    }
  },
  "adarh-almkhatr-fy-alaqwd-wfq-alnzam-alsawdy": {
    "excerptEn": {
      "sourceHash": "1ebdc717cd356bcec2247003412c3b37ee8c15408ae033cc42e56d1b1a8d7087",
      "text": "Allocate Saudi commercial contract risks through clear obligations, payment controls, liability provisions and a dispute process suited to the transaction."
    },
    "excerptAr": {
      "sourceHash": "0f4d5dee7dd812198c5cb350be7aa68b6828678c7c2ef4dbefaad9ef3b8433b6",
      "text": "وزع مخاطر العقد التجاري السعودي عبر التزامات واضحة وضوابط للسداد وأحكام للمسؤولية ومسار نزاع مناسب للمعاملة."
    },
    "seoDescriptionEn": {
      "sourceHash": "ec9e0538d9c984b3d7bae0fa44ce46864981131b618287504e204d1e58ff8256",
      "text": "Allocate Saudi commercial contract risks through clear obligations, payment controls, liability provisions and a dispute process suited to the transaction."
    },
    "seoDescriptionAr": {
      "sourceHash": "f21de8705d55c84bfb4e306771b25f3a002b3642764e5d8c85bc2c8cc09bc5de",
      "text": "وزع مخاطر العقد التجاري السعودي عبر التزامات واضحة وضوابط للسداد وأحكام للمسؤولية ومسار نزاع مناسب للمعاملة."
    }
  },
  "altwsyat-alamlyh-lsyaghh-aqd-qwy": {
    "excerptEn": {
      "sourceHash": "bb931a1b2b5fee498b857f035085be3075151e0a0e0a6c1199450410370dfc02",
      "text": "A Saudi contract drafting checklist covering parties, scope, payment, performance evidence, remedies and dispute terms that need transaction-specific wording."
    },
    "excerptAr": {
      "sourceHash": "6ca1abb35fb00b779c5018d88e633d864b1dc2542bf27ce09b748516b8915973",
      "text": "قائمة لصياغة العقد السعودي تشمل الأطراف والنطاق والسداد وأدلة التنفيذ والجزاءات وشروط النزاع التي تستلزم صياغة تناسب المعاملة."
    },
    "seoDescriptionEn": {
      "sourceHash": "4d8d34933be594af781d2c9482856d3a18aed83917b377293e723991063e8fab",
      "text": "A Saudi contract drafting checklist covering parties, scope, payment, performance evidence, remedies and dispute terms that need transaction-specific wording."
    },
    "seoDescriptionAr": {
      "sourceHash": "baec61a4afa5ee7f3d787592ad240a3939f1153972927f780561607ed3bb8fe5",
      "text": "قائمة لصياغة العقد السعودي تشمل الأطراف والنطاق والسداد وأدلة التنفيذ والجزاءات وشروط النزاع التي تستلزم صياغة تناسب المعاملة."
    }
  },
  "alrda-fy-alqanwn-alswry": {
    "excerptEn": {
      "sourceHash": "9a2da676cf05eaeacbb72a6048f3a42bf3edcba9a21e30af0f9165008072a9af",
      "text": "Follow offer and acceptance under Syrian law, including how communications, essential terms and required formalities affect contract formation."
    },
    "excerptAr": {
      "sourceHash": "046a72157515f867504fe094d1e8dbd2a760d320fe077e067021f08b5d892a40",
      "text": "تتبّع الإيجاب والقبول في القانون السوري وأثر المراسلات والعناصر الجوهرية والشكلية المطلوبة في انعقاد العقد."
    },
    "seoDescriptionEn": {
      "sourceHash": "01f7c1278308a779b9568da8da548965a488a76f69eb9dc34511ecf938050933",
      "text": "Follow offer and acceptance under Syrian law, including how communications, essential terms and required formalities affect contract formation."
    },
    "seoDescriptionAr": {
      "sourceHash": "0589e8bf0dd941d86db1c7d6f370a90ad112e6ff1466a2b813bcb94e9f68efa0",
      "text": "تتبّع الإيجاب والقبول في القانون السوري وأثر المراسلات والعناصر الجوهرية والشكلية المطلوبة في انعقاد العقد."
    }
  },
  "athbat-alaqwd-amam-alqda-alsawdy": {
    "excerptEn": {
      "sourceHash": "751f841b939cfe2fa1de27d001c58b13662e8bb107aa7dd7cc758db36a782f07",
      "text": "Compare written, official and digital evidence in Saudi contract disputes, including the writing requirement and its statutory exceptions."
    },
    "excerptAr": {
      "sourceHash": "adbaebbc7a1fddbbb2f1dff51108abd8f372a8622d994358c57a9a2eee087ff5",
      "text": "قارن بين الأدلة الكتابية والرسمية والرقمية في منازعات العقود السعودية، مع بيان اشتراط الكتابة واستثناءاته النظامية."
    },
    "seoDescriptionEn": {
      "sourceHash": "1a68ba39b3701f9bb605d2259ea552438512a39c8a446366c8107f06fc958037",
      "text": "Compare written, official and digital evidence in Saudi contract disputes, including the writing requirement and its statutory exceptions."
    },
    "seoDescriptionAr": {
      "sourceHash": "2d5a4040a13861d79299ebcc7304bf352d64b70ee3b058b5665bab954dedf23e",
      "text": "قارن بين الأدلة الكتابية والرسمية والرقمية في منازعات العقود السعودية، مع بيان اشتراط الكتابة واستثناءاته النظامية."
    }
  },
  "alaqd-fy-alqanwn-alswry": {
    "excerptEn": {
      "sourceHash": "725fba398c7246f9c8accff9fbfdb3522067ce65d4aaab11622f7bf7ebd56bfe",
      "text": "An introduction to contracts in Syrian law: the agreement, its essential elements and the distinction between general rules and specific contract types."
    },
    "excerptAr": {
      "sourceHash": "a50cf31b0178da148d5d1a6158c95e1f893b5b84d783e16a2d1e7479ee682745",
      "text": "مدخل إلى العقد في القانون السوري يشمل الاتفاق وأركانه الأساسية والتمييز بين القواعد العامة والأحكام الخاصة بأنواع العقود."
    },
    "seoDescriptionEn": {
      "sourceHash": "a0c5238ff24dcf7cc7206ca3c6b4d2b133b63cd1b5a154b7e9ebeda7352a357f",
      "text": "An introduction to contracts in Syrian law: the agreement, its essential elements and the distinction between general rules and specific contract types."
    },
    "seoDescriptionAr": {
      "sourceHash": "972673bac5e0f902f508eef071797706ccf13c0f30c10a7c697cff468976eb46",
      "text": "مدخل إلى العقد في القانون السوري يشمل الاتفاق وأركانه الأساسية والتمييز بين القواعد العامة والأحكام الخاصة بأنواع العقود."
    }
  },
  "altawyd-an-alakhlal-balaqd-fy-alqanwn-alswry": {
    "excerptEn": {
      "sourceHash": "93e4eb7e92e17a9b24f87ee5a3d45e05f512907e5f5a2a3474d7a6012159039a",
      "text": "Assess compensation for contractual breach in Syria through loss, causation, notice and the rules governing monetary obligations and judicial assessment."
    },
    "excerptAr": {
      "sourceHash": "3b18a7d0f0113cb4298edafe2270925e96431e98f79d7f45024cf0d3c5b05059",
      "text": "قيّم التعويض عن الإخلال بالعقد في سوريا من خلال الضرر والسببية والإعذار وأحكام الالتزامات النقدية وتقدير المحكمة."
    },
    "seoDescriptionEn": {
      "sourceHash": "e47b14858710b7e9dc82d107a8e6722182a395ccf04ea8b8cfcd41f1c139554c",
      "text": "Assess compensation for contractual breach in Syria through loss, causation, notice and the rules governing monetary obligations and judicial assessment."
    },
    "seoDescriptionAr": {
      "sourceHash": "d4ad9d758117fba09d670fc876636f9c1caf27c1e33aae8520a5f62c055ab5e4",
      "text": "قيّم التعويض عن الإخلال بالعقد في سوريا من خلال الضرر والسببية والإعذار وأحكام الالتزامات النقدية وتقدير المحكمة."
    }
  },
  "aqwd-alamtyaz-altjary-alfrnshayz-fy-alnzam-alsawdy": {
    "excerptEn": {
      "sourceHash": "9d150605a496deffe70f1bde3f42a158fcd7446d4c652847ad5644dbf534b8ae",
      "text": "Review Saudi franchise disclosure, registration, operating obligations and termination risks before signing or making a franchise payment."
    },
    "excerptAr": {
      "sourceHash": "424488c5206e387271cf3c1667941d55073ef6ff95147e9c86c33576b79f0d5c",
      "text": "راجع إفصاح الامتياز التجاري السعودي وتسجيله والتزامات التشغيل ومخاطر الإنهاء قبل التوقيع أو دفع مقابل الامتياز."
    },
    "seoDescriptionEn": {
      "sourceHash": "6374e659fe4ce13133f1a369c2e51f0b00ff61529e992d00b74745bd1f416d34",
      "text": "Review Saudi franchise disclosure, registration, operating obligations and termination risks before signing or making a franchise payment."
    },
    "seoDescriptionAr": {
      "sourceHash": "54300bee7b89d5b417a4aa2be62c44daed91688a41eb68b8b96a766399ea9b41",
      "text": "راجع إفصاح الامتياز التجاري السعودي وتسجيله والتزامات التشغيل ومخاطر الإنهاء قبل التوقيع أو دفع مقابل الامتياز."
    }
  },
  "aqwd-alwkalat-altjaryh-fy-alnzam-alsawd": {
    "excerptEn": {
      "sourceHash": "6a91c52c6a0299aa64ae1749af5f81266b501e7a64a3939def90e3ea99ec9046",
      "text": "Understand Saudi commercial agency eligibility and registration alongside the agreement’s territory, payment, performance and termination provisions."
    },
    "excerptAr": {
      "sourceHash": "7c812b68aa372a0039dade040fcf36967f5d9eccc809bf2b2b72b37fee8af63e",
      "text": "تعرّف إلى أهلية الوكالة التجارية السعودية وتسجيلها، إلى جانب نطاق الاتفاق والسداد والتنفيذ وأحكام الإنهاء."
    },
    "seoDescriptionEn": {
      "sourceHash": "5470df5c65561213ec7a3163d3c7a2ba7ab3f940944ad852bf20baec2b257bb9",
      "text": "Understand Saudi commercial agency eligibility and registration alongside the agreement’s territory, payment, performance and termination provisions."
    },
    "seoDescriptionAr": {
      "sourceHash": "c6cf6d6b6186ef542942b91a187e702a361903b80a81d74b77f5053c3ec3a8c9",
      "text": "تعرّف إلى أهلية الوكالة التجارية السعودية وتسجيلها، إلى جانب نطاق الاتفاق والسداد والتنفيذ وأحكام الإنهاء."
    }
  },
  "almswwlyh-alaqdyh-fy-alqanwn-alswry": {
    "excerptEn": {
      "sourceHash": "cf2572c63cf806efcfc4bbcaebb682c7e37973967fd5539bee1c3d8b8d97eba5",
      "text": "Identify the obligation, breach, loss and causal link in a Syrian contractual liability claim, including when notice and available remedies matter."
    },
    "excerptAr": {
      "sourceHash": "15dce3524e2526874410a1e3f3945c5176b83d2da5eb6216a4484ff37ca76045",
      "text": "حدد الالتزام والإخلال والضرر والسببية في دعوى المسؤولية العقدية السورية، مع مراعاة الإعذار ووسائل المعالجة المتاحة."
    },
    "seoDescriptionEn": {
      "sourceHash": "47614e971ae594f32a8c232726d9aba8cf0f1ec0b61585ab306e9f5472bf2d89",
      "text": "Identify the obligation, breach, loss and causal link in a Syrian contractual liability claim, including when notice and available remedies matter."
    },
    "seoDescriptionAr": {
      "sourceHash": "a9d5c1d91bab338bde36a944cbc536f50f612b883f5e3682543497bd328f308a",
      "text": "حدد الالتزام والإخلال والضرر والسببية في دعوى المسؤولية العقدية السورية، مع مراعاة الإعذار ووسائل المعالجة المتاحة."
    }
  },
  "aqwd-almqawlat-fy-alnzam-alsawdy": {
    "excerptEn": {
      "sourceHash": "405f131abcffb43da1f31f32e7a39fe361ed424a3518f056dcf5563d4c28fd6b",
      "text": "Examine Saudi construction disputes through scope, variations, payment, delay and performance evidence, with attention to the competent dispute forum."
    },
    "excerptAr": {
      "sourceHash": "ab1e7302b7dcbf30cb8ac9474b4805013696198b6d341108bf3e77bbd7ba54a2",
      "text": "افحص منازعات المقاولات السعودية من خلال النطاق والتغييرات والمستحقات والتأخير وأدلة التنفيذ، مع تحديد جهة الفصل المختصة."
    },
    "seoDescriptionEn": {
      "sourceHash": "0a6002f7fe01e87a4e1f219487df3de73ece889915f44a6a1f2e3d20d3d87c70",
      "text": "Examine Saudi construction disputes through scope, variations, payment, delay and performance evidence, with attention to the competent dispute forum."
    },
    "seoDescriptionAr": {
      "sourceHash": "9b6b49391c925469bc40252160666d0aa8a62b313d4b969216a65d0135e980b7",
      "text": "افحص منازعات المقاولات السعودية من خلال النطاق والتغييرات والمستحقات والتأخير وأدلة التنفيذ، مع تحديد جهة الفصل المختصة."
    }
  },
  "performance-of-contracts-in-good-faith-under-syrian-law": {
    "excerptEn": {
      "sourceHash": "ec8d3aeddfed7c40add58dde1f728e594530864d682178231ace16058a6e83dd",
      "text": "Explore good-faith contract performance in Syria, including cooperation, established usage and interpretation within the limits of the agreed obligations."
    },
    "excerptAr": {
      "sourceHash": "6ca210ab6cccb96ae7d9ba74fa1daba878959a36e0c8a593efa14493f42a01f7",
      "text": "تعرّف إلى تنفيذ العقد بحسن نية في سوريا، بما يشمل التعاون والعرف والتفسير ضمن حدود الالتزامات المتفق عليها."
    },
    "seoDescriptionEn": {
      "sourceHash": "d4d219b8f89846ad2f1c773766e6e9c9d9057c2a0ec241c4d3581050abf05f8e",
      "text": "Explore good-faith contract performance in Syria, including cooperation, established usage and interpretation within the limits of the agreed obligations."
    },
    "seoDescriptionAr": {
      "sourceHash": "64b2bae244b698514cfaeb3374439c4374ef850def132ebe20d37806287ac9e6",
      "text": "تعرّف إلى تنفيذ العقد بحسن نية في سوريا، بما يشمل التعاون والعرف والتفسير ضمن حدود الالتزامات المتفق عليها."
    }
  },
  "commercial-supply-contracts-in-saudi": {
    "excerptEn": {
      "sourceHash": "4ea62d2eb92102a2c084910e715a0d4c9eb5b2d431d7ac9a4ec3d6e649e29861",
      "text": "Review Saudi supply terms for specifications, delivery, acceptance, payment and disruption, and preserve the records needed to assess breach."
    },
    "excerptAr": {
      "sourceHash": "279c6ac1cbf08805fa92eb7008ff106761ef7762550e09d23c5f19085dd06038",
      "text": "راجع شروط التوريد السعودية للمواصفات والتسليم والقبول والسداد والتعطل، واحفظ المستندات اللازمة لتقييم الإخلال."
    },
    "seoDescriptionEn": {
      "sourceHash": "24beab1e1b41188d92d21ff49737a45ec932342da23a6df4a0af0425bd9bc5fe",
      "text": "Review Saudi supply terms for specifications, delivery, acceptance, payment and disruption, and preserve the records needed to assess breach."
    },
    "seoDescriptionAr": {
      "sourceHash": "0865052692267068bb24fdb0b38ffd27a182e7f90170a8f0c6a7a9ae1b9d16c8",
      "text": "راجع شروط التوريد السعودية للمواصفات والتسليم والقبول والسداد والتعطل، واحفظ المستندات اللازمة لتقييم الإخلال."
    }
  },
  "contract-interpretation-syrian-courts": {
    "excerptEn": {
      "sourceHash": "fde22a347040420a8f4dde72c8e28b91c39e37bb54972f45185f4d3769abc76d",
      "text": "How Syrian contract interpretation considers clear wording, common intention, the agreement as a whole, custom and unresolved doubt."
    },
    "excerptAr": {
      "sourceHash": "df2e50249656c2a0c0ed40b56f896ba62012ab0fe4416ab95034b00a13e80275",
      "text": "كيف يراعي تفسير العقد السوري وضوح العبارة والإرادة المشتركة والعقد ككل والعرف والشك الذي يبقى بعد تطبيق قواعد التفسير."
    },
    "seoDescriptionEn": {
      "sourceHash": "f857505784be79e1d3c8ab98a2f1122f6f8482fdf88169c88a14f94024292400",
      "text": "How Syrian contract interpretation considers clear wording, common intention, the agreement as a whole, custom and unresolved doubt."
    },
    "seoDescriptionAr": {
      "sourceHash": "74dc85750a99d236158d41b1cc773d6680ce33f6db1741928ccddd1fdc58e4c4",
      "text": "كيف يراعي تفسير العقد السوري وضوح العبارة والإرادة المشتركة والعقد ككل والعرف والشك الذي يبقى بعد تطبيق قواعد التفسير."
    }
  },
  "e-contracts-legal-validity-saudi-arabia": {
    "excerptEn": {
      "sourceHash": "68a8fa23a84a252b74f7a9b34443f1e19c2f0ca76f1edb3762eb54c42e28ddd3",
      "text": "Check electronic contract formation and proof in Saudi Arabia through consent, attribution, record integrity and preservation of digital evidence."
    },
    "excerptAr": {
      "sourceHash": "435d52263b86f3c36311100fc34deed25a55d1f0c6627e3ccbd14287135f9025",
      "text": "افحص انعقاد العقد الإلكتروني وإثباته في السعودية من خلال الرضا ونسبة التصرف وسلامة السجلات وحفظ الدليل الرقمي."
    },
    "seoDescriptionEn": {
      "sourceHash": "6d4321e5ef87adf6307dbb1b29a1c54c67ef3f657aff5bfb9477c16045217627",
      "text": "Check electronic contract formation and proof in Saudi Arabia through consent, attribution, record integrity and preservation of digital evidence."
    },
    "seoDescriptionAr": {
      "sourceHash": "8b3a0e361cf41a31ae4516ac86cd9b621eb4ca8183be5cbd79a545bcfe761f54",
      "text": "افحص انعقاد العقد الإلكتروني وإثباته في السعودية من خلال الرضا ونسبة التصرف وسلامة السجلات وحفظ الدليل الرقمي."
    }
  },
  "fskh-alaqd-altjary-fy-alnzam-alsawdy": {
    "excerptEn": {
      "sourceHash": "6dd4ee5e280e9dd811e80934ebd144b7d39a937015b1874a395a40933ec21958",
      "text": "Assess Saudi commercial contract termination through breach, notice, cure, evidence and the effects on accrued rights and continuing obligations."
    },
    "excerptAr": {
      "sourceHash": "62e2864733ce42496b0dd2588392d720e0e739ee92770c0e531c484d8480ecda",
      "text": "قيّم فسخ العقد التجاري السعودي من خلال الإخلال والإعذار والمعالجة والأدلة وأثر الفسخ في الحقوق السابقة والالتزامات المستمرة."
    },
    "seoDescriptionEn": {
      "sourceHash": "533ec88c418bbc1f0ba9ccbc6ff577d581d5fc31b4f85c413612627bcd9d82ac",
      "text": "Assess Saudi commercial contract termination through breach, notice, cure, evidence and the effects on accrued rights and continuing obligations."
    },
    "seoDescriptionAr": {
      "sourceHash": "ee08604b31af9da12a014e40e0da466f168814314c9359947e797c6d9952a5e9",
      "text": "قيّم فسخ العقد التجاري السعودي من خلال الإخلال والإعذار والمعالجة والأدلة وأثر الفسخ في الحقوق السابقة والالتزامات المستمرة."
    }
  },
  "defects-of-will-syrian-law": {
    "excerptEn": {
      "sourceHash": "19a858f98a6092020213bce33b26a8a8655f7b232c3fa0b3263beb3c1f8a6b58",
      "text": "Compare mistake, fraud, duress and exploitation under Syrian contract law, including the conditions and evidence for seeking annulment or other relief."
    },
    "excerptAr": {
      "sourceHash": "2aad9fe29306ab805e2607e1fb45571612eed00e473e24a695ecfdce53ab2e6c",
      "text": "قارن بين الغلط والتدليس والإكراه والاستغلال في القانون السوري، مع فحص شروط وأدلة طلب الإبطال أو المعالجة القانونية الأخرى."
    },
    "seoDescriptionEn": {
      "sourceHash": "61bcbbc29e918b5c8383d4349f0d17548e60317fa982e3a317a7ab46f36db71f",
      "text": "Compare mistake, fraud, duress and exploitation under Syrian contract law, including the conditions and evidence for seeking annulment or other relief."
    },
    "seoDescriptionAr": {
      "sourceHash": "b24a9142004a6be8ec632221d4e97246bb0bc6609dfa1639c627bd4b5519934a",
      "text": "قارن بين الغلط والتدليس والإكراه والاستغلال في القانون السوري، مع فحص شروط وأدلة طلب الإبطال أو المعالجة القانونية الأخرى."
    }
  },
  "consensual-formal-real-contracts-syrian-law": {
    "excerptEn": {
      "sourceHash": "7c624ce512a966215fdd55b7c89f9f54f7cf04f26d76ef88d6f44d37086aeeff",
      "text": "Distinguish consensual, formal and real contracts in Syria by checking whether agreement, a required form or delivery completes the specific transaction."
    },
    "excerptAr": {
      "sourceHash": "7bb55fbc1234ef68e888e5045bff4731c05011ce34f72a2cf798da20fe6539c9",
      "text": "ميّز بين العقود الرضائية والشكلية والعينية في سوريا بفحص دور الاتفاق والشكل المطلوب والتسليم في إتمام التصرف المحدد."
    },
    "seoDescriptionEn": {
      "sourceHash": "0199dc455771b47549c66740fb4db2651fc747fc05ddd84a2935338cacb77d12",
      "text": "Distinguish consensual, formal and real contracts in Syria by checking whether agreement, a required form or delivery completes the specific transaction."
    },
    "seoDescriptionAr": {
      "sourceHash": "e3ee00c13243075fc27a6cd18a0422eb183c69880152ce739b669d06bd1b09fd",
      "text": "ميّز بين العقود الرضائية والشكلية والعينية في سوريا بفحص دور الاتفاق والشكل المطلوب والتسليم في إتمام التصرف المحدد."
    }
  },
  "contractual-liability-in-commercial-transactions": {
    "excerptEn": {
      "sourceHash": "452918b63e11f38c74f1278f6642c099002523086a8105626123fea930660383",
      "text": "Understand Saudi contractual liability through breach, compensation, agreed damages and the distinction between claiming the price and claiming loss."
    },
    "excerptAr": {
      "sourceHash": "1ae7116fa579f8b571872dd146733acb24c202c864ee65027c6f92b1f7dadd22",
      "text": "تعرّف إلى المسؤولية العقدية السعودية من خلال الإخلال والتعويض والتعويض الاتفاقي والتمييز بين المطالبة بالثمن والمطالبة بالضرر."
    },
    "seoDescriptionEn": {
      "sourceHash": "42f5e6de68c804ce5172c163c717663d43d05602a29ae45bac2408623785d86a",
      "text": "Understand Saudi contractual liability through breach, compensation, agreed damages and the distinction between claiming the price and claiming loss."
    },
    "seoDescriptionAr": {
      "sourceHash": "4e705baa121e5501e42806e863fc0386c81974503898d6ce9439f473d8efdbc3",
      "text": "تعرّف إلى المسؤولية العقدية السعودية من خلال الإخلال والتعويض والتعويض الاتفاقي والتمييز بين المطالبة بالثمن والمطالبة بالضرر."
    }
  },
  "formation-of-commercial-contracts-saudi-law": {
    "excerptEn": {
      "sourceHash": "1a9b254c43f53bfb0c1fa9235aa063d1c6a8e2596846b4c95e88270e9a98bd68",
      "text": "Check the formation of a Saudi commercial contract through offer, acceptance, capacity and essential terms, while separating validity from evidentiary requirements."
    },
    "excerptAr": {
      "sourceHash": "4d6b556ba7d731ce91680449cef41509f5bd91d8ef717b52ed90969f22f65567",
      "text": "افحص تكوين العقد التجاري السعودي من خلال الإيجاب والقبول والأهلية والعناصر الجوهرية، مع التمييز بين الصحة ومتطلبات الإثبات."
    },
    "seoDescriptionEn": {
      "sourceHash": "d86fe1ee672e9c110eaa18af00d596fbd20cf34877fc9da0f184f2b3e0cbf7bf",
      "text": "Check the formation of a Saudi commercial contract through offer, acceptance, capacity and essential terms, while separating validity from evidentiary requirements."
    },
    "seoDescriptionAr": {
      "sourceHash": "f85b7b4e3db7c2747d6b889bba14a7e135dbad7e13e02052ebd92c5ca651ce8a",
      "text": "افحص تكوين العقد التجاري السعودي من خلال الإيجاب والقبول والأهلية والعناصر الجوهرية، مع التمييز بين الصحة ومتطلبات الإثبات."
    }
  },
  "Penalty-clause-in-saudi": {
    "excerptEn": {
      "sourceHash": "99cf594150372232a1f59eb8d605cf94fd97a5e43cfed406ba31c6b9e94ae3e4",
      "text": "Review Saudi penalty clauses under the Civil Transactions Law, including judicial adjustment and the exclusion of advance compensation for monetary obligations."
    },
    "excerptAr": {
      "sourceHash": "c15fd6ab71e19d16ede2001560dfb098e879d218aa8d66db6331053128d2555a",
      "text": "راجع الشرط الجزائي في نظام المعاملات المدنية السعودي، بما يشمل التعديل القضائي واستثناء الالتزام النقدي من التعويض المحدد مقدماً."
    },
    "seoDescriptionEn": {
      "sourceHash": "1d0432773f67b5469c3ebc271cbed1dec51bf66c53bcd1a971451cefadb918b2",
      "text": "Review Saudi penalty clauses under the Civil Transactions Law, including judicial adjustment and the exclusion of advance compensation for monetary obligations."
    },
    "seoDescriptionAr": {
      "sourceHash": "a6f16103f4c7db2438b480dcb9d4ea78b2f7615c387011502d1e27eab02a78cf",
      "text": "راجع الشرط الجزائي في نظام المعاملات المدنية السعودي، بما يشمل التعديل القضائي واستثناء الالتزام النقدي من التعويض المحدد مقدماً."
    }
  }
};

export function correctArticleSnippets<T extends { slug: string }>(post: T): T {
  const corrections = ARTICLE_SNIPPET_CORRECTIONS[post.slug];
  if (!corrections) return post;
  const fields = post as Record<string, unknown>;
  const replacements = Object.fromEntries(Object.entries(corrections).filter(([field, fix]) => typeof fields[field] === "string" && createHash("sha256").update(fields[field] as string).digest("hex") === fix.sourceHash).map(([field, fix]) => [field, fix.text]));
  return { ...post, ...replacements };
}
