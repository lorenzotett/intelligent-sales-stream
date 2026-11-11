import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { useLang } from "@/i18n/LanguageContext";
import { Wordmark } from "./Wordmark";
import { LangSwitch } from "./LangSwitch";

export function SiteHeader() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const links = (
    onClick?: () => void,
  ) => [
    <a key="w" href="/#capabilities" onClick={onClick} className="nav-link">{t.nav.what}</a>,
    <Link key="h" to="/approach" onClick={onClick} className="nav-link" activeProps={{ "aria-current": "page" }}>{t.nav.how}</Link>,
    <Link key="a" to="/about" onClick={onClick} className="nav-link" activeProps={{ "aria-current": "page" }}>{t.nav.about}</Link>,
    <a key="q" href="/#quiz" onClick={onClick} className="nav-link">{t.nav.quiz}</a>,
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Link to="/" aria-label={t.nav.home} className="flex items-baseline gap-3">
          <Wordmark />
          <span className="hidden text-[13px] font-medium text-muted-foreground xl:inline">{t.descriptor}</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 text-[15px] lg:flex">{links()}</nav>
        <div className="hidden items-center gap-3 lg:flex">
          <LangSwitch />
          <Button asChild className="h-10 rounded-lg px-4 hover:bg-primary-hover">
            <Link to="/contact">{t.nav.cta}</Link>
          </Button>
        </div>
        <button type="button" onClick={() => setOpen(true)} aria-label={t.nav.menu} aria-expanded={open}
          className="grid h-11 w-11 place-items-center rounded-lg border border-border bg-card lg:hidden">
          <Menu className="h-5 w-5" />
        </button>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full max-w-xs bg-background p-6 [&>button]:hidden">
          <SheetTitle className="sr-only">{t.nav.menu}</SheetTitle>
          <div className="flex items-center justify-between">
            <Wordmark />
            <SheetClose aria-label={t.nav.close} className="grid h-11 w-11 place-items-center rounded-lg border border-border">
              <X className="h-5 w-5" />
            </SheetClose>
          </div>
          <nav aria-label="Mobile" className="mt-8 flex flex-col gap-1 text-lg [&_.nav-link]:py-3">{links(() => setOpen(false))}</nav>
          <div className="mt-8 flex flex-col gap-4">
            <LangSwitch className="self-start" />
            <Button asChild className="h-12 rounded-lg">
              <Link to="/contact" onClick={() => setOpen(false)}>{t.nav.cta}</Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
