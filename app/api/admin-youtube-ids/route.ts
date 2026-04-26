import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { requireAdminSession } from "@/lib/adminSessionGuard";

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
  const denied = await requireAdminSession();
  if (denied) return denied;
  const data = getYoutubeIdsFromFile();
  return NextResponse.json(data);
}
