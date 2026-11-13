# Initial page styling — 13 November 2026

The live English and Arabic homepages reproduced the reported unstyled screen when JavaScript was disabled: the heading was 16px, the hero background was transparent, and only the entry CSS loaded. The prerendered HTML was present, but layout styles imported by lazy routes were discovered only after JavaScript ran.

The client build now extracts all CSS into the initial blocking stylesheet while retaining lazy JavaScript routes. This applies to the shared shell used by prerendered pages and dynamic responses. The generated stylesheet is 340,127 bytes (55,971 bytes gzip), approximately 18KB gzip more than the previous entry stylesheet. Styles remain cacheable under a content-hashed filename.

The client build also verifies its generated HTML and CSS assets. It rejects any emitted stylesheet absent from the initial HTML head, including CSS left behind a lazy JavaScript import. This check failed on the previous output and passed on the corrected build.

Verification completed on the production build:

- Frontend typecheck and full production build passed.
- All 1,514 prerendered HTML pages include the initial stylesheet.
- English desktop and Arabic mobile homepages are styled and visible while JavaScript is held, with no horizontal overflow or page errors after scripts are released.
- Twelve no-JavaScript desktop/mobile checks across both languages, regional homepages, About, Library, Our Work and urgent assistance returned styled HTTP 200 pages without resource failures or horizontal overflow.
- Eleven hydrated route checks retained their computed type sizes, colors, backgrounds and display rules, with no page errors or horizontal overflow.
- Holding the stylesheet for two seconds produces no unstyled contentful paint; the first contentful paint occurs after stylesheet delivery.
- Screenshots of the pre-JavaScript English and Arabic views were inspected.

Publishing the new Git revision is still required. These local results do not establish that the live deployment has changed.
