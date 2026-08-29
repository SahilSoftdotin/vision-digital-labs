"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Check,
  FileText,
  Megaphone,
  Share2,
  Star,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

/**
 * The growth package on /services — five offerings run together.
 *
 * Deliberately a static section rather than a `Service` record: services are
 * CMS-backed with a fixture fallback, so a record added to the fixtures alone
 * would disappear the moment the backend answered.
 */

const OFFERINGS = [
  {
    icon: Megaphone,
    title: "Lead generation and Google Ads",
    body: "We build and run the campaigns that make the phone ring — search, local, and the landing pages behind them. Budgets, keywords and bids are managed weekly, not set once and forgotten.",
  },
  {
    icon: Share2,
    title: "Social media",
    body: "A posting calendar you approve in advance, written in your voice, and run consistently. No engagement pods, no bought followers.",
  },
  {
    icon: Star,
    title: "Google reviews and Business Profile",
    body: "Your Business Profile kept accurate and complete, review requests sent after every visit, and every review replied to.",
    rule: "We do not gate reviews. Every patient gets asked, not just the ones we expect to be happy — filtering for good reviews breaks Google's policies and the FTC's rule on suppressed reviews.",
  },
  {
    icon: FileText,
    title: "Blogs and content",
    body: "Articles and page content that answer what people actually search for before they book, published on a schedule you can see.",
    rule: "For clinics, every published asset is signed off by the physician before it goes live. Physician advertising is regulated by each state's medical board, and the practice carries that risk — so nothing goes out over a doctor's name without the doctor reading it.",
  },
];

const RECEPTIONIST = [
  "Answers the calls your front desk misses — at lunch, after five, and on Saturdays",
  "Books straight into your existing scheduling system, so nothing is retyped",
  "Runs on a vetted, HIPAA-eligible partner platform, named on request",
  "Says it is an AI assistant at the start of the call",
  "Never gives medical advice — clinical questions go to your staff",
  "Never places outbound calls",
];

export function GrowthPackage() {
  return (
    <Section id="growth" className="scroll-mt-24">
      <SectionHeading
        eyebrow="Growth"
        title={
          <>
            Five things that fill a diary,{" "}
            <span className="text-gradient">run as one package</span>
          </>
        }
        description="Lead generation, reviews, social, content and an AI receptionist — managed together instead of by five vendors who never speak. Most of this work is for clinics; it runs the same way for any business that lives on booked appointments."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 grid gap-5 lg:grid-cols-2"
      >
        {OFFERINGS.map(({ icon: Icon, title, body, rule }) => (
          <motion.div
            key={title}
            variants={fadeUp}
            className="flex h-full flex-col rounded-2xl border border-border bg-panel/50 p-6"
          >
            <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary-2 ring-1 ring-border-strong">
              <Icon className="size-6" />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-fg">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{body}</p>
            {rule && (
              <p className="mt-4 rounded-xl border border-primary/25 bg-primary/[0.06] p-4 text-sm leading-relaxed text-fg">
                {rule}
              </p>
            )}
          </motion.div>
        ))}

        {/* AI receptionist — the one that needs the most reassurance */}
        <motion.div variants={fadeUp} className="lg:col-span-2">
          <div className="gradient-border h-full">
            <div className="grid gap-6 p-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:p-8">
              <div>
                <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-[#04121a]">
                  <Bot className="size-6" />
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-fg">
                  AI receptionist
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  A missed call at six in the evening is a patient who rings the
                  clinic down the road. The receptionist picks up instead, takes
                  the booking, and leaves you the transcript.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                  It is deliberately narrow. Here is exactly what it does and
                  what it will not do.
                </p>
              </div>

              <ul className="space-y-2.5">
                {RECEPTIONIST.map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-fg-muted"
                  >
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                      <Check className="size-3" />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/contact">
            Talk about the package
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/visionone">See what it all produced</Link>
        </Button>
      </div>

      <p className="mt-6 text-center text-sm text-fg-muted">
        Working with a clinic?{" "}
        <Link
          href="/security"
          className="text-primary-2 underline-offset-4 hover:underline"
        >
          How we handle patient data
        </Link>
        .
      </p>
    </Section>
  );
}
