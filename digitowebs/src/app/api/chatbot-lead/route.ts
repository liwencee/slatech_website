import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  return NextResponse.json({ status: "chatbot-lead route is live" });
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, services, budget, details } = await req.json();

    // Use the same credentials as the working contact form
    const transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST || "smtp.hostinger.com",
      port:   Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER || "info@slatech.com.ng",
        pass: process.env.SMTP_PASS || "",
      },
    });

    const serviceList = Array.isArray(services) && services.length
      ? services.join(", ")
      : "Not specified";

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
        <div style="background:#115279;padding:24px 32px;border-radius:12px 12px 0 0;">
          <h1 style="color:#fff;margin:0;font-size:20px;">🤖 New Chatbot Lead</h1>
          <p style="color:#e91761;margin:4px 0 0;font-size:13px;">Slatech Solutions — AI Chatbot</p>
        </div>
        <div style="background:#f9f9f9;padding:32px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;">
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:10px 0;font-weight:600;width:140px;color:#555;font-size:14px;">Name</td>
              <td style="padding:10px 0;font-size:14px;">${name || "Not provided"}</td>
            </tr>
            <tr style="border-top:1px solid #e5e7eb;">
              <td style="padding:10px 0;font-weight:600;color:#555;font-size:14px;">Email</td>
              <td style="padding:10px 0;font-size:14px;">
                ${email ? `<a href="mailto:${email}" style="color:#e91761;">${email}</a>` : "Not provided"}
              </td>
            </tr>
            <tr style="border-top:1px solid #e5e7eb;">
              <td style="padding:10px 0;font-weight:600;color:#555;font-size:14px;">Services</td>
              <td style="padding:10px 0;font-size:14px;">${serviceList}</td>
            </tr>
            <tr style="border-top:1px solid #e5e7eb;">
              <td style="padding:10px 0;font-weight:600;color:#555;font-size:14px;">Budget</td>
              <td style="padding:10px 0;font-size:14px;">${budget || "Not specified"}</td>
            </tr>
            ${details ? `
            <tr style="border-top:1px solid #e5e7eb;">
              <td style="padding:10px 0;font-weight:600;color:#555;font-size:14px;vertical-align:top;">Details</td>
              <td style="padding:10px 0;font-size:14px;line-height:1.6;">${String(details).replace(/\n/g, "<br/>")}</td>
            </tr>` : ""}
          </table>
          <div style="margin-top:24px;padding-top:20px;border-top:1px solid #e5e7eb;font-size:12px;color:#999;">
            Captured via AI chatbot · ${new Date().toLocaleString("en-NG", { timeZone: "Africa/Lagos" })}
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from:    `"Slatech Chatbot" <info@slatech.com.ng>`,
      to:      "info@slatech.com.ng",
      ...(email ? { replyTo: email } : {}),
      subject: `🤖 Chatbot Lead: ${name || "Unknown"} — ${serviceList}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Chatbot lead error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
