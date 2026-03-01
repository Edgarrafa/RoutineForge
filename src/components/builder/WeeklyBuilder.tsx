"use client";

import { useState } from "react";
import type { PrebuiltDay, TemplateExercise } from "@/types";
import ProgramSidebar from "./ProgramSidebar";
import ExerciseCard, { type BuilderExercise } from "./ExerciseCard";
import ExerciseLibraryModal, { type LibraryExercise } from "./ExerciseLibraryModal";
import PrebuiltDayPicker from "./PrebuiltDayPicker";

// ─── Types ────────────────────────────────────────────────────────────────────

type WeekDay = {
  label: string;
  shortLabel: string;
  name: string;
  focus: string;
  isRest: boolean;
  exercises: BuilderExercise[];
};

// ─── Constants ────────────────────────────────────────────────────────────────

const WEEK_DAYS: Array<{ label: string; shortLabel: string }> = [
  { label: "Monday", shortLabel: "Mon" },
  { label: "Tuesday", shortLabel: "Tue" },
  { label: "Wednesday", shortLabel: "Wed" },
  { label: "Thursday", shortLabel: "Thu" },
  { label: "Friday", shortLabel: "Fri" },
  { label: "Saturday", shortLabel: "Sat" },
  { label: "Sunday", shortLabel: "Sun" },
];

function makeInitialDays(): WeekDay[] {
  return WEEK_DAYS.map((d) => ({
    ...d,
    name: "",
    focus: "",
    isRest: true,
    exercises: [],
  }));
}

let _id = 2000;
function makeId() {
  return _id++;
}

function templateToBuilderEx(te: TemplateExercise): BuilderExercise {
  return {
    id: makeId(),
    name: te.name,
    category: te.category,
    image: "",
    sets: te.sets,
    reps: te.reps,
    rpe: te.rpe,
    individualReps: false,
    setEntries: [],
    chainWithNext: false,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function WeeklyBuilder() {
  const [days, setDays] = useState<WeekDay[]>(makeInitialDays());
  const [activeDay, setActiveDay] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [dayPickerOpen, setDayPickerOpen] = useState(false);

  const day = days[activeDay];

  // ── Helpers ────────────────────────────────────────────────────────────────

  function updateDay(idx: number, patch: Partial<WeekDay>) {
    setDays((prev) => prev.map((d, i) => (i === idx ? { ...d, ...patch } : d)));
  }

  function addExercise(libEx: LibraryExercise) {
    const newEx: BuilderExercise = {
      id: makeId(),
      name: libEx.name,
      category: `${libEx.equipment} • ${libEx.subcategory}`,
      image: libEx.image ?? "",
      sets: 3,
      reps: "8-12",
      rpe: "8",
      individualReps: false,
      setEntries: [],
      chainWithNext: false,
    };
    updateDay(activeDay, { exercises: [...day.exercises, newEx] });
    setModalOpen(false);
  }

  function updateExercise(exId: number, patch: Partial<BuilderExercise>) {
    updateDay(activeDay, {
      exercises: day.exercises.map((ex) => (ex.id === exId ? { ...ex, ...patch } : ex)),
    });
  }

  function removeExercise(exId: number) {
    updateDay(activeDay, { exercises: day.exercises.filter((ex) => ex.id !== exId) });
  }

  function toggleCircuit(exId: number) {
    updateDay(activeDay, {
      exercises: day.exercises.map((ex) =>
        ex.id === exId ? { ...ex, chainWithNext: !ex.chainWithNext } : ex
      ),
    });
  }

  function loadTemplate(template: PrebuiltDay) {
    updateDay(activeDay, {
      name: template.name,
      focus: template.focus,
      isRest: false,
      exercises: template.exercises.map(templateToBuilderEx),
    });
    setDayPickerOpen(false);
  }

  // ── Render helpers ─────────────────────────────────────────────────────────

  function renderActiveDay() {
    // A. Rest day
    if (day.isRest) {
      return (
        <div className="flex flex-col items-center justify-center h-80 gap-6 text-center">
          <div className="size-20 rounded-2xl bg-[#1a0f14] border border-white/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-slate-600">hotel</span>
          </div>
          <div>
            <p className="text-white font-bold text-lg mb-1">{day.label} — Rest Day</p>
            <p className="text-slate-500 text-sm">This day is set to rest. Change it or load a workout template.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => updateDay(activeDay, { isRest: false })}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white text-sm font-bold hover:bg-white/10 transition-all"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
              Start from Scratch
            </button>
            <button
              onClick={() => setDayPickerOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#f4257b]/10 border border-[#f4257b]/30 text-[#f4257b] text-sm font-bold hover:bg-[#f4257b] hover:text-white transition-all shadow-[0_0_10px_rgba(244,37,123,0.2)]"
            >
              <span className="material-symbols-outlined text-sm">library_books</span>
              Use Template
            </button>
          </div>
        </div>
      );
    }

    // B. Empty workout
    if (day.exercises.length === 0) {
      return (
        <div className="space-y-6">
          {/* Name / Focus inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-500 uppercase tracking-wide mb-1.5">Workout Name</label>
              <input
                type="text"
                value={day.name}
                onChange={(e) => updateDay(activeDay, { name: e.target.value })}
                placeholder="e.g. Push Day"
                className="w-full bg-[#0d060a]/80 border border-[#f4257b]/30 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#f4257b] placeholder:text-slate-600 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 uppercase tracking-wide mb-1.5">Focus (optional)</label>
              <input
                type="text"
                value={day.focus}
                onChange={(e) => updateDay(activeDay, { focus: e.target.value })}
                placeholder="e.g. Chest & Triceps"
                className="w-full bg-[#0d060a]/80 border border-[#f4257b]/30 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#f4257b] placeholder:text-slate-600 transition-all"
              />
            </div>
          </div>

          {/* Options */}
          <div className="flex flex-col items-center justify-center h-48 gap-4 text-center border-2 border-dashed border-white/10 rounded-xl">
            <p className="text-slate-500 text-sm">No exercises yet — choose how to start:</p>
            <div className="flex gap-3">
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white text-sm font-bold hover:bg-white/10 transition-all"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                Add Exercise
              </button>
              <button
                onClick={() => setDayPickerOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#f4257b]/10 border border-[#f4257b]/30 text-[#f4257b] text-sm font-bold hover:bg-[#f4257b] hover:text-white transition-all shadow-[0_0_10px_rgba(244,37,123,0.2)]"
              >
                <span className="material-symbols-outlined text-sm">library_books</span>
                Use Template
              </button>
            </div>
            <button
              onClick={() => updateDay(activeDay, { isRest: true })}
              className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
            >
              Mark as Rest Day instead
            </button>
          </div>
        </div>
      );
    }

    // C. Active workout with exercises
    return (
      <div className="space-y-2">
        {/* Workout header (editable) */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
          <div className="flex gap-4">
            <div>
              <input
                type="text"
                value={day.name}
                onChange={(e) => updateDay(activeDay, { name: e.target.value })}
                placeholder="Workout Name"
                className="bg-transparent text-base font-bold text-white tracking-wide focus:outline-none border-b border-transparent focus:border-[#f4257b]/50 placeholder:text-slate-500 w-48 transition-all"
              />
              <input
                type="text"
                value={day.focus}
                onChange={(e) => updateDay(activeDay, { focus: e.target.value })}
                placeholder="Focus (optional)"
                className="block bg-transparent text-xs text-slate-400 focus:outline-none border-b border-transparent focus:border-[#f4257b]/30 focus:text-white placeholder:text-slate-600 w-48 transition-all mt-0.5"
              />
            </div>
            <span className="self-end text-xs text-[#f4257b] bg-[#f4257b]/10 border border-[#f4257b]/30 px-2 py-0.5 rounded mb-0.5">
              {day.exercises.length} ex
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDayPickerOpen(true)}
              className="text-xs text-slate-500 hover:text-[#f4257b] transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">library_books</span>
              Load Template
            </button>
            <button
              onClick={() => updateDay(activeDay, { exercises: [], name: "", focus: "" })}
              className="text-xs text-slate-600 hover:text-red-400 transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">delete</span>
              Clear
            </button>
            <button
              onClick={() => updateDay(activeDay, { isRest: true, exercises: [], name: "", focus: "" })}
              className="text-xs text-slate-600 hover:text-slate-400 transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">hotel</span>
              Mark Rest
            </button>
          </div>
        </div>

        {day.exercises.map((ex, idx) => {
          const isInChainGroup = ex.chainWithNext || (idx > 0 && day.exercises[idx - 1].chainWithNext);
          const showConnector = idx < day.exercises.length - 1;
          return (
            <ExerciseCard
              key={ex.id}
              exercise={ex}
              showCircuitConnector={showConnector}
              isInChainGroup={isInChainGroup}
              onUpdate={(patch) => updateExercise(ex.id, patch)}
              onRemove={() => removeExercise(ex.id)}
              onToggleCircuit={() => toggleCircuit(ex.id)}
            />
          );
        })}

        {/* Add Exercise */}
        <button
          onClick={() => setModalOpen(true)}
          className="w-full mt-2 py-4 rounded-lg border-2 border-dashed border-[#f4257b]/30 text-[#f4257b]/70 hover:text-white hover:border-[#f4257b] hover:bg-[#f4257b]/10 transition-all flex items-center justify-center gap-2 group/add"
        >
          <span className="material-symbols-outlined group-hover/add:scale-110 transition-transform">add_circle</span>
          <span className="text-sm font-bold tracking-wider uppercase">Add Exercise to {day.label}</span>
        </button>
      </div>
    );
  }

  // ── Main render ────────────────────────────────────────────────────────────

  return (
    <>
      {modalOpen && (
        <ExerciseLibraryModal onClose={() => setModalOpen(false)} onAdd={addExercise} />
      )}
      {dayPickerOpen && (
        <PrebuiltDayPicker onClose={() => setDayPickerOpen(false)} onSelect={loadTemplate} />
      )}

      <ProgramSidebar builderType="weekly" />

      <section className="flex-1 flex flex-col min-w-0 bg-[#0d060a]/30 relative">
        {/* Day tab bar */}
        <div className="flex items-stretch border-b border-[#f4257b]/20 bg-[#0d060a]/80 backdrop-blur-sm overflow-x-auto hide-scroll shrink-0">
          {days.map((d, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className={`relative flex-1 min-w-[80px] flex flex-col items-center justify-center py-3 px-2 border-r border-[#f4257b]/10 transition-all ${
                activeDay === i
                  ? "bg-[#f4257b]/10 text-white"
                  : "text-slate-500 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="text-xs font-bold tracking-wider">{d.shortLabel}</span>
              {!d.isRest && d.exercises.length > 0 && (
                <span className="text-[9px] text-[#f4257b] font-bold mt-0.5">{d.exercises.length}ex</span>
              )}
              {d.isRest && (
                <span className="text-[9px] text-slate-600 mt-0.5">Rest</span>
              )}
              {activeDay === i && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#f4257b] shadow-[0_0_10px_rgba(244,37,123,0.5)]" />
              )}
            </button>
          ))}
        </div>

        {/* Active day canvas */}
        <div className="flex-1 overflow-y-auto p-8">
          {renderActiveDay()}
        </div>
      </section>
    </>
  );
}
