import Link from "next/link";
import {
  ArrowUpRight,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  Mail,
} from "lucide-react";
import {
  CONTACT_EMAIL,
  INFORMATION_LINKS,
  type InformationPageContent,
} from "@/lib/information-pages";
import { siteConfig } from "@/lib/site";

export function InformationPage({
  page,
}: {
  page: InformationPageContent;
}) {
  const formattedUpdated = new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${page.updated}T00:00:00Z`));
  const formattedEffective = page.effective
    ? new Intl.DateTimeFormat("en", {
        dateStyle: "long",
        timeZone: "UTC",
      }).format(new Date(`${page.effective}T00:00:00Z`))
    : null;
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.title,
        item: new URL(`/${page.slug}`, siteConfig.url).href,
      },
    ],
  };

  return (
    <article className="relative min-w-0 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-80 opacity-70"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 20% 10%, color-mix(in srgb, var(--accent) 13%, transparent), transparent 44%), radial-gradient(circle at 85% 20%, color-mix(in srgb, var(--ok) 10%, transparent), transparent 35%)",
        }}
      />

      <div className="sy-container relative min-w-0 py-10 sm:py-14 lg:py-18">
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-[var(--muted)]">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-[var(--text)] transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-[var(--text)]">
              {page.title}
            </li>
          </ol>
        </nav>

        <header className="min-w-0 max-w-4xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)] shadow-sm">
            <BookOpenCheck size={14} aria-hidden="true" />
            {page.eyebrow}
          </div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-[-0.04em] text-[var(--text)] sm:text-5xl lg:text-6xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted)] sm:text-lg">
            {page.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--muted)]">
            <span className="inline-flex items-center gap-2">
              <CalendarDays size={14} aria-hidden="true" />
              Last updated {formattedUpdated}
            </span>
            {page.effective && (
              <span>
                Effective{" "}
                <time dateTime={page.effective}>{formattedEffective}</time>
              </span>
            )}
          </div>
        </header>

        <div className="mt-12 grid min-w-0 grid-cols-[minmax(0,1fr)] items-start gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-14">
          <div className="min-w-0 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm sm:p-8 lg:p-10">
            <div className="space-y-10 sm:space-y-12">
              {page.sections.map((section, index) => (
                <section
                  id={section.id}
                  key={section.id}
                  className="scroll-mt-28"
                  aria-labelledby={`${section.id}-heading`}
                >
                  <div className="mb-4 flex items-start gap-3">
                    <span
                      className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface2)] text-[11px] font-bold text-[var(--accent)]"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2
                      id={`${section.id}-heading`}
                      className="text-xl font-bold tracking-tight text-[var(--text)] sm:text-2xl"
                    >
                      {section.title}
                    </h2>
                  </div>
                  <div className="min-w-0 space-y-4 break-words pl-0 text-sm leading-7 text-[var(--muted)] [overflow-wrap:anywhere] sm:pl-10 sm:text-[15px]">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.bullets && (
                      <ul className="grid gap-3" role="list">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3">
                            <CheckCircle2
                              size={16}
                              className="mt-1 shrink-0 text-[var(--ok)]"
                              aria-hidden="true"
                            />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.note && (
                      <p className="rounded-2xl border border-[var(--border)] bg-[var(--surface2)] px-4 py-3 text-[var(--text)]">
                        {section.note}
                      </p>
                    )}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <aside className="min-w-0 space-y-5 lg:sticky lg:top-24">
            <nav
              aria-label="On this page"
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm"
            >
              <h2 className="text-sm font-bold text-[var(--text)]">On this page</h2>
              <ol className="mt-4 space-y-1.5 border-l border-[var(--border)] pl-4">
                {page.sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block py-1.5 text-xs leading-5 text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface2)] p-5">
              <Mail size={18} className="text-[var(--accent)]" aria-hidden="true" />
              <h2 className="mt-3 text-sm font-bold text-[var(--text)]">
                Need to reach us?
              </h2>
              <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
                Ask a question, request a privacy action, or report a correction.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-4 inline-flex min-h-11 max-w-full items-center gap-2 break-all text-xs font-semibold text-[var(--accent)] hover:underline"
              >
                {CONTACT_EMAIL}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </aside>
        </div>

        <nav aria-label="Information pages" className="mt-10 border-t border-[var(--border)] pt-8">
          <h2 className="text-sm font-bold text-[var(--text)]">Related information</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {INFORMATION_LINKS.filter((link) => link.slug !== page.slug).map(
              (link) => (
                <Link
                  key={link.slug}
                  href={`/${link.slug}`}
                  className="inline-flex min-h-10 items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 text-xs font-medium text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text)]"
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>
        </nav>
      </div>
    </article>
  );
}
