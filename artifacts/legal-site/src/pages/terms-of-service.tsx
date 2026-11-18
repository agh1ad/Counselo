import * as m from "framer-motion/m";
import { Link } from "wouter";
import { CheckCircle2, MessageCircle, Mail, CreditCard, FileText, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { COUNSELO_ENTITY_IDS, CONSULTATION_SCOPE, CONSULTATION_PRICES_UPDATED_AT } from "@workspace/api-zod/browser";

export default function TermsOfService() {
  const { isRTL } = useLanguage();
  const { region, regionPrefix } = useRegion();
  const isUae = region === "uae";
  const countryEn = isUae ? "the United Arab Emirates" : region === "syr" ? "Syria" : "Saudi Arabia";
  const countryAr = isUae ? "الإمارات العربية المتحدة" : region === "syr" ? "سوريا" : "المملكة العربية السعودية";
  const homeUrl = `https://counselo-legal.com${regionPrefix}`;
  const pageUrl = `${homeUrl}/terms-of-service`;

  const content = {
    en: {
      seoTitle: "Terms of Service | Legal Advice and Representation | CounselO Legal",
      seoDesc: `CounselO’s legal service terms in ${countryEn}: one team for consultation through representation, with the work, fees and authorisation agreed before starting.`,
      eyebrow: "Legal Service Terms",
      heading: "Terms of Service",
      subheading:
        "CounselO’s team supports you from consultation through representation. Sending an enquiry does not commit you to a fee; we agree the work, fees and required authorisation with you before starting.",
      processHeading: "Starting Your Matter with Our Team",
      steps: [
        {
          icon: FileText,
          title: "Step 1 — Submit Your Information",
          desc: "Send the details needed for an initial review through the website form, WhatsApp or email. Include any documents, contracts, correspondence, or facts that relate to your question. The more context you provide, the more precise and useful our advice will be.",
        },
        {
          icon: CreditCard,
          title: "Step 2 — Confirm Your Consultation Category",
          desc: "We confirm the legal category and its published fixed online consultation fee, along with the responsible team members and delivery details. For additional work or representation, we agree the work and its fees with you when requested.",
        },
        {
          icon: MessageCircle,
          title: "Step 3 — Confirm Payment and Start",
          desc: "We provide payment instructions once you approve the work and fees. For consultations, the agreed consultation fee must be paid in full before we issue the legal answer. CounselO confirms receipt of payment before proceeding.",
        },
        {
          icon: CheckCircle2,
          title: "Step 4 — Our Team Handles Your Matter",
          desc: "Our team carries out the agreed advice, drafting, negotiation or representation and keeps you informed of progress and next steps. Written consultations are delivered by WhatsApp or email in Arabic or English; our locally licensed team lawyers handle court and authority work.",
        },
      ],
      termsHeading: "General Terms",
      terms: [
        {
          title: "Confidentiality",
          desc: "Information you share with CounselO Legal is handled under applicable confidentiality and data-protection obligations. We do not disclose it without your consent except where disclosure is required or permitted by applicable law.",
        },
        {
          title: "Scope of Consultation",
          desc: CONSULTATION_SCOPE.en,
        },
        {
          title: "No Refunds After Delivery",
          desc: "Once the consultation has been delivered, the fee is non-refundable except where mandatory law requires otherwise. Discussion and questions on the same consultation topic remain included in the consultation fee.",
        },
        {
          title: "Representation and Authorisation",
          desc: "Our locally licensed team lawyers handle representation before courts and authorities. We confirm the representation scope, fees and required authorisation in writing before acting; sending an enquiry alone does not authorise us to act.",
        },
        {
          title: "Changes to Terms",
          desc: "CounselO Legal reserves the right to update these terms at any time. The terms applicable to your consultation are those in effect at the time you request the service.",
        },
      ],
      ctaHeading: "Ready to Get Started?",
      ctaDesc: "Choose your legal category and its published fixed consultation fee, then send your question and documents. Our team confirms the service and payment details before starting.",
      ctaBtn: "Contact Us Now",
    },
    ar: {
      seoTitle: "شروط الخدمة | الاستشارة والتمثيل القانوني | كاونسلو للاستشارات القانونية",
      seoDesc: `شروط خدمات كاونسلو القانونية في ${countryAr}: فريق واحد من الاستشارة إلى التمثيل، مع الاتفاق على العمل والأتعاب والتفويض قبل البدء.`,
      eyebrow: "شروط الخدمات القانونية",
      heading: "شروط الخدمة",
      subheading:
        "يدعمك فريق كاونسلو من الاستشارة إلى التمثيل القانوني. لا يُلزمك إرسال استفسار بدفع رسوم؛ نتفق معك على العمل والأتعاب والتفويض المطلوب قبل البدء.",
      processHeading: "كيف تبدأ مسألتك مع فريقنا",
      steps: [
        {
          icon: FileText,
          title: "الخطوة الأولى — إرسال معلوماتك",
          desc: "أرسل التفاصيل اللازمة للمراجعة الأولية عبر نموذج الموقع أو واتساب أو البريد الإلكتروني. أرفق أي مستندات أو عقود أو مراسلات أو وقائع ذات صلة بسؤالك. كلما كانت المعلومات أوفر، كانت الاستشارة أدق وأكثر فائدة.",
        },
        {
          icon: CreditCard,
          title: "الخطوة الثانية — نؤكد مجال الاستشارة",
          desc: "نؤكد المجال القانوني ورسوم استشارته الأونلاين الثابتة والمنشورة، مع أعضاء الفريق المسؤولين وتفاصيل التسليم. ونتفق معك عند طلب أي عمل إضافي أو تمثيل على نطاقه وأتعابه.",
        },
        {
          icon: MessageCircle,
          title: "الخطوة الثالثة — تأكيد الدفع وبدء العمل",
          desc: "نزودك بتعليمات الدفع بعد موافقتك على العمل والأتعاب. في الاستشارات، يجب سداد الرسوم المتفق عليها كاملةً قبل إصدار الإجابة القانونية. ونؤكد استلام الدفعة قبل المضي في العمل.",
        },
        {
          icon: CheckCircle2,
          title: "الخطوة الرابعة — يتولى فريقنا مسألتك",
          desc: "ينجز فريقنا المشورة أو الصياغة أو التفاوض أو التمثيل المتفق عليه، ويطلعك على تقدم العمل والخطوات التالية. تُسلّم الاستشارات المكتوبة عبر واتساب أو البريد الإلكتروني بالعربية أو الإنجليزية، ويتولى محامو فريقنا المرخصون محلياً العمل أمام المحاكم والجهات المختصة.",
        },
      ],
      termsHeading: "الشروط العامة",
      terms: [
        {
          title: "السرية",
          desc: "تُعامل المعلومات التي تشاركها مع كاونسلو للاستشارات القانونية وفق التزامات السرية وحماية البيانات المنطبقة. ولا نُفصح عنها دون موافقتك إلا إذا كان الإفصاح مطلوباً أو مسموحاً به بموجب القانون المنطبق.",
        },
        {
          title: "نطاق الاستشارة",
          desc: CONSULTATION_SCOPE.ar,
        },
        {
          title: "عدم استرداد المبلغ بعد التسليم",
          desc: "بعد تسليم الاستشارة، لا تُسترد الرسوم إلا إذا أوجب القانون الآمر خلاف ذلك. وتبقى المناقشة والأسئلة ضمن موضوع الاستشارة نفسه مشمولة برسومها.",
        },
        {
          title: "التمثيل والتفويض",
          desc: "يتولى محامو فريقنا المرخصون محلياً التمثيل أمام المحاكم والجهات المختصة. نؤكد كتابةً نطاق التمثيل والأتعاب والتفويض المطلوب قبل مباشرة العمل؛ ولا يُعد إرسال استفسار وحده تفويضاً لنا بالتصرف.",
        },
        {
          title: "تعديل الشروط",
          desc: "يحق لكاونسلو للاستشارات القانونية تعديل هذه الشروط في أي وقت. والشروط المعمول بها عند طلبك الخدمة هي السارية على استشارتك.",
        },
      ],
      ctaHeading: "مستعد للبدء؟",
      ctaDesc: "اختر المجال القانوني ورسوم استشارته الثابتة المنشورة، ثم أرسل سؤالك ومستنداتك. يؤكد فريقنا تفاصيل الخدمة والدفع قبل البدء.",
      ctaBtn: "تواصل معنا الآن",
    },
  }[isRTL ? "ar" : "en"];

  return (
    <div className="counselo-editorial-page legal-document-page w-full bg-background min-h-screen">
      <SEOHead
        heroArtwork="platform"
        title={content.seoTitle}
        description={content.seoDesc}
        canonical="/terms-of-service"
        keywords={isUae
          ? (isRTL
            ? "شروط خدمة كاونسلو للاستشارات القانونية الإمارات, آلية الاستشارة القانونية أونلاين الإمارات, رسوم الاستشارة القانونية, استشارة واتساب الإمارات"
            : "CounselO Legal UAE terms of service, UAE online legal consultation process, UAE legal consultation fees, legal advice WhatsApp UAE")
          : region === "syr"
          ? (isRTL
            ? "شروط الخدمة قانوني, كيفية الاستشارة القانونية أونلاين سوريا, استشارة قانونية بالواتساب سوريا, رسوم الاستشارة القانونية, محامي أونلاين سوريا"
            : "CounselO Legal terms of service, how online legal consultation works Syria, legal advice WhatsApp Syria, consultation fees lawyer Syria, online legal process Syria")
          : (isRTL
            ? "شروط الخدمة قانوني, كيفية الاستشارة القانونية أونلاين, استشارة قانونية بالواتساب السعودية, رسوم الاستشارة القانونية, محامي أونلاين"
            : "CounselO Legal terms of service, how online legal consultation works Saudi Arabia, legal advice WhatsApp KSA, consultation fees lawyer, online legal process")}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "dateModified": CONSULTATION_PRICES_UPDATED_AT,
            "@id": `${pageUrl}#webpage`,
            "name": isRTL ? "شروط الخدمة | كاونسلو للاستشارات القانونية" : "Terms of Service | CounselO Legal",
            "description": content.seoDesc,
            "url": pageUrl,
            "isPartOf": { "@id": COUNSELO_ENTITY_IDS.website },
            "publisher": { "@id": COUNSELO_ENTITY_IDS.organization },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": isRTL ? "الرئيسية" : "Home", "item": homeUrl },
              { "@type": "ListItem", "position": 2, "name": isRTL ? "شروط الخدمة" : "Terms of Service", "item": pageUrl },
            ],
          },
        ]}
      />

      {/* Hero */}
      <section className="premium-page-hero py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <m.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-white/60 font-medium uppercase tracking-widest text-sm mb-3">{content.eyebrow}</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">{content.heading}</h1>
            <div className="premium-hero-rule mb-6" />
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl">{content.subheading}</p>
          </m.div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-8 lg:py-24">
        <nav aria-label={isRTL ? "محتويات شروط الخدمة" : "Terms contents"} className="policy-contents">
          <details open className="policy-contents-panel">
            <summary className="font-semibold">{isRTL ? "المحتويات" : "Contents"}</summary>
            <ol className="space-y-4 text-sm">
              <li><a href="#terms-process" className="text-muted-foreground hover:text-primary">1. {content.processHeading}</a></li>
              <li><a href="#terms-general" className="text-muted-foreground hover:text-primary">2. {content.termsHeading}</a></li>
            </ol>
          </details>
        </nav>
        <div>

        {/* Process Steps */}
        <m.section
          id="terms-process"
          initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-serif font-bold text-foreground mb-10 pb-4 border-b border-border">
            {content.processHeading}
          </h2>
          <div className="space-y-8">
            {content.steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <m.div
                  key={i}
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-6 items-start bg-card border border-border p-6 hover:border-primary/40 transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary flex items-center justify-center text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </m.div>
              );
            })}
          </div>
        </m.section>

        {/* General Terms */}
        <m.section
          id="terms-general"
          initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-foreground mb-10 pb-4 border-b border-border">
            {content.termsHeading}
          </h2>
          <div className="space-y-6">
            {content.terms.map((term, i) => (
              <div key={i} className="border-s-4 border-primary bg-primary/5 p-5">
                <h3 className="font-bold text-foreground mb-2">{term.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{term.desc}</p>
              </div>
            ))}
          </div>
        </m.section>

        {/* CTA */}
        <m.section
          initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-primary p-10 text-center"
        >
          <h2 className="text-2xl font-serif font-bold text-white mb-3">{content.ctaHeading}</h2>
          <p className="text-white/90 mb-8 leading-relaxed">{content.ctaDesc}</p>
          <p className="mb-6"><Link href={`${regionPrefix}/services#complete-service-directory`} className="text-white underline underline-offset-4">{isRTL ? "اطّلع على الخدمات وأسعار الاستشارات" : "View services and consultation fees"}</Link></p>
          <Link href={`${regionPrefix}/contact`}>
            <span className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-4 hover:bg-white/90 transition-colors cursor-pointer">
              {content.ctaBtn}
              <ArrowRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            </span>
          </Link>
          <div className="mt-8 pt-8 border-t border-white/20 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/90">
            <a href="https://wa.me/966594850247" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span dir="ltr">+966 59 485 0247</span>
            </a>
            <a href="mailto:info@counselo-legal.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="h-4 w-4" />
              <span>info@counselo-legal.com</span>
            </a>
          </div>
        </m.section>

        </div>
      </div>
    </div>
  );
}
