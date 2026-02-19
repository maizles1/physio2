import type { Metadata } from "next";
import { getExercisesByIds } from "@/app/data/exercises";
import PlanContent from "./PlanContent";

export const metadata: Metadata = {
  title: "תוכנית התרגול שלך",
  description: "תוכנית תרגילים מותאמת – פיזיותרפיה פלוס",
};

interface PlanPageProps {
  searchParams: Promise<{ ids?: string }>;
}

export default async function PlanPage({ searchParams }: PlanPageProps) {
  const params = await searchParams;
  const idsParam = params.ids?.trim();
  const ids = idsParam
    ? idsParam.split(",").map((s) => parseInt(s, 10)).filter((n) => !Number.isNaN(n))
    : [];
  const exercises = getExercisesByIds(ids);

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
        {exercises.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center">
            <p className="text-gray-700">
              לא נמצאו תרגילים בתוכנית. אם קיבלתם קישור מהמטפל, בדקו שהקישור מלא ונסו שוב.
            </p>
          </div>
        ) : (
          <PlanContent exercises={exercises} />
        )}
      </div>
    </div>
  );
}
