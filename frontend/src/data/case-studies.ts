import type { CaseStudy } from "@/lib/types";

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    slug: "medflow-patient-portal",
    title: "A patient portal that cut no-shows by 41%",
    client: "MedFlow Health",
    industry: "Healthcare",
    summary:
      "Redesigned a clunky patient portal into an accessible, AI-assisted experience that patients actually use.",
    cover: "from-emerald-400/30 to-cyan-500/20",
    challenge:
      "MedFlow's legacy portal had a 22% task-completion rate. Patients struggled to book, reschedule, and find records — driving costly no-shows and call-center load.",
    solution:
      "We ran a full UX audit, rebuilt the portal on Next.js with WCAG-AA accessibility, and added an AI assistant for scheduling and FAQs. Appointments became 3 taps; reminders went smart.",
    technologies: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL", "OpenAI"],
    timeline: "16 weeks",
    results: [
      { label: "Fewer no-shows", value: "-41%" },
      { label: "Task completion", value: "88%" },
      { label: "Call volume", value: "-34%" },
    ],
    tags: ["Web App", "AI", "Accessibility"],
    featured: true,
  },
  {
    id: 2,
    slug: "novapay-checkout",
    title: "A checkout redesign worth $12M in recovered revenue",
    client: "NovaPay",
    industry: "Fintech",
    summary:
      "Re-engineered a fintech checkout for speed and trust, recovering abandoned revenue at scale.",
    cover: "from-violet-500/30 to-blue-500/20",
    challenge:
      "A slow, multi-step checkout was bleeding conversions. Cart abandonment sat at 71% and PCI concerns blocked new features.",
    solution:
      "We rebuilt checkout as a single fast flow, optimized Core Web Vitals to sub-1s LCP, hardened security, and added one-click payment methods.",
    technologies: ["Next.js", "Stripe", "Spring Boot", "Redis", "AWS"],
    timeline: "12 weeks",
    results: [
      { label: "Recovered revenue", value: "$12M" },
      { label: "Conversion lift", value: "+27%" },
      { label: "LCP", value: "0.9s" },
    ],
    tags: ["Redesign", "Performance", "Fintech"],
    featured: true,
  },
  {
    id: 3,
    slug: "cargolink-tms",
    title: "Real-time logistics platform across 3 continents",
    client: "CargoLink",
    industry: "Logistics",
    summary:
      "Built a real-time transport management system handling 40k shipments a day.",
    cover: "from-amber-400/30 to-orange-500/20",
    challenge:
      "CargoLink ran operations on spreadsheets and email. Visibility was poor and scaling internationally was impossible.",
    solution:
      "We delivered a cloud-native TMS with live tracking, route optimization, and a mobile driver app — deployed on Kubernetes for global scale.",
    technologies: ["React", "React Native", "Spring Boot", "PostgreSQL", "Kubernetes"],
    timeline: "24 weeks",
    results: [
      { label: "Shipments/day", value: "40k" },
      { label: "On-time delivery", value: "+19%" },
      { label: "Ops cost", value: "-23%" },
    ],
    tags: ["Platform", "Mobile", "Cloud"],
    featured: true,
  },
  {
    id: 4,
    slug: "estatex-marketplace",
    title: "A real-estate marketplace MVP launched in 9 weeks",
    client: "EstateX",
    industry: "Real Estate",
    summary:
      "Took a property marketplace from idea to funded launch in under a quarter.",
    cover: "from-cyan-400/30 to-teal-500/20",
    challenge:
      "EstateX needed to validate a two-sided marketplace fast to secure a seed round — with no existing product.",
    solution:
      "We shipped a polished MVP with listings, search, messaging and tour booking, instrumented for analytics to prove traction to investors.",
    technologies: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL", "Mapbox"],
    timeline: "9 weeks",
    results: [
      { label: "To launch", value: "9 wks" },
      { label: "Seed raised", value: "$3.5M" },
      { label: "Listings (mo. 1)", value: "1,200+" },
    ],
    tags: ["MVP", "Marketplace", "Startup"],
    featured: false,
  },
  {
    id: 5,
    slug: "scholarly-lms",
    title: "An AI learning platform serving 200k students",
    client: "Scholarly",
    industry: "Education",
    summary:
      "Modernized an LMS with adaptive AI tutoring and a scalable content pipeline.",
    cover: "from-indigo-400/30 to-purple-500/20",
    challenge:
      "Scholarly's monolith couldn't scale during peak exam seasons and lacked personalization.",
    solution:
      "We modularized the platform, added an AI tutor with RAG over course content, and moved to autoscaling cloud infrastructure.",
    technologies: ["Next.js", "Spring Boot", "Redis", "OpenAI", "Azure"],
    timeline: "20 weeks",
    results: [
      { label: "Students", value: "200k" },
      { label: "Engagement", value: "+48%" },
      { label: "Peak uptime", value: "99.98%" },
    ],
    tags: ["AI", "Modernization", "EdTech"],
    featured: false,
  },
  {
    id: 6,
    slug: "shopwave-commerce",
    title: "Headless commerce replatforming for 8-figure DTC brand",
    client: "ShopWave",
    industry: "E-Commerce",
    summary:
      "Replatformed a DTC brand to headless commerce, doubling site speed.",
    cover: "from-pink-400/30 to-rose-500/20",
    challenge:
      "A heavy legacy storefront throttled growth with slow pages and rigid merchandising.",
    solution:
      "We moved ShopWave to a headless Next.js storefront with a flexible CMS and edge caching, unlocking fast iteration for the marketing team.",
    technologies: ["Next.js", "TypeScript", "GraphQL", "Vercel", "Redis"],
    timeline: "14 weeks",
    results: [
      { label: "Page speed", value: "2.1x" },
      { label: "Revenue/visit", value: "+31%" },
      { label: "Bounce rate", value: "-26%" },
    ],
    tags: ["Headless", "Performance", "Commerce"],
    featured: false,
  },
];

export const industries = [
  "Healthcare",
  "Fintech",
  "Logistics",
  "E-Commerce",
  "Real Estate",
  "Education",
] as const;

export const getCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);
