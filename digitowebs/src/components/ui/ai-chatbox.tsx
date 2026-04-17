"use client";

import { useState, useRef, useEffect, useCallback } from "react";

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
  // Branch A — Quote Request
  | "a1_name"
  | "a2_email"
  | "a3_services"
  | "a4_details"
  | "a4_budget"
  | "a5_confirmation"
  // Branch B — Services Info
  | "b1_menu"
  | "b2_response"
  | "b3_upsell"
  | "b4_nurture"
  // Branch C — Just Browsing
  | "c1_welcome"
  | "c2_reengage"
  // Offline
  | "offline_name"
  | "offline_email"
  | "offline_message"
  | "offline_done"
  // Free chat fallback
  | "free_chat";

type FormData = {
  name: string;
  email: string;
  services: string[];
  budget: string;
  details: string;
  message: string;
};

const WHATSAPP_NUMBER = "2348076172456";

const SERVICE_OPTIONS = [
  "Website Design",
  "Logo & Branding",
  "SEO",
  "Social Media Management",
  "Graphic Design",
  "Full package — let's do it all!",
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function AIChatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentNode, setCurrentNode] = useState<ChatNode>("greeting");
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    services: [],
    budget: "",
    details: "",
    message: "",
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showServicePicker, setShowServicePicker] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const reengageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Show notification badge after 3 seconds
  useEffect(() => {
    const t = setTimeout(() => {
      if (!isOpen && !hasGreeted) setShowNotification(true);
    }, 3000);
    return () => clearTimeout(t);
  }, [isOpen, hasGreeted]);

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
      if (formData.name) parts.push(`Name: ${formData.name}`);
      if (formData.email) parts.push(`Email: ${formData.email}`);
      if (formData.services.length)
        parts.push(`Services: ${formData.services.join(", ")}`);
      if (formData.budget) parts.push(`Budget: ${formData.budget}`);
      if (formData.details) parts.push(`Details: ${formData.details}`);
      if (extraMessage) parts.push(`Message: ${extraMessage}`);

      const text =
        parts.length > 0
          ? `Hi Slatech! I'd like to discuss a project.\n\n${parts.join("\n")}`
          : "Hi Slatech! I'd like to discuss a project.";

      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
        "_blank"
      );
    },
    [formData]
  );

  /* ---------------------------------------------------------------- */
  /*  Greeting — first open                                            */
  /* ---------------------------------------------------------------- */

  const startGreeting = useCallback(() => {
    setMessages([]);
    setCurrentNode("greeting");

    const greetingReplies: QuickReply[] = [
      {
        label: "\ud83d\udc49 Get a free quote",
        action: () => goToQuoteFlow(),
      },
      {
        label: "\ud83d\udcd6 Learn about services",
        action: () => goToServicesMenu(),
      },
      {
        label: "\ud83d\udc40 Just browsing",
        action: () => goToJustBrowsing(),
      },
    ];

    botSay(
      "Welcome to Slatech Solutions!\n\nWe help businesses grow with stunning websites, bold branding, smart SEO, social media management, and eye-catching graphic design.\n\nWhat brings you here today?",
      greetingReplies,
      400
    );
  }, [botSay]);

  // Run greeting on first open
  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setHasGreeted(true);
      setShowNotification(false);
      startGreeting();
    }
  }, [isOpen, hasGreeted, startGreeting]);

  /* ---------------------------------------------------------------- */
  /*  Branch A — Quote Request Flow                                    */
  /* ---------------------------------------------------------------- */

  const goToQuoteFlow = useCallback(() => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: "\ud83d\udc49 Get a free quote" },
    ]);
    setCurrentNode("a1_name");
    setQuickReplies([]);
    botSay(
      "Amazing! Let\u2019s get you sorted. This will only take 2 minutes \ud83d\ude0a\n\nFirst, what\u2019s your name?"
    );
  }, [botSay]);

  const handleA1Name = useCallback(
    (name: string) => {
      setFormData((prev) => ({ ...prev, name }));
      setCurrentNode("a2_email");
      botSay(
        `Nice to meet you, ${name}! \ud83d\ude4c\n\nWhat\u2019s the best email address for us to reach you?`
      );
    },
    [botSay]
  );

  const handleA2Email = useCallback(
    (email: string) => {
      setFormData((prev) => ({ ...prev, email }));
      setCurrentNode("a3_services");
      setShowServicePicker(true);
      botSay(
        "Perfect! Now the fun part \u2014 which services are you interested in? (Pick as many as you like!)"
      );
    },
    [botSay]
  );

  const handleA3ServicesSubmit = useCallback(() => {
    if (selectedServices.length === 0) return;
    setFormData((prev) => ({ ...prev, services: selectedServices }));
    setShowServicePicker(false);
    setMessages((prev) => [
      ...prev,
      { role: "user", content: selectedServices.join(", ") },
    ]);
    setCurrentNode("a4_details");
    botSay(
      "Great choices! Tell us a little about your business \u2014 what do you do and who are your customers?"
    );
  }, [selectedServices, botSay]);

  const handleA4Details = useCallback(
    (details: string) => {
      setFormData((prev) => ({ ...prev, details }));
      setCurrentNode("a4_budget");

      const budgetReplies: QuickReply[] = [
        "Under \u20a6200k",
        "\u20a6200k \u2013 \u20a6500k",
        "\u20a6500k \u2013 \u20a61M",
        "\u20a61M+",
        "Not sure yet",
      ].map((b) => ({
        label: b,
        action: () => handleA4Budget(b),
      }));

      botSay("Do you have a rough budget in mind?", budgetReplies);
    },
    [botSay]
  );

  const handleA4Budget = useCallback(
    (budget: string) => {
      const updatedForm = { ...formData, budget };
      setFormData(updatedForm);
      setMessages((prev) => [...prev, { role: "user", content: budget }]);
      setCurrentNode("a5_confirmation");

      const name = updatedForm.name || "there";

      // Send lead email to info@slatech.com.ng
      fetch("/api/chatbot-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: updatedForm.name,
          email: updatedForm.email,
          services: updatedForm.services,
          budget: updatedForm.budget,
          details: updatedForm.details,
        }),
      }).catch(() => {/* fail silently */});

      const confirmReplies: QuickReply[] = [
        {
          label: "\ud83d\udcac Continue on WhatsApp",
          action: () => forwardToWhatsApp(),
        },
        {
          label: "\ud83c\udfe0 Back to start",
          action: () => startGreeting(),
        },
      ];

      botSay(
        `You\u2019re all set, ${name}! \ud83c\udf89\n\nThanks for reaching out to Slatech Solutions. One of our team members will review your details and be in touch within 24 hours with a custom quote.\n\nKeep an eye on your inbox \u2014 big things are coming for your brand! \ud83d\udcaa\n\nWant to continue the conversation on WhatsApp for faster response?`,
        confirmReplies
      );
    },
    [botSay, formData, forwardToWhatsApp, startGreeting]
  );

  /* ---------------------------------------------------------------- */
  /*  Branch B — Services Info Flow                                    */
  /* ---------------------------------------------------------------- */

  const serviceResponses: Record<string, { emoji: string; text: string }> = {
    "Branding & Logo": {
      emoji: "\ud83c\udfa8",
      text: "At Slatech Solutions, we craft identities that stop the scroll. From logo design to full brand guidelines, we make sure your business looks unforgettable \u2014 online and offline.\n\n\ud83d\udd25 Trusted by startups and established businesses across Nigeria and beyond.\n\nReady to build your brand?",
    },
    "Website Design": {
      emoji: "\ud83d\udcbb",
      text: "We build fast, beautiful, mobile-ready websites that actually convert visitors into customers \u2014 not just look pretty.\n\nWhether you need a landing page, e-commerce store, or a full corporate site, Slatech has you covered.\n\nShall we build something great together?",
    },
    SEO: {
      emoji: "\ud83d\udcc8",
      text: "What\u2019s the point of a great website if nobody finds it? Our SEO service puts Slatech\u2019s clients on page one \u2014 driving real organic traffic and real results.\n\nWant more people to find your business?",
    },
    "Social Media": {
      emoji: "\ud83d\udcf1",
      text: "We handle your content, posting schedule, engagement, and strategy \u2014 so you can focus on running your business while your audience grows on autopilot.\n\nLet\u2019s grow your following!",
    },
    "Graphic Design": {
      emoji: "\u270f\ufe0f",
      text: "From flyers and banners to social media graphics and pitch decks \u2014 we design visuals that communicate your message powerfully and professionally.\n\nNeed something designed?",
    },
  };

  const goToServicesMenu = useCallback(() => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: "\ud83d\udcd6 Learn about services" },
    ]);
    setCurrentNode("b1_menu");

    const serviceReplies: QuickReply[] = Object.entries(serviceResponses).map(
      ([name, { emoji }]) => ({
        label: `${emoji} ${name}`,
        action: () => showServiceDetail(name),
      })
    );

    botSay(
      "We\u2019d love to walk you through what we do! Which area are you most curious about?",
      serviceReplies
    );
  }, [botSay]);

  const showServiceDetail = useCallback(
    (serviceName: string) => {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: serviceName },
      ]);
      setCurrentNode("b2_response");

      const resp = serviceResponses[serviceName];
      const afterReplies: QuickReply[] = [
        {
          label: "\ud83d\udcac Get a free quote",
          action: () => goToQuoteFlow(),
        },
        {
          label: "\ud83d\udd19 See other services",
          action: () => goToServicesMenu(),
        },
        {
          label: "\ud83d\udcf2 Chat on WhatsApp",
          action: () => forwardToWhatsApp(`Interested in: ${serviceName}`),
        },
      ];

      botSay(resp?.text || "Tell us more about what you need!", afterReplies);
    },
    [botSay, goToQuoteFlow, goToServicesMenu, forwardToWhatsApp]
  );

  /* ---------------------------------------------------------------- */
  /*  Branch C — Just Browsing                                         */
  /* ---------------------------------------------------------------- */

  const goToJustBrowsing = useCallback(() => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: "\ud83d\udc40 Just browsing" },
    ]);
    setCurrentNode("c1_welcome");

    const browseReplies: QuickReply[] = [
      {
        label: "\ud83d\udcac Get a quote",
        action: () => goToQuoteFlow(),
      },
      {
        label: "\ud83d\udcd6 View services",
        action: () => goToServicesMenu(),
      },
    ];

    botSay(
      "No problem at all \u2014 feel free to look around! \ud83d\ude0a\n\nIf you have any questions about what we do at Slatech Solutions \u2014 branding, websites, SEO, social media, or graphic design \u2014 just say the word.\n\nWe don\u2019t bite. We just build great brands. \ud83d\ude04",
      browseReplies
    );

    // 60-second re-engage nudge
    if (reengageTimerRef.current) clearTimeout(reengageTimerRef.current);
    reengageTimerRef.current = setTimeout(() => {
      setCurrentNode("c2_reengage");

      const reengageReplies: QuickReply[] = [
        {
          label: "\ud83d\udcac Sure, let\u2019s chat",
          action: () => goToQuoteFlow(),
        },
        {
          label: "\ud83d\udc4b Maybe later",
          action: () =>
            botSay(
              "No worries! We\u2019re here whenever you\u2019re ready. Have a great day! \ud83d\ude0a"
            ),
        },
      ];

      botSay(
        "Still with us? \ud83d\udc40\n\nJust a reminder \u2014 we offer free consultations for businesses looking to level up their digital presence.\n\nNo commitment, just a conversation. Interested?",
        reengageReplies
      );
    }, 60000);
  }, [botSay, goToQuoteFlow, goToServicesMenu]);

  // Clean up re-engage timer
  useEffect(() => {
    return () => {
      if (reengageTimerRef.current) clearTimeout(reengageTimerRef.current);
    };
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Free-text input handler (context-aware)                          */
  /* ---------------------------------------------------------------- */

  const handleUserInput = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");

    switch (currentNode) {
      case "a1_name":
        handleA1Name(trimmed);
        break;
      case "a2_email":
        handleA2Email(trimmed);
        break;
      case "a4_details":
        handleA4Details(trimmed);
        break;
      case "offline_name":
        setFormData((prev) => ({ ...prev, name: trimmed }));
        setCurrentNode("offline_email");
        botSay("Thanks! And your email address?");
        break;
      case "offline_email":
        setFormData((prev) => ({ ...prev, email: trimmed }));
        setCurrentNode("offline_message");
        botSay("What can we help you with? Leave a quick note:");
        break;
      case "offline_message":
        setFormData((prev) => ({ ...prev, message: trimmed }));
        setCurrentNode("offline_done");
        botSay(
          "Got it! \ud83d\ude4c We\u2019ll get back to you first thing. Big things are coming for your brand! \ud83d\udcaa",
          [
            {
              label: "\ud83d\udcf2 Continue on WhatsApp",
              action: () => forwardToWhatsApp(trimmed),
            },
          ]
        );
        break;
      default:
        // Free-text fallback — try keyword matching, else forward to WhatsApp
        handleFreeText(trimmed);
        break;
    }
  }, [
    input,
    currentNode,
    handleA1Name,
    handleA2Email,
    handleA4Details,
    botSay,
    forwardToWhatsApp,
  ]);

  const handleFreeText = useCallback(
    (text: string) => {
      const lower = text.toLowerCase();

      // Keyword matching for common questions
      if (lower.match(/pric|cost|how much|budget|quote/)) {
        botSay(
          "Great question! Let me get you a personalized quote. It\u2019ll only take 2 minutes!",
          [
            {
              label: "\ud83d\udc49 Start quote",
              action: () => goToQuoteFlow(),
            },
            {
              label: "\ud83d\udcf2 Ask on WhatsApp",
              action: () => forwardToWhatsApp(text),
            },
          ]
        );
      } else if (lower.match(/service|offer|what do you|branding|design|seo|social media/)) {
        goToServicesMenu();
      } else if (lower.match(/contact|reach|phone|email|address|office|location/)) {
        botSay(
          "You can reach us at:\n\n\ud83d\udcde 08076172456\n\ud83d\udce7 info@slatech.com.ng\n\ud83d\udccd No 2b Olaide Tomori Str, off Simbiat Abiola Way, Ikeja, Lagos\n\nOr chat with us directly on WhatsApp!",
          [
            {
              label: "\ud83d\udcf2 Chat on WhatsApp",
              action: () => forwardToWhatsApp(),
            },
            {
              label: "\ud83c\udfe0 Back to start",
              action: () => startGreeting(),
            },
          ]
        );
      } else if (lower.match(/hi|hello|hey|good morning|good afternoon|good evening/)) {
        startGreeting();
      } else if (lower.match(/thank|thanks|appreciate/)) {
        botSay(
          "You\u2019re welcome! \ud83d\ude0a Is there anything else I can help you with?",
          [
            {
              label: "\ud83d\udc49 Get a quote",
              action: () => goToQuoteFlow(),
            },
            {
              label: "\ud83d\udcd6 View services",
              action: () => goToServicesMenu(),
            },
            {
              label: "\ud83d\udcf2 WhatsApp us",
              action: () => forwardToWhatsApp(),
            },
          ]
        );
      } else {
        // Can't match — offer WhatsApp forwarding
        botSay(
          "That\u2019s a great question! \ud83e\udd14 For the best answer, let me connect you with our team directly on WhatsApp \u2014 they\u2019ll be happy to help!",
          [
            {
              label: "\ud83d\udcf2 Continue on WhatsApp",
              action: () => forwardToWhatsApp(text),
            },
            {
              label: "\ud83c\udfe0 Back to menu",
              action: () => startGreeting(),
            },
          ]
        );
      }
    },
    [botSay, goToQuoteFlow, goToServicesMenu, forwardToWhatsApp, startGreeting]
  );

  /* ---------------------------------------------------------------- */
  /*  Key handler                                                      */
  /* ---------------------------------------------------------------- */

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (showServicePicker) {
        handleA3ServicesSubmit();
      } else {
        handleUserInput();
      }
    }
  };

  /* ---------------------------------------------------------------- */
  /*  Toggle service checkbox                                          */
  /* ---------------------------------------------------------------- */

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div id="ai-chatbox">
      {/* Notification badge */}
      {showNotification && !isOpen && (
        <div className="fixed bottom-[82px] right-5 z-[9999] bg-white rounded-xl shadow-lg border border-border px-4 py-3 max-w-[240px] animate-fade-in">
          <button
            onClick={() => setShowNotification(false)}
            className="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500 hover:bg-gray-300"
          >
            &times;
          </button>
          <p className="text-sm text-foreground">
            Need help with your project? Chat with us!
          </p>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowNotification(false);
        }}
        className={`fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
          isOpen ? "bg-secondary rotate-0" : "bg-primary"
        }`}
        style={isOpen ? undefined : { animation: "bounce 2s infinite" }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-[88px] left-3 right-3 sm:left-auto sm:right-6 sm:w-[370px] z-[9999] bg-white rounded-2xl shadow-2xl border border-border overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-secondary text-white px-3 py-3 sm:px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-sm">Slatech Bot</p>
                <p className="text-xs text-gray-300 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                  Online
                </p>
              </div>
            </div>
            {/* WhatsApp shortcut in header */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
              title="Chat on WhatsApp"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Messages Area */}
          <div className="h-[260px] sm:h-[320px] overflow-y-auto p-3 sm:p-4 space-y-3 bg-accent/30">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
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

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Service Picker (Branch A3) */}
          {showServicePicker && (
            <div className="px-3 py-2 sm:px-4 sm:py-3 border-t border-border bg-white space-y-2">
              <p className="text-xs text-muted-foreground font-medium">
                Select services:
              </p>
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
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service)}
                      onChange={() => toggleService(service)}
                      className="sr-only"
                    />
                    <span
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                        selectedServices.includes(service)
                          ? "bg-primary border-primary"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedServices.includes(service) && (
                        <svg
                          className="w-2.5 h-2.5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </span>
                    {service === "Full package \u2014 let\u2019s do it all!"
                      ? `\ud83d\ude80 ${service}`
                      : service}
                  </label>
                ))}
              </div>
              <button
                onClick={handleA3ServicesSubmit}
                disabled={selectedServices.length === 0}
                className="w-full py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-40"
              >
                Continue ({selectedServices.length} selected)
              </button>
            </div>
          )}

          {/* Quick Reply Buttons */}
          {quickReplies.length > 0 && !showServicePicker && (
            <div className="px-3 py-2 sm:px-4 sm:py-3 border-t border-border bg-white space-y-1">
              {quickReplies.map((reply, i) => (
                <button
                  key={i}
                  onClick={reply.action}
                  className="w-full text-left px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm bg-accent/50 text-foreground rounded-xl hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20 transition-all duration-200"
                >
                  {reply.label}
                </button>
              ))}
            </div>
          )}

          {/* Text Input */}
          {!showServicePicker && (
            <div className="px-2 py-2 sm:p-3 border-t border-border bg-white flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  currentNode === "a1_name"
                    ? "Enter your name..."
                    : currentNode === "a2_email"
                    ? "Enter your email..."
                    : currentNode === "a4_details"
                    ? "Tell us about your business..."
                    : "Type a message..."
                }
                className="flex-1 px-3 py-2 sm:px-4 sm:py-2.5 text-sm border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
              <button
                onClick={handleUserInput}
                disabled={!input.trim()}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-all disabled:opacity-40 hover:scale-105 active:scale-95 shrink-0"
                aria-label="Send message"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
