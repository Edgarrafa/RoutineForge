"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

const EXERCISE_VAULT = [
  { name: "Bench Press", icon: "fitness_center", muscle: "Chest • Strength" },
  { name: "Barbell Squat", icon: "accessibility_new", muscle: "Legs • Compound" },
  { name: "Deadlift", icon: "hardware", muscle: "Back • Power" },
  { name: "Pull-ups", icon: "sports_gymnastics", muscle: "Back • Compound" },
  { name: "Shoulder Press", icon: "fitness_center", muscle: "Shoulders • Strength" },
  { name: "Romanian DL", icon: "fitness_center", muscle: "Hamstrings • Power" },
];

const TIMELINE = [
  { name: "Barbell Squat", details: "3 Sets • 5 Reps • 85% 1RM", color: "red" },
  { name: "Leg Press", details: "3 Sets • 12 Reps • RPE 8", color: "blue" },
];

export default function RoutineCreatorSection() {
  const [search, setSearch] = useState("");

  const filtered = EXERCISE_VAULT.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-24 bg-[#0c0b12] relative border-y border-white/5">
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#06b6d4] font-bold tracking-[0.2em] text-xs uppercase">
            System Architecture
          </span>
          <h2 className="font-[family-name:var(--font-orbitron)] text-3xl md:text-5xl font-bold mt-3 mb-6 text-white">
            Routine Creator <span className="text-[#ec4899]">v2.0</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Drag, drop, and dominate. Build your workout timeline with a
            neon-infused interface.
          </p>
        </div>

        {/* Terminal card */}
        <div className="bg-[#13131f] rounded-2xl shadow-2xl border border-white/10 overflow-hidden ring-1 ring-white/5">
          {/* Terminal header */}
          <div className="bg-[#0f0e17] px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
              <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            </div>
            <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">
              Routine_Builder_v4.exe
            </div>
            <div className="w-10" />
          </div>

          {/* Split layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
            {/* LEFT: Inventory */}
            <div className="lg:col-span-4 border-r border-white/10 p-6 bg-[#0f0e17]">
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-[#06b6d4]">
                  inventory_2
                </span>
                <h3 className="font-bold font-[family-name:var(--font-orbitron)] tracking-widest text-gray-200 uppercase text-sm">
                  Inventory
                </h3>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg z-10">
                  search
                </span>
                <Input
                  type="text"
                  placeholder="Search skills..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 bg-[#1a1926] border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-[#ec4899] focus-visible:border-[#ec4899]"
                />
              </div>

              {/* Exercise list */}
              <div className="space-y-3">
                {filtered.map((ex) => (
                  <div
                    key={ex.name}
                    className="group flex items-center justify-between p-3 bg-[#1a1926] rounded-lg border border-white/5 hover:border-[#ec4899]/50 cursor-grab active:cursor-grabbing transition-all hover:translate-x-1"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all">
                        <span className="material-symbols-outlined text-lg">
                          {ex.icon}
                        </span>
                      </div>
                      <div>
                        <div className="font-bold text-sm text-gray-200 group-hover:text-[#ec4899] transition-colors">
                          {ex.name}
                        </div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wide font-mono">
                          {ex.muscle}
                        </div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-gray-600 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      drag_indicator
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Timeline */}
            <div className="lg:col-span-8 p-8 bg-[#13111c] relative">
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none grid-bg" />

              <div className="flex items-center justify-between mb-10 relative z-10">
                <div className="flex items-center gap-2 text-[#ec4899] font-bold text-sm tracking-[0.2em] uppercase">
                  <span className="material-symbols-outlined text-lg">timeline</span>
                  Quest Timeline: Leg Day
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-2 rounded hover:bg-white/10 text-gray-500 hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-sm">undo</span>
                  </button>
                  <button className="p-2 rounded hover:bg-white/10 text-gray-500 hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-sm">redo</span>
                  </button>
                  <button className="bg-[#ec4899] hover:bg-pink-500 text-white px-5 py-2 rounded font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-[0_0_15px_rgba(236,72,153,0.4)] transition-all hover:scale-105">
                    <span className="material-symbols-outlined text-sm">save</span>
                    Save
                  </button>
                </div>
              </div>

              {/* Timeline entries */}
              <div className="space-y-6 relative z-10 pl-8 border-l border-white/10 ml-3">
                {TIMELINE.map((item, i) => (
                  <div
                    key={i}
                    className="relative bg-[#1a1926] p-5 rounded-lg border border-white/5 hover:border-[#ec4899]/40 shadow-[var(--shadow-card-glow)] transition-all group"
                  >
                    <div
                      className="absolute -left-[41px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0f0e17] border-2 z-20"
                      style={{
                        borderColor: item.color === "red" ? "#ec4899" : "#06b6d4",
                        boxShadow: `0 0 10px ${item.color === "red" ? "rgba(236,72,153,0.8)" : "rgba(6,182,212,0.8)"}`,
                      }}
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-5">
                        <div
                          className={`w-12 h-12 rounded flex items-center justify-center ${
                            item.color === "red"
                              ? "bg-red-500/10 border border-red-500/20 text-red-500"
                              : "bg-blue-500/10 border border-blue-500/20 text-blue-500"
                          }`}
                        >
                          <span className="material-symbols-outlined">
                            {item.color === "red" ? "accessibility_new" : "fitness_center"}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold text-white group-hover:text-[#ec4899] transition-colors">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-400 font-mono mt-1">
                            {item.details}
                          </p>
                        </div>
                      </div>
                      <button className="text-gray-600 hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </div>
                ))}

                {/* Drop zone */}
                <div className="relative border-2 border-dashed border-white/10 rounded-lg p-8 flex flex-col items-center justify-center text-gray-600 hover:text-[#ec4899] hover:border-[#ec4899]/50 hover:bg-[#ec4899]/5 transition-all cursor-pointer h-32 group">
                  <div className="absolute -left-[41px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0f0e17] border-2 border-gray-600 group-hover:border-[#ec4899] z-20 transition-colors" />
                  <span className="material-symbols-outlined text-3xl mb-2 group-hover:scale-110 transition-transform">
                    add_circle
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Drag Exercise Here
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
