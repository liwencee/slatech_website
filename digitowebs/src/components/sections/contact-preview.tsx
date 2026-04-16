"use client";

import { useState, useCallback } from "react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const SERVICES = [
  "Website Design",
  "E-Commerce Website",
  "Search Engine Optimization (SEO)",
  "Website Hosting",
  "Website Management",
  "Fully Managed Website Service",
  "Logo & Branding",
  "Social Media Management",
  "Graphic Design",
  "Other / Not Sure Yet",
];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

function validate(state: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!state.firstName.trim()) errors.firstName = "First name is required";
  if (!state.lastName.trim()) errors.lastName = "Last name is required";
  if (!state.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email))
    errors.email = "Enter a valid email address";
  if (!state.service) errors.service = "Please select a service";
  if (!state.message.trim()) errors.message = "Message is required";
  else if (state.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters";
  return errors;
}

export function ContactSection() {
  const initial: FormState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  };

  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const change = (field: keyof FormState, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (touched[field]) {
      const e = validate({ ...form, [field]: value });
      setErrors((p) => ({ ...p, [field]: e[field] }));
    }
  };

  const blur = (field: keyof FormState) => {
    setTouched((p) => ({ ...p, [field]: true }));
    const e = validate(form);
    setErrors((p) => ({ ...p, [field]: e[field] }));
  };

  const [apiError, setApiError] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const allTouched = (Object.keys(initial) as (keyof FormState)[]).reduce(
        (a, k) => ({ ...a, [k]: true }),
        {} as Record<keyof FormState, boolean>
      );
      setTouched(allTouched);
      const errs = validate(form);
      setErrors(errs);
      if (Object.keys(errs).length) return;

      setLoading(true);
      setApiError("");

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) {
          setApiError(data.error || "Something went wrong. Please try again.");
          setLoading(false);
          return;
        }
        setLoading(false);
        setSubmitted(true);
        setForm(initial);
        setTouched({});
        setErrors({});
        setTimeout(() => setSubmitted(false), 8000);
      } catch {
        setApiError("Network error. Please check your connection and try again.");
        setLoading(false);
      }
    },
    [form]
  );

  const fc = (name: keyof FormState) =>
    `w-full px-4 py-3 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 transition-all duration-200 ${
      errors[name] && touched[name]
        ? "border-red-400 focus:ring-red-200"
        : "border-gray-200 focus:ring-primary/20 focus:border-primary"
    }`;

  return (
    <section
      id="contact"
      className="py-20 lg:py-28 bg-white"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimateOnScroll animation="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3">
              Get In Touch
            </span>
            <h2
              id="contact-heading"
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
            >
              Start Your <span className="text-primary">Project</span> Today
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Ready to grow your business in Lagos or anywhere in Nigeria? Fill
              in the form and our team will respond within 24 hours with a free
              custom quote.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* ── Contact Info Card ── */}
          <AnimateOnScroll animation="slide-left" className="lg:col-span-2">
            <div className="bg-secondary rounded-3xl p-8 text-white flex flex-col gap-8 h-full">
              <div>
                <h3 className="text-xl font-bold mb-2">Contact Information</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Based in Ikeja, Lagos. Serving businesses across Nigeria.
                  Reach out — we are always ready to help.
                </p>
              </div>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">Our Office</p>
                    <address className="text-sm leading-relaxed not-italic">
                      No 2b Olaide Tomori Str,<br />
                      off Simbiat Abiola Way,<br />
                      <strong>Ikeja, Lagos, Nigeria</strong>
                    </address>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">Phone / WhatsApp</p>
                    <a href="tel:08076172456" className="text-sm hover:text-primary transition-colors font-medium">
                      08076172456
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">Email Us</p>
                    <a href="mailto:info@slatech.com.ng" className="text-sm hover:text-primary transition-colors font-medium">
                      info@slatech.com.ng
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">Business Hours</p>
                    <p className="text-sm">Mon – Fri: 8am – 6pm<br />Sat: 9am – 3pm</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/2348076172456?text=Hi%20Slatech!%20I%27d%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex items-center justify-center gap-3 w-full py-3.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors text-sm"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </AnimateOnScroll>

          {/* ── Contact Form ── */}
          <AnimateOnScroll animation="slide-right" className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Message Sent! 🎉</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Thank you for reaching out! Our team will contact you within 24 hours with your free custom quote.
                  </p>
                  <a
                    href="https://wa.me/2348076172456"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors text-sm"
                  >
                    For faster response, chat on WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Send Us a Message</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-4">
                      We respond within 24 hours with a free, no-obligation quote.
                    </p>
                  </div>

                  {/* First + Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-1.5">
                        First Name <span className="text-primary">*</span>
                      </label>
                      <input
                        id="firstName" type="text" autoComplete="given-name"
                        value={form.firstName} onChange={(e) => change("firstName", e.target.value)}
                        onBlur={() => blur("firstName")} placeholder="e.g. Emeka"
                        className={fc("firstName")}
                      />
                      {errors.firstName && touched.firstName && (
                        <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-1.5">
                        Last Name <span className="text-primary">*</span>
                      </label>
                      <input
                        id="lastName" type="text" autoComplete="family-name"
                        value={form.lastName} onChange={(e) => change("lastName", e.target.value)}
                        onBlur={() => blur("lastName")} placeholder="e.g. Olalekan"
                        className={fc("lastName")}
                      />
                      {errors.lastName && touched.lastName && (
                        <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                        Email Address <span className="text-primary">*</span>
                      </label>
                      <input
                        id="email" type="email" autoComplete="email"
                        value={form.email} onChange={(e) => change("email", e.target.value)}
                        onBlur={() => blur("email")} placeholder="you@example.com"
                        className={fc("email")}
                      />
                      {errors.email && touched.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
                        Phone Number{" "}
                        <span className="text-muted-foreground text-xs font-normal">(optional)</span>
                      </label>
                      <input
                        id="phone" type="tel" autoComplete="tel"
                        value={form.phone} onChange={(e) => change("phone", e.target.value)}
                        onBlur={() => blur("phone")} placeholder="+234 xxx xxx xxxx"
                        className={fc("phone")}
                      />
                    </div>
                  </div>

                  {/* Service */}
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-foreground mb-1.5">
                      Service Needed <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="service" value={form.service}
                        onChange={(e) => change("service", e.target.value)}
                        onBlur={() => blur("service")}
                        className={`${fc("service")} appearance-none pr-10 cursor-pointer`}
                      >
                        <option value="">— Select a service —</option>
                        {SERVICES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {errors.service && touched.service && (
                      <p className="text-red-500 text-xs mt-1">{errors.service}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                      Your Message <span className="text-primary">*</span>
                    </label>
                    <textarea
                      id="message" rows={5} value={form.message}
                      onChange={(e) => change("message", e.target.value)}
                      onBlur={() => blur("message")}
                      placeholder="Tell us about your business and what you need. The more detail, the better we can help!"
                      className={`${fc("message")} resize-none`}
                    />
                    {errors.message && touched.message && (
                      <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* API error */}
                  {apiError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center">
                      {apiError}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-base"
                  >
                    {loading ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-center text-muted-foreground">
                    We respond within 24 hours. Your information is 100% safe and never shared.
                  </p>
                </form>
              )}
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
