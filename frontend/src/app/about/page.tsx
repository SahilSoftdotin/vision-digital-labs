import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { AboutContent } from "./about-content";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = pageMeta({
  title: "About",
  description:
    "Vision Digital Labs is a senior, remote-first digital studio building future-ready products. Our story, mission, values, leadership and why teams choose us.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title={
          <>
            A senior studio building{" "}
            <span className="text-gradient">what&apos;s next</span>
          </>
        }
        description="Remote-first, outcome-obsessed, and trusted by ambitious teams across 15+ countries."
      />
      <AboutContent />
      <CtaBand />
    </>
  );
}
