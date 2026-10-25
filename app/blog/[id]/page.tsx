import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { BLOG_POSTS, getBlogPost, formatBlogDate } from "@/data/blogs";
import { ArticleTableOfContents } from "@/components/blog/ArticleTableOfContents";
import { BlogArtwork } from "@/components/blog/BlogArtwork";
import { BlogCard } from "@/components/blog/BlogCard";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ id: post.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost((await params).id);
  if (!post) notFound();
  return {
    title: `${post.title} — Systemly Blog`,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = getBlogPost((await params).id);
  if (!post) notFound();
  const related = BLOG_POSTS.filter((item) => item.id !== post.id).slice(0, 3);
  return (
    <div className="post-page sy-container">
      <Link
        href="/blog"
        className="blog-back-link inline-flex items-center gap-2 !text-[var(--muted)] hover:!text-[var(--accent)]"
      >
        <ArrowLeft size={14} />
        All articles
      </Link>
      <article>
        <header className="post-header">
          <div className="flex flex-wrap items-center gap-3 text-xs mb-5">
            <Link
              href="/blog"
              className="min-h-11 inline-flex items-center rounded-full px-4 py-2 border border-[var(--border)] bg-[var(--accentSoft)] font-semibold"
            >
              {post.category}
            </Link>
            <span className="text-[var(--muted)]">
              {post.level} · Demo article
            </span>
          </div>
          <h1 className="post-title font-bold tracking-tight">{post.title}</h1>
          <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed mt-5">
            {post.excerpt}
          </p>
          <div className="post-meta text-sm text-[var(--muted)]">
            <div className="flex items-center gap-3 min-w-0">
              <span
                className="shrink-0 w-10 h-10 rounded-full bg-[var(--accentSoft)] text-[var(--accent)] inline-flex items-center justify-center font-bold"
                aria-hidden="true"
              >
                S
              </span>
              <span className="font-medium text-[var(--text)]">
                {post.author}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <time dateTime={post.publishedAt}>
                {formatBlogDate(post.publishedAt)}
              </time>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} className="shrink-0" />
                {post.readMinutes} min read
              </span>
            </div>
          </div>
        </header>
        <div className="post-cover overflow-hidden rounded-2xl border border-[var(--border)]">
          <BlogArtwork post={post} large />
        </div>
        <div className="post-layout">
          <ArticleTableOfContents sections={post.sections} />
          <div className="post-prose">
            <p className="post-intro text-[var(--muted)] mb-8">{post.intro}</p>
            {post.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="post-section"
              >
                <h2 className="post-section-title font-bold tracking-tight mb-4">
                  {section.title}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="post-paragraph text-[var(--muted)] mb-4"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.code && (
                  <figure className="post-code-example my-6 min-w-0">
                    <figcaption className="post-code-hint text-xs text-[var(--muted)] mb-2">
                      Code example · scroll horizontally if needed
                    </figcaption>
                    <pre
                      tabIndex={0}
                      role="region"
                      aria-label={`${section.title}: code example`}
                      className="post-code rounded-xl border border-[var(--border)] bg-[var(--surface2)]"
                    >
                      <code>{section.code}</code>
                    </pre>
                  </figure>
                )}
                {section.takeaway && (
                  <aside className="post-takeaway my-6 rounded-r-xl border-l-2 border-[var(--accent)] bg-[var(--accentSoft)]">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)] mb-2">
                      The takeaway
                    </p>
                    <p className="post-paragraph">{section.takeaway}</p>
                  </aside>
                )}
              </section>
            ))}
            <div className="border-t border-[var(--border)] pt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-3 py-1 text-xs text-[var(--muted)] border border-[var(--border)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href="/blog"
              className="min-h-11 inline-flex items-center gap-2 mt-8 text-sm font-semibold"
            >
              <ArrowLeft size={15} />
              Back to all articles
            </Link>
          </div>
        </div>
      </article>
      <section
        aria-labelledby="related-heading"
        className="post-related border-t border-[var(--border)]"
      >
        <p className="text-xs uppercase tracking-wider font-semibold text-[var(--accent)] mb-2">
          Keep exploring
        </p>
        <h2
          id="related-heading"
          className="text-2xl font-bold tracking-tight mb-7"
        >
          More from the blog
        </h2>
        <div className="post-related-grid">
          {related.map((item) => (
            <BlogCard key={item.id} post={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
