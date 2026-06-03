"use client";

import { motion } from "framer-motion";
import {
  HeartPulse,
  Landmark,
  Truck,
  ShoppingCart,
  Building2,
  GraduationCap,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/layout/section";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

const INDUSTRIES = [
  { name: "Healthcare", icon: HeartPulse, blurb: "Portals, compliance, patient UX" },
  { name: "Fintech", icon: Landmark, blurb: "Payments, trust, performance" },
  { name: "Logistics", icon: Truck, blurb: "Real-time tracking at scale" },
  { name: "E-Commerce", icon: ShoppingCart, blurb: "Headless, fast, converting" },
  { name: "Real Estate", icon: Building2, blurb: "Marketplaces & listings" },
  { name: "Education", icon: GraduationCap, blurb: "Adaptive AI learning" },
];

export function Industries() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Industries served"
        title={
          <>
            Domain depth across{" "}
            <span className="text-gradient">regulated &amp; complex</span>{" "}
            sectors
          </>
        }
        description="We've shipped in environments where performance, security and trust are non-negotiable."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {INDUSTRIES.map(({ name, icon: Icon, blurb }) => (
          <motion.div
            key={name}
            variants={fadeUp}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-panel/40 p-5 transition-colors hover:border-secondary/40"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-secondary/20 to-primary/20 text-primary-2 ring-1 ring-border-strong transition-transform group-hover:scale-110">
              <Icon className="size-6" />
            </span>
            <div>
              <p className="font-display font-semibold text-fg">{name}</p>
              <p className="text-sm text-fg-subtle">{blurb}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
