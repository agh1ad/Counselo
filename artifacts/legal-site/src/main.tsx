/**
 * Browser entry point — loaded by index.html via <script type="module">.
 *
 * The actual hydrate/mount logic lives in entry-client.tsx so it can be
 * imported both here (browser) and tested independently without touching
 * the HTML entry point filename.
 */

// Re-export the client entry so Vite resolves this file as the HTML entry
// while keeping the smart hydrate/createRoot logic in one place.
import "./entry-client";
