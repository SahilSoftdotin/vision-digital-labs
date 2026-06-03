/**
 * Single source of truth for brand + site-wide content.
 * Rename the agency, change contact details, nav, and socials here —
 * everything else reads from this file.
 */
export const siteConfig = {
  name: "Vision Digital Labs",
  shortName: "Vision",
  tagline: "Building Future-Ready Digital Experiences",
  description:
    "Vision Digital Labs redesigns, modernizes and builds high-performance digital products — web apps, AI integrations, SaaS and mobile — for ambitious businesses across the US, Canada and Europe.",
  url: "https://visiondigitallab.com",
  ogImage: "/og.png",
  email: "hello@visiondigitallab.com",
  phone: "+1 (555) 012-3456",
  location: "Remote-first · US · Canada · Europe",
  locale: "en_US",

  socials: {
    twitter: "https://twitter.com/visiondigitallab",
    linkedin: "https://linkedin.com/company/visiondigitallab",
    github: "https://github.com/visiondigitallab",
    dribbble: "https://dribbble.com/visiondigitallab",
  },

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
