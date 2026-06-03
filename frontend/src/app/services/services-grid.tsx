"use client";

import { motion } from "framer-motion";
import type { Service } from "@/lib/types";
import { ServiceCard } from "@/components/cards/service-card";
import { staggerContainer, viewportOnce } from "@/lib/motion";

export function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </motion.div>
  );
}
