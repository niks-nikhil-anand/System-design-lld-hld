import { NextRequest } from "next/server";
import { body, created, error, list } from "@/lib/api/response";
import { requireEditor } from "@/lib/auth/guards";
import { findContent, isContentKind } from "@/lib/api/content";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest, ctx: RouteContext<"/api/v1/content/[kind]/[slug]/revisions">) {
  const user = await requireEditor(request); if (user instanceof Response) return user;
  const { kind, slug } = await ctx.params; if (!isContentKind(kind)) return error(404, "NOT_FOUND", "Content kind was not found.");
  const content = await findContent(kind, slug); if (!content) return error(404, "NOT_FOUND", "Content was not found.");
  const data = await prisma.contentRevision.findMany({ where: { contentId: content.id }, include: { author: { select: { id: true, name: true, email: true } } }, orderBy: { version: "desc" } });
  return list(data, { page: 1, limit: data.length, total: data.length });
}

export async function POST(request: NextRequest, ctx: RouteContext<"/api/v1/content/[kind]/[slug]/revisions">) {
  const user = await requireEditor(request); if (user instanceof Response) return user;
  const { kind, slug } = await ctx.params; if (!isContentKind(kind)) return error(404, "NOT_FOUND", "Content kind was not found.");
  const input = await body(request); if (!input || !("snapshot" in input)) return error(422, "VALIDATION_ERROR", "A revision snapshot is required.");
  const content = await findContent(kind, slug); if (!content) return error(404, "NOT_FOUND", "Content was not found.");
  const count = await prisma.contentRevision.count({ where: { contentId: content.id } });
  return created(await prisma.contentRevision.create({ data: { contentId: content.id, authorId: user.id, version: count + 1, status: typeof input.status === "string" ? input.status as any : content.status, snapshot: input.snapshot as any, note: typeof input.note === "string" ? input.note : null } }));
}
