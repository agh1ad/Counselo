import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
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
        {/* Region picker */}
        <Route path="/" component={RegionPicker} />

        {/* SA routes */}
        <Route path="/sa/services/:id" component={ServiceDetail} />
        <Route path="/sa/services" component={Services} />
        <Route path="/sa/about" component={About} />
        <Route path="/sa/blog/:slug" component={BlogPost} />
        <Route path="/sa/blog" component={Blog} />
        <Route path="/sa/contact" component={Contact} />
        <Route path="/sa/terms-of-service" component={TermsOfService} />
        <Route path="/sa/privacy-policy" component={PrivacyPolicy} />
        <Route path="/sa" component={Home} />

        {/* SYR routes */}
        <Route path="/syr/services/:id" component={ServiceDetail} />
        <Route path="/syr/services" component={Services} />
        <Route path="/syr/about" component={About} />
        <Route path="/syr/blog/:slug" component={BlogPost} />
        <Route path="/syr/blog" component={Blog} />
        <Route path="/syr/contact" component={Contact} />
        <Route path="/syr/terms-of-service" component={TermsOfService} />
        <Route path="/syr/privacy-policy" component={PrivacyPolicy} />
        <Route path="/syr" component={Home} />

        {/* Legacy routes (no prefix → defaults to SA) */}
        <Route path="/services/:id" component={ServiceDetail} />
        <Route path="/services" component={Services} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/about" component={About} />
        <Route path="/blog" component={Blog} />
        <Route path="/contact" component={Contact} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function AppShell() {
  const [location] = useLocation();
  const isAdmin = location.startsWith("/counselo-admin");
  const isRegionPicker = location === "/";

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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
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
