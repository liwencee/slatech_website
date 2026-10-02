import { NextRequest, NextResponse } from "next/server";

// TEMPORARY diagnostic: shows how Hostinger's CDN/proxy forwards the client IP,
// so the rate limiter can read the right header. Remove once that is fixed.
// Returns only the caller's own IP/forwarding headers — never cookies or auth.
export const dynamic = "force-dynamic";

const IP_HEADER = /(forward|real-ip|client-ip|connecting-ip|true-client|^x-hcdn|^via$)/i;

export function GET(req: NextRequest) {
  const headers: Record<string, string> = {};
  req.headers.forEach((value, name) => {
    if (IP_HEADER.test(name)) headers[name] = value;
  });
  return NextResponse.json(headers, { headers: { "Cache-Control": "no-store" } });
}
