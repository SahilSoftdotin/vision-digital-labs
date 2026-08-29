"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CountUp } from "@/components/interactive/count-up";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { TrendChart, Sparkline } from "./trend-chart";
import {
  CALLS,
  CHANNELS,
  FRESHNESS_LABEL,
  KPIS,
  SIDE_PANELS,
  TEASER_KPIS,
  leadsThisMonth,
  type ChannelRow,
  type Freshness,
  type Kpi,
} from "./demo-data";

/**
 * The VisionOne demo dashboard.
 *
 * Everything it shows is synthetic — see `demo-data.ts`. The "Illustrative —
 * demo data" label is part of the chrome and is not dismissible, and the
 * caption below the panel repeats it.
 */

const DOT: Record<Freshness, string> = {
  live: "bg-primary",
  recent: "bg-accent",
  stale: "bg-fg-subtle",
};

function FreshnessNote({
  freshness,
  synced,
  className,
}: {
  freshness: Freshness;
  synced: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex items-center gap-1.5 text-[0.7rem] leading-snug text-fg-muted",
        className,
      )}
    >
      <span
        className={cn("size-1.5 shrink-0 rounded-full", DOT[freshness])}
        aria-hidden
      />
      <span className="sr-only">{FRESHNESS_LABEL[freshness]}: </span>
      {synced}
    </span>
  );
}

function KpiTile({ kpi }: { kpi: Kpi }) {
  return (
    <motion.div variants={fadeUp} className="bg-bg-2 p-4">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-fg-subtle">
        {kpi.label}
      </p>
      <CountUp
        value={kpi.value}
        prefix={kpi.prefix}
        suffix={kpi.suffix}
        className="mt-2 block font-display text-2xl font-semibold tabular-nums text-fg"
      />
      <p className="mt-1 text-xs text-fg-muted">{kpi.note}</p>
      <FreshnessNote
        freshness={kpi.freshness}
        synced={kpi.synced}
        className="mt-2.5"
      />
    </motion.div>
  );
}

function ChannelTable({ rows }: { rows: ChannelRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[32rem] border-collapse text-sm">
        <caption className="sr-only">
          Leads this month, appointments booked and estimated revenue by
          channel, with a six-month trend. Illustrative demo data, not a real
          clinic.
        </caption>
        <thead>
          <tr className="text-xs uppercase tracking-[0.14em] text-fg-subtle">
            <th scope="col" className="pb-3 text-left font-medium">
              Channel
            </th>
            <th scope="col" className="pb-3 text-left font-medium">
              Trend
            </th>
            <th scope="col" className="pb-3 text-right font-medium">
              Leads
            </th>
            <th scope="col" className="pb-3 text-right font-medium">
              Booked
            </th>
            <th scope="col" className="pb-3 text-right font-medium">
              Revenue
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.channel} className="border-t border-border align-top">
              <th scope="row" className="py-3 pr-6 text-left font-normal">
                <span className="flex items-center gap-2 font-medium text-fg">
                  <span
                    className={cn(
                      "size-1.5 shrink-0 rounded-full",
                      DOT[row.freshness],
                    )}
                    aria-hidden
                  />
                  {row.channel}
                </span>
                <FreshnessNote
                  freshness={row.freshness}
                  synced={row.synced}
                  className="mt-1.5"
                />
              </th>
              <td className="py-3 pr-6">
                <Sparkline series={row.series} color={row.color} />
              </td>
              <td className="py-3 text-right tabular-nums text-fg-muted">
                {leadsThisMonth(row)}
              </td>
              <td className="py-3 text-right tabular-nums text-fg-muted">
                {row.booked}
              </td>
              <td className="py-3 text-right font-medium tabular-nums text-fg">
                {row.revenue}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CallsStrip() {
  const answeredPct = Math.round((CALLS.answered / CALLS.total) * 100);
  return (
    <div className="rounded-xl border border-border bg-bg-2 p-4">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-fg-subtle">
          Calls
        </p>
        <p className="text-xs text-fg-muted">
          {CALLS.total} in the last 30 days
        </p>
      </div>
      <div
        className="mt-3 flex h-2 overflow-hidden rounded-full bg-border"
        aria-hidden
      >
        <motion.span
          className="h-full bg-gradient-to-r from-primary to-primary-2"
          initial={{ width: 0 }}
          whileInView={{ width: `${answeredPct}%` }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <dl className="mt-3 grid grid-cols-3 gap-3 text-sm">
        <div>
          <dt className="text-xs text-fg-subtle">Answered</dt>
          <dd className="font-display font-semibold tabular-nums text-fg">
            <CountUp value={CALLS.answered} />
          </dd>
        </div>
        <div>
          <dt className="text-xs text-fg-subtle">Missed</dt>
          <dd className="font-display font-semibold tabular-nums text-accent">
            <CountUp value={CALLS.missed} />
          </dd>
        </div>
        <div>
          <dt className="text-xs text-fg-subtle">After hours</dt>
          <dd className="font-display font-semibold tabular-nums text-fg">
            <CountUp value={CALLS.afterHours} />
          </dd>
        </div>
      </dl>
      <FreshnessNote
        freshness={CALLS.freshness}
        synced={CALLS.synced}
        className="mt-3"
      />
    </div>
  );
}

export function DashboardDemo({
  variant = "full",
  className,
}: {
  variant?: "full" | "compact";
  className?: string;
}) {
  const compact = variant === "compact";
  const kpis = compact ? TEASER_KPIS : KPIS;

  return (
    <motion.figure
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cn("m-0", className)}
    >
      <div className="card-surface overflow-hidden rounded-2xl border border-border-strong">
        {/* chrome */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-border bg-white/[0.02] px-4 py-3">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-border-strong" />
            <span className="size-2.5 rounded-full bg-border-strong" />
            <span className="size-2.5 rounded-full bg-border-strong" />
          </span>
          <p className="font-display text-sm font-semibold text-fg">VisionOne</p>
          <p className="text-xs text-fg-muted">Demo clinic · last 30 days</p>
          <span className="ml-auto inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 text-[0.7rem] font-medium text-accent">
            Illustrative — demo data
          </span>
        </div>

        {/* freshness legend */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-border px-4 py-2.5">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-fg-subtle">
            Data freshness
          </p>
          {(["live", "recent", "stale"] as const).map((state) => (
            <span
              key={state}
              className="flex items-center gap-1.5 text-[0.7rem] text-fg-muted"
            >
              <span
                className={cn("size-1.5 rounded-full", DOT[state])}
                aria-hidden
              />
              {FRESHNESS_LABEL[state]}
            </span>
          ))}
        </div>

        {/* KPI row */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className={cn(
            "grid gap-px bg-border sm:grid-cols-2",
            compact ? "lg:grid-cols-3" : "lg:grid-cols-4",
          )}
        >
          {kpis.map((kpi) => (
            <KpiTile key={kpi.label} kpi={kpi} />
          ))}
        </motion.div>

        {/* the chart, full width — a six-month trend needs the room */}
        <div className="border-t border-border p-4">
          <TrendChart rows={CHANNELS} hasTable={!compact} />
        </div>

        {/* calls, reviews and content sit beneath it */}
        {!compact && (
          <div className="grid gap-4 border-t border-border p-4 sm:grid-cols-2 lg:grid-cols-3">
            <CallsStrip />
            {SIDE_PANELS.map((panel) => (
              <div
                key={panel.title}
                className="rounded-xl border border-border bg-bg-2 p-4"
              >
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-fg-subtle">
                  {panel.title}
                </p>
                <p className="mt-2 font-display text-xl font-semibold text-fg">
                  {panel.value}
                </p>
                <ul className="mt-2 space-y-1 text-xs text-fg-muted">
                  {panel.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <FreshnessNote
                  freshness={panel.freshness}
                  synced={panel.synced}
                  className="mt-3"
                />
              </div>
            ))}
          </div>
        )}

        {/* the numbers behind the chart */}
        {!compact && (
          <div className="border-t border-border p-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-fg-subtle">
              This month, by channel
            </p>
            <ChannelTable rows={CHANNELS} />
          </div>
        )}
      </div>

      <figcaption className="mt-3 text-xs text-fg-muted">
        Illustrative — demo data. The numbers, channels and clinic here are
        invented to show the layout. This is not a real client or a real result.
      </figcaption>
    </motion.figure>
  );
}
