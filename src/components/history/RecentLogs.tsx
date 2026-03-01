"use client";

import Link from "next/link";
import { HISTORY_LOGS } from "@/data/mockData";

export default function RecentLogs() {
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-white text-xl font-bold font-[family-name:var(--font-lexend)]">
          Recent Logs
        </h2>
        <div className="flex items-center gap-2">
          <button className="bg-[#0f0f23] border border-[#2d2d55] text-white text-sm px-4 py-1.5 rounded-lg font-[family-name:var(--font-lexend)] hover:border-[#ff00ff] transition-colors">
            This Month
          </button>
          <button className="bg-[#0f0f23] border border-[#2d2d55] text-[#9ca3af] p-1.5 rounded-lg hover:border-[#ff00ff] hover:text-white transition-all">
            <span className="material-symbols-outlined text-lg">tune</span>
          </button>
        </div>
      </div>

      {/* Log Cards */}
      <div className="flex flex-col gap-3">
        {HISTORY_LOGS.map((log) => (
          <div
            key={log.id}
            className="bg-[#0f0f23] border border-[#2d2d55] rounded-xl overflow-hidden hover:border-[#bc13fe] transition-all group"
          >
            <div className="flex items-center gap-4 p-4">
              {/* Thumbnail */}
              <div className="relative shrink-0 w-24 h-16 rounded-lg overflow-hidden bg-[#1a1a3e]">
                {log.image ? (
                  <img
                    src={log.image}
                    alt={log.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#2d2d55] text-3xl">fitness_center</span>
                  </div>
                )}
                {log.isNewPR && (
                  <div className="absolute top-1 left-1 bg-[#ec4899] text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
                    New PR
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[#9ca3af] text-xs mb-1">{log.date}</p>
                <h3 className="text-white font-bold text-base font-[family-name:var(--font-lexend)] group-hover:text-[#ff00ff] transition-colors truncate">
                  {log.name}
                </h3>
                <div className="flex items-center gap-4 mt-2 flex-wrap">
                  {log.totalSets > 0 ? (
                    <>
                      <span className="flex items-center gap-1 text-[#9ca3af] text-xs">
                        <span className="material-symbols-outlined text-sm">fitness_center</span>
                        {log.volume}
                      </span>
                      <span className="flex items-center gap-1 text-[#9ca3af] text-xs">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        {log.duration}
                      </span>
                      <span className="flex items-center gap-1 text-[#9ca3af] text-xs">
                        <span className="material-symbols-outlined text-sm">repeat</span>
                        {log.totalSets} Sets
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="flex items-center gap-1 text-[#9ca3af] text-xs">
                        <span className="material-symbols-outlined text-sm">local_fire_department</span>
                        {log.volume}
                      </span>
                      <span className="flex items-center gap-1 text-[#9ca3af] text-xs">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        {log.duration}
                      </span>
                      <span className="flex items-center gap-1 text-[#9ca3af] text-xs">
                        <span className="material-symbols-outlined text-sm">favorite</span>
                        145 BPM
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* XP + Details */}
              <div className="flex flex-col items-end gap-3 shrink-0">
                <span className="flex items-center gap-1 text-[#10b981] text-sm font-bold bg-[#10b981]/10 px-2.5 py-1 rounded-lg">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  +{log.xp.toLocaleString()} XP
                </span>
                <Link
                  href={`/history/${log.id}`}
                  className="bg-[#1a1a3e] border border-[#2d2d55] text-white text-xs font-bold px-4 py-1.5 rounded-lg uppercase tracking-widest hover:border-[#ff00ff] hover:text-[#ff00ff] transition-all font-[family-name:var(--font-lexend)]"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
