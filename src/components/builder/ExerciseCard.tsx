"use client";

// Shared exercise card used by DayBuilder, WeeklyBuilder, and BuilderMain.

export type SetEntry = { id: number; reps: string };

export type BuilderExercise = {
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

type Props = {
  exercise: BuilderExercise;
  showCircuitConnector: boolean; // true = render connector row after this card
  isInChainGroup: boolean;       // this card is part of a circuit (visual highlight)
  onUpdate: (patch: Partial<BuilderExercise>) => void;
  onRemove: () => void;
  onToggleCircuit: () => void;   // toggle chainWithNext
};

export function makeSetEntries(count: number, defaultReps: string): SetEntry[] {
  return Array.from({ length: count }, (_, i) => ({ id: i + 1, reps: defaultReps }));
}

export default function ExerciseCard({
  exercise: ex,
  showCircuitConnector,
  isInChainGroup,
  onUpdate,
  onRemove,
  onToggleCircuit,
}: Props) {
  function handleSetsChange(newCount: number) {
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
    onUpdate({ sets: count, setEntries });
  }

  function handleToggleIndividualReps() {
    if (ex.individualReps) {
      onUpdate({ individualReps: false, setEntries: [] });
    } else {
      onUpdate({ individualReps: true, setEntries: makeSetEntries(ex.sets, ex.reps) });
    }
  }

  function updateSetEntry(entryId: number, val: string) {
    onUpdate({
      setEntries: ex.setEntries.map((se) => (se.id === entryId ? { ...se, reps: val } : se)),
    });
  }

  return (
    <div>
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

          {/* Fields */}
          <div className="flex flex-wrap items-start gap-3">
            {/* Sets */}
            <div className="flex flex-col">
              <label className="text-[10px] text-slate-500 uppercase mb-1">Sets</label>
              <input
                type="number"
                min={1}
                max={20}
                value={ex.sets}
                onChange={(e) => handleSetsChange(Number(e.target.value))}
                className="w-14 bg-[#0d060a] border border-slate-700 rounded p-1.5 text-center text-sm text-white focus:border-[#f4257b] focus:outline-none transition-all"
              />
            </div>

            {/* Reps — global or per-set */}
            {!ex.individualReps ? (
              <div className="flex flex-col">
                <label className="text-[10px] text-slate-500 uppercase mb-1">Reps</label>
                <input
                  type="text"
                  value={ex.reps}
                  onChange={(e) => onUpdate({ reps: e.target.value })}
                  className="w-20 bg-[#0d060a] border border-slate-700 rounded p-1.5 text-center text-sm text-white focus:border-[#f4257b] focus:outline-none transition-all"
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
                      onChange={(e) => updateSetEntry(se.id, e.target.value)}
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
                onChange={(e) => onUpdate({ rpe: e.target.value })}
                className="w-16 bg-[#0d060a] border border-slate-700 rounded p-1.5 text-center text-sm text-white focus:border-[#f4257b] focus:outline-none transition-all"
              />
            </div>

            {/* Per-set toggle */}
            <div className="flex flex-col">
              <label className="text-[10px] text-slate-500 uppercase mb-1">Per-Set</label>
              <button
                onClick={handleToggleIndividualReps}
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
          onClick={onRemove}
          className="mt-1 text-slate-600 hover:text-red-400 transition-colors shrink-0"
          title="Remove exercise"
        >
          <span className="material-symbols-outlined text-lg">delete</span>
        </button>
      </div>

      {/* Circuit connector — only rendered between exercises when showCircuitConnector=true */}
      {showCircuitConnector && (
        <div className="flex items-center gap-2 py-1.5 px-4 group/connector">
          <button
            onClick={onToggleCircuit}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${
              ex.chainWithNext
                ? "bg-[#f4257b]/15 border-[#f4257b]/60 text-[#f4257b]"
                : "border-slate-700 text-slate-600 opacity-0 group-hover/connector:opacity-100 hover:border-slate-500 hover:text-slate-400"
            }`}
          >
            <span className="material-symbols-outlined text-sm">link</span>
            {ex.chainWithNext ? "Circuit ✓" : "Add to Circuit"}
          </button>
          {ex.chainWithNext && <div className="flex-1 h-px bg-[#f4257b]/30" />}
        </div>
      )}
    </div>
  );
}
