import { Link } from "wouter";
import { type Region } from "@workspace/api-zod/browser";
import { getContactServiceOptions } from "@/lib/contact-service-selection";

/** Intake choices match each country's published consultation categories. */
export function SaudiConsultationStart({ isArabic, region = "sa" }: { isArabic: boolean; region?: Region }) {
  const prefix = `/${region}${isArabic ? "/ar" : ""}`;
  const services = getContactServiceOptions(region, isArabic);
  return <section className="border-b border-border bg-white py-12 lg:py-16" aria-labelledby="sa-consultation-start">
    <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
      <h2 id="sa-consultation-start" className="font-serif text-3xl leading-tight text-foreground md:text-4xl">{isArabic ? "اختر الخدمة" : "Choose a service"}</h2>
      <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">{isArabic ? "اختر مجال استشارتك واطّلع على رسومه الثابتة المنشورة. تتلقى استشارة مهنية مكتوبة ومفصلة، تشمل المناقشة والأسئلة ضمن الموضوع نفسه." : "Choose your consultation category and view its published fixed fee. Receive detailed professional written advice, with discussion and questions on the same topic included."}</p>
      <form action={`${prefix}/contact#consultation-request`} method="get" className="mt-7 flex max-w-3xl flex-col items-stretch gap-4 sm:flex-row sm:items-end">
        <div className="min-w-0 flex-1">
          <label htmlFor="sa-service-choice" className="mb-2 block font-semibold">{isArabic ? "مجال المسألة" : "Practice area"}</label>
          <select id="sa-service-choice" name="service" required defaultValue="" className="min-h-12 w-full min-w-0 rounded-none border border-primary/30 bg-white px-3 py-3 text-base text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
            <option value="" disabled>{isArabic ? "اختر الخدمة" : "Choose a service"}</option>
            {services.map(service => <option key={service.value} value={service.value}>{service.label}</option>)}
          </select>
        </div>
        <button type="submit" data-cta="contact" data-conversion-position="sa-service-choice" data-region={region} data-lang={isArabic ? "ar" : "en"} className="min-h-12 bg-primary px-5 py-3 font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">{isArabic ? "ابدأ استشارتك الأونلاين" : "Start your online consultation"}</button>
      </form>
      <p className="mt-5"><Link href={`${prefix}/services#complete-service-directory`} className="text-primary underline underline-offset-4">{isArabic ? "اطّلع على الخدمات وأسعار الاستشارات" : "View services and consultation fees"}</Link></p>
      <p className="mt-6 text-sm leading-7 text-muted-foreground">{isArabic ? "يقدم فريق كاونسلو الاستشارة والإعداد والتمثيل والمتابعة ضمن خدمة واحدة بالعربية أو الإنجليزية. ويتولى الفريق نفسه التواصل معك أونلاين والعمل أمام المحاكم والجهات المختصة بأعضائه المخوّلين في الدولة المعنية." : "CounselO’s team provides consultation, preparation, representation and follow-up as one service in Arabic or English. The same team handles online communication and court, filing and enforcement work through its appropriately authorised members."} {" "}<Link className="text-primary underline underline-offset-4" href={`${prefix}/about`}>{isArabic ? "تعرّف على الفريق ونطاق العمل" : "Meet the team and understand the service scope"}</Link></p>
    </div>
  </section>;
}

export function saudiContactHref(channel: "whatsapp" | "email", isArabic: boolean, region: Region = "sa"): string {
  const country = ({ sa: ["السعودية", "Saudi Arabia"], syr: ["سوريا", "Syria"], uae: ["الإمارات", "the UAE"] })[region][isArabic ? 0 : 1];
  const subject = isArabic ? `طلب استشارة قانونية في ${country}` : `Legal consultation request for ${country}`;
  const message = isArabic ? `مرحباً كاونسلو، أرغب في استشارة قانونية مكتوبة بشأن مسألة في ${country} بالرسوم المنشورة للمجال المناسب.` : `Hello CounselO, I would like a written legal consultation about a matter in ${country} at the published fee for the relevant category.`;
  return channel === "whatsapp"
    ? `https://wa.me/966594850247?text=${encodeURIComponent(message)}`
    : `mailto:info@counselo-legal.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}
