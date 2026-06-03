import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site.config";
import { services } from "@/data/services";
import { caseStudies } from "@/data/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes = ["", "/services", "/casestudies", "/about", "/contact"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  const serviceRoutes = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const caseRoutes = caseStudies.map((c) => ({
    url: `${base}/casestudies/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...caseRoutes];
}
