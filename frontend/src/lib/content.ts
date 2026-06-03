import { apiBase } from "@/lib/api";
import type { Service, CaseStudy, Testimonial, SiteStat } from "@/lib/types";
import { services as fxServices } from "@/data/services";
import { caseStudies as fxCaseStudies } from "@/data/case-studies";
import { testimonials as fxTestimonials } from "@/data/testimonials";
import { siteStats as fxSiteStats, aboutStats as fxAboutStats } from "@/data/stats";

/**
 * Server-side content layer powering the public pages.
 *
 * Fetches from the backend API with ISR: results are cached and tagged so the
 * backend can revalidate them on demand (see /api/revalidate). If the backend is
 * unreachable, it falls back to the local fixtures so the site never breaks and
 * local dev works without the backend running.
 */

export const CONTENT_TAGS = {
  services: "services",
  caseStudies: "casestudies",
  testimonials: "testimonials",
  stats: "stats",
} as const;

const REVALIDATE_SECONDS = 3600; // time-based safety net; on-demand refreshes sooner

async function fetchContent<T>(
  path: string,
  tag: string,
  fallback: T,
): Promise<T> {
  try {
    const res = await fetch(`${apiBase}${path}`, {
      next: { revalidate: REVALIDATE_SECONDS, tags: [tag] },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`${path} -> ${res.status}`);
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

export function getServices() {
  return fetchContent<Service[]>("/services", CONTENT_TAGS.services, fxServices);
}

export async function getService(slug: string) {
  const fallback = fxServices.find((s) => s.slug === slug);
  try {
    const res = await fetch(`${apiBase}/services/${slug}`, {
      next: { revalidate: REVALIDATE_SECONDS, tags: [CONTENT_TAGS.services] },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return res.status === 404 ? undefined : fallback;
    return (await res.json()) as Service;
  } catch {
    return fallback;
  }
}

export function getCaseStudies() {
  return fetchContent<CaseStudy[]>(
    "/casestudies",
    CONTENT_TAGS.caseStudies,
    fxCaseStudies,
  );
}

export async function getFeaturedCaseStudies() {
  return (await getCaseStudies()).filter((c) => c.featured);
}

export async function getCaseStudy(slug: string) {
  const fallback = fxCaseStudies.find((c) => c.slug === slug);
  try {
    const res = await fetch(`${apiBase}/casestudies/${slug}`, {
      next: { revalidate: REVALIDATE_SECONDS, tags: [CONTENT_TAGS.caseStudies] },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return res.status === 404 ? undefined : fallback;
    return (await res.json()) as CaseStudy;
  } catch {
    return fallback;
  }
}

export function getTestimonials() {
  return fetchContent<Testimonial[]>(
    "/testimonials",
    CONTENT_TAGS.testimonials,
    fxTestimonials,
  );
}

export function getStats(group: "home" | "about" = "home") {
  return fetchContent<SiteStat[]>(
    `/stats?group=${group}`,
    CONTENT_TAGS.stats,
    group === "about" ? fxAboutStats : fxSiteStats,
  );
}
