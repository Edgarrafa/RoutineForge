"use client";

import { useEffect } from "react";
import type { ExerciseDetail } from "@/types";

type Props = {
  exercise: ExerciseDetail;
  onClose: () => void;
};

const LEVEL_COLOR: Record<string, string> = {
  Beginner: "#10b981",
  Intermediate: "#f59e0b",
  Advanced: "#ec4899",
};

const TIME_RANGES = ["3M", "6M", "1Y"];

export default function ExerciseDetailModal({ exercise, onClose }: Props) {
  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const levelColor = LEVEL_COLOR[exercise.level] ?? "#9ca3af";
  const maxBar = Math.max(...exercise.historyData);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border bg-[#0d0d14] hide-scroll"
        style={{
          borderColor: "#a855f7",
          boxShadow: "0 0 40px rgba(168,85,247,0.4), 0 0 80px rgba(168,85,247,0.15)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-[#2d2d55]">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-white text-3xl font-black uppercase font-[family-name:var(--font-orbitron)]">
                {exercise.name}
              </h2>
              <span
                className="text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wider"
                style={{ color: levelColor, borderColor: levelColor, backgroundColor: `${levelColor}15` }}
              >
                {exercise.level}
              </span>
            </div>
            <div className="flex items-center gap-3 flex-wrap text-sm">
              <span className="text-[#00f3ff] font-bold uppercase tracking-wider">{exercise.type}</span>
              <span className="text-[#9ca3af]">•</span>
              <span className="text-[#9ca3af]">{exercise.muscles.join(" / ")}</span>
              <span className="text-[#9ca3af]">•</span>
              <span className="text-[#9ca3af]">{exercise.equipment}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-4">
            <button className="flex items-center gap-1.5 bg-[#1a1a2e] border border-[#2d2d55] text-white text-sm px-4 py-2 rounded-xl hover:border-[#a855f7] transition-colors">
              <span className="material-symbols-outlined text-base">bookmark</span>
              Save
            </button>
            <button className="flex items-center gap-1.5 bg-[#1a1a2e] border border-[#2d2d55] text-white text-sm px-4 py-2 rounded-xl hover:border-[#a855f7] transition-colors">
              <span className="material-symbols-outlined text-base">share</span>
              Share
            </button>
            <button
              onClick={onClose}
              className="bg-[#1a1a2e] border border-[#2d2d55] text-[#9ca3af] w-9 h-9 rounded-xl flex items-center justify-center hover:border-[#ec4899] hover:text-white transition-all"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Left Column */}
          <div className="flex flex-col gap-5">
            {/* Form Guide Placeholder */}
            <div className="rounded-xl overflow-hidden bg-[#0a0a0f] border border-[#2d2d55] aspect-video flex items-center justify-center relative">
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-[#ec4899] animate-pulse" />
                <span className="text-white text-xs font-bold uppercase tracking-wider">Form Guide</span>
              </div>
              <span className="material-symbols-outlined text-[#2d2d55] text-7xl">play_circle</span>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <button className="w-10 h-10 rounded-full bg-[#ec4899] flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.5)]">
                  <span className="material-symbols-outlined text-white text-xl">play_arrow</span>
                </button>
                <div className="flex-1 mx-3 h-1 bg-[#2d2d55] rounded-full">
                  <div className="h-full w-1/6 bg-[#ec4899] rounded-full" />
                </div>
                <span className="text-white text-xs">0:12 / 1:45</span>
                <button className="ml-2 text-[#9ca3af] hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-lg">fullscreen</span>
                </button>
              </div>
            </div>

            {/* Your History (1RM) */}
            <div className="bg-[#0a0a14] border border-[#2d2d55] rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white text-sm font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-[#ec4899]">show_chart</span>
                  Your History (1RM)
                </h4>
                <div className="flex gap-1">
                  {TIME_RANGES.map((r, i) => (
                    <button
                      key={r}
                      className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-colors ${
                        i === 0
                          ? "bg-[#2d2d55] text-white"
                          : "text-[#9ca3af] hover:text-white"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bar chart */}
              <div className="flex items-end gap-2 h-28">
                {exercise.historyData.map((val, i) => {
                  const isLast = i === exercise.historyData.length - 1;
                  const isSecondLast = i === exercise.historyData.length - 2;
                  const pct = (val / maxBar) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t-sm"
                        style={{
                          height: `${pct}%`,
                          background: isLast
                            ? "linear-gradient(to top, #a855f7, #ec4899)"
                            : isSecondLast
                            ? "#4c1d6e"
                            : "#2d2d55",
                          boxShadow: isLast ? "0 0 12px rgba(168,85,247,0.5)" : "none",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-2">
                {["OCT", "NOV", "DEC", "JAN", "FEB", "MAR"].slice(0, exercise.historyData.length).map((m) => (
                  <span key={m} className="text-[#6b7280] text-[10px] flex-1 text-center">{m}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-5">
            {/* Performance Cues */}
            <div className="bg-[#0a0a14] border border-[#2d2d55] rounded-xl p-4">
              <h4 className="text-[#10b981] text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">verified</span>
                Performance Cues
              </h4>
              <div className="flex flex-col gap-3">
                {exercise.cues.map((cue) => (
                  <div key={cue.step} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#10b981] flex items-center justify-center text-white text-xs font-black shrink-0 mt-0.5">
                      {cue.step}
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold mb-0.5">{cue.title}</p>
                      <p className="text-[#9ca3af] text-xs leading-relaxed">{cue.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Movers */}
            <div className="bg-[#0a0a14] border border-[#2d2d55] rounded-xl p-4">
              <h4 className="text-[#a855f7] text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">accessibility_new</span>
                Primary Movers
              </h4>
              <div className="flex flex-col gap-3">
                {exercise.movers.map((m) => (
                  <div key={m.name}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[#d1d5db] text-sm">{m.name}</span>
                      <span className="text-[#ec4899] text-sm font-bold">{m.pct}%</span>
                    </div>
                    <div className="h-2 bg-[#1a1a3e] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${m.pct}%`,
                          background: "linear-gradient(to right, #a855f7, #ec4899)",
                          boxShadow: "0 0 6px rgba(236,72,153,0.4)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-3 px-6 pb-6">
          <button className="flex-1 flex items-center justify-center gap-2 bg-[#1a1a2e] border border-[#2d2d55] text-white text-sm font-bold py-3 rounded-xl hover:border-[#a855f7] transition-colors uppercase tracking-wider">
            <span className="material-symbols-outlined text-base">swap_horiz</span>
            Swap Exercise
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-[#ec4899] hover:bg-[#d6357a] text-white text-sm font-bold py-3 rounded-xl transition-colors uppercase tracking-wider">
            <span className="material-symbols-outlined text-base">add</span>
            Add to Workout
          </button>
        </div>
      </div>
    </div>
  );
}
