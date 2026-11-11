/** Scoring for the project readiness quiz. Pure logic, no copy, no React. */

export type QuizBand = "early" | "shaping" | "ready";

/** Points a single answer can carry: 0 = not started, 1 = partly, 2 = clearly. */
export const MAX_PER_QUESTION = 2;

export function totalScore(answers: number[]): number {
  return answers.reduce((sum, a) => sum + (Number.isFinite(a) ? a : 0), 0);
}

/**
 * Turns a raw score into a band.
 * Below 40% = early, below 80% = taking shape, 80% or more = ready to move.
 */
export function scoreBand(score: number, max: number): QuizBand {
  if (max <= 0) return "early";
  const pct = score / max;
  if (pct < 0.4) return "early";
  if (pct < 0.8) return "shaping";
  return "ready";
}

/** 0..1 share of the quiz completed, for the progress bar. */
export function progressOf(answers: number[], questions: number): number {
  if (questions <= 0) return 1;
  return Math.min(1, answers.length / questions);
}
