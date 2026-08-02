import { motion } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle2, MessageCircle, Mail, CreditCard, FileText, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { SEOHead } from "@/components/seo/SEOHead";

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
      seoTitle: "Terms of Service | Online Legal Consultation Process | CounselO",
      seoDesc: `CounselO's consultation terms and process for online legal advice in ${countryEn}: submit your matter, receive a fee quote, approve the scope, and receive your legal consultation in Arabic or English.`,
      eyebrow: "Legal Consultation Terms",
      heading: "Terms of Service",
      subheading:
        "Please read these terms carefully before requesting a legal consultation. By contacting CounselO, you agree to the process and payment terms below.",
      processHeading: "How Our Consultation Process Works",
      steps: [
        {
          icon: FileText,
          title: "Step 1 — Submit Your Information",
          desc: "Send us all relevant details about your legal matter via WhatsApp or email. Include any documents, contracts, correspondence, or facts that relate to your question. The more context you provide, the more precise and useful our advice will be.",
        },
        {
          icon: CreditCard,
          title: "Step 2 — We Assess & Inform You of the Cost",
          desc: "Our legal team — led by Lawyer and Legal Counsel Omar Al-Baghdadi — will review your matter and inform you of the consultation fee. The fee is determined by the complexity and scope of the legal question. We will not proceed without your explicit agreement to the quoted cost.",
        },
        {
          icon: MessageCircle,
          title: "Step 3 — Payment Before the Answer",
          desc: "Payment of the agreed consultation fee must be made in full before we issue your legal answer. Payment instructions will be provided upon your agreement to the fee. CounselO will confirm receipt of payment before proceeding.",
        },
        {
          icon: CheckCircle2,
          title: "Step 4 — You Receive the Legal Answer",
          desc: "Once payment is confirmed, our legal team will prepare and deliver your comprehensive legal consultation. You will receive a structured legal analysis, our professional opinion, and practical recommendations — via WhatsApp or email, in your chosen language (Arabic or English).",
        },
      ],
      termsHeading: "General Terms",
      terms: [
        {
          title: "Confidentiality",
          desc: "Information you share with CounselO is handled under applicable confidentiality and data-protection obligations. We do not disclose it without your consent except where disclosure is required or permitted by applicable law.",
        },
        {
          title: "Scope of Consultation",
          desc: isUae
            ? "The consultation is limited to the agreed scope and the information you provide. UAE court representation, formal filings and regulated local work require a separate engagement with an appropriately licensed practitioner where applicable."
            : "Our consultations constitute professional legal advice based on the information you provide. The accuracy and completeness of the information you submit directly affect the quality of the advice given.",
        },
        {
          title: "No Refunds After Delivery",
          desc: "Once the agreed consultation has been delivered, the fee is non-refundable except where mandatory law requires otherwise. If the answer needs clarification, we will provide one clarification round at no additional cost.",
        },
        {
          title: "No Attorney-Client Relationship for Representation",
          desc: "A consultation does not automatically create a mandate to represent you in court or before any authority. Court representation or ongoing legal representation requires a separate written agreement.",
        },
        {
          title: "Changes to Terms",
          desc: "CounselO reserves the right to update these terms at any time. The terms applicable to your consultation are those in effect at the time you request the service.",
        },
      ],
      ctaHeading: "Ready to Get Started?",
      ctaDesc: "Send your legal question via WhatsApp or email. Our team will review your matter and inform you of the consultation fee — with no obligation until you agree.",
      ctaBtn: "Contact Us Now",
    },
    ar: {
      seoTitle: "شروط الخدمة | آلية الاستشارة القانونية الأونلاين | كاونسلو",
      seoDesc: `شروط وآلية استشارات كاونسلو القانونية الأونلاين في ${countryAr}: أرسل مسألتك، واحصل على عرض الرسوم، واعتمد النطاق، ثم استلم استشارتك القانونية بالعربية أو الإنجليزية.`,
      eyebrow: "شروط الاستشارة القانونية",
      heading: "شروط الخدمة",
      subheading:
        "يُرجى قراءة هذه الشروط بعناية قبل طلب استشارة قانونية. بتواصلك مع كاونسلو، فإنك توافق على الآلية وشروط الدفع المبيّنة أدناه.",
      processHeading: "كيف تسير عملية الاستشارة",
      steps: [
        {
          icon: FileText,
          title: "الخطوة الأولى — إرسال معلوماتك",
          desc: "أرسل إلينا جميع التفاصيل المتعلقة بقضيتك القانونية عبر واتساب أو البريد الإلكتروني. أرفق أي مستندات أو عقود أو مراسلات أو وقائع ذات صلة بسؤالك. كلما كانت المعلومات أوفر، كانت الاستشارة أدق وأكثر فائدة.",
        },
        {
          icon: CreditCard,
          title: "الخطوة الثانية — نقيّم الطلب ونخبرك بالتكلفة",
          desc: "يراجع فريقنا القانوني — بقيادة المحامي والمستشار القانوني عمر البغدادي — قضيتك ويُعلمك برسوم الاستشارة. تُحدَّد الرسوم بحسب تعقيد المسألة القانونية ونطاقها. لن نمضي قُدُماً إلا بعد موافقتك الصريحة على التكلفة المقدَّمة.",
        },
        {
          icon: MessageCircle,
          title: "الخطوة الثالثة — الدفع قبل تلقّي الإجابة",
          desc: "يجب سداد رسوم الاستشارة المتفق عليها كاملةً قبل إصدار إجابتك القانونية. ستُزوَّد بتعليمات الدفع فور موافقتك على المبلغ. ستؤكد كاونسلو استلام الدفعة قبل المضي في تقديم الاستشارة.",
        },
        {
          icon: CheckCircle2,
          title: "الخطوة الرابعة — تستلم إجابتك القانونية",
          desc: "بمجرد تأكيد استلام الدفعة، يُعِدّ فريقنا القانوني استشارتك الشاملة ويُسلّمها إليك. ستتضمّن الإجابة تحليلاً قانونياً منظّماً ورأياً مهنياً وتوصيات عملية — عبر واتساب أو البريد الإلكتروني، بلغتك المختارة (العربية أو الإنجليزية).",
        },
      ],
      termsHeading: "الشروط العامة",
      terms: [
        {
          title: "السرية التامة",
          desc: "تُعامل المعلومات التي تشاركها مع كاونسلو وفق التزامات السرية وحماية البيانات المنطبقة. ولا نُفصح عنها دون موافقتك إلا إذا كان الإفصاح مطلوباً أو مسموحاً به بموجب القانون المنطبق.",
        },
        {
          title: "نطاق الاستشارة",
          desc: isUae
            ? "تقتصر الاستشارة على النطاق المتفق عليه والمعلومات التي تقدمها. ويتطلب التمثيل أمام محاكم الإمارات أو القيد الرسمي أو الأعمال المحلية المنظمة ارتباطاً منفصلاً مع ممارس مرخص على النحو الواجب حيثما يلزم."
            : "تمثّل استشاراتنا مشورة قانونية مهنية مبنيّة على المعلومات التي تزوّدنا بها. ويؤثّر مدى دقة واكتمال ما تُقدّمه تأثيراً مباشراً في جودة المشورة المُقدَّمة.",
        },
        {
          title: "عدم استرداد المبلغ بعد التسليم",
          desc: "بعد تسليم الاستشارة المتفق عليها، لا تُسترد الرسوم إلا إذا أوجب القانون الآمر خلاف ذلك. وإذا احتاجت الإجابة إلى إيضاح، نقدّم جولةً واحدة من التوضيح دون تكلفة إضافية.",
        },
        {
          title: "الاستشارة لا تعني التمثيل القانوني",
          desc: "لا تُنشئ الاستشارة تلقائياً تفويضاً بتمثيلك أمام المحاكم أو أي جهة رسمية. ويستلزم التمثيل القضائي أو الاستشاري المستمر إبرام اتفاق خطي منفصل.",
        },
        {
          title: "تعديل الشروط",
          desc: "يحق لكاونسلو تعديل هذه الشروط في أي وقت. والشروط المعمول بها عند طلبك الخدمة هي السارية على استشارتك.",
        },
      ],
      ctaHeading: "مستعد للبدء؟",
      ctaDesc: "أرسل سؤالك القانوني عبر واتساب أو البريد الإلكتروني. سيراجع فريقنا طلبك ويُعلمك بالرسوم — دون أي التزام حتى توافق.",
      ctaBtn: "تواصل معنا الآن",
    },
  }[isRTL ? "ar" : "en"];

  return (
    <div className="counselo-editorial-page legal-document-page w-full bg-background min-h-screen">
      <SEOHead
        title={content.seoTitle}
        description={content.seoDesc}
        canonical="/terms-of-service"
        keywords={isUae
          ? (isRTL
            ? "شروط خدمة كاونسلو الإمارات, آلية الاستشارة القانونية أونلاين الإمارات, رسوم الاستشارة القانونية, استشارة واتساب الإمارات"
            : "CounselO UAE terms of service, UAE online legal consultation process, UAE legal consultation fees, legal advice WhatsApp UAE")
          : region === "syr"
          ? (isRTL
            ? "شروط الخدمة قانوني, كيفية الاستشارة القانونية أونلاين سوريا, استشارة قانونية بالواتساب سوريا, رسوم الاستشارة القانونية, محامي أونلاين سوريا"
            : "CounselO terms of service, how online legal consultation works Syria, legal advice WhatsApp Syria, consultation fees lawyer Syria, online legal process Syria")
          : (isRTL
            ? "شروط الخدمة قانوني, كيفية الاستشارة القانونية أونلاين, استشارة قانونية بالواتساب السعودية, رسوم الاستشارة القانونية, محامي أونلاين"
            : "CounselO terms of service, how online legal consultation works Saudi Arabia, legal advice WhatsApp KSA, consultation fees lawyer, online legal process")}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${pageUrl}#webpage`,
            "name": isRTL ? "شروط الخدمة | كاونسلو" : "Terms of Service | CounselO",
            "description": content.seoDesc,
            "url": pageUrl,
            "isPartOf": { "@type": "WebSite", "name": "CounselO", "url": "https://counselo-legal.com" },
            "publisher": { "@type": "Organization", "name": "CounselO", "url": "https://counselo-legal.com" },
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
          <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-white/60 font-medium uppercase tracking-widest text-sm mb-3">{content.eyebrow}</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">{content.heading}</h1>
            <div className="premium-hero-rule mb-6" />
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl">{content.subheading}</p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-8 lg:py-24">
        <nav aria-label={isRTL ? "محتويات شروط الخدمة" : "Terms contents"} className="hidden lg:block">
          <div className="sticky top-28 border-t-2 border-[#b58b32] bg-[#eef4f0] p-6">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-[#0d4a31]">{isRTL ? "المحتويات" : "Contents"}</p>
            <ol className="space-y-4 text-sm">
              <li><a href="#terms-process" className="text-muted-foreground hover:text-primary">1. {content.processHeading}</a></li>
              <li><a href="#terms-general" className="text-muted-foreground hover:text-primary">2. {content.termsHeading}</a></li>
            </ol>
          </div>
        </nav>
        <div>

        {/* Process Steps */}
        <motion.section
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
                <motion.div
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
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* General Terms */}
        <motion.section
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
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-primary p-10 text-center"
        >
          <h2 className="text-2xl font-serif font-bold text-white mb-3">{content.ctaHeading}</h2>
          <p className="text-white/70 mb-8 leading-relaxed">{content.ctaDesc}</p>
          <Link href={`${regionPrefix}/contact`}>
            <span className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-4 hover:bg-white/90 transition-colors cursor-pointer">
              {content.ctaBtn}
              <ArrowRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            </span>
          </Link>
          <div className="mt-8 pt-8 border-t border-white/20 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/60">
            <a href="https://wa.me/966594850247" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span dir="ltr">+966 59 485 0247</span>
            </a>
            <a href="mailto:info@counselo-legal.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="h-4 w-4" />
              <span>info@counselo-legal.com</span>
            </a>
          </div>
        </motion.section>

        </div>
      </div>
    </div>
  );
}
