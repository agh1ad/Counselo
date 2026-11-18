import { ArrowRight, ClipboardCheck, FileSearch, MessageSquareText, MessagesSquare } from "lucide-react";

const steps = [
  {
    Icon: MessageSquareText,
    en: {
      title: "Send your request",
      description: "Tell us your legal matter, country, documents and the help you need.",
    },
    ar: {
      title: "أرسل طلبك",
      description: "وضح مسألتك والدولة والمستندات والمساعدة التي تحتاج إليها.",
    },
  },
  {
    Icon: FileSearch,
    en: {
      title: "Team review",
      description: "Our team reviews your matter and identifies the advice, drafting or representation required.",
    },
    ar: {
      title: "نراجع طلبك",
      description: "يراجع فريقنا مسألتك ويحدد ما تحتاج إليه من مشورة أو صياغة أو تمثيل قانوني.",
    },
  },
  {
    Icon: ClipboardCheck,
    en: {
      title: "Agree the work and fees",
      description: "Consultations have published fixed fees. We agree drafting and representation fees, scope and timing before work begins.",
    },
    ar: {
      title: "نتفق على العمل والأتعاب",
      description: "للاستشارات رسوم ثابتة منشورة. ونتفق على نطاق الصياغة والتمثيل وأتعابهما ومواعيدهما قبل بدء العمل.",
    },
  },
  {
    Icon: MessagesSquare,
    en: {
      title: "One team follows through",
      description: "The same CounselO team handles your online communication, legal work and representation, including required court attendance through its appropriately licensed members.",
    },
    ar: {
      title: "فريق واحد يتابع معك",
      description: "يتولى فريق كاونسلو نفسه التواصل معك أونلاين والعمل القانوني والتمثيل، بما يشمل الحضور المطلوب أمام المحاكم بأعضائه المرخصين في الدولة المعنية.",
    },
  },
];

export function ConsultationSteps({ isArabic, isConsultation = false }: { isArabic: boolean; isConsultation?: boolean }) {
  return (
    <section className="contact-process" id="consultation-process" aria-labelledby="consultation-process-heading" dir={isArabic ? "rtl" : "ltr"}>
      <div className="contact-process__shell">
        <header className="contact-process__header">
          <h2 id="consultation-process-heading">{isConsultation
            ? (isArabic ? "استشارتك في ٤ خطوات" : "Your consultation in 4 steps")
            : (isArabic ? "من طلبك إلى إنجاز العمل القانوني" : "From your request to legal action")}</h2>
        </header>
        <ol className="contact-process__steps" role="list">
          {steps.map(({ Icon, en, ar }, index) => {
            const copy = isArabic ? ar : en;
            return (
              <li className="contact-process__step" key={en.title}>
                <div className="contact-process__marker" aria-hidden="true">
                  <Icon size={21} strokeWidth={1.5} />
                  <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
                </div>
                {index < steps.length - 1 && <ArrowRight className="contact-process__arrow" size={16} strokeWidth={1.5} aria-hidden="true" />}
                <div className="contact-process__copy">
                  <h3>{isConsultation && index === 2
                    ? (isArabic ? "الاتفاق والسداد" : "Confirm and pay")
                    : isConsultation && index === 3
                      ? (isArabic ? "استلم الاستشارة" : "Receive your advice")
                      : copy.title}</h3>
                  <p>{isConsultation && index === 2
                    ? (isArabic ? "نؤكد مجال الاستشارة ورسومه المنشورة وتفاصيل التسليم قبل السداد." : "Confirm your consultation category, published fee and delivery details before payment.")
                    : isConsultation && index === 3
                      ? (isArabic ? "تسلّم استشارة مهنية مكتوبة ومفصلة وناقش أسئلتك ضمن الموضوع نفسه." : "Receive detailed professional written advice and discuss questions on the same topic.")
                      : copy.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
