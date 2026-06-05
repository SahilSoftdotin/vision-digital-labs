"use client";

import { motion } from "framer-motion";
import {
  HeartPulse,
  Accessibility,
  Globe,
  Scale,
  ShieldCheck,
  CreditCard,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/layout/section";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

const BADGES = [
  {
    icon: HeartPulse,
    title: "HIPAA-ready",
    desc: "HIPAA-ready development processes for healthcare & dental clients.",
  },
  {
    icon: Accessibility,
    title: "ADA compliant",
    desc: "ADA-compliant, WCAG 2.2 AA accessible websites built in from day one.",
  },
  {
    icon: Globe,
    title: "GDPR compliant",
    desc: "Privacy-by-design data handling that meets GDPR requirements.",
  },
  {
    icon: Scale,
    title: "CCPA compliant",
    desc: "California consumer privacy obligations covered end to end.",
  },
  {
    icon: ShieldCheck,
    title: "SOC 2–aligned",
    desc: "Security practices aligned to SOC 2 controls and monitoring.",
  },
  {
    icon: CreditCard,
    title: "PCI-DSS payments",
    desc: "PCI-DSS compliant payment integrations where applicable.",
  },
];

export function Compliance() {
  return (
    <Section className="bg-bg-2/30">
      <SectionHeading
        eyebrow="Compliance & trust"
        title={
          <>
            Built to <span className="text-gradient">enterprise standards</span>
          </>
        }
        description="Security, privacy and compliance are built into how we work — so regulated industries can ship with confidence."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {BADGES.map(({ icon: Icon, title, desc }) => (
          <motion.div
            key={title}
            variants={fadeUp}
            className="group flex flex-col rounded-2xl border border-border bg-panel/50 p-5 text-center transition-colors hover:border-primary/40"
          >
            <span className="mx-auto grid size-12 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary-2 ring-1 ring-border-strong transition-transform group-hover:scale-110">
              <Icon className="size-6" />
            </span>
            <h3 className="mt-4 font-display text-sm font-semibold text-fg">
              {title}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-fg-muted">{desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
