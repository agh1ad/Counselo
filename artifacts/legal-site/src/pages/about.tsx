import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, MapPin, Award, Users, Globe, Zap, Scale, Star, Building2, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { SEOHead } from "@/components/seo/SEOHead";
import founderPhoto from "@assets/ChatGPT_Image_Mar_8,_2026,_04_53_46_PM_1782789204870.png";
import saudiFlag from "@assets/image_1782789705620.jpeg";
import syrianFlag from "@assets/360_F_1136337946_c5gr8LMbgzdkl80hVpy8xRXYYQBTlp5x_1782856203372.jpg";

const whyIcons = [Scale, Globe, Award, Globe, Zap, Users];

export default function About() {
  const { t, isRTL } = useLanguage();
  const { region, regionPrefix } = useRegion();
  const a = t.aboutPage;
  const heroFlag = region === "syr" ? syrianFlag : saudiFlag;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "CounselO",
      "url": "https://counselo.com",
      "logo": "https://counselo.com/logo.png",
      "description": region === "syr"
        ? (isRTL
          ? "منصة الاستشارات القانونية الإلكترونية المتخصصة في سوريا — تأسست على يد المحامي عمر البغدادي بخبرة 30+ عاماً في القانون السوري"
          : "Syria's specialized online legal consultation platform — founded by Lawyer Omar Al-Baghdadi with 30+ years of Syrian law expertise")
        : (isRTL
          ? "أكبر منصة للاستشارات القانونية الأونلاين في المملكة العربية السعودية — تأسست على يد المحامي عمر البغدادي"
          : "Saudi Arabia's largest online legal consultation platform — founded by Lawyer Omar Al-Baghdadi"),
      "foundingDate": "2020",
      "areaServed": region === "syr"
        ? { "@type": "Country", "name": "Syria" }
        : { "@type": "Country", "name": "Saudi Arabia" },
      "telephone": "+966594850247",
      "email": "bagdadio@gmail.com",
      "address": region === "syr"
        ? { "@type": "PostalAddress", "addressLocality": "Damascus", "addressRegion": "Damascus Governorate", "addressCountry": "SY" }
        : { "@type": "PostalAddress", "addressLocality": "Jubail", "addressRegion": "Eastern Province", "addressCountry": "SA" },
      "sameAs": ["https://www.linkedin.com/in/lawyeromarbaghdadi/"],
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Omar Al-Baghdadi",
      "jobTitle": "Lawyer & Legal Counsel",
      "worksFor": { "@type": "Organization", "name": "CounselO" },
      "alumniOf": { "@type": "EducationalOrganization", "name": "Faculty of Law, Damascus University" },
      "description": "Senior advocate and legal counsel with 30+ years experience across Saudi Arabia, UAE and Syria. Founder of CounselO.",
      "sameAs": ["https://www.linkedin.com/in/lawyeromarbaghdadi/"],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": isRTL ? "عن كاونسلو" : "About CounselO",
      "url": "https://counselo.com/about",
      "description": a.seoDesc,
    },
  ];

  return (
    <div className="w-full bg-background min-h-screen">
      <SEOHead
        title={a.seoTitle}
        description={a.seoDesc}
        canonical="/about"
        keywords={a.seoKeywords}
        schema={schema}
      />

      {/* ── Hero ── */}
      <section className="relative py-28 overflow-hidden">
        {/* Country flag as full background */}
        <img src={heroFlag} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" />
        {/* Dark green overlay so text stays readable */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,40,20,0.88) 0%, rgba(0,60,30,0.80) 100%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-xs font-semibold uppercase tracking-widest px-4 py-2 mb-6">
              {a.hero.badge}
            </span>
            <p className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-4">{a.hero.eyebrow}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              {a.hero.heading}
            </h1>
            <div className="w-20 h-1 bg-white/40 mb-8" />
            <p className="text-lg text-white/75 leading-relaxed max-w-2xl">{a.hero.subheading}</p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-primary/95 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {a.stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <div className="text-3xl md:text-4xl font-serif font-bold text-white mb-1">{s.stat}</div>
                <div className="text-sm text-white/70 uppercase tracking-wider">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission + Vision 2030 ── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: isRTL ? 20 : -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">{a.mission.eyebrow}</p>
              <h2 className="text-4xl font-serif font-bold text-foreground mb-6">{a.mission.heading}</h2>
              <div className="w-16 h-1 bg-primary/40 mb-8" />
              <p className="text-muted-foreground leading-relaxed mb-5">{a.mission.p1}</p>
              <p className="text-muted-foreground leading-relaxed mb-5">{a.mission.p2}</p>
              <p className="text-muted-foreground leading-relaxed">{a.mission.p3}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: isRTL ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="bg-primary p-10 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <Star className="h-8 w-8 text-white/80" />
                  <div>
                    <div className="font-serif font-bold text-xl">{a.mission.vision2030Badge}</div>
                    <div className="text-white/70 text-sm mt-1">{a.mission.vision2030Desc}</div>
                  </div>
                </div>
                <div className="border-t border-white/20 pt-6 space-y-4">
                  {[
                    isRTL ? "التحول الرقمي للخدمات القانونية" : "Digital transformation of legal services",
                    isRTL ? "إتاحة العدالة لجميع المواطنين" : "Access to justice for all citizens",
                    isRTL ? "تمكين الأعمال والمستثمرين" : "Empowering businesses and investors",
                    isRTL ? "المشورة القانونية بلا حدود جغرافية" : "Legal advice without geographic barriers",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-white/60 shrink-0" />
                      <span className="text-white/80 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 bg-card border border-border p-8">
                {region === "syr" ? (
                  <>
                    <div className="text-4xl font-serif font-bold text-primary mb-2">1957</div>
                    <p className="text-foreground font-semibold mb-2">
                      {isRTL ? "مكتب البغدادي للمحاماة — تأسس عام 1957" : "Al-Baghdadi Law Firm — Est. 1957"}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {isRTL
                        ? "إرث قانوني عريق يمتد لأكثر من 67 عاماً في سوريا — خبرة متوارثة من جيل إلى جيل في التقاضي والمشورة القانونية."
                        : "A distinguished legal legacy spanning over 67 years in Syria — expertise passed from generation to generation in litigation and legal counsel."}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-4xl font-serif font-bold text-primary mb-2">2030</div>
                    <p className="text-foreground font-semibold mb-2">
                      {isRTL ? "رؤية السعودية 2030 — الشريك القانوني الرقمي" : "Saudi Vision 2030 — Digital Legal Partner"}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {isRTL
                        ? "كاونسلو منصة رقمية تُجسّد أهداف رؤية 2030 في التحول الرقمي وتيسير الوصول إلى العدالة وتمكين المواطنين والمستثمرين."
                        : "CounselO embodies Vision 2030's goals of digital transformation, access to justice, and empowering citizens and investors across the Kingdom."}
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Founder Biography ── */}
      <section className="py-24 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">{t.aboutPage.founder.eyebrow}</p>
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">{t.aboutPage.founder.heading}</h2>
            <p className="text-muted-foreground text-lg">{t.aboutPage.founder.subheading}</p>
            <div className="w-20 h-1 bg-primary/30 mx-auto mt-6" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left col: photo + bio */}
            <motion.div initial={{ opacity: 0, x: isRTL ? 20 : -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              {/* Founder Photo */}
              <div className="mb-10 flex items-start gap-6">
                <div className="relative shrink-0">
                  <div className="w-36 h-44 border-4 border-primary/20 overflow-hidden shadow-xl">
                    <img
                      src={founderPhoto}
                      alt="Lawyer Omar Al-Baghdadi — Founder of CounselO"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="absolute -bottom-3 -end-3 bg-primary px-3 py-1.5">
                    <p className="text-white text-xs font-bold uppercase tracking-wider">
                      {isRTL ? "المؤسس" : "Founder"}
                    </p>
                  </div>
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-serif font-bold text-foreground mb-1">
                    {isRTL ? "المحامي عمر البغدادي" : "Omar Al-Baghdadi"}
                  </h3>
                  <p className="text-primary text-sm font-medium mb-3">
                    {isRTL ? "محامٍ ومستشار قانوني" : "Lawyer & Legal Counsel"}
                  </p>
                  <a
                    href="https://www.linkedin.com/in/lawyeromarbaghdadi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors border border-border hover:border-primary px-3 py-1.5"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Brother card */}
              <div className="flex items-center gap-4 mb-10 border border-primary/20 bg-primary/5 px-5 py-4">
                <div className="w-10 h-10 bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                    {isRTL ? "شقيقه" : "Brother"}
                  </p>
                  <p className="font-serif font-bold text-foreground text-base">
                    {isRTL ? "المحامي مسعف بغدادي" : "Lawyer Mus'af Al-Baghdadi"}
                  </p>
                  <p className="text-primary text-xs font-medium">
                    {isRTL ? "محامٍ — مكتب البغدادي للمحاماة" : "Lawyer — Al-Baghdadi Law Office"}
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-5 text-lg">{t.aboutPage.founder.bio1}</p>
              <p className="text-muted-foreground leading-relaxed mb-5">{t.aboutPage.founder.bio2}</p>
              <p className="text-muted-foreground leading-relaxed mb-5">{t.aboutPage.founder.bio3}</p>
              <p className="text-muted-foreground leading-relaxed">{t.aboutPage.founder.bio4}</p>

              <div className="grid grid-cols-2 gap-4 mt-10">
                {t.aboutPage.founder.stats.map((s, i) => (
                  <div key={i} className="bg-primary/5 border border-primary/20 p-5 text-center">
                    <div className="text-2xl font-serif font-bold text-primary mb-1">{s.stat}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: isRTL ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="bg-primary p-8 text-white mb-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-white/15 border border-white/25 flex items-center justify-center">
                    <Award className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <div className="font-serif font-bold text-lg">
                      {isRTL ? "المحامي والمستشار القانوني" : "Lawyer & Legal Counsel"}
                    </div>
                    <div className="text-white/70 text-sm">
                      {isRTL ? "عمر البغدادي" : "Omar Al-Baghdadi"}
                    </div>
                  </div>
                </div>
                <div className="border-t border-white/20 pt-6">
                  <p className="text-white/80 text-sm font-semibold uppercase tracking-wider mb-4">
                    {isRTL ? "المؤهلات والإنجازات" : "Credentials & Achievements"}
                  </p>
                  <ul className="space-y-3">
                    {t.aboutPage.founder.credentials.map((c, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-4 w-4 text-white/60 shrink-0 mt-0.5" />
                        <span className="text-white/80 text-sm leading-relaxed">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-card border border-border p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Building2 className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-foreground">
                    {isRTL ? "مكتب البغدادي للمحاماة — تأسس 1957" : "Al-Baghdadi Law Firm — Est. 1957"}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {isRTL
                    ? "تأسس مكتب البغدادي للمحاماة عام 1957 على يد المحامي رياض البغدادي — والد المحامي عمر البغدادي. نشأة عمر في كنف هذا الإرث القانوني العريق أرست دعائم خبرته الاستثنائية وعمقه القانوني الفريد."
                    : "Al-Baghdadi Law Firm was founded in 1957 by Lawyer Riyad Al-Baghdadi — father of Lawyer Omar Al-Baghdadi. Omar's upbringing within this distinguished legal legacy laid the foundation for his exceptional expertise and depth of legal knowledge."}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Why CounselO ── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">{a.why.eyebrow}</p>
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">{a.why.heading}</h2>
            <div className="w-16 h-1 bg-primary/30 mx-auto" />
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {a.why.points.map((point, i) => {
              const Icon = whyIcons[i] ?? Scale;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="bg-card border border-border p-8 hover:border-primary/40 transition-colors">
                  <div className="w-12 h-12 bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{point.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{point.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Physical Office ── */}
      <section className="py-20 bg-card border-t border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: isRTL ? 20 : -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">{a.office.eyebrow}</p>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-6">{a.office.heading}</h2>
              <div className="w-16 h-1 bg-primary/30 mb-8" />
              <p className="text-muted-foreground leading-relaxed mb-5">{a.office.p1}</p>
              <p className="text-muted-foreground leading-relaxed">{a.office.p2}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: isRTL ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-primary p-10 text-white">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
                    <MapPin className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <div className="font-serif font-bold text-xl">{a.office.partnerName}</div>
                    <div className="text-white/60 text-xs font-semibold uppercase tracking-wider mt-1">{a.office.licenseNo}</div>
                  </div>
                </div>
                <div className="border-t border-white/20 pt-6 mb-6">
                  <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line mb-4">{a.office.address}</p>
                  <a
                    href={a.office.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white text-xs font-semibold px-4 py-2 transition-colors"
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    {a.office.mapsLabel}
                  </a>
                </div>
                <div className="border-t border-white/20 pt-6 space-y-3">
                  {[
                    isRTL ? "مكتب محاماة مرخَّص في المنطقة الشرقية" : "Licensed law office in the Eastern Province",
                    isRTL ? "حضور شخصي أمام المحاكم وتوثيق الوثائق" : "Court attendance & official document processing",
                    isRTL ? "متكامل مع الخدمة الرقمية الأونلاين" : "Integrated with our full online digital service",
                    isRTL ? "يخدم عملاء جميع أنحاء المملكة" : "Serving clients across all of Saudi Arabia",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-white/60 shrink-0" />
                      <span className="text-white/80 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-4">{a.cta.eyebrow}</p>
            <h2 className="text-4xl font-serif font-bold text-foreground mb-6">{a.cta.heading}</h2>
            <div className="w-20 h-1 bg-primary/30 mx-auto mb-8" />
            <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-2xl mx-auto">{a.cta.desc}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`${regionPrefix}/contact`}>
                <Button size="lg" className="rounded-none bg-primary text-white hover:bg-primary/90 px-10 py-6 text-base font-semibold">
                  {a.cta.ctaBtn}
                  <ArrowRight className={`ms-2 h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
                </Button>
              </Link>
              <Link href={`${regionPrefix}/services`}>
                <Button size="lg" variant="outline" className="rounded-none border-primary text-primary hover:bg-primary hover:text-white px-10 py-6 text-base font-semibold">
                  {a.cta.learnMoreBtn}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
