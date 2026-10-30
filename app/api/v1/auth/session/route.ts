import { NextRequest } from "next/server";
import { ok } from "@/lib/api/response";
import { getCurrentUser } from "@/lib/auth/session";

export async function GET(request: NextRequest) {
  const user = await getCurrentUser(request);
  return ok(user ? { id: user.id, email: user.email, name: user.name, role: user.role } : null);
}
