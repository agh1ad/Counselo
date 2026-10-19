import { Link } from "wouter";
import { getServicesForRegion, type Region } from "@workspace/api-zod/browser";

/** The registry keeps the enquiry selector aligned with each jurisdiction. */
export function SaudiConsultationStart({ isArabic, region = "sa" }: { isArabic: boolean; region?: Region }) {
  const prefix = `/${region}${isArabic ? "/ar" : ""}`;
  const services = getServicesForRegion(region);
  return <section className="border-b border-border bg-white py-12 lg:py-16" aria-labelledby="sa-consultation-start">
    <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
      <h2 id="sa-consultation-start" className="font-serif text-3xl leading-tight text-foreground md:text-4xl">{isArabic ? "اختر الخدمة" : "Choose a service"}</h2>
      <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">{isArabic ? "اختر الخدمة لبدء الطلب. نؤكد نطاق العمل والأتعاب وموعد التسليم قبل الدفع." : "Choose a service to start your request. We confirm the scope, fee and delivery date before payment."}</p>
      <form action={`${prefix}/contact#consultation-request`} method="get" className="mt-7 flex max-w-3xl flex-col items-stretch gap-4 sm:flex-row sm:items-end">
        <div className="min-w-0 flex-1">
          <label htmlFor="sa-service-choice" className="mb-2 block font-semibold">{isArabic ? "مجال المسألة" : "Practice area"}</label>
          <select id="sa-service-choice" name="service" required defaultValue="" className="min-h-12 w-full min-w-0 rounded-none border border-primary/30 bg-white px-3 py-3 text-base text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
            <option value="" disabled>{isArabic ? "اختر الخدمة" : "Choose a service"}</option>
            {services.map(service => <option key={service.slug} value={service.slug}>{isArabic ? service.titleAr : service.titleEn}</option>)}
          </select>
        </div>
        <button type="submit" data-cta="contact" data-conversion-position="sa-service-choice" data-region={region} data-lang={isArabic ? "ar" : "en"} className="min-h-12 bg-primary px-5 py-3 font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">{isArabic ? "اطلب تحديد النطاق والرسوم" : "Request the scope and fee"}</button>
      </form>
      <p className="mt-5"><Link href={`${prefix}/services`} className="text-primary underline underline-offset-4">{isArabic ? "استعرض نطاق كل خدمة والمستندات المطلوبة" : "Explore each service and the documents to prepare"}</Link></p>
      <p className="mt-6 text-sm leading-7 text-muted-foreground">{isArabic ? "تُقدم الاستشارة بالعربية أو الإنجليزية بإشراف عمر البغدادي. التمثيل أمام المحاكم والإيداع والتنفيذ الإجرائي تحتاج إلى تكليف مستقل مع المهني المرخص محلياً." : "Consultations are available in Arabic or English under Omar Al-Baghdadi’s professional direction. Court representation, filing and enforcement procedures require a separate engagement with the locally licensed professional."} {" "}<Link className="text-primary underline underline-offset-4" href={`${prefix}/about`}>{isArabic ? "تعرّف على الفريق ونطاق العمل" : "Meet the team and understand the service scope"}</Link></p>
    </div>
  </section>;
}

export function saudiContactHref(channel: "whatsapp" | "email", isArabic: boolean, region: Region = "sa"): string {
  const country = ({ sa: ["السعودية", "Saudi Arabia"], syr: ["سوريا", "Syria"], uae: ["الإمارات", "the UAE"] })[region][isArabic ? 0 : 1];
  const subject = isArabic ? `طلب استشارة قانونية في ${country}` : `Legal consultation request for ${country}`;
  const message = isArabic ? `مرحباً كاونسلو، أرغب في تحديد نطاق ورسوم استشارة قانونية بشأن مسألة في ${country}.` : `Hello CounselO, I would like to confirm the scope and fee for a legal consultation about a matter in ${country}.`;
  return channel === "whatsapp"
    ? `https://wa.me/966594850247?text=${encodeURIComponent(message)}`
    : `mailto:info@counselo-legal.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}
