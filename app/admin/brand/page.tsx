import type { Metadata } from "next";
import { BrandStudio } from "@/components/admin/StudioPages";

export const metadata: Metadata = { title: "Brand studio" };

export default function Page() {
  return <BrandStudio />;
}
