import { SAUDI_RECONSIDERATION_ARTICLE_GUIDANCE } from "./saudi-reconsideration-article-guidance.js";

export const RECONSIDERATION_TEMPLATE = {
  en: {
    heading: "Editable Saudi reconsideration petition outline",
    scope: "Copy the outline and replace the brackets with verified case information. This is an editorial drafting aid for the judgments described above, not an official Najiz form. Select the actual Article 200 ground and check its specific evidence requirements under Regulation Article 51, the deadline and the competent court before filing. Delete optional requests that do not apply.",
    fields: [
      ["Addressee and parties", "To: [issuing court and circuit]. Petitioner: [name, identity, address and capacity]. Respondent: [name and identifying details]. Representative, if any: [name and authority reference]."],
      ["Judgment concerned", "Case number: […]. Judgment number and date: […]. Operative ruling challenged: […]. Appellate or Supreme Court affirmation, if any: […]."],
      ["Admissibility and time", "My capacity to petition is […]. The applicable Article 200 ground is […]. The event starting the period is […], on [date], supported by [document]. Filing date: […]. Explain the resulting deadline calculation: […]."],
      ["Ground and its effect", "The relevant fact is […]. It affects this part of the ruling because […]. The supporting evidence is […], attachment [number/page]. For a previously unavailable decisive document, explain why it could not be produced earlier and when it became available: […]. Repeat separately for each applicable ground."],
      ["Relief requested", "I request acceptance of the petition and reconsideration of [identified part of the judgment] on the stated ground, with the following requested disposition: […]. Explain each request and its basis: […]."],
      ["Optional request to stay enforcement", "If applicable: I separately request a stay concerning [judgment/enforcement file]. Reasons, risk of serious harm and supporting evidence: […]. Requested scope and any proposed security: […]. Filing alone does not stay enforcement."],
      ["Attachments and signature", "Attachment index: [judgment], [notification or discovery evidence], [ground-specific documents], [representation document if applicable], [other relevant documents]. Petitioner or authorised representative: […]. Date and signature: […]."],
    ],
  },
  ar: {
    heading: "نموذج قابل للتعديل لصحيفة التماس إعادة النظر في السعودية",
    scope: "انسخ النموذج واستبدل الأقواس ببيانات القضية المتحقق منها. هذه مساعدة تحريرية للصياغة ضمن نطاق الأحكام المبين أعلاه، وليست نموذجاً رسمياً لناجز. حدّد السبب المنطبق من المادة 200 وراجع متطلبات إثباته الخاصة في المادة 51 من اللائحة والميعاد والمحكمة المختصة قبل التقديم. احذف الطلبات الاختيارية غير المنطبقة.",
    fields: [
      ["الجهة والأطراف", "إلى: [المحكمة مصدرة الحكم والدائرة]. الملتمس: [الاسم والهوية والعنوان والصفة]. الملتمس ضده: [الاسم وبيانات التعريف]. الوكيل إن وجد: [الاسم ومرجع الوكالة]."],
      ["الحكم محل الالتماس", "رقم القضية: […]. رقم الحكم وتاريخه: […]. المنطوق المطلوب إعادة النظر فيه: […]. قرار التأييد من الاستئناف أو العليا إن وجد: […]."],
      ["الصفة والميعاد", "صفتي في تقديم الالتماس هي […]. السبب المنطبق من المادة 200 هو […]. الواقعة التي يبدأ منها الميعاد هي […] بتاريخ […] ودليلها […]. تاريخ التقديم: […]. بيان حساب الميعاد وفق السبب المنطبق: […]."],
      ["سبب الالتماس وأثره", "الواقعة محل الالتماس هي […]. وأثرها في هذا الجزء من الحكم هو […] لأن […]. ودليلها […] في المرفق [الرقم/الصفحة]. عند الاستناد إلى ورقة حاسمة تعذر إبرازها: يبين سبب التعذر ووقت ظهورها […]. يكرر البيان بصورة مستقلة لكل سبب منطبق."],
      ["الطلبات", "ألتمس قبول الالتماس وإعادة النظر في [الجزء المحدد من الحكم] للسبب المبين، والحكم بما يأتي: […]. بيان سند كل طلب وأسبابه: […]."],
      ["طلب اختياري لوقف التنفيذ", "عند انطباقه: أطلب بصورة مستقلة وقف تنفيذ [الحكم/ملف التنفيذ]. أسباب الطلب وخطر الضرر الجسيم والأدلة: […]. نطاق الوقف المطلوب والضمان المقترح إن وجد: […]. لا يوقف مجرد تقديم الالتماس التنفيذ."],
      ["المرفقات والتوقيع", "فهرس المرفقات: [الحكم]، [دليل الإبلاغ أو العلم]، [مستندات السبب المحدد]، [الوكالة أو الولاية عند الاقتضاء]، [مستندات أخرى ذات صلة]. اسم الملتمس أو ممثله المخول: […]. التاريخ والتوقيع: […]."],
    ],
  },
} as const;

export function appendReconsiderationTemplate(slug: string, lang: "en" | "ar", html: string): string {
  const guidance = SAUDI_RECONSIDERATION_ARTICLE_GUIDANCE;
  const template = RECONSIDERATION_TEMPLATE[lang];
  if (slug !== guidance.articleSlug || html.includes(`<h2>${template.heading}</h2>`)) return html;
  const fields = template.fields.map(([heading, text]) => `<h3>${heading}</h3><p>${text}</p>`).join("");
  const sources = [guidance.sources.procedureLaw, guidance.sources.objectionRegulation, guidance.sources.najiz]
    .map(source => `<a href="${source.href}">${source[lang]}</a>`).join(" · ");
  return `${html}<h2>${template.heading}</h2><p>${template.scope}</p>${fields}<p>${sources}</p>`;
}
