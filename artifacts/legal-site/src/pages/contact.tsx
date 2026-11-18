import { ConsultationSteps } from "@/components/contact/consultation-steps";
import { urgentPath } from "@/lib/urgent-legal-assistance";
import { Link, useSearch } from "wouter";
import { useEffect, useState } from "react";
import { Clock, Mail, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { COUNSELO_ENTITY_IDS, OMAR_AL_BAGHDADI, CONSULTATION_SCOPE } from "@workspace/api-zod/browser";
import { SEOHead } from "@/components/seo/SEOHead";
import { getDirectContactDetails } from "@/lib/contact-direct-links";

export default function Contact() {
  const { t, isRTL } = useLanguage();
  const { region } = useRegion();
  const search = useSearch();
  const regionPrefix = `/${region}${isRTL ? "/ar" : ""}`;
  const c = t.contact;
  const isUae = region === "uae";
  const isSyr = region === "syr";
  const countryName = isUae ? "United Arab Emirates" : isSyr ? "Syria" : "Saudi Arabia";
  const pageUrl = `https://counselo-legal.com${regionPrefix}/contact`;
  // Prerendered contact pages have no query. Apply link context after hydration
  // so their initial HTML remains identical, then retain it in direct drafts.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);
  const details = getDirectContactDetails(region, hydrated ? search : "", isRTL);
  const isConsultation = Boolean(details.consultationPrice);
  useEffect(() => {
    if (!hydrated || window.location.hash !== "#consultation-request") return;
    const frame = window.requestAnimationFrame(() => {
      const contact = document.getElementById("consultation-request");
      contact?.scrollIntoView({ block: "start" });
      contact?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [hydrated, search]);

  return (
    <div className="counselo-editorial-page legal-intake-page w-full bg-background min-h-screen">
      <SEOHead
        heroArtwork="platform"
        title={region === "uae"
          ? (isRTL ? "تواصل مع فريق كاونسلو في الإمارات | كاونسلو للاستشارات القانونية" : "Contact CounselO’s UAE Legal Team | CounselO Legal")
          : region === "syr"
          ? (isRTL
            ? "تواصل مع فريق كاونسلو في سوريا | كاونسلو للاستشارات القانونية"
            : "Contact CounselO’s Syria Legal Team | CounselO Legal")
          : (isRTL
            ? "تواصل مع فريق كاونسلو في السعودية | كاونسلو للاستشارات القانونية"
            : "Contact CounselO’s Saudi Legal Team | CounselO Legal")}
        description={isUae
          ? (isRTL
            ? "تواصل أونلاين مع فريق كاونسلو لخدمات الاستشارة والعقود والتمثيل القانوني في الإمارات. فريق واحد يتابع مسألتك بالعربية أو الإنجليزية."
            : "Contact CounselO’s team online for legal advice, contracts and representation in the UAE. One team follows your matter in Arabic or English.")
          : isSyr
          ? (isRTL
            ? "تواصل أونلاين مع فريق كاونسلو لخدمات الاستشارة والعقود والتمثيل القانوني في سوريا. فريق واحد يتابع مسألتك بالعربية أو الإنجليزية."
            : "Contact CounselO’s team online for legal advice, contracts and representation in Syria. One team follows your matter in Arabic or English.")
          : (isRTL
            ? "تواصل أونلاين مع فريق كاونسلو لخدمات الاستشارة والعقود والتمثيل القانوني في السعودية. فريق واحد يتابع مسألتك بالعربية أو الإنجليزية."
            : "Contact CounselO’s team online for legal advice, contracts and representation in Saudi Arabia. One team follows your matter in Arabic or English.")}
        canonical="/contact"
        keywords={isUae
          ? (isRTL
            ? "احجز استشارة قانونية الإمارات, استشارة قانونية واتساب الإمارات, كاونسلو للاستشارات القانونية الإمارات"
            : "book UAE legal consultation, UAE lawyer consultation online, CounselO Legal UAE contact")
          : isSyr
          ? (isRTL
            ? "احجز استشارة قانونية سوريا, تواصل مع محامي أونلاين سوريا, استشارة قانونية واتساب سوريا, استجابة خلال 24 ساعة, كاونسلو للاستشارات القانونية اتصل سوريا, استشارة قانونية إلكترونية سوريا"
            : "book legal consultation Syria, contact lawyer online Syria, WhatsApp legal consultation Syria, legal advice within 24 hours Syria, CounselO Legal contact Syria, book lawyer Syria")
          : (isRTL
            ? "احجز استشارة قانونية السعودية, تواصل مع محامي أونلاين, استشارة قانونية واتساب السعودية, استجابة خلال 24 ساعة, كاونسلو للاستشارات القانونية اتصل, استشارة فورية السعودية"
            : "book legal consultation Saudi Arabia, contact lawyer online KSA, WhatsApp legal consultation Saudi Arabia, legal advice within 24 hours, CounselO Legal contact, book lawyer KSA")}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "dateModified": "2026-11-18",
            "name": isRTL ? "تواصل مع كاونسلو للاستشارات القانونية" : "Contact CounselO Legal",
            "description": isUae
              ? (isRTL
                ? "تواصل أونلاين مع فريق كاونسلو للاستشارة والعقود والتمثيل القانوني في الإمارات، بالعربية أو الإنجليزية."
                : "Contact CounselO’s team online for legal advice, contracts and representation in the UAE, in Arabic or English.")
              : isSyr
              ? (isRTL
                ? "تواصل أونلاين مع فريق كاونسلو للاستشارة والعقود والتمثيل القانوني في سوريا، بالعربية أو الإنجليزية."
                : "Contact CounselO’s team online for legal advice, contracts and representation in Syria, in Arabic or English.")
              : (isRTL
                ? "تواصل أونلاين مع فريق كاونسلو للاستشارة والعقود والتمثيل القانوني في السعودية، بالعربية أو الإنجليزية."
                : "Contact CounselO’s team online for legal advice, contracts and representation in Saudi Arabia, in Arabic or English."),
            "url": pageUrl,
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": COUNSELO_ENTITY_IDS.organization,
            "name": "CounselO Legal",
            "telephone": "+966594850247",
            "email": "info@counselo-legal.com",
            "url": "https://counselo-legal.com",
            "founder": OMAR_AL_BAGHDADI,
            "areaServed": { "@type": "Country", "name": countryName },
            "contactPoint": { "@type": "ContactPoint", "telephone": "+966594850247", "contactType": "legal services", "availableLanguage": ["Arabic", "English"] },
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

      <section className="premium-page-hero py-24 lg:py-28 border-b border-[#d4af60]/20">
        <div className="premium-content-shell text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">{c.hero.heading}</h1>
          <div className="premium-hero-rule mx-auto mb-8" />
          <p className="text-xl text-white/75 max-w-2xl mx-auto leading-relaxed">{c.hero.subheading}</p>
          <a href="#consultation-request" className="mt-7 inline-flex min-h-11 items-center gap-3 bg-[#d4af60] px-5 py-3 font-semibold text-[#003d22] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
            {isRTL ? "تواصل مباشرة مع فريقنا" : "Contact our team directly"}<ArrowRight size={18} className="rtl:rotate-180" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section id="consultation-request" tabIndex={-1} aria-labelledby="consultation-request-heading" className="scroll-mt-28 bg-background py-14 lg:py-20" data-selected-service={details.selectedService || undefined}>
        <div className="premium-content-shell grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-8">
            <h2 id="consultation-request-heading" className="mb-4 text-3xl font-serif font-bold text-foreground">{isRTL ? "ابدأ الحديث مع فريق كاونسلو" : "Speak directly with CounselO"}</h2>
            <p className="mb-6 max-w-3xl text-muted-foreground leading-8">{isRTL
              ? "تواصل عبر واتساب أو البريد الإلكتروني أو الهاتف. شارك تفاصيل مسألتك والمستندات ذات الصلة مع فريقنا مباشرة."
              : "Contact us by WhatsApp, email or phone. Share your matter and relevant documents directly with our team."}</p>

            <div aria-live="polite">
              {details.selectedField && <div className="mb-5 border-s-2 border-[#b4924a] ps-4">
                <p className="text-sm text-muted-foreground">{isRTL ? "المجال القانوني" : "Legal field"}</p>
                <p className="font-semibold text-foreground">{details.selectedField}</p>
                {details.topicTitle && <p className="mt-1 text-foreground/80">{details.topicTitle}</p>}
              </div>}
              {details.consultationPrice && <div className="mb-6 border border-primary/20 bg-primary/5 p-5" data-consultation-category={details.consultationPrice.id} data-consultation-price={details.consultationPrice.amount} data-consultation-currency={details.consultationPrice.currency}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-semibold text-foreground">{isRTL ? "استشارة قانونية مكتوبة أونلاين" : "Written online legal consultation"}</p>
                  <p className="text-xl font-bold text-primary"><bdi>{details.priceLabel}</bdi></p>
                </div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{CONSULTATION_SCOPE[isRTL ? "ar" : "en"]}</p>
              </div>}
              {details.urgentSelected && <div className="mb-6 border-s-2 border-[#b4924a] bg-primary/5 p-5">
                <p className="text-sm leading-7 text-muted-foreground">{isRTL
                  ? "لإعداد مذكرة أو لائحة دعوى أو تدقيق عقد بصورة عاجلة، نؤكد التوافر ونتفق على الأتعاب بحسب العمل والموعد المطلوب قبل السداد."
                  : "For urgent memoranda, claim drafting or contract review, we confirm availability and agree fees for the work and deadline before payment."}</p>
                <Link href={urgentPath(isRTL, region)} className="mt-2 inline-block font-semibold text-primary underline underline-offset-4">{isRTL ? "تفاصيل المساعدة القانونية العاجلة" : "Urgent legal assistance details"}</Link>
              </div>}
            </div>

            <div className="flex flex-wrap gap-3">
              <a href={details.whatsappUrl} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-conversion-position="contact-direct" data-region={region} data-lang={isRTL ? "ar" : "en"} className="inline-flex min-h-12 items-center justify-center gap-3 bg-primary px-5 py-3 font-semibold text-white hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
                <MessageCircle size={20} aria-hidden="true" />{isRTL ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
              </a>
              <a href={details.emailUrl} data-cta="email" data-conversion-position="contact-direct" data-region={region} data-lang={isRTL ? "ar" : "en"} className="inline-flex min-h-12 items-center justify-center gap-3 border border-primary px-5 py-3 font-semibold text-primary hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
                <Mail size={20} aria-hidden="true" />{isRTL ? "راسلنا بالبريد الإلكتروني" : "Email our team"}
              </a>
              <a href={details.phoneUrl} data-cta="phone" data-conversion-position="contact-direct" data-region={region} data-lang={isRTL ? "ar" : "en"} className="inline-flex min-h-12 items-center justify-center gap-3 px-5 py-3 font-semibold text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
                <Phone size={19} aria-hidden="true" />{isRTL ? "اتصل بنا" : "Call us"}
              </a>
            </div>
            {!isConsultation && <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">{isRTL
              ? "للاستشارات الأونلاين رسوم ثابتة منشورة. ويتولى فريق كاونسلو نفسه الصياغة والتمثيل وسائر الأعمال القانونية بأتعاب نتفق عليها قبل البدء."
              : "Online consultations have published fixed fees. The same CounselO team handles drafting, representation and other legal work at fees agreed before work begins."}</p>}
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <Link href={`${regionPrefix}/services#complete-service-directory`} className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">{isRTL ? "الخدمات وأسعار الاستشارات" : "Services and consultation fees"}</Link>
              <Link href={`${regionPrefix}/privacy-policy`} className="inline-flex min-h-11 items-center text-muted-foreground underline underline-offset-4">{isRTL ? "سياسة الخصوصية" : "Privacy policy"}</Link>
            </div>
          </div>

          <aside className="min-w-0 border-t border-border pt-8 lg:col-span-4 lg:border-s lg:border-t-0 lg:ps-8 lg:pt-0" aria-labelledby="contact-details-heading">
            <h2 id="contact-details-heading" className="mb-6 text-2xl font-serif font-bold text-foreground">{c.firmDetails.heading}</h2>
            <dl className="space-y-6">
              {[
                { Icon: Phone, label: c.firmDetails.phoneTitle, value: c.firmDetails.phone, href: details.phoneUrl },
                { Icon: Mail, label: c.firmDetails.emailTitle, value: c.firmDetails.email, href: details.emailUrl },
                { Icon: Clock, label: c.firmDetails.hoursTitle, value: c.firmDetails.hours, href: undefined },
              ].map(({ Icon, label, value, href }) => <div key={label} className="flex items-start gap-3">
                <Icon className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div className="min-w-0">
                  <dt className="font-medium text-foreground">{label}</dt>
                  <dd className="mt-1 text-muted-foreground leading-7">{href
                    ? <a href={href} className="break-all underline underline-offset-4" dir="ltr">{value}</a>
                    : <span className="whitespace-pre-line">{value}</span>}</dd>
                </div>
              </div>)}
            </dl>
          </aside>
        </div>
      </section>

      <ConsultationSteps isArabic={isRTL} isConsultation={isConsultation} />
    </div>
  );
}
