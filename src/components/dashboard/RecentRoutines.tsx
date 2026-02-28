const ROUTINES = [
  {
    name: "Upper Body Power",
    meta: "Yesterday • 45 mins",
    stat: "12,450 kg vol",
    icon: "fitness_center",
    accentColor: "#00f3ff",
    accentOpacity: "rgba(0,243,255,0.2)",
    hoverTitle: "group-hover:text-[#00f3ff]",
    gradientFrom: "from-[#00f3ff]",
  },
  {
    name: "Morning Cardio",
    meta: "2 days ago • 30 mins",
    stat: "350 kcal",
    icon: "directions_run",
    accentColor: "#ff00ff",
    accentOpacity: "rgba(255,0,255,0.2)",
    hoverTitle: "group-hover:text-[#ff00ff]",
    gradientFrom: "from-[#ff00ff]",
  },
  {
    name: "Full Body Strength",
    meta: "4 days ago • 60 mins",
    stat: "15,200 kg vol",
    icon: "accessibility_new",
    accentColor: "#bc13fe",
    accentOpacity: "rgba(188,19,254,0.2)",
    hoverTitle: "group-hover:text-[#bc13fe]",
    gradientFrom: "from-[#bc13fe]",
  },
];

export default function RecentRoutines() {
  return (
    <div className="flex flex-col gap-4">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h2 className="text-white text-lg font-bold uppercase tracking-wider flex items-center gap-2 font-[family-name:var(--font-lexend)]">
          <span className="material-symbols-outlined text-[#00f3ff]">history</span>
          Recent Routines
        </h2>
        <div className="flex gap-2">
          <button className="bg-[#0f0f23] border border-[#2d2d55] rounded p-1 hover:border-[#00f3ff] text-[#9ca3af] hover:text-white transition-colors">
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <button className="bg-[#0f0f23] border border-[#2d2d55] rounded p-1 hover:border-[#00f3ff] text-[#9ca3af] hover:text-white transition-colors">
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>

      {/* 3-col grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ROUTINES.map((r) => (
          <div
            key={r.name}
            className="bg-[#0f0f23] border border-[#2d2d55] rounded-xl flex flex-col hover:border-[#00f3ff]/50 transition-colors group overflow-hidden"
          >
            {/* Top accent strip */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${r.gradientFrom} to-transparent`} />

            <div className="p-5 flex flex-col h-full justify-between gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className={`text-white font-bold text-lg transition-colors ${r.hoverTitle} font-[family-name:var(--font-lexend)]`}>
                    {r.name}
                  </h4>
                  <p className="text-[#9ca3af] text-xs mt-1">{r.meta}</p>
                </div>
                <div
                  className="w-10 h-10 rounded bg-[#050510] border border-[#2d2d55] flex items-center justify-center shrink-0"
                  style={{
                    color: r.accentColor,
                    boxShadow: `0 0 10px ${r.accentOpacity}`,
                  }}
                >
                  <span className="material-symbols-outlined">{r.icon}</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#2d2d55] pt-3">
                <span className="text-[#ff00ff] font-mono text-sm">{r.stat}</span>
                <button className="px-3 py-1 text-xs bg-[#00f3ff]/10 border border-[#00f3ff]/50 text-[#00f3ff] font-bold rounded hover:bg-[#00f3ff] hover:text-black transition-all flex items-center gap-1 uppercase tracking-wide">
                  <span className="material-symbols-outlined text-sm">replay</span>
                  Repeat
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
