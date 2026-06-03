/**
 * Chat provider strategy. The rule-based provider ships now; an OpenAI (or any
 * other) provider can be added by implementing ChatProvider and swapping the
 * exported `chatProvider`. No call sites change.
 */
import { siteConfig } from "@/lib/site.config";

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

export interface ChatProvider {
  reply(message: string, history?: ChatTurn[]): Promise<string>;
}

const KB: { match: RegExp; answer: string }[] = [
  {
    match: /price|cost|budget|how much|rate|quote/i,
    answer:
      "Projects typically range from $10k for a focused redesign to $100k+ for full SaaS builds. Share your scope on the contact page and we'll send a tailored estimate.",
  },
  {
    match: /service|offer|do you|help with|capab/i,
    answer:
      "We cover Website Redesign, Custom Web Apps, AI Solutions, Mobile Apps, Cloud & DevOps, and end-to-end Product Development. Which one fits your goal?",
  },
  {
    match: /ai|chatbot|assistant|automation|llm|gpt/i,
    answer:
      "Our AI practice builds RAG assistants, customer-facing chatbots, and workflow automation — provider-agnostic so you're never locked in. Want to see a relevant case study?",
  },
  {
    match: /book|consult|call|meeting|schedule|demo/i,
    answer:
      "Love it — click the “Book Free Consultation” button (bottom-right) to grab a 30-minute slot, or tell me your name and email and I'll have someone reach out.",
  },
  {
    match: /redesign|website|revamp|modern/i,
    answer:
      "Our redesigns pair a UX audit with a modern design system and performance work (90+ Lighthouse). Most ship in 12–16 weeks. Want the redesign case study?",
  },
  {
    match: /mobile|app|ios|android/i,
    answer:
      "We build native-quality iOS, Android, and cross-platform apps (React Native/Expo), with offline support and store-launch help.",
  },
  {
    match: /cloud|aws|azure|gcp|devops|migrat|kubernetes/i,
    answer:
      "We handle cloud migration, containerization, IaC, and CI/CD on AWS, Azure, and GCP — usually cutting spend while improving reliability.",
  },
  {
    match: /contact|email|reach|talk to/i,
    answer: `You can reach us at ${siteConfig.email}, or use the contact page for a detailed brief. Happy to help here too!`,
  },
  {
    match: /hi|hello|hey|yo|greet/i,
    answer:
      "Hey! 👋 I can help with services, pricing, timelines, or booking a consultation. What are you working on?",
  },
];

class RuleBasedProvider implements ChatProvider {
  async reply(message: string): Promise<string> {
    const hit = KB.find((k) => k.match.test(message));
    if (hit) return hit.answer;
    return "Great question! I can help with services, pricing, timelines, and booking a consultation. Could you tell me a bit more about your project — or use the contact page and a strategist will follow up?";
  }
}

// To enable OpenAI later: implement ChatProvider here using OPENAI_API_KEY and
// export it instead of RuleBasedProvider.
export const chatProvider: ChatProvider = new RuleBasedProvider();
