const STATS = [
  { label: "STR", value: "Lvl 12", percent: 70, color: "from-red-600 to-red-400", glow: "rgba(239,68,68,0.8)", icon: "bolt", iconColor: "text-red-500" },
  { label: "AGI", value: "Lvl 8", percent: 45, color: "from-blue-600 to-cyan-400", glow: "rgba(6,182,212,0.8)", icon: "directions_run", iconColor: "text-blue-500" },
  { label: "INT", value: "Lvl 15", percent: 85, color: "from-purple-600 to-fuchsia-400", glow: "rgba(192,38,211,0.8)", icon: "psychology", iconColor: "text-purple-500" },
  { label: "CON", value: "Lvl 10", percent: 60, color: "from-green-600 to-emerald-400", glow: "rgba(16,185,129,0.8)", icon: "shield", iconColor: "text-green-500" },
];

const DAILY_QUESTS = [
  { label: "Complete 50 Pushups", done: false },
  { label: "Log morning workout", done: true },
  { label: "Hit protein goal (180g)", done: true },
];

export default function CharacterSheetSection() {
  return (
    <section className="py-24 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-orbitron)] text-4xl font-bold mb-12 text-center text-white">
          Your{" "}
          <span className="text-[#a855f7] text-glow">Character Sheet</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Player Stats — wide card */}
          <div className="lg:col-span-2 cyber-card p-8 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-32 bg-[#a855f7]/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <h3 className="font-[family-name:var(--font-orbitron)] text-2xl font-bold text-white group-hover:text-[#a855f7] transition-colors">
                  Player Stats
                </h3>
                <p className="text-gray-400 font-mono text-sm mt-1">
                  Level 42 • Grandmaster
                </p>
              </div>
              <span className="bg-[#ec4899]/20 text-[#ec4899] text-[10px] font-bold px-3 py-1 rounded border border-[#ec4899]/30 uppercase tracking-widest shadow-[0_0_10px_rgba(236,72,153,0.2)] animate-pulse">
                +5% XP Boost Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 relative z-10">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="flex justify-between text-sm font-bold mb-3">
                    <span className={`flex items-center gap-2 text-gray-200`}>
                      <span className={`material-symbols-outlined text-lg ${stat.iconColor}`}>
                        {stat.icon}
                      </span>
                      {stat.label}
                    </span>
                    <span className={`${stat.iconColor} font-mono`}>{stat.value}</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                      style={{
                        width: `${stat.percent}%`,
                        boxShadow: `0 0 10px ${stat.glow}`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute -bottom-10 -right-10 opacity-5 text-white pointer-events-none">
              <span className="material-symbols-outlined" style={{ fontSize: 200 }}>
                person
              </span>
            </div>
          </div>

          {/* Current Class */}
          <div className="cyber-card p-8 shadow-lg flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ec4899]/5 to-transparent pointer-events-none" />
            <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 relative z-10">
              <span>Current Class</span>
              <span className="material-symbols-outlined text-sm">keyboard_double_arrow_up</span>
            </div>
            <div className="text-center py-4 relative z-10">
              <div className="w-24 h-24 mx-auto rounded-full bg-[#0f0e17] border-2 border-[#ec4899] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(236,72,153,0.4)] relative">
                <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20" />
                <span className="material-symbols-outlined text-4xl text-[#ec4899]">
                  security
                </span>
              </div>
              <h3 className="text-2xl font-[family-name:var(--font-orbitron)] font-bold text-white mb-2">
                The Tank
              </h3>
              <p className="text-xs text-gray-400 font-mono">
                Hypertrophy &amp; Durability
              </p>
            </div>
            <div className="relative z-10 mt-4">
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-gradient-to-r from-[#ec4899] to-[#a855f7] w-[33%] shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
              </div>
              <div className="text-right text-[10px] text-[#ec4899] font-mono font-bold">
                Week 4 / 12
              </div>
            </div>
          </div>

          {/* Login Streak */}
          <div className="cyber-card p-6 flex items-center justify-between group">
            <div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                Login Streak
              </div>
              <div className="font-[family-name:var(--font-orbitron)] text-3xl font-black text-white group-hover:text-orange-400 transition-colors">
                14 Days
              </div>
            </div>
            <div className="w-14 h-14 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.2)] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">
                local_fire_department
              </span>
            </div>
          </div>

          {/* Daily Quest */}
          <div className="cyber-card p-6 border-l-4 border-l-yellow-500">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-yellow-500 text-sm">stars</span>
              <h4 className="font-[family-name:var(--font-orbitron)] font-bold text-white text-sm uppercase tracking-wider">
                Daily Quest
              </h4>
            </div>
            <div className="space-y-2 mb-4">
              {DAILY_QUESTS.map((q) => (
                <div key={q.label} className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                      q.done
                        ? "bg-[#10b981] border-[#10b981]"
                        : "border-gray-600"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      q.done ? "text-gray-500 line-through" : "text-white"
                    }`}
                  >
                    {q.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-end">
              <span className="text-[10px] text-gray-500 bg-white/5 px-2 py-1 rounded">
                Reward:{" "}
                <span className="text-yellow-400 font-bold">500 XP</span>
              </span>
              <span className="font-mono text-[#ec4899] font-bold text-lg">0/1</span>
            </div>
          </div>

          {/* Armory */}
          <div className="cyber-card p-6 flex items-center gap-4 group cursor-pointer hover:bg-[#1a1926]">
            <div className="w-16 h-16 rounded bg-[#0f0e17] border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-[#ec4899] group-hover:border-[#ec4899]/50 transition-all shadow-inner">
              <span className="material-symbols-outlined text-3xl">handyman</span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-white group-hover:text-[#ec4899] transition-colors">
                Armory
              </h4>
              <p className="text-[10px] text-gray-500 font-mono mt-1">
                Upgrade gear &amp; stats
              </p>
            </div>
            <span className="material-symbols-outlined text-gray-600 group-hover:translate-x-1 transition-transform">
              chevron_right
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
