"use client";

import { useRef } from "react";
import { RECENT_ROUTINES } from "@/data/mockData";

const SCROLL_AMOUNT = 312; // card width (288) + gap (24)

export default function RecentRoutines() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: 1 | -1) {
    scrollRef.current?.scrollBy({ left: dir * SCROLL_AMOUNT, behavior: "smooth" });
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h2 className="text-white text-lg font-bold uppercase tracking-wider flex items-center gap-2 font-[family-name:var(--font-lexend)]">
          <span className="material-symbols-outlined text-[#00f3ff]">history</span>
          Recent Routines
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll(-1)}
            className="bg-[#0f0f23] border border-[#2d2d55] rounded p-1 hover:border-[#00f3ff] text-[#9ca3af] hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <button
            onClick={() => scroll(1)}
            className="bg-[#0f0f23] border border-[#2d2d55] rounded p-1 hover:border-[#00f3ff] text-[#9ca3af] hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Horizontal scroll */}
      <div ref={scrollRef} className="w-full overflow-x-auto hide-scroll pb-2">
        <div className="flex gap-6 min-w-max">
          {RECENT_ROUTINES.map((r) => (
            <div
              key={r.name}
              className="w-72 bg-[#0f0f23] border border-[#2d2d55] rounded-xl flex flex-col hover:border-[#00f3ff]/50 transition-colors group overflow-hidden shrink-0"
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
    </div>
  );
}
