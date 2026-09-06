import { useLanguage } from "@/contexts/LanguageContext";
import { SEARCH_INTENT_EDITORIAL } from "@/lib/search-intent-editorial-data";

export function SearchIntentGuidance({ page }: { page: "home" | "contact" | "library" }) {
  const { isRTL } = useLanguage();
  const faqs = SEARCH_INTENT_EDITORIAL.filter(entry => entry.shared === page).map(entry => entry[isRTL ? "ar" : "en"]);
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
