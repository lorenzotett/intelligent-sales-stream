import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell, Eyebrow } from "@/components/cooverly/PageShell";
import { Reveal } from "@/components/cooverly/Reveal";
import { Tilt3D } from "@/components/cooverly/Tilt3D";
import { DepthBand } from "@/components/cooverly/DepthBand";
import { lightAccents, darkAccents, pick } from "@/components/cooverly/accents";
import { useLang } from "@/i18n/LanguageContext";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/method")({
  head: () => pageHead("/method", "Our method: market research, validation & MVP — Cooverly",
    "Cooverly's seven-step venture method: discovery, market research, customer validation, business model, MVP design, MVP build and pilot launch, then measure and scale."),
  component: MethodPage,
});

const PHASE_BAR = ["bg-primary", "bg-accent-warm", "bg-danger-brand"];
const PHASE_CHIP = ["bg-primary/10 text-primary", "bg-warm-deep/12 text-warm-deep", "bg-danger-brand/10 text-danger-brand"];

function MethodPage() {
  const { t } = useLang();
  const m = t.methodPage;
  const g = m.g;
  const counts = m.phaseNames.map((_, p) => m.steps.filter((s) => s.phase === p).length);
  return (
    <PageShell>
      {/* Hero */}
      <section className="container-site relative py-14 sm:py-20">
        <span aria-hidden className="rule-tri absolute inset-x-0 top-0" />
        <Eyebrow>{m.eyebrow}</Eyebrow>
        <h1 className="h1-fluid mt-5 max-w-4xl font-extrabold">{m.title}</h1>
        <p className="mt-6 max-w-[64ch] text-lg text-muted-foreground">{m.sub}</p>

        {/* Phase timeline */}
        <div className="mt-12">
          <div className="flex overflow-hidden rounded-full">
            {m.phaseNames.map((_, p) => <span key={p} className={`h-2 ${PHASE_BAR[p]}`} style={{ flex: counts[p] }} />)}
          </div>
          <ol className="mt-4 grid grid-cols-7 gap-1">
            {m.steps.map((s, i) => (
              <li key={s.t} className="min-w-0">
                <a href={`#step-${i + 1}`} className="group block rounded-lg p-1 text-center sm:p-2 sm:text-left">
                  <span className={`mx-auto grid h-8 w-8 place-items-center rounded-full text-[13px] font-bold sm:mx-0 ${PHASE_CHIP[s.phase]}`}>{i + 1}</span>
                  <span className="mt-2 hidden text-[13px] font-semibold leading-tight group-hover:text-primary md:block">{s.t}</span>
                </a>
              </li>
            ))}
          </ol>
          <div className="mt-4 flex flex-wrap gap-4 text-[13px] text-muted-foreground">
            {m.phaseNames.map((n, p) => <span key={n} className="flex items-center gap-2"><span className={`h-2 w-4 rounded-full ${PHASE_BAR[p]}`} />{n}</span>)}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="border-y border-border bg-card">
        <div className="container-site py-12 sm:py-16">
          <ol className="space-y-6">
            {m.steps.map((s, i) => (
              <li key={s.t} id={`step-${i + 1}`} className="scroll-mt-24">
                <Reveal>
                  <article className="relative overflow-hidden rounded-2xl border border-border bg-background shadow-[var(--shadow-soft)]">
                    <span aria-hidden className={`absolute inset-y-0 left-0 w-1 ${PHASE_BAR[s.phase]}`} />
                    <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-12">
                      <header className="lg:col-span-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-display text-4xl font-extrabold text-foreground/15">{String(i + 1).padStart(2, "0")}</span>
                          <span className={`rounded-md px-2 py-1 text-[12px] font-semibold uppercase tracking-[0.12em] ${PHASE_CHIP[s.phase]}`}>{m.phaseNames[s.phase]}</span>
                        </div>
                        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{s.t}</h2>
                        <p className="mt-3 text-muted-foreground"><span className="font-semibold text-foreground">{m.goalLabel}: </span>{s.goal}</p>
                        <p className="mt-4 text-[13px] text-muted-foreground">{m.timeLabel}: <span className="font-semibold text-foreground">{s.time}</span></p>
                      </header>
                      <div className="lg:col-span-4">
                        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{m.doLabel}</p>
                        <ul className="mt-3 space-y-2.5">
                          {s.do.map((d) => <li key={d} className="flex gap-2.5"><Check className={`mt-0.5 h-4 w-4 shrink-0 ${pick(lightAccents, i).text}`} />{d}</li>)}
                        </ul>
                        <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{m.toolsLabel}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {s.tools.map((x) => <span key={x} className="rounded-full border border-border px-3 py-1 text-[13px]">{x}</span>)}
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 lg:col-span-4">
                        <div className="rounded-xl border border-border bg-card p-5">
                          <p className={`text-[12px] font-semibold uppercase tracking-[0.16em] ${pick(lightAccents, i).text}`}>{m.outLabel}</p>
                          <p className="mt-2 font-medium">{s.out}</p>
                        </div>
                        <div className="rounded-xl bg-navy p-5 text-navy-foreground">
                          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent-warm">{m.gateLabel}</p>
                          <p className="mt-2 font-semibold">{s.gate}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Visual examples */}
      <section className="container-site py-16 sm:py-24">
        <Eyebrow tone="sky">{g.eyebrow}</Eyebrow>
        <h2 className="h2-fluid mt-4 max-w-3xl font-bold">{g.title}</h2>
        <p className="mt-3 text-[15px] text-muted-foreground">{g.note}</p>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Funnel */}
          <Reveal className="h-full"><Tilt3D className="h-full" max={5}><Card title={g.funnelTitle} sub={g.funnelSub}>
            <div className="space-y-2.5">
              {g.funnel.map(([label, n], i) => {
                const w = [100, 78, 52, 38][i];
                return (
                  <div key={label} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className={`flex h-11 items-center justify-between rounded-lg px-4 text-[14px] font-semibold text-primary-foreground ${["bg-navy", "bg-primary", "bg-sky-deep", "bg-accent-warm"][i]}`} style={{ width: `${w}%` }}>
                        <span className="truncate">{label}</span><span>{n}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card></Tilt3D></Reveal>

          {/* MVP scope */}
          <Reveal className="h-full" delay={0.06}><Tilt3D className="h-full" max={5}><Card title={g.mvpTitle} sub={g.mvpSub}>
            <div className="grid gap-3 sm:grid-cols-3">
              {g.mvp.map(([k, v], i) => (
                <div key={k} className={`rounded-xl border p-4 ${["border-primary/40 bg-primary/5", "border-sky-deep/35 bg-sky-deep/5", "border-border bg-muted/40 opacity-75"][i]}`}>
                  <p className={`text-[12px] font-bold uppercase tracking-[0.14em] ${["text-primary", "text-sky-deep", "text-muted-foreground"][i]}`}>{k}</p>
                  <p className="mt-2 text-[14px]">{v}</p>
                </div>
              ))}
            </div>
          </Card></Tilt3D></Reveal>

          {/* Loop */}
          <Reveal className="h-full"><Tilt3D className="h-full" max={5}><Card title={g.loopTitle} sub={g.loopSub}>
            <div className="relative mx-auto aspect-square w-full max-w-[260px]">
              <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-[spin_40s_linear_infinite] motion-reduce:animate-none" aria-hidden>
                <circle cx="100" cy="100" r="78" fill="none" stroke="var(--border)" strokeWidth="2" />
                <circle cx="100" cy="100" r="78" fill="none" stroke="url(#lg)" strokeWidth="4" strokeDasharray="120 370" strokeLinecap="round" />
                <defs><linearGradient id="lg"><stop offset="0" stopColor="var(--primary)" /><stop offset="1" stopColor="var(--accent-warm)" /></linearGradient></defs>
              </svg>
              {g.loop.map((l, i) => {
                const pos = ["left-1/2 top-0 -translate-x-1/2", "right-0 top-1/2 -translate-y-1/2", "left-1/2 bottom-0 -translate-x-1/2", "left-0 top-1/2 -translate-y-1/2"][i];
                return <span key={l} className={`absolute ${pos} rounded-full px-3 py-1.5 text-[13px] font-bold shadow-sm ${pick(lightAccents, i).chip} bg-card`}>{l}</span>;
              })}
              <span className="absolute inset-0 m-auto grid h-20 w-20 place-items-center rounded-full bg-navy text-[12px] font-bold uppercase tracking-wider text-navy-foreground">MVP</span>
            </div>
          </Card></Tilt3D></Reveal>

          {/* Dashboard */}
          <Reveal className="h-full" delay={0.06}><Tilt3D className="h-full" max={5}><Card title={g.dashTitle} sub={g.dashSub}>
            <div className="grid gap-3 sm:grid-cols-3">
              {g.dash.map(([k, v], i) => {
                const pts = [[10, 30, 42, 50, 61, 68, 74, 80], [100, 70, 58, 52, 49, 47, 46, 45], [4, 6, 9, 11, 14, 16, 19, 21]][i];
                const max = Math.max(...pts);
                const d = pts.map((p, j) => `${j === 0 ? "M" : "L"}${(j / 7) * 100},${40 - (p / max) * 34}`).join(" ");
                return (
                  <div key={k} className="rounded-xl border border-border p-3">
                    <p className="text-[13px] font-bold">{k}</p>
                    <p className="text-[12px] text-muted-foreground">{v}</p>
                    <svg viewBox="0 0 100 42" className="mt-2 h-14 w-full" aria-hidden>
                      <path d={d} fill="none" stroke={["var(--primary)", "var(--danger-brand)", "var(--accent-warm)"][i]} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                );
              })}
            </div>
          </Card></Tilt3D></Reveal>
        </div>
      </section>

      {/* Principles */}
      <section className="relative isolate overflow-hidden bg-navy text-navy-foreground">
        <DepthBand />
        <div className="container-site py-16 sm:py-20">
          <h2 className="h2-fluid max-w-3xl font-bold">{m.pr.title}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {m.pr.items.map(([k, v], i) => (
              <Reveal key={k} delay={i * 0.06}><div className={`h-full rounded-xl border p-6 ${pick(darkAccents, i).border}`}>
                <p className={`font-display text-sm font-bold ${pick(darkAccents, i).text}`}>{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-xl font-bold">{k}</h3>
                <p className="mt-2 text-navy-muted">{v}</p>
              </div></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-site py-16 text-center sm:py-24">
        <h2 className="h2-fluid mx-auto max-w-2xl font-bold">{m.cta.title}</h2>
        <p className="mx-auto mt-4 max-w-[56ch] text-muted-foreground">{m.cta.text}</p>
        <Button asChild className="mt-8 h-12 rounded-lg px-6 text-base hover:bg-primary-hover">
          <Link to="/contact">{m.cta.btn} <ArrowRight className="h-4 w-4" /></Link>
        </Button>
      </section>
    </PageShell>
  );
}

function Card({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-7">
      <span aria-hidden className="rule-tri absolute inset-x-0 top-0" />
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-1 text-[15px] text-muted-foreground">{sub}</p>
      <div className="mt-6 flex flex-1 flex-col justify-center">{children}</div>
    </div>
  );
}
