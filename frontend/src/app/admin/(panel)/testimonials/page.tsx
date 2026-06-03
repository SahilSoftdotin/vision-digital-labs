"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Star } from "lucide-react";
import { apiGet } from "@/lib/api";
import { useAdminApi } from "@/lib/admin/use-admin-api";
import {
  AdminHeader,
  Panel,
  Spinner,
  EmptyState,
  ErrorState,
} from "@/components/admin/ui";
import { AddButton, RowActions, FormModal } from "@/components/admin/crud-bits";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";

interface Testimonial {
  id: number; name: string; role: string; company: string; quote: string; rating: number;
}
type Draft = Omit<Testimonial, "id"> & { id: number | null };

const empty: Draft = { id: null, name: "", role: "", company: "", quote: "", rating: 5 };

export default function TestimonialsAdmin() {
  const api = useAdminApi();
  const [items, setItems] = useState<Testimonial[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      setItems(await apiGet<Testimonial[]>("/testimonials"));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function save() {
    if (!draft) return;
    setSaving(true);
    setError(null);
    try {
      const body = { id: draft.id, name: draft.name, role: draft.role, company: draft.company, quote: draft.quote, rating: Number(draft.rating) };
      if (draft.id == null) await api.post("/admin/testimonials", body);
      else await api.put(`/admin/testimonials/${draft.id}`, body);
      setDraft(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: number) {
    try {
      await api.del(`/admin/testimonials/${id}`);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  }

  return (
    <>
      <AdminHeader
        title="Testimonials"
        description="Client quotes shown on the site."
        action={<AddButton onClick={() => setDraft({ ...empty })} />}
      />
      {error && <div className="mb-4"><ErrorState message={error} /></div>}

      <Panel>
        {!items ? <Spinner /> : items.length === 0 ? (
          <EmptyState message="No testimonials yet." />
        ) : (
          <ul className="divide-y divide-border">
            {items.map((t) => (
              <li key={t.id} className="flex items-start justify-between gap-4 px-5 py-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-fg">{t.name}</p>
                    <span className="flex">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="size-3 fill-accent text-accent" />
                      ))}
                    </span>
                  </div>
                  <p className="text-xs text-fg-subtle">{t.role}, {t.company}</p>
                  <p className="mt-1 max-w-2xl text-sm text-fg-muted">“{t.quote}”</p>
                </div>
                <RowActions
                  onEdit={() => setDraft({ ...t })}
                  onDelete={() => remove(t.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <FormModal
        open={draft !== null}
        onOpenChange={(v) => !v && setDraft(null)}
        title={draft?.id == null ? "New testimonial" : "Edit testimonial"}
      >
        {draft && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name"><Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></Field>
              <Field label="Role"><Input value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} /></Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Company"><Input value={draft.company} onChange={(e) => setDraft({ ...draft, company: e.target.value })} /></Field>
              <Field label="Rating (1–5)"><Input type="number" min={1} max={5} value={draft.rating} onChange={(e) => setDraft({ ...draft, rating: Number(e.target.value) })} /></Field>
            </div>
            <Field label="Quote"><Textarea value={draft.quote} onChange={(e) => setDraft({ ...draft, quote: e.target.value })} /></Field>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setDraft(null)}>Cancel</Button>
              <Button onClick={save} disabled={saving}>
                {saving && <Loader2 className="size-4 animate-spin" />}
                Save
              </Button>
            </div>
          </div>
        )}
      </FormModal>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}
