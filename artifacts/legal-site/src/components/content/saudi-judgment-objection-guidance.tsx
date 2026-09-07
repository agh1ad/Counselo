import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { SAUDI_JUDGMENT_OBJECTION_LIBRARY_GUIDANCE as guidance } from "@/lib/saudi-judgment-objection-library-guidance";

export function SaudiJudgmentObjectionGuidance() {
  const { isRTL } = useLanguage();
  const lang = isRTL ? "ar" : "en";
  return (
    <section id={guidance.id} aria-labelledby={`${guidance.id}-title`} className="scroll-mt-28 border-y border-border bg-[#f8f5ed] px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1260px]">
        <h2 id={`${guidance.id}-title`} className="max-w-4xl font-serif text-3xl leading-snug text-foreground">{guidance.title[lang]}</h2>
        <p className="mb-3 mt-5 max-w-4xl leading-8 text-muted-foreground">{guidance.scope[lang]}</p>
        <p className="mb-6 text-sm text-muted-foreground">{isRTL ? "تحديث هذا الإرشاد:" : "Guidance updated:"} <time dateTime={guidance.reviewedAt}>{guidance.reviewedAt}</time></p>
        <div className="border-t border-border">
          {guidance.answers.map(answer => (
            <details key={answer.id} className="border-b border-border py-5">
              <summary className="cursor-pointer text-start font-semibold leading-7">{answer[lang].q}</summary>
              <p className="mt-4 max-w-4xl leading-8 text-muted-foreground">{answer[lang].a}</p>
              <ul className="mt-3 space-y-2">
                {answer.sources.map(source => <li key={source.href}><a href={source.href} className="text-primary underline underline-offset-4">{source[lang]}</a></li>)}
              </ul>
            </details>
          ))}
        </div>
        <nav aria-label={isRTL ? "إرشادات الاعتراض المرتبطة" : "Related objection guidance"} className="mt-7">
          <ul className="flex flex-wrap gap-x-7 gap-y-4">
            {guidance.relatedLinks.map(link => <li key={link.enHref}><Link href={isRTL ? link.arHref : link.enHref} className="text-primary underline underline-offset-4">{link[lang]}</Link></li>)}
          </ul>
        </nav>
      </div>
    </section>
  );
}
