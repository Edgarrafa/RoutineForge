"use client";

import { useState } from "react";
import { HISTORY_LOGS } from "@/data/mockData";

const DAYS_OF_WEEK = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function getWorkoutDays(year: number, month: number): Set<number> {
  return new Set(
    HISTORY_LOGS.filter((log) => {
      const [y, m] = log.isoDate.split("-").map(Number);
      return y === year && m === month + 1;
    }).map((log) => parseInt(log.isoDate.split("-")[2]))
  );
}

export default function WorkoutCalendar() {
  const now = new Date();
  const [viewDate, setViewDate] = useState(() => startOfMonth(now));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDayIndex = new Date(year, month, 1).getDay(); // 0=Sun
  const totalDays = new Date(year, month + 1, 0).getDate();
  const monthLabel = viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth();
  const todayDay = now.getDate();

  const workoutDays = getWorkoutDays(year, month);

  const cells: (number | null)[] = [
    ...Array(firstDayIndex).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  function prevMonth() {
    setViewDate(new Date(year, month - 1, 1));
  }

  function nextMonth() {
    setViewDate(new Date(year, month + 1, 1));
  }

  return (
    <div className="bg-[#0f0f23] border border-[#2d2d55] rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-sm font-bold uppercase tracking-widest font-[family-name:var(--font-lexend)]">
          {monthLabel}
        </h3>
        <div className="flex items-center gap-1">
          <button onClick={prevMonth} className="text-[#9ca3af] hover:text-white transition-colors p-1">
            <span className="material-symbols-outlined text-base">chevron_left</span>
          </button>
          <button onClick={nextMonth} className="text-[#9ca3af] hover:text-white transition-colors p-1">
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
          const isToday = isCurrentMonth && day === todayDay;
          const hasWorkout = workoutDays.has(day);

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
