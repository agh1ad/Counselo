import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Building2, Gavel, Home as HomeIcon, Map, Shield, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEOHead } from "@/components/seo/SEOHead";

const icons = [Users, Building2, Shield, HomeIcon, Map, BookOpen, Gavel];

export default function Services() {
  const { t, isRTL } = useLanguage();
  const s = t.services;

  const seoTitle = isRTL
    ? "جميع الخدمات القانونية في السعودية | استشارة أونلاين | قانوني"
    : "Legal Services Saudi Arabia | All Practice Areas | Online Consultation | Qanoni قانوني";
  const seoDesc = isRTL
    ? "اكتشف خدمات قانوني القانونية في المملكة العربية السعودية: قانون الأسرة، القانون التجاري، القانون العقاري، قانون العمل، الاستثمار الأجنبي، والقانون الإداري. خبرة تزيد على 30 عاماً وأكثر من 20,000 قضية. استشارة أونلاين عبر واتساب أو البريد الإلكتروني — 24/7 بالعربية والإنجليزية."
    : "Explore Qanoni's full range of legal services in Saudi Arabia: Family Law, Commercial Law, Real Estate, Employment Law, Foreign Investment & Administrative Law. 30+ years experience, 20,000+ cases. Consult online via WhatsApp or email — 24/7, in Arabic and English.";

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": isRTL ? "مجالات الممارسة القانونية — قانوني السعودية" : "Legal Practice Areas — Qanoni Saudi Arabia",
    "url": "https://qanoni.com/services",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": isRTL ? "قانون الأسرة" : "Family Law", "url": "https://qanoni.com/services/family-law" },
      { "@type": "ListItem", "position": 2, "name": isRTL ? "القانون التجاري" : "Commercial Law", "url": "https://qanoni.com/services/business-law" },
      { "@type": "ListItem", "position": 3, "name": isRTL ? "القانون العقاري" : "Property Law", "url": "https://qanoni.com/services/real-estate" },
      { "@type": "ListItem", "position": 4, "name": isRTL ? "قانون العمل" : "Employment Law", "url": "https://qanoni.com/services/employment-law" },
      { "@type": "ListItem", "position": 5, "name": isRTL ? "الاستثمار الأجنبي" : "Foreign Investment", "url": "https://qanoni.com/services/foreign-investment" },
      { "@type": "ListItem", "position": 6, "name": isRTL ? "القانون الإداري" : "Administrative Law", "url": "https://qanoni.com/services/administrative-law" },
    ],
  };

  return (
    <div className="w-full bg-background min-h-screen">
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        canonical="/services"
        keywords={isRTL
          ? "خدمات قانونية السعودية, قانون الأسرة السعودي, القانون التجاري السعودي, قانون العمل السعودي, القانون العقاري السعودي, الاستثمار الأجنبي, القانون الإداري, محامي أونلاين المملكة, قانوني"
          : "legal services Saudi Arabia, family law Saudi Arabia, commercial law KSA, employment law Saudi Arabia, property law KSA, foreign investment lawyer Saudi Arabia, administrative law Saudi Arabia, online lawyer KSA, Qanoni"}
        schema={servicesSchema}
      />
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
