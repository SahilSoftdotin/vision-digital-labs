"use client";

import { motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/layout/section";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

/**
 * Onboarding → growth. What actually happens, week by week, from the day a
 * clinic signs to the point where the dashboard starts changing decisions.
 */

const STEPS = [
  {
    when: "Week 1",
    title: "We connect what you already run",
    body: "Ad account, Google Business Profile, phone line, booking system. Your team carries on exactly as before — nothing changes for them yet.",
    marker: "No disruption",
  },
  {
    when: "Week 2",
    title: "The modules start working",
    body: "Lead capture goes on the site, the receptionist starts answering the calls you were missing, review requests begin going out after visits.",
    marker: "First leads captured",
  },
  {
    when: "Weeks 3–4",
    title: "The picture fills in",
    body: "Enough bookings have come through to tie them back to the channel that produced them. The dashboard stops being empty and starts being useful.",
    marker: "First attribution",
  },
  {
    when: "Month 2",
    title: "You move the first budget",
    body: "The screen shows which channel is busy and which one books. Usually they are not the same, and that first reallocation is where the money starts moving.",
    marker: "First decision changed",
  },
  {
    when: "Every month after",
    title: "The growth review",
    body: "We go through the same screen you have been looking at all month. No slide deck, no numbers you have not already seen, no surprises.",
    marker: "Compounding",
  },
];

export function Journey() {
  return (
    <Section id="journey">
      <SectionHeading
        eyebrow="How it starts"
        title={
          <>
            From connected to{" "}
            <span className="text-gradient">compounding</span>
          </>
        }
        description="Nobody buys a dashboard. They buy the month where the spending decision finally gets easy. Here is the path to it."
      />

      <motion.ol
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative mt-14 grid gap-6 lg:grid-cols-5 lg:gap-4"
      >
        {/* the through-line, drawn behind the steps on wide screens */}
        <span
          className="pointer-events-none absolute left-[1.15rem] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary via-secondary to-transparent sm:block lg:left-0 lg:top-[1.15rem] lg:h-px lg:w-full lg:bg-gradient-to-r"
          aria-hidden
        />

        {STEPS.map((step, i) => (
          <motion.li
            key={step.title}
            variants={fadeUp}
            className="relative flex gap-4 sm:pl-0 lg:block"
          >
            <span
              className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full border border-border-strong bg-bg-2 font-display text-sm font-semibold text-primary-2"
              aria-hidden
            >
              {i + 1}
            </span>

            <div className="lg:mt-5">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-fg-subtle">
                {step.when}
              </p>
              <h3 className="mt-1.5 font-display text-lg font-semibold text-fg">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {step.body}
              </p>
              <span className="mt-3 inline-flex items-center rounded-full border border-primary/30 bg-primary/[0.08] px-2.5 py-1 text-[0.7rem] font-medium text-primary-2">
                {step.marker}
              </span>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  );
}
