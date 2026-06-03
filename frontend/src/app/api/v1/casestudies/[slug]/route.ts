import { NextResponse } from "next/server";
import { getCaseStudy } from "@/data/case-studies";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) {
    return NextResponse.json(
      { message: "Case study not found" },
      { status: 404 },
    );
  }
  return NextResponse.json(study);
}
