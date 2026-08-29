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
  title: "Security & patient data",
  description:
    "How Vision Digital Lab handles patient data: we sign a BAA with every clinic, patient records stay in the clinic's own systems, and marketing systems never receive patient data. Written plainly, including where our engineering and support teams work.",
  path: "/security",
});

/** Reviewed on this date. Update it whenever the page changes. */
const LAST_REVIEWED = "29 August 2026";

export default function SecurityPage() {
  return (
    <>
      <Script
        id="security-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Security", path: "/security" },
            ]),
          ),
        }}
      />

      <PageHeader
        eyebrow="Security"
        title={
          <>
            How we handle{" "}
            <span className="text-gradient">patient data</span>
          </>
        }
        description="Short, specific, and written to be read by whoever fills in your security questionnaire. If something here is not clear enough to answer a question on that form, tell us and we will fix the page."
      />

      <Section className="pt-4">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-fg-subtle">
            Last reviewed {LAST_REVIEWED}
          </p>

          <div className="mt-10 space-y-10">
            <Item n={1} title="We sign a Business Associate Agreement">
              <p>
                Before any work starts with a clinic, we sign a BAA. It sets out
                what we may handle, what we may not, and what happens if
                something goes wrong.
              </p>
              <p>
                We describe what we do, not what we are certified as. There is no
                body that certifies a company as HIPAA compliant, so we do not
                use the phrase. What we can tell you is which safeguards are in
                place, and this page is where we write them down.
              </p>
            </Item>

            <Item n={2} title="Patient data stays in your systems">
              <p>
                Patient records live where they already live — in your booking
                and practice systems. We do not copy them into ours.
              </p>
              <p>
                VisionOne stores aggregate numbers: how many leads arrived from a
                channel, how many calls were answered, how many appointments were
                booked, what that is estimated to be worth. Counts and totals,
                not people. If our database were opened tomorrow, there would be
                no patient records in it to read.
              </p>
            </Item>

            <Item n={3} title="Marketing systems never receive patient data">
              <p>
                Ad platforms and marketing tools get campaign data. They never
                receive patient identity, appointment details or anything that
                would indicate a person is a patient of yours.
              </p>
              <p>
                We also do not put advertising or remarketing pixels on this
                page, on our contact form, or anywhere a visit could reveal a
                healthcare relationship. That is a deliberate choice, and it is
                the one most easily broken by accident, so we check it.
              </p>
            </Item>

            <Item n={4} title="Subprocessors, disclosed by name">
              <p>
                Any third party involved in delivering your work is disclosed by
                name on request, along with what it is used for. Ask and we will
                send the current list — we would rather you had it before you
                sign than discover it afterwards.
              </p>
            </Item>

            <Item n={5} title="Controls in place">
              <p>
                Data is encrypted in transit and at rest. Access is role-based —
                people get the access their job needs and no more. Access to
                client systems is logged.
              </p>
              <p>
                If your questionnaire asks about a control that is not listed
                here, ask us directly. We will tell you whether we have it,
                rather than answering with something adjacent.
              </p>
            </Item>

            <Item n={6} title="Where the work is done">
              <p>
                Our engineering and support teams work from India. We are telling
                you this here rather than leaving you to discover it later,
                because it appears on nearly every healthcare security
                questionnaire.
              </p>
              <p>
                The controls above do not change by location. Everyone working on
                your account is bound by the same obligations that flow down from
                the BAA. Access stays role-based and logged wherever the person
                sits. And the point in section two applies to every one of them:
                there are no patient records in our systems to access.
              </p>
            </Item>

            <Item n={7} title="Asking us a security question">
              <p>
                Send the questionnaire, or just the question. A person who knows
                the answer will reply — typically within one business day.
              </p>
              <p>
                Email{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-primary-2 underline-offset-4 hover:underline"
                >
                  {siteConfig.email}
                </a>{" "}
                or use the{" "}
                <Link
                  href="/contact"
                  className="text-primary-2 underline-offset-4 hover:underline"
                >
                  contact form
                </Link>
                .
              </p>
            </Item>
          </div>

          <div className="mt-14 flex flex-wrap gap-3 border-t border-border pt-10">
            <Button asChild size="lg">
              <Link href="/contact">
                Send us a question
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/visionone">What VisionOne stores</Link>
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
        <div className="mt-3 space-y-3 text-base leading-relaxed text-fg-muted">
          {children}
        </div>
      </div>
    </section>
  );
}
