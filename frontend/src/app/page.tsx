import { Hero } from "@/components/sections/hero";
import { ClientLogos } from "@/components/sections/client-logos";
import { FeaturedWork } from "@/components/sections/featured-work";
import { ServicesOverview } from "@/components/sections/services-overview";
import { SeoSpotlight } from "@/components/sections/seo-spotlight";
import { Industries } from "@/components/sections/industries";
import { IntegrationPartners } from "@/components/sections/integration-partners";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { Statistics } from "@/components/sections/statistics";
import { Compliance } from "@/components/sections/compliance";
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

  // SEO & Social gets its own spotlight below, so keep it out of the 6-card grid.
  const coreServices = services.filter((s) => s.slug !== "seo-social");

  return (
    <>
      <Hero />
      <ClientLogos />
      <SeoSpotlight />
      <ServicesOverview services={coreServices} />
      <FeaturedWork studies={featured} />
      <Industries />
      <IntegrationPartners />
      <Process />
      <Statistics stats={stats} />
      <Testimonials testimonials={testimonials} />
      <Compliance />
      <CtaBand />
    </>
  );
}
