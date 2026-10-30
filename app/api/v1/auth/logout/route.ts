import { NextRequest, NextResponse } from "next/server";
import { clearSessionCookie, destroyCurrentSession } from "@/lib/auth/session";

export async function POST(request: NextRequest) {
  await destroyCurrentSession(request);
  return clearSessionCookie(NextResponse.json({ data: { loggedOut: true } }));
}
