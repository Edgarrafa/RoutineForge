"use client";

import { useState } from "react";
import ExerciseLibraryModal, { type LibraryExercise } from "./ExerciseLibraryModal";

const WEEKS = ["WEEK 1", "WEEK 2", "WEEK 3", "WEEK 4", "WEEK 5"];

type Exercise = {
  id: number;
  name: string;
  category: string;
  image: string;
  sets: string;
  reps: string;
  rpe: string;
};

const INITIAL_EXERCISES: Exercise[] = [
  {
    id: 1,
    name: "Barbell Back Squat",
    category: "Compound • Legs",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAo-coYh2NIGKylgQnKeERt32jZIL_wZG7LzDmYQ6upYxM09zLBehwWOtCskct_FAYGbRoiBYRr5qT5ZmUOOTnzGHRSUgmk3nyCD1ZUC3RYkRFH0NowMbOTLVJRwhH6a10VBZCYHge2f4ND0i1elB7Luc_dmZkd3zeXEfHedBYdrBYmRYft5Q70wPf1_eiS433ncitNRjrRFnuiOSUNo4pxJcNATKLfQ1luL9rHdi-SjZ5P20fXQqhs_tEpj9Wpmy3i8EsGNa1zYlg",
    sets: "4",
    reps: "6-8",
    rpe: "8",
  },
  {
    id: 2,
    name: "Leg Press",
    category: "Machine • Legs",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCenjHDAWxfnkkD-T5x-rw5evl4gJdaKFSVA8kRoRifCsleB1aYPG-3PWLE4zP3OcY8hF1TtMQdSEf_rbu6OQUPhf0MC1AyrXweY6qNA55YUODrI6WpZerTzbyv6XUBLfAW0gDR-s0XfIEKG1BgxSESvdyQI20H6DPTndlxsQz6fYjEsuNVOTQQXNaTE2QCAP5hJNbLgTwRIj-9d8lvIRDMaXvEnC2k4RGxVWNuFjz6Tz0UgtOvPLyIfKjPa4aUT6_526zC4t3GoKU",
    sets: "3",
    reps: "10-12",
    rpe: "9",
  },
];

const HEATMAP_WEEKS = [
  {
    label: "W1",
    active: true,
    cells: ["10%", "15%", "10%", "30%", "20%", "10%", "5%"],
    opacities: ["20", "40", "20", "100", "60", "20", "10"],
  },
  {
    label: "W2",
    active: false,
    cells: ["12%", "18%", "10%", "32%", "22%", "10%", "5%"],
    opacities: ["30", "50", "20", "100", "60", "20", "10"],
    dim: "opacity-60",
  },
  {
    label: "W3",
    active: false,
    cells: ["15%", "20%", "10%", "35%", "25%", "10%", "5%"],
    opacities: ["30", "50", "20", "100", "60", "20", "10"],
    dim: "opacity-50",
  },
];

export default function BuilderMain() {
  const [activeWeek, setActiveWeek] = useState(0);
  const [exercises, setExercises] = useState<Exercise[]>(INITIAL_EXERCISES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRestDay, setIsRestDay] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function updateExercise(id: number, field: keyof Exercise, value: string) {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, [field]: value } : ex))
    );
  }

  function handleAddFromLibrary(libEx: LibraryExercise) {
    setExercises((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: libEx.name,
        category: `${libEx.equipment} • ${libEx.subcategory}`,
        image: libEx.image ?? "",
        sets: "3",
        reps: "8-12",
        rpe: "8",
      },
    ]);
    setIsModalOpen(false);
  }

  return (
    <section className="flex-1 flex flex-col min-w-0 bg-[#0d060a]/30 relative">
      {isModalOpen && (
        <ExerciseLibraryModal
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddFromLibrary}
        />
      )}
      {/* Week Navigation Tabs */}
      <div className="flex items-center border-b border-[#f4257b]/20 bg-[#0d060a]/80 backdrop-blur-sm overflow-x-auto hide-scroll">
        <button
          onClick={() => setActiveWeek((v) => Math.max(0, v - 1))}
          className="h-14 px-4 border-r border-[#f4257b]/10 hover:bg-white/5 text-slate-400 flex items-center justify-center sticky left-0 bg-[#0d060a]/80 z-10"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>

        {WEEKS.map((week, i) => (
          <button
            key={week}
            onClick={() => setActiveWeek(i)}
            className={`group relative h-14 min-w-[120px] px-6 flex flex-col items-center justify-center border-r border-[#f4257b]/10 overflow-hidden transition-all ${
              activeWeek === i
                ? "bg-[#f4257b]/10 text-white"
                : "text-slate-500 hover:text-white hover:bg-white/5"
            }`}
          >
            {activeWeek === i && (
              <span className="text-xs text-[#f4257b]/70 font-mono mb-0.5">CURRENT</span>
            )}
            <span className={`text-sm font-bold tracking-wider ${activeWeek === i ? "" : "group-hover:text-[#f4257b]"} transition-colors`}>
              {week}
            </span>
            {activeWeek === i && (
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#f4257b] shadow-[0_0_10px_rgba(244,37,123,0.5)]" />
            )}
          </button>
        ))}

        <button
          onClick={() => setActiveWeek((v) => Math.min(WEEKS.length - 1, v + 1))}
          className="h-14 px-4 border-l border-[#f4257b]/10 hover:bg-white/5 text-slate-400 flex items-center justify-center ml-auto sticky right-0 bg-[#0d060a]/80 z-10"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>

      {/* Scrollable Day Canvas */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 pb-56">

        {/* Day 1 — Expanded/Active or Rest */}
        {isRestDay ? (
          <div className="relative rounded-xl border border-white/5 bg-[#0d060a]/20">
            <div className="flex items-center justify-between p-4 opacity-70 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center size-12 rounded bg-[#0d060a] border border-white/5">
                  <span className="text-[10px] text-slate-600 uppercase font-bold">Day</span>
                  <span className="text-xl font-bold text-slate-500 leading-none">01</span>
                </div>
                <h3 className="text-lg font-bold text-slate-400 tracking-wide italic flex items-center gap-2">
                  <span className="material-symbols-outlined">hotel</span>
                  Rest Day
                </h3>
              </div>
              <button
                onClick={() => setIsRestDay(false)}
                className="text-xs text-slate-500 hover:text-white underline"
              >
                Change
              </button>
            </div>
          </div>
        ) : (
        <div className="relative rounded-xl border border-[#f4257b]/30 bg-[#1a0f14]/80 shadow-lg overflow-hidden transition-all hover:border-[#f4257b]/50">
          {/* Day header */}
          <div className="flex items-center justify-between p-4 border-b border-[#f4257b]/10 bg-white/5">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center justify-center size-12 rounded bg-[#0d060a] border border-[#f4257b]/30">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Day</span>
                <span className="text-xl font-bold text-white leading-none">01</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide">Lower Body Power</h3>
                <p className="text-xs text-slate-400">Focus: Squat &amp; Deadlift variations</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">content_copy</span>
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={() => setExercises([])}
                className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">delete</span> Clear
              </button>
              <button
                onClick={() => setIsRestDay(true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded border border-slate-700 text-xs font-medium text-slate-300 hover:border-slate-500 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">hotel</span> Mark Rest
              </button>
            </div>
          </div>

          {/* Exercises */}
          <div className="p-4 space-y-3">
            {exercises.map((ex) => (
              <div
                key={ex.id}
                className="flex items-start gap-4 p-3 rounded-lg bg-[#0d060a]/50 border border-white/5 hover:border-[#f4257b]/30 transition-colors"
              >
                <div className="mt-2 text-slate-500 cursor-grab">
                  <span className="material-symbols-outlined text-lg">drag_indicator</span>
                </div>
                <div className="size-16 rounded bg-[#0d060a] border border-white/5 shrink-0 overflow-hidden flex items-center justify-center">
                  {ex.image ? (
                    <img src={ex.image} alt={ex.name} className="w-full h-full object-cover opacity-80" />
                  ) : (
                    <span className="material-symbols-outlined text-2xl text-gray-700">fitness_center</span>
                  )}
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-4">
                    <h4 className="text-sm font-bold text-white">{ex.name}</h4>
                    <span className="text-[10px] text-[#00f3ff] uppercase tracking-wider">{ex.category}</span>
                  </div>
                  <div className="md:col-span-8 grid grid-cols-3 gap-4">
                    {(["sets", "reps", "rpe"] as const).map((field) => (
                      <div key={field} className="flex flex-col">
                        <label className="text-[10px] text-slate-500 uppercase mb-1">{field}</label>
                        <input
                          type={field === "reps" ? "text" : "number"}
                          value={ex[field]}
                          onChange={(e) => updateExercise(ex.id, field, e.target.value)}
                          className="bg-[#0d060a] border border-slate-700 rounded p-1.5 text-center text-sm text-white focus:border-[#f4257b] focus:outline-none focus:shadow-[0_0_10px_rgba(244,37,123,0.3)] transition-all"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <button className="mt-2 text-slate-600 hover:text-[#f4257b] transition-colors">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
            ))}

            {/* Add Exercise */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-4 rounded-lg border-2 border-dashed border-[#f4257b]/30 text-[#f4257b]/70 hover:text-white hover:border-[#f4257b] hover:bg-[#f4257b]/10 transition-all flex items-center justify-center gap-2 group/add"
            >
              <span className="material-symbols-outlined group-hover/add:scale-110 transition-transform">
                add_circle
              </span>
              <span className="text-sm font-bold tracking-wider uppercase">Add Exercise to Day 1</span>
            </button>
          </div>
        </div>
        )}

        {/* Day 2 — Empty */}
        <div className="relative group rounded-xl border border-white/10 bg-[#1a0f14]/40 hover:bg-[#1a0f14]/80 transition-all">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4 opacity-70 group-hover:opacity-100 transition-opacity">
              <div className="flex flex-col items-center justify-center size-12 rounded bg-[#0d060a] border border-white/10 group-hover:border-[#f4257b]/30">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Day</span>
                <span className="text-xl font-bold text-slate-300 group-hover:text-white leading-none">02</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-300 group-hover:text-white tracking-wide">
                  Upper Body Push
                </h3>
                <p className="text-xs text-slate-500">Empty Routine</p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#f4257b]/10 text-[#f4257b] border border-[#f4257b]/20 hover:bg-[#f4257b] hover:text-white transition-all shadow-[0_0_10px_rgba(244,37,123,0.3)] opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span className="text-xs font-bold uppercase">Build</span>
            </button>
          </div>
        </div>

        {/* Day 3 — Rest */}
        <div className="relative rounded-xl border border-white/5 bg-[#0d060a]/20">
          <div className="flex items-center justify-between p-4 opacity-50 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center justify-center size-12 rounded bg-[#0d060a] border border-white/5">
                <span className="text-[10px] text-slate-600 uppercase font-bold">Day</span>
                <span className="text-xl font-bold text-slate-500 leading-none">03</span>
              </div>
              <h3 className="text-lg font-bold text-slate-400 tracking-wide italic flex items-center gap-2">
                <span className="material-symbols-outlined">hotel</span>
                Rest Day
              </h3>
            </div>
            <button className="text-xs text-slate-500 hover:text-white underline">Change</button>
          </div>
        </div>
      </div>

      {/* Density Heatmap — pinned bottom */}
      <div className="h-48 border-t border-[#f4257b]/20 bg-[#0d060a]/95 backdrop-blur absolute bottom-0 left-0 w-full z-20 flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="px-6 py-3 border-b border-white/5 flex justify-between items-center">
          <h4 className="text-xs font-bold text-[#00f3ff] tracking-[0.2em] uppercase flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">show_chart</span>
            Program Density Map
          </h4>
          <div className="flex items-center gap-4 text-[10px] text-slate-500">
            <div className="flex items-center gap-1">
              <div className="size-2 rounded-sm bg-[#f4257b]/20" /> Low
            </div>
            <div className="flex items-center gap-1">
              <div className="size-2 rounded-sm bg-[#f4257b]/60" /> Med
            </div>
            <div className="flex items-center gap-1">
              <div className="size-2 rounded-sm bg-[#f4257b] shadow-[0_0_6px_rgba(244,37,123,0.5)]" /> High
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-x-auto">
          <div className="flex h-full items-end gap-1 min-w-max">
            {/* Y-axis */}
            <div className="flex flex-col justify-between h-full text-[9px] text-slate-600 pr-2 pb-6 border-r border-white/5">
              <span>High</span>
              <span>Low</span>
            </div>

            {/* Active weeks */}
            {HEATMAP_WEEKS.map((week) => (
              <div
                key={week.label}
                className={`flex flex-col gap-1 items-center h-full justify-end cursor-pointer w-12 group ${week.dim ?? ""} hover:opacity-100 transition-opacity`}
              >
                <div className="w-full flex-1 flex flex-col gap-[2px] justify-end pb-2">
                  {week.cells.map((h, ci) => (
                    <div
                      key={ci}
                      className="w-full rounded-sm"
                      style={{
                        height: h,
                        backgroundColor: `rgba(244,37,123,${parseInt(week.opacities[ci]) / 100})`,
                        boxShadow: week.opacities[ci] === "100" ? "0 0 6px rgba(244,37,123,0.5)" : undefined,
                      }}
                    />
                  ))}
                </div>
                <span
                  className={`text-[9px] font-mono font-bold ${
                    week.active ? "text-[#f4257b]" : "text-slate-500"
                  }`}
                >
                  {week.label}
                </span>
              </div>
            ))}

            {/* Placeholder weeks */}
            {["W4", "W5"].map((label) => (
              <div key={label} className="flex flex-col gap-1 items-center h-full justify-end w-12 opacity-30">
                <div className="w-full flex-1 flex flex-col gap-[2px] justify-end pb-2 border border-dashed border-slate-700 rounded-sm bg-white/5" />
                <span className="text-[9px] font-mono text-slate-600">{label}</span>
              </div>
            ))}

            <div className="flex-1 flex items-center pl-4 opacity-30">
              <span className="text-xs text-slate-500 italic">... configuring remaining weeks</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
