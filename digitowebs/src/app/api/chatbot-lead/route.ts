import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, services, budget, details } = await req.json();

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
    }

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
        <div style="background:#115279;padding:24px 32px;border-radius:12px 12px 0 0;">
          <h1 style="color:#fff;margin:0;font-size:20px;">New Chatbot Lead</h1>
          <p style="color:#e91761;margin:4px 0 0;font-size:13px;">Slatech Solutions Website — AI Chatbot</p>
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
              <td style="padding:10px 0;font-size:14px;">
                ${(services || []).map((s: string) => `<span style="background:#e91761;color:#fff;padding:2px 8px;border-radius:20px;font-size:12px;font-weight:600;margin-right:4px;">${s}</span>`).join("") || "Not specified"}
              </td>
            </tr>
            <tr style="border-top:1px solid #e5e7eb;">
              <td style="padding:10px 0;font-weight:600;color:#555;font-size:14px;">Budget</td>
              <td style="padding:10px 0;font-size:14px;">${budget || "Not specified"}</td>
            </tr>
            ${details ? `
            <tr style="border-top:1px solid #e5e7eb;">
              <td style="padding:10px 0;font-weight:600;color:#555;font-size:14px;vertical-align:top;">Details</td>
              <td style="padding:10px 0;font-size:14px;line-height:1.6;">${details.replace(/\n/g, "<br/>")}</td>
            </tr>` : ""}
          </table>
          <div style="margin-top:24px;padding-top:20px;border-top:1px solid #e5e7eb;font-size:12px;color:#999;">
            Captured via AI chatbot on slatech.com.ng · ${new Date().toLocaleString("en-NG", { timeZone: "Africa/Lagos" })}
          </div>
        </div>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Slatech Chatbot <contact@mail.slatech.com.ng>",
        to: ["info@slatech.com.ng"],
        ...(email ? { reply_to: email } : {}),
        subject: `New Chatbot Lead: ${name || "Unknown"} — ${(services || []).join(", ") || "General Inquiry"}`,
        html,
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      console.error("Resend chatbot lead error:", errData);
      return NextResponse.json({ error: "Failed to send lead." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Chatbot lead API error:", err);
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
