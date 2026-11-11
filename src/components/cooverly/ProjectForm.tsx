import { useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import { CONTACT } from "@/i18n/site";
import { buildMailto, emptyDraft, validateStep1, validateStep2, DESC_MAX, type ProjectDraft, type FieldError } from "@/lib/project-form";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<keyof ProjectDraft, FieldError>>;
const fieldCls = "w-full rounded-lg border border-input bg-card px-3.5 py-3 text-base text-foreground outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/30 aria-[invalid=true]:border-destructive";

export function ProjectForm() {
  const { t } = useLang();
  const f = t.form;
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [d, setD] = useState<ProjectDraft>(emptyDraft);
  const [errors, setErrors] = useState<Errors>({});
  const topRef = useRef<HTMLDivElement>(null);
  const set = (k: keyof ProjectDraft) => (e: { target: { value: string } }) => setD((p) => ({ ...p, [k]: e.target.value }));

  function focusFirst(errs: Errors) {
    const first = Object.keys(errs)[0];
    if (first) document.getElementById(`pf-${first}`)?.focus();
  }
  function next() {
    const e = validateStep1(d); setErrors(e);
    if (Object.keys(e).length) return focusFirst(e);
    setStep(2); topRef.current?.focus();
  }
  function submit() {
    const e = validateStep2(d); setErrors(e);
    if (Object.keys(e).length) return focusFirst(e);
    const url = buildMailto(CONTACT.email, `${t.contact.emailSubject} — ${d.name.trim()}`, [
      [f.typeLabel, f.types[d.type as keyof typeof f.types] ?? ""],
      [f.stageLabel, f.stages[d.stage as keyof typeof f.stages] ?? ""],
      [f.descLabel, d.description],
      [f.nameLabel, d.name], [f.emailLabel, d.email], [f.companyLabel, d.company],
      [f.timingLabel, d.timing ? f.timings[d.timing as keyof typeof f.timings] : ""],
      [f.budgetLabel, d.budget ? f.budgets[d.budget as keyof typeof f.budgets] : ""],
    ]);
    window.location.href = url;
    setStep(3);
  }
  const err = (k: keyof ProjectDraft) => (errors[k] ? f.errors[errors[k]!] : undefined);

  if (step === 3) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 sm:p-8" role="status">
        <Mail className="h-6 w-6 text-primary" />
        <h2 className="mt-4 text-2xl font-bold">{f.sentTitle}</h2>
        <p className="mt-3 text-muted-foreground">{f.sentBody}</p>
        <p className="mt-3 text-muted-foreground">{f.sentFallback} <a className="font-medium text-primary underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.</p>
        <Button variant="outline" className="mt-6 h-11" onClick={() => setStep(1)}>{f.edit}</Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={(e) => { e.preventDefault(); if (step === 1) next(); else submit(); }}
      className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] sm:p-8">
      <div ref={topRef} tabIndex={-1} className="outline-none">
        <p className="text-sm text-muted-foreground">{f.step} {step} {f.of} 2</p>
        <h2 className="mt-1 text-2xl font-bold">{step === 1 ? f.s1 : f.s2}</h2>
        <div className="mt-4 grid grid-cols-2 gap-2" aria-hidden>
          <span className="h-1 rounded-full bg-primary" />
          <span className={cn("h-1 rounded-full transition-colors duration-200", step === 2 ? "bg-primary" : "bg-border")} />
        </div>
      </div>
      {Object.keys(errors).length > 0 && <p role="alert" className="mt-5 text-sm font-medium text-destructive">{f.errorSummary}</p>}

      {step === 1 ? (
        <div className="mt-6 space-y-6">
          <Choice id="type" legend={f.typeLabel} options={f.types} value={d.type} onChange={(v) => setD({ ...d, type: v })} error={err("type")} />
          <Choice id="stage" legend={f.stageLabel} options={f.stages} value={d.stage} onChange={(v) => setD({ ...d, stage: v })} error={err("stage")} />
          <Field id="description" label={f.descLabel} help={f.descHelp} error={err("description")}>
            <textarea id="pf-description" rows={6} maxLength={DESC_MAX + 50} value={d.description} onChange={set("description")}
              aria-invalid={!!errors.description} aria-describedby="pf-description-help pf-description-err" className={fieldCls} />
            <p className="mt-1 text-right text-xs text-muted-foreground">{d.description.trim().length}/{DESC_MAX}</p>
          </Field>
          <p className="text-sm text-muted-foreground">{f.micro}</p>
          <Button type="submit" className="h-12 w-full rounded-lg text-base hover:bg-primary-hover sm:w-auto sm:px-6">
            {f.next} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label={f.nameLabel} error={err("name")}>
              <input id="pf-name" autoComplete="name" maxLength={100} value={d.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby="pf-name-err" className={fieldCls} />
            </Field>
            <Field id="email" label={f.emailLabel} error={err("email")}>
              <input id="pf-email" type="email" inputMode="email" autoComplete="email" maxLength={255} value={d.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby="pf-email-err" className={fieldCls} />
            </Field>
          </div>
          <Field id="company" label={f.companyLabel} optional={f.optional}>
            <input id="pf-company" autoComplete="organization" maxLength={200} value={d.company} onChange={set("company")} className={fieldCls} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="timing" label={f.timingLabel} optional={f.optional}>
              <select id="pf-timing" value={d.timing} onChange={set("timing")} className={fieldCls}>
                {Object.entries(f.timings).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </Field>
            <Field id="budget" label={f.budgetLabel} optional={f.optional}>
              <select id="pf-budget" value={d.budget} onChange={set("budget")} aria-describedby="pf-budget-help" className={fieldCls}>
                {Object.entries(f.budgets).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </Field>
          </div>
          <p id="pf-budget-help" className="text-sm text-muted-foreground">{f.budgetHelp}</p>
          <p className="text-sm text-muted-foreground">
            {f.privacyPre} <Link to="/privacy" className="text-primary underline underline-offset-2">{f.privacyLink}</Link>.
          </p>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
            <Button type="button" variant="outline" className="h-12 rounded-lg" onClick={() => { setErrors({}); setStep(1); }}>
              <ArrowLeft className="h-4 w-4" /> {f.back}
            </Button>
            <Button type="submit" className="h-12 rounded-lg text-base hover:bg-primary-hover sm:px-6">
              <Mail className="h-4 w-4" /> {f.submit}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">{f.submitHelp}</p>
        </div>
      )}
    </form>
  );
}

function Field({ id, label, help, optional, error, children }: { id: string; label: string; help?: string; optional?: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={`pf-${id}`} className="mb-1.5 block text-[15px] font-semibold">
        {label} {optional && <span className="font-normal text-muted-foreground">({optional})</span>}
      </label>
      {help && <p id={`pf-${id}-help`} className="mb-2 text-sm text-muted-foreground">{help}</p>}
      {children}
      {error && <p id={`pf-${id}-err`} className="mt-1.5 text-sm text-destructive">{error}</p>}
    </div>
  );
}

function Choice({ id, legend, options, value, onChange, error }: { id: string; legend: string; options: Record<string, string>; value: string; onChange: (v: string) => void; error?: string }) {
  return (
    <fieldset aria-describedby={error ? `pf-${id}-err` : undefined}>
      <legend className="mb-2 text-[15px] font-semibold">{legend}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {Object.entries(options).map(([k, v], i) => (
          <label key={k} className={cn("flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border px-3.5 py-2.5 text-[15px] transition-colors duration-200",
            value === k ? "border-primary bg-primary/5" : "border-input hover:border-muted-foreground/40")}>
            <input type="radio" id={i === 0 ? `pf-${id}` : undefined} name={id} value={k} checked={value === k} onChange={() => onChange(k)} className="h-4 w-4 accent-[var(--primary)]" />
            {v}
          </label>
        ))}
      </div>
      {error && <p id={`pf-${id}-err`} className="mt-1.5 text-sm text-destructive">{error}</p>}
    </fieldset>
  );
}
