import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-white/[0.03] px-3 py-1 text-xs font-medium text-fg-muted",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/** Small pill used for eyebrow/section labels. */
export function Eyebrow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary-2",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-primary animate-pulse-glow" />
      {children}
    </span>
  );
}
