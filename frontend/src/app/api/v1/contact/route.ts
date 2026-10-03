import { NextResponse } from "next/server";
import { contactSchema, type ContactInput } from "@/lib/schemas";

/**
 * Receives a contact enquiry and delivers it by email.
 *
 * This used to push submissions into a module-level array and return 201. On Vercel that array
 * lives for the lifetime of a single serverless invocation, so every enquiry was discarded while
 * the visitor was told we would be in touch within one business day. Nothing read it, nothing
 * forwarded it, nothing persisted it.
 *
 * Two rules follow, and they are the whole point of this file.
 *
 * Only claim success when the message has actually been delivered. If delivery fails the caller
 * gets an error and a way to reach us directly. A false confirmation is worse than a visible
 * failure, because it stops the visitor trying again.
 *
 * Never lose an enquiry silently. When delivery fails the submission is written to the server log,
 * which outlives the request, so it can be recovered. That happens only on failure: logging names,
 * emails and phone numbers on every submission would be a quiet second copy of personal data with
 * no retention story behind it.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** Where enquiries go. */
const TO = process.env.CONTACT_TO ?? "hello@visiondigitallab.com";

/**
 * Resend sends from its own onboarding domain with no DNS setup, but only to the address that owns
 * the Resend account - which is enough here, because TO is us. Set CONTACT_FROM once a domain is
 * verified, so replies and deliverability come from visiondigitallab.com instead.
 */
const FROM = process.env.CONTACT_FROM ?? "VisionOne <onboarding@resend.dev>";

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

  const enquiry = parsed.data;
  const receivedAt = new Date().toISOString();
  const delivery = await deliver(enquiry, receivedAt);

  if (!delivery.ok) {
    // The only place an enquiry is written down other than the email itself. Without this, a
    // delivery outage loses the lead entirely and we never learn it arrived.
    console.error(
      "[contact] DELIVERY FAILED - enquiry preserved here:",
      JSON.stringify({ receivedAt, reason: delivery.reason, enquiry }),
    );
    return NextResponse.json(
      {
        message:
          `We could not send your message just now. Please email us directly at ${TO} ` +
          `and we will reply the same day.`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json(
    { message: "Thanks! We'll be in touch within one business day." },
    { status: 201 },
  );
}

async function deliver(
  enquiry: ContactInput,
  receivedAt: string,
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, reason: "RESEND_API_KEY is not configured" };
  }

  const text = [
    `Name:    ${enquiry.name}`,
    `Email:   ${enquiry.email}`,
    `Company: ${enquiry.company}`,
    `Phone:   ${enquiry.phone}`,
    `Budget:  ${enquiry.budget}`,
    `Service: ${enquiry.service}`,
    "",
    enquiry.details,
    "",
    `Received ${receivedAt}`,
  ].join("\n");

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        // Hitting reply goes straight back to the enquirer, not to the sending domain.
        reply_to: enquiry.email,
        subject: `New enquiry: ${enquiry.company} (${enquiry.service})`,
        text,
      }),
      // Someone is waiting on this response, so do not hang on a slow upstream.
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return {
        ok: false,
        reason: `Resend returned ${res.status}: ${detail.slice(0, 200)}`,
      };
    }
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      reason: err instanceof Error ? err.message : "unknown transport failure",
    };
  }
}
