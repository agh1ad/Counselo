type Region = "sa" | "syr" | "uae";
type Language = "en" | "ar";
type Section = "home" | "services" | "contact" | "about";

const COUNTRIES: Record<Region, Record<Language, string>> = {
  sa: { en: "Saudi Arabia", ar: "السعودية" },
  syr: { en: "Syria", ar: "سوريا" },
  uae: { en: "the UAE", ar: "الإمارات" },
};

/** Core section identities follow the public navigation; service leaves keep their own metadata. */
export function siteSectionMeta(path: string) {
  const match = path.match(/^\/(sa|syr|uae)(\/ar)?(?:\/(services|contact|about))?$/);
  if (!match) return undefined;
  const region = match[1] as Region;
  const language: Language = match[2] ? "ar" : "en";
  const section = (match[3] ?? "home") as Section;
  const country = COUNTRIES[region][language];
  const ar = language === "ar";
  const sectionLabels: Record<Section, string> = ar
    ? { home: "الرئيسية", services: "الخدمات", contact: "تواصل معنا", about: "من نحن" }
    : { home: "Home", services: "Services", contact: "Contact Us", about: "About Us" };
  const titles: Record<Section, string> = ar ? {
    home: `استشارات أونلاين وتمثيل قانوني في ${country} | كاونسلو`,
    services: `الخدمات القانونية في ${country} | كاونسلو`,
    contact: `تواصل معنا أونلاين | كاونسلو في ${country}`,
    about: `من نحن | كاونسلو في ${country}`,
  } : {
    home: `Online Legal Advice & Representation in ${country} | CounselO`,
    services: `Legal Services in ${country} | CounselO Legal`,
    contact: `Contact Us Online | CounselO Legal in ${country}`,
    about: `About Us | CounselO Legal in ${country}`,
  };
  const descriptions: Record<Section, string> = ar ? {
    home: `استشر فريق كاونسلو أونلاين في ${country} وراجع مستنداتك وتابع ملفك من منزلك. فريق واحد من الاستشارة والعقود إلى التمثيل القانوني ومتابعة الإجراءات.`,
    services: `خدمات كاونسلو في ${country}: استشارات ومراجعة عقود أونلاين، وتفاوض وتمثيل قانوني ضمن الفريق نفسه. تواصل وتابع ملفك عن بُعد بالعربية أو الإنجليزية.`,
    contact: `تواصل أونلاين مع فريق كاونسلو في ${country} للاستشارة والعقود والتمثيل القانوني. شارك مسألتك ومستنداتك عن بُعد؛ نتفق على العمل والأتعاب قبل البدء.`,
    about: `تعرّف على فريق كاونسلو المكوّن من محامين ومكاتب مرخّصة في ${country}. استشارات ومراجعة مستندات ومتابعة أونلاين وتمثيل قانوني مع الفريق نفسه.`,
  } : {
    home: `Consult online in ${country}, share documents and follow your matter from home. The same CounselO team handles your advice, legal work and representation.`,
    services: `CounselO’s services in ${country}: online advice and contract review, negotiation and legal representation. Stay with one team and follow your matter remotely.`,
    contact: `Contact CounselO online in ${country} for advice, contracts and representation. Share your documents remotely and stay with our team through the agreed work.`,
    about: `Meet CounselO’s team of licensed lawyers and law offices in ${country}. Online advice, document review and representation with one team.`,
  };
  return { title: titles[section], description: descriptions[section], label: sectionLabels[section], section, region, language };
}
