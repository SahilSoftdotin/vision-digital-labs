import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas";

/** In-memory store stands in for the DB until the Spring Boot backend lands. */
const submissions: unknown[] = [];

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Validation failed", errors: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const record = {
    id: submissions.length + 1,
    ...parsed.data,
    createdAt: new Date().toISOString(),
  };
  submissions.push(record);

  return NextResponse.json(
    { message: "Thanks! We'll be in touch within one business day.", id: record.id },
    { status: 201 },
  );
}

export function GET() {
  return NextResponse.json({ count: submissions.length });
}
