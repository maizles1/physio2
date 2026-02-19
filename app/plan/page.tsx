import type { Metadata } from "next";
import {
  parsePrescriptionParam,
  getExerciseById,
  DEFAULT_DOSAGE,
  type Exercise,
  type Dosage,
} from "@/app/data/exercises";
import PlanContent from "./PlanContent";

export const metadata: Metadata = {
  title: "תוכנית התרגול שלך",
  description: "תוכנית תרגילים מותאמת – פיזיותרפיה פלוס",
};

export type PlanItem = { exercise: Exercise; dosage: Dosage };

interface PlanPageProps {
  searchParams: Promise<{ p?: string; ids?: string }>;
}

export default async function PlanPage({ searchParams }: PlanPageProps) {
  const params = await searchParams;
  const pParam = params.p?.trim();
  const idsParam = params.ids?.trim();

  let planItems: PlanItem[] = [];

  if (pParam) {
    const decoded = decodeURIComponent(pParam);
    const parsed = parsePrescriptionParam(decoded);
    for (const { id, dosage } of parsed) {
      const exercise = getExerciseById(id);
      if (exercise) planItems.push({ exercise, dosage });
    }
  } else if (idsParam) {
    const ids = idsParam.split(",").map((s) => s.trim()).filter(Boolean);
    for (const id of ids) {
      const exercise = getExerciseById(id);
      if (exercise) planItems.push({ exercise, dosage: DEFAULT_DOSAGE });
    }
  }

  return (
    <div className="min-h-screen" dir="rtl">
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-gray-200">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">
            פיזיותרפיה פלוס – תוכנית התרגול שלך
          </h1>
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
