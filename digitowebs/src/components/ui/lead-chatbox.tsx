"use client";

import { useState, useRef, useEffect } from "react";

type Step = "greeting" | "name" | "email" | "service" | "message" | "sending" | "done";

const SERVICES = [
  "Website Design",
  "Logo & Branding",
  "SEO",
  "Social Media Management",
  "Graphic Design",
  "E-Commerce Website",
  "Other",
];

export function LeadChatbox() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("greeting");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [step]);

  async function handleSubmit() {
    setStep("sending");
    setError("");
    try {
      const res = await fetch("/api/chatbot-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || null,
          email: email || null,
          services: service ? [service] : [],
          budget: null,
          details: message || null,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStep("done");
    } catch {
      setError("Something went wrong. Please try WhatsApp instead.");
      setStep("message");
    }
  }

  function reset() {
    setStep("greeting");
    setName("");
    setEmail("");
    setService("");
    setMessage("");
    setError("");
  }

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat"
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition-transform hover:scale-110 active:scale-95"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
            <path d="M7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z" />
          </svg>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-green-500" />
          </span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-5 right-5 z-50 flex w-[360px] max-w-[calc(100vw-2rem)] flex-col rounded-2xl border border-border bg-white shadow-2xl overflow-hidden"
          style={{ maxHeight: "min(580px, calc(100vh - 5rem))" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-secondary px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold text-sm">S</div>
              <div>
                <p className="text-sm font-bold text-white">Slatech Solutions</p>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 inline-block" />
                  Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/2348076172456"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#20bd5a] transition-colors"
              >
                <svg viewBox="0 0 32 32" className="h-4 w-4 fill-white" aria-hidden="true">
                  <path d="M16.004 2.667c-7.36 0-13.333 5.973-13.333 13.333 0 2.347.613 4.64 1.776 6.661L2.667 29.333l6.84-1.792a13.27 13.27 0 0 0 6.497 1.654h.005c7.355 0 13.333-5.973 13.333-13.333 0-3.563-1.387-6.911-3.91-9.434a13.24 13.24 0 0 0-9.433-3.761Zm0 24.405h-.004a11.06 11.06 0 0 1-5.638-1.544l-.404-.24-4.06 1.064 1.083-3.957-.263-.406a11.03 11.03 0 0 1-1.692-5.889c0-6.117 4.977-11.094 11.099-11.094 2.964 0 5.749 1.155 7.844 3.252a11.02 11.02 0 0 1 3.25 7.847c0 6.118-4.977 11.094-11.098 11.094Zm6.088-8.31c-.333-.167-1.974-.974-2.28-1.085-.305-.111-.528-.167-.75.167-.223.333-.861 1.085-1.056 1.308-.195.222-.389.25-.722.083-.333-.167-1.408-.519-2.682-1.655-.991-.884-1.66-1.977-1.855-2.31-.194-.334-.02-.514.146-.68.15-.149.333-.389.5-.584.166-.194.222-.333.333-.555.111-.223.056-.417-.028-.584-.083-.167-.75-1.808-1.027-2.475-.27-.65-.546-.562-.75-.572l-.639-.011a1.23 1.23 0 0 0-.889.417c-.305.333-1.166 1.139-1.166 2.78 0 1.64 1.194 3.225 1.36 3.448.167.222 2.35 3.588 5.694 5.031.796.344 1.417.55 1.9.704.799.254 1.526.218 2.101.132.641-.096 1.974-.807 2.252-1.586.277-.78.277-1.448.194-1.587-.083-.139-.305-.222-.638-.389Z" />
                </svg>
                WhatsApp
              </a>
              <button onClick={() => setOpen(false)} className="text-gray-300 hover:text-white transition-colors" aria-label="Close chat">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50" style={{ minHeight: 260 }}>
            {/* Bot greeting */}
            <BotMsg text="Welcome to Slatech Solutions! 👋 We help businesses grow with stunning websites, bold branding, smart SEO, and more." />
            <BotMsg text="Leave your details below and our team will get back to you shortly." />

            {step === "greeting" && (
              <div className="flex justify-center pt-2">
                <button onClick={() => setStep("name")} className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-sm">
                  Get Started
                </button>
              </div>
            )}

            {/* Name */}
            {step !== "greeting" && (
              <>
                <BotMsg text="What's your name?" />
                {step === "name" ? (
                  <InputRow
                    value={name}
                    onChange={setName}
                    placeholder="Your name"
                    onSubmit={() => { if (name.trim()) setStep("email"); }}
                  />
                ) : (
                  <UserMsg text={name} />
                )}
              </>
            )}

            {/* Email */}
            {["email", "service", "message", "sending", "done"].includes(step) && (
              <>
                <BotMsg text="What's your email address?" />
                {step === "email" ? (
                  <InputRow
                    value={email}
                    onChange={setEmail}
                    placeholder="your@email.com"
                    type="email"
                    onSubmit={() => {
                      if (email.trim() && email.includes("@")) setStep("service");
                    }}
                  />
                ) : (
                  <UserMsg text={email} />
                )}
              </>
            )}

            {/* Service */}
            {["service", "message", "sending", "done"].includes(step) && (
              <>
                <BotMsg text="What service are you interested in?" />
                {step === "service" ? (
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((s) => (
                      <button
                        key={s}
                        onClick={() => { setService(s); setStep("message"); }}
                        className="px-3 py-1.5 bg-white border border-border text-xs font-medium rounded-full hover:border-primary hover:text-primary transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                ) : (
                  <UserMsg text={service} />
                )}
              </>
            )}

            {/* Message */}
            {["message", "sending", "done"].includes(step) && (
              <>
                <BotMsg text="Any details you'd like to share? (optional — or tap Send)" />
                {step === "message" ? (
                  <div className="space-y-2">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your project..."
                      rows={2}
                      className="w-full rounded-xl border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                    />
                    {error && <p className="text-xs text-red-500">{error}</p>}
                    <button
                      onClick={handleSubmit}
                      className="w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors"
                    >
                      Send Message
                    </button>
                  </div>
                ) : step === "sending" ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </div>
                ) : null}
              </>
            )}

            {/* Done */}
            {step === "done" && (
              <>
                <BotMsg text={`Thank you for contacting Slatech Solutions, ${name || "friend"}! 🙏 Our technical staff will reach out to you soon. You can also get us on 08076172456.`} />
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="https://wa.me/2348076172456"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#25D366] text-white text-xs font-semibold rounded-full hover:bg-[#20bd5a] transition-colors"
                  >
                    Chat on WhatsApp
                  </a>
                  <button
                    onClick={reset}
                    className="px-4 py-2 bg-gray-200 text-gray-700 text-xs font-semibold rounded-full hover:bg-gray-300 transition-colors"
                  >
                    Start Over
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border bg-white px-4 py-2 text-center">
            <p className="text-[10px] text-muted-foreground">
              Powered by <span className="font-semibold text-primary">Slatech Solutions</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function BotMsg({ text }: { text: string }) {
  return (
    <div className="flex gap-2 items-start">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold mt-0.5">S</div>
      <div className="rounded-2xl rounded-tl-md bg-white border border-border px-3.5 py-2 text-sm text-foreground leading-relaxed max-w-[85%] shadow-sm">
        {text}
      </div>
    </div>
  );
}

function UserMsg({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div className="rounded-2xl rounded-tr-md bg-primary px-3.5 py-2 text-sm text-white leading-relaxed max-w-[85%]">
        {text}
      </div>
    </div>
  );
}

function InputRow({
  value,
  onChange,
  placeholder,
  type = "text",
  onSubmit,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  onSubmit: () => void;
}) {
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
      className="flex gap-2"
    >
      <input
        autoFocus
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 rounded-xl border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
      <button
        type="submit"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
      </button>
    </form>
  );
}
