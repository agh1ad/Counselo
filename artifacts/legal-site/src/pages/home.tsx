import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Scale, ShieldCheck, Clock, Users, ArrowRight, CheckCircle2, Star, Quote } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section — dark green background */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full" style={{ background: "linear-gradient(135deg, hsl(150 100% 10%) 0%, hsl(150 80% 15%) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 50%, hsl(150 60% 25% / 0.4) 0%, transparent 60%)" }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-6">
                Clarity in <span className="text-white/70 italic">Complexity</span>.
              </h1>
              <p className="text-xl md:text-2xl text-white/75 mb-10 leading-relaxed">
                Lexora Legal provides premium, authoritative legal counsel accessible from anywhere. Serious representation for the decisions that matter most.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button size="lg" className="text-lg px-8 py-6 rounded-none w-full sm:w-auto bg-white text-primary hover:bg-white/90">
                    Book a Consultation
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-none w-full sm:w-auto border-white/50 text-white hover:bg-white/10">
                    Explore Services
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro Section — white background */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl font-serif font-bold text-foreground mb-6">Modern Counsel. <br/>Traditional Excellence.</h2>
              <div className="w-20 h-1 bg-primary mb-8" />
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                We believe that premium legal advice shouldn't be confined to mahogany boardrooms. Lexora brings the rigor, authority, and discretion of a top-tier law firm directly to you, online.
              </p>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Our partners carry decades of specialized experience across multiple disciplines, ensuring that whatever your legal challenge, you proceed with calm, unshakeable confidence.
              </p>
              <ul className="space-y-4 mb-8">
                {["Secure online consultations", "Transparent fee structures", "Dedicated partner-level attention"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="text-primary h-5 w-5 shrink-0" />
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
                <div className="w-full h-full rounded-sm shadow-2xl border border-border" style={{ background: "linear-gradient(135deg, hsl(150 60% 15%) 0%, hsl(150 80% 20%) 50%, hsl(150 50% 28%) 100%)" }} />
                <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary p-6 flex flex-col justify-center shadow-xl">
                  <span className="text-4xl font-serif text-white font-bold mb-2">25+</span>
                  <span className="text-white/80 font-medium uppercase tracking-widest text-sm">Years of<br/>Combined<br/>Experience</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border">
            {[
              { stat: "$500M+", label: "Recovered" },
              { stat: "98%", label: "Success Rate" },
              { stat: "10k+", label: "Cases Handled" },
              { stat: "24/7", label: "Client Support" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center px-4"
              >
                <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">{item.stat}</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Our Practice Areas</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-muted-foreground text-lg">Specialized expertise tailored to your unique legal situation.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Family Law", desc: "Navigating divorce, custody, and complex family transitions with dignity and fierce advocacy.", path: "/services/family-law" },
              { title: "Business Law", desc: "Strategic counsel for corporate formations, mergers, contracts, and compliance.", path: "/services/business-law" },
              { title: "Criminal Defense", desc: "Uncompromising defense protecting your rights, your reputation, and your freedom.", path: "/services/criminal-defense" },
              { title: "Real Estate", desc: "Securing your property interests through precise contract drafting and dispute resolution.", path: "/services/real-estate" },
              { title: "Immigration", desc: "Guiding you through the complexities of visas, residency, and citizenship applications.", path: "/services/immigration" },
              { title: "Personal Injury", desc: "Relentless pursuit of the compensation and justice you deserve following negligence.", path: "/services/personal-injury" },
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
                <p className="text-muted-foreground mb-6 line-clamp-3">{service.desc}</p>
                <Link href={service.path} className="inline-flex items-center text-primary font-medium group-hover:underline underline-offset-4">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/services">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-none px-8 transition-colors">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">The Lexora Advantage</h2>
            <div className="w-20 h-1 bg-primary mb-6" />
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Scale, title: "Unmatched Authority", desc: "A formidable reputation built on precedent-setting victories." },
              { icon: ShieldCheck, title: "Absolute Discretion", desc: "Your privacy is our paramount concern. Bank-grade security." },
              { icon: Clock, title: "Responsive Counsel", desc: "Legal emergencies don't wait. Neither do we." },
              { icon: Users, title: "Client-Centric", desc: "You are a priority, not a case file. Direct partner access." },
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

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Client Perspectives</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { quote: "Lexora handled my corporate restructuring with absolute precision. Their strategic foresight saved us from significant liability. Unparalleled service.", author: "James M.", title: "CEO, Tech Ventures" },
              { quote: "During the most difficult transition of my life, the team provided not just legal counsel, but a calm, authoritative presence that made all the difference.", author: "Sarah L.", title: "Family Law Client" },
              { quote: "When our real estate deal hit a major snag, Lexora's attorneys stepped in and resolved the dispute within days. They are formidable negotiators.", author: "Robert C.", title: "Real Estate Developer" }
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
                <p className="text-muted-foreground mb-6 leading-relaxed relative z-10 italic">
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

      {/* CTA Section — dark green */}
      <section className="py-24 relative overflow-hidden bg-primary">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 80% 50%, hsl(150 80% 30% / 0.4) 0%, transparent 60%)" }} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div {...fadeIn}>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Ready to discuss your case?</h2>
            <p className="text-xl text-white/75 mb-10">
              Schedule a secure online consultation with one of our specialized partners today. Clarity is just a conversation away.
            </p>
            <Link href="/contact">
              <Button size="lg" className="text-lg px-12 py-8 rounded-none bg-white text-primary hover:bg-white/90 shadow-xl">
                Request Consultation
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
