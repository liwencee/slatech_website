import { MetadataRoute } from "next";

const blogSlugs = [
  "how-to-set-up-whatsapp-business-nigeria",
  "why-your-restaurant-needs-a-website-nigeria",
  "how-to-build-a-brand-for-your-small-business-nigeria",
  "why-nigerian-businesses-need-professional-website",
  "how-to-rank-on-google-nigeria-seo-guide",
  "ecommerce-in-nigeria-how-to-start-selling-online",
  "web-design-trends-2026",
  "boost-seo-rankings",
  "mobile-friendly-website",
  "ecommerce-conversion-tips",
  "website-security-guide",
  "choosing-web-hosting",
  "what-is-seo-and-why-your-business-needs-it",
  "complete-guide-growing-business-online-nigeria",
  "10-reasons-nigerian-business-needs-website-2026",
  "digital-marketing-strategies-nigerian-businesses",
  "how-to-choose-web-designer-lagos",
  "social-media-vs-website-nigerian-business",
  "how-much-does-web-design-cost-in-nigeria",
  "web-design-in-lagos-what-professional-design-actually-involves",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://slatech.com.ng";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/portfolio`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/training`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/refund`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticPages, ...blogPages];
}
