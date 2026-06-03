import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

/**
 * On-demand ISR revalidation. The Spring Boot backend POSTs here after content
 * edits with a shared secret + the cache tags to refresh.
 *
 * We use revalidateTag (not revalidatePath): our content fetches are tagged via
 * `next: { tags: [...] }`, and revalidateTag purges both the tagged Data Cache
 * AND the Full Route Cache of any page that used the tag (home, listings, detail).
 * Next 16's second arg is the stale-while-revalidate window ('max' = longest).
 */
const VALID_TAGS = new Set(["services", "casestudies", "testimonials", "stats"]);

export async function POST(req: Request) {
  let body: { secret?: string; tags?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const expected = process.env.REVALIDATE_SECRET;
  if (!expected || body.secret !== expected) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const tags = (
    Array.isArray(body.tags)
      ? (body.tags.filter((t) => typeof t === "string") as string[])
      : []
  ).filter((t) => VALID_TAGS.has(t));

  for (const tag of tags) {
    revalidateTag(tag, "max");
  }

  return NextResponse.json({ revalidated: true, tags, now: Date.now() });
}
