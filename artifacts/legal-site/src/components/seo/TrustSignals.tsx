import { Award, BriefcaseBusiness, Languages, LockKeyhole, Scale, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

type TrustSignalsProps = {
  isArabic: boolean;
  regionPrefix: string;
  compact?: boolean;
};

export function TrustSignals({ isArabic, regionPrefix, compact = false }: TrustSignalsProps) {
  const regional = /^\/(?:sa|syr|uae)(?:\/|$)/.test(regionPrefix);
  const sharedHome = isArabic ? "/ar" : "/";
  const country = regionPrefix.startsWith("/uae")
    ? isArabic ? "الإمارات" : "the UAE"
    : regionPrefix.startsWith("/syr")
      ? isArabic ? "سوريا" : "Syria"
      : isArabic ? "السعودية" : "Saudi Arabia";
  const representationText = isArabic
    ? `ابدأ استشارتك أونلاين وتابع مستنداتك وملفك عن بُعد مع فريق كاونسلو نفسه حتى التمثيل القانوني. ويباشر أعضاء فريقنا المرخصون محلياً العمل أمام المحاكم والجهات المختصة${regional ? ` في ${country}` : " في السعودية وسوريا والإمارات"}.`
    : `Consult online, review documents and follow your case remotely with the same CounselO team through legal representation. Our locally licensed team members act before courts and authorities${regional ? ` in ${country}` : " in Saudi Arabia, Syria and the UAE"}.`;
  const items = isArabic
    ? [
        { icon: Award, title: "فريق قانوني متمرس", text: "يجمع فريق كاونسلو الخبرة في تحليل العقود والمنازعات والمسائل الأسرية والعمالية والعقارية لإعداد مشورة عملية." },
        { icon: BriefcaseBusiness, title: "صياغة ومراجعة مهنية", text: "نربط الوقائع والمستندات بالسؤال القانوني، ونعدّ العقود والاتفاقيات والمذكرات اللازمة لخطوتك المقبلة." },
        { icon: Scale, title: "فريق واحد من الاستشارة إلى التمثيل", text: representationText },
        { icon: Languages, title: "أونلاين بالعربية والإنجليزية", text: "تتوفر الاستشارات ومراجعة المستندات والمتابعة أونلاين بالعربية والإنجليزية، من منزلك أو مكان عملك." },
        { icon: LockKeyhole, title: "سرية مهنية", text: "تُعامل معلومات العملاء ومستنداتهم باعتبارها معلومات قانونية سرية، ويُطلب فقط ما يلزم لتقييم المسألة." },
        { icon: ShieldCheck, title: "نطاق خدمة شفاف", text: "نتفق معك على العمل المطلوب والأتعاب والوقت قبل البدء، ونتولى إجراءات التفويض اللازمة للتمثيل ضمن متابعة فريقنا لملفك." },
      ]
    : [
        { icon: Award, title: "Experienced legal team", text: "CounselO’s team brings experience in contracts, disputes, family, employment and property matters to practical legal advice." },
        { icon: BriefcaseBusiness, title: "Professional drafting and review", text: "We connect the facts and documents to the legal question, preparing contracts, agreements and memoranda for your next step." },
        { icon: Scale, title: "One team from advice to representation", text: representationText },
        { icon: Languages, title: "Online in Arabic and English", text: "Consult online, review documents and follow your matter from home or work, in Arabic or English." },
        { icon: LockKeyhole, title: "Professional confidentiality", text: "Client information and legal documents are treated as confidential, and only information needed to assess the matter is requested." },
        { icon: ShieldCheck, title: "Transparent service scope", text: "We agree the work, fees and timing with you before starting and handle the authorization needed for representation as part of our team’s work on your matter." },
      ];

  return (
    <section className={`${compact ? "py-10" : "py-16"} bg-card border-y border-border`} aria-labelledby="trust-signals-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-9">
          <p className="text-primary font-medium uppercase tracking-widest text-sm mb-2">
            {isArabic ? "الثقة والشفافية" : "Trust and transparency"}
          </p>
          <h2 id="trust-signals-heading" className="text-3xl font-serif font-bold text-foreground mb-3">
            {isArabic ? "لماذا يختار العملاء كاونسلو للاستشارات القانونية؟" : "Why clients choose CounselO Legal"}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {isArabic ? "معلومات واضحة عن الخبرة وطريقة تقديم الخدمة والسرية ونطاق العمل من الاستشارة إلى التمثيل." : "Clear information about experience, service delivery, confidentiality, and the work from consultation through representation."}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-background border border-border p-5">
              <Icon className="h-6 w-6 text-primary mb-3" aria-hidden="true" />
              <h3 className="font-bold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
        <nav aria-label={isArabic ? "روابط الثقة والسياسات" : "Trust and policy links"} className="flex flex-wrap gap-x-6 gap-y-3 mt-8 text-sm font-semibold">
          <Link href={regional ? `${regionPrefix}/about` : `${sharedHome}#about`} className="text-primary hover:underline">
            {isArabic ? "عن المؤسس والفريق" : "Founder and team"}
          </Link>
          {regional && <><Link href={`${regionPrefix}/privacy-policy`} className="text-primary hover:underline">
            {isArabic ? "الخصوصية والسرية" : "Privacy and confidentiality"}
          </Link>
          <Link href={`${regionPrefix}/terms-of-service`} className="text-primary hover:underline">
            {isArabic ? "شروط ونطاق الخدمة" : "Terms and service scope"}
          </Link></>}
          <Link href={regional ? `${regionPrefix}/contact` : `${sharedHome}#contact`} className="text-primary hover:underline">
            {regional ? isArabic ? "تواصل مع كاونسلو للاستشارات القانونية" : "Contact CounselO Legal" : isArabic ? "اختر الاختصاص ونطاق الخدمة" : "Choose your jurisdiction and service scope"}
          </Link>
        </nav>
      </div>
    </section>
  );
}
