"use client";

import { useState } from "react";

const WORKOUT_DAYS = new Set([1, 3, 4, 6, 8, 10, 12, 15, 17, 19, 22, 24, 26, 29]);
const TODAY = 12;

const DAYS_OF_WEEK = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

// Dec 2023 starts on Friday (index 5)
const FIRST_DAY_INDEX = 5;
const TOTAL_DAYS = 31;

export default function WorkoutCalendar() {
  const [month] = useState("December 2023");

  const cells: (number | null)[] = [
    ...Array(FIRST_DAY_INDEX).fill(null),
    ...Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1),
  ];

  // Pad to complete last week row
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="bg-[#0f0f23] border border-[#2d2d55] rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-sm font-bold uppercase tracking-widest font-[family-name:var(--font-lexend)]">
          {month}
        </h3>
        <div className="flex items-center gap-1">
          <button className="text-[#9ca3af] hover:text-white transition-colors p-1">
            <span className="material-symbols-outlined text-base">chevron_left</span>
          </button>
          <button className="text-[#9ca3af] hover:text-white transition-colors p-1">
            <span className="material-symbols-outlined text-base">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS_OF_WEEK.map((d) => (
          <div key={d} className="text-center text-[10px] text-[#9ca3af] font-semibold uppercase tracking-wider py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />;
          const isToday = day === TODAY;
          const hasWorkout = WORKOUT_DAYS.has(day);

          return (
            <div key={day} className="flex flex-col items-center gap-0.5 py-1">
              <div
                className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-semibold transition-all cursor-default ${
                  isToday
                    ? "bg-[#bc13fe]/20 border border-[#bc13fe] text-white"
                    : hasWorkout
                    ? "text-white"
                    : "text-[#4b5563]"
                }`}
              >
                {day}
              </div>
              {hasWorkout && (
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: isToday ? "#bc13fe" : "#ff00ff",
                    boxShadow: `0 0 4px ${isToday ? "#bc13fe" : "#ff00ff"}`,
                  }}
                />
              )}
              {!hasWorkout && <div className="w-1.5 h-1.5" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
