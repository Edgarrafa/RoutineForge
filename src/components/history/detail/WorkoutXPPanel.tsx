import type { WorkoutLog } from "@/types";
import { useUser } from "@/context/UserContext";

type Props = { log: WorkoutLog };

export default function WorkoutXPPanel({ log }: Props) {
  const { user } = useUser();
  const xpPct = Math.min(100, ((user.xp + log.xp) / user.xpToNext) * 100);

  return (
    <div className="bg-[#0d0d1a] border border-[#2d2d55] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-[#2d2d55]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-bold text-base">XP Earned</h3>
          <div className="flex items-center gap-1.5 text-[#f59e0b]">
            <span className="material-symbols-outlined text-lg">star</span>
            <span className="text-xl font-black text-white">
              {log.xp.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Level progress */}
        <div className="flex items-center justify-between text-xs text-[#9ca3af] mb-2">
          <span>Level {user.level}</span>
          <span>Level {user.level + 1}</span>
        </div>
        <div className="h-2.5 bg-[#1a1a3e] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#bc13fe] to-[#ff00ff] shadow-[0_0_8px_rgba(255,0,255,0.5)] transition-all"
            style={{ width: `${xpPct}%` }}
          />
        </div>
        <p className="text-[#9ca3af] text-xs mt-1.5 text-right">
          {(user.xpToNext - user.xp).toLocaleString()} XP to next level
        </p>
      </div>

      {/* XP Breakdown */}
      <div className="p-5 flex flex-col gap-3 border-b border-[#2d2d55]">
        {[
          { label: "Volume Base", value: log.xpBreakdown.volumeBase, color: "#9ca3af" },
          { label: "Clan Bonus", value: log.xpBreakdown.clanBonus, color: "#00f3ff", icon: "group" },
          { label: "Achievements", value: log.xpBreakdown.achievements, color: "#f59e0b", icon: "emoji_events" },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between bg-[#0a0a14] rounded-xl px-4 py-3">
            <div className="flex items-center gap-2">
              {row.icon && (
                <span className="material-symbols-outlined text-base" style={{ color: row.color }}>
                  {row.icon}
                </span>
              )}
              <span className="text-[#9ca3af] text-sm">{row.label}</span>
            </div>
            <span className="font-bold text-sm" style={{ color: row.color }}>
              +{row.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Quest Completed */}
      {log.quest && (
        <div className="p-5 border-b border-[#2d2d55]">
          <div className="bg-[#0a0a14] border border-[#2d2d55] rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ec4899]/20 border border-[#ec4899]/30 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-base text-[#ec4899]">sports_martial_arts</span>
            </div>
            <div>
              <p className="text-[#ec4899] text-[10px] font-bold uppercase tracking-widest">Quest Completed</p>
              <p className="text-white text-sm font-bold">{log.quest.title}</p>
              <p className="text-[#9ca3af] text-xs">{log.quest.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="p-5 flex flex-col gap-2">
        <button className="w-full flex items-center justify-center gap-2 bg-[#ec4899] hover:bg-[#d6357a] text-white text-sm font-bold py-3 rounded-xl transition-colors uppercase tracking-wider">
          <span className="material-symbols-outlined text-base">replay</span>
          Repeat Workout
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-[#1a1a2e] border border-[#2d2d55] text-white text-sm font-semibold py-3 rounded-xl hover:border-[#ec4899] transition-colors">
          <span className="material-symbols-outlined text-base">share</span>
          Share to Clan
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-[#1a1a2e] border border-[#2d2d55] text-white text-sm font-semibold py-3 rounded-xl hover:border-[#a855f7] transition-colors">
          <span className="material-symbols-outlined text-base">picture_as_pdf</span>
          Export PDF
        </button>
      </div>
    </div>
  );
}
