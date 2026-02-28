// Each row: [week number, 7 day-dot states]
// "filled" = completed workout, "rest" = rest/skipped, "current" = today, "future" = not yet
type DotState = "filled" | "rest" | "current" | "future";

const WEEK_ROWS: { week: string; dots: DotState[]; past?: boolean; current?: boolean; dim?: boolean; vdim?: boolean }[] = [
  { week: "01", dots: ["filled", "filled", "rest", "filled", "filled", "rest", "rest"], past: true },
  { week: "02", dots: ["filled", "filled", "rest", "filled", "filled", "rest", "rest"], past: true },
  { week: "03", dots: ["current", "future", "rest", "future", "future", "rest", "rest"], current: true },
  { week: "04", dots: ["future", "future", "future", "future", "future", "future", "future"], dim: true },
  { week: "05", dots: ["future", "future", "future", "future", "future", "future", "future"], dim: true },
  { week: "06", dots: ["future", "future", "future", "future", "future", "future", "future"], dim: true },
  { week: "..", dots: ["future", "future", "future", "future", "future", "future", "future"], vdim: true },
];

function Dot({ state }: { state: DotState }) {
  if (state === "filled") {
    return (
      <div className="w-3 h-3 rounded-full bg-[#ec4899] shadow-[0_0_5px_rgba(236,72,153,0.8)]" />
    );
  }
  if (state === "current") {
    return (
      <div className="w-3 h-3 rounded-full bg-[#a855f7] animate-pulse shadow-[0_0_8px_rgba(168,85,247,1)] ring-2 ring-[#a855f7]/30" />
    );
  }
  if (state === "rest") {
    return <div className="w-3 h-3 rounded-full bg-gray-800" />;
  }
  // future
  return <div className="w-3 h-3 rounded-full bg-gray-700 border border-gray-600" />;
}

export default function ProgramProgressionCard() {
  return (
    <div className="cyber-card rounded-xl p-6 relative overflow-hidden flex flex-col h-full">
      <div className="absolute inset-0 bg-gradient-to-b from-[#13131f] to-[#0a0a12]" />

      <div className="relative z-10 flex flex-col h-full">
        <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-6 border-b border-white/10 pb-3">
          Program Progression
        </h3>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-black/40 rounded p-2 text-center border border-white/5">
            <div className="text-2xl font-[family-name:var(--font-orbitron)] font-bold text-white">22%</div>
            <div className="text-[9px] text-gray-500 uppercase font-bold">Complete</div>
          </div>
          <div className="bg-black/40 rounded p-2 text-center border border-white/5">
            <div className="text-2xl font-[family-name:var(--font-orbitron)] font-bold text-white">18</div>
            <div className="text-[9px] text-gray-500 uppercase font-bold">Sessions Done</div>
          </div>
        </div>

        {/* Week dot grid */}
        <div className="space-y-2 mb-6">
          <div className="text-[10px] text-gray-500 font-mono mb-2 text-center">Weeks 1-12 View</div>
          {WEEK_ROWS.map((row) => (
            <div
              key={row.week}
              className={`flex gap-1.5 justify-between items-center ${
                row.vdim ? "opacity-10" : row.dim ? "opacity-30" : row.past ? "opacity-50" : ""
              } ${row.current ? "relative bg-white/5 -mx-2 px-2 py-1 rounded border border-white/5" : ""}`}
            >
              <span className={`text-[9px] w-4 font-mono pt-1 ${row.current ? "text-white font-bold" : "text-gray-500"}`}>
                {row.week}
              </span>
              {row.dots.map((state, i) => (
                <Dot key={i} state={state} />
              ))}
            </div>
          ))}
        </div>

        {/* Recent PRs */}
        <div className="mt-auto pt-4 border-t border-white/5">
          <div className="text-xs text-gray-400 mb-2 font-bold uppercase tracking-widest">Recent PRs</div>
          <div className="space-y-2">
            <div className="flex justify-between items-center bg-white/5 p-2 rounded">
              <span className="text-sm font-bold text-gray-300">Deadlift</span>
              <span className="text-sm font-mono font-bold text-yellow-500">405 lbs</span>
            </div>
            <div className="flex justify-between items-center bg-white/5 p-2 rounded">
              <span className="text-sm font-bold text-gray-300">Overhead Press</span>
              <span className="text-sm font-mono font-bold text-[#06b6d4]">155 lbs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
