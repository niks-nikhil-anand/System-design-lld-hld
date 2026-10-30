import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/data/blogs";
import { ALL_ITEMS } from "@/data/catalog";
import { INFORMATION_LINKS, INFORMATION_PAGES } from "@/lib/information-pages";
import { siteConfig } from "@/lib/site";

function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).href;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const directories = [
    "/concepts",
    "/algorithms",
    "/companies",
    "/case-studies",
    "/learning-paths",
    "/playground",
  ].map((path) => ({ url: absoluteUrl(path), changeFrequency: "weekly" as const, priority: 0.8 }));

  const detailPages: MetadataRoute.Sitemap = ALL_ITEMS.map((item) => {
    const base = item.kind === "concept" ? "/concepts"
      : item.kind === "algorithm" ? "/algorithms"
        : item.kind === "company" ? "/companies"
          : item.kind === "case" ? "/case-studies"
            : "/learning-paths";
    return { url: absoluteUrl(`${base}/${item.slug}`), changeFrequency: "monthly", priority: 0.65 };
  });

  const informationPages: MetadataRoute.Sitemap = INFORMATION_LINKS.map(
    ({ slug }) => ({
      url: absoluteUrl(`/${slug}`),
      lastModified: INFORMATION_PAGES[slug].updated,
      changeFrequency: slug === "about" ? "monthly" : "yearly",
      priority: slug === "about" ? 0.7 : 0.4,
    }),
  );

  const blogPosts: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: absoluteUrl(`/blog/${post.id}`),
    lastModified: post.publishedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: absoluteUrl("/"),
      lastModified: "2026-10-31",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: "2026-10-31",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...directories,
    ...detailPages,
    ...informationPages,
    ...blogPosts,
  ];
}
