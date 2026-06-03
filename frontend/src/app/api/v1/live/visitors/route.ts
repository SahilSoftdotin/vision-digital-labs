import { NextResponse } from "next/server";

/**
 * Demo live-visitor counter. Returns a plausible, time-varying number so the
 * UI counter feels alive without a real analytics backend.
 */
export function GET() {
  const t = Date.now() / 1000;
  const base = 48;
  const wave = Math.sin(t / 7) * 9 + Math.sin(t / 2.3) * 4;
  const visitors = Math.max(12, Math.round(base + wave));
  return NextResponse.json(
    { visitors, at: new Date().toISOString() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
