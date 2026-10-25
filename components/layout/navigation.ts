import type { ViewType } from "@/types/systemly";

export const NAVIGATION: { label: string; view: ViewType; slug?: string }[] = [
  { label: "Explore", view: "explore" },
  { label: "Concepts", view: "explore", slug: "concept" },
  { label: "Algorithms", view: "explore", slug: "algorithm" },
  { label: "Case studies", view: "explore", slug: "case" },
  { label: "Companies", view: "explore", slug: "company" },
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
      case: "system-design",
    };
    return `/#/${directories[slug || ""] || "explore"}`;
  }
  if (view === "paths" || view === "path")
    return `/#/learning-paths${slug ? `/${slug}` : ""}`;
  return `/#/${view}`;
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
