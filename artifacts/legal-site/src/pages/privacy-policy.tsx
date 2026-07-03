import { motion } from "framer-motion";
import { Link } from "wouter";
import { Shield, Eye, Lock, Database, Globe, UserCheck, Bell, Trash2, MessageCircle, Mail, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { SEOHead } from "@/components/seo/SEOHead";

export default function PrivacyPolicy() {
  const { isRTL } = useLanguage();
  const { region, regionPrefix } = useRegion();
  const isSyr = region === "syr";

  const content = {
    en: {
      seoTitle: "Privacy Policy | How CounselO Protects Your Data | CounselO",
      seoDesc: isSyr
        ? "CounselO's Privacy Policy — how we collect, use and protect your personal data and legal information. Strict professional confidentiality on all consultations. Syria's online legal platform."
        : "CounselO's Privacy Policy — how we collect, use and protect your personal data and legal information. Strict professional confidentiality on all consultations. Saudi Arabia's online legal platform.",
      canonical: "/privacy-policy",
      eyebrow: "Data Protection & Privacy",
      heading: "Privacy Policy",
      subheading:
        "CounselO is committed to protecting your privacy and the confidentiality of your legal information. This policy explains what data we collect, how we use it, and the strict protections that apply to everything you share with us.",
      lastUpdated: "Last updated: 28 June 2026",
      sections: [
        {
          icon: Shield,
          title: "1. Who We Are",
          content: `CounselO is an online legal consultation platform founded and led by Lawyer and Legal Counsel Omar Al-Baghdadi, with over 30 years of legal practice. We provide professional legal consultation services across ${isSyr ? "Syria" : "Saudi Arabia"} via WhatsApp and email, in Arabic and English.`,
        },
        {
          icon: Database,
          title: "2. Information We Collect",
          content:
            "We collect only the information necessary to deliver your legal consultation:",
          list: [
            "Contact details you provide — name, phone number (WhatsApp), and email address",
            "Legal matter details — the facts, documents, contracts, and background information you share when requesting a consultation",
            "Communication records — messages and correspondence exchanged between you and our legal team via WhatsApp or email",
            "Payment information — payment confirmation details (we do not store card numbers or banking credentials)",
            "Technical data — basic browser and device information collected automatically when you visit our website (IP address, browser type, pages visited)",
          ],
        },
        {
          icon: Eye,
          title: "3. How We Use Your Information",
          content:
            "We use the information you provide solely for the following purposes:",
          list: [
            "To review your legal matter and deliver your consultation",
            "To communicate with you about your consultation and any follow-up queries",
            "To process and verify consultation fee payments",
            `To maintain records required by ${isSyr ? "Syrian" : "Saudi"} legal professional regulations`,
            "To improve the quality and efficiency of our legal service",
            `To comply with applicable ${isSyr ? "Syrian" : "Saudi"} laws and regulatory obligations`,
          ],
        },
        {
          icon: Lock,
          title: "4. Professional Legal Confidentiality",
          content: `All information you share with CounselO is subject to strict professional confidentiality — the same lawyer-client privilege that governs all legal practice in ${isSyr ? "Syria" : "the Kingdom of Saudi Arabia"}. This means:`,
          list: [
            "We will never share your legal matter details, documents, or personal information with any third party without your explicit written consent",
            "Your information is accessible only to the members of the CounselO legal team directly responsible for your consultation",
            "Professional secrecy obligations continue in perpetuity — even after your consultation is concluded",
            "We do not sell, rent, or trade your personal information to any person, company, or data broker",
          ],
        },
        {
          icon: MessageCircle,
          title: "5. WhatsApp & Email Communications",
          content:
            "Our consultations are conducted via WhatsApp and email. By contacting us through these channels, you acknowledge:",
          list: [
            "WhatsApp messages are transmitted via Meta's encrypted infrastructure — please review WhatsApp's own privacy policy for information on their data practices",
            "Email communications may be subject to standard internet transmission risks — we recommend using secure email where possible for highly sensitive matters",
            "All consultation content received by CounselO through any channel is treated as strictly confidential regardless of transmission method",
            "We do not proactively contact you by WhatsApp or email for marketing purposes without your consent",
          ],
        },
        {
          icon: Globe,
          title: "6. Cookies & Website Analytics",
          content:
            "Our website uses standard cookies and analytics tools to understand how visitors use our site. We use this data only to improve the website experience:",
          list: [
            "Session cookies: necessary for the website to function correctly and to maintain your language preference",
            "Analytics cookies: we may use tools such as Google Analytics to understand aggregate traffic patterns — no personally identifiable information is shared",
            "We do not use advertising cookies or track your activity across third-party websites",
            "You can disable cookies in your browser settings — this will not affect your ability to contact us or receive a consultation",
          ],
        },
        {
          icon: UserCheck,
          title: "7. Legal Basis for Processing",
          content: isSyr
            ? "We process your personal data on the following legal bases under applicable Syrian data protection law and regulations:"
            : "We process your personal data on the following legal bases under applicable Saudi data protection law and the Personal Data Protection Law (PDPL) of the Kingdom of Saudi Arabia:",
          list: [
            "Contract performance: to provide the legal consultation services you have requested",
            "Legitimate interests: to maintain professional records and improve our service",
            `Legal obligation: to comply with ${isSyr ? "Syrian" : "Saudi"} regulatory and professional legal requirements`,
            "Consent: where we ask for your explicit permission for any additional processing",
          ],
        },
        {
          icon: Bell,
          title: "8. Data Sharing & Third Parties",
          content:
            "We do not share your personal information with third parties except in the following limited circumstances:",
          list: [
            "With your explicit consent: only where you have specifically authorised us to share your information",
            "Legal obligation: where disclosure is required by a court order or applicable law",
            "Service providers: third-party tools necessary to operate our website (e.g. hosting, analytics) — these providers are contractually prohibited from using your data for any other purpose",
            `We do not transfer your personal data outside ${isSyr ? "Syria" : "the Kingdom of Saudi Arabia"} without appropriate safeguards`,
          ],
        },
        {
          icon: Database,
          title: "9. Data Retention",
          content:
            "We retain your personal information and consultation records for as long as necessary to:",
          list: [
            "Fulfil the purpose for which it was collected (delivering your consultation)",
            `Meet our legal and professional record-keeping obligations under ${isSyr ? "Syrian" : "Saudi"} law (typically a minimum of five years for legal files)`,
            "Defend any legal claims that may arise from the consultation",
            "After the applicable retention period, your data is securely deleted or anonymised",
          ],
        },
        {
          icon: Trash2,
          title: "10. Your Rights",
          content: isSyr
            ? "Under applicable Syrian data protection laws, you have the following rights with respect to your personal data:"
            : "Under Saudi Arabia's Personal Data Protection Law (PDPL), you have the following rights with respect to your personal data:",
          list: [
            "Right of access: to request a copy of the personal data we hold about you",
            "Right of correction: to request correction of inaccurate or incomplete data",
            "Right of deletion: to request deletion of your personal data where we no longer have a legal basis to retain it",
            "Right to withdraw consent: where processing is based on consent, you may withdraw it at any time",
            "Right to object: to object to our processing of your data in certain circumstances",
            "To exercise any of these rights, contact us via email at info@counselo-legal.com — we will respond within 30 days",
          ],
        },
        {
          icon: Shield,
          title: "11. Security Measures",
          content:
            "We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, or disclosure:",
          list: [
            "Access to consultation files is restricted to authorised CounselO legal team members only",
            "Electronic communications are handled through encrypted channels where available",
            "Our website uses HTTPS encryption for all data transmitted between your browser and our server",
            "We conduct regular reviews of our data security practices and update them as necessary",
          ],
        },
        {
          icon: Globe,
          title: "12. Changes to This Policy",
          content:
            "We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. When we do:",
          list: [
            "The updated policy will be published on this page with a revised 'Last updated' date",
            "For material changes, we will notify active clients via email",
            "Your continued use of CounselO's services after any update constitutes your acceptance of the revised policy",
          ],
        },
      ],
      contactHeading: "Privacy Questions or Concerns?",
      contactDesc:
        "If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact our team directly. We are committed to responding promptly and transparently.",
      contactBtn: "Contact Us",
    },
    ar: {
      seoTitle: "سياسة الخصوصية | كيف تحمي كاونسلو بياناتك | كاونسلو",
      seoDesc: isSyr
        ? "سياسة الخصوصية لمنصة كاونسلو — كيف نجمع بياناتك الشخصية ومعلوماتك القانونية ونحميها. سرية مهنية صارمة في جميع الاستشارات. منصة الاستشارات القانونية الأونلاين في سوريا."
        : "سياسة الخصوصية لمنصة كاونسلو — كيف نجمع بياناتك الشخصية ومعلوماتك القانونية ونحميها. سرية مهنية صارمة في جميع الاستشارات. منصة الاستشارات القانونية الأونلاين في المملكة العربية السعودية.",
      canonical: "/privacy-policy",
      eyebrow: "حماية البيانات والخصوصية",
      heading: "سياسة الخصوصية",
      subheading:
        "تلتزم منصة كاونسلو بحماية خصوصيتك وسرية معلوماتك القانونية. توضّح هذه السياسة البيانات التي نجمعها وكيفية استخدامها والضمانات الصارمة التي تحكم كل ما تشاركنا إياه.",
      lastUpdated: "آخر تحديث: 28 يونيو 2026",
      sections: [
        {
          icon: Shield,
          title: "١. من نحن",
          content:
            "كاونسلو منصة للاستشارات القانونية الأونلاين، أسّسها ويقودها المحامي والمستشار القانوني عمر البغدادي بخبرة تتجاوز 30 عاماً. نقدّم خدمات الاستشارة القانونية المهنية عبر واتساب والبريد الإلكتروني بالعربية والإنجليزية.",
        },
        {
          icon: Database,
          title: "٢. المعلومات التي نجمعها",
          content: "نجمع فقط المعلومات الضرورية لتقديم استشارتك القانونية:",
          list: [
            "بيانات التواصل التي تزوّدنا بها — الاسم ورقم الهاتف (واتساب) والبريد الإلكتروني",
            "تفاصيل القضية القانونية — الوقائع والمستندات والعقود والمعلومات الخلفية التي تشاركها عند طلب الاستشارة",
            "سجلات التواصل — الرسائل والمراسلات المتبادلة بينك وبين فريقنا القانوني عبر واتساب أو البريد الإلكتروني",
            "معلومات الدفع — تأكيدات الدفع فحسب (لا نحتفظ بأرقام البطاقات أو بيانات الحسابات البنكية)",
            "البيانات التقنية — معلومات أساسية عن المتصفح والجهاز تُجمَع تلقائياً عند زيارة موقعنا (عنوان IP ونوع المتصفح والصفحات المُزارة)",
          ],
        },
        {
          icon: Eye,
          title: "٣. كيف نستخدم معلوماتك",
          content: "نستخدم المعلومات التي تزوّدنا بها حصراً للأغراض التالية:",
          list: [
            "مراجعة قضيتك القانونية وتقديم استشارتك",
            "التواصل معك بشأن استشارتك وأي استفسارات متابعة",
            "معالجة مدفوعات رسوم الاستشارة والتحقق منها",
            `الاحتفاظ بالسجلات التي تستلزمها الأنظمة المهنية القانونية ${isSyr ? "السورية" : "السعودية"}`,
            "تحسين جودة خدمتنا القانونية وكفاءتها",
            `الامتثال للأنظمة ${isSyr ? "السورية" : "السعودية"} المعمول بها والالتزامات التنظيمية`,
          ],
        },
        {
          icon: Lock,
          title: "٤. السرية المهنية القانونية",
          content: `تخضع جميع المعلومات التي تشاركها مع كاونسلو لسرية مهنية صارمة — وهي ذات الامتياز المكفول بين المحامي وموكله الذي يحكم جميع الممارسات القانونية في ${isSyr ? "سوريا" : "المملكة العربية السعودية"}. ويعني ذلك:`,
          list: [
            "لن نُفصح أبداً عن تفاصيل قضيتك القانونية أو مستنداتك أو معلوماتك الشخصية لأي طرف ثالث دون موافقتك الخطية الصريحة",
            "لا يطّلع على معلوماتك إلا أعضاء الفريق القانوني في كاونسلو المعنيّون مباشرةً بمعالجة استشارتك",
            "تظل التزامات السرية المهنية سارية إلى الأبد — حتى بعد انتهاء استشارتك",
            "لا نبيع معلوماتك الشخصية أو نؤجّرها أو نتاجر بها مع أي شخص أو شركة أو وسيط بيانات",
          ],
        },
        {
          icon: MessageCircle,
          title: "٥. التواصل عبر واتساب والبريد الإلكتروني",
          content:
            "تُنفَّذ استشاراتنا عبر واتساب والبريد الإلكتروني. بتواصلك معنا عبر هذه القنوات، فإنك تُقرّ بما يلي:",
          list: [
            "تُنقَل رسائل واتساب عبر البنية التحتية المشفرة لـ Meta — يُرجى الاطّلاع على سياسة خصوصية واتساب للتعرف على ممارساتهم في معالجة البيانات",
            "قد تخضع مراسلات البريد الإلكتروني لمخاطر النقل الإلكتروني المعتادة عبر الإنترنت — ننصح باستخدام بريد إلكتروني آمن للمسائل بالغة الحساسية",
            "تُعامَل جميع محتويات الاستشارة التي يتلقّاها كاونسلو عبر أي قناة كانت بسرية تامة بصرف النظر عن أسلوب الإرسال",
            "لا نتواصل معك عبر واتساب أو البريد الإلكتروني لأغراض تسويقية دون موافقتك المسبقة",
          ],
        },
        {
          icon: Globe,
          title: "٦. ملفات تعريف الارتباط وتحليلات الموقع",
          content:
            "يستخدم موقعنا ملفات تعريف الارتباط (الكوكيز) القياسية وأدوات التحليل لفهم طريقة تصفّح الزوار له. نستخدم هذه البيانات لتحسين تجربة الموقع فقط:",
          list: [
            "ملفات الجلسة (Session cookies): ضرورية لعمل الموقع بشكل صحيح والحفاظ على تفضيل اللغة",
            "ملفات التحليل: قد نستخدم أدوات مثل Google Analytics لفهم أنماط حركة الزوار الإجمالية — لا تُشارَك أي معلومات شخصية محددة",
            "لا نستخدم ملفات تعريف الارتباط الإعلانية ولا نتتبّع نشاطك عبر مواقع الطرف الثالث",
            "يمكنك تعطيل ملفات تعريف الارتباط من إعدادات متصفحك — ولن يؤثر ذلك في قدرتك على التواصل معنا أو الحصول على استشارة",
          ],
        },
        {
          icon: UserCheck,
          title: "٧. الأساس القانوني للمعالجة",
          content: isSyr
            ? "نعالج بياناتك الشخصية استناداً إلى الأسس القانونية التالية وفق أنظمة حماية البيانات الشخصية المعمول بها في سوريا:"
            : "نعالج بياناتك الشخصية استناداً إلى الأسس القانونية التالية وفق نظام حماية البيانات الشخصية (PDPL) المعمول به في المملكة العربية السعودية:",
          list: [
            "تنفيذ العقد: لتقديم خدمات الاستشارة القانونية التي طلبتها",
            "المصالح المشروعة: للاحتفاظ بالسجلات المهنية وتحسين خدمتنا",
            `الالتزام القانوني: للامتثال للمتطلبات التنظيمية والمهنية القانونية ${isSyr ? "السورية" : "السعودية"}`,
            "الموافقة: حيثما نطلب إذنك الصريح لأي معالجة إضافية",
          ],
        },
        {
          icon: Bell,
          title: "٨. مشاركة البيانات مع الأطراف الثالثة",
          content:
            "لا نُفصح عن معلوماتك الشخصية لأطراف ثالثة إلا في الحالات المحدودة التالية:",
          list: [
            "بموافقتك الصريحة: فقط حين تأذن لنا تحديداً بمشاركة معلوماتك",
            "الالتزام القانوني: حين يُستلزم الإفصاح بموجب أمر قضائي أو نظام معمول به",
            "مزودو الخدمة: أدوات الطرف الثالث اللازمة لتشغيل موقعنا (الاستضافة والتحليلات مثلاً) — ويحظر على هؤلاء المزودين تعاقدياً استخدام بياناتك لأي غرض آخر",
            `لا ننقل بياناتك الشخصية خارج ${isSyr ? "سوريا" : "المملكة العربية السعودية"} دون ضمانات مناسبة`,
          ],
        },
        {
          icon: Database,
          title: "٩. مدة الاحتفاظ بالبيانات",
          content:
            "نحتفظ بمعلوماتك الشخصية وسجلات الاستشارة المدة اللازمة لـ:",
          list: [
            "تحقيق الغرض الذي جُمعت من أجله (تقديم استشارتك)",
            `الوفاء بالتزامات الاحتفاظ القانوني والمهني بالسجلات وفق ${isSyr ? "القانون السوري" : "النظام السعودي"} (خمس سنوات على الأقل عادةً للملفات القانونية)`,
            "الدفاع عن أي مطالبات قانونية قد تنشأ عن الاستشارة",
            "بعد انتهاء مدة الاحتفاظ المعمول بها، تُحذف بياناتك بأمان أو تُجهَّل",
          ],
        },
        {
          icon: Trash2,
          title: "١٠. حقوقك",
          content: isSyr
            ? "بموجب أنظمة حماية البيانات الشخصية المعمول بها في سوريا، تتمتع بالحقوق التالية فيما يخص بياناتك الشخصية:"
            : "بموجب نظام حماية البيانات الشخصية (PDPL) في المملكة العربية السعودية، تتمتع بالحقوق التالية فيما يخص بياناتك الشخصية:",
          list: [
            "حق الوصول: طلب نسخة من البيانات الشخصية التي نحتفظ بها عنك",
            "حق التصحيح: طلب تصحيح البيانات غير الدقيقة أو المنقوصة",
            "حق الحذف: طلب حذف بياناتك الشخصية حيثما لا يعود لدينا أساس قانوني للاحتفاظ بها",
            "حق سحب الموافقة: يمكنك سحب موافقتك في أي وقت حيثما استُند إليها أساساً للمعالجة",
            "حق الاعتراض: الاعتراض على معالجتنا لبياناتك في حالات معينة",
            "لممارسة أي من هذه الحقوق، تواصل معنا عبر البريد الإلكتروني info@counselo-legal.com — سنردّ خلال 30 يوماً",
          ],
        },
        {
          icon: Shield,
          title: "١١. إجراءات الأمن",
          content:
            "نطبّق تدابير تقنية وتنظيمية مناسبة لحماية بياناتك الشخصية من الوصول غير المصرّح به أو الفقدان أو الإفصاح:",
          list: [
            "يقتصر الوصول إلى ملفات الاستشارة على أعضاء الفريق القانوني المخوَّلين في كاونسلو حصراً",
            "تُعالَج الاتصالات الإلكترونية عبر قنوات مشفرة حيثما تتوفر",
            "يستخدم موقعنا تشفير HTTPS لجميع البيانات المنقولة بين متصفحك وخادمنا",
            "نُجري مراجعات منتظمة لممارسات أمن البيانات لدينا ونحدّثها حسب الحاجة",
          ],
        },
        {
          icon: Globe,
          title: "١٢. التعديلات على هذه السياسة",
          content:
            "قد نُحدّث سياسة الخصوصية هذه من وقت لآخر لمواكبة التغييرات في ممارساتنا أو الأنظمة المعمول بها. وعند إجراء أي تعديل:",
          list: [
            "تُنشر السياسة المحدَّثة على هذه الصفحة مع تاريخ 'آخر تحديث' مراجَع",
            "بالنسبة للتغييرات الجوهرية، نُبلّغ العملاء الفاعلين عبر البريد الإلكتروني",
            "يُعدّ استمرار استخدامك لخدمات كاونسلو بعد أي تحديث قبولاً للسياسة المعدَّلة",
          ],
        },
      ],
      contactHeading: "لديك سؤال أو استفسار حول الخصوصية؟",
      contactDesc:
        "إن كان لديك أي استفسار حول سياسة الخصوصية هذه أو ترغب في ممارسة حقوقك المتعلقة بالبيانات، تواصل مع فريقنا مباشرةً. نلتزم بالردّ بسرعة وشفافية.",
      contactBtn: "تواصل معنا",
    },
  }[isRTL ? "ar" : "en"];

  return (
    <div className="w-full bg-background min-h-screen">
      <SEOHead
        title={content.seoTitle}
        description={content.seoDesc}
        canonical="/privacy-policy"
        keywords={region === "syr"
          ? (isRTL
            ? "سياسة الخصوصية كاونسلو, حماية البيانات الشخصية سوريا, سرية الاستشارة القانونية, حماية البيانات السورية, خصوصية المستخدم سوريا"
            : "CounselO privacy policy, data protection Syria, legal consultation confidentiality Syria, Syrian data protection law, client data privacy Syria")
          : (isRTL
            ? "سياسة الخصوصية كاونسلو, حماية البيانات الشخصية السعودية, سرية الاستشارة القانونية, نظام PDPL السعودي, خصوصية المستخدم"
            : "CounselO privacy policy, data protection Saudi Arabia, legal consultation confidentiality, PDPL Saudi Arabia, client data privacy")}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": isRTL ? "سياسة الخصوصية — كاونسلو" : "Privacy Policy — CounselO",
            "description": content.seoDesc,
            "url": "https://counselo-legal.com/privacy-policy",
            "isPartOf": { "@type": "WebSite", "name": "CounselO", "url": "https://counselo-legal.com" },
            "inLanguage": isRTL ? "ar" : "en",
            "about": { "@type": "LegalService", "name": "CounselO", "url": "https://counselo-legal.com" },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": isRTL ? "الرئيسية" : "Home", "item": "https://counselo-legal.com/" },
              { "@type": "ListItem", "position": 2, "name": isRTL ? "سياسة الخصوصية" : "Privacy Policy", "item": "https://counselo-legal.com/privacy-policy" },
            ],
          },
        ]}
      />

      {/* Hero */}
      <section
        className="py-20 px-4 mt-16"
        style={{ background: "linear-gradient(135deg, hsl(150 100% 9%) 0%, hsl(150 80% 14%) 100%)" }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-white/60 font-medium uppercase tracking-widest text-sm mb-3">{content.eyebrow}</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">{content.heading}</h1>
            <div className="w-20 h-1 bg-white/30 mb-6" />
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl mb-4">{content.subheading}</p>
            <p className="text-sm text-white/40">{content.lastUpdated}</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">

        {/* Sections */}
        <div className="space-y-12">
          {content.sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <motion.section
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-serif font-bold text-foreground">{section.title}</h2>
                </div>
                <div className="ps-13 ms-13 border-s-2 border-border ps-6 ms-1">
                  <p className="text-muted-foreground leading-relaxed mb-4">{section.content}</p>
                  {section.list && (
                    <ul className="space-y-2">
                      {section.list.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-muted-foreground text-sm leading-relaxed">
                          <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.section>
            );
          })}
        </div>

        {/* Contact CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-primary p-10 text-center"
        >
          <h2 className="text-2xl font-serif font-bold text-white mb-3">{content.contactHeading}</h2>
          <p className="text-white/70 mb-8 leading-relaxed max-w-lg mx-auto">{content.contactDesc}</p>
          <Link href={`${regionPrefix}/contact`}>
            <span className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-4 hover:bg-white/90 transition-colors cursor-pointer">
              {content.contactBtn}
              <ArrowRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            </span>
          </Link>
          <div className="mt-8 pt-8 border-t border-white/20 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/60">
            <a
              href="https://wa.me/966594850247"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span dir="ltr">+966 59 485 0247</span>
            </a>
            <a href="mailto:info@counselo-legal.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="h-4 w-4" />
              <span>info@counselo-legal.com</span>
            </a>
          </div>
        </motion.section>

        {/* Back link */}
        <div className="mt-10 text-center">
          <Link href={regionPrefix} className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← {isRTL ? "العودة إلى الرئيسية" : "Back to Homepage"}
          </Link>
        </div>

      </div>
    </div>
  );
}
