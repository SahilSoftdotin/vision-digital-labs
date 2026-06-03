import type { SiteStat } from "@/lib/types";

/** Homepage dynamic metrics. */
export const siteStats: SiteStat[] = [
  { label: "Projects Delivered", value: 127, suffix: "+" },
  { label: "Lines of Code Shipped", value: 4_200_000, suffix: "+" },
  { label: "Client Revenue Impact", value: 180, suffix: "M+", prefix: "$" },
  { label: "Countries Served", value: 15, suffix: "+" },
];

/** About-page stats. */
export const aboutStats: SiteStat[] = [
  { label: "Projects Delivered", value: 100, suffix: "+" },
  { label: "Client Satisfaction", value: 98, suffix: "%" },
  { label: "Countries Served", value: 15, suffix: "+" },
  { label: "Years of Craft", value: 9, suffix: "" },
];
