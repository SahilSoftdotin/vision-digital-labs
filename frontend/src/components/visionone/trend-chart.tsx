"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { MONTHS, type ChannelRow } from "./demo-data";

/**
 * Leads by channel over six months.
 *
 * Hand-built inline SVG — no chart library, no new dependency. The lines draw
 * themselves on first view and the highlight cycles through the channels, the
 * way a live dashboard walks you through its own data.
 *
 * Accessibility notes:
 * - The chart is decorative-with-a-label; the same numbers are in the table
 *   below it, which is the accessible representation.
 * - Cycling is auto-updating motion, so it has a real pause control (WCAG
 *   2.2.2), pauses on hover and on keyboard focus, and never starts at all
 *   under prefers-reduced-motion.
 */

const PAD = { top: 16, right: 14, bottom: 28, left: 36 };
const CYCLE_MS = 3200;

/**
 * The SVG is drawn at the container's real pixel size rather than scaled from a
 * fixed viewBox — a scaled viewBox would shrink the axis labels to a few pixels
 * on a phone. `useChartSize` measures the container and the geometry follows.
 */
function useChartSize() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(720);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.max(280, Math.round(entry.contentRect.width)));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Shorter on narrow screens so the chart never dominates a phone viewport.
  const height = width < 560 ? 200 : 280;
  return { ref, width, height };
}

/** Round the axis up to a clean number so the gridlines read sensibly. */
function axisMax(rows: ChannelRow[]) {
  const peak = Math.max(...rows.flatMap((r) => r.series));
  return Math.ceil(peak / 10) * 10;
}

function pointsFor(series: number[], max: number, w: number, h: number) {
  const plotW = w - PAD.left - PAD.right;
  const plotH = h - PAD.top - PAD.bottom;
  const step = plotW / (series.length - 1);
  return series.map((value, i) => ({
    x: PAD.left + i * step,
    y: PAD.top + plotH - (value / max) * plotH,
  }));
}

const toPath = (pts: { x: number; y: number }[]) =>
  pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

const toArea = (pts: { x: number; y: number }[], baseline: number) =>
  `${toPath(pts)} L${pts[pts.length - 1].x.toFixed(1)},${baseline} L${pts[0].x.toFixed(
    1,
  )},${baseline} Z`;

export function TrendChart({
  rows,
  className,
  /** Whether the full figures table is rendered below this chart. */
  hasTable = true,
}: {
  rows: ChannelRow[];
  className?: string;
  hasTable?: boolean;
}) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Auto-cycle the highlight. Never runs under reduced motion.
  useEffect(() => {
    if (reduce || paused || hovered) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % rows.length),
      CYCLE_MS,
    );
    return () => clearInterval(id);
  }, [reduce, paused, hovered, rows.length]);

  const max = axisMax(rows);
  const gridValues = [0, max / 4, max / 2, (max * 3) / 4, max];
  // Under reduced motion every line is shown at equal weight — no cycling,
  // so nothing should be dimmed.
  const emphasise = !reduce;

  const { ref, width, height } = useChartSize();
  const baseline = height - PAD.bottom;

  const activeRow = rows[active];
  const activePoints = pointsFor(activeRow.series, max, width, height);
  const lastPoint = activePoints[activePoints.length - 1];

  return (
    <div
      ref={ref}
      className={cn("select-none", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      {/* header: title + pause control */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-fg-subtle">
          Leads by channel · last 6 months
        </p>
        {!reduce && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-2.5 py-1 text-[0.7rem] font-medium text-fg-muted transition-colors hover:border-primary/50 hover:text-fg"
          >
            {paused ? (
              <Play className="size-3" aria-hidden />
            ) : (
              <Pause className="size-3" aria-hidden />
            )}
            {paused ? "Play walkthrough" : "Pause walkthrough"}
          </button>
        )}
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        className="max-w-full overflow-visible"
        role="img"
        aria-label={`Line chart of monthly leads by channel from ${MONTHS[0]} to ${
          MONTHS[MONTHS.length - 1]
        }. Illustrative demo data, not a real clinic. ${
          hasTable
            ? "The same figures are listed in the table below."
            : "The full figures are in the table on the VisionOne page."
        }`}
      >
        <defs>
          {rows.map((row, i) => (
            <linearGradient
              key={row.channel}
              id={`${uid}-fill-${i}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={row.color} stopOpacity="0.22" />
              <stop offset="100%" stopColor={row.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        {/* gridlines + y axis */}
        {gridValues.map((value) => {
          const y = baseline - (value / max) * (baseline - PAD.top);
          return (
            <g key={value}>
              <line
                x1={PAD.left}
                x2={width - PAD.right}
                y1={y}
                y2={y}
                stroke="var(--border)"
                strokeWidth="1"
              />
              <text
                x={PAD.left - 10}
                y={y + 4}
                textAnchor="end"
                fontSize="11"
                fill="var(--fg-subtle)"
              >
                {value}
              </text>
            </g>
          );
        })}

        {/* x axis */}
        {MONTHS.map((month, i) => (
          <text
            key={month}
            x={
              PAD.left +
              i * ((width - PAD.left - PAD.right) / (MONTHS.length - 1))
            }
            y={height - 8}
            textAnchor="middle"
            fontSize="11"
            fill="var(--fg-subtle)"
          >
            {month}
          </text>
        ))}

        {/* one line per channel */}
        {rows.map((row, i) => {
          const pts = pointsFor(row.series, max, width, height);
          const isActive = !emphasise || i === active;
          return (
            <g key={row.channel}>
              {isActive && emphasise && (
                <motion.path
                  d={toArea(pts, baseline)}
                  fill={`url(#${uid}-fill-${i})`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              )}
              <motion.path
                d={toPath(pts)}
                fill="none"
                stroke={row.color}
                strokeWidth={isActive ? 2.5 : 1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reduce ? false : { pathLength: 0 }}
                whileInView={reduce ? undefined : { pathLength: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.1, delay: 0.15 * i, ease: "easeOut" }}
                animate={{ opacity: isActive ? 1 : 0.38 }}
              />
              {isActive &&
                pts.map((p, pi) => (
                  <motion.circle
                    key={pi}
                    cx={p.x}
                    cy={p.y}
                    r="3.5"
                    fill="var(--bg-2)"
                    stroke={row.color}
                    strokeWidth="2"
                    initial={reduce ? false : { scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.25, delay: reduce ? 0 : 0.04 * pi }}
                    style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                  />
                ))}
            </g>
          );
        })}

        {/* the live pulse sits on the newest point of the highlighted line */}
        {emphasise && (
          <motion.circle
            cx={lastPoint.x}
            cy={lastPoint.y}
            r="3.5"
            fill="none"
            stroke={activeRow.color}
            strokeWidth="2"
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: 3.2, opacity: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            style={{ transformOrigin: `${lastPoint.x}px ${lastPoint.y}px` }}
          />
        )}
      </svg>

      {/* legend — doubles as the control for which line is highlighted */}
      <div className="mt-4 flex flex-wrap gap-2">
        {rows.map((row, i) => {
          const isActive = !emphasise || i === active;
          return (
            <button
              key={row.channel}
              type="button"
              onClick={() => {
                setActive(i);
                setPaused(true);
              }}
              aria-pressed={emphasise ? i === active : undefined}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                isActive
                  ? "border-border-strong bg-white/[0.04] text-fg"
                  : "border-border text-fg-muted hover:text-fg",
              )}
            >
              <span
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: row.color }}
                aria-hidden
              />
              {row.channel}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** A single-channel sparkline for the table rows. */
export function Sparkline({
  series,
  color,
  className,
}: {
  series: number[];
  color: string;
  className?: string;
}) {
  const w = 96;
  const h = 24;
  const max = Math.max(...series);
  const min = Math.min(...series);
  const span = max - min || 1;
  const step = w / (series.length - 1);
  const d = series
    .map((v, i) => {
      const x = i * step;
      const y = h - 2 - ((v - min) / span) * (h - 4);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={cn("h-6 w-24", className)}
      aria-hidden
    >
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
