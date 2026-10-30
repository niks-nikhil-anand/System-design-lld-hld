import type { Metadata } from "next";
import { PlaygroundRoute } from "@/components/routes/PlaygroundRoute";
import { pageMetadata } from "@/lib/seo-metadata";
export const metadata: Metadata = pageMetadata({ title: "Interactive System Design Playground", description: "Explore architecture templates, inspect system components, and visualize request flows through distributed systems.", path: "/playground" });
export default function Page() { return <PlaygroundRoute />; }
