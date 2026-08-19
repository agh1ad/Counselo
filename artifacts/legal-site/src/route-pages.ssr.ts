// The prerender build uses synchronous imports so renderToString always emits
// complete crawlable route HTML; Vite aliases @/route-pages to this module only
// for the SSR bundle.
export { default as RegionPicker } from "@/pages/region-picker";
export { default as ArRegionPicker } from "@/pages/ar-region-picker";
export { default as Home } from "@/pages/home";
export { default as Services } from "@/pages/services";
export { default as Contact } from "@/pages/contact";
export { default as ServiceDetail } from "@/pages/service-detail";
export { default as LegalProblemDetail } from "@/pages/legal-problem-detail";
export { default as About } from "@/pages/about";
export { default as Vision } from "@/pages/vision";
export { default as Blog } from "@/pages/blog";
export { default as BlogPost } from "@/pages/blog-post";
export { default as OurWork } from "@/pages/our-work";
export { default as LegalLibrary } from "@/pages/legal-library";
export { default as WorkSample } from "@/pages/work-sample";
export { default as TermsOfService } from "@/pages/terms-of-service";
export { default as PrivacyPolicy } from "@/pages/privacy-policy";
export { default as NotFound } from "@/pages/not-found";
