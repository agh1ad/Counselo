import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/seo/SEOHead";
import { Scale, ShieldCheck, Users, ArrowRight, CheckCircle2, Star, Quote, MessageCircle, Mail, Award, Globe, Zap, BadgeCheck, Wifi, Clock, Lock, MapPin, MonitorSmartphone, FilePenLine, CreditCard, UserRoundCheck, Building2, BriefcaseBusiness, Landmark, Home as HomeIcon, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { LatestContentCarousels } from "@/components/content/latest-content-carousels";
import { useEffect, useState } from "react";
import type { Translations } from "@/contexts/LanguageContext";
import type { Region } from "@/contexts/RegionContext";
import { CONSULTATION_OPERATING_POLICY, getConsultationProduct, OMAR_AL_BAGHDADI } from "@workspace/api-zod";

const fadeIn = {
  initial: false as const,
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const platformIcons = { wifi: Wifi, clock: Clock, lock: Lock, globe: Globe };
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
        <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="uae-reference-hero__copy">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af60]">{h.hero.badge}</p>
          <h1 id={`${region}-reference-title`}>{h.hero.h1a}<br /><em>{h.hero.h1b}</em></h1>
          <p className="uae-reference-hero__lede">{h.hero.desc} <strong>{h.hero.descBold}</strong></p>
          <p className="uae-reference-hero__support">{h.hero.subDesc}</p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-white/75" aria-label={isRTL ? "مزايا الخدمة" : "Service highlights"}>
            {h.hero.chips.slice(0, 4).map((chip) => <li key={chip}>{chip.replace(/^✓\s*/, "")}</li>)}
          </ul>
          <div className="uae-reference-hero__actions">
            <Link href={`${regionPrefix}/contact`} className="uae-reference-button uae-reference-button--primary">{h.hero.bookBtn}<ArrowRight aria-hidden="true" /></Link>
            <Link href={`${regionPrefix}/services`} className="uae-reference-button uae-reference-button--secondary">{h.hero.servicesBtn}<ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="uae-reference-hero__trust" aria-label={isRTL ? "قنوات الاستشارة" : "Consultation channels"}>
            {h.hero.channels.map((channel, index) => {
              const Icon = channelIcons[index] ?? MessageCircle;
              return <span key={channel.label}><Icon aria-hidden="true" />{channel.label}<small>{channel.sub}</small></span>;
            })}
          </div>
        </motion.div>

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
  const servicesAreaCount = t.services.items.length;
  const comprehensiveConsultation = getConsultationProduct("comprehensive-consultation");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);

  useEffect(() => {
    const testimonialCount = h.testimonials.items.length;
    if (testimonialCount <= 1 || isTestimonialPaused) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const interval = window.setInterval(() => {
      if (!document.hidden) {
        setActiveTestimonial((current) => (current + 1) % testimonialCount);
      }
    }, 3_000);

    return () => window.clearInterval(interval);
  }, [h.testimonials.items.length, isTestimonialPaused]);

  return (
    <div className="w-full flex flex-col">
      <SEOHead
        title={region === "uae"
          ? (isRTL ? "منصة الإمارات القانونية الإلكترونية | استشارات أونلاين" : "UAE Online Legal Platform | Legal Consultation")
          : region === "syr"
          ? (isRTL
            ? "منصة سوريا للاستشارات القانونية الأونلاين | استجابة خلال 24 ساعة"
            : "Syria Online Legal Platform | Legal Consultation")
          : (isRTL
            ? "منصة المملكة للاستشارات القانونية الأونلاين | استجابة خلال 24 ساعة"
            : "Saudi Arabia Online Legal Platform | Legal Consultation")}
        description={region === "uae"
          ? (isRTL
            ? `كاونسلو — استشارات قانونية أونلاين لمسائل الإمارات في ${servicesAreaCount} مجالاً قانونياً، وفق الإطار الاتحادي والمحلي وأنظمة البرّ الرئيسي والمناطق الحرة، بالعربية والإنجليزية.`
            : `CounselO is a bilingual online legal platform for UAE consultation, document review and structured guidance across ${servicesAreaCount} practice areas, covering federal, emirate-level, mainland and free-zone frameworks.`)
          : region === "syr"
          ? (isRTL
            ? `قانوني — منصة سوريا للاستشارات القانونية الأونلاين. مشورة قانونية متخصصة خلال 24 ساعة عبر واتساب أو البريد الإلكتروني. ${servicesAreaCount} مجالاً قانونياً وفق القانون المدني السوري وقانون الشركات 29/2011 وقانون العمل 17/2010. خبرة تزيد على 30 عاماً، أكثر من 20,000 قضية. بإشراف المحامي عمر البغدادي. بالعربية والإنجليزية.`
            : `CounselO is Syria's online legal platform for consultation, document review and structured guidance — ${servicesAreaCount} practice areas under Syrian law, in Arabic and English. Target professional response within 24 hours, subject to scope and urgency.`)
          : (isRTL
            ? `قانوني — منصة المملكة العربية السعودية للاستشارات القانونية الأونلاين. مشورة قانونية متخصصة خلال 24 ساعة عبر واتساب أو البريد الإلكتروني للأفراد والشركات والمستثمرين. ${servicesAreaCount} مجالاً قانونياً، خبرة تزيد على 30 عاماً، أكثر من 20,000 قضية. بإشراف المحامي والمستشار القانوني عمر البغدادي. متاحة بالعربية والإنجليزية في الجبيل والرياض وجدة والدمام وجميع مناطق المملكة. رؤية 2030.`
            : `CounselO is Saudi Arabia's online legal platform for consultation, document review and structured guidance across ${servicesAreaCount} practice areas, covering family, commercial, employment, real estate, investment and administrative matters. Target professional response within 24 hours, subject to scope and urgency.`)}
        canonical="/"
        keywords={region === "uae"
          ? (isRTL
            ? "استشارة قانونية الإمارات, محامي أونلاين دبي, محامي أبوظبي, قانون الشركات الإماراتي, قانون العمل الإماراتي, المناطق الحرة, مركز دبي المالي, أبوظبي العالمي"
            : "UAE legal consultation, online lawyer Dubai, Abu Dhabi legal advice, UAE company law, UAE employment law, free zone lawyer, DIFC, ADGM")
          : region === "syr"
          ? (isRTL
            ? "استشارة قانونية أونلاين سوريا, محامي أونلاين سوريا, مشورة قانونية خلال 24 ساعة, القانون المدني السوري, قانون الأسرة السوري 59/1953, قانون الشركات السوري 29/2011, قانون العمل السوري 17/2010, القانون العقاري سوريا, مصرف سوريا المركزي, هيئة الضرائب العامة سوريا, عمر البغدادي, محامي دمشق أونلاين, محامي حلب, قانوني سوريا"
            : "online legal consultation Syria, Syria legal consultation platform, lawyer online Syria, legal advice within 24 hours Syria, Syrian Civil Code, family law Syria, companies law Syria 29/2011, employment law Syria 17/2010, real estate law Syria, Central Bank of Syria, General Tax Authority Syria, Omar Al-Baghdadi, Damascus lawyer online, CounselO Syria")
          : (isRTL
            ? "استشارة قانونية أونلاين السعودية, محامي أونلاين المملكة, مشورة قانونية خلال 24 ساعة, قانون الأسرة السعودي, القانون التجاري السعودي, قانون العمل, القانون العقاري, استثمار أجنبي, القانون الإداري, استشارة قانونية واتساب, قانون جنائي سعودي, قانون ضريبي زكاة, مشورة قانونية الجبيل, عمر البغدادي, رؤية 2030, قانوني"
            : "online legal consultation Saudi Arabia, Saudi Arabia online legal platform, lawyer online Saudi Arabia, legal advice within 24 hours KSA, family law Saudi Arabia, commercial law KSA, employment law Saudi Arabia, real estate law KSA, foreign investment lawyer Saudi Arabia, administrative law KSA, criminal law Saudi Arabia, banking finance law, tax zakat lawyer, medical malpractice KSA, WhatsApp legal consultation, Omar Al-Baghdadi, Jubail lawyer, Vision 2030 legal, CounselO")}
        schema={region === "uae" ? {
          "@context": "https://schema.org",
          "@type": "LegalService",
          "@id": "https://counselo-legal.com/#uae-service-directory",
          "name": "CounselO UAE",
          "alternateName": "CounselO Online Legal Consultations — United Arab Emirates",
          "description": isRTL ? "منصة قانونية إلكترونية للاستشارات ومراجعة المستندات والإرشاد المنظم لمسائل الإمارات بالعربية والإنجليزية" : "Online legal platform for UAE consultation, document review and structured guidance in Arabic and English",
          "url": "https://counselo-legal.com/uae",
          "logo": { "@type": "ImageObject", "url": "https://counselo-legal.com/logo.png", "width": 512, "height": 512 },
          "founder": OMAR_AL_BAGHDADI,
          "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
          "availableLanguage": ["Arabic", "English"],
          "serviceType": t.services.items.map((service) => service.title),
          "hasOfferCatalog": { "@type": "OfferCatalog", "name": "UAE Legal Consultation Services", "numberOfItems": servicesAreaCount },
          "contactPoint": { "@type": "ContactPoint", "telephone": "+966594850247", "contactType": "legal consultation", "availableLanguage": ["Arabic", "English"] },
        } : region === "syr" ? {
          "@context": "https://schema.org",
          "@type": "LegalService",
          "@id": "https://counselo-legal.com/#syr-service-directory",
          "name": "CounselO",
          "alternateName": "CounselO Online Legal Consultations",
          "description": isRTL
            ? `منصة سوريا للاستشارات القانونية الأونلاين — ${servicesAreaCount} مجالاً قانونياً، استجابة خلال 24 ساعة، بإشراف المحامي عمر البغدادي — خبرة أكثر من 30 عاماً في القانون السوري`
            : `Syria's online legal platform — ${servicesAreaCount} practice areas for consultation, document review and structured guidance, with a target professional response within 24 hours subject to scope and urgency`,
          "url": "https://counselo-legal.com/syr",
          "logo": {
            "@type": "ImageObject",
            "url": "https://counselo-legal.com/logo.png",
            "width": 512,
            "height": 512,
          },
          "founder": {
            ...OMAR_AL_BAGHDADI,
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Damascus",
            "addressRegion": "Damascus Governorate",
            "addressCountry": "SY",
          },
          "areaServed": {
            "@type": "Country",
            "name": "Syria",
          },
          "availableLanguage": ["Arabic", "English"],
          "serviceType": ["Family Law", "Commercial Law", "Civil Law", "Employment Law", "Real Estate Law", "Foreign Investment Law", "Administrative Law", "Criminal Law", "Banking & Finance Law", "Tax Law", "Cyber Law", "Medical Malpractice", "Insurance Law", "Intellectual Property", "Arbitration", "Enforcement Law", "Companies Law", "Contracts Law", "Civil Procedure", "Criminal Procedure"],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Legal Consultation Services Syria",
            "numberOfItems": 20,
          },
          "sameAs": ["https://counselo-legal.com"],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+966594850247",
            "contactType": "legal consultation",
            "availableLanguage": ["Arabic", "English"],
          },
        } : {
          "@context": "https://schema.org",
          "@type": "LegalService",
          "@id": "https://counselo-legal.com/#sa-service-directory",
          "name": "CounselO",
          "alternateName": "CounselO Online Legal Consultations",
          "description": isRTL
            ? `منصة المملكة العربية السعودية للاستشارات القانونية الأونلاين — ${servicesAreaCount} مجالاً قانونياً، استجابة خلال 24 ساعة، بإشراف المحامي عمر البغدادي`
            : `Saudi Arabia's online legal platform — ${servicesAreaCount} practice areas for consultation, document review and structured guidance, with a target professional response within 24 hours subject to scope and urgency`,
          "url": "https://counselo-legal.com/sa",
          "logo": {
            "@type": "ImageObject",
            "url": "https://counselo-legal.com/logo.png",
            "width": 512,
            "height": 512,
          },
          "founder": {
            ...OMAR_AL_BAGHDADI,
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Jubail",
            "addressRegion": "Eastern Province",
            "addressCountry": "SA",
          },
          "areaServed": {
            "@type": "Country",
            "name": "Saudi Arabia",
          },
          "availableLanguage": ["Arabic", "English"],
          "serviceType": ["Family Law", "Commercial Law", "Employment Law", "Real Estate Law", "Foreign Investment Law", "Administrative Law", "Criminal Law", "Banking & Finance Law", "Tax & Zakat Law", "Cyber Law", "Medical Malpractice", "Insurance Law", "Intellectual Property", "Arbitration", "Enforcement Law", "Companies Law", "Contracts Law"],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Legal Consultation Services Saudi Arabia",
            "numberOfItems": 17,
          },
          "sameAs": ["https://counselo-legal.com"],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+966594850247",
            "contactType": "legal consultation",
            "availableLanguage": ["Arabic", "English"],
          },
        }}
        extraSchemas={[{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": isRTL ? "الرئيسية" : "Home", "item": `https://counselo-legal.com/${region}` },
          ],
        }]}
      />

      {/* ── HERO ── */}
      <div className="order-1"><RegionalReferenceHero h={h} regionPrefix={regionPrefix} isRTL={isRTL} region={region} /></div>

      {/* ── ANSWER-FIRST REGIONAL SUMMARY ── */}
      <section className="order-2 border-b border-border bg-white py-16 lg:py-20" aria-labelledby={`${region}-platform-summary`}>
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7735]">{isRTL ? "نطاق الخدمة" : "Regional service scope"}</p>
              <h2 id={`${region}-platform-summary`} className="text-3xl font-serif font-medium leading-tight text-foreground md:text-5xl">
                {isRTL ? `منصة قانونية إلكترونية لمسائل ${region === "uae" ? "الإمارات" : region === "syr" ? "سوريا" : "السعودية"}` : `Online legal platform for ${region === "uae" ? "UAE" : region === "syr" ? "Syria" : "Saudi Arabia"} matters`}
              </h2>
            </div>
            <div className="space-y-5 text-base leading-8 text-muted-foreground md:text-lg">
              <p><strong className="text-foreground">{isRTL ? `كاونسلو تقدم استشارات قانونية أونلاين ومراجعة مستندات وإرشاداً مكتوباً وفق اختصاص ${region === "uae" ? "الإمارات" : region === "syr" ? "القانون السوري" : "القانون السعودي"}.` : `CounselO provides online legal consultation, document review and structured written guidance for ${region === "uae" ? "UAE" : region === "syr" ? "Syrian" : "Saudi"} matters.`}</strong> {isRTL ? "ابدأ بتحديد المسألة وإرسال المعلومات الأساسية بالعربية أو الإنجليزية." : "Start by describing the matter and sending the essential information in Arabic or English."}</p>
              <p>{isRTL ? "يحدد الفريق القانون والجهة والنطاق المناسب قبل تأكيد العمل. وقت الاستجابة المهني مستهدف خلال 24 ساعة وفق نطاق المسألة ودرجة الاستعجال واكتمال المعلومات وتوفر الخدمة." : "The team identifies the applicable law, authority and scope before confirming the work. A professional response is targeted within 24 hours, subject to scope, urgency, intake completeness and service availability."}</p>
              <dl className="grid gap-3 sm:grid-cols-2">
                {[
                  [isRTL ? "الخدمات" : "Services", isRTL ? "استشارة · مراجعة مستندات · تحليل أولي · إرشاد مكتوب" : "Consultation · document review · preliminary analysis · written guidance"],
                  [isRTL ? "اللغة" : "Language", isRTL ? "العربية والإنجليزية" : "Arabic and English"],
                  [isRTL ? "الوصول" : "Access", isRTL ? "واتساب أو البريد الإلكتروني" : "WhatsApp or email"],
                  [isRTL ? "التمثيل أمام المحاكم" : "Court representation", isRTL ? "إذا طُلب أو أصبح ضرورياً، يرتب بشكل مستقل عبر مهنيين شركاء أو مكاتب متعاونة مرخصة" : "If requested or necessary, arranged separately through licensed partner professionals or cooperating offices"],
                ].map(([label, value]) => <div key={label} className="border-s-2 border-[#b4924a] bg-[#f4f7f4] px-4 py-3"><dt className="text-xs font-semibold uppercase tracking-[0.12em] text-primary/70">{label}</dt><dd className="mt-1 text-sm leading-6 text-foreground">{value}</dd></div>)}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {comprehensiveConsultation && (
        <section className="order-3 border-b border-border bg-[#eef4f0] py-16 lg:py-20" aria-labelledby="regional-consultation-package-heading">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7735]">{isRTL ? "حزمة الاستشارة" : "Consultation package"}</p>
                <h2 id="regional-consultation-package-heading" className="text-3xl font-serif font-medium leading-tight text-foreground md:text-5xl">
                  {isRTL ? comprehensiveConsultation.titleAr : comprehensiveConsultation.titleEn}
                </h2>
                <p className="mt-5 text-base leading-8 text-muted-foreground md:text-lg">{isRTL ? comprehensiveConsultation.summaryAr : comprehensiveConsultation.summaryEn}</p>
              </div>
              <div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {(isRTL ? comprehensiveConsultation.includesAr : comprehensiveConsultation.includesEn).map((item) => (
                    <li key={item} className="flex items-start gap-3 border-s border-[#b4924a] bg-white px-4 py-3 text-sm leading-6 text-foreground">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm leading-7 text-muted-foreground">
                  <strong className="text-foreground">{isRTL ? "النطاق والتكليف:" : "Scope and engagement:"}</strong>{" "}
                  {isRTL ? `${CONSULTATION_OPERATING_POLICY.monitoringAr} ${CONSULTATION_OPERATING_POLICY.representationAr}` : `${CONSULTATION_OPERATING_POLICY.monitoringEn} ${CONSULTATION_OPERATING_POLICY.representationEn}`}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── STATS STRIP ── */}
      <section className="order-4 relative py-10 lg:py-12 bg-[#003d22] text-white overflow-hidden" aria-label={isRTL ? "أرقام ونطاق الخدمة" : "Service credentials and scope"}>
        <div className="counselo-orbit counselo-orbit-stats" aria-hidden="true" />
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 divide-x rtl:divide-x-reverse divide-white/20">
            {h.stats.map((item, i) => (
              <motion.div key={i} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }} className="px-4 md:px-8 lg:px-10 flex items-center gap-3 md:gap-5">
                {(() => {
                  const Icon = trustIcons[i] ?? Award;
                  return <Icon className="hidden sm:block h-7 w-7 text-[#d4af60] shrink-0" strokeWidth={1.4} />;
                })()}
                <div>
                  <div className="text-3xl md:text-4xl font-serif font-medium text-white mb-1 leading-tight">{item.stat}</div>
                  <div className="text-[0.65rem] md:text-xs font-medium text-white/65 uppercase tracking-[0.14em] leading-snug">{item.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORM ADVANTAGES ── */}
      <section className="order-5 py-24 lg:py-32 bg-background relative overflow-hidden" aria-labelledby="platform-advantages-heading">
        <img
          src="/images/optimized/counselo-platform-line-art-v1.png"
          alt=""
          aria-hidden="true"
          width="1719"
          height="915"
          loading="lazy"
          decoding="async"
          className="absolute w-[48rem] max-w-[62vw] end-[-4rem] top-[-2rem] opacity-[0.17] pointer-events-none hidden lg:block"
        />
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative">
          <motion.div {...fadeIn} className="max-w-2xl mb-16 lg:mb-24">
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">{h.platform.eyebrow}</p>
            <h2 id="platform-advantages-heading" className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">{h.platform.heading}</h2>
            <div className="counselo-gold-rule mb-6" />
            <p className="text-muted-foreground text-lg leading-relaxed">{h.platform.subheading}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-y border-border">
            {h.platform.advantages.map((adv, i) => {
              const Icon = platformIcons[adv.icon as keyof typeof platformIcons] ?? Globe;
              return (
                <motion.div key={i} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group py-9 px-1 sm:px-7 lg:px-8 first:ps-0 lg:border-e last:border-e-0 border-border">
                  <div className="flex items-center justify-between mb-9">
                    <div className="w-14 h-14 border border-primary/20 flex items-center justify-center relative">
                      <Icon className="h-7 w-7 text-primary" strokeWidth={1.4} />
                    </div>
                    <span className="font-serif text-4xl text-[#b4924a]/70">0{i + 1}</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{adv.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{adv.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="order-6 py-24 lg:py-32 bg-[#003d22] text-white relative overflow-hidden" aria-labelledby="how-it-works-heading">
        <img
          src="/images/optimized/counselo-gold-legal-line-art-v1.png"
          alt=""
          aria-hidden="true"
          width="1254"
          height="1254"
          loading="lazy"
          decoding="async"
          className="absolute w-[34rem] -start-48 top-24 opacity-[0.13] pointer-events-none"
        />
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[#d4af60] font-medium uppercase tracking-[0.18em] text-xs mb-3">{h.howItWorks.eyebrow}</p>
            <h2 id="how-it-works-heading" className="text-4xl md:text-5xl font-serif font-medium text-white mb-4">{h.howItWorks.heading}</h2>
            <div className="w-20 h-px bg-[#d4af60] mx-auto mb-6" />
            <p className="text-white/65 text-lg">{h.howItWorks.subheading}</p>
          </motion.div>
          <div className="relative grid md:grid-cols-4 gap-8 md:gap-0">
            <div className="hidden md:block absolute top-8 inset-x-[10%] h-px bg-[#d4af60]/55" aria-hidden="true">
              {[25, 50, 75].map((position) => (
                <span
                  key={position}
                  className="absolute top-1/2 w-2 h-2 bg-white rotate-45 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${position}%` }}
                />
              ))}
            </div>
            {h.howItWorks.steps.map((s, i) => {
              const StepIcon = stepIcons[i] ?? CheckCircle2;
              return (
                <motion.div key={i} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative px-4 lg:px-8 text-center">
                  <div className="relative z-10 w-16 h-16 rounded-full border border-[#d4af60] bg-[#003d22] text-[#e0c078] flex items-center justify-center mx-auto mb-5 font-serif text-xl shadow-[0_0_0_8px_#003d22]">{s.step.replace(/^0/, "")}</div>
                  <div className="h-9 border-s border-dashed border-[#d4af60]/70 w-px mx-auto mb-3" aria-hidden="true" />
                  <StepIcon className="w-10 h-10 text-[#d4af60] mx-auto mb-5" strokeWidth={1.25} aria-hidden="true" />
                  <h3 className="text-xl font-serif font-medium text-white mb-4">{s.title}</h3>
                  <p className="text-white/60 leading-relaxed text-sm">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
          <div className="text-center mt-14">
            <Link href={`${regionPrefix}/contact`}>
              <Button size="lg" className="group rounded-none px-10 py-6 bg-[#d4af60] text-[#003d22] hover:bg-[#e0c078] font-semibold">
                {h.consultMethods.ctaBtn}
                <ArrowRight className="ms-3 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
              </Button>
            </Link>
            <p className="text-white/45 text-xs mt-4">{isRTL ? "آمن · سري · مهني" : "Secure · Confidential · Professional"}</p>
          </div>
        </div>
      </section>

      {/* ── CONSULTATION METHODS ── */}
      <section className="order-7 py-24 lg:py-28 bg-white border-b border-border" aria-labelledby="consultation-methods-heading">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div {...fadeIn} className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20 mb-12 items-end">
            <div>
              <p className="text-[#9a7735] uppercase tracking-[0.18em] text-xs font-semibold mb-3">{h.consultMethods.eyebrow}</p>
              <h2 id="consultation-methods-heading" className="text-4xl md:text-5xl font-serif font-medium text-foreground mb-5">{h.consultMethods.heading}</h2>
              <div className="counselo-gold-rule" />
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">{h.consultMethods.intro}</p>
          </motion.div>
          <div className="grid md:grid-cols-2 border-y border-border mb-12">
            {h.consultMethods.methods.map((method, i) => {
              const Icon = channelIcons[i];
              return (
                <motion.div key={i} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group py-9 md:py-12 md:px-10 first:md:ps-0 md:border-e last:border-e-0 border-border relative">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 border border-primary/25 flex items-center justify-center">
                      <Icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="text-[#9a7735] text-[0.68rem] font-semibold uppercase tracking-[0.16em]">{method.badge}</div>
                  </div>
                  <h3 className="text-2xl font-serif font-medium text-foreground mb-3">{method.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{method.desc}</p>
                  <Link href={`${regionPrefix}/contact`} className="inline-flex items-center gap-2 text-primary text-sm font-semibold border-b border-primary/30 pb-1 hover:border-primary transition-colors">
                    {h.consultMethods.ctaBtn} <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
          <div className="text-center">
            <Link href={`${regionPrefix}/contact`}>
              <Button size="lg" className="text-lg px-12 py-6 rounded-none bg-white text-primary hover:bg-white/90 font-semibold">{h.consultMethods.ctaBtn}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT / FOUNDER ── */}
      <section className="order-8 py-24 lg:py-32 bg-background relative overflow-hidden" aria-labelledby="about-founder-heading">
        <div className="counselo-orbit counselo-orbit-founder" aria-hidden="true" />
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-end">
            <motion.div {...fadeIn}>
              <p className="text-[#9a7735] font-semibold uppercase tracking-[0.18em] text-xs mb-3">{h.about.eyebrow}</p>
              <h2 id="about-founder-heading" className="text-4xl md:text-5xl font-serif font-medium text-foreground mb-6 leading-tight">{h.about.heading}</h2>
              <div className="counselo-gold-rule mb-8" />
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{h.about.p1}</p>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{h.about.p2}</p>
              <p className="text-muted-foreground text-lg mb-9 leading-relaxed">{h.about.p3}</p>
              <div className="grid grid-cols-2 border-y border-border mb-8">
                <div className="py-6 pe-5 border-e border-border">
                  <span className="block text-4xl font-serif text-primary font-medium mb-1">30+</span>
                  <span className="block text-[#9a7735] font-semibold uppercase tracking-[0.12em] text-[0.65rem] leading-snug">
                    {h.about.yearsLabel ?? (isRTL ? "سنة خبرة قانونية" : "Years of Legal Experience")}
                  </span>
                </div>
                <div className="py-6 ps-6">
                  <span className="block text-4xl font-serif text-primary font-medium mb-1">{h.about.caseStat}</span>
                  <span className="block text-[#9a7735] font-semibold uppercase tracking-[0.12em] text-[0.65rem] leading-snug">{h.about.caseLabel}</span>
                </div>
              </div>
              <ul className="space-y-4 border-t border-border pt-7">
                {h.about.bullets.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground">
                    <span className="mt-2 block h-1.5 w-1.5 rotate-45 bg-[#b4924a] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-border">
                <div className="font-serif italic text-2xl text-primary leading-tight">{h.about.founderName}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-[0.14em] mt-1">{h.about.founderRole}</div>
              </div>
            </motion.div>

            <motion.div initial={false} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative self-stretch min-h-[560px]">
              <div className="counselo-orbit counselo-orbit-founder-portrait" aria-hidden="true" />
              <div className="absolute inset-0 overflow-hidden">
                <img src="/omar-baghdadi.jpg" alt="Lawyer Omar Al-Baghdadi — Lawyer and Legal Counsel, Founder of CounselO — 30+ years, 20,000+ cases"
                  className="counselo-founder-art w-full h-full object-cover object-top"
                  width="800" height="1200" loading="lazy" decoding="async" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── COOPERATING OFFICE / PHYSICAL PRESENCE ── */}
      <section className="order-9 py-24 lg:py-28 bg-white border-y border-border relative overflow-hidden" aria-labelledby="cooperation-heading">
        <div className="counselo-orbit counselo-orbit-section" aria-hidden="true" />
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative">
          <div className="grid lg:grid-cols-[0.78fr_1.22fr] gap-12 lg:gap-20 items-start">
            <motion.div {...fadeIn}>
              <p className="text-[#9a7735] font-semibold uppercase tracking-[0.18em] text-xs mb-3">{h.cooperation.eyebrow}</p>
              <h2 id="cooperation-heading" className="text-4xl md:text-5xl font-serif font-medium text-foreground mb-6 leading-tight">{h.cooperation.heading}</h2>
              <div className="counselo-gold-rule mb-8" />
              <p className="text-muted-foreground text-lg leading-relaxed">{h.cooperation.desc}</p>
            </motion.div>
            <motion.div initial={false} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="border-t border-border">
              {/* Primary office card */}
              <div className="grid sm:grid-cols-[5rem_1fr] gap-5 sm:gap-8 py-8 border-b border-border">
                <div className="w-16 h-16 border border-primary/20 flex items-center justify-center shrink-0">
                  <MapPin className="h-7 w-7 text-primary" strokeWidth={1.4} />
                </div>
                <div>
                  <div className="text-[#9a7735] text-[0.68rem] font-semibold uppercase tracking-[0.16em] mb-2">{h.cooperation.officeLabel}</div>
                  <div className="font-serif font-medium text-2xl text-foreground mb-4">{h.cooperation.officeName}</div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm leading-relaxed">{h.cooperation.officeDetail}</span>
                  </div>
                </div>
              </div>

              {/* Second office card — Syria only */}
              {h.cooperation.office2 && (
                <div className="grid sm:grid-cols-[5rem_1fr] gap-5 sm:gap-8 py-8 border-b border-border">
                  <div className="w-16 h-16 border border-primary/20 flex items-center justify-center shrink-0">
                    <MapPin className="h-7 w-7 text-primary" strokeWidth={1.4} />
                  </div>
                  <div>
                    <div className="text-[#9a7735] text-[0.68rem] font-semibold uppercase tracking-[0.16em] mb-2">{h.cooperation.officeLabel}</div>
                    <div className="font-serif font-medium text-2xl text-foreground mb-4">{h.cooperation.office2.officeName}</div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm leading-relaxed">{h.cooperation.office2.officeDetail}</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHO WE SERVE ── */}
      <section className="order-10 py-24 lg:py-32 bg-background border-b border-border" aria-labelledby="who-we-serve-heading">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div {...fadeIn} className="max-w-3xl mb-16 lg:mb-20">
            <p className="text-[#9a7735] font-semibold uppercase tracking-[0.18em] text-xs mb-3">{h.whoWeServe.eyebrow}</p>
            <h2 id="who-we-serve-heading" className="text-4xl md:text-5xl font-serif font-medium text-foreground mb-5">{h.whoWeServe.heading}</h2>
            <div className="counselo-gold-rule mb-6" />
            <p className="text-muted-foreground text-lg leading-relaxed">{h.whoWeServe.subheading}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-y border-border">
            {h.whoWeServe.clients.map((client, i) => {
              const Icon = clientIcons[i];
              return (
                <motion.div key={i} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group py-10 px-1 sm:px-7 lg:px-8 first:ps-0 lg:border-e last:border-e-0 border-border">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 border border-primary/20 flex items-center justify-center">
                      <Icon className="h-7 w-7 text-primary" strokeWidth={1.4} />
                    </div>
                    <span className="font-serif text-4xl text-[#b4924a]/70">0{i + 1}</span>
                  </div>
                  <h3 className="text-xl font-serif font-medium text-foreground mb-3 group-hover:text-primary transition-colors">{client.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{client.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PRACTICE AREAS ── */}
      <section className="order-11 py-24 lg:py-32 bg-background relative overflow-hidden" aria-labelledby="practice-areas-heading">
        <div className="counselo-orbit counselo-orbit-practice" aria-hidden="true" />
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative">
          <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-12 lg:gap-20">
            <motion.div {...fadeIn} className="lg:sticky lg:top-32 lg:self-start">
              <p className="text-[#9a7735] font-semibold uppercase tracking-[0.18em] text-xs mb-3">{h.practiceAreas.eyebrow}</p>
              <h2 id="practice-areas-heading" className="text-4xl md:text-5xl font-serif font-medium text-foreground mb-5 leading-tight">{h.practiceAreas.heading}</h2>
              <div className="counselo-gold-rule mb-7" />
              <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">{h.practiceAreas.subheading}</p>
              <Link href={`${regionPrefix}/services`} className="inline-flex items-center gap-3 text-primary font-semibold mt-8 group">
                {h.practiceAreas.viewAllBtn}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
              </Link>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-5">
              {h.practiceAreas.areas.map((area, i) => {
                const Icon = serviceCardIcons[i % serviceCardIcons.length];
                return (
                <motion.div key={i} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.06 }}>
                  <Link
                    href={regionPrefix + area.path}
                    className="group flex h-full min-h-56 flex-col border border-primary/15 bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#b4924a] hover:shadow-[0_18px_45px_rgba(0,61,34,0.09)]"
                  >
                    <div className="mb-7 flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center border border-primary/20 bg-[#eef4f0] text-primary">
                        <Icon className="h-6 w-6" strokeWidth={1.4} />
                      </span>
                      <span className="font-serif text-2xl text-[#b4924a]">0{i + 1}</span>
                    </div>
                    <h3 className="mb-3 text-xl font-serif font-medium text-foreground group-hover:text-primary transition-colors">{area.title}</h3>
                    <p className="mb-7 text-muted-foreground text-sm leading-relaxed">{area.desc}</p>
                    <ArrowRight className="mt-auto h-5 w-5 text-primary transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                  </Link>
                </motion.div>
              )})}
            </div>
          </div>
        </div>
      </section>

      <div className="order-12"><LatestContentCarousels isArabic={isRTL} region={region} /></div>

      {/* UAE testimonials are withheld until region-specific reviews are verified. */}
      {region !== "uae" && <section
        className="order-13 py-24 lg:py-32 bg-white border-y border-border relative overflow-hidden"
        onMouseEnter={() => setIsTestimonialPaused(true)}
        onMouseLeave={() => setIsTestimonialPaused(false)}
        onFocusCapture={() => setIsTestimonialPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setIsTestimonialPaused(false);
          }
        }}
      >
        <div className="counselo-orbit counselo-orbit-testimonial" aria-hidden="true" />
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24">
            <motion.div {...fadeIn}>
              <p className="text-[#9a7735] font-semibold uppercase tracking-[0.18em] text-xs mb-3">{h.testimonials.eyebrow}</p>
              <h2 className="text-4xl md:text-5xl font-serif font-medium text-foreground mb-10">{h.testimonials.heading}</h2>
              <Quote className="h-12 w-12 text-[#b4924a] mb-7" strokeWidth={1.2} />
              <div className="flex mb-6">
                {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 text-[#b4924a] fill-[#b4924a]" />)}
              </div>
              <motion.blockquote
                key={activeTestimonial}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-2xl md:text-3xl font-serif text-foreground leading-relaxed mb-8"
                aria-live="polite"
              >
                “{h.testimonials.items[activeTestimonial].quote}”
              </motion.blockquote>
              <div className="font-bold text-foreground">{h.testimonials.items[activeTestimonial].author}</div>
              <div className="text-sm text-primary mt-1">{h.testimonials.items[activeTestimonial].title}</div>
            </motion.div>

            <div className="self-end border-t border-border">
              {h.testimonials.items.map((testimonial, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-full grid grid-cols-[3rem_1fr_auto] gap-4 text-start items-center py-5 border-b border-border transition-colors ${
                    activeTestimonial === i ? "text-primary bg-white/55 px-4" : "text-muted-foreground hover:text-primary px-1"
                  }`}
                  aria-pressed={activeTestimonial === i}
                  aria-label={`${isRTL ? "عرض مراجعة" : "Show review from"} ${testimonial.author}`}
                >
                  <span className="font-serif text-2xl text-[#b4924a]">0{i + 1}</span>
                  <span>
                    <span className="block font-semibold text-foreground">{testimonial.author}</span>
                    <span className="block text-xs mt-1">{testimonial.title}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>}

      {/* ── CTA ── */}
      <section className="order-[14] py-20 lg:py-24 relative overflow-hidden bg-[#003d22]" aria-labelledby="regional-cta-heading">
        <img
          src="/images/optimized/counselo-gold-legal-line-art-v1.png"
          alt=""
          aria-hidden="true"
          width="1254"
          height="1254"
          loading="lazy"
          decoding="async"
          className="absolute w-[30rem] -end-32 -top-32 opacity-[0.13] pointer-events-none"
        />
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <motion.div {...fadeIn} className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-20 items-center">
            <div>
              <p className="text-[#d4af60] uppercase tracking-[0.18em] text-xs font-semibold mb-4">{h.cta.eyebrow}</p>
              <h2 id="regional-cta-heading" className="text-4xl md:text-5xl font-serif font-medium text-white mb-6 leading-tight">{h.cta.heading}</h2>
              <p className="text-lg text-white/70 mb-4 max-w-3xl leading-relaxed">{h.cta.desc}</p>
              <p className="text-white/45 text-sm">{h.cta.subDesc}</p>
            </div>
            <div className="lg:border-s border-white/20 lg:ps-12">
            <div className="flex flex-col gap-3 mb-7">
              {h.hero.channels.map((ch, i) => {
                const Icon = channelIcons[i];
                return (
                  <Link key={i} href={`${regionPrefix}/contact`}
                    className="group flex items-center justify-between gap-4 border-b border-white/20 text-white py-4 text-sm font-semibold hover:border-[#d4af60] transition-colors">
                    <span className="flex items-center gap-3"><Icon className="h-5 w-5 text-[#d4af60]" /> {ch.label}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                  </Link>
                );
              })}
            </div>
            <Link href={`${regionPrefix}/contact`}>
              <Button size="lg" className="group w-full text-base px-8 py-7 rounded-none bg-[#d4af60] text-[#003d22] hover:bg-[#e0c078] font-semibold">
                {h.cta.ctaBtn}
                <ArrowRight className="ms-3 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
              </Button>
            </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
