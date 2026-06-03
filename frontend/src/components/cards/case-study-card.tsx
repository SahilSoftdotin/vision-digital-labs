"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { fadeUp } from "@/lib/motion";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <motion.div variants={fadeUp} layout>
      <Link
        href={`/casestudies/${study.slug}`}
        className="group block h-full overflow-hidden rounded-2xl border border-border bg-panel/60 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
      >
        <div
          className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${study.cover}`}
        >
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-3xl font-bold text-white/80 drop-shadow">
              {study.client}
            </span>
          </div>
          <span className="absolute left-4 top-4">
            <Badge className="bg-black/30 backdrop-blur">{study.industry}</Badge>
          </span>
        </div>

        <div className="p-5">
          <h3 className="font-display text-lg font-semibold text-fg transition-colors group-hover:text-primary-2">
            {study.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-fg-muted">
            {study.summary}
          </p>

          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <div className="flex gap-4">
              {study.results.slice(0, 2).map((r) => (
                <div key={r.label}>
                  <p className="font-display text-base font-semibold text-gradient">
                    {r.value}
                  </p>
                  <p className="text-[0.7rem] text-fg-subtle">{r.label}</p>
                </div>
              ))}
            </div>
            <ArrowUpRight className="size-5 text-fg-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-2" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
