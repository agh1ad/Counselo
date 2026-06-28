import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, ArrowLeft, MessageCircle, Mail, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEOHead } from "@/components/seo/SEOHead";

export default function BusinessLawSub() {
  const params = useParams();
  const subId = params.subId as string;
  const { t, isRTL } = useLanguage();
  const bld = t.businessLawDetail;
  const data = bld.services[subId as keyof typeof bld.services];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">{bld.notFound}</h1>
          <Link href="/services/business-law" className="text-primary hover:underline">{bld.notFoundLink}</Link>
        </div>
      </div>
    );
  }

  const otherAreas = bld.subAreas.filter((a) => a.id !== subId);

  const SEO_DATA: Record<string, { desc: string; descAr: string; kw: string; kwAr: string }> = {
    "commercial-contracts": {
      desc: "Commercial contract legal advice in Saudi Arabia — drafting, dispute resolution, breach remedies & enforcement. Online consultation via WhatsApp or email, 24/7.",
      descAr: "استشارة قانونية في العقود التجارية بالمملكة — الصياغة وتسوية النزاعات والإخلال وإنفاذ العقود. أونلاين عبر واتساب أو البريد الإلكتروني، 24/7.",
      kw: "commercial contract lawyer Saudi Arabia, contract dispute KSA, business contracts Saudi, contract enforcement online, breach of contract Saudi",
      kwAr: "محامي عقود تجارية السعودية, نزاعات العقود التجارية, إنفاذ العقود, إخلال بالعقد, استشارة عقود أونلاين",
    },
    "commercial-instruments": {
      desc: "Legal advice for dishonoured cheques, promissory notes & bills of exchange in Saudi Arabia. Online consultation via WhatsApp or email, 24/7.",
      descAr: "استشارة قانونية في الأوراق التجارية بالمملكة — الشيكات المرتجعة والكمبيالات وسندات الأمر. أونلاين عبر واتساب أو البريد الإلكتروني، 24/7.",
      kw: "cheque bounce lawyer Saudi Arabia, dishonoured cheque KSA, promissory note Saudi, bill of exchange dispute, commercial paper online",
      kwAr: "محامي شيكات مرتجعة السعودية, الأوراق التجارية, كمبيالة, سند إذني, نزاعات أوراق تجارية أونلاين",
    },
    "commercial-agency": {
      desc: "Commercial agency legal advice in Saudi Arabia — registration, disputes, termination & distributor rights. Online consultation via WhatsApp or email, 24/7.",
      descAr: "استشارة قانونية في الوكالة التجارية بالمملكة — التسجيل والنزاعات والإنهاء وحقوق الوكيل التجاري. أونلاين 24/7.",
      kw: "commercial agency lawyer Saudi Arabia, distributor dispute KSA, agency agreement Saudi, agency termination rights, commercial agent online",
      kwAr: "محامي وكالة تجارية السعودية, نزاعات الوكالة التجارية, إنهاء الوكالة, حقوق الموزع, استشارة وكالة أونلاين",
    },
    "bankruptcy-liquidation": {
      desc: "Bankruptcy, insolvency & company liquidation legal advice in Saudi Arabia — restructuring, creditor rights & court process. Online consultation, 24/7.",
      descAr: "استشارة قانونية في الإفلاس والتصفية بالمملكة — إعادة الهيكلة وحقوق الدائنين والإجراءات القضائية. أونلاين 24/7.",
      kw: "bankruptcy lawyer Saudi Arabia, company liquidation KSA, insolvency Saudi, creditor rights Saudi, restructuring online consultation",
      kwAr: "محامي إفلاس السعودية, تصفية الشركات, الإعسار المالي, إعادة الهيكلة, استشارة إفلاس أونلاين",
    },
    "company-partnership-disputes": {
      desc: "Company & partnership dispute legal advice in Saudi Arabia — shareholder rights, deadlock, dissolution & governance. Online consultation, 24/7.",
      descAr: "استشارة قانونية في نزاعات الشركات والشراكات بالمملكة — حقوق المساهمين والحلول والحوكمة المؤسسية. أونلاين 24/7.",
      kw: "company dispute lawyer Saudi Arabia, partnership dispute KSA, shareholder rights Saudi, founder dispute online, corporate governance Saudi",
      kwAr: "محامي نزاعات شركات السعودية, نزاعات الشراكة, حقوق المساهمين, حوكمة الشركات, استشارة شركات أونلاين",
    },
    "unfair-competition-commercial-fraud": {
      desc: "Legal protection against unfair competition & commercial fraud in Saudi Arabia — IP theft, trade secrets & market manipulation. Online consultation, 24/7.",
      descAr: "حماية قانونية ضد المنافسة غير المشروعة والغش التجاري في المملكة — سرقة الملكية الفكرية والأسرار التجارية. أونلاين 24/7.",
      kw: "unfair competition lawyer Saudi Arabia, commercial fraud KSA, IP theft Saudi, trade secret protection online, anti-competition Saudi",
      kwAr: "محامي منافسة غير مشروعة السعودية, الغش التجاري, سرقة الملكية الفكرية, الأسرار التجارية, استشارة تجارية أونلاين",
    },
    "trademarks": {
      desc: "Trademark registration, protection & infringement legal advice in Saudi Arabia — SAIP filings, brand disputes & enforcement. Online consultation, 24/7.",
      descAr: "استشارة قانونية في تسجيل وحماية العلامات التجارية بالمملكة — طلبات هيئة الملكية الفكرية ونزاعات العلامات. أونلاين 24/7.",
      kw: "trademark lawyer Saudi Arabia, trademark registration KSA, trademark infringement Saudi, SAIP filing, brand protection online",
      kwAr: "محامي علامات تجارية السعودية, تسجيل العلامة التجارية, انتهاك العلامة التجارية, حماية العلامة, استشارة ملكية فكرية أونلاين",
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
      { "@type": "ListItem", position: 3, name: isRTL ? "القانون التجاري" : "Commercial Law", item: "https://qanoni.com/services/business-law" },
      { "@type": "ListItem", position: 4, name: data.title, item: `https://qanoni.com/services/business-law/${subId}` },
    ],
  };

  return (
    <div className="w-full bg-background min-h-screen">
      <SEOHead
        title={data.seoTitle}
        description={seoDescription}
        canonical={`/services/business-law/${subId}`}
        keywords={seoKeywords}
        schema={[faqSchema, breadcrumbSchema]}
      />

      {/* Breadcrumb */}
      <div className="bg-card border-b border-border py-4 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">{bld.breadcrumb.home}</Link>
            <ChevronRight className={`h-3.5 w-3.5 shrink-0 ${isRTL ? "rotate-180" : ""}`} />
            <Link href="/services" className="hover:text-primary transition-colors">{bld.breadcrumb.services}</Link>
            <ChevronRight className={`h-3.5 w-3.5 shrink-0 ${isRTL ? "rotate-180" : ""}`} />
            <Link href="/services/business-law" className="hover:text-primary transition-colors">{bld.breadcrumb.parent}</Link>
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
            <Link href="/services/business-law"
              className="inline-flex items-center text-white/60 hover:text-white text-sm mb-8 transition-colors">
              <ArrowLeft className={`me-2 h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
              {bld.backLink}
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-white/10 border border-white/20 text-white/70 text-xs font-medium px-3 py-1.5 uppercase tracking-wider">
                {bld.breadcrumb.parent}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 leading-tight max-w-3xl">
              {data.seoTitle}
            </h1>
            <p className="text-xl text-white/70 italic mb-8 max-w-2xl">{data.subtitle}</p>
            {/* Experience badge */}
            <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 px-5 py-3">
              <CheckCircle2 className="h-5 w-5 text-white/70 shrink-0" />
              <span className="text-white font-semibold text-sm">{bld.experienceBadge}</span>
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
                {bld.coversHeading}
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
                {bld.processHeading}
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
                {bld.faqHeading}
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
                <h3 className="text-2xl font-serif font-bold text-white mb-3">{bld.sidebar.heading}</h3>
                <div className="w-12 h-1 bg-white/30 mb-5" />
                <p className="text-white/75 mb-8 leading-relaxed text-sm">{bld.sidebar.desc}</p>
                <Link href={`/contact?service=business-law-${subId}`}>
                  <Button className="w-full py-6 text-base rounded-none bg-white text-primary hover:bg-white/90 font-semibold">
                    {bld.sidebar.ctaBtn}
                  </Button>
                </Link>
                <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-2 gap-2">
                  {[
                    { icon: MessageCircle, label: bld.sidebar.whatsapp },
                    { icon: Mail, label: bld.sidebar.email },
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
                <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">{bld.relatedHeading}</h4>
                <div className="space-y-1">
                  {otherAreas.map((area) => (
                    <Link key={area.id} href={`/services/business-law/${area.id}`}
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
