"use client";

import { useState, useCallback } from "react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Recaptcha } from "@/components/ui/recaptcha";

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
};

function validateField(name: string, value: string): string | undefined {
  switch (name) {
    case "name":
      if (!value.trim()) return "Name is required";
      if (value.trim().length < 2) return "Name must be at least 2 characters";
      break;
    case "email":
      if (!value.trim()) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email";
      break;
    case "phone":
      if (value && !/^[+]?[\d\s()-]{7,}$/.test(value)) return "Please enter a valid phone number";
      break;
    case "subject":
      if (!value.trim()) return "Subject is required";
      if (value.trim().length < 3) return "Subject must be at least 3 characters";
      break;
    case "message":
      if (!value.trim()) return "Message is required";
      if (value.trim().length < 10) return "Message must be at least 10 characters";
      break;
  }
  return undefined;
}

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const onCaptchaVerify = useCallback((token: string) => {
    setCaptchaToken(token);
  }, []);

  const onCaptchaExpire = useCallback(() => {
    setCaptchaToken(null);
  }, []);

  const handleChange = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, formState[name as keyof typeof formState]),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    for (const [key, value] of Object.entries(formState)) {
      const error = validateField(key, value);
      if (error) newErrors[key as keyof FormErrors] = error;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ name: true, email: true, phone: true, subject: true, message: true });
      return;
    }

    setSubmitted(true);
    setFormState({ name: "", email: "", phone: "", subject: "", message: "" });
    setErrors({});
    setTouched({});
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputClass = (name: string) =>
    `w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all duration-300 ${
      errors[name as keyof FormErrors] && touched[name]
        ? "border-red-400 focus:ring-red-200 focus:border-red-400"
        : "border-border focus:ring-primary/20 focus:border-primary"
    }`;

  return (
    <section id="contact" className="py-20 lg:py-28 bg-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Info */}
          <AnimateOnScroll animation="slide-left">
            <div>
              <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3">
                Contact Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Let&apos;s <span className="text-primary">Talk</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Have a project in mind? We&apos;d love to hear about it. Reach out
                to us and let&apos;s create something amazing together.
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Our Office</h3>
                    <p className="text-sm text-muted-foreground">
                      No 2b Olaide Tomori Str, off Simbiat Abiola Way, Ikeja, Lagos
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Phone</h3>
                    <p className="text-sm text-muted-foreground">08076172456</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-sm text-muted-foreground">info@slatech.com.ng</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Right - Form */}
          <AnimateOnScroll animation="slide-right">
            <div className="bg-white rounded-2xl shadow-sm border border-border p-8">
              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-medium animate-[fade-in-up_0.4s_ease-out]">
                  Thank you! We&apos;ll get back to you soon.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formState.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      onBlur={() => handleBlur("name")}
                      className={inputClass("name")}
                      placeholder="John Doe"
                    />
                    {errors.name && touched.name && (
                      <p className="text-red-500 text-xs mt-1 animate-[fade-in-up_0.3s_ease-out]">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      className={inputClass("email")}
                      placeholder="john@example.com"
                    />
                    {errors.email && touched.email && (
                      <p className="text-red-500 text-xs mt-1 animate-[fade-in-up_0.3s_ease-out]">{errors.email}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formState.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      onBlur={() => handleBlur("phone")}
                      className={inputClass("phone")}
                      placeholder="+234 xxx xxx xxxx"
                    />
                    {errors.phone && touched.phone && (
                      <p className="text-red-500 text-xs mt-1 animate-[fade-in-up_0.3s_ease-out]">{errors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={formState.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      onBlur={() => handleBlur("subject")}
                      className={inputClass("subject")}
                      placeholder="Website Design"
                    />
                    {errors.subject && touched.subject && (
                      <p className="text-red-500 text-xs mt-1 animate-[fade-in-up_0.3s_ease-out]">{errors.subject}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formState.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    onBlur={() => handleBlur("message")}
                    className={`${inputClass("message")} resize-none`}
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && touched.message && (
                    <p className="text-red-500 text-xs mt-1 animate-[fade-in-up_0.3s_ease-out]">{errors.message}</p>
                  )}
                </div>
                <div className="flex justify-center">
                  <Recaptcha onVerify={onCaptchaVerify} onExpire={onCaptchaExpire} />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Send Message
                </button>
              </form>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
