import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const WHATSAPP_NUMBER = "966594850247";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function WhatsAppFloat() {
  const [hovered, setHovered] = useState(false);
  const { isRTL } = useLanguage();

  const label = isRTL ? "تواصل عبر واتساب" : "Chat on WhatsApp";

  return (
    <div
      className={`fixed bottom-6 z-50 flex items-center gap-3 ${
        isRTL ? "left-6 flex-row-reverse" : "right-6"
      }`}
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? 10 : -10 }}
            transition={{ duration: 0.18 }}
            className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-xl whitespace-nowrap select-none"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
          className="relative w-20 h-20 rounded-full shadow-2xl flex items-center justify-center"
          style={{ backgroundColor: "#25D366" }}
        >
          {/* Pulsing ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: "#25D366" }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.55, 0, 0.55] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Second pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: "#25D366" }}
            animate={{ scale: [1, 1.65, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-10 h-10 relative z-10"
          >
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.41A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.946 7.946 0 01-4.077-1.117l-.292-.174-3.037.861.86-3.02-.19-.31A7.946 7.946 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8zm4.29-5.86c-.234-.117-1.387-.685-1.602-.763-.215-.078-.372-.117-.529.117-.156.234-.606.763-.743.92-.137.156-.273.176-.507.059-.234-.117-.988-.364-1.882-1.16-.696-.62-1.166-1.386-1.303-1.62-.136-.234-.015-.36.102-.477.105-.105.234-.273.351-.41.117-.136.156-.234.234-.39.078-.157.039-.294-.02-.41-.058-.117-.528-1.275-.724-1.746-.19-.457-.385-.395-.529-.402l-.45-.008c-.156 0-.41.059-.625.294-.215.234-.82.802-.82 1.956 0 1.153.84 2.268.957 2.424.117.157 1.652 2.523 4.003 3.538.56.241 1.996.644 2.651.39.655-.254 1.055-.65 1.17-1.017.117-.367.117-.682.078-.75-.039-.078-.156-.117-.39-.234z" />
          </svg>
        </motion.div>
      </a>
    </div>
  );
}
