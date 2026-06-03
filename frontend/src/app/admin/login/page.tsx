"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Lock, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/admin/auth-context";
import { Button } from "@/components/ui/button";
import { Input, Label, FieldError } from "@/components/ui/input";
import { Logo } from "@/components/layout/logo";

export default function AdminLoginPage() {
  const { login, status } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Already signed in → go to dashboard.
  useEffect(() => {
    if (status === "authenticated") router.replace("/admin");
  }, [status, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      router.replace("/admin");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Login failed. Check your details.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center px-4">
      <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
      <div className="absolute left-1/2 top-1/4 -z-10 h-60 w-[34rem] max-w-full -translate-x-1/2 rounded-full bg-secondary/15 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm rounded-2xl border border-border-strong bg-panel/70 p-8 backdrop-blur"
      >
        <div className="flex flex-col items-center text-center">
          <Logo />
          <div className="mt-6 flex items-center gap-2 text-sm text-fg-muted">
            <ShieldCheck className="size-4 text-primary-2" />
            Admin Console
          </div>
          <h1 className="mt-1 font-display text-xl font-semibold">Sign in</h1>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="username"
              placeholder="admin@visiondigitallab.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <FieldError message={error} />}

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Lock className="size-4" />
            )}
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-fg-subtle">
          Protected area. Unauthorized access is prohibited.
        </p>
      </motion.div>
    </div>
  );
}
