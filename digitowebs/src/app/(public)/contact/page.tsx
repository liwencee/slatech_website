import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/contact-preview";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Slatech Solutions for a free consultation. We'd love to hear about your project.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
            Contact Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Let&apos;s <span className="text-primary">Talk</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Have a project in mind? We&apos;d love to hear about it. Reach out
            and let&apos;s create something amazing together.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactSection />

      {/* Google Map */}
      <section className="h-96 relative">
        <iframe
          src="https://maps.google.com/maps?q=2b+Olaide+Tomori+Ikeja+Lagos+Nigeria&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Slatech Solutions Office - 2b, Olaide Tomori, Ikeja, Lagos"
          className="absolute inset-0 w-full h-full"
        />
      </section>
    </>
  );
}
