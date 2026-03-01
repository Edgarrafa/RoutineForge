"use client";

import { ACHIEVEMENTS } from "@/data/mockData";

const volumePoints = [380, 410, 395, 430, 450, 420, 460, 470, 445, 480, 465, 482.5];
const W = 280;
const H = 60;
const minV = Math.min(...volumePoints);
const maxV = Math.max(...volumePoints);

function toSvgCoords(points: number[]) {
  return points
    .map((v, i) => {
      const x = (i / (points.length - 1)) * W;
      const y = H - ((v - minV) / (maxV - minV)) * H;
      return `${x},${y}`;
    })
    .join(" ");
}

export default function HistoryStatsRow() {
  const unlocked = ACHIEVEMENTS.filter((a) => a.unlocked);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Monthly Volume */}
      <div className="bg-[#0f0f23] border border-[#2d2d55] rounded-xl p-5 flex flex-col gap-3">
        <p className="text-[#9ca3af] text-xs font-semibold uppercase tracking-widest font-[family-name:var(--font-lexend)]">
          Monthly Volume
        </p>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-white text-3xl font-black font-[family-name:var(--font-lexend)]">
              482,500
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[#10b981] text-xs font-semibold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-sm">arrow_upward</span>
                12%
              </span>
              <span className="text-[#9ca3af] text-xs">vs last month</span>
            </div>
          </div>
          <span className="text-[#9ca3af] text-sm">kg</span>
        </div>
        <svg width={W} height={H} className="w-full h-auto mt-1" viewBox={`0 0 ${W} ${H}`}>
          <defs>
            <linearGradient id="sparkGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#bc13fe" />
              <stop offset="100%" stopColor="#ff00ff" />
            </linearGradient>
          </defs>
          <polyline
            points={toSvgCoords(volumePoints)}
            fill="none"
            stroke="url(#sparkGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Total XP Gained */}
      <div className="bg-[#0f0f23] border border-[#2d2d55] rounded-xl p-5 flex flex-col items-center justify-center gap-2">
        <p className="text-[#9ca3af] text-xs font-semibold uppercase tracking-widest font-[family-name:var(--font-lexend)]">
          Total XP Gained (Dec)
        </p>
        <p className="text-white text-5xl font-black font-[family-name:var(--font-lexend)] drop-shadow-[0_0_20px_rgba(255,0,255,0.4)]">
          12,450
        </p>
        <p className="text-[#00f3ff] text-xs font-bold uppercase tracking-widest animate-pulse">
          Level Up Imminent
        </p>
      </div>

      {/* Achievements */}
      <div className="bg-[#0f0f23] border border-[#2d2d55] rounded-xl p-5 flex flex-col gap-3">
        <p className="text-[#9ca3af] text-xs font-semibold uppercase tracking-widest font-[family-name:var(--font-lexend)]">
          Achievements Unlocked
        </p>
        <div className="grid grid-cols-4 gap-2">
          {ACHIEVEMENTS.map((ach) => (
            <div
              key={ach.id}
              className={`aspect-square rounded-lg flex items-center justify-center ${
                ach.unlocked
                  ? "bg-[#1a1a3e] border border-[#2d2d55]"
                  : "bg-[#0a0a1a] border border-[#1a1a2e] opacity-40"
              }`}
              style={ach.unlocked ? { boxShadow: `0 0 10px ${ach.color}33` } : {}}
            >
              <span
                className="material-symbols-outlined text-xl"
                style={{ color: ach.unlocked ? ach.color : "#4b5563" }}
              >
                {ach.icon}
              </span>
            </div>
          ))}
        </div>
        <p className="text-[#9ca3af] text-xs">
          <span className="text-[#ff00ff] font-bold">{unlocked.length}</span> of {ACHIEVEMENTS.length} unlocked
        </p>
      </div>
    </div>
  );
}
