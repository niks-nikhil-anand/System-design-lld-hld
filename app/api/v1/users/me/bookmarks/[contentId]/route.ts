import { NextRequest } from "next/server";
import { error, ok } from "@/lib/api/response";
import { requireUser } from "@/lib/auth/guards";
import { prisma } from "@/lib/prisma";

export async function DELETE(request: NextRequest, ctx: RouteContext<"/api/v1/users/me/bookmarks/[contentId]">) {
  const user = await requireUser(request); if (user instanceof Response) return user; const { contentId } = await ctx.params;
  try { await prisma.bookmark.delete({ where: { userId_contentId: { userId: user.id, contentId } } }); return ok({ contentId, deleted: true }); } catch { return error(404, "NOT_FOUND", "Bookmark was not found."); }
}
