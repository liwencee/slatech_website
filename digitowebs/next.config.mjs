/** @type {import('next').NextConfig} */
const nextConfig = {
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
