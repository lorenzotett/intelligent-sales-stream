import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageShell, Eyebrow } from "@/components/cooverly/PageShell";
import { HeroMap } from "@/components/cooverly/HeroMap";
import { Reveal } from "@/components/cooverly/Reveal";
import { Tilt3D } from "@/components/cooverly/Tilt3D";
import { DepthScene } from "@/components/cooverly/DepthScene";
import { DepthBand } from "@/components/cooverly/DepthBand";
import { ReadinessQuiz } from "@/components/cooverly/ReadinessQuiz";
import { Parallax } from "@/components/cooverly/Parallax";
import { ScrollVideo } from "@/components/cooverly/ScrollVideo";
import filmBuild from "@/assets/brand-motion-build.mp4.asset.json";
import filmRise from "@/assets/brand-motion-rise.mp4.asset.json";
import { darkAccents, lightAccents, pick } from "@/components/cooverly/accents";
import { useLang } from "@/i18n/LanguageContext";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => pageHead("/", "Cooverly — New Businesses & Corporate Spin-offs",
    "Venture development partner for founders, companies and family holdings in Dubai, the Cayman Islands, Switzerland, Singapore, the US and Europe: validate, build and launch new businesses and spin-offs."),
  component: Index,
});

function Index() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroP, [0, 1], [0, -70]);
  const heroOpacity = useTransform(heroP, [0, 1], [1, 0.15]);
  const heroTilt = useTransform(heroP, [0, 1], [0, 14]);
  return (
    <PageShell>
      {/* Hero */}
      <section ref={heroRef} className="container-site relative isolate py-14 sm:py-20 lg:py-24">
        <DepthScene />
        <span aria-hidden className="rule-tri absolute inset-x-0 top-0" />
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <motion.div className="lg:col-span-7" style={{ y: reduce ? 0 : heroY, opacity: reduce ? 1 : heroOpacity }}>
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
            <p className="mt-4 text-[15px] text-muted-foreground">{t.hero.micro}</p>
          </motion.div>
          <motion.div
            className="lg:col-span-5"
            style={{
              y: reduce ? 0 : heroY,
              opacity: reduce ? 1 : heroOpacity,
              rotateY: reduce ? 0 : heroTilt,
              transformPerspective: 1200,
            }}
          >
            <Tilt3D className="float3d" max={12}><HeroMap /></Tilt3D>
          </motion.div>
        </div>
        <div className="mt-14 border-t border-border pt-6 sm:mt-20">
          <p className="text-center text-[13px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{t.markets.label}</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 font-display text-[15px] font-semibold text-foreground/80">
            {t.markets.list.map((m, i) => (
              <li key={m} className="flex items-center gap-2"><span aria-hidden className={`h-1.5 w-1.5 rounded-full ${pick(lightAccents, i).dot}`} />{m}</li>
            ))}
          </ul>
        </div>
      </section>

      <ScrollVideo src={filmBuild.url} kicker={t.films.a.k} title={t.films.a.t} />

      {/* When */}
      <section id="who" className="border-y border-border bg-card">
        <div className="container-site grid gap-10 py-16 sm:py-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow tone="warm">{t.when.eyebrow}</Eyebrow>
            <h2 className="h2-fluid mt-4 font-bold">{t.when.title}</h2>
            <p className="mt-5 max-w-[60ch] text-muted-foreground">{t.when.intro}</p>
            <p className="mt-5 text-[15px] text-muted-foreground">{t.when.note}</p>
          </div>
          <ul className="divide-y divide-border lg:col-span-6 lg:col-start-7">
            {t.when.items.map((it, i) => (
              <Reveal key={it.t} delay={i * 0.05}>
                <li className="flex gap-5 py-6 first:pt-0">
                  <span className={`font-display text-sm font-bold ${pick(lightAccents, i).text}`}>{String(i + 1).padStart(2, "0")}</span>
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
        <Eyebrow tone="sky">{t.caps.eyebrow}</Eyebrow>
        <Reveal><h2 className="h2-fluid mt-4 max-w-3xl font-bold">{t.caps.title}</h2></Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.caps.rows.map((r, i) => {
            const ac = pick(lightAccents, i);
            return (
              <Reveal key={r.t} delay={(i % 3) * 0.07} className="h-full">
                <Tilt3D className="h-full" max={7}>
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-lg sm:p-7">
                    <span aria-hidden className={`absolute inset-x-0 top-0 h-1 ${ac.bar}`} />
                    <span className={`grid h-11 w-11 place-items-center rounded-xl font-display text-sm font-bold ${ac.chip}`}>{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-5 text-xl font-bold">{r.t}</h3>
                    <p className="mt-2 text-muted-foreground">{r.d}</p>
                    <div className="mt-auto pt-6">
                      <div className="border-t border-border pt-4">
                        <p className={`text-[12px] font-semibold uppercase tracking-[0.16em] ${ac.text}`}>{t.caps.outputLabel}</p>
                        <p className="mt-1 text-[15px] font-medium">{r.o}</p>
                      </div>
                    </div>
                  </article>
                </Tilt3D>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-6 text-[15px] text-muted-foreground">{t.caps.footnote}</p>
      </section>

      {/* Quick check */}
      <section id="quiz" className="container-site scroll-mt-20 py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow tone="red">{t.quiz.eyebrow}</Eyebrow>
            <Reveal depth={0.5}><h2 className="h2-fluid mt-4 font-bold">{t.quiz.title}</h2></Reveal>
            <p className="mt-5 max-w-[56ch] text-muted-foreground">{t.quiz.sub}</p>
          </div>
          <Reveal className="lg:col-span-7" depth={0.4}><ReadinessQuiz /></Reveal>
        </div>
      </section>

      <ScrollVideo src={filmRise.url} dark kicker={t.films.b.k} title={t.films.b.t} />

      {/* Method */}
      <section id="method" className="relative isolate overflow-hidden bg-navy text-navy-foreground">
        <DepthBand />
        <div className="container-site py-16 sm:py-24">
          <Eyebrow inverted tone="warm">{t.method.eyebrow}</Eyebrow>
          <Reveal><h2 className="h2-fluid mt-4 max-w-3xl font-bold">{t.method.title}</h2></Reveal>
          <ol className="mt-12 grid gap-6 lg:grid-cols-3">
            {t.method.phases.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.06}>
                <Tilt3D className="h-full"><li className="relative flex h-full flex-col overflow-hidden rounded-xl border border-navy-foreground/15 p-6">
                  <span aria-hidden className={`absolute inset-x-0 top-0 h-0.5 ${pick(darkAccents, i).bar}`} />
                  <p className={`font-display text-sm font-bold ${pick(darkAccents, i).text}`}>{p.n}</p>
                  <h3 className="mt-2 text-2xl font-bold">{p.t}</h3>
                  <p className="mt-3 text-navy-muted">{p.q}</p>
                  <ul className="mt-5 space-y-2 text-[15px]">
                    {p.a.map((a) => <li key={a} className="flex gap-2"><span aria-hidden className={`mt-2.5 h-1 w-3 shrink-0 ${pick(darkAccents, i).dot}`} />{a}</li>)}
                  </ul>
                  <div className="mt-auto pt-6">
                    <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-navy-muted">{t.method.outLabel}</p>
                    <p className="mt-1 text-[15px]">{p.o}</p>
                    <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-navy-muted">{t.method.nextLabel}</p>
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
          <Parallax speed={22}>
            <Eyebrow>{t.deliver.eyebrow}</Eyebrow>
            <h2 className="h2-fluid mt-4 font-bold">{t.deliver.title}</h2>
            <p className="mt-5 text-muted-foreground">{t.deliver.sub}</p>
          </Parallax>
        </div>
        <Reveal className="lg:col-span-7 lg:col-start-6">
          <Tilt3D max={6}><article className="rounded-xl border border-border bg-card shadow-[var(--shadow-soft)]">
            <header className="relative flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-4 sm:px-7">
              <span aria-hidden className="rule-tri absolute inset-x-0 top-0" />
              <p className="font-display font-bold">{t.deliver.docTitle}</p>
              <span className="rounded-md bg-sky-deep/10 px-2 py-1 text-[13px] font-medium text-sky-deep">{t.deliver.label}</span>
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
            <Parallax speed={26} className="lg:col-span-5"><Eyebrow tone="sky">{t.after.eyebrow}</Eyebrow><h2 className="h2-fluid mt-4 font-bold">{t.after.title}</h2></Parallax>
            <Parallax speed={-16} className="lg:col-span-6 lg:col-start-7"><p className="text-muted-foreground">{t.after.text}</p></Parallax>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
            {t.after.items.map((it, i) => (
              <Reveal key={it.t} delay={i * 0.08} className="bg-background p-6"><div>
                <span aria-hidden className={`block h-0.5 w-10 rounded-full ${pick(lightAccents, i).bar}`} />
                <h3 className="mt-4 text-lg font-bold">{it.t}</h3>
                <p className="mt-2 text-muted-foreground">{it.d}</p>
              </div></Reveal>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-[15px] text-muted-foreground">{t.after.note}</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container-site grid gap-10 py-16 sm:py-24 lg:grid-cols-12">
        <Reveal className="lg:col-span-4"><Eyebrow tone="red">{t.faq.eyebrow}</Eyebrow><h2 className="h2-fluid mt-4 font-bold">{t.faq.title}</h2></Reveal>
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
        <Reveal><div className="relative isolate overflow-hidden rounded-2xl bg-navy px-6 py-14 text-navy-foreground sm:px-12 sm:py-16">
          <DepthBand />
          <span aria-hidden className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full border-[18px] border-accent-warm/40" />
          <span aria-hidden className="absolute -top-12 left-[22%] h-28 w-28 rounded-full border-[10px] border-sky/25" />
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
