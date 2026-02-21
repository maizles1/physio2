import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, getAdminSessionToken } from "@/lib/adminAuth";
import { readCustomExercises, writeCustomExercises, type CustomExerciseEntry } from "@/lib/exercisesStorage";

/** GET: return current custom exercises (admin only). From Blob or file. */
export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const token = getAdminSessionToken();
  if (!sessionCookie || sessionCookie !== token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const exercises = await readCustomExercises();
  return NextResponse.json({ exercises });
}

/** POST: save custom exercises (admin only). Persists to Vercel Blob. */
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const token = getAdminSessionToken();
  if (!sessionCookie || sessionCookie !== token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: { exercises?: CustomExerciseEntry[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const exercises = Array.isArray(body?.exercises) ? body.exercises : [];
  const result = await writeCustomExercises(exercises);
  if (!result.ok) {
    return NextResponse.json({ error: result.error ?? "Save failed" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
