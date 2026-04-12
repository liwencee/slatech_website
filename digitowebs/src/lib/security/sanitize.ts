// HTML sanitization for rich text content
// Install: npm install isomorphic-dompurify

// import DOMPurify from "isomorphic-dompurify";

const DANGEROUS_TAGS = [
  "script",
  "iframe",
  "object",
  "embed",
  "form",
  "input",
  "button",
];

const DANGEROUS_ATTRS = [
  "onerror",
  "onload",
  "onclick",
  "onmouseover",
  "onfocus",
  "onblur",
];

// Basic sanitization until DOMPurify is installed
export function sanitizeHtml(dirty: string): string {
  let clean = dirty;

  // Remove dangerous tags
  for (const tag of DANGEROUS_TAGS) {
    const regex = new RegExp(`<${tag}[^>]*>.*?</${tag}>`, "gi");
    clean = clean.replace(regex, "");
    const selfClosing = new RegExp(`<${tag}[^>]*/?\\s*>`, "gi");
    clean = clean.replace(selfClosing, "");
  }

  // Remove dangerous attributes
  for (const attr of DANGEROUS_ATTRS) {
    const regex = new RegExp(`\\s${attr}\\s*=\\s*["'][^"']*["']`, "gi");
    clean = clean.replace(regex, "");
  }

  // Remove javascript: protocol
  clean = clean.replace(/javascript\s*:/gi, "");

  return clean;
}

// Sanitize text input (strip all HTML)
export function sanitizeText(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}
