import { NextRequest } from "next/server";
import { body, error, ok } from "@/lib/api/response";
import { requireAdmin, requireEditor } from "@/lib/auth/guards";
import { getCurrentUser } from "@/lib/auth/session";
import { archiveContent, findContent, isContentKind, replaceContent, validateContent } from "@/lib/api/content";

export async function GET(request: NextRequest, ctx: RouteContext<"/api/v1/content/[kind]/[slug]">) {
  const { kind, slug } = await ctx.params; if (!isContentKind(kind)) return error(404, "NOT_FOUND", "Content kind was not found.");
  const content = await findContent(kind, slug); if (!content) return error(404, "NOT_FOUND", "Content was not found.");
  const user = await getCurrentUser(request);
  if (content.status !== "PUBLISHED" && (!user || (user.role !== "EDITOR" && user.role !== "ADMIN"))) return error(404, "NOT_FOUND", "Content was not found.");
  return ok(content);
}

export async function PUT(request: NextRequest, ctx: RouteContext<"/api/v1/content/[kind]/[slug]">) {
  const user = await requireEditor(request); if (user instanceof Response) return user;
  const { kind, slug } = await ctx.params; if (!isContentKind(kind)) return error(404, "NOT_FOUND", "Content kind was not found.");
  const input = await body(request); if (!input) return error(400, "INVALID_BODY", "Send a JSON object.");
  const fields = validateContent(input); if (fields) return error(422, "VALIDATION_ERROR", "Fix the highlighted fields.", fields);
  const content = await replaceContent(kind, slug, input, user.id); return content ? ok(content) : error(404, "NOT_FOUND", "Content was not found.");
}

export async function DELETE(request: NextRequest, ctx: RouteContext<"/api/v1/content/[kind]/[slug]">) {
  const user = await requireAdmin(request); if (user instanceof Response) return user;
  const { kind, slug } = await ctx.params; if (!isContentKind(kind)) return error(404, "NOT_FOUND", "Content kind was not found.");
  try { return ok(await archiveContent(kind, slug)); } catch { return error(404, "NOT_FOUND", "Content was not found."); }
}
