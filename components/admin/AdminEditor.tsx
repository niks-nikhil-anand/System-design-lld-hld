"use client";
import {
  useEffect,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Download, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AdminRecord,
  AdminSection,
  ContentData,
  SECTION_CONFIG,
  summarizeRecord,
} from "@/lib/admin/config";
import { useAdminStore } from "./AdminStore";
import { PageHeading, LocalNotice, FilterSelect } from "./AdminPrimitives";
import { RecordPreview, exportRecord } from "./RecordPreview";
import {
  ModuleEditor,
  ArticleEditor,
  PathModuleDraft,
  ArticleSectionDraft,
} from "./StructuredEditors";
const noSubscribe = () => () => {};
const slugify = (v: string) =>
  v
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
function blank(section: AdminSection): AdminRecord {
  return {
    section,
    slug: "",
    title: "",
    description: "",
    category:
      section === "companies"
        ? "Company"
        : section === "playground"
          ? "Architecture"
          : "",
    difficulty: section === "playground" ? "" : "Beginner",
    status: "Local draft",
    metric: "",
    data:
      section === "blog"
        ? { author: "System Design Mate Editorial", sections: [] }
        : section === "learning-paths"
          ? { modules: [] }
          : section === "playground"
            ? { nodes: [], flow: [] }
            : {},
  };
}
export function AdminEditor({
  section,
  slug,
}: {
  section: AdminSection;
  slug?: string;
}) {
  const { records } = useAdminStore();
  const ready = useSyncExternalStore(
    noSubscribe,
    () => true,
    () => false,
  );
  if (!ready)
    return (
      <div className="space-y-6">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  const record = slug
    ? records.find((r) => r.section === section && r.slug === slug)
    : blank(section);
  if (!record)
    return (
      <>
        <PageHeading
          title="Resource not found"
          description="This resource may belong to another browser’s local workspace."
        />
        <Button
          render={<Link href={`/admin/${section}`} />}
          nativeButton={false}
        >
          Back to {SECTION_CONFIG[section].title.toLowerCase()}
        </Button>
      </>
    );
  return (
    <EditorForm
      key={`${section}:${slug || "new"}`}
      initial={record}
      creating={!slug}
    />
  );
}
function EditorForm({
  initial,
  creating,
}: {
  initial: AdminRecord;
  creating: boolean;
}) {
  const { section } = initial;
  const config = SECTION_CONFIG[section];
  const { records, save } = useAdminStore();
  const router = useRouter();
  const [title, setTitle] = useState(initial.title);
  const [slug, setSlug] = useState(initial.slug);
  const [description, setDescription] = useState(initial.description);
  const [category, setCategory] = useState(initial.category);
  const [difficulty, setDifficulty] = useState(initial.difficulty);
  const [tags, setTags] = useState(
    Array.isArray(initial.data.tags) ? initial.data.tags.join(", ") : "",
  );
  const [minutes, setMinutes] = useState(
    String(initial.data.mins ?? initial.data.readMinutes ?? 10),
  );
  const [fields, setFields] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      config.fields.map((f) => {
        const value = initial.data[f.key];
        return [
          f.key,
          value === undefined
            ? ""
            : f.type === "json"
              ? JSON.stringify(value, null, 2)
              : f.type === "lines" && Array.isArray(value)
                ? value.join("\n")
                : String(value),
        ];
      }),
    ),
  );
  const [modules, setModules] = useState<PathModuleDraft[]>(
    Array.isArray(initial.data.modules)
      ? (initial.data.modules as PathModuleDraft[])
      : [],
  );
  const [sections, setSections] = useState<ArticleSectionDraft[]>(
    Array.isArray(initial.data.sections)
      ? (initial.data.sections as ArticleSectionDraft[])
      : [],
  );
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("details");
  const [previewRecord, setPreviewRecord] = useState<AdminRecord>(initial);
  const [slugTouched, setSlugTouched] = useState(!creating);
  useEffect(() => {
    if (!dirty) return;
    const unload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    const navigate = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.button !== 0
      )
        return;
      const anchor = (e.target as Element).closest("a[href]");
      if (
        !(anchor instanceof HTMLAnchorElement) ||
        anchor.hasAttribute("download") ||
        anchor.target === "_blank" ||
        anchor.origin !== location.origin ||
        anchor.href === location.href
      )
        return;
      e.preventDefault();
      e.stopPropagation();
      setPendingHref(anchor.href);
    };
    window.addEventListener("beforeunload", unload);
    document.addEventListener("click", navigate, true);
    return () => {
      window.removeEventListener("beforeunload", unload);
      document.removeEventListener("click", navigate, true);
    };
  }, [dirty]);
  function change() {
    setDirty(true);
    setMessage("");
    setError("");
  }
  function build(): AdminRecord {
    if (!title.trim() || !description.trim() || !category.trim())
      throw new Error(
        "Add a title, description, and category in the Details tab.",
      );
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
      throw new Error(
        "Use lowercase letters, numbers, and single hyphens for the slug.",
      );
    if (
      records.some(
        (r) =>
          r.section === section &&
          r.slug === slug &&
          (creating || r.slug !== initial.slug),
      )
    )
      throw new Error(
        "This slug is already used in this collection. Choose a unique slug.",
      );
    const duration = Number(minutes);
    if (
      !Number.isFinite(duration) ||
      duration <
        (section === "learning-paths" || section === "playground" ? 0 : 1) ||
      !Number.isInteger(duration)
    )
      throw new Error("Reading time must be a positive whole number.");
    const data: ContentData = { ...initial.data };
    for (const field of config.fields) {
      const value = fields[field.key]?.trim() || "";
      if (field.type === "json") {
        if (!value) {
          delete data[field.key];
          continue;
        }
        let parsed: unknown;
        try {
          parsed = JSON.parse(value);
        } catch {
          throw new Error(
            `${field.label} must contain valid JSON. Check the Advanced tab.`,
          );
        }
        const objectExpected =
          field.key === "diagram" ||
          (field.key === "tradeoffs" && section === "concepts");
        if (
          objectExpected
            ? !parsed || typeof parsed !== "object" || Array.isArray(parsed)
            : !Array.isArray(parsed)
        )
          throw new Error(
            `${field.label} must be ${objectExpected ? "an object" : "an array"}.`,
          );
        if (
          field.key === "mini" &&
          Array.isArray(parsed) &&
          !parsed.every((v) => typeof v === "number" && Number.isFinite(v))
        )
          throw new Error("Visualization input must be an array of numbers.");
        data[field.key] = parsed;
      } else if (field.type === "lines")
        data[field.key] = value
          .split("\n")
          .map((v) => v.trim())
          .filter(Boolean);
      else if (field.type === "number") {
        if (value && (!Number.isFinite(Number(value)) || Number(value) < 0))
          throw new Error(`${field.label} must be a non-negative number.`);
        data[field.key] = value ? Number(value) : 0;
      } else data[field.key] = value;
    }
    if (section === "learning-paths") {
      if (modules.some((m) => !m.title.trim() || !m.items.length))
        throw new Error("Each module needs a title and at least one resource.");
      data.modules = modules;
      data.total = modules.reduce((sum, m) => sum + m.items.length, 0);
    }
    if (section === "blog") {
      if (
        sections.some(
          (s) => !s.title.trim() || !s.paragraphs.some((p) => p.trim()),
        )
      )
        throw new Error("Each article section needs a heading and paragraph.");
      const ids = sections.map((s) => s.id);
      if (new Set(ids).size !== ids.length)
        throw new Error("Article section headings must be unique.");
      data.sections = sections;
      data.id = slug;
      data.title = title.trim();
      data.excerpt = description.trim();
      data.category = category.trim();
      data.level = difficulty;
      data.readMinutes = duration;
    } else if (section === "playground") {
      const nodes = data.nodes as
        | {
            id?: unknown;
            name?: unknown;
            type?: unknown;
            desc?: unknown;
            x?: unknown;
            y?: unknown;
          }[]
        | undefined;
      if (
        !nodes?.length ||
        nodes.some(
          (n) =>
            !n ||
            typeof n.id !== "string" ||
            !n.id ||
            typeof n.name !== "string" ||
            !n.name ||
            typeof n.type !== "string" ||
            typeof n.desc !== "string" ||
            typeof n.x !== "number" ||
            typeof n.y !== "number" ||
            n.x < 0 ||
            n.x > 100 ||
            n.y < 0 ||
            n.y > 100,
        )
      )
        throw new Error(
          "Add topology nodes with id, name, type, desc, and x/y coordinates between 0 and 100.",
        );
      const ids = nodes.map((n) => n.id);
      if (new Set(ids).size !== ids.length)
        throw new Error("Topology node IDs must be unique.");
      if (
        !(data.flow as string[] | undefined)?.length ||
        (data.flow as string[]).some((id) => !ids.includes(id))
      )
        throw new Error("The request flow must contain existing node IDs.");
      data.name = title.trim();
      data.desc = description.trim();
    } else {
      data.slug = slug;
      data.title = title.trim();
      data.blurb = description.trim();
      data.cat = category.trim();
      data.diff = difficulty;
      data.mins = duration;
    }
    data.tags = tags
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
    return summarizeRecord({
      ...initial,
      slug,
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      difficulty,
      status: "Local draft",
      publicHref: creating ? undefined : initial.publicHref,
      data,
    });
  }
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const record = build();
      save(record);
      setDirty(false);
      setError("");
      setMessage(
        "Local draft saved in this browser. The published website is unchanged.",
      );
      if (creating) router.replace(`/admin/${section}/${slug}/edit`);
    } catch (err) {
      setError((err as Error).message);
    }
  }
  function preview() {
    try {
      setPreviewRecord(build());
      setError("");
      setActiveTab("preview");
    } catch (err) {
      setError((err as Error).message);
    }
  }
  const normalFields = config.fields.filter((f) => f.type !== "json");
  const advancedFields = config.fields.filter((f) => f.type === "json");
  return (
    <>
      <PageHeading
        eyebrow={config.title.toUpperCase()}
        title={`${creating ? "Create" : "Edit"} ${config.singular}`}
        description={
          creating
            ? `Give your next ${config.singular} a place to start.`
            : initial.title
        }
      >
        <Button
          variant="outline"
          render={<Link href={`/admin/${section}`} />}
          nativeButton={false}
        >
          <ArrowLeft />
          Back to collection
        </Button>
      </PageHeading>
      <LocalNotice />
      <form onSubmit={submit} className="cms-editor-form">
        <div className="cms-editor-bar">
          <div>
            <span
              className={`cms-unsaved ${dirty ? "cms-unsaved-dirty" : ""}`}
            />
            {dirty
              ? "Unsaved changes"
              : initial.updatedAt
                ? "Local draft loaded"
                : "Ready to edit"}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                try {
                  exportRecord(build());
                  setError("");
                } catch (err) {
                  setError((err as Error).message);
                }
              }}
            >
              <Download />
              Export JSON
            </Button>
            <Button type="submit">
              <Save />
              Save local draft
            </Button>
          </div>
        </div>
        {error && (
          <div className="cms-form-error" role="alert">
            {error}
          </div>
        )}
        {message && (
          <div className="cms-feedback" role="status">
            <Check size={16} />
            {message}
          </div>
        )}
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            if (value === "preview") preview();
            else setActiveTab(String(value));
          }}
        >
          <TabsList className="cms-editor-tabs">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            {advancedFields.length > 0 && (
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            )}
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Resource details</CardTitle>
                <CardDescription>
                  The information learners see first.
                </CardDescription>
              </CardHeader>
              <CardContent className="cms-form-grid">
                <div className="cms-field cms-field-wide">
                  <Label htmlFor="resource-title">Title</Label>
                  <Input
                    id="resource-title"
                    value={title}
                    required
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (!slugTouched) setSlug(slugify(e.target.value));
                      change();
                    }}
                  />
                </div>
                <div className="cms-field cms-field-wide">
                  <Label htmlFor="resource-slug">Slug</Label>
                  <Input
                    id="resource-slug"
                    value={slug}
                    required
                    readOnly={!creating}
                    pattern="[a-z0-9]+(-[a-z0-9]+)*"
                    onChange={(e) => {
                      setSlug(e.target.value);
                      setSlugTouched(true);
                      change();
                    }}
                  />
                  <p>
                    {creating
                      ? "A unique URL identifier, such as load-balancer."
                      : "Existing resource slugs stay fixed so links remain stable."}
                  </p>
                </div>
                <div className="cms-field cms-field-wide">
                  <Label htmlFor="resource-description">Description</Label>
                  <Textarea
                    id="resource-description"
                    value={description}
                    required
                    rows={3}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      change();
                    }}
                  />
                </div>
                <div className="cms-field">
                  <Label htmlFor="resource-category">Category</Label>
                  <Input
                    id="resource-category"
                    value={category}
                    required
                    onChange={(e) => {
                      setCategory(e.target.value);
                      change();
                    }}
                  />
                </div>
                {section !== "playground" && (
                  <div className="cms-field">
                    <Label>Difficulty</Label>
                    <FilterSelect
                      label="Difficulty"
                      value={difficulty}
                      onChange={(v) => {
                        setDifficulty(v);
                        change();
                      }}
                      options={["Beginner", "Intermediate", "Advanced"].map(
                        (v) => ({ value: v, label: v }),
                      )}
                    />
                  </div>
                )}
                {section !== "playground" && (
                  <div className="cms-field">
                    <Label htmlFor="resource-minutes">
                      Reading time (minutes)
                    </Label>
                    <Input
                      id="resource-minutes"
                      type="number"
                      min={section === "learning-paths" ? 0 : 1}
                      step="1"
                      value={minutes}
                      onChange={(e) => {
                        setMinutes(e.target.value);
                        change();
                      }}
                    />
                  </div>
                )}
                <div className="cms-field">
                  <Label htmlFor="resource-tags">Tags</Label>
                  <Input
                    id="resource-tags"
                    value={tags}
                    placeholder="caching, distributed systems"
                    onChange={(e) => {
                      setTags(e.target.value);
                      change();
                    }}
                  />
                  <p>Separate tags with commas.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>
                  {section === "learning-paths"
                    ? "Learning modules"
                    : section === "blog"
                      ? "Article content"
                      : "Learning content"}
                </CardTitle>
                <CardDescription>
                  Shape the explanation and its supporting details.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {normalFields.map((field) => (
                  <div key={field.key} className="cms-field">
                    <Label htmlFor={`field-${field.key}`}>{field.label}</Label>
                    {field.type === "textarea" || field.type === "lines" ? (
                      <Textarea
                        id={`field-${field.key}`}
                        rows={field.type === "lines" ? 5 : 4}
                        value={fields[field.key]}
                        onChange={(e) => {
                          setFields({ ...fields, [field.key]: e.target.value });
                          change();
                        }}
                      />
                    ) : (
                      <Input
                        id={`field-${field.key}`}
                        type={
                          field.type === "number"
                            ? "number"
                            : field.type === "date"
                              ? "date"
                              : "text"
                        }
                        min={field.type === "number" ? 0 : undefined}
                        value={fields[field.key]}
                        onChange={(e) => {
                          setFields({ ...fields, [field.key]: e.target.value });
                          change();
                        }}
                      />
                    )}
                    {field.help && <p>{field.help}</p>}
                  </div>
                ))}
                {section === "learning-paths" && (
                  <ModuleEditor
                    records={records}
                    value={modules}
                    onChange={(v) => {
                      setModules(v);
                      change();
                    }}
                  />
                )}
                {section === "blog" && (
                  <ArticleEditor
                    value={sections}
                    onChange={(v) => {
                      setSections(v);
                      change();
                    }}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          {advancedFields.length > 0 && (
            <TabsContent value="advanced">
              <Card>
                <CardHeader>
                  <CardTitle>Structured content</CardTitle>
                  <CardDescription>
                    Edit the structured data used by diagrams and detailed
                    explanations. JSON is validated before saving.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {advancedFields.map((field) => (
                    <div className="cms-field" key={field.key}>
                      <Label htmlFor={`field-${field.key}`}>
                        {field.label}
                      </Label>
                      <Textarea
                        id={`field-${field.key}`}
                        rows={10}
                        className="font-mono text-xs"
                        spellCheck={false}
                        value={fields[field.key]}
                        onChange={(e) => {
                          setFields({ ...fields, [field.key]: e.target.value });
                          change();
                        }}
                      />
                      <p>
                        {field.help ||
                          "Preserve the existing structure when editing this data."}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          )}
          <TabsContent value="preview">
            <Card>
              <CardContent>
                <RecordPreview record={previewRecord} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
      <AlertDialog
        open={!!pendingHref}
        onOpenChange={(open) => {
          if (!open) setPendingHref(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave without saving?</AlertDialogTitle>
            <AlertDialogDescription>
              Your latest edits have not been saved as a local draft.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep editing</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                const target = pendingHref;
                setPendingHref(null);
                setDirty(false);
                if (target) router.push(target);
              }}
            >
              Discard edits and leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
