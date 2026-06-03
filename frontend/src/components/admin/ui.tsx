"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-fg-muted">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-panel/50 p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-fg-muted">{label}</p>
        {icon && <span className="text-primary-2">{icon}</span>}
      </div>
      <p className="mt-2 font-display text-3xl font-bold text-gradient">
        {value}
      </p>
    </div>
  );
}

export function Panel({
  title,
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-panel/40",
        className,
      )}
    >
      {title && (
        <header className="border-b border-border px-5 py-3.5">
          <h2 className="font-display text-sm font-semibold">{title}</h2>
        </header>
      )}
      {children}
    </section>
  );
}

export function Spinner() {
  return (
    <div className="flex items-center justify-center py-16 text-fg-subtle">
      <Loader2 className="size-6 animate-spin" />
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="px-5 py-16 text-center text-sm text-fg-subtle">{message}</div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-300">
      {message}
    </div>
  );
}
