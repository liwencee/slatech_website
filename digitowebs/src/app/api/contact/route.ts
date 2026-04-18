import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, service, message } =
      await req.json();

    /* ── Validation ─────────────────────────────────────────────── */
    if (!firstName || !lastName || !email || !service || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

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
              <td style="padding:10px 0;font-size:14px;">${firstName} ${lastName}</td>
            </tr>
            <tr style="border-top:1px solid #e5e7eb;">
              <td style="padding:10px 0;font-weight:600;color:#555;font-size:14px;">Email</td>
              <td style="padding:10px 0;font-size:14px;"><a href="mailto:${email}" style="color:#e91761;">${email}</a></td>
            </tr>
            ${phone ? `
            <tr style="border-top:1px solid #e5e7eb;">
              <td style="padding:10px 0;font-weight:600;color:#555;font-size:14px;">Phone</td>
              <td style="padding:10px 0;font-size:14px;">${phone}</td>
            </tr>` : ""}
            <tr style="border-top:1px solid #e5e7eb;">
              <td style="padding:10px 0;font-weight:600;color:#555;font-size:14px;">Service</td>
              <td style="padding:10px 0;font-size:14px;">
                <span style="background:#e91761;color:#fff;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:600;">
                  ${service}
                </span>
              </td>
            </tr>
            <tr style="border-top:1px solid #e5e7eb;">
              <td style="padding:10px 0;font-weight:600;color:#555;font-size:14px;vertical-align:top;">Message</td>
              <td style="padding:10px 0;font-size:14px;line-height:1.6;">${message.replace(/\n/g, "<br/>")}</td>
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
