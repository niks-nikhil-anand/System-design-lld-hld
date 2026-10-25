import type { Metadata } from "next";
import { AdminCollection } from "@/components/admin/AdminCollection";
export const metadata: Metadata = { title: "Algorithms" };
export default function Page() {
  return <AdminCollection section="algorithms" />;
}
