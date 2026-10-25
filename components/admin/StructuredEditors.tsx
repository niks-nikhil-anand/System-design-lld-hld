"use client";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { AdminRecord } from "@/lib/admin/config";
export interface PathModuleDraft {
  title: string;
  items: string[];
}
export interface ArticleSectionDraft {
  id: string;
  title: string;
  paragraphs: string[];
  code?: string;
  takeaway?: string;
}
function Reorder({
  index,
  count,
  move,
  remove,
  label,
}: {
  index: number;
  count: number;
  move: (from: number, to: number) => void;
  remove: () => void;
  label: string;
}) {
  return (
    <div className="flex gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={`Move ${label} up`}
        disabled={index === 0}
        onClick={() => move(index, index - 1)}
      >
        <ArrowUp />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={`Move ${label} down`}
        disabled={index === count - 1}
        onClick={() => move(index, index + 1)}
      >
        <ArrowDown />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={`Remove ${label}`}
        onClick={remove}
      >
        <Trash2 />
      </Button>
    </div>
  );
}
export function ModuleEditor({
  value,
  onChange,
  records,
}: {
  value: PathModuleDraft[];
  onChange: (v: PathModuleDraft[]) => void;
  records: AdminRecord[];
}) {
  function update(index: number, change: Partial<PathModuleDraft>) {
    onChange(
      value.map((item, i) => (i === index ? { ...item, ...change } : item)),
    );
  }
  function move(from: number, to: number) {
    const next = [...value];
    next.splice(to, 0, next.splice(from, 1)[0]);
    onChange(next);
  }
  const resourceKey = (r: AdminRecord) =>
    `${r.section === "concepts" ? "concept" : r.section === "algorithms" ? "algorithm" : r.section === "case-studies" ? "case" : "company"}:${r.slug}`;
  const available = records.filter(
    (r) =>
      ["concepts", "algorithms", "case-studies", "companies"].includes(
        r.section,
      ) && r.status !== "Archived",
  );
  return (
    <div className="cms-builder">
      <p className="text-sm text-muted-foreground">
        Organize modules, then choose resources in the order learners should
        study them.
      </p>
      {value.map((module, index) => (
        <section key={index} className="cms-builder-item">
          <div className="cms-builder-heading">
            <h3>Module {index + 1}</h3>
            <Reorder
              index={index}
              count={value.length}
              move={move}
              remove={() => onChange(value.filter((_, i) => i !== index))}
              label={`module ${index + 1}`}
            />
          </div>
          <Label htmlFor={`module-title-${index}`}>Module title</Label>
          <Input
            id={`module-title-${index}`}
            value={module.title}
            onChange={(e) => update(index, { title: e.target.value })}
            required
          />
          <ol className="cms-module-resources">
            {module.items.map((key, position) => (
              <li key={`${key}:${position}`}>
                <span>
                  {available.find((r) => resourceKey(r) === key)?.title || key}
                </span>
                <Reorder
                  index={position}
                  count={module.items.length}
                  label={`resource ${position + 1} in module ${index + 1}`}
                  move={(from, to) => {
                    const items = [...module.items];
                    items.splice(to, 0, items.splice(from, 1)[0]);
                    update(index, { items });
                  }}
                  remove={() =>
                    update(index, {
                      items: module.items.filter((_, i) => i !== position),
                    })
                  }
                />
              </li>
            ))}
          </ol>
          <Label htmlFor={`module-resource-${index}`}>Add a resource</Label>
          <select
            id={`module-resource-${index}`}
            className="cms-native-select"
            value=""
            onChange={(e) => {
              if (e.target.value)
                update(index, { items: [...module.items, e.target.value] });
            }}
          >
            <option value="">Choose a learning resource…</option>
            {available
              .filter((r) => !module.items.includes(resourceKey(r)))
              .map((r) => (
                <option key={resourceKey(r)} value={resourceKey(r)}>
                  {r.title} · {r.section}
                </option>
              ))}
          </select>
        </section>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => onChange([...value, { title: "", items: [] }])}
      >
        <Plus />
        Add module
      </Button>
    </div>
  );
}
export function ArticleEditor({
  value,
  onChange,
}: {
  value: ArticleSectionDraft[];
  onChange: (v: ArticleSectionDraft[]) => void;
}) {
  function update(index: number, change: Partial<ArticleSectionDraft>) {
    onChange(
      value.map((item, i) => (i === index ? { ...item, ...change } : item)),
    );
  }
  function move(from: number, to: number) {
    const next = [...value];
    next.splice(to, 0, next.splice(from, 1)[0]);
    onChange(next);
  }
  return (
    <div className="cms-builder">
      <p className="text-sm text-muted-foreground">
        Build the article section by section. Leave a blank line between
        paragraphs.
      </p>
      {value.map((section, index) => (
        <section className="cms-builder-item" key={index}>
          <div className="cms-builder-heading">
            <h3>Section {index + 1}</h3>
            <Reorder
              index={index}
              count={value.length}
              move={move}
              remove={() => onChange(value.filter((_, i) => i !== index))}
              label={`section ${index + 1}`}
            />
          </div>
          <Label htmlFor={`article-title-${index}`}>Heading</Label>
          <Input
            id={`article-title-${index}`}
            required
            value={section.title}
            onChange={(e) =>
              update(index, {
                title: e.target.value,
                id: e.target.value
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-|-$/g, ""),
              })
            }
          />
          <Label htmlFor={`article-body-${index}`}>Paragraphs</Label>
          <Textarea
            id={`article-body-${index}`}
            rows={6}
            value={section.paragraphs.join("\n\n")}
            onChange={(e) =>
              update(index, { paragraphs: e.target.value.split("\n\n") })
            }
          />
          <Label htmlFor={`article-code-${index}`}>
            Code example (optional)
          </Label>
          <Textarea
            id={`article-code-${index}`}
            className="font-mono"
            rows={4}
            value={section.code || ""}
            onChange={(e) => update(index, { code: e.target.value })}
          />
          <Label htmlFor={`article-takeaway-${index}`}>
            Key takeaway (optional)
          </Label>
          <Textarea
            id={`article-takeaway-${index}`}
            value={section.takeaway || ""}
            onChange={(e) => update(index, { takeaway: e.target.value })}
          />
        </section>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() =>
          onChange([...value, { id: "", title: "", paragraphs: [] }])
        }
      >
        <Plus />
        Add section
      </Button>
    </div>
  );
}
