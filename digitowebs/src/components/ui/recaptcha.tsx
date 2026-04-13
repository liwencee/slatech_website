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

interface RecaptchaProps {
  siteKey?: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
}

export function Recaptcha({ siteKey, onVerify, onExpire }: RecaptchaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);
  const key = siteKey || process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

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
