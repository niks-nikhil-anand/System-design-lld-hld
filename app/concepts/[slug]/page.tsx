import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CONCEPTS } from "@/data/concepts";
import { CatalogDetailPage, catalogItemMetadata } from "@/components/routes/CatalogDetailPage";

export function generateStaticParams() {
  return CONCEPTS.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = CONCEPTS.find((entry) => entry.slug === slug);
  return item ? catalogItemMetadata(item) : { title: "System design concept not found" };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = CONCEPTS.find((entry) => entry.slug === slug);
  if (!item) notFound();
  return <CatalogDetailPage item={item} />;
}

