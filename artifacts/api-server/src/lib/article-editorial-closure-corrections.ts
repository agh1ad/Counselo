// Exact editorial repairs to retained passages; no new legal rules or authorship verification.
const REPLACEMENTS: Record<string, Partial<Record<"en" | "ar", Array<[string, string]>>>> = {
  "almswwlyh-an-fal-alghyr": {
    "en": [
      [
        "Third: Conditions for Application (in Comparative Legislation)",
        "Third: Separate Questions for Reviewing Liability"
      ],
      [
        "Most civil-law systems require precise conditions for applying this liability. Although these conditions vary according to the type of liability, they can be summarised as follows:",
        "The following are questions to investigate, not a single cumulative test. Employer liability and liability arising from a supervision duty have distinct legal bases and defences under the applicable law."
      ],
      [
        "A mistake by the subordinate or direct actor: The injured party must prove that the direct actor committed a mistake that resulted in harm.",
        "Conduct and harm: What conduct and injury are alleged, and what evidence connects them? Identify the elements and burden of proof under the particular liability rule."
      ],
      [
        "A relationship of dependency or supervision: It must be established that a legal or factual relationship gave the person liable authority to direct and supervise the direct actor.",
        "Relationship and duty: Is the asserted basis employment, a duty of supervision or an independent duty? Identify the relevant legal source and actual authority separately."
      ],
      [
        "The mistake occurred during or in connection with employment or supervision: The mistake must have occurred in the course of the work performed by the subordinate for the principal, or during the period of supervision exercised by the person responsible for supervision.",
        "Connection and defences: How is the conduct connected to the employment or supervision alleged? Check the applicable rule and its defences without transferring the test for one category to another."
      ]
    ],
    "ar": [
      [
        "ثالثاً: شروط التطبيق (في التشريعات المقارنة).",
        "ثالثاً: أسئلة مستقلة لفحص المسؤولية."
      ],
      [
        "تطلب معظم التشريعات المدنية شروطاً دقيقة لتطبيق هذه المسؤولية، وهي تختلف باختلاف نوع المسؤولية، ولكن يمكن إجمالها في:",
        "ما يلي أسئلة للفحص وليس اختباراً واحداً من شروط متراكمة. لمسؤولية المتبوع والمسؤولية الناشئة عن واجب الرقابة أسس ودفوع مختلفة وفق القانون المنطبق."
      ],
      [
        "ارتكاب التابع أو المباشر لخطأ: لا بد أن يثبت المتضرر أن المباشر قد ارتكب خطأ ترتب عليه ضرر.",
        "الفعل والضرر: ما السلوك والضرر المدعى بهما، وما الدليل على ارتباطهما؟ تحدد العناصر وعبء الإثبات وفق قاعدة المسؤولية المعنية."
      ],
      [
        "وجود علاقة تبعية أو رقابة: يجب إثبات وجود رابطة قانونية أو فعلية تمنح المسؤول سلطة التوجيه والرقابة على المباشر.",
        "العلاقة والواجب: هل الأساس المدعى به تبعية وظيفية أم واجب رقابة أم واجب مستقل؟ يحدد المصدر القانوني والسلطة الفعلية كل على حدة."
      ],
      [
        "وقوع الخطأ أثناء أو بمناسبة الوظيفة أو الرقابة: يجب أن يكون الخطأ قد حدث في سياق العمل الذي يؤديه التابع لصالح المتبوع، أو في فترة الرقابة التي يمارسها متولي الرقابة.",
        "الصلة والدفوع: ما ارتباط السلوك بالوظيفة أو الرقابة المدعى بها؟ تفحص القاعدة المنطبقة ودفوعها دون نقل اختبار فئة إلى أخرى."
      ]
    ]
  },
  "alaywb-alkhfyh-fy-alaqwd-wathrha-alqanwny": {
    "ar": [
      [
        "4. الالتزام بالإبلاغ الفوري عن العيب:",
        "4. الإعلام بالعيب ومواعيد دعوى الضمان:"
      ],
      [
        "من اعداد البغدادي للمحاماة والمقال منشور على الموقع baghdadilaw.co",
        "نسبة التأليف الواردة في المقال المقدم: البغدادي للمحاماة، مع نسبة النشر إلى baghdadilaw.co. تنشر كاونسلو هذه النسخة المحررة؛ ولا يحل دورها في النشر محل نسبة التأليف الأصلية."
      ]
    ],
    "en": [
      [
        "Prepared by Al-Baghdadi Law Firm and published on baghdadilaw.co",
        "Original credit in the supplied article: Al-Baghdadi Law Firm, with publication attributed to baghdadilaw.co. CounselO publishes this editorially adapted version; that publication role does not replace the original authorship credit."
      ]
    ]
  },
  "mta-ythwl-twqya-alaaml-ala-mhdr-almrajah-ala-aqrar-balmswwlyh": {
    "en": [
      [
        "For more details, you may review our work .... How CounselO managed a sensitive accounting review.",
        "Read the related work example: <a href=\"/our-work/kyf-adart-kawnslw-mrajah-mhasbyh-hsash\">How CounselO managed a sensitive accounting review</a>."
      ]
    ],
    "ar": [
      [
        "للمزيد من التفاصيل يمكنكم مراجعة اعمالنا ....كيف أدرات كاونسلو مراجعه محاسيبة حساسة.",
        "اقرأ مثال العمل المرتبط: <a href=\"/ar/our-work/kyf-adart-kawnslw-mrajah-mhasbyh-hsash\">كيف أدارت كاونسلو مراجعة محاسبية حساسة</a>."
      ]
    ]
  }
};

export function correctArticleEditorialClosure(slug: string, lang: "en" | "ar", html: string): string {
  let result = html;
  for (const [original, replacement] of REPLACEMENTS[slug]?.[lang] ?? []) {
    result = result.replaceAll(original, replacement);
  }
  return result;
}
