import { NextRequest } from "next/server";
import { body, created, error, list } from "@/lib/api/response";
import { requireEditor } from "@/lib/auth/guards";
import { createContent, isContentKind, listContent, validateContent } from "@/lib/api/content";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const rawKind = params.get("kind");
  if (rawKind && !isContentKind(rawKind)) return error(400, "INVALID_KIND", "Unknown content kind.");
  const kind = rawKind && isContentKind(rawKind) ? rawKind : undefined;
  const result = await listContent(kind, { page: Number(params.get("page")) || 1, limit: Number(params.get("limit")) || 20, query: params.get("q") || undefined, status: params.get("status") || "PUBLISHED" });
  return list(result.data, result.meta);
}

export async function POST(request: NextRequest) {
  const user = await requireEditor(request); if (user instanceof Response) return user;
  const input = await body(request); if (!input || typeof input.kind !== "string" || !isContentKind(input.kind)) return error(422, "VALIDATION_ERROR", "A valid content kind is required.");
  const fields = validateContent(input); if (fields) return error(422, "VALIDATION_ERROR", "Fix the highlighted fields.", fields);
  return created(await createContent(input.kind, input, user.id));
}
