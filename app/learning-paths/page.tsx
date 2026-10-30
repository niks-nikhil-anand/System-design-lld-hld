import type { Metadata } from "next";
import { PathsRoute } from "@/components/routes/PathsRoute";
import { pageMetadata } from "@/lib/seo-metadata";
export const metadata: Metadata = pageMetadata({ title: "System Design Learning Paths", description: "Follow structured system design roadmaps through networking, databases, scalability, and distributed architecture.", path: "/learning-paths" });
export default function Page() { return <PathsRoute />; }
