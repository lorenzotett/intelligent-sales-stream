import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, MessageSquare, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/cooverly/AnimatedBackground";
import { Logo } from "@/components/cooverly/Logo";
import { LangSwitch } from "@/components/cooverly/LangSwitch";
import { RevenueAnalyzer } from "@/components/cooverly/RevenueAnalyzer";
import { useLang } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Cooverly" },
      { name: "description", content: "Talk to the Cooverly team. AI revenue infrastructure across Spain and USA. Message us on WhatsApp or request a Lifetime plan by email." },
      { property: "og:title", content: "Contact — Cooverly" },
      { property: "og:description", content: "MRR plans on WhatsApp · Lifetime plans by email · Custom AI revenue systems." },
    ],
  }),
  component: ContactPage,
});

const cardIcons = [MessageSquare, Mail, Phone, MapPin];

function ContactPage() {
  const { t } = useLang();

  return (
    <div className="relative min-h-screen text-foreground">
      <AnimatedBackground />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> {t.contact.back}
          </Link>
          <LangSwitch />
        </div>

        <div className="mt-8">
          <Logo size={88} />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="mt-12 text-5xl font-semibold tracking-tight md:text-6xl"
        >
          {t.contact.title}{" "}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-brand)" }}>
            {t.contact.titleHighlight}
          </span>
        </motion.h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{t.contact.sub}</p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          {/* AI Revenue Analyzer */}
          <div>
            <RevenueAnalyzer />
          </div>

          {/* Contact cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {t.contact.cards.map((c, i) => {
              const Icon = cardIcons[i];
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-xl"
                >
                  <Icon className="h-6 w-6 text-primary-glow" />
                  <div className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">{c.title}</div>
                  <div className="mt-1 font-medium">{c.value}</div>
                  {c.action && c.href && (
                    <Button asChild size="sm" variant="outline" className="mt-4 border-border bg-card/40">
                      <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                        {c.action}
                      </a>
                    </Button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

