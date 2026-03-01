import type { WorkoutLog } from "@/types";

type Props = { log: WorkoutLog };

export default function WorkoutDetailStats({ log }: Props) {
  const stats = [
    { label: "Duration", value: log.duration, icon: "schedule" },
    { label: "Volume", value: log.volume, icon: "fitness_center" },
    { label: "Sets", value: log.totalSets > 0 ? String(log.totalSets) : "—", icon: "repeat" },
    {
      label: "PRs Broken",
      value: (
        <span className="flex items-center gap-1.5 text-[#ec4899]">
          {log.prsBroken}
          {log.prsBroken > 0 && (
            <span className="material-symbols-outlined text-base text-[#a855f7]">bolt</span>
          )}
        </span>
      ),
      icon: "emoji_events",
      accent: log.prsBroken > 0,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-[#0d0d1a] border border-[#2d2d55] rounded-xl p-4 flex flex-col gap-1"
        >
          <p className="text-[#9ca3af] text-xs uppercase tracking-widest font-semibold">{s.label}</p>
          <p className={`text-white text-xl font-black font-[family-name:var(--font-orbitron)] ${s.accent ? "text-[#ec4899]" : ""}`}>
            {s.value}
          </p>
        </div>
      ))}
    </div>
  );
}
