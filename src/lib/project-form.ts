export interface ProjectDraft {
  type: string; stage: string; description: string;
  name: string; email: string; company: string; timing: string; budget: string;
}
export type FieldError = "type" | "stage" | "descShort" | "descLong" | "name" | "email";

export const emptyDraft: ProjectDraft = { type: "", stage: "", description: "", name: "", email: "", company: "", timing: "", budget: "" };
export const DESC_MIN = 30;
export const DESC_MAX = 1500;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateStep1(d: ProjectDraft): Partial<Record<keyof ProjectDraft, FieldError>> {
  const e: Partial<Record<keyof ProjectDraft, FieldError>> = {};
  if (!d.type) e.type = "type";
  if (!d.stage) e.stage = "stage";
  const len = d.description.trim().length;
  if (len < DESC_MIN) e.description = "descShort";
  else if (len > DESC_MAX) e.description = "descLong";
  return e;
}
export function validateStep2(d: ProjectDraft): Partial<Record<keyof ProjectDraft, FieldError>> {
  const e: Partial<Record<keyof ProjectDraft, FieldError>> = {};
  if (!d.name.trim() || d.name.trim().length > 100) e.name = "name";
  if (!EMAIL_RE.test(d.email.trim()) || d.email.length > 255) e.email = "email";
  return e;
}

export function buildMailto(to: string, subject: string, lines: [string, string][]): string {
  const body = lines.filter(([, v]) => v.trim()).map(([k, v]) => `${k}: ${v.trim()}`).join("\n\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
