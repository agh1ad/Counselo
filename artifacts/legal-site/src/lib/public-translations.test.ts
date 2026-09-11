import assert from "node:assert/strict";
import test from "node:test";
import { PassThrough } from "node:stream";
import { createElement, type ComponentType, type ReactNode } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { Router } from "wouter";
import { RegionProvider } from "../contexts/RegionContext";
import { LanguageProvider as BrowserLanguageProvider } from "../contexts/LanguageContext";
import { LanguageProvider as ServerLanguageProvider } from "../contexts/LanguageContext.ssr";
import { useLanguage, type LanguageContextType } from "../contexts/LanguageContextCore";

async function renderPublicCopy(Provider: ComponentType<{ children: ReactNode }>, path: string) {
  let exposed: Pick<LanguageContextType, "lang" | "isRTL" | "t"> | undefined;
  function Capture() {
    const { lang, isRTL, t } = useLanguage();
    exposed = { lang, isRTL, t };
    return createElement("h1", null, `${t.home.hero.h1a} ${t.home.hero.h1b}`);
  }
  const tree = createElement(Router, { ssrPath: path },
    createElement(RegionProvider, { children: createElement(Provider, { children: createElement(Capture) }) }));
  await new Promise<void>((resolve, reject) => {
    const output = new PassThrough();
    output.resume();
    output.on("end", resolve);
    output.on("error", reject);
    const stream = renderToPipeableStream(tree, {
      onAllReady() { stream.pipe(output); },
      onError: reject,
    });
  });
  assert.ok(exposed, `Language context must render for ${path}`);
  return exposed;
}

test("SSR and the lazy browser provider expose identical public copy for all six regional variants", async () => {
  for (const region of ["sa", "syr", "uae"]) {
    for (const locale of ["", "/ar"]) {
      const path = `/${region}${locale}/contact`;
      const server = await renderPublicCopy(ServerLanguageProvider, path);
      const browser = await renderPublicCopy(BrowserLanguageProvider, path);
      assert.deepEqual(server, browser, `${path}: every public translation must match before hydration`);
      assert.equal(server.t.home.hero.h1a, locale ? "استشارات قانونية أونلاين" : "Online legal advice");
      assert.match(server.t.contact.hero.heading, locale ? /^اطلب استشارة قانونية/ : /^Request an Online Legal Consultation in /);
      assert.equal(server.isRTL, Boolean(locale));
    }
  }
});

test("shared library, blog and work routes retain matching first-render language and copy", async () => {
  for (const path of ["/legal-library", "/ar/legal-library", "/blog", "/blog/ar", "/blog/en/example", "/blog/ar/example", "/our-work/example", "/ar/our-work/example"]) {
    assert.deepEqual(
      await renderPublicCopy(ServerLanguageProvider, path),
      await renderPublicCopy(BrowserLanguageProvider, path),
      path,
    );
  }
});
