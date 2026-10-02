import { describe, it, expect } from "vitest";
import { getClientIp } from "@/lib/security/rate-limit";

// Header shapes captured from the live site behind Hostinger's CDN.
const REAL = "129.205.124.206";
const FAKE = "203.0.113.50";

describe("getClientIp", () => {
  it("returns the real IP from Hostinger's forwarded chain", () => {
    const headers = new Headers({
      "x-forwarded-for": `${REAL}, ${REAL},${REAL}`,
      "x-real-ip": REAL,
    });
    expect(getClientIp(headers)).toBe(REAL);
  });

  it("ignores a spoofed x-forwarded-for value sent by the client", () => {
    const headers = new Headers({
      "x-forwarded-for": `${FAKE}, ${REAL}, ${FAKE}, ${REAL},${REAL}`,
      "x-real-ip": REAL,
    });
    expect(getClientIp(headers)).toBe(REAL);
  });

  it("falls back to x-real-ip when x-forwarded-for is absent", () => {
    expect(getClientIp(new Headers({ "x-real-ip": REAL }))).toBe(REAL);
  });

  it("returns null when no IP headers are present", () => {
    expect(getClientIp(new Headers())).toBeNull();
  });
});
