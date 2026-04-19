/**
 * Lightweight cookie helpers (browser-side only).
 * All functions are no-ops when called on the server.
 */

const isBrowser = typeof window !== "undefined";

/** Read a single cookie by name. Returns null if not found or on server. */
export function getCookie(name: string): string | null {
  if (!isBrowser) return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

/** Write a cookie with optional expiry (days), default 1 year. */
export function setCookie(
  name: string,
  value: string,
  days = 365,
  path = "/"
): void {
  if (!isBrowser) return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=${path}; SameSite=Lax`;
}

/** Delete a cookie by setting it expired. */
export function deleteCookie(name: string, path = "/"): void {
  if (!isBrowser) return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
}

/** Generate a random UUID (v4). Falls back to crypto.randomUUID if available. */
export function generateUUID(): string {
  if (isBrowser && typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

// ---- Consent helpers -----------------------------------------------

export type ConsentStatus = "accepted" | "declined" | null;

export const CONSENT_COOKIE = "slatech_consent";
export const VISITOR_COOKIE = "slatech_vid";
export const SESSION_COOKIE = "slatech_sid";

export function getConsentStatus(): ConsentStatus {
  const val = getCookie(CONSENT_COOKIE);
  if (val === "accepted" || val === "declined") return val;
  return null;
}

export function setConsent(status: "accepted" | "declined"): void {
  // Consent stored for 1 year; session cookie for 30 min (short-lived)
  setCookie(CONSENT_COOKIE, status, 365);
}

/** Returns the persistent visitor ID, creating one if needed. */
export function getOrCreateVisitorId(): string {
  let vid = getCookie(VISITOR_COOKIE);
  if (!vid) {
    vid = generateUUID();
    setCookie(VISITOR_COOKIE, vid, 365);
  }
  return vid;
}

/** Returns the current session ID, creating one if needed (expires with tab). */
export function getOrCreateSessionId(): string {
  let sid = getCookie(SESSION_COOKIE);
  if (!sid) {
    sid = generateUUID();
    // 30-minute session cookie
    setCookie(SESSION_COOKIE, sid, 30 / 1440);
  }
  return sid;
}

/** Detect device type from userAgent. */
export function getDeviceType(): "mobile" | "tablet" | "desktop" {
  if (!isBrowser) return "desktop";
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua))
    return "mobile";
  return "desktop";
}
