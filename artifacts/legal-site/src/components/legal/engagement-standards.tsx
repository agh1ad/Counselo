import { Link } from "wouter";
import "./engagement-standards.css";

const content = {
  en: {
    title: "A clear agreement before legal work begins",
    lead: "Whether you need a focused consultation or support with a substantial dispute, these are the points we confirm with you before accepting the work.",
    items: [
      { title: "The professional responsible", text: "The name and role of the professional handling your matter, the relevant country and how to contact the team." },
      { title: "The work and what you receive", text: "The questions to address, documents to review and agreed output: a legal opinion, reviewed contract, draft document or support for a defined stage of your matter." },
      { title: "Fees, timing and follow-up", text: "The quoted fee, payment terms, expected delivery date and included clarifications. Additional work is agreed with you before it starts." },
      { title: "Any local representation", text: "Where representation is needed, the named local lawyer or office, professional capacity, scope, fee and responsibility for filings and deadlines are confirmed in a separate written engagement." },
    ],
    link: "Read the service terms",
  },
  ar: {
    title: "اتفاق واضح قبل بدء العمل القانوني",
    lead: "سواء احتجت إلى استشارة محددة أو دعم في نزاع واسع، نؤكد معك هذه النقاط قبل قبول التكليف.",
    items: [
      { title: "المهني المسؤول عن مسألتك", text: "اسم المهني الذي يتولى مسألتك ودوره والدولة المعنية وطريقة التواصل مع الفريق." },
      { title: "العمل والمخرجات التي تتسلمها", text: "الأسئلة المطلوب معالجتها والمستندات المطلوب مراجعتها والمخرج المتفق عليه: رأي قانوني، أو عقد تمت مراجعته، أو مشروع مستند، أو دعم لمرحلة محددة من مسألتك." },
      { title: "الأتعاب والموعد والمتابعة", text: "الأتعاب المعروضة وشروط الدفع وموعد التسليم المتوقع والإيضاحات المشمولة. ونتفق معك على أي عمل إضافي قبل البدء فيه." },
      { title: "التمثيل المحلي عند الحاجة", text: "نحدد اسم المحامي أو المكتب المحلي وصفته المهنية ونطاق التمثيل وأتعابه والمسؤولية عن الإيداعات والمواعيد الإجرائية في تكليف مكتوب مستقل." },
    ],
    link: "اطّلع على شروط الخدمة",
  },
} as const;

type EngagementStandardsProps = {
  isArabic: boolean;
  regionPath: string;
  id?: string;
};

/** Public engagement commitments; these do not assert a completed credentials audit. */
export function EngagementStandards({ isArabic, regionPath, id = "engagement-standards" }: EngagementStandardsProps) {
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
      <Link href={`${regionPath}/terms-of-service`} className="engagement-standards__link">{copy.link}</Link>
    </section>
  );
}
