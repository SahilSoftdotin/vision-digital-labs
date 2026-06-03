"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Star } from "lucide-react";
import { apiGet } from "@/lib/api";
import { useAdminApi } from "@/lib/admin/use-admin-api";
import {
  arrayToLines, linesToArray, resultsToLines, linesToResults,
} from "@/lib/admin/forms";
import {
  AdminHeader, Panel, Spinner, EmptyState, ErrorState,
} from "@/components/admin/ui";
import { AddButton, RowActions, FormModal } from "@/components/admin/crud-bits";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label, Select } from "@/components/ui/input";

interface Result { label: string; value: string }
interface CaseStudy {
  id: number; slug: string; title: string; client: string; industry: string;
  summary: string; cover: string; challenge: string; solution: string;
  technologies: string[]; timeline: string; results: Result[]; tags: string[]; featured: boolean;
}
interface Draft {
  id: number | null; slug: string; title: string; client: string; industry: string;
  summary: string; cover: string; challenge: string; solution: string;
  technologies: string; timeline: string; results: string; tags: string; featured: boolean;
}

const INDUSTRIES = ["Healthcare", "Fintech", "Logistics", "E-Commerce", "Real Estate", "Education"];
const empty: Draft = {
  id: null, slug: "", title: "", client: "", industry: "Fintech", summary: "",
  cover: "from-violet-500/30 to-blue-500/20", challenge: "", solution: "",
  technologies: "", timeline: "", results: "", tags: "", featured: false,
};

export default function CaseStudiesAdmin() {
  const api = useAdminApi();
  const [items, setItems] = useState<CaseStudy[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try { setItems(await apiGet<CaseStudy[]>("/casestudies")); }
    catch (e) { setError(e instanceof Error ? e.message : "Failed to load"); }
  }, []);
  useEffect(() => { load(); }, [load]);

  function edit(c: CaseStudy) {
    setDraft({
      ...c,
      technologies: arrayToLines(c.technologies),
      tags: arrayToLines(c.tags),
      results: resultsToLines(c.results),
    });
  }

  async function save() {
    if (!draft) return;
    setSaving(true); setError(null);
    try {
      const body = {
        id: draft.id, slug: draft.slug, title: draft.title, client: draft.client,
        industry: draft.industry, summary: draft.summary, cover: draft.cover,
        challenge: draft.challenge, solution: draft.solution, timeline: draft.timeline,
        featured: draft.featured,
        technologies: linesToArray(draft.technologies),
        tags: linesToArray(draft.tags),
        results: linesToResults(draft.results),
      };
      if (draft.id == null) await api.post("/admin/casestudies", body);
      else await api.put(`/admin/casestudies/${draft.id}`, body);
      setDraft(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally { setSaving(false); }
  }

  async function remove(id: number) {
    try { await api.del(`/admin/casestudies/${id}`); await load(); }
    catch (e) { setError(e instanceof Error ? e.message : "Delete failed"); }
  }

  return (
    <>
      <AdminHeader
        title="Case Studies"
        description="Portfolio entries (lists one per line; results as 'label | value')."
        action={<AddButton onClick={() => setDraft({ ...empty })} />}
      />
      {error && <div className="mb-4"><ErrorState message={error} /></div>}

      <Panel>
        {!items ? <Spinner /> : items.length === 0 ? (
          <EmptyState message="No case studies yet." />
        ) : (
          <ul className="divide-y divide-border">
            {items.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className={`h-12 w-20 shrink-0 rounded-lg bg-gradient-to-br ${c.cover}`} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-medium text-fg">{c.title}</p>
                    {c.featured && <Star className="size-3.5 shrink-0 fill-accent text-accent" />}
                  </div>
                  <p className="text-xs text-fg-subtle">{c.client} · {c.industry} · /{c.slug}</p>
                </div>
                <RowActions onEdit={() => edit(c)} onDelete={() => remove(c.id)} />
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <FormModal open={draft !== null} onOpenChange={(v) => !v && setDraft(null)} title={draft?.id == null ? "New case study" : "Edit case study"}>
        {draft && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <F label="Title"><Input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} /></F>
              <F label="Slug"><Input value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value })} /></F>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <F label="Client"><Input value={draft.client} onChange={(e) => setDraft({ ...draft, client: e.target.value })} /></F>
              <F label="Industry">
                <Select value={draft.industry} onChange={(e) => setDraft({ ...draft, industry: e.target.value })}>
                  {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                </Select>
              </F>
            </div>
            <F label="Summary"><Textarea className="min-h-16" value={draft.summary} onChange={(e) => setDraft({ ...draft, summary: e.target.value })} /></F>
            <div className="grid gap-4 sm:grid-cols-2">
              <F label="Cover (tailwind gradient)"><Input value={draft.cover} onChange={(e) => setDraft({ ...draft, cover: e.target.value })} /></F>
              <F label="Timeline"><Input value={draft.timeline} onChange={(e) => setDraft({ ...draft, timeline: e.target.value })} /></F>
            </div>
            <F label="Challenge"><Textarea value={draft.challenge} onChange={(e) => setDraft({ ...draft, challenge: e.target.value })} /></F>
            <F label="Solution"><Textarea value={draft.solution} onChange={(e) => setDraft({ ...draft, solution: e.target.value })} /></F>
            <div className="grid gap-4 sm:grid-cols-2">
              <F label="Technologies (one per line)"><Textarea className="min-h-24" value={draft.technologies} onChange={(e) => setDraft({ ...draft, technologies: e.target.value })} /></F>
              <F label="Tags (one per line)"><Textarea className="min-h-24" value={draft.tags} onChange={(e) => setDraft({ ...draft, tags: e.target.value })} /></F>
            </div>
            <F label="Results (one 'label | value' per line)"><Textarea className="min-h-24" value={draft.results} onChange={(e) => setDraft({ ...draft, results: e.target.value })} /></F>
            <label className="flex items-center gap-2 text-sm text-fg-muted">
              <input type="checkbox" checked={draft.featured} onChange={(e) => setDraft({ ...draft, featured: e.target.checked })} className="size-4 accent-[var(--primary)]" />
              Featured on homepage
            </label>
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
