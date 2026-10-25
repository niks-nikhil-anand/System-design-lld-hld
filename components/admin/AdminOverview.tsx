"use client";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FilePenLine,
  Files,
  FlaskConical,
  Layers3,
  Plus,
  Route,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ADMIN_SECTIONS, SECTION_CONFIG } from "@/lib/admin/config";
import { useAdminStore } from "./AdminStore";
import {
  PageHeading,
  LocalNotice,
  Stats,
  StatusBadge,
} from "./AdminPrimitives";

export function AdminOverview() {
  const { records, local, seeds } = useAdminStore();
  const resources = seeds.filter(
    (r) => !["blog", "playground"].includes(r.section),
  );
  const latest = [...seeds.filter((r) => r.section === "blog")]
    .sort((a, b) =>
      String(b.data.publishedAt).localeCompare(String(a.data.publishedAt)),
    )
    .slice(0, 3);
  return (
    <>
      <PageHeading
        eyebrow="YOUR WORKSPACE, AT A GLANCE"
        title="Dashboard overview"
        description="A clear view of everything you’re helping people learn."
      >
        <Button
          render={<Link href="/admin/concepts/new" />}
          nativeButton={false}
        >
          <Plus />
          Create a concept
        </Button>
      </PageHeading>
      <LocalNotice />
      <Stats
        items={[
          {
            label: "Learning resources",
            value: resources.length,
            note: "Across the published learning library",
            icon: <Files size={18} />,
          },
          {
            label: "Learning paths",
            value: seeds.filter((r) => r.section === "learning-paths").length,
            note: "Curated, step-by-step journeys",
            icon: <Route size={18} />,
          },
          {
            label: "Blog articles",
            value: latest.length
              ? seeds.filter((r) => r.section === "blog").length
              : 0,
            note: "Ideas from the engineering desk",
            icon: <BookOpen size={18} />,
          },
          {
            label: "Local drafts",
            value: local.filter((r) => r.status === "Local draft").length,
            note: "Work in progress in this browser",
            icon: <FilePenLine size={18} />,
          },
        ]}
      />
      <div className="cms-overview-grid">
        <Card>
          <CardHeader>
            <CardTitle>Manage your learning library</CardTitle>
            <CardDescription>
              A dedicated space for every building block.
            </CardDescription>
          </CardHeader>
          <CardContent className="cms-library-grid">
            {ADMIN_SECTIONS.map((section) => (
              <Link
                key={section}
                href={`/admin/${section}`}
                className="cms-library-tile"
              >
                <span className="cms-tile-icon">
                  {section === "playground" ? (
                    <FlaskConical size={20} />
                  ) : section === "learning-paths" ? (
                    <Route size={20} />
                  ) : (
                    <Layers3 size={20} />
                  )}
                </span>
                <strong>{SECTION_CONFIG[section].title}</strong>
                <span>
                  {
                    records.filter(
                      (r) => r.section === section && r.status !== "Archived",
                    ).length
                  }{" "}
                  resources
                </span>
                <ArrowRight className="cms-tile-arrow" size={16} />
              </Link>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Continue your work</CardTitle>
            <CardDescription>
              Your most recently saved local drafts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {local.filter((r) => r.status === "Local draft").length ? (
              <div className="cms-draft-list">
                {[...local]
                  .filter((r) => r.status === "Local draft")
                  .sort((a, b) =>
                    (b.updatedAt || "").localeCompare(a.updatedAt || ""),
                  )
                  .slice(0, 5)
                  .map((r) => (
                    <Link
                      href={`/admin/${r.section}/${r.slug}/edit`}
                      key={`${r.section}:${r.slug}`}
                    >
                      <FilePenLine size={18} />
                      <div>
                        <strong>{r.title}</strong>
                        <span>{SECTION_CONFIG[r.section].title}</span>
                      </div>
                      <ArrowRight size={16} />
                    </Link>
                  ))}
              </div>
            ) : (
              <div className="cms-draft-empty">
                <span className="workspace-icon">
                  <FilePenLine size={24} />
                </span>
                <h2>Room for your next idea.</h2>
                <p>
                  Create a resource or edit an existing one to start a local
                  draft.
                </p>
                <Button
                  variant="outline"
                  render={<Link href="/admin/blog/new" />}
                  nativeButton={false}
                >
                  Write an article <ArrowRight />
                </Button>
              </div>
            )}
            <div className="cms-overview-tip">
              <strong>Make the connections.</strong>
              <p>
                Build learning paths from existing concepts, algorithms, and
                case studies.
              </p>
              <Link href="/admin/learning-paths">
                Manage learning paths <ArrowRight size={14} />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader className="cms-card-heading">
          <div>
            <CardTitle>From the engineering desk</CardTitle>
            <CardDescription>
              The latest articles in your collection.
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            render={<Link href="/admin/blog" />}
            nativeButton={false}
          >
            Manage articles <ArrowRight />
          </Button>
        </CardHeader>
        <CardContent className="cms-editorial-grid">
          {latest.map((post) => (
            <Link
              href={`/admin/blog/${post.slug}/edit`}
              key={post.slug}
              className="cms-editorial-card"
            >
              <span className="workspace-eyebrow">{post.category}</span>
              <h2>{post.title}</h2>
              <div>
                <StatusBadge status={post.status} />
                <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
