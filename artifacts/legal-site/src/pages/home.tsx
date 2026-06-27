import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Scale, ShieldCheck, Clock, Users, ArrowRight, CheckCircle2, Star, Quote, MessageCircle, Mail, Video, Award, Globe, Zap, BadgeCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const whyIcons = [Zap, ShieldCheck, Award, Globe];
const clientIcons = [Users, Scale, Globe, BadgeCheck];
const methodIcons = [MessageCircle, Mail, Video];

export default function Home() {
  const { t } = useLanguage();
  const h = t.home;

  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full" style={{ background: "linear-gradient(135deg, hsl(150 100% 10%) 0%, hsl(150 80% 15%) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 75% 50%, hsl(150 60% 25% / 0.35) 0%, transparent 65%)" }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 mb-8 text-white/80 text-sm font-medium tracking-wide uppercase">
                <Globe className="h-4 w-4 shrink-0" /> {h.hero.badge}
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6">
                {h.hero.h1a} <br />
                <span className="text-white/70 italic">{h.hero.h1b}</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-4 leading-relaxed font-light">
                {h.hero.desc} <strong className="text-white font-semibold">{h.hero.descBold}</strong> {h.hero.descEnd}
              </p>
              <p className="text-lg text-white/60 mb-10">{h.hero.subDesc}</p>
              <div className="flex flex-wrap gap-3 mb-10">
                {h.hero.chips.map((chip, i) => (
                  <span key={i} className="bg-white/10 border border-white/20 text-white/80 text-sm px-3 py-1.5 font-medium">{chip}</span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button size="lg" className="text-lg px-8 py-6 rounded-none w-full sm:w-auto bg-white text-primary hover:bg-white/90 font-semibold shadow-lg">{h.hero.bookBtn}</Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-none w-full sm:w-auto border-white/40 text-white hover:bg-white/10">{h.hero.servicesBtn}</Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-14 bg-card border-y border-border">
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

      {/* ABOUT */}
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

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
              <div className="aspect-[4/5] relative">
                <div className="w-full h-full shadow-2xl border border-border flex flex-col items-center justify-center gap-6 p-10"
                  style={{ background: "linear-gradient(135deg, hsl(150 60% 15%) 0%, hsl(150 80% 20%) 100%)" }}>
                  <Award className="h-20 w-20 text-white/30" />
                  <div className="text-center">
                    <div className="text-white/50 uppercase tracking-widest text-xs mb-1">{h.about.founderRole}</div>
                    <div className="text-2xl font-serif font-bold text-white mb-3">{h.about.founderName}</div>
                    <div className="w-10 h-px bg-white/20 mx-auto mb-3" />
                    <div className="text-white/60 text-sm leading-relaxed">
                      {h.about.founderTeamLine}<br />
                      <span className="text-white/40 text-xs mt-1 block">{h.about.founderNote}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -start-6 bg-primary p-6 flex flex-col justify-center shadow-xl w-52">
                  <span className="text-3xl font-serif text-white font-bold mb-1">{h.about.caseStat}</span>
                  <span className="text-white/80 font-medium uppercase tracking-widest text-xs">{h.about.caseLabel}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
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

      {/* CONSULTATION METHODS */}
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
              const Icon = methodIcons[i];
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white/10 border border-white/20 p-8 relative hover:bg-white/15 transition-colors">
                  <div className="absolute top-4 end-4 bg-white/20 text-white text-xs font-semibold px-2 py-1 uppercase tracking-wider">{method.badge}</div>
                  <Icon className="h-10 w-10 text-white/70 mb-6" />
                  <h3 className="text-xl font-serif font-bold text-white mb-4">{method.title}</h3>
                  <p className="text-white/70 leading-relaxed text-sm">{method.desc}</p>
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

      {/* WHO WE SERVE */}
      <section className="py-24 bg-background">
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
                  className="bg-card border border-border p-8 hover:border-primary/50 hover:shadow-md transition-all text-center">
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

      {/* PRACTICE AREAS */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="mb-16">
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">{h.practiceAreas.eyebrow}</p>
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">{h.practiceAreas.heading}</h2>
            <div className="w-20 h-1 bg-primary mb-6" />
            <p className="text-muted-foreground text-lg max-w-2xl">{h.practiceAreas.subheading}</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {h.practiceAreas.areas.map((service, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-background border border-border p-8 hover:border-primary/50 hover:shadow-md transition-all">
                <h3 className="text-xl font-serif font-bold text-foreground mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{service.desc}</p>
                <Link href={service.path} className="inline-flex items-center text-primary text-sm font-medium group-hover:underline underline-offset-4">
                  <span>{h.practiceAreas.viewAllBtn.split(" ")[0]}</span>
                  <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/services">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-none px-8 transition-colors">{h.practiceAreas.viewAllBtn}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY ADLIX */}
      <section className="py-24 bg-background">
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

      {/* TESTIMONIALS */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">{h.testimonials.eyebrow}</p>
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">{h.testimonials.heading}</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {h.testimonials.items.map((testimonial, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background border border-border p-8 relative hover:shadow-md transition-shadow">
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

      {/* CTA */}
      <section className="py-24 relative overflow-hidden bg-primary">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 80% 50%, hsl(150 80% 30% / 0.4) 0%, transparent 60%)" }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div {...fadeIn}>
            <p className="text-white/60 uppercase tracking-widest text-sm font-medium mb-4">{h.cta.eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">{h.cta.heading}</h2>
            <p className="text-xl text-white/75 mb-4">{h.cta.desc}</p>
            <p className="text-white/50 text-base mb-10">{h.cta.subDesc}</p>
            <Link href="/contact">
              <Button size="lg" className="text-lg px-12 py-8 rounded-none bg-white text-primary hover:bg-white/90 shadow-xl font-semibold">{h.cta.ctaBtn}</Button>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
