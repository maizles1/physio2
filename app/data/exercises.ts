export interface Exercise {
  id: number;
  title: string;
  category: string;
  youtubeId: string;
  instructions: string;
}

/** סדר הרובריקות (קטגוריות) בתצוגה – מהצוואר למטה */
export const CATEGORIES = [
  "צוואר",
  "כתף",
  "מרפק",
  "שורש כף יד",
  "גב עליון",
  "גב תחתון",
  "ירך",
  "ברך",
  "קרסול",
  "כף רגל",
  "תרגול וסטיבולארי",
] as const;

export type CategoryName = (typeof CATEGORIES)[number];

export const EXERCISES: Exercise[] = [
  {
    id: 1,
    title: "מתיחת צוואר לצד",
    category: "צוואר",
    youtubeId: "RgKAFK5djSk",
    instructions:
      "בישיבה או עמידה, הטו את הראש בעדינות לצד ימין עד תחושת מתיחה קלה. החזיקו 15–20 שניות. חזרו למרכז והטו לצד שמאל. 3 פעמים לכל צד.",
  },
  {
    id: 2,
    title: "תרגיל פנדולום לכתף",
    category: "כתף",
    youtubeId: "9bZkp7q19f0",
    instructions:
      "עמדו כשאתם מוטים קדימה קלות, תנו לזרוע להיתלות חופשית. נענעו את הזרוע קדימה ואחורה בעדינות כמו מטוטלת. 30 שניות עד דקה, 2–3 פעמים ביום.",
  },
  {
    id: 3,
    title: "חיזוק מרפק – כיפוף עם משקל קל",
    category: "מרפק",
    youtubeId: "dQw4w9WgXcQ",
    instructions:
      "שבו עם אמה על משטח, כף יד כלפי מעלה. כופפו את המרפק והרימו משקל קל (בקבוק מים או משקולת). 10–15 חזרות, 2–3 סטים.",
  },
  {
    id: 4,
    title: "מתיחת שורש כף יד",
    category: "שורש כף יד",
    youtubeId: "jNQXAC9IVRw",
    instructions:
      "הושיטו את הזרוע קדימה, משכו בעדינות את אצבעות כף היד כלפי מטה עם היד השנייה. החזיקו 20–30 שניות. חזרו 3 פעמים לכל יד.",
  },
  {
    id: 5,
    title: "מתיחת גב עליון – פתיחת חזה",
    category: "גב עליון",
    youtubeId: "kJq7_2WeJ2E",
    instructions:
      "עמדו או שבו. חברו ידיים מאחורי הגב והרימו בעדינות. הרגישו מתיחה בחזה ובגב עליון. החזיקו 20–30 שניות.",
  },
  {
    id: 6,
    title: "מתיחת גב תחתון בשכיבה",
    category: "גב תחתון",
    youtubeId: "jNQXAC9IVRw",
    instructions:
      "שכבו על הגב, כופפו ברכיים והניחו כפות רגליים על הרצפה. משכו ברך אחת לעבר החזה בעדינות, החזיקו 20–30 שניות. החליפו רגל. חזרו 3 פעמים לכל צד.",
  },
  {
    id: 7,
    title: "תרגיל חיזוק ירך – הרחקה בשכיבה",
    category: "ירך",
    youtubeId: "dQw4w9WgXcQ",
    instructions:
      "שכבו על הצד. הרימו את הרגל העליונה באיטיות והורידו. 10–15 חזרות לכל צד, 2 סטים.",
  },
  {
    id: 8,
    title: "תרגיל חיזוק ברך – כיפוף ויישור",
    category: "ברך",
    youtubeId: "dQw4w9WgXcQ",
    instructions:
      "שבו על כיסא עם גב ישר. הרימו את הרגל באיטיות עד ליישור הברך, החזיקו 3 שניות והורידו. בצעו 10–15 חזרות לכל רגל, פעמיים ביום.",
  },
  {
    id: 9,
    title: "תרגיל תנועתיות קרסול",
    category: "קרסול",
    youtubeId: "RgKAFK5djSk",
    instructions:
      "בישיבה או שכיבה, סובבו את כף הרגל בעיגולים – 10 פעמים עם כיוון השעון ו-10 נגד. בצעו לכל רגל.",
  },
  {
    id: 10,
    title: "מתיחת כף רגל – גלגול עם כדור",
    category: "כף רגל",
    youtubeId: "9bZkp7q19f0",
    instructions:
      "שבו והניחו כדור טניס או גליל מתחת לכף הרגל. גלגלו בעדינות קדימה ואחורה כ-2 דקות לכל רגל.",
  },
  {
    id: 11,
    title: "תרגיל גזע מוח וסטיבולרי – מעקב עיניים",
    category: "תרגול וסטיבולארי",
    youtubeId: "dQw4w9WgXcQ",
    instructions:
      "שבו בנוחות. החזיקו אצבע מול העיניים והזיזו אותה באיטיות ימינה־שמאלה ולמעלה־למטה, בלי להזיז את הראש. עקבו אחרי האצבע בעיניים. 1–2 דקות, פעמיים ביום.",
  },
];

export function getExercisesByIds(ids: number[]): Exercise[] {
  const set = new Set(ids);
  return EXERCISES.filter((e) => set.has(e.id));
}

/** מחזיר תרגילים מקובצים לפי רובריקה, בסדר הרובריקות המוגדר */
export function groupExercisesByCategory(exercises: Exercise[]): { category: string; exercises: Exercise[] }[] {
  const map = new Map<string, Exercise[]>();
  for (const cat of CATEGORIES) {
    map.set(cat, []);
  }
  for (const ex of exercises) {
    const list = map.get(ex.category) ?? [];
    list.push(ex);
    map.set(ex.category, list);
  }
  return CATEGORIES.map((category) => ({ category, exercises: map.get(category) ?? [] })).filter(
    (g) => g.exercises.length > 0
  );
}
