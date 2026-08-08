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

/**
 * reCAPTCHA v3 has no checkbox — it runs an invisible background check and
 * returns a single-use token scored 0..1 by Google. Call this right before
 * submitting a protected form; the token expires quickly, so don't fetch it
 * ahead of time and hold onto it.
 */
export async function getRecaptchaToken(
  action: string,
  siteKey: string = RECAPTCHA_SITE_KEY
): Promise<string | null> {
  if (!siteKey) return null;
  try {
    await loadRecaptchaScript(siteKey);
    return await new Promise<string>((resolve, reject) => {
      window.grecaptcha!.ready(() => {
        window
          .grecaptcha!.execute(siteKey, { action })
          .then(resolve)
          .catch(reject);
      });
    });
  } catch (err) {
    console.error("reCAPTCHA v3 execute failed:", err);
    return null;
  }
}
