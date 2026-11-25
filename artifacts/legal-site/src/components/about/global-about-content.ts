import { COUNSELO_FIRM_TEAM } from "@workspace/api-zod/browser";
import { aboutContent } from "./about-content";
export { BRAND_PROFILE_UPDATED as ABOUT_UPDATED } from "@/lib/site-content-dates";

export {
  SAUDI_PARTNER_LICENCE,
  SAUDI_LAWYER_DIRECTORY,
  syrianPartners,
  aboutRegions,
  regionalCredentialLookup,
} from "./about-content";

export const GLOBAL_ABOUT_JURISDICTIONS = ["sa", "syr", "uae"] as const;

// Keep the original About copy and structure shared with the regional pages.
// These additions adapt only the global scope and all-country team presentation.
export const globalAboutContent = {
  en: {
    ...aboutContent.en,
    platformTitle: "How CounselO Legal works",
    introduction: "CounselO Legal (كاونسلو للاستشارات القانونية) is the online legal platform founded by lawyer and legal counsel Omar Al-Baghdadi. Its lawyers and law offices in Saudi Arabia, Syria and the UAE work as one team. You can consult in Arabic or English and follow your matter online. When your matter requires court representation, we identify the locally licensed lawyer responsible for that work.",
    description: "Meet CounselO Legal: an experienced team in Saudi Arabia, Syria and the UAE, providing online consultation, contracts, negotiation and representation across 25 fields of law.",
    globalFocus: "Our team works across 25 fields of law, from family, employment and property matters to companies, commercial disputes and investment. We support clients in Saudi Arabia, Syria and the UAE, including those managing matters from abroad. Where a matter crosses borders, we coordinate its evidence, legal analysis and next steps, with locally licensed team members responsible for proceedings in the relevant country.",
    founderExperience: "His 30+ years of legal practice began in 1996 and include commercial disputes, contract drafting, arbitration and cross-border matters. His responsibilities at CounselO include professional direction, reviewing legal analysis and supporting the team’s development through training and supervision.",
    countriesTitle: "Our legal teams by country",
    countriesIntro: COUNSELO_FIRM_TEAM.en,
    countryContactLink: "Choose the country for your matter",
    countryServicesLink: "Explore services by country",
  },
  ar: {
    ...aboutContent.ar,
    platformTitle: "كيف تعمل كاونسلو للاستشارات القانونية؟",
    introduction: "كاونسلو للاستشارات القانونية (CounselO Legal) منصة قانونية أسّسها المحامي والمستشار القانوني عمر البغدادي. يعمل محاموها ومكاتب المحاماة المنضوية فيها في السعودية وسوريا والإمارات ضمن فريق واحد. يمكنك طلب الاستشارة بالعربية أو الإنجليزية ومتابعة مسألتك عن بُعد. وإذا احتجت إلى تمثيل أمام القضاء، نبيّن لك من هو المحامي المرخّص في الدولة المعنية الذي سيتولى تمثيلك.",
    description: "تعرّف على كاونسلو للاستشارات القانونية: فريق متمرس في السعودية وسوريا والإمارات يقدم الاستشارة أونلاين والعقود والتفاوض والتمثيل في 25 مجالاً قانونياً.",
    globalFocus: "يمتد عمل فريقنا إلى 25 مجالاً قانونياً، من شؤون الأسرة والعمل والعقارات إلى الشركات والمنازعات التجارية والاستثمار. نخدم العملاء في السعودية وسوريا والإمارات، بمن فيهم من يتابعون مسائلهم من الخارج. وإذا ارتبطت المسألة بأكثر من دولة، ننسق دراسة الأدلة والتحليل القانوني والخطوات التالية، ويتولى أعضاء الفريق المرخصون محلياً الإجراءات في الدولة المعنية.",
    founderExperience: "تتجاوز خبرته في الممارسة القانونية 30 عاماً، منذ بدايته المهنية عام 1996، وتشمل المنازعات التجارية وصياغة العقود والتحكيم والمسائل العابرة للحدود. وتشمل مسؤولياته في كاونسلو التوجيه المهني ومراجعة التحليل القانوني ودعم التطوير المهني للفريق بالتدريب والإشراف.",
    countriesTitle: "فرقنا القانونية حسب الدولة",
    countriesIntro: COUNSELO_FIRM_TEAM.ar,
    countryContactLink: "اختر الدولة المرتبطة بمسألتك",
    countryServicesLink: "استكشف خدماتنا بحسب الدولة",
  },
} as const;
