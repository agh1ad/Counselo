import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "wouter";
import { retiredPageCopy } from "@workspace/api-zod/browser";

export default function RemovedPage() {
  const [path] = useLocation();
  const c = retiredPageCopy(path);
  return <section dir={c.ar ? "rtl" : "ltr"} className="mx-auto max-w-3xl px-6 py-24">
    <Helmet><title>{c.title} | CounselO Legal</title><meta name="robots" content="noindex, follow" /></Helmet>
    <h1 className="text-3xl font-bold text-primary">{c.title}</h1>
    <p className="mt-6 text-lg text-muted-foreground">{c.description}</p>
    <nav className="mt-8 flex flex-wrap gap-6 font-semibold text-primary">
      <Link href={c.libraryPath} className="underline underline-offset-4">{c.library}</Link>
      <Link href={c.homePath} className="underline underline-offset-4">{c.home}</Link>
    </nav>
  </section>;
}
