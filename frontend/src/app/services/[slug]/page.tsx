import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { getServices, getService, getCaseStudy } from "@/lib/content";
import { pageMeta, serviceJsonLd } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { CaseStudyCard } from "@/components/cards/case-study-card";
import { CtaBand } from "@/components/sections/cta-band";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return pageMeta({ title: "Service" });
  return pageMeta({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const related = (
    await Promise.all(service.relatedCaseStudies.map((s) => getCaseStudy(s)))
  ).filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd(
              service.title,
              service.description,
              `/services/${service.slug}`,
            ),
          ),
        }}
      />
      <PageHeader
        eyebrow="Service"
        title={
          <span className="flex flex-col items-center gap-4">
            <span className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary-2 ring-1 ring-border-strong">
              <DynamicIcon name={service.icon} className="size-8" />
            </span>
            {service.title}
          </span>
        }
        description={service.tagline}
      />

      <Section className="pt-4">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-2xl font-semibold">Overview</h2>
            <p className="mt-4 text-lg leading-relaxed text-fg-muted">
              {service.description}
            </p>

            <h3 className="mt-10 font-display text-xl font-semibold">
              What&apos;s included
            </h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.deliverables.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-3 rounded-xl border border-border bg-panel/40 p-4 text-sm text-fg-muted"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <aside className="h-fit rounded-2xl border border-border-strong bg-panel/60 p-6 lg:sticky lg:top-24">
            <h3 className="font-display text-lg font-semibold">
              Core capabilities
            </h3>
            <ul className="mt-4 space-y-2">
              {service.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-sm text-fg-muted"
                >
                  <span className="size-1.5 rounded-full bg-primary" />
                  {f}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-6 w-full">
              <Link href="/contact">
                Start a project
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </aside>
        </div>
      </Section>

      {related.length > 0 && (
        <Section className="bg-bg-2/30 pt-4">
          <h2 className="font-display text-2xl font-semibold">
            Related case studies
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {related.map((study) => (
              <CaseStudyCard key={study.id} study={study} />
            ))}
          </div>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
