"use client";

import { motion } from "framer-motion";
import { siteStats as fallback } from "@/data/stats";
import type { SiteStat } from "@/lib/types";
import { CountUp } from "@/components/interactive/count-up";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

export function Statistics({ stats = fallback }: { stats?: SiteStat[] }) {
  return (
    <section className="relative overflow-hidden py-20 lg:py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/[0.06] to-primary/[0.06]" />
      <div className="container-x">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((s) => {
            const big = s.value >= 1000;
            return (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="text-center"
              >
                <p className="font-display text-4xl font-bold text-gradient sm:text-5xl">
                  <CountUp
                    value={s.value}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    useCompact={big}
                  />
                </p>
                <p className="mt-2 text-sm text-fg-muted">{s.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
