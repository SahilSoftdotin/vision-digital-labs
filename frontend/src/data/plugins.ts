import type { Plugin } from "@/lib/types";

/**
 * The AI Front Office — five embeddable plugins any local business drops onto
 * its site with a single script tag. Content mirrors the shipped product
 * suite (lead capture, receptionist, proposals, reviews, AEO).
 */
export const plugins: Plugin[] = [
  {
    id: 1,
    slug: "lead-capture",
    name: "Smart Lead Capture",
    icon: "UserPlus",
    accent: "#00d9ff",
    tagline: "Stop losing the visitors who bounce off your contact form.",
    summary:
      "An adaptive, one-question-at-a-time form that qualifies and scores every lead — then texts the hot ones to the owner instantly.",
    problem:
      "Around 60% of visitors never finish a traditional contact form. The ones who do land in an inbox nobody checks until tomorrow.",
    highlights: [
      "Guided, mobile-first flow — one question per screen, no wall of fields",
      "AI lead score plus a one-paragraph summary written for the owner",
      "Hot leads trigger an instant SMS/email the moment they submit",
      "Built-in spam defense: honeypot, timing, and disposable-email checks",
    ],
    outcome:
      "More completed enquiries, ranked by how ready-to-buy they are, with the best ones on the owner's phone within seconds.",
    how: [
      "Visitor answers a few tailored questions on your site",
      "We score the lead and write a plain-English summary",
      "Hot leads alert you instantly; everything logs to your dashboard",
    ],
    setup: "$500–750 setup",
    monthly: "$99/mo",
    badge: "Start here",
  },
  {
    id: 2,
    slug: "ai-receptionist",
    name: "AI Receptionist",
    icon: "Bot",
    accent: "#7b61ff",
    tagline: "A 24/7 front desk that answers from your own knowledge.",
    summary:
      "A chat assistant grounded strictly in your business — services, hours, policies — that answers visitors and books them in, day or night.",
    problem:
      "Every missed call or after-hours question is a customer who moves on to the competitor who picked up.",
    highlights: [
      "Answers only from your website + curated Q&A — never invents prices",
      "Converts conversations into bookings and captured leads",
      "Guardrails per industry (dental never gives medical advice, etc.)",
      "Shows you the exact questions it couldn't answer, so you improve it",
    ],
    outcome:
      "Instant, on-brand answers around the clock — and booked appointments from visits that used to leave empty-handed.",
    how: [
      "We ingest your website and a short Q&A into its knowledge base",
      "Visitors chat and get grounded, accurate answers instantly",
      "It captures the booking or hands off to your team with the details",
    ],
    setup: "$1,000–1,500 setup",
    monthly: "$199–299/mo",
    badge: "Flagship",
  },
  {
    id: 3,
    slug: "proposal-generator",
    name: "Instant Proposal Generator",
    icon: "FileText",
    accent: "#22d3ee",
    tagline: "A branded, priced proposal in 60 seconds — while they're hot.",
    summary:
      "Visitors answer a short intake and instantly receive a branded, itemized proposal PDF; you get the lead and a copy.",
    problem:
      "Prospects go cold in the days it takes to hand-write a quote. Whoever responds first usually wins the job.",
    highlights: [
      "Deterministic pricing engine built from your real rules — no guesswork",
      "AI writes the personalized intro & scope; pricing is never AI-invented",
      "Branded hosted proposal page + PDF, emailed automatically",
      "14-day validity and an Accept button that alerts you the instant they say yes",
    ],
    outcome:
      "Quotes delivered while the prospect is still on your site — faster responses, more signed jobs, less admin time.",
    how: [
      "Visitor completes a guided, industry-specific intake",
      "Our engine prices it and AI drafts the narrative around your numbers",
      "They get a branded proposal + PDF; you get a hot lead and acceptance alerts",
    ],
    setup: "$1,000–1,500 setup",
    monthly: "$149–199/mo",
  },
  {
    id: 4,
    slug: "review-manager",
    name: "Review Manager",
    icon: "Star",
    accent: "#f59e0b",
    tagline: "Reply to every review, and show your best ones off — live.",
    summary:
      "AI-drafts on-brand replies to your Google reviews for one-click approval, runs review-request campaigns, and showcases your best reviews on your site.",
    problem:
      "Reviews drive who gets the call — but replying to them and chasing new ones is a chore that never gets done.",
    highlights: [
      "On-brand reply drafts you approve in one click — never auto-posted",
      "Bad reviews flagged urgent and sent to you before they fester",
      "Review-request campaigns turn finished jobs into fresh 5-star reviews",
      "A live review showcase (badge, carousel or wall) right on your website",
    ],
    outcome:
      "More reviews, every one answered within a day, and your reputation working for you on your own homepage.",
    how: [
      "We sync your Google reviews and draft replies for your approval",
      "You send review requests to finished customers in a couple of clicks",
      "Your best reviews render live on your site as they come in",
    ],
    setup: "$500 setup",
    monthly: "$99–149/mo",
  },
  {
    id: 5,
    slug: "aeo-scanner",
    name: "AI Visibility Scanner",
    icon: "Radar",
    accent: "#34d399",
    tagline: "Is your business visible to AI? Find out in 60 seconds.",
    summary:
      "Scores how visible you are when AI assistants and AI search answer local questions — with a branded report and a prioritized fix list.",
    problem:
      "Customers increasingly ask ChatGPT and AI search 'who's the best near me' — and most local businesses are invisible in those answers.",
    highlights: [
      "0–100 visibility score across four honest, measurable pillars",
      "Structured-data, crawlability and AI-answer sampling — no hand-waving",
      "A prioritized, plain-English list of exactly what to fix first",
      "Branded PDF report; monthly monitoring and competitor comparisons",
    ],
    outcome:
      "A clear picture of where you stand in the AI era — and the specific steps to start showing up when it matters.",
    how: [
      "Enter a business name, website and city",
      "We audit your site, presence and AI answers, then score it 0–100",
      "You get a branded report and a ranked list of fixes",
    ],
    setup: "Free scan",
    monthly: "$99–149/mo report",
    badge: "Free scan",
  },
];

/** The bundle pitch shown alongside the individual plugins. */
export const pluginBundle = {
  name: "AI Front Office",
  tagline: "All five plugins, one price — a full front desk that never sleeps.",
  setup: "$2,500 setup",
  monthly: "$499–599/mo",
  anchor: "Less than a part-time receptionist at $1,500+/month.",
};
