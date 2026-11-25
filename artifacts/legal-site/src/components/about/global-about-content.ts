import { aboutContent } from "./about-content";

export {
  SAUDI_PARTNER_LICENCE,
  SAUDI_LAWYER_DIRECTORY,
  syrianPartners,
  aboutRegions,
  regionalCredentialLookup,
} from "./about-content";

export const ABOUT_UPDATED = "2026-11-25";
export const GLOBAL_ABOUT_JURISDICTIONS = ["sa", "syr", "uae"] as const;

// Keep the original About copy and structure shared with the regional pages.
// These additions adapt only the global scope and all-country team presentation.
export const globalAboutContent = {
  en: {
    ...aboutContent.en,
    description: "Meet CounselO Legal: an experienced team in Saudi Arabia, Syria and the UAE, providing online consultation, contracts, negotiation and representation across 25 fields of law.",
    globalFocus: "Our team works across 25 fields of law, from family, employment and property matters to companies, commercial disputes and investment. We support clients in Saudi Arabia, Syria and the UAE, including those managing matters from abroad. Where a matter crosses borders, we coordinate its evidence, legal analysis and next steps, with locally licensed team members responsible for proceedings in the relevant country.",
    founderExperience: "His 30+ years of legal practice began in 1996 and include commercial disputes, contract drafting, arbitration and cross-border matters. His responsibilities at CounselO include professional direction, reviewing legal analysis and supporting the team’s development through training and supervision.",
    countriesTitle: "Our CounselO team in Saudi Arabia, Syria and the UAE",
    countriesIntro: "Our licensed lawyers and law offices bring their local experience to one CounselO team. We connect advice, preparation and representation, with the responsible professionals handling the agreed work in each country and keeping you informed online.",
    countryContactLink: "Choose the country for your matter",
    countryServicesLink: "Explore services by country",
  },
  ar: {
    ...aboutContent.ar,
    description: "تعرّف على كاونسلو للاستشارات القانونية: فريق متمرس في السعودية وسوريا والإمارات يقدم الاستشارة أونلاين والعقود والتفاوض والتمثيل في 25 مجالاً قانونياً.",
    globalFocus: "يمتد عمل فريقنا إلى 25 مجالاً قانونياً، من شؤون الأسرة والعمل والعقارات إلى الشركات والمنازعات التجارية والاستثمار. نخدم العملاء في السعودية وسوريا والإمارات، بمن فيهم من يتابعون مسائلهم من الخارج. وإذا ارتبطت المسألة بأكثر من دولة، ننسق دراسة الأدلة والتحليل القانوني والخطوات التالية، ويتولى أعضاء الفريق المرخصون محلياً الإجراءات في الدولة المعنية.",
    founderExperience: "تتجاوز خبرته في الممارسة القانونية 30 عاماً، منذ بدايته المهنية عام 1996، وتشمل المنازعات التجارية وصياغة العقود والتحكيم والمسائل العابرة للحدود. وتشمل مسؤولياته في كاونسلو التوجيه المهني ومراجعة التحليل القانوني ودعم التطوير المهني للفريق بالتدريب والإشراف.",
    countriesTitle: "فريق كاونسلو في السعودية وسوريا والإمارات",
    countriesIntro: "يجمع فريق كاونسلو محامين ومكاتب محاماة مرخّصة يضعون خبرتهم المحلية ضمن عمل مشترك. نربط المشورة بالإعداد والتمثيل، ويتولى المهنيون المسؤولون العمل المتفق عليه في كل دولة، مع إطلاعك على المستجدات أونلاين.",
    countryContactLink: "اختر الدولة المرتبطة بمسألتك",
    countryServicesLink: "استكشف خدماتنا بحسب الدولة",
  },
} as const;
