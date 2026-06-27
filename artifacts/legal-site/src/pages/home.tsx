import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Scale, ShieldCheck, Clock, Users, ArrowRight, CheckCircle2,
  Star, Quote, MessageCircle, Mail, Video, Award, Globe, Zap, BadgeCheck
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function Home() {
  return (
    <div className="w-full">

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full" style={{ background: "linear-gradient(135deg, hsl(150 100% 10%) 0%, hsl(150 80% 15%) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 75% 50%, hsl(150 60% 25% / 0.35) 0%, transparent 65%)" }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>

              {/* Platform badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 mb-8 text-white/80 text-sm font-medium tracking-wide uppercase">
                <Globe className="h-4 w-4" /> Saudi Arabia's Online Legal Consultation Platform
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6">
                Legal Help. <br/>
                <span className="text-white/70 italic">Fast, Reliable<br/>&amp; Professional.</span>
              </h1>

              <p className="text-xl md:text-2xl text-white/80 mb-4 leading-relaxed font-light">
                Adlix delivers professional online legal consultations across <strong className="text-white font-semibold">Saudi Arabia</strong> — for individuals, businesses and investors.
              </p>
              <p className="text-lg text-white/60 mb-10">
                Book instantly via WhatsApp, email or video session. Available in Arabic and English.
              </p>

              {/* Trust chips */}
              <div className="flex flex-wrap gap-3 mb-10">
                {["✓ 20,000+ Cases Handled", "✓ Bilingual Arabic & English", "✓ All Client Types", "✓ Response Within Hours"].map((chip, i) => (
                  <span key={i} className="bg-white/10 border border-white/20 text-white/80 text-sm px-3 py-1.5 font-medium">
                    {chip}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button size="lg" className="text-lg px-8 py-6 rounded-none w-full sm:w-auto bg-white text-primary hover:bg-white/90 font-semibold shadow-lg">
                    Book a Consultation
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-none w-full sm:w-auto border-white/40 text-white hover:bg-white/10">
                    Our Practice Areas
                  </Button>
                </Link>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TRUST STATS ── */}
      <section className="py-14 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border">
            {[
              { stat: "20,000+", label: "Cases Handled" },
              { stat: "100s",    label: "Online Consultations" },
              { stat: "Arabic & English", label: "Languages Served" },
              { stat: "All Types", label: "Individuals, Businesses & Investors" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center px-4"
              >
                <div className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2 leading-tight">{item.stat}</div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider leading-snug">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT IS ADLIX ── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            <motion.div {...fadeIn}>
              <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">About the Platform</p>
              <h2 className="text-4xl font-serif font-bold text-foreground mb-6">
                Saudi Arabia's Trusted Online Legal Consultation Service
              </h2>
              <div className="w-20 h-1 bg-primary mb-8" />
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Adlix is a <strong className="text-foreground">professional online legal consultation platform</strong> built for clients across Saudi Arabia who need fast, reliable legal guidance — without the delays of traditional in-person appointments.
              </p>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Behind Adlix is <strong className="text-foreground">Lawyer Omar Al-Baghdadi</strong> — one of the region's most established senior advocates with over <strong className="text-foreground">20,000 cases</strong> handled across Saudi Arabia, the UAE and Syria over decades of litigation and arbitration practice.
              </p>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Whether you're an individual facing a legal matter, a business navigating a commercial dispute, or a foreign investor entering the Saudi market — Adlix provides the expert, structured legal guidance you need, <strong className="text-foreground">personally delivered by a senior lawyer</strong>.
              </p>
              <ul className="space-y-4">
                {[
                  "Fast consultations — response within hours, not days",
                  "Professional written legal analysis for every case",
                  "Bilingual service in Arabic and English",
                  "All client types: individuals, businesses, investors, institutions"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground">
                    <CheckCircle2 className="text-primary h-5 w-5 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] relative">
                <div className="w-full h-full shadow-2xl border border-border flex flex-col items-center justify-center gap-6 p-10"
                  style={{ background: "linear-gradient(135deg, hsl(150 60% 15%) 0%, hsl(150 80% 20%) 100%)" }}>
                  <Award className="h-20 w-20 text-white/30" />
                  <div className="text-center">
                    <div className="text-white/50 uppercase tracking-widest text-xs mb-3">Senior Legal Advocate</div>
                    <div className="text-2xl font-serif font-bold text-white mb-2">Lawyer Omar<br/>Al-Baghdadi</div>
                    <div className="text-white/60 text-sm mt-3 leading-relaxed">
                      Commercial Litigation · Arbitration<br/>
                      Saudi Arabia · UAE · Syria<br/>
                      <span className="text-white/40">Mentor to 40+ Lawyers</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 bg-primary p-6 flex flex-col justify-center shadow-xl w-52">
                  <span className="text-3xl font-serif text-white font-bold mb-1">20,000+</span>
                  <span className="text-white/80 font-medium uppercase tracking-widest text-xs">Cases Handled<br/>Across the Region</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">Simple & Fast</p>
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">How to Get Your Legal Consultation</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-muted-foreground text-lg">Three straightforward steps to professional legal advice — no waiting room required.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Choose Your Method", desc: "Select WhatsApp, email or a scheduled video session — whichever suits your situation best." },
              { step: "02", title: "Describe Your Matter", desc: "Share your legal situation. All information is treated as strictly confidential." },
              { step: "03", title: "Receive Expert Guidance", desc: "Lawyer Omar Al-Baghdadi personally reviews your case and delivers a structured legal analysis — fast." }
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative bg-background border border-border p-8 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <div className="text-6xl font-serif font-bold text-primary/10 absolute top-4 right-6 leading-none select-none">{s.step}</div>
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
            <p className="text-white/60 uppercase tracking-widest text-sm font-medium mb-3">Available Online — Across Saudi Arabia</p>
            <h2 className="text-4xl font-serif font-bold text-white mb-4">Three Ways to Consult with Us</h2>
            <div className="w-20 h-1 bg-white/30 mx-auto mb-6" />
            <p className="text-white/70 text-lg leading-relaxed">
              Hundreds of successful online consultations completed. Every consultation is handled <strong className="text-white">personally by Lawyer Omar Al-Baghdadi</strong> — providing structured legal analysis and practical guidance without the need for in-person attendance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: MessageCircle,
                title: "WhatsApp Consultation",
                desc: "The fastest way to get legal guidance. Send your case details and receive a professional response directly from Lawyer Al-Baghdadi.",
                badge: "Fastest"
              },
              {
                icon: Mail,
                title: "Email Legal Review",
                desc: "Submit your legal matter by email for a thorough written analysis. Ideal for complex commercial disputes requiring a detailed written opinion.",
                badge: "Most Detailed"
              },
              {
                icon: Video,
                title: "Remote Strategy Session",
                desc: "A scheduled video or phone consultation for real-time case strategy and direct dialogue with a senior legal advocate.",
                badge: "Most Personal"
              }
            ].map((method, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/10 border border-white/20 p-8 relative hover:bg-white/15 transition-colors"
              >
                <div className="absolute top-4 right-4 bg-white/20 text-white text-xs font-semibold px-2 py-1 uppercase tracking-wider">
                  {method.badge}
                </div>
                <method.icon className="h-10 w-10 text-white/70 mb-6" />
                <h3 className="text-xl font-serif font-bold text-white mb-4">{method.title}</h3>
                <p className="text-white/70 leading-relaxed text-sm">{method.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/contact">
              <Button size="lg" className="text-lg px-12 py-6 rounded-none bg-white text-primary hover:bg-white/90 font-semibold">
                Start Your Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHO WE SERVE ── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">All Client Types</p>
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Legal Expertise for Every Client</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-muted-foreground text-lg">
              Adlix serves all client types across Saudi Arabia — from individuals navigating personal legal matters to corporations handling complex commercial disputes.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "Individuals", desc: "Personal legal matters including family law, real estate, employment disputes and debt recovery." },
              { icon: Scale, title: "Businesses", desc: "Commercial contracts, corporate disputes, company formation and regulatory compliance in Saudi Arabia." },
              { icon: Globe, title: "Foreign Investors", desc: "Legal representation for investors entering the Saudi market — licensing, compliance and dispute resolution." },
              { icon: BadgeCheck, title: "Institutions", desc: "High-level advisory for corporations and financial institutions on litigation, arbitration and enforcement." }
            ].map((client, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border p-8 hover:border-primary/50 hover:shadow-md transition-all text-center"
              >
                <div className="w-14 h-14 bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                  <client.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{client.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{client.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRACTICE AREAS ── */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="mb-16">
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">Our Legal Expertise</p>
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Core Practice Areas in Saudi Arabia</h2>
            <div className="w-20 h-1 bg-primary mb-6" />
            <p className="text-muted-foreground text-lg max-w-2xl">
              Decades of courtroom litigation and arbitration across Saudi Arabia, the UAE and Syria — comprehensive legal representation across all major practice areas.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Commercial Litigation",       desc: "Contract disputes, shareholder conflicts, corporate governance, banking and commercial agency disputes before Saudi courts and arbitration tribunals.", path: "/services/business-law" },
              { title: "Arbitration & Dispute Resolution", desc: "Domestic and international commercial arbitration, enforcement of arbitral awards, cross-border and investment dispute resolution.",           path: "/services/criminal-defense" },
              { title: "Real Estate & Construction",  desc: "Property conflicts, contractor disputes, construction delay claims, infrastructure contracts and real estate enforcement in Saudi Arabia.",          path: "/services/real-estate" },
              { title: "Enforcement & Debt Recovery", desc: "Court judgment enforcement, foreign judgment recognition, cheque execution, corporate debt recovery and asset protection.",                           path: "/services/personal-injury" },
              { title: "Administrative & Government Disputes", desc: "Board of Grievances cases, appeals against administrative decisions, public procurement and government contract litigation.",              path: "/services/employment-law" },
              { title: "Investment & Foreign Business", desc: "Legal support for foreign investors — company formation, cross-border compliance, commercial licensing and shareholder dispute resolution.",        path: "/services/immigration" }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-background border border-border p-8 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <h3 className="text-xl font-serif font-bold text-foreground mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{service.desc}</p>
                <Link href={service.path} className="inline-flex items-center text-primary text-sm font-medium group-hover:underline underline-offset-4">
                  Learn more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/services">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-none px-8 transition-colors">
                View All Practice Areas
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY ADLIX ── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">Why Adlix</p>
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Fast. Reliable. Professional.</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap,        title: "Instant Access",          desc: "No waiting rooms, no scheduling delays. Submit your matter and receive a professional response within hours." },
              { icon: ShieldCheck, title: "Reliable & Confidential", desc: "Strict professional confidentiality on every matter. Your legal information is never shared." },
              { icon: Award,      title: "Senior Expertise",        desc: "Direct access to Lawyer Omar Al-Baghdadi — 20,000+ cases, decades of courtroom experience." },
              { icon: Globe,      title: "Arabic & English",        desc: "Fully bilingual consultations. Legal guidance in your preferred language, with no barriers." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">Client Reviews</p>
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Trusted Across Saudi Arabia</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Adlix resolved my commercial contract dispute quickly and professionally. The WhatsApp consultation was structured and clear — I had a legal opinion within hours. Exceptional service.",
                author: "Abdullah R.",
                title: "Business Owner — Riyadh, KSA"
              },
              {
                quote: "As a foreign investor entering Saudi Arabia, I needed reliable legal advice fast. Adlix provided a thorough analysis of my company formation matter in both Arabic and English. Highly professional.",
                author: "M. Al-Farsi",
                title: "Foreign Investor — KSA"
              },
              {
                quote: "I used Adlix for a real estate dispute. The email legal review was incredibly detailed and covered every aspect of my case. It saved me significant time and gave me complete clarity.",
                author: "Nora K.",
                title: "Individual Client — Jeddah, KSA"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background border border-border p-8 relative hover:shadow-md transition-shadow"
              >
                <Quote className="h-8 w-8 text-primary/15 absolute top-8 left-8" />
                <div className="flex mb-6 mt-2 relative z-10 pl-10">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed relative z-10 italic text-sm">
                  "{testimonial.quote}"
                </p>
                <div className="mt-auto">
                  <div className="font-bold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-primary">{testimonial.title}</div>
                </div>
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
            <p className="text-white/60 uppercase tracking-widest text-sm font-medium mb-4">Saudi Arabia's Online Legal Platform</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Get Expert Legal Advice — Fast.
            </h2>
            <p className="text-xl text-white/75 mb-4">
              Professional online legal consultations for individuals, businesses and investors across Saudi Arabia.
            </p>
            <p className="text-white/50 text-base mb-10">
              Available via WhatsApp, email or video session · Arabic &amp; English · All legal matters
            </p>
            <Link href="/contact">
              <Button size="lg" className="text-lg px-12 py-8 rounded-none bg-white text-primary hover:bg-white/90 shadow-xl font-semibold">
                Book Your Consultation Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
