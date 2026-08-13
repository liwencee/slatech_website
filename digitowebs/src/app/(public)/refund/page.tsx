import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/legal-page";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Slatech Solutions' refund policy for web design, hosting, and digital marketing services and deposits.",
  alternates: { canonical: "https://slatech.com.ng/refund" },
  robots: { index: true, follow: true },
};

export default function RefundPage() {
  return (
    <LegalPage title="Refund Policy" updated="August 2026">
      <div>
        <h2>1. Deposits</h2>
        <p>
          Project deposits are used to secure your project slot and begin work — including
          research, planning, and design — immediately after payment. Because work commences
          right away, deposits are <strong>non-refundable</strong> once a project has started.
        </p>
      </div>

      <div>
        <h2>2. Before Work Begins</h2>
        <p>
          If you cancel a project before any work has commenced (i.e. before we begin design,
          development, or setup), you are entitled to a full refund of any payment made, minus
          any payment processing fees charged by Paystack.
        </p>
      </div>

      <div>
        <h2>3. Partial Refunds</h2>
        <p>
          If a project is cancelled partway through, you will be invoiced for work completed up
          to that point, calculated as a proportion of the total project value. Any remaining
          balance from your deposit, after deducting the value of completed work, will be
          refunded.
        </p>
      </div>

      <div>
        <h2>4. Hosting and Recurring Services</h2>
        <p>
          Hosting, website management, and other subscription-based services are billed in
          advance. Cancelling a subscription stops future billing but does not entitle you to a
          refund for the current billing period already paid for.
        </p>
      </div>

      <div>
        <h2>5. Quality Issues</h2>
        <p>
          If you are not satisfied with delivered work, please contact us first — we will work
          with you through the agreed revision rounds to resolve the issue. Refunds for quality
          concerns are considered on a case-by-case basis if we are unable to deliver work that
          reasonably matches the agreed project brief.
        </p>
      </div>

      <div>
        <h2>6. Non-Refundable Items</h2>
        <ul>
          <li>Third-party costs already paid on your behalf (domain names, licensed plugins, stock assets, paid ad spend)</li>
          <li>Completed and delivered work that has been approved by you</li>
          <li>Training sessions already attended</li>
        </ul>
      </div>

      <div>
        <h2>7. How to Request a Refund</h2>
        <p>
          Email info@slatech.com.ng or reach us on WhatsApp with your project or order details.
          We aim to review and respond to refund requests within 3–5 business days.
        </p>
      </div>
    </LegalPage>
  );
}
