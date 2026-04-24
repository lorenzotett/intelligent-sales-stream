import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, MessageSquare, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/cooverly/AnimatedBackground";
import { Logo } from "@/components/cooverly/Logo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contatti — Cooverly" },
      { name: "description", content: "Parla con il team Cooverly. AI Solutions tra Spagna e USA. Scrivici su WhatsApp o prenota una demo." },
      { property: "og:title", content: "Contatti — Cooverly" },
      { property: "og:description", content: "Scrivici su WhatsApp o prenota una demo del tuo sistema AI." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="relative min-h-screen text-foreground">
      <AnimatedBackground />
      <div className="mx-auto max-w-5xl px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Torna alla home
        </Link>
        <div className="mt-8 flex items-center gap-3">
          <Logo size={40} />
          <span className="text-xl font-semibold">Cooverly</span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="mt-12 text-5xl font-semibold tracking-tight md:text-6xl"
        >
          Parliamone.{" "}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-brand)" }}>
            Senza giri di parole.
          </span>
        </motion.h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Raccontaci come funziona oggi la tua gestione dei lead. In una breve
          chiamata ti diciamo se Cooverly può aiutarti — e come.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {[
            { icon: MessageSquare, title: "WhatsApp", value: "Risposta in giornata", action: "Scrivici" },
            { icon: Phone, title: "Telefono", value: "+34 · +1 disponibili", action: "Chiama" },
            { icon: Mail, title: "Email", value: "hello@cooverly.com", action: "Scrivi" },
            { icon: MapPin, title: "Sedi", value: "Spagna 🇪🇸 · USA 🇺🇸 · EU: Digitalizzato 🇮🇹", action: "" },
          ].map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-xl"
            >
              <c.icon className="h-6 w-6 text-primary-glow" />
              <div className="mt-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">{c.title}</div>
              <div className="mt-1 font-medium">{c.value}</div>
              {c.action && (
                <Button size="sm" variant="outline" className="mt-4 border-border bg-card/40">
                  {c.action}
                </Button>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 rounded-3xl border border-border bg-card/60 p-10 backdrop-blur-xl text-center"
          style={{ boxShadow: "var(--shadow-glow)" }}
        >
          <div className="text-2xl font-semibold">Preferisci una demo dal vivo?</div>
          <p className="mt-2 text-muted-foreground">15 minuti, zero impegno. Ti mostriamo il sistema in azione su un caso simile al tuo.</p>
          <Button size="lg" className="mt-6 h-12 bg-gradient-to-r from-primary to-primary-glow px-7 text-primary-foreground shadow-[var(--shadow-glow)]">
            Prenota la demo
          </Button>
        </motion.div>
      </div>
    </div>
  );
}