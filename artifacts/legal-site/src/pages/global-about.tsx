import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import {
  BAGHDADI_LAW_PROFILE_URL,
  COUNSELO_ABOUT_PATHS,
  COUNSELO_ENTITY_IDS,
  COUNSELO_ORGANIZATION,
  COUNSELO_WEBSITE,
  ENTITY_BASE_URL,
  OMAR_AL_BAGHDADI,
  OMAR_OFFICIAL_PROFILE_URL,
  OMAR_PORTRAIT,
} from "@workspace/api-zod/browser";
import { SEOHead } from "@/components/seo/SEOHead";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";
import "@/components/about/about.css";

const jurisdictions = [
  { id: "sa", en: "Saudi Arabia", ar: "المملكة العربية السعودية" },
  { id: "syr", en: "Syria", ar: "سوريا" },
  { id: "uae", en: "United Arab Emirates", ar: "الإمارات العربية المتحدة" },
] as const;

const copy = {
  en: {
    breadcrumb: "Breadcrumb",
    home: "Home",
    title: "About Us",
    heading: "About CounselO Legal",
    description: "Meet CounselO Legal, an online legal platform founded by Omar Al-Baghdadi and serving Saudi Arabia, Syria and the UAE in Arabic and English.",
    intro: "CounselO Legal is an online legal platform founded by lawyer and legal counsel Omar Al-Baghdadi. Our team serves clients with matters in Saudi Arabia, Syria and the United Arab Emirates, in Arabic and English.",
    countryHeading: "Meet the team by jurisdiction",
    networkHeading: "How the team works",
    network: "Our team includes locally licensed lawyers and law offices. You can start with an online consultation, then agree any document review, drafting, negotiation or representation your matter needs. The lawyers authorised in the relevant jurisdiction handle any agreed court or authority work.",
    engagementHeading: "Who handles your matter",
    engagement: "Before work begins, we confirm the responsible lawyer or law office, the scope of work, the fees and any authorisation needed for representation.",
    firm: "Al-Baghdadi Law Firm is a member of the team in Syria and maintains its own practice and professional identity.",
    firmLink: "About Al-Baghdadi Law Firm",
    founder: "Omar Al-Baghdadi",
    founderRole: "Founder, lawyer and legal counsel",
    founderText: "Omar provides professional direction and reviews legal analysis. His legal practice began in 1996 after graduating from the Faculty of Law at Damascus University.",
    profile: "Read Omar Al-Baghdadi’s professional profile",
    imageAlt: "Omar Al-Baghdadi, founder of CounselO Legal",
    email: "Email CounselO Legal",
    work: "Explore our published work",
    logoAlt: "CounselO Legal logo",
  },
  ar: {
    breadcrumb: "مسار التنقل",
    home: "الرئيسية",
    title: "من نحن",
    heading: "عن كاونسلو للاستشارات القانونية",
    description: "تعرّف على كاونسلو للاستشارات القانونية، منصة قانونية أونلاين أسسها المحامي عمر البغدادي وتخدم السعودية وسوريا والإمارات بالعربية والإنجليزية.",
    intro: "كاونسلو للاستشارات القانونية منصة قانونية أونلاين أسسها المحامي والمستشار القانوني عمر البغدادي. يخدم فريقنا العملاء في المسائل المرتبطة بالسعودية وسوريا والإمارات العربية المتحدة، بالعربية والإنجليزية.",
    countryHeading: "تعرّف على الفريق بحسب الدولة",
    networkHeading: "كيف يعمل الفريق",
    network: "يضم فريقنا محامين ومكاتب محاماة مرخّصين محلياً. يمكنك البدء باستشارة أونلاين، ثم الاتفاق على ما تحتاج إليه من مراجعة مستندات أو صياغة أو تفاوض أو تمثيل. ويتولى المحامون المخوّلون في الاختصاص المعني العمل المتفق عليه أمام المحاكم والجهات المختصة.",
    engagementHeading: "من يتولى مسألتك القانونية",
    engagement: "قبل بدء العمل، نؤكد لك اسم المحامي أو مكتب المحاماة المسؤول، ونطاق العمل والأتعاب، وأي تفويض يلزم للتمثيل.",
    firm: "يضمّ فريقنا في سوريا مكتب البغدادي للمحاماة، الذي يمارس أعماله بهويته المهنية المستقلة.",
    firmLink: "عن مكتب البغدادي للمحاماة",
    founder: "عمر البغدادي",
    founderRole: "المؤسس، محامٍ ومستشار قانوني",
    founderText: "يتولى عمر التوجيه المهني ومراجعة التحليلات القانونية. وبدأ ممارسة المحاماة عام 1996 بعد تخرجه في كلية الحقوق بجامعة دمشق.",
    profile: "اطّلع على الملف المهني لعمر البغدادي",
    imageAlt: "عمر البغدادي، مؤسس كاونسلو للاستشارات القانونية",
    email: "راسل كاونسلو للاستشارات القانونية",
    work: "اطّلع على أعمالنا المنشورة",
    logoAlt: "شعار كاونسلو للاستشارات القانونية",
  },
} as const;

export default function GlobalAbout() {
  const { lang, isRTL } = useLanguage();
  const c = copy[lang];
  const localePrefix = isRTL ? "/ar" : "";
  const homePath = localePrefix || "/";
  const canonical = COUNSELO_ABOUT_PATHS[lang];
  const url = `${ENTITY_BASE_URL}${canonical}`;
  const breadcrumbId = `${url}#breadcrumb`;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const schema = [
    { "@context": "https://schema.org", ...COUNSELO_ORGANIZATION },
    { "@context": "https://schema.org", ...COUNSELO_WEBSITE },
    { "@context": "https://schema.org", ...OMAR_AL_BAGHDADI },
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": `${url}#webpage`,
      url,
      name: c.heading,
      description: c.description,
      inLanguage: lang,
      isPartOf: { "@id": COUNSELO_ENTITY_IDS.website },
      mainEntity: { "@id": COUNSELO_ENTITY_IDS.organization },
      breadcrumb: { "@id": breadcrumbId },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: c.home, item: `${ENTITY_BASE_URL}${homePath}` },
        { "@type": "ListItem", position: 2, name: c.title, item: url },
      ],
    },
  ];

  return (
    <div className="about-platform-page" dir={isRTL ? "rtl" : "ltr"}>
      <SEOHead
        title={c.title}
        description={c.description}
        canonical={canonical}
        noRegionPrefix
        sharedLanguageAlternates={COUNSELO_ABOUT_PATHS}
        contentLanguage={lang}
        ogImageUrl={`${ENTITY_BASE_URL}/og-image.png`}
        ogImageAlt={c.logoAlt}
        schema={schema}
      />

      <Breadcrumb className="about-shell py-3" aria-label={c.breadcrumb}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild><Link href={homePath}>{c.home}</Link></BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className={isRTL ? "rotate-180" : undefined} />
          <BreadcrumbItem><BreadcrumbPage>{c.title}</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="about-hero" aria-labelledby="global-about-title">
        <div className="about-shell about-hero__grid">
          <div>
            <h1 id="global-about-title">{c.heading}</h1>
            <p className="about-hero__lead">{c.intro}</p>
            <div className="about-actions">
              <a className="about-button about-button--gold" href="mailto:info@counselo-legal.com">{c.email}<Arrow size={18} aria-hidden="true" /></a>
              <Link className="about-hero__services" href={`${localePrefix}/our-work`}>{c.work}<Arrow size={18} aria-hidden="true" /></Link>
            </div>
          </div>
          <nav className="about-hero__promise" aria-labelledby="global-about-countries">
            <h2 id="global-about-countries">{c.countryHeading}</h2>
            <ul>
              {jurisdictions.map((country) => (
                <li key={country.id}>
                  <Link className="about-hero__services" href={`/${country.id}${localePrefix}/about`}>
                    {country[lang]}<Arrow size={17} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section className="about-story about-shell" aria-labelledby="global-about-network">
        <header className="about-story__intro">
          <h2 id="global-about-network">{c.networkHeading}</h2>
          <div><p>{c.network}</p></div>
        </header>
        <div className="about-story__row">
          <h3>{c.engagementHeading}</h3>
          <div>
            <p>{c.engagement}</p>
            <p>{c.firm}</p>
            <a className="about-text-link" href={isRTL ? "https://www.baghdadilaw.co/ar/who-we-are" : BAGHDADI_LAW_PROFILE_URL}>
              {c.firmLink}<Arrow size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="about-founder" aria-labelledby="global-about-founder">
        <div className="about-shell about-founder__grid">
          <div className="about-founder__portrait">
            <img src="/omar-baghdadi.jpg" alt={c.imageAlt} width={OMAR_PORTRAIT.width} height={OMAR_PORTRAIT.height} loading="lazy" decoding="async" />
          </div>
          <div>
            <h2 id="global-about-founder">{c.founder}</h2>
            <p className="about-founder__role">{c.founderRole}</p>
            <p>{c.founderText}</p>
            <a className="about-text-link" href={`${OMAR_OFFICIAL_PROFILE_URL}${localePrefix}`}>
              {c.profile}<Arrow size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
