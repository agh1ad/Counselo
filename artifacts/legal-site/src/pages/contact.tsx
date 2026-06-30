import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Clock, Mail, MapPin, Phone, CreditCard } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEOHead } from "@/components/seo/SEOHead";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  service: z.string().min(1),
  message: z.string().min(10),
});

export default function Contact() {
  const { toast } = useToast();
  const { t, isRTL } = useLanguage();
  const c = t.contact;
  const f = c.form;
  const [submitting, setSubmitting] = useState(false);

  const searchParams = new URLSearchParams(window.location.search);
  const defaultService = searchParams.get("service") || "";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", service: defaultService, message: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    try {
      const res = await fetch("https://formsubmit.co/ajax/bagdadio@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New Legal Consultation — ${values.service} — ${values.name}`,
          name: values.name,
          email: values.email,
          phone: values.phone,
          service: values.service,
          message: values.message,
        }),
      });
      if (res.ok) {
        toast({
          title: isRTL ? "تم إرسال طلبك بنجاح" : "Request sent successfully",
          description: isRTL ? "سنتواصل معك خلال 24 ساعة." : "We will contact you within 24 hours.",
        });
        form.reset();
      } else {
        throw new Error("Failed");
      }
    } catch {
      toast({
        title: isRTL ? "حدث خطأ" : "Submission error",
        description: isRTL
          ? "يُرجى المحاولة مجدداً أو التواصل عبر واتساب."
          : "Please try again or contact us via WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full bg-background min-h-screen">
      <SEOHead
        title={isRTL
          ? "احجز استشارة قانونية أونلاين في السعودية | استجابة خلال 24 ساعة | قانوني"
          : "Book Online Legal Consultation Saudi Arabia | Response Within 24 Hours | CounselO"}
        description={isRTL
          ? "تواصل مع قانوني — أكبر منصة استشارات قانونية أونلاين في المملكة. استجابة احترافية خلال 24 ساعة عبر واتساب (+966 59 485 0247) أو البريد الإلكتروني. لا حاجة لزيارة مكتب. بالعربية والإنجليزية."
          : "Contact CounselO — Saudi Arabia's largest online legal consultation platform. Professional response within 24 hours via WhatsApp (+966 59 485 0247) or email. No office visit needed. Arabic and English."}
        canonical="/contact"
        keywords={isRTL
          ? "احجز استشارة قانونية السعودية, تواصل مع محامي أونلاين, استشارة قانونية واتساب السعودية, استجابة خلال 24 ساعة, محامي الجبيل أونلاين, قانوني اتصل, استشارة فورية السعودية"
          : "book legal consultation Saudi Arabia, contact lawyer online KSA, WhatsApp legal consultation Saudi Arabia, legal advice within 24 hours, Jubail lawyer online, CounselO contact, book lawyer KSA"}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": isRTL ? "تواصل مع قانوني" : "Contact CounselO",
            "description": isRTL
              ? "احجز استشارة قانونية أونلاين في المملكة العربية السعودية — استجابة خلال 24 ساعة"
              : "Book an online legal consultation in Saudi Arabia — professional response within 24 hours",
            "url": "https://counselo.com/contact",
          },
          {
            "@context": "https://schema.org",
            "@type": "LegalService",
            "name": "CounselO قانوني",
            "telephone": "+966594850247",
            "email": "bagdadio@gmail.com",
            "url": "https://counselo.com",
            "address": { "@type": "PostalAddress", "addressLocality": "Jubail", "addressRegion": "Eastern Province", "addressCountry": "SA", "streetAddress": "Madinah Street, Radma Hotel Apartments Building, Jubail Al-Balad" },
            "founder": { "@type": "Person", "name": "Omar Al-Baghdadi", "jobTitle": "Lawyer and Legal Counsel" },
            "areaServed": { "@type": "Country", "name": "Saudi Arabia" },
            "availableLanguage": ["Arabic", "English"],
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "847", "bestRating": "5" },
            "openingHoursSpecification": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Sunday"], "opens": "09:00", "closes": "22:00" },
            "contactPoint": { "@type": "ContactPoint", "telephone": "+966594850247", "contactType": "legal consultation", "availableLanguage": ["Arabic", "English"] },
          },
        ]}
      />
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

      <section className="py-24 bg-background">
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
                    {/* Paid service notice */}
                    <div className="flex items-start gap-3 bg-primary/8 border border-primary/25 p-4">
                      <CreditCard className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground/80 leading-relaxed">{f.paymentNotice}</p>
                    </div>
                    <Button type="submit" size="lg" disabled={submitting} className="w-full py-6 text-lg rounded-none bg-primary text-white hover:bg-primary/90 disabled:opacity-70">
                      {submitting ? (isRTL ? "جارٍ الإرسال…" : "Sending…") : f.submitBtn}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">{f.disclaimer}</p>
                  </form>
                </Form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
