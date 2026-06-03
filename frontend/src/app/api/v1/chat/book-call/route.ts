import { NextResponse } from "next/server";
import { consultationSchema } from "@/lib/schemas";

const calls: unknown[] = [];

/** Lets the chatbot book a call directly (same contract as /consultation). */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const parsed = consultationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Validation failed" }, { status: 422 });
  }

  calls.push({ ...parsed.data, source: "chat", createdAt: new Date().toISOString() });
  return NextResponse.json({ message: "Call booked via assistant." }, { status: 201 });
}
