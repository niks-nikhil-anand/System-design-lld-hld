import type { Metadata } from "next";
import { ContentCreateHub } from "@/components/admin/StudioPages";

export const metadata: Metadata = { title: "Create content" };

export default function Page() {
  return <ContentCreateHub />;
}
