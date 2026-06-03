import { NextResponse } from "next/server";
import { chatLeadSchema } from "@/lib/schemas";

const leads: unknown[] = [];

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const parsed = chatLeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Validation failed" }, { status: 422 });
  }

  leads.push({ ...parsed.data, createdAt: new Date().toISOString() });
  return NextResponse.json(
    { message: "Thanks! A strategist will reach out shortly." },
    { status: 201 },
  );
}
