"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { DashboardDemo } from "@/components/visionone/dashboard-demo";

/** Home-page introduction to VisionOne. The full story lives at /visionone. */
export function VisionOneTeaser() {
  return (
    <Section id="visionone" className="scroll-mt-24 bg-bg-2/30">
      <SectionHeading
        eyebrow="✦ Our product · VisionOne"
        title={
          <>
            Run the growth.{" "}
            <span className="text-gradient">See the return.</span>
          </>
        }
        description="Lead capture, an AI receptionist, ads, reviews and content — running as one system instead of five, and reporting into one screen. Leads by channel, calls answered and missed, appointments booked, and what each channel actually earned."
      />

      <div className="mt-14">
        <DashboardDemo variant="compact" />
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/visionone">
            See how VisionOne works
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
