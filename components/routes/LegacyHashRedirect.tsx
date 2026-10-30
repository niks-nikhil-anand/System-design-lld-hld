"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BY_KEY } from "@/data/catalog";

const destinations: Record<string, string> = {
  explore: "/explore", concepts: "/concepts", algorithms: "/algorithms",
  companies: "/companies", "system-design": "/case-studies",
  "learning-paths": "/learning-paths", playground: "/playground",
  bookmarks: "/bookmarks", about: "/about",
};
const kinds: Record<string, string> = { concepts: "concept", algorithms: "algorithm", companies: "company", "system-design": "case", "learning-paths": "path" };
export function LegacyHashRedirect() {
  const router = useRouter();
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash === "#/" || hash === "#") return;
    const [path, queryString = ""] = hash.replace(/^#\/?/, "").split("?");
    const [section, slug] = path.split("/");
    if (section === "search") {
      const query = new URLSearchParams(queryString).get("q");
      router.replace(`/explore${query ? `?q=${encodeURIComponent(query)}` : ""}`);
      return;
    }
    if (section === "explore") {
      const type = ({ concept: "concepts", algorithm: "algorithms", company: "companies", case: "case-studies" } as Record<string, string>)[slug];
      router.replace(type || "/explore");
      return;
    }
    const sectionPath = destinations[section];
    if (!sectionPath) return;
    const hasItem = slug && kinds[section] && BY_KEY[`${kinds[section]}:${slug}`];
    if (hasItem) {
      router.replace(kinds[section] === "path" ? `/learning-paths/${slug}` : `${sectionPath}?item=${encodeURIComponent(slug)}`);
      return;
    }
    router.replace(sectionPath);
  }, [router]);
  return null;
}
