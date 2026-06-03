"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiPost } from "@/lib/api";

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "EDITOR";
}

interface LoginResponse {
  token: string;
  expiresInMs: number;
  user: AdminUser;
}

interface AuthState {
  token: string | null;
  user: AdminUser | null;
  status: "loading" | "authenticated" | "anonymous";
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const STORAGE_KEY = "vdl_admin_auth";

const AuthContext = createContext<AuthState | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [status, setStatus] = useState<AuthState["status"]>("loading");

  // Restore session on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { token: string; user: AdminUser };
        setToken(parsed.token);
        setUser(parsed.user);
        setStatus("authenticated");
        return;
      }
    } catch {
      /* ignore */
    }
    setStatus("anonymous");
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await apiPost<LoginResponse>("/auth/login", { email, password });
    setToken(res.token);
    setUser(res.user);
    setStatus("authenticated");
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ token: res.token, user: res.user }),
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setStatus("anonymous");
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({ token, user, status, login, logout }),
    [token, user, status, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AdminAuthProvider");
  return ctx;
}
