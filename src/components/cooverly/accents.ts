/**
 * Brand accent cycle. Every repeated list (phases, cards, rows) walks this list so
 * the page carries the full brand palette instead of one blue.
 *
 * light* are safe on white/light paper; dark* are safe on the navy sections.
 * Orange and bright sky stay decorative on light surfaces — they only appear here
 * as tinted chips, bars and dots, never as small body text.
 */
export type Accent = {
  text: string;
  hover: string;
  chip: string;
  border: string;
  bar: string;
  dot: string;
};

export const lightAccents: Accent[] = [
  {
    text: "text-primary",
    hover: "hover:text-primary",
    chip: "bg-primary/10 text-primary",
    border: "border-primary/35",
    bar: "bg-primary",
    dot: "bg-primary",
  },
  {
    text: "text-danger-brand",
    hover: "hover:text-danger-brand",
    chip: "bg-danger-brand/10 text-danger-brand",
    border: "border-danger-brand/35",
    bar: "bg-danger-brand",
    dot: "bg-danger-brand",
  },
  {
    text: "text-sky-deep",
    hover: "hover:text-sky-deep",
    chip: "bg-sky-deep/12 text-sky-deep",
    border: "border-sky-deep/35",
    bar: "bg-sky-deep",
    dot: "bg-sky-deep",
  },
  {
    text: "text-navy",
    hover: "hover:text-navy",
    chip: "bg-navy/10 text-navy",
    border: "border-navy/25",
    bar: "bg-navy",
    dot: "bg-navy",
  },
];

export const darkAccents: Accent[] = [
  {
    text: "text-sky",
    hover: "hover:text-sky",
    chip: "bg-sky/15 text-sky",
    border: "border-sky/40",
    bar: "bg-sky",
    dot: "bg-sky",
  },
  {
    text: "text-accent-warm",
    hover: "hover:text-accent-warm",
    chip: "bg-accent-warm/15 text-accent-warm",
    border: "border-accent-warm/40",
    bar: "bg-accent-warm",
    dot: "bg-accent-warm",
  },
  {
    text: "text-danger-brand",
    hover: "hover:text-danger-brand",
    chip: "bg-danger-brand/20 text-danger-brand",
    border: "border-danger-brand/45",
    bar: "bg-danger-brand",
    dot: "bg-danger-brand",
  },
];

export const pick = <T,>(list: T[], i: number): T => list[i % list.length];
