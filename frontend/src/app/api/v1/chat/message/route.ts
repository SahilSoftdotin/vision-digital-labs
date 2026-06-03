import { NextResponse } from "next/server";
import { chatMessageSchema } from "@/lib/schemas";
import { chatProvider } from "@/lib/chat/provider";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const parsed = chatMessageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Validation failed" },
      { status: 422 },
    );
  }

  const reply = await chatProvider.reply(
    parsed.data.message,
    parsed.data.history,
  );
  return NextResponse.json({ reply });
}
