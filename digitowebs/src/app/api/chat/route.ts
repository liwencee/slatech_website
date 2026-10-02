import { NextRequest, NextResponse } from "next/server";
import { enforceRateLimit } from "@/lib/security/rate-limit";

const SYSTEM_PROMPT = `You are Slatech AI, the helpful virtual assistant for Slatech Solutions — a Nigerian digital product and software development company in Lagos, founded in 2020.

ABOUT SLATECH SOLUTIONS:
- 6+ years of operations | 4.9/5 rating (85 Google reviews)
- Location: 2b, Olaide Tomori, Ikeja, Lagos, Nigeria
- Phone / WhatsApp: +2348076172456
- Email: info@slatech.com.ng

OUR SERVICES & TYPICAL BUDGETS:
1. Website Design — Landing pages from ₦100k, business websites from ₦400k, e-commerce from ₦600k, custom web applications from ₦1.2M+. Mobile-first, fast, and conversion-optimised.
2. Logo & Branding — Logo, brand colours, typography, brand guidelines, visual identity. Budget: ₦50k – ₦300k.
3. SEO (Search Engine Optimization) — Keyword research, on-page SEO, backlink building, Google ranking. Monthly retainer or one-time audit packages.
4. Social Media Management — Content calendar, post design, scheduling, community engagement, analytics. Monthly packages starting from ₦80k.
5. Graphic Design — Flyers, banners, social media graphics, pitch decks, brochures. Per-project pricing from ₦20k.

HOW TO HELP USERS:
- Ask about their business and understand their needs before suggesting services.
- Recommend the most relevant 1-2 services based on what they describe.
- Encourage them to get a free quote for accurate pricing.
- Mention WhatsApp (+2348076172456) for fast responses.
- If they ask about portfolio or past work, direct them to slatech.com.ng/portfolio.

TONE & STYLE:
- Warm, friendly, and professional — like a knowledgeable team member.
- Use Nigerian context where appropriate (₦ for prices, local examples).
- Keep replies concise — 2-4 sentences max per message.
- Use line breaks for readability, avoid walls of text.
- End with a helpful follow-up question when appropriate.
- Never fabricate specific client names, case studies, or prices beyond the ranges above.
- Only discuss topics related to Slatech's services and digital marketing/web design.`;

type AnthropicMessage = { role: "user" | "assistant"; content: string };

const MAX_MESSAGE_CHARS = 2_000;

export async function GET() {
  return NextResponse.json({ status: "chat route is live" });
}

export async function POST(req: NextRequest) {
  // Every call spends Anthropic credits, so an unthrottled endpoint is a
  // direct route to draining the account balance.
  const limited = await enforceRateLimit(req, "public");
  if (limited) return limited;

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { reply: "Our AI assistant is currently unavailable. Please chat with us on WhatsApp at +2348076172456 for immediate help!" },
      { status: 200 }
    );
  }

  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    // Keep last 10 messages for context (saves tokens). Each message is capped
    // because input tokens are billed: an uncapped body lets one request cost
    // as much as thousands of normal ones.
    const recentMessages: AnthropicMessage[] = (messages as AnthropicMessage[])
      .slice(-10)
      .filter((m) => m && (m.role === "user" || m.role === "assistant"))
      .map((m) => ({ role: m.role, content: String(m.content ?? "").slice(0, MAX_MESSAGE_CHARS) }));

    if (recentMessages.length === 0) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method:  "POST",
      headers: {
        "Content-Type":      "application/json",
        "x-api-key":         apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model:      "claude-haiku-4-5-20251001",
        max_tokens: 350,
        system:     SYSTEM_PROMPT,
        messages:   recentMessages,
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error(`Anthropic API error ${response.status}:`, errBody);
      // Surface auth errors clearly in dev
      if (response.status === 401) {
        return NextResponse.json(
          { reply: "Our AI assistant is currently unavailable. Please chat with us on WhatsApp at +2348076172456 for immediate help!" },
          { status: 200 }
        );
      }
      // Low/no credit balance on the Anthropic account
      if (response.status === 400 && errBody.includes("credit balance is too low")) {
        return NextResponse.json(
          { reply: "Our AI assistant is taking a short break for a top-up! 😊 In the meantime, our team is on WhatsApp (+2348076172456) and ready to help right away." },
          { status: 200 }
        );
      }
      throw new Error(`Anthropic API ${response.status}: ${errBody}`);
    }

    const data = await response.json() as {
      content: Array<{ type: string; text?: string }>;
    };

    const reply =
      data.content?.[0]?.type === "text" && data.content[0].text
        ? data.content[0].text
        : "I couldn't process that. How about chatting with our team on WhatsApp?";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("AI chat error:", err);
    return NextResponse.json(
      { reply: "Something went wrong on our side. Our team is on WhatsApp (+2348076172456) and ready to help!" },
      { status: 200 }
    );
  }
}
