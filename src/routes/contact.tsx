import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Mail, MessageSquare, Phone, MapPin, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatedBackground } from "@/components/cooverly/AnimatedBackground";
import { Logo } from "@/components/cooverly/Logo";
import { LangSwitch } from "@/components/cooverly/LangSwitch";
import { useLang } from "@/i18n/LanguageContext";
import { CONTACT } from "@/i18n/translations";

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

const schema = z.object({
  name: z.string().trim().min(2, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  company: z.string().trim().min(1, "Required").max(120),
  plan: z.string().min(1, "Select one"),
  message: z.string().trim().min(10, "Tell us a bit more").max(1000),
});

type FormData = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormData, string>>;

function ContactPage() {
  const { t } = useLang();
  const f = t.contact.form;

  const [data, setData] = useState<FormData>({ name: "", email: "", company: "", plan: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const update = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setData((d) => ({ ...d, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FormData;
        if (!errs[k]) errs[k] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setStatus("submitting");

    const isLifetime = parsed.data.plan.startsWith("lifetime");
    const subject = `Cooverly — ${parsed.data.plan} — ${parsed.data.company}`;
    const body =
      `Name: ${parsed.data.name}\n` +
      `Email: ${parsed.data.email}\n` +
      `Company: ${parsed.data.company}\n` +
      `Plan: ${parsed.data.plan}\n\n` +
      `${parsed.data.message}`;

    try {
      if (isLifetime) {
        window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      } else {
        window.open(`${CONTACT.whatsapp}?text=${encodeURIComponent(`${subject}\n\n${body}`)}`, "_blank", "noopener");
      }
      setStatus("success");
      setData({ name: "", email: "", company: "", plan: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

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

        <div className="mt-8 flex items-center gap-3">
          <Logo size={40} />
          <span className="text-xl font-semibold">Cooverly</span>
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
          {/* Form */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-xl"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            <div className="text-2xl font-semibold">{t.contact.formTitle}</div>
            <p className="mt-1 text-sm text-muted-foreground">{t.contact.formSub}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label={f.name} error={errors.name}>
                <Input value={data.name} onChange={update("name")} className="h-11 bg-background/50" />
              </Field>
              <Field label={f.email} error={errors.email}>
                <Input type="email" value={data.email} onChange={update("email")} className="h-11 bg-background/50" />
              </Field>
              <Field label={f.company} error={errors.company}>
                <Input value={data.company} onChange={update("company")} className="h-11 bg-background/50" />
              </Field>
              <Field label={f.plan} error={errors.plan}>
                <select
                  value={data.plan}
                  onChange={update("plan")}
                  className="h-11 w-full rounded-md border border-input bg-background/50 px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">—</option>
                  {f.planOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="mt-4">
              <Field label={f.message} error={errors.message}>
                <textarea
                  value={data.message}
                  onChange={update("message")}
                  rows={5}
                  className="w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </Field>
            </div>

            <Button
              type="submit"
              disabled={status === "submitting"}
              size="lg"
              className="mt-6 h-12 w-full bg-gradient-to-r from-primary to-primary-glow px-7 text-primary-foreground shadow-[var(--shadow-glow)]"
            >
              {status === "submitting" ? f.submitting : f.submit}
              <ArrowRight className="h-4 w-4" />
            </Button>

            {status === "success" && (
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-primary-glow">
                <CheckCircle2 className="h-4 w-4" /> {f.success}
              </div>
            )}
            {status === "error" && (
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" /> {f.error}
              </div>
            )}
          </motion.form>

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

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</div>
      {children}
      {error && <div className="mt-1 text-xs text-destructive">{error}</div>}
    </label>
  );
}
