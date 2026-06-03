"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { apiGet } from "@/lib/api";
import { useAdminApi } from "@/lib/admin/use-admin-api";
import { arrayToLines, linesToArray } from "@/lib/admin/forms";
import {
  AdminHeader, Panel, Spinner, EmptyState, ErrorState,
} from "@/components/admin/ui";
import { AddButton, RowActions, FormModal } from "@/components/admin/crud-bits";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";
import { DynamicIcon } from "@/components/ui/dynamic-icon";

interface Service {
  id: number; slug: string; title: string; icon: string; tagline: string;
  description: string; features: string[]; deliverables: string[]; relatedCaseStudies: string[];
}
interface Draft {
  id: number | null; slug: string; title: string; icon: string; tagline: string;
  description: string; features: string; deliverables: string; relatedCaseStudies: string;
}
const empty: Draft = {
  id: null, slug: "", title: "", icon: "Sparkles", tagline: "", description: "",
  features: "", deliverables: "", relatedCaseStudies: "",
};

export default function ServicesAdmin() {
  const api = useAdminApi();
  const [items, setItems] = useState<Service[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try { setItems(await apiGet<Service[]>("/services")); }
    catch (e) { setError(e instanceof Error ? e.message : "Failed to load"); }
  }, []);
  useEffect(() => { load(); }, [load]);

  function edit(s: Service) {
    setDraft({
      ...s,
      features: arrayToLines(s.features),
      deliverables: arrayToLines(s.deliverables),
      relatedCaseStudies: arrayToLines(s.relatedCaseStudies),
    });
  }

  async function save() {
    if (!draft) return;
    setSaving(true); setError(null);
    try {
      const body = {
        id: draft.id, slug: draft.slug, title: draft.title, icon: draft.icon,
        tagline: draft.tagline, description: draft.description,
        features: linesToArray(draft.features),
        deliverables: linesToArray(draft.deliverables),
        relatedCaseStudies: linesToArray(draft.relatedCaseStudies),
      };
      if (draft.id == null) await api.post("/admin/services", body);
      else await api.put(`/admin/services/${draft.id}`, body);
      setDraft(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally { setSaving(false); }
  }

  async function remove(id: number) {
    try { await api.del(`/admin/services/${id}`); await load(); }
    catch (e) { setError(e instanceof Error ? e.message : "Delete failed"); }
  }

  return (
    <>
      <AdminHeader
        title="Services"
        description="Your service offerings (lists are one item per line)."
        action={<AddButton onClick={() => setDraft({ ...empty })} />}
      />
      {error && <div className="mb-4"><ErrorState message={error} /></div>}

      <Panel>
        {!items ? <Spinner /> : items.length === 0 ? (
          <EmptyState message="No services yet." />
        ) : (
          <ul className="divide-y divide-border">
            {items.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary-2 ring-1 ring-border-strong">
                    <DynamicIcon name={s.icon} className="size-5" />
                  </span>
                  <div>
                    <p className="font-medium text-fg">{s.title}</p>
                    <p className="text-xs text-fg-subtle">/{s.slug}</p>
                  </div>
                </div>
                <RowActions onEdit={() => edit(s)} onDelete={() => remove(s.id)} />
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <FormModal open={draft !== null} onOpenChange={(v) => !v && setDraft(null)} title={draft?.id == null ? "New service" : "Edit service"}>
        {draft && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <F label="Title"><Input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} /></F>
              <F label="Slug"><Input value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value })} /></F>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <F label="Icon (lucide name)"><Input value={draft.icon} onChange={(e) => setDraft({ ...draft, icon: e.target.value })} /></F>
              <F label="Tagline"><Input value={draft.tagline} onChange={(e) => setDraft({ ...draft, tagline: e.target.value })} /></F>
            </div>
            <F label="Description"><Textarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} /></F>
            <div className="grid gap-4 sm:grid-cols-2">
              <F label="Features (one per line)"><Textarea className="min-h-24" value={draft.features} onChange={(e) => setDraft({ ...draft, features: e.target.value })} /></F>
              <F label="Deliverables (one per line)"><Textarea className="min-h-24" value={draft.deliverables} onChange={(e) => setDraft({ ...draft, deliverables: e.target.value })} /></F>
            </div>
            <F label="Related case study slugs (one per line)"><Textarea className="min-h-20" value={draft.relatedCaseStudies} onChange={(e) => setDraft({ ...draft, relatedCaseStudies: e.target.value })} /></F>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setDraft(null)}>Cancel</Button>
              <Button onClick={save} disabled={saving}>{saving && <Loader2 className="size-4 animate-spin" />}Save</Button>
            </div>
          </div>
        )}
      </FormModal>
    </>
  );
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><Label>{label}</Label>{children}</div>;
}
