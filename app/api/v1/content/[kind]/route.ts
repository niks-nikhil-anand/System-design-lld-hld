import { NextRequest } from "next/server";
import { body, created, error, list } from "@/lib/api/response";
import { requireEditor } from "@/lib/auth/guards";
import { createContent, isContentKind, listContent, validateContent } from "@/lib/api/content";

export async function GET(request: NextRequest, ctx: RouteContext<"/api/v1/content/[kind]">) {
  const { kind } = await ctx.params; if (!isContentKind(kind)) return error(404, "NOT_FOUND", "Content kind was not found.");
  const params = request.nextUrl.searchParams;
  const result = await listContent(kind, { page: Number(params.get("page")) || 1, limit: Number(params.get("limit")) || 20, query: params.get("q") || undefined, status: params.get("status") || "PUBLISHED" });
  return list(result.data, result.meta);
}

export async function POST(request: NextRequest, ctx: RouteContext<"/api/v1/content/[kind]">) {
  const user = await requireEditor(request); if (user instanceof Response) return user;
  const { kind } = await ctx.params; if (!isContentKind(kind)) return error(404, "NOT_FOUND", "Content kind was not found.");
  const input = await body(request); if (!input) return error(400, "INVALID_BODY", "Send a JSON object.");
  const fields = validateContent(input); if (fields) return error(422, "VALIDATION_ERROR", "Fix the highlighted fields.", fields);
  return created(await createContent(kind, input, user.id));
}
