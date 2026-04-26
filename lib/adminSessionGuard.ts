import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, getAdminSessionToken } from "@/lib/adminAuth";

/** Returns null if the request is authenticated as admin; otherwise a JSON error response. */
export async function requireAdminSession(): Promise<NextResponse | null> {
  let token: string;
  try {
    token = getAdminSessionToken();
  } catch {
    return NextResponse.json({ error: "Admin not configured" }, { status: 503 });
  }
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!sessionCookie || sessionCookie !== token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
