import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Target, Lightbulb, Clock } from "lucide-react";
import { caseStudies, getCaseStudy } from "@/data/case-studies";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/interactive/count-up";
import { CtaBand } from "@/components/sections/cta-band";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return pageMeta({ title: "Case Study" });
  return pageMeta({
    title: study.title,
    description: study.summary,
    path: `/casestudies/${study.slug}`,
  });
}

/** Parse a "+27%" / "$12M" style metric into a number + prefix/suffix for CountUp. */
function parseMetric(value: string) {
  const match = value.match(/^([^\d-]*)(-?[\d.]+)(.*)$/);
  if (!match) return { prefix: "", num: null as number | null, suffix: value };
  return { prefix: match[1], num: parseFloat(match[2]), suffix: match[3] };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Case Studies", path: "/casestudies" },
              { name: study.client, path: `/casestudies/${study.slug}` },
            ]),
          ),
        }}
      />

      {/* Hero banner */}
      <section className="relative overflow-hidden pt-28 lg:pt-36">
        <div
          className={`absolute inset-0 -z-10 bg-gradient-to-br ${study.cover} opacity-50`}
        />
        <div className="absolute inset-0 -z-10 grid-bg opacity-30" />
        <div className="container-x pb-12">
          <Link
            href="/casestudies"
            className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="size-4" />
            All case studies
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge>{study.industry}</Badge>
            {study.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            {study.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-fg-muted">{study.summary}</p>
        </div>
      </section>

      {/* Results band */}
      <section className="border-y border-border bg-bg-2/40 py-10">
        <div className="container-x grid grid-cols-1 gap-6 sm:grid-cols-3">
          {study.results.map((r) => {
            const { prefix, num, suffix } = parseMetric(r.value);
            return (
              <div key={r.label} className="text-center">
                <p className="font-display text-3xl font-bold text-gradient sm:text-4xl">
                  {num === null ? (
                    r.value
                  ) : (
                    <CountUp value={num} prefix={prefix} suffix={suffix} />
                  )}
                </p>
                <p className="mt-1 text-sm text-fg-muted">{r.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-10">
            <div>
              <h2 className="flex items-center gap-2 font-display text-2xl font-semibold">
                <Target className="size-5 text-primary-2" />
                The challenge
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-fg-muted">
                {study.challenge}
              </p>
            </div>
            <div>
              <h2 className="flex items-center gap-2 font-display text-2xl font-semibold">
                <Lightbulb className="size-5 text-accent" />
                Our solution
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-fg-muted">
                {study.solution}
              </p>
            </div>
          </div>

          <aside className="h-fit space-y-6 rounded-2xl border border-border-strong bg-panel/60 p-6 lg:sticky lg:top-24">
            <div>
              <p className="text-xs uppercase tracking-wider text-fg-subtle">
                Client
              </p>
              <p className="mt-1 font-display text-lg font-semibold">
                {study.client}
              </p>
            </div>
            <div>
              <p className="flex items-center gap-2 text-xs uppercase tracking-wider text-fg-subtle">
                <Clock className="size-3.5" /> Timeline
              </p>
              <p className="mt-1 text-fg">{study.timeline}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-fg-subtle">
                Technologies
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {study.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-border bg-white/[0.02] px-2.5 py-1 font-mono text-xs text-fg-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <Button asChild className="w-full">
              <Link href="/contact">
                Start a similar project
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </aside>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
