"use client";

import Script from "next/script";

/**
 * Live Chat (Tawk.to) — real human live chat.
 *
 * SETUP (one-time, ~2 minutes):
 *   1. Create a free account at https://www.tawk.to
 *   2. Dashboard → Administration → Channels → Chat Widget
 *   3. Copy the "Widget Code" — it ends with:  embed.tawk.to/PROPERTY_ID/WIDGET_ID
 *   4. Put that "PROPERTY_ID/WIDGET_ID" part in an env var on Hostinger:
 *        NEXT_PUBLIC_TAWKTO_ID=xxxxxxxxxxxxxxxxxxxxxxxx/1abcd2efg
 *   5. Redeploy. The chat bubble appears bottom-right automatically.
 *
 * Reply to visitors from the free Tawk.to dashboard or the mobile app
 * (iOS / Android) so the team gets notified on their phones.
 */
export function LiveChat() {
  const tawkId = process.env.NEXT_PUBLIC_TAWKTO_ID;

  // Don't inject anything until a real Tawk.to ID is configured.
  if (!tawkId) return null;

  return (
    <Script id="tawk-to" strategy="afterInteractive">
      {`
        var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
        (function () {
          var s1 = document.createElement("script"),
              s0 = document.getElementsByTagName("script")[0];
          s1.async = true;
          s1.src = "https://embed.tawk.to/${tawkId}";
          s1.charset = "UTF-8";
          s1.setAttribute("crossorigin", "*");
          s0.parentNode.insertBefore(s1, s0);
        })();
      `}
    </Script>
  );
}
