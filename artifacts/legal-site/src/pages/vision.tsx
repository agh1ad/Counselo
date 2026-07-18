import { Link } from "wouter";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  BriefcaseBusiness,
  Globe2,
  Languages,
  Lightbulb,
  LockKeyhole,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
  UserRoundCheck,
  Waypoints,
} from "lucide-react";
import { SEOHead } from "@/components/seo/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";

type ValueItem = { title: string; description: string; icon: LucideIcon };
type EcosystemItem = { title: string; description: string; icon: LucideIcon };

const copy = {
  ar: {
    seoTitle: "رؤيتنا لمنصة قانونية رقمية موثوقة | كاونسلو",
    seoDescription:
      "تعرّف على رؤية كاونسلو ورسالتها وقيمها لبناء مرجع قانوني رقمي عربي موثوق يجمع الخبرة القانونية والتقنية والسرية المهنية.",
    seoKeywords:
      "رؤية كاونسلو, منصة قانونية رقمية, مرجع قانوني عربي, خدمات قانونية إلكترونية, استشارات قانونية موثوقة, عمر رياض بغدادي",
    eyebrow: "رؤيتنا",
    title: "القانون… أقرب، أوضح، وأكثر موثوقية",
    lead:
      "لم تعد الخدمات القانونية تقتصر على المكاتب التقليدية أو الحدود الجغرافية. ومع تطور التقنية وتزايد احتياجات الأفراد والشركات، أصبح الوصول إلى المعرفة القانونية الدقيقة والخدمة الاحترافية ضرورة، لا مجرد خيار.",
    intro:
      "من هذا المنطلق جاءت كاونسلو: منصة قانونية رقمية تجمع بين الخبرة المهنية والتقنية الحديثة، وتقدّم المعرفة والخدمات القانونية وفق معايير عالية من الجودة والسرية والاحترافية.",
    trust: [
      { stat: "+30", label: "عاماً من الخبرة القانونية" },
      { stat: "رقمي", label: "وصول يتجاوز الحدود" },
      { stat: "عربي · English", label: "دعم قانوني متعدد اللغات" },
    ],
    whyEyebrow: "لماذا أُنشئت كاونسلو؟",
    whyTitle: "حلّ تحديات قانونية حقيقية، بخبرة عملية",
    whyBody:
      "على مدى أكثر من ثلاثين عاماً من الممارسة القانونية، لمس مؤسس كاونسلو تحديات متكررة لدى طالبي الخدمات القانونية. لذلك بُنيت المنصة حول المعرفة والاحترافية قبل أي شيء آخر.",
    challenges: [
      "صعوبة الوصول إلى معلومة قانونية موثوقة وواضحة.",
      "تفاوت مستوى الخدمات وغياب المعايير المتسقة.",
      "طول الإجراءات وضعف التواصل مع العميل.",
      "محدودية الاستفادة من التقنية في العمل القانوني.",
    ],
    visionLabel: "رؤيتنا",
    visionTitle: "المرجع القانوني الرقمي الأكثر موثوقية في العالم العربي",
    visionBody:
      "أن تصبح كاونسلو منصة تجمع المعرفة القانونية المتخصصة والخدمات القانونية الاحترافية، بما يواكب التطور التقني ويحقق أعلى معايير الجودة والسرية وسهولة الوصول.",
    missionLabel: "رسالتنا",
    missionTitle: "خبرة ودقة وتقنية، في خدمة قرار قانوني أفضل",
    missionBody:
      "تقديم خدمات قانونية متكاملة تعتمد على الخبرة والدقة والتقنية، مع الالتزام بأعلى معايير المهنية؛ لتمكين الأفراد والشركات من الوصول إلى حلول قانونية موثوقة بكفاءة وسهولة.",
    valuesEyebrow: "ما نؤمن به",
    valuesTitle: "قيم تحكم كل معرفة وخدمة نقدمها",
    valuesBody:
      "ليست قيماً معلّقة على الجدار؛ بل معايير عمل تَظهر في طريقة تعاملنا مع معلومات العميل، وصياغة الرأي القانوني، وتطوير تجربة الخدمة.",
    values: [
      { title: "الاحترافية", description: "منهج واضح ومعايير ثابتة في كل مرحلة.", icon: BriefcaseBusiness },
      { title: "النزاهة", description: "رأي قانوني مستقل وصريح يخدم مصلحة العميل.", icon: Scale },
      { title: "السرية", description: "حماية المعلومات والالتزام الصارم بالخصوصية المهنية.", icon: LockKeyhole },
      { title: "الدقة", description: "بحث متأنٍ وتفاصيل موثقة قبل تقديم التوجيه.", icon: Target },
      { title: "الابتكار", description: "تسخير التقنية لرفع جودة الوصول والخدمة.", icon: Lightbulb },
      { title: "التطوير المستمر", description: "معرفة تتجدد مع الأنظمة والممارسة والتقنية.", icon: Sparkles },
      { title: "احترام العميل", description: "تواصل واضح، ووقت مقدّر، وتجربة إنسانية.", icon: UserRoundCheck },
      { title: "المسؤولية المهنية", description: "التزام واعٍ بأثر كل رأي وإجراء قانوني.", icon: ShieldCheck },
    ] as ValueItem[],
    ecosystemEyebrow: "ما الذي يميز كاونسلو؟",
    ecosystemTitle: "أكثر من منصة لحجز استشارة",
    ecosystemBody:
      "كاونسلو منظومة قانونية رقمية صُمّمت لترافق الأفراد والشركات من المعرفة الأولية إلى الحل القانوني المتخصص.",
    ecosystem: [
      { title: "معرفة قانونية متخصصة", description: "مقالات ودراسات وأدلة عملية بلغة واضحة.", icon: BookOpen },
      { title: "استشارات عن بُعد", description: "وصول مهني ومرن أينما كان العميل.", icon: Globe2 },
      { title: "حلول للأعمال", description: "دعم قانوني للشركات ورواد الأعمال والمستثمرين.", icon: BriefcaseBusiness },
      { title: "التقاضي والتحكيم", description: "خبرة في إدارة النزاعات والتمثيل القانوني.", icon: Scale },
      { title: "نماذج وأدلة", description: "موارد عملية تساعد على الفهم والاستعداد.", icon: Waypoints },
      { title: "دعم متعدد اللغات", description: "خدمة قانونية تتجاوز حاجز اللغة والمكان.", icon: Languages },
      { title: "تجربة مدعومة بالتقنية", description: "أدوات حديثة لتحسين السرعة والوضوح والمتابعة.", icon: Sparkles },
    ] as EcosystemItem[],
    founderEyebrow: "كلمة المؤسس",
    founderQuote:
      "قوة المحامي لا تُقاس فقط بقدرته على كسب القضايا، بل بقدرته على بناء الثقة، وتقديم المعرفة، وإيجاد الحلول قبل نشوء النزاعات.",
    founderParagraphs: [
      "عندما بدأت رحلتي في العمل القانوني قبل أكثر من ثلاثين عاماً، ترسخت لديّ قناعة بأن الخدمة القانونية الحقيقية تبدأ بالفهم والثقة، لا بالإجراء وحده.",
      "واليوم تمثل كاونسلو امتداداً لهذه القناعة؛ مشروعاً يسخّر الخبرة القانونية والتقنية لخدمة الأفراد والشركات، ويضع الجودة والموثوقية معياراً أول لكل ما يقدمه.",
      "لا تتمثل رؤيتي في إنشاء منصة تقدم خدمات قانونية فحسب، بل في بناء مرجع قانوني رقمي يضيف قيمة حقيقية للمجتمع القانوني، ويجعل الوصول إلى المعرفة والخدمة الاحترافية أكثر سهولة وكفاءة.",
    ],
    founderName: "عمر رياض بغدادي",
    founderRole: "المحامي والمستشار القانوني · المؤسس",
    founderImageAlt: "المحامي والمستشار القانوني عمر رياض بغدادي، مؤسس كاونسلو",
    ctaEyebrow: "معرفة أوضح. قرار أكثر ثقة.",
    ctaTitle: "ابدأ خطوتك القانونية مع كاونسلو",
    ctaBody:
      "شاركنا مسألتك بسرية، وسيقوم فريق كاونسلو بمراجعتها وتوجيهك إلى المسار القانوني الأنسب.",
    ctaPrimary: "ابدأ استشارة",
    ctaSecondary: "تعرّف على المؤسس",
    home: "الرئيسية",
    pageName: "رؤيتنا",
  },
  en: {
    seoTitle: "Our Vision for Trusted Digital Legal Services | CounselO",
    seoDescription:
      "Discover CounselO's vision, mission and values: building a trusted Arab digital legal reference grounded in experience, technology and confidentiality.",
    seoKeywords:
      "CounselO vision, digital legal platform, Arab legal reference, online legal services, trusted legal consultation, Omar Riyad Al-Baghdadi",
    eyebrow: "Our Vision",
    title: "Law—closer, clearer, and more trustworthy",
    lead:
      "Legal services are no longer confined to traditional offices or geographic borders. As technology advances and the needs of people and businesses grow, access to accurate legal knowledge and professional service has become essential—not optional.",
    intro:
      "CounselO was created for that reality: a digital legal platform that brings professional experience and modern technology together, delivering legal knowledge and services to high standards of quality, confidentiality, and professionalism.",
    trust: [
      { stat: "30+", label: "Years of legal experience" },
      { stat: "Digital", label: "Access beyond borders" },
      { stat: "Arabic · English", label: "Multilingual legal support" },
    ],
    whyEyebrow: "Why CounselO was created",
    whyTitle: "Solving real legal-service challenges with practical experience",
    whyBody:
      "Across more than three decades of legal practice, CounselO's founder saw the same barriers facing people who needed legal help. The platform was therefore built around knowledge and professionalism first.",
    challenges: [
      "Difficulty finding reliable legal information in clear language.",
      "Inconsistent service quality and professional standards.",
      "Lengthy processes and limited communication with clients.",
      "Legal services that underuse modern technology.",
    ],
    visionLabel: "Our vision",
    visionTitle: "The Arab world's most trusted digital legal reference",
    visionBody:
      "To make CounselO the platform where specialized legal knowledge and professional legal services meet—keeping pace with technology while delivering the highest standards of quality, confidentiality, and accessibility.",
    missionLabel: "Our mission",
    missionTitle: "Experience, precision, and technology for better legal decisions",
    missionBody:
      "To provide integrated legal services grounded in experience, accuracy, and technology, with an unwavering commitment to professional standards—helping individuals and businesses reach reliable legal solutions efficiently and easily.",
    valuesEyebrow: "What we believe",
    valuesTitle: "Values that govern every insight and service we provide",
    valuesBody:
      "These are not words on a wall. They are working standards reflected in how we protect client information, form legal opinions, communicate, and improve the service experience.",
    values: [
      { title: "Professionalism", description: "A clear method and consistent standards at every stage.", icon: BriefcaseBusiness },
      { title: "Integrity", description: "Independent, candid advice focused on the client's interests.", icon: Scale },
      { title: "Confidentiality", description: "Strict protection of information and professional privacy.", icon: LockKeyhole },
      { title: "Precision", description: "Careful research and verified detail before guidance is given.", icon: Target },
      { title: "Innovation", description: "Technology used purposefully to improve access and service.", icon: Lightbulb },
      { title: "Continuous improvement", description: "Knowledge that evolves with law, practice, and technology.", icon: Sparkles },
      { title: "Respect for clients", description: "Clear communication, valued time, and a human experience.", icon: UserRoundCheck },
      { title: "Professional responsibility", description: "Careful ownership of every legal opinion and action.", icon: ShieldCheck },
    ] as ValueItem[],
    ecosystemEyebrow: "What makes CounselO different",
    ecosystemTitle: "More than a consultation-booking platform",
    ecosystemBody:
      "CounselO is a digital legal ecosystem designed to support individuals and businesses from initial understanding through to specialized legal solutions.",
    ecosystem: [
      { title: "Specialized legal knowledge", description: "Articles, studies, and practical guides in clear language.", icon: BookOpen },
      { title: "Remote consultations", description: "Flexible professional access wherever the client is.", icon: Globe2 },
      { title: "Business solutions", description: "Legal support for companies, founders, and investors.", icon: BriefcaseBusiness },
      { title: "Litigation and arbitration", description: "Experience in disputes and legal representation.", icon: Scale },
      { title: "Templates and guides", description: "Practical resources for understanding and preparation.", icon: Waypoints },
      { title: "Multilingual support", description: "Legal service that crosses language and location barriers.", icon: Languages },
      { title: "Technology-enabled experience", description: "Modern tools that improve speed, clarity, and follow-up.", icon: Sparkles },
    ] as EcosystemItem[],
    founderEyebrow: "A word from the founder",
    founderQuote:
      "A lawyer's strength is measured not only by the ability to win cases, but by the ability to build trust, share knowledge, and find solutions before disputes arise.",
    founderParagraphs: [
      "When I began my legal career more than thirty years ago, I came to believe that meaningful legal service starts with understanding and trust—not procedure alone.",
      "Today, CounselO extends that conviction: a project that puts legal experience and technology to work for individuals and businesses, with quality and reliability as the first measure of everything it provides.",
      "My vision is not simply to create another legal-services platform. It is to build a digital legal reference that brings real value to the legal community and makes professional knowledge and service easier and more efficient to access.",
    ],
    founderName: "Omar Riyad Al-Baghdadi",
    founderRole: "Lawyer & Legal Counsel · Founder",
    founderImageAlt: "Lawyer and Legal Counsel Omar Riyad Al-Baghdadi, founder of CounselO",
    ctaEyebrow: "Clearer knowledge. More confident decisions.",
    ctaTitle: "Take your next legal step with CounselO",
    ctaBody:
      "Share your matter confidentially. The CounselO team will review it and guide you toward the most appropriate legal path.",
    ctaPrimary: "Start a consultation",
    ctaSecondary: "Meet the founder",
    home: "Home",
    pageName: "Our Vision",
  },
} as const;

export default function Vision() {
  const { isRTL } = useLanguage();
  const { region, regionPrefix } = useRegion();
  const c = isRTL ? copy.ar : copy.en;
  const languageCode = isRTL
    ? region === "syr"
      ? "ar-SY"
      : "ar-SA"
    : region === "syr"
      ? "en-SY"
      : "en-SA";
  const pageUrl = `https://counselo-legal.com${regionPrefix}/vision`;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: c.pageName,
      description: c.seoDescription,
      inLanguage: languageCode,
      dateModified: "2026-07-18",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://counselo-legal.com/#website",
        name: "CounselO",
        url: "https://counselo-legal.com/",
      },
      about: { "@id": "https://counselo-legal.com/#organization" },
      author: { "@id": "https://counselo-legal.com/#founder" },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["#vision-title", "#vision-summary", "#founder-statement"],
      },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://counselo-legal.com/#organization",
      name: "CounselO",
      alternateName: "كاونسلو",
      url: "https://counselo-legal.com/",
      logo: "https://counselo-legal.com/logo.png",
      slogan: isRTL
        ? "القانون… أقرب، أوضح، وأكثر موثوقية"
        : "Law—closer, clearer, and more trustworthy",
      founder: { "@id": "https://counselo-legal.com/#founder" },
      knowsLanguage: ["ar", "en"],
      areaServed: {
        "@type": "Country",
        name: region === "syr" ? "Syria" : "Saudi Arabia",
      },
      email: "info@counselo-legal.com",
      telephone: "+966594850247",
      sameAs: ["https://www.linkedin.com/in/lawyeromarbaghdadi/"],
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://counselo-legal.com/#founder",
      name: "Omar Riyad Al-Baghdadi",
      alternateName: "عمر رياض بغدادي",
      jobTitle: isRTL ? "محامٍ ومستشار قانوني" : "Lawyer & Legal Counsel",
      image: "https://counselo-legal.com/omar-baghdadi.jpg",
      worksFor: { "@id": "https://counselo-legal.com/#organization" },
      sameAs: ["https://www.linkedin.com/in/lawyeromarbaghdadi/"],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: c.home,
          item: `https://counselo-legal.com${regionPrefix}`,
        },
        { "@type": "ListItem", position: 2, name: c.pageName, item: pageUrl },
      ],
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <SEOHead
        title={c.seoTitle}
        description={c.seoDescription}
        canonical="/vision"
        keywords={c.seoKeywords}
        schema={schema}
      />

      <main className="bg-white">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
          <nav aria-label="Breadcrumb" className="mb-12 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href={regionPrefix} className="transition-colors hover:text-primary">{c.home}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-foreground">{c.pageName}</span>
          </nav>

          <article aria-labelledby="vision-title">
            <p className="text-sm font-semibold text-primary">{c.eyebrow}</p>
            <h1 id="vision-title" className="mt-4 text-balance font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              {c.title}
            </h1>
            <div id="vision-summary" className="mt-8 space-y-6 text-lg leading-9 text-foreground/75">
              <p>{c.lead}</p>
              <p>{c.intro}</p>
              <p>{c.whyBody}</p>
            </div>

            <section aria-labelledby="vision-statement-title" className="mt-12 border-s-2 border-primary ps-6">
              <h2 id="vision-statement-title" className="font-serif text-2xl font-bold leading-snug text-foreground sm:text-3xl">
                {c.visionTitle}
              </h2>
              <p className="mt-5 text-lg leading-9 text-foreground/75">{c.visionBody}</p>
            </section>
          </article>

          <article className="mt-16 border-t border-border pt-14" aria-labelledby="founder-message-title">
            <p className="text-sm font-semibold text-primary">{c.founderEyebrow}</p>
            <h2 id="founder-message-title" className="sr-only">{c.founderEyebrow}</h2>
            <blockquote id="founder-statement" className="mt-6 font-serif text-2xl font-bold leading-relaxed text-foreground sm:text-3xl">
              “{c.founderQuote}”
            </blockquote>
            <div className="mt-8 space-y-5 text-base leading-8 text-foreground/70 sm:text-lg sm:leading-9">
              {c.founderParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <footer className="mt-9">
              <p className="font-semibold text-foreground">{c.founderName}</p>
              <p className="mt-1 text-sm text-muted-foreground">{c.founderRole}</p>
            </footer>
          </article>
        </div>
      </main>
    </div>
  );
}
