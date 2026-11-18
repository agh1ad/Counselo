import { Link } from "wouter";
import { ArrowRight, MapPin, Clock3, MonitorSmartphone, MessagesSquare } from "lucide-react";
import type { Region } from "@workspace/api-zod/browser";
import "./saudi-home-introduction.css";

export const saudiHomeCopy = {
  en: {
    title: "CounselO Saudi Arabia",
    heroLead: "Protect your rights. Strengthen your contracts. Move your business forward.",
    heroText: "Start online with one CounselO team for Saudi legal services, from everyday advice to complex disputes. Consult in Arabic or English, share documents and follow your matter remotely, while our team handles contracts, negotiation, court representation and follow-up.",
    heading: "Legal experience.\nA practical understanding of Saudi Arabia.",
    introduction: "CounselO Saudi Arabia puts an experienced legal team within reach online, wherever you are in the Kingdom or abroad. We handle everyday questions and substantial matters across family, employment, property, contracts, companies and commercial disputes, bringing advice, drafting and representation together within our team.",
    experience: "Our legal team works on straightforward matters and complex disputes involving multiple parties, substantial documents or more than one country. We examine the evidence, develop the legal strategy and prepare opinions, agreements, settlement proposals, claims and defence memoranda, with follow-up through the agreed stages of the matter.",
    localWork: "From your first consultation to legal representation, the CounselO team stays with you. Our team comprises lawyers and law offices licensed in Saudi Arabia, handling court proceedings, preparation and follow-up within the work agreed with you.",
    profile: "Meet our Saudi legal team",
  },
  ar: {
    title: "كاونسلو السعودية",
    heroLead: "احمِ حقوقك. اضبط عقودك. وامضِ بأعمالك بثقة.",
    heroText: "ابدأ أونلاين مع فريق كاونسلو للخدمات القانونية السعودية، من المشورة اليومية إلى النزاعات المعقدة. استشرنا بالعربية أو الإنجليزية، وأرسل مستنداتك وتابع مسألتك عن بُعد، بينما يتولى فريقنا العقود والتفاوض والتمثيل أمام المحاكم والمتابعة.",
    heading: "خبرة قانونية راسخة.\nومعرفة عملية بالسعودية.",
    introduction: "تضع كاونسلو السعودية فريقاً قانونياً متمرساً في متناولك أونلاين، سواء كنت داخل المملكة أو خارجها. نتولى الأسئلة اليومية والمسائل الواسعة في الأسرة والعمل والعقارات والعقود والشركات والمنازعات التجارية، ونجمع المشورة والصياغة والتمثيل ضمن فريقنا.",
    experience: "يعمل فريقنا القانوني على المسائل المباشرة والنزاعات المعقدة التي تتعدد أطرافها أو تتسع مستنداتها أو ترتبط بأكثر من دولة. نفحص الأدلة، ونضع الاستراتيجية القانونية، ونعدّ الآراء والاتفاقيات ومقترحات التسوية والمطالبات ومذكرات الدفاع، مع المتابعة خلال مراحل العمل المتفق عليها.",
    localWork: "من استشارتك الأولى إلى التمثيل القانوني، يبقى فريق كاونسلو معك. يتولى فريقنا المكوّن من محامين ومكاتب مرخّصة في السعودية الإجراءات القضائية والإعداد والمتابعة ضمن العمل المتفق عليه معك.",
    profile: "تعرّف على فريقنا القانوني في السعودية",
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
    heroText: isArabic ? `ابدأ استشارتك أونلاين وتابع مسألتك عن بُعد مع فريق كاونسلو في ${country}. فريق واحد للاستشارة والعقود والتفاوض والتمثيل أمام المحاكم والمتابعة، مع التواصل بالعربية أو الإنجليزية.` : `Start your consultation online and follow your matter remotely with CounselO in ${country}. One team handles advice, contracts, negotiation, court representation and follow-up, with communication in Arabic or English.`,
    introduction: region === "syr"
      ? (isArabic ? "يضع فريق كاونسلو خبرته في خدمة الأفراد والأسر والشركات داخل سوريا وخارجها. نراجع مسائل العقارات والميراث والعقود والأعمال والمنازعات، ونربط المستندات والوقائع بخطوات قانونية واضحة تراعي موقع السجلات والأطراف وأي صلة بالخارج." : "CounselO brings experienced online legal support to individuals, families and businesses in Syria and abroad. We review property, inheritance, contracts, business matters and disputes, connecting your records and objectives to a clear legal approach that accounts for local documents and cross-border issues.")
      : (isArabic ? "تقدم كاونسلو دعماً قانونياً مهنياً للأفراد والشركات والمستثمرين في الإمارات. ندرس العقود والشركات والعمل والعقارات ومسائل الأسرة والمنازعات، مع تحديد الإمارة والجهة والإطار المنطبق في البر الرئيسي أو المنطقة الحرة لبناء مشورة دقيقة وخطوات عملية." : "CounselO provides professional legal support for individuals, businesses and investors with UAE matters. Our team reviews contracts, companies, employment, property, family issues and disputes, identifying the relevant emirate, authority and mainland or free-zone framework to prepare clear advice and practical next steps."),
    localWork: isArabic ? `تابع مسألتك مع فريق كاونسلو من الاستشارة إلى التمثيل، سواء كنت داخل ${country} أو خارجها. يتولى فريقنا المكوّن من محامين ومكاتب مرخّصة في ${country} الإعداد والعمل أمام المحاكم والجهات المختصة والمتابعة ضمن الخطة المتفق عليها.` : `Stay with CounselO from consultation to representation, whether you are in ${country} or abroad. Our team comprises lawyers and law offices licensed in ${country}, handling preparation, court and authority work, and follow-up under the agreed plan.`,
    profile: isArabic ? "تعرّف على كاونسلو وفريقها" : "About CounselO and our team",
  };
}

export function SaudiHomeStrengths({ isArabic, region = "sa" }: { isArabic: boolean; region?: Region }) {
  const strengths = [
    { icon: Clock3, title: isArabic ? "فريق قانوني واحد" : "One legal team", detail: isArabic ? "من الاستشارة إلى التمثيل" : "From advice to representation" },
    { icon: MonitorSmartphone, title: isArabic ? "تواصل ميسر أونلاين" : "Easy online access", detail: isArabic ? "تابع مسألتك من أي مكان" : "Follow your matter from anywhere" },
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
        <p><Link className="sa-home-introduction__link" href={isArabic ? "/ar/our-work" : "/our-work"}>{isArabic ? "اطّلع على دراسات القضايا والمستندات في أعمالنا" : "Explore case studies and documents in Our Work"}<ArrowRight size={18} aria-hidden="true" /></Link></p>
      </div>
    </div>
  </section>;
}
