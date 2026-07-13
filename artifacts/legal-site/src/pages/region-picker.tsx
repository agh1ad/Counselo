import { motion } from "framer-motion";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Scale, ShieldCheck, Globe, Clock, Lock, ArrowRight, MessageCircle, CheckCircle2, Award } from "lucide-react";

const counseloLogo = "/images/optimized/counselo-region-logo.png";
const saudiFlag = "/images/optimized/saudi-arabia-flag.jpg";
const syrianFlag = "/images/optimized/syria-flag.jpg";

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
    "target": { "@type": "EntryPoint", "urlTemplate": "https://counselo-legal.com/blog?q={search_term_string}" },
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
    "telephone": "+966594850247",
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
        "text": "CounselO targets a professional legal response within 24 hours of receiving a consultation request via WhatsApp or email, subject to the matter's scope and urgency.",
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
        "text": "Starting is simple: (1) Choose your region — Saudi Arabia or Syria. (2) Browse the relevant service or contact us directly. (3) Send your legal question via WhatsApp (+966 59 485 0247) or the contact form. You will receive a confidential, expert legal response within 24 hours.",
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
  { slug: "family-law",            en: "Family Law" },
  { slug: "employment-law",        en: "Employment Law" },
  { slug: "real-estate",           en: "Real Estate Law" },
  { slug: "business-law",          en: "Business Law" },
  { slug: "foreign-investment",    en: "Foreign Investment" },
  { slug: "criminal-law",          en: "Criminal Law" },
  { slug: "administrative-law",    en: "Administrative Law" },
  { slug: "contracts",             en: "Contracts" },
  { slug: "arbitration",           en: "Arbitration & Mediation" },
  { slug: "companies-law",         en: "Companies Law" },
  { slug: "banking-finance",       en: "Banking & Finance" },
  { slug: "intellectual-property", en: "Intellectual Property" },
  { slug: "tax-zakat",             en: "Tax & Zakat" },
  { slug: "cyber-law",             en: "Cyber & IT Law" },
  { slug: "medical-malpractice",   en: "Medical Malpractice" },
  { slug: "insurance-law",         en: "Insurance Law" },
  { slug: "enforcement",           en: "Enforcement & Debt Collection" },
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

const fadeIn = {
  initial: false as const,
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const serviceIcons = [Scale, ShieldCheck, Globe, Clock, Lock, CheckCircle2, Globe, Scale, ShieldCheck, Globe, Clock, Lock, CheckCircle2, Globe, Scale, ShieldCheck, Clock];

// ── Component ─────────────────────────────────────────────────────────────────

export default function RegionPicker() {
  return (
    <main className="w-full bg-background" id="main-content">
      <Helmet>
        <html lang="en" dir="ltr" />
        <title>CounselO | Online Legal Consultation — Saudi Arabia &amp; Syria</title>
        <meta name="description" content="Confidential online legal consultation for Saudi Arabia and Syria, in Arabic or English. Get lawyer-led guidance on family, employment, business and more within 24 hours." />
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

      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 pt-16 pb-20 text-center overflow-hidden" aria-label="Region selection">
        <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(135deg, hsl(150 100% 10%) 0%, hsl(150 80% 15%) 100%)" }} />
        <div className="absolute end-0 top-0 w-1/2 h-full opacity-10 pointer-events-none z-0">
          <div className="w-full h-full" style={{ background: "radial-gradient(ellipse at 50% 50%, hsl(150 60% 60%) 0%, transparent 70%)" }} />
        </div>
        <div className="absolute inset-0 z-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex flex-col items-center">
            <Link href="/sa">
              <img
                src={counseloLogo}
                alt="CounselO — Online Legal Consultations for Saudi Arabia and Syria"
                width="193"
                height="80"
                fetchPriority="high"
                decoding="async"
                className="h-20 w-auto object-contain mb-10 hover:opacity-90 transition-opacity"
              />
            </Link>

            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-xs font-semibold uppercase tracking-widest px-4 py-2 mb-8">
              Licensed Legal Counsel · Saudi Arabia &amp; Syria
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6 max-w-3xl">
              Online Legal Consultation
              <br />
              <span className="text-white/70 italic">Saudi Arabia &amp; Syria</span>
            </h1>

            <div className="w-20 h-1 bg-white/40 mb-8" />

            <p className="text-xl text-white/75 mb-10 max-w-xl leading-relaxed font-light">
              Expert, confidential legal advice in Arabic &amp; English —{" "}
              <strong className="text-white font-semibold">target response within 24 hours.</strong>
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {["Attorney-Client Privilege", "24-Hour Response", "Arabic & English"].map((label) => (
                <span key={label} className="bg-white/10 border border-white/20 text-white/80 text-xs font-medium px-4 py-2 uppercase tracking-wider">
                  {label}
                </span>
              ))}
            </div>

            <p className="text-white/40 text-xs mb-5 uppercase tracking-widest">Select your jurisdiction</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mb-8">
              {[
                { href: "/sa",  flag: saudiFlag,  label: "Saudi Arabia",  alt: "Saudi Arabia — Legal Consultation" },
                { href: "/syr", flag: syrianFlag, label: "Syria",          alt: "Syria — Legal Consultation" },
              ].map(({ href, flag, label, alt }) => (
                <Link key={href} href={href}>
                  <div className="group cursor-pointer flex flex-col items-center gap-4 p-8 bg-white/5 border border-white/15 hover:bg-white/10 hover:border-white/40 transition-all duration-200">
                    <img src={flag} alt={alt} width="72" height="48" decoding="async" className="object-cover shadow-lg" style={{ width: "72px", height: "48px", borderRadius: "2px", border: "1px solid rgba(255,255,255,0.2)" }} />
                    <div className="text-white font-semibold text-base tracking-wide">{label}</div>
                    <div className="flex items-center gap-1 text-white/50 text-xs group-hover:text-white/80 transition-colors">
                      Enter <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-xs text-white/35">
              <Link href="/ar" className="hover:text-white/60 transition-colors">عربي</Link>
              <span className="text-white/15">·</span>
              <Link href="/sa/ar" className="hover:text-white/60 transition-colors">عربي — السعودية</Link>
              <span className="text-white/15">·</span>
              <Link href="/syr/ar" className="hover:text-white/60 transition-colors">عربي — سوريا</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section aria-label="Key credentials of CounselO" className="py-12 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { stat: "30+",     label: "Years of Legal Practice" },
              { stat: "20,000+", label: "Cases Handled" },
              { stat: "24 h",    label: "Guaranteed Response" },
              { stat: "2",       label: "Jurisdictions" },
            ].map(({ stat, label }, i, arr) => (
              <motion.div key={stat} {...fadeIn} className={`text-center px-4 py-2 ${i < arr.length - 1 ? "border-r border-border" : ""}`}>
                <div className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2 leading-tight text-center">{stat}</div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider text-center">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / FOUNDER ── */}
      <section className="py-24 bg-background" aria-labelledby="about-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16 items-start">

            {/* Founder card */}
            <motion.div {...fadeIn} className="lg:col-span-2">
              <div className="bg-primary p-8 text-white mb-6">
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
                      className="inline-flex items-center gap-1.5 text-white/55 hover:text-white text-xs transition-colors border border-white/25 hover:border-white/50 px-2 py-1"
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
                      "Licensed Lawyer, Syria — License No. 289",
                      "Holder of the title \"Ustaz\" (Senior Counsel) — Syrian Bar Association",
                      "Senior Advocate & Legal Counsel across Saudi Arabia, UAE and Syria",
                      "20,000+ cases across civil, commercial, administrative, arbitration and criminal law",
                      "Mentor and supervisor to 40+ licensed lawyers across three jurisdictions",
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
              <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">About CounselO</p>
              <h2 id="about-heading" className="text-4xl font-serif font-bold text-foreground mb-6">
                Professional Legal Counsel,<br />Delivered Online
              </h2>
              <div className="w-16 h-1 bg-primary/40 mb-8" />
              <p className="text-muted-foreground leading-relaxed mb-5">
                <strong className="text-foreground">CounselO</strong> is an online legal consultation platform founded and led by{" "}
                <strong className="text-foreground">Lawyer and Legal Counsel Omar Al-Baghdadi</strong>, with over{" "}
                <strong className="text-foreground">30 years of legal practice</strong> and more than{" "}
                <strong className="text-foreground">20,000 cases</strong> handled across Saudi Arabia and Syria.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We make professional legal advice accessible to everyone — individuals, families, and businesses — without the need for an office visit. Consultations are conducted via WhatsApp or email, in{" "}
                <strong className="text-foreground">Arabic or English</strong>, with a target response{" "}
                <strong className="text-foreground">within 24 hours</strong>.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { Icon: Lock,        title: "Fully Confidential",  body: "Attorney-client privilege on every consultation. Your information is never shared." },
                  { Icon: Clock,       title: "24-Hour Response",    body: "Expert legal response within 24 hours. Urgent matters prioritised." },
                  { Icon: Globe,       title: "Online — No Office",  body: "Consult from anywhere via WhatsApp or email. No travel, no waiting room." },
                ].map(({ Icon, title, body }) => (
                  <div key={title} className="bg-card border border-border p-5 border-l-2 border-l-primary">
                    <Icon className="h-5 w-5 text-primary mb-3" />
                    <div className="font-semibold text-foreground text-sm mb-1">{title}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PRACTICE AREAS ── */}
      <section className="py-24 bg-card border-y border-border" aria-labelledby="services-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">Legal Services</p>
            <h2 id="services-heading" className="text-4xl font-serif font-bold text-foreground mb-4">Practice Areas</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-muted-foreground">Available across Saudi Arabia and Syria</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            {SERVICES.map(({ slug, en }, index) => {
              const Icon = serviceIcons[index] ?? Scale;
              return (
                <motion.div key={slug} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: (index % 8) * 0.05 }}
                  className="bg-background border border-border p-5 hover:border-primary/50 hover:shadow-md transition-all group">
                  <Icon className="h-6 w-6 text-primary mb-3" />
                  <div className="font-semibold text-foreground text-sm mb-3 leading-snug">{en}</div>
                  <div className="flex gap-2 flex-wrap">
                    <Link href={`/sa/services/${slug}`} className="text-xs px-2 py-0.5 border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors">SA</Link>
                    <Link href={`/syr/services/${slug}`} className="text-xs px-2 py-0.5 border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors">SYR</Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/sa/services" className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-8 py-3 hover:bg-primary/90 transition-colors">
              All Saudi Arabia Services <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/syr/services" className="inline-flex items-center gap-2 border border-border text-foreground text-sm font-semibold px-8 py-3 hover:border-primary/50 hover:shadow-sm transition-all">
              All Syria Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-background" aria-labelledby="how-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">Simple Process</p>
            <h2 id="how-heading" className="text-4xl font-serif font-bold text-foreground mb-4">How It Works</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-muted-foreground">Four steps to expert legal advice</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              { step: "01", title: "Choose Your Jurisdiction", body: "Select Saudi Arabia or Syria. Each region has jurisdiction-specific legal advice, service pages, and guides tailored to local law." },
              { step: "02", title: "Describe Your Legal Matter", body: "Send your legal question via WhatsApp or the contact form — in Arabic or English. Include any relevant documents if needed." },
              { step: "03", title: "Pay the Consultation Fee",  body: "Payment is made by bank transfer before you receive the legal opinion. You will receive a payment confirmation and expected response time." },
              { step: "04", title: "Receive Expert Advice",     body: "Lawyer Omar Al-Baghdadi or a qualified CounselO team member reviews your matter and responds within 24 hours." },
            ].map(({ step, title, body }, i) => (
              <motion.div key={step} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative bg-card border border-border p-8 hover:border-primary/50 hover:shadow-md transition-all">
                <div className="text-6xl font-serif font-bold text-primary/10 absolute top-4 end-6 leading-none select-none">{step}</div>
                <div className="text-primary font-mono text-sm font-bold mb-4">{step}</div>
                <h3 className="text-xl font-serif font-bold text-foreground mb-3">{title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{body}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-4 flex-wrap">
            <a href="https://wa.me/966594850247" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] text-white font-semibold px-7 py-3 text-sm hover:opacity-90 transition-opacity">
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
            <Link href="/sa/contact" className="inline-flex items-center gap-2 border border-border text-foreground font-semibold px-7 py-3 text-sm hover:border-primary/50 hover:shadow-sm transition-all">
              Contact Form <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── LEGAL BLOG ── */}
      <section className="py-24 bg-card border-y border-border" aria-labelledby="blog-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">Knowledge Centre</p>
            <h2 id="blog-heading" className="text-4xl font-serif font-bold text-foreground mb-4">Free Legal Guides</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-muted-foreground">In-depth legal articles for Saudi Arabia and Syria</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            {BLOG_POSTS.map(({ slug, en }, i) => (
              <motion.div key={slug} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background border border-border p-6 hover:border-primary/50 hover:shadow-md transition-all">
                <p className="text-primary font-medium text-xs uppercase tracking-widest mb-3">Legal Guide</p>
                <h3 className="font-serif font-bold text-foreground text-base leading-snug mb-5">{en}</h3>
                <div className="flex gap-3">
                  <Link href="/blog" className="inline-flex items-center gap-1 text-xs border border-border text-muted-foreground px-3 py-1.5 hover:border-primary hover:text-primary transition-colors">
                    Saudi Arabia <ArrowRight className="h-3 w-3" />
                  </Link>
                  <Link href="/blog" className="inline-flex items-center gap-1 text-xs border border-border text-muted-foreground px-3 py-1.5 hover:border-primary hover:text-primary transition-colors">
                    Syria <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/blog" className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-8 py-3 hover:bg-primary/90 transition-colors">
              Saudi Arabia Legal Blog <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/blog" className="inline-flex items-center gap-2 border border-border text-foreground text-sm font-semibold px-8 py-3 hover:border-primary/50 hover:shadow-sm transition-all">
              Syria Legal Blog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-background" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-16">
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">Support</p>
            <h2 id="faq-heading" className="text-4xl font-serif font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </motion.div>
          <div className="space-y-4">
            {FAQS.map(({ q, a }, i) => (
              <motion.div key={q} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-card border border-border border-l-2 border-l-primary p-6">
                <h3 className="font-serif font-semibold text-foreground mb-2">{q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-primary" aria-label="Final call to action">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeIn}>
            <p className="text-white/60 uppercase tracking-widest text-sm font-medium mb-3">Get Started</p>
            <h2 className="text-4xl font-serif font-bold text-white mb-4">Ready to Get Expert Legal Advice?</h2>
            <div className="w-20 h-1 bg-white/30 mx-auto mb-8" />
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
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER NAV ── */}
      <section className="py-16 bg-card border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Site-wide navigation links">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-muted-foreground mb-12">
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
                <div className="font-semibold text-foreground mb-4">Top Services</div>
                <ul className="space-y-2.5">
                  <li><Link href="/sa/services/family-law" className="hover:text-primary transition-colors">Family Law</Link></li>
                  <li><Link href="/sa/services/employment-law" className="hover:text-primary transition-colors">Employment Law</Link></li>
                  <li><Link href="/sa/services/real-estate" className="hover:text-primary transition-colors">Real Estate Law</Link></li>
                  <li><Link href="/sa/services/business-law" className="hover:text-primary transition-colors">Business Law</Link></li>
                  <li><Link href="/sa/services/foreign-investment" className="hover:text-primary transition-colors">Foreign Investment</Link></li>
                  <li><Link href="/sa/services/criminal-law" className="hover:text-primary transition-colors">Criminal Law</Link></li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-foreground mb-4">Legal Guides</div>
                <ul className="space-y-2.5">
                  <li><Link href="/blog" className="hover:text-primary transition-colors">Divorce in Saudi Arabia</Link></li>
                  <li><Link href="/blog" className="hover:text-primary transition-colors">Child Custody</Link></li>
                  <li><Link href="/blog" className="hover:text-primary transition-colors">Wrongful Termination</Link></li>
                  <li><Link href="/blog" className="hover:text-primary transition-colors">Company Registration</Link></li>
                  <li><Link href="/blog" className="hover:text-primary transition-colors">Divorce in Syria</Link></li>
                  <li><Link href="/blog" className="hover:text-primary transition-colors">Termination — Syria</Link></li>
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
