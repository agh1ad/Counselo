import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, ArrowLeft, MessageCircle, Mail, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { SYR_SEO_DATA } from "@/lib/seo-data-syr";

export default function EmploymentLawSub() {
  const params = useParams();
  const subId = params.subId as string;
  const { t, isRTL } = useLanguage();
  const { region, regionPrefix } = useRegion();
  const rel = t.employmentLawDetail;
  const data = rel.services[subId as keyof typeof rel.services];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">{rel.notFound}</h1>
          <Link href={`${regionPrefix}/services/employment-law`} className="text-primary hover:underline">{rel.notFoundLink}</Link>
        </div>
      </div>
    );
  }

  const otherAreas = rel.subAreas.filter((a) => a.id !== subId);

  const SEO_DATA: Record<string, { desc: string; descAr: string; kw: string; kwAr: string }> = {
    "unpaid-wages": {
      desc: "Unpaid wages & salary recovery legal advice in Saudi Arabia — HRSD claims, Labour Court & employee rights. Professional response within 24 hours via WhatsApp or email — CounselO Saudi Arabia.",
      descAr: "استشارة قانونية في استرداد الأجور غير المدفوعة بالمملكة — مطالبات وزارة الموارد البشرية ومحاكم العمل. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "unpaid wages lawyer Saudi Arabia, salary claim KSA, HRSD complaint Saudi, delayed salary Saudi, wage recovery online",
      kwAr: "محامي أجور غير مدفوعة السعودية, استرداد الراتب, شكوى وزارة الموارد البشرية, مطالبات عمالية أونلاين",
    },
    "labor-compensation": {
      desc: "Workplace injury & labour compensation legal advice in Saudi Arabia — GOSI entitlements, occupational diseases & court claims. Professional response within 24 hours via WhatsApp or email — CounselO.",
      descAr: "استشارة قانونية في التعويضات العمالية وإصابات العمل بالمملكة — مطالبات التأمينات الاجتماعية وأمراض المهنة. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "work injury lawyer Saudi Arabia, GOSI claim KSA, labour compensation Saudi, occupational disease claim, workplace injury online",
      kwAr: "محامي تعويضات عمالية السعودية, إصابات العمل, التأمينات الاجتماعية GOSI, تعويض عمالي أونلاين",
    },
    "unfair-dismissal": {
      desc: "Unfair dismissal & wrongful termination legal advice in Saudi Arabia — reinstatement rights, compensation & Labour Court claims. Professional response within 24 hours via WhatsApp or email — CounselO.",
      descAr: "استشارة قانونية في الفصل التعسفي وإنهاء الخدمة غير المشروع بالمملكة — التعويض وحقوق الموظف. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "wrongful termination lawyer Saudi Arabia, unfair dismissal KSA, dismissed employee rights Saudi, Labour Court claim online",
      kwAr: "محامي فصل تعسفي السعودية, إنهاء خدمة غير مشروع, حقوق الموظف المفصول, تعويض الفصل, استشارة فصل أونلاين",
    },
    "end-of-service": {
      desc: "End of service gratuity legal advice in Saudi Arabia — calculation, disputes & recovery under Saudi Labour Law. Professional response within 24 hours via WhatsApp — CounselO Saudi Arabia.",
      descAr: "استشارة قانونية في مكافأة نهاية الخدمة بالمملكة — الحساب الصحيح والنزاعات والاسترداد وفق نظام العمل. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "end of service lawyer Saudi Arabia, gratuity claim KSA, end of service calculation Saudi, labour law gratuity Saudi, end of service online",
      kwAr: "محامي مكافأة نهاية الخدمة السعودية, حساب نهاية الخدمة, نزاع مكافأة نهاية الخدمة, استشارة عمالية أونلاين",
    },
    "contract-disputes": {
      desc: "Employment contract dispute legal advice in Saudi Arabia — non-compete clauses, notice periods & breach remedies under Saudi Labour Law. Professional response within 24 hours via WhatsApp or email — CounselO Saudi Arabia.",
      descAr: "استشارة قانونية في نزاعات عقد العمل بالمملكة — شروط عدم المنافسة وفترة الإشعار والإخلال. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "employment contract lawyer Saudi Arabia, non-compete clause KSA, notice period dispute Saudi, employment agreement online",
      kwAr: "محامي عقد العمل السعودية, شرط عدم المنافسة, فترة الإشعار, نزاع عقد العمل, استشارة عقد عمل أونلاين",
    },
    "workplace-discrimination": {
      desc: "Workplace discrimination & harassment legal advice in Saudi Arabia — employee rights, retaliation & Labour Court claims. Professional response within 24 hours via WhatsApp or email — CounselO.",
      descAr: "استشارة قانونية في التمييز والتحرش في بيئة العمل بالمملكة — حقوق الموظف والمطالبات القضائية. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "workplace discrimination lawyer Saudi Arabia, harassment claim KSA, employee rights Saudi, workplace retaliation, discrimination claim online",
      kwAr: "محامي تمييز في العمل السعودية, تحرش في بيئة العمل, حقوق الموظف, بيئة العمل, استشارة تمييز أونلاين",
    },
  };

  const seoMeta = (region === "syr" ? SYR_SEO_DATA[subId] : undefined) ?? SEO_DATA[subId] ?? { desc: data.subtitle, descAr: data.subtitle, kw: "", kwAr: "" };
  const seoDescription = isRTL ? seoMeta.descAr : seoMeta.desc;
  const seoKeywords = isRTL ? seoMeta.kwAr : seoMeta.kw;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (data.faqs as Array<{ q: string; a: string }>).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isRTL ? "الرئيسية" : "Home", item: "https://counselo.com/" },
      { "@type": "ListItem", position: 2, name: isRTL ? "الخدمات" : "Services", item: "https://counselo.com/services" },
      { "@type": "ListItem", position: 3, name: isRTL ? "قانون العمل" : "Employment Law", item: "https://counselo.com/services/employment-law" },
      { "@type": "ListItem", position: 4, name: data.title, item: `https://counselo.com/services/employment-law/${subId}` },
    ],
  };

  const legalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": data.seoTitle,
    "description": seoDescription,
    "url": `https://counselo.com/services/employment-law/${subId}`,
    "areaServed": { "@type": "Country", "name": "Saudi Arabia" },
    "availableLanguage": ["Arabic", "English"],
    "provider": {
      "@type": "LegalService",
      "name": "CounselO قانوني",
      "url": "https://counselo.com",
      "telephone": "+966594850247",
      "founder": { "@type": "Person", "name": "Omar Al-Baghdadi", "jobTitle": "Lawyer and Legal Counsel" },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "847", "bestRating": "5" },
    },
  };

  return (
    <div className="w-full bg-background min-h-screen">
      <SEOHead
        title={data.seoTitle}
        description={seoDescription}
        canonical={`/services/employment-law/${subId}`}
        keywords={seoKeywords}
        schema={[faqSchema, breadcrumbSchema, legalServiceSchema]}
      />

      {/* Breadcrumb */}
      <div className="bg-card border-b border-border py-4 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">{rel.breadcrumb.home}</Link>
            <ChevronRight className={`h-3.5 w-3.5 shrink-0 ${isRTL ? "rotate-180" : ""}`} />
            <Link href="/services" className="hover:text-primary transition-colors">{rel.breadcrumb.services}</Link>
            <ChevronRight className={`h-3.5 w-3.5 shrink-0 ${isRTL ? "rotate-180" : ""}`} />
            <Link href={`${regionPrefix}/services/employment-law`} className="hover:text-primary transition-colors">{rel.breadcrumb.parent}</Link>
            <ChevronRight className={`h-3.5 w-3.5 shrink-0 ${isRTL ? "rotate-180" : ""}`} />
            <span className="text-foreground font-medium">{data.title}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-16 overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(150 100% 9%) 0%, hsl(150 80% 14%) 100%)" }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href={`${regionPrefix}/services/employment-law`}
              className="inline-flex items-center text-white/60 hover:text-white text-sm mb-8 transition-colors">
              <ArrowLeft className={`me-2 h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
              {rel.backLink}
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-white/10 border border-white/20 text-white/70 text-xs font-medium px-3 py-1.5 uppercase tracking-wider">
                {rel.breadcrumb.parent}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 leading-tight max-w-3xl">
              {data.seoTitle}
            </h1>
            <p className="text-xl text-white/70 italic mb-8 max-w-2xl">{data.subtitle}</p>
            <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 px-5 py-3">
              <CheckCircle2 className="h-5 w-5 text-white/70 shrink-0" />
              <span className="text-white font-semibold text-sm">{rel.experienceBadge}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-16">

          {/* Left column */}
          <div className="lg:col-span-8 space-y-16">

            {/* Overview */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">{data.overview1}</p>
              <p className="text-lg text-muted-foreground leading-relaxed">{data.overview2}</p>
            </motion.section>

            {/* Experience callout */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="border-s-4 border-primary bg-primary/5 p-6">
              <p className="text-foreground font-medium leading-relaxed">{data.experienceNote}</p>
            </motion.div>

            {/* What We Handle */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-8 border-b border-border pb-4">
                {rel.coversHeading}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {data.covers.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-card border border-border p-4 hover:border-primary/40 transition-colors">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Process */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-8 border-b border-border pb-4">
                {rel.processHeading}
              </h2>
              <div className="space-y-8">
                {data.process.map((step, i) => (
                  <div key={i} className="flex gap-6 relative">
                    {i !== data.process.length - 1 && (
                      <div className="absolute start-6 top-14 bottom-0 w-px bg-border" />
                    )}
                    <div className="flex-shrink-0 w-12 h-12 bg-primary flex items-center justify-center text-white font-serif font-bold text-xl relative z-10">
                      {i + 1}
                    </div>
                    <div className="pt-2">
                      <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* FAQ */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-8 border-b border-border pb-4">
                {rel.faqHeading}
              </h2>
              <div className="space-y-3">
                {data.faqs.map((faq, i) => (
                  <div key={i} className="border border-border bg-card overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-start hover:bg-primary/5 transition-colors">
                      <h3 className="text-base font-bold text-foreground leading-snug">{faq.q}</h3>
                      <ChevronDown className={`h-5 w-5 text-primary shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                    </button>
                    {openFaq === i && (
                      <div className="px-6 pb-6 border-t border-border">
                        <p className="text-muted-foreground leading-relaxed pt-4 text-sm">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.section>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <motion.div initial={{ opacity: 0, x: isRTL ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-28 space-y-6">

              {/* CTA card */}
              <div className="bg-primary p-8 text-white">
                <h3 className="text-2xl font-serif font-bold text-white mb-3">{rel.sidebar.heading}</h3>
                <div className="w-12 h-1 bg-white/30 mb-5" />
                <p className="text-white/75 mb-8 leading-relaxed text-sm">{rel.sidebar.desc}</p>
                <Link href={`/contact?service=employment-${subId}`}>
                  <Button className="w-full py-6 text-base rounded-none bg-white text-primary hover:bg-white/90 font-semibold">
                    {rel.sidebar.ctaBtn}
                  </Button>
                </Link>
                <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-2 gap-2">
                  {[
                    { icon: MessageCircle, label: rel.sidebar.whatsapp },
                    { icon: Mail, label: rel.sidebar.email },
                  ].map(({ icon: Icon, label }, i) => (
                    <Link key={i} href="/contact"
                      className="flex flex-col items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 py-3 px-2 transition-colors">
                      <Icon className="h-4 w-4 text-white" />
                      <span className="text-white/80 text-xs font-medium text-center leading-tight">{label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Other sub-areas */}
              <div className="bg-card border border-border p-6">
                <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">{rel.relatedHeading}</h4>
                <div className="space-y-1">
                  {otherAreas.map((area) => (
                    <Link key={area.id} href={`${regionPrefix}/services/employment-law/${area.id}`}
                      className="flex items-center justify-between gap-3 px-3 py-2.5 hover:bg-primary/5 hover:text-primary transition-colors group text-sm">
                      <span className="text-muted-foreground group-hover:text-primary transition-colors font-medium">{area.label}</span>
                      <ChevronRight className={`h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-primary shrink-0 transition-colors ${isRTL ? "rotate-180" : ""}`} />
                    </Link>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
