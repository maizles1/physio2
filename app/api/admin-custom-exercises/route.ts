import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/adminSessionGuard";
import { readCustomExercises, writeCustomExercises, type CustomExerciseEntry } from "@/lib/exercisesStorage";

/** GET: return current custom exercises (admin only). From Blob or file. */
export async function GET() {
  const denied = await requireAdminSession();
  if (denied) return denied;
  const exercises = await readCustomExercises();
  return NextResponse.json({ exercises });
}

/** POST: save custom exercises (admin only). Persists to Vercel Blob. */
export async function POST(request: Request) {
  const denied = await requireAdminSession();
  if (denied) return denied;
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
