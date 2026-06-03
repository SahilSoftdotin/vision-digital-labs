"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/** "Add new" button. */
export function AddButton({ onClick }: { onClick: () => void }) {
  return (
    <Button size="sm" onClick={onClick}>
      <Plus className="size-4" />
      Add new
    </Button>
  );
}

/** Row action buttons (edit + delete with inline confirm). */
export function RowActions({
  onEdit,
  onDelete,
  canDelete = true,
}: {
  onEdit: () => void;
  onDelete: () => void;
  canDelete?: boolean;
}) {
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);

  return (
    <div className="flex items-center justify-end gap-1.5">
      <button
        onClick={onEdit}
        className="grid size-8 place-items-center rounded-lg border border-border-strong text-fg-muted transition-colors hover:text-fg"
        aria-label="Edit"
      >
        <Pencil className="size-3.5" />
      </button>
      {canDelete &&
        (confirming ? (
          <span className="flex items-center gap-1">
            <button
              onClick={async () => {
                setBusy(true);
                try {
                  await onDelete();
                } finally {
                  setBusy(false);
                  setConfirming(false);
                }
              }}
              className="rounded-lg border border-red-500/40 bg-red-500/10 px-2 py-1 text-xs text-red-300"
            >
              {busy ? <Loader2 className="size-3 animate-spin" /> : "Delete"}
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="rounded-lg border border-border-strong px-2 py-1 text-xs text-fg-muted"
            >
              Cancel
            </button>
          </span>
        ) : (
          <button
            onClick={() => setConfirming(true)}
            className="grid size-8 place-items-center rounded-lg border border-border-strong text-fg-muted transition-colors hover:border-red-500/40 hover:text-red-300"
            aria-label="Delete"
          >
            <Trash2 className="size-3.5" />
          </button>
        ))}
    </div>
  );
}

/** Modal wrapper for create/edit forms. */
export function FormModal({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export { DialogClose };
