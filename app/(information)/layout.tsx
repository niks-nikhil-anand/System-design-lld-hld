import { SiteShell } from "@/components/layout/SiteShell";

export default function InformationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteShell currentView="about">{children}</SiteShell>;
}
