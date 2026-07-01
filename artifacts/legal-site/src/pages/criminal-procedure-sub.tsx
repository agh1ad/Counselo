import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, ArrowLeft, MessageCircle, Mail, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { SYR_SEO_DATA } from "@/lib/seo-data-syr";

export default function CriminalProcedureSub() {
  const params = useParams();
  const subId = params.subId as string;
  const { t, isRTL } = useLanguage();
  const { region, regionPrefix } = useRegion();
  const cd = t.criminalProcedureDetail;
  const data = cd.services[subId as keyof typeof cd.services];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">{cd.notFound}</h1>
          <Link href={`${regionPrefix}/services/criminal-procedure`} className="text-primary hover:underline">{cd.notFoundLink}</Link>
        </div>
      </div>
    );
  }

  const otherAreas = cd.subAreas.filter((a) => a.id !== subId);

  const SEO_DATA: Record<string, { desc: string; descAr: string; kw: string; kwAr: string }> = {
    "preliminary-investigation": {
      desc: "Criminal investigation defense lawyer in Syria — rights during preliminary investigation, police questioning, and judicial investigation under Syrian Criminal Procedure Code. Online consultation, 24-hour response.",
      descAr: "محامي دفاع في مرحلة التحقيق الجنائي في سوريا — حقوق المشتبه به خلال الاستقصاء والتحقيق الابتدائي وفق قانون أصول المحاكمات الجزائية السوري. استجابة احترافية خلال 24 ساعة.",
      kw: "criminal investigation lawyer Syria, interrogation rights Syria, judicial investigation defense Syria, Syrian criminal procedure, police questioning Syria",
      kwAr: "محامي تحقيق جنائي سوريا, حقوق مشتبه به سوريا, دفاع تحقيق ابتدائي سوريا, قانون أصول المحاكمات الجزائية",
    },
    "detention-bail": {
      desc: "Detention and bail lawyer in Syria — challenging unlawful detention, bail applications, and release orders under Syrian law. Urgent response within 24 hours.",
      descAr: "محامي توقيف وكفالة في سوريا — الطعن بالتوقيف غير المشروع وطلبات الإفراج والكفالة بموجب القانون السوري. استجابة عاجلة خلال 24 ساعة.",
      kw: "detention lawyer Syria, bail application Syria, unlawful detention Syria, pre-trial detention Syrian law, release order Syria Damascus",
      kwAr: "محامي توقيف سوريا, طلب إفراج سوريا, توقيف غير مشروع سوريا, كفالة جزائية دمشق",
    },
    "criminal-trial": {
      desc: "Criminal trial defense lawyer in Syria — courtroom representation, cross-examination, and defense strategy in Syrian criminal courts. Professional response within 24 hours.",
      descAr: "محامي دفاع في المحاكمة الجزائية في سوريا — التمثيل في جلسات المحاكمة والمناقشة والاستجواب واستراتيجية الدفاع أمام المحاكم الجزائية السورية. استجابة احترافية خلال 24 ساعة.",
      kw: "criminal trial lawyer Syria, criminal defense Syria, courtroom defense Damascus, criminal court Syria, Syrian penal procedure defense",
      kwAr: "محامي محاكمة جزائية سوريا, دفاع جنائي سوريا, مرافعة جزائية دمشق, محكمة جزائية سوريا",
    },
    "criminal-appeal": {
      desc: "Criminal appeal lawyer in Syria — filing and arguing appeals against criminal convictions before the Syrian Court of Appeal. Expert legal advice, 24-hour response.",
      descAr: "محامي استئناف جزائي في سوريا — تقديم الاستئناف ضد أحكام الإدانة والمرافعة أمام محكمة الاستئناف السورية. استشارة متخصصة خلال 24 ساعة.",
      kw: "criminal appeal lawyer Syria, appeal conviction Syria, court of appeal Syria criminal, criminal judgment appeal Damascus, Syrian penal appeal",
      kwAr: "محامي استئناف جزائي سوريا, طعن حكم إدانة سوريا, استئناف جنائي دمشق, محكمة استئناف جزائية سوريا",
    },
    "criminal-cassation": {
      desc: "Criminal cassation lawyer in Syria — challenging final criminal convictions before the Syrian Court of Cassation. Specialist legal advice, online consultation.",
      descAr: "محامي نقض جزائي في سوريا — الطعن بالأحكام الجزائية النهائية أمام محكمة النقض السورية. استشارة قانونية متخصصة خلال 24 ساعة.",
      kw: "criminal cassation lawyer Syria, Court of Cassation Syria criminal, challenge final conviction Syria, criminal cassation Damascus, Syrian supreme court criminal",
      kwAr: "محامي نقض جزائي سوريا, محكمة النقض جنائية سوريا, طعن حكم جزائي نهائي, نقض جزائي دمشق",
    },
    "civil-in-criminal": {
      desc: "Civil action in criminal proceedings Syria — representing victims in personal (civil) claims within criminal cases under Syrian law. Online consultation, 24-hour response.",
      descAr: "محامي ادعاء شخصي ومدني في الدعوى الجزائية في سوريا — تمثيل المتضررين في الدعوى المدنية التابعة للدعوى الجنائية وفق القانون السوري. استشارة خلال 24 ساعة.",
      kw: "civil action criminal case Syria, personal claim criminal Syria, victim representation Syria criminal court, civil damages criminal Syria",
      kwAr: "ادعاء شخصي سوريا, دعوى مدنية تابعة جزائية سوريا, تعويض ضحية جريمة سوريا, محامي متضرر دمشق",
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
      { "@type": "ListItem", position: 3, name: isRTL ? "أصول المحاكمات الجزائية" : "Criminal Procedure", item: "https://counselo.com/services/criminal-procedure" },
      { "@type": "ListItem", position: 4, name: data.title, item: `https://counselo.com/services/criminal-procedure/${subId}` },
    ],
  };

  const legalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: data.seoTitle,
    description: seoDescription,
    url: `https://counselo.com/services/criminal-procedure/${subId}`,
    areaServed: { "@type": "Country", name: "Syria" },
    provider: { "@type": "Organization", name: "CounselO", url: "https://counselo.com" },
  };

  return (
    <div className="w-full bg-background min-h-screen">
      <SEOHead
        title={data.seoTitle}
        description={seoDescription}
        canonical={`/services/criminal-procedure/${subId}`}
        keywords={seoKeywords}
        schema={[faqSchema, breadcrumbSchema, legalServiceSchema]}
      />
      <div className="bg-card border-b border-border py-4 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">{cd.breadcrumb.home}</Link>
            <ChevronRight className={`h-3.5 w-3.5 shrink-0 ${isRTL ? "rotate-180" : ""}`} />
            <Link href={`${regionPrefix}/services`} className="hover:text-primary transition-colors">{cd.breadcrumb.services}</Link>
            <ChevronRight className={`h-3.5 w-3.5 shrink-0 ${isRTL ? "rotate-180" : ""}`} />
            <Link href={`${regionPrefix}/services/criminal-procedure`} className="hover:text-primary transition-colors">{cd.breadcrumb.parent}</Link>
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
            <Link href={`${regionPrefix}/services/criminal-procedure`} className="inline-flex items-center text-white/60 hover:text-white text-sm mb-8 transition-colors">
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
              {data.overview2 && <p className="text-lg text-muted-foreground leading-relaxed">{data.overview2}</p>}
            </motion.section>
            {data.experienceNote && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="border-s-4 border-primary bg-primary/5 p-6">
                <p className="text-foreground font-medium leading-relaxed">{data.experienceNote}</p>
              </motion.div>
            )}
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
                <Link href={`/contact?service=criminal-procedure-${subId}`}>
                  <Button className="w-full py-6 text-base rounded-none bg-white text-primary hover:bg-white/90 font-semibold">{cd.sidebar.ctaBtn}</Button>
                </Link>
                <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-2 gap-2">
                  {[{ icon: MessageCircle, label: cd.sidebar.whatsapp }, { icon: Mail, label: cd.sidebar.email }].map(({ icon: Icon, label }, i) => (
                    <Link key={i} href={`${regionPrefix}/contact`} className="flex flex-col items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 py-3 px-2 transition-colors">
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
                    <Link key={area.id} href={`${regionPrefix}/services/criminal-procedure/${area.id}`} className="flex items-center justify-between gap-3 px-3 py-2.5 hover:bg-primary/5 hover:text-primary transition-colors group text-sm">
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
