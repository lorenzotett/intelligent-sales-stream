import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, MessageSquare, Calendar, Zap,
  Stethoscope, Home, Building2, Briefcase, Smile,
  TrendingUp, Clock, Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/cooverly/AnimatedBackground";
import { TiltCard } from "@/components/cooverly/TiltCard";
import { Logo3D } from "@/components/cooverly/Logo3D";
import { Logo } from "@/components/cooverly/Logo";
import { useRef } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Cooverly — Turn Leads Into Customers, Automatically" },
      {
        name: "description",
        content:
          "AI revenue systems that respond, follow up, and book appointments 24/7 for med spas, dentists, home services, real estate and agencies.",
      },
    ],
  }),
});

const niches = [
  { icon: Smile, title: "Med spa & estetica", result: "Più consulenze prenotate" },
  { icon: Stethoscope, title: "Studi dentistici", result: "Zero richieste perse" },
  { icon: Home, title: "Servizi casa", result: "Lead caldi gestiti subito" },
  { icon: Building2, title: "Immobiliare", result: "Più visite in agenda" },
  { icon: Briefcase, title: "Agenzie & consulenti", result: "Call qualificate in automatico" },
];

const services = [
  {
    icon: Zap,
    title: "Risposta immediata ai lead",
    desc: "Quando arriva un contatto, il sistema risponde in pochi secondi, qualifica e propone l'appuntamento.",
  },
  {
    icon: MessageSquare,
    title: "Follow-up che non molla",
    desc: "Sequenze SMS e email automatiche per recuperare chi non ha risposto al primo messaggio.",
  },
  {
    icon: Calendar,
    title: "Agenda sempre piena",
    desc: "Promemoria, conferme e riprogrammazioni gestiti da soli, per ridurre i no-show.",
  },
];

const cases = [
  {
    tag: "Med Spa · Miami",
    metric: "+32%",
    label: "consulenze prenotate in 30 giorni",
    body: "Rispondevano ai lead delle ads ore dopo. Abbiamo attivato la risposta automatica e la qualifica: l'agenda si è riempita.",
  },
  {
    tag: "Servizi casa · Dallas",
    metric: "$8.400",
    label: "di fatturato recuperato ogni mese",
    body: "Le chiamate perse e i lead vecchi sono stati ripresi dal sistema, con prenotazioni dirette in calendario.",
  },
  {
    tag: "Immobiliare · Madrid",
    metric: "3,1×",
    label: "visite agli immobili",
    body: "L'AI ha contattato i lead dei portali per primi e ha fissato le visite prima della concorrenza.",
  },
];

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-foreground">
      <AnimatedBackground />
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <Niches />
      <CaseStudies />
      <Offer />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <Logo size={36} />
          <span className="text-lg">Cooverly</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#services" className="hover:text-foreground transition">Sistemi</a>
          <a href="#niches" className="hover:text-foreground transition">Per chi è</a>
          <a href="#results" className="hover:text-foreground transition">Risultati</a>
          <a href="#offer" className="hover:text-foreground transition">Prezzi</a>
          <Link to="/contact" className="hover:text-foreground transition">Contatti</Link>
        </nav>
        <Button asChild size="sm" className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-[var(--shadow-glow)]">
          <Link to="/contact">Prenota una demo <ArrowRight className="h-4 w-4" /></Link>
        </Button>
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <section ref={ref} className="relative px-6 pt-20 pb-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <motion.div style={{ y: yText, opacity }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_oklch(0.68_0.22_38)]" />
            AI Solutions · Spain & USA
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
          >
            Trasforma i tuoi contatti in{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-brand)" }}
            >
              clienti paganti
            </span>
            , in automatico.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground"
          >
            Installiamo sistemi di AI che rispondono ai tuoi lead, fanno
            follow-up e fissano appuntamenti per te. Tutti i giorni, a ogni ora.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button asChild size="lg" className="h-12 bg-gradient-to-r from-primary to-primary-glow px-7 text-primary-foreground shadow-[var(--shadow-glow)]">
              <Link to="/contact">
                <MessageSquare className="h-4 w-4" />
                Scrivici su WhatsApp
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 border-border bg-card/40 px-7 backdrop-blur hover:bg-card">
              <Link to="/contact">
                Prenota una demo <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 flex items-center gap-3 text-sm text-muted-foreground"
          >
            <div className="h-px w-8 bg-border" />
            Parte di un gruppo internazionale ·{" "}
            <span className="font-medium text-foreground">Digitalizzato</span>
            <span className="rounded-full border border-border bg-card/50 px-2 py-0.5 text-[10px] uppercase tracking-wider">
              Divisione AI Europa 🇮🇹
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
          {/* Floating mini-cards */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-2 top-8 hidden rounded-xl border border-border bg-card/80 px-4 py-3 backdrop-blur-xl md:block"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            <div className="flex items-center gap-2 text-xs">
              <Clock className="h-3.5 w-3.5 text-primary-glow" />
              Risposta media
            </div>
            <div className="text-2xl font-semibold">7 sec</div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -right-2 bottom-8 hidden rounded-xl border border-border bg-card/80 px-4 py-3 backdrop-blur-xl md:block"
            style={{ boxShadow: "var(--shadow-accent)" }}
          >
            <div className="flex items-center gap-2 text-xs">
              <TrendingUp className="h-3.5 w-3.5 text-accent" />
              Conversione
            </div>
            <div className="text-2xl font-semibold">+32%</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    "Risposta in pochi secondi",
    "Qualifica automatica",
    "Follow-up senza pause",
    "Appuntamenti in calendario",
    "Lead recuperati",
    "Attivo 24 ore su 24",
  ];
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
  return (
    <section id="services" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="I sistemi"
          title="Tre motori AI. Un'unica macchina che genera fatturato."
          sub="Si installano sul tuo flusso esistente: catturano, qualificano e convertono ogni contatto."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3" style={{ perspective: "1500px" }}>
          {services.map((s, i) => (
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
                  style={{
                    background: i === 1 ? "var(--gradient-accent)" : "var(--gradient-primary)",
                  }}
                >
                  <s.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Sistema {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <div className="mt-8 flex items-center gap-2 text-sm text-primary-glow">
                  Scopri come funziona <ArrowRight className="h-4 w-4" />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Niches() {
  return (
    <section id="niches" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Per chi è"
          title="Pensato per chi vive di velocità di risposta."
          sub="Se ogni lead vale, non puoi permetterti di farlo aspettare. Cooverly è già attivo in questi settori."
        />
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {niches.map((n, i) => (
            <motion.div
              key={n.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-xl transition-all hover:border-primary/50 hover:bg-card"
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-3xl transition-all group-hover:bg-primary/20" />
              <n.icon className="relative h-7 w-7 text-primary-glow" />
              <div className="relative mt-6 text-base font-semibold">{n.title}</div>
              <div className="relative mt-2 text-xs text-accent">{n.result}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudies() {
  return (
    <section id="results" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Risultati reali"
          title="Numeri che spostano davvero il fatturato."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {cases.map((c, i) => (
            <motion.div
              key={c.tag}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card/80 to-card/30 p-8 backdrop-blur-xl"
            >
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: "var(--gradient-primary)" }}
              />
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

function Offer() {
  return (
    <section id="offer" className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card/60 p-12 text-center backdrop-blur-2xl md:p-16"
          style={{ boxShadow: "var(--shadow-glow)" }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{ background: "var(--gradient-hero)" }}
          />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <Target className="h-3 w-3 text-accent" />
              Il sistema Cooverly
            </div>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
              Un sistema AI su misura,<br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-brand)" }}>
                attivo in pochi giorni.
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
              Lo costruiamo intorno alla tua attività e al tuo modo di vendere.
              Tu ricevi clienti, non lead da rincorrere.
            </p>
            <div className="mt-10 inline-flex items-end gap-2">
              <span className="text-sm text-muted-foreground">A partire da</span>
              <span className="text-4xl font-semibold">$297</span>
              <span className="text-sm text-muted-foreground">/mese</span>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="h-12 bg-gradient-to-r from-primary to-primary-glow px-7 text-primary-foreground shadow-[var(--shadow-glow)]">
                <Link to="/contact">Voglio il mio sistema AI <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-border bg-card/40 px-7 backdrop-blur">
                <Link to="/contact"><MessageSquare className="h-4 w-4" /> Scrivici</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border/50 px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
        <div className="flex items-center gap-3">
          <Logo size={28} />
          <span className="font-medium text-foreground">Cooverly</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div>Gruppo internazionale di soluzioni AI · Divisione EU: Digitalizzato 🇮🇹 · Spagna & USA</div>
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
