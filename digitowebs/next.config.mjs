/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the project root: a stray package-lock.json in the Hostinger home
  // directory otherwise makes Next.js treat /home/<user> as the workspace root.
  outputFileTracingRoot: import.meta.dirname,
  turbopack: { root: import.meta.dirname },

  // Disable X-Powered-By header
  poweredByHeader: false,

  // Redirect www → non-www (removes duplicate-content / canonical split)
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.slatech.com.ng" }],
        destination: "https://slatech.com.ng/:path*",
        permanent: true,
      },
      // Old WordPress-era URLs still reported as 404 in Search Console. Only
      // pages with a real equivalent are redirected; WP system URLs (/page/N,
      // /feed, /category, /wp-*) are left as 404 on purpose.
      ...[
        "/get-ahead-of-your-competition-our-proven-digital",
        "/unlock-the-power-of-digital-marketing-our-services",
        "/revolutionize-your-business-with-our-cutting-edge",
        "/drive-traffic-and-convert-leads-with-our-expert-digital",
        "/digital-marketing-made-easy-let-our-team-handle",
      ].map((source) => ({
        source,
        destination: "/blog/digital-marketing-strategies-nigerian-businesses",
        permanent: true,
      })),
      { source: "/blog-digitalagency-v3", destination: "/blog", permanent: true },
    ];
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },

  // Image optimization domains
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
