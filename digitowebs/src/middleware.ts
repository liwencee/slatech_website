import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Security headers applied to every response
const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
};

export async function middleware(request: NextRequest) {
  // 1. Supabase session refresh + auth protection
  //    Wrap in try/catch so Supabase failures NEVER break public pages or
  //    API routes (contact form, chatbot, newsletter). updateSession now
  //    handles its own errors, but this is belt-and-suspenders.
  let response: NextResponse;
  try {
    response = await updateSession(request);
  } catch (err) {
    console.error("Middleware error (falling through):", err);
    response = NextResponse.next({ request });
  }

  // 2. Apply security headers
  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }

  // 3. Content Security Policy
  // NOTE: No nonce — Next.js inline hydration scripts don't carry a nonce by
  // default, so adding one here would block ALL client-side JavaScript in
  // production. 'unsafe-inline' is required for Next.js to function.
  const isDev = process.env.NODE_ENV === "development";
  const csp = [
    `default-src 'self'`,
    // 'unsafe-inline' is required for Next.js hydration scripts
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.google.com https://www.gstatic.com`,
    `style-src 'self' 'unsafe-inline'`,
    // Allow images from self, data URIs, Supabase storage, Google, and HTTPS (for profile photos)
    `img-src 'self' data: blob: https:`,
    `font-src 'self' data:`,
    // Allow connections to Supabase and WhatsApp (used by chatbot)
    `connect-src 'self' https://*.supabase.co wss://*.supabase.co https://wa.me`,
    `frame-src https://www.google.com https://maps.google.com`,
    `frame-ancestors 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
  ].join("; ");

  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
