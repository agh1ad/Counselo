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
  const isUae = region === "uae";
  const countryEn = isUae ? "the United Arab Emirates" : isSyr ? "Syria" : "Saudi Arabia";
  const countryAr = isUae ? "الإمارات العربية المتحدة" : isSyr ? "سوريا" : "المملكة العربية السعودية";
  const adjectiveEn = isUae ? "UAE" : isSyr ? "Syrian" : "Saudi";
  const adjectiveAr = isUae ? "الإماراتية" : isSyr ? "السورية" : "السعودية";
  const homeUrl = `https://counselo-legal.com${regionPrefix}`;
  const pageUrl = `${homeUrl}/privacy-policy`;
  const languageCode = isRTL ? (isUae ? "ar-AE" : isSyr ? "ar-SY" : "ar-SA") : (isUae ? "en-AE" : isSyr ? "en-SY" : "en-SA");
  const privacyFrameworkEn = isUae
    ? "UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data, where applicable; DIFC, ADGM or sector-specific rules may apply instead in some cases"
    : isSyr
      ? "applicable Syrian data-protection laws and regulations"
      : "Saudi Arabia's Personal Data Protection Law (PDPL)";
  const privacyFrameworkAr = isUae
    ? "المرسوم بقانون اتحادي رقم 45 لسنة 2021 بشأن حماية البيانات الشخصية، حيثما ينطبق؛ وقد تسري بدلاً منه قواعد مركز دبي المالي أو أبوظبي العالمي أو قواعد قطاعية في بعض الحالات"
    : isSyr
      ? "أنظمة حماية البيانات الشخصية المعمول بها في سوريا"
      : "نظام حماية البيانات الشخصية (PDPL) المعمول به في المملكة العربية السعودية";
  const rightsFrameworkEn = isUae
    ? "the applicable UAE federal, DIFC, ADGM or sector-specific data-protection regime"
    : privacyFrameworkEn;
  const rightsFrameworkAr = isUae
    ? "نظام حماية البيانات الاتحادي أو نظام مركز دبي المالي أو أبوظبي العالمي أو النظام القطاعي المنطبق"
    : privacyFrameworkAr;

  const content = {
    en: {
      seoTitle: "Privacy Policy | How CounselO Protects Your Data | CounselO",
      seoDesc: `CounselO's Privacy Policy for ${countryEn} — how we collect, use and protect personal data and confidential legal information for online consultations.`,
      canonical: "/privacy-policy",
      eyebrow: "Data Protection & Privacy",
      heading: "Privacy Policy",
      subheading:
        "CounselO is committed to protecting your privacy and the confidentiality of your legal information. This policy explains what data we collect, how we use it, and the strict protections that apply to everything you share with us.",
      lastUpdated: "Last updated: 2 August 2026",
      sections: [
        {
          icon: Shield,
          title: "1. Who We Are",
          content: `CounselO is an online legal consultation platform founded and led by Lawyer and Legal Counsel Omar Al-Baghdadi, with over 30 years of regional legal experience. We provide professional legal consultation services for matters in ${countryEn} via WhatsApp and email, in Arabic and English.`,
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
            `To maintain records required by applicable ${adjectiveEn} laws and professional obligations`,
            "To improve the quality and efficiency of our legal service",
            `To comply with applicable ${adjectiveEn} laws and regulatory obligations`,
          ],
        },
        {
          icon: Lock,
          title: "4. Professional Legal Confidentiality",
          content: `All information you share with CounselO is handled under applicable professional confidentiality and data-protection obligations for matters in ${countryEn}. This means:`,
          list: [
            "We do not share your legal matter details, documents, or personal information without your consent, except where disclosure is required or permitted by applicable law",
            "Your information is accessible only to the members of the CounselO legal team directly responsible for your consultation",
            "Confidentiality continues after the consultation to the extent required by applicable professional, contractual and legal obligations",
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
          content: `We process personal data under ${privacyFrameworkEn}, relying on an appropriate legal basis for each processing activity:`,
          list: [
            "Contract performance: to provide the legal consultation services you have requested",
            "Legitimate interests: to maintain professional records and improve our service",
            `Legal obligation: to comply with applicable ${adjectiveEn} regulatory and professional requirements`,
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
            isUae
              ? "Cross-border transfers are made only where permitted by the applicable UAE, DIFC, ADGM or sector-specific regime and with required safeguards"
              : `We do not transfer your personal data outside ${countryEn} without appropriate safeguards`,
          ],
        },
        {
          icon: Database,
          title: "9. Data Retention",
          content:
            "We retain your personal information and consultation records for as long as necessary to:",
          list: [
            "Fulfil the purpose for which it was collected (delivering your consultation)",
            isUae
              ? "Meet applicable UAE legal, regulatory and professional record-keeping obligations for the relevant matter"
              : `Meet our legal and professional record-keeping obligations under ${adjectiveEn} law`,
            "Defend any legal claims that may arise from the consultation",
            "After the applicable retention period, your data is securely deleted or anonymised",
          ],
        },
        {
          icon: Trash2,
          title: "10. Your Rights",
          content: `Subject to applicable exceptions, ${rightsFrameworkEn} may provide the following rights in relation to your personal data:`,
          list: [
            "Right of access: to request a copy of the personal data we hold about you",
            "Right of correction: to request correction of inaccurate or incomplete data",
            "Right of deletion: to request deletion of your personal data where we no longer have a legal basis to retain it",
            "Right to withdraw consent: where processing is based on consent, you may withdraw it at any time",
            "Right to object: to object to our processing of your data in certain circumstances",
            "To exercise a data right, contact info@counselo-legal.com; we will respond within the period required by the applicable regime",
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
      seoDesc: `سياسة خصوصية كاونسلو في ${countryAr} — كيفية جمع البيانات الشخصية والمعلومات القانونية السرية واستخدامها وحمايتها عند تقديم الاستشارات أونلاين.`,
      canonical: "/privacy-policy",
      eyebrow: "حماية البيانات والخصوصية",
      heading: "سياسة الخصوصية",
      subheading:
        "تلتزم منصة كاونسلو بحماية خصوصيتك وسرية معلوماتك القانونية. توضّح هذه السياسة البيانات التي نجمعها وكيفية استخدامها والضمانات الصارمة التي تحكم كل ما تشاركنا إياه.",
      lastUpdated: "آخر تحديث: 2 أغسطس 2026",
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
            `الاحتفاظ بالسجلات التي تستلزمها القوانين والالتزامات المهنية ${adjectiveAr} المنطبقة`,
            "تحسين جودة خدمتنا القانونية وكفاءتها",
            `الامتثال للقوانين ${adjectiveAr} المعمول بها والالتزامات التنظيمية`,
          ],
        },
        {
          icon: Lock,
          title: "٤. السرية المهنية القانونية",
          content: `تُعامل جميع المعلومات التي تشاركها مع كاونسلو وفق التزامات السرية المهنية وحماية البيانات المنطبقة على المسائل في ${countryAr}. ويعني ذلك:`,
          list: [
            "لا نُفصح عن تفاصيل مسألتك القانونية أو مستنداتك أو معلوماتك الشخصية دون موافقتك، إلا إذا كان الإفصاح مطلوباً أو مسموحاً به بموجب القانون المنطبق",
            "لا يطّلع على معلوماتك إلا أعضاء الفريق القانوني في كاونسلو المعنيّون مباشرةً بمعالجة استشارتك",
            "تستمر السرية بعد انتهاء الاستشارة بالقدر الذي تفرضه الالتزامات المهنية والتعاقدية والقانونية المنطبقة",
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
          content: `نعالج البيانات الشخصية وفق ${privacyFrameworkAr}، وبالاستناد إلى أساس قانوني مناسب لكل نشاط معالجة:`,
          list: [
            "تنفيذ العقد: لتقديم خدمات الاستشارة القانونية التي طلبتها",
            "المصالح المشروعة: للاحتفاظ بالسجلات المهنية وتحسين خدمتنا",
            `الالتزام القانوني: للامتثال للمتطلبات التنظيمية والمهنية ${adjectiveAr} المنطبقة`,
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
            isUae
              ? "لا يتم نقل البيانات عبر الحدود إلا حيث يسمح النظام الإماراتي أو نظام مركز دبي المالي أو أبوظبي العالمي أو النظام القطاعي المنطبق، ومع توفير الضمانات المطلوبة"
              : `لا ننقل بياناتك الشخصية خارج ${countryAr} دون ضمانات مناسبة`,
          ],
        },
        {
          icon: Database,
          title: "٩. مدة الاحتفاظ بالبيانات",
          content:
            "نحتفظ بمعلوماتك الشخصية وسجلات الاستشارة المدة اللازمة لـ:",
          list: [
            "تحقيق الغرض الذي جُمعت من أجله (تقديم استشارتك)",
            isUae
              ? "الوفاء بمتطلبات الاحتفاظ بالسجلات القانونية والتنظيمية والمهنية المنطبقة على المسألة في الإمارات"
              : `الوفاء بالتزامات الاحتفاظ القانوني والمهني بالسجلات وفق القواعد ${adjectiveAr} المنطبقة`,
            "الدفاع عن أي مطالبات قانونية قد تنشأ عن الاستشارة",
            "بعد انتهاء مدة الاحتفاظ المعمول بها، تُحذف بياناتك بأمان أو تُجهَّل",
          ],
        },
        {
          icon: Trash2,
          title: "١٠. حقوقك",
          content: `مع مراعاة الاستثناءات المنطبقة، قد يمنحك ${rightsFrameworkAr} الحقوق التالية فيما يخص بياناتك الشخصية:`,
          list: [
            "حق الوصول: طلب نسخة من البيانات الشخصية التي نحتفظ بها عنك",
            "حق التصحيح: طلب تصحيح البيانات غير الدقيقة أو المنقوصة",
            "حق الحذف: طلب حذف بياناتك الشخصية حيثما لا يعود لدينا أساس قانوني للاحتفاظ بها",
            "حق سحب الموافقة: يمكنك سحب موافقتك في أي وقت حيثما استُند إليها أساساً للمعالجة",
            "حق الاعتراض: الاعتراض على معالجتنا لبياناتك في حالات معينة",
            "لممارسة أحد حقوق البيانات، تواصل عبر info@counselo-legal.com؛ وسنرد خلال المدة التي يحددها النظام المنطبق",
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
    <div className="counselo-editorial-page legal-document-page w-full bg-background min-h-screen">
      <SEOHead
        title={content.seoTitle}
        description={content.seoDesc}
        canonical="/privacy-policy"
        keywords={isUae
          ? (isRTL
            ? "سياسة الخصوصية كاونسلو الإمارات, حماية البيانات الشخصية الإمارات, قانون حماية البيانات الإماراتي, سرية الاستشارة القانونية"
            : "CounselO UAE privacy policy, UAE personal data protection law, legal consultation confidentiality UAE, UAE data privacy")
          : region === "syr"
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
            "@id": `${pageUrl}#webpage`,
            "name": isRTL ? "سياسة الخصوصية — كاونسلو" : "Privacy Policy — CounselO",
            "description": content.seoDesc,
            "url": pageUrl,
            "isPartOf": { "@type": "WebSite", "name": "CounselO", "url": "https://counselo-legal.com" },
            "inLanguage": languageCode,
            "about": { "@type": "LegalService", "name": "CounselO", "url": "https://counselo-legal.com" },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": isRTL ? "الرئيسية" : "Home", "item": homeUrl },
              { "@type": "ListItem", "position": 2, "name": isRTL ? "سياسة الخصوصية" : "Privacy Policy", "item": pageUrl },
            ],
          },
        ]}
      />

      {/* Hero */}
      <section
        className="premium-page-hero py-20 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-white/60 font-medium uppercase tracking-widest text-sm mb-3">{content.eyebrow}</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">{content.heading}</h1>
            <div className="premium-hero-rule mb-6" />
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl mb-4">{content.subheading}</p>
            <p className="text-sm text-white/40">{content.lastUpdated}</p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-8 lg:py-24">
        <nav aria-label={isRTL ? "محتويات سياسة الخصوصية" : "Privacy policy contents"} className="hidden lg:block">
          <div className="sticky top-28 border-t-2 border-[#b58b32] bg-[#eef4f0] p-6">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-[#0d4a31]">{isRTL ? "المحتويات" : "Contents"}</p>
            <ol className="space-y-3">
              {content.sections.map((section, index) => (
                <li key={section.title}>
                  <a href={`#privacy-section-${index + 1}`} className="grid grid-cols-[24px_1fr] gap-2 text-xs leading-5 text-muted-foreground transition-colors hover:text-primary">
                    <span className="font-serif text-[#aa7e28]">{index + 1}.</span><span>{section.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        {/* Sections */}
        <div className="space-y-12">
          {content.sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <motion.section
                key={i}
                id={`privacy-section-${i + 1}`}
                initial={false}
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
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 bg-primary p-10 text-center lg:col-start-2"
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
        <div className="mt-10 text-center lg:col-start-2">
          <Link href={regionPrefix} className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← {isRTL ? "العودة إلى الرئيسية" : "Back to Homepage"}
          </Link>
        </div>

      </div>
    </div>
  );
}
