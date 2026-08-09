import { useEffect, useMemo, useState, type ComponentProps, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, BookOpen, BriefcaseBusiness, Clock } from "lucide-react";
import { Link } from "wouter";
import type { InitialBlogPost } from "@/App";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type WorkSamplePublic, localized } from "@/lib/work-samples";
import { fetchPublicJson } from "@/lib/public-api";

type LatestContentCarouselsProps = {
  isArabic: boolean;
  region?: "sa" | "syr" | "uae";
  serviceSlug?: string;
};

function newestFirst<T extends { date: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

function matchesRegion(text: string, region?: "sa" | "syr" | "uae"): boolean {
  if (!region) return true;
  const normalized = text.toLowerCase();
  const mentionsSaudi = /(saudi|السعود|alsawd|alnzam-alsawdy)/i.test(normalized);
  const mentionsSyria = /(syria|syrian|سوريا|السوري|alswry)/i.test(normalized);
  const mentionsUae = /(uae|united arab emirates|emirates|dubai|abu dhabi|difc|adgm|الإمارات|دبي|أبوظبي)/i.test(normalized);
  if (region === "syr") return mentionsSyria || (!mentionsSaudi && !mentionsUae);
  if (region === "uae") return mentionsUae || (!mentionsSaudi && !mentionsSyria);
  return mentionsSaudi || (!mentionsSyria && !mentionsUae);
}

function CardLink({
  href,
  isArabic,
  children,
}: {
  href: string;
  isArabic: boolean;
  children: ReactNode;
}) {
  const Arrow = isArabic ? ArrowLeft : ArrowRight;
  return (
    <Link href={href} className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
      {children}
      <Arrow className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

function CarouselControls({ isArabic, label }: { isArabic: boolean; label: string }) {
  return (
    <>
      <CarouselPrevious
        aria-label={isArabic ? `الشريحة السابقة في ${label}` : `Previous ${label} slide`}
        className="start-2 left-auto top-1/2 z-10 h-10 w-10 -translate-y-1/2 border-primary/25 bg-background/95 text-primary shadow-md hover:bg-primary hover:text-white"
      />
      <CarouselNext
        aria-label={isArabic ? `الشريحة التالية في ${label}` : `Next ${label} slide`}
        className="end-2 right-auto top-1/2 z-10 h-10 w-10 -translate-y-1/2 border-primary/25 bg-background/95 text-primary shadow-md hover:bg-primary hover:text-white"
      />
    </>
  );
}

function AutoCarousel({
  isArabic,
  label,
  opts,
  children,
}: {
  isArabic: boolean;
  label: string;
  opts: ComponentProps<typeof Carousel>["opts"];
  children: ReactNode;
}) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api || api.scrollSnapList().length <= 1) return;
    const interval = window.setInterval(() => api.scrollNext(), 3_000);
    return () => window.clearInterval(interval);
  }, [api]);

  return (
    <div data-autoplay-interval="3000">
      <Carousel setApi={setApi} opts={{ ...opts, loop: true }} aria-label={label}>
        <CarouselContent className="py-1">{children}</CarouselContent>
        <CarouselControls isArabic={isArabic} label={label} />
      </Carousel>
    </div>
  );
}

export function LatestContentCarousels({
  isArabic,
  region,
  serviceSlug,
}: LatestContentCarouselsProps) {
  const ssrPosts = typeof window !== "undefined" ? window.__SSR_POSTS__ : undefined;
  const ssrWorkSamples = typeof window !== "undefined" ? window.__SSR_WORK_SAMPLES__ : undefined;
  const isLocalStandalonePreview = typeof window !== "undefined" &&
    (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost");
  const { data: posts = [] } = useQuery<InitialBlogPost[]>({
    queryKey: ["blog-posts"],
    queryFn: () => fetchPublicJson<InitialBlogPost[]>("/api/blog/posts"),
    // The build-time list is only a visual placeholder. Fetch immediately so
    // posts published after the last deployment can enter the carousel.
    initialData: ssrPosts,
    enabled: !isLocalStandalonePreview || !ssrPosts?.length,
    staleTime: 60_000,
    refetchInterval: 60_000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: "always",
  });
  const { data: workSamples = [] } = useQuery<WorkSamplePublic[]>({
    queryKey: ["work-samples"],
    queryFn: () => fetchPublicJson<WorkSamplePublic[]>("/api/work"),
    initialData: ssrWorkSamples,
    enabled: !isLocalStandalonePreview || !ssrWorkSamples?.length,
    staleTime: 60_000,
    refetchInterval: 60_000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: "always",
  });

  const latestPosts = useMemo(() => {
    const regionalPosts = posts
      .filter((post) => post.published !== false)
      .filter((post) => matchesRegion(
        `${post.slug} ${post.titleEn} ${post.titleAr} ${post.excerptEn} ${post.excerptAr}`,
        region,
      ));
    const assignedPosts = serviceSlug
      ? regionalPosts.filter((post) => post.relatedServiceSlugs?.includes(serviceSlug))
      : regionalPosts;
    // AI-assigned relationships are preferred. The regional fallback keeps
    // older records discoverable until their metadata is backfilled.
    return newestFirst(assignedPosts.length > 0 ? assignedPosts : regionalPosts).slice(0, 10);
  }, [posts, region, serviceSlug]);
  const latestWork = useMemo(
    () => {
      const regionalWork = workSamples
        .filter((sample) => sample.published !== false)
        .filter((sample) => matchesRegion(
          `${sample.jurisdictionEn} ${sample.jurisdictionAr} ${sample.titleEn} ${sample.titleAr} ${sample.summaryEn} ${sample.summaryAr} ${sample.challengeEn} ${sample.challengeAr} ${sample.approachEn} ${sample.approachAr} ${sample.outcomeEn} ${sample.outcomeAr}`,
          region,
        ));
      const assigned = serviceSlug
        ? regionalWork.filter((sample) => sample.relatedServiceSlugs?.includes(serviceSlug))
        : regionalWork;
      const jurisdictionMatches = (assigned.length > 0 ? assigned : regionalWork).filter((sample) =>
        matchesRegion(
          `${sample.jurisdictionEn} ${sample.jurisdictionAr} ${sample.titleEn} ${sample.titleAr} ${sample.summaryEn} ${sample.summaryAr} ${sample.challengeEn} ${sample.challengeAr} ${sample.approachEn} ${sample.approachAr} ${sample.outcomeEn} ${sample.outcomeAr}`,
          region,
        ),
      );
      return newestFirst(jurisdictionMatches).slice(0, 10);
    },
    [region, serviceSlug, workSamples],
  );
  const carouselOptions = useMemo(
    () => ({ align: "start" as const, direction: isArabic ? ("rtl" as const) : ("ltr" as const) }),
    [isArabic],
  );

  const isService = Boolean(serviceSlug);
  const testimonialWork = serviceSlug
    ? latestWork.filter((sample) => sample.testimonials?.some((testimonial) => testimonial.text.trim()))
    : [];
  const visibleWork = isService && testimonialWork.length > 0 ? testimonialWork : latestWork;
  const showingTestimonials = isService && testimonialWork.length > 0;
  const articleLabel = isArabic ? "أحدث المقالات" : "latest articles";
  const workLabel = isArabic ? "أحدث الأعمال" : "latest work";

  if (latestPosts.length === 0 && latestWork.length === 0) {
    return (
      <section
        className="border-y border-border bg-[#eef4f0] py-16 lg:py-20"
        aria-labelledby={isArabic ? "latest-content-empty-heading-ar" : "latest-content-empty-heading"}
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7735]">
            {isArabic ? "محتوى كاونسلو" : "CounselO content"}
          </p>
          <h2
            id={isArabic ? "latest-content-empty-heading-ar" : "latest-content-empty-heading"}
            className="mb-5 font-serif text-4xl font-medium text-foreground md:text-5xl"
          >
            {isArabic ? "أحدث المقالات والأعمال القانونية" : "Latest legal articles and work"}
          </h2>
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {isArabic
              ? "استكشف المقالات القانونية ونماذج الأعمال المنشورة حديثاً من كاونسلو."
              : "Explore CounselO's latest legal articles and published work samples."}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/blog" className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary/90">
              {isArabic ? "أحدث المقالات" : "Latest articles"}
              {isArabic ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </Link>
            <Link href="/our-work" className="inline-flex items-center gap-2 border border-primary/30 bg-white px-5 py-3 text-sm font-semibold text-primary hover:border-primary">
              {isArabic ? "أحدث الأعمال" : "Latest our work"}
              {isArabic ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="border-y border-border bg-[#eef4f0] py-24 lg:py-28"
      aria-labelledby={isService ? "related-content-heading" : isArabic ? "latest-content-heading-ar" : "latest-content-heading"}
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="mb-14 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7735]">
            {isService
              ? isArabic ? "محتوى مرتبط" : "Related content"
              : isArabic ? "منشور حديثاً" : "Recently published"}
          </p>
          <h2
            id={isService ? "related-content-heading" : isArabic ? "latest-content-heading-ar" : "latest-content-heading"}
            className="mb-5 font-serif text-4xl font-medium text-foreground md:text-5xl"
          >
            {isService
              ? isArabic ? "أحدث المقالات والأعمال المرتبطة" : "Latest related articles and work"
              : isArabic ? "أحدث مقالاتنا وأعمالنا القانونية" : "Latest legal articles and work"}
          </h2>
          <div className="counselo-gold-rule mb-6" />
          <p className="text-lg leading-relaxed text-muted-foreground">
            {isService
              ? isArabic
                ? "محتوى إضافي عيّنه النظام تلقائياً لهذه الخدمة."
                : "Additional content automatically assigned to this service."
              : isArabic
                ? "محتوى حقيقي يُحدَّث تلقائياً عند نشر مقال أو نموذج عمل جديد."
                : "Real content that updates automatically whenever a new article or work sample is published."}
          </p>
        </div>

        <div className="space-y-16">
          {latestPosts.length > 0 ? (
            <div data-content-carousel="articles">
              <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
                    {isArabic ? "مركز المعرفة" : "Knowledge centre"}
                  </p>
                  <h3 className="font-serif text-2xl font-bold text-foreground">
                    {isArabic ? "أحدث المقالات" : "Latest articles"}
                  </h3>
                </div>
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                  {isArabic ? "عرض جميع المقالات" : "View all articles"}
                  {isArabic ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </Link>
              </div>
              <AutoCarousel isArabic={isArabic} label={articleLabel} opts={carouselOptions}>
                {latestPosts.map((post) => {
                  const useArabic = Boolean(post.titleAr) && (isArabic || !post.titleEn);
                  return (
                    <CarouselItem key={post.slug} className="sm:basis-1/2 lg:basis-1/3">
                      <article
                        data-content-title={useArabic ? post.titleAr : post.titleEn}
                        className="flex h-full min-h-64 flex-col border-y border-e border-border bg-background p-7 transition-colors hover:bg-white"
                        dir={useArabic ? "rtl" : "ltr"}
                      >
                        <div className="mb-5 flex items-center justify-between gap-3">
                          <BookOpen className="h-6 w-6 text-primary" aria-hidden="true" />
                          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                            {useArabic ? post.categoryAr : post.categoryEn}
                          </span>
                        </div>
                        <h4 className="mb-3 font-serif text-xl font-bold leading-snug text-foreground">
                          {useArabic ? post.titleAr : post.titleEn}
                        </h4>
                        <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                          {useArabic ? post.excerptAr : post.excerptEn}
                        </p>
                        <div className="mb-5 flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{post.readTime} {isArabic ? "دقائق قراءة" : "min read"}</span>
                        </div>
                        <CardLink href={`/blog/${post.slug}`} isArabic={isArabic}>
                          {isArabic ? "اقرأ المقال" : "Read article"}
                        </CardLink>
                      </article>
                    </CarouselItem>
                  );
                })}
              </AutoCarousel>
            </div>
          ) : null}

          {visibleWork.length > 0 ? (
            <div data-content-carousel="work">
              <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
                    {showingTestimonials
                      ? isArabic ? "شهادات مرتبطة بأعمال منشورة" : "Testimonials from published work"
                      : isArabic ? "خبرة يمكنك الاطلاع عليها" : "Experience you can examine"}
                  </p>
                  <h3 className="font-serif text-2xl font-bold text-foreground">
                    {showingTestimonials
                      ? isArabic ? "ما يقوله أصحاب الأعمال المنشورة" : "What clients say about related work"
                      : isArabic ? "أحدث أعمالنا" : "Latest our work"}
                  </h3>
                </div>
                <Link
                  href={isArabic ? "/ar/our-work" : "/our-work"}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  {isArabic ? "عرض جميع الأعمال" : "View all work"}
                  {isArabic ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </Link>
              </div>
              <AutoCarousel isArabic={isArabic} label={workLabel} opts={carouselOptions}>
                {visibleWork.map((sample) => (
                  <CarouselItem key={sample.slug} className="sm:basis-1/2 lg:basis-1/3">
                    <article
                      data-content-title={localized(sample.titleEn, sample.titleAr, isArabic ? "ar" : "en")}
                      className="flex h-full min-h-64 flex-col border-y border-e border-border bg-background p-7 transition-colors hover:bg-white"
                    >
                      <div className="mb-5 flex items-center justify-between gap-3">
                        <BriefcaseBusiness className="h-6 w-6 text-primary" aria-hidden="true" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                          {localized(sample.workTypeEn, sample.workTypeAr, isArabic ? "ar" : "en")}
                        </span>
                      </div>
                      <h4 className="mb-3 font-serif text-xl font-bold leading-snug text-foreground">
                        {localized(sample.titleEn, sample.titleAr, isArabic ? "ar" : "en")}
                      </h4>
                      {isService && sample.testimonials?.find((testimonial) => testimonial.text.trim())?.text ? (
                        <blockquote className="mb-6 border-s-2 border-[#b4924a] bg-[#f8faf8] px-4 py-3 text-sm italic leading-6 text-foreground/80">
                          “{sample.testimonials.find((testimonial) => testimonial.text.trim())?.text}”
                        </blockquote>
                      ) : (
                        <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                          {localized(sample.summaryEn, sample.summaryAr, isArabic ? "ar" : "en")}
                        </p>
                      )}
                      <p className="mb-5 text-xs text-muted-foreground">
                        {region === "syr"
                          ? (isArabic ? "سوريا" : "Syria")
                          : region === "sa"
                            ? (isArabic ? "السعودية" : "Saudi Arabia")
                            : localized(sample.jurisdictionEn, sample.jurisdictionAr, isArabic ? "ar" : "en")}
                      </p>
                      {(!serviceSlug || sample.relatedServiceSlugs?.includes(serviceSlug)) && sample.testimonials?.find((testimonial) => testimonial.text.trim())?.text && (
                        <div className="mb-5 text-xs text-muted-foreground">
                          <span className="mb-1 block text-[0.65rem] font-semibold not-italic uppercase tracking-[0.14em] text-primary">
                            {isArabic ? "شهادة مرتبطة بنموذج العمل" : "Testimonial from this work sample"}
                          </span>
                        </div>
                      )}
                      <CardLink href={`${isArabic ? "/ar" : ""}/our-work/${sample.slug}`} isArabic={isArabic}>
                        {isArabic ? "عرض نموذج العمل" : "View work sample"}
                      </CardLink>
                    </article>
                  </CarouselItem>
                ))}
              </AutoCarousel>
            </div>
          ) : null}

          {!isService && latestPosts.length === 0 && latestWork.length === 0 ? (
            <p className="border border-dashed border-border p-8 text-center text-muted-foreground">
              {isArabic ? "سيظهر المحتوى المنشور هنا تلقائياً." : "Published content will appear here automatically."}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
