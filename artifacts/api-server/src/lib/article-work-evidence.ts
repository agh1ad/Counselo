/** Explicit case relationships checked against the published work accounts. */
export const ARTICLE_WORK_EVIDENCE: Readonly<Record<string, { slug: string; en: string; ar: string }>> = {
  "mta-ysthq-alwsyt-altjary-kaml-amwlth": {
    slug: "kawnslw-w-tkhfyd-mtalbh-amwlh-tjaryh-mn-348-mlywn-ryal-ila-584-alf-ryal",
    en: "Read the commission dispute case study and its reported-outcome evidence",
    ar: "اقرأ دراسة نزاع العمولة وحدود توثيق النتيجة المنشورة",
  },
  "lys-kl-mblgh-ytalb-bh-yhkm-bh-kyf-tfkk-almtalbat-altjaryh-qbl-bna-aldfaa": {
    slug: "kyf-sahmt-kawnslw-fy-tkhfyd-mtalbh-mn-500-alf-ryal-ila-227",
    en: "Read the case study of the SAR 500,000 claim and SAR 227,000 award",
    ar: "اقرأ دراسة المطالبة بمبلغ 500,000 ريال والحكم بمبلغ 227,000 ريال",
  },
  "mta-ykwn-alslh-afdl-mn-alastmrar-fy-alkhswmh": {
    slug: "kyf-saadt-kawnslw-fy-astrdad-300000-ryal-abr-slh-qdayy-fy-nzaa-tjary",
    en: "Read the SAR 300,000 settlement case study, including the mutual concessions",
    ar: "اقرأ دراسة الصلح بمبلغ 300,000 ريال وما تضمنه من تنازلات متبادلة",
  },
  "hmayh-alamyl-mn-mswdh-alaqd-ala-altwqya": {
    slug: "mnhj-kawnslw-fy-mrajah-alaqwd-altjaryh",
    en: "Read CounselO’s published commercial contract review example",
    ar: "اقرأ نموذج كاونسلو المنشور لمراجعة العقود التجارية",
  },
};

export function connectArticleWorkEvidence(slug: string, lang: "en" | "ar", html: string): string {
  const evidence = ARTICLE_WORK_EVIDENCE[slug];
  if (!evidence) return html;
  if (slug === "mta-ysthq-alwsyt-altjary-kaml-amwlth") {
    html = lang === "en" ? html
      .replace("The judgment was subsequently upheld on appeal.", "According to the client’s account recorded in the attached case study, the judgment was subsequently upheld on appeal.")
      .replace("with the result upheld on appeal.", "with appellate affirmation reported by the client in the attached case study.")
      : html
        .replace("ثم تأيد الحكم استئنافيًا.", "ثم تأيد الحكم استئنافيًا بحسب إفادة العميل الواردة في الدراسة المرفقة.")
        .replace("مع تأييد النتيجة استئنافيًا.", "مع تأييد النتيجة استئنافيًا بحسب إفادة العميل الواردة في الدراسة المرفقة.");
  }
  if (slug === "lys-kl-mblgh-ytalb-bh-yhkm-bh-kyf-tfkk-almtalbat-altjaryh-qbl-bna-aldfaa" && lang === "ar") {
    // This is a drafting note in the supplied article, not additional case evidence.
    html = html.replace(/<p\b[^>]*>[\s\S]*?<\/p>/gi, paragraph =>
      paragraph.replace(/<[^>]+>/g, "").trim().startsWith("للمراجعه يوجد على أعمالنا") ? "" : paragraph,
    );
  }
  const href = `${lang === "ar" ? "/ar" : ""}/our-work/${evidence.slug}`;
  if (html.includes(`href="${href}"`)) return html;
  return `${html}<h2>${lang === "ar" ? "دراسة الحالة المرتبطة بهذا المقال" : "Case study discussed in this article"}</h2><p><a href="${href}">${evidence[lang]}</a></p>`;
}
