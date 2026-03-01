"use client";

import { useEffect } from "react";
import type { PrebuiltWeek } from "@/types";
import { PREBUILT_WEEKS } from "@/data/mockData";

type Props = {
  onClose: () => void;
  onSelect: (week: PrebuiltWeek) => void;
};

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function PrebuiltWeekPicker({ onClose, onSelect }: Props) {
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
        className="w-full max-w-2xl max-h-[80vh] flex flex-col rounded-2xl bg-[#0d060a] border border-[#00f3ff]/30 shadow-[0_0_40px_rgba(0,243,255,0.15)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#00f3ff]/20">
          <div>
            <h2 className="text-white font-bold text-lg tracking-wide">Week Templates</h2>
            <p className="text-slate-400 text-xs mt-0.5">Load a pre-built weekly structure into this week</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors p-1">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {PREBUILT_WEEKS.map((week) => (
            <div
              key={week.id}
              className="bg-[#1a0f14]/80 border border-[#00f3ff]/15 rounded-xl p-5 hover:border-[#00f3ff]/40 transition-all group"
            >
              {/* Header row */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <h3 className="text-white font-bold text-base group-hover:text-[#00f3ff] transition-colors">
                    {week.name}
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{week.description}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[#00f3ff] text-xs font-bold">{week.daysPerWeek} days/wk</span>
                  <span className="text-slate-500 text-[10px]">{week.focus}</span>
                </div>
              </div>

              {/* Day pills */}
              <div className="flex gap-1.5 mb-4 flex-wrap">
                {week.days.map((day, i) => (
                  <div
                    key={i}
                    className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg border text-[10px] min-w-[40px] ${
                      day
                        ? "bg-[#f4257b]/10 border-[#f4257b]/30 text-[#f4257b]"
                        : "bg-white/5 border-white/10 text-slate-600"
                    }`}
                  >
                    <span className="font-bold">{DAY_LABELS[i]}</span>
                    <span className="truncate max-w-[60px] text-center leading-tight">
                      {day ? day.name.split(" ")[0] : "Rest"}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => onSelect(week)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#00f3ff]/10 border border-[#00f3ff]/30 text-[#00f3ff] text-xs font-bold uppercase tracking-wider hover:bg-[#00f3ff] hover:text-black transition-all"
              >
                <span className="material-symbols-outlined text-sm">calendar_view_week</span>
                Load This Week
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
