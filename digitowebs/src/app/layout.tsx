import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { AIChatbox } from "@/components/ui/ai-chatbox";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { AnalyticsTracker } from "@/components/ui/analytics-tracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://slatech.com.ng"),
  title: {
    default: "Slatech Solutions | #1 Web Design Company in Lagos, Nigeria",
    template: "%s | Slatech Solutions",
  },
  icons: {
    icon: "/logomark.png",
    shortcut: "/logomark.png",
    apple: "/logomark.png",
  },
  description:
    "Slatech Solutions is the leading web design company in Lagos, Ikeja, Nigeria. We build fast, beautiful, SEO-optimized websites, e-commerce stores, and provide digital marketing services for businesses across Lagos and Nigeria.",
  keywords: [
    "web design company in Lagos",
    "web design company Lagos Nigeria",
    "website design Lagos",
    "website design Ikeja",
    "web design Ikeja Lagos",
    "best web design company Nigeria",
    "affordable web design Lagos",
    "professional website design Nigeria",
    "web development company Nigeria",
    "web developer Lagos",
    "SEO services Nigeria",
    "SEO company Lagos",
    "SEO agency Ikeja",
    "ecommerce website Nigeria",
    "ecommerce website design Lagos",
    "online store Nigeria",
    "website hosting Nigeria",
    "website management Lagos",
    "digital agency Lagos Nigeria",
    "logo design Lagos Nigeria",
    "branding agency Lagos",
    "social media management Nigeria",
    "Slatech Solutions",
    "fully managed website Nigeria",
    "web design company Ikeja",
    "web agency Nigeria",
  ],
  authors: [{ name: "Slatech Solutions", url: "https://slatech.com.ng" }],
  creator: "Slatech Solutions",
  publisher: "Slatech Solutions",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://slatech.com.ng",
    siteName: "Slatech Solutions",
    title: "Slatech Solutions | #1 Web Design Company in Lagos, Nigeria",
    description:
      "We build stunning, fast, SEO-optimized websites for businesses in Lagos, Ikeja and across Nigeria. 10+ years experience. 500+ happy clients. Free consultation.",
    images: [
      {
        url: "/SLATECH  SOLUTIONS LOGO.png",
        width: 1200,
        height: 630,
        alt: "Slatech Solutions - Web Design Company in Lagos Ikeja Nigeria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Slatech Solutions | #1 Web Design Company in Lagos Nigeria",
    description:
      "Professional web design, SEO, e-commerce & digital marketing in Lagos, Ikeja, Nigeria. Get a free quote today!",
    images: ["/side_SLATECH_SOLUTIONS_LOGO.png"],
  },
  alternates: {
    canonical: "https://slatech.com.ng",
  },
  category: "Web Design & Digital Agency",
};

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Slatech Solutions",
  description:
    "Slatech Solutions is a leading web design and digital agency in Lagos, Ikeja, Nigeria, specialising in website design, e-commerce development, SEO, website hosting, branding, and fully managed website services.",
  url: "https://slatech.com.ng",
  telephone: "+2348076172456",
  email: "info@slatech.com.ng",
  foundingDate: "2014",
  priceRange: "₦₦",
  image: "https://slatech.com.ng/logomark.png",
  logo: "https://slatech.com.ng/side_SLATECH_SOLUTIONS_LOGO.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "No 2b Olaide Tomori Street, off Simbiat Abiola Way",
    addressLocality: "Ikeja",
    addressRegion: "Lagos",
    addressCountry: "NG",
    postalCode: "100271",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 6.6018,
    longitude: 3.3467,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "15:00",
    },
  ],
  areaServed: [
    { "@type": "City", name: "Lagos" },
    { "@type": "City", name: "Ikeja" },
    { "@type": "City", name: "Abuja" },
    { "@type": "State", name: "Lagos State" },
    { "@type": "Country", name: "Nigeria" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Design & Digital Services in Lagos Nigeria",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Design Lagos" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "E-Commerce Website Development Nigeria" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO Services Lagos Nigeria" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Hosting Nigeria" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Management Lagos" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fully Managed Website Service Nigeria" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Logo & Branding Design Lagos" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Social Media Management Nigeria" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Graphic Design Lagos" } },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "168",
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: ["https://wa.me/2348076172456"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
        <AIChatbox />
        <CookieConsent />
        <AnalyticsTracker />
      </body>
    </html>
  );
}
