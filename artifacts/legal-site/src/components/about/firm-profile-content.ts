import { SAUDI_LAWYER_DIRECTORY } from "./about-content";

// Firm identity and team membership are confirmed by CounselO Legal.
// The Saudi Bar Association's firm record is https://eservice.sba.gov.sa/en/directory/855.
export const firmProfileContent = {
  alAnzi: {
    en: {
      location: "Dammam and Jubail, Saudi Arabia",
      lead: "Abdullah Al-Anzi Law Office has two offices in Saudi Arabia’s Eastern Province, one in Dammam and one in Jubail. The firm and its licensed lawyers are members of CounselO Legal’s Saudi team.",
      sections: [
        {
          title: "The Saudi Bar Association record",
          text: "The Saudi Bar Association lists the practice as Abdullah Moghthi Qaid Al-Anazi Law Firm and identifies Dammam as the seat of its main office.",
          source: { href: SAUDI_LAWYER_DIRECTORY.en, label: "View Abdullah Al-Anzi’s Saudi Bar Association record" },
        },
      ],
    },
    ar: {
      location: "الدمام والجبيل، المملكة العربية السعودية",
      lead: "لمكتب المحامي عبدالله العنزي مقرّان في المنطقة الشرقية، أحدهما في الدمام والآخر في الجبيل. وينتمي المكتب ومحاموه المرخّصون إلى فريق كاونسلو للاستشارات القانونية في المملكة العربية السعودية.",
      sections: [
        {
          title: "هوية المكتب في السجل المهني",
          text: "يرد المكتب في دليل الهيئة السعودية للمحامين باسمه الكامل «مكتب عبدالله مغثي قاعد العنزي للمحاماة»، ويتّخذ من الدمام مقراً رئيسياً له.",
          source: { href: SAUDI_LAWYER_DIRECTORY.ar, label: "سجل المحامي عبدالله العنزي لدى الهيئة السعودية للمحامين" },
        },
      ],
    },
  },
  alAbdullah: {
    en: {
      location: "Damascus, Syria",
      lead: "Omar Al-Abdullah Law Office is an established Syrian law firm based in Damascus. Omar Al-Abdullah and the licensed Syrian lawyers who practise alongside him form a member firm of CounselO Legal.",
      sections: [
        {
          title: "A Damascus firm within CounselO",
          text: "The Damascus office brings the experience of its own lawyers to a regional team with colleagues in Saudi Arabia and the United Arab Emirates.",
        },
      ],
    },
    ar: {
      location: "دمشق، سوريا",
      lead: "مكتب المحامي عمر العبد الله مكتب محاماة سوري قائم في دمشق. وينتمي عمر العبد الله وزملاؤه من المحامين السوريين المرخّصين العاملين معه إلى فريق كاونسلو للاستشارات القانونية.",
      sections: [
        {
          title: "مكتب دمشقي ضمن فريق كاونسلو",
          text: "يُسهم مكتب دمشق بخبرات محاميه في فريق إقليمي يجمعهم بزملائهم في المملكة العربية السعودية والإمارات.",
        },
      ],
    },
  },
  alBaghdadi: {
    en: {
      location: "Syria",
      lead: "Riyad Al-Baghdadi founded the firm in 1957. Today his son Omar leads a regional practice rooted in the Syrian legal profession, with a network of lawyers and law firms in Syria, Saudi Arabia and the United Arab Emirates.",
      sections: [
        {
          title: "Two generations of lawyers",
          text: "Riyad trained both his sons in the practice he built. Mosef began practising alongside his father in 1983. Omar joined in 1996 after graduating from the Faculty of Law at Damascus University. By 2011 the family practice had expanded beyond Syria.",
        },
        {
          title: "Experience passed on through training",
          text: "The firm’s published history records more than 20,000 cases and legal consultations across two generations. It also records the training and professional supervision of more than 100 lawyers. That experience in developing lawyers is part of what the firm brings to the CounselO Legal team.",
          source: { href: "https://www.baghdadilaw.co/who-we-are", label: "The firm’s published history" },
        },
      ],
    },
    ar: {
      location: "سوريا",
      lead: "أسّس المحامي رياض البغدادي المكتب عام 1957. ويقوده اليوم ابنه المحامي عمر البغدادي، محتفظاً بجذوره في المحاماة السورية وبعلاقات مهنية تجمعه بمحامين ومكاتب محاماة في سوريا والسعودية والإمارات العربية المتحدة.",
      sections: [
        {
          title: "جيلان من المحامين",
          text: "تدرّب مسعف وعمر البغدادي في مكتب والدهما رياض. بدأ مسعف ممارسة المحاماة إلى جانب والده عام 1983، ثم التحق عمر بالمكتب عام 1996 بعد تخرّجه في كلية الحقوق بجامعة دمشق. وبحلول عام 2011 كان نطاق عمل المكتب قد اتّسع ليشمل دولاً أخرى في المنطقة.",
        },
        {
          title: "خبرة في المحاماة وتدريب المحامين",
          text: "بحسب التاريخ الذي نشره المكتب، تجاوز مجموع القضايا والاستشارات القانونية التي تولّاها عبر جيلين عشرين ألفاً، ودرّب وأشرف مهنياً على أكثر من مئة محامٍ. ويحمل محامو المكتب معهم إلى فريق كاونسلو هذه الخبرة المتراكمة في الممارسة والتدريب.",
          source: { href: "https://www.baghdadilaw.co/ar/who-we-are", label: "تاريخ المكتب على موقعه الرسمي" },
        },
      ],
    },
  },
} as const;
