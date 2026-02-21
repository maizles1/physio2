import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, getAdminSessionToken } from "@/lib/adminAuth";

function getYoutubeIdsFromFile(): Record<string, string> {
  try {
    const path = join(process.cwd(), "app", "data", "youtube-ids.json");
    const raw = readFileSync(path, "utf-8");
    const data = JSON.parse(raw);
    return typeof data === "object" && data !== null ? (data as Record<string, string>) : {};
  } catch {
    return {};
  }
}

/** GET: return current youtube-ids.json (admin only). */
export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const token = getAdminSessionToken();
  if (!sessionCookie || sessionCookie !== token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = getYoutubeIdsFromFile();
  return NextResponse.json(data);
}
