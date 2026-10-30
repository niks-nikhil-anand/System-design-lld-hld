import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASES } from "@/data/cases";
import { CatalogDetailPage, catalogItemMetadata } from "@/components/routes/CatalogDetailPage";

export function generateStaticParams() {
  return CASES.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = CASES.find((entry) => entry.slug === slug);
  return item ? catalogItemMetadata(item) : { title: "System design case study not found" };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = CASES.find((entry) => entry.slug === slug);
  if (!item) notFound();
  return <CatalogDetailPage item={item} />;
}

