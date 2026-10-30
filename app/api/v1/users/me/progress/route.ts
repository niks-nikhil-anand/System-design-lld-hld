import { NextRequest } from "next/server";
import { body, created, error, list } from "@/lib/api/response";
import { requireUser } from "@/lib/auth/guards";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const user = await requireUser(request); if (user instanceof Response) return user;
  const page = Math.max(1, Number(request.nextUrl.searchParams.get("page")) || 1); const limit = Math.min(100, Math.max(1, Number(request.nextUrl.searchParams.get("limit")) || 20)); const where = { userId: user.id };
  const [data, total] = await prisma.$transaction([prisma.contentProgress.findMany({ where, include: { content: true }, orderBy: { updatedAt: "desc" }, skip: (page - 1) * limit, take: limit }), prisma.contentProgress.count({ where })]); return list(data, { page, limit, total });
}
export async function POST(request: NextRequest) {
  const user = await requireUser(request); if (user instanceof Response) return user; const input = await body(request); const contentId = typeof input?.contentId === "string" ? input.contentId : ""; const percent = typeof input?.percent === "number" ? Math.min(100, Math.max(0, Math.round(input.percent))) : 0;
  if (!contentId) return error(422, "VALIDATION_ERROR", "contentId is required.");
  const progress = await prisma.contentProgress.upsert({ where: { userId_contentId: { userId: user.id, contentId } }, create: { userId: user.id, contentId, percent, startedAt: new Date(), ...(percent === 100 ? { completedAt: new Date() } : {}) }, update: { percent, ...(percent === 100 ? { completedAt: new Date() } : {}) }, include: { content: true } }); return created(progress);
}
