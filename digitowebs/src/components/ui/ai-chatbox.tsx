"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useAnalytics } from "@/hooks/use-analytics";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Message = {
  role: "user" | "assistant";
  content: string;
};

type QuickReply = {
  label: string;
  action: () => void;
};

type ChatNode =
  | "greeting"
  | "a1_name" | "a2_email" | "a3_services" | "a4_details" | "a4_budget" | "a5_confirmation"
  | "b1_menu" | "b2_response"
  | "c1_welcome" | "c2_reengage"
  | "ai_chat"
  | "offline_name" | "offline_email" | "offline_message" | "offline_done";

type FormData = {
  name: string; email: string; services: string[];
  budget: string; details: string; message: string;
};

type SavedSession = {
  messages: Message[];
  aiHistory: { role: "user" | "assistant"; content: string }[];
  node: ChatNode;
  isAIMode: boolean;
  capturedEmail: string;
  capturedName: string;
  followupSent: boolean;
  ts: number;
};

const WHATSAPP_NUMBER  = "2348076172456";
const STORAGE_KEY      = "slatech_chat_v1";
const SESSION_ID_KEY   = "slatech_sid";
const SESSION_TTL_MS   = 24 * 60 * 60 * 1000; // 24 h
const EMAIL_REGEX      = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

const SERVICE_OPTIONS = [
  "Website Design", "Logo & Branding", "SEO",
  "Social Media Management", "Graphic Design", "Full package — let's do it all!",
];

const SERVICE_RESPONSES: Record<string, { emoji: string; text: string }> = {
  "Branding & Logo": {
    emoji: "🎨",
    text: "At Slatech Solutions, we craft identities that stop the scroll. From logo design to full brand guidelines, we make sure your business looks unforgettable — online and offline.\n\n🔥 Trusted by startups and established businesses across Nigeria and beyond.\n\nReady to build your brand?",
  },
  "Website Design": {
    emoji: "💻",
    text: "We build fast, beautiful, mobile-ready websites that actually convert visitors into customers — not just look pretty.\n\nWhether you need a landing page, e-commerce store, or a full corporate site, Slatech has you covered.\n\nShall we build something great together?",
  },
  SEO: {
    emoji: "📈",
    text: "What's the point of a great website if nobody finds it? Our SEO service puts Slatech's clients on page one — driving real organic traffic and real results.\n\nWant more people to find your business?",
  },
  "Social Media": {
    emoji: "📱",
    text: "We handle your content, posting schedule, engagement, and strategy — so you can focus on running your business while your audience grows on autopilot.\n\nLet's grow your following!",
  },
  "Graphic Design": {
    emoji: "✏️",
    text: "From flyers and banners to social media graphics and pitch decks — we design visuals that communicate your message powerfully and professionally.\n\nNeed something designed?",
  },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function genSessionId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function loadSession(): SavedSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw) as SavedSession;
    if (Date.now() - (saved.ts || 0) > SESSION_TTL_MS) return null;
    if (!saved.messages?.length) return null;
    return saved;
  } catch { return null; }
}

function saveSession(data: Omit<SavedSession, "ts">) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, ts: Date.now() }));
  } catch { /* storage full — silently skip */ }
}

function clearSession() {
  try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function AIChatbox() {
  const [isOpen, setIsOpen]                         = useState(false);
  const [messages, setMessages]                     = useState<Message[]>([]);
  const [currentNode, setCurrentNode]               = useState<ChatNode>("greeting");
  const [quickReplies, setQuickReplies]             = useState<QuickReply[]>([]);
  const [input, setInput]                           = useState("");
  const [isTyping, setIsTyping]                     = useState(false);
  const [formData, setFormData]                     = useState<FormData>({
    name: "", email: "", services: [], budget: "", details: "", message: "",
  });
  const [selectedServices, setSelectedServices]     = useState<string[]>([]);
  const [showServicePicker, setShowServicePicker]   = useState(false);
  const [hasGreeted, setHasGreeted]                 = useState(false);
  const [showNotification, setShowNotification]     = useState(false);
  const [isAIMode, setIsAIMode]                     = useState(false);

  // Memory & follow-up state
  const [capturedEmail, setCapturedEmail]           = useState("");
  const [capturedName, setCapturedName]             = useState("");
  const [followupSent, setFollowupSent]             = useState(false);
  const [showEmailWidget, setShowEmailWidget]       = useState(false);
  const [emailWidgetInput, setEmailWidgetInput]     = useState("");
  const [showResumeBanner, setShowResumeBanner]     = useState(false);

  const formDataRef      = useRef(formData);
  const aiHistoryRef     = useRef<{ role: "user" | "assistant"; content: string }[]>([]);
  const messagesRef      = useRef(messages);       // stable ref for close-handler
  const capturedEmailRef = useRef(capturedEmail);
  const capturedNameRef  = useRef(capturedName);
  const followupSentRef  = useRef(followupSent);
  const sessionIdRef     = useRef("");
  const prevIsOpenRef    = useRef(false);

  const messagesEndRef   = useRef<HTMLDivElement>(null);
  const inputRef         = useRef<HTMLInputElement>(null);
  const reengageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep refs in sync
  useEffect(() => { formDataRef.current      = formData;       }, [formData]);
  useEffect(() => { messagesRef.current      = messages;       }, [messages]);
  useEffect(() => { capturedEmailRef.current = capturedEmail;  }, [capturedEmail]);
  useEffect(() => { capturedNameRef.current  = capturedName;   }, [capturedName]);
  useEffect(() => { followupSentRef.current  = followupSent;   }, [followupSent]);

  const { trackEvent } = useAnalytics();

  /* ---------------------------------------------------------------- */
  /*  Restore session from localStorage on mount                       */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    // Session ID
    let sid = localStorage.getItem(SESSION_ID_KEY);
    if (!sid) { sid = genSessionId(); localStorage.setItem(SESSION_ID_KEY, sid); }
    sessionIdRef.current = sid;

    const saved = loadSession();
    if (!saved) return;

    setMessages(saved.messages);
    aiHistoryRef.current = saved.aiHistory ?? [];
    setCurrentNode(saved.node ?? "greeting");
    setIsAIMode(saved.isAIMode ?? false);
    if (saved.capturedEmail) setCapturedEmail(saved.capturedEmail);
    if (saved.capturedName)  setCapturedName(saved.capturedName);
    if (saved.followupSent)  setFollowupSent(true);
    setHasGreeted(true);
    setShowResumeBanner(true);
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Persist conversation to localStorage on every change             */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    if (!messages.length) return;
    saveSession({
      messages,
      aiHistory: aiHistoryRef.current,
      node: currentNode,
      isAIMode,
      capturedEmail,
      capturedName,
      followupSent,
    });
  }, [messages, currentNode, isAIMode, capturedEmail, capturedName, followupSent]);

  /* ---------------------------------------------------------------- */
  /*  Auto-scroll, focus, notification                                 */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!isOpen && !hasGreeted) setShowNotification(true);
    }, 3000);
    return () => clearTimeout(t);
  }, [isOpen, hasGreeted]);

  useEffect(() => {
    return () => { if (reengageTimerRef.current) clearTimeout(reengageTimerRef.current); };
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Send follow-up email                                             */
  /* ---------------------------------------------------------------- */

  const sendFollowUp = useCallback(
    async (email: string, name: string, msgs: Message[]) => {
      if (!email || !msgs.length) return;
      if (followupSentRef.current) return; // dedup

      setFollowupSent(true);
      trackEvent("chat_followup_sent", { email });

      fetch("/api/chat-followup", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: name || "",
          messages: msgs,
          sessionId: sessionIdRef.current,
        }),
      }).catch((err) => console.error("Follow-up send error:", err));
    },
    [trackEvent]
  );

  /* ---------------------------------------------------------------- */
  /*  Trigger follow-up when chat is closed with email captured        */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    if (prevIsOpenRef.current && !isOpen) {
      const email = capturedEmailRef.current || formDataRef.current.email;
      const name  = capturedNameRef.current  || formDataRef.current.name;
      if (email && messagesRef.current.length > 0) {
        sendFollowUp(email, name, messagesRef.current);
      }
    }
    prevIsOpenRef.current = isOpen;
  }, [isOpen, sendFollowUp]);

  /* ---------------------------------------------------------------- */
  /*  Bot message helper                                               */
  /* ---------------------------------------------------------------- */

  const botSay = useCallback(
    (text: string, thenReplies?: QuickReply[], delay = 600) => {
      setIsTyping(true);
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "assistant", content: text }]);
        setIsTyping(false);
        if (thenReplies) setQuickReplies(thenReplies);
        else setQuickReplies([]);
      }, delay);
    },
    []
  );

  /* ---------------------------------------------------------------- */
  /*  WhatsApp redirect                                                */
  /* ---------------------------------------------------------------- */

  const forwardToWhatsApp = useCallback(
    (extraMessage?: string) => {
      const parts: string[] = [];
      const fd = formDataRef.current;
      const ce = capturedEmailRef.current;
      const cn = capturedNameRef.current;
      if (cn || fd.name)       parts.push(`Name: ${cn || fd.name}`);
      if (ce || fd.email)      parts.push(`Email: ${ce || fd.email}`);
      if (fd.services.length)  parts.push(`Services: ${fd.services.join(", ")}`);
      if (fd.budget)           parts.push(`Budget: ${fd.budget}`);
      if (fd.details)          parts.push(`Details: ${fd.details}`);
      if (extraMessage)        parts.push(`Message: ${extraMessage}`);

      const text = parts.length > 0
        ? `Hi Slatech! I'd like to discuss a project.\n\n${parts.join("\n")}`
        : "Hi Slatech! I'd like to discuss a project.";

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
    },
    []
  );

  /* ---------------------------------------------------------------- */
  /*  Clear / New chat                                                 */
  /* ---------------------------------------------------------------- */

  const clearChat = useCallback(() => {
    setMessages([]);
    setCurrentNode("greeting");
    setIsAIMode(false);
    setCapturedEmail("");
    setCapturedName("");
    setFollowupSent(false);
    setShowEmailWidget(false);
    setEmailWidgetInput("");
    setShowResumeBanner(false);
    setFormData({ name: "", email: "", services: [], budget: "", details: "", message: "" });
    setSelectedServices([]);
    aiHistoryRef.current = [];
    clearSession();
    // startGreeting accessed via closure below
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Branch A — Quote Request Flow                                    */
  /* ---------------------------------------------------------------- */

  const goToQuoteFlow = useCallback(() => {
    setMessages((prev) => [...prev, { role: "user", content: "👉 Get a free quote" }]);
    setCurrentNode("a1_name");
    setIsAIMode(false);
    setQuickReplies([]);
    botSay("Amazing! Let's get you sorted. This will only take 2 minutes 😊\n\nFirst, what's your name?");
  }, [botSay]);

  const handleA1Name = useCallback((name: string) => {
    setFormData((prev) => ({ ...prev, name }));
    setCurrentNode("a2_email");
    botSay(`Nice to meet you, ${name}! 🙌\n\nWhat's the best email address for us to reach you?`);
  }, [botSay]);

  const handleA2Email = useCallback((email: string) => {
    setFormData((prev) => ({ ...prev, email }));
    setCurrentNode("a3_services");
    setShowServicePicker(true);
    botSay("Perfect! Now the fun part — which services are you interested in? (Pick as many as you like!)");
    trackEvent("chatbot_lead_early", { name: formDataRef.current.name });
    fetch("/api/chatbot-lead", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formDataRef.current.name, email, services: [],
        budget: "Not yet provided", details: "Lead captured at email step — still in conversation",
      }),
    }).catch((err) => console.error("Early lead capture error:", err));
  }, [botSay, trackEvent]);

  const handleA3ServicesSubmit = useCallback(() => {
    if (selectedServices.length === 0) return;
    setFormData((prev) => {
      const next = { ...prev, services: selectedServices };
      formDataRef.current = next;
      return next;
    });
    setShowServicePicker(false);
    setMessages((prev) => [...prev, { role: "user", content: selectedServices.join(", ") }]);
    setCurrentNode("a4_details");
    botSay("Great choices! Tell us a little about your business — what do you do and who are your customers?");
  }, [selectedServices, botSay]);

  const handleA4Budget = useCallback((budget: string) => {
    const snap    = formDataRef.current;
    const updated = { ...snap, budget };
    formDataRef.current = updated;
    setFormData(updated);
    setMessages((prev) => [...prev, { role: "user", content: budget }]);
    setCurrentNode("a5_confirmation");
    trackEvent("chatbot_lead_complete", { services: updated.services, budget });
    fetch("/api/chatbot-lead", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: updated.name, email: updated.email, services: updated.services, budget, details: updated.details }),
    }).catch((err) => console.error("Final lead error:", err));

    botSay(
      `Thank you for contacting Slatech Solutions, ${updated.name || "there"}! 🙏\n\nOur technical staff will reach out to you soon. You can also get us on 08076172456.\n\nWant to continue the conversation on WhatsApp for a faster response?`,
      [
        { label: "💬 Continue on WhatsApp", action: () => forwardToWhatsApp() },
        { label: "🏠 Back to start",        action: () => startGreeting()      },
      ]
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [botSay, forwardToWhatsApp, trackEvent]);

  const handleA4Details = useCallback((details: string) => {
    setFormData((prev) => { const next = { ...prev, details }; formDataRef.current = next; return next; });
    setCurrentNode("a4_budget");
    botSay(
      "Do you have a rough budget in mind?",
      ["Under ₦200k", "₦200k – ₦500k", "₦500k – ₦1M", "₦1M+", "Not sure yet"].map((b) => ({
        label: b, action: () => handleA4Budget(b),
      }))
    );
  }, [botSay, handleA4Budget]);

  /* ---------------------------------------------------------------- */
  /*  Branch D — AI Chat                                               */
  /* ---------------------------------------------------------------- */

  const handleAIChat = useCallback(async (text: string) => {
    // Capture email if found in user's message
    const emailMatch = text.match(EMAIL_REGEX);
    if (emailMatch && !capturedEmailRef.current) {
      setCapturedEmail(emailMatch[0]);
    }

    aiHistoryRef.current = [...aiHistoryRef.current, { role: "user", content: text }];

    setIsTyping(true);
    setQuickReplies([]);

    try {
      const res  = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: aiHistoryRef.current }),
      });
      const data = await res.json();
      const reply: string = data.reply || "I'm having trouble right now. Our team on WhatsApp can help instantly!";

      // Try to capture name from AI reply ("Nice to meet you, [Name]!")
      if (!capturedNameRef.current) {
        const nameMatch = reply.match(/(?:nice to meet you|great to meet you|hi there),?\s+([A-Z][a-z]+)/i);
        if (nameMatch?.[1]) setCapturedName(nameMatch[1]);
      }

      aiHistoryRef.current = [...aiHistoryRef.current, { role: "assistant", content: reply }];
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);

      setQuickReplies([
        { label: "📩 Get a free quote",  action: () => goToQuoteFlow()          },
        { label: "📲 Chat on WhatsApp",  action: () => forwardToWhatsApp(text)  },
        { label: "🏠 Back to menu",      action: () => startGreeting()          },
      ]);
    } catch {
      setIsTyping(false);
      botSay("Oops! Something went wrong. Let me connect you with our team directly.", [
        { label: "📲 Chat on WhatsApp", action: () => forwardToWhatsApp(text) },
        { label: "🏠 Back to menu",     action: () => startGreeting()         },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [botSay, goToQuoteFlow, forwardToWhatsApp]);

  const goToAIChat = useCallback(() => {
    setMessages((prev) => [...prev, { role: "user", content: "🤖 Ask AI anything" }]);
    setCurrentNode("ai_chat");
    setIsAIMode(true);
    aiHistoryRef.current = [];
    trackEvent("chatbot_ai_mode_open");
    botSay("Hi! I'm Slatech AI 👋\n\nAsk me anything — about our services, pricing, what's best for your business, or just pick my brain about digital marketing!\n\nWhat would you like to know?");
  }, [botSay, trackEvent]);

  /* ---------------------------------------------------------------- */
  /*  Greeting                                                         */
  /* ---------------------------------------------------------------- */

  const startGreeting = useCallback(() => {
    setMessages([]);
    setCurrentNode("greeting");
    setIsAIMode(false);
    aiHistoryRef.current = [];
    setShowResumeBanner(false);

    botSay(
      "Welcome to Slatech Solutions!\n\nWe help businesses grow with stunning websites, bold branding, smart SEO, social media management, and eye-catching graphic design.\n\nWhat brings you here today?",
      [
        { label: "👉 Get a free quote",     action: () => goToQuoteFlow()    },
        { label: "📖 Learn about services", action: () => goToServicesMenu() },
        { label: "🤖 Ask AI anything",      action: () => goToAIChat()       },
        { label: "👀 Just browsing",        action: () => goToJustBrowsing() },
      ],
      400
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [botSay]);

  // First open
  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setHasGreeted(true);
      setShowNotification(false);
      startGreeting();
    }
  }, [isOpen, hasGreeted, startGreeting]);

  /* ---------------------------------------------------------------- */
  /*  Branch B — Services Info                                         */
  /* ---------------------------------------------------------------- */

  const showServiceDetail = useCallback((serviceName: string) => {
    setMessages((prev) => [...prev, { role: "user", content: serviceName }]);
    setCurrentNode("b2_response");
    const resp = SERVICE_RESPONSES[serviceName];
    botSay(resp?.text || "Tell us more about what you need!", [
      { label: "💬 Get a free quote",   action: () => goToQuoteFlow()                                    },
      { label: "🔙 See other services", action: () => goToServicesMenu()                                 },
      { label: "📲 Chat on WhatsApp",   action: () => forwardToWhatsApp(`Interested in: ${serviceName}`) },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [botSay, forwardToWhatsApp]);

  const goToServicesMenu = useCallback(() => {
    setMessages((prev) => [...prev, { role: "user", content: "📖 Learn about services" }]);
    setCurrentNode("b1_menu");
    botSay(
      "We'd love to walk you through what we do! Which area are you most curious about?",
      Object.entries(SERVICE_RESPONSES).map(([name, { emoji }]) => ({
        label: `${emoji} ${name}`, action: () => showServiceDetail(name),
      }))
    );
  }, [botSay, showServiceDetail]);

  /* ---------------------------------------------------------------- */
  /*  Branch C — Just Browsing                                         */
  /* ---------------------------------------------------------------- */

  const goToJustBrowsing = useCallback(() => {
    setMessages((prev) => [...prev, { role: "user", content: "👀 Just browsing" }]);
    setCurrentNode("c1_welcome");
    botSay(
      "No problem at all — feel free to look around! 😊\n\nIf you have any questions about what we do at Slatech Solutions — branding, websites, SEO, social media, or graphic design — just say the word.\n\nWe don't bite. We just build great brands. 😄",
      [
        { label: "💬 Get a quote",   action: () => goToQuoteFlow()    },
        { label: "📖 View services", action: () => goToServicesMenu() },
        { label: "🤖 Ask AI",        action: () => goToAIChat()       },
      ]
    );
    if (reengageTimerRef.current) clearTimeout(reengageTimerRef.current);
    reengageTimerRef.current = setTimeout(() => {
      setCurrentNode("c2_reengage");
      botSay(
        "Still with us? 👀\n\nJust a reminder — we offer free consultations for businesses looking to level up their digital presence.\n\nNo commitment, just a conversation. Interested?",
        [
          { label: "💬 Sure, let's chat", action: () => goToQuoteFlow() },
          { label: "👋 Maybe later",      action: () => botSay("No worries! We're here whenever you're ready. Have a great day! 😊") },
        ]
      );
    }, 60000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [botSay, goToQuoteFlow, goToServicesMenu, goToAIChat]);

  /* ---------------------------------------------------------------- */
  /*  Input handler                                                    */
  /* ---------------------------------------------------------------- */

  const handleUserInput = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");

    switch (currentNode) {
      case "a1_name":         handleA1Name(trimmed);    break;
      case "a2_email":        handleA2Email(trimmed);   break;
      case "a4_details":      handleA4Details(trimmed); break;
      case "offline_name":
        setFormData((p) => ({ ...p, name: trimmed }));
        setCurrentNode("offline_email");
        botSay("Thanks! And your email address?");
        break;
      case "offline_email":
        setFormData((p) => ({ ...p, email: trimmed }));
        setCurrentNode("offline_message");
        botSay("What can we help you with? Leave a quick note:");
        break;
      case "offline_message":
        setFormData((p) => ({ ...p, message: trimmed }));
        setCurrentNode("offline_done");
        botSay("Thank you for contacting Slatech Solutions! 🙏 Our team will be in touch. You can also reach us on 08076172456.", [
          { label: "📲 Continue on WhatsApp", action: () => forwardToWhatsApp(trimmed) },
        ]);
        break;
      default:
        handleAIChat(trimmed);
        break;
    }
  }, [input, currentNode, handleA1Name, handleA2Email, handleA4Details, handleAIChat, botSay, forwardToWhatsApp]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (showServicePicker) handleA3ServicesSubmit();
      else handleUserInput();
    }
  };

  const toggleService = (service: string) =>
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );

  /* ---------------------------------------------------------------- */
  /*  Email widget — send transcript to user                           */
  /* ---------------------------------------------------------------- */

  const userMsgCount = messages.filter(
    (m) => m.role === "user" && !m.content.startsWith("🤖") && !m.content.startsWith("👉")
  ).length;
  const showEmailPrompt = isAIMode && userMsgCount >= 2 && !capturedEmail && !showEmailWidget;

  const handleEmailWidgetSubmit = useCallback(() => {
    const em = emailWidgetInput.trim();
    if (!em || !EMAIL_REGEX.test(em)) return;
    setCapturedEmail(em);
    setShowEmailWidget(false);
    sendFollowUp(em, capturedNameRef.current, messagesRef.current);
    botSay("Done! 📧 We'll email you this chat summary and follow up with you shortly. Is there anything else I can help with?");
  }, [emailWidgetInput, sendFollowUp, botSay]);

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div id="ai-chatbox">
      {/* Notification bubble */}
      {showNotification && !isOpen && (
        <div className="fixed bottom-[82px] right-5 z-[9999] bg-white rounded-xl shadow-lg border border-border px-4 py-3 max-w-[240px] animate-fade-in">
          <button
            onClick={() => setShowNotification(false)}
            className="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500 hover:bg-gray-300"
          >
            &times;
          </button>
          <p className="text-sm text-foreground">
            Need help? Chat with our AI or get a free quote! 💬
          </p>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => {
          if (!isOpen) trackEvent("chatbot_open");
          setIsOpen((v) => !v);
          setShowNotification(false);
        }}
        className={`fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer ${
          isOpen ? "bg-secondary" : "bg-primary"
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

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-[88px] left-3 right-3 sm:left-auto sm:right-6 sm:w-[370px] z-[9999] bg-white rounded-2xl shadow-2xl border border-border overflow-hidden animate-fade-in">

          {/* ── Header ── */}
          <div className="bg-secondary text-white px-3 py-3 sm:px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                {isAIMode ? (
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                )}
              </div>
              <div>
                <p className="font-semibold text-sm">{isAIMode ? "Slatech AI" : "Slatech Bot"}</p>
                <p className="text-xs text-gray-300 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                  {isAIMode ? "AI-powered · Online" : "Online"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* New chat button */}
              <button
                onClick={() => { clearChat(); setTimeout(() => startGreeting(), 50); }}
                title="New chat"
                className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-medium px-3 py-1.5 rounded-full transition-colors ml-1"
                title="Chat on WhatsApp"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>

          {/* ── AI mode banner ── */}
          {isAIMode && (
            <div className="bg-primary/5 border-b border-primary/10 px-4 py-2 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <p className="text-xs text-primary font-medium flex-1">AI-powered — ask me anything</p>
              {capturedEmail && (
                <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Saved
                </span>
              )}
            </div>
          )}

          {/* ── Email capture prompt (AI mode, after 2 exchanges) ── */}
          {showEmailPrompt && !showEmailWidget && (
            <div className="bg-amber-50 border-b border-amber-100 px-4 py-2 flex items-center justify-between gap-3">
              <p className="text-xs text-amber-800">Get this chat + follow-up via email?</p>
              <button
                onClick={() => setShowEmailWidget(true)}
                className="text-xs font-semibold text-primary hover:underline whitespace-nowrap cursor-pointer"
              >
                📧 Yes, send me
              </button>
            </div>
          )}

          {/* ── Email widget form ── */}
          {showEmailWidget && !capturedEmail && (
            <div className="bg-amber-50 border-b border-amber-100 px-4 py-3 space-y-2">
              <p className="text-xs text-amber-900 font-medium">Enter your email — we'll send a transcript + follow up:</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={emailWidgetInput}
                  onChange={(e) => setEmailWidgetInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleEmailWidgetSubmit()}
                  placeholder="you@example.com"
                  className="flex-1 px-3 py-1.5 text-xs border border-amber-200 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
                <button
                  onClick={handleEmailWidgetSubmit}
                  disabled={!emailWidgetInput.trim()}
                  className="px-3 py-1.5 text-xs bg-primary text-white rounded-full hover:bg-primary-dark transition-colors disabled:opacity-40 cursor-pointer"
                >
                  Send
                </button>
                <button
                  onClick={() => setShowEmailWidget(false)}
                  className="px-2 py-1.5 text-xs text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* ── Messages area ── */}
          <div className="h-[260px] sm:h-[300px] overflow-y-auto p-3 sm:p-4 space-y-3 bg-accent/30">

            {/* Resume banner */}
            {showResumeBanner && (
              <div className="flex justify-center">
                <div className="bg-white border border-border rounded-xl px-3 py-2 text-xs text-muted-foreground shadow-sm flex items-center gap-2">
                  <span>💬 Continuing previous chat</span>
                  <button
                    onClick={() => { clearChat(); setTimeout(() => startGreeting(), 50); }}
                    className="text-primary font-semibold hover:underline cursor-pointer"
                  >
                    New chat
                  </button>
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-primary text-white rounded-br-sm"
                      : "bg-white text-foreground border border-border rounded-bl-sm shadow-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1.5">
                    {[0, 150, 300].map((delay) => (
                      <span key={delay} className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* ── Service Picker ── */}
          {showServicePicker && (
            <div className="px-3 py-2 sm:px-4 sm:py-3 border-t border-border bg-white space-y-2">
              <p className="text-xs text-muted-foreground font-medium">Select services:</p>
              <div className="grid grid-cols-1 gap-1.5 max-h-40 overflow-y-auto">
                {SERVICE_OPTIONS.map((service) => (
                  <label
                    key={service}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors ${
                      selectedServices.includes(service)
                        ? "bg-primary/10 text-primary border border-primary/30"
                        : "bg-accent/50 text-foreground border border-transparent hover:bg-accent"
                    }`}
                  >
                    <input type="checkbox" checked={selectedServices.includes(service)} onChange={() => toggleService(service)} className="sr-only" />
                    <span className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${selectedServices.includes(service) ? "bg-primary border-primary" : "border-gray-300"}`}>
                      {selectedServices.includes(service) && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    {service === "Full package — let's do it all!" ? `🚀 ${service}` : service}
                  </label>
                ))}
              </div>
              <button
                onClick={handleA3ServicesSubmit}
                disabled={selectedServices.length === 0}
                className="w-full py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-40 cursor-pointer"
              >
                Continue ({selectedServices.length} selected)
              </button>
            </div>
          )}

          {/* ── Quick Replies ── */}
          {quickReplies.length > 0 && !showServicePicker && (
            <div className="px-3 py-2 sm:px-4 sm:py-3 border-t border-border bg-white space-y-1">
              {quickReplies.map((reply, i) => (
                <button
                  key={i}
                  onClick={reply.action}
                  disabled={isTyping}
                  className="w-full text-left px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm bg-accent/50 text-foreground rounded-xl hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20 transition-all duration-200 disabled:opacity-40 cursor-pointer"
                >
                  {reply.label}
                </button>
              ))}
            </div>
          )}

          {/* ── Text input ── */}
          {!showServicePicker && (
            <div className="px-2 py-2 sm:p-3 border-t border-border bg-white flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
                placeholder={
                  currentNode === "a1_name"    ? "Enter your name..."             :
                  currentNode === "a2_email"   ? "Enter your email..."            :
                  currentNode === "a4_details" ? "Tell us about your business..."  :
                  isAIMode                     ? "Ask me anything..."              :
                  "Type a message..."
                }
                className="flex-1 px-3 py-2 sm:px-4 sm:py-2.5 text-sm border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors disabled:opacity-50"
              />
              <button
                onClick={handleUserInput}
                disabled={!input.trim() || isTyping}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-all disabled:opacity-40 hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
                aria-label="Send message"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
