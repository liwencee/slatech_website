import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Mobile App Development in Lagos, Nigeria — Slatech Solutions",
  description:
    "Slatech develops Android, iOS and cross-platform mobile apps for Lagos and Nigerian businesses. We help you decide the right platform before writing a line of code.",
  keywords: ["mobile app development lagos", "android app development nigeria", "ios app development nigeria", "cross platform app development nigeria"],
  openGraph: {
    title: "Mobile App Development in Lagos, Nigeria — Slatech Solutions",
    description: "Android, iOS and cross-platform mobile apps built for Nigerian businesses and their customers.",
    url: "https://slatech.com.ng/mobile-app-development-lagos",
    type: "website",
    images: [{ url: "/SLATECH  SOLUTIONS LOGO.png", width: 1200, height: 630, alt: "Slatech Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile App Development in Lagos, Nigeria — Slatech Solutions",
    description: "Android, iOS and cross-platform mobile apps built for Nigerian businesses and their customers.",
    images: ["/side_SLATECH_SOLUTIONS_LOGO.png"],
  },
  alternates: { canonical: "https://slatech.com.ng/mobile-app-development-lagos" },
};

const decisionFactors = [
  {
    platform: "Android",
    bestFor: "Reaching the widest number of Nigerian users",
    detail: "Android holds the large majority of the Nigerian smartphone market. If your priority is maximum local reach with lower-cost devices, Android-first is usually the right call.",
  },
  {
    platform: "iOS",
    bestFor: "Targeting higher-income or diaspora customers",
    detail: "iOS users are a smaller but often higher-spending segment in Nigeria, and iOS is close to essential if you have international or diaspora customers.",
  },
  {
    platform: "Cross-Platform",
    bestFor: "Launching on both without doubling the budget",
    detail: "A single codebase deployed to Android and iOS — the right choice for most Nigerian businesses that need both platforms but not two separate development teams.",
  },
];

export default function MobileAppDevelopmentLagosPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Mobile App Development Lagos", path: "/mobile-app-development-lagos" }]} />

      <section className="bg-secondary py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
            Mobile App Development in Lagos
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Android, iOS, or Both — <span className="text-primary">We Help You Decide First</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            The biggest mistake in mobile app projects isn&apos;t the build — it&apos;s choosing
            the wrong platform strategy before the build starts. Slatech helps Lagos
            businesses make that call correctly.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-10 text-center">
            Which Platform Fits Your Business?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {decisionFactors.map((d) => (
              <div key={d.platform} className="bg-accent rounded-2xl p-6">
                <h3 className="font-bold text-foreground mb-1">{d.platform}</h3>
                <p className="text-sm font-semibold text-primary mb-3">{d.bestFor}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-accent">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Apps Connected to a Real Backend</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            A mobile app is rarely just a mobile app — it usually needs to talk to a backend,
            a payment system, or an admin dashboard your team uses to manage it. We build the
            full stack, not just the app. See the full{" "}
            <Link href="/services#mobile" className="text-primary font-semibold hover:underline">Mobile Application Development service</Link>{" "}
            or the technologies behind it on our{" "}
            <Link href="/technology" className="text-primary font-semibold hover:underline">Technology page</Link>.
          </p>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Not Sure Which Platform You Need?</h2>
          <p className="text-white/80 mb-8">Tell us about your users and budget — we&apos;ll recommend the right approach.</p>
          <Link href="/contact" className="inline-flex items-center px-8 py-3.5 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors">
            Discuss Your App
          </Link>
        </div>
      </section>
    </>
  );
}
