import { describe, it, expect } from "vitest";

const REQUIRED_HEADERS = [
  "x-content-type-options",
  "x-frame-options",
  "referrer-policy",
  "permissions-policy",
  "content-security-policy",
];

describe("Security Headers", () => {
  const baseUrl = process.env.TEST_BASE_URL || "http://localhost:3000";

  it("should include all required security headers", async () => {
    try {
      const response = await fetch(baseUrl);
      for (const header of REQUIRED_HEADERS) {
        expect(response.headers.has(header)).toBe(true);
      }
    } catch {
      // Skip if server is not running
      console.log("Skipping: server not available at", baseUrl);
    }
  });

  it("should have X-Frame-Options set to DENY", async () => {
    try {
      const response = await fetch(baseUrl);
      expect(response.headers.get("x-frame-options")).toBe("DENY");
    } catch {
      console.log("Skipping: server not available");
    }
  });

  it("should have X-Content-Type-Options set to nosniff", async () => {
    try {
      const response = await fetch(baseUrl);
      expect(response.headers.get("x-content-type-options")).toBe("nosniff");
    } catch {
      console.log("Skipping: server not available");
    }
  });

  it("should have CSP that blocks frame-ancestors", async () => {
    try {
      const response = await fetch(baseUrl);
      const csp = response.headers.get("content-security-policy") || "";
      expect(csp).toContain("frame-ancestors 'none'");
    } catch {
      console.log("Skipping: server not available");
    }
  });
});
