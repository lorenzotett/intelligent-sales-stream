import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Sparkles, TrendingUp, AlertTriangle, Rocket,
  Bot, Repeat2, CalendarCheck, Download, MessageSquare, CheckCircle2, Loader2,
} from "lucide-react";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLang } from "@/i18n/LanguageContext";
import { CONTACT } from "@/i18n/translations";

const CALENDLY = "https://calendly.com/lorenzo-tttine/meeting-with-lorenzo";

type Answers = {
  industry: string;
  monthlyLeads: number;
  avgValue: number;
  responseTime: "instant" | "1h" | "few_hours" | "same_day" | "next_day" | "";
  unansweredPct: number;
  conversionPct: number;
  bookedAppts: number;
  noShowPct: number;
  hasCRM: "yes" | "no" | "";
  hasAutomation: "yes" | "no" | "";
  handler: "self" | "team" | "noone" | "";
  desiredClients: number;
  bottleneck: "leadgen" | "followup" | "conversion" | "noshows" | "";
};

const empty: Answers = {
  industry: "",
  monthlyLeads: 0,
  avgValue: 0,
  responseTime: "",
  unansweredPct: 0,
  conversionPct: 0,
  bookedAppts: 0,
  noShowPct: 0,
  hasCRM: "",
  hasAutomation: "",
  handler: "",
  desiredClients: 0,
  bottleneck: "",
};

const COPY = {
  en: {
    eyebrow: "AI Revenue Diagnostic",
    title: "Discover how much money you are losing every month.",
    sub: "A 60-second diagnostic. We calculate your lost revenue and the AI systems that recover it.",
    start: "Start free diagnostic",
    next: "Continue",
    back: "Back",
    analyze: "Run analysis",
    analyzing: "Analyzing your data…",
    stepLabel: "Step",
    of: "of",
    industries: ["Med Spa / Aesthetics", "Dental", "Real Estate", "Home Services", "Coaching / Education", "Marketing Agency", "Other"],
    steps: [
      {
        title: "Business snapshot",
        sub: "The basics so we can size the opportunity.",
        fields: { industry: "Industry", leads: "Monthly leads", value: "Average client value ($)" },
      },
      {
        title: "Lead response",
        sub: "Speed-to-lead is the #1 driver of conversion.",
        fields: {
          response: "How fast do you respond to a new lead?",
          unanswered: "% of leads you never answer",
          options: [
            { v: "instant", l: "Instantly (<5 min)" },
            { v: "1h", l: "Within 1 hour" },
            { v: "few_hours", l: "Within a few hours" },
            { v: "same_day", l: "Same day" },
            { v: "next_day", l: "Next day or later" },
          ],
        },
      },
      {
        title: "Conversion",
        sub: "How leads become paying clients today.",
        fields: {
          conv: "Lead → client conversion rate (%)",
          appts: "Monthly booked appointments",
          noshow: "No-show rate (%)",
        },
      },
      {
        title: "Current system",
        sub: "What you have running right now.",
        fields: {
          crm: "Do you use a CRM?",
          auto: "Do you have automation?",
          handler: "Who handles your leads?",
          handlerOpts: [
            { v: "self", l: "Myself" },
            { v: "team", l: "My team" },
            { v: "noone", l: "No one consistently" },
          ],
        },
      },
      {
        title: "Growth goals",
        sub: "Where you want to be in 90 days.",
        fields: {
          desired: "Desired monthly clients",
          bottleneck: "Biggest bottleneck",
          bnOpts: [
            { v: "leadgen", l: "Lead generation" },
            { v: "followup", l: "Follow-up" },
            { v: "conversion", l: "Conversion" },
            { v: "noshows", l: "No-shows" },
          ],
        },
      },
    ],
    yes: "Yes",
    no: "No",
    dash: {
      title: "Your Revenue Diagnostic",
      now: "Current revenue",
      lost: "Lost every month",
      opportunity: "Recovery opportunity",
      perMonth: "/ month",
      whats: "What's happening in your business",
      systems: "Recommended AI systems",
      impact: "Expected impact",
      ctaTitle: "Recover this revenue.",
      ctaSub: "Two ways forward — pick the one that fits.",
      whatsapp: "Text us to recover this revenue",
      book: "Book a strategy call",
      pdf: "Download PDF report",
      restart: "Run a new diagnostic",
      waMsg: "I just completed the AI Revenue Diagnostic on cooverly.com and want to implement the system for my business.",
    },
    rec: {
      conversion: { name: "AI Lead Conversion System", why: "Responds to every new lead within seconds across WhatsApp, web and DM — qualifies and books on autopilot." },
      followup: { name: "AI Follow-Up Engine", why: "Re-engages cold and unresponsive leads with multi-channel sequences until they book or opt out." },
      shows: { name: "AI Appointment Accelerator", why: "Confirms, reminds and reschedules automatically — kills no-shows before they happen." },
    },
    insights: {
      slow: "You are losing leads because you respond too slowly. Speed-to-lead under 5 minutes can lift conversion by up to 391%.",
      unanswered: (p: number) => `You leave roughly ${p}% of leads unanswered. Each one is paid traffic walking away.`,
      noFollowup: "You have no automated follow-up. The average buyer needs 5+ touchpoints before saying yes.",
      noShow: (p: number) => `Your no-show rate (${p}%) is silently burning calendar capacity and revenue.`,
      noCRM: "Without a CRM you have no memory of your leads. Every conversation restarts from zero.",
      growth: "You have a clear gap between current and desired clients. The system below closes it without hiring.",
    },
    pdf: { title: "Cooverly — AI Revenue Diagnostic", footer: "Cooverly · cooverly.com · +34 625 19 88 29" },
  },
  es: {
    eyebrow: "Diagnóstico de Ingresos IA",
    title: "Descubre cuánto dinero estás perdiendo cada mes.",
    sub: "Un diagnóstico de 60 segundos. Calculamos tus ingresos perdidos y los sistemas IA que los recuperan.",
    start: "Iniciar diagnóstico gratis",
    next: "Continuar",
    back: "Atrás",
    analyze: "Ejecutar análisis",
    analyzing: "Analizando tus datos…",
    stepLabel: "Paso",
    of: "de",
    industries: ["Med Spa / Estética", "Dental", "Inmobiliaria", "Servicios para el hogar", "Coaching / Educación", "Agencia de marketing", "Otro"],
    steps: [
      {
        title: "Tu negocio",
        sub: "Lo básico para dimensionar la oportunidad.",
        fields: { industry: "Sector", leads: "Leads al mes", value: "Valor medio por cliente ($)" },
      },
      {
        title: "Respuesta a leads",
        sub: "La velocidad de respuesta es el #1 factor de conversión.",
        fields: {
          response: "¿En cuánto tiempo respondes a un lead nuevo?",
          unanswered: "% de leads que nunca contestas",
          options: [
            { v: "instant", l: "Al instante (<5 min)" },
            { v: "1h", l: "En 1 hora" },
            { v: "few_hours", l: "En unas horas" },
            { v: "same_day", l: "El mismo día" },
            { v: "next_day", l: "Al día siguiente o más" },
          ],
        },
      },
      {
        title: "Conversión",
        sub: "Cómo conviertes hoy leads en clientes.",
        fields: {
          conv: "Tasa de conversión lead → cliente (%)",
          appts: "Citas reservadas al mes",
          noshow: "Tasa de no-show (%)",
        },
      },
      {
        title: "Sistema actual",
        sub: "Lo que tienes en marcha ahora.",
        fields: {
          crm: "¿Usas un CRM?",
          auto: "¿Tienes automatizaciones?",
          handler: "¿Quién gestiona tus leads?",
          handlerOpts: [
            { v: "self", l: "Yo mismo" },
            { v: "team", l: "Mi equipo" },
            { v: "noone", l: "Nadie de forma consistente" },
          ],
        },
      },
      {
        title: "Objetivos de crecimiento",
        sub: "Dónde quieres estar en 90 días.",
        fields: {
          desired: "Clientes deseados al mes",
          bottleneck: "Mayor cuello de botella",
          bnOpts: [
            { v: "leadgen", l: "Generación de leads" },
            { v: "followup", l: "Seguimiento" },
            { v: "conversion", l: "Conversión" },
            { v: "noshows", l: "No-shows" },
          ],
        },
      },
    ],
    yes: "Sí",
    no: "No",
    dash: {
      title: "Tu Diagnóstico de Ingresos",
      now: "Ingresos actuales",
      lost: "Pérdida mensual",
      opportunity: "Oportunidad recuperable",
      perMonth: "/ mes",
      whats: "Qué está pasando en tu negocio",
      systems: "Sistemas IA recomendados",
      impact: "Impacto esperado",
      ctaTitle: "Recupera estos ingresos.",
      ctaSub: "Dos caminos — elige el que mejor te encaja.",
      whatsapp: "Recupera estos ingresos por WhatsApp",
      book: "Reservar llamada estratégica",
      pdf: "Descargar informe PDF",
      restart: "Hacer un diagnóstico nuevo",
      waMsg: "Acabo de completar el Diagnóstico de Ingresos IA en cooverly.com y quiero implementar el sistema para mi negocio.",
    },
    rec: {
      conversion: { name: "Sistema de Conversión de Leads IA", why: "Responde a cada lead nuevo en segundos en WhatsApp, web y DM — califica y agenda en automático." },
      followup: { name: "Motor de Seguimiento IA", why: "Recupera leads fríos con secuencias multi-canal hasta que reservan o se desmarcan." },
      shows: { name: "Acelerador de Citas IA", why: "Confirma, recuerda y reagenda automáticamente — elimina los no-shows antes de que ocurran." },
    },
    insights: {
      slow: "Estás perdiendo leads porque respondes demasiado lento. Responder en menos de 5 minutos puede subir la conversión hasta un 391%.",
      unanswered: (p: number) => `Dejas sin contestar aproximadamente el ${p}% de tus leads. Cada uno es tráfico pagado que se va.`,
      noFollowup: "No tienes un seguimiento automatizado. Un comprador medio necesita 5+ contactos antes de decir que sí.",
      noShow: (p: number) => `Tu tasa de no-show (${p}%) está quemando agenda e ingresos en silencio.`,
      noCRM: "Sin un CRM no tienes memoria de tus leads. Cada conversación arranca desde cero.",
      growth: "Hay una distancia clara entre tus clientes actuales y los que quieres. El sistema que sigue la cierra sin contratar a nadie.",
    },
    pdf: { title: "Cooverly — Diagnóstico de Ingresos IA", footer: "Cooverly · cooverly.com · +34 625 19 88 29" },
  },
  it: {
    eyebrow: "Diagnostica AI del fatturato",
    title: "Scopri quanti soldi stai perdendo ogni mese.",
    sub: "Una diagnostica da 60 secondi. Calcoliamo il fatturato perso e i sistemi AI che lo recuperano.",
    start: "Inizia la diagnostica gratuita",
    next: "Continua",
    back: "Indietro",
    analyze: "Esegui analisi",
    analyzing: "Analizzo i tuoi dati…",
    stepLabel: "Step",
    of: "di",
    industries: ["Med Spa / Estetica", "Dentista", "Immobiliare", "Servizi alla casa", "Coaching / Formazione", "Agenzia di marketing", "Altro"],
    steps: [
      { title: "Il tuo business", sub: "Le basi per dimensionare l'opportunità.",
        fields: { industry: "Settore", leads: "Lead al mese", value: "Valore medio per cliente ($)" } },
      { title: "Risposta ai lead", sub: "La velocità di risposta è il fattore #1 di conversione.",
        fields: { response: "In quanto tempo rispondi a un nuovo lead?", unanswered: "% di lead a cui non rispondi mai",
          options: [
            { v: "instant", l: "Subito (<5 min)" },
            { v: "1h", l: "Entro 1 ora" },
            { v: "few_hours", l: "Entro qualche ora" },
            { v: "same_day", l: "In giornata" },
            { v: "next_day", l: "Il giorno dopo o più tardi" },
          ] } },
      { title: "Conversione", sub: "Come trasformi oggi i lead in clienti.",
        fields: { conv: "Tasso di conversione lead → cliente (%)", appts: "Appuntamenti prenotati al mese", noshow: "Tasso di no-show (%)" } },
      { title: "Sistema attuale", sub: "Cosa hai attivo in questo momento.",
        fields: { crm: "Usi un CRM?", auto: "Hai automazioni?", handler: "Chi gestisce i tuoi lead?",
          handlerOpts: [
            { v: "self", l: "Io stesso" },
            { v: "team", l: "Il mio team" },
            { v: "noone", l: "Nessuno in modo continuativo" },
          ] } },
      { title: "Obiettivi di crescita", sub: "Dove vuoi essere a 90 giorni.",
        fields: { desired: "Clienti desiderati al mese", bottleneck: "Maggiore collo di bottiglia",
          bnOpts: [
            { v: "leadgen", l: "Generazione lead" },
            { v: "followup", l: "Follow-up" },
            { v: "conversion", l: "Conversione" },
            { v: "noshows", l: "No-show" },
          ] } },
    ],
    yes: "Sì",
    no: "No",
    dash: {
      title: "La tua Diagnostica del fatturato",
      now: "Fatturato attuale",
      lost: "Perdita mensile",
      opportunity: "Opportunità recuperabile",
      perMonth: "/ mese",
      whats: "Cosa sta succedendo nel tuo business",
      systems: "Sistemi AI consigliati",
      impact: "Impatto previsto",
      ctaTitle: "Recupera questo fatturato.",
      ctaSub: "Due strade — scegli quella che ti calza.",
      whatsapp: "Scrivici su WhatsApp per recuperare",
      book: "Prenota una call strategica",
      pdf: "Scarica il report PDF",
      restart: "Fai una nuova diagnostica",
      waMsg: "Ho appena completato la Diagnostica AI del fatturato su cooverly.com e voglio implementare il sistema per il mio business.",
    },
    rec: {
      conversion: { name: "Sistema AI di Conversione Lead", why: "Risponde a ogni nuovo lead in pochi secondi su WhatsApp, web e DM — qualifica e prenota in automatico." },
      followup: { name: "Motore di Follow-Up AI", why: "Riattiva lead freddi e non risponditi con sequenze multi-canale finché non prenotano o si disiscrivono." },
      shows: { name: "Acceleratore Appuntamenti AI", why: "Conferma, ricorda e riprogramma in automatico — uccide i no-show prima che accadano." },
    },
    insights: {
      slow: "Stai perdendo lead perché rispondi troppo lentamente. Rispondere sotto i 5 minuti può aumentare la conversione fino al 391%.",
      unanswered: (p: number) => `Lasci senza risposta circa il ${p}% dei tuoi lead. Ognuno è traffico pagato che se ne va.`,
      noFollowup: "Non hai un follow-up automatico. Un buyer medio ha bisogno di 5+ contatti prima di dire sì.",
      noShow: (p: number) => `Il tuo tasso di no-show (${p}%) sta bruciando agenda e fatturato in silenzio.`,
      noCRM: "Senza un CRM non hai memoria dei tuoi lead. Ogni conversazione riparte da zero.",
      growth: "C'è un divario chiaro fra clienti attuali e desiderati. Il sistema qui sotto lo chiude senza assumere nessuno.",
    },
    pdf: { title: "Cooverly — Diagnostica AI del fatturato", footer: "Cooverly · cooverly.com · +34 625 19 88 29" },
  },
};

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Math.max(0, Math.round(n)));
}

function calc(a: Answers) {
  const conv = a.conversionPct / 100;
  const noShow = a.noShowPct / 100;
  const unanswered = a.unansweredPct / 100;

  const currentClients = a.monthlyLeads * conv * (1 - noShow);
  const currentRevenue = currentClients * a.avgValue;

  const lostFromUnanswered = a.monthlyLeads * unanswered * conv * a.avgValue;
  const lostFromNoShow = a.monthlyLeads * conv * noShow * a.avgValue;

  // slow response penalty
  const slowMap: Record<string, number> = { instant: 0, "1h": 0.1, few_hours: 0.2, same_day: 0.35, next_day: 0.5 };
  const slowPenalty = slowMap[a.responseTime] ?? 0;
  const lostFromSlow = a.monthlyLeads * (1 - unanswered) * slowPenalty * conv * a.avgValue;

  const lostRevenue = lostFromUnanswered + lostFromNoShow + lostFromSlow;

  // recovery: realistic 40-70% of lost depending on inefficiencies
  const baseRecover = 0.5;
  const noCRMBoost = a.hasCRM === "no" ? 0.1 : 0;
  const noAutoBoost = a.hasAutomation === "no" ? 0.1 : 0;
  const opportunity = lostRevenue * (baseRecover + noCRMBoost + noAutoBoost);

  return { currentRevenue, lostRevenue, opportunity, lostFromUnanswered, lostFromNoShow, lostFromSlow };
}

function Stepper({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-1 flex-1 rounded-full transition-all"
          style={{
            background: i <= step ? "var(--gradient-brand)" : "oklch(1 0 0 / 0.08)",
            boxShadow: i === step ? "0 0 18px oklch(0.65 0.22 28 / 0.6)" : "none",
          }}
        />
      ))}
    </div>
  );
}

function NumberField({ label, value, onChange, suffix }: { label: string; value: number; onChange: (n: number) => void; suffix?: string }) {
  return (
    <label className="block">
      <div className="mb-1.5 text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</div>
      <div className="relative">
        <Input
          type="number"
          inputMode="numeric"
          min={0}
          value={value || ""}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="h-12 bg-background/50 pr-12 text-base"
        />
        {suffix && <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{suffix}</span>}
      </div>
    </label>
  );
}

function ChoiceGrid<T extends string>({ value, onChange, options, cols = 2 }: { value: T | ""; onChange: (v: T) => void; options: { v: T; l: string }[]; cols?: 2 | 3 }) {
  return (
    <div className={`grid gap-2 ${cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
      {options.map((o) => {
        const active = value === o.v;
        return (
          <button
            key={o.v}
            type="button"
            onClick={() => onChange(o.v)}
            className="group relative rounded-xl border border-border bg-background/40 p-3 text-left text-sm transition-all hover:border-primary/40"
            style={active ? { borderColor: "transparent", background: "linear-gradient(135deg, oklch(0.65 0.22 28 / 0.18), oklch(0.78 0.13 240 / 0.18))", boxShadow: "0 0 0 1px oklch(0.78 0.13 240 / 0.5), 0 10px 30px -10px oklch(0.65 0.22 28 / 0.4)" } : undefined}
          >
            <span className="flex items-center gap-2">
              <span
                className="grid h-4 w-4 place-items-center rounded-full border"
                style={{ borderColor: active ? "oklch(0.78 0.13 240)" : "oklch(1 0 0 / 0.25)" }}
              >
                {active && <span className="h-2 w-2 rounded-full" style={{ background: "var(--gradient-brand)" }} />}
              </span>
              {o.l}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function RevenueAnalyzer() {
  const { lang } = useLang();
  const C = COPY[lang];
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>(empty);
  const [analyzing, setAnalyzing] = useState(false);
  const [done, setDone] = useState(false);

  const totalSteps = 5;

  const canNext = useMemo(() => {
    switch (step) {
      case 0: return !!a.industry && a.monthlyLeads > 0 && a.avgValue > 0;
      case 1: return !!a.responseTime && a.unansweredPct >= 0;
      case 2: return a.conversionPct > 0;
      case 3: return !!a.hasCRM && !!a.hasAutomation && !!a.handler;
      case 4: return a.desiredClients > 0 && !!a.bottleneck;
      default: return false;
    }
  }, [step, a]);

  const result = useMemo(() => (done ? calc(a) : null), [done, a]);

  const insights = useMemo(() => {
    if (!done) return [] as string[];
    const out: string[] = [];
    if (a.responseTime !== "instant" && a.responseTime !== "") out.push(C.insights.slow);
    if (a.unansweredPct > 5) out.push(C.insights.unanswered(a.unansweredPct));
    if (a.hasAutomation === "no") out.push(C.insights.noFollowup);
    if (a.noShowPct > 5) out.push(C.insights.noShow(a.noShowPct));
    if (a.hasCRM === "no") out.push(C.insights.noCRM);
    if (a.desiredClients > a.monthlyLeads * (a.conversionPct / 100)) out.push(C.insights.growth);
    return out;
  }, [done, a, C]);

  const recommendations = useMemo(() => {
    if (!result) return [] as { name: string; why: string; impact: number; Icon: typeof Bot }[];
    const slow = a.responseTime !== "instant" && a.responseTime !== "";
    const recs: { name: string; why: string; impact: number; Icon: typeof Bot }[] = [];
    if (slow || a.unansweredPct > 5) {
      recs.push({ ...C.rec.conversion, impact: result.lostFromUnanswered + result.lostFromSlow, Icon: Bot });
    }
    if (a.hasAutomation === "no" || a.bottleneck === "followup") {
      recs.push({ ...C.rec.followup, impact: result.lostRevenue * 0.35, Icon: Repeat2 });
    }
    if (a.noShowPct > 5 || a.bottleneck === "noshows") {
      recs.push({ ...C.rec.shows, impact: result.lostFromNoShow, Icon: CalendarCheck });
    }
    return recs;
  }, [result, a, C]);

  function runAnalyze() {
    setAnalyzing(true);
    setTimeout(() => { setAnalyzing(false); setDone(true); }, 1400);
  }

  function reset() {
    setA(empty); setStep(0); setStarted(false); setDone(false);
  }

  function downloadPDF() {
    if (!result) return;
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const W = doc.internal.pageSize.getWidth();
    let y = 56;

    doc.setFillColor(10, 14, 26);
    doc.rect(0, 0, W, 110, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold"); doc.setFontSize(20);
    doc.text(C.pdf.title, 40, 60);
    doc.setFont("helvetica", "normal"); doc.setFontSize(10);
    doc.setTextColor(180, 195, 220);
    doc.text(new Date().toLocaleDateString(), 40, 82);
    y = 150;

    doc.setTextColor(20, 20, 30);
    doc.setFont("helvetica", "bold"); doc.setFontSize(14);
    doc.text(C.dash.title, 40, y); y += 24;

    const cards = [
      { l: C.dash.now, v: fmt(result.currentRevenue), c: [60, 130, 246] },
      { l: C.dash.lost, v: `- ${fmt(result.lostRevenue)}`, c: [220, 70, 70] },
      { l: C.dash.opportunity, v: `+ ${fmt(result.opportunity)}`, c: [240, 140, 60] },
    ];
    const cw = (W - 80 - 24) / 3;
    cards.forEach((c, i) => {
      const x = 40 + i * (cw + 12);
      doc.setFillColor(245, 247, 252); doc.roundedRect(x, y, cw, 80, 8, 8, "F");
      doc.setTextColor(120, 130, 150); doc.setFont("helvetica", "normal"); doc.setFontSize(9);
      doc.text(c.l.toUpperCase(), x + 14, y + 22);
      doc.setTextColor(c.c[0], c.c[1], c.c[2]); doc.setFont("helvetica", "bold"); doc.setFontSize(18);
      doc.text(c.v, x + 14, y + 52);
    });
    y += 110;

    doc.setTextColor(20, 20, 30); doc.setFont("helvetica", "bold"); doc.setFontSize(13);
    doc.text(C.dash.whats, 40, y); y += 18;
    doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(60, 65, 80);
    insights.forEach((ins) => {
      const lines = doc.splitTextToSize(`• ${ins}`, W - 80);
      doc.text(lines, 40, y);
      y += lines.length * 13 + 4;
    });

    y += 12;
    doc.setTextColor(20, 20, 30); doc.setFont("helvetica", "bold"); doc.setFontSize(13);
    doc.text(C.dash.systems, 40, y); y += 18;
    recommendations.forEach((r) => {
      doc.setFont("helvetica", "bold"); doc.setFontSize(11); doc.setTextColor(20, 30, 60);
      doc.text(r.name, 40, y); y += 14;
      doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(60, 65, 80);
      const lines = doc.splitTextToSize(r.why, W - 80);
      doc.text(lines, 40, y); y += lines.length * 13 + 2;
      doc.setTextColor(40, 130, 80); doc.setFont("helvetica", "bold");
      doc.text(`${C.dash.impact}: +${fmt(r.impact)} ${C.dash.perMonth}`, 40, y); y += 22;
    });

    doc.setTextColor(140, 150, 170); doc.setFont("helvetica", "normal"); doc.setFontSize(9);
    doc.text(C.pdf.footer, 40, doc.internal.pageSize.getHeight() - 28);

    doc.save("cooverly-revenue-diagnostic.pdf");
  }

  // ----- LANDING -----
  if (!started) {
    return (
      <div className="rounded-3xl border border-border bg-card/60 p-10 backdrop-blur-xl" style={{ boxShadow: "var(--shadow-glow)" }}>
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary-glow">
          <Sparkles className="h-3.5 w-3.5" /> {C.eyebrow}
        </div>
        <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
          {C.title}
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground">{C.sub}</p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { Icon: TrendingUp, l: lang === "en" ? "Current revenue" : "Ingresos actuales" },
            { Icon: AlertTriangle, l: lang === "en" ? "Lost revenue" : "Ingresos perdidos" },
            { Icon: Rocket, l: lang === "en" ? "Recovery plan" : "Plan de recuperación" },
          ].map(({ Icon, l }) => (
            <div key={l} className="rounded-2xl border border-border bg-background/30 p-4">
              <Icon className="h-5 w-5 text-primary-glow" />
              <div className="mt-3 text-sm">{l}</div>
            </div>
          ))}
        </div>

        <Button
          size="lg"
          onClick={() => setStarted(true)}
          className="mt-8 h-12 bg-gradient-to-r from-primary to-primary-glow px-8 text-primary-foreground"
          style={{ boxShadow: "var(--shadow-glow)" }}
        >
          {C.start} <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    );
  }

  // ----- DASHBOARD -----
  if (done && result) {
    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-xl"
          style={{ boxShadow: "var(--shadow-glow)" }}
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary-glow">
            <Sparkles className="h-3.5 w-3.5" /> {C.dash.title}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <StatCard tone="primary" label={C.dash.now} value={fmt(result.currentRevenue)} sub={C.dash.perMonth} Icon={TrendingUp} />
            <StatCard tone="danger" label={C.dash.lost} value={`- ${fmt(result.lostRevenue)}`} sub={C.dash.perMonth} Icon={AlertTriangle} />
            <StatCard tone="success" label={C.dash.opportunity} value={`+ ${fmt(result.opportunity)}`} sub={C.dash.perMonth} Icon={Rocket} />
          </div>

          <RevenueChart
            current={result.currentRevenue}
            lost={result.lostRevenue}
            opportunity={result.opportunity}
            slow={result.lostFromSlow}
            unanswered={result.lostFromUnanswered}
            noShow={result.lostFromNoShow}
            lang={lang}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-xl"
        >
          <h3 className="text-xl font-semibold">{C.dash.whats}</h3>
          <ul className="mt-4 space-y-3">
            {insights.map((ins, i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl border border-border bg-background/30 p-4 text-sm">
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-none text-[oklch(0.72_0.19_50)]" />
                <span>{ins}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-xl"
        >
          <h3 className="text-xl font-semibold">{C.dash.systems}</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {recommendations.map((r) => {
              const Icon = r.Icon;
              return (
                <div key={r.name} className="rounded-2xl border border-border bg-background/40 p-5">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: "var(--gradient-brand)", boxShadow: "0 8px 24px -8px oklch(0.65 0.22 28 / 0.6)" }}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="font-semibold">{r.name}</div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{r.why}</p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[oklch(0.72_0.19_140_/_0.4)] bg-[oklch(0.72_0.19_140_/_0.1)] px-3 py-1 text-xs font-medium text-[oklch(0.85_0.18_140)]">
                    <TrendingUp className="h-3 w-3" /> {C.dash.impact}: +{fmt(r.impact)} {C.dash.perMonth}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="overflow-hidden rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-xl"
          style={{ boxShadow: "var(--shadow-glow)" }}
        >
          <h3 className="text-2xl font-semibold">{C.dash.ctaTitle}</h3>
          <p className="mt-2 text-muted-foreground">{C.dash.ctaSub}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 bg-gradient-to-r from-primary to-primary-glow px-7 text-primary-foreground" style={{ boxShadow: "var(--shadow-glow)" }}>
              <a href={`${CONTACT.whatsapp}?text=${encodeURIComponent(C.dash.waMsg)}`} target="_blank" rel="noreferrer">
                <MessageSquare className="h-4 w-4" /> {C.dash.whatsapp}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 border-border bg-card/40 px-7">
              <a href={CALENDLY} target="_blank" rel="noreferrer">
                <CalendarCheck className="h-4 w-4" /> {C.dash.book}
              </a>
            </Button>
            <Button onClick={downloadPDF} size="lg" variant="ghost" className="h-12 px-5">
              <Download className="h-4 w-4" /> {C.dash.pdf}
            </Button>
          </div>

          <button onClick={reset} className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
            {C.dash.restart}
          </button>
        </motion.div>
      </div>
    );
  }

  // ----- STEPS -----
  const s = C.steps[step];
  return (
    <div className="rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-xl" style={{ boxShadow: "var(--shadow-glow)" }}>
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {C.stepLabel} {step + 1} {C.of} {totalSteps}
        </div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary-glow">
          <Sparkles className="h-3 w-3" /> {C.eyebrow}
        </div>
      </div>
      <div className="mt-3"><Stepper step={step} total={totalSteps} /></div>

      <div className="mt-6">
        <div className="text-2xl font-semibold">{s.title}</div>
        <div className="mt-1 text-sm text-muted-foreground">{s.sub}</div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
          className="mt-6 space-y-5"
        >
          {step === 0 && (
            <>
              <label className="block">
                <div className="mb-1.5 text-xs uppercase tracking-[0.15em] text-muted-foreground">{C.steps[0].fields.industry}</div>
                <select
                  value={a.industry}
                  onChange={(e) => setA({ ...a, industry: e.target.value })}
                  className="h-12 w-full rounded-md border border-input bg-background/50 px-3 text-sm"
                >
                  <option value="">—</option>
                  {C.industries.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <NumberField label={C.steps[0].fields.leads!} value={a.monthlyLeads} onChange={(v) => setA({ ...a, monthlyLeads: v })} />
                <NumberField label={C.steps[0].fields.value!} value={a.avgValue} onChange={(v) => setA({ ...a, avgValue: v })} suffix="$" />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div>
                <div className="mb-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">{C.steps[1].fields.response}</div>
                <ChoiceGrid value={a.responseTime} onChange={(v) => setA({ ...a, responseTime: v })} options={C.steps[1].fields.options as { v: Answers["responseTime"]; l: string }[]} />
              </div>
              <NumberField label={C.steps[1].fields.unanswered!} value={a.unansweredPct} onChange={(v) => setA({ ...a, unansweredPct: Math.min(100, v) })} suffix="%" />
            </>
          )}

          {step === 2 && (
            <div className="grid gap-4 sm:grid-cols-3">
              <NumberField label={C.steps[2].fields.conv!} value={a.conversionPct} onChange={(v) => setA({ ...a, conversionPct: Math.min(100, v) })} suffix="%" />
              <NumberField label={C.steps[2].fields.appts!} value={a.bookedAppts} onChange={(v) => setA({ ...a, bookedAppts: v })} />
              <NumberField label={C.steps[2].fields.noshow!} value={a.noShowPct} onChange={(v) => setA({ ...a, noShowPct: Math.min(100, v) })} suffix="%" />
            </div>
          )}

          {step === 3 && (
            <>
              <div>
                <div className="mb-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">{C.steps[3].fields.crm}</div>
                <ChoiceGrid value={a.hasCRM} onChange={(v) => setA({ ...a, hasCRM: v })} options={[{ v: "yes" as const, l: C.yes }, { v: "no" as const, l: C.no }]} />
              </div>
              <div>
                <div className="mb-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">{C.steps[3].fields.auto}</div>
                <ChoiceGrid value={a.hasAutomation} onChange={(v) => setA({ ...a, hasAutomation: v })} options={[{ v: "yes" as const, l: C.yes }, { v: "no" as const, l: C.no }]} />
              </div>
              <div>
                <div className="mb-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">{C.steps[3].fields.handler}</div>
                <ChoiceGrid cols={3} value={a.handler} onChange={(v) => setA({ ...a, handler: v })} options={C.steps[3].fields.handlerOpts as { v: Answers["handler"]; l: string }[]} />
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <NumberField label={C.steps[4].fields.desired!} value={a.desiredClients} onChange={(v) => setA({ ...a, desiredClients: v })} />
              <div>
                <div className="mb-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">{C.steps[4].fields.bottleneck}</div>
                <ChoiceGrid value={a.bottleneck} onChange={(v) => setA({ ...a, bottleneck: v })} options={C.steps[4].fields.bnOpts as { v: Answers["bottleneck"]; l: string }[]} />
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> {C.back}
        </Button>
        {step < totalSteps - 1 ? (
          <Button
            onClick={() => setStep((s) => Math.min(totalSteps - 1, s + 1))}
            disabled={!canNext}
            className="h-11 bg-gradient-to-r from-primary to-primary-glow px-6 text-primary-foreground"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            {C.next} <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={runAnalyze}
            disabled={!canNext || analyzing}
            className="h-11 bg-gradient-to-r from-primary to-primary-glow px-6 text-primary-foreground"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            {analyzing ? <><Loader2 className="h-4 w-4 animate-spin" /> {C.analyzing}</> : <><CheckCircle2 className="h-4 w-4" /> {C.analyze}</>}
          </Button>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, Icon, tone }: { label: string; value: string; sub: string; Icon: typeof TrendingUp; tone: "primary" | "danger" | "success" }) {
  const colors = {
    primary: { glow: "oklch(0.78 0.13 240 / 0.5)", text: "oklch(0.85 0.13 240)" },
    danger: { glow: "oklch(0.65 0.22 28 / 0.55)", text: "oklch(0.78 0.20 28)" },
    success: { glow: "oklch(0.72 0.19 140 / 0.5)", text: "oklch(0.85 0.18 140)" },
  }[tone];
  return (
    <motion.div
      whileHover={{ y: -4, rotateX: 4, rotateY: -4 }}
      style={{ transformStyle: "preserve-3d", boxShadow: `0 18px 60px -20px ${colors.glow}` }}
      className="relative overflow-hidden rounded-2xl border border-border bg-background/50 p-5"
    >
      <div className="absolute inset-0 opacity-30" style={{ background: `radial-gradient(circle at 30% 0%, ${colors.glow}, transparent 60%)` }} />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
          <Icon className="h-4 w-4" style={{ color: colors.text }} />
        </div>
        <div className="mt-3 text-3xl font-semibold tracking-tight" style={{ color: colors.text }}>{value}</div>
        <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
      </div>
    </motion.div>
  );
}

function RevenueChart({
  current, lost, opportunity, slow, unanswered, noShow, lang,
}: {
  current: number; lost: number; opportunity: number;
  slow: number; unanswered: number; noShow: number;
  lang: "en" | "es" | "it";
}) {
  const labels = {
    en: { bars: "Monthly revenue map", current: "Current", lost: "Lost", recover: "Recoverable", breakdown: "Where the money is leaking", slow: "Slow response", unanswered: "Unanswered leads", noShow: "No-shows" },
    es: { bars: "Mapa de ingresos mensuales", current: "Actual", lost: "Perdido", recover: "Recuperable", breakdown: "Dónde se fuga el dinero", slow: "Respuesta lenta", unanswered: "Leads sin contestar", noShow: "No-shows" },
    it: { bars: "Mappa del fatturato mensile", current: "Attuale", lost: "Perso", recover: "Recuperabile", breakdown: "Da dove perdi soldi", slow: "Risposta lenta", unanswered: "Lead senza risposta", noShow: "No-show" },
  }[lang];

  const max = Math.max(current, lost, opportunity, 1);
  const bars = [
    { l: labels.current, v: current, color: "oklch(0.78 0.13 240)", glow: "oklch(0.78 0.13 240 / 0.5)" },
    { l: labels.lost, v: lost, color: "oklch(0.65 0.22 28)", glow: "oklch(0.65 0.22 28 / 0.55)" },
    { l: labels.recover, v: opportunity, color: "oklch(0.72 0.19 140)", glow: "oklch(0.72 0.19 140 / 0.55)" },
  ];

  const totalLost = Math.max(slow + unanswered + noShow, 1);
  const segments = [
    { l: labels.slow, v: slow, color: "oklch(0.78 0.13 240)" },
    { l: labels.unanswered, v: unanswered, color: "oklch(0.65 0.22 28)" },
    { l: labels.noShow, v: noShow, color: "oklch(0.72 0.19 50)" },
  ];

  const fmt0 = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Math.round(n));

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      {/* 3D bar chart */}
      <div
        className="relative overflow-hidden rounded-2xl border border-border bg-background/40 p-5"
        style={{ boxShadow: "0 18px 60px -22px oklch(0.78 0.13 240 / 0.45)" }}
      >
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{labels.bars}</div>
        <div className="mt-6 flex items-end gap-4 sm:gap-6" style={{ height: 220, perspective: 900 }}>
          {bars.map((b, i) => {
            const h = (b.v / max) * 180 + 8;
            return (
              <motion.div
                key={b.l}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: h, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.12, duration: 0.7, ease: "easeOut" }}
                className="relative flex-1 rounded-t-lg"
                style={{
                  background: `linear-gradient(180deg, ${b.color} 0%, color-mix(in oklab, ${b.color} 60%, transparent) 100%)`,
                  boxShadow: `0 -6px 30px -8px ${b.glow}, inset 0 1px 0 oklch(1 0 0 / 0.25)`,
                  transform: "rotateX(8deg)",
                  transformStyle: "preserve-3d",
                }}
                aria-label={`${b.l}: ${fmt0(b.v)}`}
              >
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold" style={{ color: b.color }}>
                  {fmt0(b.v)}
                </span>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-3 flex justify-between gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {bars.map((b) => <div key={b.l} className="flex-1 text-center">{b.l}</div>)}
        </div>
      </div>

      {/* Breakdown bar */}
      <div
        className="relative overflow-hidden rounded-2xl border border-border bg-background/40 p-5"
        style={{ boxShadow: "0 18px 60px -22px oklch(0.65 0.22 28 / 0.45)" }}
      >
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{labels.breakdown}</div>
        <div className="mt-6 flex h-3 w-full overflow-hidden rounded-full border border-border/60 bg-background/60">
          {segments.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ width: 0 }}
              animate={{ width: `${(s.v / totalLost) * 100}%` }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
              style={{ background: s.color, boxShadow: `inset 0 1px 0 oklch(1 0 0 / 0.25)` }}
            />
          ))}
        </div>
        <div className="mt-5 space-y-3">
          {segments.map((s) => (
            <div key={s.l} className="flex items-center justify-between gap-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color, boxShadow: `0 0 12px ${s.color}` }} />
                <span className="text-foreground/90">{s.l}</span>
              </div>
              <div className="font-semibold tabular-nums" style={{ color: s.color }}>{fmt0(s.v)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}