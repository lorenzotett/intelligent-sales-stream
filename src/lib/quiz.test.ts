import { describe, expect, it } from "vitest";
import { MAX_PER_QUESTION, progressOf, scoreBand, totalScore } from "./quiz";

describe("quiz scoring", () => {
  it("adds up the points of every answer", () => {
    expect(totalScore([0, 1, 2, 0, 1])).toBe(4);
    expect(totalScore([])).toBe(0);
    expect(totalScore([2, 2, 2, 2, 2])).toBe(10);
  });

  it("bands a 5-question quiz (max 10) at 40% and 80%", () => {
    expect(scoreBand(0, 10)).toBe("early");
    expect(scoreBand(3, 10)).toBe("early");
    expect(scoreBand(4, 10)).toBe("shaping");
    expect(scoreBand(7, 10)).toBe("shaping");
    expect(scoreBand(8, 10)).toBe("ready");
    expect(scoreBand(10, 10)).toBe("ready");
  });

  it("never divides by zero when there are no questions", () => {
    expect(scoreBand(0, 0)).toBe("early");
  });

  it("reports progress as a share of questions answered", () => {
    expect(progressOf([1], 5)).toBeCloseTo(0.2);
    expect(progressOf([1, 2, 0, 1, 2], 5)).toBe(1);
    expect(progressOf([1, 2], 0)).toBe(1);
  });

  it("keeps every answer inside the 0..2 range it is designed for", () => {
    expect(MAX_PER_QUESTION).toBe(2);
    expect(totalScore([MAX_PER_QUESTION])).toBe(2);
  });
});
