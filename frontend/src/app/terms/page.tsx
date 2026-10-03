import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = pageMeta({
  title: "Terms of use",
  description:
    "The terms covering this website and the VisionOne client portal. Client work is governed by a signed services agreement, which takes precedence over anything here.",
  path: "/terms",
});

/** Reviewed on this date. Update it whenever the page changes. */
const LAST_REVIEWED = "3 October 2026";

export default function TermsPage() {
  return (
    <>
      <Script
        id="terms-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Terms", path: "/terms" },
            ]),
          ),
        }}
      />

      <PageHeader
        eyebrow="Terms"
        title={
          <>
            Terms of <span className="text-gradient">use</span>
          </>
        }
        description="These cover this website and the VisionOne portal. If you are a client, your signed services agreement governs the work itself and takes precedence over anything on this page."
      />

      <Section className="pt-4">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-fg-subtle">Last reviewed {LAST_REVIEWED}</p>

          <div className="mt-10 space-y-10">
            <Item n={1} title="What these terms cover">
              <p>
                They cover your use of this website and of the VisionOne portal
                at{" "}
                <a
                  href={siteConfig.portalUrl}
                  className="text-primary-2 underline underline-offset-4"
                >
                  app.visiondigitallab.com
                </a>
                . They do not describe the work we do for clients. That is set
                out in a signed services agreement, and where the two differ, the
                agreement wins.
              </p>
            </Item>

            <Item n={2} title="Using the portal">
              <p>
                Access to VisionOne is granted to named people at a client
                clinic. Accounts are personal: do not share a sign-in, and tell
                us promptly if you think someone has access who should not.
              </p>
              <p>
                What you see in the portal is your clinic&rsquo;s own data. Do
                not attempt to reach another clinic&rsquo;s, probe the service
                for weaknesses without asking us first, or use it to store
                anything it is not meant to hold &mdash; in particular, it is not
                a clinical system and must not be used as one.
              </p>
            </Item>

            <Item n={3} title="What the figures in the portal are">
              <p>
                VisionOne reports on marketing performance. Figures are drawn
                from advertising platforms, scheduling systems and telephony
                providers, each of which revises its own numbers after the fact
                &mdash; ad platforms in particular restate recent spend for days
                afterwards.
              </p>
              <p>
                We take care that what you see matches the source, and a monthly
                report is deliberately frozen so it does not drift after you have
                read it. But the portal is a reporting tool, not a book of
                record. Do not use it as the basis for billing, accounting or a
                clinical decision.
              </p>
            </Item>

            <Item n={4} title="Nothing here is medical advice">
              <p>
                Nothing on this website or in the portal is medical advice, and
                nothing in it should be used to make a decision about a
                patient&rsquo;s care. Clinical judgement belongs to the
                clinician, working from the clinic&rsquo;s own records.
              </p>
            </Item>

            <Item n={5} title="Intellectual property">
              <p>
                The software behind VisionOne, this website, and the methods we
                use remain ours. Work produced specifically for a client &mdash;
                campaigns, copy, creative and the data about their own practice
                &mdash; belongs to that client, as set out in the services
                agreement.
              </p>
              <p>
                You may not copy, resell or reverse engineer the portal, or use
                it to build a competing product.
              </p>
            </Item>

            <Item n={6} title="Availability">
              <p>
                We aim to keep the portal available and will give notice of
                planned maintenance where we reasonably can. We do not promise
                uninterrupted service, and some interruptions come from upstream
                providers we do not control.
              </p>
              <p>
                If the portal is down, your clinic&rsquo;s own systems are
                unaffected. VisionOne reports on them; it does not run them.
              </p>
            </Item>

            <Item n={7} title="Confidentiality and data">
              <p>
                We treat what we learn about your practice as confidential. How
                we handle personal data is set out in our{" "}
                <Link
                  href="/privacy"
                  className="text-primary-2 underline underline-offset-4"
                >
                  privacy policy
                </Link>
                , and how we handle patient data specifically is set out on our{" "}
                <Link
                  href="/security"
                  className="text-primary-2 underline underline-offset-4"
                >
                  security page
                </Link>
                . Where we handle protected health information on behalf of a
                clinic, a Business Associate Agreement governs it.
              </p>
            </Item>

            <Item n={8} title="Liability">
              <p>
                We do not exclude liability for anything that cannot lawfully be
                excluded. Beyond that, our liability in connection with this
                website and the portal is limited as set out in the signed
                services agreement between us.
              </p>
            </Item>

            <Item n={9} title="Changes">
              <p>
                When these terms change, the review date above changes with them.
                Material changes affecting clients are raised with those clients
                directly rather than left to be noticed.
              </p>
            </Item>

            <Item n={10} title="Getting in touch">
              <p>
                Questions about these terms go to{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-primary-2 underline underline-offset-4"
                >
                  {siteConfig.email}
                </a>
                .
              </p>
            </Item>
          </div>

          <div className="mt-14 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/contact">
                Talk to us
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/privacy">Privacy policy</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

function Item({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-4 sm:grid-cols-[auto_1fr] sm:gap-6">
      <span
        className="grid size-9 shrink-0 place-items-center rounded-full border border-border-strong bg-white/[0.03] font-display text-sm font-semibold text-primary-2"
        aria-hidden
      >
        {n}
      </span>
      <div>
        <h2 className="font-display text-xl font-semibold text-fg sm:text-2xl">
          {title}
        </h2>
        <div className="mt-3 space-y-3 text-fg-muted">{children}</div>
      </div>
    </section>
  );
}
