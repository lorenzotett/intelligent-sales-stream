import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/cooverly/PageShell";
import { useLang } from "@/i18n/LanguageContext";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => pageHead("/privacy", "Privacy policy — Cooverly", "How Cooverly handles personal data shared through cooverly.com and project enquiries."),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { t } = useLang();
  const p = t.privacy;
  return (
    <PageShell>
      <article className="container-site max-w-3xl py-14 sm:py-20">
        <h1 className="h2-fluid font-extrabold">{p.title}</h1>
        <p className="mt-6 text-lg text-muted-foreground">{p.intro}</p>
        <div className="mt-10 space-y-8">
          {p.sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-xl font-bold">{s.h}</h2>
              <p className="mt-2 text-muted-foreground">{s.p}</p>
            </section>
          ))}
        </div>
      </article>
    </PageShell>
  );
}
