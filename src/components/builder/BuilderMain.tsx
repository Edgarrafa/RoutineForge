"use client";

import { useState } from "react";
import type { PrebuiltDay, PrebuiltWeek, TemplateExercise } from "@/types";
import ExerciseLibraryModal, { type LibraryExercise } from "./ExerciseLibraryModal";
import PrebuiltDayPicker from "./PrebuiltDayPicker";
import PrebuiltWeekPicker from "./PrebuiltWeekPicker";

// ─── Types ────────────────────────────────────────────────────────────────────

type SetEntry = { id: number; reps: string };

type BuilderExercise = {
  id: number;
  name: string;
  category: string;
  image: string;
  sets: number;
  reps: string;
  rpe: string;
  individualReps: boolean;
  setEntries: SetEntry[];
  chainWithNext: boolean;
};

type BuilderDay = {
  dayNum: number;
  label: string;
  name: string;
  focus: string;
  isRest: boolean;
  exercises: BuilderExercise[];
};

type BuilderWeek = { days: BuilderDay[] };

// ─── Constants ────────────────────────────────────────────────────────────────

const DAY_LABELS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function makeRestDays(): BuilderDay[] {
  return DAY_LABELS.map((label, i) => ({
    dayNum: i + 1,
    label,
    name: "",
    focus: "",
    isRest: true,
    exercises: [],
  }));
}

function makeSetEntries(count: number, defaultReps: string): SetEntry[] {
  return Array.from({ length: count }, (_, i) => ({ id: i + 1, reps: defaultReps }));
}

const SQUAT_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAo-coYh2NIGKylgQnKeERt32jZIL_wZG7LzDmYQ6upYxM09zLBehwWOtCskct_FAYGbRoiBYRr5qT5ZmUOOTnzGHRSUgmk3nyCD1ZUC3RYkRFH0NowMbOTLVJRwhH6a10VBZCYHge2f4ND0i1elB7Luc_dmZkd3zeXEfHedBYdrBYmRYft5Q70wPf1_eiS433ncitNRjrRFnuiOSUNo4pxJcNATKLfQ1luL9rHdi-SjZ5P20fXQqhs_tEpj9Wpmy3i8EsGNa1zYlg";

const LEG_PRESS_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCenjHDAWxfnkkD-T5x-rw5evl4gJdaKRifCsleB1aYPG-3PWLE4zP3OcY8hF1TtMQdSEf_rbu6OQUPhf0MC1AyrXweY6qNA55YUODrI6WpZerTzbyv6XUBLfAW0gDR-s0XfIEKG1BgxSESvdyQI20H6DPTndlxsQz6fYjEsuNVOTQQXNaTE2QCAP5hJNbLgTwRIj-9d8lvIRDMaXvEnC2k4RGxVWNuFjz6Tz0UgtOvPLyIfKjPa4aUT6_526zC4t3GoKU";

const INITIAL_WEEKS: BuilderWeek[] = [
  {
    days: [
      {
        dayNum: 1,
        label: "Monday",
        name: "Lower Body Power",
        focus: "Squat & Deadlift variations",
        isRest: false,
        exercises: [
          {
            id: 1,
            name: "Barbell Back Squat",
            category: "Barbell • Compound",
            image: SQUAT_IMAGE,
            sets: 4,
            reps: "6-8",
            rpe: "8",
            individualReps: false,
            setEntries: [],
            chainWithNext: false,
          },
          {
            id: 2,
            name: "Leg Press",
            category: "Machine • Legs",
            image: LEG_PRESS_IMAGE,
            sets: 3,
            reps: "10-12",
            rpe: "9",
            individualReps: false,
            setEntries: [],
            chainWithNext: false,
          },
        ],
      },
      {
        dayNum: 2,
        label: "Tuesday",
        name: "Upper Body Push",
        focus: "",
        isRest: false,
        exercises: [],
      },
      { dayNum: 3, label: "Wednesday", name: "", focus: "", isRest: true, exercises: [] },
      {
        dayNum: 4,
        label: "Thursday",
        name: "Upper Body Pull",
        focus: "",
        isRest: false,
        exercises: [],
      },
      {
        dayNum: 5,
        label: "Friday",
        name: "Lower Body Accessory",
        focus: "",
        isRest: false,
        exercises: [],
      },
      { dayNum: 6, label: "Saturday", name: "", focus: "", isRest: true, exercises: [] },
      { dayNum: 7, label: "Sunday", name: "", focus: "", isRest: true, exercises: [] },
    ],
  },
  { days: makeRestDays() },
  { days: makeRestDays() },
  { days: makeRestDays() },
  { days: makeRestDays() },
];

const HEATMAP_WEEKS = [
  { label: "W1", active: true, opacities: ["20", "40", "20", "100", "60", "20", "10"] },
  { label: "W2", active: false, opacities: ["30", "50", "20", "100", "60", "20", "10"], dim: "opacity-60" },
  { label: "W3", active: false, opacities: ["30", "50", "20", "100", "60", "20", "10"], dim: "opacity-50" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function BuilderMain() {
  const [weeks, setWeeks] = useState<BuilderWeek[]>(INITIAL_WEEKS);
  const [activeWeek, setActiveWeek] = useState(0);
  const [modalForDay, setModalForDay] = useState<number | null>(null);
  const [dayPickerForDay, setDayPickerForDay] = useState<number | null>(null);
  const [weekPickerOpen, setWeekPickerOpen] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  const wIdx = activeWeek;
  const currentDays = weeks[wIdx].days;

  // ── State helpers ──────────────────────────────────────────────────────────

  function updateDay(dayNum: number, patch: Partial<BuilderDay>) {
    setWeeks((prev) =>
      prev.map((w, wi) =>
        wi !== wIdx
          ? w
          : {
              days: w.days.map((d) => (d.dayNum === dayNum ? { ...d, ...patch } : d)),
            }
      )
    );
  }

  function updateExercise(dayNum: number, exId: number, patch: Partial<BuilderExercise>) {
    setWeeks((prev) =>
      prev.map((w, wi) =>
        wi !== wIdx
          ? w
          : {
              days: w.days.map((d) =>
                d.dayNum !== dayNum
                  ? d
                  : { ...d, exercises: d.exercises.map((ex) => (ex.id === exId ? { ...ex, ...patch } : ex)) }
              ),
            }
      )
    );
  }

  function addExercise(dayNum: number, libEx: LibraryExercise) {
    const newEx: BuilderExercise = {
      id: Date.now(),
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
    setWeeks((prev) =>
      prev.map((w, wi) =>
        wi !== wIdx
          ? w
          : {
              days: w.days.map((d) =>
                d.dayNum !== dayNum ? d : { ...d, exercises: [...d.exercises, newEx] }
              ),
            }
      )
    );
    setModalForDay(null);
  }

  function removeExercise(dayNum: number, exId: number) {
    setWeeks((prev) =>
      prev.map((w, wi) =>
        wi !== wIdx
          ? w
          : {
              days: w.days.map((d) =>
                d.dayNum !== dayNum
                  ? d
                  : { ...d, exercises: d.exercises.filter((ex) => ex.id !== exId) }
              ),
            }
      )
    );
  }

  function toggleRest(dayNum: number) {
    const day = currentDays.find((d) => d.dayNum === dayNum)!;
    if (day.isRest) {
      updateDay(dayNum, { isRest: false });
    } else {
      updateDay(dayNum, { isRest: true, exercises: [] });
    }
  }

  function toggleCircuit(dayNum: number, exId: number) {
    const day = currentDays.find((d) => d.dayNum === dayNum)!;
    const ex = day.exercises.find((e) => e.id === exId)!;
    updateExercise(dayNum, exId, { chainWithNext: !ex.chainWithNext });
  }

  function toggleIndividualReps(dayNum: number, exId: number) {
    const day = currentDays.find((d) => d.dayNum === dayNum)!;
    const ex = day.exercises.find((e) => e.id === exId)!;
    if (ex.individualReps) {
      updateExercise(dayNum, exId, { individualReps: false, setEntries: [] });
    } else {
      updateExercise(dayNum, exId, {
        individualReps: true,
        setEntries: makeSetEntries(ex.sets, ex.reps),
      });
    }
  }

  function updateSetsCount(dayNum: number, exId: number, newCount: number) {
    const day = currentDays.find((d) => d.dayNum === dayNum)!;
    const ex = day.exercises.find((e) => e.id === exId)!;
    const count = Math.max(1, Math.min(20, newCount));
    let setEntries = ex.setEntries;
    if (ex.individualReps) {
      if (count > setEntries.length) {
        const extras = Array.from({ length: count - setEntries.length }, (_, i) => ({
          id: setEntries.length + i + 1,
          reps: ex.reps,
        }));
        setEntries = [...setEntries, ...extras];
      } else {
        setEntries = setEntries.slice(0, count);
      }
    }
    updateExercise(dayNum, exId, { sets: count, setEntries });
  }

  function updateSetEntry(dayNum: number, exId: number, entryId: number, val: string) {
    const day = currentDays.find((d) => d.dayNum === dayNum)!;
    const ex = day.exercises.find((e) => e.id === exId)!;
    updateExercise(dayNum, exId, {
      setEntries: ex.setEntries.map((se) => (se.id === entryId ? { ...se, reps: val } : se)),
    });
  }

  function handleCopy(dayNum: number) {
    setCopied(dayNum);
    setTimeout(() => setCopied(null), 2000);
  }

  function templateToBuilderEx(te: TemplateExercise, offset: number): BuilderExercise {
    return {
      id: Date.now() + offset,
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

  function loadDayTemplate(dayNum: number, template: PrebuiltDay) {
    const exercises = template.exercises.map((te, i) => templateToBuilderEx(te, i));
    updateDay(dayNum, { name: template.name, focus: template.focus, isRest: false, exercises });
    setDayPickerForDay(null);
  }

  function loadWeekTemplate(template: PrebuiltWeek) {
    const newDays: BuilderDay[] = DAY_LABELS.map((label, i) => {
      const tDay = template.days[i];
      if (!tDay) {
        return { dayNum: i + 1, label, name: "", focus: "", isRest: true, exercises: [] };
      }
      return {
        dayNum: i + 1,
        label,
        name: tDay.name,
        focus: tDay.focus,
        isRest: false,
        exercises: tDay.exercises.map((te, j) => templateToBuilderEx(te, i * 100 + j)),
      };
    });
    setWeeks((prev) => prev.map((w, wi) => (wi !== wIdx ? w : { days: newDays })));
    setWeekPickerOpen(false);
  }

  // ── Day ordinal helper ─────────────────────────────────────────────────────

  function pad(n: number) {
    return String(n).padStart(2, "0");
  }

  // ── Render helpers ─────────────────────────────────────────────────────────

  function renderExerciseCard(day: BuilderDay, ex: BuilderExercise, idx: number) {
    const isChained = ex.chainWithNext;
    const nextEx = day.exercises[idx + 1];
    const isInChainGroup = isChained || (idx > 0 && day.exercises[idx - 1].chainWithNext);

    return (
      <div key={ex.id}>
        {/* Exercise card */}
        <div
          className={`flex items-start gap-3 p-3 rounded-lg bg-[#0d060a]/50 border transition-colors ${
            isInChainGroup
              ? "border-[#f4257b]/40 border-l-4 border-l-[#f4257b]"
              : "border-white/5 hover:border-[#f4257b]/30"
          }`}
        >
          {/* Drag handle */}
          <div className="mt-2 text-slate-500 cursor-grab shrink-0">
            <span className="material-symbols-outlined text-lg">drag_indicator</span>
          </div>

          {/* Image */}
          <div className="size-14 rounded bg-[#0d060a] border border-white/5 shrink-0 overflow-hidden flex items-center justify-center">
            {ex.image ? (
              <img src={ex.image} alt={ex.name} className="w-full h-full object-cover opacity-80" />
            ) : (
              <span className="material-symbols-outlined text-2xl text-gray-700">fitness_center</span>
            )}
          </div>

          {/* Info + fields */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h4 className="text-sm font-bold text-white leading-tight">{ex.name}</h4>
                <span className="text-[10px] text-[#00f3ff] uppercase tracking-wider">{ex.category}</span>
              </div>
              {isInChainGroup && (
                <span className="text-[9px] font-black uppercase tracking-widest text-[#f4257b] bg-[#f4257b]/10 border border-[#f4257b]/30 px-2 py-0.5 rounded shrink-0">
                  Circuit
                </span>
              )}
            </div>

            {/* Fields row */}
            <div className="flex flex-wrap items-start gap-3">
              {/* Sets */}
              <div className="flex flex-col">
                <label className="text-[10px] text-slate-500 uppercase mb-1">Sets</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={ex.sets}
                  onChange={(e) => updateSetsCount(day.dayNum, ex.id, Number(e.target.value))}
                  className="w-14 bg-[#0d060a] border border-slate-700 rounded p-1.5 text-center text-sm text-white focus:border-[#f4257b] focus:outline-none focus:shadow-[0_0_10px_rgba(244,37,123,0.3)] transition-all"
                />
              </div>

              {/* Reps — global or per-set */}
              {!ex.individualReps ? (
                <div className="flex flex-col">
                  <label className="text-[10px] text-slate-500 uppercase mb-1">Reps</label>
                  <input
                    type="text"
                    value={ex.reps}
                    onChange={(e) => updateExercise(day.dayNum, ex.id, { reps: e.target.value })}
                    className="w-20 bg-[#0d060a] border border-slate-700 rounded p-1.5 text-center text-sm text-white focus:border-[#f4257b] focus:outline-none focus:shadow-[0_0_10px_rgba(244,37,123,0.3)] transition-all"
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-500 uppercase">Reps / Set</label>
                  {ex.setEntries.map((se) => (
                    <div key={se.id} className="flex items-center gap-1.5">
                      <span className="text-[9px] text-slate-600 w-10 text-right shrink-0">Set {se.id}</span>
                      <input
                        type="text"
                        value={se.reps}
                        onChange={(e) => updateSetEntry(day.dayNum, ex.id, se.id, e.target.value)}
                        className="w-14 bg-[#0d060a] border border-slate-700 rounded p-1 text-center text-xs text-white focus:border-[#f4257b] focus:outline-none transition-all"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* RPE */}
              <div className="flex flex-col">
                <label className="text-[10px] text-slate-500 uppercase mb-1">RPE</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  step={0.5}
                  value={ex.rpe}
                  onChange={(e) => updateExercise(day.dayNum, ex.id, { rpe: e.target.value })}
                  className="w-16 bg-[#0d060a] border border-slate-700 rounded p-1.5 text-center text-sm text-white focus:border-[#f4257b] focus:outline-none focus:shadow-[0_0_10px_rgba(244,37,123,0.3)] transition-all"
                />
              </div>

              {/* Per-set toggle */}
              <div className="flex flex-col">
                <label className="text-[10px] text-slate-500 uppercase mb-1">Per-Set</label>
                <button
                  onClick={() => toggleIndividualReps(day.dayNum, ex.id)}
                  className={`px-2.5 py-1.5 rounded text-xs font-bold border transition-all ${
                    ex.individualReps
                      ? "bg-[#f4257b]/20 border-[#f4257b] text-[#f4257b]"
                      : "bg-transparent border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300"
                  }`}
                >
                  {ex.individualReps ? "On" : "Off"}
                </button>
              </div>
            </div>
          </div>

          {/* Delete */}
          <button
            onClick={() => removeExercise(day.dayNum, ex.id)}
            className="mt-1 text-slate-600 hover:text-red-400 transition-colors shrink-0"
            title="Remove exercise"
          >
            <span className="material-symbols-outlined text-lg">delete</span>
          </button>
        </div>

        {/* Circuit connector — between exercises, not after last */}
        {nextEx && (
          <div className="flex items-center gap-2 py-1.5 px-4 group/connector">
            <button
              onClick={() => toggleCircuit(day.dayNum, ex.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${
                isChained
                  ? "bg-[#f4257b]/15 border-[#f4257b]/60 text-[#f4257b]"
                  : "border-slate-700 text-slate-600 opacity-0 group-hover/connector:opacity-100 hover:border-slate-500 hover:text-slate-400"
              }`}
            >
              <span className="material-symbols-outlined text-sm">link</span>
              {isChained ? "Circuit ✓" : "Add to Circuit"}
            </button>
            {isChained && (
              <div className="flex-1 h-px bg-[#f4257b]/30" />
            )}
          </div>
        )}
      </div>
    );
  }

  function renderDay(day: BuilderDay) {
    const isCopied = copied === day.dayNum;

    // A. Rest Day
    if (day.isRest) {
      return (
        <div key={day.dayNum} className="relative rounded-xl border border-white/5 bg-[#0d060a]/20">
          <div className="flex items-center justify-between p-4 opacity-60 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center justify-center size-12 rounded bg-[#0d060a] border border-white/5">
                <span className="text-[10px] text-slate-600 uppercase font-bold">Day</span>
                <span className="text-xl font-bold text-slate-500 leading-none">{pad(day.dayNum)}</span>
              </div>
              <div>
                <p className="text-[10px] text-slate-600 uppercase tracking-wider">{day.label}</p>
                <h3 className="text-base font-bold text-slate-400 tracking-wide italic flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">hotel</span>
                  Rest Day
                </h3>
              </div>
            </div>
            <button
              onClick={() => toggleRest(day.dayNum)}
              className="text-xs text-slate-500 hover:text-[#f4257b] underline transition-colors"
            >
              Change
            </button>
          </div>
        </div>
      );
    }

    // B. Empty Workout Day
    if (day.exercises.length === 0) {
      return (
        <div
          key={day.dayNum}
          className="relative group rounded-xl border border-white/10 bg-[#1a0f14]/40 hover:bg-[#1a0f14]/80 transition-all"
        >
          <div className="p-4 space-y-3">
            {/* Header row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 opacity-70 group-hover:opacity-100 transition-opacity">
                <div className="flex flex-col items-center justify-center size-12 rounded bg-[#0d060a] border border-white/10 group-hover:border-[#f4257b]/30">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Day</span>
                  <span className="text-xl font-bold text-slate-300 group-hover:text-white leading-none">{pad(day.dayNum)}</span>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">{day.label}</p>
                  <h3 className="text-base font-bold text-slate-300 group-hover:text-white tracking-wide">
                    {day.name || "Untitled Workout"}
                  </h3>
                  <p className="text-xs text-slate-500">Empty Routine</p>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => toggleRest(day.dayNum)}
                  className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  Mark Rest
                </button>
                <button
                  onClick={() => setDayPickerForDay(day.dayNum)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/30 hover:bg-[#a855f7] hover:text-white transition-all text-xs font-bold uppercase"
                >
                  <span className="material-symbols-outlined text-sm">library_books</span>
                  Use Template
                </button>
                <button
                  onClick={() => setModalForDay(day.dayNum)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f4257b]/10 text-[#f4257b] border border-[#f4257b]/20 hover:bg-[#f4257b] hover:text-white transition-all shadow-[0_0_10px_rgba(244,37,123,0.3)] text-xs font-bold uppercase"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  From Scratch
                </button>
              </div>
            </div>

            {/* Name + Focus inputs — visible on hover */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Workout Name"
                value={day.name}
                onChange={(e) => updateDay(day.dayNum, { name: e.target.value })}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0d060a]/80 border border-[#f4257b]/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#f4257b] placeholder:text-slate-600 transition-all"
              />
              <input
                type="text"
                placeholder="Focus / theme (optional)"
                value={day.focus}
                onChange={(e) => updateDay(day.dayNum, { focus: e.target.value })}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0d060a]/80 border border-[#f4257b]/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#f4257b] placeholder:text-slate-600 transition-all"
              />
            </div>
          </div>
        </div>
      );
    }

    // C. Active Workout Day (has exercises)
    return (
      <div
        key={day.dayNum}
        className="relative rounded-xl border border-[#f4257b]/30 bg-[#1a0f14]/80 shadow-lg overflow-hidden transition-all hover:border-[#f4257b]/50"
      >
        {/* Day header */}
        <div className="flex items-center justify-between p-4 border-b border-[#f4257b]/10 bg-white/5">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center justify-center size-12 rounded bg-[#0d060a] border border-[#f4257b]/30">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Day</span>
              <span className="text-xl font-bold text-white leading-none">{pad(day.dayNum)}</span>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">{day.label}</p>
              {/* Editable name */}
              <input
                type="text"
                value={day.name}
                onChange={(e) => updateDay(day.dayNum, { name: e.target.value })}
                placeholder="Workout Name"
                className="bg-transparent text-base font-bold text-white tracking-wide focus:outline-none border-b border-transparent focus:border-[#f4257b]/50 placeholder:text-slate-500 w-48 transition-all"
              />
              {/* Editable focus */}
              <input
                type="text"
                value={day.focus}
                onChange={(e) => updateDay(day.dayNum, { focus: e.target.value })}
                placeholder="Focus (optional)"
                className="block bg-transparent text-xs text-slate-400 focus:outline-none border-b border-transparent focus:border-[#f4257b]/30 focus:text-white placeholder:text-slate-600 w-48 transition-all mt-0.5"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy(day.dayNum)}
              className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">content_copy</span>
              {isCopied ? "Copied!" : "Copy"}
            </button>
            <button
              onClick={() => updateDay(day.dayNum, { exercises: [] })}
              className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">delete</span> Clear
            </button>
            <button
              onClick={() => toggleRest(day.dayNum)}
              className="flex items-center gap-1 px-3 py-1.5 rounded border border-slate-700 text-xs font-medium text-slate-300 hover:border-slate-500 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">hotel</span> Mark Rest
            </button>
          </div>
        </div>

        {/* Exercises */}
        <div className="p-4 space-y-1">
          {day.exercises.map((ex, idx) => renderExerciseCard(day, ex, idx))}

          {/* Add Exercise */}
          <button
            onClick={() => setModalForDay(day.dayNum)}
            className="w-full mt-2 py-4 rounded-lg border-2 border-dashed border-[#f4257b]/30 text-[#f4257b]/70 hover:text-white hover:border-[#f4257b] hover:bg-[#f4257b]/10 transition-all flex items-center justify-center gap-2 group/add"
          >
            <span className="material-symbols-outlined group-hover/add:scale-110 transition-transform">
              add_circle
            </span>
            <span className="text-sm font-bold tracking-wider uppercase">
              Add Exercise to {day.label}
            </span>
          </button>
        </div>
      </div>
    );
  }

  // ── Main render ────────────────────────────────────────────────────────────

  return (
    <section className="flex-1 flex flex-col min-w-0 bg-[#0d060a]/30 relative">
      {/* Modals */}
      {modalForDay !== null && (
        <ExerciseLibraryModal
          onClose={() => setModalForDay(null)}
          onAdd={(libEx) => addExercise(modalForDay, libEx)}
        />
      )}
      {dayPickerForDay !== null && (
        <PrebuiltDayPicker
          onClose={() => setDayPickerForDay(null)}
          onSelect={(template) => loadDayTemplate(dayPickerForDay, template)}
        />
      )}
      {weekPickerOpen && (
        <PrebuiltWeekPicker
          onClose={() => setWeekPickerOpen(false)}
          onSelect={loadWeekTemplate}
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

        {weeks.map((_, i) => (
          <button
            key={i}
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
            <span
              className={`text-sm font-bold tracking-wider ${
                activeWeek === i ? "" : "group-hover:text-[#f4257b]"
              } transition-colors`}
            >
              WEEK {i + 1}
            </span>
            {activeWeek === i && (
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#f4257b] shadow-[0_0_10px_rgba(244,37,123,0.5)]" />
            )}
          </button>
        ))}

        <button
          onClick={() => setActiveWeek((v) => Math.min(weeks.length - 1, v + 1))}
          className="h-14 px-4 border-l border-[#f4257b]/10 hover:bg-white/5 text-slate-400 flex items-center justify-center ml-auto sticky right-0 bg-[#0d060a]/80 z-10"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>

      {/* Scrollable Day Canvas */}
      <div className="flex-1 overflow-y-auto p-8 space-y-4 pb-56">
        {/* Week template banner — shown when all days are rest */}
        {currentDays.every((d) => d.isRest) && (
          <div className="flex items-center justify-between p-4 rounded-xl border border-[#a855f7]/30 bg-[#a855f7]/5 mb-2">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#a855f7] text-2xl">calendar_view_week</span>
              <div>
                <p className="text-white font-bold text-sm">This week is empty</p>
                <p className="text-slate-500 text-xs">Load a pre-built week structure to get started quickly.</p>
              </div>
            </div>
            <button
              onClick={() => setWeekPickerOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#a855f7]/10 border border-[#a855f7]/30 text-[#a855f7] text-xs font-bold uppercase tracking-wider hover:bg-[#a855f7] hover:text-white transition-all"
            >
              <span className="material-symbols-outlined text-sm">library_books</span>
              Load Week Template
            </button>
          </div>
        )}
        {currentDays.map((day) => renderDay(day))}
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
                  {week.opacities.map((op, ci) => (
                    <div
                      key={ci}
                      className="w-full rounded-sm"
                      style={{
                        height: `${parseInt(op)}%`,
                        backgroundColor: `rgba(244,37,123,${parseInt(op) / 100})`,
                        boxShadow: op === "100" ? "0 0 6px rgba(244,37,123,0.5)" : undefined,
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
