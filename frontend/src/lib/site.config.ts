/**
 * Single source of truth for brand + site-wide content.
 * Rename the agency, change contact details, nav, and socials here —
 * everything else reads from this file.
 */
export const siteConfig = {
  name: "Vision Digital Lab",
  shortName: "Vision",
  tagline: "Building Future-Ready Digital Experiences",
  description:
    "Vision Digital Lab redesigns, modernizes and builds high-performance digital products — web apps, AI integrations, SaaS and mobile — for ambitious businesses across the US, Canada and Europe.",
  url: "https://visiondigitallab.com",
  ogImage: "/og.png",
  email: "hello@visiondigitallab.com",
  phone: "+1 (320) 344-5433",
  location: "Remote-first · US · Canada · Europe",
  locale: "en_US",

  // No public social profiles yet (Facebook/Instagram "coming soon").
  // Add real profile URLs here when live — they feed Organization JSON-LD (sameAs).
  socials: {} as Record<string, string>,

  nav: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/casestudies" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  keywords: [
    "Website Redesign Agency",
    "Web Development Agency USA",
    "Digital Product Development",
    "Enterprise Software Development",
    "AI Development Agency",
    "SaaS development",
    "Cloud migration services",
    "UI UX consulting",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
