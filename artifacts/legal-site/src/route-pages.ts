import { lazy } from "react";

// Client route boundary: keep the shared shell in the entry bundle and load
// each public page only when its route is visited.
export const RegionPicker = lazy(() => import("@/pages/region-picker"));
export const ArRegionPicker = lazy(() => import("@/pages/ar-region-picker"));
export const Home = lazy(() => import("@/pages/home"));
export const Services = lazy(() => import("@/pages/services"));
export const Contact = lazy(() => import("@/pages/contact"));
export const ServiceDetail = lazy(() => import("@/pages/service-detail"));
export const LegalProblemDetail = lazy(() => import("@/pages/legal-problem-detail"));
export const About = lazy(() => import("@/pages/about"));
export const Vision = lazy(() => import("@/pages/vision"));
export const Blog = lazy(() => import("@/pages/blog"));
export const BlogPost = lazy(() => import("@/pages/blog-post"));
export const OurWork = lazy(() => import("@/pages/our-work"));
export const LegalLibrary = lazy(() => import("@/pages/legal-library"));
export const WorkSample = lazy(() => import("@/pages/work-sample"));
export const TermsOfService = lazy(() => import("@/pages/terms-of-service"));
export const PrivacyPolicy = lazy(() => import("@/pages/privacy-policy"));
export const NotFound = lazy(() => import("@/pages/not-found"));
