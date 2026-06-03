"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";

/** Polls the demo live-visitor endpoint every few seconds. */
export function LiveVisitors({ className }: { className?: string }) {
  const [visitors, setVisitors] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    const tick = async () => {
      try {
        const data = await apiGet<{ visitors: number }>("/live/visitors");
        if (active) setVisitors(data.visitors);
      } catch {
        /* keep last value */
      }
    };
    tick();
    const id = setInterval(tick, 5000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  return (
    <span className={className}>
      <span className="relative mr-2 inline-flex size-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-primary" />
      </span>
      <span className="tabular-nums font-medium text-fg">
        {visitors ?? "—"}
      </span>{" "}
      <span className="text-fg-subtle">browsing now</span>
    </span>
  );
}
