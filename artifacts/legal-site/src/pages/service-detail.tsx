import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, ChevronRight, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { SYR_SEO_DATA } from "@/lib/seo-data-syr";

export default function ServiceDetail() {
  const params = useParams();
  const id = params.id as string;
  const { t, isRTL } = useLanguage();
  const { region, regionPrefix } = useRegion();
  const sd = t.serviceDetail;
  const data = sd.services[id as keyof typeof sd.services];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">{sd.notFound}</h1>
          <Link href={`${regionPrefix}/services`} className="text-primary hover:underline">{sd.notFoundLink}</Link>
        </div>
      </div>
    );
  }

  const isSyr = region === "syr";
  const syrSeo = isSyr ? SYR_SEO_DATA[id] : undefined;

  const d = data as Record<string, unknown>;
  const overview       = typeof d.overview      === "string" ? d.overview      : null;
  const overview1      = typeof d.overview1     === "string" ? d.overview1     : null;
  const overview2      = typeof d.overview2     === "string" ? d.overview2     : null;
  const experienceNote = typeof d.experienceNote=== "string" ? d.experienceNote: null;
  const dataSeoTitle   = typeof d.seoTitle      === "string" ? d.seoTitle      : null;

  const seoTitle = isRTL
    ? (syrSeo
        ? `${data.title} في سوريا | استشارة قانونية أونلاين | كاونسلو`
        : `${data.title} في السعودية | استشارة قانونية أونلاين | كاونسلو`)
    : (isSyr
        ? (dataSeoTitle ?? `${data.title} Lawyer in Syria | Online Legal Consultation | CounselO`)
        : `${data.title} Lawyer in Saudi Arabia | Online Legal Consultation | CounselO`);

  const seoDesc = isRTL
    ? (syrSeo?.descAr ?? `${data.subtitle} — كاونسلو، منصة متخصصة للاستشارات القانونية الأونلاين في ${isSyr ? "سوريا" : "المملكة"}. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني. خبرة تزيد على 30 عاماً.`)
    : (syrSeo?.desc ?? `${data.subtitle} — CounselO, ${isSyr ? "Syria's specialized online legal platform" : "Saudi Arabia's specialized online legal platform"}. Professional response within 24 hours via WhatsApp or email. 30+ years experience, 20,000+ cases handled.`);

  const seoKeywords = isRTL
    ? (syrSeo?.kwAr ?? `${data.title} محامي ${isSyr ? "سوريا" : "المملكة العربية السعودية"}, استشارة قانونية ${data.title} أونلاين, محامي ${data.title} كاونسلو`)
    : (syrSeo?.kw ?? `${data.title} lawyer ${isSyr ? "Syria" : "Saudi Arabia"}, online ${data.title} legal advice ${isSyr ? "Syria" : "KSA"}, ${data.title} attorney CounselO`);

  const serviceAddress = isSyr
    ? { "@type": "PostalAddress", "addressCountry": "SY" }
    : { "@type": "PostalAddress", "addressCountry": "SA" };

  const hasFaqs = "faqs" in data && Array.isArray((data as Record<string, unknown>).faqs) && ((data as Record<string, unknown>).faqs as unknown[]).length > 0;
  const faqs = hasFaqs ? (data as Record<string, unknown>).faqs as { q: string; a: string }[] : [];

  const canonicalPath = `/services/${id}`;
  const langSeg = isRTL ? "/ar" : "";
  const regionSeg = isSyr ? "/syr" : "/sa";
  const canonicalUrlFull = `https://counselo-legal.com${regionSeg}${langSeg}${canonicalPath}`;
  const regionBase = `https://counselo-legal.com${regionSeg}${langSeg}`;
  const inLanguage = isRTL ? (isSyr ? "ar-SY" : "ar-SA") : (isSyr ? "en-SY" : "en-SA");

  const schemas: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "LegalService",
      "name": isRTL ? `${data.title} — كاونسلو` : `${data.title} — CounselO`,
      "description": isRTL ? (syrSeo?.descAr ?? data.subtitle) : (syrSeo?.desc ?? data.subtitle),
      "url": canonicalUrlFull,
      "areaServed": { "@type": "Country", "name": isSyr ? "Syria" : "Saudi Arabia" },
      "availableLanguage": ["Arabic", "English"],
      "serviceType": data.title,
      "provider": {
        "@type": "LegalService",
        "name": isRTL ? "كاونسلو" : "CounselO",
        "url": "https://counselo-legal.com",
        "telephone": "+966594850247",
        "email": "info@counselo-legal.com",
        "address": serviceAddress,
        "founder": { "@type": "Person", "name": "Omar Al-Baghdadi", "jobTitle": "Lawyer and Legal Counsel", "honorificPrefix": "Lawyer" },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": isRTL ? "الرئيسية" : "Home", "item": "https://counselo-legal.com/" },
        { "@type": "ListItem", "position": 2, "name": isRTL ? "الخدمات" : "Services", "item": `${regionBase}/services` },
        { "@type": "ListItem", "position": 3, "name": data.title, "item": canonicalUrlFull },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${canonicalUrlFull}#webpage`,
      "url": canonicalUrlFull,
      "name": seoTitle,
      "description": seoDesc,
      "inLanguage": inLanguage,
      "publisher": {
        "@type": "LegalService",
        "name": "CounselO",
        "url": "https://counselo-legal.com",
      },
    },
  ];

  if (hasFaqs && faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a,
        },
      })),
    });
  }

  return (
    <div className="w-full bg-background min-h-screen">
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        canonical={canonicalPath}
        keywords={seoKeywords}
        schema={schemas}
        ogType="website"
      />
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border py-4 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href={regionPrefix} className="hover:text-primary transition-colors">{sd.breadcrumb.home}</Link>
            <ChevronRight className={`h-4 w-4 mx-2 ${isRTL ? "rotate-180" : ""}`} />
            <Link href={`${regionPrefix}/services`} className="hover:text-primary transition-colors">{sd.breadcrumb.services}</Link>
            <ChevronRight className={`h-4 w-4 mx-2 ${isRTL ? "rotate-180" : ""}`} />
            <span className="text-foreground font-medium">{data.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Link href={`${regionPrefix}/services`} className="inline-flex items-center text-primary mb-8 hover:underline underline-offset-4 text-sm font-medium">
                <ArrowLeft className={`me-2 h-4 w-4 ${isRTL ? "rotate-180" : ""}`} /> {sd.backLink}
              </Link>
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
                {isRTL
                  ? `${data.title} في ${isSyr ? "سوريا" : "المملكة العربية السعودية"}`
                  : `${data.title} Lawyer in ${isSyr ? "Syria" : "Saudi Arabia"}`}
              </h1>
              <p className="text-2xl text-primary font-serif italic mb-10">{data.subtitle}</p>

              {/* Overview — handles both single-string and multi-paragraph formats */}
              <div className="prose prose-green max-w-none mb-16 speakable-overview">
                {overview && (
                  <p className="text-lg text-muted-foreground leading-relaxed">{overview}</p>
                )}
                {overview1 && (
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">{overview1}</p>
                )}
                {overview2 && (
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">{overview2}</p>
                )}
                {experienceNote && (
                  <p className="text-base text-muted-foreground italic border-s-4 border-primary/40 ps-4 mt-4">
                    {experienceNote}
                  </p>
                )}
              </div>

              <h2 className="text-3xl font-serif font-bold text-foreground mb-8 border-b border-border pb-4">{sd.coversHeading}</h2>
              <div className="grid sm:grid-cols-2 gap-6 mb-16 speakable-covers">
                {data.covers.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-card border border-border p-4 hover:border-primary/40 transition-colors">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-3xl font-serif font-bold text-foreground mb-8 border-b border-border pb-4">{sd.processHeading}</h2>
              <div className="space-y-8 mb-16">
                {data.process.map((step, i) => (
                  <div key={i} className="flex gap-6 relative">
                    {i !== data.process.length - 1 && (
                      <div className="absolute start-6 top-14 bottom-0 w-px bg-border" />
                    )}
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-serif font-bold text-xl relative z-10">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {hasFaqs && faqs.length > 0 && (
                <div className="mt-4">
                  <h2 className="text-3xl font-serif font-bold text-foreground mb-8 border-b border-border pb-4">
                    {isRTL ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
                  </h2>
                  <div className="space-y-3">
                    {faqs.map((faq, i) => (
                      <div key={i} className="border border-border bg-card">
                        <button
                          className="w-full flex items-center justify-between p-5 text-start hover:bg-muted/30 transition-colors"
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          aria-expanded={openFaq === i}
                        >
                          <span className="font-semibold text-foreground leading-snug pe-4">{faq.q}</span>
                          <ChevronDown className={`h-5 w-5 text-primary shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                        </button>
                        {openFaq === i && (
                          <div className="px-5 pb-5">
                            <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <motion.div initial={{ opacity: 0, x: isRTL ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-28 bg-primary p-8 text-white">
              <h3 className="text-2xl font-serif font-bold text-white mb-4">{sd.sidebar.heading}</h3>
              <div className="w-12 h-1 bg-white/40 mb-6" />
              <p className="text-white/75 mb-8 leading-relaxed">
                {sd.sidebar.descPrefix}{data.title.toLowerCase()}{sd.sidebar.descSuffix}
              </p>
              <Link href={`${regionPrefix}/contact?service=${id}`}>
                <Button className="w-full py-6 text-lg rounded-none bg-white text-primary hover:bg-white/90">{sd.sidebar.ctaBtn}</Button>
              </Link>
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm text-white/60 mb-2">{sd.sidebar.callLabel}</p>
                <p className="text-white font-mono font-medium text-lg" dir="ltr">{sd.sidebar.phone}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
