import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { transporter } from "@/lib/mailer";

// Requires NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY,
// SUPABASE_SERVICE_ROLE_KEY, and CRON_SECRET to be set in the
// hosting environment at build time (NEXT_PUBLIC_* vars are inlined
// during `next build`, so a rebuild is required after changing them).

/**
 * Automated 2-day client follow-up.
 *
 * Trigger this once a day with a Hostinger cron job:
 *   curl -s "https://slatech.com.ng/api/followup-cron?key=YOUR_CRON_SECRET"
 *
 * It finds every chatbot lead that:
 *   - has an email
 *   - was created at least 2 days ago
 *   - has NOT already been followed up
 * …emails them a friendly nudge, and marks them as followed up so
 * they're never emailed twice.
 *
 * Protect it with the CRON_SECRET env var so the public can't trigger it.
 */

const FOLLOW_UP_AFTER_DAYS = 2;

function followUpHtml(name: string | null) {
  const hi = name ? `Hi ${name}` : "Hi there";
  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
      <div style="background:linear-gradient(135deg,#115279 0%,#1a6d9e 100%);padding:28px 32px 24px;">
        <h1 style="color:#fff;margin:0 0 4px;font-size:22px;font-weight:700;">Still thinking it over? 🤔</h1>
        <p style="color:#93c5fd;margin:0;font-size:13px;">Slatech Solutions</p>
      </div>
      <div style="padding:28px 32px;">
        <p style="font-size:16px;font-weight:600;margin:0 0 8px;">${hi}! 👋</p>
        <p style="font-size:14px;color:#374151;margin:0 0 18px;line-height:1.7;">
          A couple of days ago you reached out to us about growing your business online —
          and we didn't want you to miss out. Whether it's a stunning website, bold branding,
          smart SEO, social media, or graphic design, our team is ready to help you stand out.
        </p>
        <p style="font-size:14px;color:#374151;margin:0 0 22px;line-height:1.7;">
          Reply to this email or tap a button below and we'll get you a free, no-obligation
          quote right away. 🚀
        </p>
        <div style="text-align:center;margin:24px 0 28px;">
          <a href="https://slatech.com.ng/contact" style="display:inline-block;background:#e91761;color:#fff;padding:13px 26px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;margin:0 6px 10px;">
            📩 Get My Free Quote
          </a>
          <a href="https://wa.me/2348076172456" style="display:inline-block;background:#25D366;color:#fff;padding:13px 26px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;margin:0 6px 10px;">
            💬 Chat on WhatsApp
          </a>
        </div>
        <div style="padding-top:20px;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af;line-height:1.8;">
          <p style="margin:0;">📍 2b, Olaide Tomori, Ikeja, Lagos, Nigeria</p>
          <p style="margin:0;">📞 08076172456 &nbsp;·&nbsp; 📧 info@slatech.com.ng</p>
        </div>
      </div>
    </div>`;
}

async function runFollowUps() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const cutoff = new Date(
    Date.now() - FOLLOW_UP_AFTER_DAYS * 24 * 60 * 60 * 1000
  ).toISOString();

  // Oldest un-followed-up leads with an email, created >= 2 days ago.
  const { data: leads, error } = await supabase
    .from("chatbot_leads")
    .select("id, name, email")
    .eq("follow_up_sent", false)
    .not("email", "is", null)
    .lte("created_at", cutoff)
    .order("created_at", { ascending: true })
    .limit(100);

  if (error) throw new Error(`Supabase query failed: ${error.message}`);
  if (!leads || leads.length === 0) {
    return { processed: 0, sent: 0, failed: 0 };
  }

  let sent = 0;
  let failed = 0;

  for (const lead of leads) {
    if (!lead.email) continue;
    try {
      await transporter.sendMail({
        from:    `"Slatech Solutions" <info@slatech.com.ng>`,
        to:      lead.email,
        replyTo: "info@slatech.com.ng",
        subject: "Still want to grow your business online? 🚀",
        html:    followUpHtml(lead.name),
      });

      await supabase
        .from("chatbot_leads")
        .update({ follow_up_sent: true, follow_up_sent_at: new Date().toISOString() })
        .eq("id", lead.id);

      sent++;
    } catch (mailErr) {
      console.error(`Follow-up failed for lead ${lead.id}:`, mailErr);
      failed++;
    }
  }

  return { processed: leads.length, sent, failed };
}

async function authorizeAndRun(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "CRON_SECRET is not configured on the server." },
      { status: 500 }
    );
  }

  const url = new URL(req.url);
  const provided =
    url.searchParams.get("key") ||
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (provided !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await runFollowUps();
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error("Follow-up cron error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return authorizeAndRun(req);
}

export async function POST(req: NextRequest) {
  return authorizeAndRun(req);
}
