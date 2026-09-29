import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import {
  ArrowRight,
  Bot,
  CalendarCheck,
  FileText,
  Megaphone,
  MousePointerClick,
  PhoneCall,
  Star,
  UserPlus,
  Wallet,
} from "lucide-react";
import { pageMeta, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site.config";
import { PageHeader } from "@/components/layout/page-header";
import { Section, SectionHeading } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/sections/cta-band";
import { DashboardDemo } from "@/components/visionone/dashboard-demo";
import { Journey } from "@/components/visionone/journey";

const DESCRIPTION =
  "VisionOne is one system for everything that fills your diary — lead capture, an AI receptionist, ads, reviews and content — with a single screen that shows what each of them earned.";

export const metadata: Metadata = pageMeta({
  title: "VisionOne",
  description: DESCRIPTION,
  path: "/visionone",
});

const DISCONNECT = [
  {
    icon: MousePointerClick,
    title: "Google Ads knows clicks",
    body: "It can tell you what you spent and who clicked. It has no idea which of those people ever walked in.",
  },
  {
    icon: PhoneCall,
    title: "Your phone knows calls",
    body: "Calls come in, some get answered, some do not. Nothing records which campaign made the phone ring.",
  },
  {
    icon: CalendarCheck,
    title: "Your booking system knows patients",
    body: "It has every appointment and every membership. It has no idea what you paid to get any of them.",
  },
];

const MODULES = [
  {
    icon: UserPlus,
    title: "Lead capture",
    body: "A guided form that qualifies and scores every enquiry, and puts the hot ones on your phone within seconds.",
  },
  {
    icon: Bot,
    title: "AI receptionist",
    body: "Answers the calls your front desk misses and books them straight into your scheduling system.",
  },
  {
    icon: Megaphone,
    title: "Ads and local search",
    body: "Campaigns and your Google Business Profile, managed weekly against what they actually book.",
  },
  {
    icon: Star,
    title: "Reviews",
    body: "Requests after every visit, replies on every review, and none of it gated.",
  },
  {
    icon: FileText,
    title: "Content",
    body: "Articles and social that answer what people search before they book — signed off before they publish.",
  },
];

const SHOWS = [
  {
    icon: MousePointerClick,
    title: "Leads by channel",
    body: "Every enquiry sorted by where it came from — ads, your Business Profile, search, social, referral.",
  },
  {
    icon: PhoneCall,
    title: "Calls answered and missed",
    body: "How many came in, how many were answered, how many happened after you closed.",
  },
  {
    icon: CalendarCheck,
    title: "Appointments booked",
    body: "Which leads turned into a booking, and how long they took to get there.",
  },
  {
    icon: Wallet,
    title: "Revenue attributed",
    body: "What each channel earned, based on the visits it produced and the values you set.",
  },
  {
    icon: Star,
    title: "Reviews",
    body: "New reviews, your running average, and which ones are still waiting on a reply.",
  },
  {
    icon: FileText,
    title: "Published content",
    body: "What went live, what is scheduled, and what is still waiting on physician sign-off.",
  },
];

export default function VisionOnePage() {
  return (
    <>
      <Script
        id="visionone-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd("VisionOne", DESCRIPTION, "/visionone"),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "VisionOne", path: "/visionone" },
            ]),
          ]),
        }}
      />

      <PageHeader
        eyebrow="VisionOne"
        title={
          <>
            Run the growth.{" "}
            <span className="text-gradient">See the return.</span>
          </>
        }
        description="VisionOne is one system for everything that fills your diary — lead capture, an AI receptionist, ads, reviews and content — and one screen that shows what each of them earned."
      >
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/contact">
              Book a walkthrough
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#dashboard">See the dashboard</Link>
          </Button>
        </div>

        {/*
          Existing clients sign in on the portal's own subdomain, never here. No email or password
          field belongs on this page: this site loads HubSpot, and a credential form sharing that
          origin would put the session within reach of it and of every tag added later.
        */}
        <p className="mt-5 text-center text-sm text-fg-muted">
          Already a client?{" "}
          <a
            href={siteConfig.portalUrl}
            className="font-medium text-fg underline underline-offset-4 hover:opacity-80"
          >
            Log in to VisionOne
          </a>
        </p>
      </PageHeader>

      {/* the problem */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div>
            <SectionHeading
              align="left"
              eyebrow="The problem"
              title={
                <>
                  Your marketing and your patients live in{" "}
                  <span className="text-gradient">different systems</span>
                </>
              }
              description="Your ads run in Google Ads. Your patients live in your booking system. Nothing joins the two together."
            />
            <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-fg-muted">
              <p>
                So at the end of the month you know what you spent, and you know
                how many people booked. What you cannot see is which spend
                produced which booking.
              </p>
              <p>
                That gap is expensive. When one member is worth thousands of
                dollars a year, deciding where the next dollar goes on a hunch is
                the costliest guess in the business — and most owners end up
                spending more on the channel that is easiest to measure rather
                than the one that actually works.
              </p>
              <p className="text-fg">
                VisionOne closes that gap. Everything else it does is in service
                of that one thing.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {DISCONNECT.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-border bg-panel/50 p-5"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary-2 ring-1 ring-border-strong">
                  <Icon className="size-6" />
                </span>
                <div>
                  <h3 className="font-display font-semibold text-fg">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* the dashboard */}
      <Section id="dashboard" className="scroll-mt-24 bg-bg-2/30">
        <SectionHeading
          eyebrow="The dashboard"
          title={
            <>
              One screen for the{" "}
              <span className="text-gradient">whole funnel</span>
            </>
          }
          description="Spend on one side, patients on the other, and the line between them drawn in. Here is the layout, filled with invented numbers."
        />
        <div className="mt-14">
          <DashboardDemo />
        </div>
      </Section>

      {/* the modules */}
      <Section>
        <SectionHeading
          eyebrow="What runs underneath"
          title={
            <>
              Five modules,{" "}
              <span className="text-gradient">one system</span>
            </>
          }
          description="These are not five tools you buy separately and wire together. They ship as one product, and they all report into the same screen — which is the only reason the attribution works at all."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex h-full flex-col rounded-2xl border border-border bg-panel/50 p-6"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary-2 ring-1 ring-border-strong">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-fg">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {body}
              </p>
            </div>
          ))}

          <div className="gradient-border h-full">
            <div className="flex h-full flex-col justify-center p-6">
              <h3 className="font-display text-lg font-semibold text-fg">
                And the screen that joins them
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                Five modules running separately give you five dashboards and no
                answer. Running as one system, they give you a number you can
                spend against.
              </p>
              <Link
                href="/services#growth"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary-2 underline-offset-4 hover:underline"
              >
                How the modules are run
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* what it shows */}
      <Section className="bg-bg-2/30">
        <SectionHeading
          eyebrow="What you see"
          title={
            <>
              Six things, and{" "}
              <span className="text-gradient">nothing you have to dig for</span>
            </>
          }
          description="No report to request, no analyst to book, no export to reconcile. It is the first screen, every morning."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SHOWS.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex h-full flex-col rounded-2xl border border-border bg-panel/50 p-6"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary-2 ring-1 ring-border-strong">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-fg">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* freshness */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            align="left"
            eyebrow="Freshness"
            title={
              <>
                Old numbers are{" "}
                <span className="text-gradient">marked old</span>
              </>
            }
            description="Every number on the screen carries the time it was last checked."
          />
          <div className="space-y-4 text-base leading-relaxed text-fg-muted">
            <p>
              <span className="font-medium text-fg">Live</span> means minutes ago.{" "}
              <span className="font-medium text-fg">Recent</span> means hours ago.{" "}
              <span className="font-medium text-fg">Stale</span> means a
              connection stopped reporting and the number under it is not
              current — so the dashboard says so, instead of quietly showing you
              last week&apos;s figure with today&apos;s date on it.
            </p>
            <p>
              We treat this as a feature, not a caveat. A dashboard is only worth
              having if you can make a spending decision on it at seven in the
              morning without ringing anyone to check. That only works if it is
              honest about what it does not currently know.
            </p>
          </div>
        </div>
      </Section>

      {/* onboarding → growth */}
      <Journey />

      {/* how it fits */}
      <Section className="bg-bg-2/30">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            align="left"
            eyebrow="Fitting in"
            title={
              <>
                It runs beside what you{" "}
                <span className="text-gradient">already have</span>
              </>
            }
          />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-fg-muted">
            <p>
              VisionOne does not replace your booking system, your phone or your
              ad account, and it is not something your front desk has to learn
              and log into every day. It sits alongside them, does the work, and
              reports back in one place.
            </p>
            <p>
              We built it first for cash-pay clinics, where a single member is
              worth thousands a year and guessing costs the most. It runs the
              same way for any business that lives on booked appointments.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/contact">
                Book a walkthrough
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/security">How we handle patient data</Link>
            </Button>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
