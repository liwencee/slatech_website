import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DigitoWebs - The Best Web Design Company",
    template: "%s | DigitoWebs",
  },
  description:
    "We help small and large businesses create stunning websites that are beautiful, fast, secure, and mobile-friendly. 10+ years of experience.",
  keywords: [
    "web design",
    "web development",
    "ecommerce",
    "SEO",
    "website hosting",
    "digital agency",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "DigitoWebs",
  },
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
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
