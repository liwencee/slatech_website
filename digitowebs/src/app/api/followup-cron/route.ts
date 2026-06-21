import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { transporter } from "@/lib/mailer";

// Env vars required at BUILD TIME (NEXT_PUBLIC_* are inlined by next build):
//   NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, CRON_SECRET

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

// Maps a service to a one-line value statement for the email recap.
function valueStatement(service: string | null): string {
  const map: Record<string, string> = {
    "Website Design": "A fast, modern website tailored to convert visitors into paying customers",
    "Logo & Branding": "A bold, memorable brand identity that makes your business stand out",
    "SEO": "A tailored SEO strategy to get your business ranking on the first page of Google",
    "Social Media Management": "Consistent, engaging social media that grows your audience and sales",
    "Graphic Design": "Eye-catching designs that communicate your brand professionally",
    "E-Commerce Website": "A secure online store built to maximise sales and customer trust",
  };
  if (service && map[service]) return map[service];
  return "A tailored digital solution to help your business grow online";
}

function followUpHtml(
  name: string | null,
  services: string | null,
  details: string | null
) {
  const hi = name ? `Hi ${name}` : "Hi there";
  const serviceText = services && services !== "Not specified" ? services : "your project";
  const requestSummary = details && details.trim()
    ? details
    : (services && services !== "Not specified" ? services : "Growing your business online");

  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
      <div style="background:#115279;padding:28px 32px 24px;">
        <h1 style="color:#fff;margin:0 0 4px;font-size:20px;font-weight:700;">Following Up on Your Recent Inquiry</h1>
        <p style="color:#93c5fd;margin:0;font-size:13px;">Slatech Solutions Ltd</p>
      </div>
      <div style="padding:28px 32px;">
        <p style="font-size:15px;font-weight:600;margin:0 0 14px;">${hi},</p>
        <p style="font-size:14px;color:#374151;margin:0 0 16px;line-height:1.7;">
          I hope you're doing well!
        </p>
        <p style="font-size:14px;color:#374151;margin:0 0 16px;line-height:1.7;">
          A couple of days ago, you reached out to us through Slatech Solutions Ltd,
          and we wanted to follow up to make sure your inquiry is getting the attention
          it deserves.
        </p>
        <p style="font-size:14px;color:#374151;margin:0 0 20px;line-height:1.7;">
          We understand that things can get busy, so we just wanted to gently remind you
          that our team is ready to help with <strong>${serviceText}</strong> — and we'd
          love to pick up right where we left off.
        </p>

        <div style="background:#f8fafc;border-left:3px solid #e91761;padding:16px 20px;margin:0 0 22px;border-radius:0 8px 8px 0;">
          <p style="font-size:13px;color:#475569;margin:0 0 10px;line-height:1.6;">
            <strong style="color:#115279;">Here's a quick recap of what we discussed:</strong>
          </p>
          <p style="font-size:13px;color:#475569;margin:0 0 8px;line-height:1.6;">
            <strong>Your request:</strong> ${requestSummary}
          </p>
          <p style="font-size:13px;color:#475569;margin:0 0 8px;line-height:1.6;">
            <strong>What we can offer:</strong> ${valueStatement(services)}
          </p>
          <p style="font-size:13px;color:#475569;margin:0;line-height:1.6;">
            <strong>Next step:</strong> A quick 15–20 minute call to align on your needs
            and map out a clear path forward
          </p>
        </div>

        <p style="font-size:14px;color:#374151;margin:0 0 20px;line-height:1.7;">
          We don't want you to miss out on getting started. If you're still interested,
          simply reply to this email or click below to schedule a call at a time that
          works for you.
        </p>

        <div style="text-align:center;margin:24px 0 24px;">
          <a href="https://wa.me/2348076172456" style="display:inline-block;background:#e91761;color:#fff;padding:14px 30px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">
            📅 Book a Call
          </a>
        </div>

        <p style="font-size:14px;color:#374151;margin:0 0 22px;line-height:1.7;">
          If your needs have changed or you have any questions, we're happy to help —
          just hit reply.
        </p>
        <p style="font-size:14px;color:#374151;margin:0 0 24px;line-height:1.7;">
          Looking forward to hearing from you!
        </p>

        <div style="padding-top:20px;border-top:1px solid #e5e7eb;font-size:13px;color:#475569;line-height:1.7;">
          <p style="margin:0 0 2px;">Warm regards,</p>
          <p style="margin:0;font-weight:700;color:#115279;">Olaide A.</p>
          <p style="margin:0 0 12px;font-size:12px;color:#9ca3af;">Customer Care | Slatech Solutions</p>
          <p style="margin:0;font-size:12px;color:#9ca3af;">
            📞 08076172456 &nbsp;·&nbsp; 🌐 slatech.com.ng &nbsp;·&nbsp; ✉️ info@slatech.com.ng
          </p>
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
    .select("id, name, email, services, details")
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
        subject: "Following Up on Your Recent Inquiry – Slatech Solutions",
        html:    followUpHtml(lead.name, lead.services, lead.details),
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
