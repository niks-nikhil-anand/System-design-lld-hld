import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminStore } from "@/components/admin/AdminStore";
import { getAdminRecords } from "@/lib/admin/data";
export const metadata: Metadata = {
  title: { default: "Admin — Systemly", template: "%s — Systemly Admin" },
  robots: { index: false, follow: false },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminStore records={getAdminRecords()}>
      <AdminShell>{children}</AdminShell>
    </AdminStore>
  );
}
