"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Inbox,
  CalendarCheck,
  MessageSquare,
  Briefcase,
  FolderKanban,
  Quote,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/lib/admin/auth-context";
import { useAdminApi } from "@/lib/admin/use-admin-api";
import { apiGet } from "@/lib/api";
import { AdminHeader, StatCard, Panel, Spinner } from "@/components/admin/ui";

interface Counts {
  contacts: number;
  consultations: number;
  chatLeads: number;
  services: number;
  caseStudies: number;
  testimonials: number;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const api = useAdminApi();
  const [counts, setCounts] = useState<Counts | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [contacts, consultations, chatLeads, services, caseStudies, testimonials] =
          await Promise.all([
            api.get<unknown[]>("/admin/contacts"),
            api.get<unknown[]>("/admin/consultations"),
            api.get<unknown[]>("/admin/chat-leads"),
            apiGet<unknown[]>("/services"),
            apiGet<unknown[]>("/casestudies"),
            apiGet<unknown[]>("/testimonials"),
          ]);
        if (active)
          setCounts({
            contacts: contacts.length,
            consultations: consultations.length,
            chatLeads: chatLeads.length,
            services: services.length,
            caseStudies: caseStudies.length,
            testimonials: testimonials.length,
          });
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [api]);

  return (
    <>
      <AdminHeader
        title={`Welcome back, ${user?.name?.split(" ")[0] ?? "Admin"}`}
        description="Overview of leads and content across the site."
      />

      {loading || !counts ? (
        <Spinner />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard label="Contact submissions" value={counts.contacts} icon={<Inbox className="size-5" />} />
            <StatCard label="Consultations booked" value={counts.consultations} icon={<CalendarCheck className="size-5" />} />
            <StatCard label="Chat leads" value={counts.chatLeads} icon={<MessageSquare className="size-5" />} />
            <StatCard label="Services" value={counts.services} icon={<Briefcase className="size-5" />} />
            <StatCard label="Case studies" value={counts.caseStudies} icon={<FolderKanban className="size-5" />} />
            <StatCard label="Testimonials" value={counts.testimonials} icon={<Quote className="size-5" />} />
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: "/admin/leads", label: "Review leads", desc: "Contacts, consultations & chat" },
              { href: "/admin/services", label: "Manage services", desc: "Edit your service offerings" },
              { href: "/admin/casestudies", label: "Manage case studies", desc: "Portfolio & results" },
              { href: "/admin/testimonials", label: "Manage testimonials", desc: "Client quotes" },
            ].map((q) => (
              <Link
                key={q.href}
                href={q.href}
                className="group flex items-center justify-between rounded-2xl border border-border bg-panel/40 p-5 transition-colors hover:border-primary/40"
              >
                <div>
                  <p className="font-display font-semibold">{q.label}</p>
                  <p className="text-sm text-fg-subtle">{q.desc}</p>
                </div>
                <ArrowRight className="size-5 text-fg-subtle transition-transform group-hover:translate-x-1 group-hover:text-primary-2" />
              </Link>
            ))}
          </div>

          <Panel title="Tips" className="mt-8">
            <div className="px-5 py-4 text-sm text-fg-muted">
              Edits to services, case studies and testimonials are saved to the
              database and reflected via the API immediately (server cache is
              evicted on save).
            </div>
          </Panel>
        </>
      )}
    </>
  );
}
