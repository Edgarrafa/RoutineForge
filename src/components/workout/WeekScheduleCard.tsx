const DAYS = [
  {
    short: "Mon 23",
    name: "Upper Body Power",
    sub: "4 Exercises",
    icon: "fitness_center",
    iconColor: "text-[#a855f7]",
    today: true,
  },
  {
    short: "Tue 24",
    name: "Lower Body Power",
    sub: "5 Exercises",
    icon: "fitness_center",
    iconColor: "text-gray-600",
    today: false,
  },
  {
    short: "Wed 25",
    name: "Active Recovery",
    sub: "Cardio & Abs",
    icon: "directions_run",
    iconColor: "text-[#06b6d4] opacity-50",
    today: false,
    dim: true,
  },
  {
    short: "Thu 26",
    name: "Back & Shoulders",
    sub: "Hypertrophy",
    icon: "fitness_center",
    iconColor: "text-gray-600",
    today: false,
  },
  {
    short: "Fri 27",
    name: "Legs & Arms",
    sub: "Hypertrophy",
    icon: "fitness_center",
    iconColor: "text-gray-600",
    today: false,
  },
  {
    short: "Sat 28",
    name: "Conditioning",
    sub: "HIIT",
    icon: "timer",
    iconColor: "text-yellow-500 opacity-50",
    today: false,
    dim: true,
  },
  {
    short: "Sun 29",
    name: "Rest Day",
    sub: "",
    icon: "hotel",
    iconColor: "text-gray-700",
    today: false,
    rest: true,
  },
];

export default function WeekScheduleCard() {
  return (
    <div className="cyber-card rounded-xl p-6 relative overflow-hidden">
      {/* Decorative icon */}
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <span className="material-symbols-outlined text-9xl text-white">calendar_month</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 relative z-10 gap-4">
        <div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
            Active Program
          </div>
          <h3 className="text-2xl font-[family-name:var(--font-orbitron)] font-bold text-white mb-2">
            12-Week Strength Protocol
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#ec4899] to-[#a855f7] w-[25%] shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
            </div>
            <span className="text-xs font-mono text-[#a855f7] font-bold">Week 3 of 12</span>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <button className="text-gray-400 hover:text-white transition-colors">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <span className="text-sm font-bold text-white uppercase tracking-wider">Oct 23 – Oct 29</span>
          <button className="text-gray-400 hover:text-white transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>

      {/* 7-day grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 relative z-10">
        {DAYS.map((day) => {
          if (day.rest) {
            return (
              <div
                key={day.short}
                className="bg-[#1a1a24]/50 border border-white/5 rounded-lg p-3 flex flex-col justify-between"
              >
                <div className="text-[10px] text-gray-600 font-bold uppercase mb-2">{day.short}</div>
                <div className="text-sm font-bold text-gray-500 mb-1 leading-tight italic">{day.name}</div>
                <div className="mt-2">
                  <span className="material-symbols-outlined text-gray-700 text-sm">{day.icon}</span>
                </div>
              </div>
            );
          }

          if (day.today) {
            return (
              <div
                key={day.short}
                className="group relative bg-[#a855f7]/10 border border-[#a855f7] rounded-lg p-3 hover:bg-[#a855f7]/20 transition-all cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.15)]"
              >
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#a855f7] rounded-full animate-pulse shadow-[0_0_8px_#a855f7]" />
                <div className="text-[10px] text-[#a855f7] font-bold uppercase mb-2">{day.short}</div>
                <div className="text-sm font-bold text-white mb-1 leading-tight">{day.name}</div>
                <div className="text-[10px] text-gray-400">{day.sub}</div>
                <div className="mt-2 flex justify-between items-center">
                  <span className={`material-symbols-outlined text-sm ${day.iconColor}`}>{day.icon}</span>
                  <span className="bg-[#a855f7] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    TODAY
                  </span>
                </div>
              </div>
            );
          }

          return (
            <div
              key={day.short}
              className={`group bg-white/5 border border-white/5 rounded-lg p-3 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer ${day.dim ? "opacity-75" : ""}`}
            >
              <div className="text-[10px] text-gray-500 font-bold uppercase mb-2">{day.short}</div>
              <div className="text-sm font-bold text-gray-300 mb-1 leading-tight">{day.name}</div>
              <div className="text-[10px] text-gray-500">{day.sub}</div>
              <div className="mt-2">
                <span className={`material-symbols-outlined text-sm ${day.iconColor}`}>{day.icon}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
