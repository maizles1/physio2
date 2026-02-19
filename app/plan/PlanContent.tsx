"use client";

import { useState } from "react";
import { Repeat, Calendar, Clock } from "lucide-react";
import type { PlanItem } from "./page";
import { CATEGORY_ORDER, CATEGORY_LABELS } from "@/app/data/exercises";

interface PlanContentProps {
  planItems: PlanItem[];
}

/** Lightweight lazy YouTube: thumbnail until click, then iframe. No extra deps, fast load. */
function LazyYouTube({ id, title }: { id: string; title: string }) {
  const [loaded, setLoaded] = useState(false);
  const thumb = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${id}?autoplay=1`;

  if (loaded) {
    return (
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full rounded-t-2xl"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="group relative block w-full aspect-video bg-gray-900 rounded-t-2xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label={`הפעל סרטון: ${title}`}
    >
      <img
        src={thumb}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition group-hover:bg-black/40">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition group-hover:scale-110">
          <svg className="mr-1 h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}

function DosageBadges({ dosage }: { dosage: PlanItem["dosage"] }) {
  const { sets, reps, perDay, perWeek } = dosage;
  return (
    <div className="flex flex-wrap gap-2 mt-3" dir="rtl">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary-dark px-3 py-1.5 text-sm font-medium">
        <Repeat className="h-4 w-4" aria-hidden />
        {sets} סטים × {reps} חזרות
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 text-secondary-dark px-3 py-1.5 text-sm font-medium">
        <Clock className="h-4 w-4" aria-hidden />
        {perDay} פעמים ביום
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 text-amber-800 px-3 py-1.5 text-sm font-medium">
        <Calendar className="h-4 w-4" aria-hidden />
        {perWeek} ימים בשבוע
      </span>
    </div>
  );
}

export default function PlanContent({ planItems }: PlanContentProps) {
  const byCategory = CATEGORY_ORDER.map((category) => ({
    category,
    categoryLabel: CATEGORY_LABELS[category],
    items: planItems.filter((item) => item.exercise.category === category),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="space-y-10 pb-8" dir="rtl">
      {byCategory.map(({ category, categoryLabel, items }) => (
        <section key={category}>
          <h2 className="text-lg font-bold text-primary-dark mb-4 pb-2 border-b border-gray-200">
            {categoryLabel}
          </h2>
          <div className="space-y-6">
            {items.map(({ exercise: ex, dosage }) => (
              <article
                key={ex.id}
                className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
              >
                {ex.youtubeId ? (
                  <div className="relative aspect-video w-full">
                    <LazyYouTube id={ex.youtubeId} title={ex.title} />
                  </div>
                ) : (
                  <div className="aspect-video w-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
                    אין סרטון
                  </div>
                )}
                <div className="p-4 sm:p-5">
                  <h3 className="text-xl font-bold text-gray-900">{ex.title}</h3>
                  <DosageBadges dosage={dosage} />
                  <p className="mt-4 text-gray-700 leading-relaxed whitespace-pre-line">
                    {ex.instructions}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
