import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, ArrowLeft, MessageCircle, Mail, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { SYR_SEO_DATA } from "@/lib/seo-data-syr";

export default function TaxZakatSub() {
  const params = useParams();
  const subId = params.subId as string;
  const { t, isRTL } = useLanguage();
  const { region, regionPrefix } = useRegion();
  const cd = t.taxZakatDetail;
  const data = cd.services[subId as keyof typeof cd.services];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">{cd.notFound}</h1>
          <Link href={`${regionPrefix}/services/tax-zakat`} className="text-primary hover:underline">{cd.notFoundLink}</Link>
        </div>
      </div>
    );
  }

  const otherAreas = cd.subAreas.filter((a) => a.id !== subId);

  const SEO_DATA: Record<string, { desc: string; descAr: string; kw: string; kwAr: string }> = {
    "vat-compliance": {
      desc: "VAT lawyer in Saudi Arabia — VAT compliance, ZATCA VAT disputes and tax objections. Expert 15% VAT advice. Online consultation 24/7.",
      descAr: "محامي ضريبة القيمة المضافة في المملكة — امتثال ضريبة القيمة المضافة ونزاعات وتقديرات الهيئة. استشارة استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "VAT lawyer Saudi Arabia, VAT compliance KSA, ZATCA VAT dispute Saudi, 15% VAT Saudi Arabia, VAT objection Saudi",
      kwAr: "محامي ضريبة القيمة المضافة السعودية, امتثال ضريبة القيمة المضافة, نزاعات هيئة الزكاة ضريبة القيمة المضافة",
    },
    "zakat-disputes": {
      desc: "Zakat dispute lawyer in Saudi Arabia — ZATCA zakat assessment objections and dispute resolution. Expert zakat calculation advice. Online consultation 24/7.",
      descAr: "محامي نزاعات زكاة في المملكة — الاعتراض على تقديرات الزكاة وحسم نزاعاتها مع هيئة الزكاة والضريبة. استشارة استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "zakat dispute lawyer Saudi Arabia, ZATCA zakat objection KSA, zakat assessment Saudi, zakat calculation dispute Saudi Arabia",
      kwAr: "محامي نزاعات زكاة السعودية, الاعتراض على تقدير الزكاة, هيئة الزكاة والضريبة نزاعات",
    },
    "zatca-appeals": {
      desc: "ZATCA appeal lawyer in Saudi Arabia — Tax Dispute Resolution Committee representation and administrative court appeals. Online consultation 24/7.",
      descAr: "محامي استئناف هيئة الزكاة في المملكة — التمثيل أمام لجنة تسوية النزاعات الضريبية والمحاكم الإدارية. استشارة استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "ZATCA appeal lawyer Saudi Arabia, Tax Dispute Resolution Committee KSA, ZATCA objection Saudi, tax tribunal Saudi Arabia",
      kwAr: "محامي استئناف هيئة الزكاة السعودية, لجنة تسوية النزاعات الضريبية, استئناف الهيئة",
    },
    "corporate-tax": {
      desc: "Corporate income tax lawyer in Saudi Arabia — corporate tax compliance, ZATCA audits and assessment disputes. Online consultation 24/7.",
      descAr: "محامي ضريبة الدخل على الشركات في المملكة — الامتثال الضريبي وتدقيق الهيئة ونزاعات التقديرات. استشارة استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "corporate income tax lawyer Saudi Arabia, corporate tax KSA, ZATCA income tax audit Saudi, 20% corporate tax Saudi Arabia",
      kwAr: "محامي ضريبة دخل شركات السعودية, ضريبة دخل 20%, تدقيق ضريبي هيئة الزكاة",
    },
    "transfer-pricing": {
      desc: "Transfer pricing lawyer in Saudi Arabia — ZATCA transfer pricing documentation, audits and dispute resolution. Online consultation 24/7.",
      descAr: "محامي تسعير تحويلي في المملكة — توثيق التسعير التحويلي ومواجهة تدقيقات الهيئة وحسم نزاعاتها. استشارة استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "transfer pricing lawyer Saudi Arabia, ZATCA transfer pricing KSA, intercompany pricing Saudi, transfer pricing documentation Saudi Arabia",
      kwAr: "محامي تسعير تحويلي السعودية, توثيق التسعير التحويلي, تدقيق التسعير التحويلي هيئة الزكاة",
    },
    "customs-disputes": {
      desc: "Customs dispute lawyer in Saudi Arabia — ZATCA customs duties, tariff classification and customs penalty disputes. Online consultation 24/7.",
      descAr: "محامي نزاعات جمركية في المملكة — رسوم جمركية ونزاعات التصنيف الجمركي وغرامات الجمارك مع هيئة الزكاة. استشارة استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "customs dispute lawyer Saudi Arabia, tariff classification KSA, customs duty dispute Saudi, ZATCA customs Saudi Arabia",
      kwAr: "محامي نزاعات جمركية السعودية, تصنيف جمركي, رسوم جمركية نزاعات, هيئة الزكاة جمارك",
    },
    "tax-advisory": {
      desc: "Tax advisory lawyer in Saudi Arabia — business tax planning, structure optimization and SEZ incentive advice. Online consultation 24/7.",
      descAr: "محامي استشارات ضريبية في المملكة — تخطيط ضريبي للأعمال وتحسين الهياكل ومزايا المناطق الاقتصادية. استشارة استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "tax advisory lawyer Saudi Arabia, tax planning KSA, business tax structure Saudi, SEZ tax benefits Saudi Arabia",
      kwAr: "محامي استشارات ضريبية السعودية, تخطيط ضريبي للأعمال, تحسين الهياكل الضريبية, مناطق اقتصادية خاصة",
    },
    "excise-tax": {
      desc: "Excise tax lawyer in Saudi Arabia — selective tax compliance, ZATCA excise audits and assessment disputes. Online consultation 24/7.",
      descAr: "محامي ضريبة انتقائية في المملكة — الامتثال للضريبة الانتقائية وتدقيقات الهيئة ونزاعات تقديراتها. استشارة استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "excise tax lawyer Saudi Arabia, selective tax KSA, ZATCA excise audit Saudi, tobacco excise Saudi Arabia, energy drink tax Saudi",
      kwAr: "محامي ضريبة انتقائية السعودية, ضريبة السلع الانتقائية, تدقيق الضريبة الانتقائية هيئة الزكاة",
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
      { "@type": "ListItem", position: 3, name: isRTL ? "الزكاة والضريبة" : "Tax & Zakat Law", item: "https://counselo.com/services/tax-zakat" },
      { "@type": "ListItem", position: 4, name: data.title, item: `https://counselo.com/services/tax-zakat/${subId}` },
    ],
  };

  const legalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: data.seoTitle,
    description: seoDescription,
    url: `https://counselo.com/services/tax-zakat/${subId}`,
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
    provider: { "@type": "Organization", name: "CounselO", url: "https://counselo.com" },
  };

  return (
    <div className="w-full bg-background min-h-screen">
      <SEOHead
        title={data.seoTitle}
        description={seoDescription}
        canonical={`/services/tax-zakat/${subId}`}
        keywords={seoKeywords}
        schema={[faqSchema, breadcrumbSchema, legalServiceSchema]}
      />
      <div className="bg-card border-b border-border py-4 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">{cd.breadcrumb.home}</Link>
            <ChevronRight className={`h-3.5 w-3.5 shrink-0 ${isRTL ? "rotate-180" : ""}`} />
            <Link href="/services" className="hover:text-primary transition-colors">{cd.breadcrumb.services}</Link>
            <ChevronRight className={`h-3.5 w-3.5 shrink-0 ${isRTL ? "rotate-180" : ""}`} />
            <Link href={`${regionPrefix}/services/tax-zakat`} className="hover:text-primary transition-colors">{cd.breadcrumb.parent}</Link>
            <ChevronRight className={`h-3.5 w-3.5 shrink-0 ${isRTL ? "rotate-180" : ""}`} />
            <span className="text-foreground font-medium">{data.title}</span>
          </div>
        </div>
      </div>
      <section className="relative py-16 overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(150 100% 9%) 0%, hsl(150 80% 14%) 100%)" }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href={`${regionPrefix}/services/tax-zakat`} className="inline-flex items-center text-white/60 hover:text-white text-sm mb-8 transition-colors">
              <ArrowLeft className={`me-2 h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
              {cd.backLink}
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-white/10 border border-white/20 text-white/70 text-xs font-medium px-3 py-1.5 uppercase tracking-wider">{cd.breadcrumb.parent}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 leading-tight max-w-3xl">{data.seoTitle}</h1>
            <p className="text-xl text-white/70 italic mb-8 max-w-2xl">{data.subtitle}</p>
            <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 px-5 py-3">
              <CheckCircle2 className="h-5 w-5 text-white/70 shrink-0" />
              <span className="text-white font-semibold text-sm">{cd.experienceBadge}</span>
            </div>
          </motion.div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-16">
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">{data.overview1}</p>
              <p className="text-lg text-muted-foreground leading-relaxed">{data.overview2}</p>
            </motion.section>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="border-s-4 border-primary bg-primary/5 p-6">
              <p className="text-foreground font-medium leading-relaxed">{data.experienceNote}</p>
            </motion.div>
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-8 border-b border-border pb-4">{cd.coversHeading}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {data.covers.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-card border border-border p-4 hover:border-primary/40 transition-colors">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.section>
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-8 border-b border-border pb-4">{cd.processHeading}</h2>
              <div className="space-y-8">
                {data.process.map((step, i) => (
                  <div key={i} className="flex gap-6 relative">
                    {i !== data.process.length - 1 && <div className="absolute start-6 top-14 bottom-0 w-px bg-border" />}
                    <div className="flex-shrink-0 w-12 h-12 bg-primary flex items-center justify-center text-white font-serif font-bold text-xl relative z-10">{i + 1}</div>
                    <div className="pt-2">
                      <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-8 border-b border-border pb-4">{cd.faqHeading}</h2>
              <div className="space-y-3">
                {data.faqs.map((faq, i) => (
                  <div key={i} className="border border-border bg-card overflow-hidden">
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-start hover:bg-primary/5 transition-colors">
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
          <div className="lg:col-span-4">
            <motion.div initial={{ opacity: 0, x: isRTL ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="sticky top-28 space-y-6">
              <div className="bg-primary p-8 text-white">
                <h3 className="text-2xl font-serif font-bold text-white mb-3">{cd.sidebar.heading}</h3>
                <div className="w-12 h-1 bg-white/30 mb-5" />
                <p className="text-white/75 mb-8 leading-relaxed text-sm">{cd.sidebar.desc}</p>
                <Link href={`/contact?service=tax-zakat-${subId}`}>
                  <Button className="w-full py-6 text-base rounded-none bg-white text-primary hover:bg-white/90 font-semibold">{cd.sidebar.ctaBtn}</Button>
                </Link>
                <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-2 gap-2">
                  {[{ icon: MessageCircle, label: cd.sidebar.whatsapp }, { icon: Mail, label: cd.sidebar.email }].map(({ icon: Icon, label }, i) => (
                    <Link key={i} href="/contact" className="flex flex-col items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 py-3 px-2 transition-colors">
                      <Icon className="h-4 w-4 text-white" />
                      <span className="text-white/80 text-xs font-medium text-center leading-tight">{label}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="bg-card border border-border p-6">
                <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">{cd.relatedHeading}</h4>
                <div className="space-y-1">
                  {otherAreas.map((area) => (
                    <Link key={area.id} href={`${regionPrefix}/services/tax-zakat/${area.id}`} className="flex items-center justify-between gap-3 px-3 py-2.5 hover:bg-primary/5 hover:text-primary transition-colors group text-sm">
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
