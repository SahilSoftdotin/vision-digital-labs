import { RequireAuth } from "@/components/admin/require-auth";
import { AdminShell } from "@/components/admin/admin-shell";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth>
      <AdminShell>{children}</AdminShell>
    </RequireAuth>
  );
}
