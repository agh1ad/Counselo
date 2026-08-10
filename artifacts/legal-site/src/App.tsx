import {
  Switch,
  Route,
  Router as WouterRouter,
  useLocation,
  Redirect,
  Link,
} from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { RegionProvider, useRegion } from "@/contexts/RegionContext";
import { lazy, Suspense, useEffect } from "react";
import { ErrorBoundary } from "@/components/error-boundary";
import { Helmet } from "react-helmet-async";
import { trackEvent, trackPageview, injectGTM } from "@/lib/analytics";
import type { WorkSamplePublic } from "@/lib/work-samples";

import RegionPicker from "@/pages/region-picker";
import ArRegionPicker from "@/pages/ar-region-picker";
import Home from "@/pages/home";
import Services from "@/pages/services";
import Contact from "@/pages/contact";
import ServiceDetail from "@/pages/service-detail";
import LegalProblemDetail from "@/pages/legal-problem-detail";
import About from "@/pages/about";
import Vision from "@/pages/vision";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import OurWork from "@/pages/our-work";
import WorkSample from "@/pages/work-sample";
import TermsOfService from "@/pages/terms-of-service";
import PrivacyPolicy from "@/pages/privacy-policy";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();
const AdminCMS = lazy(() => import("@/pages/admin"));

export interface InitialBlogPost {
  id: number;
  slug: string;
  date: string;
  categoryEn: string;
  categoryAr: string;
  readTime: number;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  seoTitleEn?: string;
  seoTitleAr?: string;
  seoDescriptionEn?: string;
  seoDescriptionAr?: string;
  bodyEn?: string;
  bodyAr?: string;
  contentEn?: Array<{ body?: string }>;
  contentAr?: Array<{ body?: string }>;
  published: boolean;
  relatedServiceSlugs?: string[];
  relatedBlogSlugs?: string[];
  relatedWorkSlugs?: string[];
}

function createSsrQueryClient(posts: InitialBlogPost[], workSamples: WorkSamplePublic[]): QueryClient {
  const client = new QueryClient();
  client.setQueryData(["blog-posts"], posts);
  client.setQueryData(["work-samples"], workSamples);
  for (const post of posts) {
    client.setQueryData(["blog-post", post.slug], post);
  }
  for (const sample of workSamples) {
    client.setQueryData(["work-sample", sample.slug], sample);
  }
  return client;
}

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    trackPageview(location);
  }, [location]);
  return null;
}

function GAInit() {
  useEffect(() => {
    injectGTM();
  }, []);
  return null;
}

function InteractionTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const rawTarget = event.target;
      if (!(rawTarget instanceof Element)) return;
      const element = (rawTarget.closest<HTMLElement>("a,button,input,select,textarea,[role='button']") ?? rawTarget) as HTMLElement;
      const anchor = element.closest<HTMLAnchorElement>("a[href]");
      const href = anchor?.getAttribute("href") ?? "";
      const input = element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement;
      const label = input
        ? (element.getAttribute("aria-label") || element.getAttribute("name") || element.tagName).slice(0, 100)
        : (element.getAttribute("aria-label") || element.textContent || element.tagName).replace(/\s+/g, " ").trim().slice(0, 100);
      const details = {
        element_tag: element.tagName.toLowerCase(),
        element_id: element.id.slice(0, 80),
        element_name: element.getAttribute("name")?.slice(0, 80),
        click_text: label,
        link_url: href.slice(0, 300),
        outbound: Boolean(anchor?.origin && anchor.origin !== window.location.origin),
        cta: element.dataset.cta,
        conversion_position: element.dataset.conversionPosition,
        region: element.dataset.region,
        language: element.dataset.lang,
      };
      trackEvent("click", window.location.pathname, details);
      if (/wa\.me|whatsapp/i.test(href) || element.dataset.cta === "whatsapp") {
        trackEvent("whatsapp_click", window.location.pathname, details);
      } else if (href.startsWith("tel:")) {
        trackEvent("phone_click", window.location.pathname, details);
      } else if (href.startsWith("mailto:")) {
        trackEvent("email_click", window.location.pathname, details);
      } else if (element.dataset.cta === "contact" || /\/contact(?:\?|$)/.test(href)) {
        trackEvent("consultation_click", window.location.pathname, details);
      }
      if (anchor?.hasAttribute("download") || /[?&]download=1/.test(href)) {
        trackEvent("file_download", window.location.pathname, details);
      }
    };
    const onSubmit = (event: SubmitEvent) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      trackEvent("form_submit_attempt", window.location.pathname, {
        form_id: form.id.slice(0, 80),
        form_name: form.getAttribute("name")?.slice(0, 80),
      });
    };
    document.addEventListener("click", onClick, true);
    document.addEventListener("submit", onSubmit, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("submit", onSubmit, true);
    };
  }, []);
  return null;
}

function RegionIdentityBar() {
  const [location] = useLocation();
  const { region, lang } = useRegion();
  if (!/^\/(sa|syr|uae)(?:\/|$)/.test(location)) return null;

  const details = {
    sa: {
      en: "CounselO Saudi Arabia",
      ar: "كاونسلو المملكة العربية السعودية",
      flag: "/images/optimized/saudi-arabia-flag.jpg",
    },
    syr: {
      en: "CounselO Syria",
      ar: "كاونسلو سوريا",
      flag: "/images/optimized/syria-flag.jpg",
    },
    uae: {
      en: "CounselO United Arab Emirates",
      ar: "كاونسلو الإمارات العربية المتحدة",
      flag: "/images/optimized/uae-flag.svg",
    },
  } as const;
  const current = details[region];

  return (
    <div className={`region-identity-bar region-identity-bar--${region}`} aria-label={lang === "ar" ? "الاختصاص الحالي" : "Current jurisdiction"}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="region-identity-bar__inner">
          <span>
            <img src={current.flag} alt="" width="24" height="16" />
            <strong>{current[lang]}</strong>
            <small>{lang === "ar" ? "محتوى وخدمات وفق قانون هذه الدولة" : "Country-specific legal content and services"}</small>
          </span>
          <Link href={lang === "ar" ? "/ar" : "/"}>{lang === "ar" ? "تغيير الاختصاص" : "Change jurisdiction"}</Link>
        </div>
      </div>
    </div>
  );
}

// Every region + language combination gets its own real URL prefix, e.g.
// "/sa/ar/about", so Arabic is a genuinely distinct, crawlable page rather
// than a client-only toggle sharing the English URL.
const REGION_LANG_PREFIXES = ["/sa", "/sa/ar", "/syr", "/syr/ar", "/uae", "/uae/ar"];

function buildRegionRoutes() {
  return REGION_LANG_PREFIXES.flatMap((prefix) => [
    <Route
      key={`${prefix}-services-id`}
      path={`${prefix}/services/:id`}
      component={ServiceDetail}
    />,
    <Route
      key={`${prefix}-services-problem`}
      path={`${prefix}/services/:id/:problem`}
      component={LegalProblemDetail}
    />,
    <Route
      key={`${prefix}-services`}
      path={`${prefix}/services`}
      component={Services}
    />,
    <Route
      key={`${prefix}-about`}
      path={`${prefix}/about`}
      component={About}
    />,
    <Route
      key={`${prefix}-vision`}
      path={`${prefix}/vision`}
      component={Vision}
    />,
    <Route
      key={`${prefix}-contact`}
      path={`${prefix}/contact`}
      component={Contact}
    />,
    <Route
      key={`${prefix}-tos`}
      path={`${prefix}/terms-of-service`}
      component={TermsOfService}
    />,
    <Route
      key={`${prefix}-privacy`}
      path={`${prefix}/privacy-policy`}
      component={PrivacyPolicy}
    />,
    <Route key={`${prefix}-home`} path={prefix} component={Home} />,
  ]);
}

function buildRegionRedirects() {
  return REGION_LANG_PREFIXES.flatMap((prefix) => [
    <Route
      key={`${prefix}-services-redirect`}
      path={`${prefix}/services/:id/:rest*`}
    >
      {(params: { id: string }) => (
        <Redirect to={`${prefix}/services/${params.id}`} replace />
      )}
    </Route>,
    <Route key={`${prefix}-blog-redirect`} path={`${prefix}/blog/:slug/:rest*`}>
      {(params: { slug: string }) => (
        <Redirect to={`/blog/${params.slug}`} replace />
      )}
    </Route>,
    <Route key={`${prefix}-blog-slug-redirect`} path={`${prefix}/blog/:slug`}>
      {(params: { slug: string }) => (
        <Redirect to={`/blog/${params.slug}`} replace />
      )}
    </Route>,
    <Route key={`${prefix}-blog-redirect-index`} path={`${prefix}/blog`}>
      {() => <Redirect to={prefix.includes("/ar") ? "/blog/ar" : "/blog"} replace />}
    </Route>,
    <Route key={`${prefix}-work-detail-redirect`} path={`${prefix}/our-work/:slug`}>
      {(params: { slug: string }) => <Redirect to={`${prefix.includes("/ar") ? "/ar" : ""}/our-work/${params.slug}`} replace />}
    </Route>,
    <Route key={`${prefix}-work-redirect`} path={`${prefix}/our-work`}>
      {() => <Redirect to={`${prefix.includes("/ar") ? "/ar" : ""}/our-work`} replace />}
    </Route>,
  ]);
}

function Router() {
  const [location] = useLocation();
  const isAdmin = location.startsWith("/counselo-admin");

  if (isAdmin) {
    return (
      <>
        <ScrollToTop />
        <Switch>
          <Route path="/counselo-admin">
            <Suspense
              fallback={<div className="min-h-screen" aria-live="polite" />}
            >
              <AdminCMS />
            </Suspense>
          </Route>
        </Switch>
      </>
    );
  }

  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Switch>
        {/* Region picker — English (x-default) and Arabic */}
        <Route path="/" component={RegionPicker} />
        <Route path="/ar" component={ArRegionPicker} />

        {/* SA + Syria routes, English and Arabic */}
        {buildRegionRoutes()}

        {/* Legacy routes (no prefix → defaults to SA/English) */}
        <Route path="/services/:id" component={ServiceDetail} />
        <Route path="/services" component={Services} />
        <Route path="/blog/en/:slug" component={BlogPost} />
        <Route path="/blog/ar/:slug" component={BlogPost} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/ar/our-work/:slug" component={WorkSample} />
        <Route path="/ar/our-work" component={OurWork} />
        <Route path="/our-work/:slug" component={WorkSample} />
        <Route path="/our-work" component={OurWork} />
        <Route path="/about" component={About} />
        <Route path="/vision" component={Vision} />
        <Route path="/blog/ar" component={Blog} />
        <Route path="/blog" component={Blog} />
        <Route path="/contact" component={Contact} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />

        {/* Catch-all: redirect old sub-area URLs to their parent service/blog page */}
        {buildRegionRedirects()}
        <Route path="/services/:id/:rest*">
          {(params) => <Redirect to={`/services/${params.id}`} replace />}
        </Route>
        <Route path="/blog/:slug/:rest*">
          {(params) => <Redirect to={`/blog/${params.slug}`} replace />}
        </Route>

        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  );
}

function AppShell() {
  const [location] = useLocation();
  const isAdmin = location.startsWith("/counselo-admin");
  const isRegionPicker = location === "/" || location === "/ar";

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Helmet>
          <title>CounselO Admin</title>
          <meta name="robots" content="noindex, nofollow, noarchive" />
        </Helmet>
        <Router />
        <Toaster />
      </div>
    );
  }

  if (isRegionPicker) {
    return (
      <>
        <Router />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-background focus:text-foreground focus:px-4 focus:py-2 focus:border focus:border-border"
      >
        Skip to main content
      </a>
      <Navbar />
      <main className="flex-grow pt-21" id="main-content">
        <RegionIdentityBar />
        <Router />
      </main>
      <Footer />
      <WhatsAppFloat />
      <Toaster />
    </div>
  );
}

interface AppProps {
  /**
   * SSR-only: the URL being rendered server-side. When provided, wouter uses a
   * static location hook instead of the browser's window.location, so the
   * component tree renders correctly during renderToString in the prerender
   * pipeline. Leave undefined on the client (default wouter behaviour applies).
   */
  ssrUrl?: string;
  /** Published posts supplied by the prerender pipeline for first-byte HTML. */
  initialBlogPosts?: InitialBlogPost[];
  /** Published work samples supplied for crawlable discovery links. */
  initialWorkSamples?: WorkSamplePublic[];
}

function App({ ssrUrl, initialBlogPosts = [], initialWorkSamples = [] }: AppProps = {}) {
  const activeQueryClient = ssrUrl
    ? createSsrQueryClient(initialBlogPosts, initialWorkSamples)
    : queryClient;
  return (
    <QueryClientProvider client={activeQueryClient}>
      <TooltipProvider>
        {/*
          ssrPath tells wouter which URL to use during server-side rendering.
          On the client ssrPath is undefined so wouter uses window.location.
          This is wouter's official SSR API (v3.10+).
        */}
        <WouterRouter
          base={(import.meta.env?.BASE_URL ?? "/").replace(/\/$/, "")}
          ssrPath={ssrUrl}
        >
          <RegionProvider>
            <LanguageProvider>
              <GAInit />
              <InteractionTracking />
              <AppShell />
            </LanguageProvider>
          </RegionProvider>
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
