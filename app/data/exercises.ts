import youtubeOverridesData from "./youtube-ids.json";
import customExercisesData from "./custom-exercises.json";

export type Category =
  | "Neck"
  | "Shoulder"
  | "Elbow"
  | "Wrist"
  | "UpperBack"
  | "LowerBack"
  | "Hip"
  | "Knee"
  | "Ankle"
  | "Foot"
  | "Vestibular"
  | "Core"
  | "Advanced";

export interface Exercise {
  id: string;
  title: string;
  category: Category;
  youtubeId: string;
  instructions: string;
}

/** סדר הקטגוריות בתצוגה – 10 איזורי גוף + תרגול וסטיבולארי */
export const CATEGORY_ORDER: Category[] = [
  "Neck",       // צוואר
  "Shoulder",   // כתף
  "Elbow",      // מרפק
  "Wrist",      // שורש כף יד
  "UpperBack",  // גב עליון
  "LowerBack",  // גב תחתון
  "Hip",        // ירך
  "Knee",       // ברך
  "Ankle",      // קרסול
  "Foot",       // כף רגל
  "Vestibular", // תרגול וסטיבולארי
  "Core",       // ליבה
  "Advanced",   // מתקדם
];

/** תרגום קטגוריה לתצוגה בעברית */
export const CATEGORY_LABELS: Record<Category, string> = {
  Neck: "צוואר",
  Shoulder: "כתף",
  Elbow: "מרפק",
  Wrist: "שורש כף יד",
  UpperBack: "גב עליון",
  LowerBack: "גב תחתון",
  Hip: "ירך",
  Knee: "ברך",
  Ankle: "קרסול",
  Foot: "כף רגל",
  Vestibular: "תרגול וסטיבולארי",
  Core: "ליבה",
  Advanced: "מתקדם",
};

export const exercisesData: Exercise[] = [];

const youtubeOverrides: Record<string, string> =
  typeof youtubeOverridesData === "object" && youtubeOverridesData !== null
    ? (youtubeOverridesData as Record<string, string>)
    : {};

export interface CustomExerciseData {
  exercises: { id: string; category: string; title: string; youtubeId: string }[];
}

const customExercisesRaw =
  typeof customExercisesData === "object" &&
  customExercisesData !== null &&
  "exercises" in customExercisesData &&
  Array.isArray((customExercisesData as CustomExerciseData).exercises)
    ? (customExercisesData as CustomExerciseData).exercises
    : [];

const customExercises: Exercise[] = customExercisesRaw
  .filter(
    (e) =>
      e &&
      typeof e.id === "string" &&
      typeof e.category === "string" &&
      CATEGORY_ORDER.includes(e.category as Category)
  )
  .map((e) => ({
    id: e.id,
    title: e.title.trim() || "תרגיל",
    category: e.category as Category,
    youtubeId: typeof e.youtubeId === "string" ? e.youtubeId.trim() : "",
    instructions: "",
  }));

export interface Dosage {
  sets: number;
  reps: number;
  perDay: number;
  perWeek: number;
  note: string;
}

export const DEFAULT_DOSAGE: Dosage = {
  sets: 3,
  reps: 10,
  perDay: 1,
  perWeek: 7,
  note: "",
};

/** Parse ?p= string: "id:sets:reps:perDay:perWeek,id2:..." */
export function parsePrescriptionParam(p: string): { id: string; dosage: Dosage }[] {
  if (!p?.trim()) return [];
  const items: { id: string; dosage: Dosage }[] = [];
  for (const segment of p.split(",").map((s) => s.trim()).filter(Boolean)) {
    const parts = segment.split(":");
    if (parts.length < 5) continue;
    const [id, sets, reps, perDay, perWeek] = parts;
    const noteEncoded = parts.slice(5).join(":");
    let note = "";
    if (noteEncoded) {
      try {
        note = decodeURIComponent(noteEncoded);
      } catch {
        note = "";
      }
    }
    const num = (s: string) => Math.max(0, parseInt(s, 10) || 0);
    items.push({
      id: id!.trim(),
      dosage: {
        sets: num(sets!),
        reps: num(reps!),
        perDay: num(perDay!),
        perWeek: num(perWeek!),
        note,
      },
    });
  }
  return items;
}

/** Build URL-safe ?p= string from selected exercises and dosages */
export function buildPrescriptionParam(
  items: { id: string; dosage: Dosage }[]
): string {
  return items
    .map(({ id, dosage }) => {
      const base = [id, dosage.sets, dosage.reps, dosage.perDay, dosage.perWeek];
      const note = dosage.note.trim();
      if (!note) return base.join(":");
      return [...base, encodeURIComponent(note)].join(":");
    })
    .join(",");
}

/** All exercises (predefined + custom) for a category. */
export function getExercisesByCategory(category: Category): Exercise[] {
  const fromData = exercisesData.filter((e) => e.category === category);
  const fromCustom = customExercises.filter((e) => e.category === category);
  return [...fromData, ...fromCustom];
}

/** All exercises (predefined + custom). */
export function getAllExercises(): Exercise[] {
  return [...exercisesData, ...customExercises];
}

export function getExercisesByIds(ids: string[]): Exercise[] {
  const set = new Set(ids);
  return ids
    .map((id) => getExerciseById(id))
    .filter((ex): ex is Exercise => ex != null);
}

export function getExerciseById(id: string): Exercise | undefined {
  const custom = customExercises.find((e) => e.id === id);
  if (custom) return custom;
  const exercise = exercisesData.find((e) => e.id === id);
  if (!exercise) return undefined;
  const overrideId = youtubeOverrides[id];
  return {
    ...exercise,
    youtubeId: overrideId !== undefined && overrideId !== "" ? overrideId : exercise.youtubeId,
  };
}

/** מחזיר תרגילים מקובצים לפי קטגוריה, עם כותרת בעברית */
export function groupExercisesByCategory(
  exercises: Exercise[]
): { category: Category; categoryLabel: string; exercises: Exercise[] }[] {
  const map = new Map<Category, Exercise[]>();
  for (const cat of CATEGORY_ORDER) {
    map.set(cat, []);
  }
  for (const ex of exercises) {
    const list = map.get(ex.category) ?? [];
    list.push(ex);
    map.set(ex.category, list);
  }
  return CATEGORY_ORDER.map((category) => ({
    category,
    categoryLabel: CATEGORY_LABELS[category],
    exercises: map.get(category) ?? [],
  })).filter((g) => g.exercises.length > 0);
}
