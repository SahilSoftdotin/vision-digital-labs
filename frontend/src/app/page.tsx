import { Hero } from "@/components/sections/hero";
import { ClientLogos } from "@/components/sections/client-logos";
import { FeaturedWork } from "@/components/sections/featured-work";
import { ServicesOverview } from "@/components/sections/services-overview";
import { Industries } from "@/components/sections/industries";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { Statistics } from "@/components/sections/statistics";
import { CtaBand } from "@/components/sections/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <ServicesOverview />
      <FeaturedWork />
      <Industries />
      <Process />
      <Statistics />
      <Testimonials />
      <CtaBand />
    </>
  );
}
