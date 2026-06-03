import type { Metadata } from "next";
import { siteConfig } from "@/lib/site.config";

interface PageMetaArgs {
  title?: string;
  description?: string;
  path?: string;
}

/**
 * Build per-page Metadata with sensible OG/Twitter defaults.
 * OG/Twitter images come from the file-based `opengraph-image` convention,
 * so they are intentionally not set here.
 */
export function pageMeta({
  title,
  description = siteConfig.description,
  path = "/",
}: PageMetaArgs = {}): Metadata {
  const fullTitle = title
    ? `${title} — ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

/** Organization JSON-LD for the site root. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.email,
    sameAs: Object.values(siteConfig.socials),
  };
}

export function serviceJsonLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${siteConfig.url}${path}`,
    provider: { "@type": "Organization", name: siteConfig.name },
    areaServed: ["US", "CA", "EU"],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
