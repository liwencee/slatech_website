import Link from "next/link";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const facts = [
  { term: "Company", detail: "Slatech Solutions" },
  { term: "Type", detail: "Digital product and software development company" },
  { term: "Founded", detail: "2020" },
  { term: "Founder & CEO", detail: "Olalekan Akindiya" },
  { term: "Headquarters", detail: "2b, Olaide Tomori, Ikeja, Lagos, Nigeria" },
  {
    term: "Services",
    detail:
      "Website design and development, e-commerce, custom software, web applications, mobile apps, cloud and DevOps, SEO, hosting and management, branding",
  },
  { term: "Serves", detail: "Businesses across Nigeria and internationally" },
  { term: "Website design pricing", detail: "From ₦150,000 for a landing page, up to ₦1M+ for larger sites" },
  { term: "Phone / WhatsApp", detail: "08076172456 (+234 807 617 2456)" },
];

export function CompanyFactsSection() {
  return (
    <section id="what-is-slatech" className="py-16 lg:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animation="fade-up">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            What Is <span className="text-primary">Slatech Solutions</span>?
          </h2>
          <p className="text-lg text-foreground leading-relaxed mb-8">
            Slatech Solutions is a digital product and software development company
            based in Ikeja, Lagos, Nigeria. Founded in 2020, it designs and builds
            websites, e-commerce platforms, custom software, web and mobile
            applications, and cloud infrastructure for businesses in Nigeria and abroad.
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-[11rem_1fr] gap-x-6 gap-y-3 rounded-2xl border border-border bg-accent/40 p-6 text-sm">
            {facts.map((f) => (
              <div key={f.term} className="contents">
                <dt className="font-semibold text-foreground">{f.term}</dt>
                <dd className="text-muted-foreground">{f.detail}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-sm text-muted-foreground">
            Learn more on the{" "}
            <Link href="/about" className="text-primary font-semibold hover:underline">About page</Link>,
            explore our{" "}
            <Link href="/services" className="text-primary font-semibold hover:underline">services</Link>{" "}
            or see the{" "}
            <Link href="/technology" className="text-primary font-semibold hover:underline">technology we build with</Link>.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
