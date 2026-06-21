import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/contact-preview";

export const metadata: Metadata = {
  title: "Contact Slatech Solutions — Get a Free Web Design Quote",
  description:
    "Reach Slatech Solutions in Ikeja, Lagos. Call 08076172456, chat on WhatsApp or fill our form for a free web design, SEO or branding consultation.",
  openGraph: {
    title: "Contact Slatech Solutions — Get a Free Web Design Quote",
    description:
      "Reach Slatech Solutions in Ikeja, Lagos. Call 08076172456, chat on WhatsApp or fill our form for a free web design, SEO or branding consultation.",
    url: "https://slatech.com.ng/contact",
    type: "website",
    images: [
      {
        url: "/SLATECH  SOLUTIONS LOGO.png",
        width: 1200,
        height: 630,
        alt: "Slatech Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Slatech Solutions — Get a Free Web Design Quote",
    description:
      "Reach Slatech Solutions in Ikeja, Lagos. Call 08076172456, chat on WhatsApp or fill our form for a free web design, SEO or branding consultation.",
    images: ["/side_SLATECH_SOLUTIONS_LOGO.png"],
  },
  alternates: {
    canonical: "https://slatech.com.ng/contact",
  },
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
