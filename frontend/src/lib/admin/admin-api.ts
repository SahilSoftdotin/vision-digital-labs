import { apiBase } from "@/lib/api";

/**
 * Authenticated admin fetch helpers. Token comes from the auth context and is
 * passed in explicitly so these stay pure/testable. On 401 the caller should
 * log out (handled in the useAdminApi hook).
 */

export class UnauthorizedError extends Error {}

async function request<T>(
  path: string,
  token: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${apiBase}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      ...init?.headers,
    },
  });
  if (res.status === 401 || res.status === 403) {
    throw new UnauthorizedError("Session expired or access denied");
  }
  if (!res.ok) {
    let msg = `${init?.method ?? "GET"} ${path} failed: ${res.status}`;
    try {
      msg = (await res.json())?.message ?? msg;
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const adminApi = {
  get: <T>(path: string, token: string) => request<T>(path, token),
  post: <T>(path: string, token: string, body: unknown) =>
    request<T>(path, token, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(path: string, token: string, body: unknown) =>
    request<T>(path, token, { method: "PUT", body: JSON.stringify(body) }),
  del: (path: string, token: string) =>
    request<void>(path, token, { method: "DELETE" }),
};
