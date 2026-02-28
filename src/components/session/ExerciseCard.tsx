"use client";

import { useState } from "react";

const BG_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAL5cZserwafB4yxdyewFy9Ns58dLiND0qlgWhp5bMKiqIHOIE338bmIR2a3J9AvecffODcVu_1SYhuX3jELXW9tFdRnHariSmcbwm-KDMSC9DgNgbhGTW2x3U3tU0-TLhS_r7C8EfepKPZUxbIJmYsZsPUSVXv9vgtB7QgAvnu5diuzkxr_q0EqrS8OjvBbOtybQQCv9eZOzMfhVBYNL13aDAvfaPpV1U5tZdlauLyGPv3-IeZy9qk5efE-uhmwyF_evBeQXqyjss";

type SetEntry = {
  weight: string;
  reps: string;
  logged: boolean;
};

const INITIAL_SETS: SetEntry[] = [
  { weight: "185", reps: "10", logged: true },
  { weight: "185", reps: "9", logged: true },
  { weight: "185", reps: "", logged: false },
  { weight: "", reps: "", logged: false },
];

const DROP_INITIAL = { weight: "135", reps: "", logged: false };

export default function ExerciseCard() {
  const [sets, setSets] = useState<SetEntry[]>(INITIAL_SETS);
  const [drop, setDrop] = useState(DROP_INITIAL);
  const [hasDropset, setHasDropset] = useState(true);

  const activeIndex = sets.findIndex((s) => !s.logged);

  function updateSet(index: number, field: keyof SetEntry, value: string) {
    setSets((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  }

  function logSet(index: number) {
    setSets((prev) => prev.map((s, i) => (i === index ? { ...s, logged: true } : s)));
  }

  function logDrop() {
    setDrop((d) => ({ ...d, logged: true }));
  }

  const completedCount = sets.filter((s) => s.logged).length;

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative bg-[#0d0d14]">
      {/* Exercise header with background */}
      <div className="relative h-52 shrink-0 overflow-hidden">
        <img src={BG_IMAGE} alt="Exercise" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0d0d14]" />
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 bg-[#ec4899] text-white text-[10px] font-black uppercase tracking-widest rounded">
              Compound
            </span>
            <span className="text-xs text-gray-300">Target: Chest, Triceps</span>
          </div>
          {/* Title row */}
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-4xl font-[family-name:var(--font-orbitron)] font-black text-white tracking-wide">
                Bench Press
              </h2>
              <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-400 font-mono">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-gray-500">sync</span>
                  4 Sets
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-gray-500">north_east</span>
                  8-10 Reps
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-gray-500">history</span>
                  Last: 185lbs x 8
                </span>
              </div>
            </div>
            <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <span className="material-symbols-outlined text-sm">info</span>
            </button>
          </div>
        </div>
      </div>

      {/* Set logging area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Set header */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-white text-lg">
              Set {Math.min(activeIndex + 1, sets.length)} of {sets.length}
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setHasDropset((v) => !v)}
                className={`flex items-center gap-1 px-3 py-1 rounded border text-xs font-bold uppercase tracking-wider transition-colors ${
                  hasDropset
                    ? "border-[#a855f7]/60 text-[#a855f7] bg-[#a855f7]/10"
                    : "border-white/20 text-gray-400 hover:border-white/40"
                }`}
              >
                <span className="material-symbols-outlined text-sm">add</span>
                Dropset
              </button>
              <span className="text-xs text-gray-500 font-mono uppercase tracking-wider">
                Rest Target: 120s
              </span>
            </div>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-[3rem_1fr_1fr_3rem] gap-3 px-3 mb-2">
            <div className="text-[10px] text-gray-500 uppercase font-bold text-center">Set</div>
            <div className="text-[10px] text-gray-500 uppercase font-bold text-center">Weight (lbs)</div>
            <div className="text-[10px] text-gray-500 uppercase font-bold text-center">Reps</div>
            <div className="text-[10px] text-gray-500 uppercase font-bold text-center">Log</div>
          </div>

          {/* Set rows */}
          <div className="space-y-2">
            {sets.map((set, i) => {
              const isActive = i === activeIndex;
              const isFuture = i > activeIndex;

              return (
                <div key={i}>
                  <div
                    className={`grid grid-cols-[3rem_1fr_1fr_3rem] gap-3 items-center px-3 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? "bg-[#ec4899]/8 border border-[#ec4899]/30 shadow-[0_0_20px_rgba(236,72,153,0.08)]"
                        : set.logged
                        ? "bg-white/3"
                        : "opacity-35"
                    }`}
                  >
                    {/* Set number circle */}
                    <div className="flex justify-center">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                          set.logged
                            ? "bg-[#10b981]/20 border border-[#10b981] text-[#10b981]"
                            : isActive
                            ? "bg-[#ec4899] text-white"
                            : "border border-gray-700 text-gray-600"
                        }`}
                      >
                        {i + 1}
                      </div>
                    </div>

                    {/* Weight */}
                    <input
                      type="text"
                      value={set.weight}
                      onChange={(e) => updateSet(i, "weight", e.target.value)}
                      disabled={isFuture}
                      placeholder="—"
                      className={`text-center rounded-lg py-2 text-sm font-bold bg-black/40 text-white placeholder:text-gray-600 focus:outline-none transition-all ${
                        isActive
                          ? "border border-[#ec4899]/60 focus:border-[#ec4899] focus:shadow-[0_0_10px_rgba(236,72,153,0.3)]"
                          : "border border-white/10"
                      } ${isFuture ? "cursor-not-allowed" : ""}`}
                    />

                    {/* Reps */}
                    <input
                      type="text"
                      value={set.reps}
                      onChange={(e) => updateSet(i, "reps", e.target.value)}
                      disabled={isFuture}
                      placeholder="—"
                      className={`text-center rounded-lg py-2 text-sm font-bold bg-black/40 text-white placeholder:text-gray-600 focus:outline-none transition-all ${
                        isActive
                          ? "border border-[#ec4899]/60 focus:border-[#ec4899] focus:shadow-[0_0_10px_rgba(236,72,153,0.3)]"
                          : "border border-white/10"
                      } ${isFuture ? "cursor-not-allowed" : ""}`}
                    />

                    {/* Log button */}
                    <div className="flex justify-center">
                      {set.logged ? (
                        <div className="w-8 h-8 rounded-lg bg-[#10b981]/20 border border-[#10b981] flex items-center justify-center">
                          <span className="material-symbols-outlined text-[#10b981] text-lg">check_circle</span>
                        </div>
                      ) : isActive ? (
                        <button
                          onClick={() => logSet(i)}
                          className="w-8 h-8 rounded-lg bg-[#ec4899] flex items-center justify-center hover:bg-[#ec4899]/80 transition-colors shadow-[0_0_12px_rgba(236,72,153,0.4)]"
                        >
                          <span className="material-symbols-outlined text-white text-lg">check</span>
                        </button>
                      ) : (
                        <div className="w-8 h-8 rounded-lg border border-gray-700 flex items-center justify-center">
                          <span className="material-symbols-outlined text-gray-700 text-lg">check</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Dropset row (only for active set) */}
                  {isActive && hasDropset && (
                    <div className="grid grid-cols-[3rem_1fr_1fr_3rem] gap-3 items-center px-3 py-2 mt-1 ml-4 rounded-lg bg-[#a855f7]/5 border border-[#a855f7]/20">
                      <div className="flex items-center justify-center">
                        <span className="text-[9px] text-[#a855f7] font-bold uppercase flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-sm">south</span>
                          Drop
                        </span>
                      </div>
                      <input
                        type="text"
                        value={drop.weight}
                        onChange={(e) => setDrop((d) => ({ ...d, weight: e.target.value }))}
                        placeholder="—"
                        className="text-center rounded-lg py-2 text-sm font-bold bg-black/40 text-white border border-[#a855f7]/40 focus:border-[#a855f7] focus:outline-none transition-all placeholder:text-gray-600"
                      />
                      <input
                        type="text"
                        value={drop.reps}
                        onChange={(e) => setDrop((d) => ({ ...d, reps: e.target.value }))}
                        placeholder="—"
                        className="text-center rounded-lg py-2 text-sm font-bold bg-black/40 text-white border border-[#a855f7]/40 focus:border-[#a855f7] focus:outline-none transition-all placeholder:text-gray-600"
                      />
                      <div className="flex justify-center">
                        {drop.logged ? (
                          <div className="w-8 h-8 rounded-lg bg-[#10b981]/20 border border-[#10b981] flex items-center justify-center">
                            <span className="material-symbols-outlined text-[#10b981] text-lg">check_circle</span>
                          </div>
                        ) : (
                          <button
                            onClick={logDrop}
                            className="w-8 h-8 rounded-lg border border-[#a855f7]/60 bg-[#a855f7]/10 flex items-center justify-center hover:bg-[#a855f7]/20 transition-colors"
                          >
                            <span className="material-symbols-outlined text-[#a855f7] text-lg">check</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Coming up next — pinned bottom */}
      <div className="shrink-0 border-t border-white/10 bg-[#0a0a0f]/90 backdrop-blur px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Coming up next</span>
          <div className="flex items-center gap-2">
            <span className="text-[#a855f7] font-bold text-sm">∞</span>
            <span className="text-sm font-bold text-white">Superset: Overhead Press + Rows</span>
          </div>
        </div>
        <button className="text-xs text-gray-400 hover:text-white underline transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}
