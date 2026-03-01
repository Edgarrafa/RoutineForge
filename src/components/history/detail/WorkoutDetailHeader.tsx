import type { WorkoutLog } from "@/types";
import Link from "next/link";

type Props = { log: WorkoutLog };

export default function WorkoutDetailHeader({ log }: Props) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Link
          href="/history"
          className="flex items-center gap-1 text-[#9ca3af] hover:text-[#ec4899] text-sm transition-colors"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Back to History
        </Link>
      </div>

      <p className="text-[#ec4899] text-sm font-semibold uppercase tracking-widest mb-2 flex items-center gap-1.5">
        <span className="material-symbols-outlined text-base">calendar_today</span>
        {log.date}
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div>
          <h1 className="text-white text-4xl font-black uppercase tracking-wide font-[family-name:var(--font-orbitron)] mb-3">
            {log.name}
          </h1>
          <div className="flex items-center gap-2 flex-wrap">
            {log.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${
                  tag === "Completed"
                    ? "border-[#10b981] text-[#10b981] bg-[#10b981]/10"
                    : "border-[#ec4899] text-[#ec4899] bg-[#ec4899]/10"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button className="flex items-center gap-2 bg-[#ec4899] hover:bg-[#d6357a] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors uppercase tracking-wider">
            <span className="material-symbols-outlined text-base">replay</span>
            Repeat Workout
          </button>
          <button className="flex items-center gap-2 bg-[#1a1a2e] border border-[#2d2d55] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:border-[#ec4899] transition-colors">
            <span className="material-symbols-outlined text-base">share</span>
            Share to Clan
          </button>
          <button className="flex items-center gap-2 bg-[#1a1a2e] border border-[#2d2d55] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:border-[#a855f7] transition-colors">
            <span className="material-symbols-outlined text-base">picture_as_pdf</span>
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}
