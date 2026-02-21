import type { Metadata } from "next";
import {
  parsePrescriptionParam,
  DEFAULT_DOSAGE,
  exercisesData,
  CATEGORY_ORDER,
  type Exercise,
  type Dosage,
  type Category,
} from "@/app/data/exercises";
import { readCustomExercises } from "@/lib/exercisesStorage";
import PlanContent from "./PlanContent";

export const metadata: Metadata = {
  title: "תוכנית התרגול שלך",
  description: "תוכנית תרגילים מותאמת – פיזיותרפיה פלוס",
};

export type PlanItem = { exercise: Exercise; dosage: Dosage };

interface PlanPageProps {
  searchParams: Promise<{ p?: string; ids?: string }>;
}

function toExercise(entry: { id: string; category: string; title: string; youtubeId: string }): Exercise {
  return {
    id: entry.id,
    title: entry.title.trim() || "תרגיל",
    category: entry.category as Category,
    youtubeId: typeof entry.youtubeId === "string" ? entry.youtubeId.trim() : "",
    instructions: "",
  };
}

export default async function PlanPage({ searchParams }: PlanPageProps) {
  const params = await searchParams;
  const pParam = params.p?.trim();
  const idsParam = params.ids?.trim();

  const custom = await readCustomExercises();
  const customExercises = custom
    .filter((e) => e && typeof e.category === "string" && CATEGORY_ORDER.includes(e.category as Category))
    .map(toExercise);
  const allExercises: Exercise[] = [...exercisesData, ...customExercises];

  let planItems: PlanItem[] = [];

  if (pParam) {
    const decoded = decodeURIComponent(pParam);
    const parsed = parsePrescriptionParam(decoded);
    for (const { id, dosage } of parsed) {
      const exercise = allExercises.find((e) => e.id === id);
      if (exercise) planItems.push({ exercise, dosage });
    }
  } else if (idsParam) {
    const ids = idsParam.split(",").map((s) => s.trim()).filter(Boolean);
    for (const id of ids) {
      const exercise = allExercises.find((e) => e.id === id);
      if (exercise) planItems.push({ exercise, dosage: DEFAULT_DOSAGE });
    }
  }

  return (
    <div className="min-h-screen" dir="rtl">
      <header className="sticky top-0 z-10 bg-primary-gradient text-white shadow-md">
        <div className="mx-auto max-w-2xl px-4 py-5">
          <h1 className="text-lg sm:text-xl font-bold">
            פיזיותרפיה פלוס – תוכנית התרגול שלך
          </h1>
          <p className="text-white/90 text-sm mt-1">
            התוכנית האישית שלך מהמטפל
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-6">
        {planItems.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center">
            <p className="text-gray-700">
              לא נמצאו תרגילים בתוכנית. אם קיבלתם קישור מהמטפל, בדקו שהקישור מלא ונסו שוב.
            </p>
          </div>
        ) : (
          <PlanContent planItems={planItems} />
        )}
      </div>
    </div>
  );
}
