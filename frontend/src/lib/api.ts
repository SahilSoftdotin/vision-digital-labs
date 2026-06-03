/**
 * Typed fetch client. Defaults to the in-app mock route handlers (/api/v1)
 * but points at the real Spring Boot backend when NEXT_PUBLIC_API_URL is set.
 * Swapping backends requires no UI changes — only this base URL.
 */
const BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  ""; // empty -> same-origin Next route handlers

export const apiBase = `${BASE}/api/v1`;

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${apiBase}${path}`, {
    ...init,
    headers: { Accept: "application/json", ...init?.headers },
  });
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export async function apiPost<T>(
  path: string,
  body: unknown,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${apiBase}${path}`, {
    method: "POST",
    ...init,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...init?.headers,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    let detail = "";
    try {
      detail = (await res.json())?.message ?? "";
    } catch {
      /* ignore */
    }
    throw new Error(detail || `POST ${path} failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}
