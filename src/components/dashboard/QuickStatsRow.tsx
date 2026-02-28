"use client";

import { useState } from "react";

const BARS = [
  { day: "M", volume: 30, reps: 40 },
  { day: "T", volume: 45, reps: 55 },
  { day: "W", volume: 20, reps: 25 },
  { day: "T", volume: 60, reps: 70 },
  { day: "F", volume: 50, reps: 45 },
  { day: "S", volume: 80, reps: 65 },
  { day: "S", volume: null, reps: null }, // today — not yet logged
];

export default function QuickStatsRow() {
  const [calories, setCalories] = useState("");
  const [weight, setWeight] = useState("");

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-32">
      {/* Quick Log */}
      <div className="md:col-span-3 bg-[#0f0f23] rounded-xl border border-[#2d2d55] p-4 flex flex-col justify-center gap-3">
        <h3 className="text-xs font-bold uppercase tracking-wide text-[#9ca3af] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#bc13fe] text-sm">edit_square</span>
          Quick Log
        </h3>
        <div className="space-y-2">
          {/* Calories */}
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <input
                type="number"
                placeholder="Calories"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="w-full bg-[#050510] text-white border border-[#2d2d55] rounded px-2 py-1.5 text-xs focus:outline-none focus:border-[#bc13fe] focus:ring-1 focus:ring-[#bc13fe] placeholder-gray-600 transition-all"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-[10px] font-medium">
                kcal
              </span>
            </div>
            <button className="bg-[#2d2d55] hover:bg-[#bc13fe] hover:text-white text-[#9ca3af] border border-[#2d2d55] rounded p-1 transition-all">
              <span className="material-symbols-outlined text-sm">add</span>
            </button>
          </div>
          {/* Weight */}
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <input
                type="number"
                placeholder="Weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-[#050510] text-white border border-[#2d2d55] rounded px-2 py-1.5 text-xs focus:outline-none focus:border-[#bc13fe] focus:ring-1 focus:ring-[#bc13fe] placeholder-gray-600 transition-all"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-[10px] font-medium">
                kg
              </span>
            </div>
            <button className="bg-[#2d2d55] hover:bg-[#bc13fe] hover:text-white text-[#9ca3af] border border-[#2d2d55] rounded p-1 transition-all">
              <span className="material-symbols-outlined text-sm">add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="md:col-span-7 bg-[#0f0f23] rounded-xl border border-[#2d2d55] p-4 flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#bc13fe]/10 blur-[60px] rounded-full pointer-events-none" />
        <div className="flex justify-between items-center mb-1 z-10">
          <h3 className="text-[#9ca3af] text-xs font-bold uppercase tracking-wide flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ff00ff] text-sm">trending_up</span>
            Weekly Progress
          </h3>
          <div className="flex gap-3 text-[10px]">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#ff00ff]" />
              <span className="text-[#9ca3af]">Reps</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#bc13fe]" />
              <span className="text-[#9ca3af]">Volume</span>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-end justify-between px-2 gap-1 sm:gap-4 h-16">
          {BARS.map((bar, i) => (
            <div key={i} className="flex flex-col justify-end w-full gap-0.5 items-center group/bar">
              {bar.volume !== null ? (
                <>
                  <div
                    className="w-1.5 sm:w-2 bg-[#bc13fe]/40 rounded-t-sm group-hover/bar:bg-[#bc13fe] transition-colors"
                    style={{ height: `${bar.volume}%` }}
                  />
                  <div
                    className="w-1.5 sm:w-2 bg-[#ff00ff]/40 rounded-t-sm group-hover/bar:bg-[#ff00ff] transition-colors"
                    style={{ height: `${bar.reps}%` }}
                  />
                  <span className="text-[9px] text-[#9ca3af] mt-1">{bar.day}</span>
                </>
              ) : (
                <>
                  <div className="w-1.5 sm:w-2 bg-[#2d2d55] rounded-t-sm h-[10%]" />
                  <div className="w-1.5 sm:w-2 bg-[#2d2d55] rounded-t-sm h-[10%]" />
                  <span className="text-[9px] text-[#00f3ff] mt-1 font-bold">{bar.day}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Day Streak */}
      <div className="md:col-span-2 bg-[#0f0f23] rounded-xl border border-[#2d2d55] relative overflow-hidden flex flex-col items-center justify-center group hover:border-orange-500/50 transition-colors cursor-default">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center gap-1">
          <span className="text-4xl select-none">🔥</span>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black text-white italic leading-none font-[family-name:var(--font-lexend)]">
              7
            </span>
            <span className="text-[10px] uppercase font-bold text-orange-500 tracking-wider">
              Day Streak
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
