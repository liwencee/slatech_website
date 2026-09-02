import { MetadataRoute } from "next";

/**
 * Private paths that should never be crawled by anything.
 * Note: /_next/ is deliberately NOT blocked — Google and other renderers
 * need the JS/CSS bundles under /_next/static to render pages correctly.
 * Blocking it makes the site look broken to crawlers.
 */
const PRIVATE_PATHS = ["/admin", "/admin/", "/api/", "/login", "/private/"];

/**
 * AI crawlers, listed explicitly so their access is intentional and visible
 * rather than an accident of the wildcard rule. Allowing these is what lets
 * the site be cited in AI answers (ChatGPT, Claude, Perplexity, Copilot) and
 * in Google's AI Overviews.
 */
const AI_BOTS = [
  "GPTBot",             // OpenAI — ChatGPT browsing & training
  "OAI-SearchBot",      // OpenAI — ChatGPT search results
  "ChatGPT-User",       // OpenAI — user-initiated page fetches
  "ClaudeBot",          // Anthropic — Claude
  "Claude-Web",         // Anthropic — legacy crawler
  "anthropic-ai",       // Anthropic — legacy crawler
  "PerplexityBot",      // Perplexity
  "Perplexity-User",    // Perplexity — user-initiated fetches
  "Google-Extended",    // Google — Gemini & AI Overviews inclusion
  "Applebot",           // Apple — Siri/Spotlight
  "Applebot-Extended",  // Apple — AI training
  "CCBot",              // Common Crawl — feeds many AI datasets
  "Amazonbot",          // Amazon
  "meta-externalagent", // Meta AI
  "cohere-ai",          // Cohere
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: every crawler may read the whole public site.
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
      // Major search engines, stated explicitly.
      {
        userAgent: ["Googlebot", "Googlebot-Image", "Bingbot", "DuckDuckBot"],
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
      // AI assistants and answer engines.
      {
        userAgent: AI_BOTS,
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
    ],
    sitemap: "https://slatech.com.ng/sitemap.xml",
    host: "https://slatech.com.ng",
  };
}
