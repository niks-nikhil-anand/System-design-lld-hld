"use client";
import Link from "next/link";
import { ExternalLink, FileText } from "lucide-react";
import type { AdminRecord } from "@/lib/admin/config";
import { SECTION_CONFIG } from "@/lib/admin/config";
import { StatusBadge } from "./AdminPrimitives";
import { TopologyPreview } from "./TopologyPreview";
import { Button } from "@/components/ui/button";

export function exportRecord(record: AdminRecord) {
  const blob = new Blob([JSON.stringify(record, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${record.slug}.json`;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function Value({ value }: { value: unknown }) {
  if (typeof value === "string" || typeof value === "number")
    return <p className="whitespace-pre-wrap">{String(value)}</p>;
  if (Array.isArray(value))
    return (
      <ul className="cms-preview-list">
        {value.map((v, i) => (
          <li key={i}>
            <Value value={v} />
          </li>
        ))}
      </ul>
    );
  if (value && typeof value === "object")
    return (
      <dl className="cms-preview-properties">
        {Object.entries(value)
          .filter(([, v]) => v !== undefined && v !== "")
          .map(([k, v]) => (
            <div key={k}>
              <dt>{k.replace(/([A-Z])/g, " $1")}</dt>
              <dd>
                <Value value={v} />
              </dd>
            </div>
          ))}
      </dl>
    );
  return null;
}
export function RecordPreview({ record }: { record: AdminRecord }) {
  const config = SECTION_CONFIG[record.section];
  const content = config.fields.filter(
    (f) => record.data[f.key] !== undefined && record.data[f.key] !== "",
  );
  return (
    <article className="cms-preview">
      <div className="flex flex-wrap items-center gap-2">
        <span className="cms-count">{record.category}</span>
        <StatusBadge status={record.status} />
      </div>
      <h2>{record.title || "Untitled resource"}</h2>
      <p className="cms-preview-description">
        {record.description || "Add a description to introduce this resource."}
      </p>
      <div className="cms-preview-meta">
        <FileText size={15} />
        {record.difficulty && <span>{record.difficulty} · </span>}
        <span>{record.metric}</span>
      </div>
      {record.publicHref && (
        <Button
          variant="outline"
          render={<Link href={record.publicHref} />}
          nativeButton={false}
        >
          View published version <ExternalLink />
        </Button>
      )}
      {record.section === "playground" && (
        <TopologyPreview data={record.data} />
      )}
      {content.map((field) => (
        <section key={field.key}>
          <h3>{field.label}</h3>
          <Value value={record.data[field.key]} />
        </section>
      ))}
      {record.section === "learning-paths" && (
        <section>
          <h3>Learning modules</h3>
          <Value value={record.data.modules} />
        </section>
      )}
      {record.section === "blog" && (
        <section>
          <h3>Article sections</h3>
          <Value value={record.data.sections} />
        </section>
      )}
    </article>
  );
}
