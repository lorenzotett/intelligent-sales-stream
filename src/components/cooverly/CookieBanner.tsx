import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExtras } from "@/i18n/extras";

const KEY = "cooverly-cookie-consent";

export function CookieBanner() {
  const ex = useExtras();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const v = window.localStorage.getItem(KEY);
    if (!v) {
      const t = setTimeout(() => setShow(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  function set(value: "accepted" | "rejected") {
    try { window.localStorage.setItem(KEY, value); } catch { /* noop */ }
    setShow(false);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 26 }}
          className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-3 sm:px-6 sm:pb-6"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card/90 p-4 shadow-2xl backdrop-blur-xl sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ background: "var(--gradient-brand)" }}>
                <Cookie className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-foreground">{ex.cookies.title}</div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">{ex.cookies.body}</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button asChild size="sm" variant="ghost" className="h-9 text-xs">
                  <Link to="/privacy">{ex.cookies.manage}</Link>
                </Button>
                <Button size="sm" variant="outline" className="h-9 border-border bg-background/40 text-xs" onClick={() => set("rejected")}>
                  {ex.cookies.reject}
                </Button>
                <Button size="sm" className="h-9 bg-gradient-to-r from-primary to-primary-glow text-xs text-primary-foreground" onClick={() => set("accepted")}>
                  {ex.cookies.accept}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}