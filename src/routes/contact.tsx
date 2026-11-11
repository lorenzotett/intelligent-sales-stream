import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { PageShell, Eyebrow } from "@/components/cooverly/PageShell";
import { ProjectForm } from "@/components/cooverly/ProjectForm";
import { useLang } from "@/i18n/LanguageContext";
import { CONTACT } from "@/i18n/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => pageHead("/contact", "Tell us about your project — Cooverly",
    "Share a short overview of the new business, product or spin-off you would like to build with Cooverly."),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useLang();
  const c = t.contact;
  const wa = `${CONTACT.whatsapp}?text=${encodeURIComponent(c.waText)}`;
  const items = [
    { Icon: Mail, label: c.emailLabel, value: CONTACT.email, href: `mailto:${CONTACT.email}?subject=${encodeURIComponent(c.emailSubject)}` },
    { Icon: Phone, label: c.phoneLabel, value: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
    { Icon: MessageSquare, label: c.waLabel, value: c.waAction, href: wa, external: true },
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
            {items.map(({ Icon, label, value, href, external }) => (
              <li key={label}>
                <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}
                  className="flex min-h-14 items-center gap-4 py-3 transition-colors hover:text-primary">
                  <Icon className="h-5 w-5 text-primary" aria-hidden />
                  <span className="w-24 shrink-0 text-sm text-muted-foreground">{label}</span>
                  <span className="font-medium">{value}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">{c.intl}</p>
        </div>
        <div className="lg:col-span-7"><ProjectForm /></div>
      </section>
    </PageShell>
  );
}
