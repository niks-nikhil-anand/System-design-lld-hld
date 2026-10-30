import { NextRequest } from "next/server";
import { body, created, error, list } from "@/lib/api/response";
import { requireAdmin } from "@/lib/auth/guards";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const kind = request.nextUrl.searchParams.get("kind");
  const data = await prisma.category.findMany({ where: kind ? { kind: kind as any } : undefined, orderBy: { name: "asc" } });
  return list(data, { page: 1, limit: data.length, total: data.length });
}
export async function POST(request: NextRequest) {
  const user = await requireAdmin(request); if (user instanceof Response) return user;
  const input = await body(request); if (!input || typeof input.name !== "string" || typeof input.kind !== "string") return error(422, "VALIDATION_ERROR", "Name and kind are required.");
  return created(await prisma.category.create({ data: { name: input.name.trim(), kind: input.kind as any } }));
}
