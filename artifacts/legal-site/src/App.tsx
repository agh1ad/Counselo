import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useEffect } from "react";
import { trackPageview, getGAMeasurementId, injectGA } from "@/lib/analytics";

import Home from "@/pages/home";
import Services from "@/pages/services";
import Contact from "@/pages/contact";
import ServiceDetail from "@/pages/service-detail";
import BusinessLawSub from "@/pages/business-law-sub";
import RealEstateSub from "@/pages/real-estate-sub";
import EmploymentLawSub from "@/pages/employment-law-sub";
import FamilyLawSub from "@/pages/family-law-sub";
import ForeignInvestmentSub from "@/pages/foreign-investment-sub";
import AdministrativeLawSub from "@/pages/administrative-law-sub";
import ArbitrationSub from "@/pages/arbitration-sub";
import EnforcementSub from "@/pages/enforcement-sub";
import CompaniesLawSub from "@/pages/companies-law-sub";
import ContractsSub from "@/pages/contracts-sub";
import CriminalLawSub from "@/pages/criminal-law-sub";
import BankingFinanceSub from "@/pages/banking-finance-sub";
import IntellectualPropertySub from "@/pages/intellectual-property-sub";
import TaxZakatSub from "@/pages/tax-zakat-sub";
import CyberLawSub from "@/pages/cyber-law-sub";
import MedicalMalpracticeSub from "@/pages/medical-malpractice-sub";
import InsuranceLawSub from "@/pages/insurance-law-sub";
import ImmigrationLawSub from "@/pages/immigration-law-sub";
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
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/services/business-law/:subId" component={BusinessLawSub} />
        <Route path="/services/real-estate/:subId" component={RealEstateSub} />
        <Route path="/services/employment-law/:subId" component={EmploymentLawSub} />
        <Route path="/services/family-law/:subId" component={FamilyLawSub} />
        <Route path="/services/foreign-investment/:subId" component={ForeignInvestmentSub} />
        <Route path="/services/administrative-law/:subId" component={AdministrativeLawSub} />
        <Route path="/services/arbitration/:subId" component={ArbitrationSub} />
        <Route path="/services/enforcement/:subId" component={EnforcementSub} />
        <Route path="/services/companies-law/:subId" component={CompaniesLawSub} />
        <Route path="/services/contracts/:subId" component={ContractsSub} />
        <Route path="/services/criminal-law/:subId" component={CriminalLawSub} />
        <Route path="/services/banking-finance/:subId" component={BankingFinanceSub} />
        <Route path="/services/intellectual-property/:subId" component={IntellectualPropertySub} />
        <Route path="/services/tax-zakat/:subId" component={TaxZakatSub} />
        <Route path="/services/cyber-law/:subId" component={CyberLawSub} />
        <Route path="/services/medical-malpractice/:subId" component={MedicalMalpracticeSub} />
        <Route path="/services/insurance-law/:subId" component={InsuranceLawSub} />
        <Route path="/services/immigration-law/:subId" component={ImmigrationLawSub} />
        <Route path="/services/:id" component={ServiceDetail} />
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

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Router />
        <Toaster />
      </div>
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
        <LanguageProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <AppShell />
          </WouterRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
