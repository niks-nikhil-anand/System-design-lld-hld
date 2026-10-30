import { NextRequest } from "next/server";
import { body, created, error, list } from "@/lib/api/response";
import { requireAdmin } from "@/lib/auth/guards";
import { prisma } from "@/lib/prisma";

export async function GET() { const data = await prisma.tag.findMany({ orderBy: { name: "asc" } }); return list(data, { page: 1, limit: data.length, total: data.length }); }
export async function POST(request: NextRequest) { const user = await requireAdmin(request); if (user instanceof Response) return user; const input = await body(request); const name = typeof input?.name === "string" ? input.name.trim() : ""; const slug = typeof input?.slug === "string" ? input.slug.trim() : name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); if (!name || !slug) return error(422, "VALIDATION_ERROR", "Name and slug are required."); return created(await prisma.tag.create({ data: { name, slug } })); }
