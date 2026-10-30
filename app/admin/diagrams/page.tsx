import type { Metadata } from "next";
import { DiagramStudio } from "@/components/admin/StudioPages";

export const metadata: Metadata = { title: "Diagram studio" };

export default function Page() {
  return <DiagramStudio />;
}
