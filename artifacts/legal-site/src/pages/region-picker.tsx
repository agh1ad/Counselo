import { motion } from "framer-motion";
import { Link } from "wouter";
import { COUNSELO_ENTITY_IDS, COUNSELO_ORGANIZATION, COUNSELO_WEBSITE, getConsultationProduct, OMAR_AL_BAGHDADI } from "@workspace/api-zod";
import { Helmet } from "react-helmet-async";
import { Globe, Clock, Lock, ArrowRight, MessageCircle, CheckCircle2, Award, Mail, Phone } from "lucide-react";
import { LatestContentCarousels } from "@/components/content/latest-content-carousels";
import { useEffect } from "react";
import { COUNSELO_LEGAL_MATTERS_CLAIM, COUNSELO_LEGAL_MATTERS_STAT, COUNSELO_LEGAL_PRACTICE_CLAIM } from "@/lib/public-claims";

const counseloLogo = "/images/optimized/counselo-region-logo.png";
const counseloLogoWebp = "/images/optimized/counselo-region-logo-193.webp 193w, /images/optimized/counselo-region-logo-386.webp 386w";
const saudiFlag = "/images/optimized/saudi-arabia-flag.jpg";
const saudiFlagWebp = "/images/optimized/saudi-arabia-flag-72.webp 72w, /images/optimized/saudi-arabia-flag-144.webp 144w";
const syrianFlag = "/images/optimized/syria-flag.jpg";
const syrianFlagWebp = "/images/optimized/syria-flag-72.webp 72w, /images/optimized/syria-flag-144.webp 144w";
const uaeFlag = "/images/optimized/uae-flag.svg";
const comprehensiveConsultation = getConsultationProduct("comprehensive-consultation");

// ── Structured Data ───────────────────────────────────────────────────────────

const websiteSchema = {
  ...COUNSELO_WEBSITE,
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "CounselO",
  "alternateName": "كاونسلو",
  "url": "https://counselo-legal.com/",
  "description": "CounselO is a bilingual online legal platform for Saudi, Syrian and UAE matters, providing jurisdiction-scoped consultation, document review and structured guidance with a target response subject to scope, urgency and availability.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": { "@type": "EntryPoint", "urlTemplate": "https://counselo-legal.com/blog?q={search_term_string}" },
    "query-input": "required name=search_term_string",
  },
  "publisher": { "@id": COUNSELO_ENTITY_IDS.organization },
};

const organizationSchema = {
  ...COUNSELO_ORGANIZATION,
  "@context": "https://schema.org",
  "@type": "Organization",
  "url": "https://counselo-legal.com",
  "logo": "https://counselo-legal.com/logo.png",
  "image": "https://counselo-legal.com/og-image.png",
  "description": "CounselO is an online legal consultation platform founded by Lawyer and Legal Counsel Omar Al-Baghdadi. Information is handled under applicable professional-confidentiality, privacy and data-protection obligations.",
  "founder": {
    ...OMAR_AL_BAGHDADI,
    "jobTitle": "Lawyer and Legal Counsel",
    "description": `Lawyer Omar Al-Baghdadi has ${COUNSELO_LEGAL_PRACTICE_CLAIM.en} and has handled ${COUNSELO_LEGAL_MATTERS_CLAIM.en} across the region.`,
    "knowsAbout": ["Family Law", "Employment Law", "Real Estate Law", "Business Law", "Criminal Law", "Foreign Investment", "Administrative Law", "Saudi Law", "Syrian Law", "UAE Law"],
    "sameAs": ["https://www.linkedin.com/in/lawyeromarbaghdadi/"],
  },
  "areaServed": [
    { "@type": "Country", "name": "Saudi Arabia" },
    { "@type": "Country", "name": "Syria" },
    { "@type": "Country", "name": "United Arab Emirates" },
  ],
  "availableLanguage": ["Arabic", "English"],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+966594850247",
    "contactType": "customer service",
    "contactOption": "TollFree",
    "areaServed": ["SA", "SY", "AE"],
    "availableLanguage": ["Arabic", "English"],
  },
  "sameAs": ["https://www.linkedin.com/in/lawyeromarbaghdadi/"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Legal Services — Saudi Arabia, Syria & UAE",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Family Law", "url": "https://counselo-legal.com/sa/services/family-law" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Employment Law", "url": "https://counselo-legal.com/sa/services/employment-law" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Real Estate Law", "url": "https://counselo-legal.com/sa/services/real-estate" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Law", "url": "https://counselo-legal.com/sa/services/business-law" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Foreign Investment", "url": "https://counselo-legal.com/sa/services/foreign-investment" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Criminal Law", "url": "https://counselo-legal.com/sa/services/criminal-law" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Administrative Law", "url": "https://counselo-legal.com/sa/services/administrative-law" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Contracts", "url": "https://counselo-legal.com/sa/services/contracts" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "UAE Legal Services", "url": "https://counselo-legal.com/uae/services" } },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is CounselO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `CounselO is an online legal consultation platform founded by Lawyer and Legal Counsel Omar Al-Baghdadi with ${COUNSELO_LEGAL_PRACTICE_CLAIM.en}. We provide confidential legal guidance for individuals, families and businesses in Saudi Arabia, Syria and the UAE, in Arabic and English.`,
      },
    },
    {
      "@type": "Question",
      "name": "Which countries does CounselO serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CounselO provides jurisdiction-specific services for Saudi Arabia, Syria and the United Arab Emirates. Consultations are delivered online, subject to the applicable law, authority and professional scope in each country.",
      },
    },
    {
      "@type": "Question",
      "name": "How quickly will I receive a legal response?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CounselO targets a professional legal response within 24 hours of receiving a consultation request via WhatsApp or email, subject to the matter's scope and urgency.",
      },
    },
    {
      "@type": "Question",
      "name": "Are legal consultations on CounselO confidential?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Information is handled confidentially under applicable professional, privacy and data-protection obligations, subject to legally required or permitted disclosures.",
      },
    },
    {
      "@type": "Question",
      "name": "What languages are available on CounselO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CounselO provides legal consultations in Arabic and English. Service pages support both languages, while each blog article is published in its selected language.",
      },
    },
    {
      "@type": "Question",
      "name": "What areas of law does CounselO cover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CounselO covers a wide range of practice areas including: Family Law & Divorce, Employment & Labour Law, Real Estate & Property Law, Business & Commercial Law, Foreign Investment, Criminal Law, Administrative Law, Contracts, Banking & Finance, Intellectual Property, Tax & Zakat, Cyber Law, Medical Malpractice, Insurance Law, Arbitration & Mediation, and Companies Law.",
      },
    },
    {
      "@type": "Question",
      "name": "How do I start a legal consultation with CounselO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Starting is simple: (1) Choose Saudi Arabia, Syria or the UAE. (2) Browse the relevant service or contact us directly. (3) Send your legal question through the consultation form or WhatsApp. CounselO targets a response within 24 hours, subject to scope and urgency.",
      },
    },
    {
      "@type": "Question",
      "name": "Is CounselO suitable for businesses as well as individuals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. CounselO advises individuals and businesses through country-specific services for Saudi Arabia, Syria and the UAE, including contracts, company formation, investment, employment and disputes.",
      },
    },
  ],
};

// ── Data ─────────────────────────────────────────────────────────────────────

const FAQS = [
  { q: "What is CounselO?", a: `CounselO is an online legal consultation platform founded by Lawyer Omar Al-Baghdadi (${COUNSELO_LEGAL_PRACTICE_CLAIM.en} and ${COUNSELO_LEGAL_MATTERS_CLAIM.en} handled). We provide bilingual, jurisdiction-specific legal guidance for Saudi Arabia, Syria and the UAE.` },
  { q: "Which jurisdictions does CounselO cover?", a: "We provide country-specific services for Saudi Arabia, Syria and the United Arab Emirates. Each regional platform uses the legal concepts, authorities and procedures relevant to that jurisdiction." },
  { q: "How quickly do I get a response?", a: "CounselO targets a professional response within 24 hours, subject to the matter's scope, urgency, intake completeness and service availability." },
  { q: "Are consultations confidential?", a: "Information is handled confidentially under applicable professional, privacy and data-protection obligations, subject to legally required or permitted disclosures." },
  { q: "What languages does CounselO support?", a: "We provide legal consultations in both Arabic and English. All service pages and legal guides are fully bilingual." },
  { q: "How do I start a consultation?", a: "Choose Saudi Arabia, Syria or the UAE, then send your legal question through the consultation form or WhatsApp. CounselO targets a response within 24 hours, subject to scope and urgency." },
  { q: "Does CounselO advise businesses too?", a: "Yes. We serve both individuals and businesses — from company formation, commercial contracts, and foreign investment licensing to employment disputes and debt collection." },
  { q: "What areas of law does CounselO cover?", a: "Family law, divorce, custody, employment, real estate, business law, foreign investment, criminal law, administrative law, contracts, banking, IP, tax, cyber law, medical malpractice, insurance, arbitration, and more." },
];

const fadeIn = {
  initial: false as const,
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};


// ── Component ─────────────────────────────────────────────────────────────────

export default function RegionPicker() {
  useEffect(() => {
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
  }, []);

  return (
    <main className="w-full bg-background" id="main-content">
      <Helmet>
        <html lang="en" dir="ltr" />
        <title>CounselO | Online Legal Consultation — Saudi Arabia, Syria &amp; UAE</title>
        <meta name="description" content="CounselO provides bilingual online legal consultations, document review and structured legal guidance in Saudi Arabia, Syria and the UAE." />
        <meta name="keywords" content="online legal consultation Saudi Arabia, online legal consultation Syria, استشارة قانونية أونلاين السعودية, استشارة قانونية أونلاين سوريا, lawyer Saudi Arabia online, محامي سعودي أونلاين, محامي سوريا أونلاين, CounselO, Omar Al-Baghdadi, legal advice Middle East, مشورة قانونية الشرق الأوسط" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="CounselO — Lawyer and Legal Counsel Omar Al-Baghdadi" />
        <meta name="geo.region" content="MENA" />
        <meta name="geo.placename" content="Middle East" />
        <link rel="canonical" href="https://counselo-legal.com/" />
        <link rel="alternate" hrefLang="en" href="https://counselo-legal.com/" />
        <link rel="alternate" hrefLang="ar" href="https://counselo-legal.com/ar" />
        <link rel="alternate" hrefLang="en-SA" href="https://counselo-legal.com/sa" />
        <link rel="alternate" hrefLang="ar-SA" href="https://counselo-legal.com/sa/ar" />
        <link rel="alternate" hrefLang="en-SY" href="https://counselo-legal.com/syr" />
        <link rel="alternate" hrefLang="ar-SY" href="https://counselo-legal.com/syr/ar" />
        <link rel="alternate" hrefLang="en-AE" href="https://counselo-legal.com/uae" />
        <link rel="alternate" hrefLang="ar-AE" href="https://counselo-legal.com/uae/ar" />
        <link rel="alternate" hrefLang="x-default" href="https://counselo-legal.com/" />
        <meta property="og:title" content="CounselO | Online Legal Consultation — Saudi Arabia, Syria & UAE" />
        <meta property="og:description" content="Choose Saudi Arabia, Syria or the UAE for confidential, jurisdiction-specific legal guidance in Arabic or English." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="CounselO كاونسلو" />
        <meta property="og:url" content="https://counselo-legal.com/" />
        <meta property="og:image" content="https://counselo-legal.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="CounselO — Online Legal Consultation for Saudi Arabia, Syria and the UAE" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="ar_SA" />
        <meta property="og:locale:alternate" content="ar_SY" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@CounselOLegal" />
        <meta name="twitter:title" content="CounselO | Online Legal Consultation — Saudi Arabia, Syria & UAE" />
        <meta name="twitter:description" content="Jurisdiction-specific legal guidance for Saudi Arabia, Syria and the UAE in Arabic and English." />
        <meta name="twitter:image" content="https://counselo-legal.com/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* ── HERO ── */}
      <section className="region-picker-hero relative isolate min-h-[88svh] overflow-hidden bg-[#073d2b] px-4 pb-16 pt-10 text-white sm:px-6 lg:px-8 lg:pb-20 lg:pt-14" aria-label="Region selection">
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_42%,rgba(194,157,70,0.12),transparent_30%)]" />
        <picture className="contents">
          <source type="image/webp" srcSet="/images/optimized/counselo-platform-line-art-v1.webp" />
          <img
            src="/images/optimized/counselo-platform-line-art-v1.png"
            alt=""
            aria-hidden="true"
            width="1719"
            height="915"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="pointer-events-none absolute -end-32 top-4 -z-10 hidden h-[92%] w-auto max-w-none object-contain opacity-[0.13] lg:block"
          />
        </picture>

        <div className="relative mx-auto w-full max-w-[1380px]">
          <div className="mb-10 flex items-center justify-between border-b border-[#0d4a31]/15 bg-white px-4 pb-4 pt-3">
            <Link href="/sa" aria-label="CounselO Saudi Arabia">
              <picture className="contents">
                <source type="image/webp" srcSet={counseloLogoWebp} sizes="(min-width: 640px) 154px, 135px" />
                <img
                  src={counseloLogo}
                alt="CounselO — Online Legal Consultations for Saudi Arabia, Syria and the UAE"
                width="193"
                height="80"
                fetchPriority="high"
                decoding="async"
                  className="h-14 w-auto object-contain transition-opacity hover:opacity-80 sm:h-16"
                />
              </picture>
            </Link>
            <Link href="/ar" className="border-b border-[#b58b32] pb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#0d4a31] transition-colors hover:text-[#b58b32]">
              العربية
            </Link>
          </div>

          <div className="grid items-center gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
              <p aria-hidden="true" className="mb-6 text-xs font-bold uppercase tracking-[0.24em] text-[#aa7e28]">
                Jurisdiction-Scoped Legal Guidance · Saudi Arabia · Syria · UAE
              </p>
              <h1 className="font-serif text-[clamp(2.75rem,5.5vw,5.6rem)] font-semibold leading-[0.96] tracking-[-0.035em] text-white">
                Online Legal{" "}
                <br />
                <span className="font-normal italic text-[#d5ae5d]">Consultation.</span>
              </h1>
              <div className="my-8 flex items-center gap-3" aria-hidden="true">
                <span className="h-px w-20 bg-[#b58b32]" />
                <span className="h-2 w-2 rotate-45 border border-[#b58b32]" />
              </div>
              <p className="max-w-xl text-lg font-light leading-8 text-white/72 sm:text-xl">
                Jurisdiction-scoped online legal guidance in Arabic &amp; English —{" "}
                <strong className="font-semibold text-white">target response within 24 hours.</strong>
              </p>

              <div className="mt-10 grid max-w-xl gap-0 border-y border-white/20 sm:grid-cols-3">
                {["Professional Legal Confidentiality", "Target Response", "Arabic & English"].map((label, index) => (
                  <div key={label} className={`flex min-h-16 items-center py-4 text-[0.68rem] font-semibold uppercase leading-5 tracking-[0.14em] text-white/78 ${index > 0 ? "border-t border-white/20 sm:border-s sm:border-t-0 sm:ps-5" : ""}`}>
                    {label}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="lg:pt-14">
              <div className="mb-6 flex items-end justify-between gap-5">
                <div>
                  <p aria-hidden="true" className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-[#aa7e28]">Choose your jurisdiction</p>
                  <h2 className="font-serif text-3xl text-white sm:text-4xl">Where do you need counsel?</h2>
                </div>
                <span className="hidden text-xs uppercase tracking-[0.16em] text-white/50 sm:block">Select to enter</span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { href: "/sa", flag: saudiFlag, flagWebp: saudiFlagWebp, label: "Saudi Arabia", alt: "Saudi Arabia — Legal Consultation", number: "01", dark: true },
                  { href: "/syr", flag: syrianFlag, flagWebp: syrianFlagWebp, label: "Syria", alt: "Syria — Legal Consultation", number: "02", dark: false },
                  { href: "/uae", flag: uaeFlag, flagWebp: undefined, label: "United Arab Emirates", alt: "UAE — Legal Consultation", number: "03", dark: true },
                ].map(({ href, flag, flagWebp, label, alt, number, dark }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`group relative min-h-[310px] overflow-hidden border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-h-[390px] sm:p-8 ${
                      dark
                        ? "border-[#0d4a31] bg-[#0d4a31] text-white"
                        : "border-[#0d4a31]/25 bg-[#eef4f0]/85 text-[#0d4a31] backdrop-blur-sm hover:border-[#b58b32]"
                    }`}
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-[#b58b32] transition-all duration-300 group-hover:h-2" />
                    <div className="flex items-start justify-between">
                      <span aria-hidden="true" className={`font-serif text-5xl italic ${dark ? "text-white/15" : "text-[#0d4a31]/12"}`}>{number}</span>
                      <picture className="contents">
                        {flagWebp && <source type="image/webp" srcSet={flagWebp} sizes="66px" />}
                        <img src={flag} alt={alt} width="72" height="48" loading="eager" decoding="async" className="h-11 w-[66px] border border-white/25 object-cover shadow-md" />
                      </picture>
                    </div>
                    <div className="absolute inset-x-7 bottom-7 sm:inset-x-8 sm:bottom-8">
                      <p className={`mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] ${dark ? "text-[#d4b66c]" : "text-[#9b7426]"}`}>Online legal services in</p>
                      <h3 className="mb-7 font-serif text-3xl font-semibold sm:text-4xl">{label}</h3>
                      <span className={`flex items-center justify-between border-t pt-4 text-xs font-semibold uppercase tracking-[0.18em] ${dark ? "border-white/25 text-white/75" : "border-[#0d4a31]/20 text-[#0d4a31]/70"}`}>
                        Enter platform
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/58">
                <Link href="/sa/ar" className="transition-colors hover:text-[#aa7e28]">عربي — السعودية</Link>
                <span aria-hidden="true">·</span>
                <Link href="/syr/ar" className="transition-colors hover:text-[#aa7e28]">عربي — سوريا</Link>
                <span aria-hidden="true">·</span>
                <Link href="/uae/ar" className="transition-colors hover:text-[#aa7e28]">عربي — الإمارات</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ANSWER-FIRST PLATFORM SUMMARY ── */}
      <section className="border-b border-[#0d4a31]/10 bg-white py-20 lg:py-24" aria-labelledby="platform-heading">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p aria-hidden="true" className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#aa7e28]">The CounselO platform</p>
              <h2 id="platform-heading" className="font-serif text-4xl font-semibold leading-tight text-[#0d4a31] sm:text-5xl">One online starting point for legal help</h2>
            </div>
            <div className="space-y-5 text-base leading-8 text-muted-foreground sm:text-lg">
              <p><strong className="text-foreground">CounselO is a bilingual online legal platform for individuals, families and businesses seeking professional legal consultation, document review and structured guidance.</strong> Choose the jurisdiction first, describe the matter in Arabic or English, and receive a scoped next step based on the applicable law and authority.</p>
              <p>Services are available online across Saudi Arabia, Syria and the United Arab Emirates. A professional response is targeted within 24 hours, subject to scope, urgency, intake completeness and service availability.</p>
              <dl className="grid gap-3 pt-3 sm:grid-cols-2" aria-label="Platform scope">
                {[
                  ["What we do", "Consultation, preliminary analysis, document review and written guidance"],
                  ["Where", "Saudi Arabia · Syria · UAE"],
                  ["Languages", "Arabic and English"],
                  ["Court representation", "If requested or necessary, arranged separately through licensed partner professionals or cooperating offices in the relevant jurisdiction"],
                ].map(([label, value]) => <div key={label} className="border-s-2 border-[#b58b32] bg-[#eef4f0] px-4 py-3"><dt><span className="sr-only">{label}</span><span aria-hidden="true" className="text-xs font-bold uppercase tracking-[0.14em] text-[#0d4a31]/65">{label}</span></dt><dd className="mt-1 text-sm leading-6 text-foreground">{value}</dd></div>)}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {comprehensiveConsultation && (
        <section className="border-b border-[#0d4a31]/10 bg-[#eef4f0] py-20 lg:py-24" aria-labelledby="consultation-package-heading">
          <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              <div>
                <p aria-hidden="true" className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#aa7e28]">Consultation package</p>
                <h2 id="consultation-package-heading" className="font-serif text-4xl font-semibold leading-tight text-[#0d4a31] sm:text-5xl">Comprehensive online legal consultation</h2>
                <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">{comprehensiveConsultation.summaryEn}</p>
              </div>
              <div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {comprehensiveConsultation.includesEn.map((item) => <li key={item} className="flex items-start gap-3 border-s-2 border-[#b58b32] bg-white px-4 py-3 text-sm leading-6 text-foreground"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" /><span>{item}</span></li>)}
                </ul>
                <p className="mt-5 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Scope:</strong> Follow-up monitoring is included only when agreed. Court representation, filing and other reserved work are separate and can be arranged through an appropriately licensed partner professional or cooperating office when requested or necessary.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── STATS BAR ── */}
      <section aria-label="Key credentials of CounselO" className="border-y border-white/10 bg-[#073d29] py-11 text-white">
        <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { stat: "30+",     label: "Years of Legal Practice" },
              { stat: COUNSELO_LEGAL_MATTERS_STAT.en, label: "Legal Matters & Consultations" },
              { stat: "24 h",    label: "Target Response" },
              { stat: "3",       label: "Jurisdictions" },
            ].map(({ stat, label }, i, arr) => (
              <motion.div key={stat} {...fadeIn} className={`px-4 py-3 text-center ${i < arr.length - 1 ? "border-e border-white/15" : ""}`}>
                <div className="mb-2 text-center font-serif text-3xl font-semibold leading-tight text-[#d4b66c] md:text-4xl">{stat}</div>
                <div className="text-center text-[0.65rem] font-medium uppercase tracking-[0.16em] text-white/65">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / FOUNDER ── */}
      <section className="bg-[#eef4f0] py-24 lg:py-32" aria-labelledby="about-heading">
        <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-14 lg:grid-cols-5 lg:gap-24">

            {/* Founder card */}
            <motion.div {...fadeIn} className="lg:col-span-2">
              <div className="relative mb-6 overflow-hidden border-t-4 border-[#b58b32] bg-[#0d4a31] p-8 text-white shadow-[0_24px_70px_rgba(13,74,49,0.14)] lg:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
                    <Award className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <div className="font-serif font-bold text-lg">Lawyer &amp; Legal Counsel</div>
                    <div className="text-white/70 text-sm mb-2">Omar Al-Baghdadi</div>
                    <a
                      href="https://www.linkedin.com/in/lawyeromarbaghdadi/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-xs transition-colors border border-white/25 hover:border-white/50 px-2 py-1"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      LinkedIn
                    </a>
                  </div>
                </div>
                <div className="border-t border-white/20 pt-6">
                  <p className="text-white/80 text-xs font-semibold uppercase tracking-wider mb-4">Credentials &amp; Achievements</p>
                  <ul className="space-y-3">
                    {[
                      "Graduate, Faculty of Law — Damascus University (1996)",
                      "Regional legal leadership; local representation separately scoped",
                      "Holder of the title \"Ustaz\" (Senior Counsel) — Syrian Bar Association",
                      "Senior legal experience across Saudi Arabia, Syria and the UAE",
                      `${COUNSELO_LEGAL_MATTERS_CLAIM.en} across civil, commercial, administrative, arbitration and criminal law`,
                      "Trained or supervised more than 40 lawyers",
                      "Son of Lawyer Riyad Al-Baghdadi, founder of Al-Baghdadi Law Firm (est. 1957)",
                      "Expert in cross-border disputes and multi-jurisdictional matters",
                    ].map((c, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-4 w-4 text-white/60 shrink-0 mt-0.5" />
                        <span className="text-white/80 text-sm leading-relaxed">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* About text */}
            <motion.div initial={false} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-3">
              <p aria-hidden="true" className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#aa7e28]">About CounselO</p>
              <h2 id="about-heading" className="mb-6 font-serif text-4xl font-semibold leading-tight text-[#0d4a31] sm:text-5xl lg:text-6xl">
                Professional Legal Counsel,<br />Delivered Online
              </h2>
              <div className="mb-8 flex items-center gap-3"><span className="h-px w-20 bg-[#b58b32]" /><span className="h-2 w-2 rotate-45 border border-[#b58b32]" /></div>
              <p className="text-muted-foreground leading-relaxed mb-5">
                <strong className="text-foreground">CounselO</strong> is an online legal consultation platform founded and led by{" "}
                <strong className="text-foreground">Lawyer and Legal Counsel Omar Al-Baghdadi</strong>, with over{" "}
                <strong className="text-foreground">{COUNSELO_LEGAL_PRACTICE_CLAIM.en}</strong> and{" "}
                <strong className="text-foreground">20,000+ legal matters and consultations</strong> handled across the region.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We make professional legal advice accessible to everyone — individuals, families, and businesses — without the need for an office visit. Consultations are conducted via WhatsApp or email, in{" "}
                <strong className="text-foreground">Arabic or English</strong>, with a target response{" "}
                <strong className="text-foreground">within 24 hours</strong>.
              </p>
              <div className="mt-10 grid border-y border-[#0d4a31]/20 sm:grid-cols-3">
                {[
                  { Icon: Lock,        title: "Professional Confidentiality",  body: "Information is handled under applicable professional, privacy and data-protection obligations, with legal exceptions explained in the privacy policy." },
                  { Icon: Clock,       title: "Target Response Within 24 Hours",    body: "CounselO targets a professional response within 24 hours, subject to scope, urgency, intake completeness and service availability." },
                  { Icon: Globe,       title: "Online — No Office",  body: "Consult from anywhere via WhatsApp or email. No travel, no waiting room." },
                ].map(({ Icon, title, body }) => (
                  <div key={title} className="border-b border-[#0d4a31]/20 p-5 last:border-b-0 sm:border-b-0 sm:border-e sm:last:border-e-0">
                    <Icon className="mb-4 h-6 w-6 text-[#aa7e28]" strokeWidth={1.5} />
                    <div className="mb-2 font-serif text-base font-semibold text-[#0d4a31]">{title}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── JURISDICTIONS ── */}
      <section className="border-y border-[#0d4a31]/10 bg-white py-24 lg:py-32" aria-labelledby="jurisdictions-heading">
        <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="mb-16 max-w-3xl">
            <p aria-hidden="true" className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#aa7e28]">Choose your jurisdiction</p>
            <h2 id="jurisdictions-heading" className="mb-4 font-serif text-5xl font-semibold text-[#0d4a31] sm:text-6xl">Three legal environments, one starting point</h2>
            <div className="mb-6 flex items-center gap-3"><span className="h-px w-20 bg-[#b58b32]" /><span className="h-2 w-2 rotate-45 border border-[#b58b32]" /></div>
            <p className="text-muted-foreground">Start with the country whose law and authorities apply. Each regional hub contains its own service catalogue, legal sources, consultation route and bilingual content.</p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              { href: "/sa", name: "Saudi Arabia", native: "المملكة العربية السعودية", icon: "🇸🇦", body: "Saudi-specific legal guidance across family, commercial, employment, property, investment and dispute matters." },
              { href: "/syr", name: "Syria", native: "سوريا", icon: "🇸🇾", body: "Syrian-law consultation, document review and structured guidance for individuals, families and businesses." },
              { href: "/uae", name: "United Arab Emirates", native: "الإمارات العربية المتحدة", icon: "🇦🇪", body: "UAE federal, emirate-level, mainland and free-zone legal guidance through the relevant regional framework." },
            ].map(({ href, name, native, icon, body }) => (
              <Link key={href} href={href} className="group flex min-h-64 flex-col border border-[#0d4a31]/15 bg-[#f8faf8] p-7 transition-all hover:-translate-y-1 hover:border-[#b58b32] hover:bg-[#eef4f0] hover:shadow-[0_18px_45px_rgba(0,61,34,0.09)]">
                <div className="mb-7 flex items-start justify-between"><span className="text-4xl" aria-hidden="true">{icon}</span><Globe className="h-6 w-6 text-[#aa7e28]" strokeWidth={1.4} /></div>
                <h3 className="font-serif text-2xl font-semibold text-[#0d4a31] group-hover:text-primary">{name}</h3>
                <p className="mt-1 text-sm font-medium text-[#9b7426]">{native}</p>
                <p className="mt-5 text-sm leading-7 text-muted-foreground">{body}</p>
                <span className="mt-auto flex items-center gap-2 pt-7 text-sm font-semibold text-primary">Open regional hub <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="relative overflow-hidden bg-[#073d29] py-24 text-white lg:py-32" aria-labelledby="how-heading">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px),linear-gradient(90deg,rgba(255,255,255,.3) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
        <div className="relative mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="mb-16 max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#d4b66c]">Simple Process</p>
            <h2 id="how-heading" className="mb-4 font-serif text-5xl font-semibold text-white sm:text-6xl">How It Works</h2>
            <div className="mb-6 flex items-center gap-3"><span className="h-px w-20 bg-[#d4b66c]" /><span className="h-2 w-2 rotate-45 border border-[#d4b66c]" /></div>
            <p className="text-white/60">Four steps to expert legal advice</p>
          </motion.div>

          <div className="relative mb-12 grid md:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Choose Your Jurisdiction", body: "Select Saudi Arabia, Syria or the UAE. Each country has legal services and content tailored to its applicable law and authorities." },
              { step: "02", title: "Describe Your Legal Matter", body: "Send your legal question via WhatsApp or the contact form — in Arabic or English. Include any relevant documents if needed." },
              { step: "03", title: "Confirm scope and fee",  body: "After the initial study, CounselO confirms the appropriate consultation product, scope, fee and next step. No fixed price is promised before the matter is understood." },
              { step: "04", title: "Receive structured guidance",     body: "A qualified CounselO professional reviews the matter and responds through the agreed channel, with a target response within 24 hours subject to scope and urgency." },
            ].map(({ step, title, body }, i) => (
              <motion.div key={step} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative border-b border-white/15 p-8 transition-colors hover:bg-white/[0.04] md:border-e lg:border-b-0">
                <div className="absolute end-6 top-4 select-none font-serif text-6xl font-bold leading-none text-white/[0.06]">{step}</div>
                <div className="mb-5 font-mono text-sm font-bold text-[#d4b66c]">{step}</div>
                <h3 className="mb-3 font-serif text-xl font-semibold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{body}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-4 flex-wrap">
            <a href="https://wa.me/966594850247" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#0d4a31] text-white font-semibold px-7 py-3 text-sm hover:bg-[#073d2b] transition-colors">
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
            <Link href="/sa/contact" className="inline-flex items-center gap-2 border border-white/30 px-7 py-3 text-sm font-semibold text-white transition-all hover:border-[#d4b66c] hover:text-[#d4b66c]">
              Contact Form <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-white/70">
            <a href="tel:+966594850247" className="inline-flex items-center gap-2 hover:text-[#d4b66c]">
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span dir="ltr">+966 59 485 0247</span>
            </a>
            <a href="mailto:info@counselo-legal.com" className="inline-flex items-center gap-2 hover:text-[#d4b66c]">
              <Mail className="h-4 w-4" aria-hidden="true" />
              info@counselo-legal.com
            </a>
          </div>
        </div>
      </section>

      <LatestContentCarousels isArabic={false} />

      {/* ── FAQ ── */}
      <section className="bg-[#eef4f0] py-24 lg:py-32" aria-labelledby="faq-heading">
        <div className="mx-auto grid max-w-[1380px] gap-14 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24 lg:px-8">
          <motion.div {...fadeIn} className="lg:sticky lg:top-24 lg:self-start">
            <p aria-hidden="true" className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#aa7e28]">Support</p>
            <h2 id="faq-heading" className="mb-6 font-serif text-5xl font-semibold leading-tight text-[#0d4a31]">Frequently Asked Questions</h2>
            <div className="flex items-center gap-3"><span className="h-px w-20 bg-[#b58b32]" /><span className="h-2 w-2 rotate-45 border border-[#b58b32]" /></div>
          </motion.div>
          <div className="border-t border-[#0d4a31]/20">
            {FAQS.map(({ q, a }, i) => (
              <motion.div key={q} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                className="border-b border-[#0d4a31]/20 py-7">
                <h3 className="mb-3 font-serif text-lg font-semibold text-[#0d4a31]">{q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-[#0d4a31] py-24 lg:py-32" aria-label="Final call to action">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeIn}>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#d4b66c]">Get Started</p>
            <h2 className="mb-5 font-serif text-5xl font-semibold leading-tight text-white sm:text-6xl">Ready to Get Expert Legal Advice?</h2>
            <div className="mx-auto mb-8 flex w-fit items-center gap-3"><span className="h-px w-20 bg-[#d4b66c]" /><span className="h-2 w-2 rotate-45 border border-[#d4b66c]" /></div>
            <p className="text-white/70 text-lg leading-relaxed mb-10">
              Choose your jurisdiction to access specialist legal services, free guides, and consultation booking.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="/sa" className="inline-flex items-center gap-2 bg-white text-primary font-bold px-10 py-3.5 text-sm hover:bg-white/90 transition-colors">
                Saudi Arabia <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/syr" className="inline-flex items-center gap-2 border border-white/30 text-white font-bold px-10 py-3.5 text-sm hover:bg-white/10 transition-colors">
                Syria <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/uae" className="inline-flex items-center gap-2 border border-white/30 text-white font-bold px-10 py-3.5 text-sm hover:bg-white/10 transition-colors">
                United Arab Emirates <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER NAV ── */}
      <section className="border-t border-white/10 bg-[#062d20] py-16 text-white [&_.text-foreground]:text-white [&_.text-muted-foreground]:text-white/55 [&_a:hover]:text-[#d4b66c]">
        <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
          <nav aria-label="Site-wide navigation links">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm text-muted-foreground mb-12">
              <div>
                <div className="font-semibold text-foreground mb-4">Saudi Arabia</div>
                <ul className="space-y-2.5">
                  <li><Link href="/sa" className="hover:text-primary transition-colors">Home — SA</Link></li>
                  <li><Link href="/sa/services" className="hover:text-primary transition-colors">All Services</Link></li>
                  <li><Link href="/blog" className="hover:text-primary transition-colors">Legal Blog</Link></li>
                  <li><Link href="/sa/about" className="hover:text-primary transition-colors">About Us</Link></li>
                  <li><Link href="/sa/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                  <li><Link href="/sa/ar" className="hover:text-primary transition-colors">عربي</Link></li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-foreground mb-4">Syria</div>
                <ul className="space-y-2.5">
                  <li><Link href="/syr" className="hover:text-primary transition-colors">Home — Syria</Link></li>
                  <li><Link href="/syr/services" className="hover:text-primary transition-colors">All Services</Link></li>
                  <li><Link href="/blog" className="hover:text-primary transition-colors">Legal Blog</Link></li>
                  <li><Link href="/syr/about" className="hover:text-primary transition-colors">About Us</Link></li>
                  <li><Link href="/syr/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                  <li><Link href="/syr/ar" className="hover:text-primary transition-colors">عربي</Link></li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-foreground mb-4">United Arab Emirates</div>
                <ul className="space-y-2.5">
                  <li><Link href="/uae" className="hover:text-primary transition-colors">Home — UAE</Link></li>
                  <li><Link href="/uae/services" className="hover:text-primary transition-colors">All Services</Link></li>
                  <li><Link href="/blog" className="hover:text-primary transition-colors">Legal Blog</Link></li>
                  <li><Link href="/uae/about" className="hover:text-primary transition-colors">About Us</Link></li>
                  <li><Link href="/uae/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                  <li><Link href="/uae/ar" className="hover:text-primary transition-colors">عربي</Link></li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-foreground mb-4">Resources</div>
                <ul className="space-y-2.5">
                  <li><Link href="/blog" className="hover:text-primary transition-colors">Knowledge centre</Link></li>
                  <li><Link href="/our-work" className="hover:text-primary transition-colors">Case studies and work</Link></li>
                  <li><Link href="/sa/about" className="hover:text-primary transition-colors">About CounselO</Link></li>
                  <li><Link href="/sa/contact" className="hover:text-primary transition-colors">Start a consultation</Link></li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <span>© 2026 CounselO. All rights reserved.</span>
            <div className="flex gap-4">
              <Link href="/sa/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <span>·</span>
              <Link href="/sa/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
              <span>·</span>
              <a href="https://www.linkedin.com/in/lawyeromarbaghdadi/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
