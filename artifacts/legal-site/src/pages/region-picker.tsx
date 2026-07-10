import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import counseloLogo from "@assets/Screen_Shot_2026-07-01_at_12.26.11_AM_1782851175169.png";
import saudiFlag from "@assets/image_1782789705620.jpeg";
import syrianFlag from "@assets/360_F_1136337946_c5gr8LMbgzdkl80hVpy8xRXYYQBTlp5x_1782856203372.jpg";

// ── Structured Data ───────────────────────────────────────────────────────────

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "CounselO",
  "alternateName": "كاونسلو",
  "url": "https://counselo-legal.com/",
  "description": "Online legal consultation platform serving Saudi Arabia and Syria — professional Arabic & English legal advice within 24 hours via WhatsApp or email.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": { "@type": "EntryPoint", "urlTemplate": "https://counselo-legal.com/sa/blog?q={search_term_string}" },
    "query-input": "required name=search_term_string",
  },
  "publisher": { "@type": "Organization", "name": "CounselO", "url": "https://counselo-legal.com" },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "CounselO",
  "alternateName": "كاونسلو",
  "url": "https://counselo-legal.com",
  "logo": "https://counselo-legal.com/logo.png",
  "image": "https://counselo-legal.com/og-image.png",
  "description": "CounselO is an online legal consultation platform founded by Lawyer and Legal Counsel Omar Al-Baghdadi. We provide confidential, expert legal advice for individuals, families, and businesses in Saudi Arabia and Syria — in Arabic and English — within 24 hours via WhatsApp or email.",
  "founder": {
    "@type": "Person",
    "name": "Omar Al-Baghdadi",
    "jobTitle": "Lawyer and Legal Counsel",
    "description": "Lawyer Omar Al-Baghdadi has 30+ years of legal experience and has handled more than 20,000 cases across Saudi Arabia and Syria.",
    "knowsAbout": ["Family Law", "Employment Law", "Real Estate Law", "Business Law", "Criminal Law", "Foreign Investment", "Administrative Law", "Saudi Law", "Syrian Law"],
    "worksFor": { "@type": "Organization", "name": "CounselO" },
    "sameAs": ["https://www.linkedin.com/in/lawyeromarbaghdadi/"],
  },
  "areaServed": [
    { "@type": "Country", "name": "Saudi Arabia" },
    { "@type": "Country", "name": "Syria" },
  ],
  "availableLanguage": ["Arabic", "English"],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+966592850247",
    "contactType": "customer service",
    "contactOption": "TollFree",
    "areaServed": ["SA", "SY"],
    "availableLanguage": ["Arabic", "English"],
  },
  "sameAs": ["https://www.linkedin.com/in/lawyeromarbaghdadi/"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Legal Services — Saudi Arabia & Syria",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Family Law", "url": "https://counselo-legal.com/sa/services/family-law" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Employment Law", "url": "https://counselo-legal.com/sa/services/employment-law" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Real Estate Law", "url": "https://counselo-legal.com/sa/services/real-estate" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Law", "url": "https://counselo-legal.com/sa/services/business-law" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Foreign Investment", "url": "https://counselo-legal.com/sa/services/foreign-investment" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Criminal Law", "url": "https://counselo-legal.com/sa/services/criminal-law" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Administrative Law", "url": "https://counselo-legal.com/sa/services/administrative-law" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Contracts", "url": "https://counselo-legal.com/sa/services/contracts" } },
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
        "text": "CounselO is an online legal consultation platform founded by Lawyer and Legal Counsel Omar Al-Baghdadi with 30+ years of experience. We provide expert, confidential legal advice for individuals, families, and businesses in Saudi Arabia and Syria — in both Arabic and English — within 24 hours via WhatsApp or email.",
      },
    },
    {
      "@type": "Question",
      "name": "Which countries does CounselO serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CounselO serves clients in Saudi Arabia (under Saudi law including Vision 2030 reforms) and Syria (under Syrian civil and commercial law). Consultations are delivered online so clients anywhere in the world can consult about legal matters in either jurisdiction.",
      },
    },
    {
      "@type": "Question",
      "name": "How quickly will I receive a legal response?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CounselO guarantees a professional legal response within 24 hours of submitting your consultation request via WhatsApp or email. Urgent matters are prioritised.",
      },
    },
    {
      "@type": "Question",
      "name": "Are legal consultations on CounselO confidential?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. All consultations are strictly confidential. CounselO follows professional legal ethics and attorney-client privilege principles. Your personal and legal information is never shared with third parties.",
      },
    },
    {
      "@type": "Question",
      "name": "What languages are available on CounselO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CounselO provides legal consultations in both Arabic and English. All service pages, blog articles, and legal guides are available in both languages.",
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
        "text": "Starting is simple: (1) Choose your region — Saudi Arabia or Syria. (2) Browse the relevant service or contact us directly. (3) Send your legal question via WhatsApp (+966 59 285 0247) or the contact form. You will receive a confidential, expert legal response within 24 hours.",
      },
    },
    {
      "@type": "Question",
      "name": "Is CounselO suitable for businesses as well as individuals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. CounselO advises both individuals and businesses. For businesses, we handle commercial contracts, company formation, foreign investment licensing, employment compliance, dispute resolution, and more — in Saudi Arabia and Syria.",
      },
    },
  ],
};

// ── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  { slug: "family-law",            en: "Family Law",                    icon: "⚖" },
  { slug: "employment-law",        en: "Employment Law",                icon: "📋" },
  { slug: "real-estate",           en: "Real Estate Law",               icon: "🏛" },
  { slug: "business-law",          en: "Business Law",                  icon: "💼" },
  { slug: "foreign-investment",    en: "Foreign Investment",            icon: "🌐" },
  { slug: "criminal-law",          en: "Criminal Law",                  icon: "🔏" },
  { slug: "administrative-law",    en: "Administrative Law",            icon: "📜" },
  { slug: "contracts",             en: "Contracts",                     icon: "✍" },
  { slug: "arbitration",           en: "Arbitration & Mediation",       icon: "🤝" },
  { slug: "companies-law",         en: "Companies Law",                 icon: "🏢" },
  { slug: "banking-finance",       en: "Banking & Finance",             icon: "🏦" },
  { slug: "intellectual-property", en: "Intellectual Property",         icon: "💡" },
  { slug: "tax-zakat",             en: "Tax & Zakat",                   icon: "📊" },
  { slug: "cyber-law",             en: "Cyber & IT Law",                icon: "🛡" },
  { slug: "medical-malpractice",   en: "Medical Malpractice",           icon: "⚕" },
  { slug: "insurance-law",         en: "Insurance Law",                 icon: "📑" },
  { slug: "enforcement",           en: "Enforcement & Debt Collection", icon: "⚡" },
];

const BLOG_POSTS = [
  { slug: "divorce-in-saudi-arabia",                   syrSlug: "divorce-in-syria",                        en: "Divorce in Saudi Arabia — Rights & Legal Process" },
  { slug: "child-custody-saudi-arabia",                syrSlug: "child-custody-syria",                     en: "Child Custody in Saudi Arabia" },
  { slug: "wrongful-termination-saudi-labor-law",      syrSlug: "wrongful-termination-syrian-labor-law",   en: "Wrongful Termination under Saudi Labor Law" },
  { slug: "foreign-company-registration-saudi-arabia", syrSlug: "foreign-company-registration-syria",      en: "Foreign Company Registration in Saudi Arabia 2026" },
  { slug: "real-estate-disputes-saudi-arabia",         syrSlug: "real-estate-disputes-syria",              en: "Real Estate Disputes in Saudi Arabia" },
  { slug: "board-of-grievances-saudi-arabia",          syrSlug: "administrative-court-disputes-syria",     en: "Board of Grievances — Administrative Courts" },
];

const FAQS = [
  { q: "What is CounselO?", a: "CounselO is an online legal consultation platform founded by Lawyer Omar Al-Baghdadi (30+ years experience, 20,000+ cases). We provide expert legal advice for Saudi Arabia and Syria — in Arabic and English — within 24 hours via WhatsApp or email." },
  { q: "Which jurisdictions does CounselO cover?", a: "We cover Saudi Arabian law (including Vision 2030 reforms, Saudi Labor Law, MISA regulations) and Syrian law (Syrian Civil Code, Syrian Labor Law, commercial and family law). Consultations are delivered online — no office visit required." },
  { q: "How quickly do I get a response?", a: "You receive a professional legal response within 24 hours of submitting your query. Urgent matters are handled as a priority." },
  { q: "Are consultations confidential?", a: "Yes. All consultations are strictly confidential under attorney-client privilege. Your information is never shared with third parties." },
  { q: "What languages does CounselO support?", a: "We provide legal consultations in both Arabic and English. All service pages and legal guides are fully bilingual." },
  { q: "How do I start a consultation?", a: "Choose your region (Saudi Arabia or Syria), then send your legal question via WhatsApp or the contact form. You'll receive a detailed, expert legal response within 24 hours." },
  { q: "Does CounselO advise businesses too?", a: "Yes. We serve both individuals and businesses — from company formation, commercial contracts, and foreign investment licensing to employment disputes and debt collection." },
  { q: "What areas of law does CounselO cover?", a: "Family law, divorce, custody, employment, real estate, business law, foreign investment, criminal law, administrative law, contracts, banking, IP, tax, cyber law, medical malpractice, insurance, arbitration, and more." },
];

// ── Accent colour token ───────────────────────────────────────────────────────
// Gold: #C9A84C  |  Muted gold: #a88a3a  |  Dark bg: #0f1e14  |  Card bg: #1a3020

// ── Component ─────────────────────────────────────────────────────────────────

export default function RegionPicker() {
  return (
    <div className="min-h-screen text-white" style={{ background: "#0f1e14" }}>
      <Helmet>
        <html lang="en" dir="ltr" />
        <title>CounselO | Online Legal Consultation — Saudi Arabia &amp; Syria</title>
        <meta name="description" content="Get confidential online legal consultation for Saudi Arabia or Syria. Expert lawyer-led answers in Arabic & English within 24 hours. Family law, employment, real estate, business, criminal law & more." />
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
        <link rel="alternate" hrefLang="x-default" href="https://counselo-legal.com/" />
        <meta property="og:title" content="CounselO | Online Legal Consultation — Saudi Arabia & Syria" />
        <meta property="og:description" content="Get confidential online legal consultation for Saudi Arabia or Syria. Expert lawyer-led answers in Arabic & English within 24 hours." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="CounselO كاونسلو" />
        <meta property="og:url" content="https://counselo-legal.com/" />
        <meta property="og:image" content="https://counselo-legal.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="CounselO — Online Legal Consultation for Saudi Arabia and Syria" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="ar_SA" />
        <meta property="og:locale:alternate" content="ar_SY" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@CounselOLegal" />
        <meta name="twitter:title" content="CounselO | Online Legal Consultation — Saudi Arabia & Syria" />
        <meta name="twitter:description" content="Expert legal advice for Saudi Arabia & Syria in Arabic & English. Response within 24 hours." />
        <meta name="twitter:image" content="https://counselo-legal.com/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* ── Top accent bar ────────────────────────────────────────────────── */}
      <div style={{ height: "3px", background: "linear-gradient(90deg, #C9A84C 0%, #e8c96a 50%, #C9A84C 100%)" }} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center px-4 pt-16 pb-20 text-center overflow-hidden"
        aria-label="Region selection"
      >
        {/* subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 70%)" }}
        />

        <Link href="/sa">
          <img
            src={counseloLogo}
            alt="CounselO — Online Legal Consultations for Saudi Arabia and Syria"
            className="relative h-20 w-auto object-contain mb-8 hover:opacity-90 transition-opacity"
          />
        </Link>

        {/* credential badge */}
        <div
          className="relative inline-flex items-center gap-2 mb-6 px-4 py-1.5 text-xs tracking-widest uppercase"
          style={{ border: "1px solid rgba(201,168,76,0.35)", color: "#C9A84C", letterSpacing: "0.12em" }}
        >
          <span style={{ width: "20px", height: "1px", background: "#C9A84C", display: "inline-block" }} />
          Licensed Legal Counsel · Saudi Arabia &amp; Syria
          <span style={{ width: "20px", height: "1px", background: "#C9A84C", display: "inline-block" }} />
        </div>

        <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-5 leading-tight max-w-3xl">
          Online Legal Consultation
          <br />
          <span style={{ color: "#C9A84C" }}>Saudi Arabia &amp; Syria</span>
        </h1>

        <p className="relative text-white/60 text-lg mb-10 max-w-lg leading-relaxed">
          Expert, confidential legal advice in Arabic &amp; English —<br className="hidden md:block" /> guaranteed response within 24 hours.
        </p>

        {/* trust badges row */}
        <div className="relative flex flex-wrap justify-center gap-4 mb-10">
          {[
            { icon: "🔒", label: "Attorney-Client Privilege" },
            { icon: "⚡", label: "24-Hour Response" },
            { icon: "🌐", label: "Arabic & English" },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-2 text-xs"
              style={{ background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.2)", color: "rgba(255,255,255,0.7)" }}
            >
              <span>{icon}</span>
              <span className="tracking-wide">{label}</span>
            </div>
          ))}
        </div>

        {/* region picker label */}
        <p className="relative text-white/35 text-xs mb-5 uppercase tracking-widest">Select your jurisdiction</p>

        {/* region cards */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mb-6">
          {[
            { href: "/sa",  flag: saudiFlag,  label: "Saudi Arabia",  alt: "Saudi Arabia — Legal Consultation" },
            { href: "/syr", flag: syrianFlag, label: "Syria",          alt: "Syria — Legal Consultation" },
          ].map(({ href, flag, label, alt }) => (
            <Link key={href} href={href}>
              <div
                className="group cursor-pointer flex flex-col items-center gap-4 p-8 transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,168,76,0.5)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(201,168,76,0.06)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)"; }}
              >
                <img
                  src={flag}
                  alt={alt}
                  className="object-cover shadow-lg"
                  style={{ width: "72px", height: "48px", borderRadius: "2px", border: "1px solid rgba(255,255,255,0.15)" }}
                />
                <div className="text-white font-semibold text-base tracking-wide">{label}</div>
                <div className="text-xs tracking-widest uppercase transition-colors" style={{ color: "rgba(201,168,76,0.6)" }}>
                  Enter →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* language switcher */}
        <div className="relative flex flex-wrap justify-center gap-4 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          <Link href="/ar" className="hover:text-white/60 transition-colors">عربي</Link>
          <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
          <Link href="/sa/ar" className="hover:text-white/60 transition-colors">عربي — السعودية</Link>
          <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
          <Link href="/syr/ar" className="hover:text-white/60 transition-colors">عربي — سوريا</Link>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────────────── */}
      <section
        aria-label="Key credentials of CounselO"
        style={{ borderTop: "1px solid rgba(201,168,76,0.15)", borderBottom: "1px solid rgba(201,168,76,0.15)", background: "rgba(201,168,76,0.04)" }}
        className="py-10 px-4"
      >
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { stat: "30+",      label: "Years of Legal Practice" },
            { stat: "20,000+",  label: "Cases Handled" },
            { stat: "24 h",     label: "Guaranteed Response" },
            { stat: "2",        label: "Jurisdictions" },
          ].map(({ stat, label }) => (
            <div key={stat}>
              <div className="text-3xl md:text-4xl font-serif font-bold mb-1" style={{ color: "#C9A84C" }}>{stat}</div>
              <div className="text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.45)" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Founder & About ───────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 py-20" aria-labelledby="about-heading">
        <div className="grid md:grid-cols-5 gap-10 items-start">

          {/* founder card */}
          <div
            className="md:col-span-2 p-8 text-center"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.2)" }}
          >
            {/* avatar initials */}
            <div
              className="mx-auto mb-5 flex items-center justify-center text-2xl font-serif font-bold"
              style={{ width: "80px", height: "80px", borderRadius: "50%", border: "2px solid rgba(201,168,76,0.4)", background: "rgba(201,168,76,0.08)", color: "#C9A84C" }}
            >
              OB
            </div>
            <div className="text-white font-serif font-bold text-lg mb-1">Omar Al-Baghdadi</div>
            <div className="text-xs uppercase tracking-widest mb-4" style={{ color: "#C9A84C" }}>Lawyer &amp; Legal Counsel</div>
            <div
              className="text-xs leading-relaxed mb-5"
              style={{ color: "rgba(255,255,255,0.5)", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1rem" }}
            >
              30+ years of legal practice across Saudi Arabia and Syria. Expert in civil, commercial, family, and administrative law.
            </div>
            <a
              href="https://www.linkedin.com/in/lawyeromarbaghdadi/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs transition-opacity hover:opacity-80"
              style={{ color: "#C9A84C" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn Profile
            </a>
          </div>

          {/* about text */}
          <div className="md:col-span-3">
            <div
              className="text-xs uppercase tracking-widest mb-3"
              style={{ color: "#C9A84C" }}
            >
              About CounselO
            </div>
            <h2 id="about-heading" className="text-2xl md:text-3xl font-serif font-bold text-white mb-5 leading-snug">
              Professional Legal Counsel,<br />Delivered Online
            </h2>
            <p className="leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem" }}>
              <strong className="text-white">CounselO</strong> is an online legal consultation platform founded and led by{" "}
              <strong className="text-white">Lawyer and Legal Counsel Omar Al-Baghdadi</strong>, with over{" "}
              <strong className="text-white">30 years of legal practice</strong> and more than{" "}
              <strong className="text-white">20,000 cases</strong> handled across Saudi Arabia and Syria.
            </p>
            <p className="leading-relaxed mb-7" style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.95rem" }}>
              We make professional legal advice accessible to everyone — individuals, families, and businesses — without the need for an office visit. Consultations are conducted via WhatsApp or email, in <strong className="text-white">Arabic or English</strong>, with a response guaranteed <strong className="text-white">within 24 hours</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: "🔒", title: "Fully Confidential", body: "Attorney-client privilege on every consultation. Your information is never shared." },
                { icon: "⚡", title: "24-Hour Response", body: "Expert legal response within 24 hours. Urgent matters prioritised." },
                { icon: "🌐", title: "Online — No Office", body: "Consult from anywhere via WhatsApp or email. No travel, no waiting room." },
              ].map(({ icon, title, body }) => (
                <div
                  key={title}
                  className="p-4"
                  style={{ background: "rgba(255,255,255,0.03)", borderLeft: "2px solid rgba(201,168,76,0.35)" }}
                >
                  <div className="text-lg mb-2">{icon}</div>
                  <div className="text-white font-semibold text-sm mb-1">{title}</div>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Practice Areas ────────────────────────────────────────────────── */}
      <section
        className="py-20 px-4"
        aria-labelledby="services-heading"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-widest mb-3" style={{ color: "#C9A84C" }}>Legal Services</div>
            <h2 id="services-heading" className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
              Practice Areas
            </h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              Available in Saudi Arabia and Syria
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
            {SERVICES.map(({ slug, en, icon }) => (
              <div
                key={slug}
                className="group transition-all duration-150"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,168,76,0.35)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(201,168,76,0.05)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)"; }}
              >
                <div className="p-4">
                  <div className="text-xl mb-2">{icon}</div>
                  <div className="font-semibold text-white text-sm mb-3 leading-snug">{en}</div>
                  <div className="flex gap-2 flex-wrap">
                    <Link
                      href={`/sa/services/${slug}`}
                      className="text-xs px-2 py-0.5 transition-colors"
                      style={{ color: "rgba(201,168,76,0.7)", border: "1px solid rgba(201,168,76,0.2)" }}
                    >
                      SA
                    </Link>
                    <Link
                      href={`/syr/services/${slug}`}
                      className="text-xs px-2 py-0.5 transition-colors"
                      style={{ color: "rgba(201,168,76,0.7)", border: "1px solid rgba(201,168,76,0.2)" }}
                    >
                      SYR
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-5 flex-wrap">
            <Link
              href="/sa/services"
              className="text-sm font-semibold px-6 py-3 transition-opacity hover:opacity-80"
              style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)", color: "#C9A84C" }}
            >
              All Saudi Arabia Services →
            </Link>
            <Link
              href="/syr/services"
              className="text-sm font-semibold px-6 py-3 transition-all hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}
            >
              All Syria Services →
            </Link>
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 py-20" aria-labelledby="how-heading">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-widest mb-3" style={{ color: "#C9A84C" }}>Simple Process</div>
          <h2 id="how-heading" className="text-2xl md:text-3xl font-serif font-bold text-white">
            How It Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              step: "01",
              title: "Choose Your Jurisdiction",
              body: "Select Saudi Arabia or Syria. Each region has jurisdiction-specific legal advice, service pages, and guides tailored to local law.",
            },
            {
              step: "02",
              title: "Describe Your Legal Matter",
              body: "Send your legal question via WhatsApp or the contact form — in Arabic or English. Include any relevant documents if needed.",
            },
            {
              step: "03",
              title: "Receive Expert Advice",
              body: "Lawyer Omar Al-Baghdadi or a qualified CounselO team member reviews your matter and responds within 24 hours.",
            },
          ].map(({ step, title, body }) => (
            <div key={step} className="relative text-center">
              <div
                className="text-6xl font-serif font-bold mb-4 leading-none"
                style={{ color: "rgba(201,168,76,0.12)" }}
              >
                {step}
              </div>
              <h3 className="font-serif font-bold text-white text-base mb-2">{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{body}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="https://wa.me/966592850247"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-semibold px-7 py-3 text-sm transition-opacity hover:opacity-90"
            style={{ background: "#25D366", color: "#fff" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
            Chat on WhatsApp
          </a>
          <Link
            href="/sa/contact"
            className="flex items-center gap-2 font-semibold px-7 py-3 text-sm transition-all hover:bg-white/8"
            style={{ border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.7)" }}
          >
            Contact Form
          </Link>
        </div>
      </section>

      {/* ── Legal Blog ────────────────────────────────────────────────────── */}
      <section
        className="py-20 px-4"
        aria-labelledby="blog-heading"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-widest mb-3" style={{ color: "#C9A84C" }}>Knowledge Centre</div>
            <h2 id="blog-heading" className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
              Free Legal Guides
            </h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              In-depth legal articles for Saudi Arabia and Syria
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {BLOG_POSTS.map(({ slug, syrSlug, en }) => (
              <div
                key={slug}
                className="p-5 transition-all duration-150"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,168,76,0.25)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
              >
                <div className="text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(201,168,76,0.6)" }}>Legal Guide</div>
                <h3 className="font-serif font-semibold text-white text-sm leading-snug mb-4">{en}</h3>
                <div className="flex gap-3">
                  <Link
                    href={`/sa/blog/${slug}`}
                    className="text-xs px-3 py-1 transition-colors"
                    style={{ color: "rgba(201,168,76,0.8)", border: "1px solid rgba(201,168,76,0.25)" }}
                  >
                    Saudi Arabia →
                  </Link>
                  <Link
                    href={`/syr/blog/${syrSlug}`}
                    className="text-xs px-3 py-1 transition-colors"
                    style={{ color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.12)" }}
                  >
                    Syria →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-5 flex-wrap">
            <Link
              href="/sa/blog"
              className="text-sm font-semibold px-6 py-3 transition-opacity hover:opacity-80"
              style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)", color: "#C9A84C" }}
            >
              Saudi Arabia Legal Blog →
            </Link>
            <Link
              href="/syr/blog"
              className="text-sm px-6 py-3 transition-all hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)" }}
            >
              Syria Legal Blog →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 py-20" aria-labelledby="faq-heading">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-widest mb-3" style={{ color: "#C9A84C" }}>Support</div>
          <h2 id="faq-heading" className="text-2xl md:text-3xl font-serif font-bold text-white">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-3">
          {FAQS.map(({ q, a }) => (
            <div
              key={q}
              className="p-6 transition-all duration-150"
              style={{ background: "rgba(255,255,255,0.03)", borderLeft: "2px solid rgba(201,168,76,0.4)", border: "1px solid rgba(255,255,255,0.07)", borderLeftWidth: "2px", borderLeftColor: "rgba(201,168,76,0.4)" }}
            >
              <h3 className="font-serif font-semibold text-white text-sm mb-2">{q}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section
        className="py-20 px-4 text-center"
        aria-label="Final call to action"
        style={{ borderTop: "1px solid rgba(201,168,76,0.15)", background: "rgba(201,168,76,0.03)" }}
      >
        <div className="max-w-2xl mx-auto mb-10">
          <div className="text-xs uppercase tracking-widest mb-4" style={{ color: "#C9A84C" }}>Get Started</div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
            Ready to Get Expert Legal Advice?
          </h2>
          <p className="mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem" }}>
            Choose your jurisdiction to access specialist legal services, free guides, and consultation booking.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/sa"
              className="font-bold px-10 py-3.5 text-sm transition-opacity hover:opacity-90"
              style={{ background: "#C9A84C", color: "#0f1e14" }}
            >
              Saudi Arabia →
            </Link>
            <Link
              href="/syr"
              className="font-bold px-10 py-3.5 text-sm transition-all hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}
            >
              Syria →
            </Link>
          </div>
        </div>

        {/* footer nav */}
        <nav
          className="max-w-4xl mx-auto pt-12 text-left"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          aria-label="Site-wide navigation links"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            <div>
              <div className="font-semibold mb-3 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>Saudi Arabia</div>
              <ul className="space-y-2">
                <li><Link href="/sa" className="hover:text-white transition-colors">Home — SA</Link></li>
                <li><Link href="/sa/services" className="hover:text-white transition-colors">All Services</Link></li>
                <li><Link href="/sa/blog" className="hover:text-white transition-colors">Legal Blog</Link></li>
                <li><Link href="/sa/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/sa/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/sa/ar" className="hover:text-white transition-colors">عربي</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-3 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>Syria</div>
              <ul className="space-y-2">
                <li><Link href="/syr" className="hover:text-white transition-colors">Home — Syria</Link></li>
                <li><Link href="/syr/services" className="hover:text-white transition-colors">All Services</Link></li>
                <li><Link href="/syr/blog" className="hover:text-white transition-colors">Legal Blog</Link></li>
                <li><Link href="/syr/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/syr/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/syr/ar" className="hover:text-white transition-colors">عربي</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-3 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>Top Services</div>
              <ul className="space-y-2">
                <li><Link href="/sa/services/family-law" className="hover:text-white transition-colors">Family Law</Link></li>
                <li><Link href="/sa/services/employment-law" className="hover:text-white transition-colors">Employment Law</Link></li>
                <li><Link href="/sa/services/real-estate" className="hover:text-white transition-colors">Real Estate Law</Link></li>
                <li><Link href="/sa/services/business-law" className="hover:text-white transition-colors">Business Law</Link></li>
                <li><Link href="/sa/services/foreign-investment" className="hover:text-white transition-colors">Foreign Investment</Link></li>
                <li><Link href="/sa/services/criminal-law" className="hover:text-white transition-colors">Criminal Law</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-3 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>Legal Guides</div>
              <ul className="space-y-2">
                <li><Link href="/sa/blog/divorce-in-saudi-arabia" className="hover:text-white transition-colors">Divorce in Saudi Arabia</Link></li>
                <li><Link href="/sa/blog/child-custody-saudi-arabia" className="hover:text-white transition-colors">Child Custody</Link></li>
                <li><Link href="/sa/blog/wrongful-termination-saudi-labor-law" className="hover:text-white transition-colors">Wrongful Termination</Link></li>
                <li><Link href="/sa/blog/foreign-company-registration-saudi-arabia" className="hover:text-white transition-colors">Company Registration</Link></li>
                <li><Link href="/syr/blog/divorce-in-syria" className="hover:text-white transition-colors">Divorce in Syria</Link></li>
                <li><Link href="/syr/blog/wrongful-termination-syrian-labor-law" className="hover:text-white transition-colors">Termination — Syria</Link></li>
              </ul>
            </div>
          </div>
        </nav>

        <div
          className="max-w-4xl mx-auto mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.25)" }}
        >
          <span>© 2026 CounselO. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/sa/privacy-policy" className="hover:text-white/50 transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link href="/sa/terms-of-service" className="hover:text-white/50 transition-colors">Terms of Service</Link>
            <span>·</span>
            <a href="https://www.linkedin.com/in/lawyeromarbaghdadi/" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors">LinkedIn</a>
          </div>
        </div>
      </section>
    </div>
  );
}
