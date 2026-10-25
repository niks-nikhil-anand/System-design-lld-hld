"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Building2,
  Code2,
  ExternalLink,
  FileText,
  FlaskConical,
  FolderOpen,
  LayoutDashboard,
  LogIn,
  Route,
  Shapes,
} from "lucide-react";
import { SystemlyLogo } from "@/components/ui/SystemlyLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  ADMIN_SECTIONS,
  SECTION_CONFIG,
  isAdminSection,
} from "@/lib/admin/config";
import { useAdminStore } from "./AdminStore";

const icons = {
  concepts: Shapes,
  algorithms: Code2,
  "case-studies": FolderOpen,
  companies: Building2,
  "learning-paths": Route,
  blog: FileText,
  playground: FlaskConical,
};
function Navigation() {
  const pathname = usePathname();
  const { records } = useAdminStore();
  const { setOpenMobile } = useSidebar();
  return (
    <Sidebar collapsible="icon" className="border-r border-[var(--border)]">
      <SidebarHeader className="p-4">
        <Link
          href="/"
          aria-label="Systemly home"
          className="flex min-h-11 items-center overflow-hidden"
        >
          <span className="group-data-[collapsible=icon]:hidden">
            <SystemlyLogo />
          </span>
          <BookOpen className="hidden size-5 text-primary group-data-[collapsible=icon]:block" />
        </Link>
        <div className="admin-workspace-label group-data-[collapsible=icon]:hidden">
          <span className="workspace-dot" /> CONTENT WORKSPACE
        </div>
      </SidebarHeader>
      <SidebarContent>
        <nav aria-label="Admin navigation">
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/admin" />}
                  isActive={pathname === "/admin"}
                  aria-current={pathname === "/admin" ? "page" : undefined}
                  tooltip="Overview"
                  onClick={() => setOpenMobile(false)}
                >
                  <LayoutDashboard />
                  <span>Overview</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Learning library</SidebarGroupLabel>
            <SidebarMenu>
              {ADMIN_SECTIONS.map((section) => {
                const Icon = icons[section];
                const active = pathname.startsWith(`/admin/${section}`);
                return (
                  <SidebarMenuItem key={section}>
                    <SidebarMenuButton
                      render={<Link href={`/admin/${section}`} />}
                      isActive={active}
                      aria-current={active ? "page" : undefined}
                      tooltip={SECTION_CONFIG[section].title}
                      onClick={() => setOpenMobile(false)}
                    >
                      <Icon />
                      <span>{SECTION_CONFIG[section].title}</span>
                    </SidebarMenuButton>
                    <SidebarMenuBadge>
                      {
                        records.filter(
                          (r) =>
                            r.section === section && r.status !== "Archived",
                        ).length
                      }
                    </SidebarMenuBadge>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </nav>
      </SidebarContent>
      <SidebarFooter className="p-3">
        <div className="admin-local-note group-data-[collapsible=icon]:hidden">
          <strong>Local workspace</strong>
          <p>Drafts stay in this browser. Your live website stays unchanged.</p>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/login" />}
              tooltip="Back to login"
            >
              <LogIn />
              <span>Back to login</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
function Frame({ children }: { children: React.ReactNode }) {
  const path = usePathname().split("/").filter(Boolean);
  const section = path[1];
  const title =
    section && isAdminSection(section)
      ? SECTION_CONFIG[section].title
      : "Overview";
  const action = path.includes("new")
    ? "Create"
    : path.includes("edit")
      ? "Edit"
      : null;
  return (
    <>
      <Navigation />
      <SidebarInset className="min-w-0 bg-[var(--bg)]">
        <header className="cms-topbar">
          <div className="flex min-w-0 items-center gap-3">
            <SidebarTrigger className="size-11 shrink-0" />
            <span className="h-5 border-l border-[var(--border)]" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden sm:block">
                  <BreadcrumbLink render={<Link href="/admin" />}>
                    Workspace
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden sm:block" />
                <BreadcrumbItem>
                  {action ? (
                    <BreadcrumbLink
                      render={<Link href={`/admin/${section}`} />}
                    >
                      {title}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{title}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {action && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{action}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Button
              variant="outline"
              render={<Link href="/" />}
              nativeButton={false}
              className="hidden min-h-11 sm:inline-flex"
            >
              View website <ExternalLink />
            </Button>
            <ThemeToggle />
          </div>
        </header>
        <div id="main-content" tabIndex={-1} className="cms-main">
          {children}
          <footer className="cms-footer">
            <span>Systemly administration</span>
            <span>Built for a better learning experience.</span>
          </footer>
        </div>
      </SidebarInset>
    </>
  );
}
export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="cms-app">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <TooltipProvider>
        <SidebarProvider>
          <Frame>{children}</Frame>
        </SidebarProvider>
      </TooltipProvider>
    </div>
  );
}
