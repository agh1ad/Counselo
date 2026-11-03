import { useEffect, useMemo, useState, type ComponentProps, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, BookOpen, BriefcaseBusiness, Clock, Pause, Play } from "lucide-react";
import { Link } from "wouter";
import type { InitialBlogPost } from "@/App";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { type WorkSamplePublic, localized, workSamplePath } from "@/lib/work-samples";
import { fetchPublicJson } from "@/lib/public-api";
import { blogPath } from "@workspace/api-zod/browser";
import { workJurisdictionRegion } from "@/lib/work-jurisdiction";
import { HomeLatestContent } from "./home-latest-content";
import "./latest-content-carousels.css";

type LatestContentCarouselsProps = {
  isArabic: boolean;
  region?: "sa" | "syr" | "uae";
  serviceSlug?: string;
  variant?: "home";
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
    <Link href={href} className="latest-content__read">
      {children}
      <Arrow className="h-4 w-4" aria-hidden="true" />
    </Link>
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
  const [position, setPosition] = useState({ current: 1, total: 0 });
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const Previous = isArabic ? ArrowRight : ArrowLeft;
  const Next = isArabic ? ArrowLeft : ArrowRight;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Keep the existing rotation; reduced-motion readers get an instant change instead of a sliding transition.
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (!api) return;
    const updatePosition = () => setPosition({ current: api.selectedScrollSnap() + 1, total: api.scrollSnapList().length });
    updatePosition();
    api.on("select", updatePosition);
    api.on("reInit", updatePosition);
    return () => {
      api.off("select", updatePosition);
      api.off("reInit", updatePosition);
    };
  }, [api]);

  useEffect(() => {
    if (!api || position.total <= 1 || paused || hovered) return;
    const interval = window.setInterval(() => api.scrollNext(), 3_000);
    return () => window.clearInterval(interval);
  }, [api, position.total, paused, hovered]);

  return (
    <div data-autoplay-interval="3000" onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)} onPointerLeave={() => setHovered(false)}>
      <Carousel setApi={setApi} opts={{ ...opts, loop: true, duration: reducedMotion ? 0 : 25 }} aria-label={label}>
        <CarouselContent className="latest-content__track" onFocusCapture={() => setPaused(true)} onPointerDown={() => setPaused(true)}>{children}</CarouselContent>
        {position.total > 1 && <div className="latest-content__controls">
          <div className="latest-content__progress" aria-hidden="true">
            <span style={{ width: `${100 / position.total}%`, insetInlineStart: `${(position.current - 1) / position.total * 100}%` }} />
          </div>
          <span className="latest-content__position" aria-label={isArabic ? `الشريحة ${position.current} من ${position.total}` : `Slide ${position.current} of ${position.total}`}>
            <b>{position.current.toLocaleString(isArabic ? "ar" : "en")}</b> / {position.total.toLocaleString(isArabic ? "ar" : "en")}
          </span>
          <button type="button" onClick={() => setPaused(!paused)} aria-label={isArabic ? `${paused ? "تشغيل" : "إيقاف"} الحركة التلقائية في ${label}` : `${paused ? "Play" : "Pause"} ${label} autoplay`}>
            {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
          </button>
          <button type="button" onFocus={() => setPaused(true)} onClick={() => api?.scrollPrev()} aria-label={isArabic ? `الشريحة السابقة في ${label}` : `Previous ${label} slide`}><Previous size={18} aria-hidden="true" /></button>
          <button type="button" onFocus={() => setPaused(true)} onClick={() => api?.scrollNext()} aria-label={isArabic ? `الشريحة التالية في ${label}` : `Next ${label} slide`}><Next size={18} aria-hidden="true" /></button>
        </div>}
      </Carousel>
    </div>
  );
}

export function LatestContentCarousels({
  isArabic,
  region,
  serviceSlug,
  variant,
}: LatestContentCarouselsProps) {
  const ssrPosts = typeof window !== "undefined" ? window.__SSR_POSTS__ : undefined;
  const ssrWorkSamples = typeof window !== "undefined" ? window.__SSR_WORK_SAMPLES__ : undefined;
  const isLocalStandalonePreview = typeof window !== "undefined" &&
    (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost");
  const { data: posts = [] } = useQuery<InitialBlogPost[]>({
    queryKey: ["blog-posts"],
    queryFn: () => fetchPublicJson<InitialBlogPost[]>("/api/blog/posts/discovery"),
    // The build-time list is only a visual placeholder. Fetch immediately so
    // posts published after the last deployment can enter the carousel.
    initialData: ssrPosts,
    enabled: !isLocalStandalonePreview || !ssrPosts?.length,
    staleTime: 0,
    refetchOnMount: "always",
    refetchInterval: 60_000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: "always",
  });
  const { data: workSamples = [] } = useQuery<WorkSamplePublic[]>({
    queryKey: ["work-samples"],
    queryFn: () => fetchPublicJson<WorkSamplePublic[]>("/api/work"),
    initialData: ssrWorkSamples,
    enabled: !isLocalStandalonePreview || !ssrWorkSamples?.length,
    staleTime: 0,
    refetchOnMount: "always",
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
    // Service pages show assigned context only; the libraries retain all records.
    return newestFirst(assignedPosts).slice(0, serviceSlug ? 3 : 10);
  }, [posts, region, serviceSlug]);
  const latestWork = useMemo(
    () => {
      const regionalWork = workSamples
        .filter((sample) => sample.published !== false)
        .filter((sample) => !region || workJurisdictionRegion(sample.jurisdictionEn, sample.jurisdictionAr) === region);
      const assigned = serviceSlug
        ? regionalWork.filter((sample) => sample.relatedServiceSlugs?.includes(serviceSlug))
        : regionalWork;
      return newestFirst(assigned).slice(0, serviceSlug ? 3 : 10);
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

  if (variant === "home") {
    return <HomeLatestContent isArabic={isArabic}
      posts={latestPosts.map(post => {
        const useArabic = Boolean(post.titleAr) && (isArabic || !post.titleEn);
        return {
          href: blogPath(post.slug, useArabic ? "ar" : "en"),
          title: (useArabic ? post.titleAr : post.titleEn) || "",
          summary: (useArabic ? post.excerptAr : post.excerptEn) || "",
          category: (useArabic ? post.categoryAr : post.categoryEn) || "",
          meta: post.readTime ? `${post.readTime} ${useArabic ? "دقائق قراءة" : "min read"}` : "",
          isArabic: useArabic,
        };
      })}
      work={latestWork.map(sample => ({
        href: workSamplePath(sample, isArabic),
        title: localized(sample.titleEn, sample.titleAr, isArabic ? "ar" : "en"),
        summary: localized(sample.summaryEn, sample.summaryAr, isArabic ? "ar" : "en"),
        category: localized(sample.workTypeEn, sample.workTypeAr, isArabic ? "ar" : "en"),
        meta: localized(sample.jurisdictionEn, sample.jurisdictionAr, isArabic ? "ar" : "en"),
        isArabic,
      }))}
    />;
  }

  if (latestPosts.length === 0 && latestWork.length === 0) {
    return (
      <section
        className="latest-content latest-content--empty" dir={isArabic ? "rtl" : "ltr"}
        aria-labelledby={isArabic ? "latest-content-empty-heading-ar" : "latest-content-empty-heading"}
      >
        <div className="latest-content__inner">
          <p className="latest-content__eyebrow">
            {isArabic ? "محتوى كاونسلو للاستشارات القانونية" : "CounselO Legal content"}
          </p>
          <h2
            id={isArabic ? "latest-content-empty-heading-ar" : "latest-content-empty-heading"}
            className="latest-content__title"
          >
            {isArabic ? "أحدث المقالات والأعمال القانونية" : "Latest legal articles and work"}
          </h2>
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {isArabic
              ? "استكشف المقالات القانونية ونماذج الأعمال المنشورة حديثاً من كاونسلو للاستشارات القانونية."
              : "Explore CounselO Legal's latest legal articles and published work samples."}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href={isArabic ? "/ar/legal-library" : "/legal-library"} className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary/90">
              {isArabic ? "استكشف المكتبة القانونية" : "Explore the Legal Library"}
              {isArabic ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </Link>
            <Link href={isArabic ? "/blog/ar" : "/blog"} className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary/90">
              {isArabic ? "أحدث المقالات" : "Latest articles"}
              {isArabic ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </Link>
            <Link href={isArabic ? "/ar/our-work" : "/our-work"} className="inline-flex items-center gap-2 border border-primary/30 bg-white px-5 py-3 text-sm font-semibold text-primary hover:border-primary">
              {isArabic ? "أحدث الأعمال" : "Latest work"}
              {isArabic ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="latest-content" dir={isArabic ? "rtl" : "ltr"}
      aria-labelledby={isService ? "related-content-heading" : isArabic ? "latest-content-heading-ar" : "latest-content-heading"}
    >
      <div className="latest-content__inner">
        <div className="latest-content__heading">
          <div className="max-w-3xl">
          <p className="latest-content__eyebrow">
            {isService
              ? isArabic ? "محتوى مرتبط" : "Related content"
              : isArabic ? "منشور حديثاً" : "Recently published"}
          </p>
          <h2
            id={isService ? "related-content-heading" : isArabic ? "latest-content-heading-ar" : "latest-content-heading"}
            className="latest-content__title"
          >
            {isService
              ? isArabic ? "أحدث المقالات والأعمال المرتبطة" : "Latest related articles and work"
              : isArabic ? "أحدث مقالاتنا وأعمالنا القانونية" : "Latest legal articles and work"}
          </h2>
          <p className="latest-content__intro">
            {isService
              ? isArabic
                ? "مقالات وأعمال قانونية مرتبطة بهذه الخدمة."
                : "Legal articles and work related to this service."
              : isArabic
                ? "اطّلع على أحدث التحليلات القانونية ودراسات العمل المنشورة."
                : "Explore recent legal analysis and published case studies."}
          </p>
          </div>
          <Link href={isArabic ? "/ar/legal-library" : "/legal-library"} className="latest-content__library">
            {isArabic ? "استكشف المكتبة القانونية" : "Explore the Legal Library"}
            {isArabic ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
          </Link>
        </div>

        <div className="latest-content__collections">
          {latestPosts.length > 0 ? (
            <div className="latest-content__collection" data-content-carousel="articles">
              <div className="latest-content__row-heading">
                <div>
                  <h3 className="latest-content__row-title">
                    <BookOpen size={22} aria-hidden="true" />
                    {isArabic ? "أحدث المقالات" : "Latest articles"}
                  </h3>
                </div>
                <Link href={isArabic ? "/blog/ar" : "/blog"} className="latest-content__view-all">
                  {isArabic ? "عرض جميع المقالات" : "View all articles"}
                  {isArabic ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </Link>
              </div>
              <AutoCarousel isArabic={isArabic} label={articleLabel} opts={carouselOptions}>
                {latestPosts.map((post) => {
                  const useArabic = Boolean(post.titleAr) && (isArabic || !post.titleEn);
                  return (
                    <CarouselItem key={post.slug} className="latest-content__slide">
                      <article
                        data-content-title={useArabic ? post.titleAr : post.titleEn}
                        className="latest-content__card"
                        dir={useArabic ? "rtl" : "ltr"}
                      >
                        <div className="latest-content__category">
                          <BookOpen className="latest-content__card-icon" aria-hidden="true" />
                          <span className="latest-content__category-label">
                            {(useArabic ? post.categoryAr : post.categoryEn) || (isArabic ? "مقال قانوني" : "Legal insight")}
                          </span>
                        </div>
                        <h4 className="latest-content__card-title">
                          {useArabic ? post.titleAr : post.titleEn}
                        </h4>
                        <p className="latest-content__summary">
                          {useArabic ? post.excerptAr : post.excerptEn}
                        </p>
                        <div className="latest-content__meta">
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{post.readTime} {isArabic ? "دقائق قراءة" : "min read"}</span>
                        </div>
                        <CardLink href={blogPath(post.slug, useArabic ? "ar" : "en")} isArabic={isArabic}>
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
            <div className="latest-content__collection latest-content__collection--work" data-content-carousel="work">
              <div className="latest-content__row-heading">
                <div>
                  <h3 className="latest-content__row-title">
                    <BriefcaseBusiness size={22} aria-hidden="true" />
                    {showingTestimonials
                      ? isArabic ? "ما يقوله أصحاب الأعمال المنشورة" : "What clients say about related work"
                      : isArabic ? "أحدث أعمالنا" : "Latest work"}
                  </h3>
                </div>
                <Link
                  href={isArabic ? "/ar/our-work" : "/our-work"}
                  className="latest-content__view-all"
                >
                  {isArabic ? "عرض جميع الأعمال" : "View all work"}
                  {isArabic ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </Link>
              </div>
              <AutoCarousel isArabic={isArabic} label={workLabel} opts={carouselOptions}>
                {visibleWork.map((sample) => (
                  <CarouselItem key={sample.slug} className="latest-content__slide">
                    <article
                      data-content-title={localized(sample.titleEn, sample.titleAr, isArabic ? "ar" : "en")}
                      className="latest-content__card"
                    >
                      <div className="latest-content__category">
                        <BriefcaseBusiness className="latest-content__card-icon" aria-hidden="true" />
                        <span className="latest-content__category-label">
                          {localized(sample.workTypeEn, sample.workTypeAr, isArabic ? "ar" : "en")}
                        </span>
                      </div>
                      <h4 className="latest-content__card-title">
                        {localized(sample.titleEn, sample.titleAr, isArabic ? "ar" : "en")}
                      </h4>
                      {isService && sample.testimonials?.find((testimonial) => testimonial.text.trim())?.text ? (
                        <blockquote className="mb-6 border-s-2 border-[#b4924a] bg-[#f8faf8] px-4 py-3 text-sm italic leading-6 text-foreground/80">
                          “{sample.testimonials.find((testimonial) => testimonial.text.trim())?.text}”
                        </blockquote>
                      ) : (
                        <p className="latest-content__summary">
                          {localized(sample.summaryEn, sample.summaryAr, isArabic ? "ar" : "en")}
                        </p>
                      )}
                      <p className="latest-content__meta">
                        {region === "syr"
                          ? (isArabic ? "سوريا" : "Syria")
                          : region === "sa"
                            ? (isArabic ? "السعودية" : "Saudi Arabia")
                            : localized(sample.jurisdictionEn, sample.jurisdictionAr, isArabic ? "ar" : "en")}
                      </p>
                      {(!serviceSlug || sample.relatedServiceSlugs?.includes(serviceSlug)) && sample.testimonials?.find((testimonial) => testimonial.text.trim())?.text && (
                        <div className="latest-content__meta">
                          <span className="mb-1 block text-[0.65rem] font-semibold not-italic uppercase tracking-[0.14em] text-primary">
                            {isArabic ? "شهادة مرتبطة بنموذج العمل" : "Testimonial from this work sample"}
                          </span>
                        </div>
                      )}
                      <CardLink href={workSamplePath(sample, isArabic)} isArabic={isArabic}>
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
