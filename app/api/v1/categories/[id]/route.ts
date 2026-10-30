import { NextRequest } from "next/server";
import { body, error, ok } from "@/lib/api/response";
import { requireAdmin } from "@/lib/auth/guards";
import { prisma } from "@/lib/prisma";

export async function GET(_request: NextRequest, ctx: RouteContext<"/api/v1/categories/[id]">) { const { id } = await ctx.params; const data = await prisma.category.findUnique({ where: { id } }); return data ? ok(data) : error(404, "NOT_FOUND", "Category was not found."); }
export async function PUT(request: NextRequest, ctx: RouteContext<"/api/v1/categories/[id]">) { const user = await requireAdmin(request); if (user instanceof Response) return user; const { id } = await ctx.params; const input = await body(request); if (!input) return error(400, "INVALID_BODY", "Send a JSON object."); try { return ok(await prisma.category.update({ where: { id }, data: { ...(typeof input.name === "string" ? { name: input.name.trim() } : {}), ...(typeof input.kind === "string" ? { kind: input.kind as any } : {}) } })); } catch { return error(404, "NOT_FOUND", "Category was not found."); } }
export async function DELETE(request: NextRequest, ctx: RouteContext<"/api/v1/categories/[id]">) { const user = await requireAdmin(request); if (user instanceof Response) return user; const { id } = await ctx.params; try { await prisma.category.delete({ where: { id } }); return ok({ id, deleted: true }); } catch { return error(404, "NOT_FOUND", "Category was not found."); } }
