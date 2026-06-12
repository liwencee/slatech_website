import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@/lib/mailer";

type ChatMessage = { role: "user" | "assistant"; content: string };

// Quick-reply labels to exclude from transcript — they're buttons, not real conversation
const SKIP_LABELS = new Set([
  "👉 Get a free quote", "📖 Learn about services", "🤖 Ask AI anything",
  "👀 Just browsing", "💬 Get a quote", "📖 View services", "🤖 Ask AI",
  "📲 Chat on WhatsApp", "🏠 Back to menu", "🏠 Back to start",
  "💬 Continue on WhatsApp", "📩 Get a free quote",
]);

function buildTranscriptRows(messages: ChatMessage[], displayName: string): string {
  return messages
    .filter((m) => m.content && !SKIP_LABELS.has(m.content))
    .map((m) => {
      const sender = m.role === "user" ? (displayName || "You") : "Slatech AI";
      const bg     = m.role === "user" ? "#e91761" : "#115279";
      const body   = String(m.content).replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>");
      return `
        <tr style="border-top:1px solid #f3f4f6;">
          <td style="padding:10px 14px;vertical-align:top;white-space:nowrap;">
            <span style="display:inline-block;padding:2px 9px;border-radius:20px;font-size:11px;font-weight:700;background:${bg};color:#fff;">${sender}</span>
          </td>
          <td style="padding:10px 14px;font-size:13px;line-height:1.6;color:#374151;">${body}</td>
        </tr>`;
    })
    .join("");
}

export async function GET() {
  return NextResponse.json({ status: "chat-followup route is live" });
}

export async function POST(req: NextRequest) {
  try {
    const { email, name, messages, sessionId } = await req.json() as {
      email: string;
      name?: string;
      messages: ChatMessage[];
      sessionId?: string;
    };

    if (!email || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const displayName    = name || "there";
    const transcriptRows = buildTranscriptRows(messages, name || "You");
    const timestamp      = new Date().toLocaleString("en-NG", { timeZone: "Africa/Lagos" });

    /* ---------------------------------------------------------------- */
    /*  Client email — transcript + CTA                                  */
    /* ---------------------------------------------------------------- */
    const clientHtml = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#115279 0%,#1a6d9e 100%);padding:28px 32px 24px;">
          <h1 style="color:#fff;margin:0 0 4px;font-size:22px;font-weight:700;">Your Chat Summary 💬</h1>
          <p style="color:#93c5fd;margin:0;font-size:13px;">Slatech Solutions — AI Assistant</p>
        </div>

        <!-- Body -->
        <div style="padding:28px 32px;">
          <p style="font-size:16px;font-weight:600;margin:0 0 8px;">Hi ${displayName}! 👋</p>
          <p style="font-size:14px;color:#6b7280;margin:0 0 24px;line-height:1.7;">
            Thanks for chatting with Slatech AI. Below is your full conversation, and a member of our team will follow up with you shortly.
          </p>

          <!-- Transcript -->
          <div style="border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;margin-bottom:28px;">
            <div style="background:#f8fafc;padding:10px 16px;border-bottom:1px solid #e5e7eb;">
              <span style="font-size:11px;font-weight:700;letter-spacing:0.07em;color:#6b7280;text-transform:uppercase;">Conversation Transcript</span>
            </div>
            <table style="width:100%;border-collapse:collapse;background:#fff;">
              ${transcriptRows || '<tr><td style="padding:16px;font-size:13px;color:#9ca3af;text-align:center;">No messages to display.</td></tr>'}
            </table>
          </div>

          <!-- CTA -->
          <p style="font-size:14px;color:#374151;margin:0 0 20px;line-height:1.7;">
            Ready to take the next step? Our team is ready to help you grow your business online — websites, branding, SEO, social media, and graphic design.
          </p>
          <div style="text-align:center;margin:24px 0 28px;">
            <a href="https://slatech.com.ng/contact" style="display:inline-block;background:#e91761;color:#fff;padding:13px 26px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;margin:0 6px 10px;">
              📩 Get a Free Quote
            </a>
            <a href="https://wa.me/2348076172456" style="display:inline-block;background:#25D366;color:#fff;padding:13px 26px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;margin:0 6px 10px;">
              💬 WhatsApp Us
            </a>
          </div>

          <!-- Footer -->
          <div style="padding-top:20px;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af;line-height:1.8;">
            <p style="margin:0;">📍 1, Saula Sanni Street, Dalemo Alakuko, Lagos</p>
            <p style="margin:0;">📞 08076172456 &nbsp;·&nbsp; 📧 info@slatech.com.ng</p>
            <p style="margin:4px 0 0;font-size:11px;color:#d1d5db;">${timestamp}</p>
          </div>
        </div>
      </div>`;

    /* ---------------------------------------------------------------- */
    /*  Admin notification — lead alert + transcript                     */
    /* ---------------------------------------------------------------- */
    const adminHtml = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
        <div style="background:#115279;padding:24px 32px;border-radius:12px 12px 0 0;">
          <h1 style="color:#fff;margin:0;font-size:20px;">💬 AI Chat Lead</h1>
          <p style="color:#e91761;margin:4px 0 0;font-size:13px;">Slatech Solutions — AI Chat Follow-up</p>
        </div>
        <div style="background:#f9f9f9;padding:28px 32px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;">
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;font-weight:600;width:90px;color:#555;font-size:14px;">Email</td>
              <td style="padding:8px 0;font-size:14px;"><a href="mailto:${email}" style="color:#e91761;">${email}</a></td>
            </tr>
            ${name ? `
            <tr style="border-top:1px solid #e5e7eb;">
              <td style="padding:8px 0;font-weight:600;color:#555;font-size:14px;">Name</td>
              <td style="padding:8px 0;font-size:14px;">${name}</td>
            </tr>` : ""}
            <tr style="border-top:1px solid #e5e7eb;">
              <td style="padding:8px 0;font-weight:600;color:#555;font-size:14px;">Messages</td>
              <td style="padding:8px 0;font-size:14px;">${messages.length}</td>
            </tr>
            <tr style="border-top:1px solid #e5e7eb;">
              <td style="padding:8px 0;font-weight:600;color:#555;font-size:14px;">Time</td>
              <td style="padding:8px 0;font-size:14px;">${timestamp}</td>
            </tr>
            ${sessionId ? `
            <tr style="border-top:1px solid #e5e7eb;">
              <td style="padding:8px 0;font-weight:600;color:#555;font-size:12px;">Session</td>
              <td style="padding:8px 0;font-size:11px;color:#999;">${sessionId}</td>
            </tr>` : ""}
          </table>

          <div style="margin-top:24px;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
            <div style="background:#f1f5f9;padding:10px 16px;border-bottom:1px solid #e5e7eb;">
              <span style="font-size:11px;font-weight:700;letter-spacing:0.07em;color:#64748b;text-transform:uppercase;">Transcript</span>
            </div>
            <table style="width:100%;border-collapse:collapse;background:#fff;">
              ${transcriptRows || '<tr><td style="padding:16px;font-size:13px;color:#9ca3af;">No transcript available.</td></tr>'}
            </table>
          </div>
        </div>
      </div>`;

    const [clientResult, adminResult] = await Promise.allSettled([
      transporter.sendMail({
        from:    `"Slatech Solutions" <info@slatech.com.ng>`,
        to:      email,
        replyTo: "info@slatech.com.ng",
        subject: `Your conversation with Slatech AI 💬`,
        html:    clientHtml,
      }),
      transporter.sendMail({
        from:    `"Slatech Chat Bot" <info@slatech.com.ng>`,
        to:      "info@slatech.com.ng",
        replyTo: email,
        subject: `💬 AI Chat Lead: ${name || email}`,
        html:    adminHtml,
      }),
    ]);

    if (clientResult.status === "rejected") {
      console.error("Client follow-up email failed:", clientResult.reason);
    }
    if (adminResult.status === "rejected") {
      console.error("Admin follow-up email failed:", adminResult.reason);
    }

    // Return success as long as at least one email went through
    if (clientResult.status === "rejected" && adminResult.status === "rejected") {
      return NextResponse.json({ error: "All emails failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Chat follow-up error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
