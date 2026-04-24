import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, MessageSquare, Calendar, Zap, Sparkles,
  Stethoscope, Home, Building2, Briefcase, Smile,
  TrendingUp, Clock, Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/cooverly/AnimatedBackground";
import { AINodeNetwork } from "@/components/cooverly/AINodeNetwork";
import { TiltCard } from "@/components/cooverly/TiltCard";
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
  { icon: Smile, title: "Med Spas & Clinics", result: "+32% booked consultations" },
  { icon: Stethoscope, title: "Dentists", result: "Zero missed inquiries" },
  { icon: Home, title: "Home Services", result: "$8K/mo recovered" },
  { icon: Building2, title: "Real Estate", result: "3× viewings booked" },
  { icon: Briefcase, title: "Agencies", result: "AI qualifies & books" },
];

const services = [
  {
    icon: Zap,
    title: "AI Lead Conversion",
    desc: "Instant response, qualification and booking — 24/7.",
  },
  {
    icon: MessageSquare,
    title: "AI Follow-Up Engine",
    desc: "Automated SMS + email sequences that nurture every lead.",
  },
  {
    icon: Calendar,
    title: "Appointment Accelerator",
    desc: "Cut no-shows, fill the calendar, drive show-up rate.",
  },
];

const cases = [
  {
    tag: "Med Spa · Miami",
    metric: "+32%",
    label: "booked consultations in 30 days",
    body: "Slow ad-lead replies were killing conversions. We deployed instant AI response + qualification.",
  },
  {
    tag: "HVAC · Dallas",
    metric: "$8,400",
    label: "monthly revenue recovered",
    body: "AI follow-up reactivated cold leads and rebooked missed-call inquiries automatically.",
  },
  {
    tag: "Real Estate · Madrid",
    metric: "3.1×",
    label: "more property viewings",
    body: "AI nurtured leads from portals and booked viewings before competitors replied.",
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
        <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: "var(--gradient-primary)" }}>
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="text-lg">Cooverly</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#services" className="hover:text-foreground transition">Systems</a>
          <a href="#niches" className="hover:text-foreground transition">Who it's for</a>
          <a href="#results" className="hover:text-foreground transition">Results</a>
          <a href="#offer" className="hover:text-foreground transition">Pricing</a>
        </nav>
        <Button size="sm" className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-[var(--shadow-glow)]">
          Book a demo <ArrowRight className="h-4 w-4" />
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
            AI Revenue Infrastructure
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
          >
            Turn your leads into{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              paying customers
            </span>{" "}
            — automatically.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground"
          >
            We install AI systems that respond, follow up and book appointments
            for your business 24/7. No agency. Pure revenue infrastructure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button size="lg" className="h-12 bg-gradient-to-r from-primary to-primary-glow px-7 text-primary-foreground shadow-[var(--shadow-glow)]">
              <MessageSquare className="h-4 w-4" />
              Text us how it works
            </Button>
            <Button size="lg" variant="outline" className="h-12 border-border bg-card/40 px-7 backdrop-blur hover:bg-card">
              Book a demo <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 flex items-center gap-3 text-sm text-muted-foreground"
          >
            <div className="h-px w-8 bg-border" />
            Part of an international group ·{" "}
            <span className="font-medium text-foreground">Digitalizzato</span>
            <span className="rounded-full border border-border bg-card/50 px-2 py-0.5 text-[10px] uppercase tracking-wider">
              EU AI Division 🇮🇹
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative mx-auto"
        >
          <AINodeNetwork />
          {/* Floating mini-cards */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-6 top-12 hidden rounded-xl border border-border bg-card/80 px-4 py-3 backdrop-blur-xl md:block"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            <div className="flex items-center gap-2 text-xs">
              <Clock className="h-3.5 w-3.5 text-primary-glow" />
              Reply time
            </div>
            <div className="text-2xl font-semibold">7s</div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -right-4 bottom-10 hidden rounded-xl border border-border bg-card/80 px-4 py-3 backdrop-blur-xl md:block"
            style={{ boxShadow: "var(--shadow-accent)" }}
          >
            <div className="flex items-center gap-2 text-xs">
              <TrendingUp className="h-3.5 w-3.5 text-accent" />
              Conversion
            </div>
            <div className="text-2xl font-semibold">+32%</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Instant Response", "AI Qualification", "Smart Follow-Up", "Auto-Booking", "Revenue Recovery", "24/7 Coverage"];
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
          eyebrow="The systems"
          title="Three AI engines. One revenue machine."
          sub="Plug-and-play infrastructure that captures, nurtures and converts every lead — automatically."
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
                  System {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <div className="mt-8 flex items-center gap-2 text-sm text-primary-glow">
                  Learn more <ArrowRight className="h-4 w-4" />
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
          eyebrow="Who it's for"
          title="Built for businesses that live or die by lead response."
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
          eyebrow="Real results"
          title="Numbers that move balance sheets."
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
              The Cooverly AI Revenue System
            </div>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
              Custom AI infrastructure,<br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>
                deployed in days.
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
              One unified system. Built for your business. Tuned to your funnel.
            </p>
            <div className="mt-10 inline-flex items-end gap-2">
              <span className="text-sm text-muted-foreground">Starting from</span>
              <span className="text-4xl font-semibold">$297</span>
              <span className="text-sm text-muted-foreground">/month</span>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="h-12 bg-gradient-to-r from-primary to-primary-glow px-7 text-primary-foreground shadow-[var(--shadow-glow)]">
                Get your custom AI system <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 border-border bg-card/40 px-7 backdrop-blur">
                <MessageSquare className="h-4 w-4" /> Text us
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
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md" style={{ background: "var(--gradient-primary)" }}>
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <span className="font-medium text-foreground">Cooverly</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div>An international AI revenue group · EU division: Digitalizzato 🇮🇹</div>
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
