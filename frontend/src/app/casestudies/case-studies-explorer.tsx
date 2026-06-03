"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import type { CaseStudy } from "@/lib/types";
import { industries } from "@/data/case-studies";
import { CaseStudyCard } from "@/components/cards/case-study-card";
import { CountUp } from "@/components/interactive/count-up";
import { staggerContainer } from "@/lib/motion";

const FILTERS = ["All", ...industries] as const;

export function CaseStudiesExplorer({ studies }: { studies: CaseStudy[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return studies.filter((s) => {
      const matchIndustry = filter === "All" || s.industry === filter;
      const matchQuery =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.client.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q));
      return matchIndustry && matchQuery;
    });
  }, [studies, filter, query]);

  return (
    <div>
      {/* animated summary stats */}
      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Case studies", value: studies.length, suffix: "" },
          { label: "Industries", value: industries.length, suffix: "" },
          { label: "Avg. conversion lift", value: 27, suffix: "%" },
          { label: "Client satisfaction", value: 98, suffix: "%" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border bg-panel/40 p-4 text-center"
          >
            <p className="font-display text-2xl font-bold text-gradient">
              <CountUp value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-1 text-xs text-fg-subtle">{s.label}</p>
          </div>
        ))}
      </div>

      {/* controls */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                filter === f
                  ? "border-primary bg-primary/15 text-fg"
                  : "border-border-strong text-fg-muted hover:border-primary/40 hover:text-fg"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-fg-subtle" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search work…"
            className="w-full rounded-full border border-border-strong bg-white/[0.02] py-2.5 pl-10 pr-4 text-sm text-fg placeholder:text-fg-subtle focus:border-primary/60 focus:outline-none"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-fg-muted">
          No case studies match your search.
        </p>
      ) : (
        <motion.div
          layout
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((study) => (
              <CaseStudyCard key={study.id} study={study} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
