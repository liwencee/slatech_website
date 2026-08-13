import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms and conditions for using Slatech Solutions' website, web design, hosting, and digital marketing services.",
  alternates: { canonical: "https://slatech.com.ng/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="August 2026">
      <div>
        <h2>1. Agreement to Terms</h2>
        <p>
          By accessing slatech.com.ng or engaging Slatech Solutions for web design, e-commerce,
          SEO, hosting, branding, social media, or graphic design services, you agree to these
          Terms of Service. If you do not agree, please do not use our website or services.
        </p>
      </div>

      <div>
        <h2>2. Our Services</h2>
        <p>
          We provide website design and development, e-commerce solutions, SEO, website hosting
          and management, branding, social media management, and graphic design services. The
          exact scope, deliverables, timeline, and cost of any project will be agreed with you in
          writing (via email, invoice, or a signed proposal) before work begins.
        </p>
      </div>

      <div>
        <h2>3. Quotes and Payment</h2>
        <ul>
          <li>Quotes provided via our website, chatbot, or in person are estimates and may be revised once full project requirements are confirmed.</li>
          <li>Projects typically require a deposit before work begins, with the balance due on completion or per an agreed payment schedule.</li>
          <li>Payments are processed securely through Paystack. We do not store your card details.</li>
          <li>Late payment may result in a pause of services until outstanding amounts are settled.</li>
        </ul>
      </div>

      <div>
        <h2>4. Client Responsibilities</h2>
        <p>
          You agree to provide accurate project information, timely feedback, and any content
          (text, images, logos) needed to complete your project. Delays in providing these may
          affect delivery timelines.
        </p>
      </div>

      <div>
        <h2>5. Intellectual Property</h2>
        <p>
          Upon full payment, ownership of the final delivered website or design transfers to you,
          except for third-party assets (stock photos, licensed fonts, plugins) which remain
          subject to their own licences. Slatech Solutions retains the right to showcase completed
          work in our portfolio unless otherwise agreed in writing.
        </p>
      </div>

      <div>
        <h2>6. Revisions and Support</h2>
        <p>
          Each project includes an agreed number of revision rounds. Additional revisions,
          ongoing maintenance, or support outside the original scope may be billed separately or
          require a maintenance plan.
        </p>
      </div>

      <div>
        <h2>7. Limitation of Liability</h2>
        <p>
          Slatech Solutions will perform services with reasonable skill and care but does not
          guarantee specific business outcomes (e.g. exact search rankings, sales figures, or
          traffic volumes), as these depend on many factors outside our control.
        </p>
      </div>

      <div>
        <h2>8. Termination</h2>
        <p>
          Either party may terminate a project agreement with written notice. Fees for work
          already completed remain payable. Deposits are non-refundable once work has commenced —
          see our <a href="/refund" className="text-primary font-medium">Refund Policy</a> for details.
        </p>
      </div>

      <div>
        <h2>9. Governing Law</h2>
        <p>
          These terms are governed by the laws of the Federal Republic of Nigeria. Any disputes
          will first be addressed through good-faith negotiation between both parties.
        </p>
      </div>

      <div>
        <h2>10. Changes to These Terms</h2>
        <p>
          We may update these terms from time to time. Continued use of our services after
          changes constitutes acceptance of the revised terms.
        </p>
      </div>
    </LegalPage>
  );
}
