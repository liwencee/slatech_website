import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
    }

    const html = `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto;color:#1a1a1a;">
        <div style="background:#115279;padding:20px 28px;border-radius:12px 12px 0 0;">
          <h1 style="color:#fff;margin:0;font-size:18px;">New Newsletter Subscriber</h1>
          <p style="color:#e91761;margin:4px 0 0;font-size:12px;">Slatech Solutions Website</p>
        </div>
        <div style="background:#f9f9f9;padding:24px 28px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;">
          <p style="font-size:14px;margin:0 0 8px;">A new visitor just subscribed to your newsletter:</p>
          <p style="font-size:16px;font-weight:700;color:#e91761;margin:0;">${email}</p>
          <div style="margin-top:20px;padding-top:16px;border-top:1px solid #e5e7eb;font-size:12px;color:#999;">
            Subscribed via slatech.com.ng newsletter · ${new Date().toLocaleString("en-NG", { timeZone: "Africa/Lagos" })}
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from:    `"Slatech Solutions" <info@slatech.com.ng>`,
      to:      "info@slatech.com.ng",
      replyTo: email,
      subject: `New Newsletter Subscriber: ${email}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Newsletter API error:", err);
    return NextResponse.json({ error: "Failed to send notification." }, { status: 500 });
  }
}
