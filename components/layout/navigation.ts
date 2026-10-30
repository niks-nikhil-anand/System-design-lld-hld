import type { ViewType } from "@/types/systemly";

export const NAVIGATION: { label: string; view: ViewType; slug?: string }[] = [
  { label: "Explore", view: "explore" },
  { label: "Learning paths", view: "paths" },
  { label: "Playground", view: "playground" },
];

export function homeHref(view: ViewType, slug?: string | null) {
  if (view === "home") return "/";
  if (view === "explore") {
    const directories: Record<string, string> = {
      concept: "concepts",
      algorithm: "algorithms",
      company: "companies",
      case: "case-studies",
    };
    return directories[slug || ""] || "/explore";
  }
  if (view === "paths" || view === "path")
    return `/learning-paths${slug ? `/${slug}` : ""}`;
  if (view === "bookmarks") return "/bookmarks";
  if (view === "playground") return "/playground";
  if (view === "about") return "/about";
  return "/";
}

export function isNavigationActive(
  currentView: ViewType | "blog",
  currentSlug: string | null | undefined,
  view: ViewType,
  slug?: string,
) {
  if (view === "paths")
    return currentView === "paths" || currentView === "path";
  if (currentView !== view) return false;
  if (view === "explore") return (currentSlug || "all") === (slug || "all");
  return true;
}
