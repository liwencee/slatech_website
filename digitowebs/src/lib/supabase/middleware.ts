import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Skip Supabase entirely if env vars are missing or look like placeholders.
  // Real Supabase anon keys are JWTs (~200+ chars, start with "eyJ").
  // This prevents the whole middleware from crashing on local dev without
  // real Supabase credentials — which would otherwise make every API call
  // (including /api/contact) fail with a generic "Network error" in the browser.
  if (!url || !key || key.length < 40 || !key.startsWith("eyJ")) {
    return supabaseResponse;
  }

  try {
    let response = supabaseResponse;

    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    });

    // Refresh the session with a 3-second timeout.
    // Without a timeout, a slow/unreachable Supabase will hang every request
    // and cause a 504 Gateway Timeout across the entire site.
    const { data: { user } } = await Promise.race([
      supabase.auth.getUser(),
      new Promise<{ data: { user: null } }>((resolve) =>
        setTimeout(() => resolve({ data: { user: null } }), 3000)
      ),
    ]);

    // Protect /admin routes
    if (request.nextUrl.pathname.startsWith("/admin")) {
      if (!user) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/login";
        redirectUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
      }

      // Check user role
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (!profile || !["admin", "editor"].includes(profile.role)) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/";
        return NextResponse.redirect(redirectUrl);
      }
    }

    // Redirect authenticated users away from login
    if (request.nextUrl.pathname === "/login" && user) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/admin";
      return NextResponse.redirect(redirectUrl);
    }

    return response;
  } catch (err) {
    // Never let Supabase failures break the request pipeline —
    // public pages and API routes (contact, chatbot, newsletter) must keep working.
    console.error("Supabase middleware error (continuing):", err);
    return supabaseResponse;
  }
}
