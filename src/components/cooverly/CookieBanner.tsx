import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";

const KEY = "cooverly-cookie-consent";

export function CookieBanner() {
  const { t } = useLang();
  const [show, setShow] = useState(false);
  useEffect(() => { if (!window.localStorage.getItem(KEY)) setShow(true); }, []);
  function set(v: "accepted" | "rejected") {
    try { window.localStorage.setItem(KEY, v); } catch { /* noop */ }
    setShow(false);
  }
  if (!show) return null;
  return (
    <div role="region" aria-label={t.cookies.title} className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-5">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-soft)] sm:flex-row sm:items-center sm:gap-5">
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          <strong className="text-foreground">{t.cookies.title}.</strong> {t.cookies.body}{" "}
          <Link to="/privacy" className="text-primary underline underline-offset-2">{t.cookies.manage}</Link>
        </p>
        <div className="flex gap-2">
          <Button variant="outline" className="h-11 flex-1 sm:flex-none" onClick={() => set("rejected")}>{t.cookies.reject}</Button>
          <Button className="h-11 flex-1 hover:bg-primary-hover sm:flex-none" onClick={() => set("accepted")}>{t.cookies.accept}</Button>
        </div>
      </div>
    </div>
  );
}
