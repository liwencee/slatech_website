import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { OG_IMAGES, TWITTER_IMAGES } from "@/lib/seo/og-images";

export const metadata: Metadata = {
  title: { absolute: "Web Design Company in Nigeria | Slatech Solutions Limited" },
  description:
    "Websites built for Nigerian customers: mobile-first, Paystack-ready and fast on mobile data. Landing pages from ₦100,000. Serving businesses nationwide.",
  keywords: [
    "web design company in nigeria",
    "best web design company in nigeria",
    "website design nigeria",
    "web developer in nigeria",
    "web design agency nigeria",
  ],
  openGraph: {
    images: OG_IMAGES,
    title: "Web Design Company in Nigeria | Slatech Solutions Limited",
    description: "Mobile-first, Paystack-ready websites for Nigerian businesses, built from Lagos and delivered nationwide.",
    url: "https://slatech.com.ng/web-design-company-nigeria",
    type: "website",
  },
  twitter: {
    images: TWITTER_IMAGES,
    card: "summary_large_image",
    title: "Web Design Company in Nigeria | Slatech Solutions Limited",
    description: "Mobile-first, Paystack-ready websites for Nigerian businesses, built from Lagos and delivered nationwide.",
  },
  alternates: { canonical: "https://slatech.com.ng/web-design-company-nigeria" },
};

const realities = [
  {
    title: "Most visitors are on a phone, on mobile data",
    text: "Pages are designed for small screens first and kept light, so they load quickly on 4G and don't waste a visitor's data.",
  },
  {
    title: "Customers pay in naira, their way",
    text: "Paystack and Flutterwave checkouts support cards, bank transfer and USSD, so customers aren't lost at the payment step.",
  },
  {
    title: "WhatsApp is how people ask questions",
    text: "Click-to-chat buttons and enquiry forms route straight to your team's WhatsApp and email, so leads don't sit unanswered.",
  },
  {
    title: "A local domain builds trust",
    text: "We can register a .com.ng domain in your business name — you own it, along with the hosting account and the code.",
  },
  {
    title: "Customer data has rules",
    text: "Contact forms, consent and your privacy policy should reflect the Nigeria Data Protection Act 2023, especially if you collect customer details.",
  },
  {
    title: "Search happens on Google",
    text: "Every site is structured for Google from day one — titles, fast pages, schema and a Google Business Profile that points to it.",
  },
];

const steps = [
  { n: "1", title: "Free consultation", text: "A call or WhatsApp chat about what the site must do, then an itemised quote." },
  { n: "2", title: "50% deposit", text: "Work starts with a 50% deposit; the balance is due within 2 months." },
  { n: "3", title: "Design & build", text: "Landing pages in about 2 days; business sites and online stores in about 3 weeks." },
  { n: "4", title: "Launch & support", text: "We launch, hand over full access, and stay available for updates and maintenance." },
];

const faqs = [
  {
    q: "Do you work with businesses outside Lagos?",
    a: "Yes. We're based in Ikeja, Lagos, and work with businesses across Nigeria remotely. Consultations, design reviews and approvals happen by WhatsApp, email and video call.",
  },
  {
    q: "How much does a website cost in Nigeria?",
    a: "With Slatech Solutions Limited, landing pages start from ₦100,000, business websites from ₦400,000, e-commerce stores from ₦600,000, and custom web applications from ₦1,200,000 upwards.",
  },
  {
    q: "Can I accept online payments in Nigeria?",
    a: "Yes. We integrate Paystack or Flutterwave so customers can pay by card, bank transfer or USSD. The payment provider charges a fee per transaction, which varies by provider.",
  },
  {
    q: "Can I pay for my website in instalments?",
    a: "Yes. Pay a 50% deposit to start, and the balance within 2 months of the project starting.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function WebDesignCompanyNigeriaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Web Design Company Nigeria", path: "/web-design-company-nigeria" }]} />

      <section className="bg-secondary py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
            Serving businesses nationwide
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Web Design Company in <span className="text-primary">Nigeria</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A website built abroad often ignores how Nigerians actually browse, pay and
            get in touch. Slatech Solutions Limited builds sites around those realities,
            for businesses in every state.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-10 text-center">
            Built for the Nigerian Market
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {realities.map((r, i) => (
              <AnimateOnScroll key={r.title} delay={i * 60} className="h-full">
                <div className="h-full bg-accent rounded-2xl p-6">
                  <h3 className="font-bold text-foreground mb-2">{r.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-accent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 text-center">
            Working Together From Anywhere in Nigeria
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            Whether you&apos;re in Abuja, Port Harcourt, Ibadan or Kano, the process is the same.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <AnimateOnScroll key={s.n} delay={i * 80} className="h-full">
                <div className="h-full bg-white rounded-2xl p-6 border border-border">
                  <span className="text-primary font-bold text-sm">Step {s.n}</span>
                  <h3 className="font-bold text-foreground mt-1 mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">Questions From Nigerian Businesses</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group bg-accent rounded-xl p-5">
                <summary className="cursor-pointer font-semibold text-foreground list-none flex items-center justify-between gap-4">
                  {f.q}
                  <span className="text-primary shrink-0 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                </summary>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center mt-8">
            Prefer to meet in person? Visit our{" "}
            <Link href="/web-design-company-ikeja" className="text-primary font-semibold hover:underline">Ikeja office</Link>, see{" "}
            <Link href="/web-design-company-lagos" className="text-primary font-semibold hover:underline">web design in Lagos</Link>, or read the full{" "}
            <Link href="/blog/how-much-does-web-design-cost-in-nigeria" className="text-primary font-semibold hover:underline">2026 price guide</Link>.
          </p>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Get a Website Built for Nigeria</h2>
          <p className="text-white/80 mb-8">Tell us what your business needs — we&apos;ll send a free, itemised quote.</p>
          <Link href="/contact" className="inline-flex items-center px-8 py-3.5 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors">
            Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
