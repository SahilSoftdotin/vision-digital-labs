import { NextResponse } from "next/server";
import { siteStats } from "@/data/stats";

export function GET() {
  return NextResponse.json(siteStats);
}
