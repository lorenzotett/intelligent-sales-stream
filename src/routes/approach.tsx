import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell, Eyebrow } from "@/components/cooverly/PageShell";
import { lightAccents, pick } from "@/components/cooverly/accents";
import { useLang } from "@/i18n/LanguageContext";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/approach")({
  head: () => pageHead("/approach", "How we work — Cooverly",
    "Cooverly's approach: three phases, clear decisions, separated budgets and defined responsibilities for new businesses and spin-offs."),
  component: ApproachPage,
});

function ApproachPage() {
  const { t } = useLang();
  const a = t.approach;
  return (
    <PageShell>
      <section className="container-site py-14 sm:py-20">
        <Eyebrow>{a.eyebrow}</Eyebrow>
        <h1 className="h1-fluid mt-5 max-w-4xl font-extrabold">{a.title}</h1>
        <p className="mt-6 max-w-[62ch] text-lg text-muted-foreground">{a.sub}</p>
      </section>

      <section className="border-y border-border bg-card">
        <div className="container-site py-16">
          <h2 className="h2-fluid font-bold">{a.phasesTitle}</h2>
          <div className="mt-10 divide-y divide-border border-y border-border">
            {t.method.phases.map((p, i) => (
              <div key={p.t} className="relative grid gap-4 py-8 lg:grid-cols-12">
                <span aria-hidden className={`absolute inset-x-0 top-0 h-0.5 ${pick(lightAccents, i).bar}`} />
                <div className="lg:col-span-3">
                  <p className={`font-display text-sm font-bold ${pick(lightAccents, i).text}`}>{p.n}</p>
                  <h3 className="mt-1 text-2xl font-bold">{p.t}</h3>
                </div>
                <div className="lg:col-span-4">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{t.method.qLabel}</p>
                  <p className="mt-1">{p.q}</p>
                  <ul className="mt-4 space-y-1 text-muted-foreground">{p.a.map((x) => <li key={x}>— {x}</li>)}</ul>
                </div>
                <div className="lg:col-span-5">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{t.method.outLabel}</p>
                  <p className="mt-1">{p.o}</p>
                  <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{t.method.nextLabel}</p>
                  <p className="mt-1 font-semibold">{p.next}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site grid gap-12 py-16 sm:py-20 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">{a.decideTitle}</h2>
          <p className="mt-4 max-w-[62ch] text-muted-foreground">{a.decide}</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">{a.coordTitle}</h2>
          <ul className="mt-4 space-y-3 text-muted-foreground">
            {a.coord.map((c, i) => <li key={c} className="flex gap-3"><span aria-hidden className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${pick(lightAccents, i).dot}`} />{c}</li>)}
          </ul>
        </div>
      </section>

      <section className="bg-navy text-navy-foreground">
        <div className="container-site grid gap-10 py-16 sm:py-20 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="h2-fluid font-bold">{a.agendaTitle}</h2>
            <p className="mt-4 text-sm text-navy-muted">{a.agendaLabel}</p>
          </div>
          <ol className="divide-y divide-navy-foreground/15 border-y border-navy-foreground/15 lg:col-span-7 lg:col-start-6">
            {a.agenda.map((g) => (
              <li key={g.w} className="grid gap-1 py-5 sm:grid-cols-[8rem_1fr]">
                <span className="font-display font-bold text-sky">{g.w}</span>
                <span className="text-navy-muted">{g.t}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="investment" className="container-site py-16 sm:py-20">
        <h2 className="h2-fluid font-bold">{a.budgetTitle}</h2>
        <p className="mt-4 text-muted-foreground">{a.budgetIntro}</p>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {a.budget.map((b, i) => (
            <li key={b.t} className="relative overflow-hidden rounded-xl border border-border bg-card p-6">
              <span aria-hidden className={`absolute inset-x-0 top-0 h-0.5 ${pick(lightAccents, i).bar}`} />
              <p className={`font-display text-sm font-bold ${pick(lightAccents, i).text}`}>{i + 1}</p>
              <h3 className="mt-2 text-lg font-bold">{b.t}</h3>
              <p className="mt-2 text-muted-foreground">{b.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-border bg-card">
        <div className="container-site py-16 sm:py-20">
          <h2 className="h2-fluid font-bold">{a.respTitle}</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {[[a.respCoolabel, a.respCoo], [a.respClientLabel, a.respClient]].map(([label, items]) => (
              <div key={label as string}>
                <h3 className="text-xl font-bold">{label as string}</h3>
                <ul className="mt-4 divide-y divide-border border-y border-border">
                  {(items as string[]).map((x, i) => <li key={x} className="flex gap-3 py-3"><span aria-hidden className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${pick(lightAccents, i).dot}`} />{x}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-16 sm:py-20">
        <div className="max-w-3xl">
          <h2 className="h2-fluid font-bold">{a.afterTitle}</h2>
          <p className="mt-4 text-muted-foreground">{a.after}</p>
          <Button asChild className="mt-8 h-12 rounded-lg px-6 text-base hover:bg-primary-hover">
            <Link to="/contact">{t.closing.cta} <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
