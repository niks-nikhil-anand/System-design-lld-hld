import { NextRequest } from "next/server";
import { ok } from "@/lib/api/response";
import { requireUser } from "@/lib/auth/guards";

export async function GET(request: NextRequest) {
  const user = await requireUser(request); if (user instanceof Response) return user;
  return ok({ id: user.id, email: user.email, name: user.name, image: user.image, role: user.role, createdAt: user.createdAt });
}
