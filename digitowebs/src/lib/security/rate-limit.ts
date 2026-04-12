// Rate limiting configuration using @upstash/ratelimit
// Install: npm install @upstash/ratelimit @upstash/redis

// import { Ratelimit } from "@upstash/ratelimit";
// import { Redis } from "@upstash/redis";

// const redis = Redis.fromEnv();

// Public endpoints: generous limits
// export const publicApiLimiter = new Ratelimit({
//   redis,
//   limiter: Ratelimit.slidingWindow(60, "1 m"),
//   prefix: "ratelimit:public",
//   analytics: true,
// });

// Authenticated write endpoints: moderate limits
// export const authenticatedWriteLimiter = new Ratelimit({
//   redis,
//   limiter: Ratelimit.slidingWindow(20, "1 m"),
//   prefix: "ratelimit:auth-write",
//   analytics: true,
// });

// Auth endpoints (login, password reset): strict limits
// export const authLimiter = new Ratelimit({
//   redis,
//   limiter: Ratelimit.slidingWindow(5, "1 m"),
//   prefix: "ratelimit:auth",
//   analytics: true,
// });

// Media upload: most restrictive
// export const uploadLimiter = new Ratelimit({
//   redis,
//   limiter: Ratelimit.tokenBucket(10, "1 h", 10),
//   prefix: "ratelimit:upload",
//   analytics: true,
// });

// Identifier strategy:
// - Unauthenticated: IP address from x-forwarded-for
// - Authenticated: User ID from Supabase session

export function getClientIdentifier(
  ip: string | null,
  userId?: string
): string {
  if (userId) return `user:${userId}`;
  return `ip:${ip || "unknown"}`;
}

// Placeholder until Upstash is configured
export async function checkRateLimit(
  _identifier: string,
  _limiterType: "public" | "auth-write" | "auth" | "upload" = "public"
): Promise<{ success: boolean; remaining: number; reset: number }> {
  // TODO: Enable when Upstash Redis is configured
  return { success: true, remaining: 60, reset: Date.now() + 60000 };
}
