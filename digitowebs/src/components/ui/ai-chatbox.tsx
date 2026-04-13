"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const FAQ_RESPONSES: Record<string, string> = {
  pricing:
    "Our pricing depends on your project requirements. A basic website starts from N150,000, e-commerce from N350,000, and fully managed solutions from N500,000. Contact us for a custom quote!",
  services:
    "We offer Website Design, E-Commerce Development, SEO Optimization, Website Hosting, Website Management, and Fully Managed Services. Visit our Services page for details!",
  contact:
    "You can reach us at 08076172456, email info@slatech.com.ng, or visit our office at No 2b Olaide Tomori Str, off Simbiat Abiola Way, Ikeja, Lagos.",
  timeline:
    "Project timelines vary: a basic website takes 1-2 weeks, e-commerce 3-4 weeks, and complex custom projects 4-8 weeks. We always deliver on time!",
  hosting:
    "We provide fast, reliable hosting with 99.9% uptime, free SSL certificates, daily backups, and 24/7 technical support. Plans start from N5,000/month.",
  seo:
    "Our SEO services include keyword research, on-page optimization, technical SEO audits, link building, and monthly performance reports to boost your rankings.",
  portfolio:
    "We've completed 2,000+ projects across industries including travel, healthcare, education, real estate, and e-commerce. Check our Portfolio page for examples!",
  payment:
    "We accept bank transfers, online payments, and can arrange flexible payment plans. Typically, we require 50% upfront and 50% on completion.",
  support:
    "We provide 24/7 support via WhatsApp, email, and phone. Our team is always available to help with any technical issues or questions.",
  about:
    "Slatech Solutions is a leading web design agency with 10+ years of experience, 2,000+ projects delivered, and 500+ happy clients. We turn ideas into powerful digital brands!",
};

function findResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.match(/pric|cost|how much|budget|afford|cheap|expensive|quote/))
    return FAQ_RESPONSES.pricing;
  if (lower.match(/service|offer|what do you|what can you|provide/))
    return FAQ_RESPONSES.services;
  if (lower.match(/contact|reach|phone|email|address|office|location|where/))
    return FAQ_RESPONSES.contact;
  if (lower.match(/time|long|duration|deadline|deliver|when|how fast|turnaround/))
    return FAQ_RESPONSES.timeline;
  if (lower.match(/host|server|uptime|domain|ssl/))
    return FAQ_RESPONSES.hosting;
  if (lower.match(/seo|search engine|rank|google|traffic|keyword/))
    return FAQ_RESPONSES.seo;
  if (lower.match(/portfolio|project|work|example|client|case stud/))
    return FAQ_RESPONSES.portfolio;
  if (lower.match(/pay|payment|transfer|installment|deposit/))
    return FAQ_RESPONSES.payment;
  if (lower.match(/support|help|issue|problem|maintain|fix/))
    return FAQ_RESPONSES.support;
  if (lower.match(/about|who|company|team|experience|year/))
    return FAQ_RESPONSES.about;
  if (lower.match(/hi|hello|hey|good morning|good afternoon|good evening/))
    return "Hello! Welcome to Slatech Solutions. How can I help you today? You can ask about our services, pricing, timeline, or anything else!";
  if (lower.match(/thank|thanks|appreciate/))
    return "You're welcome! Is there anything else I can help you with? Feel free to ask anytime.";
  if (lower.match(/bye|goodbye|see you/))
    return "Goodbye! If you need anything else, don't hesitate to reach out. Have a great day!";

  return "Thanks for your question! For more specific inquiries, please contact us directly at 08076172456 or info@slatech.com.ng. You can also ask me about our services, pricing, timeline, hosting, SEO, or support!";
}

export function AIChatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi there! I'm Slatech's virtual assistant. How can I help you today? Ask me about our services, pricing, timeline, or anything else!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = findResponse(trimmed);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    "What services do you offer?",
    "How much does a website cost?",
    "How long does a project take?",
  ];

  return (
    <div id="ai-chatbox">
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
          isOpen ? "bg-secondary rotate-0" : "bg-primary"
        }`}
        style={isOpen ? undefined : { animation: "bounce 2s infinite" }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[9999] w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-border overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-secondary text-white p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-sm">Slatech Assistant</p>
              <p className="text-xs text-gray-300 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                Online
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-accent/50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-white rounded-br-md"
                      : "bg-white text-foreground border border-border rounded-bl-md shadow-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-border rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div className="px-4 py-2 border-t border-border bg-white flex flex-wrap gap-2">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setMessages((prev) => [...prev, { role: "user", content: q }]);
                    setIsTyping(true);
                    setTimeout(() => {
                      setMessages((prev) => [...prev, { role: "assistant", content: findResponse(q) }]);
                      setIsTyping(false);
                    }, 800);
                  }}
                  className="text-xs px-3 py-1.5 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-border bg-white flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2.5 text-sm border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-all disabled:opacity-40 disabled:hover:bg-primary hover:scale-105 active:scale-95 shrink-0"
              aria-label="Send message"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
