import { regionalServiceDirectoryEntity, COUNSELO_ORGANIZATION, COUNSELO_WEBSITE } from "@workspace/api-zod/browser";
import { ServiceProcess, ServiceReasons } from "@/components/legal/saudi-service-journey";
import { PracticeDirectory } from "@/components/home/practice-directory";
import { SaudiConsultationStart, saudiContactHref } from "@/components/home/saudi-consultation-start";
import { RegionalHomeFaq } from "@/components/home/regional-home-faq";
import { COUNSELO_EXPERIENCE_SCOPE_NOTE, getCounseloYearsOfPractice } from "@/lib/public-claims";
import { homepageContent } from "@/components/home/homepage-content";
import * as m from "framer-motion/m";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/seo/SEOHead";
import { Scale, ShieldCheck, Users, ArrowRight, CheckCircle2, MessageCircle, Mail, Award, Globe, BadgeCheck, Clock, MapPin, MonitorSmartphone, FilePenLine, CreditCard, UserRoundCheck, Building2, BriefcaseBusiness, Landmark, Home as HomeIcon, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { LatestContentCarousels } from "@/components/content/latest-content-carousels";
import { JurisdictionDisclosure } from "@/components/legal/JurisdictionDisclosure";
import { ExperienceMethodologyNote } from "@/components/legal/ExperienceMethodologyNote";
import type { Translations } from "@/contexts/LanguageContext";
import type { Region } from "@/contexts/RegionContext";
import { COUNSELO_ENTITY_IDS, CONSULTATION_OPERATING_POLICY, getConsultationProduct } from "@workspace/api-zod/browser";

const fadeIn = {
  initial: false as const,
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const clientIcons = [Users, Scale, Globe, BadgeCheck];
const channelIcons = [MessageCircle, Mail];
const trustIcons = [Award, Scale, Clock, Globe];
const stepIcons = [MonitorSmartphone, FilePenLine, CreditCard, UserRoundCheck];
const serviceCardIcons = [Scale, Users, BriefcaseBusiness, Building2, HomeIcon, Landmark, ShieldCheck, FileText];

const regionalHeroMaps: Record<Region, string> = {
  sa: "/images/optimized/saudi-jurisdiction-map.svg",
  syr: "/images/optimized/syria-jurisdiction-map.svg",
  uae: "/images/optimized/uae-jurisdiction-map.svg?v=20260802-accurate-outline",
};

function RegionalReferenceHero({ h, regionPrefix, isRTL, region }: { h: Translations["home"]; regionPrefix: string; isRTL: boolean; region: Region }) {
  return (
    <section className={`uae-reference-hero regional-editorial-hero regional-editorial-hero--${region}`} aria-labelledby={`${region}-reference-title`}>
      <div className="uae-reference-hero__ornament" aria-hidden="true" />
      <div className="uae-reference-hero__grid">
        <m.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="uae-reference-hero__copy">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af60]">{h.hero.badge}</p>
          <h1 id={`${region}-reference-title`}>{h.hero.h1a}{" "}<br /><em>{h.hero.h1b}</em></h1>
          <p className="uae-reference-hero__lede">{isRTL ? "استشارات قانونية ومراجعة وصياغة مستندات للأفراد والشركات، أونلاين بالعربية والإنجليزية." : "Online legal advice, document review and drafting for individuals and businesses, in Arabic and English."}</p>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-white/75" aria-label={isRTL ? "مزايا الخدمة" : "Service highlights"}>
            {(isRTL ? ["استشارة ومراجعة مستندات", "العربية والإنجليزية", "نطاق ورسوم متفق عليها", "التمثيل بتكليف منفصل"] : ["Consultation & document review", "Arabic & English", "Agreed scope & fee", "Representation separately engaged"]).map((chip) => <li key={chip}>{chip.replace(/^✓\s*/, "")}</li>)}
          </ul>
          <div className="uae-reference-hero__actions">
            <Link href={`${regionPrefix}/contact`} className="uae-reference-button uae-reference-button--primary">{h.hero.bookBtn}<ArrowRight aria-hidden="true" /></Link>
            <Link href={`${regionPrefix}/services`} className="uae-reference-button uae-reference-button--secondary">{h.hero.servicesBtn}<ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="uae-reference-hero__trust" aria-label={isRTL ? "قنوات الاستشارة" : "Consultation channels"}>
            {h.hero.channels.map((channel, index) => {
              const Icon = channelIcons[index] ?? MessageCircle;
              return <a key={channel.label} href={saudiContactHref(index === 0 ? "whatsapp" : "email", isRTL, region)} data-cta={index === 0 ? "whatsapp" : "email"} data-conversion-position="sa-home-hero" data-region={region} data-lang={isRTL ? "ar" : "en"} className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"><Icon aria-hidden="true" />{channel.label}<small>{channel.sub}</small></a>;
            })}
          </div>
        </m.div>

        <div className="uae-reference-hero__map" aria-hidden="true">
          <img src={regionalHeroMaps[region]} alt="" width="620" height="440" fetchPriority="high" decoding="async" />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { t, isRTL } = useLanguage();
  const { region, regionPrefix } = useRegion();
  const h = t.home;
  const c = homepageContent[isRTL ? "ar" : "en"];
  const country = c.countryNames[region === "sa" ? 0 : region === "syr" ? 1 : 2];
  const description = isRTL ? `كاونسلو للاستشارات القانونية تقدم استشارات قانونية إلكترونية ومراجعة مستندات وإرشاداً مكتوباً لمسائل ${country}، بإشراف مؤسسها عمر البغدادي، بالعربية والإنجليزية.` : `CounselO Legal provides online legal consultation, document review and written guidance for ${country} matters, founded by Omar Al-Baghdadi, in Arabic and English.`;
  const comprehensiveConsultation = getConsultationProduct("comprehensive-consultation");
  return (
    <div className="regional-home-page w-full flex flex-col">
      <SEOHead
        title={isRTL ? `كاونسلو للاستشارات القانونية | استشارات قانونية في ${country}` : `CounselO Legal | Legal Consultation for ${country}`}
        description={description}
        canonical="/"
        schema={[
          { "@context": "https://schema.org", ...COUNSELO_ORGANIZATION },
          { "@context": "https://schema.org", ...COUNSELO_WEBSITE },
          { "@context": "https://schema.org", ...regionalServiceDirectoryEntity(region, isRTL ? "ar" : "en", isRTL ? `كاونسلو للاستشارات القانونية — ${country}` : `CounselO Legal — ${country}`, description, t.services.items) },
        ]}
        extraSchemas={[{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": isRTL ? "الرئيسية" : "Home", "item": `https://counselo-legal.com${regionPrefix}` },
          ],
        }]}
      />

      {/* ── HERO ── */}
      <div className=""><RegionalReferenceHero h={h} regionPrefix={regionPrefix} isRTL={isRTL} region={region} /></div>

      {/* ── ANSWER-FIRST REGIONAL SUMMARY ── */}
      <SaudiConsultationStart isArabic={isRTL} region={region} />

      <div className="premium-content-shell py-10 w-full"><ServiceReasons isArabic={isRTL} regionPrefix={regionPrefix} /></div>

      <PracticeDirectory region={region} isArabic={isRTL} />

      {/* ── HOW IT WORKS ── */}
      <section className="py-12 bg-white" aria-labelledby="how-it-works-heading">
        <div className="premium-content-shell">
          <h2 id="how-it-works-heading" className="mb-6 text-3xl font-serif">{isRTL ? "خطوات الاستشارة" : "How your consultation works"}</h2>
          <ServiceProcess isArabic={isRTL} />
        </div>
      </section>

      <section className="py-12 bg-background" aria-labelledby="about-founder-heading">
        <div className="premium-content-shell concise-founder">
          <img src="/omar-baghdadi.jpg" alt={c.founderName} width="160" height="200" loading="lazy" decoding="async" />
          <div>
            <h2 id="about-founder-heading" className="text-3xl font-serif mb-3">{c.founderName}</h2>
            <p>{isRTL ? "مؤسس كاونسلو، محامٍ ومستشار قانوني بدأ ممارسته عام 1996. يقود فريقاً يقدم الاستشارات ومراجعة المستندات بالعربية والإنجليزية." : "CounselO’s founder, a lawyer and legal counsel in practice since 1996, leads the team providing consultations and document review in Arabic and English."}</p>
            <Link href={`${regionPrefix}/about`} className="concise-text-link">{isRTL ? "الفريق والمؤهلات ونطاق العمل" : "Team, qualifications and scope of practice"}<ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" /></Link>
          </div>
        </div>
      </section>

      {/* ── PRACTICE AREAS ── */}


      <div className=""><LatestContentCarousels isArabic={isRTL} region={region} /></div>

      <div className=""><JurisdictionDisclosure jurisdiction={region} /></div>

      <RegionalHomeFaq region={region} isArabic={isRTL} />

      {/* ── CTA ── */}
      <section className="py-20 lg:py-24 relative overflow-hidden bg-[#003d22]" aria-labelledby="regional-cta-heading">
        <img
          src="/images/optimized/counselo-gold-legal-line-art-v1.webp"
          alt=""
          aria-hidden="true"
          width="1254"
          height="1254"
          loading="lazy"
          decoding="async"
          className="absolute w-[30rem] -end-32 -top-32 opacity-[0.13] pointer-events-none"
        />
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <m.div {...fadeIn} className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-20 items-center">
            <div>
              <p className="text-[#d4af60] uppercase tracking-[0.18em] text-xs font-semibold mb-4">{h.cta.eyebrow}</p>
              <h2 id="regional-cta-heading" className="text-4xl md:text-5xl font-serif font-medium text-white mb-6 leading-tight"><MessageCircle aria-hidden="true" className="mb-4 h-8 w-8" strokeWidth={1.5} />{h.cta.heading}</h2>
              <p className="text-lg text-white/70 mb-4 max-w-3xl leading-relaxed">{isRTL ? "أرسل ملخص المسألة والدولة وأي موعد قريب. نوضح النطاق والأتعاب قبل بدء العمل." : "Send a short summary, the country and any deadline. We confirm scope and fees before starting."}</p>

            </div>
            <div className="lg:border-s border-white/20 lg:ps-12">
            <div className="flex flex-col gap-3 mb-7">
              {h.hero.channels.map((ch, i) => {
                const Icon = channelIcons[i];
                return <a key={i} href={saudiContactHref(i === 0 ? "whatsapp" : "email", isRTL, region)} data-cta={i === 0 ? "whatsapp" : "email"} data-conversion-position="sa-home-footer" data-region={region} data-lang={isRTL ? "ar" : "en"} className="group flex items-center justify-between gap-4 border-b border-white/20 py-4 text-sm font-semibold text-white transition-colors hover:border-[#d4af60] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"><span className="flex items-center gap-3"><Icon className="h-5 w-5 text-[#d4af60]" />{ch.label}</span><ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" /></a>;
                return (
                  <Link key={i} href={`${regionPrefix}/contact`}
                    className="group flex items-center justify-between gap-4 border-b border-white/20 text-white py-4 text-sm font-semibold hover:border-[#d4af60] transition-colors">
                    <span className="flex items-center gap-3"><Icon className="h-5 w-5 text-[#d4af60]" /> {ch.label}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                  </Link>
                );
              })}
            </div>
            <Button asChild size="lg" className="group w-full text-base px-8 py-7 rounded-none bg-[#d4af60] text-[#003d22] hover:bg-[#e0c078] font-semibold">
              <Link href={`${regionPrefix}/contact`}>
                {h.cta.ctaBtn}
                <ArrowRight className="ms-3 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
              </Link>
            </Button>
            </div>
          </m.div>
        </div>
      </section>

    </div>
  );
}
