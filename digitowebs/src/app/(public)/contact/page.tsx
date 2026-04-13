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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.3!2d3.3467!3d6.6018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b922e19c3eab7%3A0x0!2sOlaide+Tomori+Street%2C+Ikeja%2C+Lagos!5e0!3m2!1sen!2sng!4v1712934000000"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Slatech Solutions Office - No 2b Olaide Tomori Str, off Simbiat Abiola Way, Ikeja, Lagos"
          className="absolute inset-0 w-full h-full"
        />
      </section>
    </>
  );
}
