import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, ArrowLeft, MessageCircle, Mail, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { SYR_SEO_DATA } from "@/lib/seo-data-syr";

export default function CyberLawSub() {
  const params = useParams();
  const subId = params.subId as string;
  const { t, isRTL } = useLanguage();
  const { region, regionPrefix } = useRegion();
  const cd = t.cyberLawDetail;
  const data = cd.services[subId as keyof typeof cd.services];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">{cd.notFound}</h1>
          <Link href={`${regionPrefix}/services/cyber-law`} className="text-primary hover:underline">{cd.notFoundLink}</Link>
        </div>
      </div>
    );
  }

  const otherAreas = cd.subAreas.filter((a) => a.id !== subId);

  const SEO_DATA: Record<string, { desc: string; descAr: string; kw: string; kwAr: string }> = {
    "cybercrime-defense": {
      desc: "Cybercrime defense lawyer in Saudi Arabia — expert defense under the Anti-Cybercrime Law (M/17). Urgent representation. Online consultation 24/7.",
      descAr: "محامي جرائم معلوماتية في المملكة — دفاع متخصص وفق نظام مكافحة الجرائم المعلوماتية (م/17). تمثيل عاجل. استشارة استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "cybercrime defense lawyer Saudi Arabia, Anti-Cybercrime Law M17 KSA, cybercrime lawyer Saudi, digital crime defense Saudi Arabia",
      kwAr: "محامي جرائم معلوماتية السعودية, نظام مكافحة الجرائم المعلوماتية م/17, محامي جرائم إلكترونية المملكة",
    },
    "data-protection": {
      desc: "Data protection lawyer in Saudi Arabia — PDPL compliance, privacy programs and NDMO regulatory advice. Online consultation 24/7.",
      descAr: "محامي حماية بيانات في المملكة — الامتثال لنظام حماية البيانات الشخصية وبرامج الخصوصية ومشورة هيئة البيانات. استشارة استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "data protection lawyer Saudi Arabia, PDPL compliance KSA, NDMO Saudi, personal data law Saudi Arabia, privacy lawyer Saudi",
      kwAr: "محامي حماية بيانات السعودية, نظام حماية البيانات الشخصية, الامتثال لنظام البيانات, هيئة البيانات الوطنية",
    },
    "online-fraud": {
      desc: "Online fraud lawyer in Saudi Arabia — digital fraud defense and victim recovery. Urgent legal action for Saudi online fraud cases. Online consultation 24/7.",
      descAr: "محامي احتيال إلكتروني في المملكة — الدفاع في الغش الرقمي واسترداد خسائر الضحايا. استشارة استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "online fraud lawyer Saudi Arabia, digital fraud defense KSA, internet fraud recovery Saudi, online scam lawyer Saudi Arabia",
      kwAr: "محامي احتيال إلكتروني السعودية, الدفاع في الغش الرقمي, استرداد خسائر الاحتيال الإلكتروني",
    },
    "hacking-defense": {
      desc: "Hacking defense lawyer in Saudi Arabia — unauthorized access and cybersecurity breach defense under Saudi law. Online consultation 24/7.",
      descAr: "محامي قضايا اختراق في المملكة — الدفاع في قضايا الوصول غير المشروع وانتهاكات الأمن السيبراني. استشارة استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "hacking defense lawyer Saudi Arabia, unauthorized access KSA, cybersecurity breach defense Saudi, computer crime lawyer Saudi Arabia",
      kwAr: "محامي قضايا اختراق السعودية, وصول غير مشروع, الدفاع في انتهاكات الأمن السيبراني",
    },
    "online-defamation": {
      desc: "Online defamation lawyer in Saudi Arabia — digital defamation defense and reputation protection. Social media and cybercrime law. Online consultation 24/7.",
      descAr: "محامي تشهير إلكتروني في المملكة — الدفاع في التشهير الرقمي وحماية السمعة. نظام الجرائم المعلوماتية ووسائل التواصل الاجتماعي. استشارة استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "online defamation lawyer Saudi Arabia, digital defamation KSA, social media defamation Saudi, reputation protection lawyer Saudi Arabia",
      kwAr: "محامي تشهير إلكتروني السعودية, التشهير الرقمي المملكة, تشهير وسائل التواصل الاجتماعي, حماية السمعة",
    },
    "ecommerce-disputes": {
      desc: "E-commerce lawyer in Saudi Arabia — online business disputes, consumer claims and e-commerce compliance. Online consultation 24/7.",
      descAr: "محامي تجارة إلكترونية في المملكة — نزاعات الأعمال الإلكترونية ومطالبات المستهلكين والامتثال لنظام التجارة الإلكترونية. استشارة استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "e-commerce lawyer Saudi Arabia, online business dispute KSA, e-commerce compliance Saudi, consumer dispute online Saudi Arabia",
      kwAr: "محامي تجارة إلكترونية السعودية, نزاعات التجارة الإلكترونية, امتثال نظام التجارة الإلكترونية",
    },
    "digital-privacy": {
      desc: "Digital privacy lawyer in Saudi Arabia — privacy rights protection, PDPL violations and SDAIA regulatory advice. Online consultation 24/7.",
      descAr: "محامي خصوصية رقمية في المملكة — حماية حقوق الخصوصية وانتهاكات نظام حماية البيانات والمشورة التنظيمية. استشارة استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "digital privacy lawyer Saudi Arabia, privacy rights KSA, SDAIA complaint Saudi, personal data misuse Saudi Arabia",
      kwAr: "محامي خصوصية رقمية السعودية, حقوق الخصوصية الرقمية, شكوى هيئة البيانات, انتهاك بيانات شخصية",
    },
    "it-contracts": {
      desc: "IT contract lawyer in Saudi Arabia — technology agreement disputes, software contracts and digital service agreements. Online consultation 24/7.",
      descAr: "محامي عقود تقنية المعلومات في المملكة — نزاعات اتفاقيات التكنولوجيا وعقود البرمجيات والخدمات الرقمية. استشارة استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "IT contract lawyer Saudi Arabia, software agreement dispute KSA, technology contract Saudi, SaaS contract dispute Saudi Arabia",
      kwAr: "محامي عقود تقنية معلومات السعودية, نزاعات عقود برمجيات, عقود خدمات تقنية, نزاعات اتفاقيات تكنولوجيا",
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
      { "@type": "ListItem", position: 3, name: isRTL ? "الجرائم المعلوماتية" : "Cyber & IT Law", item: "https://counselo.com/services/cyber-law" },
      { "@type": "ListItem", position: 4, name: data.title, item: `https://counselo.com/services/cyber-law/${subId}` },
    ],
  };

  const legalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: data.seoTitle,
    description: seoDescription,
    url: `https://counselo.com/services/cyber-law/${subId}`,
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
    provider: { "@type": "Organization", name: "CounselO", url: "https://counselo.com" },
  };

  return (
    <div className="w-full bg-background min-h-screen">
      <SEOHead
        title={data.seoTitle}
        description={seoDescription}
        canonical={`/services/cyber-law/${subId}`}
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
            <Link href={`${regionPrefix}/services/cyber-law`} className="hover:text-primary transition-colors">{cd.breadcrumb.parent}</Link>
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
            <Link href={`${regionPrefix}/services/cyber-law`} className="inline-flex items-center text-white/60 hover:text-white text-sm mb-8 transition-colors">
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
                <Link href={`/contact?service=cyber-law-${subId}`}>
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
                    <Link key={area.id} href={`${regionPrefix}/services/cyber-law/${area.id}`} className="flex items-center justify-between gap-3 px-3 py-2.5 hover:bg-primary/5 hover:text-primary transition-colors group text-sm">
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
