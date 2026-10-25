import { CONCEPTS } from "@/data/concepts";
import { ALGORITHMS } from "@/data/algorithms";
import { CASES } from "@/data/cases";
import { COMPANIES } from "@/data/companies";
import { PATHS } from "@/data/paths";
import { BLOG_POSTS } from "@/data/blogs";
import { PLAYGROUND_TEMPLATES } from "@/data/playground";
import {
  summarizeRecord,
  type AdminRecord,
  type AdminSection,
  type ContentData,
} from "./config";

const groups = [
  ["concepts", CONCEPTS, "concepts"],
  ["algorithms", ALGORITHMS, "algorithms"],
  ["case-studies", CASES, "system-design"],
  ["companies", COMPANIES, "companies"],
  ["learning-paths", PATHS, "learning-paths"],
] as const;
export function getAdminRecords(): AdminRecord[] {
  const catalog: AdminRecord[] = groups.flatMap(([section, items, route]) =>
    items.map((item) =>
      summarizeRecord({
        section,
        slug: item.slug,
        title: item.title,
        description: item.blurb,
        category: item.cat,
        difficulty: item.diff,
        status: "Published",
        metric: "",
        publicHref: `/#/${route}/${item.slug}`,
        data: JSON.parse(JSON.stringify(item)) as ContentData,
      }),
    ),
  );
  const blog = BLOG_POSTS.map((post) =>
    summarizeRecord({
      section: "blog" as const,
      slug: post.id,
      title: post.title,
      description: post.excerpt,
      category: post.category,
      difficulty: post.level,
      status: "Published" as const,
      metric: "",
      publicHref: `/blog/${post.id}`,
      data: { ...post },
    }),
  );
  const playground = Object.entries(PLAYGROUND_TEMPLATES).map(
    ([slug, template]) =>
      summarizeRecord({
        section: "playground" as const,
        slug,
        title: template.name,
        description: template.desc,
        category: "Architecture",
        difficulty: "",
        status: "Published" as const,
        metric: "",
        publicHref: "/#/playground",
        data: { ...template },
      }),
  );
  return [...catalog, ...blog, ...playground];
}
export function getSectionRecords(section: AdminSection) {
  return getAdminRecords().filter((item) => item.section === section);
}
