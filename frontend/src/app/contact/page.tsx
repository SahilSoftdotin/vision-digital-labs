import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description:
    "Start a project with Vision Digital Labs. Tell us about your goals and we'll map the fastest path to results — typically replying within one business day.",
  path: "/contact",
});

const INFO = [
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/[^+\d]/g, "")}` },
  { icon: MapPin, label: "Where", value: siteConfig.location },
  { icon: Clock, label: "Response time", value: "Within 1 business day" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s build something{" "}
            <span className="text-gradient">remarkable</span>
          </>
        }
        description="Share a few details and a strategist will get back to you with next steps."
      />

      <Section className="pt-4">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            {INFO.map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="flex items-center gap-4 rounded-2xl border border-border bg-panel/40 p-5"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary-2 ring-1 ring-border-strong">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-fg-subtle">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="font-medium text-fg transition-colors hover:text-primary-2"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="font-medium text-fg">{value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-border-strong bg-gradient-to-br from-primary/10 to-secondary/10 p-6">
              <p className="font-display text-lg font-semibold">
                Prefer to talk live?
              </p>
              <p className="mt-1 text-sm text-fg-muted">
                Use the “Book Free Consultation” button in the corner to grab a
                30-minute slot — no commitment.
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </Section>
    </>
  );
}
