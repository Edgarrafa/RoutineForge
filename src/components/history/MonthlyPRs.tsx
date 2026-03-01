const PRS = [
  { icon: "accessibility_new", name: "Squat", date: "Dec 08", value: "145 kg", delta: "+5 kg", color: "#00f3ff" },
  { icon: "fitness_center", name: "Bench", date: "Dec 12", value: "105 kg", delta: "+2.5 kg", color: "#ff00ff" },
  { icon: "arrow_downward", name: "Deadlift", date: "Dec 03", value: "180 kg", delta: "+10 kg", color: "#bc13fe" },
];

export default function MonthlyPRs() {
  return (
    <div className="bg-[#0f0f23] border border-[#2d2d55] rounded-xl p-5 flex flex-col gap-4">
      <h3 className="text-white text-sm font-bold uppercase tracking-widest font-[family-name:var(--font-lexend)]">
        Monthly Personal Records
      </h3>
      <div className="flex flex-col gap-3">
        {PRS.map((pr) => (
          <div
            key={pr.name}
            className="flex items-center gap-3 bg-[#0a0a1a] border border-[#1a1a3e] rounded-xl p-3"
          >
            {/* Icon */}
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${pr.color}15`, border: `1px solid ${pr.color}30` }}
            >
              <span className="material-symbols-outlined text-lg" style={{ color: pr.color }}>
                {pr.icon}
              </span>
            </div>

            {/* Name + date */}
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-bold uppercase tracking-wider font-[family-name:var(--font-lexend)]">
                {pr.name}
              </p>
              <p className="text-[#9ca3af] text-xs">{pr.date}</p>
            </div>

            {/* Value + delta */}
            <div className="text-right shrink-0">
              <p className="text-white text-sm font-bold font-[family-name:var(--font-lexend)]">
                {pr.value}
              </p>
              <p className="text-[#10b981] text-xs font-semibold">▲ {pr.delta}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
