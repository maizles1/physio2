import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, getAdminSessionToken } from "@/lib/adminAuth";

interface CustomExercisesFile {
  exercises: { id: string; category: string; title: string; youtubeId: string }[];
}

function getCustomExercisesFromFile(): CustomExercisesFile {
  try {
    const path = join(process.cwd(), "app", "data", "custom-exercises.json");
    const raw = readFileSync(path, "utf-8");
    const data = JSON.parse(raw);
    if (typeof data === "object" && data !== null && Array.isArray(data.exercises)) {
      return { exercises: data.exercises };
    }
  } catch {
    // ignore
  }
  return { exercises: [] };
}

/** GET: return current custom-exercises.json (admin only). */
export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const token = getAdminSessionToken();
  if (!sessionCookie || sessionCookie !== token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = getCustomExercisesFromFile();
  return NextResponse.json(data);
}
