import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COMPANIES } from "@/data/companies";
import { CatalogDetailPage, catalogItemMetadata } from "@/components/routes/CatalogDetailPage";

export function generateStaticParams() {
  return COMPANIES.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = COMPANIES.find((entry) => entry.slug === slug);
  return item ? catalogItemMetadata(item) : { title: "Company architecture not found" };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = COMPANIES.find((entry) => entry.slug === slug);
  if (!item) notFound();
  return <CatalogDetailPage item={item} />;
}

