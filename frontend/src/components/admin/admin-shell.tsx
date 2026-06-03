"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  FolderKanban,
  Quote,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/admin/auth-context";
import { Logo } from "@/components/layout/logo";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/casestudies", label: "Case Studies", icon: FolderKanban },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const NavLinks = () => (
    <nav className="flex flex-col gap-1">
      {NAV.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname?.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary/15 text-fg"
                : "text-fg-muted hover:bg-white/[0.05] hover:text-fg",
            )}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[16rem_1fr]">
      {/* Sidebar (desktop) */}
      <aside className="hidden flex-col border-r border-border bg-bg-2/40 p-5 lg:flex">
        <Logo />
        <div className="mt-8 flex-1">
          <NavLinks />
        </div>
        <UserCard name={user?.name} role={user?.role} onLogout={logout} />
      </aside>

      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-border bg-bg-2/40 p-4 lg:hidden">
        <Logo />
        <button
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-full border border-border-strong"
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <div className="border-b border-border bg-bg-2/60 p-4 lg:hidden">
          <NavLinks />
          <div className="mt-4">
            <UserCard name={user?.name} role={user?.role} onLogout={logout} />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex min-h-screen flex-col">
        <div className="hidden items-center justify-end gap-3 border-b border-border px-8 py-3 lg:flex">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg"
          >
            View site <ExternalLink className="size-3.5" />
          </Link>
        </div>
        <div className="flex-1 p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}

function UserCard({
  name,
  role,
  onLogout,
}: {
  name?: string;
  role?: string;
  onLogout: () => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-panel/50 p-3">
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-semibold text-[#04121a]">
          {name?.[0] ?? "A"}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-fg">{name ?? "Admin"}</p>
          <p className="text-xs text-fg-subtle">{role}</p>
        </div>
      </div>
      <button
        onClick={onLogout}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-border-strong px-3 py-2 text-xs font-medium text-fg-muted transition-colors hover:border-red-500/40 hover:text-red-300"
      >
        <LogOut className="size-3.5" />
        Sign out
      </button>
    </div>
  );
}
