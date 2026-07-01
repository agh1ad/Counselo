import { motion } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle2, MessageCircle, Mail, CreditCard, FileText, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { SEOHead } from "@/components/seo/SEOHead";

export default function TermsOfService() {
  const { isRTL } = useLanguage();
  const { region } = useRegion();

  const content = {
    en: {
      seoTitle: "Terms of Service | Online Legal Consultation Process | CounselO قانوني",
      seoDesc:
        "CounselO's consultation terms and process for online legal advice in Saudi Arabia — how it works: submit your matter, receive a cost estimate, pay securely, and receive your expert legal answer. 24/7, Arabic and English.",
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
          desc: "All information you share with CounselO is treated as strictly confidential. We do not share your information with any third party without your consent.",
        },
        {
          title: "Scope of Consultation",
          desc: "Our consultations constitute professional legal advice based on the information you provide. The accuracy and completeness of the information you submit directly affect the quality of the advice given.",
        },
        {
          title: "No Refunds After Delivery",
          desc: "Once the legal consultation has been delivered, the consultation fee is non-refundable. If you are dissatisfied with the clarity of the answer, we will provide one round of clarification at no additional cost.",
        },
        {
          title: "No Attorney-Client Relationship for Representation",
          desc: "A consultation does not automatically create a mandate to represent you in court or before any authority. Court representation or ongoing legal representation requires a separate written agreement.",
        },
        {
          title: "Jurisdiction",
          desc: "These terms are governed by the laws of the Kingdom of Saudi Arabia. Any dispute arising from the consultation service shall be subject to the jurisdiction of the competent Saudi courts.",
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
      seoTitle: "شروط الخدمة | آلية الاستشارة القانونية الأونلاين | قانوني",
      seoDesc:
        "شروط وآلية استشارات قانوني القانونية الأونلاين في المملكة العربية السعودية — كيفية العمل: أرسل قضيتك، احصل على تقدير التكلفة، ادفع بأمان، واستلم إجابتك القانونية. متاح 24/7 بالعربية والإنجليزية.",
      eyebrow: "شروط الاستشارة القانونية",
      heading: "شروط الخدمة",
      subheading:
        "يُرجى قراءة هذه الشروط بعناية قبل طلب استشارة قانونية. بتواصلك مع قانوني، فإنك توافق على الآلية وشروط الدفع المبيّنة أدناه.",
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
          desc: "يجب سداد رسوم الاستشارة المتفق عليها كاملةً قبل إصدار إجابتك القانونية. ستُزوَّد بتعليمات الدفع فور موافقتك على المبلغ. سيؤكد قانوني استلام الدفعة قبل المضي في تقديم الاستشارة.",
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
          desc: "تُعامَل جميع المعلومات التي تشاركها مع قانوني بسرية مطلقة. ولا نُفصح عن معلوماتك لأي طرف ثالث دون موافقتك.",
        },
        {
          title: "نطاق الاستشارة",
          desc: "تمثّل استشاراتنا مشورة قانونية مهنية مبنيّة على المعلومات التي تزوّدنا بها. ويؤثّر مدى دقة واكتمال ما تُقدّمه تأثيراً مباشراً في جودة المشورة المُقدَّمة.",
        },
        {
          title: "عدم استرداد المبلغ بعد التسليم",
          desc: "بعد تسليم الاستشارة القانونية، تُعدّ رسوم الاستشارة غير قابلة للاسترداد. وإن لم تكن راضياً عن وضوح الإجابة، نقدّم جولةً واحدة من التوضيح دون أي تكلفة إضافية.",
        },
        {
          title: "الاستشارة لا تعني التمثيل القانوني",
          desc: "لا تُنشئ الاستشارة تلقائياً تفويضاً بتمثيلك أمام المحاكم أو أي جهة رسمية. ويستلزم التمثيل القضائي أو الاستشاري المستمر إبرام اتفاق خطي منفصل.",
        },
        {
          title: "الاختصاص القضائي",
          desc: "تخضع هذه الشروط لأحكام نظام المملكة العربية السعودية، وأي نزاع ينشأ عن الخدمة يُحال إلى المحاكم السعودية المختصة.",
        },
        {
          title: "تعديل الشروط",
          desc: "يحق لقانوني تعديل هذه الشروط في أي وقت. والشروط المعمول بها عند طلبك الخدمة هي السارية على استشارتك.",
        },
      ],
      ctaHeading: "مستعد للبدء؟",
      ctaDesc: "أرسل سؤالك القانوني عبر واتساب أو البريد الإلكتروني. سيراجع فريقنا طلبك ويُعلمك بالرسوم — دون أي التزام حتى توافق.",
      ctaBtn: "تواصل معنا الآن",
    },
  }[isRTL ? "ar" : "en"];

  return (
    <div className="w-full bg-background min-h-screen">
      <SEOHead
        title={content.seoTitle}
        description={content.seoDesc}
        canonical="/terms-of-service"
        keywords={region === "syr"
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
            "name": isRTL ? "شروط الخدمة | قانوني" : "Terms of Service | CounselO",
            "description": content.seoDesc,
            "url": "https://counselo.com/terms-of-service",
            "isPartOf": { "@type": "WebSite", "name": "CounselO قانوني", "url": "https://counselo.com" },
            "publisher": { "@type": "Organization", "name": "CounselO قانوني", "url": "https://counselo.com" },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": isRTL ? "الرئيسية" : "Home", "item": "https://counselo.com/" },
              { "@type": "ListItem", "position": 2, "name": isRTL ? "شروط الخدمة" : "Terms of Service", "item": "https://counselo.com/terms-of-service" },
            ],
          },
        ]}
      />

      {/* Hero */}
      <section className="py-20 px-4"
        style={{ background: "linear-gradient(135deg, hsl(150 100% 9%) 0%, hsl(150 80% 14%) 100%)" }}>
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-white/60 font-medium uppercase tracking-widest text-sm mb-3">{content.eyebrow}</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">{content.heading}</h1>
            <div className="w-20 h-1 bg-white/30 mb-6" />
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl">{content.subheading}</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">

        {/* Process Steps */}
        <motion.section
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
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
                  initial={{ opacity: 0, y: 20 }}
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
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
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
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-primary p-10 text-center"
        >
          <h2 className="text-2xl font-serif font-bold text-white mb-3">{content.ctaHeading}</h2>
          <p className="text-white/70 mb-8 leading-relaxed">{content.ctaDesc}</p>
          <Link href="/contact">
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
            <a href="mailto:bagdadio@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="h-4 w-4" />
              <span>bagdadio@gmail.com</span>
            </a>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
