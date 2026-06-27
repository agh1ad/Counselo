import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Scale, ShieldCheck, Clock, Users, ArrowRight, CheckCircle2,
  Star, Quote, MessageCircle, Mail, Video, Award, Globe, BookOpen
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
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full" style={{ background: "linear-gradient(135deg, hsl(150 100% 10%) 0%, hsl(150 80% 15%) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 50%, hsl(150 60% 25% / 0.4) 0%, transparent 60%)" }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 mb-8 text-white/80 text-sm font-medium tracking-wide uppercase">
                <Globe className="h-4 w-4" /> Saudi Arabia · UAE · Syria — Arabic & English
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-6">
                Expert Legal Counsel. <span className="text-white/70 italic">Online & On Demand.</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/75 mb-4 leading-relaxed">
                Adlix connects you directly with <strong className="text-white">Lawyer Omar Al-Baghdadi</strong> — one of the region's most experienced senior advocates with over 20,000 cases handled across Saudi Arabia, the UAE and Syria.
              </p>
              <p className="text-lg text-white/60 mb-10">
                Professional legal consultations via WhatsApp, email or remote session. In Arabic and English.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button size="lg" className="text-lg px-8 py-6 rounded-none w-full sm:w-auto bg-white text-primary hover:bg-white/90 font-semibold">
                    Book a Consultation
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-none w-full sm:w-auto border-white/50 text-white hover:bg-white/10">
                    View Practice Areas
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TRUST STATS ── */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border">
            {[
              { stat: "20,000+", label: "Cases Handled" },
              { stat: "40+",     label: "Lawyers Mentored" },
              { stat: "3",       label: "Countries: KSA, UAE & Syria" },
              { stat: "Bilingual", label: "Arabic & English" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center px-4"
              >
                <div className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">{item.stat}</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider leading-snug">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT — Lawyer Omar Al-Baghdadi ── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            <motion.div {...fadeIn}>
              <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">Senior Legal Authority</p>
              <h2 className="text-4xl font-serif font-bold text-foreground mb-6">
                Meet Lawyer Omar Al-Baghdadi
              </h2>
              <div className="w-20 h-1 bg-primary mb-8" />
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                One of the <strong className="text-foreground">longest-established legal practices in the region</strong>, Adlix is built on decades of courtroom litigation, arbitration and advisory work across Saudi Arabia, the United Arab Emirates and Syria.
              </p>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Lawyer Omar Al-Baghdadi is not only a senior courtroom advocate but also a respected <strong className="text-foreground">legal mentor who has trained over 40 lawyers</strong> across Syria, the UAE and Saudi Arabia — reflecting advanced practical litigation experience and deep procedural knowledge of regional court systems.
              </p>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Every consultation is handled <strong className="text-foreground">personally by Lawyer Omar Al-Baghdadi</strong> — delivering structured legal analysis, strategic case evaluation and practical guidance without the need for in-person attendance.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Senior courtroom advocate with decades of litigation experience",
                  "Legal mentor — trained 40+ lawyers across 3 countries",
                  "Consultations personally conducted in Arabic & English",
                  "Hundreds of successful online consultations completed"
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
                    <div className="text-white/50 uppercase tracking-widest text-xs mb-2">Senior Advocate</div>
                    <div className="text-3xl font-serif font-bold text-white mb-1">Omar Al-Baghdadi</div>
                    <div className="text-white/60 text-sm">Commercial Litigation · Arbitration<br/>Saudi Arabia · UAE · Syria</div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 w-52 bg-primary p-6 flex flex-col justify-center shadow-xl">
                  <span className="text-3xl font-serif text-white font-bold mb-1">20,000+</span>
                  <span className="text-white/80 font-medium uppercase tracking-widest text-xs">Cases Handled<br/>Across the Region</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── ONLINE CONSULTATION METHODS ── */}
      <section className="py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-white/60 uppercase tracking-widest text-sm font-medium mb-3">Available Online Worldwide</p>
            <h2 className="text-4xl font-serif font-bold text-white mb-4">Book Your Legal Consultation — Instantly</h2>
            <div className="w-20 h-1 bg-white/30 mx-auto mb-6" />
            <p className="text-white/75 text-lg leading-relaxed">
              Al-Baghdadi Law Firm provides professional online paid legal consultations directly with Lawyer Omar Al-Baghdadi. With hundreds of successful consultations completed, clients receive structured legal analysis and strategic case evaluation — no in-person attendance required.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: MessageCircle,
                title: "WhatsApp Legal Consultation",
                desc: "Fast, convenient legal advice via WhatsApp. Send your case details and receive a structured legal analysis from Lawyer Omar Al-Baghdadi directly.",
                badge: "Most Popular"
              },
              {
                icon: Mail,
                title: "Email Legal Case Review",
                desc: "Submit your case by email for a thorough written legal review. Ideal for complex commercial matters requiring detailed written opinion.",
                badge: "Detailed Review"
              },
              {
                icon: Video,
                title: "Remote Strategy Session",
                desc: "Scheduled video or phone consultation for in-depth case strategy. Direct, real-time counsel from a senior advocate.",
                badge: "In-Depth"
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
                <div className="absolute top-4 right-4 bg-white/20 text-white text-xs font-medium px-2 py-1 uppercase tracking-wider">
                  {method.badge}
                </div>
                <method.icon className="h-10 w-10 text-white/70 mb-6" />
                <h3 className="text-xl font-serif font-bold text-white mb-4">{method.title}</h3>
                <p className="text-white/70 leading-relaxed text-sm">{method.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/contact">
              <Button size="lg" className="text-lg px-12 py-6 rounded-none bg-white text-primary hover:bg-white/90 font-semibold">
                Request Your Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRACTICE AREAS ── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">Comprehensive Legal Expertise</p>
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Core Practice Areas</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-muted-foreground text-lg">
              Extensive expertise across commercial, investment and administrative law — developed through decades of courtroom litigation and arbitration across Saudi Arabia, the UAE and Syria.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Commercial Litigation",
                desc: "Commercial contract disputes, shareholder conflicts, corporate governance, banking litigation and commercial agency disputes before Commercial Courts and arbitration tribunals.",
                path: "/services/business-law"
              },
              {
                title: "Arbitration & Dispute Resolution",
                desc: "Domestic and international commercial arbitration, enforcement of arbitral awards, cross-border dispute resolution and construction and investment arbitration.",
                path: "/services/criminal-defense"
              },
              {
                title: "Administrative & Government Disputes",
                desc: "Appeals against administrative decisions, Board of Grievances cases, public procurement disputes, government contract litigation and regulatory compliance.",
                path: "/services/employment-law"
              },
              {
                title: "Enforcement & Debt Recovery",
                desc: "Enforcement of court and foreign judgments, execution of cheques and financial instruments, corporate debt recovery and asset protection strategies.",
                path: "/services/personal-injury"
              },
              {
                title: "Real Estate & Construction",
                desc: "Property ownership conflicts, development and contractor disputes, construction delay claims, infrastructure contract litigation and real estate contract enforcement.",
                path: "/services/real-estate"
              },
              {
                title: "Investment & Foreign Business",
                desc: "Legal representation for foreign investors in Saudi Arabia and the UAE, company formation advisory, cross-border compliance and commercial licensing disputes.",
                path: "/services/immigration"
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-card border border-border p-8 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <h3 className="text-xl font-serif font-bold text-foreground mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{service.desc}</p>
                <Link href={service.path} className="inline-flex items-center text-primary text-sm font-medium group-hover:underline underline-offset-4">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
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
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="mb-16">
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">Why Choose Adlix</p>
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Trusted. Established. Personal.</h2>
            <div className="w-20 h-1 bg-primary mb-6" />
            <p className="text-muted-foreground text-lg max-w-2xl">
              Adlix is backed by one of the longest-established legal practices in the region — giving clients access to genuine senior-level counsel online, without compromise.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Longest-Established Practice",
                desc: "Decades of uninterrupted legal practice across Saudi Arabia, UAE and Syria — a track record that speaks for itself."
              },
              {
                icon: Users,
                title: "Personal, Direct Counsel",
                desc: "Every consultation is handled personally by Lawyer Omar Al-Baghdadi — not delegated to a junior associate."
              },
              {
                icon: Globe,
                title: "Arabic & English, Regionally Fluent",
                desc: "Consultations conducted in both Arabic and English, with deep procedural knowledge of KSA, UAE and Syrian courts."
              },
              {
                icon: BookOpen,
                title: "Mentor-Level Authority",
                desc: "As a legal mentor to 40+ lawyers, Omar Al-Baghdadi brings unmatched strategic depth and professional standing to every case."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <feature.icon className="h-10 w-10 text-primary mb-6" />
                <h3 className="text-lg font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">Client Testimonials</p>
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Trusted by Corporations, Investors & Individuals</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Lawyer Omar Al-Baghdadi resolved our cross-border commercial dispute with remarkable speed and expertise. His deep knowledge of Saudi and UAE commercial courts was decisive. Highly recommended for international matters.",
                author: "Ahmad K.",
                title: "CEO, Trading Corporation — KSA"
              },
              {
                quote: "We engaged Adlix for a complex arbitration case involving a government contractor in Riyadh. The strategic depth and courtroom authority Lawyer Al-Baghdadi brought was exceptional. Case resolved in our favour.",
                author: "R. Mansouri",
                title: "Foreign Investor — UAE"
              },
              {
                quote: "The online consultation service is outstanding — structured, fast and thorough. I received a complete legal analysis of my real estate dispute via WhatsApp within hours. Truly professional.",
                author: "Layla M.",
                title: "Real Estate Client — Syria"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border p-8 relative hover:shadow-md transition-shadow"
              >
                <Quote className="h-8 w-8 text-primary/20 absolute top-8 left-8" />
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
            <p className="text-white/60 uppercase tracking-widest text-sm font-medium mb-4">Available Online — Worldwide</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Speak Directly with Lawyer Omar Al-Baghdadi
            </h2>
            <p className="text-xl text-white/75 mb-4">
              Book a secure online legal consultation via WhatsApp, email or remote session. Available in Arabic and English.
            </p>
            <p className="text-white/50 text-base mb-10">
              Serving corporations, investors, institutions and individuals across Saudi Arabia, the UAE and Syria.
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
