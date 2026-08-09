import { Link } from "wouter";
import { ArrowRight, Mail, BookOpen, Landmark, Building2, Mountain, Globe2, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion, type Region } from "@/contexts/RegionContext";
import { JurisdictionDisclosure } from "@/components/legal/JurisdictionDisclosure";

const brandMark = "/images/optimized/counselo-footer-logo.png";

const regionalFooterContent: Record<Region, {
  map: string;
  label: { en: string; ar: string };
  heading: { en: string; ar: string };
  description: { en: string; ar: string };
  jurisdictions: { en: readonly [typeof BookOpen, string][]; ar: readonly [typeof BookOpen, string][] };
}> = {
  uae: {
    map: "/images/optimized/uae-jurisdiction-map.svg?v=20260802-accurate-outline",
    label: { en: "UAE", ar: "الإمارات" },
    heading: { en: "UAE-wide perspective. Precise jurisdictional thinking.", ar: "منظور يشمل دولة الإمارات. تفكير دقيق في الاختصاص." },
    description: { en: "Federal legislation sits alongside emirate-level authorities, mainland courts and common-law financial free zones. We identify the rules and forum that matter before you act.", ar: "تعمل التشريعات الاتحادية إلى جانب الجهات المحلية ومحاكم البرّ الرئيسي والمناطق الحرة المالية. نحدد القواعد والمنتدى المختص قبل اتخاذ الخطوة التالية." },
    jurisdictions: {
      en: [[BookOpen, "UAE federal framework"], [Landmark, "Abu Dhabi & ADGM"], [Building2, "Dubai & DIFC"], [Mountain, "Northern Emirates"], [Globe2, "Mainland & free zones"]],
      ar: [[BookOpen, "الإطار الاتحادي الإماراتي"], [Landmark, "أبوظبي وأبوظبي العالمي"], [Building2, "دبي ومركز دبي المالي"], [Mountain, "الإمارات الشمالية"], [Globe2, "البرّ الرئيسي والمناطق الحرة"]],
    },
  },
  sa: {
    map: "/images/optimized/saudi-jurisdiction-map.svg",
    label: { en: "SAUDI ARABIA", ar: "السعودية" },
    heading: { en: "Kingdom-wide perspective. Precise Saudi legal thinking.", ar: "منظور يشمل المملكة. تفكير قانوني سعودي دقيق." },
    description: { en: "Saudi legislation, Sharia principles and specialised judicial forums shape every matter. We identify the competent court, authority and enforcement route from the outset.", ar: "تتكامل الأنظمة السعودية والمبادئ الشرعية والجهات القضائية المتخصصة في كل مسألة. نحدد المحكمة والجهة ومسار التنفيذ المختص منذ البداية." },
    jurisdictions: {
      en: [[BookOpen, "Saudi legislation & Sharia"], [Landmark, "Ministry of Justice courts"], [Building2, "Commercial & labour courts"], [Mountain, "Board of Grievances"], [Globe2, "SCCA & enforcement"]],
      ar: [[BookOpen, "الأنظمة السعودية والمبادئ الشرعية"], [Landmark, "محاكم وزارة العدل"], [Building2, "المحاكم التجارية والعمالية"], [Mountain, "ديوان المظالم"], [Globe2, "المركز السعودي والتنفيذ"]],
    },
  },
  syr: {
    map: "/images/optimized/syria-jurisdiction-map.svg",
    label: { en: "SYRIA", ar: "سوريا" },
    heading: { en: "Syria-wide perspective. Precise civil-law analysis.", ar: "منظور يشمل سوريا. تحليل دقيق للقانون المدني." },
    description: { en: "Syrian codes, specialised courts and administrative authorities require careful forum analysis. We connect the applicable law, procedure and competent authority before advising.", ar: "تتطلب القوانين السورية والمحاكم المتخصصة والجهات الإدارية تحليلاً دقيقاً للاختصاص. نربط القانون والإجراء والجهة المختصة قبل تقديم المشورة." },
    jurisdictions: {
      en: [[BookOpen, "Syrian civil-law framework"], [Landmark, "Civil & commercial courts"], [Building2, "Personal status courts"], [Mountain, "Council of State"], [Globe2, "Arbitration & enforcement"]],
      ar: [[BookOpen, "إطار القانون المدني السوري"], [Landmark, "المحاكم المدنية والتجارية"], [Building2, "محاكم الأحوال الشخصية"], [Mountain, "مجلس الدولة"], [Globe2, "التحكيم والتنفيذ"]],
    },
  },
};

const globalFooterContent = {
  map: "/images/optimized/counselo-platform-line-art-v1.png",
  label: { en: "GLOBAL INSIGHTS", ar: "رؤى عالمية" },
  heading: { en: "One publication. Jurisdiction-specific legal analysis.", ar: "منصة واحدة. تحليل قانوني محدد الاختصاص." },
  description: { en: "CounselO's shared legal publication covers UAE, Saudi and Syrian law. Every country-specific article identifies the legal system it addresses.", ar: "تغطي منصة كاونسلو المشتركة قوانين الإمارات والسعودية وسوريا، ويحدد كل مقال خاص بدولة النظام القانوني الذي يتناوله." },
  jurisdictions: {
    en: [[BookOpen, "Shared legal publication"], [Landmark, "United Arab Emirates"], [Building2, "Saudi Arabia"], [Mountain, "Syria"], [Globe2, "Arabic & English"]] as const,
    ar: [[BookOpen, "منصة قانونية مشتركة"], [Landmark, "الإمارات العربية المتحدة"], [Building2, "المملكة العربية السعودية"], [Mountain, "سوريا"], [Globe2, "العربية والإنجليزية"]] as const,
  },
};

export function Footer() {
  const { t, lang } = useLanguage();
  const { region, regionPrefix, isSharedPath } = useRegion();
  const isArabic = lang === "ar";
  const f = t.footer;
  const regional = isSharedPath ? globalFooterContent : regionalFooterContent[region];
  const p = (path: string) => regionPrefix + path;
  const workPath = isArabic ? "/ar/our-work" : "/our-work";
  const regionPickerPath = isArabic ? "/ar" : "/";
  const brandName = isArabic ? "كاونسلو" : "CounselO";

  return (
    <footer className={`uae-reference-footer regional-reference-footer region-reference-footer--${region}`}>
      <section className="uae-reference-footer__perspective">
        <div className="uae-reference-footer__line" aria-hidden="true" />
        <div className="uae-reference-footer__perspective-copy">
          <h2>{regional.heading[lang]}</h2>
          <p>{regional.description[lang]}</p>
        </div>
        <div className="uae-reference-footer__map">
          <img src={regional.map} alt="" width="620" height="440" loading="lazy" decoding="async" />
        </div>
        <ul className="uae-reference-footer__jurisdictions">
          {regional.jurisdictions[lang].map(([Icon, label]) => <li key={label}><Icon aria-hidden="true" /><span>{label}</span></li>)}
        </ul>
      </section>

      {!isSharedPath && <JurisdictionDisclosure jurisdiction={region} compact />}

      <div className="uae-reference-footer__main">
        <div className="uae-reference-footer__brand">
          <Link href={isSharedPath ? regionPickerPath : regionPrefix} className="uae-reference-footer__lockup">
            <img src={brandMark} alt="" width="40" height="40" loading="lazy" decoding="async" />
            <span>{brandName}</span><strong>{regional.label[lang]}</strong>
          </Link>
          <p>{isSharedPath ? regional.description[lang] : f.tagline}</p>
          <p className="mt-3 max-w-md text-xs leading-relaxed text-muted-foreground">
            {isArabic
              ? "كاونسلو منصة إلكترونية للاستشارات القانونية. لا ينشئ التصفح أو الاستشارة وحدهما تفويضاً بالتمثيل؛ ويُحدد أي عمل محلي أو تمثيل مع مهني مرخص ضمن نطاق مستقل."
              : "CounselO is an online legal consultation platform. Browsing or consultation alone does not create a representation mandate; local or reserved work is separately scoped with an appropriately licensed professional."}
          </p>
        </div>
        <nav className="regional-reference-footer__practice" aria-label={isArabic ? "مجالات الممارسة" : "Practice areas"}>
          <h3>{isSharedPath ? (isArabic ? "اختر الاختصاص" : "Choose a jurisdiction") : f.practiceAreasHeading}</h3>
          <div>{isSharedPath ? <>
            <Link href={isArabic ? "/uae/ar" : "/uae"}>{isArabic ? "الإمارات العربية المتحدة" : "United Arab Emirates"}<ArrowRight /></Link>
            <Link href={isArabic ? "/sa/ar" : "/sa"}>{isArabic ? "المملكة العربية السعودية" : "Saudi Arabia"}<ArrowRight /></Link>
            <Link href={isArabic ? "/syr/ar" : "/syr"}>{isArabic ? "سوريا" : "Syria"}<ArrowRight /></Link>
          </> : f.practiceAreaLinks.map((link) => <Link key={link.href} href={regionPrefix + link.href}>{link.label}<ArrowRight /></Link>)}</div>
        </nav>
        <nav aria-label={isArabic ? "روابط سريعة" : "Quick links"}>
          <h3>{f.quickLinksHeading}</h3>
          <Link href={isSharedPath ? regionPickerPath : regionPrefix}>{f.links.home}<ArrowRight /></Link>
          {!isSharedPath && <Link href={p("/services")}>{f.links.allServices}<ArrowRight /></Link>}
          {!isSharedPath && <Link href={p("/about")}>{f.links.about}<ArrowRight /></Link>}
          {!isSharedPath && <Link href={p("/vision")}>{isArabic ? "رؤيتنا" : "Our Vision"}<ArrowRight /></Link>}
          <Link href={workPath}>{f.links.ourWork}<ArrowRight /></Link>
          <Link href="/blog">{f.links.blog}<ArrowRight /></Link>
          {!isSharedPath && <Link href={p("/contact")}>{f.links.contact}<ArrowRight /></Link>}
          {!isSharedPath && <Link href={p("/contact")}>{f.links.book}<ArrowRight /></Link>}
          <Link href={regionPickerPath}>{isArabic ? "اختيار الدولة" : "Choose Region"}<Globe2 /></Link>
        </nav>
        <div className="uae-reference-footer__contact">
          <h3>{isSharedPath ? (isArabic ? "كاونسلو العالمية" : "CounselO Global") : f.contactHeading}</h3>
          <span><Landmark aria-hidden="true" /><span className="whitespace-pre-line">{isSharedPath ? (isArabic ? "اختر الدولة للوصول إلى الخدمات ومعلومات التواصل الخاصة بالاختصاص." : "Choose a country for jurisdiction-specific services and contact details.") : f.address}</span></span>
          {!isSharedPath && <a href={`tel:${f.phone.replace(/[^+\d]/g, "")}`}><MessageCircle aria-hidden="true" /><span dir="ltr">{f.phone}</span></a>}
          <a href={`mailto:${f.email}`}><Mail aria-hidden="true" />{f.email}</a>
        </div>
      </div>
      <div className="uae-reference-footer__bottom">
        <span>&copy; {new Date().getFullYear()} {brandName}. {f.copyright}</span>
        <div><Link href={regionPickerPath}>{isArabic ? "اختيار الدولة" : "Region Picker"}</Link>{!isSharedPath && <><i /> <Link href={p("/privacy-policy")}>{f.privacy}</Link><i /> <Link href={p("/terms-of-service")}>{f.terms}</Link></>}</div>
      </div>
    </footer>
  );
}
