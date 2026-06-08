import Link from "next/link";
import Script from "next/script";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import { Logo } from "./logo";
import { FacebookIcon, InstagramIcon } from "./social-icons";

const columns = [
  {
    title: "Services",
    links: [
      { label: "Website Redesign", href: "/services/website-redesign" },
      { label: "Custom Web Apps", href: "/services/custom-web-applications" },
      { label: "AI Solutions", href: "/services/ai-solutions" },
      { label: "Mobile Apps", href: "/services/mobile-apps" },
      { label: "Cloud & DevOps", href: "/services/cloud-devops" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Case Studies", href: "/casestudies" },
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-10 border-t border-border bg-bg-2/40">
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">
              {siteConfig.description}
            </p>
            <div className="mt-5 flex gap-2">
              {[
                { icon: FacebookIcon, label: "Facebook" },
                { icon: InstagramIcon, label: "Instagram" },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  role="img"
                  aria-label={`${label} — coming soon`}
                  title="Coming soon"
                  className="group relative grid size-9 cursor-default place-items-center rounded-full border border-border-strong text-fg-muted"
                >
                  <Icon className="size-4" />
                  <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border-strong bg-bg-2 px-2 py-1 text-[11px] text-fg-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    Coming soon
                  </span>
                </span>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold text-fg">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-fg-muted transition-colors hover:text-primary-2"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-display text-sm font-semibold text-fg">
              Get in touch
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-fg-muted">
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 text-primary-2" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-fg">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 text-primary-2" />
                <a
                  href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                  className="hover:text-fg"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="size-4 text-primary-2" />
                {siteConfig.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-fg-subtle sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Designed &amp; engineered for ambitious teams.</p>
        </div>
      </div>

      {/* Sienna — website accessibility widget (floating toolbar: text size,
          contrast, links highlight, dyslexia font, etc.) */}
      <Script
        id="sienna-accessibility"
        src="https://cdn.jsdelivr.net/npm/sienna-accessibility/dist/sienna-accessibility.umd.js"
        strategy="afterInteractive"
      />
    </footer>
  );
}
