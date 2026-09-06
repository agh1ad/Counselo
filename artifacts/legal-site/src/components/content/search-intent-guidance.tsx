import { useRegion } from "@/contexts/RegionContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { editorialFaqs } from "@/lib/search-intent-editorial";

export function SearchIntentGuidance({ page }: { page: "home" | "contact" | "library" }) {
  const { region, regionPrefix } = useRegion();
  const { isRTL } = useLanguage();
  const path = page === "library" ? (isRTL ? "/ar/legal-library" : "/legal-library") : page === "home" ? regionPrefix : `${regionPrefix}/contact`;
  const faqs = editorialFaqs(path, region, isRTL);
  if (!faqs.length) return null;
  return <section className="premium-content-shell my-12 w-full" aria-labelledby="search-intent-guidance-title">
    <h2 id="search-intent-guidance-title" className="mb-6 font-serif text-3xl text-foreground">{isRTL ? "أسئلة تساعدك على تحديد الخطوة التالية" : "Questions to clarify your next step"}</h2>
    <div className="border-t border-border">
      {faqs.map(faq => <details key={faq.q} className="group border-b border-border py-5">
        <summary className="cursor-pointer text-start font-semibold leading-7">{faq.q}</summary>
        <p className="mt-4 max-w-4xl leading-8 text-muted-foreground">{faq.a}</p>
      </details>)}
    </div>
  </section>;
}
