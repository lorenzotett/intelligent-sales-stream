import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AnimatedBackground } from "@/components/cooverly/AnimatedBackground";
import { Logo } from "@/components/cooverly/Logo";
import { LangSwitch } from "@/components/cooverly/LangSwitch";
import { useExtras } from "@/i18n/extras";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Cooverly" },
      { name: "description", content: "How Cooverly collects, uses and protects your data when you use cooverly.com and our AI revenue services." },
      { property: "og:title", content: "Privacy Policy — Cooverly" },
      { property: "og:description", content: "Cooverly's privacy policy: data we collect, how we use it, your rights under GDPR, and cookies." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const ex = useExtras();
  return (
    <div className="relative min-h-screen text-foreground">
      <AnimatedBackground />
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> {ex.privacy.back}
          </Link>
          <LangSwitch />
        </div>
        <div className="mt-8">
          <Logo size={88} />
        </div>
        <h1 className="mt-12 text-4xl font-semibold tracking-tight md:text-5xl">{ex.privacy.title}</h1>
        <div className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {ex.privacy.updated}: {new Date().toISOString().slice(0, 10)}
        </div>
        <p className="mt-8 text-base leading-relaxed text-foreground/90">{ex.privacy.intro}</p>
        <div className="mt-10 space-y-8">
          {ex.privacy.sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-xl font-semibold tracking-tight">{s.h}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{s.p}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}