"use client";

import { useCallback } from "react";
import {
  getConsentStatus,
  getOrCreateVisitorId,
  getOrCreateSessionId,
  getDeviceType,
} from "@/lib/utils/cookies";

/** Reads UTM params from the current URL search string. */
function getUTMParams() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source:   p.get("utm_source")   ?? undefined,
    utm_medium:   p.get("utm_medium")   ?? undefined,
    utm_campaign: p.get("utm_campaign") ?? undefined,
  };
}

/**
 * Returns two helpers:
 *  - trackPageView()          – call once per route change
 *  - trackEvent(name, meta)   – call for any user action
 *
 * Both are no-ops if the user has not accepted cookies.
 */
export function useAnalytics() {
  const post = useCallback(async (payload: Record<string, unknown>) => {
    if (getConsentStatus() !== "accepted") return;
    try {
      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // Silently ignore — analytics must never interrupt UX
    }
  }, []);

  const trackPageView = useCallback(() => {
    const visitor_id = getOrCreateVisitorId();
    const session_id = getOrCreateSessionId();
    post({
      type: "pageview",
      visitor_id,
      session_id,
      page:     typeof window !== "undefined" ? window.location.pathname : "/",
      referrer: typeof document !== "undefined" ? document.referrer : undefined,
      device:   getDeviceType(),
      ...getUTMParams(),
    });
  }, [post]);

  const trackEvent = useCallback(
    (event: string, metadata?: Record<string, unknown>) => {
      const visitor_id = getOrCreateVisitorId();
      const session_id = getOrCreateSessionId();
      post({
        type: "event",
        visitor_id,
        session_id,
        event,
        page: typeof window !== "undefined" ? window.location.pathname : "/",
        metadata: metadata ?? null,
      });
    },
    [post]
  );

  return { trackPageView, trackEvent };
}
