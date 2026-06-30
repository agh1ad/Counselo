import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, ArrowLeft, MessageCircle, Mail, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEOHead } from "@/components/seo/SEOHead";

export default function AdministrativeLawSub() {
  const params = useParams();
  const subId = params.subId as string;
  const { t, isRTL } = useLanguage();
  const rel = t.administrativeLawDetail;
  const data = rel.services[subId as keyof typeof rel.services];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">{rel.notFound}</h1>
          <Link href="/services/administrative-law" className="text-primary hover:underline">{rel.notFoundLink}</Link>
        </div>
      </div>
    );
  }

  const otherAreas = rel.subAreas.filter((a) => a.id !== subId);

  const SEO_DATA: Record<string, { desc: string; descAr: string; kw: string; kwAr: string }> = {
    "board-of-grievances": {
      desc: "Board of Grievances legal advice in Saudi Arabia — filing administrative claims, hearings & appealing government decisions. Professional response within 24 hours via WhatsApp or email — Qanoni.",
      descAr: "استشارة قانونية في ديوان المظالم بالمملكة — تقديم الدعاوى الإدارية والجلسات والطعن في القرارات الحكومية. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "Board of Grievances lawyer Saudi Arabia, diwan al mazalim, administrative court Saudi, government appeal KSA, board of grievances online",
      kwAr: "محامي ديوان المظالم السعودية, ديوان المظالم, المحكمة الإدارية, طعن حكومي, استشارة ديوان المظالم أونلاين",
    },
    "administrative-appeals": {
      desc: "Administrative decision appeal legal advice in Saudi Arabia — challenging government & regulatory decisions. Professional response within 24 hours via WhatsApp or email — Qanoni.",
      descAr: "استشارة قانونية في استئناف القرارات الإدارية بالمملكة — الطعن في القرارات الحكومية والتنظيمية. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "administrative appeal lawyer Saudi Arabia, government decision appeal KSA, regulatory ruling challenge Saudi, administrative court appeal online",
      kwAr: "محامي استئناف قرارات إدارية السعودية, الطعن في القرارات الحكومية, استئناف إداري, استشارة إدارية أونلاين",
    },
    "government-contracts": {
      desc: "Government contract dispute legal advice in Saudi Arabia — payment delays, performance disputes & Board of Grievances claims. Professional response within 24 hours via WhatsApp or email — Qanoni.",
      descAr: "استشارة قانونية في نزاعات العقود الحكومية بالمملكة — تأخر المدفوعات ونزاعات الأداء ودعاوى ديوان المظالم. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "government contract lawyer Saudi Arabia, government contract dispute KSA, public works claim Saudi, Board of Grievances contract online",
      kwAr: "محامي عقود حكومية السعودية, نزاعات العقود الحكومية, مطالبات الأشغال العامة, استشارة عقود حكومية أونلاين",
    },
    "public-procurement": {
      desc: "Public procurement & government tender legal advice in Saudi Arabia — bidding disputes, exclusion challenges & contract awards. Professional response within 24 hours via WhatsApp or email — Qanoni.",
      descAr: "استشارة قانونية في المشتريات الحكومية والمناقصات بالمملكة — نزاعات العطاءات والاستبعاد ومنح العقود. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "public procurement lawyer Saudi Arabia, government tender KSA, procurement dispute Saudi, tender exclusion appeal, public procurement online",
      kwAr: "محامي مشتريات حكومية السعودية, مناقصات حكومية, نزاعات المناقصات, استبعاد مناقصة, استشارة مشتريات أونلاين",
    },
    "regulatory-licensing": {
      desc: "Regulatory licensing dispute legal advice in Saudi Arabia — license refusals, suspensions & appeals before regulatory bodies. Professional response within 24 hours via WhatsApp or email — Qanoni.",
      descAr: "استشارة قانونية في نزاعات التراخيص التنظيمية بالمملكة — رفض التراخيص والتعليق والطعن أمام الجهات التنظيمية. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "regulatory licensing lawyer Saudi Arabia, license refusal KSA, regulatory appeal Saudi, licensing dispute online, government license Saudi",
      kwAr: "محامي تراخيص تنظيمية السعودية, رفض الترخيص, طعن في قرار تنظيمي, ترخيص حكومي, استشارة ترخيص أونلاين",
    },
    "customs-tax-disputes": {
      desc: "Customs & tax dispute legal advice in Saudi Arabia — ZATCA claims, import duty disputes & administrative tax appeals. Professional response within 24 hours via WhatsApp or email — Qanoni.",
      descAr: "استشارة قانونية في نزاعات الجمارك والضريبة بالمملكة — مطالبات هيئة الزكاة والضريبة وضريبة القيمة المضافة. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "customs dispute lawyer Saudi Arabia, ZATCA claim KSA, tax dispute Saudi, import duty dispute, VAT appeal Saudi online",
      kwAr: "محامي نزاعات جمارك السعودية, هيئة الزكاة والضريبة والجمارك, ضريبة القيمة المضافة, رسوم جمركية, استشارة ضريبية أونلاين",
    },
    "disciplinary-proceedings": {
      desc: "Professional disciplinary & government employment legal advice in Saudi Arabia — suspension defence, dismissal & appeals. Professional response within 24 hours via WhatsApp or email — Qanoni.",
      descAr: "استشارة قانونية في الإجراءات التأديبية والوظيفة الحكومية بالمملكة — التعليق والفصل والطعن في القرارات. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "disciplinary proceedings lawyer Saudi Arabia, government employee defence KSA, civil service suspension Saudi, disciplinary appeal online",
      kwAr: "محامي تأديبية السعودية, موظف حكومي دفاع, إجراءات تأديبية, فصل موظف حكومي, استشارة تأديبية أونلاين",
    },
    "government-compensation": {
      desc: "Government compensation claim legal advice in Saudi Arabia — expropriation, public works harm & administrative damages. Professional response within 24 hours via WhatsApp or email — Qanoni.",
      descAr: "استشارة قانونية في مطالبات التعويض من الحكومة بالمملكة — نزع الملكية وأضرار الأشغال العامة والتعويض الإداري. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "government compensation lawyer Saudi Arabia, expropriation claim KSA, public works damage Saudi, administrative compensation online",
      kwAr: "محامي تعويض حكومي السعودية, نزع الملكية, أضرار الأشغال العامة, تعويض إداري, استشارة تعويض حكومي أونلاين",
    },
  };

  const seoMeta = SEO_DATA[subId] ?? { desc: data.subtitle, descAr: data.subtitle, kw: "", kwAr: "" };
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
      { "@type": "ListItem", position: 1, name: isRTL ? "الرئيسية" : "Home", item: "https://qanoni.com/" },
      { "@type": "ListItem", position: 2, name: isRTL ? "الخدمات" : "Services", item: "https://qanoni.com/services" },
      { "@type": "ListItem", position: 3, name: isRTL ? "القانون الإداري" : "Administrative Law", item: "https://qanoni.com/services/administrative-law" },
      { "@type": "ListItem", position: 4, name: data.title, item: `https://qanoni.com/services/administrative-law/${subId}` },
    ],
  };

  return (
    <div className="w-full bg-background min-h-screen">
      <SEOHead
        title={data.seoTitle}
        description={seoDescription}
        canonical={`/services/administrative-law/${subId}`}
        keywords={seoKeywords}
        schema={[faqSchema, breadcrumbSchema]}
      />

      {/* Breadcrumb */}
      <div className="bg-card border-b border-border py-4 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">{rel.breadcrumb.home}</Link>
            <ChevronRight className={`h-3.5 w-3.5 shrink-0 ${isRTL ? "rotate-180" : ""}`} />
            <Link href="/services" className="hover:text-primary transition-colors">{rel.breadcrumb.services}</Link>
            <ChevronRight className={`h-3.5 w-3.5 shrink-0 ${isRTL ? "rotate-180" : ""}`} />
            <Link href="/services/administrative-law" className="hover:text-primary transition-colors">{rel.breadcrumb.parent}</Link>
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
            <Link href="/services/administrative-law"
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
                <Link href={`/contact?service=administrative-law-${subId}`}>
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
                    <Link key={area.id} href={`/services/administrative-law/${area.id}`}
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
