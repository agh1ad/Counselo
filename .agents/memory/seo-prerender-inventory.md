---
name: SEO prerender inventory merge
description: Build-time blog discovery must merge inventory records with full records before rendering article detail pages.
---

The blog discovery endpoint is the inventory authority for collection links, but its records intentionally omit article bodies and some SEO fields. Prerendering must merge those records by slug with the full published-post endpoint before generating detail routes; otherwise the routes exist but SSR falls through to a redirect/loading state without head metadata.

**Why:** A build that used discovery records alone increased the route count while silently removing title, canonical, description, and article content from the new detail pages.

**How to apply:** Keep discovery and full inventories aligned by slug, require quality bilingual content for detail-route generation, and validate both blog hubs and individual article HTML after changing either endpoint.