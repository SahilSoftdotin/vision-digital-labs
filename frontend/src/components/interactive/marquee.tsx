import { cn } from "@/lib/utils";

/**
 * Infinite horizontal marquee. Duplicates children so the CSS translateX(-50%)
 * loop is seamless. Pauses on hover.
 */
export function Marquee({
  children,
  className,
  fade = true,
}: {
  children: React.ReactNode;
  className?: string;
  fade?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden",
        fade &&
          "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div className="flex w-max animate-marquee gap-12 group-hover:[animation-play-state:paused]">
        <div className="flex shrink-0 items-center gap-12">{children}</div>
        <div className="flex shrink-0 items-center gap-12" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
