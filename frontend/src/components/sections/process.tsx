"use client";

import { motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/layout/section";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

const STEPS = [
  { n: "01", title: "Discovery", desc: "We dig into goals, users and constraints to define what success means." },
  { n: "02", title: "Strategy", desc: "A clear roadmap, architecture and scope — aligned to business outcomes." },
  { n: "03", title: "Design", desc: "Interface, motion and a design system that feels premium and on-brand." },
  { n: "04", title: "Development", desc: "Senior engineers build it right — tested, performant and maintainable." },
  { n: "05", title: "Launch", desc: "Smooth, instrumented release with monitoring and zero-downtime deploys." },
  { n: "06", title: "Growth", desc: "We iterate on data — optimizing conversion, speed and the roadmap." },
];

export function Process() {
  return (
    <Section className="bg-bg-2/30">
      <SectionHeading
        eyebrow="How we work"
        title={
          <>
            A proven path from{" "}
            <span className="text-gradient">idea to growth</span>
          </>
        }
        description="Transparent, collaborative and outcome-driven at every stage."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {STEPS.map((step) => (
          <motion.div
            key={step.n}
            variants={fadeUp}
            className="group relative overflow-hidden rounded-2xl border border-border bg-panel/50 p-6"
          >
            <span className="font-display text-5xl font-bold text-transparent [-webkit-text-stroke:1px_var(--border-strong)] transition-all group-hover:[-webkit-text-stroke:1px_var(--primary)]">
              {step.n}
            </span>
            <h3 className="mt-3 font-display text-lg font-semibold text-fg">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              {step.desc}
            </p>
            <div className="pointer-events-none absolute -bottom-10 -right-10 size-28 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
