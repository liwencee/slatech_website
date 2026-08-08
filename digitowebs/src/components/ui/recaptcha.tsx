"use client";

import { useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      render: (container: HTMLElement, options: Record<string, unknown>) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
    };
    onRecaptchaLoad?: () => void;
  }
}

/**
 * reCAPTCHA v2 site keys are not secret — Google designed them to be public;
 * they're visible in the rendered HTML of every site that uses reCAPTCHA.
 * Only the secret key (verified server-side in /api/contact) must stay
 * protected, and it does — it's read live via process.env at request time.
 *
 * This fallback exists because NEXT_PUBLIC_* vars must be present at
 * `next build` time to be inlined into the client bundle, and Hostinger's
 * build step does not appear to have access to the same environment
 * variables the running server does (unlike server-only vars, which are
 * read live and always pick up hPanel's configured value). Hardcoding this
 * public value sidesteps that platform quirk entirely.
 */
export const RECAPTCHA_SITE_KEY_FALLBACK = "6LeA6NcqAAAAAI6mYIJw22DTdpkOSSAABiWOa-6r";

interface RecaptchaProps {
  siteKey?: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
  /**
   * Increment to clear the checkbox — a reCAPTCHA token is single-use, so the
   * widget must be reset after each submission or the next attempt replays a
   * spent token and is rejected server-side.
   */
  resetTrigger?: number;
}

export function Recaptcha({ siteKey, onVerify, onExpire, resetTrigger = 0 }: RecaptchaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);
  const key = siteKey || process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || RECAPTCHA_SITE_KEY_FALLBACK;

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.grecaptcha || widgetId.current !== null) return;
    try {
      widgetId.current = window.grecaptcha.render(containerRef.current, {
        sitekey: key,
        callback: onVerify,
        "expired-callback": onExpire,
        theme: "light",
        size: "normal",
      });
    } catch {
      // Widget may already be rendered
    }
  }, [key, onVerify, onExpire]);

  useEffect(() => {
    if (!key) return;

    // If script already loaded
    if (window.grecaptcha && typeof window.grecaptcha.render === "function") {
      window.grecaptcha.ready(renderWidget);
      return;
    }

    // Load reCAPTCHA script
    window.onRecaptchaLoad = () => {
      window.grecaptcha.ready(renderWidget);
    };

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      delete window.onRecaptchaLoad;
    };
  }, [key, renderWidget]);

  // Clear the checkbox when the parent signals a completed submission.
  useEffect(() => {
    if (resetTrigger === 0 || widgetId.current === null) return;
    try {
      window.grecaptcha?.reset(widgetId.current);
    } catch {
      // Widget may have been torn down — nothing to reset.
    }
  }, [resetTrigger]);

  if (!key) {
    return (
      <div className="text-xs text-muted-foreground bg-accent rounded-lg p-3 text-center">
        reCAPTCHA will appear here once configured.
        <br />
        <span className="text-[10px]">Set NEXT_PUBLIC_RECAPTCHA_SITE_KEY in .env.local</span>
      </div>
    );
  }

  return <div ref={containerRef} className="flex justify-center" />;
}
