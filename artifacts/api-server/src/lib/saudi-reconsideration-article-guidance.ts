/** Primary-source procedural answers for the existing reconsideration article. */
export const SAUDI_RECONSIDERATION_ARTICLE_GUIDANCE = {
  articleSlug: "mta-yqbl-altmas-aaadh-alnzr-atjahat-qdayyh-mhmh",
  reviewedAt: "2026-09-07",
  status: "implemented-pending-render-verification",
  scope: {
    en: "These answers concern final judgments governed by Saudi Arabia’s Law of Sharia Procedure and its objection regulations. Identify the court and case type before applying them; criminal, administrative and special procedures require separate review.",
    ar: "تتناول هذه الإجابات الأحكام النهائية الخاضعة لنظام المرافعات الشرعية السعودي ولائحة طرق الاعتراض. يجب تحديد المحكمة ونوع القضية قبل تطبيقها؛ فالإجراءات الجزائية والإدارية والأحكام الخاصة تحتاج إلى مراجعة مستقلة.",
  },
  sources: {
    procedureLaw: {
      en: "Law of Sharia Procedure, Articles 200–204",
      ar: "نظام المرافعات الشرعية، المواد 200–204",
      href: "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/f0eaae46-9f84-40ee-815e-a9a700f268b3/1",
    },
    objectionRegulation: {
      en: "Implementing Regulation for Methods of Objecting to Judgments (2023)",
      ar: "اللائحة التنفيذية لطرق الاعتراض على الأحكام (2023)",
      href: "https://www.uqn.gov.sa/details?p=23463",
    },
    najiz: {
      en: "Ministry of Justice: petition for reconsideration service",
      ar: "وزارة العدل: خدمة التماس إعادة النظر",
      href: "https://www.moj.gov.sa/ar/eServices/Pages/34a53f98-57e0-4f8b-9bad-78a095ebae4b.aspx",
    },
  },
  sections: [
    {
      id: "saudi-reconsideration-grounds",
      sourceKeys: ["najiz"],
      en: {
        q: "Which grounds can support reconsideration?",
        a: "Grounds include subsequently established forgery or judicially established false testimony; previously unavailable decisive documents; consequential opponent fraud; unrequested or excessive relief; contradictory operative provisions; default judgment; and improper representation. Merely disagreeing with the result does not identify one of these grounds.",
      },
      ar: {
        q: "ما أسباب التماس إعادة النظر؟",
        a: "تشمل الأسباب ثبوت تزوير أوراق الحكم لاحقاً أو القضاء بزور الشهادة، وظهور أوراق حاسمة تعذر تقديمها، وغش الخصم المؤثر، والقضاء دون طلب أو بأكثر منه، وتناقض المنطوق، والحكم الغيابي، والتمثيل غير الصحيح. مجرد الاعتراض على النتيجة لا يحدد أحد هذه الأسباب.",
      },
    },
    {
      id: "saudi-reconsideration-deadline-triggers",
      sourceKeys: ["procedureLaw"],
      en: {
        q: "When do the 30 days begin?",
        a: "Article 201 distinguishes: forgery/perjury, decisive documents or fraud—proven knowledge of discovery or ruling; Article 200(1)(d–g)—notification of judgment; bound nonparticipants under Article 200(2)—knowledge of judgment. The judgment date does not determine every deadline.",
      },
      ar: {
        q: "متى تبدأ مهلة الثلاثين يوماً؟",
        a: "تميز المادة 201 بين العلم المثبت بالتزوير أو حكم زور الشهادة أو ظهور الأوراق أو الغش؛ وإبلاغ الحكم لأسباب المادة 200(1)(د–ز)؛ والعلم بالحكم لمن يعد حجة عليه ولم يدخل الدعوى وفق 200(2). تاريخ الحكم وحده لا يحدد جميع المواعيد.",
      },
    },
    {
      id: "saudi-reconsideration-filing-court",
      sourceKeys: ["procedureLaw"],
      en: {
        q: "Where is the petition filed?",
        a: "File with the issuing court, identifying judgment number, date and grounds; an affirming appellate/Supreme Court reviews acceptance.",
      },
      ar: {
        q: "أين يقدم الالتماس؟",
        a: "يودع لدى المحكمة مصدرة الحكم برقمه وتاريخه وأسبابه، ويرفع للاستئناف أو العليا المؤيدة للنظر في القبول.",
      },
    },
    {
      id: "saudi-reconsideration-evidence-and-merits-court",
      sourceKeys: ["objectionRegulation"],
      en: {
        q: "What must the memorandum explain?",
        a: "Article 51 requires the relevant facts, their effect and evidence specific to the ground, including why decisive papers were unavailable. Under Article 48, an affirming appellate court hears the case after formal acceptance.",
      },
      ar: {
        q: "ماذا تبين مذكرة الالتماس؟",
        a: "تتطلب المادة 51 الوقائع وأثرها ودليل السبب المحدد، ومنها تعذر إبراز الأوراق الحاسمة. ووفق المادة 48 تنظر محكمة الاستئناف المؤيدة للحكم الدعوى بعد قبول الالتماس شكلاً.",
      },
    },
    {
      id: "saudi-reconsideration-filing-stay",
      sourceKeys: ["procedureLaw"],
      en: { q: "Does filing stop enforcement?", a: "No. Article 202 permits a requested stay for feared serious irreparable harm, potentially subject to security." },
      ar: { q: "هل يوقف التقديم التنفيذ؟", a: "لا؛ تجيز المادة 202 وقفه بطلب عند خشية ضرر جسيم يتعذر تداركه، وقد تشترط ضماناً." },
    },
    {
      id: "saudi-reconsideration-accepted-stay",
      sourceKeys: ["objectionRegulation"],
      en: {
        q: "What changes after acceptance?",
        a: "Article 58 requires a stay when requested after acceptance, subject to Article 11: submit the reasoned stay request within the objection period. Acceptance does not mean success; Article 59 allows rejection on the merits or full/partial reversal.",
      },
      ar: {
        q: "ماذا يتغير بعد القبول؟",
        a: "توجب المادة 58 وقف التنفيذ عند طلبه بعد القبول مع مراعاة المادة 11: يقدم طلب الوقف وأسبابه خلال مدة الاعتراض. القبول لا يعني كسب الموضوع؛ فالمادة 59 تجيز رفض الالتماس أو نقض الحكم كلياً أو جزئياً.",
      },
    },
    {
      id: "saudi-reconsideration-repeat-petition",
      sourceKeys: ["procedureLaw"],
      en: { q: "Can the petition be repeated?", a: "Article 204 bars repetition against rejection/reconsidered judgments, except previously unexamined Article 200 grounds." },
      ar: { q: "هل يجوز تكرار الالتماس؟", a: "تمنع المادة 204 التكرار على الرفض والحكم اللاحق، باستثناء أسباب المادة 200 غير المنظورة سابقاً." },
    },
    {
      id: "saudi-reconsideration-small-claims-and-next-review",
      sourceKeys: ["objectionRegulation"],
      en: { q: "Are all resulting judgments appealable?", a: "No. Regulation Article 49 excludes appeal of nonacceptance and merits judgments in small claims, while allowing reconsideration of their original judgments." },
      ar: { q: "هل تستأنف جميع الأحكام اللاحقة؟", a: "لا؛ تستثني المادة 49 استئناف عدم قبول الالتماس وحكم الموضوع في الدعاوى اليسيرة، مع إجازة الالتماس على أحكامها الأصلية." },
    },
    {
      id: "saudi-reconsideration-najiz-steps",
      sourceKeys: ["najiz"],
      en: {
        q: "How is the request submitted through Najiz?",
        a: "Sign in using National Access. Select Judiciary → Reconsideration, then the case, new request and judgment. Enter the memorandum, attach supporting documents and submit; retain the SMS request number. Representatives need valid litigation authority; guardians need valid guardianship documentation.",
      },
      ar: {
        q: "كيف يقدم الطلب عبر ناجز؟",
        a: "ادخل بالنفاذ الوطني، ثم القضاء والتماس إعادة النظر. حدد القضية والطلب الجديد والحكم، وأدخل المذكرة وأرفق مستنداتها ثم أرسلها واحتفظ برقم الطلب النصي. يحتاج الوكيل وكالة مرافعة سارية، والولي صك ولاية سارياً.",
      },
    },
  ],
  editorialIntegrationNotes: [
    "Preserve the existing article route and distinguish these general procedural answers from the article’s case commentary.",
    "Article 203 allows ordinary review of the post-reconsideration merits judgment according to case type; do not promise appeal in every case. The small-claims exception is included above.",
    "The official service page contains conflicting required-document fields and malformed fee/time fields. Publish no fee, SLA, no-document claim or automated deadline calculator from those fields.",
    "Do not call this exhaustive coverage or a legal opinion. Individual deadline computation, evidence sufficiency, court-specific route and later amendments require review for the actual file.",
    "Keep source links adjacent to answers; do not turn source retrieval date into the original author’s legal-review claim.",
  ],
} as const;


const escapeHtml = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

export function appendReconsiderationGuidance(slug: string, lang: "en" | "ar", html: string): string {
  const guidance = SAUDI_RECONSIDERATION_ARTICLE_GUIDANCE;
  if (slug !== guidance.articleSlug) return html;
  const heading = lang === "en" ? "Before filing a Saudi reconsideration petition" : "قبل تقديم التماس إعادة النظر في السعودية";
  // The visible heading survives public sanitization, unlike data attributes.
  if (html.includes(`<h2>${heading}</h2>`)) return html;
  const answers = guidance.sections.map(section => {
    const text = section[lang];
    const sources = section.sourceKeys.map(key => {
      const source = guidance.sources[key];
      return `<a href="${escapeHtml(source.href)}">${escapeHtml(source[lang])}</a>`;
    }).join(" · ");
    return `<h3>${escapeHtml(text.q)}</h3><p>${escapeHtml(text.a)} ${sources}</p>`;
  }).join("");
  return `${html}<h2>${heading}</h2><p>${escapeHtml(guidance.scope[lang])}</p>${answers}`;
}
