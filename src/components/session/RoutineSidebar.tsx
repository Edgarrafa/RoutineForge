"use client";

import { useSession } from "@/context/SessionContext";

const XP_TOTAL = 850;
const XP_CURRENT = 450;

type ExerciseStatus = "done" | "active" | "pending";

type RoutineItem = {
  name: string;
  status: ExerciseStatus;
  superset?: boolean;
};

function ExerciseRow({ item }: { item: RoutineItem }) {
  if (item.status === "done") {
    return (
      <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400">
        <div className="w-6 h-6 rounded-full bg-[#10b981]/20 border border-[#10b981] flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[#10b981] text-sm">check</span>
        </div>
        <span className="text-sm font-medium line-through opacity-60">{item.name}</span>
      </div>
    );
  }

  if (item.status === "active") {
    return (
      <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#ec4899]/10 border border-[#ec4899]/40 shadow-[0_0_12px_rgba(236,72,153,0.15)]">
        <div className="w-6 h-6 rounded-full bg-[#ec4899] flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-white text-sm">close</span>
        </div>
        <span className="text-sm font-bold text-white flex-1">{item.name}</span>
        <span className="text-[9px] font-black bg-[#ec4899] text-white px-1.5 py-0.5 rounded uppercase tracking-wider">
          NOW
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors">
      <div className="w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center shrink-0" />
      <span className="text-sm text-gray-500">{item.name}</span>
    </div>
  );
}

export default function RoutineSidebar() {
  const { exercises, currentIndex } = useSession();

  const routine: RoutineItem[] = exercises.map((ex, i) => ({
    name: ex.name,
    status: i < currentIndex ? "done" : i === currentIndex ? "active" : "pending",
    superset: ex.superset,
  }));

  const supersetItems = routine.filter((r) => r.superset);
  const firstSupersetIdx = routine.findIndex((x) => x.superset);
  const lastSupersetIdx = routine.findLastIndex((x) => x.superset);
  const nonSupersetBefore = routine.filter((r, i) => !r.superset && i < firstSupersetIdx);
  const nonSupersetAfter = routine.filter((r, i) => !r.superset && i > lastSupersetIdx);

  return (
    <aside className="w-52 shrink-0 border-r border-white/5 bg-[#0a0a0f] flex flex-col overflow-y-auto">
      {/* Session XP */}
      <div className="m-3 p-4 rounded-xl bg-gradient-to-br from-[#a855f7]/20 to-[#ec4899]/10 border border-[#a855f7]/30">
        <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Session XP</div>
        <div className="flex items-baseline gap-1">
          <span className="font-[family-name:var(--font-orbitron)] text-3xl font-black text-white">
            +{XP_CURRENT}
          </span>
          <span className="text-[#a855f7] font-bold text-sm">XP</span>
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="material-symbols-outlined text-[#10b981] text-sm">trending_up</span>
          <span className="text-xs text-[#10b981] font-medium">1.5x Multiplier Active</span>
        </div>
        {/* XP progress bar */}
        <div className="mt-3 h-1 bg-black/40 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#ec4899] to-[#a855f7] rounded-full"
            style={{ width: `${(XP_CURRENT / XP_TOTAL) * 100}%` }}
          />
        </div>
      </div>

      {/* Routine list */}
      <div className="px-2 pb-4">
        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest px-3 py-2">
          Routine
        </div>

        <div className="flex flex-col gap-1">
          {/* Items before superset */}
          {nonSupersetBefore.map((item) => (
            <ExerciseRow key={item.name} item={item} />
          ))}

          {/* Superset group */}
          {supersetItems.length > 0 && (
            <div className="flex gap-1 mt-1 mb-1">
              {/* Superset label + line */}
              <div className="flex flex-col items-center w-6 shrink-0 py-2">
                <div className="flex-1 w-px bg-[#a855f7]/50" />
                <span
                  className="text-[8px] text-[#a855f7] font-black uppercase my-1"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.15em" }}
                >
                  Superset
                </span>
                <div className="flex-1 w-px bg-[#a855f7]/50" />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                {supersetItems.map((item) => (
                  <ExerciseRow key={item.name} item={item} />
                ))}
              </div>
            </div>
          )}

          {/* Items after superset */}
          {nonSupersetAfter.map((item) => (
            <ExerciseRow key={item.name} item={item} />
          ))}
        </div>
      </div>
    </aside>
  );
}
