"use client";

import Script from "next/script";

// TrustIndex reviews widget — loads its own floating badge/widget UI.
export function TrustBadge() {
  return (
    <Script
      id="trustindex"
      src="https://cdn.trustindex.io/loader.js?e68b9ca7963f852b7926dc572a2"
      strategy="afterInteractive"
    />
  );
}
