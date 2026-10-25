import { Suspense } from "react";
import Loading from "@/app/admin/loading";
import { notFound } from "next/navigation";
import { AdminEditor } from "@/components/admin/AdminEditor";
import { SECTION_CONFIG, isAdminSection } from "@/lib/admin/config";
import { getAdminRecords } from "@/lib/admin/data";
type Props = { params: Promise<{ section: string; slug: string }> };
export function generateStaticParams() {
  return getAdminRecords().map(({ section, slug }) => ({ section, slug }));
}
export async function generateMetadata({ params }: Props) {
  const { section } = await params;
  return {
    title: isAdminSection(section)
      ? `Edit ${SECTION_CONFIG[section].singular}`
      : "Not found",
  };
}
async function EditorRoute({ params }: Props) {
  const { section, slug } = await params;
  if (!isAdminSection(section)) notFound();
  return <AdminEditor section={section} slug={slug} />;
}

export default function Page(props: Props) {
  return (
    <Suspense fallback={<Loading />}>
      <EditorRoute {...props} />
    </Suspense>
  );
}
