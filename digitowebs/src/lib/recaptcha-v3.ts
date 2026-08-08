"use client";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

/**
 * Confirmed against the Google reCAPTCHA admin console: type v3, domain
 * slatech.com.ng authorized. v3 site keys are meant to be public (they ship
 * in every page's HTML) — only the secret key is sensitive, and that stays
 * server-side in RECAPTCHA_SECRET_KEY, read live via process.env.
 */
export const RECAPTCHA_SITE_KEY = "6LeA6NcqAAAAAI6mYIJw22DTdpkOSSAABiWOa-6r";

let scriptLoadPromise: Promise<void> | null = null;

function loadRecaptchaScript(siteKey: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.grecaptcha) return Promise.resolve();
  if (scriptLoadPromise) return scriptLoadPromise;

  scriptLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptLoadPromise = null; // allow retry on a later submit attempt
      reject(new Error("Failed to load reCAPTCHA script"));
    };
    document.head.appendChild(script);
  });
  return scriptLoadPromise;
}

// Google's own script/network calls are outside our control (CSP gaps,
// ad-blockers, outages, or a future Google-side change can all make its
// promise never settle at all — this happened in production: execute()
// simply hung forever with no error, freezing the submit button). A form
// must never be held hostage by a third-party script, so every call here is
// raced against a hard deadline; timing out returns null exactly like any
// other unavailability, and the server already treats null as
// unverified-but-allowed.
const RECAPTCHA_TIMEOUT_MS = 4000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("reCAPTCHA timed out")), ms);
    promise.then(
      (v) => { clearTimeout(timer); resolve(v); },
      (e) => { clearTimeout(timer); reject(e); }
    );
  });
}

/**
 * reCAPTCHA v3 has no checkbox — it runs an invisible background check and
 * returns a single-use token scored 0..1 by Google. Call this right before
 * submitting a protected form; the token expires quickly, so don't fetch it
 * ahead of time and hold onto it.
 *
 * Never throws and never hangs: any failure (script blocked, Google down,
 * timeout) resolves to null rather than rejecting or stalling forever, so a
 * broken reCAPTCHA can never prevent a real submission from going through.
 */
export async function getRecaptchaToken(
  action: string,
  siteKey: string = RECAPTCHA_SITE_KEY
): Promise<string | null> {
  if (!siteKey) return null;
  try {
    return await withTimeout(
      (async () => {
        await loadRecaptchaScript(siteKey);
        return new Promise<string>((resolve, reject) => {
          window.grecaptcha!.ready(() => {
            window
              .grecaptcha!.execute(siteKey, { action })
              .then(resolve)
              .catch(reject);
          });
        });
      })(),
      RECAPTCHA_TIMEOUT_MS
    );
  } catch (err) {
    console.error("reCAPTCHA v3 unavailable:", err);
    return null;
  }
}
