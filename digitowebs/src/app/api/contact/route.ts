import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@/lib/mailer";
import { escapeHtml } from "@/lib/security/sanitize";
import { enforceRateLimit, getClientIp } from "@/lib/security/rate-limit";

// reCAPTCHA v3 has no checkbox — Google scores every request 0.0 (bot) to
// 1.0 (human) with no user interaction. Below this, treat as likely abuse.
// Kept low: false positives here silently drop real enquiries, whereas the
// per-IP rate limiter is the actual hard stop against abuse volume.
const RECAPTCHA_SCORE_THRESHOLD = 0.3;

/**
 * Server-side reCAPTCHA verification.
 *
 * The widget alone provides no protection — it is client-side and trivially
 * skipped by posting to this route directly. The token must be validated
 * against Google before it's trusted.
 *
 * A MISSING token is NOT treated as a hard rejection: v3 runs invisibly via
 * a background script load, which ad-blockers (a meaningful share of real
 * visitors) commonly block outright, and the site-key/integration mismatch
 * that broke this form earlier is exactly the kind of failure mode that
 * should never lock out a genuine customer. The rate limiter on this route
 * is the actual defense against volume abuse; reCAPTCHA only adds a signal
 * on top when it's actually available.
 *
 * If RECAPTCHA_SECRET_KEY is not configured, verification is skipped
 * entirely.
 */
async function verifyRecaptcha(
  token: unknown,
  ip: string | null
): Promise<{ ok: boolean; reason?: string }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return { ok: true };

  if (!token || typeof token !== "string") {
    console.warn("Contact form: no reCAPTCHA token (script blocked/offline) — allowing, rate limit still applies.");
    return { ok: true };
  }

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(5000),
    });
    const data = (await res.json()) as {
      success?: boolean;
      score?: number;
      "error-codes"?: string[];
    };

    if (!data.success) {
      return { ok: false, reason: data["error-codes"]?.join(",") || "rejected" };
    }
    // v2 keys don't return a score; only enforce the threshold when v3
    // actually supplied one.
    if (typeof data.score === "number" && data.score < RECAPTCHA_SCORE_THRESHOLD) {
      return { ok: false, reason: `low-score:${data.score}` };
    }
    return { ok: true };
  } catch {
    // Google unreachable/timed out. Fail open: rate limiting still applies, and
    // blocking real enquiries because of a third-party outage is worse than
    // letting a small number through.
    console.warn("reCAPTCHA verification unavailable — allowing submission.");
    return { ok: true };
  }
}

export async function POST(req: NextRequest) {
  const limited = await enforceRateLimit(req, "email");
  if (limited) return limited;

  try {
    const { firstName, lastName, email, phone, service, message, recaptchaToken } =
      await req.json();

    /* ── Validation ─────────────────────────────────────────────── */
    if (!firstName || !lastName || !email || !service || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    const captcha = await verifyRecaptcha(recaptchaToken, getClientIp(req.headers));
    if (!captcha.ok) {
      console.warn("Contact form reCAPTCHA rejected:", captcha.reason);
      return NextResponse.json(
        { error: "Bot verification failed. Please refresh and try again." },
        { status: 400 }
      );
    }

    /* ── Escape all user input before HTML interpolation ──────────── */
    const safeFirstName = escapeHtml(firstName);
    const safeLastName  = escapeHtml(lastName);
    const safeEmail     = escapeHtml(email);
    const safePhone     = escapeHtml(phone);
    const safeService   = escapeHtml(service);
    const safeMessage   = escapeHtml(message).replace(/\n/g, "<br/>");

    /* ── Build HTML ─────────────────────────────────────────────── */
    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
        <div style="background:#115279;padding:24px 32px;border-radius:12px 12px 0 0;">
          <h1 style="color:#fff;margin:0;font-size:20px;">New Contact Form Submission</h1>
          <p style="color:#e91761;margin:4px 0 0;font-size:13px;">Slatech Solutions Website</p>
        </div>
        <div style="background:#f9f9f9;padding:32px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;">
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:10px 0;font-weight:600;width:140px;color:#555;font-size:14px;">Name</td>
              <td style="padding:10px 0;font-size:14px;">${safeFirstName} ${safeLastName}</td>
            </tr>
            <tr style="border-top:1px solid #e5e7eb;">
              <td style="padding:10px 0;font-weight:600;color:#555;font-size:14px;">Email</td>
              <td style="padding:10px 0;font-size:14px;"><a href="mailto:${safeEmail}" style="color:#e91761;">${safeEmail}</a></td>
            </tr>
            ${phone ? `
            <tr style="border-top:1px solid #e5e7eb;">
              <td style="padding:10px 0;font-weight:600;color:#555;font-size:14px;">Phone</td>
              <td style="padding:10px 0;font-size:14px;">${safePhone}</td>
            </tr>` : ""}
            <tr style="border-top:1px solid #e5e7eb;">
              <td style="padding:10px 0;font-weight:600;color:#555;font-size:14px;">Service</td>
              <td style="padding:10px 0;font-size:14px;">
                <span style="background:#e91761;color:#fff;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:600;">
                  ${safeService}
                </span>
              </td>
            </tr>
            <tr style="border-top:1px solid #e5e7eb;">
              <td style="padding:10px 0;font-weight:600;color:#555;font-size:14px;vertical-align:top;">Message</td>
              <td style="padding:10px 0;font-size:14px;line-height:1.6;">${safeMessage}</td>
            </tr>
          </table>
          <div style="margin-top:24px;padding-top:20px;border-top:1px solid #e5e7eb;font-size:12px;color:#999;">
            Sent from slatech.com.ng contact form · ${new Date().toLocaleString("en-NG", { timeZone: "Africa/Lagos" })}
          </div>
        </div>
      </div>
    `;

    /* ── Send via Hostinger SMTP ─────────────────────────────────── */
    await transporter.sendMail({
      from:    `"Slatech Solutions" <info@slatech.com.ng>`,
      to:      "info@slatech.com.ng",
      replyTo: email,
      subject: `New Enquiry: ${service} — ${firstName} ${lastName}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }
}
