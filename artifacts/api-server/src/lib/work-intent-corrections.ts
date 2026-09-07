import { createHash } from "node:crypto";

// Exact published fields reviewed for outcome-stage clarity; preserve later CMS edits.
const CORRECTIONS: Record<string, Record<string, { sourceHash: string; value: string }>> = {
  "kyf-saadt-kawnslw-fy-astrdad-300000-ryal-abr-slh-qdayy-fy-nzaa-tjary": {
    "seoDescriptionEn": {
      "sourceHash": "94093f12d710389ffbb4e165fbe43db83d215bbd7d4164463258ad1c935f7335",
      "value": "A commercial settlement case: reviewing an unrealised investment contribution, documenting mutual concessions and recording the return of SAR 300,000."
    }
  },
  "astratyjyh-kawnslw-lastrdad-sndat-lamr-bqymh-17-mlywn-ryal": {
    "titleEn": {
      "sourceHash": "ade24ec9e8acad1decdfe38439401d7b5f183e54678b72dc6d3f7c4685842b5d",
      "value": "Order to Return 16 Promissory Notes with a Face Value over SAR 17 Million"
    },
    "titleAr": {
      "sourceHash": "1090838b7be2f567255994cb42db7d4f05bda2ae5aaa0de7755e800b998a3b4d",
      "value": "حكم بتسليم 16 سنداً لأمر تتجاوز قيمتها الاسمية 17 مليون ريال"
    },
    "seoTitleEn": {
      "sourceHash": "519a3d86f7b5904f60857c3b4d0aafe45090ba33941dcf4cc148b99f293c2961",
      "value": "Order to Return 16 Promissory Notes | CounselO"
    },
    "seoTitleAr": {
      "sourceHash": "db44f27e2a1ca21da48de23f273ff489d7e32dcb4f541ff9185f29d00113fb38",
      "value": "حكم بتسليم 16 سنداً لأمر | كاونسلو"
    },
    "seoDescriptionEn": {
      "sourceHash": "076ced75431f41f194e1003b25a90e0b6716d826c2ace62040a6c96ea5c3652d",
      "value": "A Saudi case distinguishing the actual debt from the face value of 16 promissory notes and obtaining an order to return their originals."
    },
    "seoDescriptionAr": {
      "sourceHash": "151de7b1148c9fcdd5039ab979d06b1936978fa86876a0174ac7ae6ef88c9c90",
      "value": "قضية سعودية تميز الدين الفعلي عن القيمة الاسمية لستة عشر سنداً لأمر، مع صدور حكم بتسليم أصولها."
    },
    "summaryEn": {
      "sourceHash": "9f5b4280b941876de0095e5099a778dca37df904ab9de8a78c04fe9b966f769e",
      "value": "CounselO analysed 16 promissory notes with a face value exceeding SAR 17 million against their underlying contract and accounts. The published case records entitlement of SAR 334,143 under the note in enforcement and an order to deliver all 16 originals. The face value is not money recovered; the order and its implementation are distinct stages."
    },
    "summaryAr": {
      "sourceHash": "1ee014137b05673940844b40d452eadf5833ee6664d9d7dc804f2c039f56706d",
      "value": "حللت كاونسلو ستة عشر سنداً لأمر تتجاوز قيمتها الاسمية 17 مليون ريال في ضوء العقد والحسابات. يورد ملخص القضية تحديد الاستحقاق في السند محل التنفيذ بمبلغ 334,143 ريالاً والحكم بتسليم الأصول الستة عشر. القيمة الاسمية ليست مبلغاً محصلاً؛ وصدور الحكم وتنفيذه مرحلتان مختلفتان."
    },
    "outcomeEn": {
      "sourceHash": "d0756fe5d25023b0da66ebb3371ebf5d496ce5993da910dd5280d56dd5e23615",
      "value": "The Outcome\nThe matter concluded with a significant result for the client. The court did not treat the notes as an open-ended enforcement threat for their full face value; instead, the dispute was narrowed to its true scope and connected to the underlying contractual relationship.\n\nThis resulted in:\n\n- The actual entitlement under the note subject to enforcement being determined as only SAR 334,143, rather than leaving the client exposed to a higher enforcement claim.\n- The other party being found not entitled to any amount exceeding this figure under the note subject to enforcement.\n- The other party being ordered to deliver the originals of all 16 promissory notes, providing a judicial basis to seek their return; implementation of that order must be established separately.\n- A matter with a face value exceeding SAR 17 million being converted into a dispute limited to its true scope, followed by an order addressing the principal risk identified in the file.\n\nThe Value Delivered by CounselO\nIn this matter, CounselO delivered strategic value beyond the limits of conventional legal advice. It moved the case from a mere reaction to dangerous enforcement notes to an integrated legal plan that redefined the dispute at its source.\n\nThe value delivered included:\n\n- Dissecting the real risk: the risk was not merely the financial claim, but the continued existence of 16 promissory notes capable of enforcement for a value exceeding SAR 17 million.\n- Rebuilding the client’s position: from a debtor threatened by substantial commercial paper to a party disputing the actual amount of the obligation based on the contract and documents.\n- Reconnecting the notes to their contractual basis: ensuring that they were not treated as independent debts, but as security connected to a contractual relationship whose effects had to be determined first.\n- Directing the pleadings to the decisive point: determining the actual debt, which removed the justification for retaining all the notes.\n- Using accounting expertise in support of the strategy: separating the actual account from the notes’ face value and the disputed amounts.\n- Converting the financial result into a practical judicial request: recovery of the note originals after the justification for retaining them had ceased.\n\nConclusion:\nCounselO did not merely manage a legal defence; it re-engineered the matter in full—from substantial enforcement risk to a dispute of defined scope, and from notes threatening the client to a judgment requiring their recovery."
    },
    "outcomeAr": {
      "sourceHash": "ef72a93194b876a6a250351587f6f05c6ee991b242e04e89ab94da9c9b6cf435",
      "value": "النتيجة\nانتهى الملف إلى نتيجة جوهرية لصالح العميل؛ إذ لم تتعامل المحكمة مع السندات باعتبارها تهديدًا تنفيذيًا مفتوحًا بكامل قيمتها الاسمية، بل تم تضييق النزاع إلى نطاقه الحقيقي وربطه بأصل العلاقة التعاقدية.\nوقد ترتب على ذلك:\n\nتحديد الاستحقاق الفعلي في السند محل التنفيذ بمبلغ 334,143 ريالًا فقط، بدلًا من بقاء العميل تحت ضغط مطالبة تنفيذية أعلى.\nعدم استحقاق الطرف الآخر لما زاد على هذا المبلغ في السند محل التنفيذ.\nالحكم بإلزام الطرف الآخر بتسليم أصول السندات لأمر الستة عشر، بما وفر أساساً قضائياً لطلب استردادها؛ ويُثبت تنفيذ الحكم بصورة مستقلة.\nتحويل ملف كانت قيمته الاسمية تتجاوز 17 مليون ريال إلى نزاع محدد في نطاقه الحقيقي، ثم إلى حكم يعالج الخطر الأساسي المحدد في الملف.\n\nالقيمة التي قدمتها كاونسلو\nقدّمت كاونسلو في هذا الملف قيمة استراتيجية تتجاوز حدود الرأي القانوني التقليدي؛ فقد نقلت التعامل مع القضية من مجرد رد فعل على سندات تنفيذية خطرة إلى خطة قانونية متكاملة لإعادة تعريف النزاع من جذوره.\nتمثلت القيمة المقدمة في:\n\nتفكيك الخطر الحقيقي: لم يكن الخطر في المطالبة المالية وحدها، بل في بقاء 16 سندًا لأمر قابلة للاستخدام التنفيذي بقيمة تتجاوز 17 مليون ريال.\nإعادة بناء مركز العميل: من مدين مهدد بأوراق تجارية ضخمة إلى طرف ينازع في مقدار الالتزام الحقيقي استنادًا إلى العقد والمستندات.\nربط السندات بسببها التعاقدي: بحيث لا تُعامل كديون مستقلة، بل كضمانات مرتبطة بعلاقة تعاقدية يجب تحديد آثارها أولًا.\nتوجيه المرافعة إلى نقطة الحسم: وهي أن تحديد الدين الحقيقي يسقط مبرر الاحتفاظ بكامل السندات.\nتوظيف الخبرة المحاسبية لصالح الاستراتيجية: عبر فصل الحساب الفعلي عن القيمة الاسمية للسندات والمبالغ المتنازع عليها.\nتحويل النتيجة المالية إلى طلب قضائي عملي: وهو استرداد أصول السندات بعد انتفاء مبرر الاحتفاظ بها.\nالخلاصة:\nكاونسلو لم تكتفِ بإدارة دفاع قانوني، بل أعادت هندسة الملف بالكامل: من خطر تنفيذي ضخم إلى نزاع محدد، ومن سندات تهدد العميل إلى حكم باستردادها."
    }
  },
  "tfkyk-mstndat-altmas-aaadh-alnzr-bnjah": {
    "outcomeEn": {
      "sourceHash": "95387c88222de4c0d2288dc68cc710f4f000fb2b15b573f9b28cd5fbc988aa9e",
      "value": "Outcome:  \nThe court accepted the petition for reconsideration in form but rejected it on the merits, lifted the stay of enforcement of the prior judgment, and thereby restored the original judgment’s enforceable effect in favor of the client. The court also ordered the petitioner to pay SAR 23,000 in expert fees incurred by the claimant.\n\nValue:  \nCounselO provided practical value by preserving the original judicial outcome after the petition was admitted procedurally and examined on its merits, dismantling the documents relied upon by the petitioner, and connecting the legal issues with the technical expertise while highlighting the distinction between liability for defective performance and supervisory liability. This helped uphold the judicial outcome and preserve the client’s rights under the judgment issued in its favor."
    },
    "outcomeAr": {
      "sourceHash": "7b5aa9311ce9d418d3015d5be234491e2ada6bf3b1367f63fb2355435a7adba9",
      "value": "النتيجة:  \nانتهت المحكمة إلى قبول التماس إعادة النظر شكلاً ورفضه موضوعاً، مع رفع وقف تنفيذ الحكم السابق، بما أعاد للحكم الأصلي أثره التنفيذي لصالح العميل. كما ألزمت المحكمة الطرف الملتمس بدفع مبلغ 23,000 ريال قيمة أتعاب الخبرة التي تحملتها المدعية.\n\nالقيمة:  \nقدمت كاونسلو قيمة عملية تمثلت في تثبيت النتيجة القضائية الأصلية بعد قبول الالتماس شكلاً وفحص أسبابه موضوعاً، وتفكيك المستندات التي استند إليها الملتمس، وربط الجوانب القانونية بالخبرة الفنية، مع إبراز الفرق بين مسؤولية التنفيذ ومسؤولية الإشراف. وساعد ذلك في تثبيت النتيجة القضائية والمحافظة على حق العميل في الحكم الصادر لصالحه."
    }
  },
  "fskh-aqd-iyjar-tjary-bsbb-khta-byanat-mnsh-iyjar": {
    "challengeAr": {
      "sourceHash": "eebdd63802dc957a4c8a89dc3c7b351be00b0b8be86e5cb17b0c1f6b24c29cf6",
      "value": "المسألة:  \nوجود خطأ جوهري في بيانات عقد الإيجار الموثق على منصة «إيجار»، إذ سُجل العقار كوحدة واحدة رغم أنه يتكون فعليًا من ثماني وحدات تجارية، مما منع المستأجرة من الانتفاع الكامل بالعقار وتأجيره من الباطن وفق الغرض المتفق عليه.\n\nالتحدي:  \nتعذر على الأطراف في هذه القضية تعديل بيانات العقد الموثق، واستمرار التزام المستأجرة بسداد الأجرة عن كامل العقار رغم عدم قدرتها على استثمار جميع الوحدات، مما استدعى البحث عن مسار قانوني يحقق فسخ العقد ويحفظ الحقوق المالية."
    }
  }
};

export function correctWorkIntentFields<T extends { slug: string }>(sample: T): T {
  const corrections = CORRECTIONS[sample.slug];
  if (!corrections) return sample;
  const result = { ...sample } as Record<string, unknown>;
  for (const [field, correction] of Object.entries(corrections)) {
    const current = typeof result[field] === "string" ? result[field] as string : "";
    if (createHash("sha256").update(current).digest("hex") === correction.sourceHash) result[field] = correction.value;
  }
  return result as T;
}
