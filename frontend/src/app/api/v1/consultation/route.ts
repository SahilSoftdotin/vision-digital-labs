import { NextResponse } from "next/server";
import { consultationSchema } from "@/lib/schemas";

const bookings: unknown[] = [];

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const parsed = consultationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Validation failed", errors: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const record = {
    id: bookings.length + 1,
    ...parsed.data,
    createdAt: new Date().toISOString(),
  };
  bookings.push(record);

  return NextResponse.json(
    { message: "Consultation booked.", id: record.id },
    { status: 201 },
  );
}

export function GET() {
  return NextResponse.json({ count: bookings.length });
}
