import { getServiceDefinition, type Region } from "@workspace/api-zod/browser";
import type { ExperienceCopy } from "../components/legal/service-experience";
import { saudiFamilyServiceCopy } from "../components/legal/saudi-family-service-content";
import type { LegalProblemPage } from "./legal-problem-pages";
import { getMatterIntentBrief } from "./matter-intent-briefs";
import { getMatterSupport } from "./matter-support-copy";
import { serviceExperience, teamIntroduction } from "./service-experience-content";
import { detailedServiceCoverage } from "./service-coverage-details";

type Lang = "en" | "ar";
export const experienceCountry = (region: Region, lang: Lang) => ({
  sa: { en: "Saudi Arabia", ar: "السعودية" }, syr: { en: "Syria", ar: "سوريا" }, uae: { en: "the UAE", ar: "الإمارات" },
})[region][lang];

// Preserve proper names and initialisms in sentence-position titles.
export const sentenceTopic = (title: string) => /^(Dubai|Emirates|Syrian|Saudi|Board of Grievances|Public Prosecution)\b/.test(title) ? title : title.replace(/^[A-Z](?=[a-z])/, letter => letter.toLowerCase());
const lastSentence = (text: string) => text.split(/(?<=[.!?؟])\s+/u).at(-1)!;

function closing(region: Region, lang: Lang, topic: string, support: string): Pick<ExperienceCopy, "invitation" | "contact" | "contactTitle" | "contactText"> {
  const country = experienceCountry(region, lang);
  return lang === "ar" ? {
    invitation: `ناقش ${topic} مع فريق كاونسلو بالعربية أو الإنجليزية. نحدد معك العمل المطلوب، ونرتب أي تمثيل محلي من خلال شركاء ومحامين مرخصين في ${country} وفق تكليف متفق عليه.`,
    contact: "اطلب الدعم القانوني",
    contactTitle: `تحدث معنا بشأن ${topic}`,
    contactText: `${lastSentence(support)} أرسل طلبك واذكر أي جلسة أو موعد قريب.`,
  } : {
    invitation: `Discuss ${topic} with CounselO in Arabic or English. We agree the legal work with you and arrange any local representation through licensed partners and lawyers in ${country} under an agreed engagement.`,
    contact: "Request legal support",
    contactTitle: `Speak to us about ${topic}`,
    contactText: `${lastSentence(support)} Send your request and include any approaching hearing or deadline.`,
  };
}

export function servicePageCopy(region: Region, service: string, lang: Lang, covers: string[], overview?: string): ExperienceCopy & { hero: string } {
  if (region === "sa" && service === "family-law") return saudiFamilyServiceCopy[lang];
  const p = serviceExperience(region, service, lang);
  const definition = getServiceDefinition(service, region);
  if (!definition) throw new Error(`Missing service definition: ${region}/${service}`);
  const topic = lang === "ar" ? definition.titleAr : definition.titleEn;
  const country = experienceCountry(region, lang);
  return {
    ...closing(region, lang, topic, p.approach),
    hero: p.hero,
    heading: lang === "ar" ? `${topic}: مشورة وصياغة ودعم قانوني` : `${topic}: advice, drafting and legal support`,
    introduction: `${teamIntroduction(region, lang, topic)} ${p.hero}`,
    experience: p.approach,
    coverageTitle: lang === "ar" ? `ما نقدمه في ${country}` : `What we cover in ${country}`,
    coverageIntro: overview,
    coverage: detailedServiceCoverage(region, service, lang, covers),
  };
}

// Convert only the leading preparation instruction into an accurate description
// of the team's review. The issue's substantive guidance remains intact below.
export function reviewFocus(answer: string, lang: Lang): string {
  const sentence = answer.split(/(?<=[.!?؟])\s+/u)[0];
  if (lang === "en") {
    if (sentence.startsWith("If there is")) return "We assess the family-safety concerns, existing orders and immediate legal support your situation requires.";
    if (sentence.startsWith("For trial, organise")) return sentence.replace("For trial, organise", "For trial, we organise");
    return sentence.replace(/^(Identify|Describe|Separate|List|Match|Specify|State|Distinguish|Explain|Compare|Obtain|Quote|Document|Record|Ask|Read|Create|Reconcile|Keep|Build|Map|Review|Define|Set out|Examine|Verify|Trace|Test|Clarify|Check|Confirm|Preserve|Prepare|Connect|Collect|Locate|Request|Save|Start|Pinpoint|Organise)\b/, (verb) => {
      const reviewVerbs: Record<string, string> = { Describe: "assess", Obtain: "review", Document: "examine", Record: "review", Ask: "assess", Read: "examine", Keep: "review", Quote: "examine", Preserve: "examine", Collect: "review", Request: "review", Save: "examine" };
      return `We ${reviewVerbs[verb] ?? verb.toLowerCase()}`;
    });
  }
  if (sentence.startsWith("عند")) return "نقيّم مخاوف السلامة الأسرية والأحكام القائمة والدعم القانوني العاجل الذي تتطلبه حالتك.";
  if (sentence.startsWith("للمحاكمة")) return sentence.replace("للمحاكمة، نظّم", "للمحاكمة، ننظم");
  const active = sentence.replace(/^(حدّد|قارن|افصل|احصل على|طابق|اقرأ|وثّق|أعد|احفظ|راجع|صف|اربط|سجّل|احصر|بيّن|افحص|ميّز|أكّد|اجمع|تتبع|نظّم|تحقّق|تتبّع|وضّح|اذكر|أنشئ|اطلب|احتفظ|جهّز|ابدأ|تحقق)/u, (verb) => ({
    "حدّد": "نحدد", "قارن": "نقارن", "افصل": "نفصل", "احصل على": "نراجع", "طابق": "نطابق", "اقرأ": "نفحص", "وثّق": "نفحص", "أعد": "نعد", "احفظ": "نفحص", "راجع": "نراجع", "صف": "نقيّم", "اربط": "نربط", "سجّل": "نراجع", "احصر": "نحصر", "بيّن": "نوضح", "افحص": "نفحص", "ميّز": "نميز", "أكّد": "نتحقق من", "اجمع": "نراجع", "تتبع": "نتتبع", "نظّم": "ننظم", "تحقّق": "نتحقق", "تتبّع": "نتتبع", "وضّح": "نوضح", "اذكر": "نراجع", "أنشئ": "نعد", "اطلب": "نراجع", "احتفظ": "نحتفظ", "جهّز": "نفحص", "ابدأ": "نبدأ", "تحقق": "نتحقق",
  })[verb]!);
  return active.replace(/([\s،؛])و(حدّد|حدد|قارن|اذكر|تحقق|تحقّق|راجع|افصل|ميّز|بيّن|وضّح|طابق|سجّل|احفظ|وثّق|قارنه)(?=\s)/gu, (_, before: string, verb: string) => `${before}و${({ "حدّد": "نحدد", "حدد": "نحدد", "قارن": "نقارن", "اذكر": "نراجع", "تحقق": "نتحقق", "تحقّق": "نتحقق", "راجع": "نراجع", "افصل": "نفصل", "ميّز": "نميز", "بيّن": "نوضح", "وضّح": "نوضح", "طابق": "نطابق", "سجّل": "نسجّل", "احفظ": "نفحص", "وثّق": "نفحص", "قارنه": "نقارنه" } as Record<string, string>)[verb]}`).replace(/ثم (افصل|قارن)(?=\s)/gu, (_, verb: string) => `ثم ${verb === "افصل" ? "نفصل" : "نقارن"}`);
}

export function problemPageCopy(page: LegalProblemPage, lang: Lang): ExperienceCopy & { hero: string } {
  const sourceTitle = page.intentBriefTitle ?? page.titleEn;
  const brief = getMatterIntentBrief(sourceTitle);
  const support = getMatterSupport(sourceTitle)[lang];
  const [work, ...nextSteps] = support.split(/(?<=[.!?؟])\s+/u);
  const focus = reviewFocus(brief?.answer[lang] ?? page.heroSummary[lang], lang);
  const evidence = brief?.documents[lang] ?? (lang === "ar" ? page.documentsAr : page.documentsEn).join(lang === "ar" ? "، " : ", ");
  const country = experienceCountry(page.region, lang);
  const topic = lang === "ar" ? page.titleAr : sentenceTopic(page.titleEn);
  const question = brief?.question[lang] ?? page.keyQuestions[lang][0];
  const answer = brief?.answer[lang] ?? page.heroSummary[lang];
  return {
    ...closing(page.region, lang, topic, support),
    hero: lang === "ar" ? `دعم قانوني مهني أونلاين بشأن ${topic} في ${country}. ${support.split(/(?<=[.!?؟])\s+/u)[0]}` : `Professional online legal support for ${topic} in ${country}. ${support.split(/(?<=[.!?؟])\s+/u)[0]}`,
    heading: lang === "ar" ? `دعم قانوني متخصص بشأن ${topic}` : `Legal support for ${topic}`,
    introduction: `${teamIntroduction(page.region, lang, topic)} ${work}`,
    experience: `${focus} ${nextSteps.join(" ")}`,
    coverageTitle: lang === "ar" ? `خدماتنا بشأن ${topic}` : `How we help with ${topic}`,
    coverage: lang === "ar" ? [
      { title: "فحص الأدلة والمستندات", text: `تشمل المراجعة ${evidence}. نحدد ما يؤيد موقفك وما يحتاج إلى توضيح أو استكمال.` },
      { title: question, text: answer },
    ] : [
      { title: "Evidence and document review", text: `Our review covers ${evidence}. We identify what supports your position and what needs clarification or further evidence.` },
      { title: question, text: answer },
    ],
  };
}
