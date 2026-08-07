/**
 * In-memory sliding-window rate limiter.
 *
 * Deliberately dependency-free: the site runs as a single Node process on
 * Hostinger, so a per-process store is effective here and avoids requiring
 * Redis/Upstash credentials to be provisioned before abuse protection works.
 *
 * If the app is ever scaled to multiple instances, swap the `hits` Map for a
 * shared store (Upstash/Redis) — the public API of this module stays the same.
 */

type Bucket = { timestamps: number[] };

const buckets = new Map<string, Bucket>();

// Windows are small and traffic is modest, but prune anyway so a flood of
// unique IPs can't grow the map without bound.
const MAX_TRACKED_KEYS = 10_000;
let lastSweep = Date.now();

function sweep(now: number, windowMs: number) {
  // Sweep at most once a minute.
  if (now - lastSweep < 60_000 && buckets.size < MAX_TRACKED_KEYS) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    const alive = bucket.timestamps.filter((t) => now - t < windowMs);
    if (alive.length === 0) buckets.delete(key);
    else bucket.timestamps = alive;
  }
}

export type LimiterType = "public" | "email" | "auth-write" | "auth" | "upload";

/**
 * Limits are tuned to be invisible to real users but to make automated abuse
 * (mail bombing, spam relay, lead-table flooding) impractical.
 *
 * `email` is the strictest tier: those endpoints send mail to an
 * attacker-supplied address, so they carry SMTP-reputation risk.
 */
const LIMITS: Record<LimiterType, { max: number; windowMs: number }> = {
  public: { max: 60, windowMs: 60_000 },       // 60/min
  email: { max: 5, windowMs: 60 * 60_000 },    // 5/hour
  "auth-write": { max: 20, windowMs: 60_000 }, // 20/min
  auth: { max: 5, windowMs: 60_000 },          // 5/min
  upload: { max: 10, windowMs: 60 * 60_000 },  // 10/hour
};

/**
 * Derive a client identifier. Prefers the authenticated user id; otherwise
 * falls back to the client IP taken from the proxy headers Hostinger/LiteSpeed
 * sets. Only the FIRST entry of x-forwarded-for is used — the rest of the
 * chain is attacker-appendable and must never be trusted.
 */
export function getClientIdentifier(
  ip: string | null,
  userId?: string
): string {
  if (userId) return `user:${userId}`;
  return `ip:${ip || "unknown"}`;
}

export function getClientIp(headers: Headers): string | null {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip") || headers.get("cf-connecting-ip");
}

export async function checkRateLimit(
  identifier: string,
  limiterType: LimiterType = "public"
): Promise<{ success: boolean; remaining: number; reset: number }> {
  const { max, windowMs } = LIMITS[limiterType];
  const now = Date.now();

  sweep(now, windowMs);

  const key = `${limiterType}:${identifier}`;
  const bucket = buckets.get(key) ?? { timestamps: [] };

  // Drop hits that have aged out of the window.
  const recent = bucket.timestamps.filter((t) => now - t < windowMs);
  const oldest = recent[0] ?? now;
  const reset = oldest + windowMs;

  if (recent.length >= max) {
    bucket.timestamps = recent;
    buckets.set(key, bucket);
    return { success: false, remaining: 0, reset };
  }

  recent.push(now);
  bucket.timestamps = recent;
  buckets.set(key, bucket);

  return { success: true, remaining: max - recent.length, reset };
}

/**
 * Convenience guard for route handlers. Returns a 429 Response when the caller
 * is over the limit, or null when the request should proceed.
 */
export async function enforceRateLimit(
  request: Request,
  limiterType: LimiterType = "public"
): Promise<Response | null> {
  const identifier = getClientIdentifier(getClientIp(request.headers));
  const { success, reset } = await checkRateLimit(identifier, limiterType);
  if (success) return null;

  const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
  return new Response(
    JSON.stringify({ error: "Too many requests. Please try again later." }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(retryAfter),
      },
    }
  );
}
