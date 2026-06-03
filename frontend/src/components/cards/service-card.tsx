"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import type { Service } from "@/lib/types";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { fadeUp } from "@/lib/motion";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <motion.div variants={fadeUp}>
      <Link
        href={`/services/${service.slug}`}
        className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-panel/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
      >
        {/* hover glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

        <div className="flex items-center justify-between">
          <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary-2 ring-1 ring-border-strong transition-transform group-hover:scale-110">
            <DynamicIcon name={service.icon} className="size-6" />
          </span>
          <ArrowUpRight className="size-5 text-fg-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-2" />
        </div>

        <div>
          <h3 className="font-display text-xl font-semibold text-fg">
            {service.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">
            {service.tagline}
          </p>
        </div>

        <ul className="mt-auto flex flex-wrap gap-2 pt-2">
          {service.features.map((f) => (
            <li
              key={f}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white/[0.02] px-2.5 py-1 text-xs text-fg-muted"
            >
              <Check className="size-3 text-primary" />
              {f}
            </li>
          ))}
        </ul>
      </Link>
    </motion.div>
  );
}
