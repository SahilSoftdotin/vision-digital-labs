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
