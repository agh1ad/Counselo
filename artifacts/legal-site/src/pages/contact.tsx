import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Clock, Mail, MapPin, Phone, CreditCard, Paperclip, X, FileText, ImageIcon, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { SEOHead } from "@/components/seo/SEOHead";

const MAX_FILES = 10;
const MAX_SIZE_MB = 10;
const ACCEPTED = ["image/jpeg", "image/png", "image/gif", "image/webp", "application/pdf"];

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  service: z.string().min(1),
  message: z.string().min(10),
});

function FileIcon({ type }: { type: string }) {
  if (type === "application/pdf") return <FileText className="h-4 w-4 text-primary shrink-0" />;
  return <ImageIcon className="h-4 w-4 text-primary shrink-0" />;
}

export default function Contact() {
  const { toast } = useToast();
  const { t, isRTL } = useLanguage();
  const { region } = useRegion();
  const c = t.contact;
  const f = c.form;
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nativeFormRef = useRef<HTMLFormElement>(null);

  const [wasSent, setWasSent] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", service: "", message: "" },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const svc = params.get("service") || "";
    if (svc) form.setValue("service", svc);
    if (params.get("sent") === "1") {
      setWasSent(true);
      window.history.replaceState({}, "", window.location.pathname);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const syncFilesToInput = useCallback((fileList: File[]) => {
    if (!fileInputRef.current) return;
    try {
      const dt = new DataTransfer();
      fileList.forEach((f) => dt.items.add(f));
      fileInputRef.current.files = dt.files;
    } catch {
      /* DataTransfer not supported — files still submitted from state */
    }
  }, []);

  const handleFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return;
    const valid: File[] = [];
    const skipped: string[] = [];
    Array.from(incoming).forEach((file) => {
      if (!ACCEPTED.includes(file.type)) { skipped.push(file.name); return; }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) { skipped.push(file.name); return; }
      valid.push(file);
    });
    setFiles((prev) => {
      const combined = [...prev, ...valid].slice(0, MAX_FILES);
      syncFilesToInput(combined);
      return combined;
    });
    if (skipped.length > 0) {
      toast({
        title: isRTL ? "بعض الملفات لم تُضَف" : "Some files were skipped",
        description: isRTL
          ? `${skipped.join(", ")} — تحقق من النوع والحجم`
          : `${skipped.join(", ")} — check type and size`,
        variant: "destructive",
      });
    }
  }, [isRTL, toast, syncFilesToInput]);

  const removeFile = (idx: number) => {
    setFiles((prev) => {
      const updated = prev.filter((_, i) => i !== idx);
      syncFilesToInput(updated);
      return updated;
    });
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const nf = nativeFormRef.current;
    if (!nf) return;
    const get = (name: string) => nf.querySelector<HTMLInputElement>(`[data-field="${name}"]`)!;
    get("_subject").value = `New Legal Consultation — ${values.service} — ${values.name}`;
    get("_next").value = `${window.location.origin}${window.location.pathname}?sent=1`;
    get("name").value = values.name;
    get("email").value = values.email;
    get("phone").value = values.phone;
    get("service").value = values.service;
    get("message").value = values.message;
    nf.submit();
  }

  return (
    <div className="w-full bg-background min-h-screen">
      <SEOHead
        title={region === "syr"
          ? (isRTL
            ? "احجز استشارة قانونية أونلاين في سوريا | استجابة خلال 24 ساعة | كاونسلو"
            : "Book Online Legal Consultation Syria | Response Within 24 Hours | CounselO")
          : (isRTL
            ? "احجز استشارة قانونية أونلاين في السعودية | استجابة خلال 24 ساعة | كاونسلو"
            : "Book Online Legal Consultation Saudi Arabia | Response Within 24 Hours | CounselO")}
        description={region === "syr"
          ? (isRTL
            ? "تواصل مع كاونسلو — منصة الاستشارات القانونية الأونلاين في سوريا. استجابة احترافية خلال 24 ساعة عبر واتساب (+966 59 485 0247) أو البريد الإلكتروني. لا حاجة لزيارة مكتب. بالعربية والإنجليزية."
            : "Contact CounselO — Syria's online legal consultation platform. Professional response within 24 hours via WhatsApp (+966 59 485 0247) or email. No office visit needed. Arabic and English.")
          : (isRTL
            ? "تواصل مع كاونسلو — منصة متخصصة للاستشارات القانونية أونلاين في المملكة. استجابة احترافية خلال 24 ساعة عبر واتساب (+966 59 485 0247) أو البريد الإلكتروني. لا حاجة لزيارة مكتب. بالعربية والإنجليزية."
            : "Contact CounselO — Saudi Arabia's specialized online legal consultation platform. Professional response within 24 hours via WhatsApp (+966 59 485 0247) or email. No office visit needed. Arabic and English.")}
        canonical="/contact"
        keywords={region === "syr"
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
            "description": region === "syr"
              ? (isRTL
                ? "احجز استشارة قانونية أونلاين في سوريا — استجابة احترافية خلال 24 ساعة"
                : "Book an online legal consultation in Syria — professional response within 24 hours")
              : (isRTL
                ? "احجز استشارة قانونية أونلاين في المملكة العربية السعودية — استجابة خلال 24 ساعة"
                : "Book an online legal consultation in Saudi Arabia — professional response within 24 hours"),
            "url": region === "syr"
              ? `https://counselo-legal.com/syr${isRTL ? "/ar" : ""}/contact`
              : `https://counselo-legal.com/sa${isRTL ? "/ar" : ""}/contact`,
          },
          {
            "@context": "https://schema.org",
            "@type": "LegalService",
            "name": "CounselO",
            "telephone": "+966594850247",
            "email": "info@counselo-legal.com",
            "url": "https://counselo-legal.com",
            "address": region === "syr"
              ? { "@type": "PostalAddress", "addressLocality": "Damascus", "addressRegion": "Damascus Governorate", "addressCountry": "SY" }
              : { "@type": "PostalAddress", "addressLocality": "Jubail", "addressRegion": "Eastern Province", "addressCountry": "SA", "streetAddress": "Madinah Street, Radma Hotel Apartments Building, Jubail Al-Balad" },
            "founder": { "@type": "Person", "name": "Omar Al-Baghdadi", "jobTitle": "Lawyer and Legal Counsel" },
            "areaServed": region === "syr"
              ? { "@type": "Country", "name": "Syria" }
              : { "@type": "Country", "name": "Saudi Arabia" },
            "availableLanguage": ["Arabic", "English"],
            "openingHoursSpecification": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Sunday"], "opens": "09:00", "closes": "22:00" },
            "contactPoint": { "@type": "ContactPoint", "telephone": "+966594850247", "contactType": "legal consultation", "availableLanguage": ["Arabic", "English"] },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": isRTL ? "الرئيسية" : "Home", "item": region === "syr" ? `https://counselo-legal.com/syr${isRTL ? "/ar" : ""}` : `https://counselo-legal.com/sa${isRTL ? "/ar" : ""}` },
              { "@type": "ListItem", "position": 2, "name": isRTL ? "اتصل بنا" : "Contact", "item": region === "syr" ? `https://counselo-legal.com/syr${isRTL ? "/ar" : ""}/contact` : `https://counselo-legal.com/sa${isRTL ? "/ar" : ""}/contact` },
            ],
          },
        ]}
      />

      {/* Native form — invisible, actual formsubmit.co multipart submission */}
      <form
        ref={nativeFormRef}
        action="https://formsubmit.co/info@counselo-legal.com"
        method="POST"
        encType="multipart/form-data"
        style={{ display: "none" }}
      >
        <input type="hidden" data-field="_subject" name="_subject" defaultValue="" />
        <input type="hidden" data-field="_next" name="_next" defaultValue="" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" data-field="name" name="name" defaultValue="" />
        <input type="hidden" data-field="email" name="email" defaultValue="" />
        <input type="hidden" data-field="phone" name="phone" defaultValue="" />
        <input type="hidden" data-field="service" name="service" defaultValue="" />
        <input type="hidden" data-field="message" name="message" defaultValue="" />
        {/* Real file input — files selected via the visible UI land here */}
        <input
          ref={fileInputRef}
          type="file"
          name="attachment"
          multiple
          accept="image/*,.pdf"
          onChange={(e) => handleFiles(e.target.files)}
          onClick={(e) => { (e.target as HTMLInputElement).value = ""; }}
        />
      </form>

      {/* Hero */}
      <section className="relative py-28 border-b border-border">
        <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(135deg, hsl(150 100% 10%) 0%, hsl(150 80% 15%) 100%)" }} />
        <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse at 60% 50%, hsl(150 60% 25% / 0.4) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">{c.hero.heading}</h1>
            <div className="w-20 h-1 bg-white/40 mx-auto mb-8" />
            <p className="text-xl text-white/75 max-w-2xl mx-auto leading-relaxed">{c.hero.subheading}</p>
          </motion.div>
        </div>
      </section>

      {/* Success screen */}
      {wasSent && (
        <section className="py-24 bg-background">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
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
                    ? "تم استلام طلبك بنجاح. سيتواصل معك فريقنا القانوني خلال 24 ساعة."
                    : "Your consultation request has been received. Our legal team will contact you within 24 hours."}
                </p>
              </div>
              <div className="w-full bg-primary/5 border border-primary/20 rounded-sm px-6 py-4 flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary shrink-0" />
                <p className="text-sm text-foreground/80 font-medium">
                  {isRTL
                    ? "وقت الاستجابة المتوقع: خلال 24 ساعة — عبر واتساب أو البريد الإلكتروني"
                    : "Expected response time: within 24 hours — via WhatsApp or email"}
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
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
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
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-card border border-border p-10">
                <h3 className="text-2xl font-serif font-bold text-foreground mb-2">{f.heading}</h3>
                <div className="w-12 h-1 bg-primary mb-8" />
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-border"><SelectValue placeholder={f.servicePlaceholder} /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {f.serviceOptions.map((opt) => (
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
                    <Button type="submit" size="lg" className="w-full py-6 text-lg rounded-none bg-primary text-white hover:bg-primary/90">
                      {f.submitBtn}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">{f.disclaimer}</p>
                  </form>
                </Form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>}
    </div>
  );
}
