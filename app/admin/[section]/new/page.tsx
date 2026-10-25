import { Suspense } from "react";
import Loading from "@/app/admin/loading";
import { notFound } from "next/navigation";
import { AdminEditor } from "@/components/admin/AdminEditor";
import {
  ADMIN_SECTIONS,
  SECTION_CONFIG,
  isAdminSection,
} from "@/lib/admin/config";
type Props = { params: Promise<{ section: string }> };
export function generateStaticParams() {
  return ADMIN_SECTIONS.map((section) => ({ section }));
}
export async function generateMetadata({ params }: Props) {
  const { section } = await params;
  return {
    title: isAdminSection(section)
      ? `Create ${SECTION_CONFIG[section].singular}`
      : "Not found",
  };
}
async function EditorRoute({ params }: Props) {
  const { section } = await params;
  if (!isAdminSection(section)) notFound();
  return <AdminEditor section={section} />;
}

export default function Page(props: Props) {
  return (
    <Suspense fallback={<Loading />}>
      <EditorRoute {...props} />
    </Suspense>
  );
}
