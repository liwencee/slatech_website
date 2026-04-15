import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payment Successful — Training",
  description: "Your Slatech Digital Training registration is confirmed.",
  robots: { index: false, follow: false },
};

export default function TrainingSuccessPage({
  searchParams,
}: {
  searchParams: { ref?: string; course?: string };
}) {
  const course = searchParams.course ?? "your course";
  const ref    = searchParams.ref    ?? "";

  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-accent px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center border border-border">
        {/* Success icon */}
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">Payment Successful!</h1>
        <p className="text-muted-foreground text-sm mb-4">
          You have successfully registered for{" "}
          <span className="font-semibold text-primary">{decodeURIComponent(course)}</span>.
        </p>

        {ref && (
          <p className="text-xs text-muted-foreground bg-accent rounded-lg px-4 py-2 mb-6 font-mono">
            Reference: {ref}
          </p>
        )}

        <p className="text-sm text-muted-foreground mb-8">
          We will contact you within 24 hours with your class details and onboarding
          information. Check your email or reach us on WhatsApp.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://wa.me/2348076172456"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm"
          >
            Chat on WhatsApp
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-accent text-foreground font-semibold rounded-lg border border-border hover:bg-gray-100 transition-colors text-sm"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
