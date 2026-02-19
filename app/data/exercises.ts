export interface Exercise {
  id: number;
  title: string;
  category: string;
  youtubeId: string;
  instructions: string;
}

export const EXERCISES: Exercise[] = [
  {
    id: 1,
    title: "תרגיל חיזוק ברך – כיפוף ויישור",
    category: "Knee",
    youtubeId: "dQw4w9WgXcQ",
    instructions:
      "שבו על כיסא עם גב ישר. הרימו את הרגל באיטיות עד ליישור הברך, החזיקו 3 שניות והורידו. בצעו 10–15 חזרות לכל רגל, פעמיים ביום.",
  },
  {
    id: 2,
    title: "מתיחת גב תחתון בשכיבה",
    category: "Back",
    youtubeId: "jNQXAC9IVRw",
    instructions:
      "שכבו על הגב, כופפו ברכיים והניחו כפות רגליים על הרצפה. משכו ברך אחת לעבר החזה בעדינות, החזיקו 20–30 שניות. החליפו רגל. חזרו 3 פעמים לכל צד.",
  },
  {
    id: 3,
    title: "תרגיל פנדולום לכתף",
    category: "Shoulder",
    youtubeId: "9bZkp7q19f0",
    instructions:
      "עמדו כשאתם slightly מוטים קדימה, תנו לזרוע להיתלות חופשית. נענעו את הזרוע קדימה ואחורה בעדינות כמו מטוטלת. 30 שניות עד דקה, 2–3 פעמים ביום.",
  },
  {
    id: 4,
    title: "חיזוק שרירי ליבה – גשר",
    category: "Core",
    youtubeId: "kJq7_2WeJ2E",
    instructions:
      "שכבו על הגב, ברכיים כפופות. הרימו את האגן כלפי מעלה עד קו הכתפיים–ברכיים. החזיקו 5–10 שניות והורידו. 10 חזרות, 2 סטים.",
  },
  {
    id: 5,
    title: "מתיחת צוואר לצד",
    category: "Neck",
    youtubeId: "RgKAFK5djSk",
    instructions:
      "בישיבה או עמידה, הטו את הראש בעדינות לצד ימין עד תחושת מתיחה קלה. החזיקו 15–20 שניות. חזרו למרכז והטו לצד שמאל. 3 פעמים לכל צד.",
  },
];

export function getExercisesByIds(ids: number[]): Exercise[] {
  const set = new Set(ids);
  return EXERCISES.filter((e) => set.has(e.id));
}
