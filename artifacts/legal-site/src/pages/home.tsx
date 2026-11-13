import { regionalServiceDirectoryEntity, COUNSELO_ORGANIZATION, COUNSELO_WEBSITE } from "@workspace/api-zod/browser";
import { PracticeDirectory } from "@/components/home/practice-directory";
import { PlatformFacts } from "@/components/legal/platform-facts";
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
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#866523]">{h.hero.badge}</p>
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
  const description = isRTL ? `كاونسلو تقدم دعماً قانونياً متكاملاً لمسائل ${country} بدعم فريق ثنائي اللغة وشبكة قوية من المحامين والشركاء المهنيين في السعودية والإمارات وسوريا.` : `CounselO Legal offers comprehensive legal support for ${country}, backed by a bilingual team and strong professional connections with lawyers and partners across Saudi Arabia, the UAE and Syria.`;
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
      <PlatformFacts isArabic={isRTL} />

      <PracticeDirectory region={region} isArabic={isRTL} variant="home" />

      <div className=""><LatestContentCarousels isArabic={isRTL} region={region} /></div>



      {/* ── CTA ── */}
      <section className="bg-[#173f30] px-6 py-8 sm:px-8 lg:px-12" aria-labelledby="regional-cta-heading">
        <m.div {...fadeIn} className="mx-auto grid max-w-[1180px] items-center gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:gap-10">
          <div className="min-w-0">
            <h2 id="regional-cta-heading" className="mb-3 text-2xl font-semibold leading-snug text-white md:text-3xl">
              {isRTL ? "ابدأ استشارتك القانونية أونلاين." : "Start your legal consultation online."}
            </h2>
            <p className="max-w-2xl text-base leading-7 text-[#d2e1d8]">
              {isRTL
                ? "أرسل سؤالك أو مستنداتك إلى فريقنا القانوني لتحصل على مشورة واضحة بالعربية أو الإنجليزية، دون زيارة مكتب."
                : "Share your question or documents with our legal team for clear advice in Arabic or English, without an office visit."}
            </p>
          </div>
          <div className="flex flex-col gap-2 md:min-w-56">
            <Button asChild className="h-auto min-h-12 rounded-md bg-[#d4af60] px-5 py-3 text-base font-semibold text-[#173f30] hover:bg-[#e0c078]">
              <Link href={`${regionPrefix}/contact`} data-cta="contact" data-conversion-position="sa-home-footer" data-region={region} data-lang={isRTL ? "ar" : "en"}>
                {isRTL ? "تواصل مع فريقنا" : "Contact our team"}
                <ArrowRight aria-hidden="true" className="ms-2 h-4 w-4 rtl:rotate-180" />
              </Link>
            </Button>
            <div className="flex flex-wrap justify-center gap-x-5">
              {h.hero.channels.map((channel, index) => {
                const Icon = channelIcons[index];
                const channelType = index === 0 ? "whatsapp" : "email";
                return (
                  <a key={channelType} href={saudiContactHref(channelType, isRTL, region)} data-cta={channelType} data-conversion-position="sa-home-footer" data-region={region} data-lang={isRTL ? "ar" : "en"} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4af60]">
                    <Icon aria-hidden="true" className="h-4 w-4 text-[#d4af60]" />
                    {channel.label}
                  </a>
                );
              })}
            </div>
          </div>
        </m.div>
      </section>

    </div>
  );
}
