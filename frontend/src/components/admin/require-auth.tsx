"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/admin/auth-context";

/** Gate for protected admin pages — redirects to login when not authenticated. */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "anonymous") router.replace("/admin/login");
  }, [status, router]);

  if (status !== "authenticated") {
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="size-6 animate-spin text-primary-2" />
      </div>
    );
  }
  return <>{children}</>;
}
