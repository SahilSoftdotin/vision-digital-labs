package com.visiondigitallab.backend.service.chat;

import com.visiondigitallab.backend.dto.ChatDtos.ChatTurn;
import java.util.List;
import java.util.regex.Pattern;
import org.springframework.stereotype.Component;

/**
 * Rule-based assistant — mirrors the frontend knowledge base. Default provider.
 * To enable OpenAI later, add an OpenAiChatProvider implementing ChatProvider
 * and annotate it {@code @Primary} (reads OPENAI_API_KEY).
 */
@Component
public class RuleBasedChatProvider implements ChatProvider {

    private record Rule(Pattern pattern, String answer) {}

    private static final List<Rule> KB =
            List.of(
                    rule(
                            "price|cost|budget|how much|rate|quote",
                            "Projects typically range from $10k for a focused redesign to $100k+ for full SaaS builds. Share your scope on the contact page and we'll send a tailored estimate."),
                    rule(
                            "service|offer|do you|help with|capab",
                            "We cover Website Redesign, Custom Web Apps, AI Solutions, Mobile Apps, Cloud & DevOps, and end-to-end Product Development. Which one fits your goal?"),
                    rule(
                            "ai|chatbot|assistant|automation|llm|gpt",
                            "Our AI practice builds RAG assistants, customer-facing chatbots, and workflow automation — provider-agnostic so you're never locked in. Want to see a relevant case study?"),
                    rule(
                            "book|consult|call|meeting|schedule|demo",
                            "Love it — click the “Book Free Consultation” button (bottom-right) to grab a 30-minute slot, or tell me your name and email and I'll have someone reach out."),
                    rule(
                            "redesign|website|revamp|modern",
                            "Our redesigns pair a UX audit with a modern design system and performance work (90+ Lighthouse). Most ship in 12–16 weeks. Want the redesign case study?"),
                    rule(
                            "mobile|app|ios|android",
                            "We build native-quality iOS, Android, and cross-platform apps (React Native/Expo), with offline support and store-launch help."),
                    rule(
                            "cloud|aws|azure|gcp|devops|migrat|kubernetes",
                            "We handle cloud migration, containerization, IaC, and CI/CD on AWS, Azure, and GCP — usually cutting spend while improving reliability."),
                    rule(
                            "contact|email|reach|talk to",
                            "You can reach us at hello@visiondigitallab.com, or use the contact page for a detailed brief. Happy to help here too!"),
                    rule(
                            "hi|hello|hey|yo|greet",
                            "Hey! 👋 I can help with services, pricing, timelines, or booking a consultation. What are you working on?"));

    private static Rule rule(String regex, String answer) {
        return new Rule(Pattern.compile(regex, Pattern.CASE_INSENSITIVE), answer);
    }

    @Override
    public String reply(String message, List<ChatTurn> history) {
        return KB.stream()
                .filter(r -> r.pattern().matcher(message).find())
                .map(Rule::answer)
                .findFirst()
                .orElse(
                        "Great question! I can help with services, pricing, timelines, and booking a consultation. Could you tell me a bit more about your project — or use the contact page and a strategist will follow up?");
    }
}
