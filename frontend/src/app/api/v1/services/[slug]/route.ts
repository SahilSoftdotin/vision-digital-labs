import { NextResponse } from "next/server";
import { getService } from "@/data/services";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) {
    return NextResponse.json({ message: "Service not found" }, { status: 404 });
  }
  return NextResponse.json(service);
}
