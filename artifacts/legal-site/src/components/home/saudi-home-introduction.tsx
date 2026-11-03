import { Link } from "wouter";
import { ArrowRight, MapPin, Clock3, MonitorSmartphone, MessagesSquare } from "lucide-react";
import type { Region } from "@workspace/api-zod/browser";
import "./saudi-home-introduction.css";

export const saudiHomeCopy = {
  en: {
    title: "CounselO Saudi Arabia",
    heroLead: "Protect your rights. Strengthen your contracts. Move your business forward.",
    heroText: "Your destination for Saudi legal services from home. Consult our experienced team in Arabic or English without an office visit, with local representation through licensed partners and lawyers.",
    heading: "Legal experience.\nA practical understanding of Saudi Arabia.",
    introduction: "CounselO Saudi Arabia puts an experienced legal team within reach of your home, wherever you are in the Kingdom or abroad. From family and employment matters to property, contracts, companies and commercial disputes, we turn your facts and documents into clear legal advice and practical next steps.",
    experience: "Our legal team brings practical experience in contract drafting, dispute assessment, arbitration and cross-border legal analysis. We examine the evidence, identify the legal issues and prepare advice, agreements and submissions that support a clear strategy for your matter.",
    localWork: "From online consultation to legal representation, stay connected with one team. Our licensed partners and lawyers in Saudi Arabia handle representation before courts and authorities under a separately agreed engagement, while we coordinate the legal preparation and follow-up with you.",
    profile: "Meet our team and Saudi partners",
  },
  ar: {
    title: "كاونسلو السعودية",
    heroLead: "احمِ حقوقك. اضبط عقودك. وامضِ بأعمالك بثقة.",
    heroText: "وجهتك للخدمات القانونية السعودية من منزلك. استشر فريقنا المتمرس بالعربية أو الإنجليزية دون زيارة مكتب، مع تمثيل محلي عبر شركائنا ومحامينا المرخصين.",
    heading: "خبرة قانونية راسخة.\nومعرفة عملية بالسعودية.",
    introduction: "تضع كاونسلو السعودية فريقاً قانونياً متمرساً في متناولك من منزلك، سواء كنت داخل المملكة أو خارجها. من مسائل الأسرة والعمل إلى العقارات والعقود والشركات والمنازعات التجارية، نحوّل وقائع مسألتك ومستنداتها إلى مشورة واضحة وخطوات عملية.",
    experience: "يمتلك فريقنا القانوني خبرة عملية في صياغة العقود ودراسة المنازعات والتحكيم والتحليل القانوني للمسائل العابرة للحدود. نفحص الأدلة، ونحدد المسائل القانونية، ونعدّ المشورة والاتفاقيات والمذكرات التي تدعم استراتيجية واضحة لمسألتك.",
    localWork: "من الاستشارة أونلاين إلى التمثيل القانوني، ابقَ على تواصل مع فريق واحد. يتولى شركاؤنا ومحامونا المرخصون في السعودية التمثيل أمام المحاكم والجهات المختصة بموجب تكليف مستقل متفق عليه، وننسق معك الإعداد القانوني والمتابعة.",
    profile: "تعرّف على فريقنا وشركائنا في السعودية",
  },
} as const;

export function regionalHomeCopy(region: Region, isArabic: boolean) {
  const base = saudiHomeCopy[isArabic ? "ar" : "en"];
  if (region === "sa") return base;
  const country = region === "syr" ? (isArabic ? "سوريا" : "Syria") : (isArabic ? "الإمارات" : "the UAE");
  return {
    ...base,
    title: isArabic ? `كاونسلو ${country}` : `CounselO ${region === "syr" ? "Syria" : "UAE"}`,
    heading: isArabic ? `خبرة قانونية راسخة.\nدعم مهني لمسألتك في ${country}.` : `Experienced legal support.\nFor your matter in ${country}.`,
    heroText: isArabic ? `وجهتك للخدمات القانونية في ${country} من منزلك. استشر فريقنا المتمرس بالعربية أو الإنجليزية دون زيارة مكتب، مع تمثيل محلي عبر شركاء ومحامين مرخصين.` : `Your destination for legal services in ${country}, from home. Consult our experienced team in Arabic or English without an office visit, with local representation through licensed partners and lawyers.`,
    introduction: region === "syr"
      ? (isArabic ? "يضع فريق كاونسلو خبرته في خدمة الأفراد والأسر والشركات داخل سوريا وخارجها. نراجع مسائل العقارات والميراث والعقود والأعمال والمنازعات، ونربط المستندات والوقائع بخطوات قانونية واضحة تراعي موقع السجلات والأطراف وأي صلة بالخارج." : "CounselO brings experienced online legal support to individuals, families and businesses in Syria and abroad. We review property, inheritance, contracts, business matters and disputes, connecting your records and objectives to a clear legal approach that accounts for local documents and cross-border issues.")
      : (isArabic ? "تقدم كاونسلو دعماً قانونياً مهنياً للأفراد والشركات والمستثمرين في الإمارات. ندرس العقود والشركات والعمل والعقارات ومسائل الأسرة والمنازعات، مع تحديد الإمارة والجهة والإطار المنطبق في البر الرئيسي أو المنطقة الحرة لبناء مشورة دقيقة وخطوات عملية." : "CounselO provides professional legal support for individuals, businesses and investors with UAE matters. Our team reviews contracts, companies, employment, property, family issues and disputes, identifying the relevant emirate, authority and mainland or free-zone framework to prepare clear advice and practical next steps."),
    localWork: isArabic ? `ابدأ استشارتك وتابع مستنداتك أونلاين من منزلك، داخل ${country} أو خارجها. وعند الحاجة إلى تمثيل أمام المحاكم أو الجهات المختصة، يتولاه شركاؤنا ومحامونا المرخصون في ${country} وفق تكليف مستقل، مع تنسيق الإعداد القانوني والمتابعة عبر فريقنا.` : `Start your consultation and review documents with us online from home, in ${country} or abroad. When you need representation before courts or authorities, our licensed partners and lawyers in ${country} handle that work under a separate engagement, with our team coordinating preparation and follow-up.`,
    profile: isArabic ? "تعرّف على كاونسلو وفريقها" : "About CounselO and our team",
  };
}

export function SaudiHomeStrengths({ isArabic, region = "sa" }: { isArabic: boolean; region?: Region }) {
  const strengths = [
    { icon: Clock3, title: isArabic ? "رد مستهدف خلال 24 ساعة" : "24h reply target", detail: isArabic ? "بحسب النطاق وتوفر الخدمة" : "Scope & availability apply" },
    { icon: MonitorSmartphone, title: isArabic ? "أونلاين بالكامل" : "Fully online", detail: isArabic ? "من مكانك، دون زيارة مكتب" : "No office visit needed" },
    { icon: MessagesSquare, title: isArabic ? "استشارة بالطريقة التي تناسبك" : "Advice your way", detail: isArabic ? "كتابةً، هاتفياً أو عبر الفيديو" : "Written, phone or video" },
    ...(region === "uae" ? [] : [region === "sa"
      ? { icon: MapPin, title: isArabic ? "نخدم جميع أنحاء السعودية" : "Serving all of Saudi Arabia", detail: isArabic ? "دعم قانوني أونلاين" : "Online legal support" }
      : { icon: MapPin, title: isArabic ? "نخدم معظم المناطق السورية" : "Serving most areas of Syria", detail: isArabic ? "دعم قانوني أونلاين" : "Online legal support" }]),
  ];

  return <section id="service-legal-checks" className="sa-home-strengths" aria-labelledby="service-legal-checks-heading">
    <h2 id="service-legal-checks-heading" className="sr-only">{isArabic ? "لماذا تختار كاونسلو؟" : "Why choose CounselO?"}</h2>
    <ul className="sa-home-strengths__list" data-count={strengths.length}>
      {strengths.map(({ icon: Icon, title, detail }) => <li key={title}>
        <Icon size={28} strokeWidth={1.8} aria-hidden="true" />
        <div><strong>{title}</strong><span>{detail}</span></div>
      </li>)}
    </ul>
  </section>;
}

export function SaudiHomeIntroduction({ isArabic, region = "sa" }: { isArabic: boolean; region?: Region }) {
  const c = regionalHomeCopy(region, isArabic);
  return <section className="sa-home-introduction" aria-labelledby="sa-home-introduction-title">
    <div className="sa-home-introduction__grid">
      <div className="sa-home-introduction__copy">
        <h2 id="sa-home-introduction-title">{c.heading}</h2>
        <p className="sa-home-introduction__lead">{c.introduction}</p>
        <p>{c.experience}</p>
        <p>{c.localWork}</p>
        <Link className="sa-home-introduction__link" href={`/${region}${isArabic ? "/ar" : ""}/about`}>{c.profile}<ArrowRight size={18} aria-hidden="true" /></Link>
      </div>
    </div>
  </section>;
}
