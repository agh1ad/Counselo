import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Clock, Mail, MapPin, Phone, CreditCard, Paperclip, X, FileText, ImageIcon, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { JurisdictionDisclosure } from "@/components/legal/JurisdictionDisclosure";
import { COUNSELO_ENTITY_IDS, OMAR_AL_BAGHDADI } from "@workspace/api-zod";
import { SEOHead } from "@/components/seo/SEOHead";
import { trackEvent } from "@/lib/analytics";
import { getServicesForRegion } from "@workspace/api-zod";

const MAX_FILES = 10;
const MAX_FILE_SIZE_MB = 5;
const MAX_TOTAL_SIZE_MB = 7;
const ACCEPTED = ["image/jpeg", "image/png", "image/gif", "image/webp", "application/pdf"];

const createFormSchema = (isArabic: boolean) => z.object({
  name: z.string().min(2, isArabic ? "يرجى إدخال الاسم الكامل." : "Please enter your full name."),
  email: z.string().email(isArabic ? "يرجى إدخال بريد إلكتروني صحيح." : "Please enter a valid email address."),
  phone: z.string().min(10, isArabic ? "يرجى إدخال رقم هاتف صحيح مع رمز الدولة." : "Please enter a valid phone number with country code."),
  service: z.string().min(1, isArabic ? "يرجى اختيار المجال القانوني الأقرب لمسألتك." : "Please select the legal service closest to your matter."),
  message: z.string().min(10, isArabic ? "يرجى وصف المسألة في 10 أحرف على الأقل." : "Please describe your matter in at least 10 characters."),
});

type ContactFormValues = z.infer<ReturnType<typeof createFormSchema>>;

function FileIcon({ type }: { type: string }) {
  if (type === "application/pdf") return <FileText className="h-4 w-4 text-primary shrink-0" />;
  return <ImageIcon className="h-4 w-4 text-primary shrink-0" />;
}

type ContactApiResponse = {
  reference?: string;
  notificationStatus?: "accepted" | "pending" | "sent";
  error?: string;
};

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result ?? "");
      const separator = result.indexOf(",");
      if (separator === -1) reject(new Error("Unable to read attachment."));
      else resolve(result.slice(separator + 1));
    };
    reader.onerror = () => reject(new Error("Unable to read attachment."));
    reader.readAsDataURL(file);
  });
}

export default function Contact() {
  const { toast } = useToast();
  const { t, isRTL } = useLanguage();
  const { region, regionPrefix } = useRegion();
  const c = t.contact;
  const f = c.form;
  const serviceOptions = useMemo(
    () => getServicesForRegion(region).map((service) => ({
      value: service.slug,
      label: isRTL ? service.titleAr : service.titleEn,
    })),
    [region, isRTL],
  );
  const isUae = region === "uae";
  const isSyr = region === "syr";
  const countryName = isUae ? "United Arab Emirates" : isSyr ? "Syria" : "Saudi Arabia";
  const pageUrl = `https://counselo-legal.com${regionPrefix}/contact`;
  const whatsappUrl = `https://wa.me/966594850247?text=${encodeURIComponent(isRTL ? `مرحباً كاونسلو، أحتاج إلى استشارة بخصوص مسألة قانونية في ${countryName === "United Arab Emirates" ? "الإمارات" : countryName === "Syria" ? "سوريا" : "السعودية"}.` : `Hello CounselO, I need a consultation about a legal matter in ${countryName}.`)}`;
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const [wasSent, setWasSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [reference, setReference] = useState("");
  const [prefillService, setPrefillService] = useState("");
  const contactFormSchema = useMemo(() => createFormSchema(isRTL), [isRTL]);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", phone: "", service: "", message: "" },
  });

  useEffect(() => {
    const requestedService = new URLSearchParams(window.location.search).get("service") ?? "";
    if (serviceOptions.some((option) => option.value === requestedService)) {
      setPrefillService(requestedService);
      form.setValue("service", requestedService);
    }
  }, [form, serviceOptions]);

  const handleFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return;
    const combined = [...files];
    const skipped: string[] = [];
    let totalSize = combined.reduce((sum, file) => sum + file.size, 0);
    Array.from(incoming).forEach((file) => {
      if (!ACCEPTED.includes(file.type)) { skipped.push(file.name); return; }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) { skipped.push(file.name); return; }
      if (combined.length >= MAX_FILES) { skipped.push(file.name); return; }
      if (totalSize + file.size > MAX_TOTAL_SIZE_MB * 1024 * 1024) { skipped.push(file.name); return; }
      combined.push(file);
      totalSize += file.size;
    });
    setFiles(combined);
    if (skipped.length > 0) {
      toast({
        title: isRTL ? "بعض الملفات لم تُضَف" : "Some files were skipped",
        description: isRTL
          ? `${skipped.join(", ")} — الحد الأقصى 5 ميغابايت للملف و7 ميغابايت إجمالاً`
          : `${skipped.join(", ")} — maximum 5 MB per file and 7 MB total`,
        variant: "destructive",
      });
    }
  }, [files, isRTL, toast]);

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);
    setSubmissionError("");
    try {
      const attachments = await Promise.all(files.map(async (file) => ({
        name: file.name,
        type: file.type,
        data: await fileToBase64(file),
      })));
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          region,
          language: isRTL ? "ar" : "en",
          website: honeypotRef.current?.value ?? "",
          attachments,
        }),
      });
      const result = await response.json().catch(() => ({})) as ContactApiResponse;
      if (!response.ok || !result.reference) {
        const localizedError = response.status === 429
          ? (isRTL
            ? "تم إرسال عدة طلبات مؤخراً. يرجى المحاولة مرة أخرى لاحقاً."
            : "Too many requests were submitted recently. Please try again later.")
          : response.status === 503
            ? (isRTL
              ? "خدمة إرسال الطلبات غير متاحة مؤقتاً. يرجى التواصل معنا عبر البريد الإلكتروني."
              : "Consultation submissions are temporarily unavailable. Please contact us by email.")
            : (isRTL
              ? "تعذر إرسال طلبك. يرجى التحقق من البيانات والمحاولة مرة أخرى."
              : result.error || "We could not submit your request. Please check the form and try again.");
        throw new Error(localizedError);
      }

      setReference(result.reference);
      setWasSent(true);
      trackEvent("generate_lead", window.location.pathname, {
        form_name: "consultation",
        service: values.service,
        consultation_product: "comprehensive-consultation",
        region,
        attachment_count: attachments.length,
      });
      form.reset();
      setFiles([]);
      window.history.replaceState({}, "", window.location.pathname);
    } catch (error) {
      trackEvent("form_submit_error", window.location.pathname, {
        form_name: "consultation",
        region,
      });
      const message = error instanceof Error ? error.message : (isRTL
        ? "تعذر إرسال طلبك. يرجى المحاولة مرة أخرى."
        : "We could not submit your request. Please try again.");
      setSubmissionError(message);
      toast({
        title: isRTL ? "لم يتم إرسال الطلب" : "Request not submitted",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="counselo-editorial-page legal-intake-page w-full bg-background min-h-screen">
      <SEOHead
        title={region === "uae"
          ? (isRTL ? "احجز استشارة قانونية في الإمارات | كاونسلو" : "Book a UAE Legal Consultation | CounselO")
          : region === "syr"
          ? (isRTL
            ? "احجز استشارة قانونية أونلاين في سوريا | استجابة خلال 24 ساعة | كاونسلو"
            : "Book Online Legal Consultation Syria | Response Within 24 Hours | CounselO")
          : (isRTL
            ? "احجز استشارة قانونية أونلاين في السعودية | استجابة خلال 24 ساعة | كاونسلو"
            : "Book Online Legal Consultation Saudi Arabia | Response Within 24 Hours | CounselO")}
        description={isUae
          ? (isRTL
            ? "تواصل مع كاونسلو الإمارات لطلب استشارة قانونية أونلاين في المسائل الاتحادية والمحلية ومسائل البرّ الرئيسي والمناطق الحرة، بالعربية أو الإنجليزية."
            : "Contact CounselO, the UAE online legal platform, for confidential consultation on federal, emirate-level, mainland and free-zone matters in Arabic or English.")
          : isSyr
          ? (isRTL
            ? "تواصل مع كاونسلو — منصة الاستشارات القانونية الأونلاين في سوريا. استجابة احترافية خلال 24 ساعة عبر واتساب (+966 59 485 0247) أو البريد الإلكتروني. لا حاجة لزيارة مكتب. بالعربية والإنجليزية."
            : "Contact CounselO — Syria's online legal platform for fast, professional legal consultation. Target response within 24 hours via WhatsApp (+966 59 485 0247) or email, in Arabic or English.")
          : (isRTL
            ? "تواصل مع كاونسلو — منصة متخصصة للاستشارات القانونية أونلاين في المملكة. استجابة احترافية خلال 24 ساعة عبر واتساب (+966 59 485 0247) أو البريد الإلكتروني. لا حاجة لزيارة مكتب. بالعربية والإنجليزية."
            : "Contact CounselO — Saudi Arabia's online legal platform for fast, professional legal consultation. Target response within 24 hours via WhatsApp (+966 59 485 0247) or email, in Arabic or English.")}
        canonical="/contact"
        keywords={isUae
          ? (isRTL
            ? "احجز استشارة قانونية الإمارات, استشارة قانونية أونلاين دبي, محامي أونلاين أبوظبي, استشارة قانونية واتساب الإمارات, كاونسلو الإمارات"
            : "book UAE legal consultation, online legal advice Dubai, Abu Dhabi legal consultation, UAE lawyer consultation online, CounselO UAE contact")
          : isSyr
          ? (isRTL
            ? "احجز استشارة قانونية سوريا, تواصل مع محامي أونلاين سوريا, استشارة قانونية واتساب سوريا, استجابة خلال 24 ساعة, محامي دمشق أونلاين, كاونسلو اتصل سوريا, استشارة قانونية إلكترونية سوريا"
            : "book legal consultation Syria, contact lawyer online Syria, WhatsApp legal consultation Syria, legal advice within 24 hours Syria, Damascus lawyer online, CounselO contact Syria, book lawyer Syria")
          : (isRTL
            ? "احجز استشارة قانونية السعودية, تواصل مع محامي أونلاين, استشارة قانونية واتساب السعودية, استجابة خلال 24 ساعة, محامي الجبيل أونلاين, كاونسلو اتصل, استشارة فورية السعودية"
            : "book legal consultation Saudi Arabia, contact lawyer online KSA, WhatsApp legal consultation Saudi Arabia, legal advice within 24 hours, Jubail lawyer online, CounselO contact, book lawyer KSA")}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": isRTL ? "تواصل مع كاونسلو" : "Contact CounselO",
            "description": isUae
              ? (isRTL
                ? "احجز استشارة قانونية أونلاين لمسائل الإمارات بالعربية أو الإنجليزية"
                : "Book an online legal consultation for UAE matters in Arabic or English")
              : isSyr
              ? (isRTL
                ? "احجز استشارة قانونية أونلاين في سوريا — استجابة احترافية خلال 24 ساعة"
                : "Book an online legal consultation in Syria — professional response within 24 hours")
              : (isRTL
                ? "احجز استشارة قانونية أونلاين في المملكة العربية السعودية — استجابة خلال 24 ساعة"
                : "Book an online legal consultation in Saudi Arabia — professional response within 24 hours"),
            "url": pageUrl,
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": COUNSELO_ENTITY_IDS.organization,
            "name": "CounselO",
            "telephone": "+966594850247",
            "email": "info@counselo-legal.com",
            "url": "https://counselo-legal.com",
            "address": isUae
              ? { "@type": "PostalAddress", "addressCountry": "AE" }
              : isSyr
              ? { "@type": "PostalAddress", "addressLocality": "Damascus", "addressRegion": "Damascus Governorate", "addressCountry": "SY" }
              : { "@type": "PostalAddress", "addressLocality": "Jubail", "addressRegion": "Eastern Province", "addressCountry": "SA", "streetAddress": "Madinah Street, Radma Hotel Apartments Building, Jubail Al-Balad" },
            "founder": OMAR_AL_BAGHDADI,
            "areaServed": { "@type": "Country", "name": countryName },
            "availableLanguage": ["Arabic", "English"],
            "openingHoursSpecification": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Sunday"], "opens": "09:00", "closes": "22:00" },
            "contactPoint": { "@type": "ContactPoint", "telephone": "+966594850247", "contactType": "legal consultation", "availableLanguage": ["Arabic", "English"] },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": isRTL ? "الرئيسية" : "Home", "item": `https://counselo-legal.com${regionPrefix}` },
              { "@type": "ListItem", "position": 2, "name": isRTL ? "اتصل بنا" : "Contact", "item": pageUrl },
            ],
          },
        ]}
      />

      {/* Hero */}
      <section className="premium-page-hero py-24 lg:py-28 border-b border-[#d4af60]/20">
        <div className="premium-content-shell relative z-10 text-center">
          <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">{c.hero.heading}</h1>
            <div className="premium-hero-rule mx-auto mb-8" />
            <p className="text-xl text-white/75 max-w-2xl mx-auto leading-relaxed">{c.hero.subheading}</p>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#073d29] py-14 text-white lg:py-16" aria-labelledby="consultation-process-heading">
        <div className="premium-content-shell">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#d4b66c]">{isRTL ? "من رسالتك الأولى إلى الخطوة التالية" : "From your first message to next steps"}</p>
            <h2 id="consultation-process-heading" className="mb-3 text-3xl font-serif font-bold text-white md:text-4xl">{isRTL ? "كيف تعمل الاستشارة القانونية أونلاين؟" : "How online legal consultation works"}</h2>
            <p className="text-sm leading-7 text-white/65">{isRTL ? "أرسل التفاصيل، نراجع مسألتك، نشرح ما يمكننا تقديمه وتكلفته، ثم تتلقى مشورة مكتوبة وخطوات عملية واضحة." : "Send the details, let us review your matter, understand what you need and its cost, then receive written advice and clear practical next steps."}</p>
          </div>
          <ol className="grid border-y border-white/15 md:grid-cols-2 lg:grid-cols-4">
            {(isRTL ? [
              ["١", "أرسل التفاصيل", "الوقائع والسؤال والدولة والمستندات ذات الصلة عبر النموذج أو واتساب أو البريد."],
              ["٢", "نراجع مسألتك", "نحدد القانون والجهة ودرجة الاستعجال، ونشرح مسار الاستشارة وما نحتاجه لفهم المسألة."],
              ["٣", "اتفق على الخدمة والرسوم", "نوضح ما ستحصل عليه والمدة والرسوم قبل بدء العمل المدفوع؛ لا يوجد سعر ثابت قبل فهم المسألة."],
              ["٤", "استلم المشورة والخطوة التالية", "تتلقى مشورة مكتوبة وتوضيحات عبر البريد أو واتساب، مع دعم صوتي أو مرئي ومتابعة عند الاتفاق. التمثيل أمام المحكمة منفصل."],
            ] : [
              ["1", "Send the details", "Share the facts, question, country and relevant documents through the form, WhatsApp or email."],
              ["2", "We review your matter", "We identify the relevant law, authority and urgency, then explain the consultation route and what we need to understand the matter."],
              ["3", "Agree on the service and fee", "We explain what you will receive, how long it should take and the fee before paid work begins; there is no fixed price before the matter is understood."],
              ["4", "Receive advice and next steps", "You receive written advice and clarifications by email or WhatsApp, with voice/video support and monitoring when agreed. Court representation is separate."],
            ]).map(([number, title, body]) => (
              <li key={number} className="border-b border-white/15 p-6 last:border-b-0 md:border-e md:last:border-e-0 lg:p-7">
                <span className="mb-3 block font-mono text-sm font-bold text-[#d4b66c]">{number}</span>
                <h3 className="mb-2 text-lg font-serif font-bold text-white">{title}</h3>
                <p className="text-sm leading-6 text-white/65">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Success screen */}
      {wasSent && (
        <section className="py-24 bg-background">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="border border-border bg-card p-12 flex flex-col items-center gap-6"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-serif font-bold text-foreground">
                  {isRTL ? "شكراً لتواصلك معنا!" : "Thank You!"}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {isRTL
                    ? "تم استلام طلبك بنجاح. تستهدف كاونسلو تقديم رد مهني خلال 24 ساعة، بحسب نطاق المسألة واكتمال المعلومات وتوفر الخدمة."
                    : "Your consultation request has been received. CounselO targets a professional response within 24 hours, depending on the matter, the details provided and service availability."}
                </p>
                {reference && (
                  <p className="text-sm font-semibold text-primary" dir="ltr">
                    {isRTL ? "رقم الطلب:" : "Consultation reference:"} {reference}
                  </p>
                )}
              </div>
              <div className="w-full bg-primary/5 border border-primary/20 rounded-sm px-6 py-4 flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary shrink-0" />
                <p className="text-sm text-foreground/80 font-medium">
                  {isRTL
                    ? "وقت الاستجابة المهني المستهدف: خلال 24 ساعة — عبر واتساب أو البريد الإلكتروني، بحسب المسألة والاستعجال وكفاية المعلومات"
                    : "Target professional response: within 24 hours via WhatsApp or email, depending on the matter, urgency and information provided"}
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {!wasSent && <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Info */}
            <div className="lg:col-span-4 space-y-12">
              <motion.div initial={false} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-8">{c.firmDetails.heading}</h3>
                <div className="space-y-8">
                  {[
                    { Icon: MapPin, label: c.firmDetails.addressTitle, value: c.firmDetails.address, ltr: false },
                    { Icon: Phone, label: c.firmDetails.phoneTitle, value: c.firmDetails.phone, ltr: true },
                    { Icon: Mail, label: c.firmDetails.emailTitle, value: c.firmDetails.email, ltr: true },
                    { Icon: Clock, label: c.firmDetails.hoursTitle, value: c.firmDetails.hours, ltr: false },
                  ].map(({ Icon, label, value, ltr }, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-foreground font-medium mb-1">{label}</h4>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line" dir={ltr ? "ltr" : undefined}>{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Form */}
            <div className="lg:col-span-8">
              <motion.div initial={false} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-card border border-border p-10">
                <h3 className="text-2xl font-serif font-bold text-foreground mb-2">{f.heading}</h3>
                <div className="w-12 h-1 bg-primary mb-8" />
                <div className="mb-8 grid gap-3 sm:grid-cols-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta="whatsapp"
                    data-conversion-position="contact-form"
                    data-region={region}
                    className="inline-flex items-center justify-center gap-2 bg-[#0d4a31] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#12613f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {isRTL ? "أرسل التفاصيل عبر واتساب" : "Send details on WhatsApp"}
                  </a>
                  <a
                    href={`mailto:${c.firmDetails.email}`}
                    data-cta="email"
                    data-conversion-position="contact-form"
                    data-region={region}
                    className="inline-flex items-center justify-center gap-2 border border-primary/40 px-5 py-3 text-sm font-bold text-primary transition hover:border-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {isRTL ? "اكتب عبر البريد الإلكتروني" : "Write by email"}
                  </a>
                </div>
                <div className="mb-8 border-s-2 border-[#b4924a] bg-[#eef4f0] p-4 text-sm leading-7 text-muted-foreground">
                  {isRTL
                    ? "اكتب الوقائع بترتيب زمني، وحدد ما تريد معرفته أو إنجازه، وأرفق المستندات ذات الصلة فقط. لا ترسل النسخة الوحيدة من أي أصل ولا تدرج بيانات لا تلزم لتقييم المسألة."
                    : "Describe the facts in date order, explain what you need to know or achieve, and attach only relevant documents. Do not send the only copy of an original or include information that is not needed to assess the matter."}
                </div>
                <Form {...form}>
                  <form id="consultation-form" name="consultation" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="sr-only" aria-hidden="true">
                      <label htmlFor="contact-website">Website</label>
                      <input
                        ref={honeypotRef}
                        id="contact-website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-medium">{f.nameLabel}</FormLabel>
                          <FormControl><Input placeholder={f.namePlaceholder} {...field} className="border-border focus:border-primary" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-medium">{f.emailLabel}</FormLabel>
                          <FormControl><Input type="email" placeholder={f.emailPlaceholder} {...field} className="border-border focus:border-primary" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-medium">{f.phoneLabel}</FormLabel>
                          <FormControl><Input type="tel" placeholder={f.phonePlaceholder} {...field} className="border-border focus:border-primary" dir="ltr" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="service" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-medium">{f.serviceLabel}</FormLabel>
                          <Select
                            key={field.value || prefillService || "empty"}
                            onValueChange={(value) => {
                              setPrefillService("");
                              field.onChange(value);
                            }}
                            value={field.value || prefillService}
                          >
                            <FormControl>
                              <SelectTrigger className="border-border"><SelectValue placeholder={f.servicePlaceholder} /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {serviceOptions.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="message" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground font-medium">{f.messageLabel}</FormLabel>
                        <FormControl>
                          <Textarea placeholder={f.messagePlaceholder} className="min-h-[140px] border-border focus:border-primary resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    {/* File upload */}
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-foreground">{f.uploadLabel}</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/jpeg,image/png,image/gif,image/webp,application/pdf"
                        onChange={(event) => {
                          handleFiles(event.currentTarget.files);
                          event.currentTarget.value = "";
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={files.length >= MAX_FILES}
                        className="w-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border hover:border-primary/60 bg-muted/30 hover:bg-primary/5 transition-colors py-6 px-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Paperclip className="h-6 w-6 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">{f.uploadBtn}</span>
                        <span className="text-xs text-muted-foreground text-center">{f.uploadHint}</span>
                      </button>
                      {files.length > 0 && (
                        <ul className="space-y-2">
                          {files.map((file, idx) => (
                            <li key={idx} className="flex items-center gap-3 border border-border bg-muted/20 px-3 py-2">
                              <FileIcon type={file.type} />
                              <span className="flex-1 text-sm text-foreground truncate" dir="ltr">{file.name}</span>
                              <span className="text-xs text-muted-foreground shrink-0">
                                {(file.size / 1024 / 1024).toFixed(1)} MB
                              </span>
                              <button
                                type="button"
                                onClick={() => removeFile(idx)}
                                className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                                aria-label={f.uploadRemove}
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Paid service notice */}
                    <div className="flex items-start gap-3 bg-primary/8 border border-primary/25 p-4">
                      <CreditCard className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground/80 leading-relaxed">{f.paymentNotice}</p>
                    </div>
                    {submissionError && (
                      <div role="alert" className="flex items-start gap-3 border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        <p>{submissionError}</p>
                      </div>
                    )}
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full py-6 text-lg rounded-none bg-primary text-white hover:bg-primary/90"
                    >
                      {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                      {isSubmitting
                        ? (isRTL ? "جارٍ إرسال الطلب..." : "Submitting securely…")
                        : f.submitBtn}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">{f.disclaimer}</p>
                  </form>
                </Form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>}

      <JurisdictionDisclosure jurisdiction={region} />
    </div>
  );
}
