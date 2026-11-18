import { COUNSELO_ENTITY_IDS, CONSULTATION_SCOPE, type ConsultationPrice } from "@workspace/api-zod/browser";

/** The stated offer buys the written consultation and discussion, not representation. */
export function consultationSchema(price: ConsultationPrice, isArabic: boolean, pageUrl: string, contactHref: string, topic: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#online-consultation`,
    name: isArabic ? `استشارة قانونية مكتوبة أونلاين: ${topic}` : `Written online legal consultation: ${topic}`,
    description: CONSULTATION_SCOPE[isArabic ? "ar" : "en"],
    serviceType: isArabic ? price.titleAr : price.titleEn,
    provider: { "@id": COUNSELO_ENTITY_IDS.organization },
    areaServed: { "@type": "Country", name: { sa: "Saudi Arabia", syr: "Syria", uae: "United Arab Emirates" }[price.region] },
    url: pageUrl,
    availableChannel: { "@type": "ServiceChannel", serviceUrl: new URL(contactHref, "https://counselo-legal.com").href, availableLanguage: ["Arabic", "English"] },
    offers: {
      "@type": "Offer",
      price: price.amount,
      priceCurrency: price.currency,
      description: CONSULTATION_SCOPE[isArabic ? "ar" : "en"],
      url: new URL(contactHref, "https://counselo-legal.com").href,
    },
  };
}
