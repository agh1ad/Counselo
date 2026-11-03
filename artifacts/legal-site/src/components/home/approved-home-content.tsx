import { Helmet } from "react-helmet-async";
import { CONSULTATION_PRODUCTS, COUNSELO_ENTITY_IDS } from "@workspace/api-zod/browser";
import { Search, MessageCircle, FileText, Route, Layers, Compass, ShieldCheck, Globe, Users } from "lucide-react";
import { homepageContent } from "./homepage-content";
import { homepageEditorial } from "./homepage-editorial";

const icons = [Search, MessageCircle, FileText, Route, Layers];
const section = "border-b border-[#0d4a31]/10 bg-white py-16 lg:py-20";
const container = "mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8";
const heading = "mb-5 font-serif text-3xl font-semibold leading-tight text-[#0d4a31] sm:text-4xl";

/** Approved content improvements presented within the original homepage design. */
export function ApprovedHomeServices({ isArabic }: { isArabic: boolean }) {
  const c = homepageContent[isArabic ? "ar" : "en"];
  const url = `https://counselo-legal.com${isArabic ? "/ar" : "/"}`;
  return <section className={section} aria-labelledby="consultation-package-heading">
    <Helmet><script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@graph":CONSULTATION_PRODUCTS.map(p=>({"@type":"Service","@id":`${url}#${p.id}`,name:isArabic?p.titleAr:p.titleEn,description:isArabic?p.bestForAr:p.bestForEn,url:`${url}#${p.id}`,provider:{"@id":COUNSELO_ENTITY_IDS.organization},areaServed:["Saudi Arabia","Syria","United Arab Emirates"].map(name=>({"@type":"Country",name}))}))}).replace(/</g,"\\u003c")}</script></Helmet>
    <div className={container}>
      <h2 id="consultation-package-heading" className={heading}><MessageCircle aria-hidden="true" className="mb-4 h-8 w-8" />{c.services}</h2>
      <p className="mb-8 max-w-3xl leading-8 text-muted-foreground">{c.servicesIntro}</p>
      <div className="grid gap-5 md:grid-cols-2">
        {CONSULTATION_PRODUCTS.map((p,i)=>{const Icon=icons[i]??FileText;return <article id={p.id} key={p.id} className={`border border-[#0d4a31]/20 p-6 ${i===4?"md:col-span-2 bg-[#eef4f0]":"bg-white"}`}>
          <Icon aria-hidden="true" className="mb-4 h-7 w-7 text-[#755615]" strokeWidth={1.5}/>
          <h3 className="mb-3 font-serif text-2xl text-[#0d4a31]">{isArabic?p.titleAr:p.titleEn}</h3>
          <p className="mb-4 leading-7 text-muted-foreground">{isArabic?p.bestForAr:p.bestForEn}</p>
          <p className="mb-2 text-sm font-semibold">{isArabic?"ضمن النطاق المتفق عليه:":"Within the agreed scope:"}</p>
          <ul className="list-disc space-y-2 ps-5 text-sm leading-7 text-muted-foreground">{(isArabic?p.includesAr:p.includesEn).map(item=><li key={item}>{item}</li>)}</ul>
        </article>;})}
      </div>
      <a href="#home-contact" className="mt-8 inline-flex min-h-12 items-center gap-3 border border-[#0d4a31] bg-[#0d4a31] px-6 py-3 font-semibold text-white">{c.primary}</a>
    </div>
  </section>;
}

export function ApprovedHomeGuidance({isArabic}:{isArabic:boolean}) {
 const e=homepageEditorial[isArabic?"ar":"en"];
 return <section className="border-b border-[#0d4a31]/10 bg-[#eef4f0] py-16 lg:py-20" aria-labelledby="consultation-situations-title"><div className={container}>
  <h2 id="consultation-situations-title" className={heading}><Compass aria-hidden="true" className="mb-4 h-8 w-8"/>{e.practiceTitle}</h2>
  <p className="mb-7 max-w-3xl leading-8 text-muted-foreground">{e.practiceIntro}</p>
  <div className="grid gap-5 md:grid-cols-2">{e.practices.map(([title,text])=><details key={title} className="border border-[#0d4a31]/15 bg-white p-5"><summary className="cursor-pointer py-2 font-semibold text-[#0d4a31]">{title}</summary><p className="mt-3 leading-8 text-muted-foreground">{text}</p></details>)}</div>
 </div></section>;
}

export function ApprovedHomeReasons({isArabic}:{isArabic:boolean}) {
 const c=homepageContent[isArabic?"ar":"en"]; const e=homepageEditorial[isArabic?"ar":"en"];
 return <section className={section} aria-labelledby="why-counselo-title"><div className={container}>
 <div className="mb-12 border-b border-[#0d4a31]/15 pb-10">
 <h2 className={heading}><Users aria-hidden="true" className="mb-4 h-8 w-8" />{e.clientsTitle}</h2>
 <div className="grid gap-6 md:grid-cols-3">{e.clients.map(([title,text])=><div key={title}><h3 className="mb-3 font-serif text-xl text-[#0d4a31]">{title}</h3><p className="leading-8 text-muted-foreground">{text}</p></div>)}</div>
 </div>
 <h2 id="why-counselo-title" className={heading}><ShieldCheck aria-hidden="true" className="mb-4 h-8 w-8"/>{c.why}</h2>
 <p className="mb-8 max-w-3xl leading-8 text-muted-foreground">{c.whyIntro}</p>
 <div className="grid gap-6 md:grid-cols-2">{c.reasons.map(([title,text])=><div key={title} className="border-s-2 border-[#b58b32] ps-5"><h3 className="mb-2 font-serif text-xl text-[#0d4a31]">{title}</h3><p className="leading-8 text-muted-foreground">{text}</p></div>)}</div>
 <div className="mt-10 border-t border-[#0d4a31]/15 pt-8"><h3 className="mb-4 flex items-center gap-3 font-serif text-2xl text-[#0d4a31]"><Globe aria-hidden="true"/>{e.crossTitle}</h3><p className="mb-4 leading-8 text-muted-foreground">{e.crossText}</p><p className="leading-8 text-muted-foreground">{e.crossNote}</p></div>
 </div></section>;
}
