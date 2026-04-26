import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, MessageSquare, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExtras } from "@/i18n/extras";
import { useDiagnosticModal } from "./DiagnosticModal";
import { CONTACT } from "@/i18n/translations";
import { useLang } from "@/i18n/LanguageContext";

const KEY = "cooverly-promo-shown";
const DELAY_MS = 15_000;
const COOKIE_KEY = "cooverly-cookie-consent";

export function PromoPopup() {
  const ex = useExtras();
  const { lang } = useLang();
  const { openModal } = useDiagnosticModal();
  const [show, setShow] = useState(false);
  const [cookieDismissed, setCookieDismissed] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const updateCookie = () => {
      setCookieDismissed(Boolean(window.localStorage.getItem(COOKIE_KEY)));
    };
    updateCookie();
    const interval = window.setInterval(updateCookie, 800);
    if (window.sessionStorage.getItem(KEY)) return;
    const t = setTimeout(() => setShow(true), DELAY_MS);
    return () => {
      clearTimeout(t);
      window.clearInterval(interval);
    };
  }, []);

  function dismiss() {
    try { window.sessionStorage.setItem(KEY, "1"); } catch { /* noop */ }
    setShow(false);
  }

  function take() {
    dismiss();
    openModal();
  }

  const waLabel = lang === "it" ? "Scrivici ora su WhatsApp" : lang === "es" ? "Escríbenos por WhatsApp" : "Message us on WhatsApp";
  const waText =
    lang === "it"
      ? "Ciao Cooverly, vorrei parlare con voi del mio business e capire come l'AI può aiutarmi."
      : lang === "es"
      ? "Hola Cooverly, me gustaría hablar con vosotros sobre mi negocio y cómo la IA puede ayudarme."
      : "Hi Cooverly, I'd like to talk to you about my business and how AI can help me.";
  const waHref = `${CONTACT.whatsapp}?text=${encodeURIComponent(waText)}`;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 240, damping: 24 }}
          className={`fixed right-4 z-[55] w-[calc(100vw-2rem)] max-w-sm sm:right-6 transition-all duration-300 ${cookieDismissed ? "bottom-4 sm:bottom-6" : "bottom-36 sm:bottom-32"}`}
          role="dialog"
          aria-label="AI Revenue Diagnostic invitation"
        >
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card/95 p-5 shadow-2xl backdrop-blur-xl">
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-40 blur-3xl" style={{ background: "var(--gradient-brand)" }} />
            <button
              type="button"
              onClick={dismiss}
              aria-label="Close"
              className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground transition hover:bg-muted/30 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="relative flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: "var(--gradient-brand)" }}>
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="text-xs font-medium uppercase tracking-[0.2em] text-primary-glow">Cooverly · AI</div>
            </div>
            <div className="relative mt-4 text-base font-semibold leading-snug text-foreground">{ex.promo.title}</div>
            <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{ex.promo.sub}</p>
            <div className="relative mt-5 flex flex-col gap-2">
              <Button
                size="sm"
                onClick={take}
                className="h-10 w-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-[var(--shadow-glow)]"
              >
                <Activity className="h-4 w-4" /> {ex.promo.cta}
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="h-10 w-full border-[oklch(0.72_0.19_140_/_0.5)] bg-[oklch(0.72_0.19_140_/_0.12)] text-foreground hover:bg-[oklch(0.72_0.19_140_/_0.18)]"
              >
                <a href={waHref} target="_blank" rel="noreferrer" onClick={dismiss}>
                  <MessageSquare className="h-4 w-4 text-[oklch(0.85_0.18_140)]" /> {waLabel}
                </a>
              </Button>
              <button onClick={dismiss} className="text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
                {ex.promo.dismiss}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}