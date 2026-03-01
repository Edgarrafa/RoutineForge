"use client";

import type { LoggedExercise, ExerciseDetail } from "@/types";
import { EXERCISE_DETAILS } from "@/data/mockData";

type Props = {
  exercise: LoggedExercise;
  onOpenDetail: (detail: ExerciseDetail) => void;
};

const BAR_HEIGHTS = [40, 55, 60, 70, 85, 100];

export default function ExerciseLogCard({ exercise, onOpenDetail }: Props) {
  const detail = EXERCISE_DETAILS.find((d) => d.id === exercise.id);

  function handleNameClick() {
    if (detail) onOpenDetail(detail);
  }

  return (
    <div className="bg-[#0d0d1a] border border-[#2d2d55] rounded-xl overflow-hidden mb-4">
      {/* Exercise Header */}
      <div className="flex items-start justify-between p-5 pb-3">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="w-11 h-11 rounded-xl bg-[#1a0f2e] border border-[#2d2d55] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl text-[#ec4899]">fitness_center</span>
          </div>
          <div>
            <button
              onClick={handleNameClick}
              className={`text-white font-bold text-base text-left leading-tight ${
                detail ? "hover:text-[#ec4899] cursor-pointer transition-colors" : "cursor-default"
              }`}
            >
              {exercise.name}
            </button>
            <p className="text-[#9ca3af] text-xs mt-0.5">
              {exercise.muscleGroup} &bull; {exercise.equipment}
            </p>
          </div>
        </div>

        {/* 1RM Trend bar chart */}
        <div className="flex flex-col items-end gap-1 shrink-0">
          <p className="text-[#9ca3af] text-[10px] uppercase tracking-widest">1RM Trend</p>
          <div className="flex items-end gap-0.5 h-12">
            {BAR_HEIGHTS.map((h, i) => (
              <div
                key={i}
                className="w-3 rounded-sm"
                style={{
                  height: `${h}%`,
                  backgroundColor:
                    i === BAR_HEIGHTS.length - 1
                      ? "#ec4899"
                      : i === BAR_HEIGHTS.length - 2
                      ? "#a855f7"
                      : "#2d2d55",
                }}
              />
            ))}
          </div>
          <p className="text-[#9ca3af] text-[10px]">
            Est. 1RM <span className="text-white font-bold">{exercise.estOneRM} kg</span>
          </p>
        </div>
      </div>

      {/* Set Table */}
      <div className="px-5 pb-1">
        <div className="grid grid-cols-4 text-[10px] text-[#6b7280] uppercase tracking-widest font-semibold pb-2 border-b border-[#1a1a3e]">
          <span>Set</span>
          <span>Weight</span>
          <span>Reps</span>
          <span>RPE</span>
        </div>
        {exercise.sets.map((s) => (
          <div
            key={s.set}
            className={`grid grid-cols-4 py-2.5 border-b border-[#1a1a3e] last:border-0 text-sm items-center ${
              s.isPR ? "text-[#ec4899]" : "text-white"
            }`}
          >
            <span className="font-bold">{s.set}</span>
            <span className="flex items-center gap-1.5">
              {s.weight}
              {s.isPR && (
                <span className="bg-[#ec4899] text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                  PR
                </span>
              )}
            </span>
            <span>{s.reps}</span>
            <span className={s.isPR ? "text-[#ec4899] font-bold" : "text-[#9ca3af]"}>{s.rpe}</span>
          </div>
        ))}
      </div>

      {/* Note */}
      {exercise.note && (
        <div className="mx-5 my-3 bg-[#0a0a14] border border-[#2d2d55] rounded-lg px-4 py-3 flex items-start gap-2">
          <span className="material-symbols-outlined text-base text-[#6b7280] mt-0.5">format_quote</span>
          <p className="text-[#9ca3af] text-xs italic leading-relaxed">{exercise.note}</p>
        </div>
      )}

      {detail && (
        <div className="px-5 pb-4">
          <button
            onClick={handleNameClick}
            className="text-[#a855f7] text-xs font-semibold hover:text-[#ec4899] transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">info</span>
            View Exercise Details
          </button>
        </div>
      )}
    </div>
  );
}
