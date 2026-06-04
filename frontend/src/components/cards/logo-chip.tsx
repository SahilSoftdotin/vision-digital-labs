import { cn } from "@/lib/utils";

/**
 * A polished "logo chip" — a tinted monogram tile + name — used to represent
 * brands and integration partners as a uniform logo wall (no real logo files).
 */
export function LogoChip({
  name,
  mono,
  tint = "from-primary to-secondary",
  className,
}: {
  name: string;
  mono: string;
  tint?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-border-strong bg-white/[0.03] px-3 py-2 backdrop-blur transition-colors hover:border-primary/40",
        className,
      )}
    >
      <span
        className={cn(
          "grid size-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br text-[0.7rem] font-bold text-[#04121a]",
          tint,
        )}
      >
        {mono}
      </span>
      <span className="whitespace-nowrap font-display text-base font-semibold text-fg-muted">
        {name}
      </span>
    </span>
  );
}
