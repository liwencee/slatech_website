"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getConsentStatus,
  setConsent,
  ConsentStatus,
} from "@/lib/utils/cookies";
import { useAnalytics } from "@/hooks/use-analytics";

export function CookieConsent() {
  const [status, setStatus] = useState<ConsentStatus | "loading">("loading");
  const { trackPageView } = useAnalytics();

  // Read the stored consent preference after mount (avoids SSR mismatch)
  useEffect(() => {
    setStatus(getConsentStatus());
  }, []);

  const accept = () => {
    setConsent("accepted");
    setStatus("accepted");
    // Fire the first page view immediately after accepting
    setTimeout(trackPageView, 100);
  };

  const decline = () => {
    setConsent("declined");
    setStatus("declined");
  };

  // Hidden during SSR, hidden once a decision has been made
  if (status !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-[9998] p-4 sm:p-6 animate-fade-in-up"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Accent bar */}
        <div className="h-1 bg-gradient-to-r from-primary via-primary-dark to-secondary" />

        <div className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Cookie icon */}
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground mb-1">
              We use cookies to improve your experience 🍪
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We use cookies to understand how visitors use our site so we can
              improve it. No personal data is sold or shared with third parties.{" "}
              <Link
                href="/privacy"
                className="text-primary underline underline-offset-2 hover:text-primary-dark"
              >
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={decline}
              className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-medium text-muted-foreground border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-foreground transition-all duration-200"
            >
              Decline
            </button>
            <button
              onClick={accept}
              className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-primary-dark shadow-sm shadow-primary/20 hover:shadow-primary/30 hover:scale-105 transition-all duration-200"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
