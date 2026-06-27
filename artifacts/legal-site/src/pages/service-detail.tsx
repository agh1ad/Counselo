import { motion } from "framer-motion";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ServiceDetail() {
  const params = useParams();
  const id = params.id as string;
  const { t, isRTL } = useLanguage();
  const sd = t.serviceDetail;
  const data = sd.services[id as keyof typeof sd.services];

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">{sd.notFound}</h1>
          <Link href="/services" className="text-primary hover:underline">{sd.notFoundLink}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-background min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border py-4 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">{sd.breadcrumb.home}</Link>
            <ChevronRight className={`h-4 w-4 mx-2 ${isRTL ? "rotate-180" : ""}`} />
            <Link href="/services" className="hover:text-primary transition-colors">{sd.breadcrumb.services}</Link>
            <ChevronRight className={`h-4 w-4 mx-2 ${isRTL ? "rotate-180" : ""}`} />
            <span className="text-foreground font-medium">{data.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Link href="/services" className="inline-flex items-center text-primary mb-8 hover:underline underline-offset-4 text-sm font-medium">
                <ArrowLeft className={`me-2 h-4 w-4 ${isRTL ? "rotate-180" : ""}`} /> {sd.backLink}
              </Link>
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">{data.title}</h1>
              <p className="text-2xl text-primary font-serif italic mb-10">{data.subtitle}</p>
              <div className="prose prose-green max-w-none mb-16">
                <p className="text-lg text-muted-foreground leading-relaxed">{data.overview}</p>
              </div>

              <h2 className="text-3xl font-serif font-bold text-foreground mb-8 border-b border-border pb-4">{sd.coversHeading}</h2>
              <div className="grid sm:grid-cols-2 gap-6 mb-16">
                {data.covers.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-card border border-border p-4 hover:border-primary/40 transition-colors">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-3xl font-serif font-bold text-foreground mb-8 border-b border-border pb-4">{sd.processHeading}</h2>
              <div className="space-y-8">
                {data.process.map((step, i) => (
                  <div key={i} className="flex gap-6 relative">
                    {i !== data.process.length - 1 && (
                      <div className="absolute start-6 top-14 bottom-0 w-px bg-border" />
                    )}
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-serif font-bold text-xl relative z-10">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <motion.div initial={{ opacity: 0, x: isRTL ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-28 bg-primary p-8 text-white">
              <h3 className="text-2xl font-serif font-bold text-white mb-4">{sd.sidebar.heading}</h3>
              <div className="w-12 h-1 bg-white/40 mb-6" />
              <p className="text-white/75 mb-8 leading-relaxed">
                {sd.sidebar.descPrefix}{data.title.toLowerCase()}{sd.sidebar.descSuffix}
              </p>
              <Link href={`/contact?service=${id}`}>
                <Button className="w-full py-6 text-lg rounded-none bg-white text-primary hover:bg-white/90">{sd.sidebar.ctaBtn}</Button>
              </Link>
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm text-white/60 mb-2">{sd.sidebar.callLabel}</p>
                <p className="text-white font-mono font-medium text-lg">{sd.sidebar.phone}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
