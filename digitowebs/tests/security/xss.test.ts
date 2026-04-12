import { describe, it, expect } from "vitest";
import { sanitizeHtml, sanitizeText } from "@/lib/security/sanitize";

const XSS_PAYLOADS = [
  '<script>alert("xss")</script>',
  '<img src=x onerror=alert("xss")>',
  '<svg onload=alert("xss")>',
  '<a href="javascript:alert(1)">click</a>',
  '<iframe src="data:text/html,<script>alert(1)</script>"></iframe>',
  '<input onfocus=alert(1) autofocus>',
  '<body onload=alert(1)>',
  '<object data="data:text/html,<script>alert(1)</script>">',
  '<embed src="data:text/html,<script>alert(1)</script>">',
  '<form action="javascript:alert(1)"><button>submit</button></form>',
];

describe("XSS Prevention - sanitizeHtml", () => {
  for (const payload of XSS_PAYLOADS) {
    it(`should sanitize: ${payload.substring(0, 50)}...`, () => {
      const clean = sanitizeHtml(payload);
      expect(clean).not.toContain("<script");
      expect(clean).not.toContain("onerror=");
      expect(clean).not.toContain("onload=");
      expect(clean).not.toContain("onfocus=");
      expect(clean).not.toContain("javascript:");
      expect(clean).not.toContain("<iframe");
      expect(clean).not.toContain("<object");
      expect(clean).not.toContain("<embed");
      expect(clean).not.toContain("<form");
      expect(clean).not.toContain("<input");
    });
  }

  it("should preserve safe HTML", () => {
    const safe = '<p>Hello <strong>world</strong></p>';
    expect(sanitizeHtml(safe)).toBe(safe);
  });

  it("should preserve links without javascript protocol", () => {
    const safe = '<a href="https://example.com">link</a>';
    expect(sanitizeHtml(safe)).toBe(safe);
  });
});

describe("XSS Prevention - sanitizeText", () => {
  it("should strip all HTML tags", () => {
    expect(sanitizeText('<p>Hello <b>world</b></p>')).toBe("Hello world");
  });

  it("should strip script tags", () => {
    expect(sanitizeText('<script>alert("xss")</script>')).toBe('alert("xss")');
  });

  it("should trim whitespace", () => {
    expect(sanitizeText("  hello  ")).toBe("hello");
  });
});
