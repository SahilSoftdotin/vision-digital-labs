"use client";

import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Heart,
  ShieldCheck,
  Gauge,
  Users,
  Sparkles,
  Handshake,
} from "lucide-react";
import { aboutStats as fallbackStats } from "@/data/stats";
import type { SiteStat } from "@/lib/types";
import { Section, SectionHeading } from "@/components/layout/section";
import { CountUp } from "@/components/interactive/count-up";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

const VALUES = [
  { icon: Gauge, title: "Performance obsessed", desc: "Speed is a feature. We sweat Core Web Vitals and ship fast experiences." },
  { icon: ShieldCheck, title: "Trust by default", desc: "Security, accessibility and reliability are built in, not bolted on." },
  { icon: Sparkles, title: "Craft & polish", desc: "The details matter — motion, micro-interactions and pixel precision." },
  { icon: Handshake, title: "True partnership", desc: "We act like an extension of your team, not a distant vendor." },
];

const TIMELINE = [
  { year: "2016", title: "Founded", desc: "Started as a two-person studio obsessed with web performance." },
  { year: "2019", title: "Enterprise era", desc: "Expanded into custom platforms for fintech and healthcare." },
  { year: "2022", title: "AI practice", desc: "Launched our AI integration practice as LLMs reshaped products." },
  { year: "2025", title: "Global team", desc: "Now a remote-first team serving clients across 15+ countries." },
];

const TEAM = [
  { name: "Alex Rivera", role: "Founder & CEO" },
  { name: "Kanika", role: "Head of Design" },
  { name: "Sahil Arora", role: "Head of Engineering" },
  { name: "Nikhil", role: "Head of AI" },
];

const WHY = [
  "Senior-only team — no junior hand-offs",
  "Fixed-scope sprints with transparent pricing",
  "Performance & accessibility guaranteed",
  "Post-launch growth & optimization built in",
  "Provider-agnostic AI — no vendor lock-in",
  "Async-friendly across US, CA & EU timezones",
];

export function AboutContent({
  stats = fallbackStats,
}: {
  stats?: SiteStat[];
}) {
  return (
    <>
      {/* Stats */}
      <Section className="pt-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid gap-6 rounded-3xl border border-border-strong bg-panel/40 p-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="text-center">
              <p className="font-display text-4xl font-bold text-gradient">
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-fg-muted">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Story */}
      <Section className="pt-0">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading
            align="left"
            eyebrow="Our story"
            title={
              <>
                A studio built on{" "}
                <span className="text-gradient">craft and outcomes</span>
              </>
            }
          />
          <div className="space-y-4 text-lg leading-relaxed text-fg-muted">
            <p>
              Vision Digital Lab began with a simple conviction: most digital products
              underdeliver because they&apos;re built without enough care for
              speed, design and the people using them.
            </p>
            <p>
              Nearly a decade later, we&apos;re a senior, remote-first team that
              partners with ambitious businesses to redesign, modernize and build
              products that move real metrics — from redesigns that lift
              conversion to AI features that change how teams work.
            </p>
          </div>
        </div>
      </Section>

      {/* Mission / Vision */}
      <Section className="bg-bg-2/30 pt-4">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { icon: Target, label: "Mission", text: "To help ambitious businesses ship future-ready digital products that are fast, beautiful and built to scale." },
            { icon: Eye, label: "Vision", text: "A web where every product feels premium, performant and genuinely useful — powered thoughtfully by AI." },
          ].map(({ icon: Icon, label, text }) => (
            <div
              key={label}
              className="rounded-2xl border border-border bg-panel/50 p-8"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary-2 ring-1 ring-border-strong">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold">{label}</h3>
              <p className="mt-2 text-fg-muted">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Values */}
      <Section>
        <SectionHeading
          eyebrow="Core values"
          title={
            <>
              The principles behind{" "}
              <span className="text-gradient">every project</span>
            </>
          }
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="rounded-2xl border border-border bg-panel/50 p-6"
            >
              <Icon className="size-7 text-primary-2" />
              <h3 className="mt-4 font-display text-base font-semibold">
                {title}
              </h3>
              <p className="mt-2 text-sm text-fg-muted">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Timeline */}
      <Section className="bg-bg-2/30">
        <SectionHeading
          eyebrow="Our journey"
          title={
            <>
              Milestones along <span className="text-gradient">the way</span>
            </>
          }
        />
        <div className="relative mt-14 pl-6">
          <div className="absolute left-0 top-2 h-full w-px bg-gradient-to-b from-primary via-secondary to-transparent" />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="space-y-8"
          >
            {TIMELINE.map((item) => (
              <motion.div key={item.year} variants={fadeUp} className="relative">
                <span className="absolute -left-[1.6rem] top-1.5 size-3 rounded-full bg-primary ring-4 ring-bg" />
                <p className="font-mono text-sm text-primary-2">{item.year}</p>
                <h3 className="mt-1 font-display text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="mt-1 max-w-xl text-fg-muted">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Team */}
      <Section>
        <SectionHeading
          eyebrow="Leadership"
          title={
            <>
              The people steering <span className="text-gradient">the work</span>
            </>
          }
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TEAM.map((m) => (
            <motion.div
              key={m.name}
              variants={fadeUp}
              className="group rounded-2xl border border-border bg-panel/50 p-6 text-center transition-colors hover:border-primary/40"
            >
              <span className="mx-auto grid size-20 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary font-display text-xl font-bold text-[#04121a]">
                {m.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <h3 className="mt-4 font-display font-semibold">{m.name}</h3>
              <p className="text-sm text-fg-subtle">{m.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Why choose us */}
      <Section className="bg-bg-2/30">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading
            align="left"
            eyebrow="Why choose us"
            title={
              <>
                Reasons teams pick{" "}
                <span className="text-gradient">Vision Digital Lab</span>
              </>
            }
            description="We combine senior talent, transparent process and a relentless focus on outcomes."
          />
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid gap-3 sm:grid-cols-2"
          >
            {WHY.map((w) => (
              <motion.li
                key={w}
                variants={fadeUp}
                className="flex items-start gap-3 rounded-xl border border-border bg-panel/40 p-4 text-sm text-fg-muted"
              >
                <Heart className="mt-0.5 size-4 shrink-0 text-primary" />
                {w}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Section>
    </>
  );
}
