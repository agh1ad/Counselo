import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/seo/SEOHead";
import { Scale, ShieldCheck, Users, ArrowRight, CheckCircle2, Star, Quote, MessageCircle, Mail, Award, Globe, Zap, BadgeCheck, Wifi, Clock, Lock, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const platformIcons = { wifi: Wifi, clock: Clock, lock: Lock, globe: Globe };
const whyIcons = [Zap, ShieldCheck, Award, Globe];
const clientIcons = [Users, Scale, Globe, BadgeCheck];
const channelIcons = [MessageCircle, Mail];
const channelColors = ["bg-[#25D366]", "bg-white/15 border border-white/30"];

export default function Home() {
  const { t, isRTL } = useLanguage();
  const h = t.home;

  return (
    <div className="w-full">
      <SEOHead
        title={isRTL
          ? "كاونسلو | منصة المملكة للاستشارات القانونية الأونلاين | استجابة خلال 24 ساعة"
          : "CounselO | Saudi Arabia's Online Legal Consultation Platform | Response Within 24 Hours"}
        description={isRTL
          ? "قانوني — منصة المملكة العربية السعودية للاستشارات القانونية الأونلاين. مشورة قانونية متخصصة خلال 24 ساعة عبر واتساب أو البريد الإلكتروني للأفراد والشركات والمستثمرين. 18 مجالاً قانونياً، خبرة تزيد على 30 عاماً، أكثر من 20,000 قضية. بإشراف المحامي والمستشار القانوني عمر البغدادي. متاحة بالعربية والإنجليزية في الجبيل والرياض وجدة والدمام وجميع مناطق المملكة. رؤية 2030."
          : "CounselO is Saudi Arabia's online legal consultation platform — professional legal response within 24 hours via WhatsApp or email. 18 practice areas covering family law, commercial law, employment, real estate, foreign investment, administrative law, criminal law, banking, tax, and more. Founded by Lawyer and Legal Counsel Omar Al-Baghdadi. 30+ years experience, 20,000+ cases. Serving Jubail, Riyadh, Jeddah, Dammam and all regions. Vision 2030 aligned."}
        canonical="/"
        keywords={isRTL
          ? "استشارة قانونية أونلاين السعودية, محامي أونلاين المملكة, مشورة قانونية خلال 24 ساعة, قانون الأسرة السعودي, القانون التجاري السعودي, قانون العمل, القانون العقاري, استثمار أجنبي, القانون الإداري, استشارة قانونية واتساب, قانون جنائي سعودي, قانون ضريبي زكاة, مشورة قانونية الجبيل, عمر البغدادي, رؤية 2030, قانوني"
          : "online legal consultation Saudi Arabia, Saudi Arabia's online legal platform, lawyer online Saudi Arabia, legal advice within 24 hours KSA, family law Saudi Arabia, commercial law KSA, employment law Saudi Arabia, real estate law KSA, foreign investment lawyer Saudi Arabia, administrative law KSA, criminal law Saudi Arabia, banking finance law, tax zakat lawyer, medical malpractice KSA, WhatsApp legal consultation, Omar Al-Baghdadi, Jubail lawyer, Vision 2030 legal, CounselO"}
        schema={{
          "@context": "https://schema.org",
          "@type": "LegalService",
          "name": "CounselO قانوني",
          "alternateName": "CounselO Online Legal Consultations",
          "description": isRTL
            ? "منصة المملكة العربية السعودية للاستشارات القانونية الأونلاين — 18 مجالاً قانونياً، استجابة خلال 24 ساعة، بإشراف المحامي عمر البغدادي"
            : "Saudi Arabia's online legal consultation platform — 18 practice areas, professional response within 24 hours, founded by Lawyer Omar Al-Baghdadi",
          "url": "https://counselo.com/",
          "logo": "https://counselo.com/logo.png",
          "founder": {
            "@type": "Person",
            "name": "Omar Al-Baghdadi",
            "jobTitle": "Lawyer and Legal Counsel",
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Jubail",
            "addressRegion": "Eastern Province",
            "addressCountry": "SA",
          },
          "areaServed": {
            "@type": "Country",
            "name": "Saudi Arabia",
          },
          "availableLanguage": ["Arabic", "English"],
          "serviceType": ["Family Law", "Commercial Law", "Employment Law", "Real Estate Law", "Foreign Investment Law", "Administrative Law", "Criminal Law", "Banking & Finance Law", "Tax & Zakat Law", "Cyber Law", "Medical Malpractice", "Insurance Law", "Immigration Law", "Arbitration", "Enforcement Law", "Companies Law", "Contracts Law"],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Legal Consultation Services",
            "numberOfItems": 18,
          },
          "sameAs": ["https://counselo.com"],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "legal consultation",
            "availableLanguage": ["Arabic", "English"],
            "contactOption": "TollFree",
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "847",
            "bestRating": "5",
          },
        }}
      />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Solid dark green base */}
        <div className="absolute inset-0 z-0" style={{ background: "hsl(150 100% 5%)" }} />

        {/* Radial glow — upper right */}
        <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse at 75% 30%, hsl(150 60% 22% / 0.55) 0%, transparent 65%)" }} />

        {/* Decorative grid lines */}
        <div className="absolute inset-0 z-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 inset-x-0 h-32 z-0" style={{ background: "linear-gradient(to bottom, transparent, hsl(150 100% 5% / 0.8))" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — text */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6">
                {h.hero.h1a}<br />
                <span className="text-white/70 italic">{h.hero.h1b}</span>
              </h1>

              <p className="text-xl text-white/75 mb-3 leading-relaxed font-light">
                {h.hero.desc} <strong className="text-white font-semibold">{h.hero.descBold}</strong>
              </p>
              <p className="text-base text-white/55 mb-10 leading-relaxed">{h.hero.subDesc}</p>

              {/* Primary CTA */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/contact">
                  <Button size="lg" className="text-base px-8 py-6 rounded-none w-full sm:w-auto bg-white text-primary hover:bg-white/90 font-semibold shadow-lg">{h.hero.bookBtn}</Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="outline" className="text-base px-8 py-6 rounded-none w-full sm:w-auto border-white/30 text-white hover:bg-white/10">{h.hero.servicesBtn}</Button>
                </Link>
              </div>

              {/* Channel quick-start buttons */}
              <div className="flex flex-wrap gap-3">
                {h.hero.channels.map((ch, i) => {
                  const Icon = channelIcons[i];
                  return (
                    <Link key={i} href="/contact"
                      className={`flex items-center gap-2.5 ${channelColors[i]} text-white px-4 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity`}>
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{ch.label}</span>
                      <span className="text-white/60 text-xs font-normal hidden sm:block">· {ch.sub.split("·")[1]?.trim()}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>

            {/* Right — platform card */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className="hidden lg:block">
              <div className="bg-white/5 border border-white/15 p-8 space-y-5 backdrop-blur-sm">
                <div className="text-white/50 text-xs uppercase tracking-widest mb-6">How it works in 4 steps</div>
                {h.howItWorks.steps.map((s, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-9 h-9 bg-primary/80 border border-white/10 flex items-center justify-center text-white font-serif font-bold text-sm shrink-0">{s.step}</div>
                    <div>
                      <div className="text-white font-semibold text-sm mb-1">{s.title}</div>
                      <div className="text-white/50 text-xs leading-relaxed">{s.desc}</div>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="text-white/40 text-xs">Trusted across Saudi Arabia</div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />)}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="py-12 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x rtl:divide-x-reverse divide-border">
            {h.stats.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center px-4">
                <div className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2 leading-tight">{item.stat}</div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider leading-snug">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORM ADVANTAGES ── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">{h.platform.eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">{h.platform.heading}</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-muted-foreground text-lg leading-relaxed">{h.platform.subheading}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {h.platform.advantages.map((adv, i) => {
              const Icon = platformIcons[adv.icon as keyof typeof platformIcons] ?? Globe;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card border border-border p-8 hover:border-primary/50 hover:shadow-md transition-all group">
                  <div className="w-12 h-12 bg-primary flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-3">{adv.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{adv.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">{h.howItWorks.eyebrow}</p>
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">{h.howItWorks.heading}</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-muted-foreground text-lg">{h.howItWorks.subheading}</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {h.howItWorks.steps.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative bg-background border border-border p-8 hover:border-primary/50 hover:shadow-md transition-all">
                <div className="text-6xl font-serif font-bold text-primary/10 absolute top-4 end-6 leading-none select-none">{s.step}</div>
                <div className="text-primary font-mono text-sm font-bold mb-4">{s.step}</div>
                <h3 className="text-xl font-serif font-bold text-foreground mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONSULTATION METHODS ── */}
      <section className="py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-white/60 uppercase tracking-widest text-sm font-medium mb-3">{h.consultMethods.eyebrow}</p>
            <h2 className="text-4xl font-serif font-bold text-white mb-4">{h.consultMethods.heading}</h2>
            <div className="w-20 h-1 bg-white/30 mx-auto mb-6" />
            <p className="text-white/70 text-lg leading-relaxed">{h.consultMethods.intro}</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {h.consultMethods.methods.map((method, i) => {
              const Icon = channelIcons[i];
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white/10 border border-white/20 p-8 relative hover:bg-white/15 transition-colors">
                  <div className="absolute top-4 end-4 bg-white/20 text-white text-xs font-semibold px-2 py-1 uppercase tracking-wider">{method.badge}</div>
                  <Icon className="h-10 w-10 text-white/70 mb-6" />
                  <h3 className="text-xl font-serif font-bold text-white mb-3">{method.title}</h3>
                  <p className="text-white/70 leading-relaxed text-sm mb-6">{method.desc}</p>
                  <Link href="/contact" className="inline-flex items-center gap-2 text-white text-sm font-semibold border-b border-white/40 pb-0.5 hover:border-white transition-colors">
                    {h.consultMethods.ctaBtn} <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
          <div className="text-center">
            <Link href="/contact">
              <Button size="lg" className="text-lg px-12 py-6 rounded-none bg-white text-primary hover:bg-white/90 font-semibold">{h.consultMethods.ctaBtn}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT / FOUNDER ── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">{h.about.eyebrow}</p>
              <h2 className="text-4xl font-serif font-bold text-foreground mb-6">{h.about.heading}</h2>
              <div className="w-20 h-1 bg-primary mb-8" />
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{h.about.p1}</p>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{h.about.p2}</p>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">{h.about.p3}</p>
              <ul className="space-y-4">
                {h.about.bullets.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground">
                    <CheckCircle2 className="text-primary h-5 w-5 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col gap-0">
              <div className="aspect-[4/5] relative shadow-2xl border border-border overflow-hidden">
                <img src="/omar-baghdadi.jpg" alt="Lawyer Omar Al-Baghdadi — Lawyer and Legal Counsel, Founder of CounselO — 30+ years, 20,000+ cases"
                  className="w-full h-full object-cover object-top" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-6 pb-6 pt-20">
                  <div className="text-white/60 uppercase tracking-widest text-xs mb-1">{h.about.founderRole}</div>
                  <div className="text-xl font-serif font-bold text-white leading-tight">{h.about.founderName}</div>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="bg-primary px-6 py-5 flex flex-col justify-center shadow-lg">
                  <span className="text-2xl font-serif text-white font-bold mb-0.5">{h.about.caseStat}</span>
                  <span className="text-white/75 font-medium uppercase tracking-wider text-xs leading-tight">{h.about.caseLabel}</span>
                </div>
                <div className="bg-foreground px-6 py-5 flex flex-col justify-center shadow-lg">
                  <span className="text-2xl font-serif text-white font-bold mb-0.5">30+</span>
                  <span className="text-white/75 font-medium uppercase tracking-wider text-xs leading-tight">{h.about.yearsLabel ?? (isRTL ? "سنة خبرة قانونية" : "Years of Legal Experience")}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHO WE SERVE ── */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">{h.whoWeServe.eyebrow}</p>
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">{h.whoWeServe.heading}</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-muted-foreground text-lg">{h.whoWeServe.subheading}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {h.whoWeServe.clients.map((client, i) => {
              const Icon = clientIcons[i];
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-background border border-border p-8 hover:border-primary/50 hover:shadow-md transition-all text-center">
                  <div className="w-14 h-14 bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{client.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{client.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PRACTICE AREAS ── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="mb-16">
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">{h.practiceAreas.eyebrow}</p>
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">{h.practiceAreas.heading}</h2>
            <div className="w-20 h-1 bg-primary mb-6" />
            <p className="text-muted-foreground text-lg max-w-2xl">{h.practiceAreas.subheading}</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {h.practiceAreas.areas.map((area, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-card border border-border p-8 hover:border-primary/50 hover:shadow-md transition-all">
                <h3 className="text-xl font-serif font-bold text-foreground mb-4 group-hover:text-primary transition-colors">{area.title}</h3>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{area.desc}</p>
                <Link href={area.path} className="inline-flex items-center text-primary text-sm font-medium group-hover:underline underline-offset-4">
                  <span>{h.practiceAreas.viewAllBtn.split(" ")[0]}</span>
                  <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/services">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-none px-8">{h.practiceAreas.viewAllBtn}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY ADLIX ── */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">{h.whyAdlix.eyebrow}</p>
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">{h.whyAdlix.heading}</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {h.whyAdlix.features.map((feature, i) => {
              const Icon = whyIcons[i];
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center">
                  <div className="w-14 h-14 bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">{h.testimonials.eyebrow}</p>
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">{h.testimonials.heading}</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {h.testimonials.items.map((testimonial, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border p-8 relative hover:shadow-md transition-shadow">
                <Quote className="h-8 w-8 text-primary/15 absolute top-8 start-8" />
                <div className="flex mb-6 mt-2 relative z-10 ps-10">
                  {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 text-primary fill-primary" />)}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed relative z-10 italic text-sm">"{testimonial.quote}"</p>
                <div className="font-bold text-foreground">{testimonial.author}</div>
                <div className="text-sm text-primary">{testimonial.title}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden bg-primary">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 80% 50%, hsl(150 80% 30% / 0.4) 0%, transparent 60%)" }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div {...fadeIn}>
            <p className="text-white/60 uppercase tracking-widest text-sm font-medium mb-4">{h.cta.eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">{h.cta.heading}</h2>
            <p className="text-xl text-white/75 mb-4">{h.cta.desc}</p>
            <p className="text-white/50 text-base mb-10">{h.cta.subDesc}</p>
            {/* Channel row inside CTA */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {h.hero.channels.map((ch, i) => {
                const Icon = channelIcons[i];
                return (
                  <Link key={i} href="/contact"
                    className="flex items-center gap-2 bg-white/15 border border-white/25 text-white px-5 py-3 text-sm font-semibold hover:bg-white/20 transition-colors">
                    <Icon className="h-4 w-4" /> {ch.label}
                  </Link>
                );
              })}
            </div>
            <Link href="/contact">
              <Button size="lg" className="text-lg px-12 py-8 rounded-none bg-white text-primary hover:bg-white/90 shadow-xl font-semibold">{h.cta.ctaBtn}</Button>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
