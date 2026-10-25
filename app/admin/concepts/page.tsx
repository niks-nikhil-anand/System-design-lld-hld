import type { Metadata } from "next";
import { AdminCollection } from "@/components/admin/AdminCollection";
export const metadata: Metadata = { title: "Concepts" };
export default function Page() {
  return <AdminCollection section="concepts" />;
}
