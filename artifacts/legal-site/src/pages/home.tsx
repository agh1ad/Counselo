import { regionalServiceDirectoryEntity, COUNSELO_ORGANIZATION, COUNSELO_WEBSITE } from "@workspace/api-zod/browser";
import { PracticeDirectory } from "@/components/home/practice-directory";
import { saudiContactHref } from "@/components/home/saudi-consultation-start";
import { SaudiHomeIntroduction, SaudiHomeStrengths, regionalHomeCopy } from "@/components/home/saudi-home-introduction";
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
  const saudiCopy = regionalHomeCopy(region, isRTL);
  return (
    <section className={`uae-reference-hero regional-editorial-hero regional-editorial-hero--${region}`} aria-labelledby={`${region}-reference-title`}>
      <div className="uae-reference-hero__ornament" aria-hidden="true" />
      <div className="uae-reference-hero__grid">
        <m.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="uae-reference-hero__copy">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af60]">{h.hero.badge}</p>
          <h1 id={`${region}-reference-title`}>{saudiCopy.title}</h1>
          <p className="sa-home-hero-lead">{saudiCopy.heroLead}</p>
          <p className="uae-reference-hero__lede">{saudiCopy.heroText}</p>
          <div className="uae-reference-hero__actions">
            <Link href={`${regionPrefix}/contact`} className="uae-reference-button uae-reference-button--primary">{h.hero.bookBtn}<ArrowRight aria-hidden="true" /></Link>
            <Link href={`${regionPrefix}/services`} className="uae-reference-button uae-reference-button--secondary">{region === "sa" ? (isRTL ? "استكشف خدماتنا" : "Explore our services") : h.hero.servicesBtn}<ArrowRight aria-hidden="true" /></Link>
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
  const description = isRTL ? `كاونسلو للاستشارات القانونية تقدم استشارات قانونية إلكترونية ومراجعة مستندات وإرشاداً مكتوباً لمسائل ${country}، يقدمها فريقها القانوني المتمرس بالعربية والإنجليزية.` : `CounselO Legal provides online legal consultation, document review and written guidance for ${country} matters, delivered by its experienced legal team in Arabic and English.`;
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

      <SaudiHomeStrengths isArabic={isRTL} region={region} />

      {/* ── ANSWER-FIRST REGIONAL SUMMARY ── */}
      <SaudiHomeIntroduction isArabic={isRTL} region={region} />


      <PracticeDirectory region={region} isArabic={isRTL} variant="home" />

      <div className=""><LatestContentCarousels isArabic={isRTL} region={region} /></div>



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
