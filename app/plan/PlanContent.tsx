"use client";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import type { Exercise } from "@/app/data/exercises";

interface PlanContentProps {
  exercises: Exercise[];
}

export default function PlanContent({ exercises }: PlanContentProps) {
  return (
    <div className="space-y-8 pb-8" dir="rtl">
      {exercises.map((ex) => (
        <article
          key={ex.id}
          className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
        >
          <div className="aspect-video w-full [&_.yt-lite]:!rounded-t-2xl">
            <LiteYouTubeEmbed
              id={ex.youtubeId}
              title={ex.title}
              lazyLoad
              poster="hqdefault"
            />
          </div>
          <div className="p-4 sm:p-5">
            <span className="text-xs font-medium text-primary-dark uppercase tracking-wide">
              {ex.category}
            </span>
            <h2 className="mt-1 text-xl font-bold text-gray-900">{ex.title}</h2>
            <p className="mt-3 text-gray-700 leading-relaxed whitespace-pre-line">
              {ex.instructions}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
