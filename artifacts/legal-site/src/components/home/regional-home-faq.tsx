import { Helmet } from "react-helmet-async";
import type { Region } from "@workspace/api-zod/browser";
import { regionalHomeFaqs } from "./regional-home-content";
export function RegionalHomeFaq({ region, isArabic }: { region: Region; isArabic: boolean }) {
  const questions = regionalHomeFaqs(region, isArabic);
  return <section className="practice-directory" aria-labelledby="regional-faq-title" dir={isArabic ? "rtl" : "ltr"}>
    <Helmet><script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"FAQPage",inLanguage:isArabic?"ar":"en",mainEntity:questions.map(q=>({"@type":"Question",name:q.question,acceptedAnswer:{"@type":"Answer",text:q.answer}}))}).replace(/</g,"\\u003c")}</script></Helmet>
    <h2 id="regional-faq-title">{isArabic ? "أسئلة عن الاستشارة والمستندات والاختصاص" : "Questions about consultation, documents and jurisdiction"}</h2>
    {questions.map(q=><details key={q.question} className="border-t border-border py-4"><summary className="cursor-pointer font-semibold py-2">{q.question}</summary><p className="pt-3 leading-8 text-muted-foreground">{q.answer}</p></details>)}
  </section>;
}
