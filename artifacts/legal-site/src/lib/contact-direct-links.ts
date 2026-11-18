import type { Region } from "@workspace/api-zod/browser";
import { getLegalProblemPage } from "./legal-problem-pages";
import { getContactConsultationPrice, getContactServiceOptions, getContactServicePrefill } from "./contact-service-selection";

/** Only registered regional fields and topics may enter a prepared contact draft. */
export function getDirectContactDetails(region: Region, search: string, isArabic: boolean) {
  const selectedService = getContactServicePrefill(region, search);
  const selectedField = getContactServiceOptions(region, isArabic).find(option => option.value === selectedService)?.label;
  const problemSlug = new URLSearchParams(search).get("problem") ?? "";
  const problem = getLegalProblemPage(region, selectedService, problemSlug);
  const topicTitle = problem ? (isArabic ? problem.titleAr : problem.titleEn) : undefined;
  const consultationPrice = getContactConsultationPrice(region, search, selectedService);
  const urgentSelected = selectedService === "urgent-legal-assistance";
  const country = isArabic ? { sa: "السعودية", syr: "سوريا", uae: "الإمارات" }[region] : { sa: "Saudi Arabia", syr: "Syria", uae: "the UAE" }[region];
  const matter = topicTitle ?? selectedField;
  const matterWithCountry = matter ? `${matter}${matter.endsWith(country) ? "" : ` ${isArabic ? "في" : "in"} ${country}`}` : country;
  const currencyAr = { SAR: "ريال سعودي", AED: "درهم إماراتي", USD: "دولار أمريكي" };
  const priceLabel = consultationPrice
    ? (isArabic ? `${consultationPrice.amount} ${currencyAr[consultationPrice.currency]}` : `${consultationPrice.currency} ${consultationPrice.amount}`)
    : undefined;
  const opening = consultationPrice
    ? (isArabic
      ? `مرحباً كاونسلو، أود طلب استشارة قانونية مكتوبة أونلاين بشأن ${matterWithCountry} بسعر ${priceLabel}، مع المناقشة والأسئلة ضمن موضوع الاستشارة.`
      : `Hello CounselO, I would like a written online legal consultation about ${matterWithCountry} at ${priceLabel}, including discussion and questions on the consultation topic.`)
    : (isArabic
      ? `مرحباً كاونسلو، أحتاج إلى دعم قانوني ${matter ? `بشأن ${matterWithCountry}` : `في ${country}`}.`
      : `Hello CounselO, I need legal support ${matter ? `with ${matterWithCountry}` : `in ${country}`}.`);
  const lines = [opening];
  if (topicTitle && selectedField) lines.push(isArabic ? `المجال القانوني: ${selectedField}.` : `Legal field: ${selectedField}.`);
  if (!consultationPrice) lines.push(urgentSelected
    ? (isArabic ? "أود تأكيد التوافر والأتعاب بحسب المستندات والموعد المطلوب." : "I would like to confirm availability and fees for my documents and deadline.")
    : (isArabic ? "أود مناقشة مسألتي والخدمة المناسبة مع فريقكم." : "I would like to discuss my matter and the support I need with your team."));
  const message = lines.join("\n");
  const subject = `${isArabic ? (consultationPrice ? "استشارة قانونية أونلاين" : "طلب دعم قانوني") : (consultationPrice ? "Online legal consultation" : "Legal support request")} — ${matterWithCountry}`;
  return {
    selectedService, selectedField, topicTitle, consultationPrice, priceLabel, urgentSelected, message,
    whatsappUrl: `https://wa.me/966594850247?text=${encodeURIComponent(message)}`,
    emailUrl: `mailto:info@counselo-legal.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`,
    phoneUrl: "tel:+966594850247",
  };
}
