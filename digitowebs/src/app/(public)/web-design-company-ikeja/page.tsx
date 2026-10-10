import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { OG_IMAGES, TWITTER_IMAGES } from "@/lib/seo/og-images";

export const metadata: Metadata = {
  title: "Web Design Company in Ikeja, Lagos",
  description:
    "Slatech Solutions Limited is a web design company at 2b Olaide Tomori, Ikeja. Meet us in person, get a free quote, and launch a mobile-first website.",
  keywords: [
    "web design company in ikeja",
    "web designer ikeja",
    "website design ikeja lagos",
    "web development company ikeja",
    "companies in ikeja",
  ],
  openGraph: {
    images: OG_IMAGES,
    title: "Web Design Company in Ikeja, Lagos",
    description: "A web design and software company in Ikeja you can visit in person. Free quote.",
    url: "https://slatech.com.ng/web-design-company-ikeja",
    type: "website",
  },
  twitter: {
    images: TWITTER_IMAGES,
    card: "summary_large_image",
    title: "Web Design Company in Ikeja, Lagos",
    description: "A web design and software company in Ikeja you can visit in person. Free quote.",
  },
  alternates: { canonical: "https://slatech.com.ng/web-design-company-ikeja" },
};

const areas = [
  {
    name: "Computer Village & Otigba",
    need: "Phone, laptop and accessory sellers who need an online catalogue or store customers can browse before walking in.",
  },
  {
    name: "Allen Avenue & Opebi",
    need: "Offices, clinics, restaurants and service businesses that need a credible website and a booking or enquiry form.",
  },
  {
    name: "Ikeja GRA",
    need: "Law firms, consultancies and professional practices that need a polished corporate site and fast enquiry handling.",
  },
  {
    name: "Alausa & Obafemi Awolowo Way",
    need: "Organisations and associations that need information-heavy sites, portals and document downloads.",
  },
  {
    name: "Oregun",
    need: "Manufacturers, distributors and logistics firms that need product catalogues, quote requests and internal tools.",
  },
];

const faqs = [
  {
    q: "Where is Slatech Solutions located in Ikeja?",
    a: "Our office is at 2b, Olaide Tomori, Ikeja, Lagos. We're open 24 hours, Monday to Saturday, and closed on Sunday.",
  },
  {
    q: "Can I meet the team in person before starting a project?",
    a: "Yes. Ikeja clients can book a face-to-face meeting at our office to walk through their project. Call or WhatsApp 08076172456 to arrange a time.",
  },
  {
    q: "How much does a website cost in Ikeja?",
    a: "Landing pages start from ₦100,000, business websites from ₦400,000, e-commerce stores from ₦600,000, and custom web applications from ₦1,200,000. Pricing is the same wherever you are in Lagos.",
  },
  {
    q: "Do you only work with businesses in Ikeja?",
    a: "No. We're based in Ikeja, but we build websites and software for businesses across Lagos, the rest of Nigeria and abroad, working remotely by WhatsApp, email and video call.",
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

export default function WebDesignCompanyIkejaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Web Design Company Ikeja", path: "/web-design-company-ikeja" }]} />

      <section className="bg-secondary py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
            2b, Olaide Tomori, Ikeja
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Web Design Company in <span className="text-primary">Ikeja, Lagos</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Slatech Solutions Limited designs and builds websites, online stores and
            business software from our office in Ikeja. If you&apos;re nearby, you can sit
            down with the team, see past work and plan your project face to face.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact" className="inline-flex items-center px-7 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors">
              Book a Meeting
            </Link>
            <a href="https://wa.me/2348076172456" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-7 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              WhatsApp 08076172456
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <AnimateOnScroll animation="slide-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Visit Us in Ikeja</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Most agencies only meet you on a video call. Because we&apos;re in Ikeja,
              businesses across the mainland can come in, review designs on a big screen
              and agree the scope in one meeting.
            </p>
            <dl className="grid grid-cols-[7rem_1fr] gap-y-3 text-sm">
              <dt className="font-semibold text-foreground">Address</dt>
              <dd className="text-muted-foreground">2b, Olaide Tomori, Ikeja, Lagos</dd>
              <dt className="font-semibold text-foreground">Hours</dt>
              <dd className="text-muted-foreground">Mon–Sat: open 24 hours · Sun: closed</dd>
              <dt className="font-semibold text-foreground">Phone</dt>
              <dd className="text-muted-foreground">08076172456 (calls & WhatsApp)</dd>
            </dl>
          </AnimateOnScroll>
          <AnimateOnScroll animation="slide-right" className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-border">
            <iframe
              title="Slatech Solutions office in Ikeja, Lagos on Google Maps"
              src="https://maps.google.com/maps?q=2b+Olaide+Tomori+Ikeja+Lagos+Nigeria&output=embed"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </AnimateOnScroll>
        </div>
      </section>

      <section className="py-20 bg-accent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 text-center">
            Websites for Every Part of Ikeja
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            Ikeja is Lagos&apos;s state capital and one of its busiest commercial districts.
            Different parts of it need different kinds of websites.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.map((a, i) => (
              <AnimateOnScroll key={a.name} delay={i * 60} className="h-full">
                <div className="h-full bg-white rounded-2xl p-6 border border-border">
                  <h3 className="font-bold text-foreground mb-2">{a.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{a.need}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">Ikeja Web Design FAQs</h2>
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
            Serving businesses beyond Ikeja too — see our{" "}
            <Link href="/web-design-company-lagos" className="text-primary font-semibold hover:underline">Lagos</Link> and{" "}
            <Link href="/web-design-company-nigeria" className="text-primary font-semibold hover:underline">Nigeria</Link> pages,
            or the full{" "}
            <Link href="/blog/how-much-does-web-design-cost-in-nigeria" className="text-primary font-semibold hover:underline">2026 price guide</Link>.
          </p>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Start Your Website in Ikeja</h2>
          <p className="text-white/80 mb-8">Tell us about your business — we&apos;ll send a free, itemised quote.</p>
          <Link href="/contact" className="inline-flex items-center px-8 py-3.5 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors">
            Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
