"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Archive,
  ArrowDownAZ,
  ArrowUpAZ,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  FilePenLine,
  Files,
  MoreHorizontal,
  Plus,
  RotateCcw,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  AdminSection,
  AdminRecord,
  SECTION_CONFIG,
  summarizeRecord,
} from "@/lib/admin/config";
import { useAdminStore } from "./AdminStore";
import {
  PageHeading,
  LocalNotice,
  Stats,
  StatusBadge,
  FilterSelect,
  EmptyState,
} from "./AdminPrimitives";
import { RecordPreview, exportRecord } from "./RecordPreview";

export function AdminCollection({ section }: { section: AdminSection }) {
  const config = SECTION_CONFIG[section];
  const { records, save, restore, local, seeds } = useAdminStore();
  const router = useRouter();
  const all = records.filter((r) => r.section === section);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [status, setStatus] = useState("all");
  const [ascending, setAscending] = useState(true);
  const [page, setPage] = useState(0);
  const [preview, setPreview] = useState<AdminRecord | null>(null);
  const [archive, setArchive] = useState<AdminRecord | null>(null);
  const [discard, setDiscard] = useState<AdminRecord | null>(null);
  const [message, setMessage] = useState("");
  const categories = [
    ...new Set(all.map((r) => r.category).filter(Boolean)),
  ].sort();
  const levels = [...new Set(all.map((r) => r.difficulty).filter(Boolean))];
  const filtered = all
    .filter(
      (r) =>
        `${r.title} ${r.description} ${r.category}`
          .toLowerCase()
          .includes(query.trim().toLowerCase()) &&
        (category === "all" || r.category === category) &&
        (difficulty === "all" || r.difficulty === difficulty) &&
        (status === "all" || r.status === status),
    )
    .sort((a, b) => (ascending ? 1 : -1) * a.title.localeCompare(b.title));
  const pages = Math.max(1, Math.ceil(filtered.length / 8));
  const currentPage = Math.min(page, pages - 1);
  const visible = filtered.slice(currentPage * 8, currentPage * 8 + 8);
  function reset() {
    setQuery("");
    setCategory("all");
    setDifficulty("all");
    setStatus("all");
    setPage(0);
  }
  function duplicate(record: AdminRecord) {
    let slug = `${record.slug}-copy`;
    let suffix = 2;
    while (records.some((r) => r.section === section && r.slug === slug))
      slug = `${record.slug}-copy-${suffix++}`;
    try {
      save(
        summarizeRecord({
          ...record,
          slug,
          title: `${record.title} (copy)`,
          status: "Local draft",
          publicHref: undefined,
          data: {
            ...record.data,
            ...(section === "blog"
              ? { id: slug, title: `${record.title} (copy)` }
              : section === "playground"
                ? { name: `${record.title} (copy)` }
                : { slug, title: `${record.title} (copy)` }),
          },
        }),
      );
      router.push(`/admin/${section}/${slug}/edit`);
    } catch (error) {
      setMessage((error as Error).message);
    }
  }
  function archiveRecord() {
    if (!archive) return;
    try {
      save({ ...archive, status: "Archived" });
      setMessage(
        `“${archive.title}” archived in this browser. The live website is unchanged.`,
      );
      setArchive(null);
    } catch (error) {
      setMessage((error as Error).message);
    }
  }
  return (
    <>
      <PageHeading title={config.title} description={config.description}>
        <Button
          render={<Link href={`/admin/${section}/new`} />}
          nativeButton={false}
        >
          <Plus />
          Create {config.singular}
        </Button>
      </PageHeading>
      <LocalNotice />
      <Stats
        items={[
          {
            label: "Total resources",
            value: all.length,
            note: `In your ${config.title.toLowerCase()} collection`,
            icon: <Files size={18} />,
          },
          {
            label: "On the website",
            value: seeds.filter((r) => r.section === section).length,
            note: "From the current site catalog",
            icon: <BookOpen size={18} />,
          },
          {
            label: "Local drafts",
            value: all.filter((r) => r.status === "Local draft").length,
            note: "Saved only in this browser",
            icon: <FilePenLine size={18} />,
          },
          {
            label: "Locally archived",
            value: all.filter((r) => r.status === "Archived").length,
            note: "Can be restored at any time",
            icon: <Archive size={18} />,
          },
        ]}
      />
      {message && (
        <div className="cms-feedback" role="status">
          <Check size={16} />
          <p>{message}</p>
          <Button variant="ghost" onClick={() => setMessage("")}>
            Dismiss
          </Button>
        </div>
      )}
      <Card className="cms-collection">
        <CardHeader className="cms-card-heading">
          <div>
            <CardTitle>{config.title} collection</CardTitle>
            <CardDescription>
              Find, review, and organize your {config.title.toLowerCase()}.
            </CardDescription>
          </div>
          <span className="cms-count">{all.length} resources</span>
        </CardHeader>
        <CardContent>
          <div className="cms-toolbar">
            <div className="cms-search">
              <Search size={17} />
              <Input
                aria-label={`Search ${config.title.toLowerCase()}`}
                placeholder={`Search ${config.title.toLowerCase()}…`}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(0);
                }}
              />
            </div>
            <FilterSelect
              label="Filter by category"
              value={category}
              onChange={(v) => {
                setCategory(v);
                setPage(0);
              }}
              options={[
                { value: "all", label: "All categories" },
                ...categories.map((c) => ({ value: c, label: c })),
              ]}
            />
            {levels.length > 0 && (
              <FilterSelect
                label="Filter by difficulty"
                value={difficulty}
                onChange={(v) => {
                  setDifficulty(v);
                  setPage(0);
                }}
                options={[
                  { value: "all", label: "All levels" },
                  ...levels.map((v) => ({ value: v, label: v })),
                ]}
              />
            )}
            <FilterSelect
              label="Filter by status"
              value={status}
              onChange={(v) => {
                setStatus(v);
                setPage(0);
              }}
              options={[
                { value: "all", label: "All statuses" },
                ...["Published", "Local draft", "Archived"].map((v) => ({
                  value: v,
                  label: v,
                })),
              ]}
            />
          </div>
          <Table aria-label={`${config.title} resources`}>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setAscending(!ascending);
                      setPage(0);
                    }}
                    aria-label={`Sort titles ${ascending ? "descending" : "ascending"}`}
                  >
                    Resource {ascending ? <ArrowDownAZ /> : <ArrowUpAZ />}
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                {levels.length > 0 && <TableHead>Level</TableHead>}
                <TableHead>{config.metric}</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.map((record) => (
                <TableRow key={record.slug}>
                  <TableCell>
                    <div className="cms-resource-cell">
                      <span className="cms-resource-mark">
                        <BookOpen size={18} />
                      </span>
                      <div>
                        <Link href={`/admin/${section}/${record.slug}/edit`}>
                          {record.title}
                        </Link>
                        <p>{record.category}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={record.status} />
                  </TableCell>
                  {levels.length > 0 && (
                    <TableCell>
                      <span className="cms-level">
                        {record.difficulty || "—"}
                      </span>
                    </TableCell>
                  )}
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {record.metric}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Actions for ${record.title}`}
                          />
                        }
                      >
                        <MoreHorizontal />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(`/admin/${section}/${record.slug}/edit`)
                          }
                        >
                          <FilePenLine />
                          Edit {config.singular}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setPreview(record)}>
                          <BookOpen />
                          Preview content
                        </DropdownMenuItem>
                        {record.publicHref && (
                          <DropdownMenuItem
                            onClick={() => router.push(record.publicHref!)}
                          >
                            <ExternalLink />
                            View published version
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => duplicate(record)}>
                          <Copy />
                          Duplicate as local draft
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => exportRecord(record)}>
                          <Download />
                          Export JSON
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {local.some(
                          (r) =>
                            r.section === section && r.slug === record.slug,
                        ) && (
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => setDiscard(record)}
                          >
                            <RotateCcw />
                            Discard local changes
                          </DropdownMenuItem>
                        )}
                        {record.status === "Archived" ? (
                          <DropdownMenuItem
                            onClick={() => {
                              try {
                                save({ ...record, status: "Local draft" });
                                setMessage("Restored as a local draft.");
                              } catch (error) {
                                setMessage((error as Error).message);
                              }
                            }}
                          >
                            <RotateCcw />
                            Restore local draft
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => setArchive(record)}
                          >
                            <Archive />
                            Archive locally
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {visible.length === 0 && <EmptyState onReset={reset} />}
          <div className="cms-pagination">
            <p role="status">
              {filtered.length
                ? `${currentPage * 8 + 1}–${Math.min(currentPage * 8 + 8, filtered.length)} of ${filtered.length} resources`
                : "0 resources"}
            </p>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                aria-label="Previous page"
                disabled={currentPage === 0}
                onClick={() => setPage(currentPage - 1)}
              >
                <ChevronLeft />
              </Button>
              <span>
                Page {currentPage + 1} of {pages}
              </span>
              <Button
                variant="outline"
                size="icon"
                aria-label="Next page"
                disabled={currentPage + 1 >= pages}
                onClick={() => setPage(currentPage + 1)}
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Sheet
        open={!!preview}
        onOpenChange={(open) => {
          if (!open) setPreview(null);
        }}
      >
        <SheetContent className="cms-preview-sheet sm:max-w-2xl">
          <SheetHeader>
            <SheetTitle>Content preview</SheetTitle>
            <SheetDescription>Review the selected resource.</SheetDescription>
          </SheetHeader>
          {preview && (
            <div className="cms-sheet-scroll">
              <RecordPreview record={preview} />
            </div>
          )}
        </SheetContent>
      </Sheet>
      <AlertDialog
        open={!!discard}
        onOpenChange={(open) => {
          if (!open) setDiscard(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard local changes?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes the browser’s local copy of “{discard?.title}”. If
              this resource exists on the website, its original catalog version
              will appear again. Export JSON first if you want to keep your
              edits.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep local changes</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (!discard) return;
                try {
                  restore(discard);
                  setDiscard(null);
                  setMessage("Local changes discarded from this browser.");
                } catch (error) {
                  setMessage((error as Error).message);
                }
              }}
            >
              Discard local changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog
        open={!!archive}
        onOpenChange={(open) => {
          if (!open) setArchive(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive this resource locally?</AlertDialogTitle>
            <AlertDialogDescription>
              “{archive?.title}” will be marked archived in this browser. Its
              published version stays available. You can restore the draft
              later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={archiveRecord}>
              Archive locally
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
