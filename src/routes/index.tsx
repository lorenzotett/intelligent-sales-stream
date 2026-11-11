import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageShell, Eyebrow } from "@/components/cooverly/PageShell";
import { HeroMap } from "@/components/cooverly/HeroMap";
import { Reveal } from "@/components/cooverly/Reveal";
import { Tilt3D } from "@/components/cooverly/Tilt3D";
import { DepthScene } from "@/components/cooverly/DepthScene";
import { useLang } from "@/i18n/LanguageContext";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => pageHead("/", "Cooverly — New Businesses & Corporate Spin-offs",
    "Cooverly helps entrepreneurs and established companies validate, build and launch new businesses, with support across business strategy, product and go-to-market."),
  component: Index,
});

function Index() {
  const { t } = useLang();
  return (
    <PageShell>
      {/* Hero */}
      <section className="container-site relative isolate grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:py-24">
        <DepthScene />
        <div className="lg:col-span-7">
          <Eyebrow>{t.hero.eyebrow}</Eyebrow>
          <h1 className="h1-fluid mt-5 font-extrabold">{t.hero.h1a}<br />{t.hero.h1b}</h1>
          <p className="mt-6 max-w-[62ch] text-lg text-muted-foreground">{t.hero.sub}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-12 rounded-lg px-6 text-base hover:bg-primary-hover">
              <Link to="/contact">{t.hero.cta} <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-lg px-6 text-base">
              <Link to="/approach">{t.hero.cta2}</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{t.hero.micro}</p>
        </div>
        <Tilt3D className="float3d lg:col-span-5" max={12}><HeroMap /></Tilt3D>
      </section>

      {/* When */}
      <section id="who" className="border-y border-border bg-card">
        <div className="container-site grid gap-10 py-16 sm:py-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="h2-fluid font-bold">{t.when.title}</h2>
            <p className="mt-5 max-w-[60ch] text-muted-foreground">{t.when.intro}</p>
            <p className="mt-5 text-sm text-muted-foreground">{t.when.note}</p>
          </div>
          <ul className="divide-y divide-border lg:col-span-6 lg:col-start-7">
            {t.when.items.map((it, i) => (
              <Reveal key={it.t} delay={i * 0.05}>
                <li className="flex gap-5 py-6 first:pt-0">
                  <span className="font-display text-sm font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-xl font-bold">{it.t}</h3>
                    <p className="mt-1 text-muted-foreground">{it.d}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="container-site scroll-mt-20 py-16 sm:py-24">
        <span id="services" className="block scroll-mt-20" />
        <Eyebrow>{t.caps.eyebrow}</Eyebrow>
        <Reveal><h2 className="h2-fluid mt-4 max-w-3xl font-bold">{t.caps.title}</h2></Reveal>
        <div className="mt-10 border-t border-border">
          {t.caps.rows.map((r, i) => (
            <Reveal key={r.t}>
              <div className="grid gap-2 border-b border-border py-6 md:grid-cols-12 md:gap-6">
                <span className="font-display text-sm font-bold text-muted-foreground md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-lg font-bold md:col-span-3">{r.t}</h3>
                <p className="text-muted-foreground md:col-span-4">{r.d}</p>
                <p className="text-[15px] md:col-span-4"><span className="mr-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">{t.caps.outputLabel}</span>{r.o}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">{t.caps.footnote}</p>
      </section>

      {/* Method */}
      <section id="method" className="bg-navy text-navy-foreground">
        <div className="container-site py-16 sm:py-24">
          <Eyebrow inverted>{t.method.eyebrow}</Eyebrow>
          <Reveal><h2 className="h2-fluid mt-4 max-w-3xl font-bold">{t.method.title}</h2></Reveal>
          <ol className="mt-12 grid gap-6 lg:grid-cols-3">
            {t.method.phases.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.06}>
                <Tilt3D className="h-full"><li className="flex h-full flex-col rounded-xl border border-navy-foreground/15 p-6">
                  <p className="font-display text-sm font-bold text-navy-muted">{p.n}</p>
                  <h3 className="mt-2 text-2xl font-bold">{p.t}</h3>
                  <p className="mt-3 text-navy-muted">{p.q}</p>
                  <ul className="mt-5 space-y-2 text-[15px]">
                    {p.a.map((a) => <li key={a} className="flex gap-2"><span aria-hidden className="mt-2.5 h-1 w-3 shrink-0 bg-navy-muted" />{a}</li>)}
                  </ul>
                  <div className="mt-auto pt-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-muted">{t.method.outLabel}</p>
                    <p className="mt-1 text-[15px]">{p.o}</p>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-navy-muted">{t.method.nextLabel}</p>
                    <p className="mt-1 text-[15px] font-semibold">{p.next}</p>
                  </div>
                </li></Tilt3D>
              </Reveal>
            ))}
          </ol>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm text-navy-muted">{t.method.disclaimer}</p>
            <Button asChild variant="secondary" className="h-12 rounded-lg px-6">
              <Link to="/approach">{t.method.cta} <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Deliverable */}
      <section id="investment" className="container-site grid gap-10 py-16 sm:py-24 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow>{t.deliver.eyebrow}</Eyebrow>
          <h2 className="h2-fluid mt-4 font-bold">{t.deliver.title}</h2>
          <p className="mt-5 text-muted-foreground">{t.deliver.sub}</p>
        </div>
        <Reveal className="lg:col-span-7 lg:col-start-6">
          <Tilt3D max={6}><article className="rounded-xl border border-border bg-card shadow-[var(--shadow-soft)]">
            <header className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-4 sm:px-7">
              <p className="font-display font-bold">{t.deliver.docTitle}</p>
              <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">{t.deliver.label}</span>
            </header>
            <dl className="divide-y divide-border px-5 sm:px-7">
              {t.deliver.rows.map((r) => (
                <div key={r.k} className="grid gap-1 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
                  <dt className="font-semibold">{r.k}</dt>
                  <dd className="text-muted-foreground">{r.v}</dd>
                </div>
              ))}
            </dl>
          </article></Tilt3D>
        </Reveal>
      </section>

      {/* After launch */}
      <section className="border-y border-border bg-card">
        <div className="container-site py-16 sm:py-24">
          <div className="grid gap-8 lg:grid-cols-12">
            <h2 className="h2-fluid font-bold lg:col-span-5">{t.after.title}</h2>
            <p className="text-muted-foreground lg:col-span-6 lg:col-start-7">{t.after.text}</p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
            {t.after.items.map((it, i) => (
              <Reveal key={it.t} delay={i * 0.08} className="bg-background p-6"><div>
                <h3 className="text-lg font-bold">{it.t}</h3>
                <p className="mt-2 text-muted-foreground">{it.d}</p>
              </div></Reveal>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm text-muted-foreground">{t.after.note}</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container-site grid gap-10 py-16 sm:py-24 lg:grid-cols-12">
        <Reveal className="lg:col-span-4"><h2 className="h2-fluid font-bold">{t.faq.title}</h2></Reveal>
        <Accordion type="single" collapsible className="lg:col-span-7 lg:col-start-6">
          {t.faq.items.map((f, i) => (
            <AccordionItem key={f.q} value={`q${i}`}>
              <AccordionTrigger className="py-5 text-left text-base font-semibold sm:text-lg">{f.q}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Closing */}
      <section className="container-site pb-20">
        <Reveal><div className="relative overflow-hidden rounded-2xl bg-navy px-6 py-14 text-navy-foreground sm:px-12 sm:py-16">
          <span aria-hidden className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full border-[18px] border-accent-warm/40" />
          <h2 className="h2-fluid relative max-w-2xl font-bold">{t.closing.title}</h2>
          <p className="relative mt-5 max-w-[60ch] text-navy-muted">{t.closing.text}</p>
          <Button asChild className="relative mt-8 h-12 rounded-lg px-6 text-base hover:bg-primary-hover">
            <Link to="/contact">{t.closing.cta} <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div></Reveal>
      </section>
    </PageShell>
  );
}
