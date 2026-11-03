import { ArrowRight, ClipboardCheck, FileSearch, MessageSquareText, MessagesSquare } from "lucide-react";
import "./consultation-steps.css";

const steps = [
  {
    Icon: MessageSquareText,
    en: {
      title: "Send your request",
      description: "Your question, country and documents.",
    },
    ar: {
      title: "أرسل طلبك",
      description: "سؤالك والدولة والمستندات ذات الصلة.",
    },
  },
  {
    Icon: FileSearch,
    en: {
      title: "Team review",
      description: "We review your matter and needs.",
    },
    ar: {
      title: "نراجع طلبك",
      description: "نقيّم مسألتك ونحدد ما تحتاج إليه.",
    },
  },
  {
    Icon: ClipboardCheck,
    en: {
      title: "Confirm and pay",
      description: "Agree scope, fees and delivery date.",
    },
    ar: {
      title: "الاتفاق والسداد",
      description: "نحدد النطاق والأتعاب وموعد التسليم.",
    },
  },
  {
    Icon: MessagesSquare,
    en: {
      title: "Receive your advice",
      description: "Receive the advice and discuss it.",
    },
    ar: {
      title: "استلم الاستشارة",
      description: "تسلّم المشورة وناقشها مع فريقنا.",
    },
  },
];

export function ConsultationSteps({ isArabic }: { isArabic: boolean }) {
  return (
    <section className="contact-process" id="consultation-process" aria-labelledby="consultation-process-heading" dir={isArabic ? "rtl" : "ltr"}>
      <div className="contact-process__shell">
        <header className="contact-process__header">
          <h2 id="consultation-process-heading">{isArabic ? "استشارتك في ٤ خطوات" : "Your consultation in 4 steps"}</h2>
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
                  <h3>{copy.title}</h3>
                  <p>{copy.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
