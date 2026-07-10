import { Switch, Route, Router as WouterRouter, useLocation, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { RegionProvider } from "@/contexts/RegionContext";
import { useEffect } from "react";
import { trackPageview, getGAMeasurementId, injectGA } from "@/lib/analytics";

import RegionPicker from "@/pages/region-picker";
import ArRegionPicker from "@/pages/ar-region-picker";
import Home from "@/pages/home";
import Services from "@/pages/services";
import Contact from "@/pages/contact";
import ServiceDetail from "@/pages/service-detail";
import About from "@/pages/about";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import TermsOfService from "@/pages/terms-of-service";
import PrivacyPolicy from "@/pages/privacy-policy";
import AdminCMS from "@/pages/admin";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();


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
    const id = getGAMeasurementId();
    if (id) injectGA(id);
  }, []);
  return null;
}

// Every region + language combination gets its own real URL prefix, e.g.
// "/sa/ar/about", so Arabic is a genuinely distinct, crawlable page rather
// than a client-only toggle sharing the English URL.
const REGION_LANG_PREFIXES = ["/sa", "/sa/ar", "/syr", "/syr/ar"];

function buildRegionRoutes() {
  return REGION_LANG_PREFIXES.flatMap((prefix) => [
    <Route key={`${prefix}-services-id`} path={`${prefix}/services/:id`} component={ServiceDetail} />,
    <Route key={`${prefix}-services`} path={`${prefix}/services`} component={Services} />,
    <Route key={`${prefix}-about`} path={`${prefix}/about`} component={About} />,
    <Route key={`${prefix}-blog-slug`} path={`${prefix}/blog/:slug`} component={BlogPost} />,
    <Route key={`${prefix}-blog`} path={`${prefix}/blog`} component={Blog} />,
    <Route key={`${prefix}-contact`} path={`${prefix}/contact`} component={Contact} />,
    <Route key={`${prefix}-tos`} path={`${prefix}/terms-of-service`} component={TermsOfService} />,
    <Route key={`${prefix}-privacy`} path={`${prefix}/privacy-policy`} component={PrivacyPolicy} />,
    <Route key={`${prefix}-home`} path={prefix} component={Home} />,
  ]);
}

function buildRegionRedirects() {
  return REGION_LANG_PREFIXES.flatMap((prefix) => [
    <Route key={`${prefix}-services-redirect`} path={`${prefix}/services/:id/:rest*`}>
      {(params: { id: string }) => <Redirect to={`${prefix}/services/${params.id}`} replace />}
    </Route>,
    <Route key={`${prefix}-blog-redirect`} path={`${prefix}/blog/:slug/:rest*`}>
      {(params: { slug: string }) => <Redirect to={`${prefix}/blog/${params.slug}`} replace />}
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
          <Route path="/counselo-admin" component={AdminCMS} />
        </Switch>
      </>
    );
  }

  return (
    <>
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
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/about" component={About} />
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
    </>
  );
}

function AppShell() {
  const [location] = useLocation();
  const isAdmin = location.startsWith("/counselo-admin");
  const isRegionPicker = location === "/" || location === "/ar";

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
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
      <GAInit />
      <Navbar />
      <main className="flex-grow pt-24">
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
}

function App({ ssrUrl }: AppProps = {}) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/*
          ssrPath tells wouter which URL to use during server-side rendering.
          On the client ssrPath is undefined so wouter uses window.location.
          This is wouter's official SSR API (v3.10+).
        */}
        <WouterRouter
          base={import.meta.env.BASE_URL.replace(/\/$/, "")}
          ssrPath={ssrUrl}
        >
          <RegionProvider>
            <LanguageProvider>
              <AppShell />
            </LanguageProvider>
          </RegionProvider>
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
