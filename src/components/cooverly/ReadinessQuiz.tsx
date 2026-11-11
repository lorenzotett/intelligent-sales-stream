import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, MessageSquare, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import { WHATSAPP_HREF } from "@/i18n/site";
import { Tilt3D } from "./Tilt3D";
import { lightAccents, pick as pickAccent, type Accent } from "./accents";
import { MAX_PER_QUESTION, progressOf, scoreBand, totalScore, type QuizBand } from "@/lib/quiz";

const R = 44;
const CIRC = 2 * Math.PI * R;
/** Band colours: the title is large bold text, so the deeper orange is readable there. */
const BAND_TONE: Record<QuizBand, string> = {
  early: "text-warm-deep",
  shaping: "text-sky-deep",
  ready: "text-primary",
};
const BAND_ACCENT: Record<QuizBand, Accent> = {
  early: lightAccents[3],
  shaping: lightAccents[2],
  ready: lightAccents[0],
};

export function ReadinessQuiz() {
  const { t } = useLang();
  const q = t.quiz;
  const reduce = useReducedMotion();
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const [dir, setDir] = useState(1);

  const max = q.questions.length * MAX_PER_QUESTION;
  const score = totalScore(answers);
  const band = scoreBand(score, max);
  const step = Math.min(answers.length, q.questions.length - 1);
  const finished = done || answers.length >= q.questions.length;
  const pct = finished ? 1 : progressOf(answers, q.questions.length);

  const pick = (s: number) => {
    const next = [...answers.slice(0, answers.length), s];
    setDir(1);
    setAnswers(next);
    if (next.length >= q.questions.length) setDone(true);
  };
  const back = () => {
    setDir(-1);
    setDone(false);
    setAnswers(answers.slice(0, -1));
  };
  const restart = () => {
    setDir(1);
    setAnswers([]);
    setDone(false);
  };

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: reduce ? 0 : 44 * d, rotateY: reduce ? 0 : 9 * d, scale: 0.985 }),
    center: { opacity: 1, x: 0, rotateY: 0, scale: 1 },
    exit: (d: number) => ({ opacity: 0, x: reduce ? 0 : -44 * d, rotateY: reduce ? 0 : -9 * d, scale: 0.985 }),
  };
  const anim = { duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div>
      <Tilt3D max={4}>
        <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
          <span aria-hidden className="rule-tri absolute inset-x-0 top-0" />
          <div className="flex items-center justify-between gap-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            <span>
              {finished
                ? q.resultTitle
                : `${q.qLabel} ${answers.length + 1} ${q.of} ${q.questions.length}`}
            </span>
            <span>{Math.round(pct * 100)}%</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-[linear-gradient(90deg,var(--primary),var(--sky),var(--accent-warm))]"
              animate={{ width: `${pct * 100}%` }}
              transition={anim}
            />
          </div>

          <AnimatePresence mode="wait" initial={false} custom={dir}>
            {!finished ? (
              <motion.div
                key={`q${step}-${answers.length}`}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={anim}
                style={{ transformPerspective: 1000 }}
              >
                <fieldset className="mt-6 border-0 p-0">
                  <legend className="text-xl font-bold sm:text-2xl">{q.questions[step].q}</legend>
                  <div className="mt-5 grid gap-3">
                    {q.questions[step].options.map((o, i) => (
                      <button
                        key={o.t}
                        type="button"
                        onClick={() => pick(o.s)}
                        className="group flex items-center gap-4 rounded-lg border border-border bg-background px-4 py-3.5 text-left transition-all hover:border-primary/60 hover:shadow-[var(--shadow-lift)] focus-visible:border-primary"
                      >
                        <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[13px] font-bold ${pickAccent(lightAccents, i).chip}`}>
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="font-medium">{o.t}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>
                {answers.length > 0 && (
                  <button
                    type="button"
                    onClick={back}
                    className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ArrowLeft className="h-4 w-4" /> {q.back}
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={anim}
                style={{ transformPerspective: 1000 }}
              >
                <div className="mt-6 grid gap-6 sm:grid-cols-[7.5rem_1fr] sm:items-center">
                  <div className="relative mx-auto h-28 w-28 sm:mx-0">
                    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
                      <circle cx="50" cy="50" r={R} fill="none" strokeWidth="8" style={{ stroke: "var(--border)" }} />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r={R}
                        fill="none"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={CIRC}
                        style={{ stroke: "url(#quizGrad)", transform: "rotate(-90deg)", transformOrigin: "center" }}
                        initial={{ strokeDashoffset: CIRC }}
                        animate={{ strokeDashoffset: CIRC * (1 - score / max) }}
                        transition={{ duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
                      />
                      <defs>
                        <linearGradient id="quizGrad" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" style={{ stopColor: "var(--primary)" }} />
                          <stop offset="55%" style={{ stopColor: "var(--sky)" }} />
                          <stop offset="100%" style={{ stopColor: "var(--accent-warm)" }} />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 grid place-items-center text-center">
                      <div>
                        <p className="font-display text-2xl font-extrabold leading-none">
                          {score}
                          <span className="text-base text-muted-foreground">/{max}</span>
                        </p>
                        <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{q.scoreLabel}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${BAND_TONE[band]}`}>{q.bands[band].t}</h3>
                    <p className="mt-2 text-muted-foreground">{q.bands[band].d}</p>
                  </div>
                </div>

                <div className={`mt-6 rounded-lg border border-l-2 bg-background p-4 ${BAND_ACCENT[band].border}`}>
                  <p className={`text-[13px] font-semibold uppercase tracking-[0.14em] ${BAND_ACCENT[band].text}`}>{q.nextLabel}</p>
                  <p className="mt-1 font-medium">{q.next[band]}</p>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button asChild className="h-12 rounded-lg px-6 text-base hover:bg-primary-hover">
                    <Link to="/contact">
                      {q.next[band]} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-12 rounded-lg px-6 text-base">
                    <a href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
                      <MessageSquare className="mr-2 h-4 w-4" /> {t.contact.waLabel}
                    </a>
                  </Button>
                  <Button type="button" variant="ghost" onClick={restart} className="h-12 rounded-lg px-5">
                    <RotateCcw className="mr-2 h-4 w-4" /> {q.restart}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Tilt3D>
      <p className="mt-4 text-[13px] text-muted-foreground">{q.disclaimer}</p>
    </div>
  );
}
