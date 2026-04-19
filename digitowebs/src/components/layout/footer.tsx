"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAnalytics } from "@/hooks/use-analytics";

const services = [
  { label: "Website Design", href: "/services" },
  { label: "E-Commerce", href: "/services" },
  { label: "SEO", href: "/services" },
  { label: "Website Hosting", href: "/services" },
  { label: "Website Management", href: "/services" },
  { label: "Fully Managed Service", href: "/services" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Pricing", href: "/services#pricing" },
];

const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Refund Policy", href: "/refund" },
];

/* ------------------------------------------------------------------ */
/*  SVG Icon Components                                                */
/* ------------------------------------------------------------------ */

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function LinkedInIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z" />
    </svg>
  );
}

function XTwitterIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function MapPinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function PhoneIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function EmailIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Intersection Observer Hook for Scroll Animations                   */
/* ------------------------------------------------------------------ */

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

/* ------------------------------------------------------------------ */
/*  Footer Link with hover arrow                                       */
/* ------------------------------------------------------------------ */

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="group/link flex items-center gap-2 text-sm text-gray-300 transition-all duration-300 hover:text-primary hover:translate-x-1"
      >
        <span className="inline-block w-0 overflow-hidden transition-all duration-300 group-hover/link:w-4 text-primary">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </span>
        {label}
      </Link>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  Social Icon Button                                                 */
/* ------------------------------------------------------------------ */

function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group/social w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 transition-all duration-300 hover:bg-primary hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-primary/25"
    >
      {children}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer Component                                                   */
/* ------------------------------------------------------------------ */

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subLoading, setSubLoading] = useState(false);
  const [subError, setSubError] = useState("");
  const { trackEvent } = useAnalytics();

  const col1 = useInView(0.15);
  const col2 = useInView(0.15);
  const col3 = useInView(0.15);
  const col4 = useInView(0.15);
  const ctaBanner = useInView(0.2);
  const newsletter = useInView(0.2);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubLoading(true);
    setSubError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubError(data.error || "Something went wrong. Please try again.");
        setSubLoading(false);
        return;
      }
    } catch {
      setSubError("Network error. Please try again.");
      setSubLoading(false);
      return;
    }
    setSubLoading(false);
    setSubscribed(true);
    setEmail("");
    trackEvent("newsletter_subscribe");
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="relative">
      {/* Gradient top border */}
      <div className="h-1 bg-gradient-to-r from-primary via-primary-dark to-secondary" />

      {/* ============================================================ */}
      {/*  SECTION 1: WhatsApp CTA Banner                              */}
      {/* ============================================================ */}
      <div
        ref={ctaBanner.ref}
        className={`bg-gradient-to-r from-primary to-primary-dark transition-all duration-700 ${
          ctaBanner.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: Logo + Text */}
          <div className="flex items-center gap-4">
            <div className="bg-white/15 rounded-xl p-2 backdrop-blur-sm">
              <Image
                src="/logomark.png"
                alt="Slatech Solutions"
                width={48}
                height={48}
                className="drop-shadow-lg object-contain"
              />
            </div>
            <div>
              <p className="text-white text-lg sm:text-xl font-bold tracking-tight">
                Let us discuss your project
              </p>
              <p className="text-white/70 text-sm hidden sm:block">
                We are ready to bring your ideas to life
              </p>
            </div>
          </div>

          {/* Right: WhatsApp Button */}
          <a
            href="https://wa.me/2348076172456"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-white text-primary font-bold px-6 py-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <WhatsAppIcon className="w-6 h-6 group-hover:animate-bounce" />
            <span className="text-sm sm:text-base tracking-wide">
              CHAT US VIA WHATSAPP
            </span>
          </a>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  SECTION 2: Main Footer (4-column grid)                      */}
      {/* ============================================================ */}
      <div className="bg-secondary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
            {/* Column 1 - About */}
            <div
              ref={col1.ref}
              className={`transition-all duration-700 ${
                col1.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Link href="/" className="flex items-center mb-5 group">
                <Image
                  src="/side_SLATECH_SOLUTIONS_LOGO.png"
                  alt="Slatech Solutions"
                  width={160}
                  height={44}
                  className="group-hover:scale-105 transition-transform duration-300 object-contain brightness-0 invert"
                />
              </Link>

              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Turning ideas into powerful digital brands. We help businesses
                create stunning websites that are beautiful, fast, secure, and
                mobile-friendly. Over 10 years of experience building digital
                excellence across Africa and beyond.
              </p>

              {/* Social Icons */}
              <div className="flex gap-3 flex-wrap">
                <SocialButton
                  href="https://wa.me/2348076172456"
                  label="WhatsApp"
                >
                  <WhatsAppIcon className="w-[18px] h-[18px]" />
                </SocialButton>
                <SocialButton
                  href="https://www.facebook.com/share/1AtxLz2njU/?mibextid=wwXIfr"
                  label="Facebook"
                >
                  <FacebookIcon className="w-[18px] h-[18px]" />
                </SocialButton>
                <SocialButton
                  href="https://www.instagram.com/_slatech?igsh=MTJta3IwZDVvanY4cg%3D%3D&utm_source=qr"
                  label="Instagram"
                >
                  <InstagramIcon className="w-[18px] h-[18px]" />
                </SocialButton>
                <SocialButton
                  href="https://linkedin.com"
                  label="LinkedIn"
                >
                  <LinkedInIcon className="w-[18px] h-[18px]" />
                </SocialButton>
                <SocialButton
                  href="https://x.com"
                  label="X (Twitter)"
                >
                  <XTwitterIcon className="w-[18px] h-[18px]" />
                </SocialButton>
              </div>
            </div>

            {/* Column 2 - Our Services */}
            <div
              ref={col2.ref}
              className={`transition-all duration-700 delay-100 ${
                col2.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h3 className="text-white text-lg font-bold mb-6 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-primary after:rounded-full">
                Our Services
              </h3>
              <ul className="space-y-3">
                {services.map((item) => (
                  <FooterLink key={item.label} href={item.href} label={item.label} />
                ))}
              </ul>
            </div>

            {/* Column 3 - Quick Links */}
            <div
              ref={col3.ref}
              className={`transition-all duration-700 delay-200 ${
                col3.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h3 className="text-white text-lg font-bold mb-6 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-primary after:rounded-full">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((item) => (
                  <FooterLink key={item.label} href={item.href} label={item.label} />
                ))}
              </ul>
            </div>

            {/* Column 4 - Contact Us */}
            <div
              ref={col4.ref}
              className={`transition-all duration-700 delay-300 ${
                col4.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h3 className="text-white text-lg font-bold mb-6 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-primary after:rounded-full">
                Contact Us
              </h3>

              <div className="space-y-4 text-sm text-gray-300">
                {/* Address */}
                <div className="flex items-start gap-3 group/contact">
                  <div className="mt-0.5 shrink-0 text-primary transition-transform duration-300 group-hover/contact:scale-110">
                    <MapPinIcon className="w-5 h-5" />
                  </div>
                  <span className="leading-relaxed">
                    No 2b Olaide Tomori Str, off Simbiat Abiola Way, Ikeja, Lagos
                  </span>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3 group/contact">
                  <div className="shrink-0 text-primary transition-transform duration-300 group-hover/contact:scale-110">
                    <PhoneIcon className="w-5 h-5" />
                  </div>
                  <a
                    href="tel:08076172456"
                    className="hover:text-primary transition-colors duration-300"
                  >
                    08076172456
                  </a>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3 group/contact">
                  <div className="shrink-0 text-primary transition-transform duration-300 group-hover/contact:scale-110">
                    <EmailIcon className="w-5 h-5" />
                  </div>
                  <a
                    href="mailto:info@slatech.com.ng"
                    className="hover:text-primary transition-colors duration-300"
                  >
                    info@slatech.com.ng
                  </a>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="mt-5 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                <iframe
                  title="Slatech Solutions Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.2643752837396!2d3.3456!3d6.6018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sIkeja%2C+Lagos!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                  width="100%"
                  height="130"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  SECTION 3: Newsletter Signup                                */}
      {/* ============================================================ */}
      <div className="bg-secondary">
        <div
          ref={newsletter.ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-all duration-700 ${
            newsletter.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-white text-xl sm:text-2xl font-bold mb-2">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Get the latest insights, tips, and updates delivered straight to
              your inbox. No spam, we promise.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <div className="relative flex-1">
                <EmailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-full bg-white/10 border border-white/15 text-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                />
              </div>
              <button
                type="submit"
                disabled={subLoading}
                className="px-8 py-3 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {subLoading ? "Subscribing…" : "Subscribe"}
              </button>
            </form>

            {/* Success Message */}
            <div
              className={`mt-4 text-sm text-green-400 transition-all duration-500 ${
                subscribed
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              Thank you for subscribing! We will be in touch soon.
            </div>

            {/* Error Message */}
            {subError && (
              <div className="mt-4 text-sm text-red-400 text-center">
                {subError}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  SECTION 4: Bottom Bar                                       */}
      {/* ============================================================ */}
      <div className="bg-secondary-dark">
        {/* Gradient Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            &copy; 2020&ndash;2026 Slatech Solutions. All rights reserved.
          </p>

          <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
            {legal.map((item, idx) => (
              <span key={item.label} className="flex items-center">
                <Link
                  href={item.href}
                  className="text-xs text-gray-400 hover:text-primary transition-colors duration-300 px-1"
                >
                  {item.label}
                </Link>
                {idx < legal.length - 1 && (
                  <span className="text-gray-600 text-xs">|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
