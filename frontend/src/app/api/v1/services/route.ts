import { NextResponse } from "next/server";
import { services } from "@/data/services";

export function GET() {
  return NextResponse.json(services);
}
