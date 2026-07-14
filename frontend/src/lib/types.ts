/** Shared content types — shape mirrors the future Spring Boot API DTOs. */

export interface Service {
  id: number;
  slug: string;
  title: string;
  /** lucide-react icon name */
  icon: string;
  tagline: string;
  description: string;
  features: string[];
  deliverables: string[];
  relatedCaseStudies: string[]; // case study slugs
}

/** An embeddable AI plugin in the "AI Front Office" suite. */
export interface Plugin {
  id: number;
  slug: string;
  name: string;
  /** lucide-react icon name */
  icon: string;
  /** accent hex used for the card's glow/ring */
  accent: string;
  tagline: string;
  /** one-line elevator pitch shown on the card */
  summary: string;
  /** the pain it kills, in the owner's words */
  problem: string;
  /** bullet list of what it does */
  highlights: string[];
  /** the business outcome — why it's worth paying for */
  outcome: string;
  /** 3 short "how it works" steps */
  how: string[];
  setup: string;
  monthly: string;
  /** optional ribbon: "Flagship", "Free scan", … */
  badge?: string;
}

export interface CaseStudy {
  id: number;
  slug: string;
  title: string;
  client: string;
  industry: Industry;
  summary: string;
  cover: string; // gradient token used as overlay/fallback
  image: string; // hero/cover photo URL
  challenge: string;
  solution: string;
  technologies: string[];
  timeline: string;
  results: { label: string; value: string }[];
  tags: string[];
  featured: boolean;
}

export type Industry =
  | "Healthcare"
  | "Fintech"
  | "Logistics"
  | "E-Commerce"
  | "Real Estate"
  | "Education";

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

export interface SiteStat {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}
