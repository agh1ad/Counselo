import { motion } from "framer-motion";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, ChevronRight, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEOHead } from "@/components/seo/SEOHead";

export default function ServiceDetail() {
  const params = useParams();
  const id = params.id as string;
  const { t, isRTL } = useLanguage();
  const sd = t.serviceDetail;
  const data = sd.services[id as keyof typeof sd.services];

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">{sd.notFound}</h1>
          <Link href="/services" className="text-primary hover:underline">{sd.notFoundLink}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-background min-h-screen">
      <SEOHead
        title={isRTL
          ? `${data.title} في السعودية | استشارة قانونية أونلاين | قانوني`
          : `${data.title} Saudi Arabia | Online Legal Consultation | Qanoni قانوني`}
        description={isRTL
          ? `${data.subtitle} — قانوني، المنصة الرائدة للاستشارات القانونية الأونلاين في المملكة. خبرة تزيد على 30 عاماً وأكثر من 20,000 قضية. استشارة أونلاين عبر واتساب أو البريد الإلكتروني، على مدار الساعة.`
          : `${data.subtitle} — Qanoni, Saudi Arabia's leading online legal platform. 30+ years experience, 20,000+ cases handled. Consult online via WhatsApp or email, 24/7, in Arabic & English.`}
        canonical={`/services/${id}`}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Legal Consultation",
            "name": isRTL ? `${data.title} — قانوني` : `${data.title} — Qanoni`,
            "description": data.subtitle,
            "provider": {
              "@type": "LegalService",
              "name": "Qanoni قانوني",
              "url": "https://qanoni.com",
              "telephone": "+966594850247",
              "areaServed": "Saudi Arabia",
            },
            "url": `https://qanoni.com/services/${id}`,
            "areaServed": { "@type": "Country", "name": "Saudi Arabia" },
            "availableLanguage": ["Arabic", "English"],
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": isRTL ? "الرئيسية" : "Home", "item": "https://qanoni.com/" },
              { "@type": "ListItem", "position": 2, "name": isRTL ? "الخدمات" : "Services", "item": "https://qanoni.com/services" },
              { "@type": "ListItem", "position": 3, "name": data.title, "item": `https://qanoni.com/services/${id}` },
            ],
          },
        ]}
      />
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border py-4 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">{sd.breadcrumb.home}</Link>
            <ChevronRight className={`h-4 w-4 mx-2 ${isRTL ? "rotate-180" : ""}`} />
            <Link href="/services" className="hover:text-primary transition-colors">{sd.breadcrumb.services}</Link>
            <ChevronRight className={`h-4 w-4 mx-2 ${isRTL ? "rotate-180" : ""}`} />
            <span className="text-foreground font-medium">{data.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Link href="/services" className="inline-flex items-center text-primary mb-8 hover:underline underline-offset-4 text-sm font-medium">
                <ArrowLeft className={`me-2 h-4 w-4 ${isRTL ? "rotate-180" : ""}`} /> {sd.backLink}
              </Link>
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
                {isRTL ? `${data.title} في المملكة العربية السعودية` : `${data.title} Lawyer in Saudi Arabia`}
              </h1>
              <p className="text-2xl text-primary font-serif italic mb-10">{data.subtitle}</p>
              <div className="prose prose-green max-w-none mb-16">
                <p className="text-lg text-muted-foreground leading-relaxed">{data.overview}</p>
              </div>

              <h2 className="text-3xl font-serif font-bold text-foreground mb-8 border-b border-border pb-4">{sd.coversHeading}</h2>
              <div className="grid sm:grid-cols-2 gap-6 mb-16">
                {data.covers.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-card border border-border p-4 hover:border-primary/40 transition-colors">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-3xl font-serif font-bold text-foreground mb-8 border-b border-border pb-4">{sd.processHeading}</h2>
              <div className="space-y-8">
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
            </motion.div>
          </div>

          {/* Foreign Investment Sub-Areas Grid */}
          {id === "foreign-investment" && (
            <div className="lg:col-span-8 mt-16">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-3 border-b border-border pb-4">
                {t.foreignInvestmentDetail.relatedHeading.replace("Other ", "").replace(" الأخرى", "").replace("أخرى ", "").replace("أخرى", "").trim()}
              </h2>
              <p className="text-muted-foreground mb-8">{isRTL ? "استكشف مجالات ممارستنا المتخصصة في الاستثمار الأجنبي — كلٌّ منها مدعوم بأكثر من 30 عاماً من الخبرة في قانون الاستثمار السعودي ومتاح للاستشارة عبر الإنترنت." : "Explore our specialist foreign investment practice areas — each backed by 30+ years of Saudi investment law experience and available for online consultation today."}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.foreignInvestmentDetail.subAreas.map((area) => (
                  <Link key={area.id} href={`/services/foreign-investment/${area.id}`}
                    className="group flex items-center justify-between gap-4 bg-card border border-border px-6 py-5 hover:border-primary/60 hover:bg-primary/5 transition-all">
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{area.label}</span>
                    <ArrowRight className={`h-4 w-4 text-primary shrink-0 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0" : ""}`} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Family Law Sub-Areas Grid */}
          {id === "family-law" && (
            <div className="lg:col-span-8 mt-16">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-3 border-b border-border pb-4">
                {t.familyLawDetail.relatedHeading.replace("Other ", "").replace(" الأخرى", "").replace("أخرى ", "").replace("أخرى", "").trim()}
              </h2>
              <p className="text-muted-foreground mb-8">{isRTL ? "استكشف مجالات ممارستنا المتخصصة في قانون الأسرة — تُعالَج جميعها بسرية تامة ومدعومة بأكثر من 30 عاماً من الخبرة في نظام الأحوال الشخصية السعودي." : "Explore our specialist family law practice areas — each handled with complete confidentiality and backed by 30+ years of Saudi Personal Status Law experience."}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.familyLawDetail.subAreas.map((area) => (
                  <Link key={area.id} href={`/services/family-law/${area.id}`}
                    className="group flex items-center justify-between gap-4 bg-card border border-border px-6 py-5 hover:border-primary/60 hover:bg-primary/5 transition-all">
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{area.label}</span>
                    <ArrowRight className={`h-4 w-4 text-primary shrink-0 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0" : ""}`} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Employment Law Sub-Areas Grid */}
          {id === "employment-law" && (
            <div className="lg:col-span-8 mt-16">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-3 border-b border-border pb-4">
                {t.employmentLawDetail.relatedHeading.replace("Other ", "").replace(" الأخرى", "").replace("أخرى ", "").replace("أخرى", "").trim()}
              </h2>
              <p className="text-muted-foreground mb-8">{isRTL ? "استكشف مجالات ممارستنا المتخصصة في قانون العمل — كلٌّ منها مدعوم بأكثر من 30 عاماً من الخبرة في نظام العمل السعودي ومتاح للاستشارة عبر الإنترنت." : "Explore our specialist employment law practice areas — each backed by 30+ years of Saudi Labour Law experience and available for online consultation today."}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.employmentLawDetail.subAreas.map((area) => (
                  <Link key={area.id} href={`/services/employment-law/${area.id}`}
                    className="group flex items-center justify-between gap-4 bg-card border border-border px-6 py-5 hover:border-primary/60 hover:bg-primary/5 transition-all">
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{area.label}</span>
                    <ArrowRight className={`h-4 w-4 text-primary shrink-0 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0" : ""}`} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Real Estate Sub-Areas Grid */}
          {id === "real-estate" && (
            <div className="lg:col-span-8 mt-16">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-3 border-b border-border pb-4">
                {t.realEstateLawDetail.relatedHeading.replace("Other ", "").replace(" الأخرى", "").replace("أخرى ", "").replace("أخرى", "").trim()}
              </h2>
              <p className="text-muted-foreground mb-8">{isRTL ? "استكشف مجالات ممارستنا المتخصصة في قانون العقارات — كلٌّ منها مدعوم بأكثر من 30 عاماً من الخبرة في قانون الملكية السعودي ومتاح للاستشارة عبر الإنترنت." : "Explore our specialist real estate practice areas — each backed by 30+ years of Saudi property law experience and available for online consultation today."}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.realEstateLawDetail.subAreas.map((area) => (
                  <Link key={area.id} href={`/services/real-estate/${area.id}`}
                    className="group flex items-center justify-between gap-4 bg-card border border-border px-6 py-5 hover:border-primary/60 hover:bg-primary/5 transition-all">
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{area.label}</span>
                    <ArrowRight className={`h-4 w-4 text-primary shrink-0 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0" : ""}`} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Administrative Law Sub-Areas Grid */}
          {id === "administrative-law" && (
            <div className="lg:col-span-8 mt-16">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-3 border-b border-border pb-4">
                {t.administrativeLawDetail.relatedHeading.replace("Other ", "").replace(" الأخرى", "").replace("أخرى ", "").replace("أخرى", "").trim()}
              </h2>
              <p className="text-muted-foreground mb-8">{isRTL ? "استكشف مجالات ممارستنا المتخصصة في القانون الإداري — مدعومة بأكثر من 30 عاماً من الخبرة أمام ديوان المظالم والوزارات والهيئات الإدارية السعودية." : "Explore our specialist administrative law practice areas — each backed by 30+ years of experience before the Board of Grievances, government ministries, and Saudi administrative tribunals."}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.administrativeLawDetail.subAreas.map((area) => (
                  <Link key={area.id} href={`/services/administrative-law/${area.id}`}
                    className="group flex items-center justify-between gap-4 bg-card border border-border px-6 py-5 hover:border-primary/60 hover:bg-primary/5 transition-all">
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{area.label}</span>
                    <ArrowRight className={`h-4 w-4 text-primary shrink-0 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0" : ""}`} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Enforcement Sub-Areas Grid */}
          {id === "enforcement" && (
            <div className="lg:col-span-8 mt-16">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-3 border-b border-border pb-4">
                {t.enforcementDetail.relatedHeading.replace("Other ", "").replace("Other Enforcement ", "Enforcement ").replace(" الأخرى", "").replace("أخرى ", "").replace("أخرى", "").trim()}
              </h2>
              <p className="text-muted-foreground mb-8">{isRTL ? "استكشف مجالات ممارستنا المتخصصة في التنفيذ وتحصيل الديون — كلٌّ منها مدعوم بأكثر من 30 عاماً من الخبرة أمام محاكم التنفيذ السعودية." : "Explore our specialist enforcement and debt collection practice areas — each backed by 30+ years of Saudi enforcement court experience."}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.enforcementDetail.subAreas.map((area) => (
                  <Link key={area.id} href={`/services/enforcement/${area.id}`}
                    className="group flex items-center justify-between gap-4 bg-card border border-border px-6 py-5 hover:border-primary/60 hover:bg-primary/5 transition-all">
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{area.label}</span>
                    <ArrowRight className={`h-4 w-4 text-primary shrink-0 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0" : ""}`} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Arbitration Sub-Areas Grid */}
          {id === "arbitration" && (
            <div className="lg:col-span-8 mt-16">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-3 border-b border-border pb-4">
                {t.arbitrationDetail.relatedHeading.replace("Other ", "").replace("Other Arbitration ", "Arbitration ").replace(" الأخرى", "").replace("أخرى ", "").replace("أخرى", "").trim()}
              </h2>
              <p className="text-muted-foreground mb-8">{isRTL ? "استكشف مجالات ممارستنا المتخصصة في التحكيم والوساطة — كلٌّ منها مدعوم بأكثر من 30 عاماً من الخبرة أمام الهيئات التحكيمية السعودية والدولية." : "Explore our specialist arbitration and mediation practice areas — each backed by 30+ years of experience before Saudi and international arbitral tribunals."}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.arbitrationDetail.subAreas.map((area) => (
                  <Link key={area.id} href={`/services/arbitration/${area.id}`}
                    className="group flex items-center justify-between gap-4 bg-card border border-border px-6 py-5 hover:border-primary/60 hover:bg-primary/5 transition-all">
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{area.label}</span>
                    <ArrowRight className={`h-4 w-4 text-primary shrink-0 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0" : ""}`} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Business Law Sub-Areas Grid */}
          {id === "business-law" && (
            <div className="lg:col-span-8 mt-16">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-3 border-b border-border pb-4">
                {t.businessLawDetail.relatedHeading.replace("Other ", "").replace(" الأخرى", "").replace("أخرى ", "").replace("أخرى", "").trim()}
              </h2>
              <p className="text-muted-foreground mb-8">{isRTL ? "استكشف مجالات ممارستنا المتخصصة في قانون الأعمال والشركات — كلٌّ منها مدعوم بأكثر من 30 عاماً من الخبرة أمام المحاكم التجارية السعودية." : "Explore our specialist practice areas within Business & Corporate Law — each backed by 30+ years of Saudi commercial court experience."}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.businessLawDetail.subAreas.map((area) => (
                  <Link key={area.id} href={`/services/business-law/${area.id}`}
                    className="group flex items-center justify-between gap-4 bg-card border border-border px-6 py-5 hover:border-primary/60 hover:bg-primary/5 transition-all">
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{area.label}</span>
                    <ArrowRight className={`h-4 w-4 text-primary shrink-0 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0" : ""}`} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Contracts Sub-Areas Grid */}
          {id === "contracts" && (
            <div className="lg:col-span-8 mt-16">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-3 border-b border-border pb-4">
                {isRTL ? "مجالات ممارستنا في العقود" : "Contracts Practice Areas"}
              </h2>
              <p className="text-muted-foreground mb-8">{isRTL ? "استكشف مجالات ممارستنا المتخصصة في العقود — كلٌّ منها مدعوم بأكثر من 30 عاماً من الخبرة في القانون التعاقدي السعودي ومتاح للاستشارة عبر الإنترنت." : "Explore our specialist Contracts practice areas — each backed by 30+ years of Saudi contract law experience and available for online consultation today."}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.contractsDetail.subAreas.map((area) => (
                  <Link key={area.id} href={`/services/contracts/${area.id}`}
                    className="group flex items-center justify-between gap-4 bg-card border border-border px-6 py-5 hover:border-primary/60 hover:bg-primary/5 transition-all">
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{area.label}</span>
                    <ArrowRight className={`h-4 w-4 text-primary shrink-0 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0" : ""}`} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Companies Law Sub-Areas Grid */}
          {id === "companies-law" && (
            <div className="lg:col-span-8 mt-16">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-3 border-b border-border pb-4">
                {t.companiesLawDetail.relatedHeading.replace("Other ", "").replace(" الأخرى", "").replace("أخرى ", "").replace("أخرى", "").trim()}
              </h2>
              <p className="text-muted-foreground mb-8">{isRTL ? "استكشف مجالات ممارستنا المتخصصة في نظام الشركات — كلٌّ منها مدعوم بأكثر من 30 عاماً من الخبرة أمام المحاكم التجارية السعودية ومتاح للاستشارة عبر الإنترنت." : "Explore our specialist Companies Law practice areas — each backed by 30+ years of Saudi Commercial Court experience and available for online consultation today."}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.companiesLawDetail.subAreas.map((area) => (
                  <Link key={area.id} href={`/services/companies-law/${area.id}`}
                    className="group flex items-center justify-between gap-4 bg-card border border-border px-6 py-5 hover:border-primary/60 hover:bg-primary/5 transition-all">
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{area.label}</span>
                    <ArrowRight className={`h-4 w-4 text-primary shrink-0 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0" : ""}`} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Criminal Law Sub-Areas Grid */}
          {id === "criminal-law" && (
            <div className="lg:col-span-8 mt-16">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-3 border-b border-border pb-4">
                {isRTL ? "مجالات ممارستنا في القانون الجزائي" : "Criminal Law Practice Areas"}
              </h2>
              <p className="text-muted-foreground mb-8">{isRTL ? "استكشف مجالات ممارستنا المتخصصة في القانون الجزائي — كلٌّ منها مدعوم بأكثر من 30 عاماً من الخبرة أمام المحاكم الجزائية السعودية ومتاح للاستشارة عبر الإنترنت." : "Explore our specialist Criminal Law practice areas — each backed by 30+ years of Saudi criminal court experience and available for urgent consultation today."}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.criminalLawDetail.subAreas.map((area) => (
                  <Link key={area.id} href={`/services/criminal-law/${area.id}`}
                    className="group flex items-center justify-between gap-4 bg-card border border-border px-6 py-5 hover:border-primary/60 hover:bg-primary/5 transition-all">
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{area.label}</span>
                    <ArrowRight className={`h-4 w-4 text-primary shrink-0 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0" : ""}`} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Banking & Finance Sub-Areas Grid */}
          {id === "banking-finance" && (
            <div className="lg:col-span-8 mt-16">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-3 border-b border-border pb-4">
                {isRTL ? "مجالات ممارستنا في البنوك والتمويل" : "Banking & Finance Practice Areas"}
              </h2>
              <p className="text-muted-foreground mb-8">{isRTL ? "استكشف مجالات ممارستنا المتخصصة في التمويل الإسلامي والبنوك — كلٌّ منها مدعوم بأكثر من 30 عاماً من الخبرة في القانون المالي السعودي ومتاح للاستشارة عبر الإنترنت." : "Explore our specialist Banking & Finance practice areas — each backed by 30+ years of Saudi financial law experience and available for online consultation today."}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.bankingFinanceDetail.subAreas.map((area) => (
                  <Link key={area.id} href={`/services/banking-finance/${area.id}`}
                    className="group flex items-center justify-between gap-4 bg-card border border-border px-6 py-5 hover:border-primary/60 hover:bg-primary/5 transition-all">
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{area.label}</span>
                    <ArrowRight className={`h-4 w-4 text-primary shrink-0 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0" : ""}`} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Intellectual Property Sub-Areas Grid */}
          {id === "intellectual-property" && (
            <div className="lg:col-span-8 mt-16">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-3 border-b border-border pb-4">
                {isRTL ? "مجالات ممارستنا في الملكية الفكرية" : "Intellectual Property Practice Areas"}
              </h2>
              <p className="text-muted-foreground mb-8">{isRTL ? "استكشف مجالات ممارستنا المتخصصة في الملكية الفكرية — كلٌّ منها مدعوم بأكثر من 30 عاماً من الخبرة أمام هيئة الملكية الفكرية والمحاكم السعودية ومتاح للاستشارة عبر الإنترنت." : "Explore our specialist Intellectual Property practice areas — each backed by 30+ years of Saudi IP law experience and available for online consultation today."}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.intellectualPropertyDetail.subAreas.map((area) => (
                  <Link key={area.id} href={`/services/intellectual-property/${area.id}`}
                    className="group flex items-center justify-between gap-4 bg-card border border-border px-6 py-5 hover:border-primary/60 hover:bg-primary/5 transition-all">
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{area.label}</span>
                    <ArrowRight className={`h-4 w-4 text-primary shrink-0 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0" : ""}`} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Tax & Zakat Sub-Areas Grid */}
          {id === "tax-zakat" && (
            <div className="lg:col-span-8 mt-16">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-3 border-b border-border pb-4">
                {isRTL ? "مجالات ممارستنا في الزكاة والضريبة" : "Tax & Zakat Practice Areas"}
              </h2>
              <p className="text-muted-foreground mb-8">{isRTL ? "استكشف مجالات ممارستنا المتخصصة في الزكاة والضريبة والجمارك — كلٌّ منها مدعوم بخبرة واسعة أمام هيئة الزكاة والضريبة والجمارك ومتاح للاستشارة عبر الإنترنت." : "Explore our specialist Tax & Zakat practice areas — each backed by deep ZATCA expertise and available for online consultation today."}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.taxZakatDetail.subAreas.map((area) => (
                  <Link key={area.id} href={`/services/tax-zakat/${area.id}`}
                    className="group flex items-center justify-between gap-4 bg-card border border-border px-6 py-5 hover:border-primary/60 hover:bg-primary/5 transition-all">
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{area.label}</span>
                    <ArrowRight className={`h-4 w-4 text-primary shrink-0 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0" : ""}`} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Cyber & IT Law Sub-Areas Grid */}
          {id === "cyber-law" && (
            <div className="lg:col-span-8 mt-16">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-3 border-b border-border pb-4">
                {isRTL ? "مجالات ممارستنا في الجرائم المعلوماتية وتقنية المعلومات" : "Cyber & IT Law Practice Areas"}
              </h2>
              <p className="text-muted-foreground mb-8">{isRTL ? "استكشف مجالات ممارستنا المتخصصة في قانون الجرائم المعلوماتية وحماية البيانات — كلٌّ منها مدعوم بخبرة واسعة وفق نظام مكافحة الجرائم المعلوماتية ونظام حماية البيانات الشخصية ومتاح للاستشارة عبر الإنترنت." : "Explore our specialist Cyber & IT Law practice areas — each backed by deep Saudi cybercrime and data protection law expertise and available for urgent consultation today."}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.cyberLawDetail.subAreas.map((area) => (
                  <Link key={area.id} href={`/services/cyber-law/${area.id}`}
                    className="group flex items-center justify-between gap-4 bg-card border border-border px-6 py-5 hover:border-primary/60 hover:bg-primary/5 transition-all">
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{area.label}</span>
                    <ArrowRight className={`h-4 w-4 text-primary shrink-0 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0" : ""}`} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <motion.div initial={{ opacity: 0, x: isRTL ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-28 bg-primary p-8 text-white">
              <h3 className="text-2xl font-serif font-bold text-white mb-4">{sd.sidebar.heading}</h3>
              <div className="w-12 h-1 bg-white/40 mb-6" />
              <p className="text-white/75 mb-8 leading-relaxed">
                {sd.sidebar.descPrefix}{data.title.toLowerCase()}{sd.sidebar.descSuffix}
              </p>
              <Link href={`/contact?service=${id}`}>
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
