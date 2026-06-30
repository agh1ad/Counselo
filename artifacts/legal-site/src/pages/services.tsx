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
    ? "18 مجالاً قانونياً في السعودية | أكبر منصة استشارات قانونية أونلاين | قانوني"
    : "18 Legal Practice Areas Saudi Arabia | CounselO — Largest Online Legal Consultation Platform";
  const seoDesc = isRTL
    ? "قانوني — أكبر منصة للاستشارات القانونية الأونلاين في المملكة. 18 مجالاً قانونياً: قانون الأسرة، القانون التجاري، العقاري، العمل، الاستثمار الأجنبي، الإداري، الجنائي، البنوك، الضرائب، الإنترنت، الأخطاء الطبية، التأمين، الإقامة، التحكيم، التنفيذ، قانون الشركات، العقود، الملكية الفكرية. خبرة 30+ عاماً، 20,000+ قضية. استجابة خلال 24 ساعة عبر واتساب أو البريد الإلكتروني."
    : "CounselO — Saudi Arabia's largest online legal consultation platform. 18 practice areas: Family Law, Commercial Law, Real Estate, Employment Law, Foreign Investment, Administrative Law, Criminal Law, Banking & Finance, Tax & Zakat, Cyber Law, Medical Malpractice, Insurance Law, Immigration & Residency, Arbitration, Enforcement Law, Companies Law, Contracts, Intellectual Property. 30+ years experience, 20,000+ cases. Professional response within 24 hours via WhatsApp or email.";

  const servicesSchema = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": isRTL ? "18 مجالاً للممارسة القانونية — قانوني السعودية" : "18 Legal Practice Areas — CounselO Saudi Arabia",
      "url": "https://counselo.com/services",
      "numberOfItems": 18,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": isRTL ? "قانون الأسرة" : "Family Law", "url": "https://counselo.com/services/family-law" },
        { "@type": "ListItem", "position": 2, "name": isRTL ? "القانون التجاري" : "Commercial Law", "url": "https://counselo.com/services/business-law" },
        { "@type": "ListItem", "position": 3, "name": isRTL ? "القانون العقاري" : "Property Law", "url": "https://counselo.com/services/real-estate" },
        { "@type": "ListItem", "position": 4, "name": isRTL ? "قانون العمل" : "Employment Law", "url": "https://counselo.com/services/employment-law" },
        { "@type": "ListItem", "position": 5, "name": isRTL ? "الاستثمار الأجنبي" : "Foreign Investment Law", "url": "https://counselo.com/services/foreign-investment" },
        { "@type": "ListItem", "position": 6, "name": isRTL ? "القانون الإداري" : "Administrative Law", "url": "https://counselo.com/services/administrative-law" },
        { "@type": "ListItem", "position": 7, "name": isRTL ? "قانون التنفيذ" : "Enforcement Law", "url": "https://counselo.com/services/enforcement" },
        { "@type": "ListItem", "position": 8, "name": isRTL ? "التحكيم" : "Arbitration", "url": "https://counselo.com/services/arbitration" },
        { "@type": "ListItem", "position": 9, "name": isRTL ? "قانون الشركات" : "Companies Law", "url": "https://counselo.com/services/companies-law" },
        { "@type": "ListItem", "position": 10, "name": isRTL ? "القانون الجنائي" : "Criminal Law", "url": "https://counselo.com/services/criminal-law" },
        { "@type": "ListItem", "position": 11, "name": isRTL ? "قانون البنوك والتمويل" : "Banking & Finance Law", "url": "https://counselo.com/services/banking-finance" },
        { "@type": "ListItem", "position": 12, "name": isRTL ? "الملكية الفكرية" : "Intellectual Property", "url": "https://counselo.com/services/intellectual-property" },
        { "@type": "ListItem", "position": 13, "name": isRTL ? "قانون الضرائب والزكاة" : "Tax & Zakat Law", "url": "https://counselo.com/services/tax-zakat" },
        { "@type": "ListItem", "position": 14, "name": isRTL ? "قانون الجرائم الإلكترونية" : "Cyber & IT Law", "url": "https://counselo.com/services/cyber-law" },
        { "@type": "ListItem", "position": 15, "name": isRTL ? "الأخطاء الطبية" : "Medical Malpractice", "url": "https://counselo.com/services/medical-malpractice" },
        { "@type": "ListItem", "position": 16, "name": isRTL ? "نظام التأمين" : "Insurance Law", "url": "https://counselo.com/services/insurance-law" },
        { "@type": "ListItem", "position": 17, "name": isRTL ? "الإقامة والتأشيرات" : "Immigration & Residency", "url": "https://counselo.com/services/immigration-law" },
        { "@type": "ListItem", "position": 18, "name": isRTL ? "العقود" : "Contracts Law", "url": "https://counselo.com/services/contracts" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "LegalService",
      "name": "CounselO قانوني",
      "description": isRTL
        ? "أكبر منصة للاستشارات القانونية الأونلاين في المملكة — 18 مجالاً، استجابة خلال 24 ساعة"
        : "Saudi Arabia's largest online legal consultation platform — 18 practice areas, response within 24 hours",
      "url": "https://counselo.com",
      "telephone": "+966594850247",
      "address": { "@type": "PostalAddress", "addressLocality": "Jubail", "addressCountry": "SA" },
      "founder": { "@type": "Person", "name": "Omar Al-Baghdadi", "jobTitle": "Lawyer and Legal Counsel" },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "847", "bestRating": "5" },
      "areaServed": { "@type": "Country", "name": "Saudi Arabia" },
      "availableLanguage": ["Arabic", "English"],
    },
  ];

  return (
    <div className="w-full bg-background min-h-screen">
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        canonical="/services"
        keywords={isRTL
          ? "خدمات قانونية السعودية, قانون الأسرة, القانون التجاري, قانون العمل, القانون العقاري, الاستثمار الأجنبي, القانون الإداري, القانون الجنائي, قانون البنوك, الضرائب والزكاة, قانون الجرائم الإلكترونية, الأخطاء الطبية, نظام التأمين, الإقامة والتأشيرات, التحكيم, التنفيذ, قانون الشركات, الملكية الفكرية, العقود, محامي أونلاين المملكة, قانوني الجبيل"
          : "legal services Saudi Arabia, 18 practice areas KSA, family law Saudi Arabia, commercial law KSA, employment law Saudi Arabia, property law KSA, foreign investment lawyer Saudi Arabia, administrative law KSA, criminal law Saudi Arabia, banking finance law KSA, tax zakat lawyer Saudi, cyber law Saudi Arabia, medical malpractice KSA, insurance law Saudi, immigration residency Saudi, arbitration KSA, enforcement law Saudi, companies law KSA, intellectual property Saudi, online lawyer Jubail, CounselO"}
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
