import { createRequire } from "node:module";

/**
 * react-helmet-async v3 is published in a shape that Node ESM cannot reliably
 * consume through named imports when Vite leaves it external. Requiring the
 * package at runtime preserves its server-side `typeof window` detection while
 * giving the SSR bundle stable named exports.
 */
const require = createRequire(import.meta.url);
const helmet = require("react-helmet-async") as typeof import("react-helmet-async");

export const Helmet = helmet.Helmet;
export const HelmetProvider = helmet.HelmetProvider;
