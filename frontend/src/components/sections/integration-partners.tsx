/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/layout/section";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

// Official brand logos, normalized to monochrome white so the strip reads as a
// uniform "works with" wall on the dark theme regardless of each logo's source.
const PARTNERS = [
  { name: "Birdeye", src: "/partners/birdeye.png", h: "h-6" },
  { name: "Dentrix", src: "/partners/dentrix.svg", h: "h-6" },
  { name: "Salesforce", src: "/partners/salesforce.svg", h: "h-9" },
  { name: "HubSpot", src: "/partners/hubspot.svg", h: "h-8" },
  { name: "Stripe", src: "/partners/stripe.svg", h: "h-8" },
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
        className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-5"
      >
        {PARTNERS.map((p) => (
          <motion.div
            key={p.name}
            variants={fadeUp}
            className="group flex flex-col items-center justify-end gap-3"
          >
            <span className="flex h-9 items-end">
              <img
                src={p.src}
                alt={p.name}
                className={`${p.h} w-auto opacity-60 brightness-0 invert transition-opacity duration-300 group-hover:opacity-100`}
              />
            </span>
            <span className="text-xs font-medium text-fg-muted">{p.name}</span>
          </motion.div>
        ))}
      </motion.div>

      <p className="mt-10 text-center text-sm text-fg-subtle">
        …and many more via secure APIs and webhooks.
      </p>
    </Section>
  );
}
