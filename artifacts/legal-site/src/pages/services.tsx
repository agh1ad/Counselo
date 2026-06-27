import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Building2, Gavel, Home as HomeIcon, Map, Shield, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const icons = [Users, Building2, Shield, HomeIcon, Map, BookOpen, Gavel];

export default function Services() {
  const { t } = useLanguage();
  const s = t.services;

  return (
    <div className="w-full bg-background min-h-screen">
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(150 100% 10%) 0%, hsl(150 80% 15%) 100%)" }} />
        <div className="absolute end-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="w-full h-full" style={{ background: "radial-gradient(ellipse at 50% 50%, hsl(150 60% 60%) 0%, transparent 70%)" }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">{s.hero.heading}</h1>
            <div className="w-20 h-1 bg-white/40 mb-8" />
            <p className="text-xl text-white/75 leading-relaxed">{s.hero.desc}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {s.items.map((service, index) => {
              const Icon = icons[index] ?? Users;
              return (
                <motion.div key={service.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card border border-border p-10 hover:border-primary/50 hover:shadow-md transition-all flex flex-col h-full group">
                  <Icon className="h-12 w-12 text-primary mb-6" />
                  <h2 className="text-2xl font-serif font-bold text-foreground mb-4">{service.title}</h2>
                  <p className="text-muted-foreground mb-8 flex-grow leading-relaxed">{service.longDesc}</p>
                  <Link href={`/services/${service.id}`} className="inline-flex items-center text-primary font-medium group-hover:underline underline-offset-4 mt-auto">
                    {s.explorePrefix}{service.title}
                    <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
