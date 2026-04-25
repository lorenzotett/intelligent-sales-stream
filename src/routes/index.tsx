import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, MessageSquare, Calendar, Zap,
  Stethoscope, Home, Building2, Briefcase, Smile,
  TrendingUp, Clock, Check, Sparkles, Infinity as InfinityIcon, Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/cooverly/AnimatedBackground";
import { TiltCard } from "@/components/cooverly/TiltCard";
import { Logo3D } from "@/components/cooverly/Logo3D";
import { Logo } from "@/components/cooverly/Logo";
import { LangSwitch } from "@/components/cooverly/LangSwitch";
import { useLang } from "@/i18n/LanguageContext";
import { CONTACT } from "@/i18n/translations";
import { useExtras } from "@/i18n/extras";
import { useDiagnosticModal } from "@/components/cooverly/DiagnosticModal";
import { useRef } from "react";
import { RevenueAnalyzer } from "@/components/cooverly/RevenueAnalyzer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Cooverly — AI Revenue Systems for Service Businesses" },
      {
        name: "description",
        content:
          "We deploy AI systems that respond, qualify and book appointments 24/7 for med spas, dental practices, home services, real estate and agencies.",
      },
      { property: "og:title", content: "Cooverly — AI Revenue Systems" },
      { property: "og:description", content: "AI that answers, follows up and books appointments for your business — 24/7." },
    ],
  }),
});

const nicheIcons = [Smile, Stethoscope, Home, Building2, Briefcase];
const serviceIcons = [Zap, MessageSquare, Calendar];

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-foreground">
      <AnimatedBackground />
      <Nav />
      <Hero />
      <Marquee />
      <Diagnostic />
      <Services />
      <Niches />
      <CaseStudies />
      <Pricing />
      <Footer />
    </div>
  );
}

function Nav() {
  const { t } = useLang();
  const ex = useExtras();
  const { openModal } = useDiagnosticModal();
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <Link to="/" aria-label="Cooverly" className="group flex shrink-0 items-center">
          <Logo size={120} />
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground lg:flex">
          <a href="#services" className="hover:text-foreground transition">{t.nav.systems}</a>
          <a href="#niches" className="hover:text-foreground transition">{t.nav.whoFor}</a>
          <a href="#results" className="hover:text-foreground transition">{t.nav.results}</a>
          <a href="#pricing" className="hover:text-foreground transition">{t.nav.pricing}</a>
          <button onClick={openModal} className="hover:text-foreground transition">{ex.diagnostic.navItem}</button>
          <Link to="/contact" className="hover:text-foreground transition">{t.nav.contact}</Link>
        </nav>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LangSwitch />
          <Button
            size="sm"
            variant="outline"
            onClick={openModal}
            className="hidden border-border bg-card/40 backdrop-blur sm:inline-flex"
          >
            <Activity className="h-4 w-4" />
            <span className="hidden md:inline">{ex.diagnostic.navItem}</span>
          </Button>
          <Button asChild size="sm" className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-[var(--shadow-glow)]">
            <Link to="/contact"><span className="hidden sm:inline">{t.nav.bookDemo}</span><span className="sm:hidden">Demo</span> <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <section ref={ref} className="relative px-6 pt-16 pb-24 sm:pt-20 sm:pb-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div style={{ y: yText, opacity }} className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_oklch(0.68_0.22_38)]" />
            {t.hero.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
          >
            {t.hero.titleA}{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-brand)" }}
            >
              {t.hero.titleHighlight}
            </span>
            {t.hero.titleB}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg mx-auto lg:mx-0"
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start"
          >
            <Button asChild size="lg" className="h-12 bg-gradient-to-r from-primary to-primary-glow px-7 text-primary-foreground shadow-[var(--shadow-glow)]">
              <Link to="/contact">
                <MessageSquare className="h-4 w-4" />
                {t.hero.ctaPrimary}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 border-border bg-card/40 px-7 backdrop-blur hover:bg-card">
              <Link to="/contact">
                {t.hero.ctaSecondary} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground lg:justify-start"
          >
            <div className="h-px w-8 bg-border" />
            {t.hero.group}{" "}
            <span className="font-medium text-foreground">Digitalizzato</span>
            <span className="rounded-full border border-border bg-card/50 px-2 py-0.5 text-[10px] uppercase tracking-wider">
              {t.hero.groupBadge}
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative mx-auto"
        >
          <Logo3D />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-2 top-8 hidden rounded-xl border border-border bg-card/80 px-4 py-3 backdrop-blur-xl md:block"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            <div className="flex items-center gap-2 text-xs">
              <Clock className="h-3.5 w-3.5 text-primary-glow" />
              {t.hero.pillResponse}
            </div>
            <div className="text-2xl font-semibold">{t.hero.pillResponseValue}</div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -right-2 bottom-8 hidden rounded-xl border border-border bg-card/80 px-4 py-3 backdrop-blur-xl md:block"
            style={{ boxShadow: "var(--shadow-accent)" }}
          >
            <div className="flex items-center gap-2 text-xs">
              <TrendingUp className="h-3.5 w-3.5 text-accent" />
              {t.hero.pillConversion}
            </div>
            <div className="text-2xl font-semibold">{t.hero.pillConversionValue}</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const { t } = useLang();
  const items = t.marquee;
  return (
    <div className="relative overflow-hidden border-y border-border/50 bg-card/30 py-6 backdrop-blur">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-12 whitespace-nowrap text-sm uppercase tracking-[0.2em] text-muted-foreground"
      >
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} className="flex items-center gap-12">
            <span>{it}</span>
            <span className="text-primary-glow">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Services() {
  return null;
}

function _Services_placeholder() {
  return null;
}
  const { t } = useLang();
  return (
    <section id="services" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={t.services.eyebrow} title={t.services.title} sub={t.services.sub} />
        <div className="mt-16 grid gap-6 md:grid-cols-3" style={{ perspective: "1500px" }}>
          {t.services.items.map((s, i) => {
            const Icon = serviceIcons[i];
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <TiltCard className="h-full" glow={i === 1 ? "accent" : "primary"}>
                  <div
                    className="mb-6 grid h-12 w-12 place-items-center rounded-xl"
                    style={{ background: i === 1 ? "var(--gradient-accent)" : "var(--gradient-primary)" }}
                  >
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {t.services.systemLabel} {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  <div className="mt-8 flex items-center gap-2 text-sm text-primary-glow">
                    {t.services.learn} <ArrowRight className="h-4 w-4" />
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Niches() {
  const { t } = useLang();
  return (
    <section id="niches" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={t.niches.eyebrow} title={t.niches.title} sub={t.niches.sub} />
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {t.niches.items.map((n, i) => {
            const Icon = nicheIcons[i];
            return (
              <motion.div
                key={n.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-xl transition-all hover:border-primary/50 hover:bg-card"
              >
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-3xl transition-all group-hover:bg-primary/20" />
                <Icon className="relative h-7 w-7 text-primary-glow" />
                <div className="relative mt-6 text-base font-semibold">{n.title}</div>
                <div className="relative mt-2 text-xs text-accent">{n.result}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CaseStudies() {
  const { t } = useLang();
  return (
    <section id="results" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={t.cases.eyebrow} title={t.cases.title} />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {t.cases.items.map((c, i) => (
            <motion.div
              key={c.tag}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card/80 to-card/30 p-8 backdrop-blur-xl"
            >
              <div className="absolute inset-x-0 top-0 h-px" style={{ background: "var(--gradient-primary)" }} />
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{c.tag}</div>
              <div
                className="mt-6 bg-clip-text text-6xl font-semibold tracking-tight text-transparent"
                style={{ backgroundImage: i === 1 ? "var(--gradient-accent)" : "var(--gradient-primary)" }}
              >
                {c.metric}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{c.label}</div>
              <p className="mt-6 text-sm leading-relaxed text-foreground/80">{c.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const { t } = useLang();
  const p = t.pricing;

  const waLink = (planName: string) =>
    `${CONTACT.whatsapp}?text=${encodeURIComponent(
      `Hi Cooverly, I'd like to start with the ${planName} plan (MRR).`,
    )}`;
  const mailLink = (planName: string) =>
    `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      `Cooverly Lifetime — ${planName}`,
    )}&body=${encodeURIComponent(
      `Hi Cooverly team,\n\nI'm interested in the ${planName} (Lifetime) plan. Please share next steps.\n\nThanks,`,
    )}`;

  return (
    <section id="pricing" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={p.eyebrow} title={p.title} sub={p.sub} />

        {/* MRR */}
        <div className="mt-16">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary-glow backdrop-blur">
              <Sparkles className="h-3 w-3" /> {p.mrrLabel}
            </div>
            <p className="max-w-md text-xs text-muted-foreground">{p.mrrNote}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3" style={{ perspective: "1500px" }}>
            {p.mrrPlans.map((plan, i) => (
              <PlanCard
                key={plan.name}
                index={i}
                name={plan.name}
                price={plan.price}
                period={p.perMonth}
                tagline={plan.tagline}
                features={plan.features}
                highlight={!!plan.highlight}
                badge={p.mostPopular}
                ctaLabel={p.mrrCta}
                ctaHref={waLink(plan.name)}
                ctaIcon="whatsapp"
              />
            ))}
          </div>
        </div>

        {/* Lifetime */}
        <div className="mt-24">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-accent backdrop-blur">
              <InfinityIcon className="h-3 w-3" /> {p.lifetimeLabel}
            </div>
            <p className="max-w-md text-xs text-muted-foreground">{p.lifetimeNote}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3" style={{ perspective: "1500px" }}>
            {p.lifetimePlans.map((plan, i) => (
              <PlanCard
                key={plan.name}
                index={i}
                name={plan.name}
                price={plan.price}
                period={p.oneTime}
                tagline={plan.tagline}
                features={plan.features}
                highlight={!!plan.highlight}
                badge={p.mostPopular}
                ctaLabel={p.lifetimeCta}
                ctaHref={mailLink(plan.name)}
                ctaIcon="mail"
                accent
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PlanCard({
  index, name, price, period, tagline, features, highlight, badge, ctaLabel, ctaHref, ctaIcon, accent,
}: {
  index: number; name: string; price: string; period: string; tagline: string;
  features: string[]; highlight: boolean; badge: string;
  ctaLabel: string; ctaHref: string; ctaIcon: "whatsapp" | "mail"; accent?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <TiltCard className="h-full" glow={accent ? "accent" : "primary"}>
        {highlight && (
          <div
            className="mb-4 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary-foreground"
            style={{ background: accent ? "var(--gradient-accent)" : "var(--gradient-primary)" }}
          >
            <Sparkles className="h-3 w-3" /> {badge}
          </div>
        )}
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{name}</div>
        <div className="mt-3 flex items-end gap-1.5">
          <span
            className="bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-5xl"
            style={{ backgroundImage: accent ? "var(--gradient-accent)" : "var(--gradient-primary)" }}
          >
            {price}
          </span>
          <span className="pb-1 text-sm text-muted-foreground">{period}</span>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{tagline}</p>

        <ul className="mt-6 space-y-2.5">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm">
              <Check className={`mt-0.5 h-4 w-4 shrink-0 ${accent ? "text-accent" : "text-primary-glow"}`} />
              <span className="text-foreground/85">{f}</span>
            </li>
          ))}
        </ul>

        <Button
          asChild
          className={`mt-8 h-11 w-full ${
            accent
              ? "border border-accent/40 bg-accent/10 text-accent hover:bg-accent/20"
              : "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-[var(--shadow-glow)]"
          }`}
        >
          <a href={ctaHref} target={ctaIcon === "whatsapp" ? "_blank" : undefined} rel="noreferrer">
            {ctaIcon === "whatsapp" ? <MessageSquare className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            {ctaLabel}
          </a>
        </Button>
      </TiltCard>
    </motion.div>
  );
}

function Footer() {
  const { t } = useLang();
  const ex = useExtras();
  return (
    <footer className="relative border-t border-border/50 px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-sm text-muted-foreground">
        <Logo size={96} />
        <div className="text-center text-xs text-muted-foreground">
          <span className="font-medium text-foreground/90">Cooverly</span>
          <span className="mx-2">·</span>
          <span>P.IVA 10904471215</span>
          <span className="mx-2">·</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="text-center">{t.footer.tag}</div>
        <div className="text-center text-xs">
          <Link to="/privacy" className="text-muted-foreground transition hover:text-foreground">
            {ex.cookies.manage}
          </Link>
        </div>
      </div>
    </footer>
  );
}

function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl"
    >
      <div className="text-xs uppercase tracking-[0.3em] text-primary-glow">{eyebrow}</div>
      <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-lg text-muted-foreground">{sub}</p>}
    </motion.div>
  );
}
