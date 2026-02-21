import { get, put, list } from "@vercel/blob";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const BLOB_PATHNAME = "data/custom-exercises.json";

export interface CustomExerciseEntry {
  id: string;
  category: string;
  title: string;
  youtubeId: string;
}

function readFromFile(): CustomExerciseEntry[] {
  try {
    const path = join(process.cwd(), "app", "data", "custom-exercises.json");
    const raw = readFileSync(path, "utf-8");
    const data = JSON.parse(raw);
    if (typeof data === "object" && data !== null && Array.isArray(data.exercises)) {
      return data.exercises;
    }
  } catch {
    // ignore
  }
  return [];
}

/** Read custom exercises from Vercel Blob, or from file if Blob not configured. */
export async function readCustomExercises(): Promise<CustomExerciseEntry[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return readFromFile();
  }
  try {
    const { blobs } = await list({ prefix: "data/" });
    const blob = blobs.find((b) => b.pathname === BLOB_PATHNAME);
    if (!blob) return readFromFile();
    const res = await get(blob.url, { access: "private" });
    if (!res || !res.body) return readFromFile();
    const text = await res.text();
    const data = JSON.parse(text);
    if (typeof data === "object" && data !== null && Array.isArray(data.exercises)) {
      return data.exercises;
    }
  } catch {
    return readFromFile();
  }
  return readFromFile();
}

const VERCEL_BLOB_INSTRUCTIONS =
  "באזור הניהול של Vercel: Storage → Create Database → Blob. אחרי יצירת ה-Blob לעשות Redeploy לפרויקט.";

/** Write custom exercises: Vercel Blob if token set, otherwise try writing to file (works locally). */
export async function writeCustomExercises(exercises: CustomExerciseEntry[]): Promise<{ ok: boolean; error?: string }> {
  const body = JSON.stringify({ exercises }, null, 2);

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      await put(BLOB_PATHNAME, body, {
        access: "private",
        contentType: "application/json",
        addRandomSuffix: false,
        allowOverwrite: true,
      });
      return { ok: true };
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error";
      return { ok: false, error: `שמירה ל-Blob נכשלה: ${message}` };
    }
  }

  if (process.env.VERCEL) {
    return {
      ok: false,
      error: `שמירה באתר (Vercel) דורשת Blob store. ${VERCEL_BLOB_INSTRUCTIONS}`,
    };
  }

  try {
    const dir = join(process.cwd(), "app", "data");
    const path = join(dir, "custom-exercises.json");
    try {
      mkdirSync(dir, { recursive: true });
    } catch {
      // dir may already exist
    }
    writeFileSync(path, body, "utf-8");
    return { ok: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return {
      ok: false,
      error: `לא ניתן לכתוב לקובץ: ${message}. ${VERCEL_BLOB_INSTRUCTIONS}`,
    };
  }
}
