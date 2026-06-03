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
      <span className="relative grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-[#04121a] shadow-[0_6px_24px_-6px_rgba(0,217,255,0.6)] transition-transform group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
          <path
            d="M4 19V5l8 9 8-9v14"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="font-display text-lg font-semibold tracking-tight text-fg">
        {siteConfig.shortName}
        <span className="text-primary-2">.</span>
      </span>
    </Link>
  );
}
