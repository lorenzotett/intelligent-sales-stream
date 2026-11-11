import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell, Eyebrow } from "@/components/cooverly/PageShell";
import { useLang } from "@/i18n/LanguageContext";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => pageHead("/about", "About Cooverly — Venture Development Partner",
    "Cooverly brings business planning, product development and go-to-market work into one coordinated process for new businesses."),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLang();
  const a = t.about;
  return (
    <PageShell>
      <section className="container-site grid gap-12 py-14 sm:py-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Eyebrow>{a.eyebrow}</Eyebrow>
          <h1 className="h1-fluid mt-5 font-extrabold">{a.title}</h1>
          <div className="mt-8 max-w-[64ch] space-y-5 text-lg text-muted-foreground">
            <p>{a.p1}</p><p>{a.p2}</p><p>{a.p3}</p>
          </div>
        </div>
        <aside className="self-start rounded-xl bg-navy p-7 text-navy-foreground lg:col-span-4 lg:col-start-9 lg:mt-24">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-navy-muted">{a.contactLabel}</p>
          <p className="mt-2 font-display text-3xl font-extrabold">{a.name}</p>
          <blockquote className="mt-6 border-l-2 border-accent-warm pl-4 text-lg leading-relaxed">“{a.quote}”</blockquote>
        </aside>
      </section>
      <section className="border-t border-border bg-card">
        <div className="container-site py-16 sm:py-20">
          <h2 className="h2-fluid font-bold">{a.principlesTitle}</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {a.principles.map((p, i) => (
              <div key={p.t} className="border-t-2 border-foreground pt-5">
                <p className="font-display text-sm font-bold text-primary">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-xl font-bold">{p.t}</h3>
                <p className="mt-2 text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
          <Button asChild className="mt-12 h-12 rounded-lg px-6 text-base hover:bg-primary-hover">
            <Link to="/contact">{t.closing.cta} <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
