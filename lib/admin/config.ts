export const ADMIN_SECTIONS = [
  "concepts",
  "algorithms",
  "case-studies",
  "companies",
  "learning-paths",
  "blog",
  "playground",
] as const;
export type AdminSection = (typeof ADMIN_SECTIONS)[number];
export type AdminStatus = "Published" | "Local draft" | "Archived";
export type ContentData = Record<string, unknown>;
export interface AdminRecord {
  section: AdminSection;
  slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  status: AdminStatus;
  metric: string;
  publicHref?: string;
  updatedAt?: string;
  data: ContentData;
}
export interface EditorField {
  key: string;
  label: string;
  type?: "text" | "textarea" | "lines" | "number" | "date" | "json";
  help?: string;
}
export const SECTION_CONFIG: Record<
  AdminSection,
  {
    title: string;
    singular: string;
    description: string;
    metric: string;
    fields: EditorField[];
  }
> = {
  concepts: {
    title: "Concepts",
    singular: "concept",
    description:
      "Build a clear foundation, one system design concept at a time.",
    metric: "Reading time",
    fields: [
      { key: "def", label: "Definition", type: "textarea" },
      { key: "what", label: "What it is", type: "textarea" },
      { key: "why", label: "Why it matters", type: "textarea" },
      {
        key: "how",
        label: "How it works",
        type: "lines",
        help: "One step per line.",
      },
      {
        key: "preview",
        label: "Request flow",
        type: "lines",
        help: "One node label per line, in flow order.",
      },
      {
        key: "tradeoffs",
        label: "Tradeoffs",
        type: "json",
        help: "An object with pros and cons arrays.",
      },
    ],
  },
  algorithms: {
    title: "Algorithms",
    singular: "algorithm",
    description: "Manage the algorithms that make complex ideas click.",
    metric: "Complexity",
    fields: [
      { key: "time", label: "Time complexity", help: "For example, O(log n)." },
      { key: "space", label: "Space complexity" },
      {
        key: "mini",
        label: "Visualization input",
        type: "json",
        help: "An array of numbers used by the visualization.",
      },
    ],
  },
  "case-studies": {
    title: "Case studies",
    singular: "case study",
    description:
      "Turn real-world requirements into thoughtful architecture walkthroughs.",
    metric: "Reading time",
    fields: [
      { key: "problem", label: "Problem statement", type: "textarea" },
      { key: "objectives", label: "Learning objectives", type: "lines" },
      { key: "functional", label: "Functional requirements", type: "lines" },
      {
        key: "nonFunctional",
        label: "Non-functional requirements",
        type: "lines",
      },
      { key: "assume", label: "Capacity assumptions", type: "textarea" },
      { key: "flowTitle", label: "Architecture title" },
      { key: "preview", label: "Request flow labels", type: "lines" },
      { key: "capacity", label: "Capacity estimates", type: "json" },
      { key: "api", label: "API definitions", type: "json" },
      { key: "deepDives", label: "Deep dives", type: "json" },
      { key: "tradeoffs", label: "Tradeoffs", type: "json" },
      { key: "nodes", label: "Architecture nodes", type: "json" },
      { key: "edges", label: "Architecture connections", type: "json" },
    ],
  },
  companies: {
    title: "Companies",
    singular: "company",
    description: "Explore the engineering decisions behind familiar products.",
    metric: "Topics",
    fields: [
      { key: "overview", label: "Architecture overview", type: "textarea" },
      { key: "topics", label: "Topic count", type: "number" },
      { key: "takeaways", label: "Key takeaways", type: "lines" },
      {
        key: "sources",
        label: "Source references",
        type: "lines",
        help: "One public source URL per line.",
      },
      { key: "products", label: "Products", type: "json" },
      { key: "scale", label: "Scale estimates", type: "json" },
      { key: "flowTitle", label: "Architecture title" },
      { key: "nodes", label: "Architecture nodes", type: "json" },
      { key: "edges", label: "Architecture connections", type: "json" },
    ],
  },
  "learning-paths": {
    title: "Learning paths",
    singular: "learning path",
    description: "Connect individual ideas into a purposeful learning journey.",
    metric: "Modules",
    fields: [
      {
        key: "duration",
        label: "Estimated duration",
        help: "For example, approximately 3 hours.",
      },
    ],
  },
  blog: {
    title: "Blog articles",
    singular: "article",
    description: "A home for the ideas and explanations worth sharing.",
    metric: "Published",
    fields: [
      { key: "author", label: "Author" },
      { key: "publishedAt", label: "Publication date", type: "date" },
      { key: "intro", label: "Introduction", type: "textarea" },
      {
        key: "diagram",
        label: "Article diagram",
        type: "json",
        help: "An object with a nodes array and label.",
      },
    ],
  },
  playground: {
    title: "Playground",
    singular: "template",
    description:
      "Shape the architecture templates learners can experiment with.",
    metric: "Topology",
    fields: [
      { key: "p99", label: "Baseline p99 latency" },
      { key: "qps", label: "Baseline throughput" },
      { key: "bottleneck", label: "Potential bottleneck", type: "textarea" },
      {
        key: "flow",
        label: "Request flow",
        type: "lines",
        help: "One node ID per line, in request order.",
      },
      {
        key: "nodes",
        label: "Topology nodes",
        type: "json",
        help: "Each node has id, name, type, x, y, and desc. Coordinates range from 0 to 100.",
      },
    ],
  },
};
export function isAdminSection(value: string): value is AdminSection {
  return ADMIN_SECTIONS.includes(value as AdminSection);
}
export const recordKey = (record: Pick<AdminRecord, "section" | "slug">) =>
  `${record.section}:${record.slug}`;
export function summarizeRecord(record: AdminRecord): AdminRecord {
  const d = record.data;
  const metric =
    record.section === "algorithms"
      ? String(d.time || "—")
      : record.section === "companies"
        ? `${d.topics || 0} topics`
        : record.section === "learning-paths"
          ? `${Array.isArray(d.modules) ? d.modules.length : 0} modules`
          : record.section === "blog"
            ? String(d.publishedAt || "Not scheduled")
            : record.section === "playground"
              ? `${Array.isArray(d.nodes) ? d.nodes.length : 0} nodes`
              : `${d.mins || 0} min`;
  return { ...record, metric };
}
