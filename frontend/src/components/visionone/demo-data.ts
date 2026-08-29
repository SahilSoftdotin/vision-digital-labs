/**
 * Synthetic data for the VisionOne demo dashboard.
 *
 * IMPORTANT: every number in this file is invented for illustration. It is not
 * a real client, a real month, or a real result, and it must never be presented
 * as one. Any surface that renders it also renders the "Illustrative — demo
 * data" label — see `dashboard-demo.tsx`.
 */

/** How current a number is. The dashboard never hides a stale value — it marks it. */
export type Freshness = "live" | "recent" | "stale";

export const FRESHNESS_LABEL: Record<Freshness, string> = {
  live: "Live",
  recent: "Recent",
  stale: "Stale",
};

/** The six months plotted on the trend chart. */
export const MONTHS = ["Mar", "Apr", "May", "Jun", "Jul", "Aug"];

export interface Kpi {
  label: string;
  /** Numeric value, animated with CountUp. */
  value: number;
  prefix?: string;
  suffix?: string;
  note: string;
  freshness: Freshness;
  synced: string;
}

export const KPIS: Kpi[] = [
  {
    label: "Leads",
    value: 160,
    note: "Up from 74 in March",
    freshness: "live",
    synced: "Synced 4 minutes ago",
  },
  {
    label: "Calls answered",
    value: 217,
    note: "31 missed of 248",
    freshness: "live",
    synced: "Synced 4 minutes ago",
  },
  {
    label: "Appointments booked",
    value: 64,
    note: "40% of leads",
    freshness: "live",
    synced: "Synced 11 minutes ago",
  },
  {
    label: "Revenue attributed",
    value: 110400,
    prefix: "$",
    note: "Estimated, from booked visits",
    freshness: "recent",
    synced: "Synced 3 hours ago",
  },
];

export interface ChannelRow {
  channel: string;
  /** Monthly leads across MONTHS — the line plotted on the trend chart. */
  series: number[];
  booked: number;
  revenue: string;
  /** Stroke colour. Existing design tokens only — no new colours. */
  color: string;
  freshness: Freshness;
  synced: string;
}

export const CHANNELS: ChannelRow[] = [
  {
    channel: "Google Ads",
    series: [31, 38, 44, 51, 60, 68],
    booked: 24,
    revenue: "$41,200",
    color: "var(--chart-1)",
    freshness: "live",
    synced: "Synced 4 minutes ago",
  },
  {
    channel: "Google Business Profile",
    series: [22, 26, 29, 33, 38, 42],
    booked: 19,
    revenue: "$32,600",
    color: "var(--chart-2)",
    freshness: "live",
    synced: "Synced 4 minutes ago",
  },
  {
    channel: "Social media",
    series: [6, 8, 12, 17, 23, 29],
    booked: 11,
    revenue: "$18,400",
    color: "var(--chart-3)",
    freshness: "live",
    synced: "Synced 9 minutes ago",
  },
  {
    channel: "Organic search",
    series: [11, 14, 15, 17, 18, 18],
    booked: 7,
    revenue: "$12,900",
    color: "var(--chart-4)",
    freshness: "recent",
    synced: "Synced 6 hours ago",
  },
  {
    channel: "Referral",
    series: [4, 5, 6, 7, 8, 9],
    booked: 3,
    revenue: "$5,300",
    color: "var(--chart-5)",
    freshness: "stale",
    synced: "Last synced 6 days ago — reconnect account",
  },
];

/** Current-month leads, derived so the chart and the table can never disagree. */
export const leadsThisMonth = (row: ChannelRow) => row.series[row.series.length - 1];

export interface SidePanel {
  title: string;
  value: string;
  lines: string[];
  freshness: Freshness;
  synced: string;
}

export const SIDE_PANELS: SidePanel[] = [
  {
    title: "Reviews",
    value: "23 new",
    lines: ["4.8 average this month", "Every review replied to within a day"],
    freshness: "live",
    synced: "Synced 12 minutes ago",
  },
  {
    title: "Content published",
    value: "6 posts",
    lines: ["4 waiting on physician sign-off", "2 scheduled for next week"],
    freshness: "recent",
    synced: "Synced 2 hours ago",
  },
];

/** Calls handled, for the answered/missed strip. */
export const CALLS = {
  total: 248,
  answered: 217,
  missed: 31,
  afterHours: 46,
  freshness: "live" as Freshness,
  synced: "Synced 4 minutes ago",
};

/** The compact set used by the home-page teaser. */
export const TEASER_KPIS: Kpi[] = [KPIS[0], KPIS[2], KPIS[3]];
