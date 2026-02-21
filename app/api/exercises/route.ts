import { NextResponse } from "next/server";
import { readCustomExercises } from "@/lib/exercisesStorage";
import { exercisesData, CATEGORY_ORDER, type Category, type Exercise } from "@/app/data/exercises";

function toExercise(entry: { id: string; category: string; title: string; youtubeId: string }): Exercise {
  return {
    id: entry.id,
    title: entry.title.trim() || "תרגיל",
    category: entry.category as Category,
    youtubeId: typeof entry.youtubeId === "string" ? entry.youtubeId.trim() : "",
    instructions: "",
  };
}

/** GET: all exercises (predefined + custom from Blob/file). Public for builder and plan. */
export async function GET() {
  const custom = await readCustomExercises();
  const customExercises = custom
    .filter((e) => e && typeof e.category === "string" && CATEGORY_ORDER.includes(e.category as Category))
    .map(toExercise);
  const exercises: Exercise[] = [...exercisesData, ...customExercises];
  return NextResponse.json({ exercises });
}
