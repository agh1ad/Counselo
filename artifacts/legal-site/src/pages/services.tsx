import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Building2, Gavel, Home as HomeIcon, Map, Shield, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { SEOHead } from "@/components/seo/SEOHead";

const icons = [Users, Building2, Shield, HomeIcon, Map, BookOpen, Gavel];

export default function Services() {
  const { t, isRTL } = useLanguage();
  const { region, regionPrefix } = useRegion();
  const s = t.services;

  const country = region === "syr" ? (isRTL ? "سوريا" : "Syria") : (isRTL ? "السعودية" : "Saudi Arabia");
  const areaCount = s.items.length;

  const seoTitle = isRTL
    ? `${areaCount} مجالاً قانونياً في ${country} | منصة استشارات قانونية أونلاين | قانوني`
    : `${areaCount} Legal Practice Areas ${country} | CounselO — Online Legal Consultation Platform`;
  const seoDesc = isRTL
    ? `قانوني — منصة متخصصة للاستشارات القانونية الأونلاين في ${country}. ${areaCount} مجالاً قانونياً: ${s.items.map((item) => item.title).join("، ")}. خبرة 30+ عاماً، 20,000+ قضية. استجابة خلال 24 ساعة عبر واتساب أو البريد الإلكتروني.`
    : `CounselO — ${country}'s specialized online legal consultation platform. ${areaCount} practice areas: ${s.items.map((item) => item.title).join(", ")}. 30+ years experience, 20,000+ cases.`;

  const baseUrl = region === "syr" ? "https://counselo-legal.com/syr" : "https://counselo-legal.com/sa";
  const servicesSchema = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": region === "syr"
        ? (isRTL ? `${areaCount} مجالاً للممارسة القانونية — قانوني سوريا` : `${areaCount} Legal Practice Areas — CounselO Syria`)
        : (isRTL ? `${areaCount} مجالاً للممارسة القانونية — قانوني السعودية` : `${areaCount} Legal Practice Areas — CounselO Saudi Arabia`),
      "url": `${baseUrl}/services`,
      "numberOfItems": areaCount,
      "itemListElement": s.items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.title,
        "url": `${baseUrl}/services/${item.id}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "LegalService",
      "name": "CounselO",
      "description": region === "syr"
        ? (isRTL ? `منصة سوريا للاستشارات القانونية الأونلاين — ${areaCount} مجالاً، استجابة خلال 24 ساعة — القانون المدني السوري، قانون الشركات 29/2011، قانون العمل 17/2010` : `Syria's online legal consultation platform — ${areaCount} practice areas, response within 24 hours — Syrian Civil Code, Companies Law 29/2011, Labour Law 17/2010`)
        : (isRTL ? `أكبر منصة للاستشارات القانونية الأونلاين في المملكة — ${areaCount} مجالاً، استجابة خلال 24 ساعة` : `Saudi Arabia's largest online legal consultation platform — ${areaCount} practice areas, response within 24 hours`),
      "url": "https://counselo-legal.com",
      "telephone": "+966594850247",
      "address": region === "syr"
        ? { "@type": "PostalAddress", "addressLocality": "Damascus", "addressRegion": "Damascus Governorate", "addressCountry": "SY" }
        : { "@type": "PostalAddress", "addressLocality": "Jubail", "addressCountry": "SA" },
      "founder": { "@type": "Person", "name": "Omar Al-Baghdadi", "jobTitle": "Lawyer and Legal Counsel" },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "847", "bestRating": "5" },
      "areaServed": region === "syr"
        ? { "@type": "Country", "name": "Syria" }
        : { "@type": "Country", "name": "Saudi Arabia" },
      "availableLanguage": ["Arabic", "English"],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": isRTL ? "الرئيسية" : "Home", "item": baseUrl },
        { "@type": "ListItem", "position": 2, "name": isRTL ? "الخدمات" : "Services", "item": `${baseUrl}/services` },
      ],
    },
  ];

  return (
    <div className="w-full bg-background min-h-screen">
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        canonical="/services"
        keywords={region === "syr"
          ? (isRTL
            ? "خدمات قانونية سوريا, قانون الأسرة السوري, القانون المدني السوري, قانون العمل السوري, القانون العقاري السوري, استثمار أجنبي سوريا, القانون الإداري السوري, القانون الجنائي السوري, قانون مصرف سوريا المركزي, الضرائب العامة سوريا, قانون الشركات السوري 29/2011, قانون التحكيم السوري 4/2008, محامي أونلاين سوريا, قانوني دمشق, قانوني حلب"
            : `legal services Syria, ${areaCount} practice areas Syria, family law Syria, civil law Syria, employment law Syria, real estate law Syria, foreign investment Syria, administrative law Syria, criminal law Syria, banking law Syria, tax law Syria, companies law Syria 29/2011, arbitration Syria 4/2008, cyber law Syria, medical malpractice Syria, insurance law Syria, online lawyer Damascus, CounselO Syria`)
          : (isRTL
            ? "خدمات قانونية السعودية, قانون الأسرة, القانون التجاري, قانون العمل, القانون العقاري, الاستثمار الأجنبي, القانون الإداري, القانون الجنائي, قانون البنوك, الضرائب والزكاة, قانون الجرائم الإلكترونية, الأخطاء الطبية, نظام التأمين, الإقامة والتأشيرات, التحكيم, التنفيذ, قانون الشركات, الملكية الفكرية, العقود, محامي أونلاين المملكة, قانوني الجبيل"
            : `legal services Saudi Arabia, ${areaCount} practice areas KSA, family law Saudi Arabia, commercial law KSA, employment law Saudi Arabia, property law KSA, foreign investment lawyer Saudi Arabia, administrative law KSA, criminal law Saudi Arabia, banking finance law KSA, tax zakat lawyer Saudi, cyber law Saudi Arabia, medical malpractice KSA, insurance law Saudi, arbitration KSA, enforcement law Saudi, companies law KSA, intellectual property Saudi, online lawyer Jubail, CounselO`)}
        schema={servicesSchema}
      />
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(150 100% 10%) 0%, hsl(150 80% 15%) 100%)" }} />
        <div className="absolute end-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="w-full h-full" style={{ background: "radial-gradient(ellipse at 50% 50%, hsl(150 60% 60%) 0%, transparent 70%)" }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
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
                <motion.div key={service.id} initial={{ y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card border border-border p-10 hover:border-primary/50 hover:shadow-md transition-all flex flex-col h-full group">
                  <Icon className="h-12 w-12 text-primary mb-6" />
                  <h2 className="text-2xl font-serif font-bold text-foreground mb-4">{service.title}</h2>
                  <p className="text-muted-foreground mb-8 flex-grow leading-relaxed">{service.longDesc}</p>
                  <Link href={`${regionPrefix}/services/${service.id}`} className="inline-flex items-center text-primary font-medium group-hover:underline underline-offset-4 mt-auto">
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
