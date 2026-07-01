import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, ArrowLeft, MessageCircle, Mail, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { SEOHead } from "@/components/seo/SEOHead";

export default function CompaniesLawSub() {
  const params = useParams();
  const subId = params.subId as string;
  const { t, isRTL } = useLanguage();
  const { regionPrefix } = useRegion();
  const cld = t.companiesLawDetail;
  const data = cld.services[subId as keyof typeof cld.services];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">{cld.notFound}</h1>
          <Link href={`${regionPrefix}/services/companies-law`} className="text-primary hover:underline">{cld.notFoundLink}</Link>
        </div>
      </div>
    );
  }

  const otherAreas = cld.subAreas.filter((a) => a.id !== subId);

  const SEO_DATA: Record<string, { desc: string; descAr: string; kw: string; kwAr: string }> = {
    "company-formation-disputes": {
      desc: "Company formation disputes & incorporation nullity legal advice in Saudi Arabia. Professional response within 24 hours via WhatsApp or email — CounselO Saudi Arabia.",
      descAr: "استشارة قانونية في منازعات تأسيس الشركة وبطلان التأسيس بالمملكة. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "company formation dispute lawyer Saudi Arabia, incorporation nullity KSA, founding company dispute Saudi, articles of association dispute online",
      kwAr: "محامي منازعات تأسيس شركة السعودية, بطلان تأسيس شركة, نزاع تأسيس شركة, عقد التأسيس, محامي شركات أونلاين",
    },
    "share-equity-disputes": {
      desc: "Share & equity ownership dispute legal advice in Saudi Arabia — LLC quotas, JSC shares, ownership rights. Professional response within 24 hours via WhatsApp or email — CounselO.",
      descAr: "استشارة قانونية في منازعات الحصص والأسهم وملكيتها بالمملكة. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "share ownership dispute lawyer Saudi Arabia, LLC quota dispute KSA, shareholder rights Saudi, share ownership claim online",
      kwAr: "محامي منازعات حصص وأسهم السعودية, نزاع ملكية الحصص, نزاع أسهم شركة, حقوق المساهمين, استشارة حصص أونلاين",
    },
    "partner-shareholder-disputes": {
      desc: "Partner & shareholder dispute legal advice in Saudi Arabia — deadlock, oppression, breach of duty. Professional response within 24 hours via WhatsApp or email — CounselO.",
      descAr: "استشارة قانونية في منازعات الشركاء والمساهمين بالمملكة. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "partner dispute lawyer Saudi Arabia, shareholder dispute KSA, shareholder oppression Saudi, partner deadlock company Saudi",
      kwAr: "محامي نزاعات شركاء السعودية, منازعات مساهمين, نزاع بين شركاء, اضطهاد المساهمين, استشارة شركاء أونلاين",
    },
    "director-liability": {
      desc: "Director & board member liability claims in Saudi Arabia — breach of fiduciary duty, mismanagement & fraud. Professional response within 24 hours via WhatsApp or email — CounselO.",
      descAr: "استشارة قانونية في دعاوى مسؤولية المديرين وأعضاء مجلس الإدارة بالمملكة. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "director liability lawyer Saudi Arabia, board member liability KSA, director breach of duty Saudi, fiduciary duty company Saudi",
      kwAr: "محامي مسؤولية مدير شركة السعودية, دعاوى مسؤولية مجلس إدارة, إساءة استخدام السلطة, خيانة أمانة المدير, استشارة مسؤولية مديرين أونلاين",
    },
    "general-assembly-disputes": {
      desc: "General assembly & partner resolution dispute legal advice in Saudi Arabia. Professional response within 24 hours via WhatsApp or email — CounselO Saudi Arabia.",
      descAr: "استشارة قانونية في منازعات قرارات الشركاء والجمعيات العامة بالمملكة. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "general assembly dispute lawyer Saudi Arabia, partner resolution dispute KSA, AGM dispute Saudi company, shareholder meeting dispute online",
      kwAr: "محامي منازعات جمعية عامة السعودية, نزاع قرارات الشركاء, منازعات اجتماع المساهمين, طعن في قرارات الجمعية, استشارة جمعية عامة أونلاين",
    },
    "assembly-resolution-nullity": {
      desc: "Assembly resolution nullity & annulment claims in Saudi Arabia — challenging unlawful company resolutions. Professional response within 24 hours via WhatsApp or email — CounselO.",
      descAr: "استشارة قانونية في دعاوى بطلان أو إلغاء قرارات الجمعية بالمملكة. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "assembly resolution nullity lawyer Saudi Arabia, annul company resolution KSA, void shareholder resolution Saudi, challenge assembly resolution online",
      kwAr: "محامي بطلان قرارات جمعية السعودية, إلغاء قرارات الجمعية العامة, الطعن في قرارات الجمعية, دعوى بطلان قرار, استشارة بطلان قرارات أونلاين",
    },
    "capital-change-disputes": {
      desc: "Capital increase & decrease dispute legal advice in Saudi Arabia — protecting shareholder rights. Professional response within 24 hours via WhatsApp or email — CounselO.",
      descAr: "استشارة قانونية في منازعات زيادة رأس المال أو تخفيضه بالمملكة. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "capital increase dispute lawyer Saudi Arabia, capital reduction dispute KSA, dilution rights Saudi company, share capital dispute online",
      kwAr: "محامي منازعات رأس مال السعودية, نزاع زيادة رأس المال, تخفيض رأس المال, حقوق التمييع, استشارة رأس المال أونلاين",
    },
    "profit-distribution-disputes": {
      desc: "Profit distribution & dividend dispute legal advice in Saudi Arabia — enforcing shareholder rights. Professional response within 24 hours via WhatsApp or email — CounselO.",
      descAr: "استشارة قانونية في منازعات توزيع الأرباح بالمملكة. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "profit distribution dispute lawyer Saudi Arabia, dividend dispute KSA, withheld dividends Saudi, shareholder profit rights online",
      kwAr: "محامي منازعات توزيع أرباح السعودية, نزاع أرباح الشركات, حجب الأرباح, حقوق المساهم في الأرباح, استشارة توزيع أرباح أونلاين",
    },
    "conflict-of-interest": {
      desc: "Conflict of interest & corporate opportunity disputes in Saudi Arabia — director misconduct & self-dealing. Professional response within 24 hours via WhatsApp or email — CounselO Saudi Arabia.",
      descAr: "استشارة قانونية في منازعات تعارض المصالح واستغلال الفرص التجارية بالمملكة. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "conflict of interest lawyer Saudi Arabia, corporate opportunity dispute KSA, director self-dealing Saudi, fiduciary breach online Saudi",
      kwAr: "محامي تعارض مصالح السعودية, استغلال الفرص التجارية, تعارض المصالح في الشركات, إساءة المدير, استشارة تعارض مصالح أونلاين",
    },
    "director-removal-disputes": {
      desc: "Director & board member removal dispute legal advice in Saudi Arabia — wrongful dismissal & reinstatement. Professional response within 24 hours via WhatsApp or email — CounselO Saudi Arabia.",
      descAr: "استشارة قانونية في منازعات عزل المدير أو عضو مجلس الإدارة بالمملكة. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "director removal dispute lawyer Saudi Arabia, board member dismissal KSA, wrongful director removal Saudi, reinstatement director online",
      kwAr: "محامي عزل مدير شركة السعودية, نزاع عزل عضو مجلس إدارة, إقالة المدير, استعادة منصب المدير, استشارة عزل مدير أونلاين",
    },
    "company-records-access": {
      desc: "Company records access & disclosure claims in Saudi Arabia — enforcing shareholder inspection rights. Professional response within 24 hours via WhatsApp or email — CounselO.",
      descAr: "استشارة قانونية في دعاوى الإفصاح والاطلاع على سجلات ووثائق الشركة بالمملكة. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "company records access lawyer Saudi Arabia, shareholder inspection rights KSA, disclosure claim Saudi company, shareholder information rights online",
      kwAr: "محامي الاطلاع على سجلات الشركة السعودية, حق المساهم في الإفصاح, دعوى الاطلاع على الوثائق, الشفافية الشركاتية, استشارة إفصاح أونلاين",
    },
    "share-transfer-disputes": {
      desc: "Share sale & transfer dispute legal advice in Saudi Arabia — pre-emption rights, forced sale & ownership transfer. Professional response within 24 hours via WhatsApp or email — CounselO Saudi Arabia.",
      descAr: "استشارة قانونية في منازعات بيع الحصص أو التنازل عنها بالمملكة. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "share transfer dispute lawyer Saudi Arabia, LLC quota transfer KSA, pre-emption rights Saudi company, equity transfer online",
      kwAr: "محامي منازعات نقل الحصص السعودية, نزاع التنازل عن الحصص, حق الأولوية في الشراء, بيع الحصص جبراً, استشارة نقل حصص أونلاين",
    },
    "partner-entry-exit": {
      desc: "Partner entry & exit dispute legal advice in Saudi Arabia — forced buyout, deadlock exit & valuation. Professional response within 24 hours via WhatsApp or email — CounselO Saudi Arabia.",
      descAr: "استشارة قانونية في منازعات دخول أو خروج الشريك بالمملكة. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "partner exit dispute lawyer Saudi Arabia, forced buyout KSA company, partner withdrawal Saudi, minority buyout Saudi",
      kwAr: "محامي منازعات دخول وخروج الشريك السعودية, شراء حصة الشريك جبراً, انسحاب الشريك, تقييم حصة المساهم, استشارة خروج شريك أونلاين",
    },
    "merger-conversion-disputes": {
      desc: "Company merger, conversion & demerger dispute legal advice in Saudi Arabia — minority protection & valuation. Professional response within 24 hours via WhatsApp or email — CounselO Saudi Arabia.",
      descAr: "استشارة قانونية في منازعات اندماج الشركات أو تحولها أو انقسامها بالمملكة. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "company merger dispute lawyer Saudi Arabia, conversion dispute KSA company, demerger Saudi company, minority protection merger Saudi",
      kwAr: "محامي منازعات اندماج شركات السعودية, نزاع تحول الشركة, انقسام الشركات, حماية الأقلية في الاندماج, استشارة اندماج شركات أونلاين",
    },
    "company-dissolution-liquidation": {
      desc: "Company dissolution & liquidation dispute legal advice in Saudi Arabia — creditor rights & asset distribution. Professional response within 24 hours via WhatsApp or email — CounselO Saudi Arabia.",
      descAr: "استشارة قانونية في منازعات انقضاء الشركة وتصفيتها بالمملكة. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "company dissolution lawyer Saudi Arabia, liquidation dispute KSA, company wind-up Saudi, creditor rights liquidation Saudi",
      kwAr: "محامي تصفية شركات السعودية, منازعات انقضاء الشركة, تصفية الشركات السعودية, حقوق الدائنين في التصفية, استشارة تصفية أونلاين",
    },
    "liquidator-liability": {
      desc: "Liquidator liability dispute legal advice in Saudi Arabia — challenging misconduct & misappropriation. Professional response within 24 hours via WhatsApp or email — CounselO Saudi Arabia.",
      descAr: "استشارة قانونية في منازعات مسؤولية المصفي بالمملكة. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "liquidator liability lawyer Saudi Arabia, liquidator misconduct KSA, challenge liquidator Saudi, liquidator misappropriation claim online",
      kwAr: "محامي مسؤولية المصفي السعودية, إساءة المصفي, الطعن في أعمال المصفي, مسؤولية المصفي القانونية, استشارة مصفي أونلاين",
    },
    "shareholder-compensation-claims": {
      desc: "Shareholder & company compensation claims in Saudi Arabia — recovering losses from director misconduct. Professional response within 24 hours via WhatsApp or email — CounselO Saudi Arabia.",
      descAr: "استشارة قانونية في دعاوى التعويض عن الإضرار بالشركة أو الشركاء أو المساهمين بالمملكة. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "shareholder compensation claim lawyer Saudi Arabia, company harm claim KSA, minority shareholder damages Saudi, director misconduct compensation online",
      kwAr: "محامي تعويض مساهمين السعودية, دعوى التعويض عن الإضرار بالشركة, مطالبات تعويض المساهمين, تعويض الأقلية, استشارة تعويض شركات أونلاين",
    },
    "family-company-disputes": {
      desc: "Family company dispute legal advice in Saudi Arabia — inheritance, management conflict & governance. Professional response within 24 hours via WhatsApp or email — CounselO Saudi Arabia.",
      descAr: "استشارة قانونية في منازعات الشركات العائلية بالمملكة. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "family company dispute lawyer Saudi Arabia, family business conflict KSA, family firm governance Saudi, inheritance company Saudi",
      kwAr: "محامي منازعات شركات عائلية السعودية, نزاع شركة عائلية, حوكمة الشركات العائلية, ميراث الشركة العائلية, استشارة شركة عائلية أونلاين",
    },
    "shareholder-agreements-disputes": {
      desc: "Shareholder & partner agreement dispute legal advice in Saudi Arabia — breach, enforcement & interpretation. Professional response within 24 hours via WhatsApp or email — CounselO Saudi Arabia.",
      descAr: "استشارة قانونية في منازعات اتفاقيات الشركاء أو المساهمين بالمملكة. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "shareholder agreement dispute lawyer Saudi Arabia, partner agreement breach KSA, SHA enforcement Saudi, shareholder agreement interpretation online",
      kwAr: "محامي منازعات اتفاقية مساهمين السعودية, نزاع اتفاقية الشركاء, تفسير اتفاقية مساهمين, إنفاذ اتفاقية الشركاء, استشارة اتفاقية مساهمين أونلاين",
    },
    "articles-of-association-disputes": {
      desc: "Articles of association & company statute violation legal advice in Saudi Arabia — breach of constitutional documents. Professional response within 24 hours via WhatsApp or email — CounselO Saudi Arabia.",
      descAr: "استشارة قانونية في منازعات مخالفة عقد التأسيس أو النظام الأساسي للشركة بالمملكة. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني — قانوني المملكة العربية السعودية.",
      kw: "articles of association dispute lawyer Saudi Arabia, company statute violation KSA, AoA breach Saudi company, company charter dispute online",
      kwAr: "محامي مخالفة النظام الأساسي السعودية, نزاع عقد التأسيس, انتهاك النظام الأساسي للشركة, مخالفة اتفاقية التأسيس, استشارة نظام أساسي أونلاين",
    },
  };

  const seoMeta = SEO_DATA[subId] ?? { desc: data.subtitle, descAr: data.subtitle, kw: "", kwAr: "" };
  const seoDescription = isRTL ? seoMeta.descAr : seoMeta.desc;
  const seoKeywords = isRTL ? seoMeta.kwAr : seoMeta.kw;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (data.faqs as Array<{ q: string; a: string }>).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const legalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: data.seoTitle,
    description: seoDescription,
    provider: {
      "@type": "LegalService",
      name: "CounselO",
      founder: {
        "@type": "Person",
        name: "Lawyer and Legal Counsel Omar Al-Baghdadi",
        jobTitle: "Lawyer and Legal Counsel",
      },
    },
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: "https://counselo.com/contact",
      availableLanguage: ["Arabic", "English"],
    },
    url: `https://counselo.com/services/companies-law/${subId}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isRTL ? "الرئيسية" : "Home", item: "https://counselo.com/" },
      { "@type": "ListItem", position: 2, name: isRTL ? "الخدمات" : "Services", item: "https://counselo.com/services" },
      { "@type": "ListItem", position: 3, name: isRTL ? "نظام الشركات" : "Companies Law", item: "https://counselo.com/services/companies-law" },
      { "@type": "ListItem", position: 4, name: data.title, item: `https://counselo.com/services/companies-law/${subId}` },
    ],
  };

  return (
    <div className="w-full bg-background min-h-screen">
      <SEOHead
        title={data.seoTitle}
        description={seoDescription}
        canonical={`/services/companies-law/${subId}`}
        keywords={seoKeywords}
        schema={[faqSchema, legalServiceSchema, breadcrumbSchema]}
      />

      {/* Breadcrumb */}
      <div className="bg-card border-b border-border py-4 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">{cld.breadcrumb.home}</Link>
            <ChevronRight className={`h-3.5 w-3.5 shrink-0 ${isRTL ? "rotate-180" : ""}`} />
            <Link href="/services" className="hover:text-primary transition-colors">{cld.breadcrumb.services}</Link>
            <ChevronRight className={`h-3.5 w-3.5 shrink-0 ${isRTL ? "rotate-180" : ""}`} />
            <Link href={`${regionPrefix}/services/companies-law`} className="hover:text-primary transition-colors">{cld.breadcrumb.parent}</Link>
            <ChevronRight className={`h-3.5 w-3.5 shrink-0 ${isRTL ? "rotate-180" : ""}`} />
            <span className="text-foreground font-medium">{data.title}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-16 overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(150 100% 9%) 0%, hsl(150 80% 14%) 100%)" }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href={`${regionPrefix}/services/companies-law`}
              className="inline-flex items-center text-white/60 hover:text-white text-sm mb-8 transition-colors">
              <ArrowLeft className={`me-2 h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
              {cld.backLink}
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-white/10 border border-white/20 text-white/70 text-xs font-medium px-3 py-1.5 uppercase tracking-wider">
                {cld.breadcrumb.parent}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 leading-tight max-w-3xl">
              {data.seoTitle}
            </h1>
            <p className="text-xl text-white/70 italic mb-8 max-w-2xl">{data.subtitle}</p>
            <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 px-5 py-3">
              <CheckCircle2 className="h-5 w-5 text-white/70 shrink-0" />
              <span className="text-white font-semibold text-sm">{cld.experienceBadge}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-16">

          {/* Left column */}
          <div className="lg:col-span-8 space-y-16">

            {/* Overview */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">{data.overview1}</p>
              <p className="text-lg text-muted-foreground leading-relaxed">{data.overview2}</p>
            </motion.section>

            {/* Experience callout */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="border-s-4 border-primary bg-primary/5 p-6">
              <p className="text-foreground font-medium leading-relaxed">{data.experienceNote}</p>
            </motion.div>

            {/* What We Handle */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-8 border-b border-border pb-4">
                {cld.coversHeading}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {data.covers.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-card border border-border p-4 hover:border-primary/40 transition-colors">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Process */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-8 border-b border-border pb-4">
                {cld.processHeading}
              </h2>
              <div className="space-y-8">
                {data.process.map((step, i) => (
                  <div key={i} className="flex gap-6 relative">
                    {i !== data.process.length - 1 && (
                      <div className="absolute start-6 top-14 bottom-0 w-px bg-border" />
                    )}
                    <div className="flex-shrink-0 w-12 h-12 bg-primary flex items-center justify-center text-white font-serif font-bold text-xl relative z-10">
                      {i + 1}
                    </div>
                    <div className="pt-2">
                      <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* FAQ */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-8 border-b border-border pb-4">
                {cld.faqHeading}
              </h2>
              <div className="space-y-3">
                {data.faqs.map((faq, i) => (
                  <div key={i} className="border border-border bg-card overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-start hover:bg-primary/5 transition-colors">
                      <h3 className="text-base font-bold text-foreground leading-snug">{faq.q}</h3>
                      <ChevronDown className={`h-5 w-5 text-primary shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                    </button>
                    {openFaq === i && (
                      <div className="px-6 pb-6 border-t border-border">
                        <p className="text-muted-foreground leading-relaxed pt-4 text-sm">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.section>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <motion.div initial={{ opacity: 0, x: isRTL ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-28 space-y-6">

              {/* CTA card */}
              <div className="bg-primary p-8 text-white">
                <h3 className="text-2xl font-serif font-bold text-white mb-3">{cld.sidebar.heading}</h3>
                <div className="w-12 h-1 bg-white/30 mb-5" />
                <p className="text-white/75 mb-8 leading-relaxed text-sm">{cld.sidebar.desc}</p>
                <Link href={`/contact?service=companies-law-${subId}`}>
                  <Button className="w-full py-6 text-base rounded-none bg-white text-primary hover:bg-white/90 font-semibold">
                    {cld.sidebar.ctaBtn}
                  </Button>
                </Link>
                <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-2 gap-2">
                  {[
                    { icon: MessageCircle, label: cld.sidebar.whatsapp },
                    { icon: Mail, label: cld.sidebar.email },
                  ].map(({ icon: Icon, label }, i) => (
                    <Link key={i} href="/contact"
                      className="flex flex-col items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 py-3 px-2 transition-colors">
                      <Icon className="h-4 w-4 text-white" />
                      <span className="text-white/80 text-xs font-medium text-center leading-tight">{label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Other sub-areas */}
              <div className="bg-card border border-border p-6">
                <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">{cld.relatedHeading}</h4>
                <div className="space-y-1">
                  {otherAreas.map((area) => (
                    <Link key={area.id} href={`${regionPrefix}/services/companies-law/${area.id}`}
                      className="flex items-center justify-between gap-3 px-3 py-2.5 hover:bg-primary/5 hover:text-primary transition-colors group text-sm">
                      <span className="text-muted-foreground group-hover:text-primary transition-colors font-medium">{area.label}</span>
                      <ChevronRight className={`h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-primary shrink-0 transition-colors ${isRTL ? "rotate-180" : ""}`} />
                    </Link>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
