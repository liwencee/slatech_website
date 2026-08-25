"use client";

import Script from "next/script";

// Google AdSense
export function AdSense() {
  return (
    <Script
      id="adsbygoogle-init"
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1281541028922081"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
