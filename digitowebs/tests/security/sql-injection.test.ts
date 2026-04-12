import { describe, it, expect } from "vitest";
import { articleQuerySchema } from "@/lib/validations/article";

const SQL_INJECTION_PAYLOADS = [
  "'; DROP TABLE articles; --",
  "1 OR 1=1",
  "1' UNION SELECT * FROM profiles --",
  "admin'--",
  "1; DELETE FROM articles",
  "' OR ''='",
  "1' AND (SELECT COUNT(*) FROM profiles) > 0 --",
];

describe("SQL Injection Prevention", () => {
  describe("Query parameter validation blocks injection attempts", () => {
    for (const payload of SQL_INJECTION_PAYLOADS) {
      it(`should reject search param: ${payload.substring(0, 40)}`, () => {
        // UUID validation should block non-UUID category values
        const result = articleQuerySchema.safeParse({
          category: payload,
        });
        expect(result.success).toBe(false);
      });
    }
  });

  it("should reject invalid UUIDs in category filter", () => {
    const result = articleQuerySchema.safeParse({
      category: "' OR 1=1 --",
    });
    expect(result.success).toBe(false);
  });

  it("should limit search length to prevent buffer overflow", () => {
    const result = articleQuerySchema.safeParse({
      search: "a".repeat(201),
    });
    expect(result.success).toBe(false);
  });

  it("should accept valid search terms", () => {
    const result = articleQuerySchema.safeParse({
      search: "web design",
    });
    expect(result.success).toBe(true);
  });
});
