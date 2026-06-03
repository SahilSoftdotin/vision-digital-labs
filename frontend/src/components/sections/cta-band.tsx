"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function CtaBand() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-x">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-3xl border border-border-strong bg-gradient-to-br from-panel to-bg-2 px-6 py-14 text-center sm:px-12 lg:py-20"
        >
          <div className="absolute inset-0 -z-10 grid-bg opacity-30" />
          <div className="absolute left-1/2 top-0 -z-10 h-40 w-[34rem] max-w-full -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]" />

          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Ready to build something{" "}
            <span className="text-gradient">future-ready?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-fg-muted sm:text-lg">
            Tell us about your project, or grab a free 30-minute consultation.
            We&apos;ll map the fastest path to results.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/contact">
                Start a Project
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">
                <CalendarDays className="size-4" />
                Book Free Consultation
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
