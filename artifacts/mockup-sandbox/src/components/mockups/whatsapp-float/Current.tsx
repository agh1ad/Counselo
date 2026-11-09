import "./_group.css";

const WHATSAPP_URL = "https://wa.me/966594850247";

export function Current() {
  const label = "Chat on WhatsApp";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f6f4] p-4 font-sans">
      <div className="relative h-[300px] w-full max-w-[480px] overflow-hidden rounded-2xl border border-[#e2e8e4] bg-white shadow-sm">
        <div className="absolute inset-x-0 top-0 flex h-12 items-center border-b border-[#edf0ed] px-4 text-xs font-medium text-[#617168]">
          CounselO Legal page preview
        </div>
        <div className="absolute bottom-8 left-8 text-sm text-[#53635a]">
          Current floating consultation button
        </div>
        <div className="fixed bottom-6 right-6 z-50">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            data-cta="whatsapp"
            data-conversion-position="floating-dock"
            data-region="sa"
            className="whatsapp-current-button relative flex h-16 w-16 items-center justify-center rounded-full shadow-2xl"
            style={{ backgroundColor: "#0d4a31" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="relative z-10 h-8 w-8"
              aria-hidden="true"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.41A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.946 7.946 0 01-4.077-1.117l-.292-.174-3.037.861.86-3.02-.19-.31A7.946 7.946 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8zm4.29-5.86c-.234-.117-1.387-.685-1.602-.763-.215-.078-.372-.117-.529.117-.156.234-.606.763-.743.92-.137.156-.273.176-.507.059-.234-.117-.988-.364-1.882-1.16-.696-.62-1.166-1.386-1.303-1.62-.136-.234-.015-.36.102-.477.105-.105.234-.273.351-.41.117-.136.156-.234.234-.39.078-.157.039-.294-.02-.41-.058-.117-.528-1.275-.724-1.746-.19-.457-.385-.395-.529-.402l-.45-.008c-.156 0-.41.059-.625.294-.215.234-.82.802-.82 1.956 0 1.153.84 2.268.957 2.424.117.157 1.652 2.523 4.003 3.538.56.241 1.996.644 2.651.39.655-.254 1.055-.65 1.17-1.017.117-.367.078-.682.039-.75-.039-.078-.156-.117-.39-.234z" />
            </svg>
            <span className="whatsapp-current-tooltip">{label}</span>
          </a>
        </div>
      </div>
    </main>
  );
}
