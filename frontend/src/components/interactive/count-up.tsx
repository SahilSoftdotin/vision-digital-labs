"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { compact } from "@/lib/utils";

/**
 * Animated count-up that triggers when scrolled into view.
 * Respects prefers-reduced-motion (jumps straight to the value).
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1800,
  useCompact = false,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  useCompact?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  const formatted = useCompact
    ? compact(display)
    : Math.round(display).toLocaleString("en-US");

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
