import type { Metadata } from "next";
import { AdminCollection } from "@/components/admin/AdminCollection";
export const metadata: Metadata = { title: "Playground" };
export default function Page() {
  return <AdminCollection section="playground" />;
}
