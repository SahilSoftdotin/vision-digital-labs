"use client";

import { useCallback, useMemo } from "react";
import { useAuth } from "./auth-context";
import { adminApi, UnauthorizedError } from "./admin-api";

/**
 * Token-bound admin API. Automatically logs the user out (→ redirected to login
 * by the route guard) when the server rejects the token.
 */
export function useAdminApi() {
  const { token, logout } = useAuth();

  const wrap = useCallback(
    async <T>(fn: () => Promise<T>): Promise<T> => {
      try {
        return await fn();
      } catch (err) {
        if (err instanceof UnauthorizedError) logout();
        throw err;
      }
    },
    [logout],
  );

  return useMemo(
    () => ({
      get: <T>(path: string) => wrap(() => adminApi.get<T>(path, token ?? "")),
      post: <T>(path: string, body: unknown) =>
        wrap(() => adminApi.post<T>(path, token ?? "", body)),
      put: <T>(path: string, body: unknown) =>
        wrap(() => adminApi.put<T>(path, token ?? "", body)),
      del: (path: string) => wrap(() => adminApi.del(path, token ?? "")),
    }),
    [token, wrap],
  );
}
