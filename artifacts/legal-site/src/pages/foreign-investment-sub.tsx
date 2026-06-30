import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, ArrowLeft, MessageCircle, Mail, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEOHead } from "@/components/seo/SEOHead";

export default function ForeignInvestmentSub() {
  const params = useParams();
  const subId = params.subId as string;
  const { t, isRTL } = useLanguage();
  const rel = t.foreignInvestmentDetail;
  const data = rel.services[subId as keyof typeof rel.services];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">{rel.notFound}</h1>
          <Link href="/services/foreign-investment" className="text-primary hover:underline">{rel.notFoundLink}</Link>
        </div>
      </div>
    );
  }

  const otherAreas = rel.subAreas.filter((a) => a.id !== subId);

  const SEO_DATA: Record<string, { desc: string; descAr: string; kw: string; kwAr: string }> = {
    "investment-disputes": {
      desc: "Foreign investment dispute legal advice in Saudi Arabia — joint venture disputes, partner conflicts & regulatory claims. Professional response within 24 hours via WhatsApp or email — Qanoni Saudi Arabia.",
      descAr: "استشارة قانونية في نزاعات الاستثمار الأجنبي بالمملكة — نزاعات المشاريع المشتركة والشركاء والمطالبات التنظيمية. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "investment dispute lawyer Saudi Arabia, joint venture dispute KSA, foreign investor rights Saudi, MISA dispute online",
      kwAr: "محامي نزاعات استثمار السعودية, نزاعات المشاريع المشتركة, حقوق المستثمر الأجنبي, نزاع هيئة الاستثمار أونلاين",
    },
    "investment-appeals": {
      desc: "Foreign investment decision appeal legal advice in Saudi Arabia — appealing MISA decisions, court rulings & regulatory orders. Professional response within 24 hours via WhatsApp or email — Qanoni.",
      descAr: "استشارة قانونية في استئناف قرارات الاستثمار الأجنبي بالمملكة — قرارات هيئة الاستثمار والأحكام القضائية. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "investment appeal lawyer Saudi Arabia, MISA appeal KSA, regulatory decision appeal Saudi, investment ruling appeal online",
      kwAr: "محامي استئناف استثماري السعودية, استئناف قرارات هيئة الاستثمار, استئناف قرار تنظيمي, استشارة استثمار أونلاين",
    },
    "investment-licensing": {
      desc: "Foreign investment license legal advice in Saudi Arabia — MISA licensing, conditions, restrictions & Vision 2030 compliance. Professional response within 24 hours via WhatsApp or email — Qanoni.",
      descAr: "استشارة قانونية في ترخيص الاستثمار الأجنبي بالمملكة — ترخيص هيئة الاستثمار وشروطه ومتطلبات رؤية 2030. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "MISA license lawyer Saudi Arabia, foreign investment license KSA, investment licensing Saudi, Vision 2030 compliance online",
      kwAr: "محامي ترخيص استثمار أجنبي السعودية, ترخيص هيئة الاستثمار, استثمار أجنبي رؤية 2030, استشارة ترخيص أونلاين",
    },
    "license-renewal": {
      desc: "Foreign investment license renewal & amendment in Saudi Arabia — MISA renewals, activity changes & compliance updates. Online legal advice, 24/7.",
      descAr: "استشارة قانونية في تجديد وتعديل ترخيص الاستثمار الأجنبي بالمملكة — تجديد هيئة الاستثمار وتغيير النشاط. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "investment license renewal Saudi Arabia, MISA renewal KSA, license amendment Saudi, investment activity change online",
      kwAr: "محامي تجديد ترخيص استثمار السعودية, تجديد ترخيص هيئة الاستثمار, تعديل ترخيص, استشارة تجديد أونلاين",
    },
    "license-cancellation": {
      desc: "Challenging MISA license cancellation & suspension in Saudi Arabia — defend your foreign investment rights & appeal decisions. Professional response within 24 hours via WhatsApp or email — Qanoni.",
      descAr: "استشارة قانونية في الطعن بإلغاء وتعليق ترخيص الاستثمار الأجنبي بالمملكة — الدفاع عن حقوق المستثمر. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "license cancellation lawyer Saudi Arabia, MISA suspension KSA, license revocation challenge Saudi, investment rights appeal online",
      kwAr: "محامي إلغاء ترخيص استثمار السعودية, الطعن في قرار هيئة الاستثمار, تعليق الترخيص, استشارة استثمار أونلاين",
    },
    "company-formation": {
      desc: "Foreign company formation legal advice in Saudi Arabia — company setup, licensing & branch registration under Vision 2030. Professional response within 24 hours via WhatsApp or email — Qanoni.",
      descAr: "استشارة قانونية في تأسيس الشركات الأجنبية بالمملكة — الإنشاء والترخيص وتسجيل الفروع في إطار رؤية 2030. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "foreign company formation Saudi Arabia, company setup KSA, branch registration Saudi, Vision 2030 company formation online",
      kwAr: "محامي تأسيس شركة أجنبية السعودية, إنشاء شركة في السعودية, تسجيل فرع, رؤية 2030 استثمار, استشارة تأسيس أونلاين",
    },
    "foreign-investment-dispute": {
      desc: "Investor-state & bilateral investment treaty dispute legal advice in Saudi Arabia — BIT claims, arbitration & ICSID proceedings. Professional response within 24 hours via WhatsApp or email — Qanoni.",
      descAr: "استشارة قانونية في نزاعات المستثمر مع الدولة ومعاهدات الاستثمار الثنائية بالمملكة — التحكيم الدولي والمطالبات. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "investor state dispute Saudi Arabia, BIT claim KSA, investment treaty arbitration Saudi, ICSID Saudi, foreign investor protection online",
      kwAr: "محامي نزاعات المستثمر مع الدولة السعودية, معاهدة استثمار ثنائية, تحكيم دولي استثمار, استشارة استثمار أجنبي أونلاين",
    },
    "investor-compensation": {
      desc: "Foreign investor compensation legal advice in Saudi Arabia — regulatory harm, expropriation & investment loss claims. Professional response within 24 hours via WhatsApp or email — Qanoni.",
      descAr: "استشارة قانونية في تعويض المستثمر الأجنبي بالمملكة — الضرر التنظيمي ومصادرة الاستثمار ومطالبات الخسائر. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "investor compensation lawyer Saudi Arabia, expropriation claim KSA, regulatory harm Saudi, investment loss compensation online",
      kwAr: "محامي تعويض مستثمر أجنبي السعودية, مصادرة الاستثمار, ضرر تنظيمي استثماري, استشارة تعويض أونلاين",
    },
    "share-transfer": {
      desc: "Foreign company share transfer & ownership change in Saudi Arabia — MISA approval, transfer process & exit transactions. Professional response within 24 hours via WhatsApp or email — Qanoni.",
      descAr: "استشارة قانونية في نقل أسهم الشركات الأجنبية وتغيير الملكية بالمملكة — موافقة هيئة الاستثمار وإجراءات النقل. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "share transfer lawyer Saudi Arabia, company ownership change KSA, MISA share transfer, exit transaction Saudi, share transfer online",
      kwAr: "محامي نقل أسهم السعودية, تغيير ملكية الشركة, نقل أسهم هيئة الاستثمار, صفقة الخروج, استشارة نقل أسهم أونلاين",
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
      { "@type": "ListItem", position: 3, name: isRTL ? "الاستثمار الأجنبي" : "Foreign Investment", item: "https://qanoni.com/services/foreign-investment" },
      { "@type": "ListItem", position: 4, name: data.title, item: `https://qanoni.com/services/foreign-investment/${subId}` },
    ],
  };

  return (
    <div className="w-full bg-background min-h-screen">
      <SEOHead
        title={data.seoTitle}
        description={seoDescription}
        canonical={`/services/foreign-investment/${subId}`}
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
            <Link href="/services/foreign-investment" className="hover:text-primary transition-colors">{rel.breadcrumb.parent}</Link>
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
            <Link href="/services/foreign-investment"
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
                <Link href={`/contact?service=foreign-investment-${subId}`}>
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
                    <Link key={area.id} href={`/services/foreign-investment/${area.id}`}
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
