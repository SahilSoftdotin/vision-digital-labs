"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { caseStudies as fallback } from "@/data/case-studies";
import type { CaseStudy } from "@/lib/types";
import { Section, SectionHeading } from "@/components/layout/section";
import { CaseStudyCard } from "@/components/cards/case-study-card";
import { Button } from "@/components/ui/button";
import { staggerContainer, viewportOnce } from "@/lib/motion";

export function FeaturedWork({ studies }: { studies?: CaseStudy[] }) {
  const featured = (studies ?? fallback.filter((c) => c.featured)).slice(0, 3);

  return (
    <Section className="bg-bg-2/30">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          align="left"
          eyebrow="Selected work"
          title={
            <>
              Outcomes we&apos;re <span className="text-gradient">proud of</span>
            </>
          }
          description="A few recent engagements and the results they delivered."
        />
        <Button asChild variant="ghost" className="hidden md:inline-flex">
          <Link href="/casestudies">
            All case studies
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {featured.map((study) => (
          <CaseStudyCard key={study.id} study={study} />
        ))}
      </motion.div>
    </Section>
  );
}
