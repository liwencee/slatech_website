import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Use the service-role key so we can bypass RLS and write analytics data.
// This route is server-only — the service key is never exposed to the browser.
function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key || key.length < 40) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, visitor_id, session_id, page, referrer,
            utm_source, utm_medium, utm_campaign,
            device, event, metadata } = body;

    if (!visitor_id || !session_id || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = getAdminClient();

    // If Supabase is not configured, silently succeed (dev / no-key env)
    if (!supabase) {
      return NextResponse.json({ ok: true, stored: false });
    }

    const userAgent = req.headers.get("user-agent") ?? undefined;
    // Best-effort country from Hostinger/Vercel/Cloudflare header
    const country =
      req.headers.get("cf-ipcountry") ??
      req.headers.get("x-vercel-ip-country") ??
      undefined;

    if (type === "pageview") {
      await supabase.from("analytics_visitors").insert({
        visitor_id,
        session_id,
        page: page ?? "/",
        referrer: referrer ?? null,
        utm_source: utm_source ?? null,
        utm_medium: utm_medium ?? null,
        utm_campaign: utm_campaign ?? null,
        device: device ?? null,
        user_agent: userAgent ?? null,
        country: country ?? null,
      });
    }

    if (type === "event" && event) {
      await supabase.from("analytics_events").insert({
        visitor_id,
        session_id,
        event,
        page: page ?? null,
        metadata: metadata ?? null,
      });
    }

    return NextResponse.json({ ok: true, stored: true });
  } catch (err) {
    // Never break the user experience for an analytics failure
    console.error("Analytics route error:", err);
    return NextResponse.json({ ok: true, stored: false });
  }
}
