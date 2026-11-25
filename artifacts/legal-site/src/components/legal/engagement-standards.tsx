import { Link } from "wouter";
import "./engagement-standards.css";

const content = {
  en: {
    title: "A clear agreement before legal work begins",
    lead: "Whether you need a focused consultation or support with a substantial dispute, these are the points we confirm with you before accepting the work.",
    items: [
      { title: "The professional responsible", text: "The name and role of the professional handling your matter, the relevant country and how to contact the team." },
      { title: "The work and what you receive", text: "The questions to address, documents to review and agreed output: a legal opinion, reviewed contract, draft document or support for a defined stage of your matter." },
      { title: "Fees, timing and follow-up", text: "Online consultations have published fixed fees. We agree drafting and representation fees separately, along with payment terms, timing and follow-up, before that work begins." },
      { title: "Representation by our team", text: "The same CounselO team handles your online communication, legal work and representation, including required court attendance through its appropriately licensed members. We confirm responsibilities, authorisations, filings and deadlines before acting." },
    ],
    link: "Read the service terms",
  },
  ar: {
    title: "اتفاق واضح قبل بدء العمل القانوني",
    lead: "سواء احتجت إلى استشارة محددة أو دعم في نزاع واسع، نؤكد معك هذه النقاط قبل قبول التكليف.",
    items: [
      { title: "المهني المسؤول عن مسألتك", text: "اسم المهني الذي يتولى مسألتك ودوره والدولة المعنية وطريقة التواصل مع الفريق." },
      { title: "العمل والمخرجات التي تتسلمها", text: "الأسئلة المطلوب معالجتها والمستندات المطلوب مراجعتها والمخرج المتفق عليه: رأي قانوني، أو عقد تمت مراجعته، أو مشروع مستند، أو دعم لمرحلة محددة من مسألتك." },
      { title: "الأتعاب والموعد والمتابعة", text: "للاستشارات الأونلاين رسوم ثابتة منشورة. ونتفق بصورة مستقلة على أتعاب الصياغة والتمثيل وشروط الدفع والموعد والمتابعة قبل بدء ذلك العمل." },
      { title: "التمثيل الذي يتولاه فريقنا", text: "يتولى فريق كاونسلو نفسه التواصل معك أونلاين والعمل القانوني والتمثيل، بما يشمل الحضور المطلوب أمام المحاكم بأعضائه المرخصين في الدولة المعنية. ونؤكد المسؤوليات والتفويضات والإيداعات والمواعيد قبل مباشرة العمل." },
    ],
    link: "اطّلع على شروط الخدمة",
  },
} as const;

type EngagementStandardsProps = {
  isArabic: boolean;
  id?: string;
} & (
  | { regionPath: string; termsLinks?: never }
  | { regionPath?: never; termsLinks: { href: string; label: string }[] }
);

/** Public engagement commitments; these do not assert a completed credentials audit. */
export function EngagementStandards({ isArabic, regionPath, termsLinks, id = "engagement-standards" }: EngagementStandardsProps) {
  const copy = content[isArabic ? "ar" : "en"];
  return (
    <section className="engagement-standards" id={id} aria-labelledby={`${id}-title`}>
      <header>
        <h2 id={`${id}-title`}>{copy.title}</h2>
        <p>{copy.lead}</p>
      </header>
      <dl className="engagement-standards__items">
        {copy.items.map(item => <div key={item.title}><dt>{item.title}</dt><dd>{item.text}</dd></div>)}
      </dl>
      {termsLinks ? <nav aria-label={copy.link} className="global-about-country-links">
        {termsLinks.map(link => <Link key={link.href} href={link.href} className="engagement-standards__link">{link.label}</Link>)}
      </nav> : <Link href={`${regionPath}/terms-of-service`} className="engagement-standards__link">{copy.link}</Link>}
    </section>
  );
}
