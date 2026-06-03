"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { Section, SectionHeading } from "@/components/layout/section";
import { ServiceCard } from "@/components/cards/service-card";
import { Button } from "@/components/ui/button";
import { staggerContainer, viewportOnce } from "@/lib/motion";

export function ServicesOverview() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="What we do"
        title={
          <>
            Capabilities that move{" "}
            <span className="text-gradient">the metrics</span>
          </>
        }
        description="Six core practices, one senior team — from redesigns and SaaS to AI, mobile and cloud."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </motion.div>

      <div className="mt-10 flex justify-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/services">
            Explore all services
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
