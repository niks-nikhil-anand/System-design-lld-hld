import type { Metadata } from "next";
import { PreviewCenter } from "@/components/admin/StudioPages";

export const metadata: Metadata = { title: "Preview center" };

export default function Page() {
  return <PreviewCenter />;
}
