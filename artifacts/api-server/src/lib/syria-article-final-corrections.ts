const CIVIL_TEXT = "https://www.wipo.int/wipolex/ar/legislation/details/10917";
const OATH = "hdwd-alymyn-alhasmh-fy-alathbat-almdny-swry";
const UNIDENTIFIED_REFERENCES: Record<string, [string, string]> = {
  "alahlyh-fy-altaaqd-fy-alqanwn-alswry": [
    "Syrian Court of Cassation precedents concerning the effect of limited capacity on the validity of legal acts.",
    "اجتهادات محكمة النقض السورية المتعلقة بأثر نقص الأهلية في صحة التصرفات القانونية."
  ],
  "alaqd-fy-alqanwn-alswry": [
    "Decisions of the Syrian Court of Cassation on the general principles of contracts.",
    "اجتهادات محكمة النقض السورية في المبادئ العامة للعقود."
  ],
  "alrda-fy-alqanwn-alswry": [
    "Syrian Court of Cassation precedents concerning offer, acceptance, and contract formation.",
    "اجتهادات محكمة النقض السورية المتعلقة بالإيجاب والقبول وانعقاد العقد."
  ],
  "mhl-alaqd-fy-alqanwn-alswry": [
    "Syrian judicial principles concerning the possibility, specification, and lawfulness of subject matter.",
    "المبادئ القضائية السورية المتعلقة بإمكان المحل وتعيينه ومشروعيته."
  ]
};

/** Passage-level editorial corrections; no claim to a current consolidated Syrian code. */
export function correctSyriaArticleFinal(slug: string, lang: "en" | "ar", html: string): string {
  const en = lang === "en";
  let result = html;
  const reference = UNIDENTIFIED_REFERENCES[slug];
  if (reference) {
    result = result.replaceAll(reference[en ? 0 : 1], en
      ? "Case-law verification: no individually identified judgment supports this general reference; the discussion is editorial analysis of the cited statutory text."
      : "توثيق الاجتهاد: لا يسند هذه الإحالة العامة حكم محدد بذاته؛ والنقاش تحليل تحريري للنص التشريعي المشار إليه.");
  }
  if (slug === "alaqd-fy-alqanwn-alswry") {
    result = result.replaceAll(
      "Legal scholarship and the decisions of the Syrian Court of Cassation have also contributed to developing and interpreting principles relating to contracts, thereby ensuring stability in transactions and protecting the legitimate expectations of contracting parties.",
      "The discussion below explains general contract principles as editorial analysis; it does not establish a particular Court of Cassation holding."
    ).replaceAll(
      "كما أسهم الفقه واجتهادات محكمة النقض السورية في تطوير المبادئ المتعلقة بالعقود وتفسيرها، بما يحقق استقرار المعاملات ويحمي الثقة المشروعة بين المتعاقدين.",
      "ويشرح النقاش الآتي المبادئ العامة للعقود بوصفه تحليلاً تحريرياً، دون إثبات اتجاه محدد لمحكمة النقض."
    ).replaceAll("مع الإشارة إلى المبادئ التي استقر عليها القضاء والفقه.", "مع بيان الأساس التشريعي للتحليل دون نسبة اتجاه قضائي غير موثق.");
  }
  if (slug === "alrda-fy-alqanwn-alswry") {
    result = result.replaceAll(
      "However, legal scholarship and case law have settled on exceptional cases in which silence may convey acceptance, where this can be inferred from the nature of the dealing, custom, the parties' prior relationship, or special circumstances that make silence indicative of consent.",
      "Whether silence conveys acceptance requires examination of the applicable statutory exception and the circumstances of the dealing, including any relevant prior relationship or custom."
    ).replaceAll(
      "غير أن الفقه والقضاء استقرا على وجود حالات استثنائية قد يحمل فيها السكوت معنى القبول، إذا استخلص ذلك من طبيعة التعامل أو العرف أو العلاقة السابقة بين الطرفين أو من ظروف خاصة تجعل السكوت دالًا على الرضا.",
      "وتحتاج دلالة السكوت على القبول إلى فحص الاستثناء التشريعي المنطبق وظروف التعامل، بما يتصل بها من علاقة سابقة أو عرف."
    );
  }
  if (slug === "contract-interpretation-syrian-courts") {
    result = result.replaceAll("وقد استقر الفقه والقضاء على أن حسن النية يمثل معياراً أساسياً في تحديد نطاق الالتزامات العقدية.", "يعرض هذا المقال أثر حسن النية في نطاق الالتزامات بالرجوع إلى النص المدني المنشور، دون نسبة هذه العبارة إلى حكم قضائي محدد.");
  }
  if (["alrda-fy-alqanwn-alswry", "mhl-alaqd-fy-alqanwn-alswry"].includes(slug) && !result.includes(CIVIL_TEXT)) {
    result += en
      ? `<p>Text reference: <a href="${CIVIL_TEXT}">Syrian Civil Code, 1949, WIPO Lex</a>. This published version is not confirmation of a current consolidated text or every later amendment.</p>`
      : `<p>مرجع النص: <a href="${CIVIL_TEXT}">القانون المدني السوري لعام 1949، ويبو لكس</a>. لا يثبت هذا الإصدار المنشور اكتمال النص الموحّد النافذ أو جميع تعديلاته اللاحقة.</p>`;
  }
  if (slug === OATH) {
    result = result.replaceAll(
      "A distinction must therefore be made between the principle being established in multiple legal references and the existence of an official digital copy.",
      "Those secondary attributions do not authenticate the original judgments or establish the current operative rule."
    ).replaceAll(
      "ولذلك يتعين التمييز بين ثبوت المبدأ الاجتهادي في المراجع القانونية المتعددة وبين وجود نسخة رقمية رسمية من أصل القرار.",
      "ولا توثق هذه النقول الثانوية أصل الأحكام أو تثبت وحدها الحكم القانوني النافذ حالياً."
    );
    const marker = en ? "Basis of the historical case discussion" : "أساس مناقشة الأحكام التاريخية";
    if (!result.includes(marker)) {
      result = (en
        ? `<h2>${marker}</h2><p>The following account analyses decisions attributed in the article’s cited secondary collections to the Syrian Court of Cassation. Original official copies of the 1963, 1982 and 2008 judgments have not been verified. References below to what the court held describe those reported accounts, not independently authenticated judgments. Current evidence and criminal rules require separate verification.</p>`
        : `<h2>${marker}</h2><p>يحلل العرض الآتي قرارات تنسبها المجموعات الثانوية المذكورة في مراجع المقال إلى محكمة النقض السورية. لم تتحقق صور رسمية أصلية لأحكام 1963 و1982 و2008. وتصف العبارات اللاحقة عما قضت به المحكمة تلك الروايات المنقولة، لا أحكاماً وُثقت أصولها استقلالاً. وتحتاج قواعد البينات والعقوبات النافذة إلى تحقق منفصل.</p>`) + result;
    }
  }
  return result;
}
