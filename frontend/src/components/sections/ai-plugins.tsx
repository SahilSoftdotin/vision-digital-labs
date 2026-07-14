"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { plugins, pluginBundle } from "@/data/plugins";
import type { Plugin } from "@/lib/types";
import { Section, SectionHeading } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

export function AiPlugins() {
  const [active, setActive] = useState<Plugin | null>(null);

  return (
    <Section id="ai-plugins" className="scroll-mt-24">
      <SectionHeading
        eyebrow="✦ New · AI Front Office"
        title={
          <>
            AI plugins that run your <span className="text-gradient">front desk</span>
          </>
        }
        description="Five embeddable plugins any business drops onto its site with one line of code — capture leads, answer visitors, send proposals, manage reviews and get found by AI. Tap any plugin to see how it works."
      />

      {/* plugin grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {plugins.map((plugin) => (
          <motion.button
            key={plugin.id}
            variants={fadeUp}
            type="button"
            onClick={() => setActive(plugin)}
            aria-label={`Learn more about ${plugin.name}`}
            className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-panel/60 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
          >
            {/* accent glow on hover */}
            <div
              className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
              style={{ backgroundColor: `${plugin.accent}22` }}
            />

            <div className="flex items-center justify-between">
              <span
                className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 ring-1 ring-border-strong transition-transform group-hover:scale-110"
                style={{ color: plugin.accent }}
              >
                <DynamicIcon name={plugin.icon} className="size-6" />
              </span>
              {plugin.badge && (
                <span
                  className="rounded-full border px-2.5 py-1 text-[0.7rem] font-medium"
                  style={{
                    color: plugin.accent,
                    borderColor: `${plugin.accent}55`,
                    backgroundColor: `${plugin.accent}12`,
                  }}
                >
                  {plugin.badge}
                </span>
              )}
            </div>

            <div>
              <h3 className="font-display text-xl font-semibold text-fg">
                {plugin.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {plugin.summary}
              </p>
            </div>

            <div className="mt-auto flex items-center justify-between pt-2">
              <span className="text-xs text-fg-subtle">
                {plugin.setup} · {plugin.monthly}
              </span>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-2 opacity-80 transition-opacity group-hover:opacity-100">
                Details
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </motion.button>
        ))}

        {/* bundle card */}
        <motion.div variants={fadeUp} className="relative h-full">
          <div className="gradient-border h-full">
            <div className="flex h-full flex-col gap-4 p-6">
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-[#04121a]">
                  <Sparkles className="size-6" />
                </span>
                <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-[0.7rem] font-medium text-primary-2">
                  Best value
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-fg">
                  {pluginBundle.name} — all 5
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {pluginBundle.tagline}
                </p>
              </div>
              <p className="text-xs text-fg-subtle">{pluginBundle.anchor}</p>
              <div className="mt-auto flex items-center justify-between pt-2">
                <span className="text-sm font-semibold text-gradient">
                  {pluginBundle.setup} · {pluginBundle.monthly}
                </span>
                <Button asChild size="sm">
                  <Link href="/contact">
                    Get the bundle
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button asChild variant="outline" size="lg">
          <Link href="/plugins">
            Explore the AI Front Office
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      {/* per-plugin detail modal */}
      <Dialog open={active !== null} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-2xl">
          {active && <PluginDetail plugin={active} />}
        </DialogContent>
      </Dialog>
    </Section>
  );
}

function PluginDetail({ plugin }: { plugin: Plugin }) {
  return (
    <div className="max-h-[80vh] overflow-y-auto pr-1">
      <DialogHeader>
        <div className="flex items-center gap-3">
          <span
            className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 ring-1 ring-border-strong"
            style={{ color: plugin.accent }}
          >
            <DynamicIcon name={plugin.icon} className="size-6" />
          </span>
          <div>
            <DialogTitle>{plugin.name}</DialogTitle>
            <DialogDescription>{plugin.tagline}</DialogDescription>
          </div>
        </div>
      </DialogHeader>

      {/* the problem it solves */}
      <p className="rounded-xl border border-border bg-white/[0.02] p-4 text-sm leading-relaxed text-fg-muted">
        {plugin.problem}
      </p>

      {/* what it does */}
      <h4 className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-fg-subtle">
        What it does
      </h4>
      <ul className="mt-3 space-y-2.5">
        {plugin.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2.5 text-sm text-fg-muted">
            <span
              className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full"
              style={{ backgroundColor: `${plugin.accent}1f`, color: plugin.accent }}
            >
              <Check className="size-3" />
            </span>
            {h}
          </li>
        ))}
      </ul>

      {/* how it works */}
      <h4 className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-fg-subtle">
        How it works
      </h4>
      <ol className="mt-3 space-y-2.5">
        {plugin.how.map((step, i) => (
          <li key={step} className="flex items-start gap-3 text-sm text-fg-muted">
            <span className="grid size-6 shrink-0 place-items-center rounded-full border border-border-strong bg-white/[0.03] text-xs font-semibold text-primary-2">
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>

      {/* outcome */}
      <div className="mt-6 rounded-xl border border-primary/25 bg-primary/[0.06] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-2">
          The payoff
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-fg">{plugin.outcome}</p>
      </div>

      {/* pricing + CTAs */}
      <div className="mt-6 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg font-semibold text-gradient">
            {plugin.setup} · {plugin.monthly}
          </p>
          <p className="text-xs text-fg-subtle">
            No long-term contract — cancel anytime.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/plugins">Compare all</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/contact">
              Book a demo
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
