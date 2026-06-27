import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Building2, Gavel, Home as HomeIcon, Map, Shield, Users } from "lucide-react";

const services = [
  {
    id: "family-law",
    title: "Family Law",
    icon: Users,
    shortDesc: "Navigating divorce, custody, and complex family transitions with dignity and fierce advocacy.",
    longDesc: "When your personal life intersects with the legal system, the stakes couldn't be higher. We handle complex divorces, contentious custody battles, and high-net-worth asset division with absolute discretion and unwavering resolve."
  },
  {
    id: "business-law",
    title: "Business & Corporate Law",
    icon: Building2,
    shortDesc: "Strategic counsel for corporate formations, mergers, contracts, and compliance.",
    longDesc: "From startup formation to complex mergers and acquisitions. We protect your business interests through meticulous contract drafting, strategic negotiation, and comprehensive compliance guidance."
  },
  {
    id: "criminal-defense",
    title: "Criminal Defense",
    icon: Shield,
    shortDesc: "Uncompromising defense protecting your rights, your reputation, and your freedom.",
    longDesc: "Facing criminal charges requires an aggressive, strategic defense. Our former prosecutors know how the other side thinks, allowing us to dismantle cases before they reach a courtroom."
  },
  {
    id: "real-estate",
    title: "Real Estate Law",
    icon: HomeIcon,
    shortDesc: "Securing your property interests through precise contract drafting and dispute resolution.",
    longDesc: "Whether closing on a commercial high-rise or resolving a complex boundary dispute, we ensure your real estate transactions are legally sound and your property rights are fiercely protected."
  },
  {
    id: "immigration",
    title: "Immigration Law",
    icon: Map,
    shortDesc: "Guiding you through the complexities of visas, residency, and citizenship applications.",
    longDesc: "The immigration system is notoriously unforgiving of errors. We provide clear, strategic guidance for employment visas, family-based petitions, and defense against deportation."
  },
  {
    id: "personal-injury",
    title: "Personal Injury",
    icon: BookOpen,
    shortDesc: "Relentless pursuit of the compensation and justice you deserve following negligence.",
    longDesc: "When others' negligence causes you harm, we hold them accountable. We routinely secure multi-million dollar settlements against powerful insurance companies and corporations."
  },
  {
    id: "employment-law",
    title: "Employment Law",
    icon: Gavel,
    shortDesc: "Wrongful termination, discrimination, and complex executive compensation disputes.",
    longDesc: "Protecting your livelihood and professional reputation. We negotiate executive severance packages and aggressively litigate claims of discrimination and wrongful termination."
  }
];

export default function Services() {
  return (
    <div className="w-full bg-background min-h-screen">
      {/* Hero — dark green */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(150 100% 10%) 0%, hsl(150 80% 15%) 100%)" }} />
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="w-full h-full" style={{ background: "radial-gradient(ellipse at 50% 50%, hsl(150 60% 60%) 0%, transparent 70%)" }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">Our Expertise</h1>
            <div className="w-20 h-1 bg-white/40 mb-8" />
            <p className="text-xl text-white/75 leading-relaxed">
              Lexora Legal offers comprehensive, elite representation across seven core practice areas. Each division is led by partners who have dedicated their careers to mastering the nuances of their specific field.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border p-10 hover:border-primary/50 hover:shadow-md transition-all flex flex-col h-full group"
              >
                <service.icon className="h-12 w-12 text-primary mb-6" />
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">{service.title}</h2>
                <p className="text-muted-foreground mb-8 flex-grow leading-relaxed">
                  {service.longDesc}
                </p>
                <Link href={`/services/${service.id}`} className="inline-flex items-center text-primary font-medium group-hover:underline underline-offset-4 mt-auto">
                  Explore {service.title} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
