"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/badge";
import { ParticleField } from "@/components/interactive/particle-field";
import { MouseGlow } from "@/components/interactive/mouse-glow";
import { TypingHeadline } from "@/components/interactive/typing-headline";
import { LiveVisitors } from "@/components/interactive/live-visitors";
import { fadeUp, staggerContainer } from "@/lib/motion";

// 3D is client-only and lazy so it never blocks first paint.
const HeroScene = dynamic(
  () => import("@/components/interactive/hero-scene"),
  { ssr: false },
);

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10 grid-bg opacity-60" />
      <ParticleField className="absolute inset-0 -z-10 h-full w-full" />
      <MouseGlow />
      <div className="absolute left-1/2 top-0 -z-10 h-72 w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-secondary/20 blur-[120px]" />

      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={fadeUp}>
              <Eyebrow>Future-ready digital studio</Eyebrow>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Building{" "}
              <span className="text-gradient">
                <TypingHeadline
                  phrases={[
                    "Future-Ready",
                    "AI-Powered",
                    "High-Performance",
                    "Conversion-First",
                  ]}
                />
              </span>
              <br />
              Digital Experiences
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted"
            >
              We redesign, modernize and build high-performance digital products
              for ambitious businesses across the US, Canada and Europe.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button asChild size="lg">
                <Link href="/contact">
                  Start Building Project
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/casestudies">
                  <Play className="size-4" />
                  View Our Work
                </Link>
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-fg-muted"
            >
              <LiveVisitors />
              <span className="flex items-center gap-2">
                <Sparkles className="size-4 text-accent" />
                Trusted by teams in 15+ countries
              </span>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto aspect-square w-full max-w-md"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl" />
            <HeroScene />
            <FloatingChip
              className="left-0 top-10"
              label="Lighthouse"
              value="98"
            />
            <FloatingChip
              className="right-0 top-1/3"
              label="Projects"
              value="127+"
              delay={0.4}
            />
            <FloatingChip
              className="bottom-12 left-6"
              label="Revenue impact"
              value="$180M+"
              delay={0.7}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FloatingChip({
  label,
  value,
  className,
  delay = 0,
}: {
  label: string;
  value: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + delay }}
      className={`absolute glass animate-float rounded-2xl px-4 py-3 ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <p className="text-xs text-fg-subtle">{label}</p>
      <p className="font-display text-lg font-semibold text-gradient">{value}</p>
    </motion.div>
  );
}
