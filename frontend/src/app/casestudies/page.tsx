import type { Metadata } from "next";
import { getCaseStudies } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { CaseStudiesExplorer } from "./case-studies-explorer";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = pageMeta({
  title: "Case Studies",
  description:
    "Real outcomes across healthcare, fintech, logistics, e-commerce, real estate and education — redesigns, platforms, AI and MVPs.",
  path: "/casestudies",
});

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();
  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title={
          <>
            Case studies with{" "}
            <span className="text-gradient">measurable impact</span>
          </>
        }
        description="Filter by industry or search to explore engagements and the results they drove."
      />
      <Section className="pt-4">
        <CaseStudiesExplorer studies={caseStudies} />
      </Section>
      <CtaBand />
    </>
  );
}
