import { describe, it, expect } from "vitest";
import { emptyDraft, validateStep1, validateStep2, buildMailto } from "./project-form";

const ok1 = { ...emptyDraft, type: "spin_off", stage: "exploring", description: "x".repeat(30) };
describe("project form", () => {
  it("requires type, stage and a description", () => {
    expect(validateStep1(emptyDraft)).toEqual({ type: "type", stage: "stage", description: "descShort" });
  });
  it("rejects descriptions over 1500 chars", () => {
    expect(validateStep1({ ...ok1, description: "x".repeat(1501) }).description).toBe("descLong");
  });
  it("accepts a complete step 1", () => expect(validateStep1(ok1)).toEqual({}));
  it("requires name and valid email, accepts personal email", () => {
    expect(validateStep2({ ...ok1, email: "bad" })).toEqual({ name: "name", email: "email" });
    expect(validateStep2({ ...ok1, name: "Ana", email: "ana@gmail.com" })).toEqual({});
  });
  it("omits empty optional fields from the email", () => {
    const url = buildMailto("lorenzo.tttine@gmail.com", "S", [["Name", "Ana"], ["Budget", ""]]);
    expect(decodeURIComponent(url)).toContain("Name: Ana");
    expect(decodeURIComponent(url)).not.toContain("Budget");
  });
});
