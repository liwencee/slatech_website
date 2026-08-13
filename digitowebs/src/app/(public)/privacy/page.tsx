import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read Slatech Solutions' privacy policy — how we collect, use, and protect your personal information when you use our website and services.",
  alternates: { canonical: "https://slatech.com.ng/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="August 2026">
      <div>
        <h2>1. Introduction</h2>
        <p>
          Slatech Solutions (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates
          slatech.com.ng and provides web design, e-commerce, SEO, hosting, branding, and digital
          marketing services to businesses in Nigeria and internationally. This policy explains
          what information we collect, how we use it, and the choices you have.
        </p>
      </div>

      <div>
        <h2>2. Information We Collect</h2>
        <p>We collect information you provide directly to us, including:</p>
        <ul>
          <li>Contact details submitted via our contact form or chatbot (name, email, phone number)</li>
          <li>Project details you share when requesting a quote (service needed, budget, message)</li>
          <li>Payment information processed securely by Paystack when you pay for a service — we never store your card details</li>
          <li>Communications you send us by email, WhatsApp, or phone</li>
        </ul>
        <p>
          We also collect limited technical information automatically, such as your IP address,
          browser type, and pages visited, to keep the site secure and understand how it&apos;s used.
        </p>
      </div>

      <div>
        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To respond to enquiries and provide quotes for our services</li>
          <li>To deliver, manage, and support the services you&apos;ve purchased</li>
          <li>To send follow-up communications about your enquiry or project</li>
          <li>To improve our website, services, and customer experience</li>
          <li>To comply with legal and tax obligations</li>
        </ul>
        <p>We do not sell your personal information to third parties.</p>
      </div>

      <div>
        <h2>4. Sharing Your Information</h2>
        <p>We share information only where necessary, with:</p>
        <ul>
          <li>Service providers who help us operate — e.g. Paystack for payment processing, our email and hosting providers</li>
          <li>Law enforcement or regulators, where required by Nigerian law</li>
        </ul>
      </div>

      <div>
        <h2>5. Data Security</h2>
        <p>
          We use industry-standard measures — including HTTPS encryption, secure hosting, and
          access controls — to protect your information. No method of transmission over the
          internet is 100% secure, but we work to protect your data at every stage.
        </p>
      </div>

      <div>
        <h2>6. Your Rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal information at
          any time by contacting us at info@slatech.com.ng. We will respond within a reasonable
          timeframe.
        </p>
      </div>

      <div>
        <h2>7. Cookies</h2>
        <p>
          We use essential cookies to operate the site and analytics cookies (such as Google
          Analytics and Ahrefs) to understand site traffic. You can control cookies through your
          browser settings.
        </p>
      </div>

      <div>
        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. The &ldquo;Last updated&rdquo; date at the
          top of this page reflects the most recent revision.
        </p>
      </div>
    </LegalPage>
  );
}
