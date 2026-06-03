"use client";

import { useEffect, useState } from "react";
import { useAdminApi } from "@/lib/admin/use-admin-api";
import {
  AdminHeader,
  Panel,
  Spinner,
  EmptyState,
  ErrorState,
} from "@/components/admin/ui";
import { cn } from "@/lib/utils";

interface Contact {
  id: number; name: string; email: string; company: string;
  phone: string; budget: string; service: string; details: string; createdAt: string;
}
interface Consultation {
  id: number; name: string; email: string; company?: string;
  date: string; time: string; notes?: string; source: string; createdAt: string;
}
interface ChatLead {
  id: number; name: string; email: string; interest?: string; createdAt: string;
}

type Tab = "contacts" | "consultations" | "chat-leads";

const TABS: { key: Tab; label: string }[] = [
  { key: "contacts", label: "Contacts" },
  { key: "consultations", label: "Consultations" },
  { key: "chat-leads", label: "Chat leads" },
];

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("en-US", {
      month: "short", day: "numeric", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function LeadsPage() {
  const api = useAdminApi();
  const [tab, setTab] = useState<Tab>("contacts");
  const [contacts, setContacts] = useState<Contact[] | null>(null);
  const [consultations, setConsultations] = useState<Consultation[] | null>(null);
  const [chatLeads, setChatLeads] = useState<ChatLead[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setError(null);
    (async () => {
      try {
        if (tab === "contacts" && !contacts) {
          const d = await api.get<Contact[]>("/admin/contacts");
          if (active) setContacts(d);
        } else if (tab === "consultations" && !consultations) {
          const d = await api.get<Consultation[]>("/admin/consultations");
          if (active) setConsultations(d);
        } else if (tab === "chat-leads" && !chatLeads) {
          const d = await api.get<ChatLead[]>("/admin/chat-leads");
          if (active) setChatLeads(d);
        }
      } catch (e) {
        if (active) setError(e instanceof Error ? e.message : "Failed to load");
      }
    })();
    return () => { active = false; };
  }, [tab, api, contacts, consultations, chatLeads]);

  return (
    <>
      <AdminHeader title="Leads" description="Inbound submissions from the site." />

      <div className="mb-5 flex gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              tab === t.key
                ? "border-primary bg-primary/15 text-fg"
                : "border-border-strong text-fg-muted hover:text-fg",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {error && <ErrorState message={error} />}

      {tab === "contacts" && (
        <Panel title="Contact submissions">
          {!contacts ? <Spinner /> : contacts.length === 0 ? (
            <EmptyState message="No contact submissions yet." />
          ) : (
            <Table
              head={["Name", "Email", "Company", "Budget", "Service", "When"]}
              rows={contacts.map((c) => [
                <Strong key="n">{c.name}</Strong>,
                c.email, c.company, c.budget, c.service, fmtDate(c.createdAt),
              ])}
              expand={contacts.map((c) => c.details)}
            />
          )}
        </Panel>
      )}

      {tab === "consultations" && (
        <Panel title="Consultation bookings">
          {!consultations ? <Spinner /> : consultations.length === 0 ? (
            <EmptyState message="No consultations booked yet." />
          ) : (
            <Table
              head={["Name", "Email", "Date", "Time", "Source", "When"]}
              rows={consultations.map((c) => [
                <Strong key="n">{c.name}</Strong>,
                c.email, c.date, c.time, c.source, fmtDate(c.createdAt),
              ])}
              expand={consultations.map((c) => c.notes || "")}
            />
          )}
        </Panel>
      )}

      {tab === "chat-leads" && (
        <Panel title="Chat-captured leads">
          {!chatLeads ? <Spinner /> : chatLeads.length === 0 ? (
            <EmptyState message="No chat leads yet." />
          ) : (
            <Table
              head={["Name", "Email", "Interest", "When"]}
              rows={chatLeads.map((c) => [
                <Strong key="n">{c.name}</Strong>,
                c.email, c.interest || "—", fmtDate(c.createdAt),
              ])}
            />
          )}
        </Panel>
      )}
    </>
  );
}

function Strong({ children }: { children: React.ReactNode }) {
  return <span className="font-medium text-fg">{children}</span>;
}

function Table({
  head,
  rows,
  expand,
}: {
  head: string[];
  rows: React.ReactNode[][];
  expand?: string[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs uppercase tracking-wider text-fg-subtle">
            {head.map((h) => (
              <th key={h} className="px-5 py-3 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border/60 align-top last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="px-5 py-3.5 text-fg-muted">
                  {cell}
                  {expand && j === row.length - 1 && expand[i] && (
                    <p className="mt-1 max-w-md text-xs text-fg-subtle">
                      {expand[i]}
                    </p>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
