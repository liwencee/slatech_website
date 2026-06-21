import { MetadataRoute } from "next";

const blogSlugs = [
  "why-nigerian-businesses-need-professional-website",
  "how-to-rank-on-google-nigeria-seo-guide",
  "ecommerce-in-nigeria-how-to-start-selling-online",
  "ecommerce-conversion-tips",
  "website-security-guide",
  "choosing-web-hosting",
  "what-is-seo-and-why-your-business-needs-it",
  "complete-guide-growing-business-online-nigeria",
  "10-reasons-nigerian-business-needs-website-2026",
  "digital-marketing-strategies-nigerian-businesses",
  "how-to-choose-web-designer-lagos",
  "social-media-vs-website-nigerian-business",
  "how-to-set-up-whatsapp-business-nigeria",
  "why-your-restaurant-needs-a-website-nigeria",
  "how-to-build-a-brand-for-your-small-business-nigeria",
  "importance-of-mobile-responsive-design",
  "google-my-business-guide-nigeria",
  "web-design-trends-2026",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://slatech.com.ng";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/website-design`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/services/ecommerce`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/services/seo`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/services/hosting`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services/management`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/portfolio`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/training`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
  ];

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticPages, ...blogPages];
}
