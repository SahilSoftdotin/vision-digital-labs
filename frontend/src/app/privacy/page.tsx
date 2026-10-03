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
  title: "Privacy policy",
  description:
    "What Vision Digital Lab collects, why, and where it is held. The website runs no analytics and sets no tracking cookies. Patient records stay in the clinic's own systems.",
  path: "/privacy",
});

/** Reviewed on this date. Update it whenever the page changes. */
const LAST_REVIEWED = "3 October 2026";

export default function PrivacyPage() {
  return (
    <>
      <Script
        id="privacy-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Privacy", path: "/privacy" },
            ]),
          ),
        }}
      />

      <PageHeader
        eyebrow="Privacy"
        title={
          <>
            What we collect, and{" "}
            <span className="text-gradient">what we don&rsquo;t</span>
          </>
        }
        description="Written to be read rather than skimmed past. If anything here is vaguer than you need it to be, tell us and we will make it specific."
      />

      <Section className="pt-4">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-fg-subtle">Last reviewed {LAST_REVIEWED}</p>

          <div className="mt-10 space-y-10">
            <Item n={1} title="Who we are">
              <p>
                {siteConfig.name} is the controller of the personal data
                described here. You can reach us at{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-primary-2 underline underline-offset-4"
                >
                  {siteConfig.email}
                </a>{" "}
                about anything on this page, including a request to see, correct
                or delete what we hold about you.
              </p>
              <p>
                This policy covers two things: this website, and the VisionOne
                client portal at{" "}
                <a
                  href={siteConfig.portalUrl}
                  className="text-primary-2 underline underline-offset-4"
                >
                  app.visiondigitallab.com
                </a>
                . They hold different data and are described separately below.
              </p>
            </Item>

            <Item n={2} title="This website runs no analytics">
              <p>
                We do not load Google Analytics, advertising pixels, session
                recorders or any other third-party tracking script. We set no
                cookies for advertising or analytics. Nothing on this site builds
                a profile of you or follows you to another site.
              </p>
              <p>
                That is a statement about today, and it is the kind of statement
                that quietly stops being true. If we add anything that tracks
                visitors, this page changes first and the date above changes with
                it.
              </p>
            </Item>

            <Item n={3} title="If you contact us">
              <p>
                Our contact form asks for your name, email address, and
                optionally your company, phone number, budget, the service you
                are interested in, and whatever you want to tell us. We use it to
                answer you and to work out whether we can help.
              </p>
              <p>
                We do not sell it, rent it, or pass it to anyone for their own
                marketing. We keep it for as long as we are in conversation with
                you and for a reasonable period afterwards, and you can ask us to
                delete it at any time.
              </p>
            </Item>

            <Item n={4} title="The VisionOne portal, and whose data is in it">
              <p>
                VisionOne is the dashboard our clinic clients sign in to. For
                their staff it holds a name, an email address and a role &mdash;
                enough to sign in and to know who may change what.
              </p>
              <p>
                The rest of what it holds is marketing performance data: what was
                spent on which channel, how many enquiries arrived, how many
                became appointments, and which work we completed. That is
                information about a clinic&rsquo;s marketing, not about its
                patients.
              </p>
              <p>
                Where an appointment appears on a clinic&rsquo;s calendar,
                VisionOne stores a reference to it &mdash; the time, how long it
                runs, whether it happened, and a short label such as a first name
                and a last initial so a front desk can recognise the booking. It
                holds no diagnosis, no notes, no medications, no lab results and
                no reason for the visit. Those stay in the clinic&rsquo;s own
                systems, and VisionOne has no way to request them.
              </p>
            </Item>

            <Item n={5} title="Where it is held, and who can reach it">
              <p>
                This website is hosted on Vercel. The VisionOne portal and its
                database run on a server in the United States. Access is
                role-based and signed in through a dedicated identity provider;
                each clinic can only reach its own data, enforced in the
                application and in the database rather than only in the browser.
              </p>
              <p>
                Our engineering and support teams work from India. We say so here
                rather than leave you to find out later, because it appears on
                nearly every healthcare security questionnaire. Everyone working
                on a client account is bound by the same obligations that flow
                down from the Business Associate Agreement we sign with that
                clinic.
              </p>
            </Item>

            <Item n={6} title="Third parties">
              <p>
                We use third-party services to run the business &mdash; hosting,
                email, and the advertising and scheduling platforms a clinic
                already uses. Any third party involved in delivering your work is
                disclosed by name on request, along with what it is used for.
              </p>
              <p>
                Where we connect VisionOne to a platform a clinic already uses,
                we read what we need to report on and no more. We do not take a
                copy of a clinic&rsquo;s patient records into our systems in
                order to show a chart.
              </p>
            </Item>

            <Item n={7} title="Your rights">
              <p>
                You can ask us what we hold about you, ask us to correct it, ask
                us to delete it, or object to what we are doing with it. Email{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-primary-2 underline underline-offset-4"
                >
                  {siteConfig.email}
                </a>{" "}
                and we will respond within 30 days.
              </p>
              <p>
                If you are a patient of one of our clients, your records belong
                to that clinic rather than to us. Ask them directly &mdash; they
                are the ones who hold your chart, and they are obliged to answer.
                We will help them answer if the question touches anything we
                handle.
              </p>
            </Item>

            <Item n={8} title="Changes to this policy">
              <p>
                When this changes, the review date at the top changes with it. We
                do not quietly revise a privacy policy and leave the date alone.
              </p>
            </Item>
          </div>

          <div className="mt-14 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/contact">
                Ask us a question
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/security">How we handle patient data</Link>
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
