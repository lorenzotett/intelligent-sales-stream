import { Link } from "@tanstack/react-router";
import { useLang } from "@/i18n/LanguageContext";
import { CONTACT, WHATSAPP_HREF } from "@/i18n/site";
import { Wordmark } from "./Wordmark";

export function SiteFooter() {
  const { t } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container-site grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Wordmark inverted />
          <p className="mt-1 text-sm text-navy-muted">{t.descriptor}</p>
          <p className="mt-4 max-w-sm text-[15px] text-navy-muted">{t.footer.tagline}</p>
        </div>
        <div className="md:col-span-2">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-navy-muted">{t.footer.pages}</h2>
          <ul className="mt-4 space-y-2 text-[15px]">
            <li><a href="/#capabilities" className="hover:underline">{t.nav.what}</a></li>
            <li><Link to="/approach" className="hover:underline">{t.nav.how}</Link></li>
            <li><Link to="/about" className="hover:underline">{t.nav.about}</Link></li>
            <li><Link to="/contact" className="hover:underline">{t.contact.eyebrow}</Link></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-navy-muted">{t.footer.contact}</h2>
          <ul className="mt-4 space-y-2 text-[15px]">
            <li><a href={`mailto:${CONTACT.email}`} className="hover:underline">{CONTACT.email}</a></li>
            <li><a href={CONTACT.phoneHref} className="hover:underline">{CONTACT.phoneDisplay}</a></li>
            <li><a href={WHATSAPP_HREF} target="_blank" rel="noreferrer" className="hover:underline">WhatsApp</a></li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-navy-muted">{t.footer.legal}</h2>
          <ul className="mt-4 space-y-2 text-[15px]">
            <li><Link to="/privacy" className="hover:underline">{t.footer.privacy}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10">
        <div className="container-site py-6 text-center text-sm text-navy-muted">
          © {year} Cooverly · {t.footer.rights} · {t.footer.vat} {CONTACT.vat}
        </div>
      </div>
    </footer>
  );
}
