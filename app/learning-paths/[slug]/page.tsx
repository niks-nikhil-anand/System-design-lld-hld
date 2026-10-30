import type { Metadata } from "next";
import { PathsRoute } from "@/components/routes/PathsRoute";
import { PATHS } from "@/data/paths";
import { pageMetadata } from "@/lib/seo-metadata";
export function generateStaticParams() { return PATHS.map((path) => ({ slug: path.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const path = PATHS.find((item) => item.slug === slug);
  return path ? pageMetadata({ title: path.title, description: path.blurb, path: `/learning-paths/${path.slug}` }) : { title: "Learning path not found" };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PathsRoute slug={slug} />;
}
