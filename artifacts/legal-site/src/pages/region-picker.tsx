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
  { slug: "family-law",        en: "Family Law",               ar: "قانون الأسرة" },
  { slug: "employment-law",    en: "Employment Law",            ar: "قانون العمل" },
  { slug: "real-estate",       en: "Real Estate Law",           ar: "القانون العقاري" },
  { slug: "business-law",      en: "Business Law",              ar: "القانون التجاري" },
  { slug: "foreign-investment",en: "Foreign Investment",        ar: "الاستثمار الأجنبي" },
  { slug: "criminal-law",      en: "Criminal Law",              ar: "القانون الجنائي" },
  { slug: "administrative-law",en: "Administrative Law",        ar: "القانون الإداري" },
  { slug: "contracts",         en: "Contracts",                 ar: "العقود" },
  { slug: "arbitration",       en: "Arbitration & Mediation",   ar: "التحكيم والوساطة" },
  { slug: "companies-law",     en: "Companies Law",             ar: "قانون الشركات" },
  { slug: "banking-finance",   en: "Banking & Finance",         ar: "البنوك والتمويل" },
  { slug: "intellectual-property", en: "Intellectual Property", ar: "الملكية الفكرية" },
  { slug: "tax-zakat",         en: "Tax & Zakat",               ar: "الضرائب والزكاة" },
  { slug: "cyber-law",         en: "Cyber & IT Law",            ar: "قانون الإنترنت والتقنية" },
  { slug: "medical-malpractice",en: "Medical Malpractice",      ar: "الأخطاء الطبية" },
  { slug: "insurance-law",     en: "Insurance Law",             ar: "قانون التأمين" },
  { slug: "enforcement",       en: "Enforcement & Debt Collection", ar: "التنفيذ وتحصيل الديون" },
];

const BLOG_POSTS = [
  { slug: "divorce-in-saudi-arabia",                    syrSlug: "divorce-in-syria",                          en: "Divorce in Saudi Arabia — Rights & Legal Process", ar: "الطلاق في المملكة" },
  { slug: "child-custody-saudi-arabia",                 syrSlug: "child-custody-syria",                       en: "Child Custody in Saudi Arabia",                    ar: "الحضانة في المملكة" },
  { slug: "wrongful-termination-saudi-labor-law",       syrSlug: "wrongful-termination-syrian-labor-law",     en: "Wrongful Termination under Saudi Labor Law",       ar: "الفصل التعسفي في العمل" },
  { slug: "foreign-company-registration-saudi-arabia",  syrSlug: "foreign-company-registration-syria",        en: "Foreign Company Registration in Saudi Arabia 2026", ar: "تسجيل شركة أجنبية" },
  { slug: "real-estate-disputes-saudi-arabia",          syrSlug: "real-estate-disputes-syria",                en: "Real Estate Disputes in Saudi Arabia",              ar: "النزاعات العقارية" },
  { slug: "board-of-grievances-saudi-arabia",           syrSlug: "administrative-court-disputes-syria",       en: "Board of Grievances — Administrative Courts",      ar: "ديوان المظالم" },
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

// ── Component ─────────────────────────────────────────────────────────────────

export default function RegionPicker() {
  return (
    <div className="min-h-screen bg-[#162b20] text-white">
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

      {/* ── Hero / Region Picker ────────────────────────────────────────────── */}
      <section className="flex flex-col items-center justify-center px-4 py-20 text-center" aria-label="Region selection">
        <Link href="/sa">
          <img
            src={counseloLogo}
            alt="CounselO — Online Legal Consultations for Saudi Arabia and Syria"
            className="h-24 w-auto object-contain mb-10 hover:opacity-90 transition-opacity"
          />
        </Link>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 leading-tight max-w-3xl">
          Online Legal Consultation for<br />
          <span className="text-white/80">Saudi Arabia &amp; Syria</span>
        </h1>
        <p className="text-white/60 text-lg mb-2 max-w-xl leading-relaxed">
          Expert, confidential legal advice in Arabic &amp; English — within 24 hours.
        </p>
        <p className="text-white/40 text-base mb-10 font-arabic" dir="rtl">
          استشارات قانونية احترافية بالعربية والإنجليزية · خلال 24 ساعة
        </p>

        <p className="text-white/50 text-sm mb-6 uppercase tracking-widest">Select your region · اختر منطقتك</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-lg mb-6">
          <Link href="/sa">
            <div className="group cursor-pointer border border-white/20 hover:border-white/60 bg-white/5 hover:bg-white/10 transition-all duration-200 p-7 flex flex-col items-center gap-4 rounded-sm">
              <img
                src={saudiFlag}
                alt="Saudi Arabia — Legal Consultation"
                className="h-12 w-auto object-cover rounded-sm shadow border border-white/20"
                style={{ aspectRatio: "3/2", width: "72px" }}
              />
              <div>
                <div className="text-white font-semibold text-base mb-0.5">Saudi Arabia</div>
                <div className="text-white/60 text-sm">المملكة العربية السعودية</div>
              </div>
              <div className="text-white/40 text-xs group-hover:text-white/70 transition-colors">
                Enter →
              </div>
            </div>
          </Link>

          <Link href="/syr">
            <div className="group cursor-pointer border border-white/20 hover:border-white/60 bg-white/5 hover:bg-white/10 transition-all duration-200 p-7 flex flex-col items-center gap-4 rounded-sm">
              <img
                src={syrianFlag}
                alt="Syria — Legal Consultation"
                className="h-12 w-auto object-cover rounded-sm shadow border border-white/20"
                style={{ aspectRatio: "3/2", width: "72px" }}
              />
              <div>
                <div className="text-white font-semibold text-base mb-0.5">Syria</div>
                <div className="text-white/60 text-sm">سوريا</div>
              </div>
              <div className="text-white/40 text-xs group-hover:text-white/70 transition-colors">
                Enter →
              </div>
            </div>
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-white/40">
          <Link href="/sa/ar" className="hover:text-white/70 transition-colors">عربي — السعودية</Link>
          <span className="text-white/20">·</span>
          <Link href="/syr/ar" className="hover:text-white/70 transition-colors">عربي — سوريا</Link>
        </div>
      </section>

      {/* ── Trust Strip ────────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 bg-white/5 py-10 px-4" aria-label="Key facts about CounselO">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { stat: "30+",      label: "Years of Legal Experience" },
            { stat: "20,000+",  label: "Cases Handled" },
            { stat: "24h",      label: "Response Guarantee" },
            { stat: "2",        label: "Jurisdictions: SA & Syria" },
          ].map(({ stat, label }) => (
            <div key={stat}>
              <div className="text-3xl font-serif font-bold text-white mb-1">{stat}</div>
              <div className="text-white/50 text-sm leading-snug">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── About CounselO ─────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 py-16" aria-labelledby="about-heading">
        <div className="border-l-4 border-white/30 pl-6 mb-10">
          <h2 id="about-heading" className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
            About CounselO
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            <strong className="text-white">CounselO</strong> is an online legal consultation platform founded and led by{" "}
            <strong className="text-white">Lawyer and Legal Counsel Omar Al-Baghdadi</strong>, with over{" "}
            <strong className="text-white">30 years of legal practice</strong> and more than{" "}
            <strong className="text-white">20,000 cases</strong> handled across Saudi Arabia and Syria.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            We make professional legal advice accessible to everyone — individuals, families, and businesses —
            without the need for an office visit. Consultations are conducted securely via WhatsApp or email,
            in <strong className="text-white">Arabic or English</strong>, with a response guaranteed{" "}
            <strong className="text-white">within 24 hours</strong>.
          </p>
          <p className="text-white/70 leading-relaxed" dir="rtl">
            <strong className="text-white">كاونسلو</strong> منصة استشارات قانونية إلكترونية يقودها المحامي والمستشار القانوني{" "}
            <strong className="text-white">عمر البغدادي</strong>، بخبرة تمتد لأكثر من{" "}
            <strong className="text-white">30 عاماً</strong> وأكثر من{" "}
            <strong className="text-white">20,000 قضية</strong> في السعودية وسوريا. نقدم استشاراتنا عبر الواتساب أو البريد الإلكتروني خلال 24 ساعة.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "🔒",
              title: "100% Confidential",
              body: "Attorney-client privilege applies. Your legal matters are never shared with any third party.",
            },
            {
              icon: "⚡",
              title: "Response within 24 Hours",
              body: "Submit your legal question and receive a detailed, expert response within 24 hours — often faster.",
            },
            {
              icon: "🌐",
              title: "Online — No Office Visit",
              body: "Consult from anywhere via WhatsApp or email. No travel, no waiting rooms, no scheduling delays.",
            },
          ].map(({ icon, title, body }) => (
            <div key={title} className="bg-white/5 border border-white/10 p-6 rounded-sm">
              <div className="text-2xl mb-3">{icon}</div>
              <h3 className="font-serif font-bold text-white mb-2">{title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Practice Areas ─────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 bg-white/5 py-16 px-4" aria-labelledby="services-heading">
        <div className="max-w-5xl mx-auto">
          <h2 id="services-heading" className="text-2xl md:text-3xl font-serif font-bold text-white mb-2 text-center">
            Practice Areas
          </h2>
          <p className="text-white/50 text-center mb-10 text-sm">
            Available in Saudi Arabia and Syria · متاح في السعودية وسوريا
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
            {SERVICES.map(({ slug, en, ar }) => (
              <div key={slug} className="bg-white/5 border border-white/10 p-4 hover:border-white/30 transition-colors">
                <div className="font-semibold text-white text-sm mb-1">{en}</div>
                <div className="text-white/50 text-xs mb-3" dir="rtl">{ar}</div>
                <div className="flex gap-2 flex-wrap">
                  <Link
                    href={`/sa/services/${slug}`}
                    className="text-xs text-white/60 hover:text-white border border-white/20 hover:border-white/50 px-2 py-0.5 transition-colors"
                  >
                    SA
                  </Link>
                  <Link
                    href={`/syr/services/${slug}`}
                    className="text-xs text-white/60 hover:text-white border border-white/20 hover:border-white/50 px-2 py-0.5 transition-colors"
                  >
                    SYR
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-6 flex-wrap">
            <Link
              href="/sa/services"
              className="text-sm text-white/60 hover:text-white border border-white/20 hover:border-white/50 px-5 py-2.5 transition-colors"
            >
              All Saudi Arabia Services →
            </Link>
            <Link
              href="/syr/services"
              className="text-sm text-white/60 hover:text-white border border-white/20 hover:border-white/50 px-5 py-2.5 transition-colors"
            >
              All Syria Services →
            </Link>
          </div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 py-16" aria-labelledby="how-heading">
        <h2 id="how-heading" className="text-2xl md:text-3xl font-serif font-bold text-white mb-10 text-center">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Choose Your Region",
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
              body: "Lawyer Omar Al-Baghdadi or a qualified member of the CounselO team reviews your matter and responds within 24 hours.",
            },
          ].map(({ step, title, body }) => (
            <div key={step} className="text-center">
              <div className="text-5xl font-serif font-bold text-white/20 mb-3">{step}</div>
              <h3 className="font-serif font-bold text-white text-lg mb-2">{title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center gap-5 flex-wrap">
          <a
            href="https://wa.me/966592850247"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] text-white font-semibold px-6 py-3 text-sm hover:opacity-90 transition-opacity"
          >
            Chat on WhatsApp
          </a>
          <Link href="/sa/contact" className="flex items-center gap-2 bg-white/10 border border-white/20 text-white font-semibold px-6 py-3 text-sm hover:bg-white/15 transition-colors">
            Contact Form
          </Link>
        </div>
      </section>

      {/* ── Legal Blog ─────────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 bg-white/5 py-16 px-4" aria-labelledby="blog-heading">
        <div className="max-w-4xl mx-auto">
          <h2 id="blog-heading" className="text-2xl md:text-3xl font-serif font-bold text-white mb-2 text-center">
            Free Legal Guides
          </h2>
          <p className="text-white/50 text-center mb-10 text-sm">
            In-depth legal articles for Saudi Arabia and Syria · مقالات قانونية معمّقة
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {BLOG_POSTS.map(({ slug, syrSlug, en }) => (
              <div key={slug} className="bg-white/5 border border-white/10 p-5 hover:border-white/25 transition-colors">
                <h3 className="font-semibold text-white text-sm leading-snug mb-3">{en}</h3>
                <div className="flex gap-3">
                  <Link
                    href={`/sa/blog/${slug}`}
                    className="text-xs text-white/60 hover:text-white border border-white/20 hover:border-white/50 px-2 py-0.5 transition-colors"
                  >
                    Saudi Arabia
                  </Link>
                  <Link
                    href={`/syr/blog/${syrSlug}`}
                    className="text-xs text-white/60 hover:text-white border border-white/20 hover:border-white/50 px-2 py-0.5 transition-colors"
                  >
                    Syria
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-6 flex-wrap">
            <Link href="/sa/blog" className="text-sm text-white/60 hover:text-white border border-white/20 hover:border-white/50 px-5 py-2.5 transition-colors">
              Saudi Arabia Legal Blog →
            </Link>
            <Link href="/syr/blog" className="text-sm text-white/60 hover:text-white border border-white/20 hover:border-white/50 px-5 py-2.5 transition-colors">
              Syria Legal Blog →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 py-16" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl md:text-3xl font-serif font-bold text-white mb-10 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {FAQS.map(({ q, a }) => (
            <div key={q} className="border border-white/15 bg-white/5 p-6">
              <h3 className="font-serif font-bold text-white mb-2">{q}</h3>
              <p className="text-white/65 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer CTA ─────────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 py-16 px-4" aria-label="Contact and final call to action">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
            Ready to Get Legal Advice?
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto leading-relaxed">
            Choose your region to access jurisdiction-specific legal services, guides, and consultation booking.
          </p>
          <div className="flex justify-center gap-5 flex-wrap">
            <Link href="/sa" className="bg-white text-[#162b20] font-bold px-8 py-3 text-sm hover:bg-white/90 transition-colors">
              Saudi Arabia →
            </Link>
            <Link href="/syr" className="bg-white/10 border border-white/30 text-white font-bold px-8 py-3 text-sm hover:bg-white/15 transition-colors">
              Syria →
            </Link>
          </div>
        </div>

        <nav className="max-w-4xl mx-auto border-t border-white/10 pt-10" aria-label="Site-wide navigation links">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-white/50">
            <div>
              <div className="text-white/80 font-semibold mb-3">Saudi Arabia</div>
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
              <div className="text-white/80 font-semibold mb-3">Syria</div>
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
              <div className="text-white/80 font-semibold mb-3">Top Services</div>
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
              <div className="text-white/80 font-semibold mb-3">Legal Guides</div>
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

        <div className="max-w-4xl mx-auto mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/30">
          <span>© 2026 CounselO. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/sa/privacy-policy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link href="/sa/terms-of-service" className="hover:text-white/60 transition-colors">Terms of Service</Link>
            <span>·</span>
            <a href="https://www.linkedin.com/in/lawyeromarbaghdadi/" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">LinkedIn</a>
          </div>
        </div>
      </section>
    </div>
  );
}
