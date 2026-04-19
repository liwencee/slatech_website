"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAnalytics } from "@/hooks/use-analytics";
import { getConsentStatus } from "@/lib/utils/cookies";

/**
 * Drop this once in the root layout.
 * Fires a page-view event whenever the pathname changes AND the user
 * has accepted cookies. No-op on decline.
 */
export function AnalyticsTracker() {
  const pathname = usePathname();
  const { trackPageView } = useAnalytics();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    // Wait a tick for the cookie to be readable
    const timer = setTimeout(() => {
      if (getConsentStatus() !== "accepted") return;
      if (pathname === lastPath.current) return;
      lastPath.current = pathname;
      trackPageView();
    }, 200);

    return () => clearTimeout(timer);
  }, [pathname, trackPageView]);

  return null; // renders nothing
}
