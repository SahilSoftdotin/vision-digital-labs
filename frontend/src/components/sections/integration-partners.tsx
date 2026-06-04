"use client";

import { motion } from "framer-motion";
import { Star, HeartPulse, Cloud, Megaphone, CreditCard, Plus } from "lucide-react";
import { Section, SectionHeading } from "@/components/layout/section";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

const PARTNERS = [
  { name: "Birdeye", icon: Star },
  { name: "Dentrix", icon: HeartPulse },
  { name: "Salesforce", icon: Cloud },
  { name: "HubSpot", icon: Megaphone },
  { name: "Stripe", icon: CreditCard },
  { name: "& many more", icon: Plus },
];

export function IntegrationPartners() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Integration partners"
        title={
          <>
            Plugs into <span className="text-gradient">your existing stack</span>
          </>
        }
        description="We integrate with the platforms your business already runs on — CRM, payments, reviews, practice management and more."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3"
      >
        {PARTNERS.map(({ name, icon: Icon }) => (
          <motion.div
            key={name}
            variants={fadeUp}
            className="group flex items-center gap-3 rounded-2xl border border-border bg-panel/40 px-5 py-4 transition-colors hover:border-primary/40"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15 text-primary-2 ring-1 ring-border-strong transition-transform group-hover:scale-110">
              <Icon className="size-5" />
            </span>
            <span className="font-display text-base font-semibold text-fg">
              {name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
