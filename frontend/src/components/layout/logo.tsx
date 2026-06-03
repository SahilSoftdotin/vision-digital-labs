import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site.config";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-2.5", className)}
      aria-label={`${siteConfig.name} home`}
    >
      <span className="relative grid size-9 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-primary via-primary-2 to-secondary text-[#04121a] shadow-[0_6px_24px_-6px_rgba(0,217,255,0.6)] transition-transform group-hover:scale-105">
        {/* sheen */}
        <span className="pointer-events-none absolute -left-3 -top-3 size-6 rounded-full bg-white/40 blur-md" />
        {/* "Vision" mark: layered chevron aperture + guiding spark */}
        <svg viewBox="0 0 24 24" className="relative size-5" fill="none" aria-hidden>
          <path
            d="M3.6 6.4 L12 18.6 L20.4 6.4"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 6.4 L12 12.2 L16 6.4"
            stroke="currentColor"
            strokeOpacity="0.5"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="4.3" r="1.5" fill="currentColor" />
        </svg>
      </span>
      <span className="font-display text-lg font-semibold tracking-tight text-fg">
        {siteConfig.shortName}
        <span className="text-primary-2">.</span>
      </span>
    </Link>
  );
}
