import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALGORITHMS } from "@/data/algorithms";
import { CatalogDetailPage, catalogItemMetadata } from "@/components/routes/CatalogDetailPage";

export function generateStaticParams() {
  return ALGORITHMS.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = ALGORITHMS.find((entry) => entry.slug === slug);
  return item ? catalogItemMetadata(item) : { title: "System design algorithm not found" };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = ALGORITHMS.find((entry) => entry.slug === slug);
  if (!item) notFound();
  return <CatalogDetailPage item={item} />;
}

