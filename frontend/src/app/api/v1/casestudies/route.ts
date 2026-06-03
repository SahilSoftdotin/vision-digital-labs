import { NextResponse } from "next/server";
import { caseStudies } from "@/data/case-studies";

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const industry = searchParams.get("industry");
  const q = searchParams.get("q")?.toLowerCase();

  let results = caseStudies;
  if (industry && industry !== "All") {
    results = results.filter((c) => c.industry === industry);
  }
  if (q) {
    results = results.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.client.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }
  return NextResponse.json(results);
}
