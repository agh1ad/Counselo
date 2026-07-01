import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Helmet>
        <title>404 — Page Not Found | CounselO</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="The page you are looking for could not be found." />
      </Helmet>
      <div className="w-full max-w-md mx-4 bg-card border border-border p-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <AlertCircle className="h-10 w-10 text-destructive" />
          <h1 className="text-3xl font-serif font-bold text-foreground">404</h1>
        </div>
        <p className="text-muted-foreground mb-6">
          The page you are looking for could not be found.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/sa" className="inline-block bg-primary text-white px-6 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors">
            Saudi Arabia Site
          </Link>
          <Link href="/syr" className="inline-block border border-primary text-primary px-6 py-2.5 text-sm font-semibold hover:bg-primary hover:text-white transition-colors">
            Syria Site
          </Link>
        </div>
      </div>
    </div>
  );
}
