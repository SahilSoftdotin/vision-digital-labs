/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { fadeUp } from "@/lib/motion";

// Client logos for the case studies that have one (others fall back to the name only).
const CLIENT_LOGOS: Record<string, string> = {
  "novapay-checkout": "/casestudies/novapay.png",
  "medflow-patient-portal": "/casestudies/medflow.png",
  "cargolink-tms": "/casestudies/cargolink.jpg",
};

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <motion.div variants={fadeUp} layout>
      <Link
        href={`/casestudies/${study.slug}`}
        className="group block h-full overflow-hidden rounded-2xl border border-border bg-panel/60 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          {study.image && (
            <Image
              src={study.image}
              alt={`${study.client} — ${study.title}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {/* gradient tint + darken for legibility */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${study.cover} mix-blend-overlay`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent" />
          <span className="absolute left-4 top-4">
            <Badge className="bg-black/40 backdrop-blur">{study.industry}</Badge>
          </span>
          {CLIENT_LOGOS[study.slug] && (
            <span className="absolute right-4 top-4 flex h-9 items-center rounded-lg bg-white/95 px-2.5 shadow-md ring-1 ring-black/5 backdrop-blur">
              <img
                src={CLIENT_LOGOS[study.slug]}
                alt={`${study.client} logo`}
                className="h-5 w-auto"
              />
            </span>
          )}
          <span className="absolute bottom-3 left-4 font-display text-xl font-bold text-white drop-shadow-lg">
            {study.client}
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
