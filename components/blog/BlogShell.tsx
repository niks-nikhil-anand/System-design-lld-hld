import { SiteShell } from "@/components/layout/SiteShell";

export function BlogShell({ children }: { children: React.ReactNode }) {
  return <SiteShell currentView="blog">{children}</SiteShell>;
}
