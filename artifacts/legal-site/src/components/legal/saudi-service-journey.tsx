import { Link } from "wouter";
import { COUNSELO_PROFESSIONAL_START_YEAR } from "@/lib/public-claims";
import "./saudi-service-journey.css";
import type { Region } from "@workspace/api-zod/browser";

type Props = { isArabic: boolean; regionPrefix: string };

export function ServiceProcess({ isArabic: ar }: { isArabic: boolean }) {
  const steps = ar ? [
    ["أرسل طلبك", "اذكر ما تحتاجه والموعد المهم عبر واتساب أو نموذج التواصل. نحدد المستندات اللازمة."],
    ["اعتمد العرض", "تعرّف على نطاق العمل والرسوم وموعد التسليم، ثم وافق وأكمل الدفع وفق التعليمات."],
    ["استلم العمل", "نراجع الملف ونقدم الاستشارة بالشكل المتفق عليه: كتابةً، أو بمكالمة هاتفية أو مرئية."],
  ] : [
    ["Send your request", "Tell us what you need and any deadline via WhatsApp or the contact form. We identify the documents needed."],
    ["Approve your quote", "Review the scope, fee and delivery date, then approve and follow the payment instructions."],
    ["Receive your work", "We review your file and provide the consultation in the agreed format: writing, phone or video call."],
  ];
  return <ol className="sa-service-steps" aria-label={ar ? "خطوات الخدمة" : "Service process"}>
    {steps.map(([title, description], index) => <li key={title}>
      <span className="sa-step-number" aria-hidden="true">{index + 1}</span>
      <div><h3>{title}</h3><p>{description}</p></div>
    </li>)}
  </ol>;
}

export function ServiceReasons({ isArabic: ar, regionPrefix, aboutHref }: Props & { aboutHref?: string }) {
  const ProfileLink = aboutHref?.startsWith("#") ? "a" : Link;
  const reasons = ar ? [
    ["رد مستهدف خلال 24 ساعة", "نستهدف الرد خلال 24 ساعة، بحسب نطاق الطلب واكتمال المعلومات والاستعجال وتوفر الخدمة."],
    ["خدمة سهلة بالكامل أونلاين", "أرسل طلبك ومستنداتك وتابع استشارتك من مكانك عبر واتساب أو البريد، دون زيارة مكتب."],
    ["كتابةً أو بمكالمة صوتية أو مرئية", "اختر الشكل الأنسب لاستشارتك بالعربية أو الإنجليزية: رد مكتوب، أو مكالمة هاتفية أو فيديو، وفق الاتفاق."],
    ["فريق بخبرة قانونية تمتد لعقود", `فريق قانوني بقيادة المحامي والمستشار عمر البغدادي، الذي بدأت ممارسته عام ${COUNSELO_PROFESSIONAL_START_YEAR}، مع نطاق وأتعاب واضحة قبل البدء.`],
  ] : [
    ["Target response within 24 hours", "We aim to respond within 24 hours, subject to scope, complete information, urgency and availability."],
    ["Simple and fully online", "Send your request and documents, and follow your consultation via WhatsApp or email. No office visit needed."],
    ["Written, phone or video consultation", "Choose the format that suits you: a written response, phone call or video call, in Arabic or English, as agreed."],
    ["A team backed by decades of experience", `Our legal team is led by lawyer and legal counsel Omar Al-Baghdadi, in practice since ${COUNSELO_PROFESSIONAL_START_YEAR}, with clear scope and fees before work starts.`],
  ];
  return <section id="service-legal-checks" className="sa-service-reasons mb-12" aria-labelledby="service-legal-checks-heading">
    <h2 id="service-legal-checks-heading" className="font-serif text-3xl">{ar ? "لماذا تختار كاونسلو؟" : "Why choose CounselO?"}</h2>
    <div className="sa-reasons-grid">{reasons.map(([title, description]) => <article key={title}><h3>{title}</h3><p>{description}</p></article>)}</div>
    <ProfileLink className="sa-text-link" href={aboutHref ?? `${regionPrefix}/about#experience-methodology`}>{ar ? "تعرّف على الفريق وخلفيته المهنية" : "Meet the team and read its professional background"}</ProfileLink>
  </section>;
}

export function ServiceCosts({ isArabic: ar, regionPrefix, contactHref, region }: Props & { contactHref: string; region: Region }) {
  const QuoteLink = contactHref.startsWith("#") ? "a" : Link;
  const steps = ar ? [
    ["عرض واضح", "نرسل النطاق والأتعاب وموعد التسليم لتراجعها قبل الموافقة."],
    ["موافقتك ثم الدفع", "بعد موافقتك، نرسل تعليمات الدفع. تُسدد الأتعاب كاملة قبل تقديم الإجابة القانونية."],
    ["تأكيد ثم بدء العمل", "نؤكد استلام الدفعة ونبدأ إعداد العمل وفق الموعد المتفق عليه."],
  ] : [
    ["A clear quote", "Review the scope, fee and delivery date before you agree."],
    ["Approve, then pay", "We send payment instructions after your approval. The full fee is due before the legal answer is provided."],
    ["Confirmation, then work", "We confirm receipt and start preparing your work for the agreed delivery date."],
  ];
  return <section className="sa-service-costs mb-16" aria-labelledby="service-scope-heading">
    <h2 id="service-scope-heading" className="font-serif text-3xl">{ar ? "الأتعاب وطريقة الدفع" : "Costs and payment"}</h2>
    <div className="sa-quote-panel">
      <div><h3>{ar ? "عرض أتعاب حسب طلبك" : "A quote for your request"}</h3><p>{ar ? "تتحدد التكلفة بحسب نوع العمل وتعقيده وحجم المستندات والاستعجال. إرسال الطلب لا يلزمك بالدفع." : "The fee depends on the work, complexity, document volume and urgency. Sending a request does not commit you to payment."}</p></div>
      <QuoteLink href={contactHref} className="sa-quote-action" data-cta="contact" data-conversion-position="service-fees" data-region={region} data-lang={ar ? "ar" : "en"}>{ar ? "اطلب عرض أتعاب" : "Request a quote"}</QuoteLink>
    </div>
    <ol className="sa-payment-steps">{steps.map(([title, description], index) => <li key={title}><span aria-hidden="true">{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol>
    <p className="sa-cost-boundary">{ar ? "نوضح الخيارات دون ضمان نتيجة. التمثيل والإيداع يتطلبان تكليفاً مستقلاً عبر مهني مرخص في الدولة المعنية." : "We assess options without guaranteeing an outcome. Representation and filing require a separate engagement through a professional licensed in the relevant jurisdiction."}</p>
    <nav aria-label={ar ? "شروط الخدمة والخصوصية" : "Service terms and privacy"}>
      <Link href={`${regionPrefix}/terms-of-service`} className="sa-text-link">{ar ? "شروط الدفع والخدمة" : "Payment and service terms"}</Link>
      <Link href={`${regionPrefix}/privacy-policy`} className="sa-text-link">{ar ? "الخصوصية" : "Privacy"}</Link>
    </nav>
  </section>;
}
