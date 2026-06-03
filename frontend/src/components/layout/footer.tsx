import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import { Logo } from "./logo";
import { XIcon, LinkedInIcon, GitHubIcon } from "./social-icons";

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
                { icon: XIcon, href: siteConfig.socials.twitter, label: "X" },
                { icon: LinkedInIcon, href: siteConfig.socials.linkedin, label: "LinkedIn" },
                { icon: GitHubIcon, href: siteConfig.socials.github, label: "GitHub" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-full border border-border-strong text-fg-muted transition-colors hover:border-primary/50 hover:text-fg"
                >
                  <Icon className="size-4" />
                </a>
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
    </footer>
  );
}
