"use client";

import { motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/layout/section";
import { LogoChip } from "@/components/cards/logo-chip";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

const PARTNERS = [
  { name: "Birdeye", mono: "B", tint: "from-amber-400 to-yellow-400" },
  { name: "Dentrix", mono: "D", tint: "from-teal-400 to-cyan-400" },
  { name: "Salesforce", mono: "SF", tint: "from-sky-400 to-blue-400" },
  { name: "HubSpot", mono: "HS", tint: "from-orange-400 to-rose-400" },
  { name: "Stripe", mono: "S", tint: "from-violet-400 to-fuchsia-400" },
  { name: "& many more", mono: "+", tint: "from-primary to-secondary" },
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
        className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-3"
      >
        {PARTNERS.map((p) => (
          <motion.div key={p.name} variants={fadeUp}>
            <LogoChip name={p.name} mono={p.mono} tint={p.tint} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
