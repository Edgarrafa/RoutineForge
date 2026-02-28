const MILESTONES = [
  {
    icon: "military_tech",
    iconBg: "bg-[#10b981]/20",
    iconColor: "text-[#10b981]",
    title: "Squat Level 46",
    desc: "Reach 315lbs for 5 reps",
    timeLabel: "~2 Sessions",
    timeLabelColor: "text-[#10b981]",
    progress: "85%",
    progressColor: "bg-[#10b981]",
    progressGlow: "shadow-[0_0_5px_rgba(16,185,129,0.5)]",
  },
  {
    icon: "workspace_premium",
    iconBg: "bg-[#ec4899]/20",
    iconColor: "text-[#ec4899]",
    title: "Consistency King",
    desc: "Complete 4 weeks without missing a session",
    timeLabel: "5 Days Left",
    timeLabelColor: "text-[#ec4899]",
    progress: "60%",
    progressColor: "bg-[#ec4899]",
    progressGlow: "shadow-[0_0_5px_rgba(236,72,153,0.5)]",
  },
];

export default function MilestonesCard() {
  return (
    <div className="cyber-card rounded-xl p-6 border-l-4 border-l-[#10b981]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-[#10b981]">flag</span>
          Upcoming Milestones
        </h3>
        <button className="text-xs text-gray-400 hover:text-white underline transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {MILESTONES.map((m) => (
          <div
            key={m.title}
            className="flex items-center gap-4 bg-white/5 p-3 rounded-lg border border-white/5 hover:border-white/10 transition-colors"
          >
            <div className={`w-10 h-10 rounded-full ${m.iconBg} flex items-center justify-center ${m.iconColor} shrink-0`}>
              <span className="material-symbols-outlined text-lg">{m.icon}</span>
            </div>
            <div className="flex-grow min-w-0">
              <div className="text-sm font-bold text-white">{m.title}</div>
              <div className="text-xs text-gray-400">{m.desc}</div>
            </div>
            <div className="text-right shrink-0">
              <div className={`text-xs font-bold ${m.timeLabelColor}`}>{m.timeLabel}</div>
              <div className="w-20 h-1 bg-gray-700 rounded-full mt-1">
                <div
                  className={`h-full ${m.progressColor} rounded-full ${m.progressGlow}`}
                  style={{ width: m.progress }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
