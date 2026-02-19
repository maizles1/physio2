"use client";

import { useState } from "react";
import type { Exercise } from "@/app/data/exercises";
import { groupExercisesByCategory } from "@/app/data/exercises";

interface PlanContentProps {
  exercises: Exercise[];
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

export default function PlanContent({ exercises }: PlanContentProps) {
  const byCategory = groupExercisesByCategory(exercises);

  return (
    <div className="space-y-10 pb-8" dir="rtl">
      {byCategory.map(({ category, categoryLabel, exercises: categoryExercises }) => (
        <section key={category}>
          <h2 className="text-lg font-bold text-primary-dark mb-4 pb-2 border-b border-gray-200">
            {categoryLabel}
          </h2>
          <div className="space-y-6">
            {categoryExercises.map((ex) => (
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
                  <p className="mt-3 text-gray-700 leading-relaxed whitespace-pre-line">
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
