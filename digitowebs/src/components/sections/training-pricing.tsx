"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

/* ── Paystack types (no package needed) ─────────────────────────── */
declare global {
  interface Window {
    PaystackPop: {
      setup: (opts: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        ref: string;
        metadata?: object;
        callback: (res: { reference: string }) => void;
        onClose: () => void;
      }) => { openIframe: () => void };
    };
  }
}

/* ── Course data ─────────────────────────────────────────────────── */
const courses = [
  {
    id: "basic",
    name: "Basic Class",
    price: "₦49,999",
    amount: 49999,
    highlights: ["8 Weeks Live Classes", "Graphics Community", "Daily Reviews"],
    features: [
      "8 weeks instructor-led classes",
      "Graphics design community access",
      "Daily reviews & feedback",
      "Lifetime Photoshop & Illustrator licence",
    ],
    featured: false,
  },
  {
    id: "advance",
    name: "Advance Class",
    price: "₦99,999",
    amount: 99999,
    highlights: ["Free Domain", "3 Months Hosting", "Google Business Optimisation"],
    features: [
      "Everything in Basic",
      "Free domain registration",
      "3 months website hosting",
      "Google Business Profile optimisation",
      "Freelance opportunities & referrals",
    ],
    featured: false,
  },
  {
    id: "master",
    name: "Masterclass",
    price: "₦199,999",
    amount: 199999,
    highlights: ["1 Year Hosting", "Premium Plugins", "Lifetime Mentorship"],
    features: [
      "Everything in Advance",
      "1 year premium website hosting",
      "Premium plugins included",
      "Cloudflare security setup",
      "Lifetime mentorship & support",
    ],
    featured: true,
  },
];

type Course = (typeof courses)[0];

const WHATSAPP = "https://wa.me/2348076172456";

export function TrainingPricing() {
  const [open, setOpen]         = useState(false);
  const [selected, setSelected] = useState<Course | null>(null);
  const [email, setEmail]       = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [paying, setPaying]     = useState(false);
  const [scriptReady, setScriptReady] = useState(false);

  /* close modal on Escape key */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const openModal = (course: Course) => {
    setSelected(course);
    setEmail("");
    setEmailErr("");
    setPaying(false);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelected(null);
  };

  /* ── Paystack inline popup ──────────────────────────────────────── */
  const handlePay = () => {
    if (!selected) return;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailErr("Please enter a valid email address.");
      return;
    }
    setEmailErr("");

    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

    /* If Paystack script loaded and key is available → use popup */
    if (scriptReady && publicKey && typeof window.PaystackPop !== "undefined") {
      setPaying(true);
      const ref = `SLT-${selected.id.toUpperCase()}-${Date.now()}`;

      const handler = window.PaystackPop.setup({
        key: publicKey,
        email,
        amount: selected.amount * 100, // Paystack expects kobo
        currency: "NGN",
        ref,
        metadata: {
          custom_fields: [
            { display_name: "Course", variable_name: "course", value: selected.name },
          ],
        },
        callback: (response) => {
          setPaying(false);
          closeModal();
          window.location.href = `/training/success?ref=${response.reference}&course=${encodeURIComponent(selected.name)}`;
        },
        onClose: () => {
          setPaying(false);
        },
      });

      handler.openIframe();
    } else {
      /* Fallback: Paystack SDK not ready — send to WhatsApp to complete payment */
      const msg = encodeURIComponent(
        `Hi, I want to register for the *${selected.name}* (${selected.price}). Please assist with payment.`
      );
      window.open(`${WHATSAPP}?text=${msg}`, "_blank");
    }
  };

  return (
    <>
      {/* Load Paystack SDK once */}
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="lazyOnload"
        onLoad={() => setScriptReady(true)}
      />

      {/* ── Pricing Cards ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {courses.map((course) => (
          <div
            key={course.id}
            className={`relative bg-white rounded-2xl p-8 shadow-sm border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col ${
              course.featured
                ? "border-primary shadow-primary/10 ring-2 ring-primary"
                : "border-border"
            }`}
          >
            {course.featured && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-foreground mb-3">{course.name}</h3>
              <p className="text-4xl font-extrabold text-secondary">{course.price}</p>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {course.highlights.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 text-xs font-bold">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <button
              onClick={() => openModal(course)}
              className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95 ${
                course.featured
                  ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25"
                  : "bg-secondary text-white hover:bg-secondary/90"
              }`}
            >
              View Features &amp; Enrol
            </button>
          </div>
        ))}
      </div>

      {/* ── Modal ─────────────────────────────────────────────────── */}
      {open && selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 relative">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors text-xl font-bold"
              aria-label="Close"
            >
              ×
            </button>

            {/* Title */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-foreground">{selected.name}</h3>
              <p className="text-3xl font-extrabold text-primary mt-1">{selected.price}</p>
            </div>

            {/* Features list */}
            <ul className="space-y-3 mb-5">
              {selected.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            {/* Schedule */}
            <div className="bg-accent rounded-xl p-4 mb-5 text-center">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">
                Class Schedule
              </p>
              <p className="text-sm font-semibold text-foreground">Tuesday &amp; Thursday</p>
              <p className="text-sm text-muted-foreground">11:00 AM – 2:00 PM</p>
              <p className="text-sm text-muted-foreground">April 16 – June 11, 2026</p>
            </div>

            {/* Email field */}
            <div className="mb-4">
              <label htmlFor="pay-email" className="block text-xs font-semibold text-foreground mb-1.5">
                Your Email Address <span className="text-primary">*</span>
              </label>
              <input
                id="pay-email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailErr(""); }}
                placeholder="you@example.com"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
                  emailErr ? "border-red-400 bg-red-50" : "border-border focus:border-primary"
                }`}
              />
              {emailErr && (
                <p className="text-xs text-red-500 mt-1">{emailErr}</p>
              )}
            </div>

            {/* Pay Now */}
            <button
              onClick={handlePay}
              disabled={paying}
              className="w-full py-3.5 bg-primary text-white font-bold text-center rounded-xl hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/25 disabled:opacity-60 disabled:scale-100 disabled:cursor-wait"
            >
              {paying ? "Opening payment…" : `Pay Now — ${selected.price}`}
            </button>

            <p className="text-center text-xs text-muted-foreground mt-3">
              Secure payment via Paystack · Can&apos;t pay online?{" "}
              <a
                href={`${WHATSAPP}?text=${encodeURIComponent(`Hi, I want to register for ${selected?.name}. Please assist with payment.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Contact us on WhatsApp
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
