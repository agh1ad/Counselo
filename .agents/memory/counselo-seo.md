---
name: CounselO SEO architecture
description: How dual-region SEO (Saudi Arabia / Syria) is structured across the entire site.
---

## Region routing
- `/` — region picker page (no region set); uses `Helmet` directly from react-helmet-async, NOT SEOHead, because SEOHead depends on `useRegion()` which isn't meaningful before region selection. Targets "Middle East" with hreflang for both SA and SY.
- `/sa/*` — Saudi Arabia region
- `/syr/*` — Syria region

## SEO layers (in priority order)
1. **seo-data-syr.ts** (`src/lib/seo-data-syr.ts`) — 130+ sub-item entries, keyed by `subId`. Each has `desc/descAr/kw/kwAr`. All 21 sub-page files check `region === "syr" ? SYR_SEO_DATA[subId] : undefined` before falling back to the Saudi SEO_DATA.
2. **SEOHead syriafyText/syriafyObj** — auto-replaces Saudi terms with Syrian equivalents in any text passed to SEOHead (safety-net fallback, not primary source).
3. **Geo meta tags** — `geo.region: "SA"/"SY"`, `geo.position`, `ICBM` set per region in SEOHead's GEO constant.
4. **hreflang** — SEOHead emits `en-SA`/`ar-SA` ↔ `en-SY`/`ar-SY` alternate links automatically. x-default always points to `/`.

## Region-conditional schemas (all pages updated)
- `home.tsx` — LegalService schema: SA uses Jubail/Eastern Province/SA country, SY uses Damascus/Damascus Governorate/SY country.
- `about.tsx` — Organization schema: same address/areaServed split.
- `services.tsx` — ItemList name + LegalService address/areaServed split. URLs use `/sa/` or `/syr/` prefix.
- `contact.tsx` — ContactPage description + LegalService address/areaServed split.
- `region-picker.tsx` — WebSite schema listing both SA and SY under areaServed.

## Syrian law references used in seo-data-syr.ts
- Civil Code 84/1949, Companies Law 29/2011, Labour Law 17/2010, Personal Status Law 59/1953, Arbitration Decree 4/2008
- Authorities: General Tax Authority (GTA), Central Bank of Syria (مصرف سوريا المركزي), Syrian Cadastre, Syrian Directorate of Industrial Property, State Council (مجلس الدولة)
- Cities: Damascus, Aleppo, Hama, Homs, Lattakia

**Why:** Google and ChatGPT search use geo meta, schema areaServed, hreflang, and keyword content to route pages to the right country audience. Having Saudi-branded content on Syrian pages would suppress rankings in Syrian/Arab Google.
