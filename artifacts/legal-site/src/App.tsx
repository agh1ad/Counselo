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
import CivilLawSub from "@/pages/civil-law-sub";
import CivilProcedureSub from "@/pages/civil-procedure-sub";
import CriminalProcedureSub from "@/pages/criminal-procedure-sub";
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

        {/* SA sub-service routes */}
        <Route path="/sa/services/business-law/:subId" component={BusinessLawSub} />
        <Route path="/sa/services/real-estate/:subId" component={RealEstateSub} />
        <Route path="/sa/services/employment-law/:subId" component={EmploymentLawSub} />
        <Route path="/sa/services/family-law/:subId" component={FamilyLawSub} />
        <Route path="/sa/services/foreign-investment/:subId" component={ForeignInvestmentSub} />
        <Route path="/sa/services/administrative-law/:subId" component={AdministrativeLawSub} />
        <Route path="/sa/services/arbitration/:subId" component={ArbitrationSub} />
        <Route path="/sa/services/enforcement/:subId" component={EnforcementSub} />
        <Route path="/sa/services/companies-law/:subId" component={CompaniesLawSub} />
        <Route path="/sa/services/contracts/:subId" component={ContractsSub} />
        <Route path="/sa/services/criminal-law/:subId" component={CriminalLawSub} />
        <Route path="/sa/services/banking-finance/:subId" component={BankingFinanceSub} />
        <Route path="/sa/services/intellectual-property/:subId" component={IntellectualPropertySub} />
        <Route path="/sa/services/tax-zakat/:subId" component={TaxZakatSub} />
        <Route path="/sa/services/cyber-law/:subId" component={CyberLawSub} />
        <Route path="/sa/services/medical-malpractice/:subId" component={MedicalMalpracticeSub} />
        <Route path="/sa/services/insurance-law/:subId" component={InsuranceLawSub} />
        <Route path="/sa/services/immigration-law/:subId" component={ImmigrationLawSub} />
        <Route path="/sa/services/:id" component={ServiceDetail} />
        <Route path="/sa/services" component={Services} />
        <Route path="/sa/about" component={About} />
        <Route path="/sa/blog/:slug" component={BlogPost} />
        <Route path="/sa/blog" component={Blog} />
        <Route path="/sa/contact" component={Contact} />
        <Route path="/sa/terms-of-service" component={TermsOfService} />
        <Route path="/sa/privacy-policy" component={PrivacyPolicy} />
        <Route path="/sa" component={Home} />

        {/* SYR sub-service routes */}
        <Route path="/syr/services/business-law/:subId" component={BusinessLawSub} />
        <Route path="/syr/services/real-estate/:subId" component={RealEstateSub} />
        <Route path="/syr/services/employment-law/:subId" component={EmploymentLawSub} />
        <Route path="/syr/services/family-law/:subId" component={FamilyLawSub} />
        <Route path="/syr/services/foreign-investment/:subId" component={ForeignInvestmentSub} />
        <Route path="/syr/services/administrative-law/:subId" component={AdministrativeLawSub} />
        <Route path="/syr/services/arbitration/:subId" component={ArbitrationSub} />
        <Route path="/syr/services/enforcement/:subId" component={EnforcementSub} />
        <Route path="/syr/services/companies-law/:subId" component={CompaniesLawSub} />
        <Route path="/syr/services/contracts/:subId" component={ContractsSub} />
        <Route path="/syr/services/criminal-law/:subId" component={CriminalLawSub} />
        <Route path="/syr/services/banking-finance/:subId" component={BankingFinanceSub} />
        <Route path="/syr/services/intellectual-property/:subId" component={IntellectualPropertySub} />
        <Route path="/syr/services/tax-zakat/:subId" component={TaxZakatSub} />
        <Route path="/syr/services/cyber-law/:subId" component={CyberLawSub} />
        <Route path="/syr/services/medical-malpractice/:subId" component={MedicalMalpracticeSub} />
        <Route path="/syr/services/insurance-law/:subId" component={InsuranceLawSub} />
        <Route path="/syr/services/civil-law/:subId" component={CivilLawSub} />
        <Route path="/syr/services/civil-procedure/:subId" component={CivilProcedureSub} />
        <Route path="/syr/services/criminal-procedure/:subId" component={CriminalProcedureSub} />
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
