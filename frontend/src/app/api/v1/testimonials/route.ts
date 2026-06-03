import { NextResponse } from "next/server";
import { testimonials } from "@/data/testimonials";

export function GET() {
  return NextResponse.json(testimonials);
}
