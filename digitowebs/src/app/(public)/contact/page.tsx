import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/contact-preview";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with DigitoWebs for a free consultation. We'd love to hear about your project.",
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

      {/* Map placeholder */}
      <section className="h-80 bg-gray-200 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <svg className="w-12 h-12 text-muted-foreground mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-muted-foreground font-medium">
              183 Ijesha Road, Surulere, Lagos
            </p>
            <p className="text-sm text-muted-foreground">
              Google Maps embed will be placed here
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
