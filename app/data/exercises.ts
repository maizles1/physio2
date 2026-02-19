export type Category = "Neck" | "Back" | "Shoulder" | "Core" | "Hip" | "Knee" | "Ankle" | "Advanced";

export interface Exercise {
  id: string;
  title: string;
  category: Category;
  youtubeId: string;
  instructions: string;
}

/** סדר הקטגוריות בתצוגה */
export const CATEGORY_ORDER: Category[] = [
  "Neck",
  "Shoulder",
  "Back",
  "Core",
  "Hip",
  "Knee",
  "Ankle",
  "Advanced",
];

/** תרגום קטגוריה לתצוגה בעברית */
export const CATEGORY_LABELS: Record<Category, string> = {
  Neck: "צוואר",
  Back: "גב",
  Shoulder: "כתף",
  Core: "ליבה",
  Hip: "ירך",
  Knee: "ברך",
  Ankle: "קרסול",
  Advanced: "מתקדם",
};

export const exercisesData: Exercise[] = [
  { id: "1", title: "גשר קלאסי (Bridging)", category: "Core", youtubeId: "", instructions: "בשכיבה על הגב עם ברכיים כפופות, הרם אגן כלפי מעלה וכווץ ישבנים בסוף התנועה." },
  { id: "2", title: "גשר על רגל אחת", category: "Core", youtubeId: "", instructions: "יישר רגל אחת באוויר, ודחוף את האגן למעלה בעזרת הרגל שעל המזרן." },
  { id: "3", title: "הטיות אגן (Pelvic Tilts)", category: "Core", youtubeId: "", instructions: "הצמד את הגב התחתון למזרן על ידי כיווץ שרירי הבטן התחתונה." },
  { id: "4", title: "הרמת רגל ישרה (SLR)", category: "Hip", youtubeId: "", instructions: "כווץ את הארבע ראשי והרם רגל ישרה עד לגובה הברך השנייה (הכפופה)." },
  { id: "5", title: "חרק מת (Deadbug)", category: "Core", youtubeId: "", instructions: "שמור על גב צמוד למזרן ונתק יד ורגל נגדית במקביל." },
  { id: "6", title: "החלקת עקב (Heel Slides)", category: "Knee", youtubeId: "", instructions: "החלק את העקב על המזרן לכיוון הישבן ויישר חזרה באיטיות." },
  { id: "7", title: "מתיחת פיריפורמיס (Figure 4)", category: "Hip", youtubeId: "", instructions: "הנח קרסול על ברך נגדית ומשוך את הירך לכיוון החזה." },
  { id: "8", title: "מתיחת המסטרינג עם גומייה", category: "Knee", youtubeId: "", instructions: "עטוף את כף הרגל בגומייה ויישר את הרגל כלפי התקרה." },
  { id: "9", title: "רוטציות מותניות", category: "Back", youtubeId: "", instructions: "ברכיים כפופות וצמודות, הפל אותן בעדינות מצד לצד." },
  { id: "10", title: "כפיפת בטן מקגיל", category: "Core", youtubeId: "", instructions: "ידיים תחת הגב התחתון, רגל אחת כפופה, נתק קלות את הראש והשכמות." },
  { id: "11", title: "כיווץ סנטר בשכיבה", category: "Neck", youtubeId: "", instructions: "דחוף את הסנטר לאחור כלפי התקרה, שמור 5 שניות. חזור 10 פעמים." },
];

export interface Dosage {
  sets: number;
  reps: number;
  perDay: number;
  perWeek: number;
}

export const DEFAULT_DOSAGE: Dosage = {
  sets: 3,
  reps: 10,
  perDay: 1,
  perWeek: 7,
};

/** Parse ?p= string: "id:sets:reps:perDay:perWeek,id2:..." */
export function parsePrescriptionParam(p: string): { id: string; dosage: Dosage }[] {
  if (!p?.trim()) return [];
  const items: { id: string; dosage: Dosage }[] = [];
  for (const segment of p.split(",").map((s) => s.trim()).filter(Boolean)) {
    const parts = segment.split(":");
    if (parts.length < 5) continue;
    const [id, sets, reps, perDay, perWeek] = parts;
    const num = (s: string) => Math.max(0, parseInt(s, 10) || 0);
    items.push({
      id: id!.trim(),
      dosage: {
        sets: num(sets!),
        reps: num(reps!),
        perDay: num(perDay!),
        perWeek: num(perWeek!),
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
    .map(({ id, dosage }) =>
      [id, dosage.sets, dosage.reps, dosage.perDay, dosage.perWeek].join(":")
    )
    .join(",");
}

export function getExercisesByIds(ids: string[]): Exercise[] {
  const set = new Set(ids);
  return exercisesData.filter((e) => set.has(e.id));
}

export function getExerciseById(id: string): Exercise | undefined {
  return exercisesData.find((e) => e.id === id);
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
