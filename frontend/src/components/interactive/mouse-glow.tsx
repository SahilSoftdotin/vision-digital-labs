"use client";

import { useEffect, useRef } from "react";

/**
 * A soft radial glow that follows the cursor within its parent.
 * Drop inside a `relative` container. Pure transform updates — no React re-render.
 */
export function MouseGlow({ color = "rgba(0,217,255,0.18)" }: { color?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    const move = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      el.style.transform = `translate(${e.clientX - rect.left}px, ${
        e.clientY - rect.top
      }px)`;
      el.style.opacity = "1";
    };
    const leave = () => {
      el.style.opacity = "0";
    };

    parent.addEventListener("mousemove", move);
    parent.addEventListener("mouseleave", leave);
    return () => {
      parent.removeEventListener("mousemove", move);
      parent.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 -ml-48 -mt-48 size-96 rounded-full opacity-0 blur-3xl transition-opacity duration-300"
      style={{ background: color }}
    />
  );
}
