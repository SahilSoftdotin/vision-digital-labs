"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Search, TrendingUp, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/badge";
import { CountUp } from "@/components/interactive/count-up";
import { XIcon, LinkedInIcon } from "@/components/layout/social-icons";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const CAPABILITIES = [
  "Technical SEO",
  "Content & On-Page",
  "Social Media Management",
  "Analytics & Reporting",
];

const STATS = [
  { value: 180, prefix: "+", suffix: "%", label: "Organic traffic" },
  { value: 3, prefix: "", suffix: "×", label: "Social engagement" },
  { value: 3, prefix: "Top ", suffix: "", label: "Search rankings" },
];

// Bar heights (%) for the little growth chart.
const BARS = [34, 48, 42, 63, 78, 96];

export function SeoSpotlight() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* background band */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-secondary/[0.10] via-transparent to-primary/[0.10]" />
      <div className="absolute inset-0 -z-10 grid-bg opacity-30" />
      <div className="absolute right-0 top-0 -z-10 h-72 w-[36rem] max-w-full rounded-full bg-primary/15 blur-[120px]" />

      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* LEFT — copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <motion.div variants={fadeUp}>
              <Eyebrow>★ Featured service · SEO &amp; Social</Eyebrow>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.7rem] lg:leading-[1.1]"
            >
              Get found <span className="text-gradient">everywhere.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-lg text-lg leading-relaxed text-fg-muted"
            >
              Rank higher, grow your social presence, and convert more — SEO and
              social media that compound into measurable, lasting growth.
            </motion.p>

            <motion.ul
              variants={fadeUp}
              className="mt-6 grid max-w-md grid-cols-2 gap-2.5"
            >
              {CAPABILITIES.map((c) => (
                <li
                  key={c}
                  className="flex items-center gap-2 text-sm text-fg-muted"
                >
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                    <Check className="size-3" />
                  </span>
                  {c}
                </li>
              ))}
            </motion.ul>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap gap-x-8 gap-y-4"
            >
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl font-bold text-gradient">
                    <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </p>
                  <p className="text-xs text-fg-subtle">{s.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8">
              <Button asChild size="lg">
                <Link href="/services/seo-social">
                  Grow my traffic
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* RIGHT — visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md"
          >
            {/* main glass card */}
            <div className="relative gradient-border p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-[#04121a]">
                    <TrendingUp className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs text-fg-subtle">Search ranking</p>
                    <p className="font-display text-2xl font-bold text-fg">
                      #1 <span className="text-base text-primary">▲</span>
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-white/[0.03] px-3 py-1.5 text-xs text-fg-muted">
                  <Search className="size-3.5 text-primary-2" />
                  your brand
                </span>
              </div>

              {/* growth chart */}
              <div className="mt-6 flex h-32 items-end gap-2.5">
                {BARS.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.7,
                      delay: 0.15 + i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-secondary/40 to-primary"
                  />
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-fg-subtle">
                <span>Organic growth</span>
                <span className="text-primary">+180% ▲</span>
              </div>
            </div>

            {/* floating platform chips */}
            <FloatChip className="-left-4 top-6" delay={0.5}>
              <XIcon className="size-4 text-fg" />
            </FloatChip>
            <FloatChip className="-right-3 top-1/3" delay={0.7}>
              <LinkedInIcon className="size-4 text-fg" />
            </FloatChip>
            <FloatChip className="-left-3 bottom-8" delay={0.9}>
              <Megaphone className="size-4 text-accent" />
            </FloatChip>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FloatChip({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={`absolute grid size-10 place-items-center rounded-xl glass animate-float ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </motion.span>
  );
}
