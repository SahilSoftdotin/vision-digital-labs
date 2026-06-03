import { Hero } from "@/components/sections/hero";
import { ClientLogos } from "@/components/sections/client-logos";
import { FeaturedWork } from "@/components/sections/featured-work";
import { ServicesOverview } from "@/components/sections/services-overview";
import { Industries } from "@/components/sections/industries";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { Statistics } from "@/components/sections/statistics";
import { CtaBand } from "@/components/sections/cta-band";
import {
  getServices,
  getFeaturedCaseStudies,
  getTestimonials,
  getStats,
} from "@/lib/content";

export default async function HomePage() {
  const [services, featured, testimonials, stats] = await Promise.all([
    getServices(),
    getFeaturedCaseStudies(),
    getTestimonials(),
    getStats("home"),
  ]);

  return (
    <>
      <Hero />
      <ClientLogos />
      <ServicesOverview services={services} />
      <FeaturedWork studies={featured} />
      <Industries />
      <Process />
      <Statistics stats={stats} />
      <Testimonials testimonials={testimonials} />
      <CtaBand />
    </>
  );
}
