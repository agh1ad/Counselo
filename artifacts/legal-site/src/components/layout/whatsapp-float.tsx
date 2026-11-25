import { useEffect, useRef, useState } from "react";
import { useRegion } from "@/contexts/RegionContext";
import "./whatsapp-float.css";

const WHATSAPP_NUMBER = "966594850247";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const PROMPT_DELAY_MS = 4000;
const PROMPT_DISMISSED_KEY = "counselo-whatsapp-prompt-dismissed";

function hasDismissedPrompt() {
  try {
    return window.sessionStorage.getItem(PROMPT_DISMISSED_KEY) === "true";
  } catch {
    return false;
  }
}

function rememberPromptDismissal() {
  try {
    window.sessionStorage.setItem(PROMPT_DISMISSED_KEY, "true");
  } catch {
    // Keep the prompt dismissible even if browser storage is unavailable.
  }
}

export function WhatsAppFloat() {
  const [promptVisible, setPromptVisible] = useState(false);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const { region, lang, isSharedPath } = useRegion();
  const isRTL = lang === "ar";
  const label = isRTL ? "ابدأ استشارة قانونية عبر واتساب" : "Start a legal consultation on WhatsApp";
  const promptTitle = isRTL ? "هل تحتاج إلى استشارة قانونية؟" : "Need legal advice?";
  const promptAction = isRTL ? "ابدأ استشارتك عبر واتساب" : "Start your consultation on WhatsApp";
  const promptLabel = isRTL ? "دعوة لبدء استشارة عبر واتساب" : "Start a legal consultation through WhatsApp";
  const dismissLabel = isRTL ? "إغلاق رسالة واتساب" : "Close WhatsApp message";

  const dismissPrompt = () => {
    setPromptVisible(false);
    rememberPromptDismissal();
    buttonRef.current?.focus({ preventScroll: true });
  };

  useEffect(() => {
    if (hasDismissedPrompt()) return;

    const timeout = window.setTimeout(() => setPromptVisible(true), PROMPT_DELAY_MS);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!promptVisible) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismissPrompt();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [promptVisible]);

  return (
    <div
      className={`counselo-wa-widget${isRTL ? " counselo-wa-widget--rtl" : ""}`}
      dir={isRTL ? "rtl" : "ltr"}
      lang={lang}
    >
      {promptVisible && (
        <section
          className="counselo-wa-prompt"
          role="region"
          aria-label={promptLabel}
          aria-live="polite"
          aria-atomic="true"
        >
          <button
            type="button"
            className="counselo-wa-prompt__close"
            aria-label={dismissLabel}
            onClick={dismissPrompt}
            data-testid="whatsapp-prompt-dismiss"
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="m5 5 10 10M15 5 5 15" />
            </svg>
          </button>
          <p className="counselo-wa-prompt__title">{promptTitle}</p>
          <a
            className="counselo-wa-prompt__action"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="whatsapp"
            data-conversion-position="floating-prompt"
            data-region={isSharedPath ? undefined : region}
            data-lang={lang}
            data-testid="whatsapp-prompt-link"
          >
            <span>{promptAction}</span>
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M5 15 15 5M6 5h9v9" />
            </svg>
          </a>
        </section>
      )}
      <a
        ref={buttonRef}
        className="counselo-wa-button"
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        title={label}
        data-cta="whatsapp"
        data-conversion-position="floating-dock"
        data-region={isSharedPath ? undefined : region}
        data-lang={lang}
        data-testid="whatsapp-floating-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="counselo-wa-button__icon"
          aria-hidden="true"
        >
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.41A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.946 7.946 0 01-4.077-1.117l-.292-.174-3.037.861.86-3.02-.19-.31A7.946 7.946 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8zm4.29-5.86c-.234-.117-1.387-.685-1.602-.763-.215-.078-.372-.117-.529.117-.156.234-.606.763-.743.92-.137.156-.273.176-.507.059-.234-.117-.988-.364-1.882-1.16-.696-.62-1.166-1.386-1.303-1.62-.136-.234-.015-.36.102-.477.105-.105.234-.273.351-.41.117-.136.156-.234.234-.39.078-.157.039-.294-.02-.41-.058-.117-.528-1.275-.724-1.746-.19-.457-.385-.395-.529-.402l-.45-.008c-.156 0-.41.059-.625.294-.215.234-.82.802-.82 1.956 0 1.153.84 2.268.957 2.424.117.157 1.652 2.523 4.003 3.538.56.241 1.996.644 2.651.39.655-.254 1.055-.65 1.17-1.017.117-.367.117-.682.078-.75-.039-.078-.156-.117-.39-.234z" />
        </svg>
        <span className="counselo-wa-button__hover-label" aria-hidden="true">
          {isRTL ? "واتساب" : "WhatsApp"}
        </span>
      </a>
    </div>
  );
}
