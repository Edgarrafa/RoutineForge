"use client";

import { useState } from "react";
import ProgramSidebar from "./ProgramSidebar";
import ExerciseCard, { type BuilderExercise } from "./ExerciseCard";
import ExerciseLibraryModal, { type LibraryExercise } from "./ExerciseLibraryModal";

let _id = 1000;

function makeId() {
  return _id++;
}

type Props = {
  onBack?: () => void;
};

export default function DayBuilder({ onBack }: Props) {
  const [exercises, setExercises] = useState<BuilderExercise[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

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
    setExercises((prev) => [...prev, newEx]);
    setModalOpen(false);
  }

  function updateExercise(id: number, patch: Partial<BuilderExercise>) {
    setExercises((prev) => prev.map((ex) => (ex.id === id ? { ...ex, ...patch } : ex)));
  }

  function removeExercise(id: number) {
    setExercises((prev) => prev.filter((ex) => ex.id !== id));
  }

  function toggleCircuit(id: number) {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, chainWithNext: !ex.chainWithNext } : ex))
    );
  }

  return (
    <>
      {modalOpen && (
        <ExerciseLibraryModal onClose={() => setModalOpen(false)} onAdd={addExercise} />
      )}

      <ProgramSidebar builderType="day" />

      <section className="flex-1 flex flex-col min-w-0 bg-[#0d060a]/30 relative">
        {/* Canvas header */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-[#f4257b]/20 bg-[#0d060a]/60 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-1.5 text-slate-500 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Change Type
              </button>
            )}
            <h2 className="text-white font-bold text-lg uppercase tracking-widest">Session Builder</h2>
            <span className="text-xs font-bold text-[#f4257b] bg-[#f4257b]/10 border border-[#f4257b]/30 px-2 py-0.5 rounded">
              {exercises.length} exercise{exercises.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Scrollable exercise list */}
        <div className="flex-1 overflow-y-auto p-8 space-y-2">
          {exercises.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <span className="material-symbols-outlined text-5xl text-slate-700 mb-4">fitness_center</span>
              <p className="text-slate-500 text-sm mb-1">No exercises yet</p>
              <p className="text-slate-600 text-xs">Add your first exercise below to start building your session.</p>
            </div>
          )}

          {exercises.map((ex, idx) => {
            const isInChainGroup = ex.chainWithNext || (idx > 0 && exercises[idx - 1].chainWithNext);
            const showConnector = idx < exercises.length - 1;
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
            className="w-full mt-4 py-6 rounded-lg border-2 border-dashed border-[#f4257b]/30 text-[#f4257b]/70 hover:text-white hover:border-[#f4257b] hover:bg-[#f4257b]/10 transition-all flex items-center justify-center gap-2 group/add"
          >
            <span className="material-symbols-outlined group-hover/add:scale-110 transition-transform">add_circle</span>
            <span className="text-sm font-bold tracking-wider uppercase">Add Exercise</span>
          </button>
        </div>
      </section>
    </>
  );
}
