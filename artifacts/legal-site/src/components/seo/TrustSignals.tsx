import { Award, BriefcaseBusiness, Languages, LockKeyhole, Scale, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

type TrustSignalsProps = {
  isArabic: boolean;
  regionPrefix: string;
  compact?: boolean;
};

export function TrustSignals({ isArabic, regionPrefix, compact = false }: TrustSignalsProps) {
  const items = isArabic
    ? [
        { icon: Award, title: "قيادة قانونية خبيرة", text: "تأسست كاونسلو بقيادة المحامي والمستشار القانوني عمر البغدادي، بخبرة قانونية معلنة تزيد على 30 عاماً." },
        { icon: BriefcaseBusiness, title: "خبرة عملية واسعة", text: "تذكر كاونسلو أن فريقها تعامل مع أكثر من 20,000 قضية واستشارة في مجالات قانونية متعددة." },
        { icon: Scale, title: "نموذج تمثيل واضح", text: regionPrefix.startsWith("/syr") ? "تُدار المسائل السورية من خلال الممارسة القانونية في سوريا، مع توضيح نطاق الاستشارة والتمثيل." : "عندما تتطلب المسألة حضوراً في السعودية، تنسق كاونسلو مع مكتب محاماة سعودي متعاون ومرخص وفق نطاق التكليف." },
        { icon: Languages, title: "العربية والإنجليزية", text: "تتوفر الاستشارات ومراجعة المستندات باللغتين العربية والإنجليزية." },
        { icon: LockKeyhole, title: "سرية مهنية", text: "تُعامل معلومات العملاء ومستنداتهم باعتبارها معلومات قانونية سرية، ويُطلب فقط ما يلزم لتقييم المسألة." },
        { icon: ShieldCheck, title: "نطاق خدمة شفاف", text: "لا تنشئ الاستشارة وحدها تفويضاً بالتمثيل أمام المحاكم؛ ويتطلب التمثيل اتفاقاً منفصلاً يحدد نطاق العمل." },
      ]
    : [
        { icon: Award, title: "Experienced legal leadership", text: "CounselO was founded and is led by Lawyer and Legal Counsel Omar Al-Baghdadi, with a stated 30+ years of legal experience." },
        { icon: BriefcaseBusiness, title: "Extensive practical experience", text: "CounselO states that its team has handled more than 20,000 cases and consultations across multiple practice areas." },
        { icon: Scale, title: "Clear representation model", text: regionPrefix.startsWith("/syr") ? "Syrian matters are handled through the legal practice in Syria, with the consultation and representation scope explained to each client." : "When a Saudi matter requires attendance, CounselO coordinates with a licensed cooperating Saudi law office within the agreed engagement." },
        { icon: Languages, title: "Arabic and English", text: "Legal consultations and document review are available in both Arabic and English." },
        { icon: LockKeyhole, title: "Professional confidentiality", text: "Client information and legal documents are treated as confidential, and only information needed to assess the matter is requested." },
        { icon: ShieldCheck, title: "Transparent service scope", text: "A consultation alone does not create a court-representation mandate; representation requires a separate agreement defining the work." },
      ];

  return (
    <section className={`${compact ? "py-10" : "py-16"} bg-card border-y border-border`} aria-labelledby="trust-signals-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-9">
          <p className="text-primary font-medium uppercase tracking-widest text-sm mb-2">
            {isArabic ? "الثقة والشفافية" : "Trust and transparency"}
          </p>
          <h2 id="trust-signals-heading" className="text-3xl font-serif font-bold text-foreground mb-3">
            {isArabic ? "لماذا يختار العملاء كاونسلو؟" : "Why clients choose CounselO"}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {isArabic ? "معلومات واضحة عن الخبرة وطريقة تقديم الخدمة والسرية ونطاق التمثيل قبل بدء الاستشارة." : "Clear information about experience, service delivery, confidentiality, and representation scope before a consultation begins."}
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
          <Link href={`${regionPrefix}/about`} className="text-primary hover:underline">
            {isArabic ? "عن المؤسس والفريق" : "Founder and team"}
          </Link>
          <Link href={`${regionPrefix}/privacy-policy`} className="text-primary hover:underline">
            {isArabic ? "الخصوصية والسرية" : "Privacy and confidentiality"}
          </Link>
          <Link href={`${regionPrefix}/terms-of-service`} className="text-primary hover:underline">
            {isArabic ? "شروط ونطاق الخدمة" : "Terms and service scope"}
          </Link>
          <Link href={`${regionPrefix}/contact`} className="text-primary hover:underline">
            {isArabic ? "تواصل مع كاونسلو" : "Contact CounselO"}
          </Link>
        </nav>
      </div>
    </section>
  );
}
