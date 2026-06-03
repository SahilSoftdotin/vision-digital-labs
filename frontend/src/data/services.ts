import type { Service } from "@/lib/types";

export const services: Service[] = [
  {
    id: 1,
    slug: "website-redesign",
    title: "Website Redesign",
    icon: "Paintbrush",
    tagline: "Turn an outdated site into a high-converting flagship.",
    description:
      "We re-architect dated websites into fast, modern, conversion-focused experiences — backed by UX research, a refreshed design system, and measurable performance gains.",
    features: ["UX Audit", "UI Modernization", "Performance Optimization"],
    deliverables: [
      "Heuristic + analytics UX audit",
      "New design system & component library",
      "Core Web Vitals optimization (90+ Lighthouse)",
      "SEO-preserving migration plan",
    ],
    relatedCaseStudies: ["medflow-patient-portal", "novapay-checkout"],
  },
  {
    id: 2,
    slug: "custom-web-applications",
    title: "Custom Web Applications",
    icon: "LayoutDashboard",
    tagline: "SaaS platforms, enterprise portals and data-rich dashboards.",
    description:
      "From multi-tenant SaaS to internal enterprise portals, we build secure, scalable web applications with clean architecture and delightful UX.",
    features: ["SaaS", "Enterprise Portals", "Dashboards"],
    deliverables: [
      "Multi-tenant SaaS architecture",
      "Role-based access & SSO",
      "Real-time dashboards & analytics",
      "API-first, integration-ready backend",
    ],
    relatedCaseStudies: ["novapay-checkout", "cargolink-tms"],
  },
  {
    id: 3,
    slug: "ai-solutions",
    title: "AI Solutions",
    icon: "Sparkles",
    tagline: "Chatbots, assistants and workflow automation that ship.",
    description:
      "We integrate LLMs and automation into your product and operations — practical AI that reduces cost, speeds up teams, and creates new customer experiences.",
    features: ["Chatbots", "AI Assistants", "Workflow Automation"],
    deliverables: [
      "RAG-powered assistants on your data",
      "Customer-facing chat & support bots",
      "Document & workflow automation",
      "Provider-agnostic AI architecture",
    ],
    relatedCaseStudies: ["medflow-patient-portal", "scholarly-lms"],
  },
  {
    id: 4,
    slug: "mobile-apps",
    title: "Mobile Apps",
    icon: "Smartphone",
    tagline: "Native-quality iOS, Android and cross-platform apps.",
    description:
      "We design and build mobile apps that feel native, perform beautifully, and share a codebase to ship faster across platforms.",
    features: ["iOS", "Android", "Cross Platform"],
    deliverables: [
      "React Native / Expo cross-platform builds",
      "Native modules where it matters",
      "Offline-first & push notifications",
      "App Store & Play Store launch support",
    ],
    relatedCaseStudies: ["cargolink-tms", "estatex-marketplace"],
  },
  {
    id: 5,
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    icon: "Cloud",
    tagline: "Migrate, scale and automate on AWS, Azure or GCP.",
    description:
      "We modernize infrastructure with containers, IaC and CI/CD — cutting cloud spend and shipping reliably with zero-downtime deploys.",
    features: ["AWS", "Azure", "GCP"],
    deliverables: [
      "Cloud migration & cost optimization",
      "Containerization & Kubernetes",
      "Infrastructure as Code (Terraform)",
      "CI/CD pipelines & observability",
    ],
    relatedCaseStudies: ["cargolink-tms", "novapay-checkout"],
  },
  {
    id: 6,
    slug: "product-development",
    title: "Product Development",
    icon: "Rocket",
    tagline: "From MVP to enterprise-grade product, end to end.",
    description:
      "We partner from idea to launch — validating fast with an MVP, then scaling into a robust product with the right architecture and team.",
    features: ["MVP", "Startup Launches", "Enterprise Systems"],
    deliverables: [
      "Product discovery & roadmap",
      "Rapid MVP in weeks, not months",
      "Scalable architecture for growth",
      "Ongoing product engineering",
    ],
    relatedCaseStudies: ["estatex-marketplace", "scholarly-lms"],
  },
];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);
