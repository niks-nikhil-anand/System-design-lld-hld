export default function BlogPostLoading() {
  return (
    <div
      className="post-page sy-container"
      role="status"
      aria-label="Loading article"
    >
      <p className="sr-only">Loading article…</p>
      <div aria-hidden="true">
        <div className="h-11 w-28 rounded-lg bg-[var(--surface2)]" />
        <div className="post-header space-y-5">
          <div className="h-9 w-28 rounded-full bg-[var(--accentSoft)]" />
          <div className="h-10 sm:h-14 w-full rounded-lg bg-[var(--surface2)]" />
          <div className="h-10 sm:h-14 w-3/4 rounded-lg bg-[var(--surface2)]" />
          <div className="h-6 w-full rounded-lg bg-[var(--surface2)]" />
          <div className="h-10 w-2/3 rounded-lg bg-[var(--surface2)]" />
        </div>
        <div className="post-cover h-64 sm:h-80 rounded-2xl bg-[var(--accentSoft)] border border-[var(--border)]" />
        <div className="post-layout">
          <div className="post-toc rounded-xl bg-[var(--surface2)] h-14 lg:h-64" />
          <div className="post-prose space-y-4">
            {[0, 1, 2, 3].map((line) => (
              <div key={line} className="h-5 rounded-lg bg-[var(--surface2)]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
