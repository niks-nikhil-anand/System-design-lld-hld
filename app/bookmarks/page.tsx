import type { Metadata } from "next";
import { BookmarksRoute } from "@/components/routes/BookmarksRoute";
import { pageMetadata } from "@/lib/seo-metadata";
export const metadata: Metadata = pageMetadata({ title: "Saved Learning Resources", description: "Review your saved system design concepts and learning resources.", path: "/bookmarks", noIndex: true });
export default function Page() { return <BookmarksRoute />; }
