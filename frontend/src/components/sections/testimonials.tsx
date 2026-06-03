"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { testimonials as fallback } from "@/data/testimonials";
import type { Testimonial } from "@/lib/types";
import { Section, SectionHeading } from "@/components/layout/section";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

export function Testimonials({
  testimonials = fallback,
}: {
  testimonials?: Testimonial[];
}) {
  return (
    <Section>
      <SectionHeading
        eyebrow="Client love"
        title={
          <>
            What partners say about{" "}
            <span className="text-gradient">working with us</span>
          </>
        }
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 columns-1 gap-5 md:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid"
      >
        {testimonials.map((t) => (
          <motion.figure
            key={t.id}
            variants={fadeUp}
            className="rounded-2xl border border-border bg-panel/50 p-6"
          >
            <Quote className="size-7 text-primary/40" />
            <div className="mt-2 flex gap-0.5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="size-4 fill-accent text-accent" />
              ))}
            </div>
            <blockquote className="mt-3 text-[0.95rem] leading-relaxed text-fg-muted">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary font-display text-sm font-semibold text-[#04121a]">
                {t.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <div>
                <p className="text-sm font-semibold text-fg">{t.name}</p>
                <p className="text-xs text-fg-subtle">
                  {t.role}, {t.company}
                </p>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </Section>
  );
}
