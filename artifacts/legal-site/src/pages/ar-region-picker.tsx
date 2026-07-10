import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import counseloLogo from "@assets/Screen_Shot_2026-07-01_at_12.26.11_AM_1782851175169.png";
import saudiFlag from "@assets/image_1782789705620.jpeg";
import syrianFlag from "@assets/360_F_1136337946_c5gr8LMbgzdkl80hVpy8xRXYYQBTlp5x_1782856203372.jpg";

// ── Structured Data ───────────────────────────────────────────────────────────

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "كاونسلو",
  "alternateName": "CounselO",
  "url": "https://counselo-legal.com/",
  "description": "منصة استشارات قانونية إلكترونية تخدم المملكة العربية السعودية وسوريا — استشارات قانونية احترافية بالعربية والإنجليزية خلال 24 ساعة عبر الواتساب أو البريد الإلكتروني.",
  "publisher": { "@type": "Organization", "name": "كاونسلو", "url": "https://counselo-legal.com" },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "كاونسلو",
  "alternateName": "CounselO",
  "url": "https://counselo-legal.com",
  "logo": "https://counselo-legal.com/logo.png",
  "description": "كاونسلو منصة استشارات قانونية إلكترونية يقودها المحامي والمستشار القانوني عمر البغدادي، بخبرة تمتد لأكثر من 30 عاماً وأكثر من 20,000 قضية في السعودية وسوريا.",
  "founder": {
    "@type": "Person",
    "name": "عمر البغدادي",
    "alternateName": "Omar Al-Baghdadi",
    "jobTitle": "محامٍ ومستشار قانوني",
    "description": "المحامي عمر البغدادي يمتلك خبرة تزيد على 30 عاماً في الممارسة القانونية وأكثر من 20,000 قضية في المملكة العربية السعودية وسوريا.",
    "worksFor": { "@type": "Organization", "name": "كاونسلو" },
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
    "areaServed": ["SA", "SY"],
    "availableLanguage": ["Arabic", "English"],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "ما هو كاونسلو؟",
      "acceptedAnswer": { "@type": "Answer", "text": "كاونسلو منصة استشارات قانونية إلكترونية يقودها المحامي والمستشار القانوني عمر البغدادي بخبرة تزيد على 30 عاماً وأكثر من 20,000 قضية. نقدم استشارات قانونية سرية للأفراد والأسر والشركات في المملكة العربية السعودية وسوريا، بالعربية والإنجليزية، خلال 24 ساعة عبر الواتساب أو البريد الإلكتروني." },
    },
    {
      "@type": "Question",
      "name": "ما الدول التي يخدمها كاونسلو؟",
      "acceptedAnswer": { "@type": "Answer", "text": "نخدم المملكة العربية السعودية وسوريا. الاستشارات تتم عبر الإنترنت دون الحاجة لزيارة مكتب." },
    },
    {
      "@type": "Question",
      "name": "كم يستغرق الرد على استفساري القانوني؟",
      "acceptedAnswer": { "@type": "Answer", "text": "يضمن كاونسلو ردًّا قانونيًّا احترافيًّا خلال 24 ساعة من تقديم طلبك عبر الواتساب أو البريد الإلكتروني. الحالات العاجلة تُعطى أولوية." },
    },
    {
      "@type": "Question",
      "name": "هل الاستشارات القانونية على كاونسلو سرية؟",
      "acceptedAnswer": { "@type": "Answer", "text": "نعم. جميع الاستشارات سرية تمامًا وفق مبادئ السرية المهنية بين المحامي والموكّل. لا تُشارَك معلوماتك الشخصية أو القانونية مع أي طرف ثالث." },
    },
    {
      "@type": "Question",
      "name": "ما اللغات المتاحة في كاونسلو؟",
      "acceptedAnswer": { "@type": "Answer", "text": "يقدم كاونسلو استشاراته بالعربية والإنجليزية. جميع صفحات الخدمات والمقالات القانونية متوفرة باللغتين." },
    },
    {
      "@type": "Question",
      "name": "ما مجالات القانون التي يغطيها كاونسلو؟",
      "acceptedAnswer": { "@type": "Answer", "text": "يغطي كاونسلو: قانون الأسرة والطلاق، قانون العمل، القانون العقاري، القانون التجاري، الاستثمار الأجنبي، القانون الجنائي، القانون الإداري، العقود، البنوك والتمويل، الملكية الفكرية، الضرائب والزكاة، قانون الإنترنت والتقنية، الأخطاء الطبية، قانون التأمين، التحكيم والوساطة، وقانون الشركات." },
    },
    {
      "@type": "Question",
      "name": "كيف أبدأ استشارتي مع كاونسلو؟",
      "acceptedAnswer": { "@type": "Answer", "text": "الأمر بسيط: (1) اختر منطقتك — السعودية أو سوريا. (2) تصفح الخدمة المناسبة أو تواصل معنا مباشرة. (3) أرسل سؤالك القانوني عبر الواتساب (+966 59 285 0247) أو نموذج التواصل. ستحصل على رد قانوني سري ومتخصص خلال 24 ساعة." },
    },
    {
      "@type": "Question",
      "name": "هل يخدم كاونسلو الشركات أيضاً؟",
      "acceptedAnswer": { "@type": "Answer", "text": "نعم. يقدم كاونسلو استشاراته للأفراد والشركات على حد سواء. للشركات: نتولى العقود التجارية، تأسيس الشركات، تراخيص الاستثمار الأجنبي، الامتثال للعمل، تسوية النزاعات، وتحصيل الديون — في السعودية وسوريا." },
    },
  ],
};

// ── Data ──────────────────────────────────────────────────────────────────────

const SERVICES = [
  { slug: "family-law",         ar: "قانون الأسرة",                    en: "Family Law" },
  { slug: "employment-law",     ar: "قانون العمل",                     en: "Employment Law" },
  { slug: "real-estate",        ar: "القانون العقاري",                  en: "Real Estate Law" },
  { slug: "business-law",       ar: "القانون التجاري",                  en: "Business Law" },
  { slug: "foreign-investment", ar: "الاستثمار الأجنبي",               en: "Foreign Investment" },
  { slug: "criminal-law",       ar: "القانون الجنائي",                  en: "Criminal Law" },
  { slug: "administrative-law", ar: "القانون الإداري",                  en: "Administrative Law" },
  { slug: "contracts",          ar: "العقود",                          en: "Contracts" },
  { slug: "arbitration",        ar: "التحكيم والوساطة",                 en: "Arbitration & Mediation" },
  { slug: "companies-law",      ar: "قانون الشركات",                   en: "Companies Law" },
  { slug: "banking-finance",    ar: "البنوك والتمويل",                  en: "Banking & Finance" },
  { slug: "intellectual-property", ar: "الملكية الفكرية",              en: "Intellectual Property" },
  { slug: "tax-zakat",          ar: "الضرائب والزكاة",                  en: "Tax & Zakat" },
  { slug: "cyber-law",          ar: "قانون الإنترنت والتقنية",           en: "Cyber & IT Law" },
  { slug: "medical-malpractice",ar: "الأخطاء الطبية",                  en: "Medical Malpractice" },
  { slug: "insurance-law",      ar: "قانون التأمين",                    en: "Insurance Law" },
  { slug: "enforcement",        ar: "التنفيذ وتحصيل الديون",            en: "Enforcement & Debt Collection" },
];

const BLOG_POSTS = [
  { saSlug: "divorce-in-saudi-arabia",               syrSlug: "divorce-in-syria",                      ar: "الطلاق في المملكة: حقوقك وإجراءاتك القانونية" },
  { saSlug: "child-custody-saudi-arabia",            syrSlug: "child-custody-syria",                   ar: "الحضانة في المملكة: حقوق الوالدين والأطفال" },
  { saSlug: "wrongful-termination-saudi-labor-law",  syrSlug: "wrongful-termination-syrian-labor-law", ar: "الفصل التعسفي في قانون العمل: حقوقك القانونية" },
  { saSlug: "foreign-company-registration-saudi-arabia", syrSlug: "foreign-company-registration-syria", ar: "تسجيل شركة أجنبية 2026: دليل الترخيص" },
  { saSlug: "real-estate-disputes-saudi-arabia",     syrSlug: "real-estate-disputes-syria",            ar: "النزاعات العقارية: خياراتك القانونية" },
  { saSlug: "board-of-grievances-saudi-arabia",      syrSlug: "administrative-court-disputes-syria",   ar: "المحاكم الإدارية: كيف تطعن في قرارات الجهات" },
];

const FAQS = [
  { q: "ما هو كاونسلو؟", a: "كاونسلو منصة استشارات قانونية إلكترونية يقودها المحامي عمر البغدادي بخبرة 30+ عاماً وأكثر من 20,000 قضية. نقدم استشارات سرية للأفراد والشركات في السعودية وسوريا بالعربية والإنجليزية خلال 24 ساعة." },
  { q: "ما الدول التي يخدمها كاونسلو؟", a: "نخدم المملكة العربية السعودية وسوريا. الاستشارات تتم عبر الإنترنت دون الحاجة لزيارة مكتب." },
  { q: "كم يستغرق الرد؟", a: "يضمن كاونسلو ردًّا احترافيًّا خلال 24 ساعة من تقديم طلبك. الحالات العاجلة تُعطى أولوية." },
  { q: "هل الاستشارات سرية؟", a: "نعم، جميع الاستشارات سرية تمامًا وفق مبادئ السرية المهنية بين المحامي والموكّل. لا تُشارَك معلوماتك مع أي طرف ثالث." },
  { q: "ما اللغات المتاحة؟", a: "نقدم الاستشارات بالعربية والإنجليزية. جميع صفحات الخدمات والمقالات القانونية متوفرة باللغتين." },
  { q: "كيف أبدأ استشارتي؟", a: "اختر منطقتك (السعودية أو سوريا)، ثم أرسل سؤالك عبر الواتساب أو نموذج التواصل. ستحصل على رد متخصص خلال 24 ساعة." },
  { q: "هل يخدم كاونسلو الشركات؟", a: "نعم. نخدم الأفراد والشركات: تأسيس الشركات، العقود التجارية، تراخيص الاستثمار الأجنبي، نزاعات العمل، تحصيل الديون وغيرها." },
  { q: "ما مجالات القانون التي يغطيها كاونسلو؟", a: "قانون الأسرة والطلاق، قانون العمل، القانون العقاري، القانون التجاري، الاستثمار الأجنبي، الجنائي، الإداري، العقود، البنوك، الملكية الفكرية، الضرائب، قانون التقنية، الأخطاء الطبية، التأمين، التحكيم، وقانون الشركات." },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function ArRegionPicker() {
  return (
    <div className="min-h-screen bg-[#162b20] text-white" dir="rtl">
      <Helmet>
        <html lang="ar" dir="rtl" />
        <title>كاونسلو | استشارة قانونية أونلاين — السعودية وسوريا</title>
        <meta name="description" content="احصل على استشارة قانونية سرية في السعودية أو سوريا. استشارات بالعربية والإنجليزية خلال 24 ساعة. قانون الأسرة، العمل، العقارات، التجارة، الجنائي وأكثر." />
        <meta name="keywords" content="استشارة قانونية أونلاين السعودية, استشارة قانونية أونلاين سوريا, محامي أونلاين المملكة, محامي أونلاين سوريا, كاونسلو, عمر البغدادي, مشورة قانونية الشرق الأوسط, online legal consultation Saudi Arabia Syria" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="كاونسلو — المحامي والمستشار القانوني عمر البغدادي" />
        <meta name="geo.region" content="MENA" />
        <meta name="geo.placename" content="الشرق الأوسط" />
        <link rel="canonical" href="https://counselo-legal.com/ar" />
        <link rel="alternate" hrefLang="ar" href="https://counselo-legal.com/ar" />
        <link rel="alternate" hrefLang="en" href="https://counselo-legal.com/" />
        <link rel="alternate" hrefLang="en-SA" href="https://counselo-legal.com/sa" />
        <link rel="alternate" hrefLang="ar-SA" href="https://counselo-legal.com/sa/ar" />
        <link rel="alternate" hrefLang="en-SY" href="https://counselo-legal.com/syr" />
        <link rel="alternate" hrefLang="ar-SY" href="https://counselo-legal.com/syr/ar" />
        <link rel="alternate" hrefLang="x-default" href="https://counselo-legal.com/" />
        <meta property="og:title" content="كاونسلو | استشارة قانونية أونلاين — السعودية وسوريا" />
        <meta property="og:description" content="استشارة قانونية سرية في السعودية أو سوريا بالعربية والإنجليزية خلال 24 ساعة." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="كاونسلو CounselO" />
        <meta property="og:url" content="https://counselo-legal.com/ar" />
        <meta property="og:image" content="https://counselo-legal.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="كاونسلو — استشارات قانونية أونلاين للسعودية وسوريا" />
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:locale:alternate" content="ar_SY" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@CounselOLegal" />
        <meta name="twitter:title" content="كاونسلو | استشارة قانونية أونلاين — السعودية وسوريا" />
        <meta name="twitter:description" content="استشارة قانونية سرية بالعربية والإنجليزية خلال 24 ساعة." />
        <meta name="twitter:image" content="https://counselo-legal.com/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* ── Hero / Region Picker ────────────────────────────────────────────── */}
      <section className="flex flex-col items-center justify-center px-4 py-20 text-center" aria-label="اختيار المنطقة">
        <Link href="/sa/ar">
          <img
            src={counseloLogo}
            alt="كاونسلو — استشارات قانونية أونلاين للسعودية وسوريا"
            className="h-24 w-auto object-contain mb-10 hover:opacity-90 transition-opacity"
          />
        </Link>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 leading-tight max-w-3xl">
          استشارة قانونية أونلاين
          <br />
          <span className="text-white/80">للسعودية وسوريا</span>
        </h1>
        <p className="text-white/60 text-lg mb-10 max-w-xl leading-relaxed">
          استشارات قانونية احترافية وسرية بالعربية والإنجليزية — خلال 24 ساعة.
        </p>

        <p className="text-white/50 text-sm mb-6 tracking-widest">اختر منطقتك</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-lg mb-6">
          <Link href="/sa/ar">
            <div className="group cursor-pointer border border-white/20 hover:border-white/60 bg-white/5 hover:bg-white/10 transition-all duration-200 p-7 flex flex-col items-center gap-4 rounded-sm">
              <img
                src={saudiFlag}
                alt="المملكة العربية السعودية — استشارة قانونية"
                className="h-12 w-auto object-cover rounded-sm shadow border border-white/20"
                style={{ aspectRatio: "3/2", width: "72px" }}
              />
              <div>
                <div className="text-white font-semibold text-base">المملكة العربية السعودية</div>
              </div>
              <div className="text-white/40 text-xs group-hover:text-white/70 transition-colors">
                ادخل ←
              </div>
            </div>
          </Link>

          <Link href="/syr/ar">
            <div className="group cursor-pointer border border-white/20 hover:border-white/60 bg-white/5 hover:bg-white/10 transition-all duration-200 p-7 flex flex-col items-center gap-4 rounded-sm">
              <img
                src={syrianFlag}
                alt="سوريا — استشارة قانونية"
                className="h-12 w-auto object-cover rounded-sm shadow border border-white/20"
                style={{ aspectRatio: "3/2", width: "72px" }}
              />
              <div>
                <div className="text-white font-semibold text-base">سوريا</div>
              </div>
              <div className="text-white/40 text-xs group-hover:text-white/70 transition-colors">
                ادخل ←
              </div>
            </div>
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-white/40">
          <Link href="/" className="hover:text-white/70 transition-colors">الإنجليزية</Link>
          <span className="text-white/20">·</span>
          <Link href="/sa" className="hover:text-white/70 transition-colors">السعودية — إنجليزي</Link>
          <span className="text-white/20">·</span>
          <Link href="/syr" className="hover:text-white/70 transition-colors">سوريا — إنجليزي</Link>
        </div>
      </section>

      {/* ── Trust Strip ────────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 bg-white/5 py-10 px-4" aria-label="أبرز أرقام كاونسلو">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { stat: "+30",     label: "عاماً من الخبرة القانونية" },
            { stat: "+20,000", label: "قضية تمت معالجتها" },
            { stat: "24 ساعة",label: "ضمان الرد" },
            { stat: "2",       label: "دولتان: السعودية وسوريا" },
          ].map(({ stat, label }) => (
            <div key={stat}>
              <div className="text-3xl font-serif font-bold text-white mb-1">{stat}</div>
              <div className="text-white/50 text-sm leading-snug">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── About CounselO ─────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 py-16" aria-labelledby="about-heading-ar">
        <div className="border-r-4 border-white/30 pr-6 mb-10">
          <h2 id="about-heading-ar" className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
            عن كاونسلو
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            <strong className="text-white">كاونسلو</strong> منصة استشارات قانونية إلكترونية أسسها وقادها{" "}
            <strong className="text-white">المحامي والمستشار القانوني عمر البغدادي</strong>، صاحب خبرة تمتد لأكثر من{" "}
            <strong className="text-white">30 عاماً</strong> وأكثر من{" "}
            <strong className="text-white">20,000 قضية</strong> في المملكة العربية السعودية وسوريا.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            نجعل الاستشارة القانونية المتخصصة في متناول الجميع — أفراداً وأسراً وشركات — دون الحاجة لزيارة المكتب.
            تتم الاستشارات بسرية تامة عبر الواتساب أو البريد الإلكتروني{" "}
            <strong className="text-white">بالعربية أو الإنجليزية</strong>، مع ضمان الرد{" "}
            <strong className="text-white">خلال 24 ساعة</strong>.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "🔒", title: "سرية تامة", body: "تُطبَّق قواعد السرية المهنية بين المحامي والموكّل. معلوماتك القانونية لا تُشارَك مع أي طرف ثالث." },
            { icon: "⚡", title: "رد خلال 24 ساعة", body: "قدّم سؤالك القانوني واحصل على رد متخصص ومفصّل خلال 24 ساعة — وكثيراً ما يكون أسرع." },
            { icon: "🌐", title: "أونلاين — دون زيارة مكتب", body: "استشِر من أي مكان عبر الواتساب أو البريد الإلكتروني. لا تنقل، لا انتظار، لا مواعيد." },
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
      <section className="border-t border-white/10 bg-white/5 py-16 px-4" aria-labelledby="services-heading-ar">
        <div className="max-w-5xl mx-auto">
          <h2 id="services-heading-ar" className="text-2xl md:text-3xl font-serif font-bold text-white mb-2 text-center">
            مجالات الممارسة القانونية
          </h2>
          <p className="text-white/50 text-center mb-10 text-sm">
            متاحة في المملكة العربية السعودية وسوريا
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
            {SERVICES.map(({ slug, ar, en }) => (
              <div key={slug} className="bg-white/5 border border-white/10 p-4 hover:border-white/30 transition-colors">
                <div className="font-semibold text-white text-sm mb-3">{ar}</div>
                <div className="flex gap-2 flex-wrap">
                  <Link
                    href={`/sa/ar/services/${slug}`}
                    className="text-xs text-white/60 hover:text-white border border-white/20 hover:border-white/50 px-2 py-0.5 transition-colors"
                  >
                    SA
                  </Link>
                  <Link
                    href={`/syr/ar/services/${slug}`}
                    className="text-xs text-white/60 hover:text-white border border-white/20 hover:border-white/50 px-2 py-0.5 transition-colors"
                  >
                    SYR
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-6 flex-wrap">
            <Link href="/sa/ar/services" className="text-sm text-white/60 hover:text-white border border-white/20 hover:border-white/50 px-5 py-2.5 transition-colors">
              جميع خدمات السعودية ←
            </Link>
            <Link href="/syr/ar/services" className="text-sm text-white/60 hover:text-white border border-white/20 hover:border-white/50 px-5 py-2.5 transition-colors">
              جميع خدمات سوريا ←
            </Link>
          </div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 py-16" aria-labelledby="how-heading-ar">
        <h2 id="how-heading-ar" className="text-2xl md:text-3xl font-serif font-bold text-white mb-10 text-center">
          كيف تعمل المنصة؟
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: "01", title: "اختر منطقتك", body: "اختر المملكة العربية السعودية أو سوريا. لكل منطقة استشارات متخصصة وفق نظامها القانوني وصفحات خدمات مفصّلة." },
            { step: "02", title: "صِف مسألتك القانونية", body: "أرسل سؤالك القانوني عبر الواتساب أو نموذج التواصل بالعربية أو الإنجليزية. يمكنك إرفاق المستندات ذات الصلة." },
            { step: "03", title: "احصل على استشارة متخصصة", body: "يراجع المحامي عمر البغدادي أو أحد أعضاء فريق كاونسلو المؤهلين مسألتك ويرد عليها خلال 24 ساعة." },
          ].map(({ step, title, body }) => (
            <div key={step} className="text-center">
              <div className="text-5xl font-serif font-bold text-white/20 mb-3" dir="ltr">{step}</div>
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
            تواصل عبر الواتساب
          </a>
          <Link href="/sa/ar/contact" className="flex items-center gap-2 bg-white/10 border border-white/20 text-white font-semibold px-6 py-3 text-sm hover:bg-white/15 transition-colors">
            نموذج التواصل
          </Link>
        </div>
      </section>

      {/* ── Legal Blog ─────────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 bg-white/5 py-16 px-4" aria-labelledby="blog-heading-ar">
        <div className="max-w-4xl mx-auto">
          <h2 id="blog-heading-ar" className="text-2xl md:text-3xl font-serif font-bold text-white mb-2 text-center">
            مقالات قانونية مجانية
          </h2>
          <p className="text-white/50 text-center mb-10 text-sm">
            مقالات قانونية معمّقة للسعودية وسوريا
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {BLOG_POSTS.map(({ saSlug, syrSlug, ar }) => (
              <div key={saSlug} className="bg-white/5 border border-white/10 p-5 hover:border-white/25 transition-colors">
                <h3 className="font-semibold text-white text-sm leading-snug mb-3">{ar}</h3>
                <div className="flex gap-3">
                  <Link
                    href={`/sa/ar/blog/${saSlug}`}
                    className="text-xs text-white/60 hover:text-white border border-white/20 hover:border-white/50 px-2 py-0.5 transition-colors"
                  >
                    السعودية
                  </Link>
                  <Link
                    href={`/syr/ar/blog/${syrSlug}`}
                    className="text-xs text-white/60 hover:text-white border border-white/20 hover:border-white/50 px-2 py-0.5 transition-colors"
                  >
                    سوريا
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-6 flex-wrap">
            <Link href="/sa/ar/blog" className="text-sm text-white/60 hover:text-white border border-white/20 hover:border-white/50 px-5 py-2.5 transition-colors">
              مدونة السعودية القانونية ←
            </Link>
            <Link href="/syr/ar/blog" className="text-sm text-white/60 hover:text-white border border-white/20 hover:border-white/50 px-5 py-2.5 transition-colors">
              مدونة سوريا القانونية ←
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 py-16" aria-labelledby="faq-heading-ar">
        <h2 id="faq-heading-ar" className="text-2xl md:text-3xl font-serif font-bold text-white mb-10 text-center">
          الأسئلة الشائعة
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
      <section className="border-t border-white/10 py-16 px-4" aria-label="تواصل والدعوة للعمل">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
            هل أنت مستعد للحصول على استشارة قانونية؟
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto leading-relaxed">
            اختر منطقتك للوصول إلى الخدمات القانونية المتخصصة والمقالات وحجز الاستشارة.
          </p>
          <div className="flex justify-center gap-5 flex-wrap">
            <Link href="/sa/ar" className="bg-white text-[#162b20] font-bold px-8 py-3 text-sm hover:bg-white/90 transition-colors">
              المملكة العربية السعودية ←
            </Link>
            <Link href="/syr/ar" className="bg-white/10 border border-white/30 text-white font-bold px-8 py-3 text-sm hover:bg-white/15 transition-colors">
              سوريا ←
            </Link>
          </div>
        </div>

        <nav className="max-w-4xl mx-auto border-t border-white/10 pt-10" aria-label="روابط الموقع">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-white/50">
            <div>
              <div className="text-white/80 font-semibold mb-3">السعودية</div>
              <ul className="space-y-2">
                <li><Link href="/sa/ar" className="hover:text-white transition-colors">الرئيسية — SA</Link></li>
                <li><Link href="/sa/ar/services" className="hover:text-white transition-colors">جميع الخدمات</Link></li>
                <li><Link href="/sa/ar/blog" className="hover:text-white transition-colors">المدونة القانونية</Link></li>
                <li><Link href="/sa/ar/about" className="hover:text-white transition-colors">من نحن</Link></li>
                <li><Link href="/sa/ar/contact" className="hover:text-white transition-colors">تواصل معنا</Link></li>
                <li><Link href="/sa" className="hover:text-white transition-colors" dir="ltr">English</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-white/80 font-semibold mb-3">سوريا</div>
              <ul className="space-y-2">
                <li><Link href="/syr/ar" className="hover:text-white transition-colors">الرئيسية — SYR</Link></li>
                <li><Link href="/syr/ar/services" className="hover:text-white transition-colors">جميع الخدمات</Link></li>
                <li><Link href="/syr/ar/blog" className="hover:text-white transition-colors">المدونة القانونية</Link></li>
                <li><Link href="/syr/ar/about" className="hover:text-white transition-colors">من نحن</Link></li>
                <li><Link href="/syr/ar/contact" className="hover:text-white transition-colors">تواصل معنا</Link></li>
                <li><Link href="/syr" className="hover:text-white transition-colors" dir="ltr">English</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-white/80 font-semibold mb-3">أبرز الخدمات</div>
              <ul className="space-y-2">
                <li><Link href="/sa/ar/services/family-law" className="hover:text-white transition-colors">قانون الأسرة</Link></li>
                <li><Link href="/sa/ar/services/employment-law" className="hover:text-white transition-colors">قانون العمل</Link></li>
                <li><Link href="/sa/ar/services/real-estate" className="hover:text-white transition-colors">القانون العقاري</Link></li>
                <li><Link href="/sa/ar/services/business-law" className="hover:text-white transition-colors">القانون التجاري</Link></li>
                <li><Link href="/sa/ar/services/foreign-investment" className="hover:text-white transition-colors">الاستثمار الأجنبي</Link></li>
                <li><Link href="/sa/ar/services/criminal-law" className="hover:text-white transition-colors">القانون الجنائي</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-white/80 font-semibold mb-3">مقالات قانونية</div>
              <ul className="space-y-2">
                <li><Link href="/sa/ar/blog/divorce-in-saudi-arabia" className="hover:text-white transition-colors">الطلاق في المملكة</Link></li>
                <li><Link href="/sa/ar/blog/child-custody-saudi-arabia" className="hover:text-white transition-colors">الحضانة في المملكة</Link></li>
                <li><Link href="/sa/ar/blog/wrongful-termination-saudi-labor-law" className="hover:text-white transition-colors">الفصل التعسفي</Link></li>
                <li><Link href="/sa/ar/blog/foreign-company-registration-saudi-arabia" className="hover:text-white transition-colors">تسجيل شركة أجنبية</Link></li>
                <li><Link href="/syr/ar/blog/divorce-in-syria" className="hover:text-white transition-colors">الطلاق في سوريا</Link></li>
                <li><Link href="/syr/ar/blog/wrongful-termination-syrian-labor-law" className="hover:text-white transition-colors">الفصل التعسفي — سوريا</Link></li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/30">
          <span>© 2026 كاونسلو. جميع الحقوق محفوظة.</span>
          <div className="flex gap-4">
            <Link href="/sa/ar/privacy-policy" className="hover:text-white/60 transition-colors">سياسة الخصوصية</Link>
            <span>·</span>
            <Link href="/sa/ar/terms-of-service" className="hover:text-white/60 transition-colors">شروط الخدمة</Link>
            <span>·</span>
            <a href="https://www.linkedin.com/in/lawyeromarbaghdadi/" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors" dir="ltr">LinkedIn</a>
          </div>
        </div>
      </section>
    </div>
  );
}
