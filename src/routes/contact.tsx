import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { PageShell, Eyebrow } from "@/components/cooverly/PageShell";
import { ProjectForm } from "@/components/cooverly/ProjectForm";
import { useLang } from "@/i18n/LanguageContext";
import { CONTACT, WHATSAPP_HREF } from "@/i18n/site";
import { lightAccents } from "@/components/cooverly/accents";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => pageHead("/contact", "Tell us about your project — Cooverly",
    "Share a short overview of the new business, product or spin-off you would like to build with Cooverly."),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useLang();
  const c = t.contact;
  const items = [
    { Icon: Mail, label: c.emailLabel, value: CONTACT.email, href: `mailto:${CONTACT.email}?subject=${encodeURIComponent(c.emailSubject)}`, accent: lightAccents[0] },
    { Icon: Phone, label: c.phoneLabel, value: CONTACT.phoneDisplay, href: CONTACT.phoneHref, accent: lightAccents[3] },
    { Icon: MessageSquare, label: c.waLabel, value: CONTACT.phoneDisplay, href: WHATSAPP_HREF, external: true, accent: lightAccents[2] },
  ];
  return (
    <PageShell>
      <section className="container-site grid gap-10 py-14 sm:py-20 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h1 className="h1-fluid mt-5 font-extrabold">{c.title}</h1>
          <p className="mt-6 max-w-[56ch] text-lg text-muted-foreground">{c.sub}</p>
          <h2 className="mt-12 text-lg font-bold">{c.otherTitle}</h2>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {items.map(({ Icon, label, value, href, external, accent }) => (
              <li key={label}>
                <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}
                  className={`flex min-h-14 items-center gap-3 py-3 transition-colors ${accent.hover}`}>
                  <span aria-hidden className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${accent.chip}`}><Icon className="h-5 w-5" /></span>
                  <span className="min-w-0">
                    <span className="block text-[13px] text-muted-foreground">{label}</span>
                    <span className="block font-medium break-words">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[15px] text-muted-foreground">{c.intl}</p>
        </div>
        <div className="lg:col-span-7"><ProjectForm /></div>
      </section>
    </PageShell>
  );
}
