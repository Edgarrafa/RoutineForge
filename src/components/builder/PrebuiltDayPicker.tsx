"use client";

import { useEffect } from "react";
import type { PrebuiltDay } from "@/types";
import { PREBUILT_DAYS } from "@/data/mockData";

type Props = {
  onClose: () => void;
  onSelect: (day: PrebuiltDay) => void;
};

const DIFFICULTY_COLOR: Record<string, string> = {
  Beginner: "#10b981",
  Intermediate: "#f59e0b",
  Advanced: "#f4257b",
};

export default function PrebuiltDayPicker({ onClose, onSelect }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[85vh] flex flex-col rounded-2xl bg-[#0d060a] border border-[#f4257b]/30 shadow-[0_0_40px_rgba(244,37,123,0.2)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f4257b]/20">
          <div>
            <h2 className="text-white font-bold text-lg tracking-wide">Day Templates</h2>
            <p className="text-slate-400 text-xs mt-0.5">Pick a pre-built session to load into this day</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors p-1"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PREBUILT_DAYS.map((day) => {
            const diffColor = DIFFICULTY_COLOR[day.difficulty] ?? "#9ca3af";
            return (
              <div
                key={day.id}
                className="flex flex-col bg-[#1a0f14]/80 border border-[#f4257b]/15 rounded-xl p-4 hover:border-[#f4257b]/50 hover:bg-[#1a0f14] transition-all group"
              >
                {/* Name + difficulty */}
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-white font-bold text-sm group-hover:text-[#f4257b] transition-colors">
                    {day.name}
                  </h3>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0"
                    style={{ color: diffColor, borderColor: `${diffColor}50`, backgroundColor: `${diffColor}15` }}
                  >
                    {day.difficulty}
                  </span>
                </div>

                {/* Focus */}
                <p className="text-slate-400 text-xs mb-3 leading-relaxed">{day.focus}</p>

                {/* Meta row */}
                <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-3">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    {day.estimatedDuration}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">fitness_center</span>
                    {day.exercises.length} exercises
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {day.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded bg-[#f4257b]/10 text-[#f4257b] border border-[#f4257b]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Exercise preview */}
                <div className="flex flex-col gap-1 mb-4">
                  {day.exercises.slice(0, 3).map((ex, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="w-4 h-4 rounded-sm bg-[#f4257b]/20 text-[#f4257b] text-[9px] font-bold flex items-center justify-center shrink-0">
                        {ex.sets}
                      </span>
                      <span className="truncate">{ex.name}</span>
                      <span className="text-slate-600 shrink-0">{ex.reps} reps</span>
                    </div>
                  ))}
                  {day.exercises.length > 3 && (
                    <p className="text-[11px] text-slate-600 pl-6">
                      +{day.exercises.length - 3} more
                    </p>
                  )}
                </div>

                {/* CTA */}
                <button
                  onClick={() => onSelect(day)}
                  className="mt-auto w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#f4257b]/15 border border-[#f4257b]/30 text-[#f4257b] text-xs font-bold uppercase tracking-wider hover:bg-[#f4257b] hover:text-white transition-all"
                >
                  <span className="material-symbols-outlined text-sm">download</span>
                  Use This Day
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
