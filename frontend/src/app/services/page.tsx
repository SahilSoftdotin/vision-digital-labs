import type { Metadata } from "next";
import { getServices } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { ServicesGrid } from "./services-grid";
import { Process } from "@/components/sections/process";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = pageMeta({
  title: "Services",
  description:
    "Website redesign, custom web apps, AI solutions, mobile apps, cloud & DevOps, and product development — delivered by a senior team.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Everything you need to{" "}
            <span className="text-gradient">design, build &amp; scale</span>
          </>
        }
        description="Six core practices that take you from a dated site to a future-ready digital product."
      />
      <Section className="pt-4">
        <ServicesGrid services={services} />
      </Section>
      <Process />
      <CtaBand />
    </>
  );
}
