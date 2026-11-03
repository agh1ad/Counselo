---
name: SSR bootstrap ordering
description: Avoid unstyled first paint by keeping large hydration datasets after stylesheet discovery.
---

Keep large SSR hydration datasets out of the document head, and keep the client module deferred rather than async.

**Why:** The published site showed unstyled content on first visits in mobile Safari. Serialized discovery data preceded the stylesheet link, delaying stylesheet discovery until roughly 180 KB into the response.

**How to apply:** Put hydration data at the end of the body, where it executes before deferred client modules. Keep SEO metadata in the head. Verify stylesheet discovery precedes bootstrap data in generated and on-demand HTML.
