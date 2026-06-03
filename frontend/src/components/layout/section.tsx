"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/badge";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function Section({
  className,
  children,
  id,
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn("relative py-20 lg:py-28", className)}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <div className={cn("mb-4", align === "center" && "flex justify-center")}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl lg:text-[2.7rem] lg:leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-fg-muted sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}
